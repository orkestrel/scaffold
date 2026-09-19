# Design round 1 — objective lane report (analyst, gpt-6-astra, thread 01a0b039-0054-7463-b38f-0ed86c89491b, journal tmp/codex/design-analyst.jsonl swept at acceptance)

**Disposition:** deviation report, not a design. The lane stopped on a governing-contract conflict the Orchestrator verified as real (the superseded brief carried the stale Contract rule 9 sentence). Superseded by design-brief-2.md; retained unedited.

## Ruling summary

Stopped on a governing-contract conflict.
The brief requires `@orkestrel/test` to retain an empty runtime dependency set.
The package declares and uses `@orkestrel/contract`, and its guide explicitly records that adoption.
Another section of the same guide still requires zero runtime dependencies.
The applicable rules require reuse of the declared contract primitives.
A successor brief must settle that boundary before this lane can supply an implementable design.
No files changed. No browser tests or gates ran.

## Matrix

The conflicting requirements prevent a final capability matrix.

| Capability | Expected | Found and evidence | Disposition |
|---|---|---|---|
| Test-package dependency boundary | The brief requires “`dependencies` stays empty.” | [Design brief](/C:/Users/mikes/WebstormProjects/scaffold/tmp/units/design-brief.md:144) conflicts with the declared `@orkestrel/contract` dependency in [package.json](/C:/Users/mikes/WebstormProjects/test/package.json:85), its runtime imports in [helpers.ts](/C:/Users/mikes/WebstormProjects/test/src/core/helpers.ts:1), and the guide’s adopted-outcome ruling at [Limits](/C:/Users/mikes/WebstormProjects/test/guides/test.md:1388). The guide’s [zero-dependency rule](/C:/Users/mikes/WebstormProjects/test/guides/test.md:1143) contradicts that adoption. | **Repair** the governing contract before implementation dispatch. |

## Contracts

No public declarations proposed. Their permitted dependencies remain unresolved.

Removing the declared dependency would require revisiting existing uses of its primitives. Retaining it would contradict the brief’s explicit boundary. Neither decision belongs to this read-only lane.

## Statechart ruling

Not finalized. The browser layer’s prohibition on importing core also affects whether a published harness can reuse the existing runner and attribute map. A design must resolve that constraint explicitly instead of duplicating those mechanisms.

## Propagation ruling

Not finalized. The release sequence depends on the accepted test-package contract. The supplied sequence cannot establish which dependency and guide changes scaffold must propagate while that contract conflicts.

## Skill instructions

The stop follows [AGENTS.md](/C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md), which directs: “When they conflict, stop and surface the conflict.”

The relevant reuse requirement is in [TypeScript rules](/C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/typescript.md): when `@orkestrel/contract` is declared, inspect and use its installed outcome and exception-boundary primitives instead of duplicating them.

## Units

The prerequisite is an authority correction, rather than an implementation unit.

| Unit | Owner and engine | Owned files | Order | Acceptance |
|---|---|---|---|---|
| Settle the dependency boundary | Dispatching Orchestrator; its native engine | Successor design brief; identify the owner of the test guide correction | Before resuming design | State whether the existing `@orkestrel/contract` dependency remains. Reconcile that decision with the guide’s Contract and Limits sections, and restate the browser-to-core import boundary. |

The campaign exit criterion remains unset. This lane has not completed the requested capability enumeration or accepted any implementation scope.

## Risks

Proceeding with the empty-dependency assumption could prescribe removal or duplication of primitives the package already adopts. Proceeding with the declared dependency could produce a design that violates the brief.

The settling check is a consistent ruling across the successor brief, package manifest, runtime imports, and governing guide.

## Unknowns overturned or confirmed

The empty runtime dependency premise is **overturned by source evidence**. `@orkestrel/test` declares `@orkestrel/contract@^0.0.17` and imports its runtime primitives.

The intended dependency boundary remains **unresolved**. This report records a dispatch deviation, not a completed design or a production-readiness verdict.