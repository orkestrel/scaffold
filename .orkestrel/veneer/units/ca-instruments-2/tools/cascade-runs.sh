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
echo DONE >> $L/summary.txt
