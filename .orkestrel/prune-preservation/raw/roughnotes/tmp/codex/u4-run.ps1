param([string]$Log, [string]$Program, [Parameter(ValueFromRemainingArguments=$true)][string[]]$Arguments)
& $Program @Arguments *> $Log
$result = $LASTEXITCODE
Set-Content -Encoding utf8 -LiteralPath "$Log.exit" -Value $result
Get-Content -LiteralPath $Log | Select-Object -Last 24
exit $result
