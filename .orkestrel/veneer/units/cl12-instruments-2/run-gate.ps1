param([Parameter(Mandatory=$true)][string]$Gate, [Parameter(Mandatory=$true)][string]$Log)
$ErrorActionPreference = 'Continue'
$started = [DateTime]::UtcNow.ToString('o')
$guide = Get-Item -LiteralPath './guides/veneer.md'
$digest = (Get-FileHash -LiteralPath $guide.FullName -Algorithm SHA256).Hash
"START $started | npm $Gate | guide mtime $($guide.LastWriteTimeUtc.ToString('o')) | SHA256 $digest" | Set-Content -LiteralPath $Log -Encoding utf8
if ($Gate -eq 'test') {
    & npm.cmd test >> $Log 2>&1
} else {
    & npm.cmd run $Gate >> $Log 2>&1
}
$nativeExit = $LASTEXITCODE
"END $([DateTime]::UtcNow.ToString('o')) | EXIT $nativeExit" | Add-Content -LiteralPath $Log -Encoding utf8
Get-Content -LiteralPath $Log -Tail 18
exit $nativeExit
