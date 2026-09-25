# Unit E-ID-BUTTON-CLASSES round 3 — the reader refuses an order it cannot read, and a case is a case

Successor to `e-id-button-classes-brief-2.md`. What changed: the round-2 audit (`ebcl-audit-2-verdict.md`) failed claims 7
and 8, and this is the unit's third round, so the Orchestrator rules the fix. The Items are exact.

## Role and engine

`builder` on Sonnet, a native Claude subagent reached through the harness's Agent tool, the sole writer in
`/home/user/veneer-ebcl`, which holds rounds 1 and 2 uncommitted over Veneer `2376710`. The proofs launch Chromium,
which a bench sandbox cannot drive. Start every shell command with `cd /home/user/veneer-ebcl &&` and give every file
tool an absolute path under it. Read, in order: `/home/user/scaffold/AGENTS.md`; the rules
`/home/user/scaffold/.claude/rules/{names,typescript,tests,writing}.md`; and the verdict
`/home/user/scaffold/.orkestrel/veneer/units/ebcl-audit-2-verdict.md`. No skill applies.

## Objective

`readFormDifferences` refuses a state list that reads `rest` after another state or `disabled` before another state,
and its TSDoc states that refusal. The case type is `FormCase`, every binding of a case row is `subject`, and "pair"
names only the release's pairing of a `:disabled` rule with a `.disabled` rule.

## Context

**Evidence.** Measured in the worktree:
- `tests/setupBrowser.ts` declares `export interface FormPair` (around line 1793), whose `name` TSDoc says "Names the
  pair in the reader's refusal"; `FormDifference`'s TSDoc says "Maps each state a pair was read in"; and
  `FormComparison`'s says "Carries one pair's form differences". `readFormDifferences(pair: FormPair, states, holder)`
  (around line 1897) has `@param pair` and `@param states - The states to read, in order. List \`disabled\` last,
  because a disabled element takes no later drive.`, and its body stages reduced motion with
  `if (state !== 'rest') await stageMedia({ motion: false })`.
- `tests/setupBrowser.test.ts` binds case fixtures named `pair` (around lines 1849 and 1891) beside `control`, `plant`,
  and `unpaired`.
- The case rows are bound as `pair` in `tests/src/styles/elements/button.test.ts` and in the reboot cases of
  `tests/src/styles/components/{close,navbar,accordion,dropdown,nav,list-group,pagination,carousel}.test.ts`.
- `guides/veneer.md` § Outside the ledger says "A counterpart cannot be disabled, so it takes" (around line 10270).

**Law.** `AGENTS.md` § Design laws (one concept, one term); `.claude/rules/names.md`; `.claude/rules/tests.md` (a
prose claim about behaviour needs an executed assertion; each plant fails with an assertion).

**Host.** Linux, bash. Put
`/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin` first on `PATH`,
and set `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`. Run `npm run build:src:styles` before a styles run, and run a
styles file with `npx vitest run --config configs/src/vite.styles.config.ts <files>`. Other worktrees run suites at the
same time; a timeout under load is an observation with its `/proc/loadavg` reading. Write every log, backup, and
script under this worktree's `tmp/units/`.

**Control identifiers.** The claim numbers are this brief's labels. Name each test for what it proves.

## Unknowns

None.

## Scope

