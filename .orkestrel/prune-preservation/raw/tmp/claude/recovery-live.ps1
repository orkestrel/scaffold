$ErrorActionPreference = 'Stop'
$root = 'C:\Users\mikes\WebstormProjects\scaffold'
$journal = Join-Path $root 'tmp\claude\recovery-live.jsonl'
$errorLog = Join-Path $root 'tmp\claude\recovery-live.err'
$runner = Start-Process -FilePath 'C:\Users\mikes\scoop\shims\claude.exe' -ArgumentList @('-p', '"Return exactly RECOVERY_OPUS_LIVE. Use no tools."', '--model', 'opus', '--effort', 'high', '--permission-mode', 'plan', '--output-format', 'stream-json', '--verbose') -WorkingDirectory $root -RedirectStandardOutput $journal -RedirectStandardError $errorLog -WindowStyle Hidden -PassThru
Write-Output "Probe PID $($runner.Id); journal $journal; cap 180 seconds."
if (-not $runner.WaitForExit(180000)) {
    & taskkill.exe /PID $runner.Id /T /F
    throw 'Opus availability probe exceeded 180 seconds.'
}
$runner.WaitForExit()
Get-Content -LiteralPath $journal -Encoding utf8 | ForEach-Object {
    $event = $_ | ConvertFrom-Json
    if ($event.type -eq 'result') { $event | Select-Object type,subtype,session_id,result,is_error | ConvertTo-Json -Compress }
}
Get-Content -LiteralPath $errorLog -Encoding utf8
exit $runner.ExitCode
