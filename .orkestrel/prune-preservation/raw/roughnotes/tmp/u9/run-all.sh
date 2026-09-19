#!/usr/bin/env bash
set -u
cd /c/Users/mikes/WebstormProjects/roughnotes
VITE_CAPTURE=true npx vitest run --config vite.config.ts --no-cache --reporter=dot --project 'journey:*' > tmp/u9/all-capture.log.txt 2>&1
echo "exit=$?" >> tmp/u9/all-capture.log.txt
