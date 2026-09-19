#!/usr/bin/env bash
# Runs the app-only distribution case alone and records its exit code.
cd "C:/Users/mikes/WebstormProjects/scaffold" || exit 2
npm run test:distribution -- -t "app-only workspace through its gates" > "tmp/units/$1.log.txt" 2>&1
echo "exit=$?" >> "tmp/units/$1.log.txt"
