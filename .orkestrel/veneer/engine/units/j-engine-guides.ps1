# Launches the J-ENGINE-GUIDES Grok lane detached from the launching shell, journaling its
# event stream, so a run longer than the foreground cap survives. Records the pid beside the journal.
$ErrorActionPreference = 'Stop'
$root = 'C:\Users\mikes\WebstormProjects\scaffold'
$versions = Join-Path $env:LOCALAPPDATA 'cursor-agent\versions'
$entry = Get-ChildItem -Path $versions -Directory | Sort-Object Name | Select-Object -Last 1
$node = Join-Path $entry.FullName 'node.exe'
$index = Join-Path $entry.FullName 'index.js'
$journal = Join-Path $root 'tmp\cursor\j-engine-guides.jsonl'
$err = Join-Path $root 'tmp\cursor\j-engine-guides.err'
$pidFile = Join-Path $root 'tmp\cursor\j-engine-guides.pid'
$prompt = 'Read and execute the brief at C:/Users/mikes/WebstormProjects/scaffold/tmp/cursor/j-engine-guides-brief.md exactly. Your final message must be the distillate it specifies.'
$arguments = @($index, '-p', '--trust', '--mode=ask', '--model', 'grok-4.7-high', '--output-format', 'stream-json', $prompt)
$process = Start-Process -FilePath $node -ArgumentList $arguments -WorkingDirectory $root -RedirectStandardOutput $journal -RedirectStandardError $err -WindowStyle Hidden -PassThru
Set-Content -Path $pidFile -Value $process.Id
Write-Output ("entry=" + $entry.FullName)
Write-Output ("pid=" + $process.Id)
Write-Output ("journal=" + $journal)
