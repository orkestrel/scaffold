$variants = @('dark-1280', 'light-390', 'dark-390')
foreach ($variant in $variants) {
    $env:VITE_VARIANT = $variant
    & npx.cmd vitest run --config vite.config.ts --no-cache --reporter=verbose --project app:browser tests/app/browser/integration.test.ts *> "tmp/units/u2-baseline-$variant.log.txt"
    Write-Output "$variant exit: $LASTEXITCODE"
    Select-String -Path "tmp/units/u2-baseline-$variant.log.txt" -Pattern 'Tests ', 'Test Files ', 'Duration ', '×', '313 repetitive'
}
