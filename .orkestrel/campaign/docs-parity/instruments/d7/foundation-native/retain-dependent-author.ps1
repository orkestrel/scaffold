param(
	[Parameter(Mandatory = $true)]
	[ValidateSet('mcp', 'program', 'workflow')]
	[string]$Package
)

$ErrorActionPreference = 'Stop'
$fleet = 'C:/Users/mikes/WebstormProjects'
$unit = "d7n-$Package-dependent-fix"
$source = Join-Path (Join-Path $fleet $Package) "tmp/$unit"
$campaign = Join-Path $fleet 'scaffold/.orkestrel/campaign/docs-parity'
if (-not (Test-Path -LiteralPath $source -PathType Container)) {
	throw "Author evidence is absent: $source"
}
foreach ($file in Get-ChildItem -LiteralPath $source -File) {
	if ($file.Extension -in '.sh', '.mjs', '.ts') {
		$destination = Join-Path $campaign "instruments/d7/foundation-native/$unit/$($file.Name)"
	} elseif ($file.Extension -in '.txt', '.json', '.sha256', '.patch') {
		$destination = Join-Path $campaign "evidence/$unit/$($file.Name)"
	} else {
		throw "Unexpected author evidence format: $($file.Name)"
	}
	if (Test-Path -LiteralPath $destination) {
		if ((Get-FileHash -LiteralPath $file.FullName -Algorithm SHA256).Hash -ne (Get-FileHash -LiteralPath $destination -Algorithm SHA256).Hash) {
			throw "Retained author evidence differs: $destination"
		}
		continue
	}
	New-Item -ItemType Directory -Path (Split-Path -Parent $destination) -Force | Out-Null
	Copy-Item -LiteralPath $file.FullName -Destination $destination
}
