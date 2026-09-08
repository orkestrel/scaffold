# Layered artifact alignment: owner-authorized extension

The owner authorized dependency-first local artifact alignment on 2026-09-08. The
docs-parity exit criterion now includes aligned Orkestrel dependency closures and
prepared release pins. Publication remains the owner's decision and credential.

Treat latest as the reconciled accepted source tip and its measured artifact, checked
against live registry metadata. An unpublished owner fix must enter its consumers'
installed graph before those consumers close. A rebuilt consumer that still resolves
an older dependency does not satisfy this gate.

## Fixed scope

| Capability | Required end state |
| --- | --- |
| Live package registry | pass repositories, source tips, cached and refreshed main relation, dirty owners, registry versions, declarations, lock resolutions, and installed artifact hashes are recorded |
| Artifact provenance | accepted source commit, chosen release version, tarball hash, packed manifest, and gate evidence identify each artifact; stale artifacts invalidate dependent readings |
| Dependency closure | runtime, development, peer, optional, and bundled declarations are inspected; every intended Orkestrel resolution matches the accepted artifact, including nested consumers |
| Dependency ordering | runtime, peer, and optional edges order release; development-tool edges order verification separately; cycles are reported and receive an explicit bootstrap plan |
| Consumer compatibility | actual built packages pass targeted integration and the final gate chain; peer metadata and optional installation semantics remain intact |
| Release preparation | each layer visit settles and applies its required package version bump before its accepted tarball moves upward; final semantic ranges target the chosen release versions; no local-path dependency leaks into a release artifact; registry lockfile preparation never pretends an unpublished version exists |
| Existing parity work | retained audit findings, canonical path repair, guide-reader repair, pilot pin, main closures, and final artifact revalidation remain required |

Supervisor remains outside this pass under the owner's existing application-adoption
decision. This instruction does not reopen unrelated guide-reader limits, product
capabilities, or foreign-toolchain major upgrades. Primary scaffold owner edits stay
untouched by install, staging, and landing automation.

## Re-baseline

The canonical scaffold path source unit is satisfied at c90089c9 on main. The owner
transformed propagation on 2026-09-08: apply that correction through scaffold's supported
mechanism during each package's dependency-layer tarball visit. Do not run a separate
fleet-wide repair sweep. The accepted scaffold host artifact identifies the bytes used
at each visit; a source-checkout copy is not a packed-artifact proof.

The guide-reader unit is unchanged in substance. Its final artifact participates in the
layered closure, and its remaining source corrections stay inside their retained scope.
The independent MCP package test passed on the merged source, while
the registered Probe and Probe's fleet install still resolve the older MCP artifact.
The packed real-transport proof is now part of the MCP-to-Probe acceptance seam.

Previously closed parity packages retain their accepted source work and main tips.
Their release-readiness state waits for verification against the aligned dependency
closure and final guide artifact. Do not rerun their subjective docs audits absent a
changed audited surface; do rerun affected gates and consumer proofs.

The remaining documentation fixes keep their owned scope. Their execution order will
follow the measured dependency graph and tooling prerequisites. Do not install into a
checkout while its writer is active. Do not publish to solve local package resolution.

## Layer visit and version decision

The owner requires package bumps inside the layer pass. Refresh the package's remote
relation and registry metadata before choosing its release version. Keep an already
prepared unpublished version when it covers the accepted change; do not increment it
again solely because this pass resumed. Apply a required bump before the final build
and pack, and verify the packed manifest carries that version.

During a visit, reconcile the owner main fixes, select the accepted lower-layer artifacts,
apply the canonical scaffold correction through its public mechanism, align dependency
categories, finish the retained package findings, settle the version, and run the gates.
Only an accepted tarball can become the next layer's input. Inspect nested resolutions,
peer metadata and optional installation behavior, not only root package versions.

Keep the runtime/peer/optional graph distinct from the development-tool prerequisites.
Any tooling bootstrap is provisional, recorded by artifact identity, and cannot certify
the final aligned closure. The wave design must resolve guide/scaffold tooling cycles
before visiting the bottom runtime layer. A changed final tool artifact invalidates the
affected provisional readings. Do not create a runtime cycle by treating a dev edge as
a runtime edge.

Apply Ruling 30 to later development pins. Use identified tooling tarballs while
preparing lower layers. Do not hold a lower-layer publication for Guide or scaffold's
later development-pin update. After that update, rebuild and compare material output
with the artifact already published. An unchanged distributable needs no version bump
or repeated publication. A material change follows its own release obligations.

Version bumps during local preparation do not authorize publication. The owner's
latest direction, recorded as Ruling 29, replaces guide-first publication with measured
dependency-layer order. Prepare the fleet with tarballs, then present that order and
use orkestrel-publish when ready. Incremental publication is an owner-selectable
workflow, not an upload authorization. Preserve primary scaffold's owner package and
staged lock edits; prepare overlapping release changes in isolation and integrate only
the authorized non-conflicting fields.

## Next units and routing

Ruling 31 fixes the owner choice: finish whole-fleet tarball preparation before any
publication. Consolidate parity checking under tests/guides.test.ts and test:guides;
resolve the runner's rewrite behavior before retiring it. Prepare the Guide prerequisite
chain from accepted tarballs, then pack the revised tooling and compare rebuilt lower
packages with their preserved accepted artifacts. Include emitted declarations and
documentation in the comparison. Keep ordinary parity tests non-mutating.

| Unit | Role and engine | Prerequisite |
| --- | --- | --- |
| supported layer mechanism map | Grok through Cursor, read-only | returned; limits and sibling-path correction retained |
| live reading boundary ruling | analyst, Sol; planner, Opus; blind | closed in d7n-layer-reading-boundary-verdict.md; rejected collector retired as a prerequisite |
| bounded live evidence capture | builder, Terra; root execution and independent checker | dispatched under d7n-layer-capture-brief.md; capture raw files and npm/Git readings without package verdicts |
| package graph reconciliation | orkestrel, Terra | supplied manifest, lock and registry evidence with source relations; installed/nested attestations remain in each visit |
| artifact-wave design | analyst, Sol; planner, Opus; blind | measured graph and unresolved tooling cycles |
| local artifact preparation | bounded implementer or mechanical builder; root installs and packs | accepted design, clean source baseline, per-layer canonical propagation, applied version decision and dependency closure |
| package acceptance | independent objective and subjective lanes where source changes; checker and verifier | actual diff, artifact receipt, resolved graph, and final gates |

No upload is approved. Derive the publishing sequence from the accepted graph under
Ruling 29 and present it when the tarball-prepared fleet is ready. Do not install a
dependency graph whose overrides conceal incompatible final ranges.
