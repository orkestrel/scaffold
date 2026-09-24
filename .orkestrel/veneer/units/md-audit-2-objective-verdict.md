1. **CONFIRMED — Scope and delta.** The scope-expansion attack failed. Live status matches [md-2-status.txt:1](/home/user/scaffold/.orkestrel/veneer/units/md-2-status.txt:1), and the retained owned-file payloads match the worktree byte for byte. `git diff --exit-code 2a3f223 --` and `git apply --check /home/user/scaffold/.orkestrel/veneer/units/md-shared-2.patch` each exited 0. This checks applicability against base-identical tracked files without creating an extract.

   Reconstructing the patches in memory confirmed that the shared delta touches only the paths claim 1 names. After collapsing table padding, the guide changes only the M2–M4 sentences. The owned delta consists of the M2 shadow comment, the M5 comments, and the M6 fixture move. The section implementation is unchanged. See [md-shared-interdiff.txt:1](/home/user/scaffold/.orkestrel/veneer/units/md-instruments/md-shared-interdiff.txt:1).

2. **CONFIRMED — M1 names and proof.** The stale-name attack failed against the reconstructed constants, capture subjects, scenarios, and guide. The directed names and scenarios agree; see [md-shared-2.patch:88](/home/user/scaffold/.orkestrel/veneer/units/md-shared-2.patch:88), [subject declarations:935](/home/user/scaffold/.orkestrel/veneer/units/md-shared-2.patch:935), and [registration rows:1007](/home/user/scaffold/.orkestrel/veneer/units/md-shared-2.patch:1007).

   I read [md-mutations-2.log.txt:30](/home/user/scaffold/.orkestrel/veneer/units/md-instruments/md-mutations-2.log.txt:30). Restoring the undirected specimen names in the constants alone fails the reported section case. **The assertion distinguishes that mutation:** [ModalSection.test.ts:69](/home/user/veneer-md/tests/app/browser/sections/ModalSection.test.ts:69) requires a matching registration for each specimen; the renamed registry no longer matches the mutated names. This proves agreement with the registry, not an independent spelling constraint on coordinated edits to every name source.

3. **BROKEN — M3 overstates the toggle trigger’s effects.** The [plugin row:742](/home/user/scaffold/.orkestrel/veneer/units/md-shared-2.patch:742) says the trigger “hides any other shown dialog first.” Consider a shown modal whose `hide.bs.modal` listener prevents cancellation, followed by activation of a trigger targeting another modal. [modal.js:359](/home/user/veneer-md/node_modules/bootstrap/js/src/modal.js:359) calls the existing instance’s hide method, but [modal.js:128](/home/user/veneer-md/node_modules/bootstrap/js/src/modal.js:128) returns when that event is prevented. The handler nevertheless invokes the target’s toggle method. The existing dialog does not hide first.

   The unconditional “toggles the dialog it names” wording also fails for an already-shown target without the fade class. The data handler hides that same target before invoking its toggle method. Hiding completes synchronously through [util/index.js:229](/home/user/veneer-md/node_modules/bootstrap/js/src/util/index.js:229), leaving the toggle method to show it again. These are source-derived counterexamples; this lane ran no browser.

   Smallest fix: describe the actual calls and their cancellation semantics: the handler calls hide on the matched shown modal, then invokes toggle on its target. Do not promise an unconditional visibility change.

   The remaining inspected clauses hold against the installed source: dismiss target resolution; defaults; methods; event names; keyboard and static-feedback branches; attribute changes; body class; conditional backdrop animation; conditional focus trapping; and scroll locking. The inline display property becomes `none` on hide—it is not removed. The M2 variable qualification and shadow comment also hold, and the fade-alone sentence carries the prescribed wording. See [component-functions.js:12](/home/user/veneer-md/node_modules/bootstrap/js/src/util/component-functions.js:12), [modal.js:158](/home/user/veneer-md/node_modules/bootstrap/js/src/modal.js:158), [modal.js:245](/home/user/veneer-md/node_modules/bootstrap/js/src/modal.js:245), and [_modal.scss:180](/home/user/veneer-md/src/styles/components/_modal.scss:180).

