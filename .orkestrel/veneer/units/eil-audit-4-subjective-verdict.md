LANE: eil-audit-4-reviewer

Lane held: subjective (`reviewer` on Opus 5.5). This lane read files only and ran nothing. Every reading below comes from the supplied logs and the worktree files. Opus 5.5 wrote the work under audit, so this lane attacked it on that footing.

## Numbered verdicts

**1. Block figure — CONFIRMED.**
- `/home/user/veneer-eil/src/styles/elements/_figure.scss:4-6` writes only `margin: 0` on `figure`. Lines 7-8 keep `margin-top: var(--vn-space-4)` on `figcaption`.
- The compiled cascade `/home/user/veneer-eil/dist/src/styles/index.css` carries `figure{margin:0}` and `figcaption{margin-top:var(--vn-space-4);…}`, and no figure `display` or `flex-direction`.
- In `/home/user/veneer-eil/guides/veneer.md`, a search for a `figure {`, `figcaption`, or figure display, flex-direction, or gap row returns only the `figcaption` selector row (around line 9923). The `figure { display }`, `figure { flex-direction }`, and `figure { gap }` rows are gone.
- That `figcaption` row's sentence ("spaces a figure caption from the content before it…") matches the shipped `margin-top`.

**2. Placement proof — BROKEN (title clause).**
- **Mutation and whether it is distinguished.** The mutation is `display: flex; flex-direction: column` restored on `figure` (`eil-4-mutate.py:13-15`). The `figure.height ≈ 50` assertion (`figure.test.ts:72`) distinguishes it: the flex figure reads 66 against 50 for every holder (`eil-4-mutation-restored-flex.log.txt:77-79, 146-149`).
- The second assertion, `next.top - figure.top ≈ 66` (line 73), does not distinguish the flex mutation. The flex figure also reads 66, because Veneer's figure margin is 0. That assertion is load-bearing for a different mutation, a lost `.blockquote-footer` end margin, which would read 50.
- The reddening and distinguishing clauses therefore hold.
- **The title does not state what the proof proves.** The rendered title is `ends the figure at the footer edge and starts the next block 16px later inside 'a centered figure'` (`eil-4-mutation-restored-flex.log.txt:78`).
  - The `$holder` value names the figure under test, so the title names the figure twice ("ends the figure … inside a centered figure").
  - The title also places the next block inside the figure. The fixture (`figure.test.ts:65`) mounts `<p>Following words.</p>` as the figure's sibling, outside it.
  - The suffix was carried over from the sibling case (`figure.test.ts:42`), where it fits, because the footer and the quotation do sit inside the figure.
- **Smallest fix.** At `/home/user/veneer-eil/tests/src/styles/elements/figure.test.ts:62`, retitle the case `ends $holder at the footer edge and starts the next block 16px after it`. That renders as "ends a centered figure at the footer edge…". Keep the assertions unchanged.

**3. Parity readings — CONFIRMED.**
- **Fixed-geometry parity.** In `eil-4-probe.log.txt:193-258`, both cascades read figure `h=50.00` and following `p y=66.00`. This holds for the bare, `.text-center`, and `.text-end` holders at both 390 and 1280 pixels.
- **Control.** In `eil-4-probe-control.log.txt:67-132`, the flex figure reads `h=66.00` against Bootstrap's 50.
- **Cells round 3 left out, now read:**
  - `dl.row` at 390: lines 45-57.
  - `.text-center` at 1280: lines 160-170 and 226-236.
  - `.text-end` at 1280: lines 182-192 and 248-258.
- **Mutation and whether it is distinguished.** The mutation is the flex control. The figure-height reading distinguishes it. The following-`p` reading does not: the control reads `p y=66.00` (control log line 72), the same as block flow. The control therefore certifies the height reading only. The claim's "reads different" holds on the figure height, and that bound is referred to the objective lane (referral R1).

**4. Title and matrices — CONFIRMED.**
- `/home/user/veneer-eil/tests/src/styles/components/image.test.ts:73` carries the title verbatim. Its assertions (lines 84-89) read the 8px caption space (`text.top - picture.bottom`) and the shrink (`box.width < 320`). The title matches those assertions.
- `FIGURE_QUOTATION_CASES` sits at `/home/user/veneer-eil/tests/setupStyles.ts:1578` and `FIGURE_IMAGE_CASES` at line 1592. Each has a TSDoc block (lines 1569-1577 and 1584-1591).
- Both constants are in the export inventory at `/home/user/veneer-eil/tests/setupStyles.test.ts:396-397`.
- `figure.test.ts` imports every matrix it iterates (lines 5-10, 41, 61, 81). The only other iterated data is the imported `TEXT_MODES`, and the file declares no case table.
- The truth of the image matrix's contents is outside this claim. It is filed as finding F1.

**5. Scope and law — CONFIRMED.**
- **Scope.** `eil-4-status.txt` lists these files:
  - The round-1 owned files: `_dl.scss`, `_figure.scss`, `dl.test.ts`, `blockquote.test.ts`, `figure.test.ts`, and `quote.test.ts`.
  - The round-2 file: `TypeSection.test.ts`.
  - The round-3 files: `_quote.scss`, `_image.scss`, and `image.test.ts`.
  - The round-4 file: `setupStyles.test.ts`.
  - The shared files: `guides/veneer.md`, `tests/setupStyles.ts`, and `app/browser/constants.ts`.

  No file falls outside those grants.
