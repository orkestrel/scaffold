#!/usr/bin/env bash
# Rebuilds the styles and runs the E-ID-FLOW-2 probe into the named log.
# Usage: probe.sh <log name>
set -u
source /home/user/veneer-flow2/tmp/units/flow2-instruments/env.sh
log=tmp/units/flow2-instruments/logs/$1
{ npm run build:src:styles > /dev/null 2>&1; echo "build exit $?"; node tmp/units/flow2-instruments/flow2-probe.mjs 2>&1; echo "exit=$?"; } > "$log"
cat "$log"
