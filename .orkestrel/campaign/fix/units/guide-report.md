# Unit breaking-guide — report (2026-09-01)

Writer: `implementer` on Opus 5 (native; Sol dark, substitution recorded). Returned report:

## Rows

- **s15-16** — applied: Every noun-phrase helper in src/core/helpers.ts renamed to verb-noun form in one pass, with each in-package consumer, test, guide row, fence, @example, and fixture note updated in the same change and no alias or re-export left behind. Applied the ruling's spellings exactly: extractFenceImports (not parseFenceImports) and normalizeIdentifier.
- **s15-17** — applied: identifierOf landed once, as the s15-16 entry for that helper rather than a second pass: normalizeIdentifier now carries the guide Surface row and the normalize-every-identifier sentence in guides/guide.md line 257, and no second edit touched it.
- **audit-carrier-source-methods-extends** — applied: Source.methods now resolves members through the extends chain. types.ts changed first: SourceInterface.methods documents the union, the same-keyword walk, the base-outside-the-scope bound, and the one-visit cycle/diamond rule. helpers.ts gained matchesDeclaration (the head grammar extractDeclarationBody and extractDeclarationBases now share) and extractDeclarationBases; Source gained #members, which unions each declaration's own members with every base it reaches in scope. Proved by six tests built from real interface and class pairs where the extending declaration restates nothing; five of the six went red against the prior methods() body (excerpt: expected ['cursor','read'], received ['cursor']) and green after restoring it. guides/guide.md documents the resolution and its bound in the extraction model, the Source section, and the SourceInterface methods row.

## Symbols moved

- moduleKey → computeModuleKey
- symbolKey → computeSymbolKey
- missingSymbols → findMissingSymbols
- fenceImports → extractFenceImports
- firstCode → findFirstCode
- cellLinks → extractCellLinks
- identifierOf → normalizeIdentifier
- kindIndex → findKindIndex
- exportsFrom → extractExports
- hiddenFrom → extractHidden
- declarationBody → extractDeclarationBody
- memberMethods → extractMemberMethods
- sectionBlocks → selectSectionBlocks
- examplesFrom → extractExamples
- exampleMethods → extractExampleMethods
- added: matchesDeclaration(head, keyword, name) => boolean
- added: extractDeclarationBases(source, keyword, name) => readonly string[]
- private Source.#declarationBody → Source.#body
- added: private Source.#members(keyword, name, visited)

## Files touched

- /home/user/fleet/guide/src/core/helpers.ts
- /home/user/fleet/guide/src/core/types.ts
- /home/user/fleet/guide/src/core/parsers.ts
- /home/user/fleet/guide/src/core/sources/Source.ts
- /home/user/fleet/guide/src/core/sources/SourceManager.ts
- /home/user/fleet/guide/guides/guide.md
- /home/user/fleet/guide/README.md
- /home/user/fleet/guide/tests/guides.test.ts
- /home/user/fleet/guide/tests/src/core/Guide.test.ts
- /home/user/fleet/guide/tests/src/core/helpers.test.ts
- /home/user/fleet/guide/tests/src/core/sources/Source.test.ts
- /home/user/fleet/guide/tests/src/core/sources/SourceManager.test.ts
- /home/user/fleet/guide/tests/fixtures/broken/wrong-kind/widget.md
- /home/user/fleet/guide/tests/fixtures/broken/phantom-import/guides/src/widget.md

## Tests changed

