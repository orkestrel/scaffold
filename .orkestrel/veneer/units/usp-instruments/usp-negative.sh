#!/usr/bin/env bash
# The consumer proof's negative controls on the validation copy: (a) a shipped important shared name
# written onto the exclusion line in every copy, (b) that name's `!important` dropped from the built
# cascade. Each mutation is reverted after its run.
set -uo pipefail
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
cd /home/user/veneer-usp/tmp/probe/base
files="tests/setup.css tests/fixtures/tailwind/consumer.css tests/fixtures/tailwind/preflight.css guides/veneer.md"
for f in $files; do cp "$f" "$f.usp-keep"; done
echo "== (a) m-3 written onto the exclusion line in every copy"
for f in $files; do sed -i 's/ ps-5")/ ps-5 m-3")/' "$f"; done
grep -c ' ps-5 m-3")' $files
npm run test:service 2>&1 | grep -E "FAIL|Tests |m-3" | head -20
echo "exit ${PIPESTATUS[0]}"
for f in $files; do mv "$f.usp-keep" "$f"; done
grep -c ' ps-5 m-3")' $files
echo "== (b) the !important dropped from the built .m-3 rule"
cp dist/src/styles/index.css dist/src/styles/index.css.usp-keep
sed -i 's/\.m-3{margin:var(--vn-space-8)!important}/.m-3{margin:var(--vn-space-8)}/' dist/src/styles/index.css
grep -c '\.m-3{margin:var(--vn-space-8)}' dist/src/styles/index.css
npm run test:service 2>&1 | grep -E "FAIL|Tests |m-3" | head -20
echo "exit ${PIPESTATUS[0]}"
mv dist/src/styles/index.css.usp-keep dist/src/styles/index.css
grep -c '\.m-3{margin:var(--vn-space-8)!important}' dist/src/styles/index.css
