**Verdict — FADE (`cf`) audit, round 1. Lane: subjective, held by `reviewer` on Opus 5.5.**

Claims 6 and 7 are broken, and one substantiated finding sits outside the claims. The dispatch was clean: no report path was assigned and no command was requested.

## Numbered verdicts

**1. Scope — CONFIRMED**
- `cf-status.txt:1-4` lists the four owned paths and nothing else.
- Every file in `cf-shared.patch` appears in the brief's Shared list (`b-cross-cf-brief.md:73-80`): `Showcase.ts`, `constants.ts`, `index.ts`, `guides/veneer.md`, `index.scss`, the three app tests, `conformance.test.ts`, `setup.ts`, `setupStyles.ts` and `setupStyles.test.ts`.
- `cf-offlimits.patch:7` adds one line, `'transition',`, at the `top` / `translate-middle` seam of the dash-filter set (`/home/user/veneer-cf/tests/setupServer.test.ts:1491-1492`).
- `cf-setup-offlimits.log.txt:32` reads `Tests  287 passed (287)`. I accept the Orchestrator's apply checks as given.

**2. The rules (X5) — CONFIRMED**
- The partial matches the claim: `cf.diff:24-30`. The barrel line sits ahead of `collapse`: `cf-shared.patch:272`. The order case maps the stem to a list: `cf-shared.patch:376-393`.
- "Exactly those rules" is carried by the proof, not only by the report's quote:
  - fade.test.ts case 1 (`cf.diff:64-84`) holds every components-layer selector on the `fade` and `show` classes alone equal to `FADE_SELECTORS`.
  - fade.test.ts case 2 (`cf.diff:89-113`) holds the declarations and their condition.
  - Both read the built cascade, because every run is `npm run build:src && …` (`cf-mutations.log.txt:12`), and `setupStyles.test.ts:756` requires that build.
- Gate evidence: `cf-gates.log.txt:5`.

**3. The proofs — CONFIRMED** (from `cf-mutations.log.txt` and the assertions)

| Mutation | Case that distinguishes it | Log |
| --- | --- | --- |
| M1 | the hides case expects `'0'` (`cf.diff:127-131`) | `:15-21` |
| M2 | the declaration literal (`:108`) and the `0.3s` reading (`:183`) | `:38-41` |
| M3 | the staged `none` reading (`:166-169`) | `:58-61` |
| M4 | the `height` reading (`:202`), plus the conformance order case | `:80-86` |
| M5 | the shown `'1'` reading | `:112-118` |
| M6 | the selector set | `:135-137` |
| M7 | `readHit` (`:136`) | `:152-154` |
| M8 | dark equals light (`:253`) | `:171-174` |

- Controls are green at `:88-95` and `:235-242`. Each assertion distinguishes its mutation from the passing case.
- Bound: "each case reads computed values" is false as worded. Cases 1 and 2 read CSSOM declared text. That matches the landed collapse proof (`collapse.test.ts:22,44`), so this is a defect in the claims file, not in the unit.
- The failing-first logs are retained. See the first referral about which revision they ran against.

**4. The region — CONFIRMED**
- Specimens and the `aria-hidden` attribute: `cf-shared.patch:45-56`. The reason is given in the TSDoc (`:43`) and the guide (`:121-122`).
- The section proof binds each body's state to the last word of its specimen name (`cf.diff:356-374`). S1, S2 and S3 redden it (`cf-mutations.log.txt:176-233`). Dropping `aria-hidden` would redden it too, because the proof expects `hidden: 'true'`.
- Every `CASCADE_KEYS` row goes through `FRAMES.place(key.scenario, copy, frame)` on a lifted copy (`/home/user/veneer-cf/tests/app/browser/integration.test.ts:673-714`).
- The fade rows are `cf-shared.patch:425-434`. No `page` call is added.
- The card wrapper follows the Collapse precedent (`constants.ts:2184-2204`).
- The frame pixels belong to the VERIFY round. This claim does not assert them.

**5. The ledger (X1) — CONFIRMED**
- The gate printed the row at `cf-conformance-1.log.txt:20`, and `cf-shared.patch:209` matches it byte for byte.
- The ladder answers at `cf-ladder.log.txt:9` match the report table (`b-cross-cf-report.md:93-99`).

