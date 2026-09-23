# The engine session's codex exec launcher: starts a lane detached through cmd.exe (stdin NUL,
# stdout and stderr to files), journals the event stream, and records the pid beside the journal.
# Usage: powershell -NoProfile -ExecutionPolicy Bypass -File launch-codex.ps1 -Unit <unit> -Brief <path> -Sandbox <read-only|workspace-write> -Root <working directory> [-Lane <sentence>]
param(
	[Parameter(Mandatory = $true)][string]$Unit,
	[Parameter(Mandatory = $true)][string]$Brief,
	[Parameter(Mandatory = $true)][string]$Sandbox,
	[Parameter(Mandatory = $true)][string]$Root,
	[string]$Lane = 'Your final message must be the report it specifies.',
	[string]$Effort = 'high'
)
$ErrorActionPreference = 'Stop'
$scaffold = 'C:\Users\mikes\WebstormProjects\scaffold'
$dir = Join-Path $scaffold 'tmp\codex'
New-Item -ItemType Directory -Force -Path $dir | Out-Null
$journal = Join-Path $dir "$Unit.jsonl"
$err = Join-Path $dir "$Unit.err"
$last = Join-Path $dir "$Unit-last.md"
$pidFile = Join-Path $dir "$Unit.pid"
$prompt = "Read and execute the brief at $Brief exactly. $Lane"
$skip = ''
if ($Root -notlike '*\veneer*' -and $Root -notlike '*/veneer*') { $skip = '--skip-git-repo-check ' }
$command = "codex exec --json -C $Root $skip--sandbox $Sandbox --model gpt-6-astra -c `"model_reasoning_effort=\`"$Effort\`"`" --output-last-message `"$last`" `"$prompt`" < NUL > `"$journal`" 2> `"$err`""
$process = Start-Process -FilePath 'cmd.exe' -ArgumentList @('/c', $command) -WorkingDirectory $scaffold -WindowStyle Hidden -PassThru
Set-Content -Path $pidFile -Value $process.Id
Write-Output ("unit=" + $Unit)
Write-Output ("pid=" + $process.Id)
Write-Output ("journal=" + $journal)
Write-Output ("command=" + $command)
