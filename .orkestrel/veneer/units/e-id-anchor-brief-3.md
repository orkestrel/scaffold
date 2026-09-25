# Unit E-ID-ANCHOR round 3 — the dropdown's Chromium 141 limit follows how the menu opened, and every build is named

Successor to `e-id-anchor-brief-2.md`, which stays in place unedited. What changed: round 2 was audited in
`anchor-audit-2-verdict.md` (FAIL 2, 3; F-BUILDS). Round 2's brief tabulated the probe rows without `V.focus`, so the
dropdown's Chromium 141 sentence it dictated is false for a menu opened without a pointer press. This is the unit's third
round, so the Orchestrator rules the exact text; every Item is exact. Round 2 is committed on `unit/anchor` as
`98bd1b0`; this round writes over it.

## Role and engine

`builder` on Sonnet, a native Claude subagent reached through the harness's Agent tool, the sole writer in
`/home/user/veneer-anchor` (branch `unit/anchor` at `98bd1b0`). The plants run Chromium, which a bench sandbox cannot.
Start every shell command with `cd /home/user/veneer-anchor &&` and give every file tool an absolute path under it. Read
`/home/user/scaffold/AGENTS.md` and the rules `/home/user/scaffold/.claude/rules/{styles,tests,writing}.md`. No skill
applies.

## Objective

The four sites that state the dropdown's Chromium 141 painting bound it by how the menu opened, every site that says
"both builds" or "neither build" without naming them names Chromium 141 and 153, and the important and closed-state
catches each fail with an assertion under a plant.

## Context

**Evidence.** Measured at `98bd1b0`. Re-take each reading before editing, and stop if it differs.
- `src/styles/_mixins.scss`, the comment above `@mixin anchor-visibility($class)` (around lines 644 to 652).
- `src/styles/components/_dropdown.scss`, the comment above `@include anchor-visibility(dropdown-menu);` (around lines
  272 to 276), `_tooltip.scss` above `@include anchor-visibility(tooltip);` (around lines 71 to 75), and
  `_popover.scss` above `@include anchor-visibility(popover);` (around lines 76 to 80).
- `guides/veneer.md`, the Dropdown classes paragraph (around line 4718) with the sentences "Under that value Chromium 153
  does not paint an open menu whose toggle a scroll container clips entirely. Chromium 141 still paints that menu,
  because the engine does not anchor the menu there."
- `guides/veneer.md` § Tokens › § Additions, the Reason cell shared by the two `dropdown` rows (around lines 10490 and
  10491), the two `tooltip` rows (around 10587 and 10588), and the two `popover` rows (around 10589 and 10590). The
  column's cell width is 223 characters.

**Host.** Linux, bash. Put
`/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin` first on `PATH`,
and set `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers` (Chromium 141). Other worktrees run suites at the same time. Write
every log, backup, and script under `tmp/units/r3/`.

**Control identifiers.** None.

## Unknowns

None.

## Scope

**Owned.** The comments and the guide text the Items name, and `tmp/units/`. During a plant only, the mixin's
declaration, restored byte-identically. **Off-limits.** Every other line and path; no emitted declaration or selector
changes outside a plant. No git command that writes, no install, and no `npm run format`. Format with
`./node_modules/.bin/oxfmt --config .oxfmtrc.json <files>`.

## Items

1. Replace the mixin comment with:

   ```scss
   // Emits `position-visibility: anchors-visible` on the open popover state of the `$class` class, so
   // an overlay the engine promotes to the top layer computes that value while it is open and the
   // initial value while it is closed. The initial value is `anchors-visible` on Chromium 153 and
   // `always` on Chromium 141, so the open overlay computes the same value on both builds. Each
   // caller's partial states what that value paints for its overlay. The mixin declares nothing
   // important, and each caller includes it in the `components` layer, so a class of your own in a
   // later layer, or in none, overrides it without a specificity contest.
   ```

