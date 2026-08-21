# Fleet campaign plan — 2026-08-21

Goal, from the user's instructions this session: fix `@orkestrel/test`'s Windows defects and make
0.0.8 a comprehensive bump (link fallback + adopted supervisor helpers + `waitForCondition`);
close probe's remaining defects; verify through the tarball method in probe and scaffold and
sweep the tarballs before release; add `prepack` fleet-wide; and address every ROADMAP.md row,
in parallel, per the orchestration contract.

## Exit criterion

The campaign ends when each enumerated unit below is implemented, repaired, retained as a ruling,
or intentionally excluded on recorded evidence; the gates are green in every touched repo; test
0.0.8 is prepared with tarballs swept and registry pins restored; and ROADMAP.md carries only
rows that this campaign's rulings deliberately leave (each re-stated, none silently dropped).
Publishing is the user's decision and sits outside the criterion; preparation for it is inside.

## Wave A — test 0.0.8 core + probe defects (design round 1, reconciled)

| Unit | Subject | Role/engine | Status |
| --- | --- | --- | --- |
| A1 | test src: `createLink` fallback + contract | Sol implementer (bench) | running |
| A2 | test tests: `FILE_LINKS`/`DIRECTORY_LINKS`, gate reassignment, new proofs | Opus implementer | after A1 |
| A3 | test guide: link contract, worked example, fallback subsection | Opus implementer | after A2 |
| T0 | tarball build+pack+install into probe and scaffold | Orchestrator | after A1 (repack if src moves again) |
| A4 | scaffold: dissolve `createWorkspaceLink` workaround | Opus implementer | after T0 |
| B | probe: `isRefusedName` + RuntimeStage classification + gated proof | Opus implementer | after T0 |
| C | probe: normalize config-read seam + malformed-project proof | Opus implementer | after B (same checkout) |
| AU1 | audits: Sol audits A2/A3/A4/B/C; Opus reviewer + checker audit A1 | analyst/reviewer/checker | after units |
| V1 | authoritative gates: test, probe, scaffold | verifier | after audits |

## Wave H — comprehensive 0.0.8 surface (design round 2, running)

| Unit | Subject | Status |
| --- | --- | --- |
| H-design | planner + Sol lanes on helper adoption + `waitForCondition` | both lanes running |
| H-impl | per reconciled design: types → src → tests → guide, by environment | pending design |
| H-tarball | repack + reinstall into probe/scaffold after src moves | pending |

## Wave F — fleet rows (absorption running: F1 inventory, F2 scaffold rows, F3 package rows)

| Row (ROADMAP.md) | Shape | Planned handling |
| --- | --- | --- |
| Prepack (user decided: add) | fleet-wide script change | design ruling on mechanism from F1 ground → mechanical fleet units |
| scaffold policy: nested-function rule in `configs/policy.ts` | published vendored surface | engineering unit after F2 |
| fleet skill/bridge sweep | read sweep | grok sweep → per-target findings |
| interned-class canon (agent `Channel` vs middleware `MultipartParser`) | ruling + correction | rulings design round after F2; corrects the losing package |
| scaffold guide trims + blueprint `file:` note | docs | Opus doc units after F2 |
| toolbox shaper proofs or guide correction | tests/docs | mechanical unit after F3 |
| test `waitForCondition` + guide population prose | published surface + docs | folded into Wave H |
| mcp `createTeardown` dedup | tests only | mechanical unit after F3 |
| setTimeout → `waitForDelay` (middleware, browser, workflow, queue, router, agent) | tests only (verify per F3) | mechanical units, parallel across repos |
| middleware `MultipartParser` move | published surface | after the canon ruling |
| program+brief read-once ownership | published surface | engineering design round after F3 |
| program validate-path guards | published surface | mechanical-ish unit after F3 |
| probe deferred rows (deadline bound, bare-Error instrument finding, unrelated-Control design, three unproven probes, helper-family debt, revision suffix, destroy bound) + carried findings (`#issue` prose translation; `realpathSync` race) | mixed | probe wave 2: design round + units after Wave A closes probe |
| probe `stop()` regression pin | tests only | mechanical unit after F3 confirms mcp 0.0.20 installed |
| sea `SEAOptions` timeout | published surface | engineering unit after F3 |
| contract `isContractError` brand fix | published surface, FLEET-WIDE cascade | engineering unit; release sequencing owns the cascade |
| process bytes/write + bare-`\r` + stdin-delivery | published surface (mcp, sea, scaffold downstream) | engineering design round after F3 |
| qualifier `Premise` | published surface (program downstream) | rulings design round |
| §3 rows: mirror-vs-release, settings vendoring, order-gating marker, openai.yaml research trigger, w3 re-prove/strike, object-type ban, honest-form sweeps | rulings | one rulings design round (planner + Sol) after F2/F3; each row ends kept-with-new-wording, implemented, or struck on record |

## Release shape (from the ecosystem report, 2026-08-21)

test is L0 and dev-only for consumers: 0.0.8 cascades to nobody; consumers re-pin at their own
pace (this campaign re-pins probe and scaffold). contract is L0 runtime: its fix cascades to the
whole fleet in layer order. process is L2: mcp, sea, scaffold direct; probe transitive. qualifier
is L3: program direct. Findings carried into release planning: the embedded catalog's supervisor
row is stale (re-run `scaffold catalog` before sequencing); toolbox's graph mixes `database`
`^0.0.10`/`^0.0.11` (reconcile pins in the wave that touches toolbox); registry sweep running.

## Standing constraints

- One writer per checkout, serialized; different checkouts parallelize.
- Nothing commits or publishes without the user; publishes are operator-driven on this host.
- Tarballs live under scratch/tmp, are regenerated whenever test's src moves, and are swept with
  registry pins restored before any distribution proof or release preparation.
- Every dispatch is a file; reports land beside briefs in this folder; `tmp/` journals are swept
  at acceptance.
