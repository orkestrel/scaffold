# bpb audit, subjective lane (`reviewer` on Opus 5.5) — verdict

Brief: `units/bpb-audit-reviewer-brief.md`. Claims: `units/bpb-audit-claims.md`.

Lane held: **subjective** (shape, naming, comment and guide voice, design fit), by `reviewer` on Opus 5.5. The same engine wrote the unit, so I attacked it harder than usual. I read the diff, the status, the brief, the report, and the worktree `/home/user/veneer-bpb`. I ran nothing.

**Result:** every numbered claim held, but the round fails on two findings outside the claims. F1 is a guide sentence and a source comment that the diff made false. F2 is a row-order break in § Additions.

## Numbered verdicts

1. **CONFIRMED.** I looked for a file or hunk outside the granted regions and found none.
   - `bpb.diff` touches only the five named files.
   - The guide hunks land only in the pagination focus paragraph (`guides/veneer.md:840-844`), the close state paragraph (`:1642-1648`), and the two rows after `form-range` (`:3634-3635`).
   - `bpb-status.txt:1-5` lists the same five files. No off-limits path appears.

2. **CONFIRMED.** I checked for a dropped declaration, a misplaced include, or extra emitted CSS.
   - `_pagination.scss:75-82` keeps `z-index`, `color`, `background-color`, `outline: 0`, and `box-shadow`, and ends with the include at `:81`.
   - `_close.scss:40-45` keeps `outline`, `box-shadow`, and `opacity`, and ends with the include at `:44`.
   - `_close.scss:1-2` is `@use '../mixins' as *;` followed by a blank line. That is the form of `_pagination.scss:1-2` and `.claude/rules/styles.md:23`.
   - The Sass delta is exactly those two includes plus a `@use` of a module the cascade already loads. `forced-ring` (`_mixins.scss:188-193`) emits one `outline` declaration inside `@media (forced-colors: active)`.
   - I derived this from source and did not compile it (see Referral R1).

3. **CONFIRMED.**
   - **Mutation:** delete `@include forced-ring;` from either rule. The components-layer `outline: 0` then stands under forced colors and `outline-style` reads `none`. `toBe('solid')` at `pagination.test.ts:199` and `close.test.ts:143` separates that mutation from the passing case.
   - **Width mutation:** changing the width argument is caught by the gauge equality at `:200` and `:144`.
   - **Corroboration:** the on-disk red log `tmp/units/bpb-red.log.txt:75-76,91-92,109` shows both cases failing at `expected 'none' to be 'solid'`, `2 failed | 32 passed (34)`. The green log `bpb-green.log.txt:75` shows `34 passed`. The writer produced both logs; this lane did not re-run them.
   - **Shape:**
     - The gauge goes into the host `<div>` that each file's mount helper creates through `scene.mount` (`tests/setupBrowser.ts:1178`, `:1647`), so `scene.clear` removes it and the component markup keeps one source.
     - Focus is reached the way each file's focus case reaches it (`pagination.test.ts:163-165`, `close.test.ts:115-116`).
     - The comment clause matches the precedent verbatim.
     - `close.test.ts:29` releases the media in `afterEach`, the same way `pagination.test.ts:35` does.
     - Each title mirrors the `form-select` precedent and names the behavior, not a control label.
     - No helper was added.

4. **CONFIRMED.**
   - Both sentences match criterion 4 word for word, including the pagination clause "the focused page's rule" and the close clause "the focused control's rule".
   - Placing the close sentence right after the focus sentence it qualifies (`:1644-1646`) reads better than the paragraph end, which is about `disabled`.
   - The key `btn-close` is the key the ledger measures: the tokenization rows at `guides/veneer.md:3316-3321` use it. The conformance log `bpb-conformance.log.txt:11` reads `21 passed (21)`. The recorded deviation is correct.

5. **CONFIRMED.**
   - The new guide sentences and test comments state no count and use no unconditionally banned term.
   - `forced-ring` is followed by the noun `mixin`.
   - `!(link instanceof HTMLElement)` is a logical negation, not a non-null assertion.
   - No `as`, `any`, suppression, mock, or nested function was added.
   - Each include sits inside its rule, and no literal was added.

6. **CONFIRMED.**
   - The report's diff summary, placement choice, deviation, guide text, and measurements agree with the diff.
   - Every log it cites exists under `/home/user/veneer-bpb/tmp/units/`.
   - The result lines it quotes match those logs.

## Findings outside the claims

**F1 — The pagination family still claims every value is Bootstrap's, and the diff made that false.**
- **Where:**
  - `guides/veneer.md:825` says "Every value the family paints is Bootstrap 5.3.8's own."
  - `src/styles/components/_pagination.scss:11` says "Every value here is Bootstrap 5.3.8's own."
