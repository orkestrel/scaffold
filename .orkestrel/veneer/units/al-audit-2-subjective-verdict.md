# ALERT (`al`) audit round 2: subjective lane verdict (`reviewer` on Opus 5.5)

I held the subjective lane. I read the materials and ran nothing. Citation keys:
- `patch:N` is `/home/user/scaffold/.orkestrel/veneer/units/al-shared-2.patch`.
- `diff:N` is `/home/user/scaffold/.orkestrel/veneer/units/al-2.diff`.
- `report:N` is `/home/user/scaffold/.orkestrel/veneer/units/b-modal-al-report-2.md`.
- The logs are under `/home/user/scaffold/.orkestrel/veneer/units/al-instruments-2/logs/`.
- The worktree is `/home/user/veneer-al`. Its tracked files are the `c3ac297` files, because `al-2-status.txt:1-4` lists untracked files only.

## 1. Delta and scope: BROKEN (a fault in the claims file; the unit owes nothing)

**What holds:**
- `al-2-status.txt:1-4` lists the four owned files and nothing else.
- `AlertSection.ts` is blob `b7004aa` in both `al.diff:3` and `diff:336`, so it is unchanged since round 1.
- The patch touches exactly the Shared row (`apply-check.log.txt:26-38`).
- The patch adds no line to a vendored file, a sibling unit's file, `src/browser/**`, `src/core/**`, `tests/fixtures/**`, `package.json`, `README.md`, or `ROADMAP.md`.

**What breaks:** the claim presents its list of removed lines as the complete set, and the list is wrong in two ways.
- **An omission.** The patch removes the eight earlier `#### btn-close` rows (`patch:203-210`) and re-adds them realigned (`patch:211-218`). The claim does not name that realignment. Round 1 ruled it brief-authorized, and `al-audit-verdict.md:25` required round 2's claims to name the authorized removals.
- **Removals that don't exist.** The list includes "the `end` key and its readers", the dismissible paragraph, the departure bullet, the showcase sentence, the proof sentence, the plugin row, the table remarks, and the TSDoc. The patch is taken against `c3ac297`, where none of these exist, so none of them is a `-` line. They are differences between the round-1 and round-2 patches.

The patch's actual `-` lines are the M6 sentence (`patch:168-169`), the `Overlays` row (`patch:179`), the `btn-close` rows (`patch:203-210`), the `CLOSE_COPY` sentence (`patch:73`), and the `CLOSE_DEFERRED` entry (`patch:586`). Together they make up the `13 deletions(-)` at `apply-check.log.txt:15`.

**Fix:** reword the claim. The subject's scope is sound.

## 2. The mutation logs: CONFIRMED

**Every table row has a log, and every log binds to the shipped proof:**
- Every row of `report:151-165` has a log under `logs/`.
- Every `RUN` line reads `/home/user/veneer-al/tmp/probe/base` (`run.log.txt:2-78`; `loop-roles.conformance.log.txt:6`).
- Each red location matches the shipped `alert.test.ts` (shipped line = `diff` line − 81). For example, 28 is `diff:109`, 74 is `diff:155`, 153 is `diff:234`, 192 is `diff:273`, 207 is `diff:288`, and 238 is `diff:319`.

**The mutations and controls are as claimed:**
- `derive.py:6` reads the worktree's shipped partial, and `derive.py:17-35` names each edit. For example, `mutations/role-alias.scss` equals the shipped `_alert.scss` plus the `$source` line and its reads (lines 62-67).
- The eight ruled mutations are all present.
- The `control` run reads `28 passed (28)` (`run.log.txt:3`; `control.log.txt:103`).
- `loop-roles` reddens both conformance additions cases (`run.log.txt:82-84`).
- Every mutation the R19 matrix (`report:178-183`) names is a row of the table.

**Mutations and whether the assertions distinguish them:**
- `close-left` fails the `target.right` and `target.left` checks (`diff:315-316`). They separate a left-anchored control from the passing case.
- `close-plain-alert` fails the plain-alert `position: static` check (`diff:327`).
- `dismissible-literal` is caught only at density 2 (`diff:189`). At rest, `3rem` and the token resolve to the same length. The factor reading is what distinguishes it.
- `role-alias` and `role-literal` fail the retune readings (`diff:263-269`). The alias hold-apart loop (`diff:251-255`) keeps the cross-role case separable.
- `slot-literal` fails `readToken` against the token (`diff:146`).
- `literal-padding` fails the consumer-scope readings (`diff:169-172`).

## 3. The hit reading (R2): CONFIRMED

