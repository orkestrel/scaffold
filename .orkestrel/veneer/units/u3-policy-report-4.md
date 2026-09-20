# Unit U3-policy — report 4 (builder, native Sonnet, 2026-09-20, 146 s)

## Diff summary

`tests/policy.test.ts`: the literal index census is replaced by portable assertions (the list is
non-empty and distinct, every name resolves to an existing `guides/<name>.md` through
`isPolicyFile`, and the workspace's own guide name is among them); `POLICY_INDEX_LINK` match
assertions for a titled target (`](sample.md "Sample")`) and an angle-bracketed target
(`](<sample.md>)`); a new case `reads first-link order and drops a repeated link` over a
`createPolicyScratch` root whose index links `beta.md`, `alpha.md`, `beta.md`, asserting
`['beta', 'alpha']`.

`tests/setupPolicy.ts`: `POLICY_INDEX_LINK` widened to
`/\]\(<?(?:\.\/)?([^/)\n<>"]+)\.md>?(?:\s+"[^"\n]*")?\)/u` with its remarks updated; the fenced
row's membership narrowed to fenced blocks; a new row `ignores an index link written inside a code
span` whose index carries its only link inside a backtick span.

## Readings

Every case green: the portable accounting case, the crafted-root order and dedupe case, the two
widened-pattern assertions, the fence row, and the code-span row.

## Gates

`format:check`, `lint:check`, `check` exit 0; `test:policy` `115 passed`; `test:setup`
`164 passed | 3 skipped`; `test:guides` `23 passed`; `test:config` reported the inventory stale at
`tests/policy.test.ts` and `tests/setupPolicy.ts` (the Orchestrator's rebuild restages it).

## Deviations

None.
