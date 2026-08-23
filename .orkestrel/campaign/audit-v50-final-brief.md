# Pre-publication audit — `@orkestrel/scaffold` 0.0.50

## Subject

The whole chain, not the last commit: 28 commits on `claude/new-session-hxonen` above
`origin/main`, tip `385edac`, 62 files changed. The chain, one line each:

- The distribution-proof design round and its reconciliation, then a second round for the setup
  proof and the browser stage, reconciled against written rules and measurement.
- W1 guarded the release-mode config shape in the vendored root-configuration proof.
- W2 deleted `Blueprint.distribution` and generated `tests/distribution.test.ts` at presence
  ownership with core, server, and browser branches.
- An adversarial audit of W2 returned PASS on twelve claims with four findings outside them.
- W3 closed those four findings.
- W4 added the manifest script-region compare-and-swap and grouped `declare`'s regions.
- W5 added the `setup` audit question.
- W6 rewrote the guide for the model the implementation now follows.
- A propagation phase drove the packed, unpublished artifact against ten real published packages.

## What this round decides

**Whether 0.0.50 is published to the npm registry and propagated to every package in the fleet.**
A defect that survives this round is one a consumer finds after publication, when the version number
is already spent and 48 packages have taken the vendored bytes. That is the cost of a confirming
review here.

A finding is worth more to this round than a clean pass.

## Already established — do not re-run

Each of these the Orchestrator verified directly, by running the command and reading the output, not
by taking a writer's report:

- All gates green at each checkpoint under an independent `verifier`, most recently the full chain.
- `tests/distribution.test.ts` in this repository is byte-untouched across the whole chain, and
  still passes its own gate against the live registry.
- `mcp` and `process` keep their bespoke proofs byte-untouched after propagation.
- Every one of ten real targets was baselined green before propagation, took the write, and kept
  all five of its own gates green.
- Every generated proof passes under `--mode release`; on `indexeddb` the browser case runs and
  passes while its Node cases skip.
- With a nonexistent browser executable, `indexeddb`'s proof fails under release and skips outside
  it.
- `supervisor`'s `overwrite` refusal reproduces identically under the **published 0.0.49**, so it
  is pre-existing.
- `process`'s bespoke proof passes under `--mode release`, which is how its own `prepublishOnly`
  invokes it.

## Review evidence

- The full source, test, guide, and README diff: `/tmp/claude-0/-home-user-scaffold/44b44986-60fe-5808-9e54-b88ca82b9390/scratchpad/audit-v50-diff.txt`.
- The whole-chain diffstat: `/tmp/claude-0/-home-user-scaffold/44b44986-60fe-5808-9e54-b88ca82b9390/scratchpad/audit-v50-diffstat.txt`.
- Working-tree status: `/tmp/claude-0/-home-user-scaffold/44b44986-60fe-5808-9e54-b88ca82b9390/scratchpad/audit-v50-status.txt` (empty; the tree is clean).
- The campaign record, including every reconciliation, verdict, and propagation reading, under
  `.orkestrel/campaign/`.
- Ten propagated target checkouts under `/home/user/orkestrel/` and `/home/user/supervisor`, each
  carrying the generated proof and its local checkpoint commits.
- The packed release candidate and the installed runner under `/tmp/claude-0/-home-user-scaffold/44b44986-60fe-5808-9e54-b88ca82b9390/scratchpad/propagate/`.

## Numbered falsifiable claims

Attack each. A claim you cannot break is CONFIRMED with the evidence that convinced you.

1. The generated proof classifies a browser entry by its resolved export **target**, and no rule
   anywhere in the generated text keys the browser branch on a subpath's name. A single such rule
   falsifies this.
2. Under `--mode release`, missing evidence fails: an unreachable registry and an unlaunchable
   browser each fail rather than skip. There is no third path through the generated proof where
   evidence is missing and the run still reports success.
3. Presence ownership never overwrites a workspace's replaced proof, and `audit` reports an absent
   one as drift rather than as aligned.
