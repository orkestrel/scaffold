Lane held: checker markdown

## Claim 1 — scope honesty
PASS. `.orkestrel/campaign/docs-parity/d7n-markdown-close.status.txt` lists exactly `guides/markdown.md`, `src/core/constants.ts`, `tests/guides.test.ts` — matching the brief's owned-files grant (`guides/markdown.md`, `tests/guides.test.ts`, plus `src/**` doc blocks "only where item 1 needs a constant's literal named"). The diff (`d7n-markdown-close.diff.txt`) touches no other path.

## Claim 2 — citation and count discipline
PASS. Every file:line the report cites (`guides/markdown.md:63`/`:69`, `:151`, `tests/guides.test.ts:1-3`) resolves against the current tree as stated, confirmed by direct read. No bare prose count appears; the only numerals are quoted command output (`Test Files 1 passed (1)`, `Tests 63 passed (63)`, `wall clock 3.773s`, `Tests 90 passed | 1 skipped (91)`), which `.claude/rules/writing.md` permits as a measurement reported with the run that produced it.

## Claim 3 — the `Shape` idiom
FAIL, two mechanical defects in the current tree the closing unit left unaddressed:

1. **`### Validators` (`/home/user/fleet/markdown/guides/markdown.md:165-187`) is a dedicated guard table** (every row `isHeadingNode` … `isMarkdownDocument`, all guards) but still heads `Signature`, not `Shape`, and carries no guard sentence. Ruling 20 requires a dedicated guard table to head `Shape` with "the type each guard narrows to" under Ruling 15's guard sentence. The pilot's own `### Validators` table (`/home/user/fleet/abort/guides/abort.md:46-52`) is the canonical proof: same heading name, same population (guard functions), and it already carries `Shape` and the sentence "In a guard table a `Shape` cell holds the type the guard narrows to." Markdown's `Validators` table is off-canon against its own pilot.
2. **`### Shapers` (`guides/markdown.md:149-163`) `Shape` cells are not in Ruling 25's form.** Every row is an `objectShape({...})` or `literalShape([...])` call (confirmed against `/home/user/fleet/markdown/src/core/shapers.ts:32,49,66,84,103,123,139`), whose declared type per `@orkestrel/contract`'s `index.d.ts:4142` (`objectShape<P, A>(...): ObjectShape<P, A>`) and `:3689` (`literalShape<T>(...): LiteralShape<Readonly<T>>`) is `ObjectShape<{...}>` / `LiteralShape<...>`. The guide instead shows the bare emitted structural literal (`{ element, value }`, `'left' \| 'right' \| 'center'`), which Ruling 25 names as exactly the form to correct ("The emitted structural type is not written into a cell"). This closing unit's brief did not flag either defect — its item 1 scan reported "(none)" for off-canon guard/constants tables beyond the `Shapers` sentence — so this is uncorrected drift against a Ruling the dispatch names as governing evidence, not a judgment call: the pilot and the contract package's own declared types settle both readings mechanically.

## Claim 4 — the drop-in's canon
PASS. `tests/guides.test.ts:1-3` reads identically to the pilot's `tests/guides.test.ts:1-3` (confirmed by direct read of both files). The region `const root = ...` (markdown line 86) through the manifest loop's closing brace (markdown line 297) is byte-for-byte identical to the pilot's same region (abort lines 47-258), confirmed by side-by-side read; the package's own `describe('flagship fences')` section follows, appended as Ruling 20 permits. `INTERNAL` (line 81) carries `Object.freeze([])`, consistent with the pilot's sentence form, and the equality case (`keeps every compared summary and example equal to its source`, line 220) sits in the pilot's position, directly after the methods loop and before the examples case.

## Claim 5 — fence lead-ins, sibling fences, headings, README
PASS. Every fence the brief listed as directly under a heading (`632`, `646`, `664`, `676`, `698`, `713`, `772`, `785`, `810`, `917`, `934`) now carries one lead-in sentence between the heading and the fence, confirmed by direct read of `guides/markdown.md:620-939`. `### Scan one inline construct` (line 884) correctly took no added sentence because its fence already sits under a paragraph, not directly under the heading. No heading in the guide's full heading list carries a retired term (no `Entities`, no bare `kind`/`type` axis names). `README.md`'s `## Install` (line 23-27) and `## Usage` (line 35-52) fences both sit directly under their headings, per Ruling 24.

## Referrals
None — claim 3's findings are settled mechanically against the pilot's own converged tables and the contract package's declared types, not judgment calls.

VERDICT: FAIL <3>
