$ErrorActionPreference = 'Stop'
$record = 'C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/docs-parity'
$scratch = 'C:/Users/mikes/WebstormProjects/scaffold/tmp/pass'
$units = 'C:/Users/mikes/WebstormProjects/scaffold/tmp/units'
$instrument = Join-Path $record 'instruments/d7/windows/guides-entry'
New-Item -ItemType Directory -Force -Path $instrument | Out-Null
$retainedNames = @(
  'd7n-guides-entry-fix-brief.md',
  'd7n-guides-entry-fix-report.md',
  'd7n-guides-entry-fix-successor-brief.md',
  'd7n-guides-entry-fix-successor-report.md',
  'd7n-guides-entry-cli-fixture-brief.md',
  'd7n-guides-entry-cli-fixture-report.md',
  'd7n-guides-entry-gates-author-brief.md',
  'd7n-guides-entry-retirement-recipe-brief.md'
)
foreach ($retainedName in $retainedNames) {
  Copy-Item -LiteralPath (Join-Path $units $retainedName) -Destination $record
}
Copy-Item -LiteralPath (Join-Path $scratch 'd7n-guides-entry-final.diff.txt'), (Join-Path $scratch 'd7n-guides-entry-final.status.txt'), (Join-Path $scratch 'd7n-guides-entry-final.stat.txt'), (Join-Path $scratch 'd7n-guides-entry-final.entry.sha256') -Destination $record
Copy-Item -LiteralPath (Join-Path $scratch 'scaffold-guides-entry/tmp/d7n-guides-entry-red-green.log') -Destination (Join-Path $record 'd7n-guides-entry-successor-validation.log.txt')
Copy-Item -LiteralPath (Join-Path $scratch 'capture-guides-entry-review.sh'), (Join-Path $scratch 'retain-guides-entry-candidate.ps1') -Destination $instrument
