#!/usr/bin/env bash
# Orchestrator reproduction of the fix-round audit's unresolved and broken vectors (claims 3, 4, 8,
# 13) against the built CLI at 24285b95, in a fresh offline scratch target. Touches no checkout.
set -u
scaffold="C:/Users/mikes/WebstormProjects/scaffold"
root="C:/Users/mikes/AppData/Local/Temp/claude/C--Users-mikes-WebstormProjects-scaffold/d7d4417a-5b51-47b1-85d7-d00611fbd930/scratchpad"
target="$root/f2-$(date +%s)"
cd "$scaffold" || exit 1
node dist/bin/main.js new f2app --app browser --offline --target "$target" > "$root/f2-new.log.txt" 2>&1
echo "new_EXIT=$?  chain: $(node -p "require('$target/package.json').scripts.test")"
questions() { node -e "const a=JSON.parse(require('fs').readFileSync(process.argv[1],'utf8'));const q=('audit' in a?a.audit:a).questions;console.log(JSON.stringify(q.map(x=>[x.field,x.blocking,x.message]),null,1))" "$1"; }
echo "== claim 3: indirect chain =="
node "$root/f2-edit.mjs" "$target" indirect
node dist/bin/main.js audit --offline --target "$target" --groups configs --json > "$root/f2-audit-indirect.json" 2> "$root/f2-audit-indirect.err"
echo "audit_EXIT=$?"; questions "$root/f2-audit-indirect.json"
node "$root/f2-edit.mjs" "$target" restore
echo "== claim 3 (grouped chain, objective lane) =="
node "$root/f2-edit.mjs" "$target" grouped
node dist/bin/main.js audit --offline --target "$target" --groups configs --json > "$root/f2-audit-grouped.json" 2> "$root/f2-audit-grouped.err"
echo "audit_EXIT=$?"; questions "$root/f2-audit-grouped.json"
node "$root/f2-edit.mjs" "$target" restore
echo "== claim 3b: a playwright test:* script naming --config =="
node "$root/f2-edit.mjs" "$target" e2e
node dist/bin/main.js audit --offline --target "$target" --groups configs --json > "$root/f2-audit-e2e.json" 2> "$root/f2-audit-e2e.err"
echo "audit_EXIT=$?"; questions "$root/f2-audit-e2e.json"
node "$root/f2-edit.mjs" "$target" restore
echo "== claim 4: absent project and absent config in one script =="
node "$root/f2-edit.mjs" "$target" extra
node dist/bin/main.js audit --offline --target "$target" --groups configs --json > "$root/f2-audit-extra.json" 2> "$root/f2-audit-extra.err"
echo "audit_EXIT=$?"; questions "$root/f2-audit-extra.json"
node "$root/f2-edit.mjs" "$target" extra-config-only
node dist/bin/main.js audit --offline --target "$target" --groups configs --json > "$root/f2-audit-extra-config.json" 2> "$root/f2-audit-extra-config.err"
echo "audit_EXIT=$? (config only)"; questions "$root/f2-audit-extra-config.json"
node "$root/f2-edit.mjs" "$target" restore
echo "== claim 8: deleted wrapper advisory wording =="
rm "$target/configs/app/vite.journey.config.ts"
node dist/bin/main.js audit --offline --target "$target" --groups configs --json > "$root/f2-audit-deleted.json" 2> "$root/f2-audit-deleted.err"
echo "audit_EXIT=$?"; questions "$root/f2-audit-deleted.json"
cp "$root/f1-wrapper.ts" "$target/configs/app/vite.journey.config.ts"
echo "== claim 13: setup proof written, repair before the chain invocation =="
printf "import { describe, expect, it } from 'vitest'\n\ndescribe('browser setup', () => {\n\tit('runs in a browser', () => {\n\t\texpect(typeof document).toBe('object')\n\t})\n})\n" > "$target/tests/setupBrowser.test.ts"
node dist/bin/main.js repair --offline --target "$target" --json > "$root/f2-repair-setup.json" 2> "$root/f2-repair-setup.err"
echo "repair_EXIT=$?"; questions "$root/f2-repair-setup.json"
echo "setup:browser in root: $(grep -c "setup:browser" "$target/vite.config.ts")  test:setup:browser script: $(grep -c '"test:setup:browser"' "$target/package.json")  chain: $(node -p "require('$target/package.json').scripts.test")"
echo "-- then add the invocation and repair again --"
node -e "const fs=require('fs');const p=process.argv[1];const m=JSON.parse(fs.readFileSync(p,'utf8'));m.scripts.test=m.scripts.test+' && npm run test:setup:browser';fs.writeFileSync(p,JSON.stringify(m,undefined,'\t')+'\n');console.log(m.scripts.test)" "$target/package.json"
node dist/bin/main.js repair --offline --target "$target" --json > "$root/f2-repair-setup-2.json" 2> "$root/f2-repair-setup-2.err"
echo "repair_EXIT=$?"; questions "$root/f2-repair-setup-2.json"
echo "setup:browser in root: $(grep -c "setup:browser" "$target/vite.config.ts")  test:setup:browser script: $(grep -c '"test:setup:browser"' "$target/package.json")"
echo "(end)"
