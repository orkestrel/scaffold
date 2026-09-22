# CL10 scope read — check the brief before it is dispatched

## Role and engine

`checker` on native Sonnet, clean context, read-only (no write tools). Perform the assignment
directly and spawn nothing.

## Objective

Rule on whether `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl10-brief.md` can be dispatched
as written. Report every defect that would stop, misdirect, or under-scope the unit, each with a
`file:line` site and the correction it needs. End with one terminal line: `Dispatch: go`, or
`Dispatch: fix` naming the defects that force it.

This is a pre-dispatch check of a brief, not a review of code. The unit has not run.

**Every `file:line` you cite must exist in the file you name.** Confirm the file is long enough to
have the line and that the line says what you claim.

## The subject, and how this brief is built

The brief at `cl10-brief.md`, against the live Veneer checkout at
`C:/Users/mikes/WebstormProjects/veneer`. **The checkout will sit at the CL9 landing when this unit
dispatches, which has not happened yet** — CL9 is in a fix round as you read this. So read the tree
as it stands, and where a fact could move with CL9's landing, say so rather than ruling it wrong.

**The brief deliberately restates no measurement.** Every measured fact about the three keys lives in
`.orkestrel/veneer/units/cl10-terrain.md`, with the instrument that produced it. Check the terrain
record for factual accuracy, and check the brief for whether it can be executed without the facts it
declined to repeat. Those are different questions and both matter.

Supporting records: `.orkestrel/veneer/cl7-audit-verdict.md` for the ruling on an undefined class in
a combinator, which this brief carries; `cl8-audit-verdict.md` and `cl8b-audit-verdict.md` for the
comparison this unit extends; and `src/styles/components/_grid.scss` with
`tests/src/styles/components/grid.test.ts` as a pattern the brief names.

The law lives in the scaffold checkout, under
`C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/`. The dispatch contract is
`.agents/orchestration.md` § Dispatch anatomy and its "Check the brief before you send it" checklist.

## What to check

1. **Every path the brief and the terrain record name resolves**, or is marked new.

2. **The terrain record's measurements are true of the tree.** Re-derive each yourself from
   `tests/fixtures/oracle/inventory.json`, `src/styles/_mixins.scss`, `src/styles/_tokens.scss`, and
   `node_modules/bootstrap/dist/css/bootstrap.css`. Report families and counts, never long lists. In
   particular:
   - each key's entry count, declaration count, and properties object;
   - that the icon key is recorded under a reduced-motion preference condition, and that Veneer's own
     mixin emits that same text;
   - that no other key carries any of these three keys' selectors, checked against **every** key;
   - **the aspect ratios' recorded precision, and that it differs from the grid partial's rounding**
     — this is the fact the brief leans on hardest, and a wrong reading of it costs a round;
   - that the alias the vertical rule's width reads is already declared in the token file.

3. **The brief is executable without restating those facts.** Walk each obligation and ask whether a
   unit holding the brief and the terrain record together has what it needs. **Name any place the
   brief points at the record for something the record does not carry** — that is the failure mode
   this practice introduces and the one to hunt.

4. **The owned set covers every file the change makes false.** Search for the population's existing
   members rather than reasoning about which files look relevant: this unit adds three component
   keys and showcase specimens. Find every assertion that enumerates components, showcase sections,
   application-barrel exports, or setup-module exports. **CL9's landed file set will be the closest
   precedent**; until it lands, use CL8b's and CL8's.

5. **The off-limits list is right.** The brief puts the token file and the registry off-limits and
   tells the unit to stop rather than add a token, on the terrain record's finding that none is
   needed. Rule whether that holds — in particular whether the vertical rule's opacity or the icon
   key's transition timing would force one.

6. **No acceptance criterion is unreachable under the brief's own scope.** Rule in particular on the
   criterion requiring the extended comparison's controls, and on the one requiring the reduced-motion
   behaviour to be read under the preference rather than from the rule's text — read
   `tests/setupBrowser.ts` and say whether the setup can drive that preference at all. If it cannot,
   the brief's Unknown already anticipates it; say so rather than calling it a defect.

7. **The criteria are ordered cheap-first**, and none is timing-sensitive or whole-suite in a way the
   contract bars for a unit running inside its own exec. **Note that this unit runs natively rather
   than on a bench**, so the exec-timing caution applies differently — say whether any criterion is
   affected.

## Scope

Read-only. You own no file. Write nothing, run no test, run no build.

## Output

1. **Path check** — every path the brief and the terrain record name, and whether it resolves.
2. **Fact check** — each of the terrain record's measurements, CONFIRMED or REFUTED, with what you
   derived, and the ratio precision called out separately.
3. **Executability** — any place the brief relies on the record for something it does not carry.
4. **Scope gaps** — every file the change makes false that neither list names.
5. **The off-limits ruling** — whether the no-token position holds.
6. **Criterion check** — each criterion, reachable or not, with the reason.
7. **Defects** — numbered, each with a site and the correction.
8. One terminal line.

No process diary.
