param([Parameter(Mandatory=$true)][string]$Case)
$ErrorActionPreference='Stop'
Set-StrictMode -Version Latest
$scriptPath='C:\Users\mikes\AppData\Local\Temp\roughnotes-integration-20260918\launch-install-original-3.ps1'
$evidence='C:\Users\mikes\AppData\Local\Temp\roughnotes-integration-20260918\install-author-evidence\successor-3'
$tokens=$null
$errors=$null
$ast=[System.Management.Automation.Language.Parser]::ParseFile($scriptPath,[ref]$tokens,[ref]$errors)
if (@($errors).Count -ne 0) { throw 'Production script parse failed.' }
$functions=@($ast.EndBlock.Statements | Where-Object { $_ -is [System.Management.Automation.Language.FunctionDefinitionAst] })
$initialization=@($ast.EndBlock.Statements | Where-Object { $_.Extent.StartOffset -lt $functions[0].Extent.StartOffset })
. ([scriptblock]::Create((@($initialization.Extent.Text)+@($functions.Extent.Text)-join "`n")))
$actual=Get-Snapshot
Assert-Destination -Path $run
Write-Record -Path (Join-Path $evidence ($Case+'.snapshot.json')) -Record $actual
try {
    switch ($Case) {
        'accepted' { Assert-Admission -Snapshot $actual }
        'wrong-head' { $actual.head='0000000000000000000000000000000000000000'; Assert-Admission -Snapshot $actual }
        'wrong-status' { $actual.status+=@('?? unwanted-source.txt'); Assert-Admission -Snapshot $actual }
        'wrong-root' { $actual.top=$evidence; Assert-Admission -Snapshot $actual }
        'existing-output' { Assert-Destination -Path $evidence }
        'preservation' {
            $after=Get-Snapshot
            if (($actual|ConvertTo-Json -Depth 12) -cne ($after|ConvertTo-Json -Depth 12)) { throw 'Production snapshots differ.' }
        }
        'preservation-drift' {
            $after=Get-Snapshot
            $after.hashes[0].sha256='changed'
            if (($actual|ConvertTo-Json -Depth 12) -cne ($after|ConvertTo-Json -Depth 12)) { throw 'Production snapshots differ.' }
        }
        'native-version' {
            $run=Join-Path $evidence 'native-version'
            Assert-Destination -Path $run
            New-Item -ItemType Directory -Path $run|Out-Null
            $result=Invoke-Npm -Name 'npm-version' -Arguments @('--version')
            if ($result.exit -ne 0) { throw 'Native npm version failed.' }
            Write-Output "Native npm exit $($result.exit); PID $($result.pid)."
        }
        default { throw 'Unrecognized control case.' }
    }
    Write-Output "$Case accepted; real install output remains absent: $(-not (Test-Path -LiteralPath 'C:\Users\mikes\AppData\Local\Temp\roughnotes-integration-20260918\original-registry-install-20260918'))."
    exit 0
} catch {
    [Console]::Error.WriteLine($_.Exception.Message)
    exit 1
}