Retention note: fixed model identifiers in the returned body are replaced by engine aliases under the owner's pushed-artifact rule. Other wording remains the blind response. Read the root reconciliation before acting on this proposal.

I held the **subjective planner lane** (Opus). I read the brief, `AGENTS.md`, `.agents/orchestration.md`, the named rules, the `orkestrel-align-packages` skill with its `fleet.md` and `integration.md` references, `guides/scaffold.md` § Fleet catalog and § Dependency floors, `d7n-layer-alignment-plan.md`, Ruling 29, and the named campaign records. I ran no commands, edited nothing, and read no other lane.

---

# Design

## The shape

One mechanism, repeated: the **visit**. A visit is a package's single pass that carries its retained parity work, its propagation, its re-pin, its bump, its gates, and its pack. The wave is visits in layer order, with a settling phase in front of it and a sweep behind it. Nothing else is introduced — no inventory, no orchestration layer, no registry.

Four terms carry the whole design, and each keeps one meaning throughout:

| Term            | Meaning                                                                                                            |
| --------------- | ------------------------------------------------------------------------------------------------------------------ |
| **canonical**   | The committed state: `package.json`, `package-lock.json`, source. Git owns it.                                       |
| **overlay**     | The disposable installed state: tarballs placed with `--no-save --ignore-scripts --package-lock=false`. Git never sees it. |
| **provisional** | A tooling artifact that provisions a dev closure. It can never satisfy a runtime, peer, or optional edge.            |
| **accepted**    | A packed artifact admitted as a dependent's input, recorded with its source commit, chosen version, and digest.      |

## The visit

Run these steps in this order in one checkout, one writer at a time.

1. **Refresh.** `git fetch`, merge `origin/main` into the branch where it moved, and read the package's registry versions fresh. The survey's `origin/main` is cached and does not settle ancestry.
2. **Install the canonical closure.** `npm ci` from the committed lock. This is the visit's only lock-consuming install.
3. **Overlay the accepted lower-layer tarballs.** One `npm install` naming every accepted tarball the package's runtime, peer, and optional edges need, with `--no-save --ignore-scripts --package-lock=false`. Peers arrive in the same command as their dependent so the tree satisfies them locally.
4. **Propagate.** Run the filtered `Materializer` repair from the accepted scaffold host (§ Propagation).
5. **Do the package's source work.** Its retained parity items, its rulings, and the docs rows the reader-delta sweep named for it.
6. **Apply the canonical edits.** Write the chosen version and the final semantic ranges for runtime, development, peer, and optional declarations, from the settled range table. Preserve `peerDependenciesMeta`.
7. **Gate.** `format:check → lint:check → check → build → test` against the overlaid tree and the rewritten manifest.
8. **Attest.** `npm ls @orkestrel/<each edge>` plus a read of each installed `node_modules/@orkestrel/*/package.json` version, including nested copies. The declared final ranges are satisfied by the overlaid tarballs, so a valid reading is the proof that the final ranges are correct.
9. **Pack.** Build, `npm pack`, then read the packed manifest: chosen version present, final ranges present, no `file:` specifier anywhere.
10. **Land.** Commit by pathspec, push the branch and `main`, write the ledger row.

The ordering of steps 6 and 7 is deliberate. The rewrite lands **after** every install and **before** every gate, so npm never resolves an unpublished range and the gates read the manifest that ships.

## Canonical state against overlay state

The rewrite in step 6 makes the committed `package.json` name versions the registry does not serve. The committed `package-lock.json` stays where step 2 left it, at the last published-resolvable closure. That mismatch is the wave's recorded state, not drift.

- No lock entry is written, edited, or invented during the wave. No `resolved` URL and no `integrity` value is fabricated for an unpublished version.
- The one operation that must wait for actual publication is lock re-resolution: `npm install --package-lock-only` (and the `npm ci` that consumes its output) cannot run in a package after step 6 until that package's dependencies exist on the registry. It runs as the first step of the post-publication pass, in layer order, and its green result is that pass's acceptance evidence.
- The consequence is that a visited package's `main` is not `npm ci`-installable until publication. That is an owner decision, named under Tensions.

## Resolving the tooling cycle

Guide, scaffold, probe, and test form a development cycle, and every package's dev closure names that set. The cycle breaks by separating what each tool contributes from when its release artifact exists.

