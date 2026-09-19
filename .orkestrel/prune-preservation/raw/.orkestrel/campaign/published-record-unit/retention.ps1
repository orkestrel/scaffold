param(
    [string] $Root = (Join-Path (Get-Location) '.orkestrel/campaign/published-record-unit')
)

$ErrorActionPreference = 'Stop'

function Copy-PublishedFile {
    param(
        [string] $Source,
        [string] $Relative,
        [System.Collections.ArrayList] $Records
    )

    if (-not (Test-Path -LiteralPath $Source -PathType Leaf)) {
        throw "Required source is missing: $Source"
    }
    if ($Source -match '\.(tgz|tar|gz|png|jsonl)$' -or $Source -match '[\\/]node_modules[\\/]') {
        throw "Excluded payload selected: $Source"
    }

    $Destination = Join-Path $Root $Relative
    $Directory = Split-Path -Parent $Destination
    New-Item -ItemType Directory -Path $Directory -Force | Out-Null
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
    })
}

if (-not (Test-Path -LiteralPath $Root -PathType Container)) {
    throw "Retention root is missing: $Root"
}

$Publication = 'C:\Users\mikes\AppData\Local\Temp\scaffold-registry-20260918'
$Records = New-Object System.Collections.ArrayList
Copy-PublishedFile -Source (Join-Path (Get-Location) 'tmp/units/published-record-retention-brief.md') -Relative 'brief-source.md' -Records $Records

@(
    'comparison-brief.md',
    'comparison-report.md',
    'comparison.mjs',
    'comparison-evidence/comparison.json',
    'comparison-evidence/prepared-listing.txt',
    'comparison-evidence/published-listing.txt',
    'comparison-evidence/36C10F55B178C4A5A25678CD98FBC7A2885520E0247C33F16E8AE1564D0B3083.diff',
    'comparison-evidence/E086447C86A18A5A2399EADA5DB63F4C7A6F8FC933BD5C65E554379EC8057F48.diff'
) | ForEach-Object {
    Copy-PublishedFile -Source (Join-Path $Publication $_) -Relative (Join-Path 'raw/publication' $_) -Records $Records
}

@(
    'tmp/units/published-scaffold-verifier-brief.md',
    'tmp/units/published-scaffold-verifier-report.md',
    'tmp/cursor/fieldpass-harness-map-brief.md',
    'tmp/cursor/fieldpass-harness-map-report.md',
    'tmp/cursor/fieldpass-harness-map.ps1'
) | ForEach-Object {
    Copy-PublishedFile -Source (Join-Path (Get-Location) $_) -Relative (Join-Path 'raw/canonical' $_) -Records $Records
}

$Manifest = [ordered]@{
    purpose = 'Raw retention for publication comparison and native-field capability map receipts.'
    roots = [ordered]@{
        publication = $Publication
        canonical = (Get-Location).Path
    }
    exclusions = @('scaffold-0.0.75.tgz', 'tmp/cursor/fieldpass-harness-map.jsonl', 'archives', 'PNG images', 'secrets', 'node_modules')
    provenance = [ordered]@{
        session = 'efc15351-efc8-4c2d-bb1f-1440750acfbf'
        exit = 0
        elapsed = '254892ms'
        fieldTest = 'not launched'
        ownerChoice = 'pending asynchronous CLI exception'
    }
    records = $Records
}
$Manifest | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath (Join-Path $Root 'manifest.json') -Encoding UTF8
