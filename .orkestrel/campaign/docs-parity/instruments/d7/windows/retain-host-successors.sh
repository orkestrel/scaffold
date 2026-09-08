#!/usr/bin/env bash
set -eu
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
record="$SCAFFOLD/.orkestrel/campaign/docs-parity"
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
for name in d7n-agent-converge-fix-host-brief.md d7n-agent-host-instruments-brief.md d7n-agent-host-instruments-report.md d7n-agent-host-instruments-2-report.md d7n-agent-host-instruments-check-brief.md d7n-agent-host-instruments-check-report.md d7n-agent-host-instruments-2-check-brief.md d7n-agent-host-instruments-2-check-report.md d7n-guide-heading-design-brief.md d7n-guide-heading-scout-brief.md; do
  retain "$SCAFFOLD/tmp/units/$name" "$record/$name"
done
for name in agent-audit-controls.mjs agent-host-preflight.sh agent-preflight-errexit-control.sh run-agent-host.sh validate-agent-host.sh run-guide-heading-design.sh read-guide-heading-scout.ps1; do
  retain "$SCR/$name" "$record/instruments/d7/windows/$name"
done
retain "$SCR/d7n-agent-host-preflight.log.txt" "$record/d7n-agent-host-preflight.log.txt"
retain "$SCR/retain-host-successors.sh" "$record/instruments/d7/windows/retain-host-successors.sh"
