$ErrorActionPreference = 'Stop'

function Copy-PreservedFile {
    param([string] $Source, [string] $Relative, [System.Collections.ArrayList] $Records)

    $Destination = Join-Path $Root $Relative
    $Directory = Split-Path -Parent $Destination
    New-Item -ItemType Directory -Path $Directory -Force | Out-Null
    if (Test-Path -LiteralPath $Destination) { throw "Destination exists: $Destination" }
    $SourceHash = (Get-FileHash -Algorithm SHA256 -LiteralPath $Source).Hash
    Copy-Item -LiteralPath $Source -Destination $Destination
    $CopyHash = (Get-FileHash -Algorithm SHA256 -LiteralPath $Destination).Hash
    if ($SourceHash -ne $CopyHash) { throw "Hash mismatch: $Source" }
    [void] $Records.Add([ordered]@{ source = $Source; retained = $Relative.Replace('\', '/'); sourceSha256 = $SourceHash; retainedSha256 = $CopyHash })
}

function Test-PreservedPath {
    param([string] $Relative)

    if ($Relative -match '(^|\\)(node_modules|\.git|dist|cache)(\\|$)' -or $Relative -match '\.(png|jpg|jpeg|gif|webp|mp4|webm|tgz|tar|gz|zip|jsonl)$' -or $Relative -match '(secret|auth|login)') { return $false }
    if ($Relative -notmatch '\.(md|txt|json|ps1|sh|mjs|js|ts|py|yaml|yml|toml|diff|patch)$') { return $false }
    if ($Relative -match '^tmp\\(audit\\setup-vue-(control|objective|subjective)|release\\scaffold-0\.0\.75|recovery\\roughnotes)\\') {
        return $Relative -match '^tmp\\(audit\\setup-vue-(control|objective|subjective)|release\\scaffold-0\.0\.75|recovery\\roughnotes)\\(tmp|\.orkestrel)\\'
    }
    return $Relative -match '^(tmp|\.orkestrel)\\'
}

function Save-WorktreeRecord {
    param([string] $Name, [string] $Path)

    $Target = Join-Path $Root "worktrees/$Name"
    New-Item -ItemType Directory -Path $Target -Force | Out-Null
    $Head = @(& git -C $Path rev-parse HEAD)[0]
    if ($LASTEXITCODE -ne 0) { throw "HEAD read failed: $Path" }
    [System.IO.File]::WriteAllText((Join-Path $Target 'HEAD.txt'), $Head + "`n")
    & git -C $Path status --porcelain=v1 | Set-Content -LiteralPath (Join-Path $Target 'status.txt') -Encoding UTF8
    if ($LASTEXITCODE -ne 0) { throw "Status read failed: $Path" }
    & git -C $Path diff --binary --output (Join-Path $Target 'unstaged.patch')
    if ($LASTEXITCODE -ne 0) { throw "Unstaged patch failed: $Path" }
    & git -C $Path diff --cached --binary --output (Join-Path $Target 'staged.patch')
    if ($LASTEXITCODE -ne 0) { throw "Staged patch failed: $Path" }
}

$Root = Join-Path (Get-Location) '.orkestrel/prune-preservation'
$InventoryRoot = 'C:\Users\mikes\AppData\Local\Temp\scaffold-prune-20260919'
$Inventories = @('scaffold-files.txt', 'roughnotes-files.txt')
$Records = New-Object System.Collections.ArrayList
$Unresolved = New-Object System.Collections.ArrayList
$Seen = New-Object 'System.Collections.Generic.HashSet[string]'

foreach ($Inventory in $Inventories) {
    Copy-PreservedFile -Source (Join-Path $InventoryRoot $Inventory) -Relative (Join-Path 'inventories' $Inventory) -Records $Records
}

Save-WorktreeRecord -Name 'setup-vue-control' -Path 'tmp/audit/setup-vue-control'
Save-WorktreeRecord -Name 'setup-vue-objective' -Path 'tmp/audit/setup-vue-objective'
Save-WorktreeRecord -Name 'setup-vue-subjective' -Path 'tmp/audit/setup-vue-subjective'
Copy-PreservedFile -Source (Join-Path $InventoryRoot 'preservation-brief.md') -Relative 'brief-source.md' -Records $Records

foreach ($Inventory in $Inventories) {
    Get-Content -LiteralPath (Join-Path $InventoryRoot $Inventory) | ForEach-Object {
        $Relative = $_.Trim()
        if ([string]::IsNullOrWhiteSpace($Relative) -or -not (Test-PreservedPath -Relative $Relative)) { return }
        if (-not $Seen.Add($Relative)) { return }
        $Source = Join-Path (Get-Location) $Relative
        if (-not (Test-Path -LiteralPath $Source -PathType Leaf)) { [void] $Unresolved.Add($Relative); return }
        $Item = Get-Item -LiteralPath $Source
        if ($Item.Attributes -band [IO.FileAttributes]::ReparsePoint) { throw "Reparse point: $Source" }
        Copy-PreservedFile -Source $Source -Relative (Join-Path 'raw' $Relative) -Records $Records
    }
}

$Manifest = [ordered]@{
    purpose = 'Preserved campaign records and dirty audit worktree patches before authorized deletion.'
    inventories = $Inventories
    exclusions = @('media', 'archives', 'node_modules', '.git', 'dist', 'cache', 'JSONL journals', 'secret/auth/login files', 'nested worktree product trees')
    worktrees = @('setup-vue-control', 'setup-vue-objective', 'setup-vue-subjective')
    unresolved = $Unresolved
    records = $Records
}
$Manifest | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath (Join-Path $Root 'manifest.json') -Encoding UTF8
