$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

$root = [System.IO.Path]::GetFullPath('C:/Users/mikes/WebstormProjects/scaffold')
$pass = Join-Path $root 'tmp/pass'
$units = Join-Path $root 'tmp/units'
$campaign = Join-Path $root '.orkestrel/campaign/docs-parity'
$instruments = Join-Path $campaign 'instruments/d7/guides-extraction'
$evidence = Join-Path $campaign 'evidence'

function Get-FileMap {
	param(
		[string]$Root
	)

	$rootPath = [System.IO.Path]::GetFullPath($Root)
	$rootUri = New-Object System.Uri ($rootPath.TrimEnd([System.IO.Path]::DirectorySeparatorChar, [System.IO.Path]::AltDirectorySeparatorChar) + [System.IO.Path]::DirectorySeparatorChar)
	$files = Get-ChildItem -LiteralPath $Root -File -Recurse | Sort-Object FullName
	$map = @{}
	foreach ($file in $files) {
		$fileUri = New-Object System.Uri ([System.IO.Path]::GetFullPath($file.FullName))
		$relative = [System.Uri]::UnescapeDataString($rootUri.MakeRelativeUri($fileUri).ToString()).Replace('/', [System.IO.Path]::DirectorySeparatorChar)
		$map[$relative] = (Get-FileHash -LiteralPath $file.FullName -Algorithm SHA256).Hash
	}
	return $map
}

function Confirm-File {
	param(
		[string]$Source,
		[string]$Destination
	)

	if (-not (Test-Path -LiteralPath $Source -PathType Leaf)) {
		throw "Missing retention source: $Source"
	}
	if (-not (Test-Path -LiteralPath $Destination -PathType Leaf)) {
		return $false
	}
	$sourceHash = (Get-FileHash -LiteralPath $Source -Algorithm SHA256).Hash
	$destinationHash = (Get-FileHash -LiteralPath $Destination -Algorithm SHA256).Hash
	if ($sourceHash -ne $destinationHash) {
		throw "Retention destination differs: $Destination"
	}
	return $true
}

function Confirm-Directory {
	param(
		[string]$Source,
		[string]$Destination
	)

	if (-not (Test-Path -LiteralPath $Source -PathType Container)) {
		throw "Missing retention source: $Source"
	}
	if (-not (Test-Path -LiteralPath $Destination -PathType Container)) {
		return $false
	}
	$sourceMap = Get-FileMap -Root $Source
	$destinationMap = Get-FileMap -Root $Destination
	if ($sourceMap.Count -ne $destinationMap.Count) {
		throw "Retention destination file set differs: $Destination"
	}
	foreach ($path in $sourceMap.Keys) {
		if (-not $destinationMap.ContainsKey($path) -or $sourceMap[$path] -ne $destinationMap[$path]) {
			throw "Retention destination differs: $Destination"
		}
	}
	return $true
}

function Retain-File {
	param(
		[string]$Source,
		[string]$Destination
	)

	if (Confirm-File -Source $Source -Destination $Destination) {
		return
	}
	New-Item -ItemType Directory -Force -Path (Split-Path -Parent $Destination) | Out-Null
	Copy-Item -LiteralPath $Source -Destination $Destination
	if (-not (Confirm-File -Source $Source -Destination $Destination)) {
		throw "Retention copy did not create: $Destination"
	}
}

function Retain-Directory {
	param(
		[string]$Source,
		[string]$Destination
	)

	if (Confirm-Directory -Source $Source -Destination $Destination) {
		return
	}
	New-Item -ItemType Directory -Force -Path (Split-Path -Parent $Destination) | Out-Null
	Copy-Item -LiteralPath $Source -Destination $Destination -Recurse
	if (-not (Confirm-Directory -Source $Source -Destination $Destination)) {
		throw "Retention copy did not create: $Destination"
	}
}

Retain-File -Source (Join-Path $pass 'guide-server-config.mjs') -Destination (Join-Path $instruments 'guide-server-config-ready.mjs')

foreach ($name in @(
	'd7n-guide-server-config-preview',
	'd7n-guide-server-config-diagnostic',
	'd7n-guide-server-config-ready',
	'd7n-guide-server-config-apply'
)) {
	Retain-Directory -Source (Join-Path $pass $name) -Destination (Join-Path $evidence $name)
}

Retain-File -Source (Join-Path $units 'd7n-guide-server-config-retain-brief.md') -Destination (Join-Path $campaign 'd7n-guide-server-config-retain-brief.md')
Retain-File -Source (Join-Path $units 'd7n-guide-server-config-retain-report.md') -Destination (Join-Path $campaign 'd7n-guide-server-config-retain-report.md')
