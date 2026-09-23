# B-PASSIVE-A rounds 2 and 3 — audit claims

Subject: the fix rounds `opus` wrote in `/home/user/veneer-ba` from
`/home/user/veneer-ba/tmp/units/b-passive-a-brief-2.md` (interrupted by the session rate limit) and
`b-passive-a-brief-3.md` (its completion) over the round-1 verdicts
(`/home/user/veneer-ba/tmp/units/ba-audit-analyst-verdict.md`, `FAIL 3, 5, 6, 7, 8, 9; outside the
claims: F1`; `ba-audit-reviewer-verdict.md`, `FAIL 5, 8, 9; outside the claims: F1 to F4`;
`ba-audit-checker-verdict.md`, `FAIL 5, 8` partial). Evidence:
`/home/user/scaffold/tmp/audit/ba-fix-3.diff` (the whole diff against `3a9202a`, untracked files as
additions; the round-1 writes are inside it), `ba-fix-3-status.txt`, and the completion report
`/home/user/scaffold/tmp/audit/ba-report-3.md` (the round-1 report is
`/home/user/veneer-ba/tmp/units/b-passive-a-report.md`). The frames sit under
`/home/user/veneer-ba/tmp/capture/states/`. The design is
`/home/user/veneer-ba/tmp/units/b-passive-design-verdict.md`; D15's amendment is
`/home/user/veneer-ba/tmp/units/b-sweep-design-verdict.md` § Amendment; the family record is
`/home/user/veneer-ba/tmp/units/b-passive-family.md`. D22 (multi-key selector attribution goes to
the most specific key; the `.btn-close` rows regroup at landing) is the Orchestrator's, not this
unit's. Rule each claim CONFIRMED, BROKEN, or UNRESOLVED with `file:line`; rule a claim about a
proof on the mutation named and whether the assertions distinguish it from the passing case.

1. **The close hover binding is proved** (round-1 analyst 3; fix finding 1). In
   `tests/src/styles/components/close.test.ts` the case `reads the hover opacity from the variable a
   consumer retunes through a scope of their own` retunes `--bs-btn-close-hover-opacity` on a scope
   around the control, drives hover with the installed pointer driver, and asserts the driven
   opacity is the retuned value; the mutation `.btn-close:hover { opacity: 0.75 }` written as a
   literal in `src/styles/components/_close.scss` reddens that case alone (`1 failed | 454 passed
   (455)`, `expected '0.75' to be '0.6'`), and the partial reads SHA-256 `d3181b21…c1a3` after the
   revert.
2. **The badge geometry rationale is stated and proved** (round-1 reviewer F1; fix finding 2). The
   `BADGE_GEOMETRY_CASES` doc block in `tests/setupStyles.ts` states the rival the second host
   excludes (padding rewritten as an absolute length) and the case comment no longer repeats the
   false rationale; `badge.test.ts` carries `resolves the recorded padding against the badge size
   rather than the host size` (a 16px host, `scene.load('.badge { --bs-badge-font-size: 2em; }')`,
   `padding-left` reads `20.8`); the mutation "padding as `0.4875em` of the host" reddens that case
   alone (`expected 7.8 to be close to 20.8`) while both host-size rows pass, and the partial reads
   SHA-256 `67a589a7…c2b4` after the revert.
