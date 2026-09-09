param([switch]$Final)
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
  'd7n-guide-parity-population-fix-report.md',
  'd7n-scaffold-parity-population-adopt-report.md',
  'd7n-scaffold-compiler-host-fixture-successor-report.md',
  'd7n-scaffold-setup-host-fixture-brief.md'
)
if ($Final) {
  $reports += 'd7n-scaffold-setup-host-fixture-report.md'
  $reports += 'd7n-guides-extraction-close-brief.md'
}
foreach ($report in $reports) {
  Copy-Evidence "$scaffoldRoot/tmp/units/$report" "$campaignRoot/$report"
}
$directories = @{
  'd7n-guide-parity-population-controls' = 'C:/Users/mikes/WebstormProjects/guide/tmp/d7n-parity-population'
  'd7n-guide-parity-population-gates' = "$scaffoldRoot/tmp/pass/d7n-guide-parity-population-gates"
  'd7n-guide-parity-population-pack' = "$scaffoldRoot/tmp/pass/packed/d7n-guide-parity-population"
  'd7n-scaffold-parity-population-install' = "$scaffoldRoot/tmp/pass/d7n-scaffold-parity-population-install"
  'd7n-scaffold-parity-population-adopt' = "$scaffoldRoot/tmp/pass/scaffold-parity-population-adopt"
  'd7n-scaffold-parity-population-gates' = "$scaffoldRoot/tmp/pass/d7n-scaffold-parity-population-gates"
  'd7n-scaffold-parity-population-final-gates' = "$scaffoldRoot/tmp/pass/d7n-scaffold-parity-population-final-gates"
  'd7n-scaffold-parity-population-closed-gates' = "$scaffoldRoot/tmp/pass/d7n-scaffold-parity-population-closed-gates"
  'd7n-scaffold-compiler-root-red' = "$scaffoldRoot/tmp/pass/d7n-scaffold-compiler-root-red"
  'd7n-scaffold-compiler-host-fixture' = "$scaffoldRoot/tmp/pass/scaffold-compiler-host-fixture"
  'd7n-scaffold-setup-root-red' = "$scaffoldRoot/tmp/pass/d7n-scaffold-setup-root-red"
}
if ($Final) {
  $directories['d7n-scaffold-setup-host-fixture'] = "$scaffoldRoot/tmp/pass/scaffold-setup-host-fixture"
  $directories['d7n-scaffold-parity-population-reviewed-gates'] = "$scaffoldRoot/tmp/pass/d7n-scaffold-parity-population-reviewed-gates"
  $directories['d7n-guides-extraction-population-final'] = "$scaffoldRoot/tmp/pass/d7n-guides-extraction-population-final"
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
foreach ($script in @('repeat-scaffold-compiler.sh', 'repeat-scaffold-setup.sh', 'retain-parity-population.ps1')) {
  Copy-Evidence "$scaffoldRoot/tmp/pass/$script" "$instrumentRoot/$script"
}
Write-Output 'Population evidence retained without archives or extracted package trees.'
