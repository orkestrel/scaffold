# Fix report: test

## Dispositions

- **s11-30** applied (src/core/helpers.ts, src/server/helpers.ts, tests/src/core/helpers.test.ts, guides/test.md): Applied the DRIFT-RESHAPE correction the lanes share: exported `checkBounds(subject: string, budget: number, interval: number): void` from `src/core/helpers.ts`, taking the RESOLVED numbers rather than `WaitOptions`, and called it after each caller applies its own defaults with 'Wait', 'Retry', 'Event', 'Socket', 'Scratch', and 'Upgrade'. Every message is byte-identical to what each site raised before. `retryUntil`'s `attempts` check stays at its own site. Unit-tested once for a zero and a positive bound, each refused budget and interval named for its subject, and the budget named first where both are invalid.
- **s11-31** applied (src/core/types.ts, src/core/helpers.ts, guides/test.md): Declared `Success<T>`, `Failure<E>`, and `Result<T, E = Error>` in `src/core/types.ts` exactly as the typescript.md block states, with TSDoc in the third-person form, and annotated `retryUntil`'s `produced` local as `Result<T, unknown>`. Additive type exports only; the anonymous inline union is gone.
- **s11-32** applied (src/core/helpers.ts, tests/src/core/helpers.test.ts, guides/test.md): Both lane corrections agree on keeping both elapsed guards and routing their throws through one exported leaf, so that is what landed: `buildRetryExhausted(description, budget, elapsed, last, cause): Error` in `src/core/helpers.ts`, called from the loop-top guard and the loop-bottom guard. The loop-top guard is NOT deleted. Unit-tested once for the message with and without a rendered last value and for the cause kept by identity.
- **s11-33** applied (src/server/helpers.ts, tests/src/server/helpers.test.ts, guides/test.md): Exported `readErrorCode(error: unknown): string | undefined` from `src/server/helpers.ts` and routed `createLink` and `removeTree` through it, replacing both copies of the six-line narrowing. Unit-tested against a real host `ENOENT`, a plain object, an `Error` with a non-string `code`, an `Error` with none, a null-prototype record, and non-object values.
- **s11-34** applied (src/server/helpers.ts, src/server/factories.ts, tests/src/server/helpers.test.ts, guides/test.md): Exported two leaves from `src/server/helpers.ts` and routed every duplicate through them. `readIdentity(status: Stats): ScratchIdentity` replaces all three inline `ScratchIdentity` constructions (allocation, `remove`, `destroy`). `requireContained(root, target): string` replaces the resolve-then-throw pair at all seven `ScratchInterface` member sites plus the `files` seeding loop, which is the same pattern the finding's line list stops one short of. The `outside` message local is gone; `requireContained` raises the identical `Path outside scratch directory: <target>`. See deviations for the leaf's name.
- **s11-35** applied (src/core/types.ts, src/core/helpers.ts, src/core/factories.ts, tests/src/core/helpers.test.ts, guides/test.md): Applied what the two lane corrections share: no `Signal` class, `createSignal` still returns the real `AbortController` and its real instrumented signal, and the find-splice-abort sequence is now one named routine both paths call. Following the lane that names its placement, it is an exported leaf: `dropRegistration(registrations: SignalRegistration[], installed): SignalRegistration | undefined` in `src/core/helpers.ts`, with the `SignalRegistration` tuple declared in `src/core/types.ts` because the signature is public. The scope-abort path's extra `remove(type, registration[1], { capture })` stays at its own site. `removeEventListener`'s own lookup keys on listener plus capture rather than on the installed listener, so it is a different find and stays where it is. Unit-tested for a scoped drop with its cleanup aborted, an unscoped drop, and a listener the list does not hold.
- **s11-36** deferred_breaking: Re-verified: `PortfolioInterface.states` still stands at src/browser/types.ts:81 and the finding is real. Renaming a member of a published interface — to `placements`, `placed`, or anything else — is a non-additive change to the published surface that no package document or test pins the other way, so the breaking test defers it whole. Nothing applied. Note for the work order: both lanes reject `placed` and converge on `placements`, and the reshaped repair leaves `PortfolioOptions.states` standing as the declared registry.
- **s11-37** deferred_breaking: Re-verified against the current tree: `style` (:1593), `token` (:1621), `rootToken` (:1642), `pixels` (:1669), `contrast` (:1307), and `rgba` (:1092) are all still exported under those names from src/browser/helpers.ts, and the `read*` family they sit beside is unchanged, so the finding is real. Every one of the six is an exported symbol, so renaming them is deferred whole; applying half of it — adding the new names beside the old — would be the compatibility shim AGENTS.md forbids.
- **s11-38** deferred_breaking: Re-verified: `colorEqual` still stands at src/browser/helpers.ts:1128 beside the verb-first `blendColor`, `measureLuminance`, `measureContrast`, and `parseColor`, so the finding is real. Renaming an exported symbol to `matchesColor` is deferred whole under the breaking test. Nothing applied.

