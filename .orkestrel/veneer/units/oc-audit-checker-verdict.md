## Verdict — checker, OFFCANVAS (`oc`) audit round 1, claims 1, 7, 9

### Claim 1 — Scope and delta

| Sub-clause | Verdict | Evidence |
| --- | --- | --- |
| `oc-status.txt` lists only the brief's Owned paths | CONFIRMED | `oc-status.txt:1-6` lists exactly `NavbarSection.test.ts`, `navbar.test.ts` (M) and `OffcanvasSection.ts`, `_offcanvas.scss`, `OffcanvasSection.test.ts`, `offcanvas.test.ts` (??), matching `b-modal-oc-brief.md:163-166` Owned list. |
| `oc.diff` carries those files and no other | CONFIRMED | `oc.diff:1-1017` contains exactly six `diff --git` blocks, one per the same six files. |
| `oc-shared.patch` touches only files the brief lists as Shared | CONFIRMED | `oc-shared.patch` touches `app/browser/Showcase.ts`, `constants.ts`, `index.ts`, `guides/veneer.md`, `src/styles/_mixins.scss`, `src/styles/index.scss`, `tests/app/browser/Showcase.test.ts`, `index.test.ts`, `integration.test.ts`, `tests/conformance.test.ts`, `tests/setup.ts`, `tests/setupServer.test.ts`, `tests/setupStyles.test.ts`, `tests/setupStyles.ts` — all listed at `b-modal-oc-brief.md:168-186`. No vendored, off-limits, sibling-unit, `src/browser/**`, `src/core/**`, `tests/setupServer.ts`, `tests/fixtures/**`, `package.json`, or `README.md` line appears anywhere in the patch. |
| `applies with git apply --check to a fresh extract of 2a3f223` | UNRESOLVED | Only evidence is the writer's own report (`b-modal-oc-report.md:231` claims `clean`, exit `0`). No lane ran the command. Name the command: `git apply --check oc-shared.patch` against a fresh `git archive 2a3f223` extract. |
| leaves MODAL, TIP, TOAST entries, the barrel, and the showcase as the base has them | CONFIRMED | `oc-shared.patch` barrel hunk (`src/styles/index.scss`) inserts only `components/offcanvas`; Showcase hunks insert only `OffcanvasSection`; no MODAL/TIP/TOAST symbol appears in any hunk. |
| § Compatibility rows fit the table's existing column widths, not re-padded | UNRESOLVED | Column-width equality across the whole table cannot be established by reading a unified diff alone; the visible new rows (`oc-shared.patch:302-331,349`) look consistent with neighboring rows, but confirming no re-pad needs the formatter. Name the command: `npm run format:check` (and a byte diff of untouched table rows in `guides/veneer.md`). |

### Claim 7 — Registries and orders

| Sub-clause | Verdict | Evidence |
| --- | --- | --- |
| `CaptureSubject` gains the specimen subjects, `CASCADE_KEYS` one resting row per specimen | CONFIRMED | `oc-shared.patch:583-596` adds ten `CaptureSubject` members; `oc-shared.patch:619-679` adds ten matching `CASCADE_KEYS` rows (one per specimen). |
| no `DRIVEN_KEYS` row | CONFIRMED | `tests/setup.ts` hunk (`oc-shared.patch:579-679`) contains no `DRIVEN_KEYS` addition. |
| decline paragraph covers `showing`, `hiding`, fade-alone, `.offcanvas-xxl` inline frames | CONFIRMED | `oc-shared.patch:604-610`. |
| `listed`, the order case (after `spinner`), the dash-proof component set | CONFIRMED | `oc-shared.patch:503-507` (`listed`); `oc-shared.patch:564-577` (`'offcanvas'` inserted after `'spinners'`/`'spinner'` in both order arrays); `oc-shared.patch:686-691` (`tests/setupServer.test.ts` component set). |
| `Showcase.ts` construction after `AccordionSection`, `app/browser/index.ts` | CONFIRMED | `oc-shared.patch:13-18` (Showcase construction), `:117-123` (barrel export), both after `AccordionSection`. |
| `Showcase.test.ts` and `index.test.ts` lists agree with each other, the barrel, and M14 | CONFIRMED | `oc-shared.patch:437-478`: region list order `Alert, Carousel, Accordion, Offcanvas, Display…` matches `Showcase.ts`/barrel order; `index.test.ts` adds the three exports in its alphabetical export list. |
| offcanvas case tables in `tests/setupStyles.ts`, frozen, exported, bound to inventory by derivation | CONFIRMED | `oc-shared.patch:847-1007` (`OFFCANVAS_SELECTORS`, `OFFCANVAS_PLACEMENTS`, `OFFCANVAS_FRAME`, `OFFCANVAS_MARKUP`, `OFFCANVAS_STATE_CASES`, `OFFCANVAS_GEOMETRY`, each `Object.freeze`d); `oc-shared.patch:726-842` (`tests/setupStyles.test.ts` "offcanvas case tables" derives each table from `oracle.components.offcanvas` and freezes them). |