- **What is wrong:**
  - After `_pagination.scss:81`, the family paints `outline: var(--vn-focus-width) solid var(--vn-focus-highlight)` under forced colors. Bootstrap 5.3.8 writes no such value and runs no forced-colors query.
  - The same guide section contradicts line 825 at `:842-844`, where it says § Additions records the outline. § Additions records only names the release lacks.
  - The rule in `_pagination.scss` has no local comment explaining the include. Every precedent include does: `_form-select.scss:53-54`, `_form-control.scss:54-55`, `_form-check.scss:74-75`, and `_form-range.scss:23-24` each say "Forced colors paint no shadow, so the control takes the button's system-highlight outline there." `_close.scss:40-44` has the same gap.
- **Why it matters:** the guide contradicts itself within one section, and the partial's header is false about the file it heads. The precedent partials never made this claim, so they were not affected. Only this family carries it.
- **What right looks like:**
  - Qualify the universal claim at both sites, for example "Every value the family paints is Bootstrap 5.3.8's own, apart from the forced-colors focus outline § Additions records."
  - Add the precedent's rule-local comment above `.page-link:focus` and above `.btn-close:focus`, for example "Forced colors paint no shadow, so the link takes the button's system-highlight outline there."
  - Scope note: `guides/veneer.md:825` was off-limits under the brief's § Scope, so the carrier needs that line granted. `_pagination.scss:11` and both rule comments were inside this unit's owned files.

**F2 — The two new § Additions rows break the table's load order.**
- **Where:** `guides/veneer.md:3634-3635`.
- **What is wrong:** every other row group in § Additions follows `src/styles/index.scss` load order:
  - `reboot`, then `btn` (`index.scss:43`);
  - `h1`–`h6`, the type partial (`index.scss:44`);
  - `table` (`index.scss:51`);
  - `form-control` through `form-range` (`index.scss:55-58`).

  The guide sections follow the same order (pagination at `:819`, close at `:1626`), and so does the tokenization table (pagination at `:3212`, `btn-close` at `:3316`). The new rows put `btn-close` (`index.scss:71`) before `pagination` (`index.scss:62`).
- **Why it matters:** a reader scanning the table by partial finds the pair out of place. The conformance equality ignores order, so no gate reports it.
- **What right looks like:** swap the two lines so that the `pagination` row comes before the `btn-close` row. No cell changes.

## Attacked and held

- **Pagination proof paragraph:** `guides/veneer.md:863-867` lists what the proof reads and omits the forced outline, while the forms proof paragraphs list theirs (`:814`, `:1085`, `:1165`, `:1255`). This is not a defect: at `a56ca7e` the list already left out the components-layer reading and the mode repaint, so it never claimed to be complete. The carrier for F1 can add the outline.
- **Unfocused link under forced colors:** no case reads the resting link with forced colors staged. This matches the `form-select` precedent and no claim makes it.
- **Gauge string:** both new cases write the literal `--vn-focus-width`. Both files already import `TOKEN_NAMES`, and `form-check`, `form-range`, and `form-control` write `var(${TOKEN_NAMES.focus.width})`. The `form-select` precedent the brief named uses the literal, so this is consistent with the precedent and not a defect.
- **Repeated gauge snippet:** the snippet repeats across the component proofs (see `grep focus-gauge tests/`). That duplication existed before this unit and is outside its scope.

## Referrals

- **R1 (objective lane):**
  - Compile `src/styles/index.scss` at `a56ca7e` and in the worktree to confirm that the only CSS difference is the two forced-colors blocks.
  - Re-run the red/green mutation independently rather than relying on the writer's logs.
- **R2 (objective lane):** the report measures the control's `outline-color` as `rgba(5, 0, 73, 0.8)` under staged forced colors. That is not a system-color value. Check whether `stageMedia({ forced: true })` applies full forced-color adjustment to `outline-color`. The proofs never read color, so this bears on what the staging covers, not on this diff.
- **R3 (Orchestrator, checker lane):** `.orkestrel/veneer/units/b-passive-close-b-report.md` states counts: "There is one recorded deviation", "There is one positional choice", "the two cases", and "the two sentences". `.claude/rules/writing.md` governs reports, and `AGENTS.md` § Writing bans counts. This is a mechanical conformance question, not a product defect.
- **R4 (Orchestrator):** the brief's § Scope left out `guides/veneer.md:825`, even though the change falsifies it. Grant that line, `_pagination.scss:11`, and the two rule comments to the F1 carrier.

VERDICT: FAIL none; outside the claims: F1, F2
