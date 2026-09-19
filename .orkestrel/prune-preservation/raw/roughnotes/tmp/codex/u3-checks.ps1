$owned = @(
    'app/browser/types.ts',
    'app/browser/controllers/ApplicationController.ts',
    'app/browser/components/SubscribeForm.vue',
    'app/browser/components/ContactForm.vue',
    'app/browser/components/PaymentForm.vue',
    'tests/app/browser/controllers/ApplicationController.test.ts',
    'tests/app/browser/components/SubscribeForm.test.ts',
    'tests/app/browser/components/ContactForm.test.ts',
    'tests/app/browser/components/PaymentForm.test.ts'
)
npx.cmd oxfmt --config .oxfmtrc.json --check @owned
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
npx.cmd oxlint --config .oxlintrc.json --deny-warnings @owned
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
npm.cmd run check
exit $LASTEXITCODE
