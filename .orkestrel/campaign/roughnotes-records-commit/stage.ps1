$ErrorActionPreference = 'Stop'

function Invoke-Git {
    param([string[]] $Arguments)

    $PriorErrorAction = $ErrorActionPreference
    $ErrorActionPreference = 'Continue'
    $Output = @(& git @Arguments 2>&1)
    $Exit = $LASTEXITCODE
    $ErrorActionPreference = $PriorErrorAction
    if ($Exit -ne 0) {
        throw "git $($Arguments -join ' ') failed: $($Output -join [Environment]::NewLine)"
    }
    return $Output
}

function Get-ProtectedHashes {
    $Paths = @('.codex/config.toml', '.codex/hooks.json', 'host.json', '.orkestrel/campaign/rebaseline-2.md')
    $Records = New-Object System.Collections.ArrayList
    foreach ($Path in $Paths) {
        [void] $Records.Add([ordered]@{ path = $Path; sha256 = (Get-FileHash -Algorithm SHA256 -LiteralPath $Path).Hash })
    }
    return $Records
}

function Test-AllowedStagePath {
    param([string] $Path)

    return $Path -eq '.orkestrel/campaign/recovery-current.md' -or
        $Path -eq '.orkestrel/campaign/recovery-live-tasks.md' -or
        $Path -like '.orkestrel/campaign/roughnotes-acceptance-unit/*' -or
        $Path -like '.orkestrel/campaign/roughnotes-landing/*' -or
        $Path -like '.orkestrel/campaign/published-record-unit/*' -or
        $Path -like '.orkestrel/campaign/roughnotes-records-commit/*'
}

$Expected = [ordered]@{
    '.codex/config.toml' = 'C8364A20FCA401E65F3C092968B1F6B4D4E025A1EFD91E22BEB01B3FCD39E076'
    '.codex/hooks.json' = 'BDFD4F9741FC8EE65690F09B79C5100FFFF72F1F8C3D2693FAD89A85307734F3'
    'host.json' = '3AC660B1D7077D93276226082BA5EF3124F266DA934D71814C791C06B4342AB0'
    '.orkestrel/campaign/rebaseline-2.md' = '023E7615CA0651C9EE0F1A9734F963037B86BD2F2F72BFAB56DA9614D3CFF1C8'
}
$Targets = @(
    '.orkestrel/campaign/roughnotes-acceptance-unit',
    '.orkestrel/campaign/roughnotes-landing',
    '.orkestrel/campaign/published-record-unit',
    '.orkestrel/campaign/roughnotes-records-commit',
    '.orkestrel/campaign/recovery-current.md',
    '.orkestrel/campaign/recovery-live-tasks.md'
)
$Receipt = '.orkestrel/campaign/roughnotes-records-commit'

$Existing = Invoke-Git -Arguments @('diff', '--cached', '--name-only')
if ($Existing.Count -ne 0) {
    throw "Starting index is nonempty: $($Existing -join ', ')"
}

$Before = Get-ProtectedHashes
foreach ($Record in $Before) {
    if ($Record.sha256 -ne $Expected[$Record.path]) {
        throw "Protected hash mismatch before staging: $($Record.path)"
    }
}

[System.IO.File]::WriteAllLines((Join-Path $Receipt 'stage-targets.txt'), $Targets)
$Before | ConvertTo-Json -Depth 4 | Set-Content -LiteralPath (Join-Path $Receipt 'protected-before.json') -Encoding UTF8

$Forbidden = Get-ChildItem -LiteralPath '.orkestrel/campaign/roughnotes-acceptance-unit', '.orkestrel/campaign/roughnotes-landing', '.orkestrel/campaign/published-record-unit' -Recurse -File | Where-Object {
    $_.Extension -in '.tgz', '.tar', '.gz', '.png', '.jsonl' -or
        $_.FullName -match '[\\/]node_modules[\\/]' -or
        $_.Name -in 'original-unstaged.patch', 'original-staged.patch' -or
        $_.FullName -match '[\\/]backup[\\/](app|guides|tests|\.codex)[\\/]'
}
if ($null -ne $Forbidden) {
    throw "Excluded payload selected: $($Forbidden.FullName -join ', ')"
}

Invoke-Git -Arguments (@('add', '-f', '--') + $Targets) | Out-Null
$Staged = Invoke-Git -Arguments @('diff', '--cached', '--name-only')
foreach ($Path in $Staged) {
    if (-not (Test-AllowedStagePath -Path $Path)) {
        throw "Forbidden staged path: $Path"
    }
}
if ($Staged -contains '.codex/config.toml' -or $Staged -contains '.orkestrel/campaign/rebaseline-2.md') {
    throw 'Stage-membership control rejected protected user paths.'
}

$Identity = New-Object System.Collections.ArrayList
foreach ($Path in $Staged) {
    $IndexLine = @(Invoke-Git -Arguments @('ls-files', '-s', '--', $Path))[0]
    $IndexParts = $IndexLine -split '\s+'
    $Disk = @(Invoke-Git -Arguments @('hash-object', '--no-filters', '--', $Path))[0]
    if ($IndexParts[1] -ne $Disk) {
        throw "Raw/index byte mismatch: $Path"
    }
    [void] $Identity.Add([ordered]@{ path = $Path; blob = $IndexParts[1]; disk = $Disk })
}

$After = Get-ProtectedHashes
foreach ($Record in $After) {
    if ($Record.sha256 -ne $Expected[$Record.path]) {
        throw "Protected hash mismatch after staging: $($Record.path)"
    }
}

$Before | ConvertTo-Json -Depth 4 | Set-Content -LiteralPath (Join-Path $Receipt 'protected-before.json') -Encoding UTF8
$After | ConvertTo-Json -Depth 4 | Set-Content -LiteralPath (Join-Path $Receipt 'protected-after.json') -Encoding UTF8
$Staged | Set-Content -LiteralPath (Join-Path $Receipt 'staged-inventory.txt') -Encoding UTF8
$Identity | ConvertTo-Json -Depth 4 | Set-Content -LiteralPath (Join-Path $Receipt 'raw-index-identity.json') -Encoding UTF8
