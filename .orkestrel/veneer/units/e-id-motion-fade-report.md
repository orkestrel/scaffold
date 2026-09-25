# E-ID-MOTION-FADE report — stopped under § Deviation protocol

`opus` on Opus 5.5, native, in `/home/user/veneer-mfade` (branch `unit/mfade` at `2376710`). The unit
stopped before editing any file. The brief places the proof of `sampleTransition` in
`tests/setupStyles.test.ts`. That file runs only in the Node `setup` project. There is no DOM there,
so no real transition runs and the helper can't be proved there. Every home that would work is a file
outside the owned set.

## Deviation

**Expected.** The brief's Context › The reader section says `sampleTransition` is "exported, typed in
`tests/setupStyles.ts`, and proved in `tests/setupStyles.test.ts` with a control whose transition is
removed". The helper reads `element.getAnimations()`, pauses the `CSSTransition`, and seeks
`currentTime`, so its proof needs Chromium.

**Found.**

- The `setup` function in the `vite.config.ts` file defines the only project that collects the file:
  `include: ['tests/setup*.test.ts']`, `exclude: ['tests/setupBrowser.test.ts']`,
  `environment: 'node'`, `browser: { enabled: false }`.
- `npx vitest list --config vite.config.ts --filesOnly tests/setupStyles.test.ts` printed
  `[setup] tests/setupStyles.test.ts`. The same command against `configs/src/vite.styles.config.ts`
  listed nothing, because that project's `include` is `tests/src/styles/**/*.test.ts`.
- `tests/setupStyles.test.ts` imports `node:fs`, `node:module`, and `node:path`, so no browser project
  can collect it as it stands.
- The header comment of `tests/setupStyles.ts` states that the module is host-independent: it "reads
  no document", and "a helper that drives a document belongs in the `tests/setupBrowser.ts` module". No
  export there takes an `Element` today (a search for `HTMLElement`, `: Element`, `CSSRule`, and
  `getComputedStyle` in that file found nothing). A helper that pauses and seeks an element's
  animation makes that header false, and the header is not in the owned set.
- `.claude/rules/tests.md` § Cross-cutting proofs puts a setup helper's proof in its sibling
  `tests/setup*.test.ts` and forbids moving setup-helper assertions elsewhere. The only owned file that
  runs in Chromium is `tests/src/styles/components/fade.test.ts`, a mirrored module proof.
- A Node proof over a stub `getAnimations` would stand in for the browser integration the helper
  claims to read. `.claude/rules/tests.md` refuses that stub.

**Done.** The brief's first step is done: the Unknown is measured and both pin searches are
confirmed. Nothing else was done. The tree is at `2376710` with no change: `tmp/units/mfade.diff` is
empty, and `tmp/units/mfade-status.txt` reads `## unit/mfade`. The measurement case was
added to `fade.test.ts` and then restored from a copy of the base file. `git status --short` printed
nothing after the restore.

**Not done.** `sampleTransition` and its proof, the fade proof, the rule change, the departure row
and prose, the mutation, and the gates.

**Hypothesis.** The helper belongs in `tests/setupBrowser.ts`, proved in `tests/setupBrowser.test.ts`
(the `setup:browser` project, Chromium). The styles project also loads `tests/setupBrowser.ts`, and
`fade.test.ts` already imports from it. Both files are off-limits to this unit and are owned by the
engine session.

## Options for the Orchestrator's ruling

| Option | Cost | Ruling |
| --- | --- | --- |
| Home in `tests/setupBrowser.ts`, proof with its control in `tests/setupBrowser.test.ts` | Grants two files the engine session owns; serialize with that session. The design verdict's § Proof and § Units name `tests/setupStyles.ts`, so the verdict's placement changes. | Recommended. It matches the module split the `tests/setupStyles.ts` header and `.claude/rules/tests.md` § Shared test infrastructure state, and the proof runs in an existing browser project. |
| Keep `tests/setupStyles.ts`, add a browser project or file that collects a styles-setup proof | Needs `vite.config.ts` or `configs/**` (off-limits), and a proof file split out of `tests/setupStyles.test.ts`. The module header still turns false. | Not recommended. |
| Prove the helper inside `fade.test.ts` | Stays in owned files. Breaks the placement rule for setup-helper proofs. | Refused. |

## The Unknown's reading

Chromium 141 (`HeadlessChrome/141.0.0.0`) reports a CSS transition's easing through
`effect.getTiming().easing` as the specified keyword. The run built the cascade with
`npm run build:src:styles` (exit 0). It then ran a temporary case in `fade.test.ts` through
`npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=verbose tests/src/styles/components/fade.test.ts -t measure`.
The case removed `.show` from a `.fade.show` element and read each animation:

- The shipped rule at the base: one `CSSTransition`, `transitionProperty` `opacity`, `duration` `150`,
  `easing` `linear`, opacity `1` at `currentTime` `0` and `0.5` at `75` with the transition paused.
- The same element with an inline `transition-timing-function: ease-out`: one `CSSTransition`,
  `duration` `150`, `easing` `ease-out`, opacity `1` at `0` and `0.315357` at `75`.
- At `--vn-factor-motion: 0`: `getAnimations()` returned no animation and the computed
  `transition-duration` was `0s`. Chromium starts no transition at a zero duration. At factor `0` the
  proof therefore asserts that no transition runs. It can't assert a zero duration.

## Pin searches

- `grep -rln linear tests/src/styles tests/app tests/service` found
  `tests/src/styles/components/{fade,spinner,progress,placeholder}.test.ts`,
  `tests/src/styles/utilities/background.test.ts`, and
  `tests/app/browser/sections/BackgroundSection.test.ts`. Only the `fade.test.ts` hits read the fade.
  The others read `animation-timing-function` or `linear-gradient(`.
- `grep -rn linear tests/src/browser` found `Delegate.test.ts` (around line 1376), `Backdrop.test.ts`,
  `helpers.test.ts`, and `Alert.test.ts` (around line 367). Each loads its own fixture CSS through
  `scene.load` and does not read the shipped fade. A search of `tests/src/browser` for `ease-out`,
  `timing-function`, `getTiming`, and `easing` found no transition-easing reading. No engine proof
  reads the fade's easing, so the brief's stop condition on engine proofs did not fire.

## Carried facts for the successor brief

- The ledger's stale-departure case is `names no departure the compiled cascade no longer carries` in
  `tests/conformance.test.ts`.
- The fade's departure row is in the `transition` table of `guides/veneer.md` § Departures. With the
  rule on `var(--vn-ease-out)`, the row's Veneer cell reads
  `opacity var(--vn-motion-feedback) var(--vn-ease-out)`. The `classifyDeparture` helper in
  `tests/setupServer.ts` still classifies that cell `tokenized`, because the value gains `--vn-*` names.
- `guides/veneer.md` § Fade classes states the easing in two places: the paragraph that opens "The
  `.fade` rule transitions the opacity linearly", and the "The duration reads the motion token"
  departure bullet. The proof paragraph at the end of that section lists the fade proof's readings.
- `fade.test.ts` pins `linear` in the `declares the transition over the motion token…`,
  `transitions the opacity linearly…`, and `yields the transition to the collapsing rule…` cases.

## Gates

None ran. The unit stopped before any edit.
