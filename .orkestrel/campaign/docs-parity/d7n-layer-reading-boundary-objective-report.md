## Lane held

Objective lane on native Sol. The Ultracode Workflow route was unavailable and was not launched. I made no edits or live readings.

## Boundary ruling

Retire the rejected collector as an acceptance prerequisite. Replace it with a thin command carrier that preserves raw evidence, while package-health and graph decisions remain downstream reconciliation work.

The carrier must retain:

- The requested package, executable, exact arguments, working directory, start and finish timestamps, and explicit registry URL.
- Verbatim stdout and stderr, plus `code`, `signal`, `failed`, `expired`, `aborted`, and `truncated`. These are the installed process contract’s terms ([index.d.ts](C:/Users/mikes/WebstormProjects/scaffold/node_modules/@orkestrel/process/dist/src/core/index.d.ts:140)).
- Raw `package.json` and lockfile bytes with SHA-256 digests.
- A capture result, parse result, and package-health result as separate facts. A nonzero `npm ls` result can remain available and parseable while reporting an unhealthy closure.
- Explicit missing, malformed, truncated, expired, or failed readings. No package-level `complete` value may erase retained raw output.

The rejected candidate conflates command health with evidence validity when `npm ls` exits nonzero ([layer-inventory.mjs](C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/layer-inventory.mjs:512)). Its registry path can also lose an observed HTTP status during JSON decoding failure ([layer-inventory.mjs](C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/layer-inventory.mjs:580)). Repairing those projections would continue the exhausted seam that the quality rule requires this ruling to replace ([quality.md](C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/quality.md:87)).

## Capture points

| Capture point | Required evidence | Boundary |
| --- | --- | --- |
| Initial graph and version planning | Raw local manifest; runtime, development, peer, peer metadata, optional, bundled, override, engine, OS, and CPU declarations; refreshed branch, HEAD, `origin/main`, ancestry, status, and dirty owner; raw registry identity, tags, version history, release manifest, and distribution identity | Root refreshes the remote relation before capture. Invoke the absolute npm CLI with `--registry=https://registry.npmjs.org/`. Use local manifest categories for planning because scaffold catalog rows omit optional and development edges ([supported map](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/docs-parity/d7n-layer-supported-map-report.md:42)). |
| Graph reconciliation | Release order from runtime, peer, and optional edges; verification order from development-tool edges; preserved bundled and override observations; explicit cycles and unreadable rows | Reconcile from the raw manifest records. Do not infer order from the embedded catalog. A missing registry row, malformed manifest, or cycle blocks the affected order instead of disappearing. |
| Package visit | Final source manifest and lockfile; raw `npm ls --all --json --long`; nested installed paths; on-disk package identity, version, dependency metadata, and selected built-entry hashes; accepted tarball SHA-256; packed manifest; gates and canonical-propagation receipt | Capture installed and nested state here because local staging and accepted lower-layer artifacts determine the closure. Earlier installed readings become stale when an accepted artifact changes ([alignment plan](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/docs-parity/d7n-layer-alignment-plan.md:60)). |
| Read-only mutation check | Manifest digest, lockfile digest, and status immediately before and after the evidence-only subphase | Compare around capture commands, not around intentional writer changes. A mismatch invalidates that capture and never triggers restoration. |

Raw `npm ls` must undergo executable validation before it becomes the installed-path source. If the installed npm version does not expose every nested path needed for disk attestation, use a bounded lockfile-entry reader with `node:path`; do not infer a nested closure from root resolution.

## Permitted constraints

