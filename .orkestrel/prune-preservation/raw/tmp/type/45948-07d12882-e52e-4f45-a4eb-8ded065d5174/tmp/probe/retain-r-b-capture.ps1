Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$sourceRoot = 'C:\Users\mikes\WebstormProjects\scaffold\tmp\recovery\roughnotes'
$destination = 'C:\Users\mikes\WebstormProjects\scaffold\tmp\capture-retained\r-b-final-capture'
$variants = @('light-1280', 'dark-1280', 'light-390', 'dark-390')
$signature = [byte[]](137, 80, 78, 71, 13, 10, 26, 10)

function Require-Path {
	param(
		[string] $Path,
		[string] $Label
	)

	if (-not (Test-Path -LiteralPath $Path)) {
		throw "$Label is missing: $Path"
	}

	return (Resolve-Path -LiteralPath $Path -ErrorAction Stop).Path
}

function Require-Child {
	param(
		[string] $Root,
		[string] $Path,
		[string] $Label
	)

	$resolved = Require-Path -Path $Path -Label $Label
	$prefix = $Root.TrimEnd([System.IO.Path]::DirectorySeparatorChar) + [System.IO.Path]::DirectorySeparatorChar
	if (-not $resolved.StartsWith($prefix, [System.StringComparison]::OrdinalIgnoreCase)) {
		throw "$Label resolves outside its root: $resolved"
	}

	return $resolved
}

function Read-Png {
	param([string] $Path)

	$contents = [System.IO.File]::ReadAllBytes($Path)
	if ($contents.Length -lt 24) {
		throw "PNG is too short: $Path"
	}

	for ($index = 0; $index -lt $signature.Length; $index += 1) {
		if ($contents[$index] -ne $signature[$index]) {
			throw "PNG signature is invalid: $Path"
		}
	}

	$chunk = [System.Text.Encoding]::ASCII.GetString($contents, 12, 4)
	if ($chunk -ne 'IHDR') {
		throw "PNG IHDR is missing: $Path"
	}

	$width = ([int]$contents[16] -shl 24) -bor ([int]$contents[17] -shl 16) -bor ([int]$contents[18] -shl 8) -bor [int]$contents[19]
	$height = ([int]$contents[20] -shl 24) -bor ([int]$contents[21] -shl 16) -bor ([int]$contents[22] -shl 8) -bor [int]$contents[23]
	if ($width -le 0 -or $height -le 0) {
		throw "PNG dimensions are invalid: $Path"
	}

	return [ordered]@{
		width = $width
		height = $height
	}
}

function Get-Digest {
	param([string] $Path)

	return (Get-FileHash -LiteralPath $Path -Algorithm SHA256).Hash.ToLowerInvariant()
}

function Copy-Evidence {
	param(
		[string] $Source,
		[string] $Target
	)

	$parent = Split-Path -Parent $Target
	New-Item -ItemType Directory -Path $parent -Force | Out-Null
	Copy-Item -LiteralPath $Source -Destination $Target -ErrorAction Stop
	if ((Get-Digest -Path $Source) -ne (Get-Digest -Path $Target)) {
		throw "Copied bytes differ: $Source"
	}
}

$sourceRoot = Require-Path -Path $sourceRoot -Label 'Source root'
if (Test-Path -LiteralPath $destination) {
	throw "Destination already exists: $destination"
}

