#!/usr/bin/env bash
# Negative controls for the service proofs. Each mutation is applied to a backed-up file, the
# suite runs, and the backup is copied back.
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
cd /home/user/veneer-us
out=tmp/probe
# Control A: the built cascade's .gap-3 rule loses its !important.
cp dist/src/styles/index.css $out/index.css.bak
grep -c '\.gap-3{gap:var(--vn-gap-3)!important}' dist/src/styles/index.css
sed -i 's/\.gap-3{gap:var(--vn-gap-3)!important}/.gap-3{gap:var(--vn-gap-3)}/' dist/src/styles/index.css
grep -c '\.gap-3{gap:var(--vn-gap-3)}' dist/src/styles/index.css
npm run test:service > $out/control-a.log.txt 2>&1; echo "control A exit=$?"
cp $out/index.css.bak dist/src/styles/index.css
# Control B: gap-3 written onto the exclusion line in the profile and its file copies.
for f in tests/setup.css tests/fixtures/tailwind/consumer.css tests/fixtures/tailwind/preflight.css; do
  cp $f $out/$(basename $f).bak
  sed -i 's/col-12 container table");/col-12 container gap-3 table");/' $f
  grep -c 'container gap-3 table' $f
done
npm run test:service > $out/control-b.log.txt 2>&1; echo "control B exit=$?"
cp $out/setup.css.bak tests/setup.css
cp $out/consumer.css.bak tests/fixtures/tailwind/consumer.css
cp $out/preflight.css.bak tests/fixtures/tailwind/preflight.css
git status --short
