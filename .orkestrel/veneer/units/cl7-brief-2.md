# Unit CL7 — brief 2

Succeeds `units/cl7-brief.md`, which stays in force for everything this brief does not name and
is left unedited. What changed and why: a `checker` scope read
(`units/cl7-scope-read-report.md`) checked brief 1 against the tree with CL6's change in it and
returned four amendments. One of them widens a grant to prevent a stop this campaign has already
hit once. Read brief 1 first, then this delta.

## Correction 1 — the mixins file is granted up front

The standing shared-block sweep scans every partial under `src/styles/` recursively, and **that
population includes `src/styles/_mixins.scss` itself**. So a declaration block the new container
partial shares with any existing partial, including a block already living in the mixins file,
is exactly what the sweep flags, and the conventional remedy is extraction into a mixin.

Brief 1 put that file off-limits and named the collision only as a stop condition. **That is the
shape that stopped CL5c mid-unit**: its brief ruled a change that the sweep then refused, and the
remedy needed a file the brief had not granted. There is no reason to repeat it.

**This brief grants `src/styles/_mixins.scss`** for a mixin a block shared by the container
partial and an existing partial needs, and for nothing else. Change no existing mixin. If the
sweep reports a pair whose extraction would change a resolved reading, stop and report rather
than extracting it.

## Correction 2 — the gutter coincidence has exactly two consumers

Brief 1 required a blast-radius measurement over the space-scale member carrying the gutter's
value, and framed the risk as open-ended. It is not. **No partial under `src/styles/` reads that
member through a variable.** Its only consumers are its registry entry in `src/core/constants.ts`
and the density-rescaling assertion in `tests/src/styles/tokens.test.ts`, which pins it against
the scale's index law at two density factors.

So the measurement is bounded: take those two readings before and after, and report them. The
stop condition stands for anything else that moves, but the population is named rather than
searched.

## Correction 3 — the terrain map's line citations are stale, its facts are not

CL6 shifted every line the map cites in the mixins file. The ramp's members are unchanged in
substance and in behaviour; only their addresses moved. **Re-locate each by its name in the
current tree rather than by the map's line number.** The same applies to the breakpoint case
table and the media-width parser in the styles setup module.

The map also names the viewport visitor's module with the wrong extension. It is a TypeScript
module; read it by name.

## Correction 4 — four sections extend the base, not three

Brief 1 says three sections extend the shared base. CL6 added a fourth. The button section still
implements the contract directly and does not extend the base. **CL7's section becomes the
fifth**, and the base's copy and row types are as brief 1 states.

## What the scope read confirmed, so you need not re-derive it

- The key's three selector groups and its two custom properties are as the terrain map reads
  them, and no group is missing from it.
- The key needs at least one shipped variable row and at least one shipped selector row, because
  its projected properties list is non-empty and the empty-properties branch is therefore
  unavailable. The scope read quotes the deciding branch.
- The one ledger-derived case this key moves is the listed value in `tests/conformance.test.ts`,
  which reads the whole table. **Note that CL6 found a second case in the conformance setup proof
  that also reads the whole table**, so check that file too and treat a failure there as the same
  kind of population move rather than as a defect.
- A container proof can drive width changes through the existing case table and viewport visitor
  with no new machinery.

## Scope, amended

Brief 1's owned set, plus `src/styles/_mixins.scss` for correction 1 alone, plus
`tests/src/styles/tokens.test.ts` **only if** the density assertion on the space-scale member
moves under correction 2, and `tests/setupConformance.test.ts` where the key's rows move a
population. Brief 1's off-limits list otherwise stands.

## Acceptance criteria, amended

Brief 1's criteria stand, with criterion 3 replaced and one added:

- The blast-radius table shows the before and after readings of the space scale's twelfth member
  at both its consumers, and no consumer outside the owned set moved.
- The shared-block sweep reports no shared block, and if it required a mixin, that mixin emits
  only the shared declarations and changes no resolved reading.
