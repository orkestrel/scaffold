1. **BROKEN.** `enterprise-bootstrap/SKILL.md:125–126` explains why custom CSS is forbidden (`Each ends the cascade for that element: it outranks the utilities…`) instead of stating a trigger and an action. Instruction-file law cuts clauses that explain a rule to a person. Smallest fix: delete the rationale clause; keep the three forbidden forms.

2. **BROKEN.** `orkestrel-prove-journey/SKILL.md:54` (`a split lets a run write a filename describing a combination it did not render`) and `capture-harness.md:38` (`A near-miss field name produces an empty screen that looks exactly like a product defect`) persuade rather than direct. Smallest fix: keep the imperative; drop the why-it-matters clause.

3. **BROKEN.** Authored-class control (`inspection.md:37–39`) is a token fed to the reading, not planted in markup. An extractor that skipped SVG `classList` would still report that fed token, so the control would pass while the population walk was broken. Same shape at Style escapes (`inspection.md:72–74`). Smallest fix: plant the control inside the walked population (an SVG token / inline `style` the extractor must see).

4. **BROKEN.** `inputs.md:477–479` (`A step in a sequence`) says the fixed set applies to other controls, not to this affordance. Attack on Bootstrap tokens failed: fence classes including `.mh-100`, `.font-monospace`, `.form-control-color` exist in `terrain/node_modules/bootstrap/dist/css/bootstrap.css`. Smallest fix: draw the indicator’s own rest/current/invalid marks as the set it handles, or drop it from the catalog of affordances that handle the set.

5. **CONFIRMED.** Attack: grep `@orkestrel/` and `.claude/rules/` in the three files. Hits are only `.agents/orchestration.md` and `.claude/rules/quality.md` (`SKILL.md:85,92`; `inspection.md:5`). `orkestrel-polish-surface` is a skill name, not a package.

6. **BROKEN.** `SKILL.md:119` still says `Never open at rung 4` after the exception at `SKILL.md:191–195` / `inspection.md:139–147`. Smallest fix: qualify or delete line 119 so the ladder does not forbid the exception the later section opens.

7. **BROKEN.** Matrix-loop restatement: `orkestrel-prove-journey/SKILL.md:59` and `styles.md:21` both require every declared variant inside one run. Authored-class property restated at `styles.md:54–55` beside `inspection.md:30–31`. Smallest fix: leave the rule in one home and point from the other.

8. **CONFIRMED.** Attack: a backticked helper/type/constant/member that is not a `test` export. Cited names (`StateTransition`, `executeScenarios`, `readClasses`, `extractStyles`, `createPortfolio`, `place`, `worn`, `floor`, `CANVAS_COLOR`, …) match exports/parameters in `test/src/core` and `test/src/browser` at `ce75175`. `innerText` / `vitest/browser` are not in the claim’s set.

9. **CONFIRMED.** Attack: `factories.ts:106–145` against each `captures.md` sentence. `createPortfolio` refuses an unregistered variant (`:109`); enabled `place` refuses unregistered/already-placed (`:127–131`) and delegates byte identity to `captureFrame`. Expansion uniqueness, placement set-equality, disk membership, and non-empty read-back are not asserted there. Empty matching empty would pass `captureFrame` (`helpers.ts:1930–1931`), so non-empty read-back is still suite-owed.

10. **CONFIRMED.** Attack: a skill line that sends a browser/pixel claim to `prove`. `decide.md:9–13,37–38` routes a person’s eye to the written artifact and forbids `prove` for rendered questions. No other skill file tells a model to send a browser claim to `prove`.

11. **CONFIRMED.** Attack: a Vitest-browser surface still told to use the spawned script, or a table row with no source. `capture-harness.md:3–6` and `:47–58` name the journey source per artifact, including `The harness after a play-all run` for the statechart outcome.

12. **CONFIRMED.** Attack: an unnamed extra file, a bridge `name`/`description` mismatch, or `SKILL.md` over ~500 lines. Each skill directory is `SKILL.md` + `agents/openai.yaml` + the `references/*.md` that `SKILL.md` names; both bridges copy `name` and `description` byte for byte; line counts are 251 / 198 / ~122.

13. **CONFIRMED.** Attack: `act` resolving after `assert`, a non-`Error` throw, a rejected `build`. `executeScenario` (`test/src/core/helpers.ts:453–459`) `await`s arrange → act → assert and rethrows `new Error(\`${transition.name}: …\`, { cause })` for non-`Error` values. `executeScenarios` (`:487–489`) is a serial `for` with `await build(scenario)` before the row, so a rejected `build` stops the loop.

14. **CONFIRMED.** Attack: SVG omitted, order scrambled, difference missing an undeclared token. `readClasses` (`helpers.ts:1496–1502`) walks `classList` on the root then `querySelectorAll('*')` (SVG included); helpers tests pin document order, SVG, and `readCascade()` difference (`helpers.test.ts:2174–2213`).

