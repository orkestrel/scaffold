#!/usr/bin/env bash
set +e
npx oxfmt --config .oxfmtrc.json --check app/browser/styles tests/app/browser/styles > tmp/codex/u4-format.log 2>&1
printf 'format exit=%s\n' "$?"
npx oxlint --config .oxlintrc.json --deny-warnings app/browser/styles tests/app/browser/styles > tmp/codex/u4-lint.log 2>&1
printf 'lint exit=%s\n' "$?"
npm run check > tmp/codex/u4-check.log 2>&1
printf 'check exit=%s\n' "$?"
npm run test:app:browser > tmp/codex/u4-browser-final.log 2>&1
printf 'browser exit=%s\n' "$?"
npm run build > tmp/codex/u4-build.log 2>&1
printf 'build exit=%s\n' "$?"
npm run test:journey -- --reporter=verbose > tmp/codex/u4-journey-after.log 2>&1
printf 'journey exit=%s\n' "$?"
u4_started=$SECONDS
npm test > tmp/codex/u4-npm-test.log 2>&1
printf 'npm test exit=%s wall_seconds=%s\n' "$?" "$((SECONDS-u4_started))"
