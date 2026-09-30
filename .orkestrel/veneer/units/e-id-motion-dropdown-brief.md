# Unit E-ID-MOTION-DROPDOWN — the shown menu enters on Elements' scale-in

The dropdown row of `e-id-motion-design-verdict.md`, released by the engine session's third E32 amendment: `Dropdown`
completes synchronously, as Bootstrap's does, so a menu entry animation is cascade feedback its events do not wait for,
and J-DROPDOWN-SETTLE is struck. This unit adds the entry the design round recorded as the follow-up.

## Role and engine

`opus` on Opus 5.5, a native Claude subagent reached through the harness's Agent tool, the sole writer in
`/home/user/veneer-mdrop` (branch `unit/mdrop`, cut from Veneer `LANDING_HEAD`, `node_modules` hardlinked from
`/home/user/veneer`). The proofs launch Chromium, which a bench sandbox cannot drive. Start every shell command with
`cd /home/user/veneer-mdrop &&` and give every file tool an absolute path under it. Read, in order:
`/home/user/scaffold/AGENTS.md`; the rules
`/home/user/scaffold/.claude/rules/{styles,tests,names,typescript,documentation,writing,quality}.md`; the design verdict
`/home/user/scaffold/.orkestrel/veneer/e-id-motion-design-verdict.md` (its Dropdown and Tooltip and popover entry rows,
§ Proof, and § Risks), which binds; the dropdown bullet of `§ 5` in its planner proposal
`/home/user/scaffold/.orkestrel/veneer/units/e-id-motion-design-planner-proposal.md` (search "The dropdown gets an entry
motion only"); the engine decision E32 and its third amendment in `/home/user/scaffold/.orkestrel/veneer/engine/decisions.md`
(search "E32 amended a third time"); and the audit verdicts of the landed and in-flight motion units, whose findings name
the defects this unit must not repeat: `mmod-audit-verdict.md`, `mfac-audit-2-verdict.md`, `moff-audit-verdict.md`,
`moff-audit-2-subjective-verdict.md`, and `mcol-audit-verdict.md`, all under `/home/user/scaffold/.orkestrel/veneer/units/`.
No skill applies.

## Objective

A menu that gains the `show` class enters on Elements' surface scale-in: from `opacity: 0` and `transform: scale(0.98)`
to its resting `opacity: 1` and `transform: none`, with `opacity` over `--vn-motion-feedback` on `--vn-ease-out` and
`transform` over `--vn-motion-feedback` on `--vn-ease-standard`. A hide stays immediate. Under the reduced-motion
preference and at a zero motion factor no transition runs. Each value is read from the rendered transition, and the
ledger records it.

## The ruling

1. **Entry only.** E32's third amendment: a hide removes the `show` token at once, so an exit animation does not run
   through the engine. Write no `display` or `overlay` transition and no `allow-discrete` behaviour, and no closed-state
   `opacity` or `transform`.
2. **The transition** sits on the `.dropdown-menu.show` compound, beside its `display: block`, written through the
   `transition` mixin as `opacity var(--vn-motion-feedback) var(--vn-ease-out), transform var(--vn-motion-feedback)
   var(--vn-ease-standard)`, the list the toast unit writes on the `.toast.fade` compound.
3. **The starting values** sit in an `@starting-style` block on the bare `.dropdown-menu` selector, `opacity: 0` and
   `transform: scale(0.98)`, one class below the `.dropdown-menu.show` compound: the form the design round recorded. A
   menu without the `show` class computes `display: none`, so the block starts nothing there. Declare no resting
   `opacity: 1` or `transform: none`: a menu's resting values are the initial values, and a declared rest would outrank a
   consumer's class in the same layer for no reading this unit takes.
4. **The existing cases that read a shown menu read it settled.** Each awaits the installed `waitForAnimations` function
   from `@orkestrel/test/browser` on the menu before it reads a box or a paint. Add no helper that finishes, cancels, or
   waits on animations: the installed export does that job, and a hand-rolled one is a defect.

## Context

**Evidence.** Measured at Veneer `92ca407`. Re-take each reading in the worktree before editing, and report any that
differs.
- `src/styles/components/_dropdown.scss` writes `.dropdown-menu.show { display: block; }` inside `@layer components`,
  then `@include anchor-visibility(dropdown-menu);`. The partial's header comment says every value in the layer is
  Bootstrap 5.3.8's own and that no rule opens, closes, or places a menu on its own.
- `guides/veneer.md` § Dropdown classes states the menu's classes, its anchored visibility, its values, and the proof
  paragraph ("The `tests/src/styles/components/dropdown.test.ts` proof reads each resolved treatment in the browser").
  § Factors states which transitions the motion factor reaches. The `## Engine` Dropdown paragraph, which the engine
  session owns, says of the shown and hidden events: "Neither waits on a transition, because the cascade declares none on
  the menu."
- Elements' surface motion, the design verdict's source: `/home/user/elements/src/styles/surfaces/_popover.scss` (the
  closed-state rule and the `@starting-style` block around lines 200 to 280): `opacity: 0` and `transform: scale(0.98)`
  to `opacity: 1` and `transform: none`, over `--set-popover-transition-duration`, with no timing function, so `ease`.
- Resolved tokens (built `dist/src/styles/index.css`): `--vn-motion-feedback` is `calc(150ms * var(--vn-factor-motion))`,
  `--vn-ease-out` is `ease-out`, and `--vn-ease-standard` is `ease`. `src/browser/Dropdown.ts` and `src/browser/Placement.ts`
  write no `transform` (`git grep -n 'transform\|translate\|scale' -- src/browser` returns nothing).
- The engine case J-CONCERNS-B landed, `dispatches shown and hidden inside the call while a transition the cascade gives
  the menu still runs` in `tests/src/browser/Dropdown.test.ts`, plants its own unlayered menu motion beside the shipped
  cascade and reads the events before the motion ends.
- **The Orchestrator's probe** (`/home/user/scaffold/.orkestrel/veneer/units/dropdown-entry-probe/`): at `92ca407`, the ruled rules applied to
  `_dropdown.scss` alone, Chromium 141. Base and candidate each ran:
  `npx vitest run --config vite.config.ts --no-cache --project src:browser` over `Dropdown`, `Delegate`, `Placement`,
  `Tab`, `ScrollSpy`, `HostSnapshot`, and `helpers` (`451 passed` both); `setup:browser` over `tests/setupBrowser.test.ts`
  (`101 passed` both); `app:browser` over `integration.test.ts` and the `ButtonGroup`, `Dropdown`, `Engine`,
  `InputGroup`, `Nav`, and `Navbar` sections (`46 passed` both); and, after `npm run build:src:styles`,
  `npx vitest run --config configs/src/vite.styles.config.ts` over `dropdown`, `nav`, `navbar`, `button-group`, and
  `mixins` (base `221 passed`; candidate `12 failed | 209 passed`). Every failure is in `dropdown.test.ts`, each reading a
  menu mounted with `show` before its entry settles:
  - `opens the $wrapper menu on the $opens side of its toggle, one spacer away`, for each wrapper;
  - `aligns the end menu to its wrapper end under the placement attribute, the start and centered menus to its start, and publishes each side`;
  - `switches the $name alignment and the published side at its boundary`, for each breakpoint;
  - `paints the selected and the pressed item from the active slots and refuses each disabled host`;
  - `rescales the menu with the density factor and stacks it from the dropdown tier`.
- **The ledger** (the same probe, then `npm run build:src` and the `conformance` project, `candidate-conformance.log.txt`):
  `Tests 3 failed | 42 passed (45)`. Two cases fail on the rows the guide does not yet record, which the gate prints as
  `dropdown | .dropdown-menu.show { transition } | — | declaration | opacity var(--vn-motion-feedback) var(--vn-ease-out),
  transform var(--vn-motion-feedback) var(--vn-ease-standard)`, its `@media (prefers-reduced-motion: reduce)` twin reading
  `none`, and `{ opacity }` and `{ transform }` under the `@starting-style` condition reading `0` and `scale(0.98)`. The
  probe wrote the starting values on the `.dropdown-menu.show` compound; ruling 3 puts them on the bare selector, so take
  the rows' selector from the gate. The case `writes exactly the media conditions the guide table states, each in the form
  the release writes` fails because `collectMediaFeatures` in `tests/setupServer.ts` reads the `@starting-style` block as
  a media condition: `normalizeMediaCondition` strips the at-rule keyword and leaves an empty feature, so the cascade side
  gains `""`. `npm run test:guides` passes on the candidate (`26 passed`).

**Law.** `AGENTS.md`; `.claude/rules/styles.md` (tokens, the `transition` mixin, reduced motion); `.claude/rules/tests.md`
(read the rendered result; a mutation kills only with an `AssertionError`; no fake clock); `.claude/rules/names.md`;
`.claude/rules/typescript.md`; `.claude/rules/documentation.md` § Parity; `.claude/rules/writing.md`;
`.claude/rules/quality.md`. No skill. The guide is `guides/veneer.md`.

**Installed primitives.** `@orkestrel/test` and `@orkestrel/test/browser` (read the declarations under
`node_modules/@orkestrel/test/dist/src/`): `waitForAnimations`, `readStyle`, `readPixels`, `matchesColor`, and
`requireValue`. The shared readers in `tests/setupBrowser.ts` (`sampleTransition`, which returns the running transition
with its duration, easing, start, and midpoint, and the factor helper beside it that runs one drive at the factors `1`,
`2`, and `0`) and in `tests/setupStyles.ts` (the token specimens the landed motion proofs compare with). A wait, a settle,
a reader, or a factor loop whose job one of these does is a defect.

**Host.** Linux, bash. Put
`/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin` first on `PATH`,
and set `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers` (Chromium 141). Run `npm run build:src:styles` before a styles run,
and run a styles file with `npx vitest run --config configs/src/vite.styles.config.ts <files>`. Run `npm run build:src`
before `npm run test:conformance`, the engine proofs, and `npm run test:app`. Other worktrees run suites at the same time,
so a timing failure is a question for the Orchestrator's re-run rather than yours. Write every log, backup, probe, and
script under this worktree's `tmp/units/`, never in the scratchpad.

**Measurements.** The probe's readings are the Orchestrator's at `92ca407` under contention from other units' suites.
Re-take the styles failures before editing.

**Control identifiers.** None. Name each test for what it proves.

**Standing conditions.** None known: every gate reads green at `92ca407` on this host.

## Unknowns

- **The shown menu's entry through the engine's own writes.** Read `src/browser/Dropdown.ts` (`show` and `hide`) and
  `src/browser/Placement.ts` for the writes a show makes to a menu: the class, the `popover` attribute and the
  `showPopover` call where the placement promotes the menu, and their order. Report the sequence, and drive the entry
  case through the same writes for a menu left in place and a menu promoted to the top layer.
- **The ledger rows.** Take them from the gate's output after the change, never by hand, and report each row as the gate
  printed it.

## Scope

**Owned.** In `src/styles/components/_dropdown.scss`, the `.dropdown-menu.show` rule, the added `@starting-style` block,
their comments, and the header comment's sentences the change makes false; `tests/src/styles/components/dropdown.test.ts`;
in `guides/veneer.md`, § Dropdown classes, the ledger rows the gate prints for this change, and § Factors wherever it
lists what the motion factor reaches; and `tmp/units/`.

**Shared (report-only).** In `guides/veneer.md`, the `## Engine` Dropdown sentence "Neither waits on a transition,
because the cascade declares none on the menu." Write its replacement to say what E32's third amendment rules: the events
do not wait for the menu's entry motion, because Bootstrap's dropdown completes at once. Return the exact hunk; the
engine session owns the section, and the Orchestrator sends it the hunk before the landing. Leave the guide file's copy of
that section unchanged in the worktree.

**Shared (report-only), applied in the worktree.** In `tests/setupServer.ts`, the `collectMediaFeatures` function and its
doc block only, and in `tests/setupServer.test.ts`, one case in its `describe` block: `collectMediaFeatures` adds no
feature for a condition that writes none, such as the `@starting-style` block's, so `['@starting-style', '@media print']`
collects `['print']`. LEDGER-RETUNE owns both files; apply the change in the worktree so the gates read the final state,
and return the exact hunks for the landing to merge by hunk.

**Off-limits.** `src/browser/**`, `src/core/**`, `tests/src/browser/**`, `tests/app/**`, `app/**`, every other line of
`tests/setupServer.ts` and `tests/setupServer.test.ts`, `tests/setupBrowser.ts`, `tests/setupStyles.ts`, every other partial and style test, every
other guide section, `ROADMAP.md`, the vendored files (`tests/setupPolicy.ts`, `tests/policy.test.ts`,
`tests/config.test.ts`), `vite.config.ts`, and `package.json`.

**What asserts the state this change ends.** The `dropdown.test.ts` cases the probe names; the conformance ledger's rows
and its § Additions and § Departures checks; `npm run test:guides` over § Dropdown classes and § Factors; and the
partial's header comment.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No git command that writes, no install, and no
`npm run format`; format with `./node_modules/.bin/oxfmt --config .oxfmtrc.json <files>`. `npm run build:src:styles` and
`npm run build:src` are allowed.

## Execution

Perform the assignment directly and spawn nothing.

1. Re-take the Context readings and the Unknowns' engine sequence.
2. Write the entry proofs first, and run them red on the base cascade (record the command and its failing count):
   - **The entry.** For a menu left in place and a menu the placement promotes, each driven through the engine's writes:
     `sampleTransition` on `opacity` and on `transform` returns a transition whose duration and easing equal the
     resolved `--vn-motion-feedback` token and the `--vn-ease-out` and `--vn-ease-standard` curves (compared with a token
     specimen, never a literal), whose start frame is `0` and `matrix(0.98, 0, 0, 0.98, 0, 0)`, and whose midpoint lies
     strictly between each start and end, with the scale uniform and untranslated; the menu's `getAnimations()` holds
     those two transitions and nothing else; after both finish, the menu reads `opacity: 1` and `transform: none`.
   - **The hide.** Removing `show` from an entered menu starts no transition and reads `display: none` at once.
   - **The factor and the preference.** Through the factor helper, the entry's durations double as a ratio to the
     resting reading at a factor of `2` and run no transition at `0`; under the staged reduced-motion preference, no
     transition runs and the menu reads its resting values at once.
3. Apply the ruling, run the entry proofs green, and make the probe's failing cases read the settled menu (ruling 4).
   Run `dropdown.test.ts` whole, then `nav`, `navbar`, `button-group`, and `mixins`.
4. Write the `collectMediaFeatures` case red first, then the change. Run `npm run build:src` and
   `npm run test:conformance`, and update the ledger rows from the gate's output. Update the guide and the header comment.
5. Plants, each in a successor-safe script `tmp/units/mdrop-plants.sh` that backs up the file, applies the plant, rebuilds
   the styles, runs `dropdown.test.ts`, logs to `tmp/units/mdrop-plant-<name>.log.txt`, restores the file, and records a
   `cmp` against the backup. Each must fail a case with an `AssertionError`:
   - **`mixin`**: the `@include transition(…)` written as a bare `transition:` declaration (the reduced-motion reading);
   - **`start`**: the `@starting-style` block removed (the entry);
   - **`scale`**: `scale(0.98)` written as `scale(0.9)` (the start frame);
   - **`curve`**: the transform written on `var(--vn-ease-out)` (the easing);
   - **`exit`**: `display var(--vn-motion-feedback) allow-discrete` added to the list and `opacity: 0` written on
     `.dropdown-menu:not(.show)` (the hide).
6. Run every Acceptance gate, each logged to `tmp/units/mdrop-<gate>.log.txt` with the command echoed first and
   `echo "exit=$?"` and `cat /proc/loadavg` appended.

## Output

Write `tmp/units/mdrop-report.md` and return the same text: the engine sequence you read; the rules as written; the red
and green readings with commands and counts; a case table stating for each case what it drives and what it reads; the
plant table (plant, change, log, result, failing cases, restore); the ledger rows as the gate printed them; the guide and
comment sentences as written; the `## Engine` hunk and the `tests/setupServer.ts` and `tests/setupServer.test.ts` hunks; the gate table with loads; `tmp/units/mdrop.diff` (`git diff
LANDING_HEAD`) and `tmp/units/mdrop-status.txt`. State no count in prose.

## Deviation contract

Stop and report (expected, found, exact evidence, done or not done, at most one short hypothesis) when a reading the
ruling rests on differs: the settled menu reads other than `opacity: 1` and `transform: none`, a proof outside the owned
set goes red, or an engine proof reads the entry. Stop, too, when a change needs a file outside Owned. Settle yourself
where each sentence sits, the case titles, the comment wording, and whether a case reads the promoted menu through its own
mount or the placement's.

## Acceptance criteria

1. `npm run check` and `npm run lint:check` exit 0, and oxfmt's `--check` exits 0 over the owned files.
2. After `npm run build:src:styles`, `dropdown.test.ts`, `nav.test.ts`, `navbar.test.ts`, `button-group.test.ts`, and
   `mixins.test.ts` pass.
3. Every plant fails a case with an `AssertionError`, per its log, and restores identically.
4. `npx vitest run --config vite.config.ts --no-cache --project setup tests/setupServer.test.ts` passes; after
   `npm run build:src`, `npm run test:conformance`, `npm run test:guides`, and `npm run test:policy` exit 0.
5. After `npm run build:src`, `npx vitest run --config vite.config.ts --no-cache --project src:browser
   tests/src/browser/Dropdown.test.ts tests/src/browser/Placement.test.ts tests/src/browser/Delegate.test.ts` and
   `npm run test:app` exit 0.

**Observations, not criteria.** `npm run test:src:styles` over the whole project, with its load reading. The Orchestrator
runs the journey captures and the engine session's Chromium 153 reading at the landing.

## Review evidence

The diff and status, the red and green logs, the plant logs, the gate logs, and the rendered readings the entry proofs
take. The audit runs the objective and the subjective lanes on a claims file.