3. **Specimens and scenarios** (round-1 analyst 8; fix finding 3). `app/browser/constants.ts`
   renders a `Badge on a button` specimen (`.btn.btn-primary` host carrying `.badge`, `BADGE_COPY`
   naming the primary button) asserted in `BadgeSection.test.ts` with its fill; `CASCADE_KEYS` in
   `tests/setup.ts` gains resting rows for `badge-word`, `badge-at-heading-scale`, `badge-collapsed`
   (its region the visible label host), `badge-on-a-button`, and `breadcrumb-single-step`, each
   subject a `CaptureSubject` member; every badge, breadcrumb, and close frame exists for the four
   variants (the report's list) with each capture run `26 passed (26)`; the button-host red lands in
   the shared `tests/app/browser/Showcase.test.ts` (`mounts its sections after the region and
   destroys them before removing the nodes`, one extra `"Inbox 7"`) and the report carries the exact
   patch (`readSubject(host, BUTTON_COPY.region)` narrowing the Button specimen query), verified on a
   scratch copy. Rule whether the patch is the narrowest true fix and whether `readSubject` and
   `BUTTON_COPY` exist as named.
4. **Helper placement** (round-1 analyst F1; fix finding 4). `mountBadge`, `mountTrail`, and
   `mountClose` are exported from `tests/setupBrowser.ts` with TSDoc, inventory rows, and cases in
   `tests/setupBrowser.test.ts` (`test:setup:browser` `57 passed`); `badge.test.ts`,
   `breadcrumb.test.ts`, and `close.test.ts` import them; the function once assigned inside a test
   callback in `tests/setupStyles.test.ts` is gone, replaced by an inline expression or an exported
   tested leaf; no nested function remains in the owned files.
5. **The inverted close specimen** (round-1 reviewer F2; fix finding 5). The dark cell's visible
   text is `Inverted notice`, distinct from the control's accessible name `Dismiss the inverted
   notice`; `CloseSection.test.ts` asserts it; the `close-inverted` frames show it.
6. **The close journey case** (round-1 reviewer R2; fix finding 6). In
   `tests/app/browser/integration.test.ts` the close case moves the real `Close control` specimen to
   the document's start behind a comment marker and restores it afterwards (no copy, because a copy
   would share the accessible name), stages the pane, hovers and asserts `:hover`, stages reduced
   motion and asserts a `0s` transition, places the hover frame on the specimen, re-stages and
   re-reads `:hover` and the opacity; the focus frame stays a page frame, re-staged and asserted; the
   `CLOSE_KEYS` remark in `tests/setup.ts` states which frame is which and why; the four manifests
   read `"framedHover":true,"framedHovered":"0.75","framedFocus":true,"framedFocused":"1"`; the
   as-found case with the hover assertions added reddened (`expected false to be true`) before the
   change. Rule whether moving the live specimen and restoring it leaves the showcase's later cases
   unaffected (order in the file, the region's child order after restoration).
7. **The guide** (round-1 analyst 6; fix finding 7). § Badge classes narrows the relative-length
   sentence to the font, the padding, and the `em` box and names the `-1px` offset as absolute;
   § Close classes narrows the scaling sentence to the `em` box with the radius and the focus shadow
   reading `rem`, and writes `disabled` for the state in place of "refusal"; `active` and `disabled`
   are written as class words wherever the three sections name those states; the sections wrap at
   the file's width; the prose follows `.claude/rules/writing.md`.
8. **Scope is honest.** The status equals the round-1 set with no path added or removed (the
   modified and untracked lists in `ba-report-3.md` § `git status --porcelain`); the shared
   `tests/app/browser/Showcase.test.ts` and `guides/ledger/departures.md` are byte-identical to round
   1; `tests/setupServer.test.ts`, `tests/app/browser/sections/ButtonSection.test.ts`,
   `src/styles/_tokens.scss`, `src/styles/_mixins.scss`, and the vendored files are untouched; no
   `tmp/probe/` file remains; the three partial SHA-256 readings match the tree.
9. **Gates.** `format:check`, `lint:check`, `check`, `build:src` exit 0; `test:src:styles`
   `455 passed`; `test:setup:browser` `57 passed`; `test:conformance` `17 passed`; `test:guides`
   `18 passed`; four capture journeys `26 passed` each; `test:policy` `109 passed | 1 skipped`;
   `test:app` red on the `ButtonSection` blocker and the `Showcase` case of claim 3 and nothing else;
   `test:setup` red on the Set literal and the shared-block sweep (closed by B-SWEEP-2 on the session
   branch) and nothing else. UNRESOLVED until the Orchestrator's independent chain; rule `npm run
   check` yourself where the sandbox allows it.

Two observations the report leaves without an owner, to rule as findings outside the claims if they
are defects of this unit: the stem table in `guides/veneer.md` § Tests lists none of the round-2
scenarios nor the driven and disabled close scenarios (outside the three owned sections), and the
`_badge.scss` comment says the font size is relative to "the badge's own inherited font size" while
the rule reads `0.75em` of the host (the partial had to stay byte-identical).
