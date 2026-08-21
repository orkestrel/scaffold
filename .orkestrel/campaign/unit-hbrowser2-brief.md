# Unit H-browser-2: color measurement, capture, and the journal

## Role and engine

Role `implementer`, engine **Opus 5**, native subagent, sole writer in
`C:/Users/mikes/WebstormProjects/test`. You perform the assignment directly and spawn nothing.

## Objective

Land the reconciled round's remaining browser families (`design2-reconciliation.md`, families
4, 5, and 7): the `Color` measurement family with `contrast` gaining an optional floor, the
pane/capture exports with `place` delegation, and the journal entity.

## First measurement, before any edit

Whether `commands.readFile` resolves from `vitest/browser` in THIS workspace without a
consumer-registered custom command: a throwaway probe under `tmp/probe/` (the `probe` project
collects it) that writes a file from Node setup or via an existing seam, then calls
`commands.readFile` on it from a browser test. If it does NOT resolve, STOP and report — the
byte-readback half of family 5 is unimplementable as designed and the Orchestrator re-rules.
Delete the probe either way.

## Context

Authority: `AGENTS.md`; `.claude/rules/names.md`, `.claude/rules/typescript.md`,
`.claude/rules/architecture.md` (factories create*; one class per file where a class is
warranted — the journal is an object-literal factory per the `createRecorder` precedent),
`.claude/rules/tests.md`, `.claude/rules/documentation.md`, `.claude/rules/writing.md`. Guide
`guides/test.md` granted for your own Surface/Voices rows, the `JournalInterface` methods
table, and any sentence your exports falsify (the H-browser-1 precedent: correct a falsified
sentence, delete a count, record it).

Supervisor originals (read-only): the tint family `supervisor/tests/setupBrowser.ts:795-1064`,
the pane/capture layer `:168-291`, the journal `:657-781`.

The published layer: `contrast(element)` at `test/src/browser/helpers.ts` (near `:521` before
this wave; locate by name) throws on an unpainted chain — that refusal is CONTRACT and stays
the no-floor behaviour; `createPortfolio` in `src/browser/factories.ts` records provider paths
without byte verification; `readFocus(): string | undefined` exists and KEEPS its meaning
(focused text) — the focus-ring measurer is `readRing`.

## The design, fixed by the reconciled round

Family 4 — in `src/browser/types.ts`, `constants.ts`, `helpers.ts`:

- `type Color = readonly [red: number, green: number, blue: number, alpha: number]`;
  `CANVAS_COLOR: Color` (white).
- `parseColor(value): Color | undefined` (never a transparent sentinel — `undefined` on
  unsupported syntax; cover `rgb()`, `rgba()`, `color(srgb ...)`).
- `blendColor(front, back): Color`; `measureLuminance(color): number`;
  `measureContrast(front, back): number`; `readBackdrop(element, floor): Color` (floor
  REQUIRED — the leaf never guesses).
- `contrast(element, floor?)`: omitted floor keeps today's strict refusal EXACTLY (every
  existing case green unchanged, the guide fence value re-verified); supplied floor composites
  the ancestor walk onto it and never refuses for want of paint.
- `readRing(control, worn?)`: measure-only — never acts on the element (no tab, no focus
  call); `undefined` when the control is not showing `:focus-visible`; `worn` defaults to
  `control`; make it frame-aware only if measurement genuinely needs it and record the choice.

Family 5 — in `src/browser/helpers.ts`, `constants.ts`, `factories.ts`, `types.ts`:

- `CAPTURE_PANE` constant; `stagePane(width, height): Promise<void>`; `releasePane(): void`;
  `captureFrame(options: FrameOptions): Promise<string>` with
  `FrameOptions { path, width, height, element? }` — stages, captures (the page when
  `element` is omitted), compares the provider's bytes with the file read back from disk,
  releases in `finally`, returns the verified path.
- `createPortfolio.place` delegates its enabled write to `captureFrame` and gains the optional
  element; its refusals and disabled gate stay byte-identical.
- The Vitest-runner-internal pane coupling (the tester iframe selectors) is stated as contract
  in TSDoc with the installed Vitest version named, and the loud pane-size mismatch check from
  the supervisor original is kept.

Family 7 — in `src/browser/types.ts`, `factories.ts`:

- `JournalStep { action, trigger, result }`; `JournalInterface { steps, output, start(),
  stop(), record(action, trigger, result) }` — `start` clears and arms (begin or restart),
  `stop` hands the console back; `steps`/`output` return snapshots; the intercepted console
  channels stay private; every console call FORWARDS to the real channel (a recorder, never a
  replacement — contract line in TSDoc); uncaught errors and unhandled rejections are
  recorded; repeated `stop` is a no-op; restoration is by identity.
- `createJournal(): JournalInterface` in `factories.ts`. No singleton.

## Tests

In `tests/src/browser/helpers.test.ts` and `tests/src/browser/factories.test.ts`, the
reconciled case lists: parseColor across the syntaxes plus a refused keyword; blend/luminance/
contrast identities (black/white, symmetry, translucent layers); strict `contrast` unchanged
plus the floored composite over an unpainted stack; `readRing` with a `:focus-visible` control
(reach focus through the published verbs, never inside the helper) and a non-focused control;
`stagePane`/`releasePane` lifecycle including release on a failing path; `captureFrame`
writing a real file, reading it back, matching, and a planted mismatching file failing with
its own voice; `place` delegation with existing refusals unchanged; the journal's full case
list (records only while started; forwards and swallows nothing; error and rejection capture;
restart clears; restoration by identity; snapshot isolation).

## Scope

- Owned: `src/browser/types.ts`, `src/browser/constants.ts`, `src/browser/helpers.ts`,
  `src/browser/factories.ts`, `tests/src/browser/helpers.test.ts`,
  `tests/src/browser/factories.test.ts`, `guides/test.md` per the grant above.
- Off-limits: `src/core/**`, `src/server/**`, every other test file, `package.json`,
  `vite.config.ts`.
- Standing entries: everything `git status --porcelain` lists at your start is standing.
- No commits, installs, or git checkout/restore/stash/reset/clean. Use `npx.cmd`.

## Acceptance criteria, in this order

1. The `commands.readFile` measurement's result.
2. `git status --porcelain` adds exactly the owned files to the standing entries.
3. Scoped `npx.cmd oxfmt --config .oxfmtrc.json --check` and
   `npx.cmd oxlint --config .oxlintrc.json --deny-warnings` on the owned files exit 0.
4. `npx.cmd tsc --noEmit --project tsconfig.json` and
   `npx.cmd tsc --noEmit -p configs/src/tsconfig.browser.json` exit 0.
5. `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=verbose --project src:browser`
   exits 0 — read and record the baseline first; every pre-existing proof passes; report
   totals and the delta.
6. `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=dot --project guides`
   exits 0.

## Output

The diff; raw output and exit code per criterion with baselines; the readFile measurement; any
falsified-sentence corrections with their counts deleted; any deviation. No process diary.

## Deviation contract

Stop on: the readFile measurement failing (family 5's readback is then unimplementable as
designed); an existing `contrast` case moving; parity red outside your rows. Naming within the
fixed set, TSDoc wording, and proof structure are yours: decide, record, carry on.
