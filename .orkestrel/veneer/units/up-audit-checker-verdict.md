## Verdict — checker, UTIL-PAINT (`up`) round 1, claims 1, 6, 8

**Claim 1 — Scope and delta: UNRESOLVED**

- `up-status.txt` lists exactly the brief's Owned paths (`b-utilities-up-brief.md:98-100` Owned list vs `up-status.txt:1-8`): all 8 entries match (2 `.scss` partials, 2 `Section.ts` files, 4 mirrored test files). No extra, no missing.
- `up.diff` carries exactly those 8 files and no other (`up.diff:1-1268`, files at lines 1, 29, 57, 127, 243, 399, 582, 851). CONFIRMED for this sub-clause.
- `up-shared.patch` touches only files the brief lists as Shared (`b-utilities-up-brief.md:102-117`): `app/browser/Showcase.ts`, `app/browser/constants.ts`, `app/browser/index.ts`, `guides/veneer.md`, `src/styles/index.scss`, `tests/app/browser/Showcase.test.ts`, `tests/app/browser/index.test.ts`, `tests/app/browser/integration.test.ts`, `tests/conformance.test.ts`, `tests/fixtures/tailwind/{consumer.css,markup.html,preflight.css}`, `tests/setup.css`, `tests/setup.ts`, `tests/setupServer.test.ts`, `tests/setupStyles.{ts,test.ts}` — 17 files, every one on the Shared list. CONFIRMED.
- "Equals the union of the per-file split": the 17 `up-instruments/up-shared--*.patch` files name the identical 17 paths (glob result), a 1:1 name match with `up-shared.patch`'s file set. CONFIRMED by name; content-byte equality not independently diffed.
- Neither patch adds a line to a vendored file, `src/browser/**`, `src/core/**`, `package.json`, `README.md`, `src/styles/_mixins.scss`, or a sibling unit's file: none of the touched files (17 in `up-shared.patch`, 1 in `up-unscoped-profiles.patch` — `tests/service/tailwind/profiles.test.ts`) fall in that excluded set. CONFIRMED by inspection.
- **UNRESOLVED sub-clauses** (need a command I cannot run, per the brief's own instruction): "`up-shared.patch` … applies with `git apply --check` to a fresh extract of `2a3f223`" — command: `git -C <fresh 2a3f223 extract> apply --check /home/user/scaffold/.orkestrel/veneer/units/up-shared.patch`. "`up-unscoped-profiles.patch` … applies after it" — command: `git -C <fresh extract with up-shared.patch applied> apply --check /home/user/scaffold/.orkestrel/veneer/units/up-unscoped-profiles.patch`. The Orchestrator takes these readings.
- Because the claim is a single conjunctive statement with unresolved sub-clauses, the claim as a whole is **UNRESOLVED**, not CONFIRMED.

**Claim 6 — Sections, specimens, and registries: CONFIRMED**

- `BackgroundSection extends SpecimenSection` over `BACKGROUND_COPY, BACKGROUND_SPECIMENS` (`up.diff:20-27`); `BorderSection extends SpecimenSection` over `BORDER_COPY, BORDER_SPECIMENS` (`up.diff:48-56`).
- Specimen names/order match the brief's list exactly: Background — `Background roles, Subtle backgrounds, Body backgrounds, Background opacity, Background gradient` (`up-shared.patch:52-91`, brief `b-utilities-up-brief.md:168`); Border — `Additive borders, Subtractive borders, Border roles, Subtle borders, Border widths, Border opacity, Rounded corners, Rounded sizes` (`up-shared.patch:127-195`, brief line 168).
- No specimen writes an inline `style` attribute or an unshipped class: all markup in `BACKGROUND_SPECIMENS`/`BORDER_SPECIMENS` (`up-shared.patch:96-101,199-205`) uses only class names that resolve to selectors the owned partials or existing partials declare (`bg-*`, `border*`, `rounded*`, `bg-body-tertiary`); no `style=` token present.
- Sections construct after `VisibilitySection` and before `NavbarSection`, with matching rows in `index.ts`, `Showcase.test.ts`, `index.test.ts`: `Showcase.ts` array (`up-shared.patch:15-21`); `app/browser/index.ts` barrel (`up.diff:216-222`); `Showcase.test.ts` region-name and specimen-spread arrays (`up-shared.patch:436-450`); `index.test.ts` alphabetized export list (`up-shared.patch:459-476`).
- `CASCADE_KEYS` rows read properties a computed style can read (`background-color`, `background-image`, `border-top-width`, `border-top-color`, `border-top-left-radius` — `up-shared.patch:635-712`), all standard longhand CSS properties.
- The `listed` literal (`up-shared.patch:511,513,521`), the order case's entry paths (`up-shared.patch:528-552`), and the dash-proof/compatibility component set in `tests/setupServer.test.ts` (`up-shared.patch:724,726,734`) agree on `bg`, `border`, `rounded`.
- The eight tables (`BACKGROUND_FILL_CASES`, `BORDER_COLOR_CASES`, `SUBTLE_TIER_CASES`, `PAINT_OPACITY_CASES`, `BORDER_SIDE_CASES`, `BORDER_WIDTH_CASES`, `RADIUS_STEP_CASES`, `RADIUS_SIDE_CASES`) sit in `tests/setupStyles.ts`, each wrapped in `Object.freeze` and `export const` (`up-shared.patch:990-1096`), and are bound to the inventory by derivation in the new `setupStyles.test.ts` case that reads `oracle.components.bg/border/rounded` and compares (`up-shared.patch:828-970`) rather than by a hardcoded literal.
- Mutation-distinguishing note: the caption-agreement assertion (`up.diff:296-303,458-461`) compares rendered caption text against the swatch's own class list, so a caption drifted from its swatch's classes would fail; a lane confirming this needs to run it (execution not available to this lane) — this sub-clause is a runtime behavior and is noted as structurally sound but not independently executed. It does not change the overall claim verdict since the claim's substance is the static/structural facts above, all confirmed by direct reading.

**Claim 8 — Law and report: BROKEN**

- No `any`, no `as` beyond `as const`, no `!` non-null assertion, no suppression comment, no mock/spy/fake, no nested function beyond a passed callback found in `up.diff`, `up-shared.patch`, or `up-unscoped-profiles.patch` (greps returned only code identifiers `new Set(...)`, `as const` casts, and prose containing the word "new" as a constructor call — no policy hits). CONFIRMED for that sub-clause.
- No banned-term hits (`should`, `simply`, `easy`, `just`, `currently`, `utilize`, `leverage`, `via`, "in order to", "e.g.", "etc.", "performant", "robust", "allows you to", "and/or", "please", "sanity check", "dummy", "blacklist/whitelist", "master/slave") in the owned files or shared patches' added prose.
- The report records each gate's command with its result line (`b-utilities-up-report.md:68-100`, e.g. line 68 `npm run format:check` → 0; line 76 `npm run build:src:styles && npm run test:service` → 1 with case names). CONFIRMED.
- **Writing-rule violation found (BROKEN):** the report uses the banned cross-reference terms "above"/"below" instead of `earlier`/`later`/`preceding`/`following`, per `.claude/rules/writing.md` § Code tokens, references, and links and the root Substitutions table:
  - `b-utilities-up-report.md:23` "10 cases (read in the run below)"
  - `b-utilities-up-report.md:113` "Each case below went red under its named mutation"
  - `b-utilities-up-report.md:179` "every selector above, at the empty infix alone"
  - `b-utilities-up-report.md:304` "Every shared file patched above is as `2a3f223` has it"

  This falls squarely inside claim 8's own text ("the report follow[s] the writing rule"). The mutation that would make a check for this pass instead of fail is: rewrite each hit to `earlier`/`preceding`/`following`; the current text is a plain grep-detectable violation, not a borderline judgment call.

**Findings outside the claims:** none substantiated.

**Counts the report states, listed** (per Output section, and per the writing rule's own ban on stating counts in this verdict's prose — these are the report's measurements, reported with the runs that produced them, not this lane's invented counts):
- `format:check`: 359 files, exit 0 (`b-utilities-up-report.md:68`).
- `build:src` cascade instrument: inventory 111 selectors under `bg`/`border`/`rounded`, cascade 111 selectors (`b-utilities-up-report.md:71`).
- `test:conformance` (copy, ledger applied): `Tests 22 passed (22)` (`b-utilities-up-report.md:75`).
- `test:service` before profiles patch: `Tests 2 failed, 16 passed (18)` (`b-utilities-up-report.md:76`).
- `test:guides`: `Tests 19 passed (19)` (`b-utilities-up-report.md:89,99`).
- `test:policy`: `Tests 109 passed | 1 skipped (110)` (`b-utilities-up-report.md:90,100`).
- Owned styles proofs: `Tests 22 passed (22)` (`b-utilities-up-report.md:91`).
- Section/Showcase/index proofs: `Tests 11 passed (11)` (`b-utilities-up-report.md:92`).
- Rounded-circle ledger negative control: 9 `rounded` rows printed as `declared` (`b-utilities-up-report.md:149`).
- With profiles patch applied: `test:service` `Tests 18 passed (18)` (`b-utilities-up-report.md:322`).

VERDICT: FAIL 1, 8; outside the claims: none