**6. Guide — BROKEN**
- **What is false.** The § Fade classes Tests sentence "the fade on each component the release animates" (`cf-shared.patch:128`) overclaims. So do the case title "fades each component the release animates" (`cf.diff:211`) and the `FADE_COMPONENT_CASES` TSDoc "Pairs each component an engine fades" (`cf-shared.patch:534`).
- **The input that breaks it.**
  - The release animates tab panes and modals through the `fade` class: `node_modules/bootstrap/js/src/tab.js:127,152` and `modal.js:261`.
  - The package's own engine does the same: `TabClassMap.fade`, "Marks a pane that fades in and out" (`/home/user/veneer-cf/src/browser/types.ts:926`), and the modal `fade` token (`types.ts:1142`).
  - The table holds only the alert, toast, tooltip and popover (`cf-shared.patch:543-556`). No case reads a pane or a modal under the `.fade` rule.
  - The bounded `fade` search could not surface § Nav's "A tab pane stays hidden until it carries the `active` class." (`guides/veneer.md:2219`), because that sentence never names the class. It is not false, but a pane carrying the `fade` class is still transparent after it gains `active`.
- **Fix (recommended).** Add a `nav` row (`tab-pane fade active` / `tab-pane fade active show`) and a `modal` row (`modal fade` / `modal fade show`) to `FADE_COMPONENT_CASES`. Add a clause to the § Nav sentence that a faded pane stays transparent until the `show` class joins it.
- **Fix (alternative).** Narrow the Tests sentence, the case title and the TSDoc so they name the four components they cover.
- **Not evidenced.** The § Showcase clause "a region the transparent body declares paints one color and the frame guard refuses it as a blank" (`cf-shared.patch:241-242`) is a claim about the rendered surface. No capture was run (`b-cross-cf-report.md:311-312`).
- **Every other added or rewritten sentence reads true.** I checked:
  - the alert, tooltip and popover rewrites against the stylesheet: no fade rule in any of the three partials, `_tooltip.scss:67` reads only the `show` class, and `.tooltip` has `opacity: 0` at `bootstrap.css:5781`;
  - the toast rewrite against `_toast.scss:40,44` and `types.ts:1852`;
  - "no rule writes an opacity for the shown state", which mirrors the Collapse wording at `veneer.md:2016`;
  - the § Compatibility, § Files and ledger rows;
  - the unchanged hits, which still hold.

**7. Law and report — BROKEN**
- **What is false.** The report does not follow every code token with its noun. The brief requires it (`b-cross-cf-brief.md:107-108`) and so does `w2-w3-note-1.md:7-9`. Sites:
  - `b-cross-cf-report.md:34`: "`npm run build:src` exits 0"
  - `:118`: "is `calc(150ms * var(--vn-factor-motion))`."
  - `:120`: "to `'collapse'`."
  - `:197`: "`npm run format:check` exits 2 with `Expected at least one target file`"
  - `:200-201`: "a planted `any` and `debugger`"
- **Fix.** Write "the `npm run build:src` command", "the `calc(…)` value", "the `'collapse'` stem", "the `Expected at least one target file` message", and "a planted `any` type and `debugger` statement".
- **What holds.**
  - No changed line adds an `any` type, an `as` assertion, a non-null `!`, a suppression, or a nested declaration. Every function is an anonymous argument callback.
  - `FADE_SELECTORS` and `FADE_COMPONENT_CASES` are frozen, documented, and bound in `cf-shared.patch:465-511`.
  - `TRANSITION_COPY` and `TRANSITION_SPECIMENS` are bound in `cf.diff:329-331`.
  - The gate result lines match `cf-gates.log.txt:1-11`.
  - No banned temporal word appears.