**What the case does:**
- It mounts `<span data-cover style="position: absolute; inset: 0; z-index: 1">` inside the alert (`diff:290`).
- It asserts `readHit(alert)` is the cover (`diff:303`) and `readHit(control)` is the control (`diff:304`), immediately before the `z-index` reading (`diff:305`).
- The title is at `diff:288`.
- `readHit` is imported from `@orkestrel/test/browser` (`diff:84-91`).

**Mutations:**
- `lift-sunk` (`z-index: -1`) and `lift-dropped` each fail at `alert.test.ts:223:27`, which is the `readHit(control)` line (`lift-sunk.log.txt:120-124`; `lift-dropped.log.txt:120-124`). The received value is the cover, so the reading separates a control stacked under positioned content from the passing case.
- A rival mutation, `z-index: 1`, passes the hit reading because the control follows the cover in DOM order. The `z-index` reading at `diff:305` then fails (`'1'` is not `'2'`), so together the assertions leave no gap.

**Design fit:** a level-one cover is the shape that `z-index: 2` exists to beat. The mount justifies the cover in its comment (`diff:299-302`).

## 4. Physical direction and the `right` key (7b): CONFIRMED

**The key and its readers:**
- `right: 48` sits beside `block`, `inline`, and `lift` (`patch:567-572`).
- The readers are `ALERT_DISMISSIBLE_GEOMETRY.right * 2` (`diff:189`), `const { right, block, inline, lift }` (`diff:295`), and `right / 16` (`patch:486-487`).
- `rename-first.tsc.log.txt:1-3` records TS2339 `Property 'end'` at the three reader sites.
- Proof mutation: a reader left on `end` fails the typecheck, and the log shows that it did.

**The prose, against the tree's direction vocabulary:**
- The guide reads "reserves room at the alert's right" and "against the top and right edges", followed by the physical sentence (`patch:122-126`).
- The departure bullet reads "`3rem` for the dismissible right padding" (`patch:145`).
- The partial reads "The right padding reserves the room" and "The room and the placement are physical, so they sit at the right whatever the document's writing direction." (`veneer-al/src/styles/components/_alert.scss:40-43`).
- The case title and comment write "right" and "left" (`diff:288`, `diff:309-311`).
- A search for `end`, `start`, `trailing`, and `leading` over `patch` and `diff` returns no hits.
- The physical sentence follows the tree's own form: "whatever the document's writing direction" (`guides/veneer.md:1396-1397`, `:1616`, `:1710-1712`).

## 5. The R17 sentences and the `CLOSE_COPY` shape (7a): CONFIRMED

**The sentences:**
- The guide sentence ends "…and a dismissible alert whose close control is named through its `aria-label` attribute." (`patch:152-153`). It follows the Close section's precedent (`guides/veneer.md:1595-1596`).
- `CLOSE_COPY` reads "while the control is named through its aria-label attribute" (`patch:74`) and has no backticks.
- No copy paragraph in `app/browser/constants.ts` carries a code span. Every `paragraph:` string at lines 9-1645 is plain text.

**The section proof:**
- The Close section proof is green: `section.log.txt:7`, `9 passed (9)`.
- `CloseSection.test.ts:17` compares the rendered paragraph against `CLOSE_COPY.paragraph` itself. The mutation that reddens it is a paragraph that fails to render. A wording change cannot redden it, so the proof guards rendering and says nothing about the words. The words are settled by reading them.

**No script behaviour in the delta:**
- The plugin prose names the engine as owner (`patch:137-138`, `:236-239`).
- The section comment calls the fade classes "the engine's to set" (`diff:428-429`).

## 6. The nouns and the inset comment (8a, 8b): CONFIRMED

- **Plugin row:** "the `close` method removes the `show` class … only when the alert carries the `fade` class", ending "Owner: J-ENGINE." (`patch:236`).
- **Table remarks:** "The `right` field is the alert's own right padding", "The `block` and `inline` fields are", and "the `lift` field is" (`patch:563-565`).
- **TSDoc:** "one `light` scenario and one `dark` scenario" and "No specimen carries the `fade` class or the `show` class" (`patch:42-45`).
- **Compatibility cells:** byte-equal to round 1 (`patch:227-228` against `al-shared.patch:521-522`).
- **The 8b sentence:** at `_alert.scss:40-42`. It reads correctly on the first pass.
- **Proof sentence:** ends "…and the close control's placement and its stacking over positioned content beside a control inside a plain alert." (`patch:158-159`). "Beside" means "compared with", as in the same sentence's "beside a bare heading and a bare link".

## 7. The gates and the patch check: UNRESOLVED

