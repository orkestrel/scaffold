# Unit U3-policy — successor brief 10: the remark, the count, and a regression that can fail

## What changed and why

This brief supersedes `u3-policy-brief-9.md` for the remainder of the unit; the earlier
briefs stand except where this one says otherwise. Round 8's subjective lane
(`.orkestrel/veneer/units/u3-policy-audit-3-analyst-report.md`) confirmed the accounting, the
reader, the link pattern (every accepted and rejected form executed), the controls, the
vocabulary, and the design, and refuted two claims and added one finding. The objective lane
(`units/u3-policy-audit-3-reviewer-report.md`) confirmed every claim but the same count and
recorded four bounds this brief closes as well (items 5 to 8). The scaffold verifier's chain
went red in `test:config` on a case that reads the operating system's temporary directory
(`rolls one face into a single declaration…`, `tests/config.test.ts:2535`) while another
checkout's build was creating the same-prefixed scratch directories; that is a proof-isolation
defect outside this unit, recorded as a scaffold task, and the Orchestrator takes the deciding
re-run alone.

Items from the objective lane:

5. **The fence-limit rows carry the sweep control (objective 11).** Give the two fence-limit
   control rows the `via` front page and the matching expected violation
   (`{ rule: 'prose', path: 'README.md', line: 3, message: 'prose carries no banned term: via (through, by using)' }`),
   as the code-span row does, so a dead sweep reddens them.
6. **A row names an existing directory (objective 12).** In `readPolicyIndex`, count a row only
   when its path cell resolves to an existing directory of the workspace
   (`resolvePolicyDirectory(root, path)` is the helper the module already has); state it in the
   remark and add a case: a row naming a directory that does not exist accounts for nothing.
7. **The pattern's own remark says it is applied per line (objective 13).** `POLICY_INDEX_ROW`
   is `^`-anchored without the `m` flag; say on the pattern that a caller applies it to one line
   at a time.
8. **Every link in the cell (objective 14).** Read every `POLICY_INDEX_LINK` match in a row's
   link cell, not the first alone, so `` | `src/styles` | [`tokens.md`](tokens.md), [`theme.md`](theme.md) | ``
   accounts for both; state it in the `@returns` and add a case.

The Orchestrator considered replacing the line-and-regex reader with a Markdown parser, which
would end this class of finding outright, and rejected it: no fleet target declares
`@orkestrel/markdown`, and `tests/setupPolicy.ts` is vendored into every target, so the parser
would force a new declared dependency on each of them. The shape-matching reader stays; these
items close its two real defects.

## Role and engine

`builder` on native Sonnet. Perform the assignment directly and spawn nothing. Sole writer in
`C:/Users/mikes/WebstormProjects/scaffold`; commit nothing; do not touch `host.json` or
`.claude/rules/styles.md`. Never run `git checkout`, `git restore`, `git stash`, `git reset`, or
`git clean` anywhere.

## Scope

**Owned.** `tests/setupPolicy.ts`, `tests/policy.test.ts`. **Off-limits.** Everything else.

## Execution

1. **The remark overclaims (subjective claim 2).** `readPolicyIndex`'s remark says a
   concept-index row "does not take that shape". The reader matches shape, not meaning: a row
   whose first cell is a backticked relative path and whose second cell links a sibling guide
   accounts for that guide wherever it sits, including under a concept heading. (This
   repository's and Veneer's concept tables write an unbackticked concept name in the first cell,
   so neither matches today; another workspace's might.) Replace the claim with what the reader
   does: it reads every row of that shape, under any heading, and a link outside such a row
   accounts for nothing.
2. **The count (subjective claim 8).** `tests/setupPolicy.ts:382` says "The two names are
   distinct." That tallies a set the implementation defines. Write "The capture names differ."
3. **A regression that can fail (subjective finding 11).** The case proving the row boundaries
   writes three rows that all name `tokens.md`, so the deduplicated result is `['tokens']`
   whether or not the invalid rows were refused. Give each row a distinct guide name (for
   example `/outside` linking `outside.md`, the three-cell row linking `later.md`, the valid row
   linking `tokens.md`) and assert the result is exactly `['tokens']`, so admitting either
   invalid row reddens. Verify by reasoning about the pre-fix pattern that the new case would
   have caught it, and say so in the report.
4. Format the owned files by path, then `npm run format:check`, `npm run lint:check`,
   `npm run check`, `npm run test:policy`, `npm run test:setup`, `npm run test:config`,
   `npm run test:guides`; record each command's final lines (`test:config` may report the
   inventory stale at owned files; the Orchestrator rebuilds).

## Output

Write `u3-policy-report-10.md` and return its content: the diff; the new case's reading
and why it would have caught the earlier pattern; each gate's exit code and final lines;
deviations in the usual shape.

## Deviation contract

Stop and report on: a gate red after your own fix; a need to edit an off-limits file. Decide and
carry on from: the fixture guide names and wording within the meaning fixed here.

## Acceptance criteria

1. No remark claims the reader distinguishes a concept row from a directory row.
2. No count over an implementation-defined set in the changed prose.
3. The row-boundary case uses a distinct guide name per row and would redden if either invalid
   row were admitted.
4. `format:check`, `lint:check`, `check`, `test:policy`, `test:setup`, `test:guides` exit 0.
5. `git status --porcelain` lists only `.claude/rules/styles.md`, `host.json`,
   `tests/setupPolicy.ts`, `tests/policy.test.ts`, `guides/scaffold.md`.

## Review evidence

The actual `git diff` and `git status --porcelain` at return; the report.
