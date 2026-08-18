#!/usr/bin/env bash
# Commit and push the wave-3 propagation on every green vendored-only target.
# Commits only a target whose wave-3 status line reads PASS, per the fleet-pass law.
# browser, console, agent, and ollama are held out: each carries hand-written unit
# work awaiting its cross-engine audit. contract was the manual pilot.
set -u
OUT=/home/user/scaffold/tmp/fleet3
MSG=/home/user/scaffold/tmp/fleet-commit-msg.txt
MSGTEST=/home/user/scaffold/tmp/fleet-commit-msg-test.txt

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
	msg="$MSG"
	[ "$repo" = "test" ] && msg="$MSGTEST"
	if ! git add -A > /dev/null 2>&1; then echo "COMMIT $repo ADD_FAIL"; return; fi
	if ! git commit -F "$msg" --quiet; then echo "COMMIT $repo COMMIT_FAIL"; return; fi
	ok=0
	for delay in 0 2 4 8 16; do
		[ "$delay" -gt 0 ] && sleep "$delay"
		if git push -u origin main > /dev/null 2>&1; then ok=1; break; fi
	done
	if [ "$ok" -eq 1 ]; then echo "COMMIT $repo LANDED $(git rev-parse --short HEAD)"; else echo "COMMIT $repo PUSH_FAIL"; fi
}

REPOS="abort brief budget csv database emitter form guide html indexeddb interpret markdown mcp middleware msg ndjson pool program qualifier queue rater reason relation router sea server sqlite sse table template terminal test timeout tool toolbox websocket worker workflow workspace"

slice=0
for repo in $REPOS; do
	land "$repo" &
	slice=$((slice + 1))
	if [ "$slice" -ge 4 ]; then
		wait
		slice=0
	fi
done
wait
