Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

function Assert-AuditPath([string] $path, [string] $root) {
	$resolved = [System.IO.Path]::GetFullPath($path)
	$prefix = $root + [System.IO.Path]::DirectorySeparatorChar
	if (-not $resolved.StartsWith($prefix, [System.StringComparison]::OrdinalIgnoreCase)) {
		throw "Target escapes the audit root: $resolved"
	}
	return $resolved
}

function Assert-WorkspacePath([string] $path, [string] $root) {
	$resolved = [System.IO.Path]::GetFullPath($path)
	$prefix = $root + [System.IO.Path]::DirectorySeparatorChar
	if (-not $resolved.StartsWith($prefix, [System.StringComparison]::OrdinalIgnoreCase)) {
		throw "Target escapes the workspace root: $resolved"
	}
	return $resolved
}

function Find-Registration([byte[]] $source, [byte[]] $registration) {
	$positions = [System.Collections.Generic.List[int]]::new()
	for ($index = 0; $index -le $source.Length - $registration.Length; $index += 1) {
		$matches = $true
		for ($offset = 0; $offset -lt $registration.Length; $offset += 1) {
			if ($source[$index + $offset] -ne $registration[$offset]) {
				$matches = $false
				break
			}
		}
		if ($matches) {
			$positions.Add($index)
		}
	}
	if ($positions.Count -ne 1) {
		throw "Expected one fixture registration, found $($positions.Count)"
	}
	return $positions[0]
}

function Replace-Registration([byte[]] $source, [byte[]] $registration, [byte[]] $replacement) {
	$index = Find-Registration $source $registration
	$stream = [System.IO.MemoryStream]::new()
	$stream.Write($source, 0, $index)
	$stream.Write($replacement, 0, $replacement.Length)
	$tail = $index + $registration.Length
	$stream.Write($source, $tail, $source.Length - $tail)
	return $stream.ToArray()
}

$auditRoot = [System.IO.Path]::GetFullPath($PSScriptRoot)
$workspaceRoot = [System.IO.Path]::GetFullPath((Join-Path $auditRoot '..\..'))
$controlRoot = Assert-AuditPath (Join-Path $auditRoot 'setup-vue-control') $auditRoot
$fixture = Assert-AuditPath (Join-Path $controlRoot 'tests\setupServer.ts') $auditRoot
$controlDist = Assert-AuditPath (Join-Path $controlRoot 'dist') $auditRoot
$log = Assert-AuditPath (Join-Path $auditRoot 'setup-vue-skipped-control.log.txt') $auditRoot
$releaseDist = Assert-WorkspacePath (Join-Path $workspaceRoot 'tmp\release\scaffold-0.0.75\dist') $workspaceRoot
$registration = "it('renders the Vue component through the browser setup helper', () => {"
$replacement = "it.skip('renders the Vue component through the browser setup helper', () => {"
$encoding = [System.Text.UTF8Encoding]::new($false)
$original = $null
$hash = $null
$child = 1

if (-not (Test-Path -LiteralPath $controlRoot -PathType Container)) {
	throw "Control checkout is absent: $controlRoot"
}
if (-not (Test-Path -LiteralPath $fixture -PathType Leaf)) {
	throw "Fixture is absent: $fixture"
}
if (-not (Test-Path -LiteralPath $releaseDist -PathType Container)) {
	throw "Built release dist is absent: $releaseDist"
}

try {
	if (-not (Test-Path -LiteralPath $controlDist -PathType Container)) {
		New-Item -ItemType Directory -Path $controlDist | Out-Null
	}
	Get-ChildItem -LiteralPath $releaseDist -Force | Copy-Item -Destination $controlDist -Recurse -Force
	$original = [System.IO.File]::ReadAllBytes($fixture)
	$hash = (Get-FileHash -Algorithm SHA256 -LiteralPath $fixture).Hash
	$mutated = Replace-Registration $original ($encoding.GetBytes($registration)) ($encoding.GetBytes($replacement))
	[System.IO.File]::WriteAllBytes($fixture, $mutated)
	Push-Location $controlRoot
	try {
		$priorErrorActionPreference = $ErrorActionPreference
		try {
			$ErrorActionPreference = 'Continue'
			& npm.cmd run test:distribution -- --mode release tests/distribution.test.ts -t 'renders a Vue SFC through the generated browser setup project' 2>&1 |
				Tee-Object -FilePath $log |
				Out-Host
			$child = $LASTEXITCODE
		} finally {
			$ErrorActionPreference = $priorErrorActionPreference
		}
	} finally {
		Pop-Location
	}
} finally {
	if ($null -ne $original) {
		[System.IO.File]::WriteAllBytes($fixture, $original)
		$restored = (Get-FileHash -Algorithm SHA256 -LiteralPath $fixture).Hash
		if ($restored -ne $hash) {
			throw "Fixture restoration changed bytes: $fixture"
		}
	}
}

Write-Output "CHILD_EXIT=$child"
exit $child
