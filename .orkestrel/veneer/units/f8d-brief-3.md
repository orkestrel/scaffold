# Unit F8d IMPORTANCE-LONGHANDS, round 3 — the prose and guard micro-round

Successor to `/home/user/veneer-f8d/tmp/units/f8d-brief-2.md`. What changed and why: the fix-round
audit (`/home/user/scaffold/.orkestrel/veneer/units/f8d-fix-audit-verdict.md`: analyst FAIL 5, 6;
reviewer FAIL 5, 6, 7 with one referral; checker PASS) ruled the round's comments and one guide
clause still leave code tokens without a noun, found that the branch case's reading can go vacuous
with nothing reddening, and noted the freeze assertions sit in a behaviour case rather than the
inventory case. The wording the round wrote came from the round-2 brief, so this is a brief-carried
defect and this brief prescribes the exact replacement text. The earlier briefs stay in place
unedited; the round-1 brief's Context, Execution, Output, and Deviation contract bind here except
where this brief states otherwise.

## Role and engine

`builder` on Sonnet (native Claude subagent), sole writer in `/home/user/veneer-f8d` (detached at
`cdf7f55`, the round-1 and round-2 writes uncommitted in the tree, the state the fix-round audit
ruled on). Perform the assignment directly and spawn nothing. Use absolute paths under
`/home/user/veneer-f8d` for every command and file, and run every npm and npx command from
`/home/user/veneer-f8d`. Do not commit, push, install, or run `git checkout`, `git restore`,
`git stash`, `git reset`, `git clean`, or `git checkout-index`; undo a plant by the exact reverse
edit.

## Objective

Every edit under § Edits is applied as written, the new guard reddens under its named plant and the
exact reverse edit restores green, the per-name plant still reddens the partial-importance case, and
the gates in § Acceptance criteria are green.

## Context

