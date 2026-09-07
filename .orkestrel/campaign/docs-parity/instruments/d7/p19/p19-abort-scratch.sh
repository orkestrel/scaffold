#!/usr/bin/env bash
# P19: the pilot's ground in a scratch clone of abort — the guide head start (packed at the guide's tip),
# repair --offline from scaffold's extracted tip, the seed without a build (M2), the drift size (M1),
# the post-repair gates (M3), and the --to guide fidelity over abort's three-column tables (M4).
set -u
SCR=/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7
TIP=$SCR/p18/scaffold-tip/package
G=/home/user/fleet/guide
echo "== pack the guide at its tip"; git -C "$G" rev-parse --short HEAD; (cd "$G" && PATH=/opt/npm11/bin:$PATH npm pack --json --ignore-scripts --pack-destination "$SCR/p19/packed" 2>/dev/null | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{const j=JSON.parse(s)[0];console.log(j.filename,j.size,"bytes",j.entryCount,"entries")})')
TGZ=$(ls $SCR/p19/packed/orkestrel-guide-*.tgz | head -1); echo "$TGZ"
C=$SCR/p19/abort; rm -rf "$C"; git clone -q /home/user/fleet/abort "$C"
echo "== a private node_modules for the scratch clone (copy, not link)"; cp -r /home/user/fleet/abort/node_modules "$C/node_modules"
cd "$C" || exit 9
echo "== head start: install the guide tarball --no-save"; PATH=/opt/npm11/bin:$PATH npm install --no-save --ignore-scripts --no-audit --no-fund "$TGZ" 2>&1 | tail -2; echo "EXIT ${PIPESTATUS[0]}"; node -p "require('$C/node_modules/@orkestrel/guide/package.json').version"; git status --short; echo "(status end)"
echo "== M6: audit --offline before repair"; node "$TIP/dist/bin/main.js" audit --offline 2>&1 | tail -14
echo "== repair --offline from the tip"; node "$TIP/dist/bin/main.js" repair --offline 2>&1 | tail -3; git status --short | tr '\n' ' '; echo
echo "== M2 + M1: npm run docs without a build (dist absent?)"; ls dist 2>&1 | head -1; npm run docs 2>&1 | tail -3; echo "EXIT ${PIPESTATUS[0]}"
echo "== M3: check / lint / test:policy / test:config / test:guides"
npm run check 2>&1 | tail -2; echo "check EXIT ${PIPESTATUS[0]}"
npx oxlint --config .oxlintrc.json --deny-warnings . 2>&1 | grep 'error policy' | head -3; echo "lint diagnostics: $(npx oxlint --config .oxlintrc.json --deny-warnings . 2>&1 | grep -c 'error policy')"
npm run test:policy 2>&1 | grep 'Tests ' ; npm run test:config 2>&1 | grep 'Tests '; npm run test:guides 2>&1 | grep 'Tests '
echo "== M4: rename the compared headers and round-trip --to guide"; grep -n '^| Name\|^| Method\|^| Type' guides/abort.md | cut -c1-90
cp guides/abort.md $SCR/p19/abort-before.md
sed -i -E 's/^(\| Name[^|]*\| Kind[^|]*)\| Behavior( +)\|/\1| Summary \2|/; s/^(\| Method[^|]*\| Returns[^|]*)\| Behavior( +)\|/\1| Summary \2|/' guides/abort.md
grep -n '^| Name\|^| Method\|^| Type' guides/abort.md | cut -c1-90
npm run docs 2>&1 | tail -1
npm run docs -- --to guide 2>&1 | tail -2
npx oxfmt --write guides/abort.md 2>&1 | tail -1
cp guides/abort.md $SCR/p19/abort-after.md
node $SCR/p16/p16-cells.mjs $SCR/p19/abort-before.md $SCR/p19/abort-after.md | tail -3
npm run docs 2>&1 | tail -6
