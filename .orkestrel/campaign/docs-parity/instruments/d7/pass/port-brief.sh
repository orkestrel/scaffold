#!/usr/bin/env bash
# port-brief.sh <unit>: copies the retained brief <unit>-brief.md into $SCAFFOLD/tmp/units/ with its paths rewritten for this host,
# so a dispatch names a brief whose paths resolve. Requires SCAFFOLD, FLEET, SCR.
set -u
u=$1; SRC="$SCAFFOLD/.orkestrel/campaign/docs-parity"
mkdir -p "$SCAFFOLD/tmp/units"
node "$SRC/instruments/d7/pass/port-paths.mjs" "$SRC/$u-brief.md" "$SCAFFOLD/tmp/units/$u-brief.md"
