---
name: orkestrel-align
description: Audit and improve how two or more Orkestrel packages, or their core, server, browser, and app environments, fit together. Use for coordinated package-stack refactors, cross-package extraction, developer-ergonomics reviews, end-to-end or live integration testing, dependency and guide alignment, and fleet/package-manager campaigns. Preserve host-independent core boundaries, update dependents topologically, and use the package-hardening workflow for each implementation unit.
---

# Align Orkestrel packages

## Read

`AGENTS.md` § Authority and loading names the files every unit reads. This skill adds the reference selected in this section, `guides/scaffold.md`, and the `orkestrel` role's catalog table.

Use live manifests, lockfiles, installed declarations, guides, branches, and consumer code. Never trust remembered package versions, dependency ranges, or catalog entries.

Load [integration.md](references/integration.md) for cross-package or cross-environment ownership, ergonomics, extraction, and real round-trip tests.

Load [fleet.md](references/fleet.md) for version/range/guide drift, dependency blast radius, consumer-artifact validation, or campaign state.

Invoke `$orkestrel-harden` for each package implementation unit. This skill owns cross-package decisions; the hardening skill owns the complete work inside one package.

## Execute the campaign

1. **Create one registry.** Record the campaign goal, authoritative session, repositories, branches, dirty state, declared/resolved versions, dependency edges, guide state, write scope, and exclusions.
2. **Bound context.** Scout only packages and consumers relevant to the behavior. Use registry/canonical sources for the rest of the fleet.
3. **Trace the real flow.** Follow public types and one concrete consumer end to end. Identify where ergonomics break and which layer owns the reusable mechanism.
4. **Assign ownership.** Keep core host-independent. Keep server free of browser assumptions and browser free of Node assumptions. Keep product policy in applications.
5. **Judge downstream friction.** Treat consumer gymnastics as evidence, not automatic proof. Decide whether the consumer misused a coherent API or exposed a general upstream defect.
6. **Design in dependency order.** Update guides and types first in the lowest owning package, then update every affected consumer atomically. Do not add compatibility shims.
7. **Harden each unit.** Apply `$orkestrel-harden` to every touched package with the exact owned scope and acceptance criteria.
8. **Prove the round trip.** Put integration coverage at the highest package that can exercise the real composed behavior. Retain focused deterministic coverage in lower packages.
9. **Validate local changes safely.** When necessary, use built artifacts in an isolated consumer and prove the resolved graph. Restore temporary manifest/lockfile state.
10. **Verify topologically.** Run local gates for touched packages from dependencies to dependents and inspect relevant generated outputs.
11. **Review the campaign.** Run the review `.agents/orchestration.md` § Size gate names on the integrated result, with one cross-package architecture and ergonomics pass over the whole graph. Do not review each unit separately.

## Accept the result

Completion requires:

- ownership and dependency direction remain coherent;
- the concrete consumer no longer needs unjustified gymnastics;
- every changed public contract, consumer, test, and guide is aligned;
- real round-trip behavior is proven at the correct layer;
- package versions/ranges/guides are reported from live evidence;
- every touched repository's requested local gates are green;
- no in-scope work is deferred.

Report the final package graph, ownership decisions, shipped behavior, exact verification, residual risk, and any user decision still required.
