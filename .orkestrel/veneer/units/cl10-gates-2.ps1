param([switch]$Edge)
$ErrorActionPreference = 'Continue'
if ($Edge) {
	$env:PLAYWRIGHT_CHANNEL = 'msedge'
	$cl10Stages = @('test:src:styles', 'test:setup:browser', 'test:app:browser')
	$cl10Engine = 'edge'
} else {
	$cl10Stages = @('format:check', 'lint:check', 'check', 'build', 'test')
	$cl10Engine = 'chromium'
}
foreach ($cl10Stage in $cl10Stages) {
	$cl10Log = "tmp/units/cl10-2-$cl10Engine-$($cl10Stage.Replace(':', '-')).log.txt"
	Write-Output "START npm.cmd run $cl10Stage ($cl10Engine)"
	& npm.cmd run $cl10Stage *> $cl10Log
	$cl10Exit = $LASTEXITCODE
	Write-Output "EXIT $cl10Exit npm.cmd run $cl10Stage ($cl10Engine)"
	Get-Content $cl10Log -Tail 8
	if ($cl10Exit -ne 0) { exit $cl10Exit }
}
exit 0
