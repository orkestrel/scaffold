# E-ID-MOTION-OFFCANVAS audit round 2: subjective lane verdict

**Lane:** subjective. **Role:** `reviewer`. **Engine:** Opus 5.5.

**Evidence:** I ran nothing. Where I rule on behaviour, the evidence is the retained logs in `/home/user/scaffold/.orkestrel/veneer/units/moff-instruments-2/`, the worktree source at `/home/user/veneer-moff`, and the built `dist/src/styles/index.css`. The writer's report is not evidence. Line numbers are approximate, so locate each site by the construct named beside it.

**Verdict:** FAIL on claims 1 and 4. The in-flow half of the extended responsive case names a transition leak it cannot catch. The partial's layer header still says the transition is the only value that departs from the release, but the layer also emits the panel's opacity.

## Per-claim verdicts

**1. The responsive exit: BROKEN (the case's comment names a mutation its readings cannot tell apart from the passing case).**

What holds:
- `offcanvas.test.ts:611–695` drives the whole engine sequence: `showing`+`show` join, `showing` leaves, `hiding` joins as `show` leaves, `hiding` leaves.
- It reads `[duration, easing]` through `sampleTransition` on entry and on exit, the opacity after each move, and `getAnimations()` after each removal.
- The expectation below the boundary is `moving` (the specimen's duration with `slide` and `fade`), ending at `hidden: '0'`. At and above it, every sample is `idle` and every opacity is `'1'`.
- It reads as one proof, not a patch over round 1. It uses one record per viewport and one `toEqual`, in the same shape as the placement case at lines 536–598.

**Defect.** The comment (around lines 600–606) says: "The mutations this catches are the panel's opacity or its transition written outside the rules each responsive panel carries below its boundary". It also says the in-flow panel "starts no transition". A transition written at or above the boundary is not separated by this case:
- The state rules (`$nested`) are emitted only inside `breakpoint-down` (`_offcanvas.scss:111–123`). At and above the boundary, no rule keys `showing`, `show`, or `hiding` for `.offcanvas-{name}`.
- So no class write changes the `transform` or `opacity` value, and a leaked `transition` has nothing to animate. `entering` and `leaving` stay `idle`, and the case stays green.
- The `leak` plant shows this has been observed, not only derived. With `opacity: 0` planted above the boundary, the case at 576 reads `resting: '0'`, `shown: '0'`, `hidden: '0'`, with both move lists idle and `lingering` empty (`moff-plant-leak.log.txt:66–95`). The engine's class writes change nothing in the in-flow range.
- Only a mixin-written leak is caught, and by another case: the ramp case's media-condition list (`offcanvas.test.ts:354–358`). The `transition` plant log shows that list failing.

**Per-case mutation table** (each case in the report's coverage table):

| Case | Mutation | Distinguished? |
| --- | --- | --- |
| State, `paints a panel carrying "$classes"…` (278) | `opacity: 0` dropped from `$panel` | Yes. `opacity` is keyed to `slid` (292), and the `opacity` plant fails `''`, `hiding`, and `show hiding` with an `AssertionError`. |
| Slide-and-fade, `slides the $placement panel…` (536) | Literal `0.3s ease-in-out`; fade dropped; fade on the slide curve; a bare `.offcanvas.hiding { opacity: 1 }` | Yes. Duration and curve are compared with the specimen (563–564, 585, 588). A lost exit fade fails `expect(disappearance).toBeDefined()` (582). The `literal` plant kills the first mutation. |
| Responsive, extended (611) | `.offcanvas-sm.hiding { opacity: 1 }` below `sm` | Yes. At 575 it reads `hidden: '1'`, the leaving fade `undefined`, and a `CSSTransition` in `lingering[1]` (`moff-plant-hiding-opaque.log.txt:77–97`). No other case fails. |
| Responsive, extended | `opacity: 0` written at and above the boundary | Yes. `resting: '0'` at each boundary (`moff-plant-leak.log.txt`, five `AssertionError`s). |
| Responsive, extended | The transition written at and above the boundary, or unconditioned on `.offcanvas-{name}` | **No.** No class write changes a transitioned property there, as shown earlier. The ramp case catches a mixin-written leak; I found no case that catches a bare declaration (Referral O1). |
| Factor, `doubles the running slide and fade…` (706) | Literal duration; transition written without the mixin | Yes to both. The ratio reads `1` not `2` under the `literal` plant. `expect(reduced)` fails at 754 under the `mixin` plant (`moff-plant-mixin.log.txt:86–130`). |
| Expanded bar (771) and `navbar.test.ts` row case (329) | Navbar `opacity: 1` removed | Yes. The `navbar-reset` plant fails `xs` to `xxl` and the row case. |
| Ramp (302) and bare panel (404) | Transition include removed or written bare | Yes. The media-condition lists lose their reduced-motion condition (`moff-plant-mixin.log.txt:64–73`; `transition` plant). |

**Fix, recommended.** Word the comment around lines 600–606 for what the case proves:
- Its first sentence becomes "The mutations this catches are the panel's transparent rest written outside the rules each responsive panel carries below its boundary, and a hiding panel left opaque below it."
- Replace "so it reads opaque at every step and starts no transition" with "and no rule keys the state classes there, so each class write leaves the panel opaque and starts nothing".
- The title is true of the shipped code and can stay.

**Fix, alternative.** To make the case catch a transition leak itself, add a reading that crosses the boundary upward with a resting panel and samples `transform` and `opacity`. That crossing is where a leaked transition becomes visible to a user.

**2. The plants: CONFIRMED.**
- `moff-plants-2-summary.log.txt:1–7` reads `exit=1 restored=identical` for `literal`, `opacity`, `transition`, `navbar-reset`, `hiding-opaque`, `leak`, and `mixin`.
- Every error line in every plant log is an `AssertionError`. A search for `^[A-Za-z]*Error:` returned `AssertionError` alone.
- `hiding-opaque` fails one case, the extended responsive case for `sm` at 575 (`moff-plant-hiding-opaque.log.txt:62–67, 116`).
- `mixin` is caught at the factor case's `expect(reduced)` (`moff-plant-mixin.log.txt:85–130`) and at the bare panel's media condition (64–73).
- Limit: the `mixin` plant rewrites only the bare panel's include. The script matches two tabs with `count(a)==1`, around `moff-plants-2.sh:46`. The responsive include is left alone. Its mutation would still be separated structurally, because the factor case reads `.offcanvas-xxl` at 1399 under the reduced-motion preference.

**3. The guide: CONFIRMED.**
- **Motion paragraph** (`guides/veneer.md:6149–6155`): "so each move resolves to `250ms` at a factor of `1`, in place of the release's `0.3s`, and rescales with the `--vn-factor-motion` factor".
- **Departure bullet** (6173–6175): "At a factor of `1` the slide resolves to a `250ms` duration on the `cubic-bezier(0.32, 0.72, 0, 1)` curve and the fade to a `250ms` duration on the `ease-out` curve."
- **Built cascade:** `--vn-motion-panel:calc(.25s * var(--vn-factor-motion))`, `--vn-ease-panel:cubic-bezier(.32, .72, 0, 1)`, and `--vn-ease-out:ease-out` are all present in `dist/src/styles/index.css`.
- **Placement:** each resolved value sits where the § Modal classes pattern puts it: the paragraph at 5755 and the bullet at 5786–5789. The bullet puts its condition first, as `writing.md` § Sentence and paragraph order requires. The paragraph and the bullet each state the timing once, in the modal section's split, rather than as a duplicate.
- **Voice:** no banned term appears.
- **Round-1 claim 6:** closed.

**4. The comments: BROKEN (the layer header misstates which values are the release's).**
- **Where:** `/home/user/veneer-moff/src/styles/components/_offcanvas.scss:67`, the first sentence of the header comment over `@layer components`. The unit wrote it in round 1: `moff-instruments/moff.diff:349`.
- **What is wrong:** it says "Every value here but the transition is Bootstrap 5.3.8's own." The layer also emits the panel's `opacity: 0` rest (lines 112–114 and 152–154, from `$panel`) and its `opacity: 1` shown state (from `$nested`).
  - The built cascade confirms the rest: `.offcanvas{…visibility:hidden;opacity:0;…transition:var(--bs-offcanvas-transition)…}`.
  - The release writes no panel opacity, so the guide records each opacity as an addition (`guides/veneer.md:6177`).
  - The navbar partial names its own reset as "Veneer's own" (`moff.diff:287`). The offcanvas partial never names its opacity as a departure.
- **Failing state:** a maintainer reads this header to learn where the layer departs from the release, and is told only the transition does.
- **Rival reading:** "here" could mean only values written literally inside the layer's text. The maps are declared above the layer, at lines 11–64. That reading fails on the comment's own scope: it goes on to cover the backdrop's `z-index` and opacity, which are written at line 166, outside the variable block.
- **Fix:** "Every value here but the panel's opacity and the transition is Bootstrap 5.3.8's own." Re-wrap the paragraph.

The other comment lines hold:
- Line 75's "which moves the transform alone" is true.
- The rewrapped expanded-navbar comment (`offcanvas.test.ts:761–770`) closes round-1 R3.
- The `.offcanvas .btn-close` comment at 423 predates the unit (sweep table in `e-id-motion-offcanvas-report-2.md:101`).
- The responsive comment's mutation sentence is claim 1's defect. Fix it once, under claim 1.
- The column measure is Referral O2.

**5. No regression: CONFIRMED.**
- `moff-2.diff` changes one comment line in `_offcanvas.scss` (lines 45–52) and no declaration.
- `moff-2-status.txt` names three files. `_navbar.scss` and `navbar.test.ts` are not among them.
- The partial I read matches round 1's confirmed rule set: the rest and shown opacity, the transition variable at 94–96, and both mixin includes at 115 and 155.

**6. Scope and gates: CONFIRMED.**
- The status names `guides/veneer.md`, `_offcanvas.scss`, and `offcanvas.test.ts`. All three are within brief 1's owned set.
- Each gate log opens with its command and ends `exit=0`:
  - format (`oxfmt --check` over the owned partials, tests, and guide);
  - `npm run check`;
  - `npm run lint:check`;
  - `npm run test:guides`;
  - `npm run test:policy` (109 passed, 1 skipped);
  - `npm run test:setup` (357 passed);
  - `npm run build:src`;
  - the `Offcanvas` and `Backdrop` engine proofs (75 passed);
  - `npm run test:app` (223 passed);
  - `npm run test:conformance` (45 passed).

## Round-1 referrals, ruled

- **R1: partly closed.**
  - The opacity leak is planted and caught (`leak`).
  - The transition half is not caught by the case whose comment claims it (claim 1).
- **R2: closed.** The `mixin` plant fails the factor case's reduced-motion reading with an `AssertionError`.
- **R3: closed.** The expanded-navbar comment is rewrapped (`offcanvas.test.ts:765–770`).

## Findings outside the claims

None to the BROKEN standard.

## Referrals to the objective lane

- **O1: the bare transition leak.** Plant `transition: var(--bs-offcanvas-transition);` as a bare declaration in the `breakpoint-up` block (`_offcanvas.scss` around 125–128). Rule whether any gate fails. The extended responsive case cannot fail on it. The ramp case reads only mixin-emitted media conditions. The conformance ledger might redden on the extra declaration, but I did not verify that.
- **O2: the column measure.**
  - The sweep counts a tab as 1 column. `.oxfmtrc.json` sets `useTabs: true` and `tabWidth: 2`.
  - `_offcanvas.scss:68` ("// stacking variable over … panel's `z-index`") holds 99 characters after its tab. That is 100 by the sweep and 101 at `tabWidth` 2.
  - The unit wrote that line in round 1. Rule which measure claim 4's "100 columns" binds.
- **O3: the duplicated specimen.** The specimen mount and curve split appear verbatim at `offcanvas.test.ts:539–548` and at 614–623. Rule whether `AGENTS.md` § Design laws "Export and test reusable logic" and `tests.md` require one shared helper.

## Attacked and held

- **Hiding panel below the boundary with the exit fade removed.** The `hiding-opaque` plant turns the leaving fade `undefined` and the end opacity `'1'`, and it starts a transition when `hiding` leaves. The `lingering` reading separates all three.
- **Removing `showing` after the entry.** `lingering[0]` would be non-empty if the `.showing` and `.show:not(.hiding)` values ever diverged. They share one map key (`_offcanvas.scss:57`), so empty is correct.
- **Guide redundancy.** "in place of the release's `0.3s`" followed by "The release's `transform 0.3s ease-in-out` transition moves the transform alone" mentions `0.3s` twice. The second sentence carries a separate fact, that the release does not fade, so it holds.
- **Adjacent naming, not a defect.** In the placement case, `shown` and `hidden` are midpoint numbers (569, 589). In the responsive case, the same names hold settled opacity strings (642, 652). Two adjacent cases use one word for two readings. The names are test locals, so this is noted only.
- **The proof paragraph** (`guides/veneer.md:6203–6213`): "each responsive panel's opacity and motion on both sides of its breakpoint" covers the extended case and stays true.

VERDICT: FAIL 1, 4; outside the claims: none
