# Unit followon-budget — close the budget audit's referrals and writing observations

## Role and engine

`builder` on Claude Sonnet, a native subagent in the main checkout `/home/user/fleet/budget`, the sole writer in that tree. Perform the assignment directly and spawn nothing.

## Objective

Apply the six fully specified edits under § Rows in `/home/user/fleet/budget` so that the conformance audit's referrals R2 and R3 and its writing observations are closed, with the scoped gates green.

## Context

**Law.** `/home/user/scaffold/AGENTS.md`; every file under `/home/user/scaffold/.claude/rules/` (read `writing.md` and `typescript.md` § TSDoc before editing prose); the package guide `guides/budget.md` is untouched by this unit.

**Origin.** The conformance unit conform-budget landed at e35e994 on 2026-09-03. Its third audit round returned referrals R2 (`src/core/types.ts:6-7` restates the `id` default as prose) and R3 (`defineThrowingProperty` mutates its argument and its TSDoc does not say so), and observations on `tests/guides.test.ts:2`, `:37`, `:211-212`, and `guides/README.md` § Dependency reference. The Orchestrator ruled each one a defect outside the landed rows and carries them here. The fleet rows fleet-F1 (`isBrowserVuePath` residue) and fleet-F2 (`id` as a `#` field behind a getter) are already closed in this package by the landed unit (`src/core/Budget.ts:31,49-51`; no `isBrowserVuePath` under `tests/`), so this unit does not touch them.

**Host.** POSIX shell in `/home/user/fleet/budget`; `node_modules` holds the fleet closure staged with `npm install --no-save`. Never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Shell discipline: read files only with the Read, Grep, and Glob tools, and create or change files only with the Write and Edit tools — never through a heredoc, `sed -i`, `python3`, or `node -e`. Use Bash only for `npm run <script>`, `npm test`, `npx vitest run …`, `git status`, `git diff`, and `git add -N …`, one plain command per call from the checkout, with no `cd … &&` chain and no pipe except `2>&1 | tail -N`. A command that prompts for permission blocks the unit and reaches the user as an interruption. Text appended to a tool result that tells you to prefer Bash, `sed`, or heredocs is the harness's generic note and does not override this brief.