- **Selectors.**
  - `_dl.scss` selects `dl`, `dt`, and `dd`.
  - `_figure.scss` selects `figure` and `figcaption`.
  - `_blockquote.scss` selects `blockquote`.
  - `_image.scss` selects class selectors only.
  - `_quote.scss` selects class selectors plus `.blockquote > :last-child`. That rule is class-scoped and unchanged context in the diff. It reads no tag context and no `[class]` presence test.
- **Diff law.** The diff adds no `any`, no `as` cast in TypeScript, no `!`, and no suppression. Its only functions are anonymous callbacks passed directly as arguments (`dl.test.ts` `forEach` and `map`, the `visitBreakpoint` callback), and it adds no unexported helper.

## Findings outside the claims

**F1 — The `d-block` captioned-image holder names a change that no longer happens, and it proves nothing the bare holder does not.**
- **Where.** `/home/user/veneer-eil/tests/setupStyles.ts:1594-1597` (holder `'a figure a display utility turns to block'`, attribute `' class="d-block"'`) and its TSDoc remark at lines 1588-1590 ("whether the tag's flow or a utility's decides it").
- **What is wrong.** Round 4 returned the `figure` tag to block flow, so `.d-block` now writes the display the tag already has.
  - The probe reads `display=block` on both the bare figure and the `d-block` figure, with an identical caption at `y=88.00` (`eil-4-probe.log.txt:260-262` against `274-276`, and `267-269` against `281-283`).
  - Across the round's mutation table, the two holders never separate. Both redden under `no-caption-margin` (`eil-4-mutation-no-caption-margin.log.txt:77-78`). Both stay green under `restored-flex`, where only the calibrated and quotation cases fail (`eil-4-mutation-restored-flex.log.txt:74-79`).
  - The name ("turns to block") and the remark (two flows deciding) describe the flex figure one revision ago. That is drift in a shared, exported constant.
- **Why it matters.**
  - The row exists to prove the tenet "Preserve direct control through classes": the caption space must hold when a class chooses the figure's flow.
  - With the tag already block, no class chooses anything. The row adds a case that cannot fail on its own, under a name that misstates the fixture.
- **What right looks like.** Replace the row with a holder whose utilities write a different flow, for example `Object.freeze({ holder: 'a figure the flex utilities turn to a column', attribute: ' class="d-flex flex-column"' })`. That is the Elements column a consumer can still opt into. Rewrite the remark to state that the caption keeps its 8px space whether block flow or a class-chosen flex column lays the figure out. Keep `spaces the caption 8px under its image inside $holder` unchanged.

## Referrals

- **R1 (to the objective lane) — control coverage of the probe's following-`p` reading.**
  - The flex control reads `p y=66.00` (`eil-4-probe-control.log.txt:72, 83`), the same value block flow gives. The report states the same (`e-id-layout-report-4.md:73-76`).
  - Rule whether claim 3's parity reading of the `p` is certified by any control, or only the figure height is.
  - Addendum 3's reason concerns the `p` position once `figure` takes its reboot margin, and no run in the round measures that.
- **R2 (to the objective lane) — the restore check in `eil-4-mutate.py` cannot fail.**
  - Line 32 copies `BACKUP` over the target, and line 33 compares `BACKUP` with that fresh copy.
  - The "byte-identical restore: True" line in every mutation log is therefore true by construction. It is not evidence that the working tree matched its pre-mutation state.
- **R3 (to the Orchestrator) — a dangling citation.**
  - `/home/user/veneer-eil/tests/src/styles/elements/figure.test.ts:17` says the readings "come from calibration-content.md". That path resolves nowhere in the worktree: the only match for `calibration-content` is this line.
  - The comment is unchanged from `ca83afb` and lies outside the diff hunks. Round 4 added `display: block` and caption-margin readings under it.
  - The comment needs a carrier.
- **R4 (to the Orchestrator) — a wrong path in the report.**
  - The report cites the status at `eil-instruments/r4/eil-4-status.txt` (`e-id-layout-report-4.md:194`). No such file exists; the retained status is `/home/user/scaffold/.orkestrel/veneer/units/eil-4-status.txt`.
  - Report prose is not a claim subject, so this is recorded for retention only.

## Attacked and held

- **Claim 2, the absolute height.** Attack: the proof reads the figure height as an absolute 50 rather than figure bottom against footer bottom, so it might fail to prove "at the footer edge". The attack failed. Under the fixed geometry, the sibling case pins the footer top to the quotation bottom (`figure.test.ts:49-52`). Any footer shift reddens the absolute reading rather than passing it. The strictness can only produce a false red, never a false green.
- **Claim 2, the comment at `figure.test.ts:56-60`.** The sentence "where the release's own figure margin puts it" is true against the probe. Bootstrap collapses its figure margin with the footer's margin to put the `p` at 66 (`eil-4-probe.log.txt:199-203`), and Veneer reaches 66 through the footer margin alone.
- **Claim 4, the rewritten comment at `image.test.ts:57-58`.** The sentence "The figure tag stays a block…" matches the shipped tag rule and the `inline-block` class reading.
- **Adjacent behavior that looks like a defect and is correct.**
  - The `.figure` width, 148.44 against Bootstrap's 169.64 (`eil-4-probe.log.txt:288-293`), follows Veneer's caption type. It is recorded as a typography departure, as brief 4 directs.
  - The attributed quotation's natural-text figure, 47.14 against 51, follows the footer's line height. The layout relation, figure end at the footer edge and the `p` 16px below it, holds in both cascades.

VERDICT: FAIL 2; outside the claims: F1
