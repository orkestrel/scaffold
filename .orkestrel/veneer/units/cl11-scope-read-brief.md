# CL11 scope read — check the brief before it is sent

## Role and engine

`checker` on the native cheap tier, clean context, read-only. Perform the assignment directly and
spawn nothing. You edit nothing.

## Objective

Read `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/cl11-brief.md` and its terrain record
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl11-terrain.md` against the live
Veneer tree at `C:/Users/mikes/WebstormProjects/veneer`, HEAD `0e0b055`, and report whether the brief
is executable as written.

End with one terminal line: `Dispatch: go`, or `Dispatch: hold` with the defects that force it.

## The instruction that matters most here

**Answer any question of the form "can this tree do X" by searching for X already being done, never
by inspecting the interface that would do it.**

The last unit's scope read failed exactly this way. It was asked whether the browser setup could drive
a media preference, inspected the browser page object, found no control for it, and reported the
capability unreachable. The mechanism was a function an installed package exports, already imported by
name in five proofs in the same tree — a grep for it answers the question in one command. That false
finding reached the dispatched unit's brief, which told it not to rediscover the answer. The unit
refused the premise and was right.

So for every capability question in this brief: grep for the thing itself first. **Name the pattern
you searched and the paths it covered, including for a clean result.** An interface's surface is
evidence about that interface and never about the tree.

## What to check

### Paths

Every path the brief and the terrain record name resolves from the Veneer checkout root. Report any
that does not.

### Facts, against the terrain record

The brief deliberately restates no measurement. Confirm the terrain record's own readings against the
tree, and report any that has gone stale since it was written:

- the breakpoint visitor's bare restore, and that the correct pattern is in the same module;
- that no case reaches a rejecting restore;
- that the unreachable-after-scrolling refusal has no case anywhere;
- that the existing pressed-state case drives the failing-release variant, so the successful-release
  path is the uncovered one;
- that the capture registry names no content or layout state;
- that the consumer page's body is empty and its drive builds the Button elements;
- that the distribution project is absent from `npm test`.

### Executability

Report any place where the brief points at the terrain record for a fact the record does not carry, or
asks for something the tree makes impossible.

### Scope gaps — the expensive class

**Derive the resolver rename's full consumer set yourself.** Grep the tree for the current name and
list every file that comes back. Then read the brief's owned list and report any file in your set that
the brief neither owns nor names off-limits. A file the change will break that appears in neither list
is unscoped, and that class of gap has stopped two units in this campaign.

Do the same for any enumerating assertion the new capture states would make false: search for the
population's existing members — the state names the registry already carries — and report every file
that names one.

### Criteria

Read each acceptance criterion against the off-limits list, line by line. Report any criterion that
cannot be met without touching an off-limits file.

Report any criterion that is timing-sensitive or whole-suite and therefore belongs as an observation
rather than a criterion for a unit running in its own context.

### Capability questions in this brief

Settle each by searching for the behaviour, and say what you searched:

- whether the capture flag can be set the way the terrain record says;
- whether a journey can reach a content or layout state at all in the current harness;
- whether the `prove` tool is reachable from a native writing subagent in this repository;
- whether a planted failing journey retains journal and tree artifacts today, or whether that
  behaviour has to be built.

## Output

One section per heading above, each with its evidence. Then the defects, numbered, each with the
brief line it affects and what would close it. Then the terminal line.

Report a clean section as clean, naming what you searched. Do not pad.