- tests/src/core/sources/Source.test.ts: methods() unions an interface pair through its extends clause
- tests/src/core/sources/Source.test.ts: methods() reports the inherited members of a declaration that adds none
- tests/src/core/sources/Source.test.ts: methods() walks a transitive chain and visits a diamond base once
- tests/src/core/sources/Source.test.ts: methods() terminates an extends cycle
- tests/src/core/sources/Source.test.ts: methods() ignores a base the module scope does not declare
- tests/src/core/sources/Source.test.ts: methods() walks a class chain and still excludes the constructor
- tests/src/core/helpers.test.ts: describe('matchesDeclaration') — accepts a plain head; accepts a generic head; accepts an extends head; rejects a longer identifier sharing the prefix; rejects the other keyword; rejects a head that opens no body
- tests/src/core/helpers.test.ts: describe('extractDeclarationBases') — returns an empty array when the declaration extends nothing; returns an empty array when the declaration is absent; returns one base; returns every base in head order and strips generic arguments; reads past a type parameter that carries its own extends; excludes a class implements clause; reads a head oxfmt wrapped across lines; ignores a commented declaration
- tests/src/core/helpers.test.ts: exposes every verb-first helper and retires its noun-phrase predecessor — asserts each of the fifteen new names is on the barrel and each predecessor is gone
- renamed in place: every it/describe title and call site naming a moved helper across tests/guides.test.ts, tests/src/core/Guide.test.ts, tests/src/core/helpers.test.ts, tests/src/core/sources/Source.test.ts, tests/src/core/sources/SourceManager.test.ts, and the two broken-fixture widget.md notes

## Gates

- `npm run format:check` → exit 0 — Checking formatting... All matched files use the correct format. Finished in 2052ms on 82 files using 4 threads.
- `npm run lint:check` → exit 0 — oxlint --config .oxlintrc.json --deny-warnings . — no output, exit 0
- `npm run check` → exit 0 — tsc --noEmit --project tsconfig.json then tsc --noEmit -p configs/src/tsconfig.core.json — no diagnostics
- `npm run build` → exit 0 — 12 modules transformed; dist/src/core/index.cjs 71.67 kB; built in 2.94s; Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts
- `npm test` → exit 0 — test:src 8 files / 359 tests passed; test:policy 111 passed; test:config 46 passed; test:setup 12 passed; test:guides 27 passed
- `npm run format:check && npm run lint:check && npm run check && npm run build && npm test` → exit 0 — whole chain in the prescribed order, CHAIN_EXIT=0; final line: Test Files 1 passed (1), Tests 27 passed (27)

## Diff stat

```text
14 files changed, 745 insertions(+), 352 deletions(-) — README.md 12; guides/guide.md 142; src/core/helpers.ts 198; src/core/parsers.ts 15; src/core/sources/Source.ts 90; src/core/sources/SourceManager.ts 4; src/core/types.ts 21; tests/fixtures/broken/phantom-import/guides/src/widget.md 2; tests/fixtures/broken/wrong-kind/widget.md 2; tests/guides.test.ts 18; tests/src/core/Guide.test.ts 18; tests/src/core/helpers.test.ts 402; tests/src/core/sources/Source.test.ts 165; tests/src/core/sources/SourceManager.test.ts 8
```

