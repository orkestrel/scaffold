# CL9 scope read — check the brief before it is dispatched

## Role and engine

`checker` on native Sonnet, clean context, read-only (no write tools). Perform the assignment
directly and spawn nothing.

## Objective

Rule on whether `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl9-brief.md` can be dispatched
as written. Report every defect that would stop, misdirect, or under-scope the unit, each with a
`file:line` site and the correction it needs. End with one terminal line: `Dispatch: go`, or
`Dispatch: fix` naming the defects that force it.

This is a pre-dispatch check of a brief, not a review of code. The unit has not run.

**Every `file:line` you cite must exist in the file you name.** Confirm the file is long enough to
have the line and that the line says what you claim.

## The subject, and an unusual thing about it

The brief at `cl9-brief.md`, against the live Veneer checkout at
`C:/Users/mikes/WebstormProjects/veneer`, which will sit clean at the CL8b landing when this unit
dispatches. Read the checkout as it stands.

**This brief deliberately restates no measurement.** Every measured fact about the table key lives in
`.orkestrel/veneer/units/cl9-terrain.md`, with the instruments that produced it, and the brief points
there. That is a change of practice: a previous brief in this campaign restated a measurement, the
copy drifted from the original, and a unit spent a round refusing the false premise.

**So check the terrain record, not the brief, for factual accuracy** — and check the brief for
whether it can be executed without the facts it declined to repeat. Both matter, and they are
different questions.

Supporting records: `.orkestrel/veneer/cl8-audit-verdict.md` and `cl8b-audit-verdict.md` for the
findings CL9 inherits, and `src/styles/components/_grid.scss` with
`tests/src/styles/components/grid.test.ts` as the pattern the brief tells the unit to follow.

The law lives in the scaffold checkout: the rule files are under
`C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/`. The dispatch contract is
`.agents/orchestration.md` § Dispatch anatomy and its "Check the brief before you send it"
checklist, which is what this lane applies.

## What to check

1. **Every path the brief and the terrain record name resolves**, or is marked new.

2. **The terrain record's measurements are true of the tree.** Re-derive each yourself from
   `tests/fixtures/oracle/inventory.json`, `src/styles/_mixins.scss`, and
   `node_modules/bootstrap/dist/css/bootstrap.css`. Report families and counts, never long selector
   lists. In particular:
   - the table key's entry count, declaration count, and custom properties;
   - that every breakpoint-scoped selector under this key is recorded under a maximum width, and
     what those conditions are;
   - that no other key carries any selector this key carries, checked against **every** key rather
     than by prefix;
   - that the caption class is recorded under this key alone;
   - that the downward mixin emits the range form, and that the record's downward boundary is the
     named boundary less a fraction — name the fraction you find.

3. **The brief is executable without restating those facts.** Walk each obligation and ask whether a
   unit holding the brief and the terrain record together has what it needs. Name any place the brief
   points at the record for something the record does not carry — that is the failure mode this
   practice introduces, and it is the one to hunt.

4. **The owned set covers every file the change makes false.** Search for the population's existing
   members rather than reasoning about which files look relevant: this unit adds a component key, may
   add a token, and adds a showcase section. Find every assertion that enumerates any of those. Check
   the conformance listing, the assertion enumerating components with guide rows, whatever asserts
   the `:root` custom-property set against the registry, whatever enumerates the showcase's sections
   or the application barrel's exports, and whatever enumerates the setup module's exports. **CL8's
   and CL8b's landed commits are the best evidence for what a key-adding unit touches** — read their
   actual file sets rather than reasoning about them.

5. **No acceptance criterion is unreachable under the brief's own scope.** Rule in particular on the
   criterion requiring three controls on the extended comparison, including the one that a condition
   shifted off the equivalence must redden. Read the comparison and its normalizer and say whether a
   unit could write that control within the granted files.

6. **The rulings the brief states as settled are consistent with the tree** — especially that the
   downward mixin stays as it is and the equivalence belongs in the comparison.

7. **The criteria are ordered cheap-first**, and none is timing-sensitive or whole-suite in a way the
   contract bars for a unit running inside its own exec.

## Scope

Read-only. You own no file. Write nothing, run no test, run no build.

## Output

1. **Path check** — every path the brief and the terrain record name, and whether it resolves.
2. **Fact check** — each of the terrain record's measurements, CONFIRMED or REFUTED, with what you
   derived.
3. **Executability** — any place the brief relies on the record for something it does not carry.
4. **Scope gaps** — every file the change makes false that neither list names, with the evidence from
   the two landed commits where it applies.
5. **Criterion check** — each criterion, reachable or not, with the reason.
6. **Defects** — numbered, each with a site and the correction.
7. One terminal line.

No process diary.
