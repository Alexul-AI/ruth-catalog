<#
.SYNOPSIS
  QA pass over public/products/*.jpg: flags any file with dark pixels
  along its border (a symptom of the transparent-PNG-to-black-JPEG bug
  resize-product-images.ps1 guards against) and writes one contact
  sheet image so the whole catalog can be eyeballed at a glance.

.PARAMETER ProductsDir
  Directory of product JPEGs to audit. Default public/products/
  relative to the repo root.

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
