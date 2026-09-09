$ErrorActionPreference = 'Stop'
$scaffoldRoot = 'C:/Users/mikes/WebstormProjects/scaffold'
$campaignRoot = "$scaffoldRoot/.orkestrel/campaign/docs-parity"
function Copy-Evidence([string]$Source, [string]$Destination) {
  if (Test-Path -LiteralPath $Destination) {
    if ((Get-FileHash -LiteralPath $Source).Hash -ne (Get-FileHash -LiteralPath $Destination).Hash) {
      throw "Refusing to overwrite retained evidence: $Destination"
    }
    return
  }
  Copy-Item -LiteralPath $Source -Destination $Destination
}
$reports = @(
  'd7n-guide-parity-leaves-fix-report.md',
  'd7n-parity-leaves-optional-fixture-brief.md',
  'd7n-parity-leaves-optional-fixture-report.md',
  'd7n-guides-extraction-leaves-close-brief.md',
  'd7n-guides-extraction-leaves-mechanical-brief.md',
  'd7n-guides-extraction-leaves-astra-report.md',
  'd7n-guides-extraction-leaves-objective-report.md',
  'd7n-guides-extraction-leaves-mechanical-report.md',
  'd7n-guides-extraction-leaves-root-report.md',
  'd7n-guides-extraction-leaves-verdict.md',
  'd7n-scaffold-canonical-carrier-brief.md',
  'd7n-guides-command-boundary-brief.md',
  'd7n-guides-command-capabilities-brief.md'
)
foreach ($report in $reports) {
  Copy-Evidence "$scaffoldRoot/tmp/units/$report" "$campaignRoot/$report"
}
$directories = @{
  'd7n-guide-parity-leaves-controls' = 'C:/Users/mikes/WebstormProjects/guide/tmp/d7n-parity-leaves'
  'd7n-guide-parity-leaves-gates' = "$scaffoldRoot/tmp/pass/d7n-guide-parity-leaves-gates"
  'd7n-guide-parity-leaves-final-gates' = "$scaffoldRoot/tmp/pass/d7n-guide-parity-leaves-final-gates"
  'd7n-guide-parity-leaves-pack' = "$scaffoldRoot/tmp/pass/packed/d7n-guide-parity-leaves"
  'd7n-scaffold-parity-leaves-install' = "$scaffoldRoot/tmp/pass/d7n-scaffold-parity-leaves-install"
  'd7n-scaffold-parity-leaves-gates' = "$scaffoldRoot/tmp/pass/d7n-scaffold-parity-leaves-gates"
  'd7n-guides-extraction-leaves-final' = "$scaffoldRoot/tmp/pass/d7n-guides-extraction-leaves-final"
}
foreach ($entry in $directories.GetEnumerator()) {
  $destinationRoot = "$campaignRoot/evidence/$($entry.Key)"
  New-Item -ItemType Directory -Force -Path $destinationRoot | Out-Null
  foreach ($file in Get-ChildItem -LiteralPath $entry.Value -File) {
    if ($file.Extension -notin @('.txt', '.sha256', '.json', '.sh')) { continue }
    Copy-Evidence $file.FullName "$destinationRoot/$($file.Name)"
  }
}
$instrumentRoot = "$campaignRoot/instruments/d7/guides-extraction"
foreach ($script in @('run-guides-extraction-leaves-mechanical.sh', 'retain-parity-leaves.ps1')) {
  Copy-Evidence "$scaffoldRoot/tmp/pass/$script" "$instrumentRoot/$script"
}
Write-Output 'Leaf evidence retained without archives, journals or extracted package trees.'
