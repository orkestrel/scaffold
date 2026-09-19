$ErrorActionPreference = 'Stop'
$taskRoot = 'C:\Users\mikes\WebstormProjects\scaffold'
$entry = 'C:\Users\mikes\AppData\Local\cursor-agent\versions\2026.09.15-d2fe57e'
$journal = Join-Path $taskRoot 'tmp\cursor\recovery-retention-map.jsonl'
$errorLog = Join-Path $taskRoot 'tmp\cursor\recovery-retention-map.err'
if ((Test-Path -LiteralPath $journal) -or (Test-Path -LiteralPath $errorLog)) { throw 'Journal path exists' }
$runner = Start-Process -FilePath (Join-Path $entry 'node.exe') -ArgumentList @((Join-Path $entry 'index.js'), '-p', '--trust', '--mode=ask', '--model', 'cursor-grok-4.6-high', '--output-format', 'stream-json', '"Read tmp/cursor/recovery-retention-map-brief.md and return the requested evidence."') -WorkingDirectory $taskRoot -RedirectStandardOutput $journal -RedirectStandardError $errorLog -WindowStyle Hidden -PassThru
Write-Output "Retention map PID $($runner.Id); journal $journal; cap900seconds."
if (-not $runner.WaitForExit(900000)) {
    & taskkill.exe /PID $runner.Id /T /F
    throw 'Cursor retention map exceeded900seconds.'
}
$runner.WaitForExit()
Get-Content -LiteralPath $journal -Encoding utf8 | ForEach-Object {
    $event = $_ | ConvertFrom-Json
    if ($event.type -eq 'result') { $event | Select-Object type,session_id,duration_ms,is_error | ConvertTo-Json -Compress }
}
Get-Content -LiteralPath $errorLog -Encoding utf8
exit $runner.ExitCode
