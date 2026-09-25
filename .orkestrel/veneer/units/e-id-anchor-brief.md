# Unit E-ID-ANCHOR — anchored visibility on the promoted overlays

## Role and engine

`opus` on Opus 5.5, a native Claude subagent, the sole writer in `/home/user/veneer-anchor` (branch `unit/anchor` cut
from Veneer at `LANDING_HEAD`, `node_modules` hardlinked from `/home/user/veneer`). The unit runs Chromium, which a
bench sandbox's child processes cannot, so it runs on the native writing lane. The harness environment block may name
another directory as the primary working directory; start every shell command with `cd /home/user/veneer-anchor &&` and
give every file tool an absolute path under it. Read, in order: `/home/user/scaffold/AGENTS.md`; the rules
`/home/user/scaffold/.claude/rules/{styles,tests,browser,names,documentation,writing,quality}.md`; D46 and D47 in
`/home/user/scaffold/.orkestrel/veneer/units/decisions-round-2.md`; E29 and its amendment in
`/home/user/scaffold/.orkestrel/veneer/engine/decisions.md`; and the seam ruling in
`/home/user/scaffold/.orkestrel/veneer/units/ebc-audit-3-verdict.md`, which governs enumeration-case titles. No skill
applies.

## Objective

A promoted dropdown menu, tooltip, or popover in the open popover state computes `position-visibility:
anchors-visible` on every supported build, so Chromium 141, whose initial value is `always`, matches Chromium 153, and
a consumer class overrides it without `!important`.

## Context

- **The measurement.** The engine session's J-NATIVE-PROBE round-3 file read on this host's Chromium 141.0.7390.37:
  the initial value of `position-visibility` is `always`, and under `anchors-visible` a fully clipped tooltip and
  popover are suppressed (`/home/user/scaffold/.orkestrel/veneer/units/native141/j-native-probe-3-141.log.txt`, the
  `V.support`, `V.tooltip`, and `V.popover` rows). Chromium 153's initial value is `anchors-visible`.
- **The rule E29 names.** `:where(.dropdown-menu, .tooltip, .popover):popover-open { position-visibility:
  anchors-visible }`. This unit settles whether one rule or one rule per partial carries it, following D46 (a shared
  technique is a pattern) and the ledger's per-component attribution; the selector keeps the class list at zero
  specificity and reads the open state through `:popover-open`.
- **The record.** Each emitted name the release lacks is a row of `guides/veneer.md` § Tokens › § Additions
  (Component, Name, Condition, Category, Veneer, Reason), which the conformance proof reads; the `Veneer` cell holds the
  declared value, and a `selector` row's cell is `—` (the § Additions preamble, search "The `Veneer` cell holds").
  Attribution reads a class inside a `:where()` argument as the rule's own (`collectAttributionClasses` and
  `collectLedger` in `tests/setupServer.ts`), so a rule whose `:where()` names the three keys' classes reaches each
  component's measurement. Read how `collectLedger` attributes such a rule before settling one rule or one per partial,
  and report the reading. Each component's § Styles classes subsection states the rule.
- **The enumeration cases.** `tests/src/styles/components/{dropdown,tooltip,popover}.test.ts` each hold a case that
  reads the set of components-layer selectors naming the key's classes (the dropdown case titled "hides the menu at
  rest, shows it through the class, and reaches the components layer with every recorded selector", and the tooltip
  and popover cases titled "writes the recorded … selectors and no other components-layer selector naming a … class");
  each admits the new selector by name, and its title and comment follow the seam ruling.
- **Host.** Linux, bash; put `/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin`
  first on `PATH` and set `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`. The styles project reads the built cascade, so
  run `npm run build:src:styles` before a styles test. Format only with
  `./node_modules/.bin/oxfmt --config .oxfmtrc.json <file>`. Other worktrees run suites at the same time; a timing
  failure under load is an observation with its reading.

## Unknowns

- Whether a Tailwind profile or the Tailwind consumer pairing reads `position-visibility`; search
  `tests/service/tailwind/` and `src/styles/` for it and report.

## Scope

**Owned.** `src/styles/components/{_dropdown,_tooltip,_popover}.scss`; `src/styles/_mixins.scss` and
`tests/src/styles/mixins.test.ts` only if the unit takes a mixin under D46; `tests/src/styles/components/{dropdown,tooltip,popover}.test.ts`;
`guides/veneer.md` (§ Tokens › § Additions rows and the Dropdown, Tooltip, and Popover classes subsections).
**Off-limits.** `src/browser/**`, `tests/src/browser/**`, `tests/setup*.ts`, the vendored files
(`tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`), `vite.config.ts`, `package.json`, and every
other path. No git command that writes, no install, no `npm run format`; `npm run build` is allowed.

## Execution

Perform the assignment directly and spawn nothing.

1. Write the proofs first and run each red at the base, recording the command and its failing count: in each of the
   three test files, a case that promotes an element with the key's class (`popover="manual"`, `showPopover()`),
   reads `position-visibility` computed `anchors-visible` while open and the browser's initial value while closed, and
   reads a consumer class written outside every layer override it to `always` without `!important`.
2. Add the rule, the Additions rows, the classes-subsection sentences, and the enumeration-case admissions with their
   titles and comments per the seam ruling; run the proofs green.
3. Mutation: delete the declaration; each new case must fail with an `AssertionError`, and the conformance proof must
   redden on an Additions row no name carries; restore byte-identically.
4. Run `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:src:styles`,
   `npm run test:conformance`, `npm run test:guides`, and `npm run test:policy`, each logged to
   `tmp/units/anchor-<gate>.log.txt` with `echo "exit=$?"` appended.

## Output

Write `tmp/units/anchor-report.md` and return the same text: the changes; the failing-first and green readings with
commands and counts; the mutation table; the Tailwind search result; the gate table; `tmp/units/anchor.diff`
(`git diff LANDING_HEAD`) and `tmp/units/anchor-status.txt`. State no count.

## Deviation contract

§ Deviation protocol of `/home/user/scaffold/.agents/orchestration.md`. This unit settles the rule's placement, the
case titles within the seam ruling, the Reason cells, and the subsection sentences. Stop and report if the computed
value is not `anchors-visible` on this host once the rule ships, if a change needs a file outside the owned set, or if
a gate reads red outside the change's reach.

## Acceptance criteria

The new cases read red at the base and green after; the declaration's deletion reddens each of them with an assertion
and the conformance proof with a stale Additions row; every gate in Execution step 4 exits 0.

## Review evidence

The diff and status, the mutation logs, and the gate logs. The audit runs `analyst` on GPT-6 Astra and `reviewer` on
Opus 5.5, and `checker` on Sonnet reads the Additions rows against the conformance output.