## Gates

- npm run format:check: pass — Checking formatting...

All matched files use the correct format.
Finished in 2023ms on 58 files using 4 threads.

(First run reported issues in guides/test.md and tests/src/core/helpers.test.ts — both files I wrote. Converged with the prescribed `npm run lint` then `npm run format`, then re-ran the non-mutating chain from the top; the excerpt is that re-run.)
- npm run lint:check: pass — > oxlint --config .oxlintrc.json --deny-warnings .

EXIT:0 (no diagnostics printed)
- npm run check: pass — > tsc --noEmit --project tsconfig.json && npm run check:src
> check:src:core → tsc --noEmit -p configs/src/tsconfig.core.json
> check:src:browser → tsc --noEmit -p configs/src/tsconfig.browser.json
> check:src:server → tsc --noEmit -p configs/src/tsconfig.server.json
EXIT:0
- npm run build: pass — ✓ 6 modules transformed.
dist/src/server/index.js  33.36 kB │ gzip: 9.90 kB │ map: 50.03 kB
dist/src/server/index.cjs  35.26 kB │ gzip: 10.13 kB │ map: 51.59 kB
✓ built in 2.00s
Copied: dist/src/server/index.d.ts to dist/src/server/index.d.cts
EXIT:0

(api-extractor prints its standing 'bundled TypeScript 5.9.3 is older than the project's 6.0.3' notice; it predates this change and is not a failure.)
- npm test: pass — test:src    → Test Files 7 passed (7) | Tests 450 passed | 8 skipped (458)
test:policy → Test Files 1 passed (1) | Tests 111 passed (111)
test:config → Test Files 1 passed (1) | Tests 46 passed (46)
test:setup  → Test Files 3 passed (3) | Tests 24 passed (24)
test:guides → Test Files 1 passed (1) | Tests 38 passed (38)
EXIT:0

(The 8 skips are the pre-existing host-capability gates: supportsFileLinks / supportsDirectoryLinks / supportsMode cases that read this host rather than branching on platform.)

## Diffstat

```text
 guides/test.md                   | 111 +++++++++++++++++++++++++--------------
 src/core/factories.ts            |  25 ++-------
 src/core/helpers.ts              | 104 ++++++++++++++++++++++++++----------
 src/core/types.ts                |  50 ++++++++++++++++++
 src/server/factories.ts          |  62 +++++++---------------
 src/server/helpers.ts            |  88 +++++++++++++++++++------------
 tests/src/core/helpers.test.ts   |  92 +++++++++++++++++++++++++++++++-
 tests/src/server/helpers.test.ts |  87 ++++++++++++++++++++++++++++++
 8 files changed, 454 insertions(+), 165 deletions(-)
```

- dist moves: true

## Deviations

Two ancillary decisions I made and carried on from, plus one standing observation.

1. s11-34 leaf name. The dossier's repair line names `statusToIdentity(status): ScratchIdentity`. That name is noun-first, which `.claude/rules/names.md` § Standalone helpers refuses ("default to `{verb}{Noun}`"), and it is the same rule s11-37 and s11-38 are findings against. Shipping it would have created a fresh violation of the rule two deferred findings already cite — non-breaking to fix now, breaking to fix once published. Authority order puts the repository's rules above the dossier, so I exported it as `readIdentity`, which is verb-first and joins the `read*` family already in `src/server/helpers.ts` (`readInventory`, and now `readErrorCode`). Signature, behavior, and call sites are exactly the repair's. Flagging it because an auditor grepping for `statusToIdentity` will not find it.

2. s11-34 site count. The finding lists seven containment sites, all of them `ScratchInterface` members. The `files` seeding loop in `createScratch` runs the identical resolve-then-throw pair, so I routed it through `requireContained` too — eight sites. Leaving it would have left one copy of the pattern the finding exists to centralize.

3. New public surface. Six findings landed as additive exports, and the package's guide-parity suite requires a `## Surface` row for each: `checkBounds`, `buildRetryExhausted`, `dropRegistration`, `readErrorCode`, `readIdentity`, `requireContained`, plus the types `Success`, `Failure`, `Result`, and `SignalRegistration`. Rows, the explanatory prose beside their neighbours, and the `## Tests` entries for both touched test files are in the same change; `npm run test:guides` is green on all 38 cases. Every one of these is additive — no existing export changed name, signature, or return type — so the breaking test permits them, but the work order should know the published surface grew.

4. `dist/` moved. The applied changes reach `src/core` and `src/server`, so the built artifact is not what the registry currently serves. `npm run build` ran as part of the gate chain and regenerated `dist/` in the working tree; `dist/` is gitignored here, so it does not appear in `git status`.

Nothing stopped the unit. No off-limits file was touched — `git status` lists only the eight owned files — and the tree is uncommitted.
