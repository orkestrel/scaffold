param([switch]$Prepare)

$ErrorActionPreference = 'Stop'
$PSNativeCommandUseErrorActionPreference = $false
Set-StrictMode -Version Latest

$canonical = 'C:\Users\mikes\WebstormProjects\scaffold'
$candidate = 'C:\Users\mikes\WebstormProjects\scaffold\tmp\release\scaffold-0.0.75'
$expectedHead = 'c50efef0f741caafe1a80c1ef9ee4004f8be0f2b'
$retained = Join-Path -Path $candidate -ChildPath '.orkestrel\campaign\capture-recipe-unit'
$frozen = Join-Path -Path $candidate -ChildPath 'tmp\units\capture-recipe-evidence-3\frozen-hashes.tsv'
$staged = @(
    '.agents/skills/orkestrel-prove-journey/SKILL.md',
    '.agents/skills/orkestrel-prove-journey/references/captures.md',
    'host.json',
    '.orkestrel/campaign/capture-recipe-unit'
)
$canonicalFiles = @(
    'tmp/units/capture-recipe-brief.md',
    'tmp/units/capture-recipe-brief-2.md',
    'tmp/units/capture-recipe-brief-3.md',
    'tmp/units/capture-recipe-gates-brief.md',
    'tmp/units/capture-recipe-gates-report.md',
    'tmp/audit/capture-recipe-audit-claims.md',
    'tmp/audit/capture-recipe-objective-brief.md',
    'tmp/audit/capture-recipe-subjective-brief.md',
    '.orkestrel/campaign/capture-recipe-audit-objective-report.md',
    '.orkestrel/campaign/capture-recipe-audit-subjective-report.md',
    '.orkestrel/campaign/capture-recipe-audit-verdict.md',
    '.orkestrel/campaign/capture-recipe-successor-ruling.md',
    'tmp/units/recipe-retain-stage-brief.md',
    'tmp/units/recipe-retain-stage-report.md',
    'tmp/units/recipe-retain-stage-brief-2.md',
    'tmp/units/recipe-retain-stage-report-2.md',
    'tmp/release/retain-stage-capture-recipe.ps1'
)
$candidateFiles = @(
    'tmp/units/capture-recipe-report.md',
    'tmp/units/capture-recipe-report-2.md',
    'tmp/units/capture-recipe-report-3.md'
)
$candidateDirectories = @(
    'tmp/units/capture-recipe-evidence',
    'tmp/units/capture-recipe-evidence-2',
    'tmp/units/capture-recipe-evidence-3'
)

function Get-Digest {
    param([string]$Path)

    return (Get-FileHash -LiteralPath $Path -Algorithm SHA256).Hash.ToLowerInvariant()
}

function Require-File {
    param([string]$Path)

    if (-not (Test-Path -LiteralPath $Path -PathType Leaf)) {
        throw "The required artifact is missing: $Path"
    }
}

function Add-Copy {
    param(
        [System.Collections.Generic.List[object]]$Copies,
        [string]$Source,
        [string]$Destination,
        [string]$Origin
    )

    Require-File -Path $Source
    $Copies.Add([pscustomobject]@{ Source = $Source; Destination = $Destination; Origin = $Origin })
}

function Copy-Checked {
    param(
        [string]$Source,
        [string]$Destination
    )

    $parent = Split-Path -Path $Destination -Parent
    if (-not (Test-Path -LiteralPath $parent -PathType Container)) {
        New-Item -ItemType Directory -Path $parent | Out-Null
    }

    [System.IO.File]::Copy($Source, $Destination, $false)
    if ((Get-Digest -Path $Source) -ne (Get-Digest -Path $Destination)) {
        throw "The retained bytes differ from the source: $Destination"
    }
}

