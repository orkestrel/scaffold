param(
    [string] $Root = (Join-Path (Get-Location) '.orkestrel/campaign/roughnotes-acceptance-unit')
)

$ErrorActionPreference = 'Stop'

function Copy-RetentionFile {
    param(
        [string] $Source,
        [string] $Relative,
        [System.Collections.ArrayList] $Records
    )

    if (-not (Test-Path -LiteralPath $Source -PathType Leaf)) {
        throw "Required source is missing: $Source"
    }

    if ($Source -match '\.(png|zip|tgz|tar|gz)$') {
        throw "Excluded payload selected: $Source"
    }

    $Destination = Join-Path $Root $Relative
    $DestinationDirectory = Split-Path -Parent $Destination
    New-Item -ItemType Directory -Path $DestinationDirectory -Force | Out-Null
    if (Test-Path -LiteralPath $Destination) {
        throw "Destination exists: $Destination"
    }

    $SourceHash = (Get-FileHash -Algorithm SHA256 -LiteralPath $Source).Hash
    Copy-Item -LiteralPath $Source -Destination $Destination
    $CopyHash = (Get-FileHash -Algorithm SHA256 -LiteralPath $Destination).Hash
    if ($SourceHash -ne $CopyHash) {
        throw "Hash mismatch: $Source"
    }

    [void] $Records.Add([ordered]@{
        source = $Source
        retained = $Relative.Replace('\', '/')
        sourceSha256 = $SourceHash
        retainedSha256 = $CopyHash
        rewrite = $false
    })
}

function Copy-RetentionTree {
    param(
        [string] $Source,
        [string] $Prefix,
        [System.Collections.ArrayList] $Records
    )

    if (-not (Test-Path -LiteralPath $Source -PathType Container)) {
        throw "Required source directory is missing: $Source"
    }

    Get-ChildItem -LiteralPath $Source -Recurse -File | ForEach-Object {
        if ($_.Extension -in '.png', '.zip', '.tgz', '.tar', '.gz') {
            return
        }

        $Relative = $_.FullName.Substring($Source.Length).TrimStart('\', '/')
        Copy-RetentionFile -Source $_.FullName -Relative (Join-Path $Prefix $Relative) -Records $Records
    }
}

if (-not (Test-Path -LiteralPath $Root -PathType Container)) {
    throw "Retention root is missing: $Root"
}

$Records = New-Object System.Collections.ArrayList
Copy-RetentionFile -Source (Join-Path (Get-Location) 'tmp/units/roughnotes-acceptance-retention-brief.md') -Relative 'brief-source.md' -Records $Records

$CanonicalFiles = @(
    '.orkestrel/campaign/r-b-final-audit-verdict.md',
    '.orkestrel/campaign/r-b-final-objective-report.md',
    '.orkestrel/campaign/r-b-final-subjective-report.md',
    '.orkestrel/campaign/r-b-final-controls-report.md',
    '.orkestrel/campaign/r-b-final-capture-report.md',
    '.orkestrel/campaign/roughnotes-registry-adoption-audit-verdict.md',
    '.orkestrel/campaign/roughnotes-registry-acceptance.md',
    'tmp/units/r-b-brief-11.md',
    'tmp/units/r-b-gates-brief.md',
    'tmp/units/roughnotes-registry-adoption-brief.md',
    'tmp/units/roughnotes-registry-adoption-report.md',
    'tmp/units/roughnotes-registry-gates-brief-2.md',
    'tmp/units/roughnotes-registry-gates-author-report-2.md',
    'tmp/units/roughnotes-registry-host-brief.md',
    'tmp/units/roughnotes-registry-host-report.md',
    'tmp/units/roughnotes-registry-capture-retention-brief.md',
    'tmp/units/roughnotes-registry-capture-retention-report.md',
    'tmp/units/roughnotes-registry-final-verifier-brief.md',
    'tmp/units/roughnotes-registry-final-verifier-report.md',
    'tmp/audit/r-b-final-audit-claims.md',
    'tmp/audit/r-b-final-objective-brief.md',
    'tmp/audit/r-b-final-subjective-brief.md',
    'tmp/audit/r-b-final-actual.diff',
    'tmp/audit/r-b-final-new-setup-proof.diff',
    'tmp/audit/r-b-final-status.txt',
    'tmp/audit/roughnotes-registry-adoption-audit-claims.md',
    'tmp/audit/roughnotes-registry-adoption-objective-brief.md',
    'tmp/audit/roughnotes-registry-adoption-objective-report.md',
    'tmp/audit/roughnotes-registry-adoption-subjective-brief.md',
    'tmp/audit/roughnotes-registry-adoption-subjective-report.md',
    'tmp/release/adopt-roughnotes-registry.mjs',
    'tmp/release/launch-roughnotes-registry.ps1',
    'tmp/release/run-roughnotes-registry-gates.mjs',
    'tmp/release/launch-roughnotes-registry-gates.ps1',
    'tmp/probe/retain-roughnotes-registry-capture.ps1'
)

$CanonicalFiles | ForEach-Object {
    Copy-RetentionFile -Source (Join-Path (Get-Location) $_) -Relative (Join-Path 'canonical' $_) -Records $Records
}

Copy-RetentionTree -Source (Join-Path (Get-Location) 'tmp/units/roughnotes-registry-adoption-evidence') -Prefix 'canonical/tmp/units/roughnotes-registry-adoption-evidence' -Records $Records
Copy-RetentionTree -Source (Join-Path (Get-Location) 'tmp/units/roughnotes-registry-gates-author-evidence') -Prefix 'canonical/tmp/units/roughnotes-registry-gates-author-evidence' -Records $Records
Copy-RetentionTree -Source (Join-Path (Get-Location) 'tmp/units/roughnotes-registry-gates-evidence/roughnotes-registry-gates-20260918') -Prefix 'canonical/tmp/units/roughnotes-registry-gates-evidence/roughnotes-registry-gates-20260918' -Records $Records
Copy-RetentionTree -Source (Join-Path (Get-Location) 'tmp/units/roughnotes-registry-gates-evidence/roughnotes-control-2-20260918') -Prefix 'canonical/tmp/units/roughnotes-registry-gates-evidence/roughnotes-control-2-20260918' -Records $Records
Copy-RetentionTree -Source (Join-Path (Get-Location) 'tmp/units/roughnotes-registry-capture-retention-evidence') -Prefix 'canonical/tmp/units/roughnotes-registry-capture-retention-evidence' -Records $Records

$RecoveryFiles = @(
    'tmp/units/r-b-report-11.md',
    'tmp/units/r-b-actual-11.diff',
    'tmp/units/r-b-shared-11.diff',
    'tmp/units/r-b-new-setup-proof-11.diff',
    'tmp/units/r-b-status-11.txt',
    'tmp/units/r-b-diffstat-11.txt',
    'tmp/units/r-b-frozen-hashes-11.tsv',
    'tmp/units/r-b-baseline-hashes-11.json',
    'tmp/units/async-capture-rejection-11-red.log.txt',
    'tmp/units/async-capture-rejection-11-green.log.txt',
    'tmp/units/setup-generated-11-normal.log.txt',
    'tmp/units/setup-generated-11-reduced.log.txt',
    'tmp/units/r-b-gates-report.md'
)

$RecoveryRoot = Join-Path (Get-Location) 'tmp/recovery/roughnotes'
$RecoveryFiles | ForEach-Object {
    Copy-RetentionFile -Source (Join-Path $RecoveryRoot $_) -Relative (Join-Path 'recovery' $_) -Records $Records
}
Copy-RetentionTree -Source (Join-Path $RecoveryRoot 'tmp/units/r-b-gates-evidence') -Prefix 'recovery/tmp/units/r-b-gates-evidence' -Records $Records

$CaptureRoot = Join-Path (Get-Location) 'tmp/capture-retained/roughnotes-registry-final-capture'
@(
    'inventory.json',
    'README.md',
    'tmp/journeys/dark-1280.txt',
    'tmp/journeys/dark-390.txt',
    'tmp/journeys/light-1280.txt',
    'tmp/journeys/light-390.txt',
    'tmp/units/terminal.json',
    'tmp/units/test-journey.json',
    'tmp/units/test-journey.stderr.log.txt',
    'tmp/units/test-journey.stdout.log.txt'
) | ForEach-Object {
    Copy-RetentionFile -Source (Join-Path $CaptureRoot $_) -Relative (Join-Path 'canonical/capture-metadata' $_) -Records $Records
}

$Manifest = [ordered]@{
    purpose = 'Retained effective R-B and Roughnotes registry acceptance evidence.'
    roots = [ordered]@{
        canonical = (Get-Location).Path
        recovery = $RecoveryRoot
        capture = $CaptureRoot
    }
    effective = [ordered]@{
        source = @('canonical/tmp/units/r-b-brief-11.md', 'recovery/tmp/units/r-b-report-11.md')
        registry = @('canonical/tmp/units/roughnotes-registry-adoption-brief.md', 'canonical/.orkestrel/campaign/roughnotes-registry-acceptance.md')
    }
    existingCarriers = @(
        '.orkestrel/campaign/recovery-retention-map.md',
        '.orkestrel/campaign/recovery-retention-map-ruling.md',
        '.orkestrel/campaign/r-b-final-audit-verdict.md',
        '.orkestrel/campaign/roughnotes-registry-acceptance.md'
    )
    exclusions = @('PNG capture images', 'archive payloads', 'node_modules', 'bench journals', 'secrets', 'original-user backups')
    rewrites = @()
    records = $Records
}

$Manifest | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath (Join-Path $Root 'manifest.json') -Encoding UTF8