- **test** sits at L0 with no fleet runtime edge. Visit it first. Its accepted artifact then provisions every later gate reading, so no gate is ever taken against a provisional test artifact.
- **scaffold** contributes vendored host bytes. Those bytes are staged data and do not depend on scaffold's runtime pins, so the accepted host tree from `c90089c9` provisions propagation from L0 onward. Scaffold's release artifact is packed at its L3 slot.
- **guide** contributes reader behavior. That behavior is its own compiled source, so the corrected reader is settled in the settling phase and provisions every docs reading from L0 onward. Guide's release artifact is packed at its L3 slot.
- **probe** contributes `prove` receipts. Those bind individual unit claims, not gates, so a later probe artifact invalidates receipts and nothing else.

This is what removes the circular exit criterion: the guide's **reader** is settled before its inputs are built, and the guide's **release artifact** is built after them. The link between the two is a digest equality check, not a fleet re-run.

## What invalidates a provisional reading

Each tool gets one equality check at its release slot. A match retires the provisional row with no re-run; a difference names exactly what re-runs.

| Tool     | Checked at | Equality check                                   | On a difference                                                     |
| -------- | ---------- | ------------------------------------------------ | -------------------------------------------------------------------- |
| test     | L0         | none needed; accepted before any reading          | —                                                                     |
| scaffold | L3         | `dist/host` digest against the provisional host    | re-propagate into every already-visited target, then re-gate those    |
| guide    | L3         | `dist/src/core/index.js` digest against the candidate build | re-run the docs-parity test in every already-visited package |
| probe    | L5         | server entry digest against the retained tarball   | re-take the `prove` receipts that cited it                            |

To keep those checks meaningful, **freeze `HOST_PATHS` and `CANON_PATHS` in the scaffold checkout for the duration of the wave**. A rule edit, an `AGENTS.md` edit, or a skill edit moves `dist/host`, which forces a scaffold repack and re-propagation across every visited target. Land such an edit before the wave opens or after it closes.

## Propagation

Propagation runs through the public library sequence and writes only the bytes the canonical correction moved.

- **Membership rule.** The correction's path set is the difference between the accepted `dist/host` tree and the published `@orkestrel/scaffold` `0.0.63` `dist/host` tree, computed by digest per path. That set is derived, recorded, and fixed before any target is written.
- **Mechanism.** `createBlueprint` → `Compiler.compile` → a caller-built `Plan` filtered to that path set → `new Materializer({ host: <accepted>/dist/host })` → `audit(plan, target)` → `repair(plan, audit, target)`. The audit is taken from the same filtered plan, because `#reconfirm` refuses a derived planned path absent from the preview. The filtered plan's `hash` is recomputed or omitted; a stale hash is never carried through merely because the structural guard admits it.
- **No `declare`, no CLI.** `scaffold repair` and `scaffold overwrite` write manifest range regions on every run. In this wave that would rewrite the prepared final ranges back down to the registry's `dist-tags.latest` and destroy the visit's work. Neither verb runs in a visited target. `scaffold audit` reports exit `1` for every prepared range while the wave is open; that reading is expected and is never repaired away.
- **No hand edits.** A vendored file is never edited inside a target.

**The disposable proof required before the instrument writes a fleet target.** Run the instrument against a scratch copy of the guide checkout taken from `1d5afa3`, in the campaign scratch area, on the host. It passes when:

- every path written is in the membership set;
- `package.json` and `package-lock.json` are SHA-256 identical before and after;
- `tests/policy.test.ts` — a host path the membership rule excludes — is SHA-256 identical before and after;
- a control run using the published `0.0.63` host writes nothing;
- a control run built from a `['tests']`-group plan is shown to plan paths outside the set and is refused by the instrument;
- the guide's configured-policy case is run before and after, and each reading is recorded.

The controls are drawn from outside the membership rule, which is what makes them controls. The scratch copy also answers whether the propagation clears the guide's host-gate blocker; that answer is a reading, not an assumption.

## Guide correction and docs order

