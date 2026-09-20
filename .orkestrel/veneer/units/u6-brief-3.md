# Unit U6 — successor brief 3: the audit round 1 fixes

## What changed and why

This brief supersedes `tmp/codex/u6-brief-2.md` for the remainder of the unit; every section of
`tmp/codex/u6-brief.md` stands except where this brief says otherwise. The audit round on the tree
you left (objective lane on Opus, subjective lane on Astra, checker, verifier) confirmed the shape
and the gates (full chain green on managed Chromium; `test:src:browser` green on Edge) and found
the defects listed under § Execution. Each names the lane and finding it came from. The verdict is
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u6-audit-verdict.md`; the lane
reports sit beside it under `units/`.

## Role and engine

Unchanged: `sol` on `gpt-6-astra` inside `codex exec --sandbox workspace-write` rooted at
`C:/Users/mikes/WebstormProjects/test`. Perform the assignment directly and spawn nothing. You
are the sole writer in this checkout.

## Context

**The tree.** `HEAD` is `f49bc7f`; the working tree carries the U6 edits (`git status --porcelain`
lists `guides/test.md`, `src/browser/constants.ts`, `src/browser/helpers.ts`,
`src/browser/types.ts`, `tests/setup.ts`, `tests/src/browser/helpers.test.ts`). Build on it.

**Host.** Unchanged: `npm.cmd run <name>`, `npx.cmd <bin>`, no network, no `git` write, managed
Chromium runs the browser project here. `test:src` runs the whole browser project in about half
a minute.

## Scope

**Owned.** `src/browser/helpers.ts`, `tests/src/browser/helpers.test.ts`, `guides/test.md`.
**Off-limits.** Everything else, including `tests/setup.ts` (its entries stand), `src/browser/types.ts`,
`src/browser/constants.ts`, `package.json`, every vendored path.

## Execution

Perform the assignment directly and spawn nothing. Source first, then proofs, then the guide.

1. **Media proofs (analyst 8, reviewer 18, reviewer 21).** In the media sequence and the media
   teardown cases, stage `motion: reduced` (the inverse of the host's reading) wherever the case
   stages motion to prove a change and a restore, so the restore assertion can fail. Add one case
   proving the print axis survives a motion-only stage: `stageMedia({ print: true })`, then
   `stageMedia({ motion: reduced })`, then `matchMedia('print').matches` is still true and the
   print paint still reads.
2. **Hold ordering (reviewer 14, 15).** In `holdAccessible`: read the `POINTER_HOLD` marker and
   refuse the double hold as the first statement of the implementation body, before resolving the
   target; set the marker before sending `mousePressed`, not after. In `releasePointer`: a marker
   whose press never landed is still released (the conditional `mouseReleased` stays keyed on the
   marker alone). Add a case proving a double hold on an absent second name refuses with the
   double-hold voice rather than the absent voice (the marker is read first).
3. **Unnamed media axes (reviewer 16).** In `stageMedia`, re-send the effective readings of
   `prefers-color-scheme` (`matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'`)
   and `forced-colors` (`matchMedia('(forced-colors: active)').matches ? 'active' : 'none'`) as
   features beside `prefers-reduced-motion`, so a stage never clears an axis the caller did not
   name. Add a case: send `Emulation.setEmulatedMedia` through `sendProtocol` with
   `features: [{ name: 'prefers-color-scheme', value: 'dark' }]`, read `matchMedia('(prefers-color-scheme: dark)').matches`
   true, then `stageMedia({ motion: reduced })`, and read it still true; `releaseMedia()` then
   reads the host's own value (record it, do not assume it).
4. **Documentation truth (reviewer 17, analyst 14, reviewer 24).** Rewrite the `releaseMedia`
   description paragraph (and the matching `Summary` cell in `guides/test.md`) to state what the
   reset does: it clears every emulated medium and media feature, so the engine's own readings
   return; an override the provider configured before the test is cleared too, and the `Bounds`
   bullet names that limit. Rewrite the `stageMedia` `@returns` and the guide sentence that says it
   "verifies delivery" so they say the read-back covers `print: true` and either `motion` value,
   and that `print: false` is sent and followed by a frame wait without a read-back. Remove the
   blank line at `guides/test.md:1625` that splits the Bounds list.
5. **Controls with receipts (reviewer 19, 20).** Re-run the scale control the right way: plant
   `const scale = 1` (drop the frame ratio) in `holdAccessible`, run
   `npm.cmd run test:src:browser -- tests/src/browser/helpers.test.ts -t 'misses at the unscaled point'`
   and record the mapped-hold assertion red; restore the source; run the same command green;
   keep both logs under `tmp/codex/` as `u6-3-plant-scale-red.log` and `u6-3-plant-scale-green.log`.
   Do the same for the pseudo control (plant: drop the `pseudo` argument from the
   `getComputedStyle` call; command `-t 'distinguishes pseudo-element paint'`) and the release
   control (plant: omit the explicit release in the case; command `-t 'holds the pressed paint'`),
   each as a red log and a green log of the same command. The test names are the descriptive ones
   the tree carries; change no name.
6. **Suite hygiene (reviewer 22, 23).** Remove the `console.log('U6 hold', …)` and
   `console.log('U6 media restored', …)` statements; put the readings they printed (user agent,
   `devicePixelRatio`, frame geometry, restored media state) in your report instead. Above each
   `it.fails` sentinel case, add a comment stating that an assertion inside an `it.fails` body
   cannot fail the suite and that the following case carries the proof; keep the assertion the
   lint requires.
7. **Gates.** `npx.cmd oxfmt --config .oxfmtrc.json --write` on the three owned files; then
   `npm.cmd run format:check`, `lint:check`, `check`, `build`, `test:src`, `test:policy`,
   `test:config`, `test:setup`, `test:guides`; record each command's final lines.

## Output

Write `tmp/codex/u6-report-3.md` and return its content: the diff summary per owned file; each
control's red and green readings with the log names; the readings the removed logs printed; each
gate command's exit code and final lines; and every deviation with expected, found, exact
evidence, done or not done, and at most one hypothesis. Do not restate the earlier reports.

## Deviation contract

Stop and report on: a gate that stays red after your own fix inside owned files; a need to edit an
off-limits file; a reading in § 3 that shows the engine refusing a re-sent `forced-colors` or
`prefers-color-scheme` feature (report the exact response and leave the axis out). Decide, record,
and carry on from: assertion wording, case order, TSDoc wording within the meaning this brief fixes.

## Acceptance criteria

1. Each of the three controls has a red log and a green log of the same command.
2. `format:check`, `lint:check`, `check`, `build`, `test:src`, `test:policy`, `test:config`,
   `test:setup`, `test:guides` exit 0.
3. `git status --porcelain` lists the six U6 files and nothing else; no `console.log` the unit
   added remains in `tests/src/browser/helpers.test.ts`.

## Review evidence

The actual `git diff` and `git status --porcelain` at return; the report; the six logs.