- **Optional.** `cf-shared.patch:504-506` re-finds the entry it is already iterating. Iterate the entries and check `Object.isFrozen(entry)` instead.
- **Counts the report states, for the record.**
  - Test result lines:
    - `:13`, `:188`: `1 failed | 286 passed (287)`
    - `:16`: `287 passed (287)`
    - `:155`: `8 failed (8)`
    - `:156`, `:184`, `:187`, controls: `8 passed (8)`
    - `:161`: `1 failed | 2 passed (3)`
    - `:164`: `3 failed | 139 passed (142)`
    - `:167`: `3 failed | 19 passed (22)`
    - `:169`: `1 failed | 21 passed (22)`
    - `:185`: `22 passed (22)`
    - `:186`: `19 passed (19)`
    - `:189`: `109 passed | 1 skipped (110)`
    - `:190`, `:308`: `1288 passed (1288)`
  - Format and build lines: `:180` `11068ms on 419 files using 4 threads`; `:183` `2.05s`; `:200` "419 files".
  - Diffstat: `:76-81` records +25, +218, +20, +111 and 374 insertions; 251 insertions and 28 deletions; +106 with 19 deletions; +52, +36, +31; +21 with 9 deletions; +21; and "+1 to +3 each".
  - Mutation summaries: `:214-225` records `5|3 (8)` twice, `2|6 (8)` three times, `1|7 (8)` three times, `2|1 (3)` twice, `1|2 (3)`, and controls `8 (8)` and `3 (3)`.

## Findings outside the claims

**F1 — the `CASCADE_KEYS` TSDoc paragraph states a registry rule that the registry breaks.**
- **Site.** `cf-shared.patch:411-417`, which lands in `tests/setup.ts` around line 580.
- **What it says.** "A key whose recorded rule writes the `opacity: 0` declaration at rest names the wrapper that reserves the element's box through a `:has()` selector…"
- **Why it is false.** The same doc block declines keys whose recorded rule writes exactly that:
  - the resting tooltip, `.tooltip{opacity:0}` at `bootstrap.css:5781`, declined at `/home/user/veneer-cf/tests/setup.ts:556-557`;
  - the toast carrying the `showing` class (`:546-549`);
  - the modal backdrop carrying the `fade` class alone (`:551-554`);
  - the offcanvas backdrop carrying the `fade` class alone (`:565-569`).
- **Why it matters.** A reader, or the next unit, applying the rule as written would add wrapper rows for keys the registry deliberately declines.
- **Fix.** Scope the paragraph to the fade key's hidden state. Say that it writes opacity alone and keeps its box, so its row names the card through a `:has()` selector and reads the card's `height` property. Say what separates it from the declined transparent moments, and name it as X5's reserved empty frame.

## Attacked and held
- I tried to find a rewritten sentence left false by a rule that reads the `show` class. The tooltip's `.tooltip.show` rule is consistent with "the opacity the `show` class gives it".
- The J-ENGINE token in the Elements rewrite is the guide's established Owner vocabulary (`veneer.md:6662`), not campaign leakage.
- The single-bullet "These are the key's recorded departures." follows the Modal precedent (`veneer.md:2885`).
- The Fade section's shape and order mirror § Collapse classes, and its region sits ahead of Collapse in the release order.

## Referrals
- **To the objective lane.** `cf-red-fade.log.txt:235` and `cf-nopartial-fade.log.txt:234` show the case "…carrying both classes" at line 151. The shipped title is "…the fade and collapsing classes", around line 154. The section's failing-first case sits at line 54 in `cf-nopartial-section.log.txt:9`, against around line 56 shipped. So the failing-first runs predate the shipped test files. The mutation log uses the shipped titles. Rule whether the failing-first evidence binds to the shipped cases.
- **To the objective lane.** The ladder probe `cf-ladder.test.ts.txt:20` asserts only `answers.length > 0` and has no negative control.
- **To the Orchestrator** (X5 owns the names).
  - `FadeSection` passes `TRANSITION_COPY` and `TRANSITION_SPECIMENS`. Every other section in `/home/user/veneer-cf/app/browser/sections/` passes constants named for its own stem.
  - The same unit names its setup tables `FADE_*`, so one concept carries two terms (`AGENTS.md`, "One concept, one term").
  - X11's `ColorModeSection` with `THEME_*` repeats the pattern.
  - Consider ruling `FADE_COPY` and `FADE_SPECIMENS`, and keep "transition" for the inventory-key rows only.

VERDICT: FAIL 6, 7; outside the claims: F1