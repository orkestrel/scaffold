param(
	[Parameter(Mandatory = $true)]
	[ValidateSet('Units', 'Instruments', 'Evidence', 'Pack')]
	[string]$Kind,
	[Parameter(Mandatory = $true)]
	[string[]]$Names
)

$ErrorActionPreference = 'Stop'
$scaffold = 'C:/Users/mikes/WebstormProjects/scaffold'
$pass = Join-Path $scaffold 'tmp/pass'
$units = Join-Path $scaffold 'tmp/units'
$campaign = Join-Path $scaffold '.orkestrel/campaign/docs-parity'

function Fail([string]$Message) {
	throw $Message
}

function AssertName([string]$Name) {
	if ($Name -notmatch '^[A-Za-z0-9][A-Za-z0-9._-]*$' -or $Name -match '^\.+$') {
		Fail "unsafe name: $Name"
	}
}

function CopyNew([string]$Source, [string]$Destination) {
	if (Test-Path -LiteralPath $Destination) {
		if ((Get-FileHash -LiteralPath $Source -Algorithm SHA256).Hash -ne (Get-FileHash -LiteralPath $Destination -Algorithm SHA256).Hash) {
			Fail "retained record differs: $Destination"
		}
		return
	}
	New-Item -ItemType Directory -Path (Split-Path -Parent $Destination) -Force | Out-Null
	Copy-Item -LiteralPath $Source -Destination $Destination
}

if ($Names.Count -eq 0) {
	Fail 'Names is required.'
}

foreach ($name in $Names) {
	AssertName $name
	if ($Kind -eq 'Units') {
		CopyNew (Join-Path $units $name) (Join-Path $campaign $name)
	}
	if ($Kind -eq 'Instruments') {
		CopyNew (Join-Path $pass $name) (Join-Path $campaign "instruments/d7/foundation-native/$name")
	}
	if ($Kind -eq 'Evidence') {
		$source = Join-Path $pass $name
		if (-not (Test-Path -LiteralPath $source -PathType Container)) { Fail "evidence source absent: $name" }
		Get-ChildItem -LiteralPath $source -File -Recurse | Where-Object { $_.Extension -in '.txt', '.json', '.sha256', '.patch' } | ForEach-Object {
			$relative = $_.FullName.Substring($source.Length).TrimStart([System.IO.Path]::DirectorySeparatorChar, [System.IO.Path]::AltDirectorySeparatorChar)
			CopyNew $_.FullName (Join-Path $campaign "evidence/$name/$relative")
		}
	}
	if ($Kind -eq 'Pack') {
		$source = Join-Path $pass "packed/$name"
		if (-not (Test-Path -LiteralPath $source -PathType Container)) { Fail "pack source absent: $name" }
		Get-ChildItem -LiteralPath $source -File | Where-Object { $_.Extension -in '.txt', '.sha256' } | ForEach-Object {
			CopyNew $_.FullName (Join-Path $campaign "evidence/$name/$($_.Name)")
		}
	}
}
