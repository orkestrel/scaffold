#!/usr/bin/env bash
# Writes the command-derived evidence the reconciliation's Grok lanes read (2026-09-25), because an ask-mode lane runs no
# command: Veneer's main history, its worktrees and branches, the guide's plugin rows, and the scaffold records' state.
set -u
V=/c/Users/mikes/WebstormProjects/veneer
S=/c/Users/mikes/WebstormProjects/scaffold
OUT=$S/tmp/cursor/evidence
mkdir -p "$OUT"
git -C "$V" fetch -q origin
git -C "$V" log --oneline -120 origin/main > "$OUT/veneer-main-log.txt"
git -C "$V" worktree list > "$OUT/veneer-worktrees.txt"
git -C "$V" branch -a > "$OUT/veneer-branches.txt"
for b in unit/engines-a unit/engines-b; do echo "== $b"; git -C "$V" log --oneline -6 "$b" 2>&1; done > "$OUT/veneer-unit-branches.txt"
git -C "$V" show origin/main:guides/veneer.md | grep -n -i -E "^\| *plugin|Owner: J-ENGINE|\| *\`plugin\`" > "$OUT/guide-plugin-rows.txt"
git -C "$V" show origin/main:ROADMAP.md > "$OUT/veneer-roadmap.md"
git -C "$S" log --oneline -40 origin/main > "$OUT/scaffold-main-log.txt"
ls "$S/.orkestrel/veneer/engine/units" > "$OUT/engine-units-listing.txt"
ls "$S/.orkestrel/veneer/engine/tools" > "$OUT/engine-tools-listing.txt"
grep -n "^## E[0-9]\|amended at\|^E[0-9]* amended" "$S/.orkestrel/veneer/engine/decisions.md" > "$OUT/decisions-index.txt"
wc -l "$OUT"/* | tail -12
