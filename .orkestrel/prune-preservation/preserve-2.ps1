$ErrorActionPreference = 'Stop'

$archive = (Resolve-Path $PSScriptRoot).Path
$scaffold = 'C:\Users\mikes\WebstormProjects\scaffold'
$roughnotes = 'C:\Users\mikes\WebstormProjects\roughnotes'
$external = 'C:\Users\mikes\AppData\Local\Temp\scaffold-prune-20260919'
$old = Get-Content -LiteralPath (Join-Path $archive 'manifest.json') -Raw | ConvertFrom-Json
$records = New-Object System.Collections.Generic.List[object]
$unresolved = New-Object System.Collections.Generic.List[object]
$physical = @{}
$sourceTargets = @{}

function Test-RetainedPath([string] $Relative) {
    $parts = $Relative -split '[\\/]'
    if ($parts | Where-Object { $_ -in @('node_modules', '.git', 'dist', 'cache') }) { return $false }
    $extension = [IO.Path]::GetExtension($Relative).ToLowerInvariant()
    if ($extension -notin @('.md', '.txt', '.json', '.ps1', '.sh', '.mjs', '.js', '.ts', '.py', '.yaml', '.yml', '.toml', '.diff', '.patch')) { return $false }
    if ($extension -in @('.jsonl', '.err')) { return $false }
    $name = [IO.Path]::GetFileName($Relative)
    if ($name -match '(^|[-_.])(secret|auth|login)([-_.]|$)') { return $false }
    if ($Relative -match '(?i)(cursor|codex|claude)[\\/].*bench') {
        if ($extension -eq '.md' -and $name -match '(?i)(brief|report|final|result)') { return $true }
        if ($extension -in @('.ps1', '.sh', '.mjs', '.js')) { return $true }
        if ($extension -eq '.txt' -and $name -match '(?i)(final|result)') { return $true }
        return $false
    }
    return $true
}

function Add-Record([string] $Source, [string] $Relative, [string] $Namespace) {
    $identity = [IO.Path]::GetFullPath($Source)
    if ($sourceTargets.ContainsKey($identity)) { return }
    if (-not (Test-Path -LiteralPath $identity -PathType Leaf)) {
        $unresolved.Add([pscustomobject]@{ source = $identity; relative = $Relative; namespace = $Namespace })
        return
    }
    $sourceHash = (Get-FileHash -LiteralPath $identity -Algorithm SHA256).Hash
    $retained = $null
    $reused = $false
    if ($physical.ContainsKey($sourceHash)) {
        $retained = $physical[$sourceHash]
        $reused = $true
    }
    if ($null -eq $retained) {
        $relativeTarget = if ($Namespace -eq 'roughnotes') { "raw/roughnotes/$Relative" } else { "raw/$Relative" }
        $target = Join-Path $archive $relativeTarget
        $parent = Split-Path -Parent $target
        New-Item -ItemType Directory -Path $parent -Force | Out-Null
        if (-not (Test-Path -LiteralPath $target -PathType Leaf)) { Copy-Item -LiteralPath $identity -Destination $target }
        $targetHash = (Get-FileHash -LiteralPath $target -Algorithm SHA256).Hash
        if ($targetHash -ne $sourceHash) { throw "copy hash mismatch: $identity" }
        $retained = $relativeTarget
        $physical[$sourceHash] = $retained
    }
    $retainedPath = Join-Path $archive $retained
    $retainedHash = (Get-FileHash -LiteralPath $retainedPath -Algorithm SHA256).Hash
    if ($retainedHash -ne $sourceHash) { throw "retained hash mismatch: $identity" }
    $sourceTargets[$identity] = $retained
    $records.Add([pscustomobject]@{ identity = $identity; source = $identity; relative = $Relative; namespace = $Namespace; retained = $retained; sourceSha256 = $sourceHash; retainedSha256 = $retainedHash; reused = $reused })
}

