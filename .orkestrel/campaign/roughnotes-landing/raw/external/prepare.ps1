param([switch]$Control)

$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

$scratch = 'C:\Users\mikes\AppData\Local\Temp\roughnotes-integration-20260918'
$original = 'C:\Users\mikes\WebstormProjects\roughnotes'
$recovery = 'C:\Users\mikes\WebstormProjects\scaffold\tmp\recovery\roughnotes'
$baseline = '86a9ef6bc4620fdf36c47af1f4c530693357eb86'
$originalPaths = @('app/browser/App.vue', 'app/browser/components/HomeView.vue', 'app/browser/components/MagazineView.vue', 'app/browser/components/MediaView.vue', 'app/browser/components/ProductsView.vue', 'app/browser/constants.ts', 'guides/README.md', 'tests/app/browser/App.test.ts', 'tests/app/browser/helpers.test.ts', 'tests/app/browser/setup.ts')
$codexPaths = @('.codex/agents/orkestrel.toml', '.codex/hooks.json')

function Require-Root {
	param([string]$Path, [string]$Label)
	if ((Resolve-Path -LiteralPath $Path).Path -ne $Path) { throw "$Label root drifted: $Path" }
}

function Require-Git {
	param([string]$Root, [string]$Branch)
	$head = (& git -C $Root rev-parse HEAD).Trim()
	$current = (& git -C $Root branch --show-current).Trim()
	if ($LASTEXITCODE -ne 0 -or $head -ne $baseline -or $current -ne $Branch) { throw "Unexpected Git identity for $Root" }
}

function Get-HashRecord {
	param([string]$Root, [string]$Path)
	$full = Join-Path $Root $Path
	if (-not (Test-Path -LiteralPath $full -PathType Leaf)) { return [ordered]@{ path = $Path; absent = $true } }
	return [ordered]@{ path = $Path; sha256 = (Get-FileHash -LiteralPath $full -Algorithm SHA256).Hash.ToLowerInvariant() }
}

function Require-Paths {
	param([string[]]$Actual, [string[]]$Expected, [string]$Label)
	if (($Actual | Sort-Object) -join "`n" -cne ($Expected | Sort-Object) -join "`n") { throw "$Label paths differ from the measured allowlist" }
}

function Require-Exclusive {
	param([string]$Path)
	if (Test-Path -LiteralPath $Path) { throw "Backup destination exists: $Path" }
}

Require-Root -Path $scratch -Label 'Scratch'
Require-Root -Path $original -Label 'Original'
Require-Root -Path $recovery -Label 'Recovery'
Require-Git -Root $original -Branch 'main'
Require-Git -Root $recovery -Branch 'recovery/journey-20260918'

if ($Control) {
	$controlPath = Join-Path $scratch 'control-existing'
	New-Item -ItemType Directory -Path $controlPath -ErrorAction Stop | Out-Null
	try { Require-Exclusive -Path $controlPath; throw 'Control did not refuse an existing destination' } catch { if ($_.Exception.Message -notmatch '^Backup destination exists:') { throw } }
	Write-Output 'Existing-destination control refused before preparation.'
	return
}

$recoveryPaths = @(Get-Content -LiteralPath (Join-Path $scratch 'recovery-paths.txt'))
$originalStatus = @(& git -C $original status --porcelain=v1)
$recoveryStatus = @(& git -C $recovery status --porcelain=v1)
$originalModified = @($originalStatus | Where-Object { $_ -match '^ M ' } | ForEach-Object { $_.Substring(3) })
$originalStaged = @($originalStatus | Where-Object { $_ -match '^A  ' } | ForEach-Object { $_.Substring(3) })
$recoveryChanged = @(& git -C $recovery diff --name-only; & git -C $recovery ls-files --others --exclude-standard) | Sort-Object -Unique
Require-Paths -Actual $originalModified -Expected $originalPaths -Label 'Original modified'
Require-Paths -Actual $originalStaged -Expected $codexPaths -Label 'Original staged'
Require-Paths -Actual $recoveryChanged -Expected $recoveryPaths -Label 'Recovery changed'
& git -C $recovery diff --cached --quiet
if ($LASTEXITCODE -ne 0) { throw 'Recovery index is not clean.' }

$backup = Join-Path $scratch 'backup'
Require-Exclusive -Path $backup
New-Item -ItemType Directory -Path $backup -ErrorAction Stop | Out-Null
$records = @($originalPaths + $codexPaths | ForEach-Object { Get-HashRecord -Root $original -Path $_ })
$index = @(& git -C $original ls-files -s -- $codexPaths)
[System.IO.File]::WriteAllText((Join-Path $backup 'original-status.txt'), (($originalStatus -join "`n") + "`n"), [System.Text.UTF8Encoding]::new($false))
[System.IO.File]::WriteAllText((Join-Path $backup 'original-index.txt'), (($index -join "`n") + "`n"), [System.Text.UTF8Encoding]::new($false))
[System.IO.File]::WriteAllText((Join-Path $backup 'original-hashes.json'), (($records | ConvertTo-Json -Depth 4) + "`n"), [System.Text.UTF8Encoding]::new($false))
& git -C $original diff --binary --output (Join-Path $backup 'original-unstaged.patch')
& git -C $original diff --cached --binary --output (Join-Path $backup 'original-staged.patch')
foreach ($path in $originalPaths + $codexPaths) {
	$target = Join-Path $backup $path
	New-Item -ItemType Directory -Path (Split-Path -Parent $target) -Force | Out-Null
	Copy-Item -LiteralPath (Join-Path $original $path) -Destination $target -ErrorAction Stop
	if ((Get-HashRecord -Root $original -Path $path).sha256 -ne (Get-HashRecord -Root $backup -Path $path).sha256) { throw "Backup hash mismatch: $path" }
}
[System.IO.File]::WriteAllText((Join-Path $backup 'recovery-status.txt'), (($recoveryStatus -join "`n") + "`n"), [System.Text.UTF8Encoding]::new($false))
[System.IO.File]::WriteAllText((Join-Path $backup 'recovery-hashes.json'), ((@($recoveryPaths | ForEach-Object { Get-HashRecord -Root $recovery -Path $_ }) | ConvertTo-Json -Depth 4) + "`n"), [System.Text.UTF8Encoding]::new($false))
& git -C $recovery add -- $recoveryPaths
if ($LASTEXITCODE -ne 0) { throw 'Recovery staging failed.' }
& git -C $recovery diff --cached --stat | Set-Content -LiteralPath (Join-Path $backup 'recovery-staged-diffstat.txt') -Encoding utf8
& git -C $recovery status --short | Set-Content -LiteralPath (Join-Path $backup 'recovery-staged-status.txt') -Encoding utf8
