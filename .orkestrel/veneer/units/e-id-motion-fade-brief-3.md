# Unit E-ID-MOTION-FADE round 3 — two guide sentences, one test title, and the reader's no-effect proof

Successor to `e-id-motion-fade-brief-2.md`. What changed: the audit (`mfade-audit-verdict.md`) passed every claim and
accepted F1, R1, and R4. This round applies them exactly as written here and nothing else.

## Role and engine

`builder` on Sonnet, a native Claude subagent reached through the harness's Agent tool, the sole writer in
`/home/user/veneer-mfade`, which holds round 2 uncommitted over Veneer `2376710`. Start every shell command with
`cd /home/user/veneer-mfade &&` and give every file tool an absolute path under it. Read `/home/user/scaffold/AGENTS.md`
and `/home/user/scaffold/.claude/rules/{tests,writing,names}.md`. No skill applies.

## Objective

Items 1 to 4 are applied as written, and the named gates exit 0.

## Context

**Evidence.** Measured in the worktree at round 2's tree:
- `guides/veneer.md` § Fade classes holds these sentences:
  - "The duration resolves to the release's `0.15s` value, so the `--vn-factor-motion` factor rescales it, and at a
    factor of `0` the browser runs no transition."
  - The proof paragraph beginning "The `tests/src/styles/components/fade.test.ts` proof reads each state in the
    browser:".
- `tests/setupBrowser.test.ts` holds the case `reads no transition on the same change once the transition is removed`.
- `sampleTransition` in `tests/setupBrowser.ts` throws `The ${property} transition carries no effect` when the found
  transition's `effect` is `null`.

Re-take each reading before editing, and stop if one differs.

**Law.**
- `.claude/rules/tests.md`: a behaviour gets a proof, and a case is named for what it proves.
- `.claude/rules/writing.md`: the substitution table replaces a temporal `once` with `after`.

**Installed primitives.** `@orkestrel/test` and `@orkestrel/test/browser`, as round 2 used them.

**Host.** Linux, bash. Put
`/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin` first on `PATH`,
and set `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`. Write every log, backup, and script under your worktree's
`tmp/units/`, and never into the scratchpad.

**Measurements.** None beyond the Evidence re-readings.

**Control identifiers.** Items 1 to 4 are this brief's labels.

**Standing conditions.** Round 2's changes stay, apart from the Items.

## Unknowns

None.

## Scope

**Owned.** `guides/veneer.md` (the two § Fade classes sites), `tests/setupBrowser.test.ts` (the retitle and one added
case in the `sampleTransition` suite), and `tmp/units/`.

**Shared (report-only).** None.

**Off-limits.** Every other path and every other line.

**What asserts the state this change ends.** None beyond the owned lines. `npm run test:guides` reads the guide.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No git command that writes, no install, and no
`npm run format`. Format with `./node_modules/.bin/oxfmt --config .oxfmtrc.json <files>`.

## Items

1. In § Fade classes, replace "The duration resolves to the release's `0.15s` value, so the `--vn-factor-motion`
   factor rescales it, and at a factor of `0` the browser runs no transition." with "The duration resolves to the
   release's `0.15s` value at a factor of `1` and rescales with the `--vn-factor-motion` factor, and at a factor of `0`
   the browser runs no transition."
2. Replace the § Fade classes proof paragraph with these two sentences:
   - "The `tests/src/styles/components/fade.test.ts` proof reads each state in the browser: the written selectors and
     declarations, the hidden and the shown opacity with the box and the pointer target a hidden element keeps, the
     transition at rest, under the staged preference, and under a doubled motion factor, the collapsing rule's
     transition on an element carrying the fade and collapsing classes, the fade on the alert, toast, tooltip,
     popover, tab pane, and modal, and every state inside a dark island."
   - "It also reads the running transition the browser starts as the `show` class leaves and returns: its duration,
     its `ease-out` easing, and its midpoint frame; the doubled duration at a doubled factor; and no transition at a
     zero factor or under the staged preference."
3. Retitle `reads no transition on the same change once the transition is removed` to `reads no transition on the same
   change after the transition is removed`.
4. Add one case to the `sampleTransition` suite in `tests/setupBrowser.test.ts`, titled `refuses a named transition
   that carries no effect`.
   - It loads the same cascade as the reading case and makes the same change that starts the opacity transition.
   - It sets that transition's `effect` to `null`.
   - It asserts that `sampleTransition(element, 'opacity')` throws `The opacity transition carries no effect`.
   - Plant: in `tests/setupBrowser.ts`, replace the `requireValue` on `transition.effect` with `transition.effect?.getTiming()`
     guarded by nothing. The case must fail with an `AssertionError` or a thrown `TypeError` naming a different
     message, which you record. Restore byte-identically.

## Execution

Perform the assignment directly and spawn nothing.

1. Re-take the Evidence readings.
2. Apply Items 1 to 4, and run Item 4's plant.
3. Run each gate in Acceptance, logged to `tmp/units/mfade-3-<gate>.log.txt` with `echo "exit=$?"` appended.

## Output

Write `tmp/units/mfade-report-3.md` and return the same text. It holds:
- each Item's before and after text;
- the plant reading;
- the gate table;
- `tmp/units/mfade-3.diff` (`git diff 2376710`) and `tmp/units/mfade-3-status.txt`.

State no count in prose.

## Deviation contract

Follow § Deviation protocol of `/home/user/scaffold/.agents/orchestration.md`. Stop and report when an Evidence reading
differs or a gate reads red outside a timeout under load. Nothing here is the unit's to settle except the new case's
body, which follows the reading case's fixture.

## Acceptance criteria

1. `npm run check` and `npm run lint:check` exit 0, and oxfmt leaves the owned files unchanged.
2. `npx vitest run --config vite.config.ts --no-cache --project setup:browser -t sampleTransition` passes.
3. Item 4's plant fails the new case, per its log.
4. `npm run test:guides` and `npm run test:policy` exit 0.

**Observations, not criteria.** None.

## Review evidence

The diff and status, the plant log, the gate logs, and a `checker` read of Items 1 to 3 against the diff.
