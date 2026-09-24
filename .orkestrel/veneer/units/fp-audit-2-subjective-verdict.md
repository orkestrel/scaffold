1. **CONFIRMED — Scope.** The `fp-2-status.txt` file (lines 1–7) lists `app/browser/constants.ts`, `tests/setup.ts`, `tests/setup.test.ts`, `tests/app/browser/integration.test.ts`, and the three section proofs. Each of those files is owned under brief 1 § Scope (`b-passive-frames-brief.md:60`). The shared patch touches only `guides/veneer.md` and `tests/app/browser/index.test.ts` (`fp-shared-2.patch:1`, `:55`). No partial, `configs/**` file, vendored file, or `setupBrowser` file appears. Two additions sit outside the named tables: `BUTTON_ROLE_CLASSES`/`LIST_GROUP_ROLE_WORDS` in `constants.ts`, and `EXEMPT_SUBJECTS`/`DRIVEN_CONTRAST`/`MODE_TOKEN` in `setup.ts`. Brief 2 items 4 and 2 mandate those additions (`b-passive-frames-brief-2.md:24-26`).

2. **CONFIRMED — The pressed faces (F1).**
   - **Markup.** The hosts sit in two `d-flex flex-column … gap-2` columns inside a `btn-toolbar` (`fp-2.diff:71-86`).
   - **Proof.** The pressed case builds a lone twin of each role outside any group. It holds the host's corner radii and its `margin-top`/`margin-left` equal to that twin (`fp-2.diff:779-809`), and it refuses any overlap between host boxes (`:810-822`).
   - **Mutation.** N1 replaces the columns with `btn-group-vertical`. A vertical group zeroes the inner radii and sets a negative `margin-top`, so the corner array differs. N1 reddens at `ButtonGroupSection.test.ts:390`, the corner/margin `toStrictEqual` (`fp-mutations-2.log.txt:1-12`). The assertions tell the mutation apart from the passing case.
   - **Region law.** The law reads `/btn-(?:group|toolbar)/u` (`fp-2.diff:664`). It admits the toolbar key and nothing else beside the group key.
   - **Copy.** The copy ends "…every form a disabled button takes, and the pressed face of every role." (`fp-2.diff:35`).
   - **Frames.** `pressed-roles--light-1280.png` and `pressed-roles--dark-390.png` show each of the pressed hosts, filled and outline, as a separate button with four rounded corners and a gap on every side.

3. **CONFIRMED — The dark pressed row (claim 8).**
   - **Row selection.** The case presses `.list-group-item-action.list-group-item-danger` and hovers `.list-group-item-action.list-group-item-primary`, each selected by role class (`fp-2.diff:500-507`).
   - **Bar assertion.** It asserts `[hover, press].filter(r => r < DRIVEN_CONTRAST)` is empty (`fp-2.diff:609`). The case runs under both journey projects (`fp-2-journey-dark-390.log.txt:1`, `fp-2-journey-light-1280.log.txt:1`), which covers both modes.
   - **Mutation N3.** The press moved to the `dark` row reddens with `expected [ 1.0834694430672245 ] to strictly equal []` at `integration.test.ts:1777` (`fp-mutations-2.log.txt:27-38`). This distinguishes the unreadable row from the passing case.
   - **Mutation N8.** The bar set to 0.5 reddens the bar case at `setup.test.ts:185` (`fp-mutations-2.log.txt:92-103`).
   - **Readings.** The bar of 1.2 sits between the retained readings: 1.083 and 1.012 below it, and 1.456 through 2.116 above it (report lines 59-64). It is a constant at `tests/setup.ts:2595`, held between 1 and `CONTRAST_BAR` (`fp-2.diff:1127-1132`).
   - **Frames.** In `list-group-role-actions-active--dark-390.png` the danger row is a saturated red band against dark resting rows. In `--light-1280.png` it is a salmon band against the pale resting rows.

