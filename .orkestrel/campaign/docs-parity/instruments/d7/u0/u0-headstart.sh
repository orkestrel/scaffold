#!/usr/bin/env bash
# U0 d7-guide-headstart — brief: /home/user/scaffold/.orkestrel/campaign/docs-parity/d7-guide-headstart-brief.md
# Log: this script's stdout, tee'd to u0-headstart.log.txt beside it.
set -u
G=/home/user/fleet/guide
S=/home/user/scaffold
SCR=/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/u0
cd "$G" || exit 9
fail=0
step() { echo; echo "== $*"; }
gate() { step "$1"; npm run "$1" 2>&1 | tail -${2:-6}; local code=${PIPESTATUS[0]}; echo "EXIT $code"; [ "$code" -eq 0 ] || fail=1; }

step "baseline"; git rev-parse --short HEAD; git status --short; echo "(status end)"
step "head start bytes"; sha256sum node_modules/@orkestrel/scaffold/dist/host/scripts/docs.ts "$S/scripts/docs.ts"; node -p "require('$G/node_modules/@orkestrel/scaffold/package.json').version"
step "criterion 1: bump"; sed -i 's/^\t"version": "0.0.17",$/\t"version": "0.0.18",/' package.json; grep -n '"version"' package.json
step "repair --offline"; node node_modules/@orkestrel/scaffold/dist/bin/main.js repair --offline 2>&1 | tail -20; echo "EXIT ${PIPESTATUS[0]}"
step "criterion 2: status after repair"; git status --short; echo "(status end)"
step "criterion 3: the voice-rule sites"
sed -i '5s#^/\*\*$#/**\n * Greets `name`.\n *#' tests/fixtures/broken/missing-example/module/helpers.ts
sed -i '1s#^// Dummy fixture test file#// Placeholder fixture test file#' tests/fixtures/good/tests/widget.test.ts
sed -i '13s#^ \* Require markdown whose first block is a table\.$# * Requires markdown whose first block is a table.#' tests/setup.ts
echo "--- helpers.ts:5-10"; sed -n 5,10p tests/fixtures/broken/missing-example/module/helpers.ts
echo "--- widget.test.ts:1"; sed -n 1p tests/fixtures/good/tests/widget.test.ts
echo "--- setup.ts:13"; sed -n 13p tests/setup.ts
step "diff of the package-owned edits"; git diff -- package.json tsconfig.json tests/fixtures tests/setup.ts | grep '^[-+]' | grep -v '^[-+][-+]'
gate format:check 4
gate lint:check 12
gate check 4
gate test:policy 6
gate test:config 6
gate build 8
step "criterion 5: npm run docs (expected exit 1, 139)"; npm run docs 2>&1 | tail -2; echo "EXIT ${PIPESTATUS[0]}"
step "criterion 4 summary"; echo "fail=$fail"
if [ "$fail" -ne 0 ]; then echo "STOP: a gate read red; no commit"; exit 1; fi
step "criterion 6: commit by path"
git add -- package.json .oxlintrc.json configs/helpers.ts configs/policy.ts tests/config.test.ts tests/policy.test.ts tests/setupPolicy.ts tsconfig.json scripts/docs.ts tests/fixtures/broken/missing-example/module/helpers.ts tests/fixtures/good/tests/widget.test.ts tests/setup.ts
git status --short; echo "(status end)"
git -c user.name=Claude -c user.email=noreply@anthropic.com commit -q -F "$SCR/u0-message.txt" && git log -1 --stat --format='%h %s' | head -20
step "status after commit"; git status --short; echo "(status end)"
step "push"; git push -u origin claude/orkestrel-npm-audit-deps-14ibta 2>&1 | tail -3; echo "EXIT ${PIPESTATUS[0]}"
