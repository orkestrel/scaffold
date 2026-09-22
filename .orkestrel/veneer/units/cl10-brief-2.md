# Unit CL10 brief 2 — the fix round round 1 forced

This is the effective brief over `cl10-brief.md`, which stays in place unedited. Open and follow that
brief for every section this one does not change: the rulings you implemented, the logical-property
substitution, the undefined-class ruling, the transition pairing, and the gate chain all stand.

## Role and engine

`sol` on Astra, the sole writer in the Veneer checkout at `C:/Users/mikes/WebstormProjects/veneer`.
Round 1 was written by Opus 5, so this round goes to an engine that did not write it.

You are the bench engine reading this brief inside your own CLI: perform the assignment directly and
spawn nothing.

Do not commit, push, install a dependency, or run a destructive command. Do not run `git checkout`,
`git restore`, `git stash`, `git reset`, or `git clean`. The working tree carries round 1's authored
work; that is the subject, not drift. The Orchestrator lands it.

## What round 1 settled, and what it did not

Round 1 **accepted** the shipped cascade. Both judgment lanes reconciled the pinned record against the
built cascade and agreed the three keys ship whole, with nothing extra and nothing deferred. The gates
ran green on both engines, first run. The precision ruling, the departures, the showcase placement, the
scope honesty, and every proof's falsifiability but one were confirmed, and that one the Orchestrator
settled itself by mutation.

**Reopen none of that.** This brief grants no new key, no new family, and no new departure.

Two findings force this round. Five more are carried because they sit in files you already open, and
three come in from the CL9 round, which named this round as their first opportunity.

## Where the facts are

**This brief states rulings and obligations. It restates no measurement.** Every measured fact for this
round lives in `./tmp/units/cl10-fix-terrain.md`, with the instrument that produced it. Read it first.
If this brief and that record disagree, the record and the tree win, and you stop and report the
disagreement rather than resolving it.

That record also closes two questions so you do not spend the round on them: the icon-shift proof's
reading is already settled by measurement, and one of the three carried findings needs no change.

## Obligation 1 — the selector boundary, forcing

The admission expression in `collectGridVocabulary` uses an ASCII-only negated class as its word
boundary, so it admits a longer name whose extension is non-ASCII or escaped. The terrain record
carries the measured admission table and states exactly what CSS counts as an identifier continuation.

Make the boundary refuse every identifier continuation while still admitting the family-member
separator, the end of the selector, and a genuine non-identifier character.

The defect predates your round and reaches the earlier prefixes too, so fix the boundary once for every
prefix the expression names rather than special-casing the three helper keys.

Then extend the control case that covers it. Round 1's control asserts the boundary refuses longer
names and exercises ASCII only, so it claims more coverage than it proves. Bring each refusal class in
the terrain table under it.

**Name the mutation your extended control distinguishes, and put that in your report.**

## Obligation 2 — the nested reader, forcing

The icon-shift case assigns an arrow function to a `const` inside the case body. `AGENTS.md` § Design
laws forbids a function assignment in a body, and its exceptions cover an anonymous callback passed
directly as an argument and an anonymous function returned directly as a result. This is neither. The
reader is called three times, so it is not trivial one-use logic to fold into its caller.

Move it to the browser setup module, export it, and prove it there. `.claude/rules/tests.md` places DOM
helpers in that module and requires every reusable helper exported from a setup file to be tested.

Read the module's existing geometry and cascade helpers first and follow their naming and shape.

**The lint gate cannot see this defect**: the rule that would catch it is scoped away from the test tree.
A green `lint:check` is not evidence you closed it.

## Obligation 3 — five carried findings in files you already open

Each is non-forcing on its own. They are here because closing them costs less than a later unit
reopening these files.

- **The ratio loop.** Destructure the aspect pair in the loop header rather than reading it by index,
  and drop the list-module dependency that becomes unused. The emitted cascade must not change: prove
  that with the built cascade's digest before and after.
- **The icon-class selector list.** Its equality is ordered over a set filled in cascade order, so
  reordering two selectors inside the hover rule reddens a change with no cascade meaning. Sort both
  sides, as the vocabulary collector does for the same reason.
- **The icon-link compatibility row.** It is silent on the two value substitutions this key makes, both
  of which its own guide paragraph states. The link row sets the precedent by naming its substitution
  in its Notes cell. Follow that form. **Change the row's Notes cell only — leave its granularity
  alone**, per the terrain record's final section.
