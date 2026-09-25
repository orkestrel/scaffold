Lane: **subjective** (`reviewer`, Opus 5.5). Subject: the uncommitted change in `/home/user/veneer-mfade` over `2376710`, read from `/home/user/scaffold/.orkestrel/veneer/units/mfade-2.diff`, `mfade-2-status.txt`, `mfade-instruments/`, and the worktree files. I edited nothing and ran nothing. Every verdict comes from reading the source and the retained logs.

**Retention gap that bears on claims 2 and 4.** `mfade-instruments/` holds the gate driver and the gate logs only. It holds no red-at-base log and no plant (mutation) log, and neither does `/home/user/veneer-mfade/tmp/units/`. The analyst brief refers to "the retained plant logs", but no such files exist on disk.

## Per-claim verdicts

**1. CONFIRMED.**
- `/home/user/veneer-mfade/src/styles/components/_fade.scss:21` writes `@include transition(opacity var(--vn-motion-feedback) var(--vn-ease-out));`.
- The diff's only other change in that file is the comment at `:13-15`, which documents the easing. `.fade:not(.show)` at `:24-26` is unchanged.
- The reduced-motion twin is pinned at `tests/src/styles/components/fade.test.ts:78` (`[REDUCED_MOTION, 'none', '']`).
- `src/styles/_tokens.scss:451` reads `--vn-ease-out: ease-out;`. Elements states its opacity fades use plain `ease-out` at `/home/user/elements/src/styles/_tokens.scss:138-140`. The motion verdict's `.fade` row (`/home/user/scaffold/.orkestrel/veneer/e-id-motion-design-verdict.md:26`) rules exactly this pairing.
- Attack that failed: a duration off the verdict. The verdict row keeps `--vn-motion-feedback` (150ms), not Elements' 250ms substantial-motion family, and the rule matches the verdict.

**2. UNRESOLVED.**
- The reader's behaviour holds on source (`tests/setupBrowser.ts`):
  - It finds the transition by `transitionProperty` (`:1898-1903`).
  - It returns `undefined` when none matches (`:1904`).
  - It throws on a missing effect, a non-numeric duration, or a missing easing (`:1905-1912`).
  - It pauses, seeks `0`, then seeks `delay + duration / 2`, and leaves the transition paused (`:1913-1918`).
- The control at `tests/setupBrowser.test.ts:1954-1968` runs the same change under `transition: none` and reads `undefined`. It also reads the landed end values (`:1967-1968`), so it shows the change was applied.
- Mutation 1, the midpoint seek without the delay: the seek lands at `currentTime` 100, the end of the delay, where opacity is `'1'`. The assertions at `:1937-1942` (expects `'0.5'`) and `:1949` (expects `currentTime` `200`) tell it apart.
- Mutation 2, the first transition instead of the named one: both samples return the opacity transition. The assertion at `:1933-1936` (`['opacity', 'width']`) tells it apart, and so does `:1943` (duration 400).
- Why not CONFIRMED: the claim says the proof *fails* under each mutation, and the claims file counts a kill only on an assertion-failure message. The only record of those runs and messages is the writer's report (`e-id-motion-fade-report-2.md`, mutation table). The report's quoted messages match what the source predicts, but that is still a derivation.
- To settle it: the Orchestrator plants each mutation on the host and runs `npx vitest run --config vite.config.ts --no-cache --project setup:browser -t sampleTransition`, then retains the logs.

**3. CONFIRMED.** The check is against the source; the green run is the gate log.
- `fade.test.ts:161-191` removes and then adds `show` on a real `.fade` element. For each direction it asserts:
  - only the sampled transition runs (`:175-176`, `:185-186`);
  - the duration equals `--vn-motion-feedback` resolved on a specimen, the easing is `ease-out`, and the start value is `'1'` or `'0'` (`:177`, `:187`);
  - the midpoint lies in (0, 0.5) when hiding and in (0.5, 1) when showing (`:178-180`, `:188-190`).
- `:198-232` asserts double the duration at a factor of `2`, `undefined` at `0`, and `undefined` under reduced motion. The resting-factor reading (`:224-226`) serves as the control: under the same procedure a transition must start.

Mutations and whether the assertions tell each apart:

