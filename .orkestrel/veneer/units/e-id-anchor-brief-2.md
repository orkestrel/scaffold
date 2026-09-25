# Unit E-ID-ANCHOR round 2 — the anchored-visibility prose and comments claim only what the probes measured

Successor to `e-id-anchor-brief.md`, which stays in place unedited. What changed: round 1 was audited in
`anchor-audit-verdict.md` (FAIL 2, 4, 6, 7; outside the claims MID-LOG, F1, F2, R1). This round carries every one of
those findings and nothing else. Round 1 is committed on `unit/anchor` as `c9c6907`; this round writes over it. The
rule, its placement, its rows, and its computed-value proofs stand.

## Role and engine

`opus` on Opus 5.5, a native Claude subagent reached through the harness's Agent tool, the sole writer in
`/home/user/veneer-anchor` (branch `unit/anchor` at `c9c6907`, round 1 over Veneer `0a0a252`, `node_modules`
hardlinked from `/home/user/veneer`). The unit runs Chromium, which a bench sandbox's child processes cannot, so it
runs on the native writing lane. Start every shell command with `cd /home/user/veneer-anchor &&` and give every file
tool an absolute path under it. Read, in order: `/home/user/scaffold/AGENTS.md`; the rules
`/home/user/scaffold/.claude/rules/{styles,tests,names,documentation,writing,quality}.md`; D47 and D47a in
`/home/user/scaffold/.orkestrel/veneer/units/decisions-round-2.md`; the seam ruling in
`/home/user/scaffold/.orkestrel/veneer/units/ebc-audit-3-verdict.md`; the round-1 brief `e-id-anchor-brief.md` (its
Scope, Host, and Objective still bind except where this brief overrides them); and the audit record under
`/home/user/scaffold/.orkestrel/veneer/units/`: `anchor-audit-verdict.md` (the ruling; it wins over the lane files),
`anchor-audit-objective-verdict.md`, and `anchor-audit-subjective-verdict.md`. No skill applies.

## Objective

Every sentence and comment about the anchored-visibility rule states the computed value it proves and bounds the
painting it claims to the probe rows that measured it, each enumeration and anatomy comment names what its assertion
reads, and every red the report claims is on the record.

## Context

**The measurements.** The engine session's J-NATIVE-PROBE round-3 file ran on this host's Chromium 141.0.7390.37
(`/home/user/scaffold/.orkestrel/veneer/units/native141/j-native-probe-3-141.log.txt`) and on the engine session's
Chromium 153 (`/home/user/scaffold/.orkestrel/veneer/engine/units/j-native-probe-3-153.log.txt`). Each `ROW` line
compares the candidate rule with an `always` control; `"differs":true` means the candidate stopped painting the overlay
(`hitIsOverlay` false in its `clipped` reading) where the control kept it. Read by `grep -o '^ROW V\.[a-zA-Z.]*
{"differs":[a-z]*'` over both logs:

| Row | What it clips | Chromium 141 | Chromium 153 |
| --- | --- | --- | --- |
| `V.clip.dropdown` | a scroll container clips the dropdown toggle entirely | `false` | `true` |
| `V.partial` | a scroll container clips the dropdown toggle in part | `false` | `false` |
| `V.viewport` | a viewport scroll moves the dropdown toggle out of view | `false` | `false` |
| `V.tooltip` | a scroll container clips the tooltip trigger entirely | `true` | `true` |
| `V.popover` | a scroll container clips the popover trigger entirely | `true` | `true` |

The Chromium 141 dropdown row reads `false` because the engine does not anchor the menu there
(`/home/user/scaffold/.orkestrel/veneer/engine/units/j-placement-141-diagnosis-verdict.md`); J-PLACEMENT-141-FIX in the
engine session changes that, and ANCHOR-PAINT updates the sentence after it lands. No row measures a partial clip or a
viewport scroll of a tooltip or popover trigger, so no sentence claims either.

