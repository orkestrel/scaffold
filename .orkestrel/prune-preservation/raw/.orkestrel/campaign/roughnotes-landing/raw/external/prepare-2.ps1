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
	$head = (Invoke-Git -Root $Root -Arguments @('rev-parse', 'HEAD')).Trim()
	$current = (Invoke-Git -Root $Root -Arguments @('branch', '--show-current')).Trim()
	if ($head -ne $baseline -or $current -ne $Branch) { throw "Unexpected Git identity for $Root" }
}

function Invoke-Git {
	param([string]$Root, [string[]]$Arguments)
	$output = @(& git -C $Root @Arguments)
	if ($LASTEXITCODE -ne 0) { throw "Git failed: $($Arguments -join ' ')" }
	return $output
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
	$controlPath = Join-Path $scratch 'control-successor-2-existing'
	New-Item -ItemType Directory -Path $controlPath -ErrorAction Stop | Out-Null
	try { Require-Exclusive -Path $controlPath; throw 'Control did not refuse an existing destination' } catch { if ($_.Exception.Message -notmatch '^Backup destination exists:') { throw } }
	try { Require-Paths -Actual @(' M expected', '?? unexpected') -Expected @(' M expected') -Label 'Synthetic status'; throw 'Control did not reject an unexpected status row' } catch { if ($_.Exception.Message -notmatch '^Synthetic status paths differ') { throw } }
	try { Invoke-Git -Root $original -Arguments @('rev-parse', 'missing-ref-for-control') | Out-Null; throw 'Control did not reject a native Git failure' } catch { if ($_.Exception.Message -notmatch '^Git failed:') { throw } }
	Write-Output 'Existing destination, unexpected status, and native Git controls refused before preparation.'
	exit 0
}

$recoveryPaths = @(Get-Content -LiteralPath (Join-Path $scratch 'recovery-paths.txt'))
$originalStatus = @(Invoke-Git -Root $original -Arguments @('status', '--porcelain=v1'))
$recoveryStatus = @(Invoke-Git -Root $recovery -Arguments @('status', '--porcelain=v1'))
$expectedOriginalStatus = @(Get-Content -LiteralPath (Join-Path $scratch 'original-status.expected.txt'))
$expectedRecoveryStatus = @(Get-Content -LiteralPath (Join-Path $scratch 'recovery-status.expected.txt'))
$recoveryChanged = @((Invoke-Git -Root $recovery -Arguments @('diff', '--name-only')); (Invoke-Git -Root $recovery -Arguments @('ls-files', '--others', '--exclude-standard'))) | Sort-Object -Unique
Require-Paths -Actual $originalStatus -Expected $expectedOriginalStatus -Label 'Original status'
Require-Paths -Actual $recoveryStatus -Expected $expectedRecoveryStatus -Label 'Recovery status'
Require-Paths -Actual $recoveryChanged -Expected $recoveryPaths -Label 'Recovery changed'
& git -C $recovery diff --cached --quiet
if ($LASTEXITCODE -ne 0) { throw 'Recovery index is not clean.' }

$backup = Join-Path $scratch 'backup'
Require-Exclusive -Path $backup
New-Item -ItemType Directory -Path $backup -ErrorAction Stop | Out-Null
$records = @($originalPaths + $codexPaths | ForEach-Object { Get-HashRecord -Root $original -Path $_ })
$index = @(Invoke-Git -Root $original -Arguments (@('ls-files', '-s', '--') + $codexPaths))
[System.IO.File]::WriteAllText((Join-Path $backup 'original-status.txt'), (($originalStatus -join "`n") + "`n"), [System.Text.UTF8Encoding]::new($false))
[System.IO.File]::WriteAllText((Join-Path $backup 'original-index.txt'), (($index -join "`n") + "`n"), [System.Text.UTF8Encoding]::new($false))
[System.IO.File]::WriteAllText((Join-Path $backup 'original-hashes.json'), (($records | ConvertTo-Json -Depth 4) + "`n"), [System.Text.UTF8Encoding]::new($false))
& git -C $original diff --binary --output (Join-Path $backup 'original-unstaged.patch')
if ($LASTEXITCODE -ne 0) { throw 'Original unstaged patch failed.' }
& git -C $original diff --cached --binary --output (Join-Path $backup 'original-staged.patch')
if ($LASTEXITCODE -ne 0) { throw 'Original staged patch failed.' }
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
$stagedDiffstat = Invoke-Git -Root $recovery -Arguments @('diff', '--cached', '--stat')
$stagedStatus = Invoke-Git -Root $recovery -Arguments @('status', '--short')
[System.IO.File]::WriteAllText((Join-Path $backup 'recovery-staged-diffstat.txt'), (($stagedDiffstat -join "`n") + "`n"), [System.Text.UTF8Encoding]::new($false))
[System.IO.File]::WriteAllText((Join-Path $backup 'recovery-staged-status.txt'), (($stagedStatus -join "`n") + "`n"), [System.Text.UTF8Encoding]::new($false))
$afterHashes = @($originalPaths + $codexPaths | ForEach-Object { Get-HashRecord -Root $original -Path $_ })
$afterIndex = @(Invoke-Git -Root $original -Arguments (@('ls-files', '-s', '--') + $codexPaths))
if (($records | ConvertTo-Json -Depth 4) -cne ($afterHashes | ConvertTo-Json -Depth 4) -or ($index -join "`n") -cne ($afterIndex -join "`n")) { throw 'Original source or index changed during preparation.' }
