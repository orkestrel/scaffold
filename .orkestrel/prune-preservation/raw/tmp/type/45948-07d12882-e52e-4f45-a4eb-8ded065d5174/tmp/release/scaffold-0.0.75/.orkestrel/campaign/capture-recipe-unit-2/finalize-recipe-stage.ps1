$ErrorActionPreference = 'Stop'
$PSNativeCommandUseErrorActionPreference = $false
Set-StrictMode -Version Latest

$canonical = 'C:\Users\mikes\WebstormProjects\scaffold'
$candidate = 'C:\Users\mikes\WebstormProjects\scaffold\tmp\release\scaffold-0.0.75'
$expectedHead = 'c50efef0f741caafe1a80c1ef9ee4004f8be0f2b'
$unit = '.orkestrel/campaign/capture-recipe-unit-2'
$unitPath = Join-Path -Path $candidate -ChildPath $unit
$frozen = Join-Path -Path $candidate -ChildPath 'tmp\units\capture-recipe-evidence-3\frozen-hashes.tsv'
$sourcePaths = @(
    '.agents/skills/orkestrel-prove-journey/SKILL.md',
    '.agents/skills/orkestrel-prove-journey/references/captures.md',
    'host.json'
)

function Get-Digest {
    param([string]$Path)

    return (Get-FileHash -LiteralPath $Path -Algorithm SHA256).Hash.ToLowerInvariant()
}

function Require-File {
    param([string]$Path)

    if (-not (Test-Path -LiteralPath $Path -PathType Leaf)) {
        throw "The required file is missing: $Path"
    }
}

function Copy-Exact {
    param(
        [string]$Source,
        [string]$Destination
    )

    Require-File -Path $Source
    if (Test-Path -LiteralPath $Destination) {
        throw "The completion destination exists: $Destination"
    }

    [System.IO.File]::Copy($Source, $Destination, $false)
    if ((Get-Digest -Path $Source) -ne (Get-Digest -Path $Destination)) {
        throw "The completion copy changed bytes: $Destination"
    }
}

function Invoke-GitText {
    param([string[]]$Arguments)

    $result = @(& git @Arguments)
    if ($LASTEXITCODE -ne 0) {
        throw "Git failed: git $($Arguments -join ' ')"
    }

    return $result
}

if ((Resolve-Path -LiteralPath $candidate).Path -ne $candidate) {
    throw "The candidate root does not resolve to $candidate."
}

Set-Location -LiteralPath $candidate
$head = (Invoke-GitText -Arguments @('rev-parse', 'HEAD')).Trim()
if ($head -ne $expectedHead) {
    throw "Expected candidate HEAD $expectedHead, received $head."
}

Require-File -Path $frozen
$hashes = @{}
foreach ($line in Get-Content -LiteralPath $frozen) {
    $parts = $line -split "`t", 2
    if ($parts.Count -ne 2 -or $parts[0] -notmatch '^[0-9a-f]{64}$') {
        throw "The frozen hash row is malformed: $line"
    }

    $hashes[$parts[1]] = $parts[0]
}

foreach ($path in $sourcePaths) {
    if (-not $hashes.ContainsKey($path)) {
        throw "The frozen hash record lacks $path."
    }

    if ((Get-Digest -Path (Join-Path -Path $candidate -ChildPath $path)) -ne $hashes[$path]) {
        throw "The frozen hash does not match $path."
    }
}

Require-File -Path (Join-Path -Path $unitPath -ChildPath 'index.md')
Require-File -Path (Join-Path -Path $unitPath -ChildPath 'mapping.tsv')
$staged = Invoke-GitText -Arguments @('diff', '--cached', '--name-only')
foreach ($path in $staged) {
    if ($path -notin $sourcePaths -and -not $path.StartsWith("$unit/", [System.StringComparison]::Ordinal)) {
        throw "The index contains an unexpected staged path: $path"
    }
}

$attributes = Join-Path -Path $unitPath -ChildPath '.gitattributes'
if (Test-Path -LiteralPath $attributes) {
    throw "The unit attributes file already exists: $attributes"
}

