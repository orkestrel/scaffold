#!/usr/bin/env bash
# Runs the acceptance gates of E-ID-BUTTON-CLASSES round 2, one log per gate, each ending with its
# exit code and the load average.
cd /home/user/veneer-ebcl
export PATH=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
owned_ts="tests/setupBrowser.ts tests/setupBrowser.test.ts tests/setupStyles.ts tests/setupStyles.test.ts tests/src/styles/elements/button.test.ts"
components=""
for stem in close navbar accordion dropdown nav list-group pagination carousel; do
	components="$components tests/src/styles/components/$stem.test.ts"
done
finish() {
	echo "exit=$1" >> "$2"
	cat /proc/loadavg >> "$2"
}
log=tmp/units/ebcl-2-format.log.txt
./node_modules/.bin/oxfmt --config .oxfmtrc.json --check $owned_ts $components guides/veneer.md > $log 2>&1; finish $? $log
log=tmp/units/ebcl-2-check.log.txt
npm run check > $log 2>&1; finish $? $log
log=tmp/units/ebcl-2-lint-check.log.txt
npm run lint:check > $log 2>&1; finish $? $log
log=tmp/units/ebcl-2-build-styles.log.txt
npm run build:src:styles > $log 2>&1; finish $? $log
log=tmp/units/ebcl-2-styles-owned.log.txt
npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=verbose tests/src/styles/elements/button.test.ts $components > $log 2>&1; finish $? $log
log=tmp/units/ebcl-2-setup-browser.log.txt
npx vitest run --config vite.config.ts --no-cache --project setup:browser tests/setupBrowser.test.ts > $log 2>&1; finish $? $log
log=tmp/units/ebcl-2-setup-styles.log.txt
npx vitest run --config vite.config.ts --no-cache --project setup tests/setupStyles.test.ts > $log 2>&1; finish $? $log
for gate in test:guides test:policy test:conformance test:src:styles; do
	log=tmp/units/ebcl-2-${gate//:/-}.log.txt
	npm run $gate > $log 2>&1; finish $? $log
done
echo "gates done"
