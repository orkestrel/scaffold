$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

$worktree = 'C:\Users\mikes\WebstormProjects\scaffold\tmp\release\scaffold-0.0.75'
$expectedHead = '178c7cbbe4f125e4d6ca33e54918f12f9339f5e9'
$script = $PSCommandPath

if ([string]::IsNullOrWhiteSpace($script)) {
    throw 'PowerShell did not provide the script path.'
}

$log = Join-Path -Path (Split-Path -Path $script -Parent) -ChildPath 'prepare-scaffold-0.0.75.log'

function Invoke-ReleaseCommand {
    param(
        [string]$File,
        [string[]]$Arguments
    )

    & $File @Arguments 2>&1 | Tee-Object -FilePath $log -Append

    if ($LASTEXITCODE -ne 0) {
        throw "The $File command failed with exit code $LASTEXITCODE."
    }
}

Set-Location -LiteralPath $worktree

$head = (& git rev-parse HEAD).Trim()
if ($LASTEXITCODE -ne 0) {
    throw "Git could not read the HEAD of $worktree."
}

if ($head -ne $expectedHead) {
    throw "Expected HEAD $expectedHead, received $head."
}

$tracked = & git status --short --untracked-files=no
if ($LASTEXITCODE -ne 0) {
    throw "Git could not read the tracked status of $worktree."
}

if ($tracked) {
    throw "The worktree has tracked changes: $tracked"
}

Invoke-ReleaseCommand -File 'npm.cmd' -Arguments @('version', '0.0.75', '--no-git-tag-version')
Invoke-ReleaseCommand -File 'npm.cmd' -Arguments @('install', '--save-dev', '@orkestrel/test@^0.0.18')

Write-Host "Prepared Scaffold 0.0.75. Log: $log"
