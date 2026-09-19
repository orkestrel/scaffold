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

function Find-Bytes([byte[]] $source, [byte[]] $target, [string] $label) {
	$positions = [System.Collections.Generic.List[int]]::new()
	for ($index = 0; $index -le $source.Length - $target.Length; $index += 1) {
		$matches = $true
		for ($offset = 0; $offset -lt $target.Length; $offset += 1) {
			if ($source[$index + $offset] -ne $target[$offset]) {
				$matches = $false
				break
			}
		}
		if ($matches) {
			$positions.Add($index)
		}
	}
	if ($positions.Count -ne 1) {
		throw "Expected one $label occurrence, found $($positions.Count)"
	}
	return $positions[0]
}

function Replace-Bytes([byte[]] $source, [byte[]] $target, [byte[]] $replacement, [string] $label) {
	$index = Find-Bytes $source $target $label
	$stream = [System.IO.MemoryStream]::new()
	$stream.Write($source, 0, $index)
	$stream.Write($replacement, 0, $replacement.Length)
	$tail = $index + $target.Length
	$stream.Write($source, $tail, $source.Length - $tail)
	return $stream.ToArray()
}

function Invoke-Distribution([string] $control, [string] $root, [string] $log) {
	$exit = 1
	$priorErrorActionPreference = $ErrorActionPreference
	Push-Location $root
	try {
		try {
			$ErrorActionPreference = 'Continue'
			& npm.cmd run test:distribution -- --mode release tests/distribution.test.ts -t 'renders a Vue SFC through the generated browser setup project' 2>&1 |
				Tee-Object -FilePath $log |
				Out-Host
			$exit = $LASTEXITCODE
		} finally {
			$ErrorActionPreference = $priorErrorActionPreference
		}
	} finally {
		Pop-Location
	}
	return $exit
}

function Invoke-Control([string] $control, [byte[]] $mutated, [byte[]] $original, [string] $hash, [string] $fixture, [string] $root, [string] $log) {
	try {
		[System.IO.File]::WriteAllBytes($fixture, $mutated)
		$exit = Invoke-Distribution $control $root $log
		if ($exit -eq 0) {
			throw "Control unexpectedly passed: $control"
		}
		return $exit
	} finally {
		[System.IO.File]::WriteAllBytes($fixture, $original)
		$restored = (Get-FileHash -Algorithm SHA256 -LiteralPath $fixture).Hash
		if ($restored -ne $hash) {
			throw "Fixture restoration changed bytes: $fixture"
		}
	}
}

$auditRoot = [System.IO.Path]::GetFullPath($PSScriptRoot)
$controlRoot = Assert-AuditPath (Join-Path $auditRoot 'setup-vue-control') $auditRoot
$fixture = Assert-AuditPath (Join-Path $controlRoot 'tests\setupServer.ts') $auditRoot
$todoLog = Assert-AuditPath (Join-Path $auditRoot 'setup-vue-todo-control.log.txt') $auditRoot
$absentLog = Assert-AuditPath (Join-Path $auditRoot 'setup-vue-absent-control.log.txt') $auditRoot
$failedLog = Assert-AuditPath (Join-Path $auditRoot 'setup-vue-failed-control.log.txt') $auditRoot
$restoredLog = Assert-AuditPath (Join-Path $auditRoot 'setup-vue-restored-control.log.txt') $auditRoot
$encoding = [System.Text.UTF8Encoding]::new($false)
$registration = "it('renders the Vue component through the browser setup helper', () => {"
$todo = "it.todo('renders the Vue component through the browser setup helper', () => {"
$title = 'renders the Vue component through the browser setup helper'
$absent = 'a different generated component proof'
$expected = "expect(container.querySelector('p')?.dataset.setup).toBe('vue')"
$failed = "expect(container.querySelector('p')?.dataset.setup).toBe('wrong')"

if (-not (Test-Path -LiteralPath $controlRoot -PathType Container)) {
	throw "Control checkout is absent: $controlRoot"
}
if (-not (Test-Path -LiteralPath $fixture -PathType Leaf)) {
	throw "Fixture is absent: $fixture"
}

$original = [System.IO.File]::ReadAllBytes($fixture)
$hash = (Get-FileHash -Algorithm SHA256 -LiteralPath $fixture).Hash
$todoBytes = Replace-Bytes $original ($encoding.GetBytes($registration)) ($encoding.GetBytes($todo)) 'todo registration'
$absentBytes = Replace-Bytes $original ($encoding.GetBytes($title)) ($encoding.GetBytes($absent)) 'registration title'
$failedBytes = Replace-Bytes $original ($encoding.GetBytes($expected)) ($encoding.GetBytes($failed)) 'fixture expectation'

$todoExit = Invoke-Control 'TODO_EXIT' $todoBytes $original $hash $fixture $controlRoot $todoLog
$absentExit = Invoke-Control 'ABSENT_EXIT' $absentBytes $original $hash $fixture $controlRoot $absentLog
$failedExit = Invoke-Control 'FAILED_EXIT' $failedBytes $original $hash $fixture $controlRoot $failedLog
$restoredExit = Invoke-Distribution 'RESTORED_EXIT' $controlRoot $restoredLog
if ($restoredExit -ne 0) {
	throw "Restored fixture failed: $restoredExit"
}

Write-Output "TODO_EXIT=$todoExit"
Write-Output "ABSENT_EXIT=$absentExit"
Write-Output "FAILED_EXIT=$failedExit"
Write-Output "RESTORED_EXIT=$restoredExit"