1. Propagate the canonical bytes into the guide checkout and read the configured-policy case. Commit the vendored bytes by pathspec.
2. Land the retained R1 through R6 corrections on the candidate, run the focused regression red-before and green-after, run the host gate chain, and commit the candidate as the clean checkpoint. F1 stays refused.
3. Build the guide and record the reader digest. This build is the provisional reader for the whole wave. The bootstrap `2b76b363` artifact is retired at this point and is never cited again.
4. **Reader delta sweep.** Install the corrected build into every package checkout with `--no-save`, run only the docs-parity test, and record the per-package result. The red rows become each package's docs work list, carried inside its own visit. This runs while no writer is live.

This ordering is what stops the corrected reader from reddening packages after they have packed.

## The narrow pilot

The pilot runs the whole mechanism over one edge before the wave opens: **contract (L0) → abort (L1)**.

- **Prerequisites.** The settled version and range table; the accepted scaffold host tarball and its membership set; the proven propagation instrument; the corrected guide build and abort's and contract's rows from the delta sweep.
- **Owned files.** The contract checkout, then the abort checkout. Disjoint, serial.
- **Mechanisms exercised.** Every visit step, plus the dependent consuming the accepted `contract` tarball rather than the registry copy.
- **Success evidence.** Contract's packed manifest carries its chosen version and its final dev ranges with no `file:` specifier; abort's `npm ls @orkestrel/contract` reports the accepted version as valid against the rewritten `^` range; abort's installed `node_modules/@orkestrel/contract/package.json` version equals the packed manifest version; abort's gate chain is green under the overlay; the propagation diff in each checkout contains only membership paths; `package-lock.json` is unchanged in each.
- **Failure evidence.** Any npm registry contact for an unpublished range during the overlay install; any gate stage that reddens on the rewritten range alone; any propagation write outside the membership set; a duplicate `@orkestrel/*` copy in `npm ls`.
- **Readings the pilot exists to take.** Whether the overlay install reaches the registry for the declared range; which gate stage, if any, reads declared `@orkestrel/*` ranges; the exact `npm ls` output shape that constitutes the attestation.
- **Next bounded writer brief.** `tmp/units/d7n-layer-pilot-contract-brief.md`, then `tmp/units/d7n-layer-pilot-abort-brief.md`.

Abort is also where the retained pilot pin is authored, so every later visit can carry the byte-equal region in its own pass. See Tensions.

## Version and range decisions

Settle every package's chosen release version in the settling phase, from fresh registry readings, and record it in the ledger before any visit rewrites a range. Otherwise a tooling version chosen late moves a dev pin in every package already visited.

- Keep the prepared local version where the registry does not serve it. The graph table shows that holds for every in-pass package except scaffold. A prepared version is not incremented again because the pass resumed.
- Scaffold's local version equals its published version, and the canonical correction moved vendored bytes, so scaffold takes a bump chosen from a fresh registry reading at settling time.
- **No local artifact ever reuses a published version number.** The scaffold provisional tarball carries the chosen release version before it is packed, so no tarball on this host shares a version with different published bytes.
- The ledger row, not the filename, is an artifact's identity: package, role, source commit, chosen version, tarball digest, emitted-tree digest, gate evidence path. A repack writes a superseding row naming what changed and why, and every dependent that consumed the superseded row re-runs.

## The MCP-to-Probe seam

At L5, probe overlays the accepted `mcp` tarball together with the accepted `router` and `server` peer tarballs, then runs its real `MCPLegacy` transport proof against a real local server. Acceptance requires the nested attestation — `npm ls` reporting a single copy of each shared `@orkestrel/*` package, and the installed `node_modules/@orkestrel/mcp/package.json` version equal to the accepted packed version — beside the transport result. Tokenless stream refusal is correct behavior and is recorded as a pass, never as a defect.

This proof needs a loopback listener and a real process tree, so it runs on the host. It never runs inside a bench exec.

## Exit criterion

The wave ends when every in-pass package holds an accepted tarball whose packed manifest carries its chosen version and its final runtime, development, peer, and optional ranges with no local-path specifier; whose overlaid closure resolves every Orkestrel edge to an accepted tarball at root and nested; whose gate chain is green under the final tooling set; whose propagation reading matches the final scaffold host digest; and whose ledger row is complete. The measured publishing order is then presented from a regenerated catalog. Publication is excluded from this criterion.

---

# Alternatives