2. Replace the dropdown include comment with:

   ```scss
   	// A menu the engine promotes to the top layer computes `position-visibility: anchors-visible`
   	// while it is open, on Chromium 141 and 153. Neither then paints a menu whose toggle a scroll
   	// container clips entirely, except Chromium 141 when a pointer press on the toggle opened the
   	// menu, because the engine does not anchor that menu there. The rule sits in the `components`
   	// layer and declares nothing important, so a class of your own in a later layer, or in none,
   	// overrides it without a specificity contest.
   ```

   In the tooltip and popover include comments, replace "on both builds, and neither build then paints" with "on
   Chromium 141 and 153, and neither then paints", and re-wrap each comment at 100 columns without changing another
   word.
3. In the guide's Dropdown classes paragraph, replace the two quoted sentences with: "Under that value neither Chromium
   141 nor Chromium 153 paints an open menu whose toggle a scroll container clips entirely, except Chromium 141 when a
   pointer press on the toggle opened the menu, because the engine does not anchor that menu there." Re-wrap the
   paragraph at 100 columns without changing another word.
4. Replace the Reason cell of both `dropdown` rows with "The open menu computes `anchors-visible` on Chromium 141 and
   153. Neither paints it while a scroll container clips its toggle entirely, except Chromium 141 when a pointer press
   opened it, which the engine leaves unanchored."; of both `tooltip` rows with "The open tip computes `anchors-visible`
   on Chromium 141 and 153, and neither then paints a tip whose trigger a scroll container clips entirely."; and of
   both `popover` rows with "The open popover computes `anchors-visible` on Chromium 141 and 153, and neither then
   paints a popover whose trigger a scroll container clips entirely." Run oxfmt on the guide so the table re-pads.

## Execution

Perform the assignment directly and spawn nothing. Back up each owned file under `tmp/units/r3/` before editing.

1. Re-take the Evidence readings.
2. Apply Items 1 to 4.
3. Plants, each run over the owned styles files after `npm run build:src:styles`, logged to
   `tmp/units/r3/anchor-plant-<name>.log.txt` with the mixin's SHA-256 before and after, and restored byte-identically:
   - **`important`:** the mixin's declaration written `position-visibility: anchors-visible !important;`. Each of the
     dropdown, tooltip, and popover anchored-visibility cases fails with an `AssertionError` at its consumer-twin
     reading, and the mixins `position-visibility` case fails on its `important` field.
   - **`closed`:** the mixin's selector written `:where(.#{$class}):not(:popover-open)`. Each of the three
     anchored-visibility cases fails with an `AssertionError`.
   The owned styles files are `tests/src/styles/mixins.test.ts` and
   `tests/src/styles/components/{dropdown,tooltip,popover}.test.ts`; run them with
   `npx vitest run --config configs/src/vite.styles.config.ts --no-cache <files>`.
4. Run each gate in Acceptance, logged to `tmp/units/r3/anchor-<gate>.log.txt` with the command echoed first and
   `echo "exit=$?"` appended.

## Output

Write `tmp/units/r3/anchor-report-3.md` and return the same text: the Evidence re-readings, each Item's before and after,
the plant table (plant, case, log line, the `AssertionError`, the digests), the gate table,
`tmp/units/r3/anchor-3.diff` (`git diff 98bd1b0`), and `tmp/units/r3/anchor-3-status.txt`.

## Deviation contract

Follow § Deviation protocol of `/home/user/scaffold/.agents/orchestration.md`. Stop and report when an Evidence reading
differs, when a Reason cell does not fit its column after Item 4, when a plant does not fail a case it names, or when a
gate reads red. Settle nothing else yourself.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, and `npm run check` exit 0.
2. Each plant fails every case it names with an `AssertionError`, and the mixin's digest after each plant equals its
   digest before.
3. `npm run test:src:styles`, `npm run test:conformance`, `npm run test:guides`, and `npm run test:policy` exit 0.

## Review evidence

The diffs, the plant logs, and the gate logs. `analyst` on GPT-6 Astra rules the Orchestrator's text against the probe
logs; `checker` on Sonnet reads the Items against the diff.
