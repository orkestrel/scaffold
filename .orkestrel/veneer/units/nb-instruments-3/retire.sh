#!/usr/bin/env bash
# Builds the retirement copy from the stage, writes the retirement patch against the simulated
# post-ACCORDION state with an index line per file, checks that it applies there, runs the
# retirement gates, takes the asset case's red and green readings, and deletes the copy.
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
NB=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/nb3
STAGE=$NB/stage
RETIRE=$NB/retire
REPO=$NB/retirerepo
WT=/home/user/veneer-nb
I=$WT/tmp/units/nb-instruments-3
FILES=(src/styles/_tokens.scss src/styles/_theme.scss tests/setupStyles.test.ts tests/src/styles/theme.test.ts)
strip() { sed 's/\x1b\[[0-9;]*m//g'; }
rm -rf "$RETIRE" "$REPO"
mkdir -p "$RETIRE"
tar -C "$STAGE" --exclude=./tmp -cf - . | tar -C "$RETIRE" -xf -
python3 "$I/retire.py" "$RETIRE" simulate || exit 1
git init -q "$REPO"
for path in "${FILES[@]}"; do mkdir -p "$REPO/$(dirname "$path")"; cp "$RETIRE/$path" "$REPO/$path"; done
git -C "$REPO" add -A
python3 "$I/retire.py" "$RETIRE" retire || exit 1
for path in "${FILES[@]}"; do cp "$RETIRE/$path" "$REPO/$path"; done
git -C "$REPO" diff --no-color -- "${FILES[@]}" > "$WT/tmp/units/nb-retirement-3.patch"
# Check the patch against a fresh copy of the simulated state: restore the index copies and apply.
git -C "$REPO" diff --no-color --stat
for path in "${FILES[@]}"; do git -C "$REPO" show ":$path" > "$REPO/$path"; done
git -C "$REPO" apply --check "$WT/tmp/units/nb-retirement-3.patch" && echo 'retirement patch: git apply --check passes against the simulated state'
rm -rf "$REPO"

LOG=$I/logs/retire-gates.log.txt
: > "$LOG"
cd "$RETIRE" || exit 1
step() {
	local name="$1"; shift
	"$@" > "$I/logs/.step.out" 2>&1
	local code=$?
	local summary
	summary=$(strip < "$I/logs/.step.out" | grep -E '^\s+Tests\s|All matched files|Found [0-9]+ (warning|error)|error TS|✓ built' | tail -1)
	echo "$name | exit $code | $summary | $*" >> "$LOG"
}
step format-check npx oxfmt --config .oxfmtrc.json --check "${FILES[@]}" tests/setupStyles.ts
step lint-check npm run lint:check
step check npm run check
step build-src npm run build:src
step setupstyles-setup-project npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupStyles.test.ts
step styles-retired npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/navbar.test.ts tests/src/styles/theme.test.ts tests/src/styles/tokens.test.ts tests/src/styles/components/container.test.ts
step test-conformance npm run test:conformance
echo done >> "$LOG"

LOG=$I/logs/retirement-asset.log.txt
THEME=src/styles/_theme.scss
: > "$LOG"
digest=$(sha256sum "$THEME" | cut -d' ' -f1)
cp "$THEME" "$I/logs/.theme.keep"
python3 - "$THEME" <<'PY'
import sys
p = sys.argv[1]
s = open(p).read()
site = '@include theme-tokens(tokens.$roles, tokens.$aliased, tokens.$dark);\n'
assert s.count(site) == 1
declared = site + "\t\t--bs-accordion-btn-icon: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg'%3e%3c/svg%3e\");\n"
open(p, 'w').write(s.replace(site, declared))
PY
echo '== an accordion icon declared in the retirement copy dark scope' >> "$LOG"
grep -n 'bs-accordion-btn-icon' "$THEME" >> "$LOG"
npm run build:src:styles > "$I/logs/.step.out" 2>&1; echo "build:src:styles exit $?" >> "$LOG"
echo '$ npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/theme.test.ts' >> "$LOG"
npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/theme.test.ts 2>&1 | strip > "$I/logs/.step.out"
echo "exit ${PIPESTATUS[0]}" >> "$LOG"
grep -E '^ FAIL|AssertionError|^\s+Tests\s' "$I/logs/.step.out" | head -6 >> "$LOG"
cp "$I/logs/.theme.keep" "$THEME"
echo '== the retirement copy as the patch leaves it' >> "$LOG"
npm run build:src:styles > "$I/logs/.step.out" 2>&1; echo "build:src:styles exit $?" >> "$LOG"
npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/theme.test.ts 2>&1 | strip > "$I/logs/.step.out"
echo "exit ${PIPESTATUS[0]}" >> "$LOG"
grep -E '^\s+Tests\s' "$I/logs/.step.out" >> "$LOG"
after=$(sha256sum "$THEME" | cut -d' ' -f1)
test "$digest" = "$after" && echo "_theme.scss restored byte for byte ($after)" >> "$LOG"
rm -f "$I/logs/.step.out" "$I/logs/.theme.keep"
cd "$NB" && rm -rf "$RETIRE" && echo 'retirement copy deleted' >> "$LOG"
