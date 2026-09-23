# Unit B-FORMS-FLOOR — the duplication gate's relative arm moves its floor to five (D32)

## Role and engine

`builder` on Sonnet, reached as a native Claude subagent, sole writer in `/home/user/veneer-bff`, a
git worktree detached at `2c10329` carrying the B-FORMS-FLOATING unit's uncommitted writes (which you
leave as they are). Perform the assignment directly and spawn nothing. Use absolute paths under
`/home/user/veneer-bff` for every command and file, and run every npm and npx command from
`/home/user/veneer-bff`; your shell may start elsewhere. Do not commit, push, install, or run `git
checkout`, `git restore`, `git stash`, `git reset`, `git clean`, or `git checkout-index`.

## Objective

`findDuplication` in `tests/setupServer.ts` takes, under its relative arm, an overlap of at least 5
declarations that is more than half of the smaller block (`count >= 5 && count * 2 > smallest`), the
absolute arm stays at 6, its TSDoc states the 2026-09-23 boundary, the proof's boundary cases move
with it, and `npm run test:setup`'s case `repeats no partial's written declaration block in another
partial beyond the coincidence floor` is green at the FLOATING tree.

## Context

**Evidence.** `tests/setupServer.ts` around line 684: `return (count >= 4 && count * 2 > smallest) ||
count >= 6`, with the TSDoc at lines 663 to 683 (the relative arm "at least 4 declarations", "a whole
copy of a two- or three-declaration rule sits under that floor", the absolute arm "at least 6", "the
largest overlap two partials wrote independently being 3 declarations measured across `src/styles` and
the family partials on 2026-09-22"). `tests/setupServer.test.ts` `describe('findDuplication')` from
line 279: the cases `reports a whole four-declaration block one partial copies into another…` (line
280), `refuses a three-declaration overlap between two six-declaration blocks, and reports it after a
fourth is shared` (line 307), `refuses a whole two-declaration copy and a whole three-declaration copy…`
(line 336), `refuses a four-declaration overlap tied at half of an eight-declaration block, and reports
it after that block narrows to seven` (line 362), `reports an overlap wider than accident reaches
inside large blocks, and refuses its narrower twin` (line 390), and `leaves the sweep reporting every
refused intersection it found` (around line 419). The FLOATING report (`tmp/units/b-forms-floating-report.md`
§ Deviations D1) measured the coincidence: `.form-floating > label` shares `position: absolute`,
`top: 0`, `left: 0`, `height: 100%` with `_ratio.scss` `.ratio > *` (5 declarations) and four
declarations with the hidden-input block in `_button.scss` around line 118 (7 declarations), each
side recording the release's own values.

**Law.** `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{tests,typescript,styles,writing}.md`;
no skill; the ruling D32 in `/home/user/scaffold/.orkestrel/veneer/units/decisions-round-2.md`;
`guides/veneer.md` where it states the floor (search `coincidence` and `findDuplication`; state the
new floor wherever the guide gives the old number).

**Installed primitives.** `@orkestrel/test` (`node_modules/@orkestrel/test/dist/src/server/index.d.ts`):
this unit adds no helper.

**Host.** bash; `/home/user/veneer-bff`; npm 11.19.1 on `PATH`
(`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`);
foreground commands are capped at 10 minutes; sibling units run in other worktrees; `prettier` must
never run, `oxfmt` is the formatter; no network is needed.

**Measurements.** Taken by the Orchestrator on 2026-09-23: at the FLOATING tree `npm run test:setup`
reports 2 failed, 183 passed (the coincidence-floor case and the shipped-key Set literal, the latter
the Orchestrator's integration edit that stays red here); `grep -n 'findDuplication'
tests/setupServer.test.ts` lists the imports at line 90 and the describe at line 279.

**Control identifiers.** none; name every test for what it proves rather than for the control that
specified it.

**Standing conditions.** The FLOATING writes are present and uncommitted; touch none of them. The
shipped-key Set literal red in `npm run test:setup` (`form-floating` missing) is the Orchestrator's and
stays red here: the criterion is the coincidence-floor case green and every other `test:setup` case
unchanged. `npm run test:conformance` is red on GROUP's absent selectors (the FLOATING report's first
red) and is not yours. The `probe` MCP server is unavailable: prove the boundary with the proof's own
scratch cases.

## Unknowns

none.

## Obligations

1. In `tests/setupServer.ts`, change the relative arm to `count >= 5 && count * 2 > smallest` and
   restate the TSDoc: the relative arm takes an overlap of at least 5 declarations that is more than
   half of the smaller block; a whole copy of a two-, three-, or four-declaration rule sits under that
   floor and passes as a coincidence, which is the recorded boundary; the absolute arm takes an overlap
   of at least 6; the largest overlap two partials wrote independently is 4 declarations, measured
   across `src/styles` on 2026-09-23 (the floating label against the ratio child and the hidden check
   input, each recording the release's values). Keep the rest of the remarks and the example.
2. In `tests/setupServer.test.ts`, move the boundary cases with it: the whole-copy case reports a
   whole five-declaration block (retitle it); the "refuses a three-declaration overlap … after a
   fourth is shared" case becomes "refuses a four-declaration overlap between two eight-declaration
   blocks, and reports it after a fifth is shared" with blocks sized so the fifth shared declaration
   is more than half of the smaller block; the whole two- and three-declaration copy case adds a
   whole four-declaration copy that the sweep reports and the gate refuses; the "tied at half" case
   uses a five-declaration overlap tied at half of a ten-declaration block, reported after that block
   narrows to nine; the absolute-arm case and the sweep-reporting case are unchanged unless they name
   the old floor. Each case's title states what it proves.
3. Where `guides/veneer.md` states the floor in prose, state the new one in the same sentence shape.

## Scope

**Owned.** `tests/setupServer.ts` (`findDuplication` and its TSDoc only), `tests/setupServer.test.ts`
(the `findDuplication` describe only), `guides/veneer.md` (only a sentence stating the floor, if one
exists).

**Shared (report-only).** none.

**Off-limits.** every other file, including every FLOATING-written file (`src/styles/components/_form-floating.scss`,
`tests/src/styles/components/form-floating.test.ts`, `app/**`, `tests/setup*.ts` other than the two
owned sites, `tests/conformance.test.ts`), `src/**`, `configs/**`, `package.json`, `ROADMAP.md`, the
vendored files.

**What asserts the state this change ends.** `tests/setupServer.test.ts` (the boundary cases; owned);
the coincidence-floor case in the same file reads the live tree and goes green (owned); derived by
running `npm run test:setup` and bounded by a grep for `findDuplication` and `coincidence` over
`tests/` and `guides/`.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No tree-wide `format`, `lint --fix`, or
`build`; scoped `npx oxfmt --check` and `npx oxlint` over the owned files; no `npm install`; no git
command that discards a working-tree change.

## Execution

**A native subagent, or a bench engine reading this brief inside its own CLI:** perform the
assignment directly and spawn nothing.

## Output

Write `tmp/units/b-forms-floor-report.md`: the exact diff of the owned files (`git diff -- tests/setupServer.ts
tests/setupServer.test.ts guides/veneer.md`), the `npm run test:setup` reading before and after (the
failing case names), and the scoped format and lint exits. Return as your final message the report
path, the `git status --short` output, and the gate readings. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short
hypothesis — if the coincidence-floor case stays red after the change (name the overlap it reports),
or if a change outside the owned sites is needed. Decide, record, and carry on from the scratch
blocks' declaration names and the case titles' wording.

## Acceptance criteria

1. `npx oxfmt --check tests/setupServer.ts tests/setupServer.test.ts` and `npx oxlint tests/setupServer.ts
   tests/setupServer.test.ts` exit 0.
2. `npm run check` exits 0.
3. `npm run test:setup` reports exactly one failure, the shipped-key Set literal case, and the
   coincidence-floor case and every `findDuplication` case green.
4. `tmp/units/b-forms-floor-report.md` exists.

**Observations, not criteria.** `npm run test:conformance` (red on GROUP's absent selectors at this
tree): report its reading.

## Review evidence

A code change: the actual diff and the actual `git status --short`.