**What holds:**
- `gates.log.txt:1-10` shows `format`, `lint`, `check`, and `build` exiting 0.
- The scoped runs read `45 passed (45)` (`styles.log.txt:145`) and `9 passed (9)` (`section.log.txt:7`).
- The remaining gates read `19 passed (19)`, `109 passed | 1 skipped (110)`, `251 passed (251)`, and `22 passed (22)`.
- `apply-check.log.txt:16-24` shows the reverse applied, an empty status, equal trees `3e87fe08…` at `:21-22`, and `apply --check` exiting 0.
- The file list equals the Shared row (`apply-check.log.txt:26-38`).
- `worktree-scoped.log.txt:1-8` shows both scoped checks exiting 0.
- The retained patch's hunks add up to the checked stat of 280 insertions and 13 deletions (per file, for example 87 insertions in the guide).

**Not settled:**
- The claim that the retained patch's SHA-256 equals `6c32eb15…` rests on the report alone (`report:42`). A read-only lane cannot compute it.
- The claim that the gates ran after the last edit also has no evidence beyond the report: `gates.log.txt` carries no timestamps.

**What settles it:** run `sha256sum` over the retained patch, and compare the owned files' modification times against the `styles.log.txt` start time.

## 8. Law and report: CONFIRMED

**The delta:**
- The only assertion is `as const` (`diff:245`). The only `!` is `!==` (`diff:407`). Every function is a callback passed directly.
- The SCSS has no literal color and drives its roles from one `@each` (`_alert.scss:61-68`).

**Comment and guide prose:**
- Each code token is followed by a noun, or is a CSS token or value standing as its own noun.
- The bare paths in the compatibility cells are ruled given (`al-audit-verdict.md:14`).
- A search over the `+` lines of `patch` and `diff` for the substitution table's terms plus `ensure` and `guarantee` found only the code keyword `new` and a stacking-sense "above" and "below" (`diff:288`, `:301`). Both senses are permitted.

**The report:**
- It records each gate's command and result line (`report:195-207`).
- It bounds each ancillary choice (`report:243-253`) and the one brief fact it disagrees with (`report:257-262`).
- It states no prohibited count. "Both modes" (`report:183`) tallies a set, but the same row's Case cell names the members ("in light and in dark"), so it stays.

**Numbers the report states, listed for the record.** Each is a run measurement or a location:
- Owned-file line counts 69, 252, 20, and 92 (`report:39-40`).
- `13 files changed, 280 insertions(+), 13 deletions(-)` (`report:41`).
- Exit 2 and the TS2339 sites (`report:131-133`).
- `alert.test.ts:223:27` (`report:118`).
- `Tests  28 passed (28)` (`report:151`).
- The case locations and failing-assertion lines in the mutation table (`report:152-164`).
- `45 passed (45)`, `9 passed (9)`, `19 passed (19)`, `109 passed | 1 skipped (110)`, `251 passed (251)`, and `22 passed (22)` (`report:200-207`).
- Line 716 (`report:205`).
- The z-index levels "one stacking level up" and "level-one cover" (`report:107`, `:121`).

## Findings outside the claims

None to the BROKEN standard.

## Attacked and held

- **Key vocabulary:** `right` (a side) sits beside `block` and `inline` (axes). The tree uses "block inset" for vertical padding (`_form-label.scss:1`, `:21`), and the 7b ruling fixes the key name, so the mix stands.
- **"aria-label" in visible `CLOSE_COPY` text:** this is the ruled correction. The sibling copy already speaks to developers ("refused through the attribute").
- **"at the alert's right":** idiomatic, and it matches "the physical start" (`veneer.md:1396`).
- **`dismissible-literal`:** red only at density 2, because at rest the literal and the token resolve to the same length.

## Referrals

- **To the objective lane (claim 7):** compute the SHA-256 of `al-shared-2.patch` and establish that `gates.sh` ran after the last owned-file edit.
- **To the Orchestrator (retention fidelity):** rewriting the paths at retention made two report lines misstate what ran.
  - `report:142` says the runs happened from `/home/user/scaffold/.orkestrel/veneer/units/al-instruments-2/`, while `run.sh:10` sets `here=/home/user/veneer-al/tmp/units/al-instruments-2`.
  - `report:228` quotes `apply --check` with the scaffold path, while `apply-check.log.txt:23` shows `tmp/units/al-shared-2.patch`.
  - Separately, `report:4` and `report:275-276` still name `tmp/units/` launch copies.
  - Rule on whether retention rewrites a quoted transcript line.

VERDICT: FAIL 1, 7; outside the claims: none