| Mutation | Distinguished? | Where |
| --- | --- | --- |
| Easing `linear` | Yes | `:177` (easing), and the midpoint of 0.5 fails `:180` |
| Easing `ease-in` | Yes | Easing string, and the midpoint of about 0.83 fails `< 0.5` |
| Easing dropped to the default `ease` | Yes, by the easing string only | The midpoint check alone passes |
| Duration on `--vn-motion-panel` | Yes | `:177` against the specimen |
| Duration as the `0.15s` literal | Not by the running case (150 = 150); yes by the factor case | `:227-231` |
| Reduced-motion twin dropped | Yes | `:222` and `:231` |

**4. UNRESOLVED.**
- Source derivation:
  - At the base rule, `:177` compares `[150, 'linear', '1']` with `[150, 'ease-out', '1']`, which is an assertion failure. Writing `linear` back is the same state.
  - With the `0.15s` literal, `:227` compares `[[150,'0'],[150,'0'],[undefined,'0']]` with `[[300,'0'],[undefined,'0'],[undefined,'0']]`, also an assertion failure.
  - The ledger's stale-departure case must name the fade row, because the guide row at `guides/veneer.md:9713` would no longer match the compiled cascade.
- Why not CONFIRMED: "read red at the base" is a record of a run. That run and all three plant readings are attested only by the writer's report (§ Failing-first and green, § Mutation table). No red or plant log is retained.
- To settle it: the Orchestrator reruns the red state and each plant with the report's commands (the fade proof command, and `--project conformance` for the ledger) and retains the logs.

**5. CONFIRMED.**
- `guides/veneer.md:9713` reads `opacity var(--vn-motion-feedback) var(--vn-ease-out)` and stays `tokenized`. That class is what `classifyDeparture` computes: a gained `--vn-*` name gives `tokenized` (`tests/setupServer.ts:1631`).
- The ledger is green: `mfade-test-conformance.log.txt` shows `Tests 26 passed (26)` and `exit=0`.
- § Fade classes (`guides/veneer.md:4499-4503`) states the easing, that it replaces `linear`, and that no transition runs at a factor of `0`. Each statement is true of `_fade.scss:21` and matches the proofs at `fade.test.ts:177` and `:229`. The spec agrees on the zero factor: a combined duration of 0s starts no transition.
- The departure bullet (`:4517-4521`) is accurate: `ease-out` decelerates into the end value, and `linear` does not.

**6. CONFIRMED**, reading "the one edit to an existing case" as scoped to `tests/setupBrowser.test.ts`, whose grant was "its proof only".
- The status lists exactly the five owned files. In that file the only change to an existing case is `'sampleTransition'` at `:937` in the case titled at `:873`.
- The three existing cases edited in `fade.test.ts` (`:77`, `:112` renamed with readings at `:133-134`, and `:251`) are the `linear` pins the brief granted. The claim's wording does not scope itself this way; tighten it in a successor.
- The diff adds none of: `any`, `as`, `!`, a suppression, or a nested declaration. The `find` predicate at `setupBrowser.ts:1901-1902` is an anonymous callback passed directly as an argument, which the rule allows. It adds no hidden helper, mock, fake clock, or fake animation: the reader proof drives a real cascade transition.
- `TransitionSample` members at `setupBrowser.ts:1851-1859` are all readonly single words.
- Each added or renamed title states what its case proves: `setupBrowser.test.ts:1920`, `:1954`, and `fade.test.ts:112`, `:161`, `:198`.

**7. CONFIRMED** on the retained logs.
- `exit=0` in: `mfade-build`, `-format-check`, `-lint-check`, `-check`, `-test-src-styles` (1507 passed), `-test-setup` (`:32` `Tests  321 passed (321)`, `:36`), `-test-setup-browser` (90 passed), `-test-conformance`, `-test-guides`, and `-test-policy`.
- `mfade-test-setup-first.log.txt:33-102` shows the first-run red. Every failure is a timeout (10100ms hook or test, or 5000ms test) in `tests/setupServer.test.ts` and `tests/setupStyles.test.ts`, neither of which the diff touches. The summary is at `:116` and `exit=1` at `:120`.

## Findings outside the claims

**F1 — Two § Fade classes sentences in the guide fail the plain-language rule, and one of them states a false cause.** Both sites are in the unit's owned prose.