4. **CONFIRMED — The disabled check (F2).**
   - **Label.** The label reads `<label class="btn btn-primary" for="disabled-check">` (`fp-2.diff:67`).
   - **Proof.** The one-variant assertion is at `fp-2.diff:701-707`.
   - **Mutation.** N2 restores the outline class and reddens with `expected [ Array(2) ] to have a length of 1 but got 2` at `:290` (`fp-mutations-2.log.txt:14-25`). This distinguishes the mutation.
   - **Prose.** The TSDoc states "the two `.btn-check` selectors share the one label. The enabled host is the only host that takes a tab stop." (`fp-2.diff:50`). The case comments agree (`fp-2.diff:689-690`, `:721-722`).
   - **Frames.** `disabled-buttons--light-1280.png` and `--dark-390.png` show "Disabled check" on the same dimmed primary fill as its siblings, beside the full-strength "Enabled action".

5. **CONFIRMED — One population (F5, claim 9).**
   - **`BUTTON_ROLE_CLASSES`.** The constant is derived from `BUTTON_SPECIMENS` (`fp-2.diff:19-25`). The specimen reads it (`:77`), and so does the pointer case (`:215`).
   - **N4.** N4 reddens the cascade binding at `ButtonGroupSection.test.ts:342` (log `:40-51`).
   - **`LIST_GROUP_ROLE_WORDS`.** The three specimens map this constant (`:159`, `:163`, `:167`). The section proof holds it to the cascade order (`:906`), and N5 reddens there (log `:53-64`).
   - **`EXEMPT_SUBJECTS`.** The exemption population lives at `tests/setup.ts:2525` and is read at `fp-2.diff:1119`. N6 reddens (log `:66-77`).
   - **Second copies.** The diff holds no second literal role list in any specimen or case.

6. **CONFIRMED — The spinner (R2).** N7 adds an inline `animationPlayState = 'paused'` beside `running.pause()`. The mutated file's line 1655 carries the `resumed` assertion (line 1654 unmutated), and N7 reddens it with `expected [ …(2) ] to strictly equal [ …(2) ]` (`fp-mutations-2.log.txt:79-90`). Under N7 the play state reads `paused` against `['running']`, so the assertion distinguishes a spinner restored without its animation running.

7. **CONFIRMED — The frames.**
   - `pressed-roles--light-1280.png` and `pressed-roles--dark-390.png` show unjoined hosts, each with four rounded corners.
   - `disabled-buttons--light-1280.png` and `--dark-390.png` show the check label on the enabled host's primary fill, dimmed.
   - `list-group-role-actions-active--light-1280.png` and `--dark-390.png` show the danger row's pressed fill apart from every resting row. No other row paints hover or focus.

8. **BROKEN — Law and report.** The code law and the prose items hold:
   - No changed line adds an `as` beyond `as const` (`fp-2.diff:599`, `:1026`), a `!` assertion, a suppression, a nested declaration, or a mock.
   - The code and guide prose read "mode token".
   - The § Tests sentence matches brief 2 verbatim (`fp-shared-2.patch:48-50`).
   - Rows are named by role (`fp-2.diff:496-499`).
   - The typecheck sentence is corrected in `setup.ts` (`fp-2.diff:1214-1218`) and in the guide (`fp-shared-2.patch:37-39`).

   The report breaks the claim in two places:
   - **Paraphrased commands.** Report lines 162 and 164 give "the same command with `journey:light-1280\*`" and "the same command with `journey:dark-390\*`" instead of quoting each command. Brief 2 requires "each gate's command exactly as it ran with every argument" (`b-passive-frames-brief-2.md:42-43`), and round 1 ruled this same paraphrase broken (`fp-audit-verdict.md:29`). Fix: write each command out in full as its log records it (`fp-2-journey-light-1280.log.txt:1`, `fp-2-capture-dark-390.log.txt:2`).
   - **Temporal phrase.** Report line 179 says "The runner script records that variable itself for any run it takes from here." "From here" means "from now on". Fix: "The runner script writes that variable at the head of its log."

**Findings outside the claims**

- **F-A: the report misstates which frames changed and which runner produced the logs.**
  - **Frames.** Report line 108 lists "the disabled buttons" under **Unchanged frames**. Report line 84 cites `disabled-buttons--light-1280.png` as the frame showing the F2 change. Round 1 photographed an outline label there (`fp-audit-verdict.md:36`), and the retained frame shows `btn-primary`.
  - **Runner.** Report line 71 says "every round-2 gate ran through `fp-gate-2.sh`". That script hard-codes `cd /home/user/veneer-fp` (`fp-instruments/fp-gate-2.sh:4`). The scratch-copy gates at report lines 170-172 ran in `tmp/probe/fp-scratch`, so they cannot have run through it.
  - **Why it matters.** The Orchestrator reads the unchanged list to decide which frames need re-review, and it reads the provenance line to decide which instrument to retain.
  - **Fix.** Drop "the disabled buttons" from line 108. Scope line 71 to the worktree gates, as line 151 already does, and name the scratch-copy runner.

