# Prepare the returned-work checkpoint

Act as builder on the native mechanical route. Perform directly and spawn nothing.
Read AGENTS.md, .agents/orchestration.md, portability, writing, and quality rules.
Own only tmp/pass/retain-heading-ollama.sh and
tmp/units/d7n-heading-ollama-retention-report.md. Other units own package source and
campaign records; do not edit those paths. Use apply_patch and run syntax checks only.
No body execution, installs, credentials, commits, pushes, or permission changes.

Author a Bash set -euo pipefail script that sources pass-env.sh. Reuse the retain helper
from retain-host-successors.sh: require source, compare an existing target, copy only
when absent. Never overwrite different retained bytes. Create only the named evidence
directory when missing. No journal stream, secrets, tarball, node_modules, or unrelated
file belongs in retention. The root caller will execute and commit the checkpoint.

Copy these tmp/units files to the campaign root with their same names:
d7n-ollama-converge-fix-host-brief.md;
d7n-ollama-host-instruments-brief.md;
d7n-ollama-host-instruments-report.md;
d7n-ollama-host-instruments-check-brief.md;
d7n-ollama-host-instruments-check-report.md;
d7n-ollama-host-instruments-2-check-brief.md;
d7n-ollama-host-instruments-2-check-report.md;
d7n-guide-heading-fix-report.md;
d7n-guide-heading-fix-review-brief.md;
d7n-guide-final-instruments-brief.md;
d7n-guide-final-instruments-report.md;
d7n-guide-final-instruments-check-brief.md;
d7n-guide-final-instruments-check-report.md;
d7n-guide-final-instruments-2-brief.md;
d7n-guide-final-instruments-2-report.md;
d7n-guide-final-instruments-2-check-brief.md;
d7n-guide-final-instruments-2-check-report.md;
d7n-heading-ollama-retention-brief.md;
d7n-heading-ollama-retention-report.md.

Copy these tmp/pass files to campaign/instruments/d7/windows with their same names:
ollama-audit-controls.mjs; ollama-host-preflight.sh; run-ollama-host.sh;
validate-ollama-host.sh; journal-milestones.mjs; capture-landing-ollama-scope.sh;
validate-guide-heading-initial.sh; pack-guide-heading-initial.sh;
validate-guide-heading.sh; pack-guide-heading.sh; run-guide-heading-review.sh;
retain-heading-ollama.sh.

Copy these tmp/pass files to the campaign root with their same names:
d7n-ollama-host-preflight-prefix.log.txt; d7n-ollama-host-preflight.log.txt;
d7n-guide-heading-fix.diff.txt; d7n-guide-heading-fix.status.txt.

Copy only these guide/tmp/d7n-guide-heading-fix files into campaign/evidence/d7n-guide-heading-fix:
test-guides.sh; test-guides.log.txt; sweep.sh; sweep.log.txt; sweep.diff.txt; status.txt;
red.sh; red.log.txt; lint-check.sh; lint-check.log.txt; green.sh; green.log.txt;
format.sh; format.log.txt; format-check.sh; format-check.log.txt; focused-final.sh;
focused-final.log.txt; evidence.sh; diff.txt; diff-stat.txt; diff-check.log.txt;
check.sh; check.log.txt.

Return authored paths and syntax evidence. Do not claim retention ran. No prose counts
or engine identifiers. Keep prior reports unchanged.
