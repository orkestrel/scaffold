# Fix report: html

## Dispositions

- **s08-01** deferred_breaking: Re-verified: `HTMLHandlers<T>` still declared at src/core/types.ts and star-exported through the barrel. Renaming it to `HTMLHandlerMap` renames a published exported symbol, which the breaking test defers whole. No part of the repair stands on its own — every consumer edit named in the repair line exists only to carry the rename.
- **s08-02** applied (src/core/types.ts, src/core/helpers.ts, guides/html.md): Applied the DRIFT-RESHAPE correction: added `HTMLSource` (the normalize tuple), `HTMLOpenPosition`, and one shared `HTMLScan<TNode extends HTMLNode>` to src/core/types.ts, and annotated `normalizeSource`, `findOpenPosition`, `scanComment` (`HTMLScan<CommentNode>`), and `scanDoctype` (`HTMLScan<DoctypeNode>`) with them. Structurally identical to the inline types, so the published call signatures do not move. Added the three rows to the guide's `### Types` table and retargeted the four `### Helpers` signature cells.
- **s08-04** deferred_breaking: Re-verified: `createAttributeContract`, `createTextContract`, `createCommentContract`, and `createDoctypeContract` are still one-line `return createContract(<x>Shape)` in src/core/factories.ts and still reach the barrel. The repair is deletion of four published exports plus their guide rows and tests, so it defers whole; deleting only the guide rows would break parity.
- **s08-06** applied (src/core/validators.ts, src/core/helpers.ts, guides/html.md, tests/src/core/validators.test.ts, tests/src/core/helpers.test.ts): Applied the 2026-08-28 ruling: moved `isVoidElement`, `isRawElement`, `isLiteralElement`, `isBlockElement`, and `isSafeURL` from validators.ts to helpers.ts. The barrel star-exports both files, so every export keeps its name and the published surface is identical. validators.ts now imports `isVoidElement` from helpers.js in place of `sanitizeURL`. Rewrote the guide's 'Two guard families' passage, moved the five rows into the `### Helpers` table, and moved the three covering `it` blocks into tests/src/core/helpers.test.ts so tests still mirror source. See deviations for the `isEmptyElement` residue.
- **s08-07** applied (src/core/helpers.ts, guides/html.md): Routed twelve hand-rolled `try { … } catch { return fallback }` boundaries in helpers.ts through `attempt` from @orkestrel/contract, reading `outcome.success ? outcome.value : <the same fallback>`: sanitizeURL, resolveURL, attributeOf, sanitizeAttributes, resolveAttributes, renderHTML, renderText, rewriteDocument, mergeText, collapseText, extractRegion, pruneDocument. Every fallback value is unchanged, so no observable behavior moves. `walkNodes` keeps its `try` and carries the required `//` comment: a generator yields from inside its own body and `attempt` returns a value rather than resuming a suspended frame. Annotated the arrow return type where a readonly tuple needed the contextual type. Updated the guide's `## Relationship with @orkestrel/contract` section to name `attempt` as the package's single exception boundary and to name the `walkNodes` exception.
- **s08-08** applied (src/core/HTML.ts, src/core/types.ts): Added the fail-closed sentence to `@returns` on `HTML.sanitize` and `HTML.distill`, and added `@param` / `@returns` tags carrying the same sentence to `HTMLInterface.sanitize` and `HTMLInterface.distill`. The behavior itself is unchanged and was already pinned by guides/html.md; only the published `.d.ts` prose moved.
- **s08-09** deferred_breaking: Re-verified: `SanitizeOptions` and `DistillOptions` are still the barrel's only bare operation-named types. Renaming them to `HTMLSanitizeOptions` / `HTMLDistillOptions` renames published exported symbols, which the breaking test defers whole.
- **s08-10** deferred_wave: Re-verified the imperative first sentences in src/core/helpers.ts, src/core/validators.ts, and src/core/factories.ts. Per the fleet ruling in the brief, first-sentence TSDoc voice migrates in the later dedicated wave, so nothing was applied. The five predicates moved for s08-06 carry their existing imperative first sentences across verbatim rather than being rewritten here; the wave will convert them in helpers.ts. Every TSDoc sentence this unit authored (the three new types, the two `@returns` additions) uses the third-person form.

## Gates

