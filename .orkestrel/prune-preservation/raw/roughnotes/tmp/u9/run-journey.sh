#!/usr/bin/env bash
# Runs one journey project, optionally with capture, and logs the result.
set -u
cd /c/Users/mikes/WebstormProjects/roughnotes
project="$1"
capture="$2"
log="$3"
if [ "$capture" = "capture" ]; then
  VITE_CAPTURE=true npx vitest run --config vite.config.ts --no-cache --reporter=dot --project "$project" > "$log" 2>&1
else
  npx vitest run --config vite.config.ts --no-cache --reporter=dot --project "$project" > "$log" 2>&1
fi
echo "exit=$?" >> "$log"