4. `replaceManifestScripts` never mutates a manifest whose named scripts it does not recognize, and
   when it does write, it moves no byte outside the replaced ranges.
5. The `setup` question is silent on a freshly materialized workspace and on every workspace that
   already carries a setup proof, and no writing verb is refused because of it.
6. `Blueprint.distribution` is gone and no code path reads it or a substitute; a publishing
   workspace plans exactly one proof artifact and a non-publishing one plans none.
7. The packed 0.0.50 tarball carries everything a target needs. Install it into a fresh consumer
   and drive a real target with it. Build before you pack: `npm pack` runs no build.
8. The generated proof emits no package name, no export name, and no number that goes stale as a
   package's published surface moves.
9. `guides/scaffold.md` states nothing false about what scaffold now does, and the generate-or-refuse
   rule it states matches the implementation for every proof it names.
10. **Attacking this round's own ruling.** An earlier audit lane returned FAIL on the claim that the
    proof emits no count, naming `toHaveLength(1)` over pack archives and a non-emptiness floor. The
    Orchestrator overturned that verdict, reasoning that neither names a number that moves as the
    published surface moves. Break that ruling if it is wrong.
11. **Attacking this round's own ruling.** The design round ruled that scaffold must **not** generate
    a setup proof, on three written rules and a measurement that every candidate assertion reds in
    scaffold's own checkout. Find a derivable assertion the round missed that would be green
    fleet-wide **and** able to redden for a real defect. If none exists, the ruling holds.
12. **Attacking this round's own ruling.** The Orchestrator ruled 0.0.50 a vendored-byte release,
    on the ground that a vendored byte moves and the fleet visit is required anyway. Establish
    whether any vendored byte actually moves between `origin/main` and the tip. If none does, the
    release-shape ruling was wrong.
13. Nothing in the change reaches outside its declared scope: no npm dependency was added, `src/`
    imports `typescript` nowhere outside a template string, and no host path was added or removed
    that the inventory does not record.

## Unknowns, named as unknowns

- Whether any of the fleet's remaining packages carries a `prepublishOnly` shape the manifest writer
  refuses. Only eleven checkouts exist here. Report what you can establish about the refusal path's
  reachability rather than guessing the fleet's contents.
- Whether the generated proof behaves correctly on a workspace with a `styles` face. The census
  reports no package has one, so the branch is unexercised. Say whether that is a gap or correctly
  no branch at all.

## Running your attacks

You may execute. Write any probe to `tmp/probe/<name>.test.ts` in this repository and run it with
`npm run test:probe`, which is the `probe` Vitest project and collects exactly that glob. Delete the
probe before you return. Use the filename this dispatch assigns you and no other; a probe left
behind fails a run nobody else caused.

Do not run a tree-wide gate. Another lane is live and its in-flight probes would appear as failures
nobody caused. Scope every command to paths you own.

Do not modify any file under `src/`, `tests/`, `guides/`, or `.orkestrel/`.

## Verdict shape

Return exactly this and nothing else.

1. **Numbered verdicts**, one per claim, in this brief's order, each exactly one of `CONFIRMED`,
   `BROKEN`, `UNRESOLVED`, or `NOT-EVIDENCED`, with the evidence the falsification law requires —
   for `BROKEN`, the exact failing input, state, or interleaving plus the smallest correct fix; for
   `UNRESOLVED`, what would settle it.
2. **Findings fitting no claim**, if any, each substantiated to the same standard as `BROKEN`.
3. **One terminal line**, and only one:

```text
VERDICT: PASS — <m> of <m> confirmed, no findings outside the claims
VERDICT: FAIL — <n> broken, <u> unresolved, <e> not-evidenced, <x> findings outside the claims
```

`PASS` requires every claim `CONFIRMED`, nothing `UNRESOLVED`, nothing `NOT-EVIDENCED`, and no
substantiated finding outside the claims. One substantiated finding forces `FAIL` however the
numbered claims landed.

No process diary. No summary of what you read.
