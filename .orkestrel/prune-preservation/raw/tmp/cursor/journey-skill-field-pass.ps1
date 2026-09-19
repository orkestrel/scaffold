$ErrorActionPreference = 'Stop'
$root = 'C:\Users\mikes\WebstormProjects\scaffold'
$subject = 'C:\Users\mikes\WebstormProjects\scaffold'
$entry = 'C:\Users\mikes\AppData\Local\cursor-agent\versions\2026.09.15-d2fe57e'
$journal = Join-Path $root 'tmp\cursor\journey-skill-field-pass.jsonl'
$errorLog = Join-Path $root 'tmp\cursor\journey-skill-field-pass.err'
if ((Test-Path -LiteralPath $journal) -or (Test-Path -LiteralPath $errorLog)) { throw 'Journal path exists' }
$env:CURSOR_GROK_MODEL = 'cursor-grok-4.6-high'
$runner = Start-Process -FilePath (Join-Path $entry 'node.exe') -ArgumentList @((Join-Path $entry 'index.js'), '-p', '--trust', '--mode=ask', '--model', $env:CURSOR_GROK_MODEL, '--output-format', 'stream-json', '"Read C:/Users/mikes/WebstormProjects/scaffold/tmp/cursor/journey-skill-field-pass-brief.md and return the requested evidence."') -WorkingDirectory $subject -RedirectStandardOutput $journal -RedirectStandardError $errorLog -WindowStyle Hidden -PassThru
Write-Output "Recovery PID $($runner.Id); journal $journal; cap900seconds."
if (-not $runner.WaitForExit(900000)) {
    & taskkill.exe /PID $runner.Id /T /F
    throw 'Cursor journey field map exceeded900seconds.'
}
$runner.WaitForExit()
Get-Content -LiteralPath $journal -Encoding utf8 | ForEach-Object {
    $event = $_ | ConvertFrom-Json
    if ($event.type -eq 'result') { $event | Select-Object type,session_id,duration_ms,is_error | ConvertTo-Json -Compress }
}
Get-Content -LiteralPath $errorLog -Encoding utf8
exit $runner.ExitCode
