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

Run `.agents/orchestration.md` § Campaign for the phases, the review, and the gates, and `$orkestrel-harden` for each package unit. Record the live state of every relevant repository per [fleet.md](references/fleet.md) § Verify live state. This skill adds:

1. **Trace the real flow.** Follow public types and one concrete consumer end to end. Identify where ergonomics break and which layer owns the reusable mechanism.
2. **Assign ownership.** Keep core host-independent. Keep server free of browser assumptions and browser free of Node assumptions. Keep product policy in applications.
3. **Judge downstream friction.** Treat consumer gymnastics as evidence, not automatic proof. Decide whether the consumer misused a coherent API or exposed a general upstream defect.
4. **Prove the round trip.** Put integration coverage at the highest package that can exercise the real composed behavior. Retain focused deterministic coverage in lower packages.
5. **Validate local changes safely.** When necessary, use built artifacts in an isolated consumer and prove the resolved graph, per [fleet.md](references/fleet.md) § Validate local packages.

The review is one cross-package architecture and ergonomics pass over the whole graph, not one per unit.

## Accept the result

Completion requires:

- ownership and dependency direction remain coherent;
- the concrete consumer no longer needs unjustified gymnastics;
- every changed public contract, consumer, test, and guide is aligned;
- real round-trip behavior is proven at the correct layer;
- package versions/ranges/guides are reported from live evidence;
- every touched repository's requested local gates are green.

Report the final package graph, ownership decisions, shipped behavior, exact verification, residual risk, and any user decision still required.
