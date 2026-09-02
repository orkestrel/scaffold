1. **BROKEN.** Attack: `SKILL.md` 81 (“Brainstorm privately”) has no observable trigger; 125–126 and 138–144 explain and persuade (cascade outranking, outline-button contrast story) rather than stating a directive. Same class in `inputs.md` 160–161 (“The platform brings the calendar…”) and `inspection.md` 14–15. Fix: cut every explain-to-a-person clause; name a trigger on every remaining line.

2. **BROKEN.** Attack: `layer.md` 329–330 (Chromium/`<summary>` pedagogy), `styles.md` 26–27 (copied-`apply` caution), `capture-harness.md` 26–27 (“A discarded stream turns…”). Those sentences narrate. Fix: keep the rule and the check; delete the tutorial clause.

3. **BROKEN.** Attack: authored-class control is “a token fed to the reading rather than planted in the markup” (`inspection.md` 37–39). A walker that never leaves the root still reports that fed token, so the control fails while descendants are unread. Contrast control is an opaque under-bar pairing (`inspection.md` 118–119); it does not catch a reader that skips compositing. Fix: plant the control inside the stated population (a descendant token; a translucent stack).

4. **BROKEN.** Attack: every listed category has a heading; fence tokens `.mh-100`, `.font-monospace`, `.has-validation`, `.dropdown-item-text`, `.form-control-color` exist in `terrain/node_modules/bootstrap/dist/css/bootstrap.css`. The conjunction still fails: “A step in a sequence” (`inputs.md` 477–479) states the fixed set does **not** apply to the indicator. Fix: drop that row from the affordance catalog, or give the indicator its own state set and stop claiming the fixed set.

5. **CONFIRMED.** Attack: grep of the three files for `@orkestrel/` and `.claude/rules/` besides the allowed pair. Hits are only `.agents/orchestration.md` and `.claude/rules/quality.md`. `orkestrel-polish-surface` is a skill name, not a package or rule file.

6. **BROKEN.** Attack: `SKILL.md` 117 (“Stop at rung 3 and say plainly what rung 4 would require”) and 119 (“Never open at rung 4”) still forbid taking rung 4, while 191–195 open it on a measured vendor failure. Fix: make the ladder point at “When custom CSS is justified”; delete the absolute never-take sentences.

7. **BROKEN.** Attack: authored-class property restated in `styles.md` 54–56 against `inspection.md` 30–31; style-escapes property restated in `styles.md` 67–68 against `inspection.md` 62. Statechart requirement appears in the families table (`SKILL.md` 39) and again as the offer/require bullet (`SKILL.md` 45–46), with different predicates. Fix: one home per rule; `styles.md` keeps only the reading.

8. **CONFIRMED.** Attack: dangling `runScenarios`, missing `createPointerEvent` / `createDragEvent` / `createJournal` / `PortfolioOptions` / `computeNamePattern`. All resolve to exports in `test/src/browser/{helpers,factories,types,index}.ts` and `test/src/core/{helpers,types,constants}.ts`, spelled identically.

9. **CONFIRMED.** Attack: `createPortfolio` at `test/src/browser/factories.ts:106–145` against each `captures.md` sentence. Unregistered variant throws before return; `place` with `enabled` false returns `undefined` without registry checks; unregistered / already-placed / wrong-frame refusals match the package table; suite proofs (expansion uniqueness, placement set-equality, disk membership and non-empty read-back under the flag) are exactly what that function leaves to the suite.

10. **CONFIRMED.** Attack: grep of the three skills for routing a rendered/browser claim to `prove`. `decide.md` 13 and 37 forbid it and name the two 0.0.11 defects. No skill tells a model to send a browser claim to `prove`.

11. **CONFIRMED.** Attack: a Vitest-hosted surface still pushed to the spawned script, or a table row with no source. Opening of `capture-harness.md` splits journey vs spawned; the table names a source per artifact, including “The harness after a play-all run”.

12. **CONFIRMED.** Attack: extra files; bridge drift; `SKILL.md` over ~500 lines. Each campaign skill directory is `SKILL.md` + `agents/openai.yaml` + the `references/*.md` its `SKILL.md` names. Bridge `name` and `description` match the canonical frontmatter. Line counts: bootstrap 251, journey 199, polish 122.

13. **CONFIRMED.** Attack: an `act` that settles after `assert` would have run; a non-`Error` throw; a rejected `build`. `executeScenario` awaits arrange → act → assert (`test/src/core/helpers.ts:452–455`); non-`Error` becomes `threw a non-error ${typeof cause} value` with `cause`; `executeScenarios` is a serial `for` that awaits `build` then the row and stops on throw.

14. **CONFIRMED.** Attack: SVG `className` as `SVGAnimatedString`; root omitted; first-sighting order. `readClasses` uses `classList` on the root then `querySelectorAll('*')` (`helpers.ts:1496–1502`); Set insertion is document order of first sighting; difference against `readCascade()` is the census, with a token the cascade lacks as the control.

15. **CONFIRMED.** Attack: whitespace-only `style`; SVG `path` with `style`; `<style>` root; `DocumentFragment` root. `extractStyles` (`helpers.ts:1686–1694`) skips `style` whose trim is empty, includes SVG via `querySelectorAll('*')`, includes a `<style>` root once, and does not treat a fragment as an element.

