param(
    [string] $Root = (Join-Path (Get-Location) '.orkestrel/campaign/roughnotes-acceptance-unit')
)

$ErrorActionPreference = 'Stop'

function Get-RawHashes {
    param([string] $Root)

    $Excluded = @('operational', 'navigate.ps1', 'navigation-manifest.json', 'report-2.md', 'brief-2.md', '.gitattributes')
    $Records = New-Object System.Collections.ArrayList
    Get-ChildItem -LiteralPath $Root -Recurse -File | ForEach-Object {
        $Relative = $_.FullName.Substring($Root.Length).TrimStart('\', '/').Replace('\', '/')
        if ($Relative.Split('/')[0] -in $Excluded) {
            return
        }
        [void] $Records.Add([ordered]@{ path = $Relative; sha256 = (Get-FileHash -Algorithm SHA256 -LiteralPath $_.FullName).Hash })
    }
    return $Records
}

function Copy-OperationalDocument {
    param(
        [string] $Source,
        [string] $Relative,
        [hashtable] $Rewrites,
        [System.Collections.ArrayList] $Records,
        [System.Collections.ArrayList] $Mappings
    )

    if (-not (Test-Path -LiteralPath $Source -PathType Leaf)) {
        throw "Required operational source is missing: $Source"
    }

    $Destination = Join-Path (Join-Path $Root 'operational') $Relative
    $DestinationDirectory = Split-Path -Parent $Destination
    New-Item -ItemType Directory -Path $DestinationDirectory -Force | Out-Null
    if (Test-Path -LiteralPath $Destination) {
        throw "Operational destination exists: $Destination"
    }

    $SourceHash = (Get-FileHash -Algorithm SHA256 -LiteralPath $Source).Hash
    $Text = [System.IO.File]::ReadAllText($Source)
    foreach ($From in $Rewrites.Keys) {
        $To = $Rewrites[$From]
        if ($Text.Contains($From)) {
            $Text = $Text.Replace($From, $To)
            [void] $Mappings.Add([ordered]@{ source = $Relative; from = $From; to = $To })
        }
    }
    [System.IO.File]::WriteAllText($Destination, $Text)
    [void] $Records.Add([ordered]@{
        raw = $Relative.Replace('\', '/')
        operational = (Join-Path 'operational' $Relative).Replace('\', '/')
        rawSha256 = $SourceHash
        operationalSha256 = (Get-FileHash -Algorithm SHA256 -LiteralPath $Destination).Hash
    })
}

if (-not (Test-Path -LiteralPath $Root -PathType Container)) {
    throw "Retention root is missing: $Root"
}
if (Test-Path -LiteralPath (Join-Path $Root 'operational')) {
    throw 'Operational destination exists.'
}

$Before = Get-RawHashes -Root $Root
$Documents = @(
    'canonical/tmp/units/r-b-brief-11.md',
    'recovery/tmp/units/r-b-report-11.md',
    'canonical/.orkestrel/campaign/r-b-final-audit-verdict.md',
    'canonical/.orkestrel/campaign/r-b-final-objective-report.md',
    'canonical/.orkestrel/campaign/r-b-final-subjective-report.md',
    'canonical/.orkestrel/campaign/r-b-final-controls-report.md',
    'canonical/.orkestrel/campaign/r-b-final-capture-report.md',
    'canonical/tmp/audit/r-b-final-audit-claims.md',
    'canonical/tmp/audit/r-b-final-objective-brief.md',
    'canonical/tmp/audit/r-b-final-subjective-brief.md',
    'canonical/tmp/units/roughnotes-registry-adoption-brief.md',
    'canonical/tmp/units/roughnotes-registry-adoption-report.md',
    'canonical/tmp/audit/roughnotes-registry-adoption-audit-claims.md',
    'canonical/tmp/audit/roughnotes-registry-adoption-objective-brief.md',
    'canonical/tmp/audit/roughnotes-registry-adoption-objective-report.md',
    'canonical/tmp/audit/roughnotes-registry-adoption-subjective-brief.md',
    'canonical/tmp/audit/roughnotes-registry-adoption-subjective-report.md',
    'canonical/.orkestrel/campaign/roughnotes-registry-adoption-audit-verdict.md',
    'canonical/tmp/units/roughnotes-registry-host-brief.md',
    'canonical/tmp/units/roughnotes-registry-host-report.md',
    'canonical/tmp/units/roughnotes-registry-gates-brief-2.md',
    'canonical/tmp/units/roughnotes-registry-gates-author-report-2.md',
    'canonical/tmp/units/roughnotes-registry-capture-retention-brief.md',
    'canonical/tmp/units/roughnotes-registry-capture-retention-report.md',
    'canonical/tmp/units/roughnotes-registry-final-verifier-brief.md',
    'canonical/tmp/units/roughnotes-registry-final-verifier-report.md',
    'canonical/.orkestrel/campaign/roughnotes-registry-acceptance.md'
)

$Records = New-Object System.Collections.ArrayList
$Mappings = New-Object System.Collections.ArrayList
foreach ($Relative in $Documents) {
    $Rewrites = @{}
    if ($Relative -eq 'canonical/tmp/units/roughnotes-registry-gates-author-report-2.md') {
        $Rewrites['(roughnotes-registry-gates-author-evidence/runner-successor.diff.patch)'] = '(../../../../canonical/tmp/units/roughnotes-registry-gates-author-evidence/runner-successor.diff.patch)'
    }
    if ($Relative -eq 'canonical/tmp/units/roughnotes-registry-capture-retention-report.md') {
        $Rewrites['(roughnotes-registry-capture-retention-evidence/successor.diff.patch)'] = '(../../../../canonical/tmp/units/roughnotes-registry-capture-retention-evidence/successor.diff.patch)'
    }
    Copy-OperationalDocument -Source (Join-Path $Root $Relative) -Relative $Relative -Rewrites $Rewrites -Records $Records -Mappings $Mappings
}

$Index = @'
# Roughnotes acceptance navigation

Read the raw records for byte-exact evidence. Read these operational records after launch paths are swept.

- [Effective R-B brief11](operational/canonical/tmp/units/r-b-brief-11.md) and [effective R-B report11](operational/recovery/tmp/units/r-b-report-11.md).
- [Final R-B audit verdict](operational/canonical/.orkestrel/campaign/r-b-final-audit-verdict.md), [objective report](operational/canonical/.orkestrel/campaign/r-b-final-objective-report.md), and [subjective report](operational/canonical/.orkestrel/campaign/r-b-final-subjective-report.md).
- [Registry adoption author brief](operational/canonical/tmp/units/roughnotes-registry-adoption-brief.md) and [author report](operational/canonical/tmp/units/roughnotes-registry-adoption-report.md). The [root registry acceptance](operational/canonical/.orkestrel/campaign/roughnotes-registry-acceptance.md) is a separate artifact.
- [Registry audit claims](operational/canonical/tmp/audit/roughnotes-registry-adoption-audit-claims.md), [objective report](operational/canonical/tmp/audit/roughnotes-registry-adoption-objective-report.md), [subjective report](operational/canonical/tmp/audit/roughnotes-registry-adoption-subjective-report.md), and [audit verdict](operational/canonical/.orkestrel/campaign/roughnotes-registry-adoption-audit-verdict.md).
- [Host report](operational/canonical/tmp/units/roughnotes-registry-host-report.md), [ordered gate report](operational/canonical/tmp/units/roughnotes-registry-gates-author-report-2.md), [capture retention report](operational/canonical/tmp/units/roughnotes-registry-capture-retention-report.md), [final verifier report](operational/canonical/tmp/units/roughnotes-registry-final-verifier-report.md), and [root acceptance](operational/canonical/.orkestrel/campaign/roughnotes-registry-acceptance.md).

The raw registry scripts and logs remain execution evidence. The capture inventory and journey records are retained under `canonical/capture-metadata`; PNG images remain in the immutable external portfolio.
'@
[System.IO.File]::WriteAllText((Join-Path $Root 'index.md'), $Index)

$After = Get-RawHashes -Root $Root
$Changed = New-Object System.Collections.ArrayList
foreach ($BeforeRecord in $Before) {
    $AfterRecord = $After | Where-Object { $_.path -eq $BeforeRecord.path }
    if ($null -eq $AfterRecord -or $BeforeRecord.sha256 -ne $AfterRecord.sha256) {
        [void] $Changed.Add($BeforeRecord.path)
    }
}
if ($Changed.Count -ne 0) {
    throw "Raw evidence changed: $($Changed -join ', ')"
}

$Manifest = [ordered]@{
    rawHashes = $After
    operational = $Records
    rewrites = $Mappings
    unresolved = @()
}
$Manifest | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath (Join-Path $Root 'navigation-manifest.json') -Encoding UTF8
