Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

function Assert-WorkspacePath([string] $path, [string] $root) {
	$resolved = [System.IO.Path]::GetFullPath($path)
	$prefix = $root + [System.IO.Path]::DirectorySeparatorChar
	if (-not $resolved.StartsWith($prefix, [System.StringComparison]::OrdinalIgnoreCase)) {
		throw "Target escapes the recovery workspace: $resolved"
	}
	return $resolved
}

function Assert-Version([string] $path, [string] $name, [string] $expected) {
	if (-not (Test-Path -LiteralPath $path -PathType Leaf)) {
		throw "Installed $name manifest is absent: $path"
	}
	$manifest = Get-Content -Raw -LiteralPath $path | ConvertFrom-Json
	if ($manifest.version -ne $expected) {
		throw "Installed $name version is $($manifest.version), expected $expected"
	}
}

function Invoke-ColdRun([string] $root, [string] $cache, [string] $log, [string[]] $commandArgs) {
	$absent = -not (Test-Path -LiteralPath $cache)
	if (-not $absent) {
		throw "Cold cache already exists: $cache"
	}
	$priorErrorActionPreference = $ErrorActionPreference
	$exit = 1
	Push-Location $root
	try {
		try {
			$ErrorActionPreference = 'Continue'
			& npx.cmd vitest @commandArgs 2>&1 |
				Tee-Object -FilePath $log |
				Out-Host
			$exit = $LASTEXITCODE
		} finally {
			$ErrorActionPreference = $priorErrorActionPreference
		}
	} finally {
		Pop-Location
	}
	$contents = if (Test-Path -LiteralPath $cache) {
		Get-ChildItem -LiteralPath $cache -Force -Recurse | ForEach-Object { $_.FullName }
	} else {
		@()
	}
	return [pscustomobject]@{ cache = $cache; log = $log; absent = $absent; command = "npx.cmd vitest $($commandArgs -join ' ')"; exit = $exit; contents = $contents }
}

$recoveryRoot = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..\recovery'))
$workspace = Assert-WorkspacePath (Join-Path $recoveryRoot 'roughnotes') $recoveryRoot
$probe = Assert-WorkspacePath (Join-Path $workspace 'tmp\probe\r-b-final-host') $workspace
$logs = Assert-WorkspacePath (Join-Path $workspace 'tmp\units\r-b-cold-host') $workspace
$appConfig = Assert-WorkspacePath (Join-Path $probe 'app-browser-cold.config.ts') $workspace
$journeyConfig = Assert-WorkspacePath (Join-Path $probe 'journey-cold.config.ts') $workspace
$scaffold = Assert-WorkspacePath (Join-Path $workspace 'node_modules\@orkestrel\scaffold\package.json') $workspace
$test = Assert-WorkspacePath (Join-Path $workspace 'node_modules\@orkestrel\test\package.json') $workspace

if (-not (Test-Path -LiteralPath $workspace -PathType Container)) {
	throw "Recovery checkout is absent: $workspace"
}
if (-not (Test-Path -LiteralPath $appConfig -PathType Leaf) -or -not (Test-Path -LiteralPath $journeyConfig -PathType Leaf)) {
	throw 'Cold-host configuration is absent'
}
Assert-Version $scaffold '@orkestrel/scaffold' '0.0.75'
Assert-Version $test '@orkestrel/test' '0.0.18'

New-Item -ItemType Directory -Path $logs -Force | Out-Null
$identifier = [guid]::NewGuid().ToString('N')
$priorCache = $env:R_B_COLD_CACHE
$results = @()

try {
	$cache = Assert-WorkspacePath (Join-Path $workspace "node_modules\.vite-r-b-cold-host-app-$identifier") $workspace
	$log = Assert-WorkspacePath (Join-Path $logs "app-browser-$identifier.log.txt") $workspace
	$env:R_B_COLD_CACHE = $cache
	$results += Invoke-ColdRun $workspace $cache $log @('run', '--config', 'tmp/probe/r-b-final-host/app-browser-cold.config.ts', '--no-cache', '--reporter=dot', '--project', 'app:browser')

	foreach ($variant in @('light-1280', 'dark-1280', 'light-390', 'dark-390')) {
		$cache = Assert-WorkspacePath (Join-Path $workspace "node_modules\.vite-r-b-cold-host-journey-$variant-$identifier") $workspace
		$log = Assert-WorkspacePath (Join-Path $logs "journey-$variant-$identifier.log.txt") $workspace
		$env:R_B_COLD_CACHE = $cache
		$results += Invoke-ColdRun $workspace $cache $log @('run', '--config', 'tmp/probe/r-b-final-host/journey-cold.config.ts', '--no-cache', '--reporter=dot', '--project', "journey:$variant")
	}
} finally {
	if ($null -eq $priorCache) {
		Remove-Item Env:R_B_COLD_CACHE -ErrorAction SilentlyContinue
	} else {
		$env:R_B_COLD_CACHE = $priorCache
	}
}

foreach ($result in $results) {
	Write-Output "CACHE=$($result.cache)"
	Write-Output "ABSENT_BEFORE_LAUNCH=$($result.absent)"
	Write-Output "COMMAND=$($result.command)"
	Write-Output "COMMAND_LOG=$($result.log)"
	Write-Output "EXIT=$($result.exit)"
	Write-Output "CACHE_CONTENTS=$($result.contents -join ';')"
}

if ($null -ne ($results | Where-Object { $_.exit -ne 0 })) {
	throw 'A cold-host command failed'
}
