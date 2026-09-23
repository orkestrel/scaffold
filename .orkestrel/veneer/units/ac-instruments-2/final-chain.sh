#!/usr/bin/env bash
# Runs the final gates, then the failing-first evidence, on the final validation copy
# (tmp/probe/final), in series. Output: logs/final-chain.log.txt.
HERE="$(cd "$(dirname "$0")" && pwd)"
FINAL="$(cd "$HERE/../../probe/final" && pwd)"
{
	echo "== gates"
	"$HERE/gates-final.sh"
	echo "== empty-partial control"
	STAGE="$FINAL" "$HERE/empty-partial.sh"
	echo "== button-padding-literal"
	STAGE="$FINAL" python3 "$HERE/mutate.py" button-padding-literal | tee "$HERE/logs/button-padding-literal.log.txt"
	echo "== built selectors"
	(cd "$FINAL" && node "$HERE/built-selectors.mjs" > "$HERE/logs/built-selectors.log.txt"; echo "built-selectors exit=$?")
} 2>&1 | tee "$HERE/logs/final-chain.log.txt"
