#!/bin/sh
cd "C:/Users/mikes/WebstormProjects/scaffold" || exit 1
LOG=tmp/verify

run() {
  name=$1
  shift
  echo "=== $name ===" | tee "$LOG/$name.log.txt"
  "$@" >> "$LOG/$name.log.txt" 2>&1
  code=$?
  echo "EXIT:$code" >> "$LOG/$name.log.txt"
  echo "$name EXIT:$code"
}

run format npm run format:check
run lint npm run lint:check
run check npm run check
run build npm run build
run distribution npm run test:distribution
run test npm test
