Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

function Assert-RecoveryPath([string] $path, [string] $root) {
	$resolved = [System.IO.Path]::GetFullPath($path)
	$prefix = $root + [System.IO.Path]::DirectorySeparatorChar
	if (-not $resolved.StartsWith($prefix, [System.StringComparison]::OrdinalIgnoreCase)) {
		throw "Target escapes the recovery checkout: $resolved"
	}
	return $resolved
}

function Find-Call([byte[]] $source, [byte[]] $call) {
	$positions = [System.Collections.Generic.List[int]]::new()
	for ($index = 0; $index -le $source.Length - $call.Length; $index += 1) {
		$matches = $true
		for ($offset = 0; $offset -lt $call.Length; $offset += 1) {
			if ($source[$index + $offset] -ne $call[$offset]) {
				$matches = $false
				break
			}
		}
		if ($matches) {
			$positions.Add($index)
		}
	}
	if ($positions.Count -ne 1) {
		throw "Expected one createApp mount call, found $($positions.Count)"
	}
	return $positions[0]
}

function Replace-Call([byte[]] $source, [byte[]] $call, [byte[]] $replacement) {
	$index = Find-Call $source $call
	$stream = [System.IO.MemoryStream]::new()
	$stream.Write($source, 0, $index)
	$stream.Write($replacement, 0, $replacement.Length)
	$tail = $index + $call.Length
	$stream.Write($source, $tail, $source.Length - $tail)
	return $stream.ToArray()
}

function Copy-Retained([string] $source, [string] $destination) {
	if (Test-Path -LiteralPath $destination) {
		throw "Retained artifact already exists: $destination"
	}
	Copy-Item -LiteralPath $source -Destination $destination
}

function Invoke-Client([string] $root, [string] $client, [string] $log) {
	$exit = 1
	$priorErrorActionPreference = $ErrorActionPreference
	Push-Location $root
	try {
		try {
			$ErrorActionPreference = 'Continue'
			& node $client 'http://127.0.0.1:5197/' plain 2>&1 |
				Tee-Object -FilePath $log |
				Out-Host
			$exit = $LASTEXITCODE
		} finally {
			$ErrorActionPreference = $priorErrorActionPreference
		}
		return $exit
	} finally {
		Pop-Location
	}
}

$probeRoot = [System.IO.Path]::GetFullPath($PSScriptRoot)
$recoveryRoot = [System.IO.Path]::GetFullPath((Join-Path $probeRoot '..\recovery\roughnotes'))
$plain = Assert-RecoveryPath (Join-Path $recoveryRoot 'tmp\probe\r-b-cold\plain') $recoveryRoot
$main = Assert-RecoveryPath (Join-Path $recoveryRoot 'app\browser\main.ts') $recoveryRoot
$client = Assert-RecoveryPath (Join-Path $recoveryRoot 'tmp\probe\r-b-cold\client.mjs') $recoveryRoot
$report = Assert-RecoveryPath (Join-Path $plain 'report.json') $recoveryRoot
$arrival = Assert-RecoveryPath (Join-Path $plain 'arrival.png') $recoveryRoot
$products = Assert-RecoveryPath (Join-Path $plain 'products.png') $recoveryRoot
$positive = Assert-RecoveryPath (Join-Path $plain 'positive-report.json') $recoveryRoot
$positiveArrival = Assert-RecoveryPath (Join-Path $plain 'positive-arrival.png') $recoveryRoot
$positiveProducts = Assert-RecoveryPath (Join-Path $plain 'positive-products.png') $recoveryRoot
$controlLog = Assert-RecoveryPath (Join-Path $plain 'entry-control.log.txt') $recoveryRoot
$controlReport = Assert-RecoveryPath (Join-Path $plain 'entry-control-report.json') $recoveryRoot
$restoredLog = Assert-RecoveryPath (Join-Path $plain 'restored.log.txt') $recoveryRoot
$call = 'createApp(App).mount(''#app'')'
$comment = '// Mount omitted by cold entry control.'
$encoding = [System.Text.UTF8Encoding]::new($false)
$original = $null
$hash = $null
$controlExit = 1
$restoredExit = 1

foreach ($path in @($recoveryRoot, $plain, $main, $client, $report, $arrival, $products)) {
	if (-not (Test-Path -LiteralPath $path)) {
		throw "Required target is absent: $path"
	}
}

Copy-Retained $report $positive
Copy-Retained $arrival $positiveArrival
Copy-Retained $products $positiveProducts

try {
	$original = [System.IO.File]::ReadAllBytes($main)
	$hash = (Get-FileHash -Algorithm SHA256 -LiteralPath $main).Hash
	$mutated = Replace-Call $original ($encoding.GetBytes($call)) ($encoding.GetBytes($comment))
	[System.IO.File]::WriteAllBytes($main, $mutated)
	$controlExit = Invoke-Client $recoveryRoot $client $controlLog
	Copy-Item -LiteralPath $report -Destination $controlReport -Force
} finally {
	if ($null -ne $original) {
		[System.IO.File]::WriteAllBytes($main, $original)
		$restored = (Get-FileHash -Algorithm SHA256 -LiteralPath $main).Hash
		if ($restored -ne $hash) {
			throw "Main restoration changed bytes: $main"
		}
	}
}

$restoredExit = Invoke-Client $recoveryRoot $client $restoredLog
Write-Output "CONTROL_EXIT=$controlExit"
Write-Output "RESTORED_EXIT=$restoredExit"
if ($controlExit -eq 0) {
	throw 'The entry-control client passed after the mount was omitted'
}
if ($restoredExit -ne 0) {
	throw 'The restored client did not pass'
}
