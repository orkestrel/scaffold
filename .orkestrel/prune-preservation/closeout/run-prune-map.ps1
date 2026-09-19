$ErrorActionPreference = 'Stop'
$taskRoot = 'C:\Users\mikes\WebstormProjects\scaffold'
$entry = 'C:\Users\mikes\AppData\Local\cursor-agent\versions\2026.09.15-d2fe57e'
$journal = 'C:\Users\mikes\AppData\Local\Temp\scaffold-prune-20260919\tmp\cursor\prune-map.jsonl'
$errorLog = 'C:\Users\mikes\AppData\Local\Temp\scaffold-prune-20260919\tmp\cursor\prune-map.err'
if ((Test-Path -LiteralPath $journal) -or (Test-Path -LiteralPath $errorLog)) { throw 'Journal path exists' }
$runner = Start-Process -FilePath (Join-Path $entry 'node.exe') -ArgumentList @((Join-Path $entry 'index.js'), '-p', '--trust', '--mode=ask', '--model', 'cursor-grok-4.6-high', '--output-format', 'stream-json', '"Read C:/Users/mikes/AppData/Local/Temp/scaffold-prune-20260919/tmp/cursor/prune-map-brief.md and return the requested evidence."') -WorkingDirectory $taskRoot -RedirectStandardOutput $journal -RedirectStandardError $errorLog -WindowStyle Hidden -PassThru
$nativeHandle = $runner.Handle
Write-Output "Field-pass harness map PID $($runner.Id); journal $journal; cap 900 seconds."
if (-not $runner.WaitForExit(900000)) {
    & taskkill.exe /PID $runner.Id /T /F
    throw 'Cursor field-pass harness map exceeded 900 seconds.'
}
$runner.WaitForExit()
Get-Content -LiteralPath $journal -Encoding utf8 | ForEach-Object {
    $event = $_ | ConvertFrom-Json
    if ($event.type -eq 'result') { $event | Select-Object type,session_id,duration_ms,is_error | ConvertTo-Json -Compress }
}
Get-Content -LiteralPath $errorLog -Encoding utf8
exit $runner.ExitCode