- **F-B: the `DRIVEN_CONTRAST` TSDoc and its case comment overclaim, and they record audit history.**
  - **Perception claim.** `tests/setup.ts:2589` says "The bar separates the fills a reader of the frame tells apart from the ones a reader cannot." The instrument is a luminance ratio (`measureContrast`, `fp-2.diff:591-598`), which reads 1.0 for a hue change at equal lightness. The bar is also a threshold chosen between two measured sets, not a perceptual boundary.
  - **Audit history.** `:2590-2591` says "the audit could not see that press in its frame". That is campaign history a reader of the code cannot check (`writing.md` § Claims and time).
  - **Case comment.** The comment at `integration.test.ts` around line 1754 ("the bar a reader of the frame tells a driven fill apart at") repeats the overclaim.
  - **Why it matters.** `documentation.md` rules prose written more confidently than the code earns a defect, and this constant is durable.
  - **Fix.** State what the bar is. It sits above the unphotographed presses (the `dark` role at 1.08 on `dark-390`, the `light` role at 1.01 on `light-1280`) and below the photographed fills (1.45 to 2.12), measured on 2026-09-24. A luminance ratio separates fills by lightness only. Reword the case comment to match.

**Referrals (to the objective lane)**

- **R-A: the gate logs' provenance.** Report lines 178-180 state that the log heads were edited by hand after the runs. The capture logs carry `env: CAPTURE=1 (set on the runner script invocation)`. The scratch logs carry a written parenthetical in their `command:` line (`fp-2-guides.log.txt:1`, `fp-2-index.log.txt:1`, `fp-2-app.log.txt:1`). The `env:` lines are inconsistent: the check, format, lint, and setup logs carry `env: CAPTURE=`, and the journey, sections, and setup-scoped logs carry none. The retained `fp-gate-2.sh` therefore doesn't match what produced every log. Rule whether this meets the retention law ("the exact executed script") and whether a log head written by hand satisfies claim 8's "opens with its command".
- **R-B: `MODE_TOKEN` in the guide.** The guide patch backticks `MODE_TOKEN` (`fp-shared-2.patch:39`), a constant in `tests/setup.ts` rather than a package export. A grep of `guides/veneer.md` finds no other backticked test-setup constant (`DRIVEN_KEYS`, `CASCADE_KEYS`, `CAPTURE_SCENARIOS`, `CONTRAST_BAR`, `CaptureScenario`, `isVariantName`). Rule the sentence against `documentation.md` § Parity, "Every backticked API in a guide resolves to a real public export". `test:guides` passed in the scratch copy (`fp-2-guides.log.txt`).

**Attacked and held**

- **Region law.** The pattern matches `btn-group-vertical` and `btn-group-sm` as substrings. That is correct, because each is a group key.
- **Column labels.** The Pressed roles TSDoc says the hosts "stand apart … rather than join in a group", while each column carries `role="group"`. The TSDoc means the `.btn-group` join, and the ARIA grouping labels the columns for a reader. This holds.
- **Literal Button names in `EXEMPT_SUBJECTS`.** The constant names the Button role subjects literally. The registry is literal by type design, and deriving the list would make the exemption proof tautological. This holds.
- **Two List group role lists.** `LIST_GROUP_ROLE_WORDS` beside `LIST_GROUP_ROLES` in `tests/setupStyles.ts` is not a duplicate the claim forbids. The section proof binds the app list to the cascade, not to the setup oracle.
- **White row on white.** In `list-group-role-actions--light-1280.png` the `light` row paints white on the white page at rest. The cascade paints it that way, and the frames that came before this unit read the same.
- **Constant names.** `BUTTON_ROLE_CLASSES` holds full class lists (`btn btn-primary`) rather than bare role classes. The name follows the `classes` field of `BUTTON_SPECIMENS`, and every consumer slices it as it needs. This holds.

VERDICT: FAIL 8; outside the claims: F-A, F-B
