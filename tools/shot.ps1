# Screenshot one card at phone size (390x760) with headless Edge. Needs the preview server on :8766.
#   powershell -File tools/shot.ps1 -Page qa-a.html -Id wau-merah -At cover -Out qa/wau-cover.png
#   -At: cover | open | intro | when | count | sched | doa | rsvp | wishes | gift | wishlist | contact
param([string]$Page, [string]$Id, [string]$At = 'cover', [string]$Out)
Add-Type -AssemblyName System.Drawing
$edge = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
$prof = Join-Path $env:TEMP ('edgeqa-' + [guid]::NewGuid().ToString('N'))
New-Item -ItemType Directory -Force $prof | Out-Null
$raw = Join-Path $env:TEMP ('shot-' + [guid]::NewGuid().ToString('N') + '.png')
$url = "http://localhost:8766/$Page" + "?qa=$Id&at=$At"
$args = @('--headless=new', '--disable-gpu', '--hide-scrollbars', '--mute-audio', '--no-first-run', "--user-data-dir=$prof", '--window-size=520,760', '--virtual-time-budget=9000', "--screenshot=$raw", $url)
$p = Start-Process -FilePath $edge -ArgumentList $args -PassThru -WindowStyle Hidden
if (-not $p.WaitForExit(60000)) { try { $p.Kill() } catch {} }
Start-Sleep -Milliseconds 300
if (-not (Test-Path $raw)) { Write-Output 'no screenshot'; exit 1 }
$outFull = [System.IO.Path]::GetFullPath((Join-Path (Get-Location) $Out))
New-Item -ItemType Directory -Force (Split-Path $outFull) | Out-Null
$img = [System.Drawing.Image]::FromFile($raw)
$bmp = New-Object System.Drawing.Bitmap 390, ([Math]::Min(760, $img.Height))
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.DrawImage($img, (New-Object System.Drawing.Rectangle 0, 0, 390, $bmp.Height), (New-Object System.Drawing.Rectangle 0, 0, 390, $bmp.Height), [System.Drawing.GraphicsUnit]::Pixel)
$bmp.Save($outFull, [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose(); $bmp.Dispose(); $img.Dispose()
Remove-Item $raw -Force -ErrorAction SilentlyContinue
Remove-Item $prof -Recurse -Force -ErrorAction SilentlyContinue
Write-Output "saved $outFull"
