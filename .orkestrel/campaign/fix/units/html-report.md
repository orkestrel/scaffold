# Unit breaking-html — report (2026-09-02)

Writer: `implementer` on Opus 5 (native; Sol dark, substitution recorded). Returned report:

## Rows

- **s08-01** — applied: Renamed the exported HTMLHandlers type to HTMLHandlerMap in src/core/types.ts and adopted it at every in-package consumer: HTMLInterface.fold, HTML.fold (src/core/HTML.ts), foldNode (src/core/helpers.ts), the {@link} target on HTMLHandler's TSDoc, the guides/html.md Types row, the foldNode Helpers signature cell, the HTMLInterface.fold Methods row, and both guide fences that annotate a fold table. tests/src/core/HTML.test.ts and tests/src/core/helpers.test.ts adopt the new name. No alias, re-export, or shim.
- **s08-04** — applied: Deleted createAttributeContract, createTextContract, createCommentContract, and createDoctypeContract from src/core/factories.ts, which now declares createHTML alone and imports only HTMLDocument, HTMLInterface, and HTML. Deleted their four ### Factories rows and the whole '### Generate fixtures from a compiled contract' fence in guides/html.md, retargeted the '## Relationship with @orkestrel/contract' bullet onto createContract(attributeShape) as the supported call, dropped the contract-factory clause from the Patterns intro, corrected the ### Shapers intro to name createContract as the compiler, updated the shapers.ts header comment that named factories.ts, and replaced createTextContract with textShape in guides/README.md. Barrel row for factories.js stays because createHTML stays.
- **s08-09** — applied: Renamed SanitizeOptions to HTMLSanitizeOptions and DistillOptions to HTMLDistillOptions in src/core/types.ts, and adopted them at HTMLInterface.sanitize/.distill, HTML.sanitize/.distill, the four src/core/constants.ts TSDoc references (SAFE_ELEMENTS, SAFE_URL_SCHEMES, URL_ATTRIBUTES, UNSAFE_ELEMENTS), the guides/html.md Types rows, the URL_ATTRIBUTES constant row, the sanitizeURL helper cell, the sanitize-floor prose, and the distill-options prose. tests/src/core/HTML.test.ts adopts both names.
- **s08-02 (audit fix-up)** — applied: guides/html.md HTMLSource row now carries the TSDoc sentence: 'entry `index` is the original-input offset that normalized offset `index` came from'.
- **s08-06 (audit fix-up)** — applied: Both intros now name the family the Helpers table carries — 'the name, element, and URL predicates' at the ### Validators intro and at the ### Helpers intro — and isEmptyElement moved above mergeText in the src/core/HTML.ts helpers import block.
- **report amendment** — applied: Disclosed in this report's residue: commit f6b23f5 rewrote isEmptyElement's TSDoc first sentence to 'Checks whether an element has no child nodes.' and its @returns to 'True if `children` is empty; false otherwise' while moving the predicate to helpers.ts. That text stands untouched at src/core/helpers.ts:193-198. This unit converted no TSDoc voice, so s08-10 remains deferred for the fleet wave, which converts the four sibling predicates.

## Symbols moved

- HTMLHandlers → HTMLHandlerMap (src/core/types.ts)
- SanitizeOptions → HTMLSanitizeOptions (src/core/types.ts)
- DistillOptions → HTMLDistillOptions (src/core/types.ts)
- createAttributeContract removed (src/core/factories.ts)
- createTextContract removed (src/core/factories.ts)
- createCommentContract removed (src/core/factories.ts)
- createDoctypeContract removed (src/core/factories.ts)

## Files touched

- /home/user/fleet/html/src/core/types.ts
- /home/user/fleet/html/src/core/HTML.ts
- /home/user/fleet/html/src/core/helpers.ts
- /home/user/fleet/html/src/core/constants.ts
- /home/user/fleet/html/src/core/factories.ts
- /home/user/fleet/html/src/core/shapers.ts
- /home/user/fleet/html/tests/src/core/HTML.test.ts
- /home/user/fleet/html/tests/src/core/helpers.test.ts
- /home/user/fleet/html/tests/src/core/factories.test.ts
- /home/user/fleet/html/tests/src/core/shapers.test.ts
- /home/user/fleet/html/guides/html.md
- /home/user/fleet/html/guides/README.md

## Tests changed

- tests/src/core/factories.test.ts — deleted the describe groups for createAttributeContract, createTextContract, createCommentContract, and createDoctypeContract with the doors they named; the file now imports HTML, createHTML, isHTMLDocument, and renderHTML, and the seededRandom and TEST_SEED imports went with the deleted groups.
- tests/src/core/shapers.test.ts — carried the one proof the deleted groups held that this file did not: `accepts every doctype the parser produces` now runs a legacy PUBLIC/SYSTEM doctype from parseDocument through createContract(doctypeShape), added inside describe('doctypeShape') with parseDocument imported from @src/core.
- tests/src/core/HTML.test.ts — adopted HTMLHandlerMap, HTMLSanitizeOptions, and HTMLDistillOptions in the type import block, the expectTypeOf assertions on the option keys, the hostile-options Proxy fixtures, and the fold handler tables; reordered the type import list alphabetically after the rename.
- tests/src/core/helpers.test.ts — adopted HTMLHandlerMap in the type import and in the foldNode handler table.
- src:core moved from 317 tests to 312 in the run recorded below: six deleted door tests, one carried proof.

## Gates