**Owned.** `tests/setupBrowser.ts` and `tests/setupBrowser.test.ts` (the reader, its types, and its proof only);
`tests/src/styles/elements/button.test.ts`;
`tests/src/styles/components/{close,navbar,accordion,dropdown,nav,list-group,pagination,carousel}.test.ts` (the reboot
case's binding only); `guides/veneer.md` (the one sentence in Item 5, and any line naming `FormPair`); and `tmp/units/`.

**Off-limits.** `src/**`, `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, `tests/setupServer.ts`, every other
path, and every other line of the owned files.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No git command that writes, no install, and no
`npm run format`. Format with `./node_modules/.bin/oxfmt --config .oxfmtrc.json <files>`. `npm run build:src:styles` is
allowed.

## Items

1. Rename `FormPair` to `FormCase` at every site. Search `FormPair` over `tests/` and `guides/` first, and own every
   site that comes back.
2. Rename the reader's parameter `pair` to `subject`, and every binding of a `BUTTON_FORM_CASES` or `BUTTON_REBOOT_CASES`
   row or of a case fixture named `pair` to `subject`, in the owned files. Leave `paired`, `unpaired`, `control`, and
   `plant` as they are.
3. In TSDoc, write "case" for every "pair" that means a case: the `name` member reads "Names the case in the reader's
   refusal, such as `btn-close`."; `FormDifference` reads "Maps each state a case was read in to every longhand its
   button form resolves apart from its counterpart, each with the button form's value."; `FormComparison` reads
   "Carries one case's form differences under the document's cascade and under the release's."; `@param subject` reads
   "The case: the class's two forms and the selector that finds the class's element in each.". Leave the TSDoc of
   `paired` and `FORM_ENTRIES` as it is.
4. Make the reader refuse a state order it cannot read. As the first statement of `readFormDifferences`, before
   anything mounts, throw
   `` new Error(`The ${subject.name} states read rest after another state or disabled before one: ${states.join(', ')}`) ``
   when `states.some((state, index) => (state === 'rest' && index > 0) || (state === 'disabled' && index < states.length - 1))`.
   Replace `@param states` with "The states to read, in order. The reader refuses a list that reads `rest` after
   another state or `disabled` before one, because motion stays reduced from the first later state onward and a
   disabled element takes no later drive." Extend `@throws` with "; and an `Error` naming the list when `rest` follows
   another state or `disabled` precedes one". Add one case to the reader's `describe` in `tests/setupBrowser.test.ts`,
   titled `refuses a state list that reads rest after another state or disabled before one`, asserting that
   `['hovered', 'rest']` and `['disabled', 'hovered']` each reject with that exact message. Plant: delete the refusal statement; the case fails with an `AssertionError`. Log it to
   `tmp/units/ebcl-3-plant-order.log.txt` and restore byte-identically.
5. In `guides/veneer.md`, replace "A counterpart cannot be disabled, so it takes" with "A counterpart cannot be
   `:disabled`, so it takes", and let oxfmt re-wrap the paragraph.

## Execution

Perform the assignment directly and spawn nothing. Apply Items 1 to 5, run the plant, then run each gate in
Acceptance, logged to `tmp/units/ebcl-3-<gate>.log.txt` with `echo "exit=$?"` and `cat /proc/loadavg` appended.

## Output

Write `tmp/units/ebcl-report-3.md` and return the same text: each Item's before and after; the search behind Item 1;
the plant reading; the gate table; `tmp/units/ebcl-3.diff` (`git diff 2376710`) and `tmp/units/ebcl-3-status.txt`.
State no count in prose.

## Deviation contract

Follow § Deviation protocol of `/home/user/scaffold/.agents/orchestration.md`. Stop and report when an Item's text
does not typecheck or lint as written, when a site the rename reaches lies outside the owned set, or when a gate reads
red. Settle nothing else yourself.

## Acceptance criteria

1. `npm run check` and `npm run lint:check` exit 0, and oxfmt's `--check` leaves the owned files unchanged.
2. `grep -rn 'FormPair' tests guides` returns nothing.
3. `npx vitest run --config vite.config.ts --no-cache --project setup:browser tests/setupBrowser.test.ts` passes with the
   refusal case.
4. After `npm run build:src:styles`, the owned styles files pass under
   `npx vitest run --config configs/src/vite.styles.config.ts <files>`.
5. The plant fails the refusal case with an `AssertionError`, per its log.
6. `npm run test:guides` and `npm run test:policy` exit 0.

## Review evidence

The diff and status, the plant log, and the gate logs. `analyst` on GPT-6 Astra checks the refusal the Orchestrator
ruled, and `checker` on Sonnet reads the rename.