- Use live manifests, lockfiles, installed packages, branches, and registry evidence. Catalog memory is not authority ([fleet.md](C:/Users/mikes/WebstormProjects/scaffold/.agents/skills/orkestrel-align-packages/references/fleet.md:15)).
- Re-establish live state before a package visit because another session can move it ([fleet.md](C:/Users/mikes/WebstormProjects/scaffold/.agents/skills/orkestrel-align-packages/references/fleet.md:30)).
- Consume accepted built artifacts only in an isolated or explicitly authorized consumer, and prove every intended resolution ([fleet.md](C:/Users/mikes/WebstormProjects/scaffold/.agents/skills/orkestrel-align-packages/references/fleet.md:34)).
- Carry `@orkestrel/process` result fields unchanged. Do not emit `termination.observed`: native exit does not prove Windows tree cleanup. `stopChild` returns native-exit observation ([index.d.ts](C:/Users/mikes/WebstormProjects/scaffold/node_modules/@orkestrel/process/dist/src/server/index.d.ts:885)), while `killTree` separately reports host-utility success ([index.d.ts](C:/Users/mikes/WebstormProjects/scaffold/node_modules/@orkestrel/process/dist/src/server/index.d.ts:361)).
- Treat an expired command as failed evidence. Retain partial output, stop that package’s capture, and require root to restore quiescence before retrying. Do not make whole-tree confirmation a release claim.

## Prohibited directions

- Do not repair or accept the retained collector.
- Do not add a dependency ([AGENTS.md](C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md:43)).
- Do not add a source-language parser ([AGENTS.md](C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md:34)).
- Do not introduce a compatibility shim or rename-only command wrapper ([AGENTS.md](C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md:70)).
- Do not create process supervision to expose a tree outcome the installed public contract does not provide.
- Do not let the carrier install, stage, repair, fetch source branches, or alter checkout files.
- Do not place a tarball path in a release manifest. Local tarballs belong only to isolated staging. Final manifests retain registry-resolvable semantic ranges.
- Do not prepare a registry lock entry for an unpublished version as if the registry served it.
- Do not touch primary scaffold’s owner-modified manifest or staged lockfile. Guide and Ollama candidates remain parked.

## Supplied measurements and limits

The Contract reading proves the standard path only for `@orkestrel/contract`: registry version `0.0.16`, local candidate `0.0.17`, HEAD and refreshed `origin/main` at `fd3fce2d2665027021bfef05bb7de1e546fa52ae`, ancestry exit `0`, and empty status ([contract reading](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/docs-parity/d7n-layer-contract-reading.md:3)). The npm command exited `0` and retained version history, development dependencies, engines, and distribution identity ([registry log](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/docs-parity/d7n-layer-contract-registry-reading.log.txt:1)).

The configured registry reading exited `0` with `https://registry.npmjs.org/`, but that does not constrain later npm calls. Every captured registry command must carry the explicit `--registry=https://registry.npmjs.org/` argument ([boundary brief](C:/Users/mikes/WebstormProjects/scaffold/tmp/units/d7n-layer-reading-boundary-brief.md:61)).

No fleet graph, installed closure, failed `taskkill`, surviving descendant, filtered scaffold repair, or fleet version decision has been measured.

## Bounded follow-up units

- **Raw carrier — builder, Terra.** Author only command execution, raw file capture, digests, and separate capture/parse/health facts. Reuse the fixed population and field requirements. Add no semantic graph projection.
- **Carrier execution — root.** Refresh each repository relation, run the saved carrier, and retain command records. Root owns network activity and any quiescence decision after expiry.
- **Evidence check — checker, Grok through Cursor, with the native ladder only when that bench is dark.** Verify population membership, required fields, explicit registry arguments, raw-output retention, and unchanged-byte receipts.
- **Graph reconciliation — orkestrel, Terra.** Produce the release graph, tooling graph, explicit unresolved rows, cycle findings, and blast radius from accepted evidence.
- **Visit validation — verifier, Terra.** Validate nested installed-path discovery, tarball identity, packed manifests, semantic release ranges, and resolution to accepted artifacts. Run the filtered scaffold repair claim only against a disposable target before any package writer relies on it.

## Root tensions and risks

- Root must decide any measured guide-publication conflict before freezing release order. No supplied reading establishes that conflict.
- The `0.0.17` Contract candidate can remain only if its package visit finds that it covers the accepted change and a fresh registry reading still shows it unpublished. This lane does not choose that version.
- A changed final manifest can change the initial graph. Reconcile the affected edges before a dependent visit proceeds.
- A timeout leaves Windows descendant cleanup unknown. Report that limit; do not translate native exit into tree-clean evidence.
- Raw evidence increases reconciliation work, but it closes the collector-hardening seam and keeps every release decision traceable to the command or file that supplied it.
