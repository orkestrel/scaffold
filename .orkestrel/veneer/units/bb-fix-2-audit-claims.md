# B-PASSIVE-B round 2 — audit claims

Subject: the fix round `opus` wrote in `/home/user/veneer-bb` from
`/home/user/veneer-bb/tmp/units/b-passive-b-brief-2.md` over the round-1 verdicts
(`/home/user/veneer-bb/tmp/units/bb-audit-analyst-verdict.md`, `FAIL 1, 3, 4, 5, 6, 7, 9; outside
the claims: F-DROPDOWN, F-WIDE`; `bb-audit-reviewer-verdict.md`, `FAIL 1, 3, 5, 9; outside the
claims: F1 to F6`). Evidence: `/home/user/scaffold/tmp/audit/bb-fix-2.diff` (the whole diff
against `3a9202a`, untracked files as additions; the round-1 writes are inside it),
`bb-fix-2-status.txt`, and the round's report `/home/user/scaffold/tmp/audit/bb-report-2.md`, whose
corrected coverage matrix is part of the subject. The frames sit under
`/home/user/veneer-bb/tmp/capture/states/`. The design is
`/home/user/veneer-bb/tmp/units/b-passive-design-verdict.md`; D15's amendment is
`/home/user/veneer-bb/tmp/units/b-sweep-design-verdict.md` § Amendment; D18 and D20 are recorded in
the brief. Rule each claim CONFIRMED, BROKEN, or UNRESOLVED with `file:line`; rule a claim about a
proof on the mutation named and whether the assertions distinguish it from the passing case.

1. **Every shipped selector's treatment is read** (round-1 analyst 3, reviewer 3). In
   `tests/src/styles/components/button-group.test.ts`: the case `lifts the label of a focused grouped
   input of a %s while that input is unchecked` over both directions clears the checked input,
   reaches the leading input by keyboard, and reads its label's `z-index` against the resting
   sibling's; the checked-lift and dropdown-exclusion cases run over both directions; the pressed
   case asserts the pressed child also matches `:hover` and binds every `z-index: 1` member of
   `BUTTON_GROUP_STACK_CASES` through `readRules` for both directions, stating why the rendered
   reading cannot isolate `:active`. The named mutations each redden exactly the case the report's
   table names (`1 failed | 33 passed (34)` each), and the partial is byte-identical after each revert
   (SHA-256 `1e95eab6…5139`). The corrected coverage matrix names, for every selector
   `BUTTON_GROUP_SELECTORS` records, a case that reads its treatment, and qualifies the three
   readings it cannot claim whole.
2. **The dropdown-toggle child** (round-1 analyst F-DROPDOWN). The `Horizontal group` specimen in
   `app/browser/constants.ts` leads with a `.btn.dropdown-toggle` child carrying `aria-expanded="false"`,
   no split-toggle class, no menu, and no `data-bs-toggle`, followed by plain children;
   `ButtonGroupSection.test.ts` asserts it (`renders the dropdown toggle the trailing-radius exclusion
   names, ahead of a plain child`) and its census gains `.btn-group > .btn.dropdown-toggle:not(:last-child)`;
   the mutation "the toggle removed from the specimen" reddens both (`2 failed | 3 passed (5)`);
   `horizontal-group--light-1280.png` shows the toggle as a rounded pill beside the joined run.
3. **One toolbar specimen** (round-1 reviewer F2, analyst F-WIDE). `Wide toolbar` is gone;
   `Wrapping toolbar` and its `Wrapping <action>` labels are one term with the paragraph; the
   `BUTTON_GROUP_SPECIMENS` doc block states the measured behaviour (unwrapped at 1280, wrapped at
   390) and the frames show it; `tests/setup.ts` loses the removed subject and row and the surviving
   toolbar row reads `.btn-toolbar` / `flex-wrap`; no `wide-toolbar` or `crowded-toolbar` artifact
   remains.
4. **The registry** (round-1 reviewer F1, F5). `BUTTON_GROUP_KEYS` replaces `GROUP_KEYS` at its
   declaration, spread, import, sorted literal row, and test spread; its doc block states the copy to
   the document's start and the input and label renaming the clone needs, the way `CASCADE_KEYS`
   states its copy.
5. **The Showcase region name, the imports, the guide** (round-1 reviewer F3, F4, F6; analyst 6).
   `Showcase.test.ts` reads ``section[aria-label="${BUTTON_COPY.region}"]`` with the import; the
   partial opens on `@layer components {` with no `@use`, and the built cascade is byte-identical
   (digest `ecf2e9ce…5764` before and after); the § Files row names the proof (`read by
   tests/src/styles/components/button-group.test.ts`) within the table's column; the split-toggle
   bullet points at § Deferred selectors as the one home of the deferred set.
6. **The portfolio.** Every button-group frame and artifact exists for the four variants (the
   report's list), each capture run `27 passed (27)`.
7. **Scope is honest.** The status is identical to the round-1 status (no path added or removed);
   `tests/setupServer.test.ts`, `ButtonSection.test.ts`, `src/styles/_grid.scss`,
   `src/styles/_mixins.scss`, `src/styles/components/_button.scss`, and the vendored files are
   untouched; `tests/setupStyles.test.ts` carries the round-1 case and nothing of this round; no
   `tmp/probe/` file remains.
8. **Gates.** `format:check`, `lint:check`, `check`, `build:src` exit 0; `test:src:styles`
   `450 passed`; `test:conformance` `17 passed`; `test:guides` `18 passed`; `test:policy`
   `109 passed | 1 skipped`; `test:app` red on Blocker 3 alone; `test:setup` red on Blocker D1 and
   the sweep case (closed by B-SWEEP-2 on the session branch). UNRESOLVED until the Orchestrator's
   independent chain; rule `npm run check` yourself where the sandbox allows it.
