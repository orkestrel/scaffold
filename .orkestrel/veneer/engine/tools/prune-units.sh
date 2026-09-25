#!/usr/bin/env bash
# Prunes landed units' records from the engine folder by exact unit prefix, removing tracked files only
# (every record is committed before its prune, so git history keeps it), and refuses a prefix that a
# live unit's name extends. Lists each file before removing it. Commit the result with the promotion
# record as its message. Usage: bash prune-units.sh --live <prefix,...> <prefix>... [-- <tools path>...]
set -u
cd /c/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine || exit 1
LIVE=""; PREFIXES=(); TOOLS=(); MODE=units
while [ $# -gt 0 ]; do
	case "$1" in
		--live) LIVE="$2"; shift 2 ;;
		--) MODE=tools; shift ;;
		*) if [ "$MODE" = units ]; then PREFIXES+=("$1"); else TOOLS+=("$1"); fi; shift ;;
	esac
done
IFS=',' read -r -a LIVES <<< "$LIVE"
for prefix in "${PREFIXES[@]}"; do
	for live in "${LIVES[@]}"; do
		case "$live-" in "$prefix"-*) [ "$live" != "$prefix" ] && { echo "refused: live unit $live extends $prefix"; exit 3; } ;; esac
	done
	for f in $(git ls-files -- "units/$prefix-*" "units/$prefix.*"); do
		skip=0
		for live in "${LIVES[@]}"; do case "$f" in "units/$live-"*|"units/$live."*) skip=1 ;; esac; done
		[ "$skip" -eq 1 ] && { echo "kept (live): $f"; continue; }
		echo "removed: $f"; git rm -r -q -- "$f"
	done
done
for f in "${TOOLS[@]}"; do
	if git ls-files --error-unmatch -- "$f" > /dev/null 2>&1; then echo "removed: $f"; git rm -q -- "$f"; else echo "not tracked, left: $f"; fi
done