15. **CONFIRMED.** Attack: whitespace-only `style`, SVG `path` with `style`, `<style>` root, `DocumentFragment` root. `extractStyles` (`helpers.ts:1686–1694`) uses `inline.trim() !== ''` and includes `localName === 'style'`; tests cover all four (`helpers.test.ts:2230–2272`).

16. **CONFIRMED.** Attack: a published primitive with matching semantics, or a runtime dependency. `ecosystem-reuse-ruling.md` rules the additions `new` or compose-over-`readCascade`. `test/package.json` has no `dependencies` key.

17. **CONFIRMED.** Attack: an undocumented new export, a Limits row without reuse reasoning, a transcribed fence whose value differs. Table rows exist for `executeScenario`/`executeScenarios`/`readClasses`/`extractStyles`/`STATECHART_*`; Limits statechart row (`guides/test.md:1243`) records the workflow/`TaskStatus` split; transcribed fences in `tests/guides.test.ts:690–693` match the printed `'data-statechart-status'` / `'pending'` values.

18. **CONFIRMED.** Attack: a `FieldControl` member with no row, a `scaffold/`-prefixed path, a class/markup in the table. All twelve members (`form/src/core/types.ts:21–33`) have a row (`form/guides/form.md:513–524`); path is `.agents/skills/enterprise-bootstrap/references/inputs.md` (`:500`); table cells name categories, not classes.

19. **BROKEN.** `enterSurface` → `mountSurface` → `dismissReference` waits on `document.querySelector('.modal-backdrop')` (`terrain/tests/app/browser/setup.ts:1328`), so the path every `integration.test.ts` journey enters through uses a selector. Role/name verbs, `CaptureVariant` declarations, `contrast`/`readRing` under-bar controls, and `executeScenarios` hold; successor report `8 passed | 1 skipped` per variant. Smallest fix: wait only on `!isRegionVisible(REFERENCE_NAME)` (or a published reader), drop the class selector.

20. **CONFIRMED.** Attack: a missing variant or a frame that does not show the named state. Twelve files exist under `terrain/tmp/capture/states/`. Empty frames show `Build a carrier-ready schedule`; populated frames show `1 building` with Delete muted; delete-armed frames show Delete in danger chrome and a checked row; `*-390` frames show the Actions collapse, `*-1280` the inline toolbar; light/dark match the filename.

21. **BROKEN.** `control` is a form widget (`inputs.md:26–28`), a negative control (`inspection.md:11–15`), and an interactive target (`orkestrel-prove-journey/SKILL.md:66–67`). `state` is a field state, a capture state, and a statechart state. `variant` is `CaptureVariant` and a Bootstrap button variant (`SKILL.md:138`). Would not ship until those six words have one sense each. Smallest fix: rename the inspection field to `negative control` (or `foil`) and keep `variant` for the theme-viewport axis only.

22. **CONFIRMED.** Attack: a pre-campaign law missing from the live skill with no ruling. Snapshot `Never open at rung 4` / `do not take it unprompted` remain; the custom-CSS exception and the verb/reader split are recorded in `design-reconciliation.md` and `ecosystem-reuse-ruling.md`.

23. **CONFIRMED.** Attack: hidden glyph-bearing button; `Add` vs `Add building`; glyph-labelled dialog. Visible pass is exact without `includeHidden` (`helpers.ts:172`); hidden pass uses `computeNamePattern` and chooses between `No interactive element has the accessible name "X"` and `Interactive target "X" is not visible and focus-reachable` (`:183–184`). Pattern `[^\p{L}\p{N}]*` after `Add` rejects `Add building`. `resolve-hidden-report.md` records 4 failed then 203 passed on the named command. This lane did not re-run it.

24. **CONFIRMED.** Attack: a catalog range the manifest omits, an overwrite deletion the report omits, a duplicate `contract` in `npm ls` for a published package. `test`/`form` declared `@orkestrel/*` ranges match catalog versions with a caret except `form` `dependencies["@orkestrel/contract"]` `^0.0.13`; `terrain` carries `^0.0.15`. Visit reports record audit exit 0 (TypeScript-major on test/form; setup + TypeScript-major on terrain with `--dirty`); `visit-terrain-report.md` `comm` on deletions was empty. `npm ls` was not re-run here; form’s declared graph has a single contract range.

25. **BROKEN.** Checklist lines `SKILL.md:244–245` list Keyboard and Reduced motion as tickable checks with no population, control, or coverage. Line 243 does not stop those rows from being listed as closed. Smallest fix: those rows must name a control or be labelled open, matching `SKILL.md:94–97`.

26. **CONFIRMED.** Attack: a listener surviving unmount; a default that differs from the inline value; a `#teardown` `this` mismatch. `readEpoch` returns `0` (`app/core/helpers.ts:24–26`); `readNow` is `Date.now()` (`app/browser/helpers.ts:963–965`); `useMedia`/`useDragDrop` abort on `onUnmounted`; `#teardown()` is invoked as a method and reads `this.#schedule` (`ScheduleStore.ts:69–72,159`). Each named helper is exported and has a mirrored test file.

VERDICT: FAIL — 9 broken, 0 unresolved, 0 not-evidenced, 0 findings outside the claims