**Evidence.** Locate every site by its text; the line numbers are approximate at the round-2 tree.
`tests/service/tailwind/consumer.test.ts` around lines 174 to 219 (the case "keeps an important
shared declaration whatever the recipe withholds") and 221 to 236 (the case "keeps a shared name on
the line while its importance covers only some of the longhands Tailwind declares");
`tests/setupServer.test.ts` around lines 472 to 557 (the `server setup` inventory case "declares the
identity constants, …"), 2413 to 2417 (the freeze assertions at the head of the case "reports a
name whose importance covers every longhand it has to cover, …"), and 2453 to 2455 (the comment
"A rule declaring every longhand `table` has to cover, …"); `tests/setupServer.ts` around line 10
(the header sentence ending "as `LonghandRule`.") and around line 1721 (the `LonghandRule` remark
"The stage in `tests/setupService.ts` returns this shape"), and around line 1791 (the
`important.includes(property)` read in `collectImportantNames`); `guides/veneer.md` § Tailwind
around line 412 ("driven by a planted `!important` declaration on the").

**Law.** `/home/user/scaffold/AGENTS.md`;
`/home/user/scaffold/.claude/rules/{tests,typescript,writing,documentation}.md` (`writing.md`
§ Code tokens: a noun after each code token; `AGENTS.md` § Writing: no count, no position). Skill:
none. Guide: `guides/veneer.md` § Tailwind (owned).

**Installed primitives.** `requireValue` is already imported in `consumer.test.ts`; add no import
and no helper.

**Host.** Linux, bash, npm 11 on `PATH` through
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`;
Chromium installed for the service project; `dist/` may be stale, so run `npm run build:src` and
`npm run build:src:styles` before the service proof.

**Standing conditions.** None: the round-2 tree's gates were green on the writer's run.

## Unknowns

None the unit needs.

## Edits

Apply each exactly. Rewrap a comment or a guide paragraph you change so no line passes 100
columns, and change no other text.

1. `tests/service/tailwind/consumer.test.ts`, the comment of the case "keeps an important shared
   declaration whatever the recipe withholds": replace the clause "importance on `grid-column-start`
   and `grid-column-end`, the longhands Tailwind's `col-1` rule declares, in a layer of its own the
   way a release shipping such a declaration would land it." with "importance on the
   `grid-column-start` and `grid-column-end` longhands Tailwind's `col-1` rule declares, in a layer
   of its own the way a release shipping such a declaration would land it."
2. Same file, same case: replace the statement
   `expect(longhands.get('col-1')).toEqual(['grid-column-start', 'grid-column-end'])` with these two
   statements:

   ```ts
   const declared = requireValue(longhands.get('col-1'), 'The instrument declares no col-1 rule')
   expect(declared).toEqual(['grid-column-start', 'grid-column-end'])
   ```

3. Same file, same case: directly before `expect(standalone).not.toEqual([])`, insert this comment
   and loop:

   ```ts
   // Each reading has to carry the longhands the plant made important, or the comparison that
   // follows runs over nothing.
   for (const snapshot of standalone)
   	expect(declared.filter((property) => !snapshot.has(property))).toEqual([])
   ```

4. Same file, the comment of the case "keeps a shared name on the line while its importance covers
   only some of the longhands Tailwind declares": replace its whole text with "Tailwind's `col-1`
   rule declares the `grid-column-start` and `grid-column-end` longhands, and the plant makes the
   `grid-column-start` longhand important, so Tailwind's rule would still win the
   `grid-column-end` longhand: the name is not important under the rule, and the equality still
   needs it on the exclusion line."
5. `tests/setupServer.test.ts`: delete the statements
   `expect(Object.isFrozen(SHARED_LONGHANDS)).toBe(true)` and
   `for (const properties of Object.values(SHARED_LONGHANDS)) expect(Object.isFrozen(properties)).toBe(true)`
   from the head of the case "reports a name whose importance covers every longhand it has to cover,
   across the rules naming it", and append the same two statements to the end of the `server setup`
   inventory case "declares the identity constants, the specifier walk, …", after its
   `expect(Object.keys(setup).sort()).toEqual([…])` statement.
6. Same file, the comment inside the case "keeps a name out whose importance covers only some of
   its longhands or another longhand, or that declares its longhands normally": replace "A rule
   declaring every longhand `table` has to cover, all of them normally, so a reading that counts
   declared longhands rather than important ones reports it." with "A rule declaring every longhand
   the `table` name has to cover, each normally, so a reading that counts declared longhands rather
   than important ones reports the `table` name."
7. `tests/setupServer.ts`, the header comment: replace "returns the rules its stage expands as
   `LonghandRule`." with "returns the rules its stage expands as `LonghandRule` values."
8. Same file, the `LonghandRule` remark: replace "The stage in `tests/setupService.ts` returns this
   shape" with "The stage in the `tests/setupService.ts` module returns this shape".
9. `guides/veneer.md` § Tailwind: replace "that branch is driven by a planted `!important`
   declaration on the `grid-column-start` and `grid-column-end` longhands" with "that branch is
   driven by planted `!important` declarations on the `grid-column-start` and `grid-column-end`
   longhands".

## Scope

**Owned.** `tests/service/tailwind/consumer.test.ts`; `tests/setupServer.test.ts`;
`tests/setupServer.ts`; `guides/veneer.md` (§ Tailwind).

**Shared (report-only).** None.

**Off-limits.** `tests/setupService.ts`, `tests/setupService.test.ts`,
`tests/service/tailwind/preflight.test.ts` (the round-2 writes stand), every other file under
`tests/`, `src/**`, `app/**`, `configs/**`, `package.json`, `package-lock.json`, `ROADMAP.md`, the
vendored files, and every other file.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No tree-wide `format`, `lint --fix`, or
`build` beyond `npm run build:src` and `npm run build:src:styles`; no `npm install`; no git command
that discards a change.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

Apply § Edits, then run in this order and record each exit code:

1. `npx oxfmt --config .oxfmtrc.json --write` over the owned files, then
   `npx oxfmt --config .oxfmtrc.json --check` over them.
2. `npx oxlint --config .oxlintrc.json --deny-warnings` over the owned TypeScript files.
3. `npm run check`.
4. `npm run build:src` and `npm run build:src:styles`.
5. `npm run test:setup -- tests/setupServer.test.ts` and
   `npm run test:setup -- tests/setupService.test.ts -t "expands each rule"`.
6. `npm run test:guides`.
7. `npm run test:service -- tests/service/tailwind/consumer.test.ts` (green).
8. Plant A: in `consumer.test.ts`, replace `longhands.get(name) ?? []` with `[]` in the statement
   that builds `properties`; run the command of step 7; record the failing case and the assertion
   message (the guard of edit 3 is the one that has to fail); apply the exact reverse edit; run the
   same command green.
9. Plant B: in `tests/setupServer.ts`, in `collectImportantNames`, replace
   `properties.every((property) => important.includes(property))` with `important.length > 0`; run
   the command of step 7; record the failing case (the partial-importance case's
   `not.toContain('col-1')` is the one that has to fail); apply the exact reverse edit; run the
   same command green.
10. `git status --porcelain` and `git diff cdf7f55 --stat`.

## Output

Write `/home/user/veneer-f8d/tmp/units/f8d-report-3.md` with: the edits applied (each by its
number, with the final text of every changed comment and clause); a gate table (command, exit,
reading); the plant records (each plant's failing case and assertion message, and the green after
the reverse edit); the status and stat outputs verbatim; deviations (expected, found, exact
evidence, done or not done, at most one hypothesis); and claims flagged as unverified. Return the
same report as your final message.

## Deviation contract

§ Deviation protocol in `/home/user/scaffold/.agents/orchestration.md`. This unit settles nothing
by itself beyond the rewrap of a changed comment or paragraph. Stop and report on any other
conflict, including an edit whose search text is not found once and exactly once.

## Acceptance criteria

1. Every edit under § Edits is applied as written (the diff shows the replacement text and no other
   change to that file beyond the rewrap).
2. `oxfmt --check`, `oxlint`, and `npm run check` exit 0.
3. `npm run test:setup -- tests/setupServer.test.ts`, the scoped `expands each rule` run, and
   `npm run test:guides` exit 0.
4. The consumer proof exits 0 unplanted, plant A reddens the guard of edit 3, plant B reddens the
   partial-importance case, and each reverse edit restores exit 0.
5. The status lists the owned files and nothing else.

## Review evidence

The diff against `cdf7f55` and the status output, rendered by the Orchestrator at the unit's
return; the report `f8d-report-3.md`.
