# Unit B-FORMS-CLOSE-SPECIMENS (`bfs`), round 2 — the audit's prose findings, the geometry gate, the field rename, and the sentinel

Successor to `b-forms-close-specimens-brief.md` (round 1, unedited). What changed and why: round
1's audit (`bfs-audit-verdict.md`) confirmed every code claim and faulted the `CASCADE_KEYS` doc
block (claim 4), the returned guide sentence (claim 8, which the Orchestrator lands as the
reviewer's text), the visible Input group paragraph (F1), the `floor` field name (F2), the
`'nothing'` sentinel, a position-named group, and a redundant focus comment. This round carries
exactly those.

## Role and engine

`opus` on Opus 5.5 (native Claude subagent), sole writer in `/home/user/veneer-bfs` (the round-1
worktree over `d02bd46`, holding round 1's uncommitted writes, which this round builds on and never
discards; `dist/` is built). Perform the assignment directly and spawn nothing. Use absolute paths
under `/home/user/veneer-bfs`, run every npm and npx command from there, and run
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`
first in every shell. Do not commit, push, install, run `corepack use`, or run `git checkout`,
`git restore`, `git stash`, `git reset`, `git clean`, or `git checkout-index`.

## Objective

The doc block states one predicate the journey gates on, states no count, and follows `writing.md`;
the journey's hanging-key gate derives from geometry; the `hung` map's field and its `hit` value
follow the design laws; the Input group paragraph and its test string match the specimens; and the
gates in § Acceptance criteria are green.

## Context

**Evidence.** The findings and their sites (locate each by the quoted text; lines are approximate):

```text
tests/setup.ts:349-352   "a row beyond a component's first names the host its specimen renders the element in"
tests/setup.ts:358       "Two placement rulings were measured rather than assumed, and each one is why these frames are shot the way they are."
tests/setup.ts:366       "This was measured on 2026-09-22" (the date holds: commit eb1cd71 of 2026-09-22 introduced the measurement)
tests/setup.ts:375-378   "a key that paints outside its host's box is framed with the in-flow content its specimen renders beneath it, and the journey reads the key's bottom edge inside the frame's"
tests/setup.ts:389       "The showcase renders both specimens and `tests/src/styles/components/spinner.test.ts` reads their running timelines"
tests/app/browser/integration.test.ts:660   if (copy.matches('.valid-tooltip, .invalid-tooltip')) {
tests/app/browser/integration.test.ts:670-675   hung.set(..., { edge, floor, shared, hit: hit === copy ? 'tooltip' : (hit?.outerHTML.slice(0, 80) ?? 'nothing') })
tests/app/browser/integration.test.ts:719   the filter reading edge > floor and hit !== 'tooltip'
tests/app/browser/integration.test.ts:1472-1476   the focus comment ("share one line; ... paints over the border the two share")
app/browser/constants.ts:1506   INPUT_GROUP_COPY paragraph: "... and the tooltip a passing and a failing group hang over the row after them."
app/browser/constants.ts:1527   "The second group leads with its button"
tests/app/browser/sections/InputGroupSection.test.ts:29   asserts the paragraph string
```

The floating labels (`form-floating-filled`, `-disabled`, `-plaintext`) paint 6.8 px above their
host (`_form-floating.scss` `transform: scale(0.85) translateY(-0.5rem)`), so a geometry gate on
"the copy's top at or below its parent's bottom" excludes them and admits the tooltips. The
verdict is `/home/user/scaffold/.orkestrel/veneer/units/bfs-audit-verdict.md`; the lane verdicts
sit beside it.

**Law.** `/home/user/scaffold/AGENTS.md`;
`/home/user/scaffold/.claude/rules/{browser,tests,names,writing,typescript}.md`. Skill: none.
Guide: none owned.

**Installed primitives.** `@orkestrel/test` browser entry
(`node_modules/@orkestrel/test/dist/src/browser/index.d.ts`): re-read it for an export that tests a
point inside a rectangle before keeping the inline comparison, and report what you found.

**Host.** As round 1. **Measurements.** Read each site before editing. **Control identifiers.**
4a, 4b, 4c, F1, F2, the sentinel, the position name, the focus comment. Name a test for what it
proves. **Standing conditions.** The worktree is dirty with round 1's writes by design; the
portfolio directory `tmp/capture/` holds round 1's frames.

## Unknowns

none.

## Scope

**Owned.** `app/browser/constants.ts` (the same bounded regions as round 1), `tests/setup.ts` (the
`CASCADE_KEYS` doc block), `tests/app/browser/integration.test.ts`,
`tests/app/browser/sections/InputGroupSection.test.ts`, `tmp/units/bfs-report-2.md`.

**Shared (report-only).** `guides/veneer.md`, `ROADMAP.md`, `tests/setup.test.ts`.

**Off-limits.** As round 1.

**What asserts the state this change ends.** The quoted sentences (Owned); the section test's
paragraph string (Owned); the `hung` map's consumers (Owned).

**Tools and limits.** As round 1.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

Write `tmp/units/bfs-report-2.md`: the diff summary against round 1, each criterion with its
command and result line, the geometry gate's reading (which keys it admits), and the claims you
flag as weakest. Return the same content as your final message.

## Deviation contract

Stop and report on a quoted site not found or a criterion needing a file outside Owned. Decide,
record, and carry on for rewrapping and for the exact shape of the geometry predicate.

## Acceptance criteria

1. `tests/setup.ts` doc block: the "names the host" sentence reads "So a row beyond a component's
   first names what sets its specimen apart — a modifier, a state, or the host its specimen renders
   the element in — which is also what that specimen exists to show."; the count sentence reads
   "The placement rulings were measured rather than assumed, and each one is why these frames are
   shot the way they are."; the hanging-key paragraph opens "A key the release positions below its
   host's box is framed with the in-flow content its specimen renders beneath it" and states the
   same predicate the journey gates on; the spinner sentence reads "The showcase renders the grow
   spinners and the `tests/src/styles/components/spinner.test.ts` file reads their running
   timelines" (no tally); the date stays.
2. `integration.test.ts`: the gate at the `copy.matches` line derives from geometry (the copy's
   top at or below its parent's bottom), keeps the `requireValue` on the button-led group so a
   hanging key with no room fails loudly, and admits exactly the two tooltip keys on this tree
   (report the admitted set); the `hung` map's `floor` field is renamed `limit` and its consumers
   updated; the `hit` value is `string | undefined`, `undefined` when `readHit` returns none, with
   the filter and its message updated; the focus comment reads "…onto the control's trailing
   border, so the two share one line, and the button's border paints that line until the control
   is lifted past it" (rewrapped); the rest case's comment naming "the Layout table alone" and the
   `CascadeKey` remarks' "one role link" in `tests/setup.ts` say the rationale in the same words as
   the doc block's rewritten sentence.
3. `app/browser/constants.ts`: the paragraph ends "…the feedback a failing group reports under its
   row, and the tooltip a passing or a failing group hangs over the row after it." and
   `InputGroupSection.test.ts` asserts that string; the doc block names the button-led group by
   name, never by position.
4. `npx oxfmt --check` over the owned files, `npm run format:check`, `npm run lint:check`, and
   `npm run check` exit 0.
5. `npm run test:setup` and `npm run test:app` exit 0.
6. `npm run test:journey` exits 0 (the portfolio-frame case reads round 1's frames under
   `tmp/capture/`).

**Observations, not criteria.** A one-variant `CAPTURE=1` run if the geometry gate changes any
frame (it changes none by design).

## Review evidence

The diff against `d02bd46` and the status, this report, and round 1's records.
