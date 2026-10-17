# Shoots every new family from the full sanding.html and builds contact sheets.
#   powershell -File tools/qa-all.ps1 -At cover   (or open, when, rsvp)
param([string]$At = 'cover', [string]$Page = 'sanding.html', [string]$Only = '')
Add-Type -AssemblyName System.Drawing
$root = Split-Path $PSScriptRoot
Set-Location $root
$keys = Get-ChildItem src/fam/*.js | Where-Object { $_.BaseName -notlike '_*' } | ForEach-Object { $_.BaseName } | Sort-Object
if ($Only) { $keys = $Only.Split(' ') }
$dir = "qa/all-$At"; New-Item -ItemType Directory -Force $dir | Out-Null
foreach ($k in $keys) {
  # first theme id of the family
  $m = Select-String -Path "src/fam/$k.js" -Pattern "\{k:'([a-z0-9]+)'" | Select-Object -First 1
  if (-not $m) { continue }
  $id = "$k-" + $m.Matches[0].Groups[1].Value
  & powershell -ExecutionPolicy Bypass -File tools/shot.ps1 -Page $Page -Id $id -At $At -Out "$dir/$k.png" | Out-Null
}
# contact sheets, 8 per sheet, labelled
$files = Get-ChildItem "$dir/*.png" | Where-Object { $_.Name -notlike 'sheet*' } | Sort-Object Name
$per = 8; $w = 195; $h = 380
for ($s = 0; $s -lt $files.Count; $s += $per) {
  $batch = $files[$s..([Math]::Min($s + $per, $files.Count) - 1)]
  $bmp = New-Object System.Drawing.Bitmap ($w * 4), (($h + 18) * 2)
  $g = [System.Drawing.Graphics]::FromImage($bmp); $g.Clear([System.Drawing.Color]::White)
  $font = New-Object System.Drawing.Font 'Arial', 10
  for ($i = 0; $i -lt $batch.Count; $i++) {
    $img = [System.Drawing.Image]::FromFile($batch[$i].FullName)
    $x = ($i % 4) * $w; $y = [Math]::Floor($i / 4) * ($h + 18)
    $g.DrawImage($img, $x, $y + 18, $w, $h); $g.DrawString($batch[$i].BaseName, $font, [System.Drawing.Brushes]::Black, $x + 4, $y + 2)
    $img.Dispose()
  }
  $bmp.Save("$root/$dir/sheet-$([Math]::Floor($s / $per) + 1).png", [System.Drawing.Imaging.ImageFormat]::Png); $g.Dispose(); $bmp.Dispose()
}
Write-Output "done $($files.Count) in $dir"
