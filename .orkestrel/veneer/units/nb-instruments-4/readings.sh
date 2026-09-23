#!/usr/bin/env bash
# Takes the built-cascade reading and the theme case's red and green runs in the stage. The theme
# case at `a658879` is copied in from git for the red run, and the rewritten case is restored by
# digest for the green run.
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
STAGE=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/nb4/stage
WT=/home/user/veneer-nb
I=$WT/tmp/units/nb-instruments-4
cd "$STAGE" || exit 1
strip() { sed 's/\x1b\[[0-9;]*m//g'; }

LOG=$I/logs/built-cascade.log.txt
: > "$LOG"
echo '$ npm run build:src' >> "$LOG"
npm run build:src > "$I/logs/.build.out" 2>&1
echo "exit $?" >> "$LOG"
strip < "$I/logs/.build.out" | grep -E 'index\.css|built in' >> "$LOG"
echo '$ grep -c navbar-light dist/src/styles/index.css' >> "$LOG"
grep -c navbar-light dist/src/styles/index.css >> "$LOG"
echo "exit $? (grep exits 1 when it counts no line)" >> "$LOG"
echo '$ grep -oE '"'"'@media \(width>=[0-9]+px\)\{\.navbar-expand-[a-z]+'"'"' dist/src/styles/index.css' >> "$LOG"
grep -oE '@media \(width>=[0-9]+px\)\{\.navbar-expand-[a-z]+' dist/src/styles/index.css >> "$LOG"
echo "exit $?" >> "$LOG"
echo '$ grep -oE '"'"'\}\.navbar-expand\{[^}]*\}'"'"' dist/src/styles/index.css' >> "$LOG"
grep -oE '\}\.navbar-expand\{[^}]*\}' dist/src/styles/index.css >> "$LOG"
echo "exit $?" >> "$LOG"
rm -f "$I/logs/.build.out"

LOG=$I/logs/theme-red-green.log.txt
THEME=tests/src/styles/theme.test.ts
: > "$LOG"
digest=$(sha256sum "$THEME" | cut -d' ' -f1)
echo "rewritten case digest $digest" >> "$LOG"
git -C "$WT" show a658879:$THEME > "$THEME"
echo "== the a658879 theme case against the stage cascade" >> "$LOG"
echo "$ npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot $THEME" >> "$LOG"
npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot "$THEME" 2>&1 | strip > "$I/logs/.theme.out"
echo "exit ${PIPESTATUS[0]}" >> "$LOG"
grep -E '^ (FAIL|×)|AssertionError|^\s+Tests\s' "$I/logs/.theme.out" | head -8 >> "$LOG"
cp "$WT/$THEME" "$THEME"
echo "== the rewritten case" >> "$LOG"
npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot "$THEME" 2>&1 | strip > "$I/logs/.theme.out"
echo "exit ${PIPESTATUS[0]}" >> "$LOG"
grep -E '^\s+Tests\s' "$I/logs/.theme.out" >> "$LOG"
after=$(sha256sum "$THEME" | cut -d' ' -f1)
echo "restored digest $after" >> "$LOG"
test "$digest" = "$after" && echo 'theme proof restored byte for byte' >> "$LOG"
rm -f "$I/logs/.theme.out"
