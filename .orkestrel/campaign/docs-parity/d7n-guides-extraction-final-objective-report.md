Objective lane held.

### Claim 1 — CONFIRMED

Attack failed: removing a method group, omitting an implementing-class member, and moving a title to another guide all produce findings. Guide keeps exhaustive example checks, while scaffold selects sections, declarations, configured fences, and its own title without selecting exhaustive examples. Evidence: [Parity.ts](</C:/Users/mikes/WebstormProjects/guide/src/core/Parity.ts:172>), [Parity.test.ts](</C:/Users/mikes/WebstormProjects/guide/tests/src/core/Parity.test.ts:102>), [guides.test.ts](</C:/Users/mikes/WebstormProjects/scaffold/tests/guides.test.ts:221>).

### Claim 2 — CONFIRMED

Attack failed: presence and equality remain independent; category forms part of rewrite identity; destination authority, absent language, source-site selection, refusal, accumulation, fresh-byte behavior, and default no-write behavior have direct controls. Evidence: [Parity.ts](</C:/Users/mikes/WebstormProjects/guide/src/core/Parity.ts:119>), [Parity.test.ts](</C:/Users/mikes/WebstormProjects/guide/tests/src/core/Parity.test.ts:102>), [compilers.test.ts](</C:/Users/mikes/WebstormProjects/scaffold/tests/src/core/compilers.test.ts:2411>).

### Claim 3 — BROKEN

Finding F1:

- Admitted state: an example differs and the caller invokes `rewrite('guide')`.
- Observed contradiction: the public type defines the argument as the destination, and the implementation copies source example content into the guide. Direct tests require that behavior. The public guide instead says the guide fence always wins and that an example travels from guide to source.
- Evidence: [types.ts](</C:/Users/mikes/WebstormProjects/guide/src/core/types.ts:230>), [Parity.ts](</C:/Users/mikes/WebstormProjects/guide/src/core/Parity.ts:472>), [Parity.test.ts](</C:/Users/mikes/WebstormProjects/guide/tests/src/core/Parity.test.ts:249>), [guide.md](</C:/Users/mikes/WebstormProjects/guide/guides/guide.md:695>).
- Smallest owning repair: revise the direction paragraph in `guides/guide.md` so summaries and examples follow the named destination. No API or implementation change is needed.

The remaining extraction boundary held: the public barrel exports the shared composition, Markdown-backed primitives are reused, and core contains no consumer or host imports.

### Claim 4 — CONFIRMED

Attack failed: the direct test entry owns validation, execution, reporting, rewrite writes, exit precedence, cleanup, and the strict worker branch. Scaffold’s authored demonstrations remain in that entry. The manifest invokes it directly. Evidence: [guides.test.ts](</C:/Users/mikes/WebstormProjects/scaffold/tests/guides.test.ts:119>), [guides.test.ts](</C:/Users/mikes/WebstormProjects/scaffold/tests/guides.test.ts:464>), [package.json](</C:/Users/mikes/WebstormProjects/scaffold/package.json:80>).

### Claim 5 — CONFIRMED

Attack failed: `scripts` is an owned root; audit expands owned roots into actual target members; removal retains tracked, clean, preview-bound, transactional guards. The permanent control removes unplanned scripts and preserves `service.sh`. Evidence: [constants.ts](</C:/Users/mikes/WebstormProjects/scaffold/src/core/constants.ts:133>), [Materializer.ts](</C:/Users/mikes/WebstormProjects/scaffold/src/server/Materializer.ts:430>), [Materializer.ts](</C:/Users/mikes/WebstormProjects/scaffold/src/server/Materializer.ts:631>), [Materializer.test.ts](</C:/Users/mikes/WebstormProjects/scaffold/tests/src/server/Materializer.test.ts:1485>).

### Claim 6 — CONFIRMED

Attack failed: the frozen product diff retains version `0.0.64`, the approved manifest and lock state, directory-owned script inventory, and no vendored package-owned guides test. Evidence: [package.json](</C:/Users/mikes/WebstormProjects/scaffold/package.json:3>), [host.json](</C:/Users/mikes/WebstormProjects/scaffold/host.json:680>), [host.json](</C:/Users/mikes/WebstormProjects/scaffold/host.json:730>).

### Claim 7 — CONFIRMED

Attack failed: the retained archive identity, downstream installation, canonical-build byte match, mirror refresh, metadata preservation, final ordered gates, and frozen-diff hashes are recorded. The reports expressly leave commit, packing, native Guide entry adoption, fleet propagation, and publication open. Evidence: [population landing](</C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/docs-parity/d7n-parity-population-landing.md:44>), [final root gates](</C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/docs-parity/d7n-guides-extraction-final-root-gates.md:3>).

### Outside findings

None substantiated.

### Attacked and held

Caller-selected populations, rewrite mechanics, direct command ownership, scripts-directory cleanup safeguards, scaffold inventory, artifact identity, gate ordering, source preservation, and open successor boundaries held under the supplied source and execution evidence.

VERDICT: FAIL 3; outside the claims: none
