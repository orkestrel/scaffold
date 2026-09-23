#!/usr/bin/env bash
# Reads the class specimen's brand with the partial's `.navbar-dark,` selector line removed and with
# it, in the stage, then restores the partial by digest and deletes the probe. The styles project
# loads the built `dist/src/styles/index.css` file, so each state rebuilds the cascade first.
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
STAGE=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/nb4/stage
I=/home/user/veneer-nb/tmp/units/nb-instruments-4
LOG=$I/logs/class-surface.log.txt
PARTIAL=src/styles/components/_navbar.scss
PROBE=tests/src/styles/probe/class-surface.test.ts
cd "$STAGE" || exit 1
: > "$LOG"
digest=$(sha256sum "$PARTIAL" | cut -d' ' -f1)
cp "$PARTIAL" "$I/logs/.navbar.keep"
mkdir -p tests/src/styles/probe
cp "$I/class-surface.test.ts" "$PROBE"
read_surface() {
	local label="$1"
	echo "== $label" >> "$LOG"
	grep -c '^	\.navbar-dark,$' "$PARTIAL" | sed 's/^/.navbar-dark, selector lines in the partial: /' >> "$LOG"
	npm run build:src:styles > "$I/logs/.build.out" 2>&1
	echo "build:src:styles exit $?" >> "$LOG"
	grep -o '\.navbar-dark,\.navbar\[data-bs-theme=dark\]{' dist/src/styles/index.css | sed 's/^/built dark rule selector: /' >> "$LOG"
	grep -c '\.navbar-dark' dist/src/styles/index.css | sed 's/^/built .navbar-dark occurrences: /' >> "$LOG"
	npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot "$PROBE" > "$I/logs/.probe.out" 2>&1
	echo "exit $?" >> "$LOG"
	sed 's/\x1b\[[0-9;]*m//g' "$I/logs/.probe.out" | grep -E 'CLASS-SURFACE|^\s+Tests\s' >> "$LOG"
}
python3 - "$PARTIAL" <<'PY'
import sys
p = sys.argv[1]
s = open(p).read()
assert s.count('\t.navbar-dark,\n') == 1
open(p, 'w').write(s.replace('\t.navbar-dark,\n', '', 1))
PY
read_surface 'the .navbar-dark, selector line removed from the partial'
cp "$I/logs/.navbar.keep" "$PARTIAL"
read_surface 'the partial as shipped'
rm -f "$PROBE" "$I/logs/.probe.out" "$I/logs/.navbar.keep" "$I/logs/.build.out"
rmdir tests/src/styles/probe
after=$(sha256sum "$PARTIAL" | cut -d' ' -f1)
echo "partial digest before $digest after $after" >> "$LOG"
test "$digest" = "$after" && echo 'partial restored byte for byte; probe deleted' >> "$LOG"
ls tests/src/styles | tr '\n' ' ' | sed 's/^/tests\/src\/styles after cleanup: /' >> "$LOG"; echo >> "$LOG"
