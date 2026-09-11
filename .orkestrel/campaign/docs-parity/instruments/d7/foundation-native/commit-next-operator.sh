#!/usr/bin/env bash
set -euo pipefail

source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh

fail() {
	printf '%s\n' "$1" >&2
	exit 1
}

test "$(git -C "$SCAFFOLD" branch --show-current)" = main || fail 'Scaffold must be on main'
git -C "$SCAFFOLD" diff --cached --quiet || fail 'Scaffold has staged changes'
test -f "$SCAFFOLD/publish.txt" || fail 'publish.txt is absent'
test -f "$SCAFFOLD/prompt.txt" || fail 'prompt.txt is absent'
timeout --kill-after=15s 60s git -C "$SCAFFOLD" fetch origin
git -C "$SCAFFOLD" merge-base --is-ancestor origin/main HEAD
git -C "$SCAFFOLD" diff --check
git -C "$SCAFFOLD" add -- .orkestrel/campaign/docs-parity publish.txt prompt.txt
git -C "$SCAFFOLD" -c user.name=Claude -c user.email=noreply@anthropic.com commit -m 'Prepare the next publish command' -m 'Co-Authored-By: Claude <noreply@anthropic.com>' -m 'Claude-Session: codex:01a0810d-21bf-7f60-8534-488348e05743'
timeout --kill-after=15s 120s git -C "$SCAFFOLD" push origin HEAD:main HEAD:claude/orkestrel-npm-audit-deps-14ibta HEAD:claude/docs-parity-windows-01a0810d
test -z "$(git -C "$SCAFFOLD" status --porcelain=v1 --untracked-files=all)" || fail 'Scaffold status is not clean'
git -C "$SCAFFOLD" branch --show-current
git -C "$SCAFFOLD" show-ref --verify refs/heads/main
git -C "$SCAFFOLD" show-ref --verify refs/heads/claude/orkestrel-npm-audit-deps-14ibta
git -C "$SCAFFOLD" show-ref --verify refs/heads/claude/docs-parity-windows-01a0810d
