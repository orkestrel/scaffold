#!/usr/bin/env bash
# Runs the cascade comparator on the validation copy: the clean expanded compile and the clean built
# cascade, then each negative control planted in the partial (one extra carousel rule; the previous
# mark's URI swapped for the next mark's) on both the expanded compile and a rebuilt cascade, then
# restores the partial by digest, rebuilds, and takes the clean readings again.
set -u
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
T=/home/user/veneer-ca/tmp/units/ca-instruments-2
L=$T/logs/cascade
B=/home/user/veneer-ca/tmp/probe/base
P=$B/src/styles/components/_carousel.scss
mkdir -p $L
cd $B
: > $L/summary.txt
check() { local name=$1 mode=$2; node $T/tools/cascade-check.mjs $mode $B > $L/$name.log.txt 2>&1; echo "$name exit=$? $(tail -1 $L/$name.log.txt)" >> $L/summary.txt; }
rebuild() { npm run build:src:styles > $L/build-$1.log.txt 2>&1 || echo "build-$1 failed" >> $L/summary.txt; }
DIGEST=$(sha256sum $P | cut -d' ' -f1)
cp $P $L/partial.keep
rebuild clean
check clean-expanded expanded
check clean-built built
# Negative control: one planted carousel rule.
python3 - "$P" <<'PY'
import sys, pathlib
p = pathlib.Path(sys.argv[1]); t = p.read_text()
old = '\t.carousel-caption {'
assert t.count(old) == 1
p.write_text(t.replace(old, '\t.carousel-caption h5 {\n\t\tmargin: 0;\n\t}\n\n\t.carousel-caption {'))
PY
diff $L/partial.keep $P > $L/planted-rule.diff.txt
check planted-rule-expanded expanded
rebuild planted-rule
check planted-rule-built built
cp $L/partial.keep $P
# Negative control: the previous mark's URI swapped for the next mark's.
python3 - "$P" <<'PY'
import re, sys, pathlib
p = pathlib.Path(sys.argv[1]); t = p.read_text()
prev = re.search(r"(\.carousel-control-prev-icon \{\n\t\tbackground-image: )(url\([^\n]*\));", t)
nxt = re.search(r"\.carousel-control-next-icon \{\n\t\tbackground-image: (url\([^\n]*\));", t)
p.write_text(t.replace(prev.group(0), prev.group(1) + nxt.group(1) + ';'))
PY
diff $L/partial.keep $P > $L/swapped-uri.diff.txt
check swapped-uri-expanded expanded
rebuild swapped-uri
check swapped-uri-built built
cp $L/partial.keep $P
test "$(sha256sum $P | cut -d' ' -f1)" = "$DIGEST" && echo "partial restored by digest" >> $L/summary.txt
rm $L/partial.keep
rebuild restored
check restored-expanded expanded
check restored-built built
# Negative control: the controls block's `color` declaration moved before `position`, so the same
# declared values sit in a different order (R-A's expanded-mode DECLARATION-ORDER branch).
cp $P $L/partial.keep2
python3 - "$P" <<'PY'
import sys, pathlib
p = pathlib.Path(sys.argv[1]); t = p.read_text()
old = (
	'\t.carousel-control-prev,\n\t.carousel-control-next {\n\t\tposition: absolute;\n'
)
assert t.count(old) == 1
new = (
	'\t.carousel-control-prev,\n\t.carousel-control-next {\n\t\tcolor: var(--vn-palette-white-base);\n\t\tposition: absolute;\n'
)
t = t.replace(old, new, 1)
dropped = '\t\tpadding: 0;\n\t\tcolor: var(--vn-palette-white-base);\n\t\ttext-align: center;\n'
kept = '\t\tpadding: 0;\n\t\ttext-align: center;\n'
assert t.count(dropped) == 1
t = t.replace(dropped, kept, 1)
p.write_text(t)
PY
diff $L/partial.keep2 $P > $L/color-before-position.diff.txt
check color-before-position expanded
cp $L/partial.keep2 $P
# Negative control: a recorded selector removed from the compiled input (R-A's MISSING branch).
python3 - "$P" <<'PY'
import sys, pathlib
p = pathlib.Path(sys.argv[1]); t = p.read_text()
old = (
	"\n\t// The opt-in retune for a carousel over light pictures inside a light island. It declares the\n"
	"\t// dark scope's own values, so the class and a dark island paint one carousel.\n"
	"\t.carousel-dark {\n"
	"\t\t--bs-carousel-indicator-active-bg: #{map.get(tokens.$dark, 'carousel-surface')};\n"
	"\t\t--bs-carousel-caption-color: #{map.get(tokens.$dark, 'carousel-caption')};\n"
	"\t\t--bs-carousel-control-icon-filter: #{map.get(tokens.$dark, 'carousel-icon-filter')};\n"
	"\t}\n"
)
assert t.count(old) == 1
p.write_text(t.replace(old, '\n', 1))
PY
diff $L/partial.keep2 $P > $L/missing-selector.diff.txt
check missing-selector expanded
cp $L/partial.keep2 $P
# Negative control: two recorded carousel keys swapped in the compiled input (R-A's ORDER branch).
python3 - "$P" <<'PY'
import sys, pathlib
p = pathlib.Path(sys.argv[1]); t = p.read_text()
active = '\t.carousel-indicators .active {\n\t\topacity: 1;\n\t}\n'
caption = (
	'\t.carousel-caption {\n'
	'\t\tposition: absolute;\n'
	'\t\tright: 15%;\n'
	'\t\tbottom: 1.25rem;\n'
	'\t\tleft: 15%;\n'
	'\t\tpadding-top: 1.25rem;\n'
	'\t\tpadding-bottom: 1.25rem;\n'
	'\t\tcolor: var(--bs-carousel-caption-color);\n'
	'\t\ttext-align: center;\n'
	'\t}\n'
)
old = active + '\n' + caption
assert t.count(old) == 1
p.write_text(t.replace(old, caption + '\n' + active, 1))
PY
diff $L/partial.keep2 $P > $L/swapped-keys.diff.txt
check swapped-keys expanded
cp $L/partial.keep2 $P
# Negative control: a block moved outside the components layer (R-A's LAYER branch).
python3 - "$P" <<'PY'
import sys, pathlib
p = pathlib.Path(sys.argv[1]); t = p.read_text()
block = (
	'\t.carousel-caption {\n'
	'\t\tposition: absolute;\n'
	'\t\tright: 15%;\n'
	'\t\tbottom: 1.25rem;\n'
	'\t\tleft: 15%;\n'
	'\t\tpadding-top: 1.25rem;\n'
	'\t\tpadding-bottom: 1.25rem;\n'
	'\t\tcolor: var(--bs-carousel-caption-color);\n'
	'\t\ttext-align: center;\n'
	'\t}\n\n'
)
assert t.count(block) == 1
t = t.replace(block, '', 1)
assert t.endswith('}\n')
t = t[: -len('}\n')] + '}\n\n' + block
p.write_text(t)
PY
diff $L/partial.keep2 $P > $L/moved-layer.diff.txt
check moved-layer expanded
cp $L/partial.keep2 $P
rm $L/partial.keep2
# Negative control: a departure row added to a copy of the guide that the cascade does not write
# (R-A's STALE-DEPARTURE branch).
G=$B/guides/veneer.md
cp $G $L/guide.keep
python3 - "$G" <<'PY'
import sys, pathlib
p = pathlib.Path(sys.argv[1]); t = p.read_text()
heading = "#### `carousel`\n"
assert t.count(heading) == 1
row = "| `carousel` | `.carousel-item` | `opacity` | — | `1` | `0` | tokenized |\n"
lines = t.split(heading, 1)
head, rest = lines[0], lines[1]
body = rest.split('\n', 3)
new_rest = body[0] + '\n' + body[1] + '\n' + body[2] + '\n' + row + body[3]
p.write_text(head + heading + new_rest)
PY
diff $L/guide.keep $G > $L/stale-departure.diff.txt
check stale-departure expanded
cp $L/guide.keep $G
rm $L/guide.keep
test "$(sha256sum $P | cut -d' ' -f1)" = "$DIGEST" && echo "partial restored by digest (round 2)" >> $L/summary.txt
git -C $B diff --quiet -- guides/veneer.md && echo "guide restored (round 3)" >> $L/summary.txt
echo DONE >> $L/summary.txt
