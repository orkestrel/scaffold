param(
    [string] $Root = (Join-Path (Get-Location) '.orkestrel/campaign/roughnotes-landing')
)

$ErrorActionPreference = 'Stop'

function Copy-LandingFile {
    param(
        [string] $Source,
        [string] $Relative,
        [System.Collections.ArrayList] $Records
    )

    if (-not (Test-Path -LiteralPath $Source -PathType Leaf)) {
        throw "Required source is missing: $Source"
    }
    if ($Source -match '\.(png|zip|tgz|tar|gz)$' -or $Source -match '[\\/]node_modules[\\/]') {
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

function Copy-LandingTree {
    param(
        [string] $Source,
        [string] $Prefix,
        [System.Collections.ArrayList] $Records
    )

    if (-not (Test-Path -LiteralPath $Source -PathType Container)) {
        throw "Required source directory is missing: $Source"
    }
    Get-ChildItem -LiteralPath $Source -Recurse -File | ForEach-Object {
        if ($_.Extension -in '.png', '.zip', '.tgz', '.tar', '.gz' -or $_.FullName -match '[\\/]node_modules[\\/]') {
            return
        }
        $Relative = $_.FullName.Substring($Source.Length).TrimStart('\', '/')
        Copy-LandingFile -Source $_.FullName -Relative (Join-Path $Prefix $Relative) -Records $Records
    }
}

if (-not (Test-Path -LiteralPath $Root -PathType Container)) {
    throw "Retention root is missing: $Root"
}

$Scratch = 'C:\Users\mikes\AppData\Local\Temp\roughnotes-integration-20260918'
$Records = New-Object System.Collections.ArrayList
Copy-LandingFile -Source (Join-Path (Get-Location) 'tmp/units/roughnotes-landing-retention-brief.md') -Relative 'brief-source.md' -Records $Records

Get-ChildItem -LiteralPath $Scratch -File | Where-Object { $_.Extension -in '.md', '.ps1', '.mjs', '.txt' } | ForEach-Object {
    Copy-LandingFile -Source $_.FullName -Relative (Join-Path 'raw/external' $_.Name) -Records $Records
}

Copy-LandingTree -Source (Join-Path $Scratch 'evidence') -Prefix 'raw/external/evidence' -Records $Records
Copy-LandingTree -Source (Join-Path $Scratch 'install-author-evidence') -Prefix 'raw/external/install-author-evidence' -Records $Records
Copy-LandingTree -Source (Join-Path $Scratch 'original-registry-install-20260918') -Prefix 'raw/external/original-registry-install-20260918' -Records $Records

@(
    'original-status.txt',
    'original-index.txt',
    'original-hashes.json',
    'recovery-status.txt',
    'recovery-hashes.json',
    'recovery-staged-diffstat.txt',
    'recovery-staged-status.txt'
) | ForEach-Object {
    Copy-LandingFile -Source (Join-Path $Scratch "backup/$_") -Relative (Join-Path 'raw/external/backup-metadata' $_) -Records $Records
}

@(
    'tmp/units/roughnotes-integration-preparation-brief.md',
    'tmp/units/roughnotes-integration-preparation-brief-2.md',
    'tmp/units/roughnotes-landing-verifier-brief.md',
    'tmp/units/roughnotes-landing-retention-brief.md'
) | ForEach-Object {
    Copy-LandingFile -Source (Join-Path (Get-Location) $_) -Relative (Join-Path 'raw/canonical' $_) -Records $Records
}

$Manifest = [ordered]@{
    purpose = 'Raw retention for the Roughnotes integration and original registry install receipt.'
    roots = [ordered]@{
        external = $Scratch
        canonical = (Get-Location).Path
    }
    backupMetadata = @('original-status.txt', 'original-index.txt', 'original-hashes.json', 'recovery-status.txt', 'recovery-hashes.json', 'recovery-staged-diffstat.txt', 'recovery-staged-status.txt')
    exclusions = @('backup/original-unstaged.patch', 'backup/original-staged.patch', 'backup/app', 'backup/guides', 'backup/tests', 'backup/.codex', 'PNG capture images', 'archives', 'node_modules', 'secrets', 'journals')
    records = $Records
}
$Manifest | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath (Join-Path $Root 'manifest.json') -Encoding UTF8
