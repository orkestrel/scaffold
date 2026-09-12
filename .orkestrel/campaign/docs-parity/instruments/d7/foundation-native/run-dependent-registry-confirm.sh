#!/usr/bin/env bash
set -euo pipefail

source "$(dirname "$0")/pass-env.sh"

run="$SCR/d7n-dependent-registry-confirm-run"
if [[ -e "$run" ]]; then
	printf 'evidence output exists: %s\n' "$run" >&2
	exit 1
fi
mkdir "$run"

instrument="$(cygpath -m "$SCR/confirm-dependent-registry.ps1")"
set +e
timeout --kill-after=15s 900s powershell.exe -NoProfile -ExecutionPolicy Bypass -File "$instrument" > "$run/stdout.txt" 2> "$run/stderr.txt"
status=$?
set -e
printf '%s' "$status" > "$run/exit.txt"
exit "$status"
