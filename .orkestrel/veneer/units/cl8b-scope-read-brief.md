# CL8b scope read — check the brief before it is dispatched

## Role and engine

`checker` on native Sonnet, clean context, read-only (no write tools). Perform the assignment
directly and spawn nothing.

## Objective

Rule on whether `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl8b-brief.md` can be dispatched
as written. Report every defect that would stop, misdirect, or under-scope the unit, each with a
`file:line` site and the correction it needs. End with one terminal line: `Dispatch: go`, or
`Dispatch: fix` naming the defects that force it.

This is a pre-dispatch check of a brief, not a review of code. The unit has not run.

## The subject

The brief at `cl8b-brief.md`, against the live Veneer checkout at
`C:/Users/mikes/WebstormProjects/veneer`, which sits clean at commit `d2c5bb3`.

Supporting records, for what the brief inherits rather than for its correctness:
`.orkestrel/veneer/units/cl8b-rulings.md` (the rulings the brief compresses, with their reasoning),
`.orkestrel/veneer/cl8-audit-verdict.md` (the findings CL8b carries), and
`src/styles/components/_grid.scss` with `tests/src/styles/components/grid.test.ts` and
`tests/setupStyles.ts` (the pattern the brief tells the unit to follow).

The law lives in the scaffold checkout: `AGENTS.md` at the Veneer root redirects there, and the rule
files are under `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/` — `styles.md`, `tests.md`,
`architecture.md`, and `names.md` in particular. The dispatch contract is
`.agents/orchestration.md` § Dispatch anatomy, whose "Check the brief before you send it" checklist
is what this lane applies. **Two of its lines are recent and were added because this campaign broke
them, so apply them deliberately**: grant the file whose pattern a brief tells a unit to copy
wherever a standing gate forbids duplicating that pattern; and find the enumerating assertions by
searching the tree for the population's existing members rather than by reasoning about which files
look relevant.

## What to check

1. **Every path the brief names resolves** from the Veneer checkout root, or is marked new.

2. **Every measured fact the brief states is true of the tree.** Re-derive each yourself from
   `tests/fixtures/oracle/inventory.json`, `src/styles/_tokens.scss`, and
   `node_modules/bootstrap/dist/css/bootstrap.css`, and name any that is wrong. Report families and
   counts, never long selector lists. The facts are:
   - the four keys' entry counts, distinct-selector counts, and properties objects;
   - that every one of the four keys, and also `gap` and `column-gap`, sets the same step scale, and
     what those step values are;
   - that every Veneer space token carries the density factor and that `--vn-gutter-x` and
     `--vn-gutter-y` do not;
   - that Bootstrap's own distribution emits two grouped rules per gutter step, grouping the
     combined class with the horizontal-only class in one and the vertical-only class in the other,
     and that the record carries each combined class twice as a consequence.

3. **The owned set covers every file the change makes false.** Walk each obligation and each
   criterion and name any file the unit must edit that appears in neither the owned nor the
   off-limits list. Search for the population's existing members rather than reasoning: the unit adds
   component keys and it adds registry tokens, so find every assertion that enumerates either. Check
   in particular:
   - whatever asserts the conformance listing, and whatever enumerates the components carrying guide
     rows;
   - whatever asserts the `:root` custom-property set against the token registry, and whatever
     asserts the registry path law;
   - whatever enumerates which tokens carry the density factor, or asserts a density rescaling, if
     anything does — a new scale that deliberately carries no factor may make such an assertion
     false;
   - whatever enumerates the styles barrel's loads, the setup module's exports, or the showcase's
     sections.
   For each, say whether the brief grants it, and whether CL7 or CL8 needed it when they added
   tokens or keys. **CL7 added tokens and CL8 added keys; their landed commits are `a9172df` and
   `d2c5bb3`, so their actual file sets are readable from git and are the best evidence for what this
   unit will need.**

4. **No acceptance criterion is unreachable under the brief's own scope.** Rule in particular on the
   criterion requiring the `row` key's deferral rows gone and every `.row-gap-*` selector present:
   read `readDeferrals` and `scanCompatibilityPresence` and say whether deleting those rows plus
   shipping those selectors is sufficient, or whether something else moves.

5. **The emitted-vocabulary proof's extension is actually possible within the granted scope.** The
   brief tells the unit to bring these keys into the assertion CL8 retained. Read that assertion and
   its collector and say whether extending it to these keys needs anything the brief does not grant,
   and whether the collector's selector-prefix population would admit these keys as written.

6. **The rulings the brief states as settled are consistent with the tree**, especially that the
   two-rule grouping the brief mandates is what the multiset comparison requires rather than what it
   forbids.

7. **The criteria are ordered cheap-first**, and no criterion is timing-sensitive or whole-suite in a
   way the contract bars for a unit running inside its own exec.

## Scope

Read-only. You own no file. Write nothing, run no test, run no build. Report through your final
message.

## Output

1. **Path check** — a short table of every path the brief names and whether it resolves.
2. **Fact check** — each measured claim, CONFIRMED or REFUTED, with what you derived.
3. **Scope gaps** — every file the change makes false that neither list names, with the evidence
   from CL7's and CL8's landed file sets where it applies.
4. **Criterion check** — each criterion, reachable or not, with the reason.
5. **The proof extension** — whether it is possible as granted.
6. **Defects** — numbered, each with a site and the correction.
7. One terminal line.

No process diary.