function Get-MarkdownTransform {
    param(
        [string]$Path,
        [object[]]$Mappings,
        [string]$Canonical,
        [string]$Candidate
    )

    $text = [System.IO.File]::ReadAllText($Path)
    $rewritten = $text.Replace($Canonical, '').Replace($Canonical.Replace('\', '/'), '')
    $rewritten = $rewritten.Replace($Candidate, '').Replace($Candidate.Replace('\', '/'), '')
    foreach ($mapping in $Mappings | Sort-Object { $_.Origin.Length } -Descending) {
        $rewritten = $rewritten.Replace($mapping.Origin, $mapping.Relative)
        $rewritten = $rewritten.Replace($mapping.Origin.Replace('\', '/'), $mapping.Relative)
    }

    $unresolved = [regex]::Matches($rewritten, '(?<![A-Za-z0-9_.-])tmp[\\/](?:units|audit)[\\/][^\s`\)\]\}"'']+')
    return [pscustomobject]@{ Path = $Path; Text = $rewritten; Unresolved = @($unresolved | ForEach-Object { $_.Value } | Select-Object -Unique) }
}

if ((Resolve-Path -LiteralPath $canonical).Path -ne $canonical) {
    throw "The canonical root does not resolve to $canonical."
}

if ((Resolve-Path -LiteralPath $candidate).Path -ne $candidate) {
    throw "The candidate root does not resolve to $candidate."
}

Set-Location -LiteralPath $candidate
$head = (& git rev-parse HEAD).Trim()
if ($LASTEXITCODE -ne 0 -or $head -ne $expectedHead) {
    throw "Expected candidate HEAD $expectedHead, received $head."
}

& git diff --cached --quiet
if ($LASTEXITCODE -ne 0) {
    throw 'The candidate index is not empty.'
}

$modified = @(& git diff --name-only)
if ($LASTEXITCODE -ne 0) {
    throw 'Git could not read tracked modifications.'
}

foreach ($path in $modified) {
    if ($path -notin $staged[0..2]) {
        throw "The candidate has an unexpected tracked modification: $path"
    }
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

foreach ($path in $staged[0..2]) {
    if (-not $hashes.ContainsKey($path)) {
        throw "The frozen hash record lacks $path."
    }

    $actual = Get-Digest -Path (Join-Path -Path $candidate -ChildPath $path)
    if ($actual -ne $hashes[$path]) {
        throw "The frozen hash does not match $path."
    }
}

if (Test-Path -LiteralPath $retained) {
    throw "The destination exists before retention: $retained"
}

$copies = [System.Collections.Generic.List[object]]::new()
foreach ($relative in $canonicalFiles) {
    Add-Copy -Copies $copies -Source (Join-Path -Path $canonical -ChildPath $relative) -Destination (Split-Path -Path $relative -Leaf) -Origin $relative
}

foreach ($relative in $candidateFiles) {
    Add-Copy -Copies $copies -Source (Join-Path -Path $candidate -ChildPath $relative) -Destination (Split-Path -Path $relative -Leaf) -Origin $relative
}

foreach ($directory in $candidateDirectories) {
    $sourceDirectory = Join-Path -Path $candidate -ChildPath $directory
    if (-not (Test-Path -LiteralPath $sourceDirectory -PathType Container)) {
        throw "The required evidence directory is missing: $sourceDirectory"
    }

    foreach ($file in Get-ChildItem -LiteralPath $sourceDirectory -File) {
        Add-Copy -Copies $copies -Source $file.FullName -Destination (Join-Path -Path (Split-Path -Path $directory -Leaf) -ChildPath $file.Name) -Origin (Join-Path -Path $directory -ChildPath $file.Name)
    }
}

$relativeCopies = @($copies | ForEach-Object { $_.Destination })
if (($relativeCopies | Select-Object -Unique).Count -ne $relativeCopies.Count) {
    throw 'The retained artifact map has duplicate destinations.'
}

$mappings = @($copies | ForEach-Object {
    [pscustomobject]@{
        Origin = $_.Origin
        Relative = ".orkestrel/campaign/capture-recipe-unit/$($_.Destination.Replace('\', '/'))"
    }
})

$mappings += @($candidateDirectories | ForEach-Object {
    [pscustomobject]@{
        Origin = $_
        Relative = ".orkestrel/campaign/capture-recipe-unit/$(Split-Path -Path $_ -Leaf)"
    }
})

$transforms = [System.Collections.Generic.List[object]]::new()
foreach ($copy in $copies) {
    if ($copy.Destination -like '*.md') {
        $transforms.Add((Get-MarkdownTransform -Path $copy.Source -Mappings $mappings -Canonical $canonical -Candidate $candidate))
    }
}

$unresolved = @($transforms | ForEach-Object {
    $source = $_.Path
    $_.Unresolved | ForEach-Object { [pscustomobject]@{ Source = $source; Reference = $_ } }
})

if ($Prepare) {
    $unresolved | Format-Table -AutoSize
    return
}

New-Item -ItemType Directory -Path $retained | Out-Null
foreach ($copy in $copies) {
    Copy-Checked -Source $copy.Source -Destination (Join-Path -Path $retained -ChildPath $copy.Destination)
}

foreach ($transform in $transforms) {
    $copy = $copies | Where-Object { $_.Source -eq $transform.Path }
    $destination = Join-Path -Path $retained -ChildPath $copy.Destination
    [System.IO.File]::WriteAllText($destination, $transform.Text, [System.Text.UTF8Encoding]::new($false))
}

$index = Join-Path -Path $retained -ChildPath 'index.md'
$records = foreach ($copy in $copies) {
    $destination = Join-Path -Path $retained -ChildPath $copy.Destination
    $path = '.orkestrel/campaign/capture-recipe-unit/' + $copy.Destination.Replace('\', '/')
    [string]::Format('| `{0}` | `{1}` | `{2}` |', $path, (Get-Digest -Path $copy.Source), (Get-Digest -Path $destination))
}
$indexText = @(
    '# Capture recipe retention index',
    '',
    'Effective pair: `.orkestrel/campaign/capture-recipe-unit/capture-recipe-brief-3.md` and `.orkestrel/campaign/capture-recipe-unit/capture-recipe-report-3.md`.',
    'Predecessor pairs: `.orkestrel/campaign/capture-recipe-unit/capture-recipe-brief.md` with `.orkestrel/campaign/capture-recipe-unit/capture-recipe-report.md`, and `.orkestrel/campaign/capture-recipe-unit/capture-recipe-brief-2.md` with `.orkestrel/campaign/capture-recipe-unit/capture-recipe-report-2.md`.',
    'Accepted audit prescription: `.orkestrel/campaign/capture-recipe-unit/capture-recipe-successor-ruling.md`.',
    'Full-gate exit `0`: `.orkestrel/campaign/capture-recipe-unit/capture-recipe-gates-report.md`.',
    'Missing-file-log deviation: the full gate report records the absent full log and terminal session; this retained record preserves that limitation.',
    'Original log, diff, and executed `.mjs` instrument bytes are unchanged. Markdown artifact references were rewritten only through the mapping recorded in `mapping.tsv`.',
    '',
    '| Retained path | Original SHA256 | Retained SHA256 |',
    '| --- | --- | --- |'
) + $records
[System.IO.File]::WriteAllLines($index, $indexText, [System.Text.UTF8Encoding]::new($false))

$unresolvedRows = @(
    '',
    '## Unresolved references',
    '',
    'These references remain intact. They identify cross-unit dependencies for the parent ruling.',
    '',
    '| Source report | Reference |',
    '| --- | --- | --- |'
) + @($unresolved | ForEach-Object { [string]::Format('| `{0}` | `{1}` |', $_.Source, $_.Reference) })
[System.IO.File]::AppendAllLines($index, $unresolvedRows, [System.Text.UTF8Encoding]::new($false))

$mapping = Join-Path -Path $retained -ChildPath 'mapping.tsv'
$mappingRows = @("origin`trelative") + @($mappings | Sort-Object { $_.Origin.Length } -Descending | ForEach-Object { "$(($_.Origin))`t$($_.Relative)" })
[System.IO.File]::WriteAllLines($mapping, $mappingRows, [System.Text.UTF8Encoding]::new($false))

& git add -- $staged
if ($LASTEXITCODE -ne 0) {
    throw "Git could not stage the retained evidence: exit code $LASTEXITCODE."
}

$cached = @(& git diff --cached --name-only)
if ($LASTEXITCODE -ne 0) {
    throw 'Git could not list the staged paths.'
}

$checkPaths = @($cached | Where-Object { $_ -notmatch '\.diff$' })
if ($checkPaths.Count -gt 0) {
    & git diff --cached --check -- $checkPaths
    if ($LASTEXITCODE -ne 0) {
        throw "The cached diff check failed with exit code $LASTEXITCODE."
    }
}

& git status --short
if ($LASTEXITCODE -ne 0) {
    throw "Git could not print staged status: exit code $LASTEXITCODE."
}

& git diff --cached --stat
if ($LASTEXITCODE -ne 0) {
    throw "Git could not print staged diffstat: exit code $LASTEXITCODE."
}
