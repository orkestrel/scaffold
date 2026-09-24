#!/usr/bin/env bash
# Finishes the J-SANITIZER landing after w2-land-2b.sh stopped on setup:browser: commits the setup export
# list, re-runs the gates the edit touches, fast-forwards main (after origin/main), pushes, and removes the
# worktree and branch. Every other gate ran green on the merge commit b7ae0ee (w2-land-2b-sanitizer.log).
set -u
VENEER=/c/Users/mikes/WebstormProjects/veneer
TREE=$VENEER/tmp/worktrees/sanitizer
U=/c/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units
LOG=$U/j-sanitizer-landing-finish.log.txt
: > "$LOG"
{
	cd "$TREE" || exit 1
	git add -- tests/setupBrowser.test.ts
	git commit -F "$U/j-sanitizer-setup-export-message.txt"; echo "commit exit=$?"
	for step in format:check lint:check check test:setup:browser; do npm run "$step"; code=$?; echo "$step exit=$code"; [ "$code" -ne 0 ] && { echo "red; stopped"; exit 71; }; done
	git -C "$VENEER" fetch origin main; echo "fetch exit=$?"
	if [ "$(git -C "$VENEER" rev-parse origin/main)" != "$(git -C "$VENEER" rev-parse HEAD)" ] && ! git -C "$VENEER" merge-base --is-ancestor origin/main "unit/sanitizer"; then echo "origin/main moved past the merge; stopped"; exit 72; fi
	if [ -n "$(git -C "$VENEER" status --porcelain)" ]; then echo "main checkout is not clean; land refused"; exit 65; fi
	git -C "$VENEER" merge --ff-only origin/main; echo "main ff to origin exit=$?"
	git -C "$VENEER" merge --ff-only unit/sanitizer; echo "main ff to unit exit=$?"
	git -C "$VENEER" push origin main; echo "push exit=$?"
	git -C "$VENEER" worktree remove --force "$TREE"; echo "worktree remove exit=$?"
	git -C "$VENEER" worktree prune
	git -C "$VENEER" branch -D unit/sanitizer; echo "branch delete exit=$?"
	git -C "$VENEER" log --oneline -4
} >> "$LOG" 2>&1
sed 's/\x1b\[[0-9;]*m//g' "$LOG" | grep -n "exit=\|stopped\|refused\|Tests \|^[0-9a-f]\{7\} " | head -20
