#!/usr/bin/env bash
set -eu
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
timeout 7200 bash "$SCR/clone-fleet.sh" > "$SCR/bootstrap/clone.log.txt" 2>&1