**A single staging root using npm workspaces.** Clone every package under one root with a workspaces manifest, let npm link the graph, and run the gates there. It removes tarball handling and gives one install. It loses the thing the wave exists to prove: a workspace link resolves through a directory and skips the pack, the `files` list, and the exports map, so a distribution defect stays invisible and the alignment plan's "only an accepted tarball can become the next layer's input" is unmet. It also rewrites every package's lockfile relationship and leaves each repository in a state its own `main` does not describe. The tarball overlay wins because the artifact under test is the artifact that ships.

**A local registry or `file:` specifiers.** Stand up a local registry, or declare `file:../contract` during preparation and rewrite before packing. Either makes `npm install` resolve unpublished versions and keeps `npm ci` usable throughout. The brief forecloses the custom registry. `file:` specifiers reintroduce exactly the leak the alignment plan bans, and the rewrite-before-pack step is a silent-repack hazard: a manifest edited between the gate run and the pack means the gates proved a manifest the tarball does not carry. The overlay design wins because the manifest the gates read is the manifest the tarball carries, and no specifier ever needs undoing.

---

# Constraints

The objective lane owns this section.

# Refusals

The objective lane owns this section.

# Measurements

The objective lane owns this section. Readings this design needs that the dispatch did not supply are named under Tensions.

---

# Units

Roles and engines are named for the routing ledger. Where the Sol bench is dark at dispatch, substitute per `.agents/orchestration.md` § Engine assignment and record it.

## Settling

**S1 — wave plan and ledger.** `builder`, Sonnet. Owns `.orkestrel/campaign/docs-parity/d7n-layer-wave-plan.md` and `d7n-layer-artifact-ledger.md`. Depends on this design's acceptance. Accepts when: the ledger schema carries package, role, source commit, chosen version, tarball digest, emitted-tree digest, and gate evidence path; the forbidden-operation list names CLI `repair` and `overwrite` in a target, `npm install --package-lock-only` after a rewrite, `overrides`, `file:` specifiers, and hand-written lock entries; the freeze names `HOST_PATHS` and `CANON_PATHS` in the scaffold checkout.

**S2 — version and range table.** `verifier`, Sonnet, for the readings; `builder`, Sonnet, for the derivation. Owns `d7n-layer-version-table.md`. Depends on S1. Accepts when: every in-pass package has a fresh registry version reading and a fresh branch relation reading, each with its command; the chosen version per package is derived by the stated rule with its evidence; the final range set per manifest covers runtime, development, peer, and optional declarations; `peerDependenciesMeta` entries are carried through unchanged.

**S3 — scaffold provisional pack.** `builder`, Sonnet; the pack runs as an Orchestrator-tracked command. Owns an isolated copy of `tmp/pass/scaffold-path`. Off-limits: primary scaffold `package.json` and `package-lock.json`. Depends on S2. Accepts when: the isolated manifest carries the chosen scaffold version; the pack ran with scripts ignored; the tarball digest and the `dist/host` digest are recorded against source commit `c90089c9`; primary scaffold `package.json` and `package-lock.json` are SHA-256 identical before and after.

**S4 — host membership set.** `verifier`, Sonnet. Owns `d7n-layer-host-delta.md`. Depends on S3. Accepts when: the published `0.0.63` host tree and the accepted host tree are compared per path with digests on each side; paths present on one side alone are named as such; the resulting set is stated as the propagation instrument's membership rule.

**S5 — propagation instrument.** `sol`, Sol (objective, mechanical precision). Owns the instrument file under the campaign instruments folder. Depends on S4. The instrument's host run and its controls are Orchestrator-tracked commands retained as this unit's acceptance evidence. Accepts when: the instrument uses `createBlueprint`, `Compiler.compile`, a filtered `Plan`, `new Materializer({ host })`, `audit`, and `repair`, and calls no `declare`, `catalog`, or `remove`; the filtered plan's hash is recomputed or omitted; the scratch-copy run and every control listed under § Propagation report as stated.

**S6 — guide propagation and blocker reading.** `verifier`, Sonnet, records; the write is the Orchestrator's tracked run of the accepted instrument. Owns the guide checkout's vendored membership paths. Depends on S5. Accepts when: the written path set equals the membership set; the guide `package.json` and `package-lock.json` are unchanged; the configured-policy case reading before and after is recorded; the vendored bytes are committed by pathspec separately from the retained candidate.

