$ErrorActionPreference = 'Stop'
$PSNativeCommandUseErrorActionPreference = $false
Set-StrictMode -Version Latest

$canonical = 'C:\Users\mikes\WebstormProjects\scaffold'
$release = 'C:\Users\mikes\WebstormProjects\scaffold\tmp\release\scaffold-0.0.75'
$expectedBranch = 'recovery/scaffold-0.0.75'
$expectedHead = 'dc98373d5872d7a1d4a4337e2bce64be0ab70097'
$evidence = Join-Path -Path $release -ChildPath '.orkestrel\campaign\setup-vue-unit'
$sources = @(
    'guides/scaffold.md',
    'host.json',
    'src/core/compilers.ts',
    'src/core/templates.ts',
    'tests/distribution.test.ts',
    'tests/setupServer.ts',
    'tests/src/core/compilers.test.ts',
    'tests/src/core/templates.test.ts'
)
$artifacts = @(
    'tmp/units/setup-vue-fix-brief.md',
    'tmp/units/setup-vue-fix-brief-2.md',
    'tmp/units/setup-vue-fix-brief-3.md',
    'tmp/audit/setup-vue-claims.md',
    'tmp/audit/setup-vue-execution-claims.md',
    'tmp/audit/setup-vue.patch',
    'tmp/audit/setup-vue-status.txt',
    'tmp/audit/setup-vue-2.patch',
    'tmp/audit/setup-vue-2-status.txt',
    '.orkestrel/campaign/setup-vue-audit-objective.md',
    '.orkestrel/campaign/setup-vue-audit-subjective.md',
    '.orkestrel/campaign/setup-vue-audit-ruling.md',
    '.orkestrel/campaign/setup-vue-acceptance.md',
    '.orkestrel/campaign/setup-vue-execution-objective.md',
    '.orkestrel/campaign/setup-vue-execution-subjective.md',
    '.orkestrel/campaign/setup-vue-execution-audit-verdict.md',
    'tmp/audit/run-setup-vue-skip-control.ps1',
    'tmp/audit/run-setup-vue-execution-controls.ps1',
    'tmp/audit/setup-vue-skipped-control-before.log.txt',
    'tmp/audit/setup-vue-skipped-control.log.txt',
    'tmp/audit/setup-vue-todo-control.log.txt',
    'tmp/audit/setup-vue-absent-control.log.txt',
    'tmp/audit/setup-vue-failed-control.log.txt',
    'tmp/audit/setup-vue-restored-control.log.txt'
)
$releaseArtifacts = @(
    'tmp/units/setup-vue-report.md',
    'tmp/units/setup-vue-report-2.md',
    'tmp/units/setup-vue-report-3.md',
    'tmp/setup-vue-consumer-red.log.txt',
    'tmp/setup-vue-consumer-green.log.txt',
    'tmp/setup-vue-consumer-green-2.log.txt',
    'tmp/setup-vue-consumer-green-3.log.txt',
    'tmp/setup-vue-build.log.txt',
    'tmp/units/scaffold-vue-release-gates-red.log.txt',
    'tmp/units/scaffold-vue-release-verifier-report-red.md',
    'tmp/units/scaffold-vue-release-gates.log.txt',
    'tmp/units/scaffold-vue-release-verifier-report.md',
    'tmp/units/directory-anchor-replay.log.txt',
    'tmp/units/directory-anchor-project-replay.log.txt',
    'tmp/units/scaffold-vue-release-gates-2.log.txt',
    'tmp/units/scaffold-vue-release-verifier-report-2.md'
)

function Get-Digest {
    param([string]$Path)

    return (Get-FileHash -LiteralPath $Path -Algorithm SHA256).Hash
}

function Copy-Artifact {
    param(
        [string]$Source,
        [string]$Destination
    )

    if (-not (Test-Path -LiteralPath $Source -PathType Leaf)) {
        throw "The required artifact is missing: $Source"
    }

    if (Test-Path -LiteralPath $Destination -PathType Leaf) {
        if ((Get-Digest -Path $Source) -ne (Get-Digest -Path $Destination)) {
            throw "The evidence destination differs: $Destination"
        }

        return
    }

    [System.IO.File]::Copy($Source, $Destination, $false)
    if ((Get-Digest -Path $Source) -ne (Get-Digest -Path $Destination)) {
        throw "The copied evidence digest differs: $Destination"
    }
}

