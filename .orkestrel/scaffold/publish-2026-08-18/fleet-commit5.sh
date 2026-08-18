#!/usr/bin/env bash
# Commit and push the wave-5 propagation on every green target.
# Commits only a target whose wave-5 status line reads PASS, per the fleet-pass law:
# reading "is the tree dirty" instead of "did this target pass" pushes a red target the
# moment one exists, and a flake makes that look like it worked.
set -u
OUT=/home/user/scaffold/tmp/fleet5
MSG=/home/user/scaffold/tmp/fleet-commit-msg5.txt

land() {
	repo="$1"
	dir="/workspace/$repo"
	if ! grep -q "^RESULT $repo PASS$" "$OUT/$repo.log" 2>/dev/null; then
		echo "COMMIT $repo REFUSED_NOT_GREEN"
		return
	fi
	cd "$dir" || { echo "COMMIT $repo NODIR"; return; }
	branch=$(git branch --show-current)
	if [ "$branch" != "main" ]; then
		echo "COMMIT $repo REFUSED_BRANCH:$branch"
		return
	fi
	if [ -z "$(git status --porcelain)" ]; then
		echo "COMMIT $repo NOTHING_TO_COMMIT"
		return
	fi
	if ! git add -A > /dev/null 2>&1; then echo "COMMIT $repo ADD_FAIL"; return; fi
	if ! git commit -F "$MSG" --quiet; then echo "COMMIT $repo COMMIT_FAIL"; return; fi
	ok=0
	for delay in 0 2 4 8 16; do
		[ "$delay" -gt 0 ] && sleep "$delay"
		if git push -u origin main > /dev/null 2>&1; then ok=1; break; fi
	done
	if [ "$ok" -eq 1 ]; then echo "COMMIT $repo LANDED $(git rev-parse --short HEAD)"; else echo "COMMIT $repo PUSH_FAIL"; fi
}

REPOS="abort agent brief browser budget console contract csv database emitter form guide html indexeddb interpret markdown mcp middleware msg ndjson ollama pool program qualifier queue rater reason relation router sea server sqlite sse table template terminal test timeout tool toolbox websocket worker workflow workspace"

slice=0
for repo in $REPOS; do
	land "$repo" &
	slice=$((slice + 1))
	if [ "$slice" -ge 4 ]; then wait; slice=0; fi
done
wait
