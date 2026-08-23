# Successor round — attack the fix round's own rulings

This amends `.orkestrel/campaign/audit-v50-final-brief.md` and its first successor. Both stand; read
them, then read this. Both lanes receive this identical text.

## The chain, with this round added

- Design rounds, reconciled; implementation W1 through W7; propagation against ten real packages.
- **Round 1** (three lanes, all FAIL): broke the untyped-subpath drop, the core-only proof blind to a
  later browser face, the setup question firing on a seeded workspace, the over-stated assertion
  comment, and the guide's false sentences. Two findings outside the claims: the `appBrowser()` row
  reddening every `app/browser` workspace, and an empty `scripts` region refused against its own
  contract.
- **Fix round** (FIX-A through FIX-E) closed every one. `prepublishOnly` is green at `07f9a96`.

## What this round decides

The same thing round 1 decided, on a repaired subject: **whether 0.0.50 publishes.** A fix round is
where the next defect usually lives, and the engine that made a ruling is least able to see its
consequences. That is why most of the claims below attack rulings rather than code.

## Already established — do not re-run

The Orchestrator verified each directly, by running it:

- Every gate green at `07f9a96` under an independent verifier, `prepublishOnly` included.
- The `appBrowser` fix: two workspaces materialized from the rebuilt CLI pass their own `npm test`,
  where the reported reproduction was one failure in forty-four. Every `projects.push` site
  enumerated; only that one was a call.
- The partition and guard: firing controls executed in real workspaces, including reproducing the
  audit's green reading with the pre-fix proof and going red with the fixed one.
- The setup predicate: a `global: true` workspace materialized through scaffold's own compiler
  reports no question; per-module coverage measured across four readings.
- The empty-region insertion: twelve JSON shapes measured with negative controls; firing control
  reddened exactly the three tests naming the defect.
- The guide's banned phrases are gone; hydration was probed before the prose was written.

## Review evidence

- `git diff origin/main..HEAD -- src/ tests/ guides/ README.md`, and `git log --oneline origin/main..HEAD`.
- The campaign record under `.orkestrel/campaign/`, including every unit report and round verdict.
- Eleven propagated target checkouts under `/home/user/orkestrel/` and `/home/user/supervisor`.

## Claims

Claims 1 through 17 of the original brief still bind — the fix round changed the code under several
of them, so **re-attack any whose subject moved**, and say which you re-attacked. These are the new
ones, and they attack this round's rulings.

18. **The seed-relative predicate.** `#setupQuestion` holds a module's bytes to the seed the
    blueprint plans at that same path. Break it: find a module a maintainer genuinely wrote into that
    the predicate calls seeded, or a seeded module it calls written. Consider a maintainer who
    reverts a module to exactly its seed, a blueprint whose planned seed differs from the one the
    workspace was created with, and a module whose bytes differ only by trailing whitespace.
19. **The partition's exclusion rule.** A target is a runtime module when it ends `.js`, `.mjs`, or
    `.cjs`; everything else is excluded and named. Break it: find a published subpath that is a
    runtime surface and escapes the module test, or a non-runtime target that reddens. Consider
    extensionless targets, a `.wasm` target, a subpath pattern such as `./*`, and a conditional
    exports object nesting a non-string value.
20. **The guard-over-unconditional ruling.** The browser branch stays conditional because a core-only
    workspace declares neither the launcher nor the bundler it imports. Break it: show the guard
    unreachable in some shape it should cover, or show the stated cost of unconditional emission
    wrong.
21. **The Orchestrator's overturn of a reported failure.** A unit reported `test:distribution` red on
    the peer-resolution case and confirmed it on the clean baseline. The Orchestrator re-ran it alone
    after the unit exited, saw it pass in 1837ms, and ruled it a load artifact rather than a defect.
    Break that ruling: show a deterministic input under which it fails, or show the assertion depends
    on something that can legitimately vary.
22. **The `appBrowser` signature change.** It now takes `(options?: UserConfig)` and merges over
    `applicationBrowser(false)`. Break it: show the merge changes behaviour for any existing caller,
    including the generated showcase config path, or show a shape where the merged result differs
    from what the sealed factory returned.
23. **The empty-region insertion composes.** Inserting one script into an empty region and then
    appending another through the untouched path lands the same bytes as inserting both together.
    Break it.
24. **The behavioural change no claim named.** `#projectQuestion` now judges the manifest **as a
    write would leave it**, projecting the disk text through `replaceManifestScripts` before ruling on
    Vitest-project reachability. A coverage sweep found this uncovered by every claim in round 1.
    Attack it: find a target where that projection makes the advisory wrong in either direction —
    silent when it should fire, or firing when the write would have satisfied it.
25. **The guide's narrowed sentence is now true.** It states that a setup proof's *subject* is what no
    generated file can reach, while conceding a structural property can be derivable. Break it: find a
    sentence in the guide still asserting more than was measured.

## Unknowns

Whether any shape in the fleet reaches claim 19's exclusion rule. Ten checkouts publish only `.js`
targets and `./package.json`. Report what you can establish, and do not extrapolate to the fleet.

## Running your attacks

Write any probe to the path this dispatch assigns you under `tmp/probe/`, run it with
`npm run test:probe`, and delete it before returning. Another lane owns a different path. Do not run
a tree-wide gate — an in-flight probe reads as a failure nobody caused. Modify no file under `src/`,
`tests/`, `guides/`, or `.orkestrel/`.

## The threshold

A finding is worth more than a clean pass. The alternative is a consumer meeting it after
publication, when the version is spent and 48 packages have taken the vendored bytes.

If the claims turn out to have been descriptive — falsifiable only by evidence this round did not
have — say so plainly. An all-confirmed round puts the brief on trial, not the subject.

## Verdict shape

Exactly as the original brief fixes: numbered verdicts with `CONFIRMED`, `BROKEN`, `UNRESOLVED`, or
`NOT-EVIDENCED` and the evidence each requires; then findings fitting no claim; then exactly one
terminal line. `PASS` requires every claim `CONFIRMED`, nothing `UNRESOLVED`, nothing
`NOT-EVIDENCED`, and no substantiated finding outside the claims.