**The override mechanism.** A consumer rule outside every layer, or in a later layer, outranks the `components` layer at
any specificity. `guides/veneer.md` states that mechanism in § Tokens (search "a class of your own in a later layer, or
in none"). The proofs' consumer class is unlayered.

**Host.** Linux, bash; put `/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin`
first on `PATH` and set `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers` (Chromium 141). Run `npm run build:src:styles`
before a styles test. Format only with `./node_modules/.bin/oxfmt --config .oxfmtrc.json <files>`. Other worktrees run
suites at the same time; a timing failure under load is an observation with its reading. Write every log, backup, and
script under `tmp/units/r2/`.

**Control identifiers.** The Item numbers are this brief's labels. Name each test for what it proves.

## Unknowns

None.

## Scope

**Owned.** As round 1: `src/styles/components/{_dropdown,_tooltip,_popover}.scss` (comments only);
`src/styles/_mixins.scss` (the `anchor-visibility` mixin's comment only); `tests/src/styles/mixins.test.ts`;
`tests/src/styles/components/{dropdown,tooltip,popover}.test.ts` (comments, and titles only where a comment change
requires); `guides/veneer.md` (the Dropdown, Tooltip, and Popover classes subsections' anchored-visibility paragraphs
and the three components' § Additions Reason cells for the rule); `tmp/units/`.
**Off-limits.** Every other path and line, including every emitted declaration and selector, `tests/setup*.ts`, the
vendored files (`tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`), `vite.config.ts`,
`package.json`, and `ROADMAP.md`. No git command that writes, no install, and no `npm run format`.

## Items

1. **Claim 2 and F1: the source comments.** Rewrite the comment above each `@include anchor-visibility(…)` and the
   mixin's own comment so each states the computed value in the open popover state, bounds the painting to the
   preceding table (a tooltip or popover whose trigger a scroll container clips entirely is not painted on either
   build; a dropdown menu whose toggle a scroll container clips entirely is not painted on Chromium 153 and is on
   Chromium 141), and gives the override reason as the layer order, not the `:where()` group.
2. **Claim 4: the dropdown enumeration comment.** Replace "while an extra selector and a second rule on a recorded
   selector leave the reading unchanged" with "and an extra selector or a second rule on a recorded selector passes
   unreported", and re-read the case's title against the seam ruling.
3. **Claim 6, F2, and MID-LOG: the proofs on the record.**
   - Scope each anchored-visibility case's anatomy comment by build: on a build whose initial value is `always`, such
     as Chromium 141, the case catches the open-state rule dropped or written on the closed state; on every build it
     catches the rule written important; and the mixins case holds the rule's text on every build.
   - Run the button-reboot case of `tests/src/styles/mixins.test.ts` with its population predicate set back to
     round 1's base form (`rule.selectorText.startsWith(':where(')`) over the built cascade, retain the failing log with
     its `AssertionError` as `tmp/units/r2/anchor-old-predicate.log.txt`, restore the file byte-identically, and cite
     that log wherever the report says the old predicate fails.
   - In the report, state that the mixins case's red comes from the declaration-deletion mutation
     (round 1's `tmp/units/anchor-mutation-styles.log.txt` and this round's `tmp/units/r2/` rerun), which leaves the cascade as the base leaves it for this property, and claim no
     base run for it.
4. **Claim 7: the guide.** In the Dropdown, Tooltip, and Popover classes subsections and the three Reason cells:
   - (a) State the computed value, then the painting bounded to the preceding table; delete "shows only while its
     toggle is visible" and its "trigger" twins, and keep one statement of the clipping condition per paragraph.
   - (b) State the dropdown's Chromium 141 limit: the rule computes on both builds, and the menu stays painted on
     Chromium 141 because the engine does not anchor it there.
   - (c) Give the override reason as the layer order, in the words of § Tokens.
   - Use "initial value" for the value a closed overlay computes, in the paragraphs, the mixin comment, and the case
     comments.
5. **R1: `mixins.test.ts`.**
   - A declaration outside a style rule records no invented selector: represent its absence as `undefined` per
     `AGENTS.md` § Design laws, or record what the parent is, and keep the sort total without an empty-string sentinel.
   - The revert case and the reboot case read one population: both use the whole-group predicate, defined once in the
     file.

## Execution

Perform the assignment directly and spawn nothing.

1. Apply Items 1, 2, 4, and 5.
2. Run Item 3's old-predicate reading and restore; apply Item 3's comment and report changes.
3. Run the round-1 mutation (delete the declaration in each partial) once more over the round-2 tree, logged to
   `tmp/units/r2/anchor-mutation-styles.log.txt`, and confirm every case round 1 named still fails with an
   `AssertionError`, including the revert case's population change from Item 5; restore byte-identically.
4. Run `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:src:styles`,
   `npm run test:conformance`, `npm run test:guides`, and `npm run test:policy`, each logged to
   `tmp/units/r2/anchor-<gate>.log.txt` with the command echoed first and `echo "exit=$?"` appended.

## Output

Write `tmp/units/r2/anchor-report-2.md` and return the same text: per Item, the before and after of each sentence and
comment; the old-predicate reading and the mutation table with each `AssertionError` line; the gate table;
`tmp/units/r2/anchor-2.diff` (`git diff c9c6907`), `tmp/units/r2/anchor-2-full.diff` (`git diff 0a0a252`), and
`tmp/units/r2/anchor-2-status.txt`. State no count in prose.

## Deviation contract

Follow § Deviation protocol of `/home/user/scaffold/.agents/orchestration.md`. Settle the wording of each sentence and
comment, the shared predicate's name and placement, and how R1's absent selector is represented. Stop and report when a
change needs an emitted declaration or selector, a file outside Owned, or when a gate reads red.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, and `npm run check` exit 0.
2. `tmp/units/r2/anchor-old-predicate.log.txt` shows the reboot case failing with an `AssertionError`, and the file is
   restored byte-identically.
3. Each case round 1's mutation table names fails with an `AssertionError` in `tmp/units/r2/anchor-mutation-styles.log.txt`.
4. `npm run test:src:styles`, `npm run test:conformance`, `npm run test:guides`, and `npm run test:policy` exit 0.

## Review evidence

The diffs and status, the old-predicate and mutation logs, and the gate logs. The audit runs `analyst` on GPT-6 Astra
(objective lane) and `reviewer` on Opus 5.5 (subjective lane).
