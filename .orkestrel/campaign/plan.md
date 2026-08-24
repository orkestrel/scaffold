# Plan — the ROADMAP-rows campaign (opened 2026-08-24)

Reconciled from the blind lanes: `design-rows-subjective.md` (planner, Opus 5) and
`design-rows-objective.md` (analyst, GPT-5.6 Sol, journal `tmp/codex/design-rows-objective.jsonl`,
session `01a03618-2512-7850-9bc9-044a4dfe53a9`). Both benches probed live on bounded round trips
before routing. Supervisor rows are excluded by the user's instruction and stay verbatim.

## Exit criterion

Every non-supervisor `ROADMAP.md` § 1 row ends implemented, repaired, retained, or intentionally
excluded on evidence; every touched repository's gates are green on `main`; the obliged releases
— scaffold 0.0.52, mcp, brief, and probe at whatever versions the registry sweep fixes — are
registry-confirmed under the user's approval; `scaffold audit` reports no uncovered setup module
in any visited target (queue closes through its seed); and `ROADMAP.md` is rewritten to the
closing state. The campaign folder prunes on the user's go-ahead.

## Rulings

1. **mcp stdio write (adopted: planner's mechanism, analyst's closure semantics).** `send`
   resolves on the write's completion callback and rejects on its error, through a `writeLine`
   helper in `src/server/helpers.ts`; a synchronous `write` throw becomes the rejection;
   `start()` subscribes the caller-owned output to `error` with the existing failure handler and
   `#release()` removes exactly that listener; `close()` settles every pending send with a
   rejection and no promise stays parked; `send` after `close` rejects, matching the stdio
   client's refusal. Sibling transports do not move; the `send` contract's TSDoc states the
   family rule (a channel that confirms writes rejects; an exchange that reports through the
   emitter resolves; a channel that cannot confirm no-ops). The analyst's family-wide
   conformance overhaul is RECORDED for the next matrix as a rescope. `dist/src` moves: mcp
   bumps, probe re-pins and bumps, nothing further.
2. **brief members (adopted: analyst's declaration and type pin, planner's parity shape).**
   `INTERPRETATION_MEMBERS` in `src/core/constants.ts` as
   `Object.freeze([...] satisfies readonly (keyof Interpretation)[])`; the compile-time
   completeness pin `expectTypeOf<(typeof INTERPRETATION_MEMBERS)[number]>().toEqualTypeOf<keyof
   Interpretation>()` beside the consumer's capture case in `BriefCompiler.test.ts`, with the
   `prove` receipt the quality rule requires; both `BriefCompiler` call sites rewired; guide row
   and runnable example; no count in the new TSDoc. The planner's runtime engine-equality pin is
   DROPPED: optional members falsify it and the type pin is the stronger instrument. `dist/src`
   moves: brief bumps, zero dependents.
