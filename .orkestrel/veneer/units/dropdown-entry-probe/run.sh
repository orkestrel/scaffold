#!/bin/bash
# Probe: which suites that read a dropdown menu go red under the candidate entry rule.
# Runs at Veneer main 92ca407 in /home/user/veneer-probe, base first, then the candidate.
cd /home/user/veneer-probe || exit 1
export PATH=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
OUT=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/dropdown-probe
BROWSER="tests/src/browser/Dropdown.test.ts tests/src/browser/Delegate.test.ts tests/src/browser/Placement.test.ts tests/src/browser/Tab.test.ts tests/src/browser/ScrollSpy.test.ts tests/src/browser/HostSnapshot.test.ts tests/src/browser/helpers.test.ts"
STYLES="tests/src/styles/components/dropdown.test.ts tests/src/styles/components/nav.test.ts tests/src/styles/components/navbar.test.ts tests/src/styles/components/button-group.test.ts tests/src/styles/mixins.test.ts"
APP="tests/app/browser/integration.test.ts tests/app/browser/sections/ButtonGroupSection.test.ts tests/app/browser/sections/DropdownSection.test.ts tests/app/browser/sections/EngineSection.test.ts tests/app/browser/sections/InputGroupSection.test.ts tests/app/browser/sections/NavSection.test.ts tests/app/browser/sections/NavbarSection.test.ts"
run() {
  label=$1
  rm -rf node_modules/.vite
  echo "== $label src:browser"; npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser $BROWSER > $OUT/$label-browser.log.txt 2>&1; echo "exit=$?"
  echo "== $label build:src:styles"; npm run build:src:styles > $OUT/$label-build.log.txt 2>&1; echo "exit=$?"
  echo "== $label styles"; npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot $STYLES > $OUT/$label-styles.log.txt 2>&1; echo "exit=$?"
  echo "== $label setup:browser"; npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup:browser tests/setupBrowser.test.ts > $OUT/$label-setupbrowser.log.txt 2>&1; echo "exit=$?"
  echo "== $label app"; npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser $APP > $OUT/$label-app.log.txt 2>&1; echo "exit=$?"
}
run base
python3 $OUT/apply.py
git diff --stat
run candidate
git diff > $OUT/candidate.diff
echo done
