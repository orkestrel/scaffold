#!/usr/bin/env bash
set -euo pipefail
cd /home/user/veneer-eir
export PATH=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers

run_test() {
	npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot "$1" -t "$2"
}

echo "=== Mutation: toggle focus-visible selector removed before Space ==="
BTN=src/styles/components/_button.scss
cp "$BTN" /tmp/button2-current.scss
sha256sum "$BTN" > /tmp/button2-before.sha
sed -i '/^\t\.btn-check:focus-visible + \.btn,$/d' "$BTN"
diff /tmp/button2-current.scss "$BTN" || true
npm run build:src:styles > tmp/units/eir-2-mutation-toggle-build.log 2>&1 || true
set +e
run_test tests/src/styles/components/button.test.ts "toggles the checkbox from the keyboard and keeps the label focus paint" > tmp/units/eir-2-mutation-toggle.log.txt 2>&1
TOGGLE_EXIT=$?
set -e
echo "toggle mutation exit: $TOGGLE_EXIT (expect nonzero)"
cp /tmp/button2-current.scss "$BTN"
sha256sum "$BTN" > /tmp/button2-after.sha
diff /tmp/button2-before.sha /tmp/button2-after.sha && echo "button.scss restored byte-identical"
npm run build:src:styles > /tmp/button2-restore-build.log 2>&1

echo "=== Mutation: tr.scss reverts to var(--vn-border-width) ==="
TR=src/styles/elements/_tr.scss
cp "$TR" /tmp/tr-current.scss
sha256sum "$TR" > /tmp/tr-before.sha
sed -i 's/border-bottom: var(--bs-border-width) var(--vn-border-style) var(--vn-border-color);/border-bottom: var(--vn-border-width) var(--vn-border-style) var(--vn-border-color);/' "$TR"
npm run build:src:styles > tmp/units/eir-2-mutation-tr-build.log 2>&1 || true
set +e
run_test tests/src/styles/elements/tr.test.ts "moves a cell bottom border to a scope-set --bs-border-width" > tmp/units/eir-2-mutation-tr.log.txt 2>&1
TR_EXIT=$?
set -e
echo "tr mutation exit: $TR_EXIT (expect nonzero)"
cp /tmp/tr-current.scss "$TR"
sha256sum "$TR" > /tmp/tr-after.sha
diff /tmp/tr-before.sha /tmp/tr-after.sha && echo "tr.scss restored byte-identical"
npm run build:src:styles > /tmp/tr-restore-build.log 2>&1
