#!/usr/bin/env bash
# Unit bft, criterion 1: plants one literal declaration on the shipped `.form-control` rule, records
# which gates report it, and removes the plant on every exit path. Run from any directory:
#   bash /home/user/veneer-bft/tmp/units/bft-literal-probe.sh > /home/user/veneer-bft/tmp/units/bft-literal-probe.log.txt 2>&1
set -u
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
ROOT=/home/user/veneer-bft
TARGET="$ROOT/src/styles/components/_form-control.scss"
PLANT='letter-spacing: 0.01em;'
BACKUP="$ROOT/tmp/units/bft-literal-probe.original.scss"
EXPECTED='form-control | .form-control { letter-spacing } | — | declaration'
cd "$ROOT" || exit 2

restore() {
	if [ -f "$BACKUP" ]; then
		cp "$BACKUP" "$TARGET"
		rm -f "$BACKUP"
		echo "== restore: plant removed"
	fi
}
trap restore EXIT
trap 'exit 130' INT TERM

step() {
	local label="$1"
	shift
	echo "== $label: $*"
	local out
	out="$(mktemp)"
	"$@" > "$out" 2>&1
	local code=$?
	tail -n 40 "$out"
	echo "== $label: exit $code"
	LAST_OUT="$out"
	return $code
}

echo "== precheck: FORM_CONTROL_CASES rows and guide Additions naming letter-spacing"
grep -n 'letter-spacing' tests/setupStyles.ts guides/veneer.md; echo "== precheck: grep exit $? (1 means no match)"

BASELINE="$(sha256sum "$TARGET" | cut -d' ' -f1)"
echo "== baseline sha256: $BASELINE"
cp "$TARGET" "$BACKUP"

# Append the plant as the last declaration line of the first `.form-control {` rule.
awk -v plant="$PLANT" '
	!done && /^\t\.form-control \{$/ { inside = 1 }
	inside && /^\t\}$/ { print "\t\t" plant; inside = 0; done = 1 }
	{ print }
' "$BACKUP" > "$TARGET"
echo "== plant diff:"
diff "$BACKUP" "$TARGET"

step build npm run build:src
step setup npm run test:setup
step styles bash -c 'npm run build:src:styles && npx vitest run --config configs/src/vite.styles.config.ts --no-cache tests/src/styles/components/form-control.test.ts'
step conformance npm run test:conformance
echo "== conformance: red case line"
grep -n 'records every emitted name the official inventory lacks' "$LAST_OUT" | head -n 5
echo "== conformance: expected addition line"
grep -nF "$EXPECTED" "$LAST_OUT"; echo "== conformance: expected-line grep exit $?"

restore
AFTER="$(sha256sum "$TARGET" | cut -d' ' -f1)"
echo "== after sha256: $AFTER"
[ "$AFTER" = "$BASELINE" ] && echo "== sha256 equal: yes" || echo "== sha256 equal: no"
echo "== git status --porcelain src:"
git status --porcelain src
echo "== git status --porcelain src: end"