- **The no-op flush in the ratio case.** The awaited resolved promise performs no layout flush, because
  the pixel reader forces layout itself. Remove it and let the case be synchronous if nothing else in
  it awaits.
- **The export list's literal order.** The icon-link markup constant sits out of alphabetical position
  and reads as an error until a reader notices both sides of the comparison sort. Move it into position.

## Obligation 4 — the CL9 findings this round carries

The terrain record states all three and rules that one needs no change. Close the other two.

- **The vacuous portion of the freeze assertion.** Narrow it to the containers whose entries can
  actually fail it, or assert something that can fail for the others. Do not weaken what it proves for
  the object-bearing tables.
- **The normalizer regression case's rows.** Have it supply its own row while still driving the real
  scanner, so unrelated guide state cannot redden it.

## Unknowns

- **Which module the reader belongs in, if the browser setup module is wrong.** The Orchestrator read
  that module's exports and placed it there. If the tree says otherwise, stop and report rather than
  choosing a third home.
- **Whether narrowing the freeze assertion changes what any sibling proof relies on.** Search for its
  consumers before editing, and report what you found.

## Scope

**Owned:** everything `cl10-brief.md` owned, plus `tests/setupBrowser.ts` and
`tests/setupBrowser.test.ts` for Obligation 2 only.

**The browser setup module is granted narrowly.** Add your one export and its proof; change nothing
else in either file. A later unit owns that module's other findings, and an edit you make outside your
one export collides with work already assigned.

**Off-limits:** unchanged from `cl10-brief.md` — `tests/setupConformance.ts`, `tests/fixtures/**`,
`package.json`, `configs/**`, `src/styles/_tokens.scss`, `src/core/constants.ts`, every other partial
and proof, and every path `scaffold repair` restores, which includes `tests/setupPolicy.ts` and
`tests/policy.test.ts`. Also off-limits: `.oxlintrc.json`. The lint rule's scope is not yours to widen,
and widening it would reach every test file in the tree.

## Execution

The gate chain, in order: `npm run format:check`, `npm run lint:check`, `npm run check`,
`npm run build`, `npm test`. Run the styles, browser-setup, and app-browser projects on Edge as well
through `PLAYWRIGHT_CHANNEL=msedge`.

`npm run build:src:styles` must precede any reading of the built cascade. The styles project runs from
its own config at `configs/src/vite.styles.config.ts`; the root config carries no project of that name,
so a `--project` filter for it matches nothing and reports no tests rather than failing.

`tmp/` is expected to be dirty and is not in your scope.

## Output

Write your report to `./tmp/units/cl10-report-2.md` and return its full content as your final message,
nothing else.

1. Each obligation, what you changed, and the mutation your control distinguishes.
2. The built cascade's digest before and after the ratio loop change, proving the emitted cascade held.
3. The red-then-green reading for the extended boundary control, with exact commands and output.
4. Each Unknown, with what you found.
5. The gate chain's exit codes and final result lines, on both engines.
6. `git diff --stat` and `git status --porcelain --untracked-files=all`, actual output.
7. Anything you could not close.

No process diary.

## Deviation contract

`.agents/orchestration.md` § Deviation protocol. Settle within your own scope: how the boundary is
expressed, the reader's exported name and signature, the shape of each control, and where the Notes
cell's sentence sits. Stop and report if this brief and the terrain record disagree, if the reader's
home is wrong, if closing a carried finding would reach a file this brief does not grant, or if the
boundary fix changes which selectors the built cascade contributes to the comparison.

## Acceptance criteria

Cheap first.

1. `npm run format:check` and `npm run lint:check` exit 0.
2. `npm run check` exits 0.
3. `npm run build` exits 0, and the built cascade is byte-identical to its digest before your changes.
4. `npm run test:setup` exits 0, including the extended boundary control and the narrowed freeze
   assertion.
5. `npm run test:setup:browser` exits 0, including the new reader's proof.
6. `npm run test:conformance` and `npm run test:guides` exit 0.
7. `npm run test:src:styles` exits 0 on managed Chromium and on Edge.
8. `npm test` exits 0 whole.
9. The status lists only files this brief or `cl10-brief.md` owns.
