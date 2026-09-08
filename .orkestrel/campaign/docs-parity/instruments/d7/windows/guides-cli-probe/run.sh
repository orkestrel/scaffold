#!/usr/bin/env bash
set -eu
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
node "$SCR/guides-cli-probe/run.mjs" > "$SCR/guides-cli-probe/run.log.txt" 2>&1