4. **BROKEN — M4 still omits the offcanvas backdrop exception.** The [patch:287](/home/user/scaffold/.orkestrel/veneer/units/md-shared-2.patch:287) carries the prescribed sentence, but that sentence remains false. The stacking table includes the drawer-backdrop rung. Bootstrap’s [_offcanvas.scss:119](/home/user/veneer-md/node_modules/bootstrap/scss/_offcanvas.scss:119) passes its Sass stacking value directly to the backdrop mixin. The shipped [bootstrap.css:6737](/home/user/veneer-md/node_modules/bootstrap/dist/css/bootstrap.css:6737) consequently writes `z-index: 1040`, with no component stacking custom property.

   Smallest fix: identify the offcanvas backdrop alongside the fixed and sticky levels as a direct declaration, while distinguishing its component rule from the position helpers. Keep the custom-property description for dropdown, offcanvas panel, modal, modal backdrop, popover, tooltip, and toast. The fixed and sticky correction itself is accurate. The Orchestrator’s quoted replacement is not sufficient.

5. **BROKEN — M5 leaves positional references in added prose.** The named M5 replacements are present, but the broader sweep claim fails. The patch still says “Below the **first boundary**” in [MODAL_SIZE_CASES documentation:1321](/home/user/scaffold/.orkestrel/veneer/units/md-shared-2.patch:1321), and “the **first cap**” in [the binding proof’s comment:1133](/home/user/scaffold/.orkestrel/veneer/units/md-shared-2.patch:1133). These identify members of the boundary/cap population by position, contrary to [AGENTS.md:173](/home/user/scaffold/AGENTS.md:173).

   Smallest fix: name the small boundary and the cap at that boundary. The named fade/show pair, per-name “once each” wording, and fictional cargo strings do not establish this defect. The revised at-rest wording also removes the reported ambiguity with static feedback.

6. **CONFIRMED — M6 relocation, fill, and mutations.** The incomplete-move attack failed. The shared markup is byte-identical to the removed fixture string, has its own documentation, appears in the export-key assertion, and replaces every former fixture reference. See [md-shared-2.patch:1081](/home/user/scaffold/.orkestrel/veneer/units/md-shared-2.patch:1081), [markup declaration:1379](/home/user/scaffold/.orkestrel/veneer/units/md-shared-2.patch:1379), and [modal.test.ts:22](/home/user/veneer-md/tests/src/styles/components/modal.test.ts:22).

   I read the following retained entries and matched them to the checks:

   | Mutation | Do the checks distinguish it? | Evidence |
   |---|---|---|
   | Fill declaration dropped | **Yes.** Exact declaration membership requires the background-colour declaration; the resolved fill also must match teal. | [Mutation log:1](/home/user/scaffold/.orkestrel/veneer/units/md-instruments/md-mutations-2.log.txt:1), [assertions:1426](/home/user/scaffold/.orkestrel/veneer/units/md-shared-2.patch:1426) |
   | Placement declaration dropped | **Yes.** Exact declaration membership requires the left declaration independently of any coincidentally matching geometry. | [Mutation log:6](/home/user/scaffold/.orkestrel/veneer/units/md-instruments/md-mutations-2.log.txt:6) |
   | Black token passed instead of teal | **Yes.** The expected colour still resolves from the teal root token. | [Mutation log:11](/home/user/scaffold/.orkestrel/veneer/units/md-instruments/md-mutations-2.log.txt:11), [colour assertion:1458](/home/user/scaffold/.orkestrel/veneer/units/md-shared-2.patch:1458) |
   | Shared markup loses its footer | **Yes.** The density, layout, colour, and fullscreen cases require the footer before reading its properties. These are collected-case failures, not import failures. | [Mutation log:16](/home/user/scaffold/.orkestrel/veneer/units/md-instruments/md-mutations-2.log.txt:16), [footer requirement:149](/home/user/veneer-md/tests/src/styles/components/modal.test.ts:149) |

   The retained passing control is [md-gates-2/styles.log.txt:215](/home/user/scaffold/.orkestrel/veneer/units/md-instruments/md-gates-2/styles.log.txt:215).