[System.IO.File]::WriteAllText($attributes, "* -text`n", [System.Text.UTF8Encoding]::new($false))
$artifacts = @(
    'tmp/units/recipe-finalize-brief.md',
    'tmp/units/recipe-finalize-report.md',
    'tmp/release/finalize-recipe-stage.ps1',
    'tmp/units/recipe-retain-stage-run-2.log.txt',
    'tmp/units/recipe-retain-stage-run-2.stderr.txt'
)
foreach ($relative in $artifacts) {
    Copy-Exact -Source (Join-Path -Path $canonical -ChildPath $relative) -Destination (Join-Path -Path $unitPath -ChildPath (Split-Path -Path $relative -Leaf))
}

$completion = Join-Path -Path $unitPath -ChildPath 'completion.md'
if (Test-Path -LiteralPath $completion) {
    throw "The completion record exists: $completion"
}
[string[]]$completionRows = @(
    '# Recipe retention completion',
    '',
    'Accepted recipe source pair: `capture-recipe-brief-3.md` and `capture-recipe-report-3.md`.',
    'Authoring retention pair: `recipe-retain-stage-brief-4.md` and `recipe-retain-stage-report-4.md`.',
    'Finalization pair: `recipe-finalize-brief.md` and `recipe-finalize-report.md`.',
    'The cached whitespace failure concerned raw `recipe-retain-stage-run.stderr.txt` evidence. Cached whitespace checks cover owned source and retained authored `.md`, `.ps1`, `.mjs`, and `.gitattributes` files. Raw evidence remains byte-exact.',
    'The missing full-gate-log deviation remains preserved.',
    'Cross-unit R-B references remain live and require final campaign retention before a sweep.'
)
[System.IO.File]::WriteAllLines($completion, $completionRows, [System.Text.UTF8Encoding]::new($false))

$additions = @(
    "$unit/.gitattributes",
    "$unit/recipe-finalize-brief.md",
    "$unit/recipe-finalize-report.md",
    "$unit/finalize-recipe-stage.ps1",
    "$unit/recipe-retain-stage-run-2.log.txt",
    "$unit/recipe-retain-stage-run-2.stderr.txt",
    "$unit/completion.md"
)
Invoke-GitText -Arguments (@('add', '--') + $additions) | Out-Null
Invoke-GitText -Arguments @('add', '--renormalize', '--', $unit) | Out-Null

$comparison = Join-Path -Path $unitPath -ChildPath 'blobs.tsv'
if (Test-Path -LiteralPath $comparison) {
    throw "The blob comparison report exists: $comparison"
}
$unitStaged = Invoke-GitText -Arguments @('diff', '--cached', '--name-only', '--', $unit)
[string[]]$comparisonRows = @("path`tdisk`tblob")
foreach ($path in $unitStaged) {
    $disk = (Invoke-GitText -Arguments @('hash-object', '--no-filters', '--', $path)).Trim()
    $blob = (Invoke-GitText -Arguments @('rev-parse', ":$path")).Trim()
    if ($disk -ne $blob) {
        throw "The staged blob differs from the disk bytes: $path"
    }

    $comparisonRows += "$path`t$disk`t$blob"
}
[System.IO.File]::WriteAllLines($comparison, $comparisonRows, [System.Text.UTF8Encoding]::new($false))
Invoke-GitText -Arguments @('add', '--', "$unit/blobs.tsv") | Out-Null
$comparisonDisk = (Invoke-GitText -Arguments @('hash-object', '--no-filters', '--', "$unit/blobs.tsv")).Trim()
$comparisonBlob = (Invoke-GitText -Arguments @('rev-parse', ":$unit/blobs.tsv")).Trim()
if ($comparisonDisk -ne $comparisonBlob) {
    throw 'The staged comparison report differs from its disk bytes.'
}

$cached = Invoke-GitText -Arguments @('diff', '--cached', '--name-only')
$checkPaths = @($cached | Where-Object {
    $_ -in $sourcePaths -or ($_ -like "$unit/*" -and $_ -match '\.(md|ps1|mjs)$|/\.gitattributes$')
})
if ($checkPaths.Count -gt 0) {
    Invoke-GitText -Arguments (@('diff', '--cached', '--check', '--') + $checkPaths) | Out-Null
}

Invoke-GitText -Arguments @('status', '--short')
Invoke-GitText -Arguments @('diff', '--cached', '--stat')
