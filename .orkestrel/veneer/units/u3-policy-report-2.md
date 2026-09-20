# Unit U3-policy — successor 2 report (builder, native Sonnet, 2026-09-20, 141 s)

## Diff summary

- `tests/setupPolicy.ts`: `POLICY_INDEX_FILE` and `POLICY_INDEX_LINK` (non-global, finding 10);
  `readPolicyIndex` strips code through `stripPolicyCode` and matches with a local
  `new RegExp(POLICY_INDEX_LINK.source, 'gu')` (finding 9); `readPolicyGuide` and
  `isPolicyMirror` remarks name both mechanisms (claim 6); `isPolicyStray` body and `@returns`;
  the violation message; the control row `sweeps an index-linked guide when no catalog registers
  it` after the `accepts` row (finding 11).
- `tests/policy.test.ts`: the comment above the renamed case names both mechanisms (claim 6);
  imports in alphabetical order (finding 12); the `.match()` assertion still returns the capture.
- `guides/scaffold.md`: the sweep sentence reads "neither this package's own, nor
  `guides/README.md`, nor a guide `guides/README.md` links, nor a catalog row" (finding 7).

## New control row

With no catalog file, `readPolicyCatalog` returns `[]`, `readPolicyIndex` returns `['console']`,
`isPolicyStray` is false for `guides/console.md`, and the sweep reports exactly one `prose`
violation at line 3: `prose carries no banned term: should (must, can, might, or the imperative)`.

## Gates

| Command | Reading |
| --- | --- |
| `npx oxfmt … --write` (three owned files) | `Finished in 694ms on 3 files using 16 threads.` |
| `npm run format:check` | exit 0 |
| `npm run lint:check` | exit 0 |
| `npm run check` | exit 0 |
| `npm run test:policy` | `Tests 112 passed (112)` |
| `npm run test:setup` | `Tests 164 passed | 3 skipped (167)` |
| `npm run test:config` | inventory stale at `guides/scaffold.md`, `tests/policy.test.ts`, `tests/setupPolicy.ts` (the anticipated reading; the Orchestrator rebuilds) |
| `npm run test:guides` | `Tests 23 passed (23)` |

## Deviations

None.

## Review evidence

`git status --porcelain`: ` M guides/scaffold.md`, ` M host.json`, ` M tests/policy.test.ts`,
` M tests/setupPolicy.ts`.