7. **CONFIRMED — The round-1 confirmations survive.** The regression-through-repair attack failed. The stylesheet changes only in a comment; the markup relocation preserves its bytes; the name changes preserve registry agreement; and the mixin, close partition, inventory bindings, and registration order retain their accepted implementations.

   I read [md-mutations.log.txt:1](/home/user/scaffold/.orkestrel/veneer/units/md-instruments/md-mutations.log.txt:1) and [md-failfirst.log.txt:1](/home/user/scaffold/.orkestrel/veneer/units/md-instruments/md-failfirst.log.txt:1). The retained mutations remain distinguished by the following checks:

   - Literal dialog and backdrop rungs: wrapper retuning must change their resolved levels.
   - Dropped mixin show block: selector membership and shown opacity change.
   - Dropped mixin placement declaration: declaration membership changes.
   - Large or small boundary moved to medium: the cap and margin readings straddle the declared boundaries.
   - Fullscreen ramp gated upward: geometry must fill below the boundary and stop filling at it.
   - Dropped centered alignment: content and modal centres must coincide.
   - Dropped scrollable height: dialog height and body overflow must retain their relationship.
   - Transition written without the mixin: reduced-motion duration and media membership must change.
   - Dropped static rule: static and settled transforms must differ.
   - Close combinator broadened to the modal: the body control must retain its ordinary margins.
   - Literal content colour: the theme-specific alias comparisons distinguish it.
   - Literal density inset: the rescaled geometry distinguishes it.
   - Dropped display stand-in: required classes and resolved display distinguish it.
   - Added modality: attribute absence and the accessibility-resolver control distinguish it.
   - Backdrop added everywhere: specimen-specific sibling and descendant checks distinguish it.
   - Added engine body class: explicit absence checks distinguish it.
   - Removed frame: frame membership and clipping checks distinguish it.
   - Removed close label: explicit label and accessible-name checks distinguish it.
   - Shortened scrollable body: scroll height must exceed client height.

   These assertions remain in [modal.test.ts:99](/home/user/veneer-md/tests/src/styles/components/modal.test.ts:99) and [ModalSection.test.ts:93](/home/user/veneer-md/tests/app/browser/sections/ModalSection.test.ts:93). Removing the barrel inclusion produces meaningful assertion failures. Removing the entire mixin instead prevents import; that retained run does **not** prove assertion adequacy.

8. **BROKEN — Report requirements remain unmet.** The prohibited-syntax attack found no added any type, forbidden assertion, suppression, mock, spy, fake, or prohibited nested function. The report nevertheless repeats placeholder arguments under “Command, as it ran”: [report:209](/home/user/scaffold/.orkestrel/veneer/units/b-modal-md-report-2.md:209) uses `<every touched file>` and `<every touched .ts file>`. The actual arguments are available in [oxfmt.log.txt:1](/home/user/scaffold/.orkestrel/veneer/units/md-instruments/md-gates-2/oxfmt.log.txt:1) and [oxlint.log.txt:1](/home/user/scaffold/.orkestrel/veneer/units/md-instruments/md-gates-2/oxlint.log.txt:1). Copy those commands into the report.

   The report also claims that the proofs name no specimen by a literal string at [report:28](/home/user/scaffold/.orkestrel/veneer/units/b-modal-md-report-2.md:28). The section proof explicitly names the shown and scrollable specimens at [ModalSection.test.ts:128](/home/user/veneer-md/tests/app/browser/sections/ModalSection.test.ts:128) and [ModalSection.test.ts:224](/home/user/veneer-md/tests/app/browser/sections/ModalSection.test.ts:224). Restrict the statement to the fullscreen ramp names. Bare code tokens in prose, including the opening report paragraph, also leave the requested writing sweep incomplete.

   The retained gate logs support the reported scoped results. I read the formatter, linter, build, check, styles, section, showcase, setup, conformance, guides, and policy logs under `md-gates-2/`, their [summary:1](/home/user/scaffold/.orkestrel/veneer/units/md-instruments/md-gates-2.txt:1), and the worktree formatter/linter logs. This is retained-run evidence, not a fresh gate execution.

   **Outside-claims count record — REPORT-COUNTS.** The report states the following counts; quoted corrections, fixture text, and attributed run measurements are distinguished from current prose claims:

   - Line 9: withdrawn “written twice.”
   - Lines 131–148: quoted “several … twice,” “two boundaries,” “one source list,” “one list,” “both stylesheets,” “two properties,” and “two readings”; the per-name “once” wording also appears.
   - Lines 151–154: the named pair, “once each,” and fixture quotations containing “two barges” and “counted twice.”
   - Lines 192–194: `1 failed | 10 passed (11)` for each named fill/placement mutation.
   - Line 195: `10 failed | 19 passed (29)`.
   - Line 196: `1 failed | 5 passed (6)`.
   - Lines 213–219: `57 passed (57)`, `6 passed (6)`, `5 passed (5)`, `146 passed (146)`, `22 passed (22)`, `19 passed (19)`, and `109 passed | 1 skipped (110)`.
   - Line 234: `16 files changed, 916 insertions(+), 223 deletions(-)`. An independent `git apply --stat` reading reproduced this measurement.

   These count records supply no additional substantiated defect outside the numbered claims.

**Attacked and held:** The unsuffixed fullscreen specimen correctly keeps its undirected name because it applies at every width. The specialised modal fixtures correctly retain their own markup where they never used the moved constant. The fullscreen rule-set consolidation remains assigned to RAMP-DOWN; this round does not reopen that accepted boundary.

VERDICT: FAIL 3, 4, 5, 8; outside the claims: none