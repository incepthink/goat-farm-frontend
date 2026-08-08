# Derives every shipped form of the ASF mark from the single client-supplied original,
# public/images/02-logos/logo-png.png (1763x1571, 879 KB - far too heavy to serve).
#
#   public/images/02-logos/asf-mark.png      240x231   1x, and the CSS mask source
#   public/images/02-logos/asf-mark@2x.png   480x461   hi-dpi
#   public/favicon-32.png                     32x32    flattened onto bone
#   public/apple-touch-icon.png             180x180    flattened onto bone
#
# Idempotent: always reads the original, never its own output. Run from the repo root:
#   powershell -ExecutionPolicy Bypass -File scripts/build-logo.ps1
#
# The artwork is a flat single-colour silhouette (#004402 over transparency) with a wide
# transparent margin, so the first thing this does is trim to the alpha bounding box -
# without that the mark floats undersized in every slot it is put in.
#
# The favicons are flattened onto bone (#FAF7F1) deliberately: a transparent dark-green mark
# disappears against a dark browser chrome or a dark tab strip.

Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$srcPath = Join-Path $root "public\images\02-logos\logo-png.png"
if (-not (Test-Path $srcPath)) { throw "missing source: $srcPath" }

$src = [System.Drawing.Bitmap]::FromFile($srcPath)

# --- trim to the alpha bounding box -------------------------------------
$rect = New-Object System.Drawing.Rectangle 0, 0, $src.Width, $src.Height
$data = $src.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$stride = $data.Stride
$bytes = New-Object byte[] ($stride * $src.Height)
[System.Runtime.InteropServices.Marshal]::Copy($data.Scan0, $bytes, 0, $bytes.Length)
$src.UnlockBits($data)

$minX = $src.Width; $minY = $src.Height; $maxX = -1; $maxY = -1
for ($y = 0; $y -lt $src.Height; $y++) {
  $row = $y * $stride
  for ($x = 0; $x -lt $src.Width; $x++) {
    if ($bytes[$row + $x * 4 + 3] -gt 8) {
      if ($x -lt $minX) { $minX = $x }
      if ($x -gt $maxX) { $maxX = $x }
      if ($y -lt $minY) { $minY = $y }
      if ($y -gt $maxY) { $maxY = $y }
    }
  }
}
$w = $maxX - $minX + 1
$h = $maxY - $minY + 1
"trimmed to ${w}x${h} from $($src.Width)x$($src.Height)"

$crop = New-Object System.Drawing.Bitmap $w, $h, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($crop)
$g.DrawImage($src, (New-Object System.Drawing.Rectangle 0, 0, $w, $h), (New-Object System.Drawing.Rectangle $minX, $minY, $w, $h), [System.Drawing.GraphicsUnit]::Pixel)
$g.Dispose()
$src.Dispose()

function Set-Quality($gg) {
  $gg.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $gg.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $gg.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $gg.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
}

function Save-Mark($bmp, $targetW, $outPath) {
  $tw = [int]$targetW
  $th = [int][math]::Round($tw * ($bmp.Height / $bmp.Width))
  $out = New-Object System.Drawing.Bitmap $tw, $th, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $gg = [System.Drawing.Graphics]::FromImage($out)
  Set-Quality $gg
  $gg.Clear([System.Drawing.Color]::Transparent)
  $gg.DrawImage($bmp, (New-Object System.Drawing.Rectangle 0, 0, $tw, $th))
  $gg.Dispose()
  $out.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
  $out.Dispose()
  "$outPath  ${tw}x${th}  $([math]::Round((Get-Item $outPath).Length/1kb,1)) KB"
}

function Save-Icon($bmp, $size, $pad, $outPath) {
  $out = New-Object System.Drawing.Bitmap $size, $size, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $gg = [System.Drawing.Graphics]::FromImage($out)
  Set-Quality $gg
  $gg.Clear([System.Drawing.Color]::FromArgb(255, 250, 247, 241)) # bone
  $inner = $size - 2 * $pad
  $ratio = $bmp.Height / $bmp.Width
  if ($ratio -ge 1) { $th = $inner; $tw = [int][math]::Round($inner / $ratio) }
  else { $tw = $inner; $th = [int][math]::Round($inner * $ratio) }
  $gg.DrawImage($bmp, (New-Object System.Drawing.Rectangle ([int](($size - $tw) / 2)), ([int](($size - $th) / 2)), $tw, $th))
  $gg.Dispose()
  $out.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
  $out.Dispose()
  "$outPath  ${size}x${size}  $([math]::Round((Get-Item $outPath).Length/1kb,1)) KB"
}

Save-Mark $crop 240 (Join-Path $root "public\images\02-logos\asf-mark.png")
Save-Mark $crop 480 (Join-Path $root "public\images\02-logos\asf-mark@2x.png")
Save-Icon $crop 32 1 (Join-Path $root "public\favicon-32.png")
Save-Icon $crop 180 12 (Join-Path $root "public\apple-touch-icon.png")

$crop.Dispose()
"done - if the mark dimensions changed, update MARK in src/components/brand/AsfLogo.tsx"
