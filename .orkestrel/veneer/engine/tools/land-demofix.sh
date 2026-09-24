#!/usr/bin/env bash
# J-DEMOFIX landing: commit the two files, merge origin/main when it moved, fast-forward main, push, remove the worktree.
# The unit's gates ran on the unchanged base (setup:browser, app, journey, format, lint, check, policy, build:app);
# a merge that brings anything re-runs the static gates and setup:browser before the fast-forward.
set -u
UNIT=demofix
VENEER=/c/Users/mikes/WebstormProjects/veneer
TREE=$VENEER/tmp/worktrees/$UNIT
U=/c/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units
LOG=$U/j-demofix-landing.log.txt
: > "$LOG"
{
	cd "$TREE" || exit 1
	git add -- app/browser/Showcase.ts tests/app/browser/Showcase.test.ts
	git commit -F "$U/j-demofix-message.txt"; echo "commit exit=$?"
	git fetch origin main; echo "fetch exit=$?"
	BEFORE=$(git rev-parse HEAD)
	git merge --no-edit origin/main; echo "merge exit=$?"
	if [ "$(git rev-parse HEAD)" != "$BEFORE" ]; then
		echo "origin/main moved; re-running the gates on the merge"
		for step in format:check lint:check check test:policy test:setup:browser test:app; do npm run "$step"; code=$?; echo "$step exit=$code"; [ "$code" -ne 0 ] && { echo "red; stopped"; exit 71; }; done
	else
		echo "origin/main already contained; no re-run"
	fi
	if [ -n "$(git -C "$VENEER" status --porcelain)" ]; then echo "main checkout is not clean; land refused"; exit 65; fi
	git -C "$VENEER" merge --ff-only "unit/$UNIT"; echo "main ff exit=$?"
	git -C "$VENEER" push origin main; echo "push exit=$?"
	git -C "$VENEER" worktree remove --force "$TREE"; echo "worktree remove exit=$?"
	git -C "$VENEER" worktree prune
	git -C "$VENEER" branch -D "unit/$UNIT"; echo "branch delete exit=$?"
	git -C "$VENEER" log --oneline -3
} >> "$LOG" 2>&1
grep -n "exit=\|moved\|contained\|refused\|stopped\|^[0-9a-f]\{7\} " "$LOG" | head -30