- npm run format:check: pass — All matched files use the correct format. Finished in 1872ms on 46 files using 4 threads.
- npm run lint:check: pass — oxlint --config .oxlintrc.json --deny-warnings . — no diagnostics, exit 0
- npm run check: pass — tsc --noEmit --project tsconfig.json && tsc --noEmit -p configs/src/tsconfig.core.json — no diagnostics, exit 0
- npm run build: pass — ✓ 10 modules transformed. dist/src/core/index.cjs 138.21 kB │ gzip: 37.69 kB. Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts
- npm test: pass — src:core 7 files / 317 tests passed; policy 1/111 passed; config 1/46 passed; setup 1/29 passed; guides 1/18 passed

## Diffstat

```text
 guides/html.md                    | 112 +++++++++++++-------------
 src/core/HTML.ts                  |   6 +-
 src/core/helpers.ts               | 163 ++++++++++++++++++++++++--------------
 src/core/types.ts                 |  48 +++++++++++
 src/core/validators.ts            |  66 +--------------
 tests/src/core/helpers.test.ts    |  36 +++++++++
 tests/src/core/validators.test.ts |  35 --------
 7 files changed, 250 insertions(+), 216 deletions(-)
```

- dist moves: true

## Deviations

Four items, none of which stopped the unit.

1. s08-06 residue, needs an orchestrator ruling. The 2026-08-28 ruling enumerates five functions to move; both audit lanes had also asked for `isEmptyElement`. I followed the enumeration exactly, so `isEmptyElement(element: ElementNode) => boolean` remains in src/core/validators.ts with the same shape architecture.md § Kind purity places in helpers.ts. Because of that I could not honestly write the guide passage as a pure single family: it now reads "The from-unknown guards, from `validators.ts`, plus `isEmptyElement` — the emptiness question `distill` asks of an element it already holds", and then states that the name and URL predicates are not guards and sit in helpers.ts. Its test `it('recognizes an element with no children')` stayed in tests/src/core/validators.test.ts under the existing `describe('element predicates')`. A successor unit moving `isEmptyElement` closes the passage into the single-family form.

2. s08-02 lane reconciliation. Lane DRIFT/high returned "stands" and Lane DRIFT-RESHAPE/medium returned an amendment; the judge classified the finding DRIFT-RESHAPE, and the dossier's own header says a DRIFT-RESHAPE's corrected repair replaces the repair line. "Stands" offers no competing correction, so I read this as one correction rather than two conflicting ones and applied the amendment: `HTMLScan<TNode>` for both scan results plus `HTMLSource` and `HTMLOpenPosition`, and not `HTMLComment` / `HTMLDoctype`. The amendment's markdown sibling signatures are another package and were left alone.

3. Test relocation for s08-06. Moved the three `it` blocks covering the five relocated functions from tests/src/core/validators.test.ts into a new `describe('element and URL predicates')` in tests/src/core/helpers.test.ts, and updated the two matching bullets in the guide's `## Tests` section. No test file was created, deleted, or renamed, and no assertion changed.

4. Convergence run. `npm run format:check` failed on guides/html.md after my table edits (oxfmt re-pads markdown tables). Per the brief I ran `npm run lint` then `npm run format` once, then proved the whole non-mutating chain green. `npm run lint --fix` reported no changes; the only formatter rewrite was the guide's table padding.

Ancillary choices recorded here rather than stopped on: the four element-name predicates sit after `lowercaseASCII` in helpers.ts and `isSafeURL` sits directly after `sanitizeURL`, which is the pairing the guide already describes; `HTMLScan` is constrained to `TNode extends HTMLNode`; the `walkNodes` comment gives the generator reason for the remaining `try`.

## Residue closed (2026-09-01)

The s08-06 residue the unit reported — `isEmptyElement(element: ElementNode) => boolean` left in
`validators.ts` because the ruling's enumeration named five functions — is closed by an
Orchestrator-owned follow-up in the same repository: the predicate moved to `helpers.ts` beside
the element-name predicates, `HTML.ts` imports it from there, its test moved into the
`element and URL predicates` group, and `guides/html.md` now describes a single from-unknown
family with the row under Helpers and the Tests bullets moved accordingly. Full gate chain green
(`/home/user/work/html-gates.log`); surface tripwire reports no missing export. Committed on the
html campaign branch as "Move isEmptyElement to helpers under kind purity".
