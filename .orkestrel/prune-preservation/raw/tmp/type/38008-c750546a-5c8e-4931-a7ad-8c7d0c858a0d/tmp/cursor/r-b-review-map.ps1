$ErrorActionPreference = 'Stop'
$root = 'C:\Users\mikes\WebstormProjects\scaffold'
$entry = 'C:\Users\mikes\AppData\Local\cursor-agent\versions\2026.09.15-d2fe57e'
$journal = Join-Path $root 'tmp\cursor\r-b-review-map.jsonl'
$errorLog = Join-Path $root 'tmp\cursor\r-b-review-map.err'
$env:CURSOR_GROK_MODEL = 'cursor-grok-4.6-high'
$runner = Start-Process -FilePath (Join-Path $entry 'node.exe') -ArgumentList @((Join-Path $entry 'index.js'), '-p', '--trust', '--mode=ask', '--model', $env:CURSOR_GROK_MODEL, '--output-format', 'stream-json', '"Read C:/Users/mikes/WebstormProjects/scaffold/tmp/cursor/r-b-review-map-brief.md and return the requested evidence."') -WorkingDirectory $root -RedirectStandardOutput $journal -RedirectStandardError $errorLog -WindowStyle Hidden -PassThru
Write-Output "Recovery PID $($runner.Id); journal $journal; cap 900 seconds."
if (-not $runner.WaitForExit(900000)) {
    & taskkill.exe /PID $runner.Id /T /F
    throw 'Cursor R-B map exceeded 900 seconds.'
}
$runner.WaitForExit()
Get-Content -LiteralPath $journal -Encoding utf8 | ForEach-Object {
    $event = $_ | ConvertFrom-Json
    if ($event.type -eq 'result') { $event | ConvertTo-Json -Compress -Depth 8 }
}
Get-Content -LiteralPath $errorLog -Encoding utf8
exit $runner.ExitCode