Status at return (writer's reading): `applied`
Built `dist/` moves: true

## Observations

- Acceptance criterion 1 grep: `grep -rn '\b<old>\b' src tests guides README.md` returns exactly three hits, all inside one assertion at tests/src/core/helpers.test.ts:1799-1802, plus twelve more from the same object literal. That object maps each new name to its retired predecessor and asserts the predecessor is absent from the runtime barrel; the strings are the retirement proof itself. Every other hit is zero, and guides/ and src/ return zero. Deleting that literal to clear the grep would delete the coverage the rename owes.
- Source.examples(name) still reads only the named declaration's own body — it does not follow the extends chain. The ruling named Source.methods only, so this stays outside the unit's fixed scope. Consequence for indexeddb's parity: a member documented on a child interface whose @example sits on the base is still reported by the EX check unless a guide fence names it. Recorded against the member-resolution capability for the next change.
- #members unions the located declaration across every in-scope file that declares the name, where the previous #declarationBody returned the first non-empty body and stopped. The two agree on any module that declares a name once; the union is what lets an extending declaration with an empty own body still reach its base's members.
- extractDeclarationBases scans each in-scope file a second time per name lookup, because it and extractDeclarationBody locate the same head independently. Measured cost on this package is inside the suite noise (test:src 359 tests, 1.6s), and the alternative — one leaf returning head and body together — would have made extractDeclarationBody a one-line wrapper over it.
- Every documented @example was executed against the built package rather than read: extractDeclarationBases('export interface B extends A, C<T> {\n}\n','interface','B') returns ['A','C']; matchesDeclaration('export interface X extends Y {','interface','X') returns true and matchesDeclaration('export interface Xtra {','interface','X') returns false.
- Whole-suite npm test ran in roughly 9s on this host with no timing-suspect failure, so nothing is carried to an authoritative re-run.
- dist/ moved as expected: dist/src/core/index.js carries eleven occurrences of the two new helper names and zero of the retired declarationBody.

## Deviations

- README.md was in neither the owned nor the off-limits list, and the rename made its runnable fence and its API list false (both named missingSymbols). Updated it to findMissingSymbols rather than shipping a published README that names a symbol the package no longer exports. Decided and carried on; no other file outside the owned set was touched.
- The audit-carrier ruling could not be met without new public surface, so two exports were added: matchesDeclaration (the shared head grammar, extracted so the declaration regex has one home rather than being duplicated between the body and bases locators) and extractDeclarationBases. Both carry a guide Surface row, an @example, and direct tests. No other capability was added.
- Source's private #declarationBody was renamed to #body. It is Source's own member, not a ledger row, but leaving it would have put a `declarationBody` word-boundary hit in src/ against acceptance criterion 1 with no way to tell it apart from a missed rename.
- The Helpers, SourceInterface, and every other pipe table in guides/guide.md were realigned, because the new names changed the column widths the file had been hand-aligned to. Content is unchanged apart from the rows this unit rewrote; every row in the Helpers table is now exactly 392 characters.

Actual diff and status rendered by the Orchestrator: `tmp/units/breaking/guide.diff`,
`tmp/units/breaking/guide.status`.

## Fix-up (guide-fixup, implementer on Opus 5; commit follows `8eca8dc`)

Every round-1 finding closed: the retirement literal deleted; `Source.#locate` returns the first
declaring file in sorted key order and `#members` reads body and bases from that one record
(prose at `types.ts:216-226`, `Source.ts:32-36`, `guides/guide.md:214,331-334`; test
`Source.test.ts:846`); `escapeRegExp` added in `helpers.ts` and applied in the declaration
grammar and in `findUnexampled` (no `@orkestrel/contract` escape helper exists; `@orkestrel/router`
exports one under this name, so the term is shared); `extractDeclaration(source, keyword, name):
Declaration | undefined` replaces `matchesDeclaration`, `extractDeclarationBody`, and
`extractDeclarationBases` with no alias, `Declaration { body, bases }` declared in `types.ts`;
executed assertions for the first-declaring-file bound, the keyword-keeping negative case, the
qualified base, and `examples(name)` not following `extends`; the `examples` asymmetry stated in
the guide row, the paragraph, and the TSDoc; `#members` returns `[]` for a visited name. Ancillary
decisions recorded: `Declaration` is a sibling of `DeclarationHead`; a located head with an empty
body is a declaration; an unterminated head reports no declaration. Failing-first evidence
recorded (3 failed before, 373 passed after; revert proof for the `findUnexampled` escape).
Sweep for every retired name and the three deleted locators: no hit. Gates: `format:check` 0,
`lint:check` 0, `check` 0, `build` 0, `test` 0 (373 src, 111 policy, 46 config, 12 setup, 27
guides). Observations for the next change: the earlier retirement block naming `extractCodeLines`,
`moduleDirs`, `moduleKeys` stands; `README.md` § API says `patterns()` where the interface exposes
`fences()`.
