$taskPattern = 'class QuotaStorage|class PermissionStorage|function readMenuSettled|function isPainted|function buildCompositeStack|function buildEscapeFixtures|function buildMarkControl|function readAnnounced|elementFromPoint|VITE_CAPTURE|classList'
$taskMatches = @(rg -n $taskPattern tests)
$taskSearchExit = $LASTEXITCODE
if ($taskSearchExit -gt 1) { exit $taskSearchExit }
$taskMatches | Write-Output
Write-Output "R-B-C1 literal matches: $($taskMatches.Count)"
if ($taskMatches.Count -gt 0) { exit 1 }
exit 0
