#!/usr/bin/env bash
# Sweeps the scaffold tmp/ launch copies and bench journals of the engine session's landed units
# (orkestrel-debrief retention: tmp/<bench>/ after the final gate evidence is recorded). Keeps every
# journal an open unit or the plan reads: j-integration-*, j-guards-*, j-sameway-*, j-snapshot-shared-*,
# j-sanitizer-context-*, j-reentry-*, astra-probe-* (the routing ledger's probe), and isinstance-fix-*
# (not attributed to a closed unit). Lists each file before removing it. Usage: bash sweep-tmp.sh
set -u
cd /c/Users/mikes/WebstormProjects/scaffold/tmp || exit 1
LANDED='^(j-alert|j-binder|j-carousel|j-collapse|j-dropdown|j-engine|j-helpers|j-modal|j-offcanvas|j-popover|j-sanitizer-audit|j-sanitizer-design|j-scrollspy|j-seed|j-snapshot-audit|j-tab|j-toast|j-tooltip|j-types)'
for f in $(ls codex | grep -E "$LANDED"); do echo "codex/$f"; rm -f -- "codex/$f"; done
for f in $(ls cursor | grep -E '^(j-engine|j-helpers|j-offcanvas|j-rows-reconcile|j-tooltip|j-w2|detach-replay-toast)'); do echo "cursor/$f"; rm -f -- "cursor/$f"; done
for f in $(ls | grep -E '^(j-[a-z]+-worktree\.log|records-message-(5[7-9]|6[0-3])\.txt|roadmap-message\.txt)$'); do echo "$f"; rm -f -- "$f"; done
echo "--- kept"
ls codex | sed 's/\..*//' | sort -u | tr '\n' ' '; echo
ls cursor | tr '\n' ' '; echo
ls | tr '\n' ' '; echo
du -sh codex cursor
