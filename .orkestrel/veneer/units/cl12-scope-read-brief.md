# CL12 scope read — check the brief before it is sent

## Role and engine

`checker` on the native cheap tier, clean context, read-only. Perform the assignment directly and
spawn nothing. You edit nothing.

## Objective

Read `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/cl12-brief.md` and its terrain record
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl12-terrain.md` against the live
Veneer tree at `C:/Users/mikes/WebstormProjects/veneer`, HEAD `eb1cd71`, and report whether the brief
is executable as written.

End with one terminal line: `Dispatch: go`, or `Dispatch: hold` with the defects that force it.

## The instruction that matters most here

**Answer any question of the form "can this tree do X" by searching for X already being done, never by
inspecting the interface that would do it.** Name the pattern you searched and the paths it covered,
including for a clean result. A scope read on an earlier unit failed exactly this way and its false
finding reached a dispatched brief.

## What to check

### Paths

Every path the brief and the terrain record name resolves from the Veneer checkout root, including the
two retained carry files the brief tells the unit to verify. Report any that does not.

### The terrain's own readings

Re-derive each and report any that has gone stale:

- that guide parity passes today, and that the parity gate does **not** cover the token table's
  completeness;
- that the seven named container and gutter tokens ship, sit in the registry, and have no guide row;
- that the raised-surface paragraph still ends in a promise about component surfaces;
- that two deferral subsections carry different table shapes, and that each has a machine reader;
- that all four items the design row requires of the departures section are present;
- that the bounds addressed to the earlier guide unit are closed, because that unit landed.

### The false claim

The terrain record states that a carried claim about test-module exports needing guide rows is FALSE,
because the rule touching those exports is a name-collision check rather than a documentation
requirement. **Verify that independently** and report whether the terrain is right. If the terrain is
wrong, that is a defect that must hold the dispatch.

### The stop conditions

The brief tells the unit to stop rather than proceed in four cases. For each, judge whether the unit
can actually detect the condition from inside its own scope:

- a correction that would require a code change;
- a deferral-grammar choice that would reach a reader;
- a retained bound it cannot verify either way;
- a disagreement between the brief and the terrain record.

Report any stop condition the unit could trip without noticing.

### Criteria

Read each acceptance criterion against the off-limits list, line by line. Report any criterion that
cannot be met without touching an off-limits file — in particular whether closing the deferral grammar
can be done inside `guides/veneer.md` alone, given that `tests/setupConformance.ts` parses one table
and is off-limits.

Report any criterion that is timing-sensitive or whole-suite and therefore belongs as an observation.

### Scope

Derive the change's own blast radius: search for what reads the guide. Report every file that parses
it, and say whether the brief's off-limits list names each one.

## Output

One section per heading above, each with its evidence. Then the defects, numbered, each with the brief
line it affects and what would close it. Then the terminal line.

Report a clean section as clean, naming what you searched. Do not pad.
