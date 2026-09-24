#!/usr/bin/env bash
# Lands a unit whose change is confined to Markdown that no browser, setup, or conformance test reads
# (ROADMAP.md, a plan row): commits the named paths on unit/<unit>, merges origin/main, runs the gates
# that read Markdown (format:check, test:policy, test:guides), fast-forwards main, pushes, and removes
# the worktree and the branch. main's own tree was gated at its landing, so nothing else re-runs.
# Usage: bash land-doc.sh <unit> <message-file> <log-file> <path>...
set -u
UNIT="$1"; MESSAGE="$2"; LOG="$3"; shift 3
VENEER=/c/Users/mikes/WebstormProjects/veneer
TREE=$VENEER/tmp/worktrees/$UNIT
: > "$LOG"
{
	echo "# J-${UNIT^^} landing (2026-09-24): paths $*"
	cd "$TREE" || exit 1
	git add -- "$@"
	git commit -F "$MESSAGE"; echo "commit exit=$?"
	OTHER="$(git diff --name-only HEAD^ HEAD | grep -v -x -F -e "$(printf '%s\n' "$@")")"
	if [ -n "$OTHER" ]; then echo "the commit holds other paths: $OTHER; stopped"; exit 72; fi
	git -C "$VENEER" fetch origin main; echo "fetch exit=$?"
	git merge --no-edit origin/main; echo "merge exit=$?"
	if [ -n "$(git diff --name-only --diff-filter=U)" ]; then echo "conflicts; stopped"; exit 70; fi
	for step in format:check test:policy test:guides; do npm run "$step"; code=$?; echo "$step exit=$code"; [ "$code" -ne 0 ] && { echo "red; stopped"; exit 71; }; done
	if [ -n "$(git -C "$VENEER" status --porcelain)" ]; then echo "main checkout is not clean; land refused"; exit 65; fi
	git -C "$VENEER" merge --ff-only origin/main; echo "main ff to origin exit=$?"
	git -C "$VENEER" merge --ff-only "unit/$UNIT"; code=$?; echo "main ff to unit/$UNIT exit=$code"; [ "$code" -ne 0 ] && exit 66
	git -C "$VENEER" push origin main; echo "push exit=$?"
	git -C "$VENEER" worktree remove --force "$TREE"; echo "worktree remove exit=$?"
	git -C "$VENEER" branch -D "unit/$UNIT"; echo "branch delete exit=$?"
	git -C "$VENEER" log --oneline -3
} >> "$LOG" 2>&1
sed 's/\x1b\[[0-9;]*m//g' "$LOG" | grep -n "exit=\|Tests \|stopped\|refused\|holds other" | head -30
