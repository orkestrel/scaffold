---
name: enterprise-veneer
description: >-
  Compose Veneer interfaces that preserve Bootstrap behavior and use Form and Table
  for their domain mechanisms. Use when building or extending an interface with
  @orkestrel/veneer, integrating its forms, tables, or model-owned drag flows, or
  deciding the boundary between semantic defaults and Bootstrap components.
---

# Build with Veneer

## Read the installed contracts

Read the project's `AGENTS.md`, applicable rules, design context, and governing guides.
Resolve Scaffold authority through the path that the project's authority names. Load
the canonical `enterprise-bootstrap` skill from that authority's
`.agents/skills/enterprise-bootstrap/SKILL.md` in a checkout, or from
`node_modules/@orkestrel/scaffold/dist/host/agents/skills/enterprise-bootstrap/SKILL.md`
in an installed package. Follow its craft workflow and the references relevant to the
surface; keep Bootstrap craft there.

Read the Veneer, Form, and Table guides supplied with the project or its installed
Scaffold authority. Compare the sections needed by the task with each installed
package's manifest exports and public declarations before choosing a call. In a
package checkout, also read its authoritative source types. Select direct public
entrypoints from those readings. When a required entry or behavior is absent, report
the owning package gap before building a substitute in the application.

## Assign each mechanism

Identify the Bootstrap components covering the task before adding an interaction.
Preserve their anatomy, attributes, events, cancellation, focus, and cleanup contracts
through Veneer's Bootstrap implementation. Use the existing responsive offcanvas for
a sidebar; prove cleanup when an open panel crosses its breakpoint. Add a mechanism
only for a task those contracts leave uncovered.

Assign ownership before binding elements:

- Keep form values, validation, touched state, and saved baselines in Form core.
- Keep table rows, sorting, filtering, selection, expansion, and pagination in Table core.
- Put native element binding and projection in the respective browser entries.
- Give Veneer Bootstrap presentation, feedback classes, and scope integration.
- Leave persistence, navigation, and domain policy with the application.

Choose one ordering owner for each drag population and one rendering owner for each
table. For model-owned movement, require explicit stable keys, define proposal,
acceptance, refusal, and rerender reconciliation, and report success only after the
accepted model order is reflected. For table rows, require explicit stable identity
across sorting, filtering, paging, and projection. Preserve focus by identity. Use
the installed ownership contract without keeping a parallel state store.

For repeated editing, capture the submitted snapshot and acknowledge that snapshot
only after persistence succeeds. Keep edits made during the save dirty. Define the
invalid, pending, failed, repeated, and canceled paths before binding submission;
prevent stale completions or errors from overwriting later edits. On failure or
cancellation, preserve the last acknowledged baseline and recoverable input. Use
the installed Form contract for this lifecycle; keep terminal submission distinct
from repeated editing.

## Compose the surface

Choose semantic defaults only for unambiguous individual elements. Keep each default
element-local, exclude conflicting component classes on that same element, and keep
utilities composable with it. Keep compound tables and forms class-driven. Do not
infer a component or a page layout from ancestors or nested semantics.

Select the installed sheets, tokens, and classes from their guides and registries.
Prove default treatment alone, with component classes and variants, with utility-only
classes, and in disabled and invalid states. Include nested examples so an element's
treatment cannot silently style another component. Apply `enterprise-bootstrap` for
responsive composition, action hierarchy, themes, contrast, and interaction states.

## Prove the composed task

Use the canonical `orkestrel-journey` skill for real pointer and keyboard journeys,
refusals, resolved styles, and captures. Drive the application's persistence boundary
when claiming a save. Exercise repeated saves, edits during a pending save, failure,
cancellation, stable row identity, and movement refusal where those flows apply.
Prove listener, observer, overlay, and pending-operation cleanup through teardown.

Capture the reached states in the declared themes and viewports, including narrow
layouts and offcanvas breakpoint transitions. Read the resolved cascade alongside
the captures. Report each proved outcome with its evidence and each unverified
boundary as open. For a requested rendered verdict or polish round, use the canonical
`orkestrel-polish` skill and apply this composition procedure inside its fix units.
