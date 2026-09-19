#!/usr/bin/env bash
# Orchestrator reproduction for the R-A audit's claims 2 and 8: three mutations of the roughnotes
# tree, each followed by the reading the claim names and by a restore; the tree must be clean at the
# end. Runs in the app:browser project (Playwright Chromium).
set -u
R="C:/Users/mikes/WebstormProjects/roughnotes"
out="$R/tmp/verify"
cd "$R" || exit 1
run() { npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project app:browser "$@"; }
echo "== m0 (claim 2): the aria-expanded binding removed, read after shown =="
sed -i '157{/:aria-expanded="opened"/d}' app/browser/App.vue
git diff --stat -- app/browser/App.vue | tail -1
run tests/app/browser/zz-audit-probe-3.test.ts > "$out/r-a-m0.log.txt" 2>&1
echo "m0_probe_EXIT=$?"
sed 's/\x1b\[[0-9;]*m//g' "$out/r-a-m0.log.txt" | grep -E "PROBE|✓|×" | cut -c1-260
git diff --stat -- app/browser/App.vue | tail -1
# restore by re-inserting the deleted line before the aria-label line that followed it
sed -i '157i\						:aria-expanded="opened"' app/browser/App.vue
echo "restored m0: $(git diff --stat -- app/browser/App.vue | wc -l) diff lines"
echo "== m1 (claim 8a): opened never flips true =="
sed -i '59s/opened.value = true/opened.value = false/' app/browser/App.vue
git diff --stat -- app/browser/App.vue | tail -1
run tests/app/browser/App.test.ts -t "announces the compact menu trigger" > "$out/r-a-m1.log.txt" 2>&1
echo "m1_EXIT=$?"
sed 's/\x1b\[[0-9;]*m//g' "$out/r-a-m1.log.txt" | grep -E "Tests |✓|×|Error:|AssertionError" | head -6 | cut -c1-220
sed -i '59s/opened.value = false/opened.value = true/' app/browser/App.vue
echo "restored m1: $(git diff --stat -- app/browser/App.vue | wc -l) diff lines"
echo "== m2 (claim 8b): buildName returns the label alone =="
sed -i '347s/return `${label}, ${region}`/return `${label}`/' app/browser/helpers.ts
git diff --stat -- app/browser/helpers.ts | tail -1
run tests/app/browser/App.test.ts > "$out/r-a-m2.log.txt" 2>&1
echo "m2_EXIT=$?"
sed 's/\x1b\[[0-9;]*m//g' "$out/r-a-m2.log.txt" | grep -E "Tests |×|Error:|AssertionError" | head -8 | cut -c1-220
sed -i '347s/return `${label}`/return `${label}, ${region}`/' app/browser/helpers.ts
echo "restored m2: $(git diff --stat -- app/browser/helpers.ts | wc -l) diff lines"
echo "== baseline =="
run tests/app/browser/App.test.ts > "$out/r-a-m-base.log.txt" 2>&1
echo "base_EXIT=$?"
sed 's/\x1b\[[0-9;]*m//g' "$out/r-a-m-base.log.txt" | grep -E "Tests " | tail -1
echo "--- status ---"
git status --short
echo "(end)"
