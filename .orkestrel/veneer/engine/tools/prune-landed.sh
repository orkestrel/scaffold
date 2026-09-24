#!/usr/bin/env bash
# The J-POPOVER, J-SANITIZER, J-PLACEMENT-HOST, and J-TOOLTIP prune (2026-09-24): lists each record
# before removing it, removes tracked records with git rm and ignored logs with rm, and leaves every
# file an open unit reads (j-integration-*, j-guards-*, j-sameway-*, j-snapshot-shared-*, j-reentry-*,
# j-roadmap-*, j-rows-*, j-tooltip-audit-4-subjective-verdict.md). Usage: bash prune-landed.sh
set -u
cd /c/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine || exit 1
UNITS=$(ls units | grep -E "^(j-popover|j-sanitizer|j-placementhost|j-tooltip|roadmap-jengine-row)" | grep -v -x "j-tooltip-audit-4-subjective-verdict.md")
TOOLS=$(ls tools | grep -E "^(replay-sanitizer|land-sanitizer-finish|w2-popover-3-before|replay-integration-2)|^w2-land-2b\.sh$")
echo "--- tracked records removed"
for f in $UNITS; do echo "units/$f"; done
for f in $TOOLS; do echo "tools/$f"; done
for f in $UNITS; do
	if git ls-files --error-unmatch "units/$f" > /dev/null 2>&1 || [ -d "units/$f" ]; then git rm -r -q -- "units/$f" 2>/dev/null || rm -rf -- "units/$f"; else rm -rf -- "units/$f"; fi
done
for f in $TOOLS; do
	if git ls-files --error-unmatch "tools/$f" > /dev/null 2>&1; then git rm -q -- "tools/$f"; else rm -f -- "tools/$f"; fi
done
echo "--- ignored logs removed (never committed)"
for f in tools/*.log; do [ -e "$f" ] && { echo "$f"; rm -f -- "$f"; }; done
echo "--- remaining"
ls units | tr '\n' ' '; echo
ls tools | tr '\n' ' '; echo
