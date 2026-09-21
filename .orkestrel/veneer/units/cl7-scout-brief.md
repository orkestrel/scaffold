# CL7 scout — the `container` key, the breakpoint ramp, and the deferral rows

## Role and engine

`grok` (Cursor Grok 4.6 through the Cursor CLI, read-only). The Claude-side driver carries this
brief across unaltered and returns the journal path and the distillate untouched; the engine
behind the CLI reads it and answers directly, spawning nothing.

## Objective

A distilled map, with `file:line` pointers, of what unit CL7 must reconcile: the pinned
inventory's `container` key with every media condition it carries, the breakpoint ramp and the
mixins and case tables that already express it, and the guide rows that defer navigation
selectors. CL7 owns `src/styles/components/_container.scss`, its proof, the breakpoint case
table, a layout showcase section, and the `container` compatibility rows.

## Context

Checkout: `C:/Users/mikes/WebstormProjects/veneer`, HEAD `ea82419` or later. Another unit may be
writing under `src/styles/`, `tests/setupConformance.ts`, and `tests/setupStyles*.ts` while you
read; read the working tree as it stands and judge no unit. Read only these:

- `tests/fixtures/oracle/inventory.json` — the `components.container` entry alone. Each entry has
  a `selectors` array of objects with a `selector` string and a `declarations` array, a
  flattened `declarations` index, a `properties` object, and a `media` field.
- `src/styles/_mixins.scss` — the breakpoint ramp and every mixin reading it.
- `src/styles/_tokens.scss` — every token whose name contains `breakpoint`, `container`, `space`,
  or `gutter`.
- `tests/setupStyles.ts` — the breakpoint case table and the viewport probe, and any table whose
  name contains `BREAKPOINT` or `CONTAINER`.
- `tests/src/styles/mixins.test.ts` — the cases reading the ramp.
- `guides/veneer.md` — its § Deferred selectors table only, and any row whose Component is
  `container`.

## Unknowns

The Orchestrator does not know whether Bootstrap's container widths are expressible through the
breakpoint mixins CL2 landed, nor whether the inventory's container entry carries a `max-width`
per breakpoint or one rule with several conditions. Name what you find rather than resolving it.

## Scope

Read-only. You own no file. Write nothing, run no build, run no test.

## Execution

Perform the assignment directly and spawn nothing.

## Output

Four sections, each with `file:line` pointers and no raw dumps.

1. **The `container` key.** Every selector verbatim, the declarations under each, the media
   condition each sits under if any, and the `properties` object's keys. Group the fluid and
   breakpoint-scoped variants so the shape is visible at a glance.
2. **The ramp.** The breakpoint names and widths as the mixins express them, the exact signature
   of each mixin reading the ramp, and which of them a container partial would use for each
   condition the key carries. Say whether any condition the key carries has no mixin that
   expresses it.
3. **The tables and probes.** The breakpoint case table's shape and what its proof asserts, the
   viewport probe's contract, and whether a container proof can drive a width change through
   existing infrastructure or would need something new.
4. **The deferral rows.** Every row in the deferred-selectors table whose Name is a navigation
   selector or a container-adjacent one, with its Owner and Reason.

## Deviation contract

`.agents/orchestration.md` § Deviation protocol. Settle yourself how you group the rows and how
much of a declaration list you quote. Stop and report if a file this brief names does not exist.

## Acceptance criteria

1. Section 1 lists every selector under the key with its media condition.
2. Section 2 names each mixin's signature and flags any condition with no mixin for it.
3. Section 3 says whether a width change is drivable through existing infrastructure.
4. Every claim carries a `file:line` pointer.
