#!/usr/bin/env bash
set -eu
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh

CAMPAIGN="$SCAFFOLD/.orkestrel/campaign/docs-parity"
WINDOWS="$CAMPAIGN/instruments/d7/windows"
MCPJOURNAL="$SCAFFOLD/tmp/cursor/d7n-mcp-reconciliation-scout.jsonl"
PROBEJOURNAL="$SCAFFOLD/tmp/claude/d7n-probe-tests.jsonl"
PROBELOGS="$FLEET/probe/tmp/d7n-probe-tests"

require() {
  test -f "$1" || {
    printf 'missing required file: %s\n' "$1" >&2
    exit 1
  }
}

retain() {
  local source=$1
  local target=$2
  if [[ -e "$target" ]]; then
    cmp -s "$source" "$target" || {
      printf 'retained file differs: %s\n' "$target" >&2
      exit 1
    }
    return
  fi
  cp "$source" "$target"
}

case "${1:-}" in
  '') probe=false ;;
  probe) probe=true ;;
  *)
    printf 'unsupported argument: %s\n' "$1" >&2
    exit 1
    ;;
esac

for name in d7n-mcp-reconciliation-scout-brief.md d7n-mcp-converge-fix-windows-brief.md d7n-guide-heading-probe-brief.md d7n-guide-heading-probe-instrument-report.md d7n-guide-heading-assessment-brief.md d7n-windows-landing-instrument-brief.md d7n-windows-landing-instrument-report.md d7n-windows-landing-check-brief.md d7n-windows-referral-retention-brief.md d7n-windows-referral-retention-report.md d7n-windows-referral-guard-amendment.md; do
  require "$SCAFFOLD/tmp/units/$name"
done

for name in run-fix.sh land-p2.sh run-mcp-scout.sh probe-guide-heading.sh retain-referral.sh read-journal.mjs assert-journal.mjs d7n-guide-heading.log.txt; do
  require "$SCR/$name"
done

require "$FLEET/mcp/tmp/d7n-guide-heading/probe.mjs"
require "$MCPJOURNAL"
node "$SCR/assert-journal.mjs" "$MCPJOURNAL"

if "$probe"; then
  require "$PROBEJOURNAL"
  node "$SCR/assert-journal.mjs" "$PROBEJOURNAL"
  require "$SCAFFOLD/tmp/units/d7n-probe-tests-report.md"
  require "$SCAFFOLD/tmp/units/d7n-probe-tests-brief.md"
  for name in red.log.txt green-server.log.txt green-guides.log.txt check.log.txt; do
    require "$PROBELOGS/$name"
  done
fi

scratch=$(mktemp -d "$SCR/d7n-referral.XXXXXX")
node "$SCR/read-journal.mjs" "$MCPJOURNAL" result > "$scratch/d7n-mcp-reconciliation-scout-result.txt"

if "$probe"; then
  node "$SCR/read-journal.mjs" "$PROBEJOURNAL" result > "$scratch/d7n-probe-tests-windows-result.txt"
  git -C "$FLEET/probe" diff 135aab7 -- tests/src/server/Probe.test.ts > "$scratch/d7n-probe-tests-windows.final.diff.txt"
  git -C "$FLEET/probe" status --short > "$scratch/d7n-probe-tests-windows.final.status.txt"
fi

mkdir -p "$WINDOWS"
for name in d7n-mcp-reconciliation-scout-brief.md d7n-mcp-converge-fix-windows-brief.md d7n-guide-heading-probe-brief.md d7n-guide-heading-probe-instrument-report.md d7n-guide-heading-assessment-brief.md d7n-windows-landing-instrument-brief.md d7n-windows-landing-instrument-report.md d7n-windows-landing-check-brief.md d7n-windows-referral-retention-brief.md d7n-windows-referral-retention-report.md d7n-windows-referral-guard-amendment.md; do
  retain "$SCAFFOLD/tmp/units/$name" "$CAMPAIGN/$name"
done

for name in run-fix.sh land-p2.sh run-mcp-scout.sh probe-guide-heading.sh retain-referral.sh assert-journal.mjs; do
  retain "$SCR/$name" "$WINDOWS/$name"
done

retain "$FLEET/mcp/tmp/d7n-guide-heading/probe.mjs" "$WINDOWS/guide-heading-probe.mjs"
retain "$SCR/d7n-guide-heading.log.txt" "$CAMPAIGN/d7n-guide-heading.log.txt"
retain "$scratch/d7n-mcp-reconciliation-scout-result.txt" "$CAMPAIGN/d7n-mcp-reconciliation-scout-result.txt"

if "$probe"; then
  retain "$SCAFFOLD/tmp/units/d7n-probe-tests-report.md" "$CAMPAIGN/d7n-probe-tests-report.md"
  retain "$SCAFFOLD/tmp/units/d7n-probe-tests-brief.md" "$CAMPAIGN/d7n-probe-tests-windows-ported-brief.md"
  retain "$scratch/d7n-probe-tests-windows-result.txt" "$CAMPAIGN/d7n-probe-tests-windows-result.txt"
  retain "$scratch/d7n-probe-tests-windows.final.diff.txt" "$CAMPAIGN/d7n-probe-tests-windows.final.diff.txt"
  retain "$scratch/d7n-probe-tests-windows.final.status.txt" "$CAMPAIGN/d7n-probe-tests-windows.final.status.txt"
  for name in red.log.txt green-server.log.txt green-guides.log.txt check.log.txt; do
    retain "$PROBELOGS/$name" "$CAMPAIGN/d7n-probe-tests-windows-$name"
  done
fi
