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

function Read-Newline([byte[]] $source) {
	for ($index = 0; $index -lt $source.Length - 1; $index += 1) {
		if ($source[$index] -eq 13 -and $source[$index + 1] -eq 10) {
			return "`r`n"
		}
	}
	for ($index = 0; $index -lt $source.Length; $index += 1) {
		if ($source[$index] -eq 10) {
			return "`n"
		}
	}
	throw 'Source has no line ending'
}

function Assert-ReducedConfig([string] $path) {
	if (-not (Test-Path -LiteralPath $path -PathType Leaf)) {
		throw "Provider-only reduced configuration is absent: $path"
	}
	$content = (Get-Content -Raw -LiteralPath $path).Replace("`r`n", "`n").TrimEnd("`n")
	$expected = @'
import { playwright } from '@vitest/browser-playwright'
import { defineConfig } from 'vitest/config'
import { setupBrowser } from '../../../vite.config.ts'
import { resolveBrowser, resolvePinnedBrowser } from '../../../configs/browsers.ts'

const browser = resolveBrowser(resolvePinnedBrowser(), process.platform, process.env)

export default defineConfig({
	test: {
		projects: [
			setupBrowser({
				test: {
					browser: {
						provider: playwright({
							...browser,
							contextOptions: { reducedMotion: 'reduce' },
						}),
					},
				},
			}),
		],
	},
})
'@.Replace("`r`n", "`n").TrimEnd("`n")
	if ($content -ne $expected) {
		throw "Provider-only reduced configuration differs: $path"
	}
}

function New-ControlLog([string] $directory, [string] $label) {
	New-Item -ItemType Directory -Path $directory -Force | Out-Null
	$stamp = Get-Date -Format 'yyyyMMdd-HHmmssfff'
	$path = Join-Path $directory "$label-$stamp.log.txt"
	if (Test-Path -LiteralPath $path) {
		throw "Control log already exists: $path"
	}
	return $path
}

