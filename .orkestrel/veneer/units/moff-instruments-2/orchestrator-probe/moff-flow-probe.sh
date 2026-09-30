#!/bin/bash
# Probe: does the responsive case, or the ledger, catch a transition declared in the in-flow range?
# Plants `transition: var(--bs-offcanvas-transition);` after `--bs-offcanvas-border-width: 0;` in /home/user/veneer-moff.
cd /home/user/veneer-moff || exit 1
export PATH=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
F=src/styles/components/_offcanvas.scss
OUT=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/moff-flow-probe
mkdir -p $OUT
BEFORE=$(sha256sum $F | cut -d' ' -f1)
cp $F $OUT/_offcanvas.scss.bak
python3 - <<'PY'
import pathlib
p = pathlib.Path('/home/user/veneer-moff/src/styles/components/_offcanvas.scss')
s = p.read_text()
old = "--bs-offcanvas-border-width: 0;\n"
assert s.count(old) == 1
p.write_text(s.replace(old, old + "\t\t\t\t\ttransition: var(--bs-offcanvas-transition);\n", 1))
PY
git diff
npm run build:src > $OUT/build.log.txt 2>&1; echo "build exit=$?"
npx vitest run --config configs/src/vite.styles.config.ts tests/src/styles/components/offcanvas.test.ts tests/src/styles/components/navbar.test.ts > $OUT/styles.log.txt 2>&1; echo "styles exit=$?"
grep -E 'Tests +[0-9]' $OUT/styles.log.txt
npx vitest run --config vite.config.ts --no-cache --project conformance > $OUT/conformance.log.txt 2>&1; echo "conformance exit=$?"
grep -E 'Tests +[0-9]|^ FAIL' $OUT/conformance.log.txt | head -6
cp $OUT/_offcanvas.scss.bak $F
AFTER=$(sha256sum $F | cut -d' ' -f1)
[ "$BEFORE" = "$AFTER" ] && echo "restore identical $AFTER" || echo "RESTORE DIFFERS"
npm run build:src > $OUT/rebuild.log.txt 2>&1; echo "rebuild exit=$?"
git status --short