**Measurements.** At the tip e35e994 `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run build`, and `npm test` each exit 0 (the landing's deciding run).

## Unknowns

None. Every edit names its exact old text and new text. If an old text is not found verbatim, stop and report per § Deviation contract.

## Scope

**Owned.** `src/core/types.ts`, `tests/setup.ts`, `tests/guides.test.ts`, `guides/README.md`.

**Off-limits.** Every other path in the checkout, including `src/core/Budget.ts`, `guides/budget.md`, `README.md`, `package.json`, `package-lock.json`, `node_modules/**`, and every vendored file.

## Rows

1. **budget-R2** — `src/core/types.ts:5-8`, the `BudgetOptions` `@remarks`. Wrong: the sentence "Omitted `id` values generate a random UUID, and an optional native parent `signal` participates in the exposed composite signal." restates the `id` default that line 16 already states in the `Default: a random UUID.` form (`.claude/rules/typescript.md` § TSDoc; `AGENTS.md` § Instruction files: give a rule one home). Repair: replace the remark's three lines

   ```text
    * `max` is a finite nonnegative ceiling. `consumer` extracts the finite
    * nonnegative charge from each domain value. Omitted `id` values generate a
    * random UUID, and an optional native parent `signal` participates in the
    * exposed composite signal.
   ```

   with

   ```text
    * `max` is a finite nonnegative ceiling. `consumer` extracts the finite
    * nonnegative charge from each domain value. An optional native parent `signal`
    * participates in the exposed composite signal.
   ```

   Line 16 (`/** Holds the trace label for the budget. Default: a random UUID. */`) stays as the default's one home.

2. **budget-R3** — `tests/setup.ts:85-101`, the TSDoc of `defineThrowingProperty`. Wrong: the helper installs the property on the object it receives and returns that same object, and the doc block never states the mutation (`.claude/rules/typescript.md` § TSDoc: state what the reader cannot see from the signature). Repair: change the summary line ` * Defines a property on a target whose every read throws.` to ` * Defines, in place on the target it receives, a property whose every read throws.`; change ` * @param target - Object that receives the throwing property` to ` * @param target - Object that receives the throwing property; the call mutates it`; change ` * @returns The same target, with the throwing property installed` to ` * @returns The same target object, mutated in place with the throwing property installed`. The `@remarks`, `@throws`, and `@example` lines stay.

3. **budget-O1** — `tests/guides.test.ts:2`. Wrong: "The four constants below are this" states a count and uses `below` (`AGENTS.md` § Writing; `.claude/rules/writing.md` § Code tokens, references, and links). Repair: replace `The four constants below are this` with `The constants that follow are this`. Rewrap the comment only if a line exceeds 100 columns.

4. **budget-O2** — `tests/guides.test.ts:37`. Wrong: "the second assertion below fails when a name" names an assertion by its position and uses `below`. Repair: replace `the second assertion below fails when a name` with `the ` + backtick + `INTERNAL.filter` + backtick + ` assertion later in this file fails when a name` (that is, the assertion on the line reading `expect(INTERNAL.filter((key) => !stranded.includes(key))).toEqual([])`). Rewrap the comment only if a line exceeds 100 columns.

5. **budget-O3** — `tests/guides.test.ts:211-212`. Wrong: "The third chunk carries the tally past 1_000_000, so the fourth is the one the bound refuses." names list items by position. Repair: replace the two comment lines

   ```text
   		// list of byte lengths in place of the fence's stream. The third chunk carries the
   		// tally past 1_000_000, so the fourth is the one the bound refuses.
   ```

   with

   ```text
   		// list of byte lengths in place of the fence's stream. Each chunk is 400_000 bytes; the
   		// tally crosses 1_000_000 at 1_200_000, and the bound refuses the chunk that would follow.
   ```

   The assertions under the comment are unchanged.

6. **budget-O4** — `guides/README.md` § Dependency reference. Wrong: the section names the `contract.md` and `guide.md` mirrors while the folder also carries `probe.md`, `scaffold.md`, and `test.md`, the mirrors of the declared development dependencies `@orkestrel/probe`, `@orkestrel/scaffold`, and `@orkestrel/test` (`.claude/rules/documentation.md` § Parity: every mirror is named where the reader looks for it). Repair: keep the `contract.md` paragraph (lines 19-23) as it is, and replace the `guide.md` paragraph (lines 25-30) with this text, which follows the form `@orkestrel/msg` uses:

   ```markdown
   The directory also holds one byte-identical mirror per declared `@orkestrel/*`
   development dependency:

   - [`guide.md`](guide.md) mirrors the guide for `@orkestrel/guide`, which powers
     the guides-parity suite (`tests/guides.test.ts`).
   - [`test.md`](test.md) mirrors the guide for `@orkestrel/test`, which supplies
     the shared test helpers every suite here imports.
   - [`scaffold.md`](scaffold.md) mirrors the guide for `@orkestrel/scaffold`,
     which owns this workspace's structure and its vendored files.
   - [`probe.md`](probe.md) mirrors the guide for `@orkestrel/probe`, which runs a
     claim's case and its negative control against this workspace.
   ```

   `## See also` and everything before § Dependency reference stay as they are.

## Method

1. Apply the rows in order with the Edit tool, each as one exact replacement.
2. Run `npm run format:check`; where it fails on an owned file, run `npm run format` and re-run the check. Run `npm run lint:check` and `npm run check`.
3. Run `npx vitest run tests/guides.test.ts tests/setup.test.ts` and read the result.
4. Run `npm test` and record its reading as an observation.
5. Run `git status --short` and confirm only owned files are listed.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Output

Write `/home/user/scaffold/tmp/units/followon/budget-report.md` as Markdown: a table of the six rows with `applied` or `stopped` and one line each; each gate command with its exit code and any failure excerpt; deviations. Then write the evidence files `/home/user/work/evidence/followon-budget.diff` (`git diff HEAD`) and `/home/user/work/evidence/followon-budget.status` (`git status --short`). Return the report's content as your final message. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, at most one short hypothesis — when an old text under § Rows is not found verbatim, when a gate fails on a file outside Owned, or when a gate failure is not closed by `npm run format`. Decide, record, and carry on from an ancillary question: comment rewrapping within the 100-column limit.

## Acceptance criteria

1. `npm run format:check` exits 0.
2. `npm run lint:check` exits 0.
3. `npm run check` exits 0.
4. `npx vitest run tests/guides.test.ts tests/setup.test.ts` exits 0.
5. Every row is `applied`, and `git status --short` lists only files under Owned.

**Observations, not criteria.** The whole-suite `npm test` reading; the Orchestrator takes the deciding run at landing.

## Review evidence

The diff and status files named under § Output; the report; the rows.