### Claim 9 — Law and report

| Sub-clause | Verdict | Evidence |
| --- | --- | --- |
| no `any`, no `as` beyond a const assertion, no `!`, no suppression, no mock/spy/fake, no nested function beyond a direct callback | CONFIRMED (sampled across full `oc.diff` and `oc-shared.patch`) | Only `as const` occurrences are on frozen literal tuples (e.g. `oc-shared.patch:920,927,934,941` `edges: Object.freeze([...] as const)`), all const assertions. No `@ts-ignore`/`eslint-disable`/non-null assertion/mock/spy/fake construct found. All arrow functions found (`.map`, `.filter`, `.each`, `it(...)`) are callbacks passed directly as arguments. |
| no new helper duplicates an installed `@orkestrel/test` or `@orkestrel/contract` export | CONFIRMED | New test files import `readHit`, `readPixels`, `matchesColor`, `stageMedia`, `requireValue`, `readStyle`, `readRootToken`, `readToken`, `releaseMedia` from `@orkestrel/test`/`@orkestrel/test/browser` (`oc.diff:337-370`) rather than reimplementing them; `collectLayer`, `collectMediaConditions`, `scene`, `visitBreakpoint`, `normalizeComplexSelector`, `splitTopLevelList`, `trimCSSWhitespace` are pre-existing centralized `tests/setupBrowser.ts`/`tests/setupStyles.ts` helpers, not new duplicates. |
| added comments, TSDoc, guide text, report follow the writing rule | CONFIRMED (sampled) | No banned-term hit found in the sampled prose of `oc.diff`, `oc-shared.patch` guide hunk, or `b-modal-oc-report.md`. |
| report records each gate's command with its result line | CONFIRMED | `b-modal-oc-report.md:216-231` — one table row per command, each with a result string and exit code. |
| counts the report states, listed, for the record | Findings (BROKEN standard: none broken, listed per instruction) | See list below. |

**Counts the report states** (`b-modal-oc-report.md`): diffstat `37`, `7`, `2` files, `36` insertions, `8` deletions, new-file line counts `186`, `20`, `500`, `174` (lines 68-73); shared-patch diffstat `2`, `63`, `1`, `172`, `21`, `1`, `3`, `3`, `2`, `35`, `78`, `1`, `128`, `141` (lines 78-92); gate test totals `269`, `86`, `7`, `5`, `22`, `109`, `1` skipped, `110` (lines 218-231); failing-first `26` failed/`3` passed of `29`, `2` failed of `2`, `7` passed of `7`, `6248` ms (lines 178-192); baseline `22` passed of `22`, `57` passed of `57` (line 233-234); journey observation `8` passed/`168` skipped of `176` (line 245); navbar-reading viewports `991`, `992`, `390`, `1280` (lines 251-256). Each is a quoted command-output measurement or a viewport/duration value reported with the run that produced it, matching the AGENTS.md exception for a duration, exit code, or measurement reported with its run; none is a stated count of a growable set framed in prose.

### Findings outside claims 1, 7, 9

None found (BROKEN standard) within the read scope.

### Referrals

- Claim 1's `git apply --check` sub-clause and its column-width sub-clause need a lane that can run `git apply --check` and `npm run format:check` on the shared patch and a fresh `2a3f223` extract — routed to the Orchestrator per the brief's own instruction.

VERDICT: FAIL none; outside the claims: none

Two sub-clauses of claim 1 are UNRESOLVED (not BROKEN) pending a command neither lane can run read-only; all other read sub-clauses of claims 1, 7, and 9 are CONFIRMED.