- `npm run format:check` → exit 0 — oxfmt --config .oxfmtrc.json --check . / Checking formatting... / All matched files use the correct format. / Finished in 1978ms on 46 files using 4 threads.
- `npm run lint:check` → exit 0 — oxlint --config .oxlintrc.json --deny-warnings . — no diagnostics
- `npm run check` → exit 0 — tsc --noEmit --project tsconfig.json && tsc --noEmit -p configs/src/tsconfig.core.json — no diagnostics
- `npm run build` → exit 0 — ✓ 10 modules transformed. dist/src/core/index.js 132.76 kB │ gzip: 37.03 kB; dist/src/core/index.cjs 135.65 kB │ gzip: 37.35 kB. Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts
- `npm test` → exit 0 — test:src 7 files / 312 tests passed; test:policy 1 file / 111 passed; test:config 1 file / 46 passed; test:setup 1 file / 29 passed; test:guides 1 file / 18 passed

## Diff stat

```text
guides/README.md                 |   2 +-
 guides/html.md                   | 119 +++++++++++++++------------------------
 src/core/HTML.ts                 |  16 +++---
 src/core/constants.ts            |   8 +--
 src/core/factories.ts            |  89 +----------------------------
 src/core/helpers.ts              |   4 +-
 src/core/shapers.ts              |  14 ++---
 src/core/types.ts                |  20 +++----
 tests/src/core/HTML.test.ts      |  26 ++++-----
 tests/src/core/factories.test.ts |  83 +--------------------------
 tests/src/core/helpers.test.ts   |   4 +-
 tests/src/core/shapers.test.ts   |   9 ++-
 12 files changed, 102 insertions(+), 292 deletions(-)
```

Status at return (writer's reading): `Every assigned row closed applied; no row refused and no row stopped. The full non-mutating gate chain (format:check → lint:check → check → build → test) exits 0, and the prose sweep `grep -rn '\b<old-name>\b' src tests guides` returns no hit for HTMLHandlers, SanitizeOptions, DistillOptions, createAttributeContract, createTextContract, createCommentContract, or createDoctypeContract. Nothing committed, staged, installed, or pushed.`
Built `dist/` moves: true

## Observations

- Adoption list was empty. `npm run check` exited 0 against the staged closure before any edit, so this package's imports of a renamed upstream symbol were already current. `node /home/user/work/verify-stage.mjs html` reported @orkestrel/contract, @orkestrel/guide, @orkestrel/markdown, and @orkestrel/test each OK with the staged tarball installed.
- Residue disclosure (the carried report amendment): the third-person rewrite of `isEmptyElement`'s TSDoc landed in commit f6b23f5, not in this unit. src/core/helpers.ts:193-198 reads 'Checks whether an element has no child nodes.' with '@returns True if `children` is empty; false otherwise'. Its four sibling predicates (isVoidElement, isRawElement, isLiteralElement, isBlockElement) keep imperative first sentences, and s08-10 owns converting them.
- This unit converted no TSDoc first-sentence voice. It edited the signature lines of `foldNode` and the `HTML` methods without touching their doc bodies, and it did not open `createHTML`'s doc block, so those imperative sentences stay for the s08-10 wave.
- The src/core/HTML.ts helpers import block still lists `resolveAttributes` before `renderHTML`. The audit ruling named only the `isEmptyElement` position, so that pre-existing pair is left as found; no lint rule enforces member order in this workspace.
- `dist/` is gitignored, so the rebuilt artifact does not appear in `git status --short`. `grep` over the emitted dist/src/core/index.d.ts finds 19 occurrences of the three new type names and zero occurrences of any old name, so the published declaration surface moved.
- Text-integrity sweep over the 12 changed files: valid UTF-8, no replacement character, no stray control character, LF only, no trailing whitespace.
- Whole-suite timing on this host was unremarkable — the five projects finished without a timeout, and no test failed for a timing-suspect reason. The authoritative re-run is still the Orchestrator's.

## Deviations

- s08-04 test disposition, decided and carried on from. The lane amendment asks that tests/src/core/factories.test.ts:43-90 be retargeted onto createContract(<x>Shape). tests/src/core/shapers.test.ts already compiles each shape with createContract and asserts guard exactness, closed schema, seeded generation, and parse rebuilds, so retargeting in place would have duplicated that file, and factories.test.ts mirrors a factories.ts that no longer declares those doors. I deleted the four describe groups and carried the single proof shapers.test.ts did not already hold — a legacy PUBLIC/SYSTEM doctype from parseDocument accepted by createContract(doctypeShape) — into describe('doctypeShape'). Net effect matches the amendment's intent: the assertions that survived now run against createContract(<x>Shape).
- Fence deletion rather than retarget. The brief's ruling deletes the create*Contract doors 'with their guide rows and fences', so the '### Generate fixtures from a compiled contract' section went whole instead of being rewritten onto createContract. The Patterns intro no longer promises a contract-factory path, and the '## Relationship with @orkestrel/contract' bullet names createContract(attributeShape) as the supported call. Parity is unaffected: the shapes are `const` rows, and each carries its own @example in shapers.ts already showing that call, which the green guides project confirms.
- Two prose carriers outside the named guide rows. src/core/shapers.ts opened by naming factories.ts as the home of the createContract call, which the deletion makes false, so that comment now names @orkestrel/contract; the rewrap also dropped the bare tally in 'the three childless node categories' per AGENTS.md § Writing. guides/README.md named createTextContract in its dependency-reference paragraph and now names textShape.
- Convergence run. guides/html.md and tests/src/core/factories.test.ts failed format:check after the edits (oxfmt re-pads markdown tables). Per the brief I ran `npm run lint` then `npm run format` once, then proved the whole non-mutating chain green; `npm run lint --fix` reported no changes.

Actual diff and status rendered by the Orchestrator: `tmp/units/breaking/html.diff`,
`tmp/units/breaking/html.status`.