**S7 — guide reader correction.** `implementer`, Opus (prose, fixture placement, naming). Owns the guide source candidate. Depends on S6. Accepts when: R1 through R6 each close with the named change and F1 stays refused; the focused regression is recorded red before and green after; the guide host gate chain is green; the reader digest is recorded in the ledger; the candidate is committed by pathspec as the clean checkpoint.

**S8 — reader delta sweep.** `verifier`, Sonnet. Owns nothing; installs `--no-save` and runs one test per checkout. Depends on S7 and on no writer being live. Accepts when: every package checkout has a recorded exit code and failing-row list; each checkout's `git status` shows no source change; the red set is published as the per-package docs work list.

## Pilot

**P1 — contract visit (L0).** `implementer`, Opus (its retained work is guide-table prose under Rulings 26 and 28). Owns the contract checkout. Depends on S2, S5, S8. Brief: `tmp/units/d7n-layer-pilot-contract-brief.md`. Accepts on the visit's step evidence plus the pilot success evidence named earlier.

**P2 — abort visit (L1) and pilot pin authoring.** `implementer`, Opus. Owns the abort checkout. Depends on P1's accepted tarball. Accepts when abort's overlay resolves contract to the accepted artifact at root and nested, the gate chain is green, the pin is authored red-first through scratch controls, and abort's packed manifest carries its chosen version and final ranges.

**P3 — pilot audit.** `analyst`, Sol, and `reviewer`, Opus, blind and clean-contexted; `checker`, Grok, over the mechanical criteria; `verifier`, Sonnet, over the gate chain. Depends on P2. Accepts on per-claim verdicts with evidence.

**P4 — pilot re-baseline.** Orchestrator, Opus. Rules on the pilot's readings, fixes the visit template, and rules on the pin-folding question before the wave opens.

## Wave

**W-layer units.** One visit unit per package, in `L0 → L6` order, packages within a layer parallel across disjoint checkouts and serial within one. Route each by its remaining work: prose, naming, and guide tables to `implementer`, Opus; manifest, lock, and resolution mechanics with no prose to `sol`, Sol; a package whose only work is the template with no retained findings to `builder`, Sonnet. Each visit is followed by a `verifier`, Sonnet, over its gate chain and a `checker`, Grok, over its mechanical criteria. Insertions: `test` first in L0; `scaffold` then `guide` at the head of L3, each with its digest equality check; `probe` at L5 with the seam proof.

**W-seam — MCP to Probe.** `sol`, Sol, authors; the transport proof runs on the host as an Orchestrator-tracked command. Depends on the accepted `mcp`, `router`, and `server` artifacts. Accepts on the transport result, the nested attestation, and the recorded tokenless refusal.

## Sweep

**X1 — tooling replacement check.** `verifier`, Sonnet. Accepts when each tool's equality check is recorded and each difference names its re-run set.

**X2 — targeted revalidation.** `verifier`, Sonnet, for readings; a writer only where a re-run reddens. Accepts when every named re-run is green or has an accepted fix landed and repacked with a superseding ledger row.

**X3 — pin tail.** `builder`, Sonnet, per package, only for packages visited before the pin existed; `verifier`, Sonnet, each. Accepts when the dropped-in region is byte-equal to the pilot's, the test gate is green, and a rebuild shows the packed `dist` materially unmoved.

**X4 — release presentation.** `builder`, Sonnet, writes; Orchestrator presents. Accepts when the publishing order is regenerated from the catalog rather than copied, every ledger row is complete, and the owner decisions are stated as questions rather than as assumptions.

---

# Tensions

Choices this lane made on judgment. Each is for the other lane to challenge, or for the Orchestrator to rule.

