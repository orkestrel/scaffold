param(
	[Parameter(Mandatory = $true)][string]$Snapshot,
	[Parameter(Mandatory = $true)][string]$Output
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

function ReadJson([string]$Path) {
	return Get-Content -LiteralPath $Path -Raw | ConvertFrom-Json
}

function ReadText([string]$Path) {
	$value = Get-Content -LiteralPath $Path -Raw
	if ($null -eq $value) { return '' }
	return $value.Trim()
}

function ReadProperty([object]$Value, [string]$Name) {
	$property = $Value.PSObject.Properties[$Name]
	if ($null -eq $property) { return $null }
	return $property.Value
}

function FindRegistry([object]$Registry, [string]$Name) {
	foreach ($item in @($Registry)) {
		if ((ReadProperty $item 'name') -eq ('@orkestrel/' + $Name)) {
			$latest = ReadProperty (ReadProperty $item 'dist-tags') 'latest'
			if ($null -eq $latest) { throw ('registry latest absent: ' + $Name) }
			return $latest
		}
	}
	throw ('registry package absent: ' + $Name)
}

$allowed = @('console', 'database', 'form', 'markdown', 'pool', 'process', 'reason', 'router', 'table', 'template', 'websocket')
$result = [ordered]@{}
foreach ($name in $allowed) {
	$folder = Join-Path $Snapshot $name
	$manifest = ReadJson (Join-Path $folder 'package.json')
	$registry = ReadJson (Join-Path $Snapshot ('registry-' + $name + '.stdout.txt'))
	$result[$name] = [ordered]@{
		head = ReadText (Join-Path $folder 'head.txt')
		origin = ReadText (Join-Path $folder 'origin-main.txt')
		branch = ReadText (Join-Path $folder 'branch.txt')
		status = ReadText (Join-Path $folder 'status.txt')
		ancestry = ReadText (Join-Path $folder 'ancestry.exit.txt')
		version = ReadProperty $manifest 'version'
		latest = FindRegistry $registry $name
		dependencies = ReadProperty $manifest 'dependencies'
		development = ReadProperty $manifest 'devDependencies'
		peers = ReadProperty $manifest 'peerDependencies'
		optional = ReadProperty $manifest 'optionalDependencies'
	}
}

$parent = Split-Path -Parent $Output
if (-not (Test-Path -LiteralPath $parent -PathType Container)) { throw 'Output parent does not exist.' }
if (Test-Path -LiteralPath $Output) { throw 'Summary output already exists.' }
[System.IO.File]::WriteAllText($Output, (($result | ConvertTo-Json -Depth 20 -Compress) + [Environment]::NewLine), [System.Text.UTF8Encoding]::new($false))
