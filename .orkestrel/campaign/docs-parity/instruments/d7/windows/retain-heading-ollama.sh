#!/usr/bin/env bash
set -euo pipefail

source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh

record="$SCAFFOLD/.orkestrel/campaign/docs-parity"
instruments="$record/instruments/d7/windows"
evidence="$record/evidence/d7n-guide-heading-fix"

retain() {
  local source=$1
  local target=$2
  test -f "$source"
  if test -e "$target"; then
    cmp "$source" "$target"
  else
    cp "$source" "$target"
  fi
}

test -d "$record"
test -d "$instruments"
if test -e "$evidence"; then
  test -d "$evidence"
else
  mkdir -p "$evidence"
fi

for name in \
  d7n-ollama-converge-fix-host-brief.md \
  d7n-ollama-host-instruments-brief.md \
  d7n-ollama-host-instruments-report.md \
  d7n-ollama-host-instruments-check-brief.md \
  d7n-ollama-host-instruments-check-report.md \
  d7n-ollama-host-instruments-2-check-brief.md \
  d7n-ollama-host-instruments-2-check-report.md \
  d7n-guide-heading-fix-report.md \
  d7n-guide-heading-fix-review-brief.md \
  d7n-guide-final-instruments-brief.md \
  d7n-guide-final-instruments-report.md \
  d7n-guide-final-instruments-check-brief.md \
  d7n-guide-final-instruments-check-report.md \
  d7n-guide-final-instruments-2-brief.md \
  d7n-guide-final-instruments-2-report.md \
  d7n-guide-final-instruments-2-check-brief.md \
  d7n-guide-final-instruments-2-check-report.md \
  d7n-heading-ollama-retention-brief.md \
  d7n-heading-ollama-retention-report.md; do
  retain "$SCAFFOLD/tmp/units/$name" "$record/$name"
done

for name in \
  ollama-audit-controls.mjs \
  ollama-host-preflight.sh \
  run-ollama-host.sh \
  validate-ollama-host.sh \
  journal-milestones.mjs \
  capture-landing-ollama-scope.sh \
  validate-guide-heading-initial.sh \
  pack-guide-heading-initial.sh \
  validate-guide-heading.sh \
  pack-guide-heading.sh \
  run-guide-heading-review.sh \
  retain-heading-ollama.sh; do
  retain "$SCR/$name" "$instruments/$name"
done

for name in \
  d7n-ollama-host-preflight-prefix.log.txt \
  d7n-ollama-host-preflight.log.txt \
  d7n-guide-heading-fix.diff.txt \
  d7n-guide-heading-fix.status.txt; do
  retain "$SCR/$name" "$record/$name"
done

for name in \
  test-guides.sh \
  test-guides.log.txt \
  sweep.sh \
  sweep.log.txt \
  sweep.diff.txt \
  status.txt \
  red.sh \
  red.log.txt \
  lint-check.sh \
  lint-check.log.txt \
  green.sh \
  green.log.txt \
  format.sh \
  format.log.txt \
  format-check.sh \
  format-check.log.txt \
  focused-final.sh \
  focused-final.log.txt \
  evidence.sh \
  diff.txt \
  diff-stat.txt \
  diff-check.log.txt \
  check.sh \
  check.log.txt; do
  retain "$FLEET/guide/tmp/d7n-guide-heading-fix/$name" "$evidence/$name"
done
