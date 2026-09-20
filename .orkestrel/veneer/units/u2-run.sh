#!/usr/bin/env bash
# U2 run: the Orchestrator runs the calibration instrument on managed Chromium and Edge.
# Log: scaffold/units/u2-run.log.txt.
cd "C:/Users/mikes/WebstormProjects/scaffold" || exit 9
echo "--- check ---"
node --check .orkestrel/veneer/research/calibration.mjs || exit 3
echo "--- run ---"
node .orkestrel/veneer/research/calibration.mjs
echo "exit=$?"
echo "--- outputs ---"
find .orkestrel/veneer/research/calibration -maxdepth 2 | head -80