16. **CONFIRMED.** Attack: a published primitive with matching semantics; a runtime dependency on `@orkestrel/test`. `ecosystem-reuse-ruling.md` rules the additions new / compose-over-`readCascade`; `test/package.json` has no `dependencies` (peer `vitest` only).

17. **CONFIRMED.** Attack: an undocumented new export; a Limits row without reuse reasoning; a transcribed fence whose asserted value differs from the guide. Tables document the new exports; Limits statechart row names `elements`/`veneer` duplication, layer-0, and `TaskStatus` non-identity; `tests/guides.test.ts` asserts `STATECHART_ATTRIBUTES.status === 'data-statechart-status'`, `scenario`, `STATECHART_STATUSES[0] === 'pending'`, and `.includes('running')` as `guides/test.md` prints.

18. **CONFIRMED.** Attack: a `FieldControl` member with no row; a non-verbatim category; `scaffold/`-prefixed path; a class name in the table. All twelve members map to catalog names verbatim; path is `.agents/skills/enterprise-bootstrap/references/inputs.md`; the table adds no markup or class token.

19. **BROKEN.** Attack: selector / instance / store reach in the journey path. `mountSurface` → `dismissReference` waits on `document.querySelector('.modal-backdrop')` (`terrain/tests/app/browser/setup.ts:1328`). Every integration journey calls that mount. The `app:browser` runs in `terrain-successor-report.md` are green and do not refute the reach. Fix: wait only through `readPerception` / `isRegionVisible`.

20. **CONFIRMED.** Attack: a missing variant, or a frame that is not the state it names. All twelve `<state>--<variant>.png` files exist. Empty frames show the carrier-ready empty card; populated frames show `1 building` and the expanded row; delete-armed frames show the row checked and Delete armed (red/enabled) rather than greyed. Light/dark and 1280/390 differ as named.

21. **BROKEN.** Attack: one vocabulary term used in two senses. `control` is a field/affordance in `inputs.md` and a negative instrument control in `inspection.md` / `styles.md`. `variant` is Bootstrap chrome (`btn-outline-*`, accent variant) and `CaptureVariant`. `state` is the fixed affordance set, a capture registry name, and a statechart `from`/`to`. Would not ship. Fix: `negative control`, `CaptureVariant`, and `affordance state` / `capture state` / `entity state` as distinct terms.

22. **CONFIRMED.** Attack: snapshot at `tmp/skill-workspace/snapshot/` vs current for a dropped law with no ruling. Snapshot `capture(state)` refusal of unregistered names on every run moved to the always-on placement proof; that move is recorded in `design-reconciliation.md` addendum. Rung-4 exception is accepted question 5. Snapshot journey laws 1–7 remain. No unrecorded drop found.

23. **CONFIRMED.** Attack: hidden glyph-bearing button; `Add` against `Add building`; dialog labelled through a glyph-bearing heading. Visible pass is `exact: true` without `includeHidden`; hidden pass returns no element and `computeNamePattern` rejects `Add` vs `Add building` because of letters (`helpers.ts:132–192`). `readPerception` dropped `includeHidden`. `resolve-hidden-report.md` records red 4 failed / 193 passed then 203 passed on the named command. Did not re-run (read-only lane).

24. **CONFIRMED.** Attack: a catalog range the manifest does not carry; an overwrite deletion the report omits; duplicate `contract` in `npm ls` for a published package. Current `test` and `form` manifests match catalog carets except `form` runtime `@orkestrel/contract` `^0.0.13`. Visit reports record audit exit 0 (TypeScript-major question alone on the packages; terrain `--dirty` names the 85 foreign deletions and remaining setup/TS questions). Plan records form `npm ls` deduped to one `contract@0.0.13`. Did not re-run `npm ls`.

25. **BROKEN.** Attack: a checklist reading where keyboard or motion is listed without a control. Rows 244–245 (`Keyboard:…`, `Reduced motion…`) are tickable checks that name neither population, negative control, nor coverage. Row 243 is a separate meta-check and does not bind those rows. Fix: each of those rows must name population, control, and coverage, or be listed as open.

26. **CONFIRMED.** Attack: a listener that survives unmount; a helper default that differs from the inline it replaced; a `this` binding that differs from the arrow. `useMedia` / `useDragDrop` abort their `AbortController` on unmount. `readEpoch` is `0`; `readNow` is `Date.now()`; `scheduleTask` is `setTimeout` plus cancel. `#teardown()` reads `this.#schedule`; `#reload` stays an arrow field. Named helpers are exported and have mirrored tests per `visit-terrain-report.md` § The repair.

**Findings outside the claims**

- Terrain’s `integration.test.ts:58–61` omits the transport family while stating the surface meets that trigger. `orkestrel-prove-journey` `SKILL.md:43–44` requires refusing that omission and stopping. Fix: declare and prove transport, or record a ruling that the driver persistence is out of scope.
- `guides/test.md` flagship fence for `readClasses` / `extractStyles` (printed `['lead']` and the two markup strings) is not transcribed in `tests/guides.test.ts`. `.claude/rules/documentation.md` requires flagship fences executed. Fix: transcribe that fence and assert the printed values.

VERDICT: FAIL — 9 broken, 0 unresolved, 0 not-evidenced, 2 findings outside the claims
