$ErrorActionPreference = 'Stop'
$taskRoot = 'C:\Users\mikes\WebstormProjects\scaffold'
$outputLog = Join-Path $taskRoot 'tmp\units\anchor-gates-root.log.txt'
$errorLog = Join-Path $taskRoot 'tmp\units\anchor-gates-root.err.txt'
if ((Test-Path -LiteralPath $outputLog) -or (Test-Path -LiteralPath $errorLog)) { throw 'Root gate log exists' }
$runner = Start-Process -FilePath 'C:\Users\mikes\scoop\apps\nodejs-lts\current\node.exe' -ArgumentList @('tmp/release/run-anchor-gates.mjs', '2f78b38a7c938d7e4f5b5c8f2030385bfcb5d6eb') -WorkingDirectory $taskRoot -RedirectStandardOutput $outputLog -RedirectStandardError $errorLog -WindowStyle Hidden -PassThru
$handle = $runner.Handle
Write-Output "Root anchor gate PID $($runner.Id); independent cap 900 seconds."
if (-not $runner.WaitForExit(900000)) {
    & taskkill.exe /PID $runner.Id /T /F
    throw 'Root anchor gate cap expired.'
}
$runner.WaitForExit()
Get-Content -LiteralPath $outputLog -Encoding utf8
Get-Content -LiteralPath $errorLog -Encoding utf8
exit $runner.ExitCode