if ((Resolve-Path -LiteralPath $canonical).Path -ne $canonical) {
    throw "The canonical path does not resolve to $canonical."
}

if ((Resolve-Path -LiteralPath $release).Path -ne $release) {
    throw "The release path does not resolve to $release."
}

Set-Location -LiteralPath $release
$branch = (& git branch --show-current).Trim()
if ($LASTEXITCODE -ne 0) {
    throw 'Git could not read the release branch.'
}

if ($branch -ne $expectedBranch) {
    throw "Expected branch $expectedBranch, received $branch."
}

$head = (& git rev-parse HEAD).Trim()
if ($LASTEXITCODE -ne 0) {
    throw 'Git could not read the release HEAD.'
}

if ($head -ne $expectedHead) {
    throw "Expected HEAD $expectedHead, received $head."
}

& git diff --cached --quiet
if ($LASTEXITCODE -eq 1) {
    throw 'The release checkout has preexisting staged changes.'
}

if ($LASTEXITCODE -ne 0) {
    throw "Git could not read the cached status: exit code $LASTEXITCODE."
}

$modified = @(& git diff --name-only)
if ($LASTEXITCODE -ne 0) {
    throw 'Git could not read the release modifications.'
}

foreach ($path in $modified) {
    if ($path -notin $sources) {
        throw "The release checkout has an out-of-scope tracked modification: $path"
    }
}

foreach ($path in $sources) {
    if (-not (Test-Path -LiteralPath (Join-Path -Path $release -ChildPath $path) -PathType Leaf)) {
        throw "The source path is missing: $path"
    }
}

$copies = @()
foreach ($path in $artifacts) {
    $copies += [pscustomobject]@{
        Source = Join-Path -Path $canonical -ChildPath $path
        Name = Split-Path -Path $path -Leaf
    }
}

foreach ($path in $releaseArtifacts) {
    $copies += [pscustomobject]@{
        Source = Join-Path -Path $release -ChildPath $path
        Name = Split-Path -Path $path -Leaf
    }
}

$names = @($copies.Name)
if (($names | Select-Object -Unique).Count -ne $names.Count) {
    throw 'The evidence artifact names are not unique.'
}

foreach ($copy in $copies) {
    if (-not (Test-Path -LiteralPath $copy.Source -PathType Leaf)) {
        throw "The required artifact is missing: $($copy.Source)"
    }

    $destination = Join-Path -Path $evidence -ChildPath $copy.Name
    if (Test-Path -LiteralPath $destination) {
        if (-not (Test-Path -LiteralPath $destination -PathType Leaf)) {
            throw "The evidence destination is not a file: $destination"
        }

        if ((Get-Digest -Path $copy.Source) -ne (Get-Digest -Path $destination)) {
            throw "The evidence destination differs: $destination"
        }
    }
}

if (Test-Path -LiteralPath $evidence) {
    if (-not (Test-Path -LiteralPath $evidence -PathType Container)) {
        throw "The evidence path is not a directory: $evidence"
    }

    foreach ($file in Get-ChildItem -LiteralPath $evidence -File -Recurse) {
        if ($file.DirectoryName -ne $evidence) {
            throw "The evidence directory contains a nested file: $($file.FullName)"
        }

        if ($file.Name -notin $names) {
            throw "The evidence directory contains an unexpected file: $($file.FullName)"
        }
    }
}
else {
    New-Item -ItemType Directory -Path $evidence | Out-Null
}

foreach ($copy in $copies) {
    Copy-Artifact -Source $copy.Source -Destination (Join-Path -Path $evidence -ChildPath $copy.Name)
}

& git add -- $sources $evidence
if ($LASTEXITCODE -ne 0) {
    throw "Git could not stage the source unit: exit code $LASTEXITCODE."
}

& git diff --cached --check
if ($LASTEXITCODE -ne 0) {
    throw "The cached diff check failed with exit code $LASTEXITCODE."
}

& git status --short
if ($LASTEXITCODE -ne 0) {
    throw "Git could not print the cached status: exit code $LASTEXITCODE."
}

& git diff --cached --stat
if ($LASTEXITCODE -ne 0) {
    throw "Git could not print the cached stat: exit code $LASTEXITCODE."
}
