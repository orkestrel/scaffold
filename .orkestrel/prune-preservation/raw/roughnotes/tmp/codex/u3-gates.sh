#!/usr/bin/env bash
set -eu
owned=(
  app/browser/types.ts
  app/browser/controllers/ApplicationController.ts
  app/browser/components/SubscribeForm.vue
  app/browser/components/ContactForm.vue
  app/browser/components/PaymentForm.vue
  tests/app/browser/controllers/ApplicationController.test.ts
  tests/app/browser/components/SubscribeForm.test.ts
  tests/app/browser/components/ContactForm.test.ts
  tests/app/browser/components/PaymentForm.test.ts
)
npx.cmd oxfmt --config .oxfmtrc.json --check "${owned[@]}" > tmp/codex/u3-format.log 2>&1
npx.cmd oxlint --config .oxlintrc.json --deny-warnings "${owned[@]}" > tmp/codex/u3-lint.log 2>&1
npm.cmd run check > tmp/codex/u3-check.log 2>&1
npm.cmd run test:app:browser > tmp/codex/u3-browser.log 2>&1
npm.cmd run test:journey > tmp/codex/u3-journey.log 2>&1
started=$SECONDS
set +e
npm.cmd test > tmp/codex/u3-test.log 2>&1
result=$?
printf 'npm test: exit %s, wall %s seconds\n' "$result" "$((SECONDS - started))" > tmp/codex/u3-duration.txt
exit "$result"
