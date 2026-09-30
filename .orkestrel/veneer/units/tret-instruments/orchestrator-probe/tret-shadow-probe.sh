#!/bin/bash
# Probe: does the every-caller forced-colors case fail when a shipped caller's reset paints a shadow?
# Plants `$reset: 0 0 0 5px red` on the .btn focus-ring include in /home/user/veneer-tret, runs the case, restores.
cd /home/user/veneer-tret || exit 1
export PATH=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
F=src/styles/components/_button.scss
OUT=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/tret-shadow-probe
mkdir -p $OUT
BEFORE=$(sha256sum $F | cut -d' ' -f1)
cp $F $OUT/_button.scss.bak
python3 - <<'PY'
import pathlib
p = pathlib.Path('/home/user/veneer-tret/src/styles/components/_button.scss')
s = p.read_text()
old = "\t\t\t$highlight: var(--vn-button-highlight),\n\t\t\t$reset: var(--vn-button-shadow)\n"
assert s.count(old) >= 1
p.write_text(s.replace(old, "\t\t\t$highlight: var(--vn-button-highlight),\n\t\t\t$reset: 0 0 0 5px red\n", 1))
PY
git diff --stat
npm run build:src:styles > $OUT/build.log.txt 2>&1; echo "build exit=$?"
npx vitest run --config configs/src/vite.styles.config.ts tests/src/styles/mixins.test.ts -t 'outlines every shipped' > $OUT/case.log.txt 2>&1; echo "case exit=$?"
grep -E 'Tests +[0-9]|AssertionError' $OUT/case.log.txt | head -5
grep -o 'box-shadow:0 0 0 5px red' dist/src/styles/index.css | head -2
cp $OUT/_button.scss.bak $F
AFTER=$(sha256sum $F | cut -d' ' -f1)
[ "$BEFORE" = "$AFTER" ] && echo "restore identical $AFTER" || echo "RESTORE DIFFERS"
npm run build:src:styles > $OUT/rebuild.log.txt 2>&1; echo "rebuild exit=$?"
git status --short
