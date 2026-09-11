param([ValidateSet('Units', 'Instruments', 'Evidence', 'Pack')][string]$Kind, [string[]]$Names)
$ErrorActionPreference = 'Stop'
$scaffold = 'C:/Users/mikes/WebstormProjects/scaffold'
$pass = Join-Path $scaffold 'tmp/pass'
$units = Join-Path $scaffold 'tmp/units'
$campaign = Join-Path $scaffold '.orkestrel/campaign/docs-parity'
function Fail([string]$Message) { throw $Message }
function Safe([string]$Name) { if ($Name -notmatch '^[A-Za-z0-9][A-Za-z0-9._-]*$' -or $Name -match '^\.+$') { Fail "unsafe name: $Name" } }
function CopyNew([string]$Source, [string]$Destination) { if (Test-Path -LiteralPath $Destination) { if ((Get-FileHash $Source -Algorithm SHA256).Hash -ne (Get-FileHash $Destination -Algorithm SHA256).Hash) { Fail "retained record differs: $Destination" }; return }; New-Item -ItemType Directory -Path (Split-Path -Parent $Destination) -Force | Out-Null; Copy-Item -LiteralPath $Source -Destination $Destination }
foreach ($name in $Names) { Safe $name; if ($Kind -eq 'Units') { CopyNew (Join-Path $units $name) (Join-Path $campaign "units/$name") }; if ($Kind -eq 'Instruments') { CopyNew (Join-Path $pass $name) (Join-Path $campaign "instruments/d7/foundation-native/$name") }; if ($Kind -eq 'Evidence') { $source = Join-Path $pass $name; if (-not (Test-Path $source -PathType Container)) { Fail "evidence source absent: $name" }; Get-ChildItem -LiteralPath $source -File | Where-Object { $_.Extension -ne '.jsonl' } | ForEach-Object { CopyNew $_.FullName (Join-Path $campaign "evidence/$name/$($_.Name)") } }; if ($Kind -eq 'Pack') { $source = Join-Path $pass "packed/$name"; Get-ChildItem -LiteralPath $source -File | Where-Object { $_.Extension -in '.txt','.sha256' } | ForEach-Object { CopyNew $_.FullName (Join-Path $campaign "evidence/$name/$($_.Name)") } } }
