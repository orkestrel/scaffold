#!/usr/bin/env bash
set -eu
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh

CAMPAIGN="$SCAFFOLD/.orkestrel/campaign/docs-parity"
WINDOWS="$CAMPAIGN/instruments/d7/windows"
JOURNAL="$SCAFFOLD/tmp/cursor/d7n-terminal-reconciliation-scout.jsonl"
RESULT="$SCR/d7n-terminal-reconciliation-scout-result.txt"

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

mkdir -p "$WINDOWS"

for name in inspect-fleet.sh install-heads.sh merge-mcp.sh recheck-mcp-merge.sh land-mcp-merge.sh port-dispatches.sh run-probe-tests.sh database-canon.sh run-terminal-scout.sh read-journal.mjs retain-windows.sh retain-windows-2.sh push-record.sh; do
  retain "$SCR/$name" "$WINDOWS/$name"
done

for name in d7n-probe-tests-windows-brief.md d7n-resume-writers-windows-brief.md d7n-database-canon-brief.md d7n-terminal-reconciliation-scout-brief.md d7n-windows-record-instrument-brief.md d7n-windows-record-instrument-report.md d7n-windows-record-check-brief.md d7n-windows-record-retention-successor-report.md; do
  retain "$SCAFFOLD/tmp/units/$name" "$CAMPAIGN/$name"
done

retain "$SCR/bootstrap/mcp-merge.log.txt" "$CAMPAIGN/d7n-mcp-windows-merge.log.txt"
retain "$SCR/bootstrap/mcp-merge.diff.txt" "$CAMPAIGN/d7n-mcp-windows-merge.diff.txt"
retain "$SCR/bootstrap/mcp-merge.status.txt" "$CAMPAIGN/d7n-mcp-windows-merge.status.txt"

grep -F '"type":"result","subtype":"success"' "$JOURNAL" >/dev/null
test ! -e "$RESULT"
node "$SCR/read-journal.mjs" "$JOURNAL" result > "$RESULT"
retain "$RESULT" "$CAMPAIGN/d7n-terminal-reconciliation-scout-result.txt"
