#!/usr/bin/env bash
# Resumes land-doc.sh after the Orchestrator resolved its merge conflict in the unit worktree (2026-09-25): commits the
# merge with the named paths staged, then runs land-doc.sh's remaining steps unchanged: the Markdown gates, the
# fast-forward of main, the push, and the worktree and branch removal. Appends to the landing log.
# Usage: bash land-doc-resume.sh <unit> <log-file> <path>...
set -u
UNIT="$1"; LOG="$2"; shift 2
VENEER=/c/Users/mikes/WebstormProjects/veneer
TREE=$VENEER/tmp/worktrees/$UNIT
{
	echo "# J-${UNIT^^} landing resumed after the Orchestrator's conflict resolution (2026-09-25)"
	cd "$TREE" || exit 1
	git add -- "$@"
	if [ -n "$(git diff --name-only --diff-filter=U)" ]; then echo "conflicts remain; stopped"; exit 70; fi
	if git rev-parse -q --verify MERGE_HEAD > /dev/null; then git commit --no-edit; echo "merge commit exit=$?"; else echo "no merge in progress; HEAD $(git log --oneline -1)"; fi
	# A worktree cut for a Markdown-only unit can lack node_modules; the policy gate reads the installed packages.
	if [ ! -d node_modules ]; then npm ci --ignore-scripts > /dev/null 2>&1; echo "npm ci exit=$?"; sha256sum package-lock.json | cut -c1-64 > node_modules/.orkestrel-lock.sha256; fi
	for step in format:check test:policy test:guides; do npm run "$step"; code=$?; echo "$step exit=$code"; [ "$code" -ne 0 ] && { echo "red; stopped"; exit 71; }; done
	if [ -n "$(git -C "$VENEER" status --porcelain)" ]; then echo "main checkout is not clean; land refused"; exit 65; fi
	git -C "$VENEER" fetch origin main; echo "fetch exit=$?"
	git -C "$VENEER" merge --ff-only origin/main; echo "main ff to origin exit=$?"
	git -C "$VENEER" merge --ff-only "unit/$UNIT"; code=$?; echo "main ff to unit/$UNIT exit=$code"; [ "$code" -ne 0 ] && exit 66
	git -C "$VENEER" push origin main; echo "push exit=$?"
	git -C "$VENEER" worktree remove --force "$TREE"; echo "worktree remove exit=$?"
	git -C "$VENEER" branch -D "unit/$UNIT"; echo "branch delete exit=$?"
	git -C "$VENEER" log --oneline -3
} >> "$LOG" 2>&1