3. **process (adopted: analyst's test-only close).** The weak branch consolidates into the
   existing recorder proof: `on: { exit }` on the refused launch, the destroy barrier, the
   snapshot, the registered-child control; the marker branch and platform fork leave. Preventing
   the spawn reddens the recorder assertion. The planner's `ProcessErrorContext.pid` is DROPPED:
   a published-surface change with no consumer beyond the test. Placement row closes RETAINED:
   the spawning proofs sit where the rules place them; the guide states the ruling and every
   spawn-suite budget is sized from a contended run. Test-only; process does not bump; sea does
   not enter the tail.
4. **html entities (adopted: planner's fixture, analyst's controls).** The WHATWG
   `entities.json` (fetched 2026-08-24 from https://html.spec.whatwg.org/entities.json; 2231
   names, 2125 semicolon-terminated — equal to the table's asserted size) is vendored at
   `tests/src/core/fixtures/entities.json` (staged, import probed green under the real config).
   The proof asserts set equality by name and value between `NAMED_ENTITIES` and the
   semicolon-terminated subset; both `toHaveLength(2_125)` lines leave; mutation controls alter
   a key and a value in a copy and must fail. The analyst's self-minted digest is DROPPED as the
   table asserting itself. Tests-only; html does not bump; no cascade.
5. **setup proofs (adopted: both lanes, population corrected by this session's recompute).**
   The audit reports EVERY non-vendored setup module per target — setup, setupBrowser,
   setupServer, setupConformance, setupGlobal, setupService — not only `setup.ts` (measured:
   mcp owes five, test owes three, server two, ollama two). Each visit runs `scaffold audit`
   and proves every reported module. A proof asserts behavioral contracts, never an export
   census. The `setup` project is baked Node-with-browser-disabled, so a browser- or
   service-flavored module takes the Node-assertable proof with the DOM or live-service half
   named, in the proof, as proven by its consuming suites. Queue restores `tests/setup.ts` to
   the empty seed (analyst) — the planner's advisory narrowing is DROPPED as an unsound text
   instrument. Visit order per target: re-pin published scaffold → write proofs (or restore
   seed) → adopt the planned `test:guides` where missing → `scaffold repair` → gates → commit
   that target alone. Single-helper targets visit last (planner's ordering note).
6. **test guide fences (adopted: analyst's routing, planner's totality guard).** A browser unit
   lands the carriers in `tests/src/browser/` with exact marker lines; a node unit then executes
   every Node-runnable residue fence directly in `tests/guides.test.ts` — including scratch,
   loopback, host-probe, and inventory fences, which the guides project's Node environment runs
   — lands the totality guard (set membership between the guide's fence-bearing headings and the
   transcribed-plus-routed set, with a mutation control), and replaces the guide's `below` with
   `later`. Tests and guide only; test does not bump.
7. **guides-cache (convergent).** The planned value owns `test:guides`; no scaffold edit; each
   visited target adopts it during its visit; a closing sweep covers any target the wave missed.
8. **release tail (adopted: analyst's order, shrunk by ruling 3).** scaffold 0.0.52 publishes
   first, alone; the fleet wave then visits every target against the published package; mcp
   publishes next; probe re-pins the registry-confirmed mcp and publishes beside brief.
   `scaffold catalog` regenerates before any sequencing (the tree copy is stale for mcp). Every
   window is the user's approval under `orkestrel-publish`.
9. **isBrowserVuePath (convergent).** Recorded for the next matrix as an
   `orkestrel-align-packages` candidate; not rescoped into this campaign.
10. **probe mintty (both lanes).** Retained, trigger-gated: opens on the first Windows campaign
    running the bin suite where `/usr/bin/script` is absent; no Linux run can close it.

## Routing ledger

| Unit | Subject | Repository | Role | Engine | Depends on |
| ---- | ------- | ---------- | ---- | ------ | ---------- |
| S1 | scaffold 0.0.52 prep (bump, self-pin tripwires, prepublishOnly) and publish | scaffold | Orchestrator under `orkestrel-publish` | Opus 5 | user approval |
| W1 | mcp stdio write ruling, pins, guide | mcp | `sol` | GPT-5.6 Sol (bench exec) | none |
| W2 | brief INTERPRETATION_MEMBERS, type pin, guide | brief | `implementer` | Opus 5 (native) | none |
| W3 | process recorder proof and placement guide sentence | process | `implementer` | Opus 5 (native; the suite spawns grandchildren a bench denies) | none |
| W4 | html entity fixture equality and controls | html | `sol` | GPT-5.6 Sol (bench exec; fixture staged, in-process) | none |
| W5 | test guide browser carriers | test | `implementer` | Opus 5 (native; Playwright) | none |
| W6 | test guide node fences, totality guard, `later` | test | `implementer` | Opus 5 (native; loopback listener) | W5 |
| W7 | middleware setup and setupServer proofs | middleware | `implementer` | Opus 5 (native; loopback and file handles) | S1 on registry |
| W8 | queue seed restore and visit | queue | `builder` | Sonnet | S1 on registry |
| W9 | fleet visit wave: per-target proofs, cache adoption, re-pin, repair, gates | every remaining target | `builder` for path, data, and seed targets; `implementer` (Opus) for behavior targets whose suites spawn, listen, or drive a browser; `sol` (Sol) for bench-safe behavior targets | mixed, named per slice | S1 on registry; W1 before mcp's visit; W2 before brief's; W3 before process's; W4 before html's; W6 before test's |
| A-* | falsification audit per W-unit | subject repo, read-only | `analyst` (+ `reviewer` on FAIL or shape-spanning claims; `checker` for mechanical criteria) | Sol / Opus / Sonnet | each unit's return |
| V-* | authoritative gates per touched repo | subject repo, read-only | `verifier` | Sonnet | integration |
| R1 | mcp release, probe re-pin, brief and probe releases | mcp, probe, brief | Orchestrator under `orkestrel-publish` | Opus 5 | W1, W2 audits green; user approval |
| R2 | ROADMAP reconciliation and campaign record | scaffold | `implementer` | Opus 5 | all above |

## Risks, ranked

1. The mcp `send` semantic change alters throughput for every stdio server — settled by the
   ordering pins and by running probe's suite against the locally packed mcp tarball before
   either publishes (tarball restored before the distribution proof).
2. Wave breadth: the corrected population is larger than the row's framing — settled by
   per-target audit recompute, per-target status, slices reporting as they finish, and solo
   re-runs of timing reds by the Orchestrator.
3. The totality guard over- or under-matching headings — settled by its mutation control against
   the measured residue list.
4. The type pin's `satisfies` interplay with `Object.freeze` — settled by the unit's required
   `prove` receipt before reliance.
5. Windows-shaped mechanics none: this host is POSIX throughout.
