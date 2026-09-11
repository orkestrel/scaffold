#!/usr/bin/env bash
set -euo pipefail

source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh

label=${1-}

fail() {
	printf '%s\n' "$1" >&2
	exit 1
}

[[ "$label" =~ ^[a-z][a-z0-9-]*$ ]] || fail 'record label is required'
test "$(git -C "$SCAFFOLD" branch --show-current)" = main || fail 'Scaffold must be on main'
git -C "$SCAFFOLD" diff --cached --quiet || fail 'Scaffold has staged changes'
timeout --kill-after=15s 60s git -C "$SCAFFOLD" fetch origin
git -C "$SCAFFOLD" merge-base --is-ancestor origin/main HEAD
git -C "$SCAFFOLD" diff --check
git -C "$SCAFFOLD" add -- .orkestrel/campaign/docs-parity
git -C "$SCAFFOLD" -c user.name=Claude -c user.email=noreply@anthropic.com commit -m "Record release preparation: $label" -m 'Co-Authored-By: Claude <noreply@anthropic.com>' -m 'Claude-Session: codex:01a0810d-21bf-7f60-8534-488348e05743'
timeout --kill-after=15s 120s git -C "$SCAFFOLD" push origin HEAD:main HEAD:claude/orkestrel-npm-audit-deps-14ibta HEAD:claude/docs-parity-windows-01a0810d
git -C "$SCAFFOLD" status --short --branch
