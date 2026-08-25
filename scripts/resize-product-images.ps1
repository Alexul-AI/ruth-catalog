<#
.SYNOPSIS
  Resize a source product photo (or a directory of them) into the
  800px/JPEG-q85 format used under public/products/.

.DESCRIPTION
  Product photos are shot on a white studio background, but some
  source files are PNGs with a real alpha channel. JPEG has no alpha
  channel, so drawing a transparent PNG onto an uninitialized bitmap
  bakes in a BLACK background wherever the PNG was transparent (GDI+'s
  default bitmap fill). This script always clears the canvas to white
  before drawing the source image on top, so the exported JPEG's
  "empty" areas are solid white regardless of the source's own
  transparency or lack of it.

.PARAMETER InputPath
  A single source image file, or a directory of source images
  (jpg/jpeg/png).

.PARAMETER OutputPath
  Single-file mode: path to write the resized JPEG to.
  Directory mode (when InputPath is a directory): a directory to write
  into; each output keeps the input's base name with a .jpg extension.
  Must not be the same path as InputPath, so a re-run can never
  silently overwrite the untouched source.

.PARAMETER MaxDimension
  Maximum width/height in pixels for the longer side. Default 800.

.PARAMETER Quality
  JPEG quality, 0-100. Default 85.

.PARAMETER Force
  Overwrite an existing OutputPath. Without it, an existing output file
  is left untouched and the script errors instead of silently
  clobbering a previous export.

.EXAMPLE
  ./resize-product-images.ps1 -InputPath drive-downloads/t-001.png -OutputPath public/products/t-001.jpg

.EXAMPLE
  ./resize-product-images.ps1 -InputPath drive-downloads/ -OutputPath public/products/ -Force
#>
param(
    [Parameter(Mandatory = $true)][string]$InputPath,
    [Parameter(Mandatory = $true)][string]$OutputPath,
    [int]$MaxDimension = 800,
    [int]$Quality = 85,
    [switch]$Force
)

Add-Type -AssemblyName System.Drawing

function Resize-ProductImage {
    param(
        [string]$InputPath,
        [string]$OutputPath,
        [int]$MaxDim,
        [int]$Quality,
        [bool]$Force
    )

    $resolvedIn = (Resolve-Path -LiteralPath $InputPath).Path
    $resolvedOut = [System.IO.Path]::GetFullPath($OutputPath)
    if ($resolvedIn.Equals($resolvedOut, [StringComparison]::OrdinalIgnoreCase)) {
        throw "InputPath and OutputPath must differ ($InputPath) - refusing to overwrite the source."
    }
    if ((Test-Path -LiteralPath $OutputPath) -and -not $Force) {
        throw "OutputPath already exists ($OutputPath) - pass -Force to overwrite it."
    }

    $img = [System.Drawing.Image]::FromFile($InputPath)
    try {
        $w = $img.Width
        $h = $img.Height
        $scale = [Math]::Min(1.0, $MaxDim / [Math]::Max($w, $h))
        $newW = [int][Math]::Round($w * $scale)
        $newH = [int][Math]::Round($h * $scale)

        $bmp = New-Object System.Drawing.Bitmap -ArgumentList @([int]$newW, [int]$newH)
        try {
            $g = [System.Drawing.Graphics]::FromImage($bmp)
            try {
                # Always flatten onto white first - see .DESCRIPTION above.
                $g.Clear([System.Drawing.Color]::White)
                $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
                $g.DrawImage($img, 0, 0, $newW, $newH)
            } finally {
                $g.Dispose()
            }

            $jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
            $encParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
            $encParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [int64]$Quality)

            # Save to a temp file first, then move into place atomically - a
            # crash/interrupt mid-save can never leave a half-written or
            # zero-byte file at OutputPath.
            $tempPath = "$OutputPath.tmp"
            $bmp.Save($tempPath, $jpegCodec, $encParams)
            Move-Item -LiteralPath $tempPath -Destination $OutputPath -Force
        } finally {
            $bmp.Dispose()
        }
    } finally {
        $img.Dispose()
    }

    if (-not (Test-Path $OutputPath)) {
        throw "FAILED to save $OutputPath"
    }
    Write-Host "Saved $OutputPath ($newW x $newH)"
}

if (Test-Path -LiteralPath $InputPath -PathType Container) {
    if (-not (Test-Path -LiteralPath $OutputPath -PathType Container)) {
        New-Item -ItemType Directory -Path $OutputPath -Force | Out-Null
    }
    $sources = Get-ChildItem -LiteralPath $InputPath -File | Where-Object { $_.Extension -match '\.(jpg|jpeg|png)$' }
    foreach ($src in $sources) {
        $dest = Join-Path $OutputPath ([System.IO.Path]::GetFileNameWithoutExtension($src.Name) + '.jpg')
        Resize-ProductImage -InputPath $src.FullName -OutputPath $dest -MaxDim $MaxDimension -Quality $Quality -Force:$Force.IsPresent
    }
} else {
    Resize-ProductImage -InputPath $InputPath -OutputPath $OutputPath -MaxDim $MaxDimension -Quality $Quality -Force:$Force.IsPresent
}
