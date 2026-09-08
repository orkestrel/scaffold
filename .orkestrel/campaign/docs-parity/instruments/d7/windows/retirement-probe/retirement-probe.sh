#!/usr/bin/env bash
set -eu
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
node "$SCR/path-artifact-pilot/retirement-probe.mjs" > "$SCR/path-artifact-pilot/retirement-probe.log.txt" 2>&1
