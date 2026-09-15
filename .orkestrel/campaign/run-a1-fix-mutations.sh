#!/usr/bin/env bash
# Orchestrator mutation probes on the A1-fix tree: disable one load-bearing line, run the pin that
# names it, expect red, restore the line, expect green. Each restore is verified by text.
cd /c/Users/mikes/WebstormProjects/agent || exit 9
FILE=src/core/AgentProvider.ts
OUT=/c/Users/mikes/WebstormProjects/scaffold/tmp/units/a1-fix-mutations.log.txt
: > "$OUT"
cp "$FILE" /c/Users/mikes/WebstormProjects/scaffold/tmp/units/AgentProvider.before-mutations.ts.txt

probe() {
	local label="$1" original="$2" mutant="$3" selector="$4"
	echo "=== $label" | tee -a "$OUT"
	if ! grep -qF "$original" "$FILE"; then echo "ORIGINAL LINE NOT FOUND: $original" | tee -a "$OUT"; return; fi
	sed -i "s|$(printf '%s' "$original" | sed 's/[][\\/.*^$]/\\&/g')|$(printf '%s' "$mutant" | sed 's/[\\/&|]/\\&/g')|" "$FILE"
	grep -qF "$mutant" "$FILE" && echo "mutated: $mutant" | tee -a "$OUT"
	npm run test:src:core -- tests/src/core/AgentProvider.test.ts -t "$selector" >> "$OUT" 2>&1
	echo "mutant run exit=$? (expected non-zero)" | tee -a "$OUT"
	sed -i "s|$(printf '%s' "$mutant" | sed 's/[][\\/.*^$]/\\&/g')|$(printf '%s' "$original" | sed 's/[\\/&|]/\\&/g')|" "$FILE"
	grep -qF "$original" "$FILE" && echo "restored" | tee -a "$OUT"
	npm run test:src:core -- tests/src/core/AgentProvider.test.ts -t "$selector" >> "$OUT" 2>&1
	echo "restored run exit=$? (expected 0)" | tee -a "$OUT"
}

probe "M1 cancellation rule (F1)" \
	"if (combined.aborted) {" \
	"if (combined.aborted && error === combined.reason) {" \
	"normalizes a transport|replaces a caller"

probe "M2 reader-owned cancellation (F7)" \
	"for await (const chunk of readChunks(response.body, combined)) {" \
	"for await (const chunk of readChunks(response.body)) {" \
	"distinct interleaved"

probe "M3 signal-bound error read (F2)" \
	"await readText(response.body, MAX_ERROR_BODY_LENGTH, signal)" \
	"await readText(response.body, MAX_ERROR_BODY_LENGTH)" \
	"cancels a stalled 503"

if cmp -s "$FILE" /c/Users/mikes/WebstormProjects/scaffold/tmp/units/AgentProvider.before-mutations.ts.txt; then
	echo "file byte-identical to its pre-mutation copy" | tee -a "$OUT"
else
	echo "FILE DIFFERS FROM PRE-MUTATION COPY" | tee -a "$OUT"
fi
grep -E "^(===|mutated|mutant run|restored|file byte)" "$OUT"
