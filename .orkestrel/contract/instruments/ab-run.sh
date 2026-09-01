#!/bin/bash
# Probe driver: interleaved per-process A/B of two dist copies.
# Run: bash ab-run.sh <A/index.js> <B/index.js> [families]
# Three processes per side, interleaved A B A B A B; per family prints both
# sides' per-process medians and the A/B ratio of the middle values.
A="$1"; B="$2"; FAMILIES="${3:-is-medium,parse-medium,audit-medium,explain-medium,is-deep,audit-deep}"
DIR="$(dirname "$0")"
TMP="$(mktemp -d)"
for round in 1 2 3; do
	node "$DIR/ab-ops.mjs" "$A" "$FAMILIES" 2>/dev/null > "$TMP/a$round.txt"
	node "$DIR/ab-ops.mjs" "$B" "$FAMILIES" 2>/dev/null > "$TMP/b$round.txt"
done
node - "$TMP" <<'READER'
const { readFileSync } = require('node:fs')
const dir = process.argv[2]
const read = (side, round) => Object.fromEntries(
	readFileSync(`${dir}/${side}${round}.txt`, 'utf8').trim().split('\n')
		.map(line => line.split(' '))
		.map(([family, median]) => [family, Number(median)]),
)
const sides = { a: [1, 2, 3].map(r => read('a', r)), b: [1, 2, 3].map(r => read('b', r)) }
const families = Object.keys(sides.a[0])
const mid = list => [...list].sort((x, y) => x - y)[1]
for (const family of families) {
	const a = mid(sides.a.map(run => run[family]))
	const b = mid(sides.b.map(run => run[family]))
	console.log(`${family}: A ${a} ns/op (${sides.a.map(run => run[family]).join(',')})  B ${b} ns/op (${sides.b.map(run => run[family]).join(',')})  B/A ${(b / a).toFixed(3)}`)
}
READER
rm -rf "$TMP"
