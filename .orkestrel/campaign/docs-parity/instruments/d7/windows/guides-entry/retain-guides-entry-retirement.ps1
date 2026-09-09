$ErrorActionPreference = 'Stop'
$record = 'C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/docs-parity'
$scratch = 'C:/Users/mikes/WebstormProjects/scaffold/tmp/pass'
$instrument = Join-Path $record 'instruments/d7/windows/guides-entry'
$evidence = Join-Path $record 'evidence/d7n-guides-entry-retirement'
New-Item -ItemType Directory -Force -Path $instrument, $evidence | Out-Null
Copy-Item -LiteralPath 'C:/Users/mikes/WebstormProjects/scaffold/tmp/units/d7n-guides-entry-retirement-recipe-report.md' -Destination $record
Copy-Item -LiteralPath (Join-Path $scratch 'scaffold-guides-entry/tmp/guides-retirement-recipe/prove.mjs') -Destination (Join-Path $instrument 'retirement-proof.mjs')
Copy-Item -LiteralPath (Join-Path $scratch 'run-guides-entry-review.sh'), (Join-Path $scratch 'retain-guides-entry-retirement.ps1') -Destination $instrument
Copy-Item -LiteralPath 'C:/Users/mikes/AppData/Local/Temp/scaffold-guides-retirement-CmeYys/evidence.log' -Destination (Join-Path $evidence 'instrument.log.txt')
Get-FileHash -Algorithm SHA256 -LiteralPath (Join-Path $instrument 'retirement-proof.mjs')
