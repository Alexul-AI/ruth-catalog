<#
.SYNOPSIS
  QA pass over public/products/*.jpg: flags any file with dark pixels
  along its border (a symptom of the transparent-PNG-to-black-JPEG bug
  resize-product-images.ps1 guards against), writes one contact sheet
  image so the whole catalog can be eyeballed at a glance, and
  cross-checks every file against products.ts's imageUrl fields so a
  "no dark borders" result can't be mistaken for "every product's
  photo is fine" - those are different claims. The dark-border scan
  covers every file on disk, used or not; the products.ts cross-check
  is what actually tells you whether a live product is missing a
  photo, points at a file that doesn't exist, or shares a file with
  another product.

.PARAMETER ProductsDir
  Directory of product JPEGs to audit. Default public/products/
  relative to the repo root.

.PARAMETER ProductsTsPath
  Path to src/data/products.ts, used for the imageUrl cross-check.
  Default: relative to the repo root.

.PARAMETER OutputDir
  Where to write contact-sheet.jpg. Default: same as ProductsDir's
  parent, in a gitignored scratch location the caller passes in - this
  script does not assume a repo-tracked output path.

.PARAMETER DarkThreshold
  Average RGB brightness (0-255) below which a sampled border pixel
  counts as "dark". Default 40.

.PARAMETER FlagPct
  A file is flagged when its sampled border pixels are more than this
  percent dark. Default 2.

.EXAMPLE
  ./audit-product-images.ps1 -OutputDir C:\scratch
#>
param(
    [string]$ProductsDir = (Join-Path $PSScriptRoot "..\public\products"),
    [string]$ProductsTsPath = (Join-Path $PSScriptRoot "..\src\data\products.ts"),
    [Parameter(Mandatory = $true)][string]$OutputDir,
    [int]$DarkThreshold = 40,
    [double]$FlagPct = 2.0
)

Add-Type -AssemblyName System.Drawing

$files = Get-ChildItem -Path $ProductsDir -Filter *.jpg | Sort-Object Name
if ($files.Count -eq 0) {
    throw "No .jpg files found in $ProductsDir"
}

$results = @()
foreach ($f in $files) {
    $img = [System.Drawing.Bitmap]::FromFile($f.FullName)
    try {
        $w = $img.Width
        $h = $img.Height
        $stripWidth = [Math]::Max(2, [int]($w * 0.04))
        $stripHeight = [Math]::Max(2, [int]($h * 0.04))
        $sampled = 0
        $dark = 0

        for ($x = 0; $x -lt $w; $x += 3) {
            for ($yy = 0; $yy -lt $stripHeight; $yy += 2) {
                foreach ($c in @($img.GetPixel($x, $yy), $img.GetPixel($x, $h - 1 - $yy))) {
                    $sampled++
                    if ((($c.R + $c.G + $c.B) / 3) -lt $DarkThreshold) { $dark++ }
                }
            }
        }
        for ($y = 0; $y -lt $h; $y += 3) {
            for ($xx = 0; $xx -lt $stripWidth; $xx += 2) {
                foreach ($c in @($img.GetPixel($xx, $y), $img.GetPixel($w - 1 - $xx, $y))) {
                    $sampled++
                    if ((($c.R + $c.G + $c.B) / 3) -lt $DarkThreshold) { $dark++ }
                }
            }
        }

        $pct = if ($sampled -gt 0) { [Math]::Round(100.0 * $dark / $sampled, 1) } else { 0 }
        $results += [PSCustomObject]@{ File = $f.Name; DarkBorderPct = $pct }
    } finally {
        $img.Dispose()
    }
}

Write-Host "=== products.ts imageUrl cross-check ==="
if (-not (Test-Path -LiteralPath $ProductsTsPath)) {
    Write-Warning "products.ts not found at $ProductsTsPath - skipping cross-check"
} else {
    $tsLines = Get-Content -LiteralPath $ProductsTsPath
    $allProducts = @()
    $refs = @()
    foreach ($line in $tsLines) {
        $idMatch = [regex]::Match($line, "id:\s*'([^']+)'")
        if (-not $idMatch.Success) { continue }
        $productId = $idMatch.Groups[1].Value
        $isActive = -not ($line -match "active:\s*false")
        $imgMatch = [regex]::Match($line, "imageUrl:\s*'/products/([^']+)'")
        $allProducts += [PSCustomObject]@{ ProductId = $productId; Active = $isActive; HasImage = $imgMatch.Success }
        if ($imgMatch.Success) {
            $refs += [PSCustomObject]@{ ProductId = $productId; File = $imgMatch.Groups[1].Value }
        }
    }

    $diskFiles = @($files | ForEach-Object { $_.Name })
    $referencedFiles = @($refs | ForEach-Object { $_.File } | Sort-Object -Unique)

    $missing = $refs | Where-Object { $diskFiles -notcontains $_.File }
    $orphaned = $diskFiles | Where-Object { $referencedFiles -notcontains $_ }
    $dupGroups = $refs | Group-Object File | Where-Object { $_.Count -gt 1 }

    $activeProducts = $allProducts | Where-Object { $_.Active }
    $activeWithoutImage = $activeProducts | Where-Object { -not $_.HasImage }

    Write-Host "Active products: $($activeProducts.Count)"
    Write-Host "Products with imageUrl: $($refs.Count) / distinct files referenced: $($referencedFiles.Count)"
    Write-Host "Active products WITHOUT imageUrl: $($activeWithoutImage.Count)"
    if ($activeWithoutImage.Count -gt 0) {
        $activeWithoutImage | ForEach-Object { Write-Host "  $($_.ProductId)" }
    }

    if ($missing.Count -gt 0) {
        Write-Host "-- Referenced but file missing on disk --"
        $missing | Format-Table -AutoSize
    } else {
        Write-Host "-- No missing files (every referenced imageUrl exists on disk) --"
    }

    if ($orphaned.Count -gt 0) {
        Write-Host "-- Files on disk not referenced by any product (orphaned) --"
        $orphaned | ForEach-Object { Write-Host "  $_" }
    } else {
        Write-Host "-- No orphaned files (every file on disk is referenced) --"
    }

    if ($dupGroups.Count -gt 0) {
        Write-Host "-- Same file referenced by more than one product id (verify intentional) --"
        foreach ($grp in $dupGroups) {
            Write-Host "  $($grp.Name): $(($grp.Group | ForEach-Object { $_.ProductId }) -join ', ')"
        }
    } else {
        Write-Host "-- No duplicate imageUrl assignments --"
    }
}
Write-Host ""

$flagged = $results | Where-Object { $_.DarkBorderPct -gt $FlagPct }
Write-Host "=== Files with >$FlagPct% dark border pixels ==="
if ($flagged.Count -gt 0) {
    $flagged | Format-Table -AutoSize
} else {
    Write-Host "(none)"
}
Write-Host "Total scanned: $($results.Count) / Flagged: $($flagged.Count)"

if (-not (Test-Path -LiteralPath $OutputDir)) {
    New-Item -ItemType Directory -Path $OutputDir -Force | Out-Null
}

$cols = 8
$rows = [Math]::Ceiling($files.Count / $cols)
$thumb = 140
$labelH = 18
$cellW = $thumb
$cellH = $thumb + $labelH
$sheetW = $cols * $cellW
$sheetH = $rows * $cellH

$sheet = New-Object System.Drawing.Bitmap -ArgumentList @([int]$sheetW, [int]$sheetH)
$g = [System.Drawing.Graphics]::FromImage($sheet)
$g.Clear([System.Drawing.Color]::LightGray)
$font = New-Object System.Drawing.Font("Arial", 8)
$brush = [System.Drawing.Brushes]::Black
$i = 0
foreach ($f in $files) {
    $col = $i % $cols
    $row = [Math]::Floor($i / $cols)
    $x = $col * $cellW
    $y = $row * $cellH
    $img = [System.Drawing.Image]::FromFile($f.FullName)
    try {
        $scale = [Math]::Min($thumb / $img.Width, $thumb / $img.Height)
        $tw = [int]($img.Width * $scale)
        $th = [int]($img.Height * $scale)
        $ox = $x + [int](($thumb - $tw) / 2)
        $oy = $y + [int](($thumb - $th) / 2)
        $g.DrawImage($img, $ox, $oy, $tw, $th)
    } finally {
        $img.Dispose()
    }
    $g.DrawString($f.Name, $font, $brush, [float]$x, [float]($y + $thumb))
    $i++
}
$g.Dispose()

$outPath = Join-Path $OutputDir "contact-sheet.jpg"
$jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$encParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [int64]90)
$sheet.Save($outPath, $jpegCodec, $encParams)
$sheet.Dispose()
Write-Host "Contact sheet saved to $outPath ($sheetW x $sheetH, $($files.Count) images)"
