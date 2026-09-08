#!/usr/bin/env bash
# port-instruments.sh: copies every pass instrument into $SCR with its container paths rewritten for this host.
# Requires SCAFFOLD, FLEET, and SCR in the environment (forward slashes). Run once per session before any other instrument.
set -u
: "${SCAFFOLD:?set SCAFFOLD to the scaffold checkout}"; : "${FLEET:?set FLEET to the folder holding the package checkouts}"; : "${SCR:?set SCR to the pass scratch directory}"
SRC="$SCAFFOLD/.orkestrel/campaign/docs-parity/instruments/d7/pass"
mkdir -p "$SCR/land" "$SCR/headstart" "$SCR/packed" "$SCR/lanes" "$SCR/p23" "$SCAFFOLD/tmp/units"
for f in "$SRC"/*.sh "$SRC"/*.py "$SRC"/*.mjs; do node "$SRC/port-paths.mjs" "$f" "$SCR/$(basename "$f")"; done
echo "ported into $SCR"