$workspaceTmp = Require-Path -Path 'C:\Users\mikes\WebstormProjects\scaffold\tmp' -Label 'Workspace temporary root'
$destination = [System.IO.Path]::GetFullPath($destination)
$destinationPrefix = $workspaceTmp.TrimEnd([System.IO.Path]::DirectorySeparatorChar) + [System.IO.Path]::DirectorySeparatorChar
if (-not $destination.StartsWith($destinationPrefix, [System.StringComparison]::OrdinalIgnoreCase)) {
	throw "Destination resolves outside the workspace temporary root: $destination"
}
$states = Require-Child -Root $sourceRoot -Path (Join-Path $sourceRoot 'tmp\capture\states') -Label 'Capture states'
$journeys = Require-Child -Root $sourceRoot -Path (Join-Path $sourceRoot 'tmp\journeys') -Label 'Journey records'
$log = Require-Child -Root $sourceRoot -Path (Join-Path $sourceRoot 'tmp\units\r-b-final-capture.log.txt') -Label 'Capture log'
$frames = @(Get-ChildItem -LiteralPath $states -File -Filter '*.png' | Sort-Object Name)
$journeyFiles = @(Get-ChildItem -LiteralPath $journeys -File -Filter '*.txt' | Sort-Object Name)
if ($frames.Count -eq 0) {
	throw "Capture states contain no PNG frames: $states"
}

if ($journeyFiles.Count -eq 0) {
	throw "Journey records contain no text files: $journeys"
}

$frameVariants = @{}
foreach ($variant in $variants) {
	$frameVariants[$variant] = $false
	$journey = Require-Child -Root $sourceRoot -Path (Join-Path $journeys "$variant.txt") -Label "Journey record $variant"
	$text = [System.IO.File]::ReadAllText($journey)
	if ($text -notmatch '(?m)^capturing:\s*true\s*$') {
		throw "Journey record does not state capturing: true: $journey"
	}
}

foreach ($frame in $frames) {
	$matched = $false
	foreach ($variant in $variants) {
		if ($frame.Name.EndsWith("--$variant.png", [System.StringComparison]::Ordinal)) {
			$frameVariants[$variant] = $true
			$matched = $true
			break
		}
	}

	if (-not $matched) {
		throw "Frame has no recognized variant suffix: $($frame.Name)"
	}
}

foreach ($variant in $variants) {
	if (-not $frameVariants[$variant]) {
		throw "Capture states contain no frame for variant: $variant"
	}

	$navigation = Join-Path $states "navigation--$variant.png"
	Require-Path -Path $navigation -Label "Navigation frame $variant" | Out-Null
}

New-Item -ItemType Directory -Path $destination -ErrorAction Stop | Out-Null
$destination = Require-Path -Path $destination -Label 'Destination'
$inventory = @()
foreach ($frame in $frames) {
	$reading = Read-Png -Path $frame.FullName
	$target = Join-Path $destination (Join-Path 'tmp\capture\states' $frame.Name)
	Copy-Evidence -Source $frame.FullName -Target $target
	$inventory += [ordered]@{
		basename = $frame.Name
		width = $reading.width
		height = $reading.height
		bytes = $frame.Length
		source = Get-Digest -Path $frame.FullName
		copy = Get-Digest -Path $target
	}
}

foreach ($journey in $journeyFiles) {
	$target = Join-Path $destination (Join-Path 'tmp\journeys' $journey.Name)
	Copy-Evidence -Source $journey.FullName -Target $target
}

$logTarget = Join-Path $destination 'tmp\units\r-b-final-capture.log.txt'
Copy-Evidence -Source $log -Target $logTarget
$inventoryPath = Join-Path $destination 'inventory.json'
@{
	frames = $inventory
} | ConvertTo-Json -Depth 4 | Set-Content -LiteralPath $inventoryPath -Encoding utf8

$readmePath = Join-Path $destination 'README.md'
@"
# Roughnotes capture evidence

This retained evidence came from the journey capture command `$env:CAPTURE='1'; npm.cmd run test:journey` with the prior environment restored. The collected process exit was 0. The reporter recorded 176 passed, a duration of 65.93s, and a start time of 12:18:31 on 2026-09-18.

See [the inventory](inventory.json), [the journey records](tmp/journeys/), [the screenshots](tmp/capture/states/), and [the run log](tmp/units/r-b-final-capture.log.txt). Screenshots use full-page dimensions and do not alone prove the configured viewport height. Only metadata, reports, and the instrument will later be retained in the campaign commit. The PNG portfolio remains outside version control.
"@ | Set-Content -LiteralPath $readmePath -Encoding utf8
