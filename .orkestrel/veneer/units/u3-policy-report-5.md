# Unit U3-policy — report 5 (builder, native Sonnet, 2026-09-20, 355 s)

## Diff summary

`tests/policy.test.ts`: the accounting case names no guide, package, or census particular to any
checkout — `expect(index).toContain(own)` and the non-emptiness assertion are struck, the
distinctness and existing-file checks stay. A new case
`reads the ordinary link forms a guide index writes` asserts the accepted forms (bare, `./`,
three title forms, angle-bracketed, fragment) and the rejected ones (nested, absolute, parent, and
the two unbalanced-angle forms).

`tests/setupPolicy.ts`: `POLICY_INDEX_LINK` widened to a two-branch alternation with duplicate
named `(?<name>…)` captures — the angle branch requires both delimiters, so the unbalanced forms no
longer match; the bare branch admits `./` and `#fragment`; a trailing title admits all three quote
forms; the capture class still excludes `/`. `POLICY_INDEX_FILE` derives from
`` `guides/${POLICY_GUIDE_MAP}.md` ``. `readPolicyIndex`'s remarks name the span-pairing limit.
`readPolicyIndex` reads `match.groups?.name`: the positional read returned `undefined` on every
match under the widened pattern, which the existing order-and-dedupe case caught red.

## Readings

Every accepted form captures `sample`; every rejected form reads null. The order-and-dedupe case
is green and is what caught the positional-read defect.

## Roughnotes

With these two files copied in, the policy project reads `Tests 115 passed | 1 skipped (116)`.
Restored with `git checkout --` and clean at both paths.

## Gates

`format:check`, `lint:check`, `check` exit 0; `test:policy` `116 passed`; `test:setup`
`164 passed | 3 skipped`; `test:guides` `23 passed`; `test:config` reported the expected inventory
staleness plus one failure (`rolls one face into a single declaration and rewrites its core
specifier`) that did not reproduce on an isolated re-run.

Orchestrator's readings after the unit exited: `npm run build` restaged `host.json`;
`npm run test:config` reads `173 passed | 1 skipped`; `npm run test:policy` reads `116 passed`;
Roughnotes is clean at both vendored paths.

## Deviations

None beyond the anticipated inventory staleness. The transient config failure is recorded as a
flake, and the Orchestrator's own re-run after the unit exited is green.