- **`guides/veneer.md:4528-4536` (the proof paragraph).**
  - What is wrong: the unit's insertion ("the running transition … with its duration, its `ease-out` easing, and its midpoint frame, the doubled duration it runs at a doubled factor and the transition it does not start …") nests two lists that end in "and" inside an outer comma list. After "and its midpoint frame," a reader cannot tell whether "the doubled duration" belongs to the inner list or starts the next outer item. The sentence runs past 100 words.
  - Why it matters: `AGENTS.md` § Writing requires every sentence to be understood on the first read, with one idea per sentence.
  - What right looks like: keep the lead clause "The `tests/src/styles/components/fade.test.ts` proof reads each state in the browser:" and put each reading in its own bullet. Alternatively, move the running-transition readings into their own sentence: "It also reads the running transition the browser starts as the `show` class leaves and returns: its duration, its `ease-out` easing, and its midpoint frame; the doubled duration at a doubled factor; and no transition at a zero factor or under the staged preference."
- **`guides/veneer.md:4500-4501`.**
  - What is wrong: "The duration resolves to the release's `0.15s` value, so the `--vn-factor-motion` factor rescales it" gives the resolved value as the reason for the rescaling. The factor rescales the duration because `--vn-motion-feedback` is `calc(150ms * var(--vn-factor-motion))` (`src/styles/_tokens.scss:448`).
  - What right looks like: "The duration resolves to the release's `0.15s` value at a factor of `1` and rescales with the `--vn-factor-motion` factor, and at a factor of `0` the browser runs no transition."

## Attacked and held

- **Name and shape.** `read*` means an unmodified read of a live host object (`/home/user/scaffold/.claude/rules/names.md:97`). `sampleTransition` pauses and seeks, so a separate verb is justified, and the design verdict names it. `TransitionSample` follows the `{Entity}` form for plain data and pairs with its verb. `start` sits beside `midpoint` as a noun holding a value, not as the lifecycle verb. No export of `@orkestrel/test/browser` reads a transition's timing (`node_modules/@orkestrel/test/dist/src/browser/index.d.ts`; `waitForAnimations` only waits), so the helper duplicates nothing.
- **Paused on return.** `setupBrowser.ts` @remarks documents that the transition stays paused and names the release step (`finish` or `cancel`). The factor case finishes every sample (`fade.test.ts:209`). The @example (`:1891-1895`) omits the release step; this is minor.
- **Loose term in the TSDoc.** The `duration` doc says "active duration", but `getTiming().duration` is the iteration duration. For a one-iteration CSSTransition the two values are equal, so the text is loose, not false.
- **Departure class on a row whose value changed.** The `tokenized` definition at `guides/veneer.md:7428` says a row "routes the release value through a Veneer token", which is looser than the classifier. Rows such as `#fff` → `var(--vn-button-face)` already show this, so it predates the unit.
- **Export-list case title.** "the cascade readers" at `setupBrowser.test.ts:873` does not describe a motion reader, but the title already left out `measureDifference`, `visitBreakpoint`, and others, so the edit does not make it less true.
- **Two factor proofs.** The computed-duration case (`fade.test.ts:148-154`) and the running-duration case both remain. Keeping both follows the tenet "Test resolved styles and rendered effects".

## Referrals to the objective lane

- **R1.** The throw paths in `setupBrowser.ts:1905-1912` have no proof, and `Animation.effect` is writable, so a `null` effect is reachable. Rule whether they need a proof or a recorded gap under `/home/user/scaffold/.claude/rules/tests.md` § Untestable usually means missing seam.
- **R2.** Which tree each gate log read, relative to the export-list edit. `test:setup:browser` starts at 04:43:11, after `test:policy` at 04:42:42. The `format:check`, `lint:check`, and `check` logs carry no timestamp, and only the report says they were re-run after the edit.
- **R3.** Discovery. `mfade-test-src-styles.log.txt` uses the dot reporter and gives only a file count, so it does not show that `fade.test.ts` was collected.
- **R4.** `once` in the control title at `setupBrowser.test.ts:1954` is temporal. Rule whether the `once` → `after` substitution row in `/home/user/scaffold/.claude/rules/writing.md` covers test titles.

VERDICT: FAIL 2, 4; outside the claims: F1
