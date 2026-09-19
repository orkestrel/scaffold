#!/usr/bin/env bash
# Orchestrator reproduction of audit claim 23 (a fresh browser workspace has no journey axis) and
# finding F1 (deleting the wrapper leaves test:journey in the manifest and the test chain). Runs
# the built CLI offline into a fresh scratch target; touches no checkout.
set -u
scaffold="C:/Users/mikes/WebstormProjects/scaffold"
root="C:/Users/mikes/AppData/Local/Temp/claude/C--Users-mikes-WebstormProjects-scaffold/d7d4417a-5b51-47b1-85d7-d00611fbd930/scratchpad"
target="$root/f1-$(date +%s)"
wrapper="$root/f1-wrapper.ts"
cd "$scaffold" || exit 1
node dist/bin/main.js new f1app --app browser --offline --target "$target" > "$root/f1-new.log.txt" 2>&1
echo "new_EXIT=$?"
tail -3 "$root/f1-new.log.txt"
echo "== after new =="
ls "$target/configs/app/"
echo "wrapper present: $(test -f "$target/configs/app/vite.journey.config.ts" && echo yes || echo no)"
echo "test:journey in scripts: $(grep -c '"test:journey"' "$target/package.json")"
echo "appJourney in root: $(grep -c 'appJourney' "$target/vite.config.ts")"
echo "test chain: $(node -p "require('$target/package.json').scripts.test")"
echo "== write the wrapper, repair =="
cp "$wrapper" "$target/configs/app/vite.journey.config.ts"
node dist/bin/main.js repair --offline --target "$target" > "$root/f1-repair-1.log.txt" 2>&1
echo "repair1_EXIT=$?"
tail -4 "$root/f1-repair-1.log.txt"
echo "test:journey in scripts: $(grep -c '"test:journey"' "$target/package.json")"
echo "appJourney in root: $(grep -c 'appJourney' "$target/vite.config.ts")"
echo "test chain: $(node -p "require('$target/package.json').scripts.test")"
echo "== delete the wrapper, repair =="
rm "$target/configs/app/vite.journey.config.ts"
node dist/bin/main.js repair --offline --target "$target" > "$root/f1-repair-2.log.txt" 2>&1
echo "repair2_EXIT=$?"
tail -4 "$root/f1-repair-2.log.txt"
echo "wrapper present: $(test -f "$target/configs/app/vite.journey.config.ts" && echo yes || echo no)"
echo "test:journey in scripts: $(grep -c '"test:journey"' "$target/package.json")"
echo "appJourney in root: $(grep -c 'appJourney' "$target/vite.config.ts")"
echo "test chain: $(node -p "require('$target/package.json').scripts.test")"
echo "== audit after deletion =="
node dist/bin/main.js audit --offline --target "$target" > "$root/f1-audit.log.txt" 2>&1
echo "audit_EXIT=$?"
grep -n -i "journey" "$root/f1-audit.log.txt" | head -5
echo "(end)"
