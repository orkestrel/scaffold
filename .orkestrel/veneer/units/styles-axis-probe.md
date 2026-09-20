# U-styles probe — a stylesheet as a `setupFiles` entry, 2026-09-20

Orchestrator's instrument, run in the Veneer checkout after U3's writer exited and the audit
verifier finished, with the built cascade present (`dist/src/styles/index.css`, `index.js`,
`index.rtl.css`). Files written under `tmp/probe/` and deleted after the reading:

`tmp/probe/setupcss.config.ts` spread the root's `srcBrowser()` result (its `resolve` and `test`
blocks), named the project `{ label: 'probe-setupcss', color: 'cyan' }`, included
`tmp/probe/setupcss.test.ts`, and set
`setupFiles: ['./tests/setup.ts', './tests/setupBrowser.ts', './dist/src/styles/index.css']`.
`tmp/probe/setupcss.test.ts` read `--vn-factor-density` from the document element and listed
`document.styleSheets`.

```text
npx vitest run --config tmp/probe/setupcss.config.ts --no-cache --reporter=dot
PROBE density="1" sheets=["(inline)","(inline)"]
 Test Files  1 passed (1)
      Tests  1 passed (1)
exit=0
```

Reading: Vitest accepts a stylesheet path in `setupFiles` for a browser project, Vite injects it
as an inline sheet, and the cascade's custom properties resolve on the document element before
the test body runs. The design verdict's Q5 shape stands: the styles wrapper lists the built
cascade in its `setupFiles`, and the module-scope `import '../dist/src/styles/index.css'` leaves
`tests/setupStyles.ts`, so the Node `setup` project no longer depends on `build:src:styles`.
