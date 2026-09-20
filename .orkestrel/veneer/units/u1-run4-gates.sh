#!/usr/bin/env bash
# Orchestrator reading of the scoped gates over U1-author run 4's tree, before the checkpoint
# commit and the successor brief. Log: scaffold/units/u1-run4-gates.log.txt.
cd "C:/Users/mikes/WebstormProjects/veneer" || exit 9
for step in "format:check" "lint:check" "check" "test:src" "test:src:styles" "test:app" "test:journey" "test:policy" "test:config" "test:setup" "test:setup:browser" "test:conformance" "test:guides"; do
  echo "=== $step ==="
  npm run "$step" 2>&1 | grep -v "^$" | grep -E "Tests |Test Files|error|Error|FAIL|passed|failed|correct format|Format issues|exit" | tail -n 4
  echo "exit=${PIPESTATUS[0]}"
done
echo "=== status ==="
git status --short | wc -l
