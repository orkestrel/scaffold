#!/usr/bin/env bash
set -euo pipefail
cd /home/user/veneer-eir
export PATH=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers

run_test() {
	npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot "$1" -t "$2"
}

echo "=== Mutation 1: hr.scss reverts to var(--vn-border-width) ==="
HR=src/styles/elements/_hr.scss
cp "$HR" /tmp/hr-current.scss
sha256sum "$HR" > /tmp/hr-before.sha
sed -i 's/border-top: var(--bs-border-width) solid currentColor;/border-top: var(--vn-border-width) solid currentColor;/' "$HR"
npm run build:src:styles > /tmp/hr-mutation-build.log 2>&1 || true
set +e
run_test tests/src/styles/elements/hr.test.ts "moves the top border to a scope-set --bs-border-width" > /tmp/hr-mutation-run.log 2>&1
HR_EXIT=$?
set -e
echo "hr mutation test exit: $HR_EXIT (expect nonzero)"
cp /tmp/hr-current.scss "$HR"
sha256sum "$HR" > /tmp/hr-after.sha
diff /tmp/hr-before.sha /tmp/hr-after.sha && echo "hr.scss restored byte-identical"
npm run build:src:styles > /tmp/hr-restore-build.log 2>&1

echo "=== Mutation 2: button.scss .btn-check pointer-events: none -> display: none ==="
BTN=src/styles/components/_button.scss
cp "$BTN" /tmp/button-current.scss
sha256sum "$BTN" > /tmp/button-before.sha
sed -i '0,/clip: rect(0, 0, 0, 0);\n\t\tpointer-events: none;/s//&/' "$BTN" || true
perl -0pi -e 's/(clip: rect\(0, 0, 0, 0\);\n\t\t)pointer-events: none;/$1display: none;/' "$BTN"
npm run build:src:styles > /tmp/button-mutation-build.log 2>&1 || true
set +e
run_test tests/src/styles/components/button.test.ts "toggles the checkbox from the keyboard and keeps the label focus paint" > /tmp/button-mutation-run.log 2>&1
BTN_EXIT=$?
set -e
echo "button mutation test exit: $BTN_EXIT (expect nonzero)"
cp /tmp/button-current.scss "$BTN"
sha256sum "$BTN" > /tmp/button-after.sha
diff /tmp/button-before.sha /tmp/button-after.sha && echo "button.scss restored byte-identical"
npm run build:src:styles > /tmp/button-restore-build.log 2>&1
