param([Parameter(Mandatory = $true)][string]$Run)
$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest
$taskRoot = 'C:\Users\mikes\WebstormProjects\scaffold'
$nodePath = 'C:\Users\mikes\scoop\apps\nodejs-lts\current\node.exe'
if ($Run -cnotmatch '^[a-z][a-z0-9-]{0,79}$') { throw 'Supply a bounded run name.' }
$evidenceRoot = Join-Path $taskRoot 'tmp\units\roughnotes-registry-gates-evidence'
$outputLog = Join-Path $evidenceRoot ($Run + '.launcher.stdout.log.txt')
$errorLog = Join-Path $evidenceRoot ($Run + '.launcher.stderr.log.txt')
$resultLog = Join-Path $evidenceRoot ($Run + '.launcher.result.json')
if ((Test-Path -LiteralPath $outputLog) -or (Test-Path -LiteralPath $errorLog) -or (Test-Path -LiteralPath $resultLog) -or (Test-Path -LiteralPath (Join-Path $evidenceRoot $Run))) { throw 'Run evidence or launcher logs exist; refusing replacement.' }
if (-not (Test-Path -LiteralPath $evidenceRoot)) { New-Item -ItemType Directory -Path $evidenceRoot -ErrorAction Stop | Out-Null }
$runner = Start-Process -FilePath $nodePath -ArgumentList @('tmp/release/run-roughnotes-registry-gates.mjs', $Run) -WorkingDirectory $taskRoot -RedirectStandardOutput $outputLog -RedirectStandardError $errorLog -WindowStyle Hidden -PassThru
$handle = $runner.Handle
$processId = $runner.Id
Write-Output "Roughnotes registry gates PID $processId; cap 900 seconds."
$expired = -not $runner.WaitForExit(900000)
if ($expired) {
	& "$env:SystemRoot\System32\taskkill.exe" /PID $processId /T /F
	$terminationExit = $LASTEXITCODE
	$nativeExit = 124
} else {
	$runner.WaitForExit()
	$nativeExit = $runner.ExitCode
	$terminationExit = $null
}
$record = [pscustomobject]@{ pid = $processId; handle = $handle; expired = $expired; exit = $nativeExit; termination = $terminationExit; time = [DateTime]::UtcNow.ToString('o') }
[System.IO.File]::WriteAllText($resultLog, ($record | ConvertTo-Json), [System.Text.UTF8Encoding]::new($false))
Get-Content -LiteralPath $outputLog -Encoding utf8
Get-Content -LiteralPath $errorLog -Encoding utf8
$runner.Dispose()
exit $nativeExit
