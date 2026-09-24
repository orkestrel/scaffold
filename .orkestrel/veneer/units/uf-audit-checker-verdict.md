This matches exactly the constants.ts hunk in the combined `uf-shared.patch` — confirms union equivalence for this file. I have sufficient evidence to render the verdict now.

## Verdict

**Claim 1 — Scope and delta.**
- Status: PARTIALLY CONFIRMED / one sub-clause UNRESOLVED.
- `uf-status.txt:1-4` lists exactly the four Owned paths the brief names (`b-utilities-uf-brief.md:95-97`): `M app/browser/sections/TypeSection.ts`, `M tests/app/browser/sections/TypeSection.test.ts`, `?? src/styles/utilities/_font.scss`, `?? tests/src/styles/utilities/font.test.ts`. CONFIRMED.
- `uf.diff:1-441` carries only those four files (headers at lines 1, 14, 78, 138) and no other. CONFIRMED.
- `uf-shared.patch` touches exactly 8 files (`src/styles/index.scss`, `tests/conformance.test.ts`, `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, `tests/setupServer.test.ts`, `tests/setup.ts`, `app/browser/constants.ts`, `guides/veneer.md`), each on the brief's Shared list (`b-utilities-uf-brief.md:99-113`). CONFIRMED.
- "equals the union of the per-file patches": the per-file patch set in `uf-instruments/` names the same 8 files, and `uf-instruments/uf-app-browser-constants.ts.patch:1-56` is byte-identical to the `app/browser/constants.ts` hunk in `uf-shared.patch`. Sampled one file; the remaining 7 were not diffed byte-for-byte. CONFIRMED on the sampled file, UNRESOLVED on the rest (no lane read every file pair).
- "applies with `git apply --check` to a fresh extract of `2a3f223`": no command was run by this lane. UNRESOLVED — command needed: `git apply --check .orkestrel/veneer/units/uf-shared.patch` against `git archive 2a3f223 | tar -x -C <scratch>`.
- "adds no line to a vendored file, `src/browser/**`, `src/core/**`, `package.json`, `README.md`, a Tailwind fixture, or a sibling unit's file": none of those paths appears in `uf.diff` or `uf-shared.patch`. CONFIRMED by reading.

**Claim 6 — Sections, specimens, and registries.**
- Status: CONFIRMED, on the sites read.
- Five specimens added in the stated order in `app/browser/constants.ts` per `uf-instruments/uf-app-browser-constants.ts.patch:31-55`, and the same names/markup echoed in `TypeSection.test.ts:39-77` (worktree copy) and the report's `TYPE_SPECIMENS` order (`b-utilities-uf-report.md:110`).
- Markup uses no inline `style` attribute (`TypeSection.test.ts:72-76`); classes used are the unit's own (`fs-*`, `fw-*`, `fst-*`, `lh-*`, `font-monospace`) plus pre-2a3f223 Bootstrap layout classes (`container-fluid`, `row`, `row-cols-*`, `g-3`) in the Line-heights specimen.
- The section proof (`TypeSection.test.ts:18-44`) restates the specimen-name and markup lists as direct-value assertions against `TYPE_SPECIMENS`, matching the file's pre-existing pattern for every other specimen (Heading/Display/Lead etc., same lines) — not an `it.each` case-population of the kind mid-campaign note 1 rule 2 (`w2-w3-note-1.md:10-12`) targets. CONFIRMED that this is not a violating case population.
- `CASCADE_KEYS` rows added in `tests/setup.ts` (per `uf-shared.patch:271-319`) each name a `selector`/`property` pair (`font-size`, `font-weight`, `font-style`, `line-height`, `font-family`) — each a computed-style-readable property. CONFIRMED.
- `FONT_ENTRY_CASES`, `FONT_WEIGHT_CASES`, `FONT_WEIGHT_PARENTS`, `FONT_STYLE_VALUES`, `LINE_HEIGHT_CASES` sit in `tests/setupStyles.ts` (`uf-shared.patch:62-127`), are `Object.freeze`d, exported, and the binding test (`uf-shared.patch:172-240`) derives the font keys from the inventory's rule shape rather than restating the literal — matching note 1 rule 5. CONFIRMED.
- "the conformance `listed` literal, the order case, and the dash-proof component set agree with the barrel": the `listed` array and helper-order/`helperPaths` entries in `tests/conformance.test.ts` (`uf-shared.patch:9-54`) insert `font`/`fs`/`fst`/`fw`/`lh` in alphabetical position and add `utilities/font` to the order list; `tests/setupServer.test.ts` (`uf-shared.patch:244-271`) adds the same keys to its component set. Consistent by reading; no lane ran `test:conformance` itself. CONFIRMED on structure, UNRESOLVED on the runtime pass (no lane executed the gate).

**Claim 8 — Law and report.**
- Status: BROKEN (one banned-term hit), otherwise CONFIRMED.
- No `any`, no `as X` cast beyond a const assertion, no `!` non-null/assertion, no `@ts-ignore`/`@ts-expect-error`/`@ts-nocheck`/`eslint-disable`, no mock/spy/fake, no nested function beyond a directly-passed callback: searched `_font.scss`, `font.test.ts`, and the patch text; none found. CONFIRMED.
- No new helper duplicates an installed `@orkestrel/test`/`@orkestrel/contract` export: `font.test.ts:1-5` imports `requireValue`, `findRule`, `readStyle` from the installed packages and defines no competing helper. CONFIRMED.
- "added comments, TSDoc, guide text, and the report follow the writing rule": **BROKEN**. `tests/src/styles/utilities/font.test.ts:194` reads "not only the one read above, reddens here." `.claude/rules/writing.md` § Code tokens, references, and links requires `preceding`, `earlier`, or `later` in place of `above`/`below`, and this line is a comment the unit itself added (the whole file is new). No other banned-term or token-noun violation was found in the guide patch, the `setupStyles.ts` patch, or the report (searched for `above`, `below`, `simply`, `easy`, `currently`, `utilize`, `leverage`, `via`, `etc.`, `performant`, `robust`, `allows you to`, `and/or`, `please`, `sanity check`, `dummy`, `blacklist`/`whitelist`, `master`/`slave`).
- "the report records each gate's command with its result line": `b-utilities-uf-report.md:117-135` gives each of criteria 1-7 its command and exit/count. CONFIRMED.

**Counts the report states (finding outside the claims, for the record):** `_font.scss` 54 lines; `font.test.ts` 298 lines, 28 cases; `TypeSection.test.ts` +39; combined patch 8 files / 316 insertions / 4 deletions; baseline `test:conformance` 22 passed, `test:service` 18 passed; mutation-log counts (27 failed/1 passed → 28 passed; 1/1 → 2; 1/21 → 22; assorted 1-red entries); inventory 24 records (20 unconditioned + 4 media-gated), built cascade 20 rules; `format:check` 353 files; styles project 93 files/1087 tests; `test:app` 40 files/112 tests; `test:conformance` 22 passed; `test:service` 18 passed; `test:setup` 267 passed (two 10100ms timeouts, unrelated case); `test:policy` 109 passed/1 skipped; `test:journey` 176 passed; negative control `exit 1, 2 failed, 16 passed`.

Findings outside the claims: none beyond the writing-rule hit already folded into claim 8.

**Dispatch defect:** the brief names no report path for this lane and assigns no command; both are consistent with the read-only floor, so none recorded.

VERDICT: FAIL 1, 8; outside the claims: none