function Invoke-Npm([string] $root, [string] $log, [string[]] $commandArgs) {
	$exit = 1
	$priorErrorActionPreference = $ErrorActionPreference
	Push-Location $root
	try {
		try {
			$ErrorActionPreference = 'Continue'
			& npm.cmd @commandArgs 2>&1 |
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

function Invoke-Target([string] $root, [string] $log, [string] $project, [string] $title) {
	if ($project -eq 'journey') {
		return Invoke-Npm $root $log @('run', 'test:journey', '--', '--project', 'journey:light-390', '-t', $title)
	}
	if ($project -eq 'setup') {
		return Invoke-Npm $root $log @('run', 'test:setup:browser', '--', '-t', $title)
	}
	if ($project -eq 'setup-reduced') {
		return Invoke-Npm $root $log @('exec', '--', 'vitest', 'run', '--config', 'tmp/probe/r-b-final-host/setup-reduced.config.ts', '--no-cache', '--reporter=dot', '-t', $title)
	}
	throw "Unsupported control project: $project"
}

function Assert-Negative([string] $log, [string] $title, [string[]] $evidence) {
	$content = Get-Content -Raw -LiteralPath $log
	if ($content -match 'No test files found|Tests no tests|Failed to resolve import|Parse error|Cannot find module') {
		throw "Control failed before the collected test: $log"
	}
	$normalizedContent = [regex]::Replace($content, '\s+', ' ')
	$normalizedTitle = [regex]::Replace($title, '\s+', ' ')
	if ($normalizedContent.IndexOf($normalizedTitle, [System.StringComparison]::Ordinal) -lt 0) {
		throw "Control did not report its named test: $title"
	}
	foreach ($text in $evidence) {
		$normalizedEvidence = [regex]::Replace($text, '\s+', ' ')
		if ($normalizedContent.IndexOf($normalizedEvidence, [System.StringComparison]::Ordinal) -lt 0) {
			throw "Control did not report required failure evidence '$text': $log"
		}
	}
}

function Invoke-Control([string] $label, [byte[]] $original, [byte[]] $mutated, [string] $hash, [string] $fixture, [string] $root, [string] $logs, [string] $project, [string] $title, [string[]] $evidence) {
	$negativeLog = New-ControlLog $logs "$label-red"
	$positiveLog = New-ControlLog $logs "$label-green"
	try {
		$current = (Get-FileHash -Algorithm SHA256 -LiteralPath $fixture).Hash
		if ($current -ne $hash) {
			throw "Fixture bytes changed before control: $fixture"
		}
		[System.IO.File]::WriteAllBytes($fixture, $mutated)
		$negative = Invoke-Target $root $negativeLog $project $title
		if ($negative -eq 0) {
			throw "Negative control unexpectedly passed: $label"
		}
		Assert-Negative $negativeLog $title $evidence
	} finally {
		[System.IO.File]::WriteAllBytes($fixture, $original)
		$restored = (Get-FileHash -Algorithm SHA256 -LiteralPath $fixture).Hash
		if ($restored -ne $hash) {
			throw "Fixture restoration changed bytes: $fixture"
		}
	}
	$positive = Invoke-Target $root $positiveLog $project $title
	if ($positive -ne 0) {
		throw "Restored fixture failed: $label=$positive"
	}
	return [pscustomobject]@{ label = $label; negative = $negative; positive = $positive; red = $negativeLog; green = $positiveLog }
}

$workspace = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..\recovery\roughnotes'))
$workspace = Assert-WorkspacePath $workspace ([System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..\recovery')))
$setup = Assert-WorkspacePath (Join-Path $workspace 'tests\setupBrowser.ts') $workspace
$app = Assert-WorkspacePath (Join-Path $workspace 'app\browser\App.vue') $workspace
$logs = Assert-WorkspacePath (Join-Path $workspace 'tmp\units\r-b-controls') $workspace
$reduced = Assert-WorkspacePath (Join-Path $workspace 'tmp\probe\r-b-final-host\setup-reduced.config.ts') $workspace
$scaffold = Assert-WorkspacePath (Join-Path $workspace 'node_modules\@orkestrel\scaffold\package.json') $workspace
$test = Assert-WorkspacePath (Join-Path $workspace 'node_modules\@orkestrel\test\package.json') $workspace
$branch = (& git -C $workspace branch --show-current).Trim()

if ($branch -ne 'recovery/journey-20260918') {
	throw "Recovery checkout is on $branch"
}
Assert-Version $scaffold '@orkestrel/scaffold' '0.0.75'
Assert-Version $test '@orkestrel/test' '0.0.18'
Assert-ReducedConfig $reduced

$encoding = [System.Text.UTF8Encoding]::new($false)
$setupOriginal = [System.IO.File]::ReadAllBytes($setup)
$setupHash = (Get-FileHash -Algorithm SHA256 -LiteralPath $setup).Hash
$appOriginal = [System.IO.File]::ReadAllBytes($app)
$appHash = (Get-FileHash -Algorithm SHA256 -LiteralPath $app).Hash
$setupNewline = Read-Newline $setupOriginal
$appNewline = Read-Newline $appOriginal

$setupMutated = Replace-Bytes $setupOriginal ($encoding.GetBytes("`tawait clickAccessibleWithin(COPY.introduction, 'link', buildName(COPY.started, COPY.introduction))")) ($encoding.GetBytes("`tvoid clickAccessibleWithin$setupNewline`tawait waitForAnimations(document.body)")) 'startSubscription continuation'
$signMutated = Replace-Bytes $appOriginal ($encoding.GetBytes('<template>')) ($encoding.GetBytes("<template>$appNewline`t<button type=""button"">Sign In</button>")) 'App template opening'
$shownMutated = Replace-Bytes $appOriginal ($encoding.GetBytes("`topened.value = true")) ($encoding.GetBytes("`t// Control mutation: opening state update omitted.")) 'onMenuShown state update'
$hiddenMutated = Replace-Bytes $appOriginal ($encoding.GetBytes("`topened.value = false")) ($encoding.GetBytes("`t// Control mutation: closing state update omitted.")) 'onMenuHidden state update'

$journeySubscribe = 'lands on home and reaches subscribe through the content Get started control'
$journeySignIn = 'leaves Sign In absent and keeps live logins as external links'
$setupMenu = 'opens and closes compact navigation and resolves only the modal action'

$results = @()
$results += Invoke-Control 'content-continuation' $setupOriginal $setupMutated $setupHash $setup $workspace $logs 'journey' $journeySubscribe @('the subscribe view paints', 'did not hold within')
$results += Invoke-Control 'sign-in-refusal' $appOriginal $signMutated $appHash $app $workspace $logs 'journey' $journeySignIn @('Sign In', 'undefined')
$results += Invoke-Control 'menu-opened-state' $appOriginal $shownMutated $appHash $app $workspace $logs 'setup' $setupMenu @('expanded')
$results += Invoke-Control 'menu-hidden-state' $appOriginal $hiddenMutated $appHash $app $workspace $logs 'setup' $setupMenu @('collapsed')
$results += Invoke-Control 'menu-opened-state-reduced' $appOriginal $shownMutated $appHash $app $workspace $logs 'setup-reduced' $setupMenu @('expanded')
$results += Invoke-Control 'menu-hidden-state-reduced' $appOriginal $hiddenMutated $appHash $app $workspace $logs 'setup-reduced' $setupMenu @('collapsed')

foreach ($result in $results) {
	Write-Output "$($result.label)_RED_EXIT=$($result.negative)"
	Write-Output "$($result.label)_GREEN_EXIT=$($result.positive)"
	Write-Output "$($result.label)_RED_LOG=$($result.red)"
	Write-Output "$($result.label)_GREEN_LOG=$($result.green)"
}