- **Pilot-pin folding.** The brief orders the pin after source packages close on `main`. I recommend authoring it in the pilot at abort and folding the byte-equal region into every later visit, which removes a fleet-wide second pass. The pin edits `tests/` alone and therefore does not move the packed artifact, so either ordering is safe; folding is cheaper and touches each checkout once. The fallback is unit X3 over the whole fleet. The owner or the Orchestrator rules.
- **Range rewrite before the gates.** I placed the canonical edits ahead of the gate chain so the gates read the manifest that ships. The cost is that `npm ci` becomes unusable in that checkout for the remainder of the wave. The alternative — gate first, rewrite last — leaves the packed manifest ungated.
- **The lock mismatch window on `main`.** I recommend accepting a window where a visited package's `main` carries ranges its lock cannot satisfy, recorded in the ledger, closed by the post-publication re-resolution pass. The alternative holds the rewrite on the campaign branch and lands it at publication, which doubles the landing work per package. This is a real owner decision.
- **Guide propagation before the guide checkpoint.** I put the vendored propagation ahead of committing the retained candidate, on disjoint paths in a separate commit, because the propagation is the likely clearance for the host-gate blocker. The retained verdict admits the opposite reading.
- **Freezing `HOST_PATHS` and `CANON_PATHS`.** This stops rule and instruction edits in the scaffold checkout for the wave's duration. It is the price of a digest-equality sweep instead of a re-propagation sweep.
- **Routing a visit by its remaining work class.** A package with retained prose work goes to Opus; a package with manifest mechanics alone goes to Sol. A reviewer may argue the visit is uniformly mechanical and belongs to one engine.

Readings the design needs that the dispatch did not supply:

- Whether `npm install <tarball> --no-save --ignore-scripts --package-lock=false` contacts the registry for the other declared ranges in the manifest. The pilot's contract-into-abort install answers it; the head-start instrument's proven guide-tarball behavior is suggestive and covers a dev edge only.
- Which gate stage, if any, reads declared `@orkestrel/*` ranges and reddens on a range ahead of `dist-tags.latest`. The pilot's contract chain after the rewrite answers it.
- Whether a package's emitted `dist` is unchanged by re-pinning its `@orkestrel/*` ranges. Smallest probe: build guide at the candidate, record the `dist/src/core/index.js` digest, re-pin, rebuild, compare.
- Whether the filtered propagation clears the guide's configured-policy failure. Smallest probe: the scratch-copy run in S5, with that single test case run before and after.
- The current existence and contents of `tmp/pass/scaffold-path/dist` on this host. S3 depends on it and no reading in the dispatch confirms it survived.
- Whether any in-pass package declares a `file:` specifier or an `overrides` block today. The retained manifests report none; a fresh read at settling time is cheap.

---

# Risks

- **The corrected reader reddens many packages at once.** Design fit depends on the delta sweep landing before the wave, so each package's docs work is carried in its own visit. Evidence to settle: S8's per-package red set. A large red set is a re-baseline input, not a reason to defer the sweep.
- **The overlay install reaches the registry and fails on an unpublished range.** This breaks the mechanism, not the plan. Evidence to settle: the pilot's install reading. The named fallback is to overlay before any rewrite in the checkout, which the visit order already does; if that still fails, the design needs the Orchestrator's ruling before the wave opens.
- **A scaffold `dist/host` change mid-wave.** Any rule, skill, or instruction edit in the scaffold checkout forces a repack and re-propagation across visited targets. Evidence to settle: the freeze in S1 and the digest check at scaffold's L3 slot.
- **A repack after a dependent has consumed the tarball.** The ledger's superseding-row rule catches it only if writers record repacks. Evidence to settle: the checker over each visit's ledger row, comparing the recorded digest against the tarball on disk.
- **Duplicate `@orkestrel/*` copies from disagreeing ranges.** The failure the layer order exists to prevent, and it shows as distinct types at the compiler. Evidence to settle: the `npm ls` attestation in step 8, read for nested copies rather than root versions alone.
- **Session-start reinstall wiping an overlay.** The scaffold checkout's dependency hook installs the lockfile closure on a resume whose lockfile digest differs from the marker. In a checkout carrying an overlay this reinstalls over accepted tarballs mid-visit. Evidence to settle: read the marker's state against the lockfile digest before each scaffold-checkout visit, and hold the marker current in the same turn as any lockfile change.
- **Bench placement of proofs.** The propagation run, the seam's transport proof, and every gate chain need a process tree, a loopback listener, or a real child's stdio. A bench sandbox denies each, and the seam's failure mode is a false green rather than a denial. Evidence to settle: run each of those on the host and keep the bench to authoring.
- **Parallel visits inside a layer.** Disjoint checkouts satisfy the writing rule, but the tooling overlay and the propagation instrument write into each of them. Evidence to settle: confirm each concurrent visit writes only its own checkout, and keep the reader delta sweep and any fleet-wide instrument outside every window where a writer is live.
