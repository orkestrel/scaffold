Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

function Assert-Path([string] $path, [string] $root) {
	$resolved = [System.IO.Path]::GetFullPath($path)
	$prefix = $root + [System.IO.Path]::DirectorySeparatorChar
	if (-not $resolved.StartsWith($prefix, [System.StringComparison]::OrdinalIgnoreCase)) {
		throw "Target escapes recovery workspace: $resolved"
	}
	return $resolved
}

function Assert-Version([string] $path, [string] $name, [string] $expected) {
	$manifest = Get-Content -Raw -LiteralPath $path | ConvertFrom-Json
	if ($manifest.version -ne $expected) {
		throw "Installed $name version is $($manifest.version), expected $expected"
	}
}

function Assert-WrapperHash([string] $path) {
	$expected = 'B65C938A16A410F069166DCD0FF6F9E234354B533D7CA4C4A0BBEE89871F6EC9'
	$actual = (Get-FileHash -Algorithm SHA256 -LiteralPath $path).Hash
	if ($actual -ne $expected) { throw "Journey wrapper hash differs: expected=$expected actual=$actual" }
}

function Invoke-Journey([string] $root, [string] $cache, [string] $mode, [string] $project, [string] $log) {
	if (Test-Path -LiteralPath $cache) {
		throw "Cold cache already exists: $cache"
	}
	$exit = 1
	$prior = $ErrorActionPreference
	Push-Location $root
	try {
		try {
			$ErrorActionPreference = 'Continue'
			& npx.cmd vitest run --config tmp/probe/r-b-final-host/journey-cold-2.config.ts --no-cache --reporter=dot --project $project 2>&1 |
				Tee-Object -FilePath $log |
				Out-Host
			$exit = $LASTEXITCODE
		} finally {
			$ErrorActionPreference = $prior
		}
	} finally {
		Pop-Location
	}
	$content = Get-Content -Raw -LiteralPath $log
	$files = if (Test-Path -LiteralPath $cache) { @(Get-ChildItem -LiteralPath $cache -Recurse -File | ForEach-Object FullName) } else { @() }
	return [pscustomobject]@{ cache = $cache; actual = ''; mode = $mode; project = $project; command = "npx.cmd vitest run --config tmp/probe/r-b-final-host/journey-cold-2.config.ts --no-cache --reporter=dot --project $project"; log = $log; exit = $exit; content = $content; files = $files }
}

function Assert-Refusal($result) {
	if ($result.exit -eq 0 -or -not $result.content.Contains("R-B-COLD-CACHE refused expected=$($result.cache) actual=")) {
		throw "Outer-only control did not refuse the requested cache: $($result.log)"
	}
}

function Assert-Active($result) {
	if ($result.exit -ne 0) { throw "Active cache run failed: $($result.log)" }
	$expression = "R-B-COLD-CACHE active expected=$([regex]::Escape($result.cache)) actual=(?<actual>[^`r`n]+)"
	$marker = [regex]::Match($result.content, $expression)
	if (-not $marker.Success) { throw "Resolved cache marker is absent: $($result.log)" }
	$result.actual = $marker.Groups['actual'].Value
	if ([string]::IsNullOrWhiteSpace($result.actual)) { throw "Resolved cache child is absent: $($result.log)" }
	if ($result.files.Count -eq 0) { throw "Resolved cache has no files: $($result.cache)" }
}

$recovery = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..\recovery'))
$workspace = Assert-Path (Join-Path $recovery 'roughnotes') $recovery
$logs = Assert-Path (Join-Path $workspace 'tmp\units\r-b-cold-host') $workspace
$config = Assert-Path (Join-Path $workspace 'tmp\probe\r-b-final-host\journey-cold-2.config.ts') $workspace
$wrapper = Assert-Path (Join-Path $workspace 'configs\app\vite.journey.config.ts') $workspace
$scaffold = Assert-Path (Join-Path $workspace 'node_modules\@orkestrel\scaffold\package.json') $workspace
$test = Assert-Path (Join-Path $workspace 'node_modules\@orkestrel\test\package.json') $workspace

Assert-Version $scaffold '@orkestrel/scaffold' '0.0.75'
Assert-Version $test '@orkestrel/test' '0.0.18'
Assert-WrapperHash $wrapper
if (-not (Test-Path -LiteralPath $config -PathType Leaf)) { throw "Cold journey config is absent: $config" }
New-Item -ItemType Directory -Path $logs -Force | Out-Null
$identifier = [guid]::NewGuid().ToString('N')
$priorCache = $env:R_B_COLD_CACHE
$priorMode = $env:R_B_COLD_MODE
$results = @()

try {
	Assert-WrapperHash $wrapper
	$controlCache = Assert-Path (Join-Path $workspace "node_modules\.vite-r-b-cold-host-outer-$identifier") $workspace
	$controlLog = Assert-Path (Join-Path $logs "outer-only-control-$identifier.log.txt") $workspace
	$env:R_B_COLD_CACHE = $controlCache
	$env:R_B_COLD_MODE = 'outer-only-control'
	$control = Invoke-Journey $workspace $controlCache $env:R_B_COLD_MODE 'journey:light-1280' $controlLog
	Assert-Refusal $control
	$results += $control

	foreach ($variant in @('light-1280', 'dark-1280', 'light-390', 'dark-390')) {
		Assert-WrapperHash $wrapper
		$cache = Assert-Path (Join-Path $workspace "node_modules\.vite-r-b-cold-host-journey-$variant-$identifier") $workspace
		$log = Assert-Path (Join-Path $logs "journey-$variant-$identifier.log.txt") $workspace
		$env:R_B_COLD_CACHE = $cache
		$env:R_B_COLD_MODE = 'active-cache'
		$result = Invoke-Journey $workspace $cache $env:R_B_COLD_MODE "journey:$variant" $log
		Assert-Active $result
		$results += $result
	}
} finally {
	if ($null -eq $priorCache) { Remove-Item Env:R_B_COLD_CACHE -ErrorAction SilentlyContinue } else { $env:R_B_COLD_CACHE = $priorCache }
	if ($null -eq $priorMode) { Remove-Item Env:R_B_COLD_MODE -ErrorAction SilentlyContinue } else { $env:R_B_COLD_MODE = $priorMode }
}

foreach ($result in $results) {
	Write-Output "MODE=$($result.mode)"
	Write-Output "PROJECT=$($result.project)"
	Write-Output "COMMAND=$($result.command)"
	Write-Output "CACHE=$($result.cache)"
	Write-Output "ACTUAL_CACHE=$($result.actual)"
	Write-Output "LOG=$($result.log)"
	Write-Output "EXIT=$($result.exit)"
	Write-Output "CACHE_FILES=$($result.files -join ';')"
}
