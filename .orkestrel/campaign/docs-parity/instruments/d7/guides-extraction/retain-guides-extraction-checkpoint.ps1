$ErrorActionPreference = 'Stop'
$scaffoldRoot = 'C:/Users/mikes/WebstormProjects/scaffold'
$recordRoot = "$scaffoldRoot/.orkestrel/campaign/docs-parity"
$unitNames = @(
  'd7n-guides-extraction-design',
  'd7n-guide-parity-core-fix',
  'd7n-scripts-ownership-fix',
  'd7n-guide-canonical-pack-question',
  'd7n-guides-extraction-carriers',
  'd7n-scaffold-parity-adopt'
)
foreach ($unitName in $unitNames) {
  Copy-Item -LiteralPath "$scaffoldRoot/tmp/units/$unitName-brief.md" -Destination "$recordRoot/$unitName-brief.md"
}
Copy-Item -LiteralPath "$scaffoldRoot/tmp/units/d7n-guides-extraction-design-objective-report.md" -Destination "$recordRoot/d7n-guides-extraction-design-objective-report.md"
Copy-Item -LiteralPath "$scaffoldRoot/tmp/cursor/d7n-guides-extraction-scout-brief.md" -Destination "$recordRoot/d7n-guides-extraction-scout-brief.md"
Copy-Item -LiteralPath "$scaffoldRoot/tmp/units/d7n-scripts-ownership-fix-report.md" -Destination "$recordRoot/d7n-scripts-ownership-fix-report.md"
Copy-Item -LiteralPath "$scaffoldRoot/tmp/units/d7n-guides-extraction-carriers-report.md" -Destination "$recordRoot/d7n-guides-extraction-carriers-report.md"
Copy-Item -LiteralPath "$scaffoldRoot/tmp/units/d7n-guides-extraction-evidence-brief.md" -Destination "$recordRoot/d7n-guides-extraction-evidence-brief.md"
Copy-Item -LiteralPath "$scaffoldRoot/tmp/units/d7n-guides-extraction-evidence-report.md" -Destination "$recordRoot/d7n-guides-extraction-evidence-report.md"
foreach ($name in @(
  'd7n-parity-example-population-question-brief.md',
  'd7n-parity-example-population-question-report.md',
  'd7n-guides-extraction-review-bridge-report.md',
  'd7n-opus-capacity-probe-brief.md',
  'd7n-opus-capacity-probe-report.md'
)) {
  Copy-Item -LiteralPath "$scaffoldRoot/tmp/units/$name" -Destination "$recordRoot/$name"
}
foreach ($name in @(
  'd7n-guide-parity-core-fix-brief.md',
  'd7n-guide-parity-core-fix-report.md',
  'd7n-guide-parity-core-review-brief.md',
  'd7n-guide-parity-site-control-brief.md',
  'd7n-guide-parity-site-control-report.md'
)) {
  Copy-Item -LiteralPath "$scaffoldRoot/tmp/units/$name" -Destination "$recordRoot/$name"
}
if (Test-Path -LiteralPath "$scaffoldRoot/tmp/units/d7n-scaffold-parity-adopt-report.md") {
  Copy-Item -LiteralPath "$scaffoldRoot/tmp/units/d7n-scaffold-parity-adopt-report.md" -Destination "$recordRoot/d7n-scaffold-parity-adopt-report.md"
}
$scriptEvidence = "$recordRoot/evidence/d7n-scripts-ownership"
$scriptInstruments = "$recordRoot/instruments/d7/guides-extraction"
New-Item -ItemType Directory -Force -Path $scriptEvidence, $scriptInstruments | Out-Null
foreach ($name in @('red.log.txt', 'red.exit.txt', 'green.log.txt', 'green.exit.txt', 'root.log.txt', 'root.exit.txt', 'scoped.log.txt', 'validate.log.txt')) {
  Copy-Item -LiteralPath "$scaffoldRoot/tmp/pass/scripts-ownership/$name" -Destination "$scriptEvidence/$name"
}
foreach ($name in @('run.sh', 'scoped.sh', 'validate.sh', 'format.sh', 'tsconfig.tests.json')) {
  Copy-Item -LiteralPath "$scaffoldRoot/tmp/pass/scripts-ownership/$name" -Destination "$scriptInstruments/scripts-ownership-$name"
}
$dependencyEvidence = "$recordRoot/evidence/d7n-guide-extraction-dependencies"
New-Item -ItemType Directory -Force -Path $dependencyEvidence | Out-Null
foreach ($name in @('install.log.txt', 'artifacts.sha256', 'manifests.sha256', 'preservation.log.txt', 'index-before.txt', 'index-after.txt')) {
  Copy-Item -LiteralPath "$scaffoldRoot/tmp/pass/guides-extraction/dependencies/$name" -Destination "$dependencyEvidence/$name"
}
foreach ($name in @('prepare-guide-extraction-deps.sh', 'prepare-guides-extraction.sh', 'run-guides-extraction-design.sh', 'run-parity-gates.sh', 'pack-parity-guide.sh', 'install-parity-guide.sh', 'inspect-parity-guide.mjs', 'mirror-parity-guide.mjs', 'check-campaign-branches.sh')) {
  Copy-Item -LiteralPath "$scaffoldRoot/tmp/pass/$name" -Destination "$scriptInstruments/$name"
}
foreach ($name in @('invoke-guide-parity-pack.sh', 'capture-guides-extraction-review.sh', 'compare-parity-guide-build.sh', 'run-guides-extraction-review.sh', 'run-parity-population-question.sh', 'probe-parity-opus-capacity.sh')) {
  Copy-Item -LiteralPath "$scaffoldRoot/tmp/pass/$name" -Destination "$scriptInstruments/$name"
}
Copy-Item -LiteralPath "$scaffoldRoot/tmp/pass/retain-guides-extraction-checkpoint.ps1" -Destination "$scriptInstruments/retain-guides-extraction-checkpoint.ps1"
$guideCoreEvidence = "$recordRoot/evidence/d7n-guide-parity-core"
New-Item -ItemType Directory -Force -Path $guideCoreEvidence | Out-Null
foreach ($name in @('red.log.txt', 'green.log.txt')) {
  Copy-Item -LiteralPath "$scaffoldRoot/../guide/tmp/d7n-parity-core/$name" -Destination "$guideCoreEvidence/$name"
}
$guideGateEvidence = "$recordRoot/evidence/d7n-guide-parity-core-final-gates"
New-Item -ItemType Directory -Force -Path $guideGateEvidence | Out-Null
foreach ($name in @(
  'after-test.diff.txt', 'before-test.diff.txt', 'build.exit.txt', 'build.log.txt',
  'check.exit.txt', 'check.log.txt', 'diff-check.txt', 'diff-final.txt',
  'format-check.exit.txt', 'format-check.log.txt', 'head.txt', 'index-after.txt',
  'index-before.txt', 'lint-check.exit.txt', 'lint-check.log.txt',
  'manifest-preservation.log.txt', 'manifests-before.sha256', 'status.txt',
  'test.exit.txt', 'test.log.txt'
)) {
  Copy-Item -LiteralPath "$scaffoldRoot/tmp/pass/d7n-guide-parity-core-final-gates/$name" -Destination "$guideGateEvidence/$name"
}
$packEvidence = "$recordRoot/evidence/d7n-guide-parity-core-pack"
New-Item -ItemType Directory -Force -Path $packEvidence | Out-Null
foreach ($name in @(
  'artifacts.sha256', 'diff-after.txt', 'diff-before.txt', 'index-after.txt',
  'index-before.txt', 'manifest-preservation.log.txt', 'manifests-before.sha256',
  'metadata-before.json', 'metadata-packed.json', 'pack.exit.txt', 'pack.log.txt',
  'receipt.txt'
)) {
  Copy-Item -LiteralPath "$scaffoldRoot/tmp/pass/packed/d7n-guide-parity-core/$name" -Destination "$packEvidence/$name"
}
$installEvidence = "$recordRoot/evidence/d7n-scaffold-parity-install"
New-Item -ItemType Directory -Force -Path $installEvidence | Out-Null
foreach ($name in @(
  'artifacts.sha256', 'index-after.txt', 'index-before.txt', 'install.exit.txt',
  'install.log.txt', 'manifest-preservation.log.txt', 'manifests-before.sha256',
  'metadata-installed.json'
)) {
  Copy-Item -LiteralPath "$scaffoldRoot/tmp/pass/d7n-scaffold-parity-install/$name" -Destination "$installEvidence/$name"
}
$adoptionEvidence = "$recordRoot/evidence/d7n-scaffold-parity-adopt"
New-Item -ItemType Directory -Force -Path $adoptionEvidence | Out-Null
foreach ($name in @(
  'before.exit.txt', 'before.log.txt', 'after-source.exit.txt', 'after-source.log.txt',
  'after-green.exit.txt', 'after-green.log.txt', 'guides.exit.txt', 'guides.log.txt',
  'run.sh', 'validate.sh'
)) {
  Copy-Item -LiteralPath "$scaffoldRoot/tmp/pass/scaffold-parity-adopt/$name" -Destination "$adoptionEvidence/$name"
}
$adoptionRedEvidence = "$recordRoot/evidence/d7n-guides-extraction-adoption-red"
New-Item -ItemType Directory -Force -Path $adoptionRedEvidence | Out-Null
foreach ($name in @(
  'artifacts.sha256', 'core-declaration.exit.txt', 'core-declaration.log.txt',
  'core-js.exit.txt', 'core-js.log.txt', 'guide.diff-check.txt', 'guide.diff.txt',
  'guide.head.txt', 'guide.status.txt', 'guide.untracked.txt', 'scaffold.diff-check.txt',
  'scaffold.diff.txt', 'scaffold.head.txt', 'scaffold.status.txt', 'scaffold.untracked.txt'
)) {
  Copy-Item -LiteralPath "$scaffoldRoot/tmp/pass/d7n-guides-extraction-adoption-red/$name" -Destination "$adoptionRedEvidence/$name"
}
$branchEvidence = "$recordRoot/evidence/d7n-campaign-branches"
New-Item -ItemType Directory -Force -Path $branchEvidence | Out-Null
Copy-Item -LiteralPath "$scaffoldRoot/tmp/pass/campaign-branches/branches.tsv" -Destination "$branchEvidence/branches.tsv"
Write-Output 'Extraction checkpoint evidence retained.'
