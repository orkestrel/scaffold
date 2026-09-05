# Audit brief — unit catalog-peers (a peer edge orders the fleet catalog's layers)

## Role and lane

Two read-only auditors in clean contexts, blind to each other:

- `reviewer` on Claude Opus 5 holding the **objective** lane — correctness, constraints, and what the code and contracts permit — as the recorded substitution for the dark GPT-5.6 Sol bench. The writer was `builder` on Claude Sonnet, so this auditor's engine did not write the work.
- `checker` on Claude Sonnet: the mechanical claims 6, 7, and 8 with grep evidence.

Say in your first line which role and lane you hold.

## Subject and evidence

The unit's uncommitted changes in `/home/user/scaffold`, rendered at `tmp/units/catalog-peers.diff` (`git diff`) and `tmp/units/catalog-peers.status` (`git status --short`), with the writer's report at `tmp/units/catalog-peers-report.md` and the brief it executed at `tmp/units/catalog-peers-brief.md`. The record that motivated it: the wave of 2026-09-04 published `@orkestrel/middleware` and `@orkestrel/mcp` after `@orkestrel/server` by hand while the catalog placed middleware at `L2` (`.claude/agents/orkestrel.md:67,83`); the registry serves `peerDependencies` `{"@orkestrel/database":"^0.0.13","@orkestrel/server":"^0.0.18"}` for middleware and `{"@orkestrel/router":"^0.0.13","@orkestrel/server":"^0.0.18"}` for mcp (read 2026-09-05 01:05 UTC). Rule a claim whose only evidence is the writer's report `UNRESOLVED`.

## What the round decides

Whether the change is committed as the catalog's layer law and ships with scaffold's next release, or goes back for a fix round.

## Already established

The ruling that a peer edge orders a dependent (the debrief's finding A9) is not under audit; a lane that disagrees records a referral to the Orchestrator.

## Claims

1. `catalogToLayers` places a found row after every found row its `peers` name: a fixture whose dependent has `dependencies: []` and one peer edge orders `[[peer], [dependent]]`, and the writer's mutation control (the `...entry.peers` spread removed) reads red on that case. The control's two readings are quoted in the report; rule `UNRESOLVED` if the diff's test cannot fail without the spread.
2. `Upstream.catalog()` reads `peerDependencies` from the same version record of the abbreviated packument it read `dependencies` from, answers `peers: []` when the record has none, and still reads no `devDependencies` edge (the existing dev-edge case and the new peer case both pin this).
3. `isCatalogEntry` refuses a found row without `peers` and accepts one with `peers: []`; the missing branch of `CatalogEntry` carries `peers?: never`.
4. The rendered catalog table carries a `Peer dependencies` column after `Runtime dependencies`, a found row's peers as `` `name` `range` `` comma-joined, an empty fifth cell for a not-found row, and the column padded like the others (the Materializer case asserts the padded row text).
5. Every sentence about which edges the catalog reads is true of the code after the change: `guides/scaffold.md` § Fleet catalog, the `CatalogEntry` remarks in `src/core/types.ts`, the `catalogToLayers` remarks in `src/core/helpers.ts`, the `#edges` comment in `src/server/Upstream.ts`, and `.claude/agents/orkestrel.md:123-124`. A sentence still saying only `dependencies` is read, or that development edges are the only edges not read, is BROKEN.
6. `git status --short` lists only paths under the brief's Owned row (including "any further test file `npm run check` reddens", each named in the report) plus `host.json`, which the Orchestrator regenerated with `npm run build` after the unit returned (its diff carries the digests of `.claude/agents/orkestrel.md` and `guides/scaffold.md` only); `package.json`, `README.md`, `.agents/**`, `src/bin/**` are untouched.
7. The changed prose carries no count in prose, no `should`, no `simply`/`just`/`easy`, no `via`, no `e.g.`/`i.e.`/`etc.`, no `currently`/`now`/`new`/`latest` in a dating sense (`.claude/rules/writing.md` § Substitutions, swept case-insensitively over the diff's added lines); each hit is named with its sense.
8. The diff carries no `any`, no `as` assertion, no non-null assertion, no nested function declaration, every new interface property is `readonly`, the new tests are named for what they prove, and the writer's gate readings in the report name their exit codes (`format:check`, `lint:check`, `check`, `test:src:core`, `test:src:server`, `test:src:bin`, `test:guides`).

## Output

The `orkestrel-falsify` verdict shape: numbered per-claim verdicts (`CONFIRMED` with the evidence, `BROKEN` with the failing text and the smallest correct fix, `UNRESOLVED` with what would settle it), findings outside the claims, referrals, the claims attacked and held, and exactly one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>; outside the claims: <finding ids or none>`.

## Orchestrator edits inside the subject

After the unit returned, the Orchestrator ran `npm run build` (exit 0: `build-host: staged 121 file(s)`, `build-inventory: staged 121 file(s) into host.json`), then `npm run test:src:server` (exit 0, `Test Files 5 passed (5)`, `Tests 432 passed (432)`) and `npm run test:src:bin` (exit 0, `Test Files 3 passed (3)`, `Tests 245 passed (245)`) on 2026-09-05, which closes the writer's reported deviation (the stale `host.json` digests). `tmp/units/catalog-peers.status` is re-rendered after that build.

## Standing conditions

While you read, the Orchestrator's canon unit is editing files outside this unit's scope: `.agents/skills/orkestrel-publish/**`, `.agents/orchestration.md`, `.claude/agents/reviewer.md`, `.codex/agents/*.toml`, `ROADMAP.md`, and `.orkestrel/campaign/wave-debrief/**`. Judge claim 6 against `tmp/units/catalog-peers.status` as rendered before those edits, plus that named list; a path outside both is the finding.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing. Read-only; edit nothing; run nothing.
