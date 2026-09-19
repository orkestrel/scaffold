param(
    [Parameter(Mandatory = $true)][string]$Version,
    [Parameter(Mandatory = $true)][string]$Integrity,
    [Parameter(Mandatory = $true)][string]$Run
)
$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest
$taskRoot = 'C:\Users\mikes\WebstormProjects\scaffold'
$nodePath = 'C:\Users\mikes\scoop\apps\nodejs-lts\current\node.exe'
if ($Version -cne '0.0.75' -or $Integrity -cnotmatch '^sha512-[A-Za-z0-9+/]{86}==$' -or $Run -cnotmatch '^[a-z][a-z0-9-]{0,79}$') {
    throw 'Supply version 0.0.75, verified sha512 integrity, and a bounded run name.'
}
$evidenceRoot = Join-Path $taskRoot 'tmp\units\roughnotes-registry-adoption-evidence'
$outputLog = Join-Path $evidenceRoot ($Run + '.launcher.stdout.log.txt')
$errorLog = Join-Path $evidenceRoot ($Run + '.launcher.stderr.log.txt')
$resultLog = Join-Path $evidenceRoot ($Run + '.launcher.result.json')
if ((Test-Path -LiteralPath $outputLog) -or (Test-Path -LiteralPath $errorLog) -or (Test-Path -LiteralPath $resultLog) -or (Test-Path -LiteralPath (Join-Path $evidenceRoot $Run))) {
    throw 'Run evidence or launcher logs exist; refusing replacement.'
}
$runner = Start-Process -FilePath $nodePath -ArgumentList @('tmp/release/adopt-roughnotes-registry.mjs', $Version, $Integrity, $Run) -WorkingDirectory $taskRoot -RedirectStandardOutput $outputLog -RedirectStandardError $errorLog -WindowStyle Hidden -PassThru
$handle = $runner.Handle
$processId = $runner.Id
Write-Output "Roughnotes registry adoption PID $processId; cap 900 seconds."
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
$record = [pscustomobject]@{ pid = $processId; expired = $expired; exit = $nativeExit; termination = $terminationExit; time = [DateTime]::UtcNow.ToString('o') }
[System.IO.File]::WriteAllText($resultLog, ($record | ConvertTo-Json), [System.Text.UTF8Encoding]::new($false))
Get-Content -LiteralPath $outputLog -Encoding utf8
Get-Content -LiteralPath $errorLog -Encoding utf8
$runner.Dispose()
exit $nativeExit