foreach ($record in $old.records) {
    $target = Join-Path $archive $record.retained
    if ((Test-Path -LiteralPath $target -PathType Leaf) -and -not $physical.ContainsKey($record.retainedSha256)) { $physical[$record.retainedSha256] = $record.retained }
    if ($record.source.StartsWith($scaffold, [StringComparison]::OrdinalIgnoreCase)) {
        $relative = $record.source.Substring($scaffold.Length).TrimStart('\\')
        if (Test-RetainedPath $relative) {
            $sourceTargets[$record.source] = $record.retained
            $records.Add([pscustomobject]@{ identity = $record.source; source = $record.source; relative = $relative; namespace = 'scaffold'; retained = $record.retained; sourceSha256 = $record.sourceSha256; retainedSha256 = $record.retainedSha256; reused = $true })
        }
    }
}

$inventories = @(
    [pscustomobject]@{ file = 'roughnotes-files.txt'; root = $roughnotes; namespace = 'roughnotes' }
)
foreach ($inventory in $inventories) {
    $inventoryPath = Join-Path $external $inventory.file
    foreach ($line in Get-Content -LiteralPath $inventoryPath) {
        $relative = $line.Trim().Replace('/', '\\')
        if ([string]::IsNullOrWhiteSpace($relative) -or -not (Test-RetainedPath $relative)) { continue }
        $source = Join-Path $inventory.root $relative
        Add-Record $source $relative $inventory.namespace
    }
}

$manifestPath = Join-Path $archive 'manifest-2.json'
[pscustomobject]@{
    scaffoldRoot = $scaffold
    roughnotesRoot = $roughnotes
    records = $records
    unresolved = $unresolved
    excluded = @('media', 'archives', 'node_modules', '.git', 'dist', 'cache', 'jsonl', 'err journals', 'secret/auth/login', 'bench event and session streams')
} | ConvertTo-Json -Depth 7 | Set-Content -LiteralPath $manifestPath -Encoding UTF8

$reportPath = Join-Path $archive 'report-2.md'
$report = @"
# Corrected preservation receipt

`manifest-2.json` resolves Scaffold and Roughnotes entries from their separate absolute roots. It records every retained mapping, hash reuse, explicit exclusion class, and missing source.

`stage-paths-2.txt` is the explicit textual stage input. It excludes generated media and dependency caches that remain on disk.
"@
Set-Content -LiteralPath $reportPath -Value $report -Encoding UTF8

$stage = New-Object System.Collections.Generic.HashSet[string]([StringComparer]::OrdinalIgnoreCase)
foreach ($record in $records) {
    if ($record.namespace -eq 'scaffold' -and $record.relative.StartsWith('.orkestrel\\')) { continue }
    [void]$stage.Add(".orkestrel/prune-preservation/$($record.retained.Replace('\\', '/'))")
}
Get-ChildItem -LiteralPath (Join-Path $scaffold '.orkestrel') -Recurse -Force -File | ForEach-Object {
    $relative = $_.FullName.Substring($scaffold.Length + 1).Replace('\\', '/')
    if ($relative -like '.orkestrel/prune-preservation/*') { return }
    if (Test-RetainedPath $relative) { [void]$stage.Add($relative) }
}
Get-ChildItem -LiteralPath (Join-Path $archive 'worktrees') -Recurse -Force -File | ForEach-Object { [void]$stage.Add(('.orkestrel/prune-preservation/' + $_.FullName.Substring($archive.Length + 1).Replace('\\', '/'))) }
foreach ($file in @('.gitattributes', 'brief.md', 'brief-source.md', 'preserve.ps1', 'manifest.json', 'report.md', 'preserve-2.ps1', 'manifest-2.json', 'report-2.md')) { [void]$stage.Add(".orkestrel/prune-preservation/$file") }
$stage | Sort-Object | Set-Content -LiteralPath (Join-Path $archive 'stage-paths-2.txt') -Encoding UTF8
