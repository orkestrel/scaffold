param([Parameter(Mandatory = $true)][string]$Commit, [Parameter(Mandatory = $true)][string]$Run)
$ErrorActionPreference='Stop'
$root='C:\Users\mikes\AppData\Local\Temp\roughnotes-integration-20260918'
$node='C:\Users\mikes\scoop\apps\nodejs-lts\current\node.exe'
$output=Join-Path $root ($Run + '.install.stdout.log.txt')
$error=Join-Path $root ($Run + '.install.stderr.log.txt')
$runner=Start-Process -FilePath $node -ArgumentList @('install-original.mjs',$Commit,$Run) -WorkingDirectory $root -RedirectStandardOutput $output -RedirectStandardError $error -WindowStyle Hidden -PassThru
$handle=$runner.Handle
if(-not $runner.WaitForExit(300000)){ & "$env:SystemRoot\System32\taskkill.exe" /PID $runner.Id /T /F; $exit=124 } else { $runner.WaitForExit(); $exit=$runner.ExitCode }
[System.IO.File]::WriteAllText((Join-Path $root ($Run + '.install.result.json')), (@{pid=$runner.Id;handle=$handle;exit=$exit}|ConvertTo-Json),[System.Text.UTF8Encoding]::new($false))
$runner.Dispose()
exit $exit
