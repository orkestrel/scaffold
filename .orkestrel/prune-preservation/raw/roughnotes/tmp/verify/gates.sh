#!/bin/bash
cd "C:\Users\mikes\WebstormProjects\roughnotes"
LOG="tmp/verify"
run() {
  name="$1"; shift
  echo "=== $name ===" | tee -a "$LOG/all.log.txt"
  "$@" > "$LOG/$name.log.txt" 2>&1
  code=$?
  echo "exit:$code" | tee -a "$LOG/all.log.txt"
  cat "$LOG/$name.log.txt" | tail -n 60 >> "$LOG/all.log.txt"
}
run format npm run format:check
run lint npm run lint:check
run check npm run check
run build npm run build
run test npm test
run audit npx scaffold audit
run journey npm run test:journey
