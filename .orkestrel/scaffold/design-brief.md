# Unit design — rule the host split and pointer migration

## Role and engine

One identical brief serves every lane of the adversarial design pass. The dispatch that delivers
this brief names the lane its executor holds:

- Subjective lane: `planner` on Opus 5, native subagent.
- Objective lane: `planner` on Opus 5, native subagent, holding the objective perspective because
  the Codex bench is dark (CLI absent, recorded at session start).
- Objective lane, second engine: Cursor Grok (`cursor-grok-4.6-high`) through the bench CLI, a
  user-directed substitution for GPT-5.6 Sol. Its verdicts are proposals the Orchestrator verifies.

Each lane works blind: do not seek, read, or reconcile another lane's answer. You perform the
assignment directly and spawn nothing.

## Objective

Rule on the design for implementing `PROPOSAL.md`: scaffold keeps the one canonical instruction
set, every target carries small pointer files in place of the vendored instruction copies, and the
tool surface stays vendored. Return a design, alternatives, bounded units with role and engine,
tensions, and risks.

## Context

**Governing spec.** `PROPOSAL.md` (read it whole). The owner has ruled: implement it. The problem,
the harness facts, and the recommended option are fixed; the design questions below are open.

**Law.** `AGENTS.md`; `.claude/rules/names.md`, `typescript.md`, `architecture.md`, `patterns.md`,
`tests.md`, `workspace.md`, `portability.md`, `documentation.md`, `writing.md`, `quality.md`;
`.agents/orchestration.md`. Skill: none for this design round. Guide: `guides/scaffold.md`.

**Evidence.** The Grok absorption distillate at `.orkestrel/scaffold/absorb-propagation-report.md`
(read it whole; every pointer below was spot-verified by the Orchestrator against the code on
2026-08-27):

- `HOST_PATHS` (`src/core/constants.ts:124-159`) is one frozen `readonly string[]`. It drives plan
  membership (`nameToHostArtifacts`, `src/core/compilers.ts:1512-1518`, ownership `presence`),
  staging (`stageHost`, `src/server/helpers.ts:1382-1535`, into `dist/host` with `manifest.json`),
  and the committed inventory (`stageInventory`, `src/server/helpers.ts:1562-1611`, into
  `host.json`). Directory members expand at stage and hydrate.
- Inventory entries carry `storage`, `destination`, `executable`, `digest`
  (`src/server/types.ts:65-70`); no group. `pathToStorage` (`src/server/helpers.ts:215-221`) strips
  leading dots per segment; a root dotted file stores under `dotfiles/`.
- `Materializer.repair` (`src/server/Materializer.ts:291-314`) writes only `missing` and `stale`
  destinations and never deletes. Deletion belongs to `overwrite`/`remove`; harness trees are not
  protected from it. A path removed from membership becomes unmanaged in targets, not deleted.
- Hydration promotes vendored artifacts to `content` ownership except `WORKSPACE_OWNED_PATHS` and
  deferred paths (`src/server/Materializer.ts:658-687,794-808`).
- `tests/config.test.ts:594-694` holds committed `host.json` byte-identical to a fresh
  `stageInventory` run.
- The vendored policy suite runs inside every target. `tests/policy.test.ts:347-351` requires a
  non-empty skill family containing `orkestrel-falsify`; `tests/policy.test.ts:493-497` requires
  `readPolicyPaths` to contain `.claude/rules/names.md`. Both fail in a target whose
  `.agents/skills` and `.claude/rules` trees are gone. The inspectors themselves
  (`inspectSkillFamily`, `inspectSkillBridges`) pass on total absence of their roots.
- The catalog verb writes `.claude/agents/orkestrel.md` into targets (`CATALOG_AGENT_PATH`), under
  a directory the migration removes from the vendored set.
- Membership shadows that move with the split: `EXECUTABLE_PATHS` (`src/core/constants.ts:188-193`),
  `WORKSPACE_OWNED_PATHS` (`:173`), `HOST_DIRECTORY_PATHS` (`tests/setupServer.ts:1095-1102`),
  packed-path expansion (`tests/distribution.test.ts:250-287`).
- Prose the migration makes false: `README.md:6-8,36-57` (instruction files as vendored-into-target
  data); `guides/scaffold.md` groups (`885-898`), ownership (`900-949`), vendored data root
  (`1127-1183`).
- The artifact model: `HostArtifact` (`presence`/`birth`), `HydratedArtifact` (`content`, `hex`),
  `ContentArtifact` (`template`/`computed` with `content`), each with optional `source` distinct
  from `path` (`src/core/types.ts:352-414`).

**Host.** POSIX shell at `/home/user/scaffold`, clean tree on branch
`claude/scaffold-proposal-impl-nabmm9`. Lanes are read-only; no network needed.

**Measurements.** `npm ci` completed at session start. Gates were green at the branch tip (release
commit 0.0.55).

**Control identifiers.** None.

**Standing conditions.** `tmp/cursor/` holds bench journals; `tmp/units/` holds briefs. Both are
git-ignored. The `.orkestrel/campaign/` folder holds a prior campaign's record; it is off-limits
and not part of this subject.

## Design questions to rule

Rule on each, with the reasoning your lane's perspective supplies:

1. **The membership split.** How the code expresses the distinction: instruction members are staged
   into `dist/host` and `host.json` (the `node_modules` fallback the pointer names) but leave the
   vendored-into-target plan; the tool surface stays staged and planned; pointer files are new
   content planned at the `CLAUDE.md` and `AGENTS.md` destinations. Name the constants, types, and
   helper changes exactly (naming law binds: UPPER_SNAKE_CASE `{QUALIFIER}_{NOUN}` constants,
   single-word entity members, named discriminants, boolean behavior switches, derive state).
2. **Pointer mechanism and content.** Where the pointer bytes live in scaffold's tree and how they
   stage (a new source directory with `source`-mapped destinations, a template, or computed
   content), and the exact pointer prose per `PROPOSAL.md:54-60`: plain prose naming
   `@orkestrel/scaffold` as authority, the sibling `../scaffold/` read when present, the
   `node_modules/@orkestrel/scaffold/dist/host/` fallback otherwise, no `@path` import syntax.
   Writing law binds the prose.
3. **`.claude/settings.json`.** Stays vendored (the permissions floor is tool-read per repository)
   or leaves with the instruction set. `PROPOSAL.md:87-89` leaves this to design.
4. **Bridge files in targets.** `.codex/*`, `.cursor/*`, `.mcp.json` leave the vendored set per
   `PROPOSAL.md:81-89`, yet `PROPOSAL.md:61-64` says the bridges shrink to pointer paths. Rule
   whether a target keeps any bridge beyond the pointer pair, and what a Codex or Cursor session on
   a bare target reads.
5. **The catalog agent.** `.claude/agents/orkestrel.md` is written into targets by the catalog verb
   and polices the package table. Rule where it lands once `.claude/agents` leaves the vendored
   set, or whether it leaves too.
6. **Policy-test re-scope.** The vendored `tests/policy.test.ts` must pass in a target whose
   instruction trees are absent while still binding in scaffold's own tree. Rule the mechanism —
   pass-on-absence at the assertions named in the evidence, a scaffold-only registration, or
   another seam — without weakening what it proves where the trees exist.
7. **The orphan sweep.** Each target needs a one-time deletion of the superseded copies
   (`PROPOSAL.md:96-100`). Rule whether scaffold ships a mechanism (a verb, a repair extension) or
   the visit documents a manual step; mechanism-not-product-policy binds.
8. **Membership edges.** `scripts/*.sh` (bench hooks), `.agents/templates`, `.agents/transports`,
   `LICENSE`, `guides/guide.md`, `guides/scaffold.md`: instruction surface or tool surface, per
   `PROPOSAL.md:80-89` and what each governs.
9. **Documentation parity.** Which guide sections, README passages, and ROADMAP rows the change
   owns, and what `PROPOSAL.md` itself becomes at acceptance.
10. **Types-first order and units.** The bounded implementation units, their dependency order, one
    writer at a time, each with independently checkable acceptance criteria.

## Unknowns

- Whether the cloud harness honors `claudeMdExcludes` and per-root rule loading
  (`PROPOSAL.md:125-129`): unmeasurable from this session; treat as out of the code change's scope
  and report it as a standing unknown if your design depends on it.
- Whether any target consumes `dist/host` paths beyond `audit`/`repair`/`catalog`: report as
  unknown if load-bearing for your design.

## Scope

**Owned.** None — this is a read-only design lane. Return prose only.

**Shared (report-only).** Every repository file.

**Off-limits.** Editing anything; `.orkestrel/campaign/`; secrets (`.env*`, auth files, tokens).

**Tools and limits.** Read, Grep, Glob only. No file writes, no shell.

## Execution

A native subagent, or a bench engine reading this brief inside its own CLI: perform the assignment
directly and spawn nothing. State which lane you held.

## Output

Return exactly the `planner` return shape:

- `Design`: the coherent contract — constants, types, helpers, staging, plan, pointer content,
  test re-scope, documentation — answering every numbered question.
- `Alternatives`: at most two real alternatives and why the design wins.
- `Units`: bounded work, each naming role AND engine, ownership, dependencies, and acceptance
  criteria.
- `Tensions`: judgment calls named for the other lane to challenge.
- `Risks`: what could invalidate the design and the evidence that settles each.

Deliver it as your final message. Write no files.

## Deviation contract

A conflict between `PROPOSAL.md` and the law, or evidence that a numbered question rests on a false
premise, stops the lane: report expected, found, exact evidence, and one short hypothesis. Where a
question is ancillary — a section's placement, a name between two lawful forms — decide, record,
and carry on.

## Acceptance criteria

1. Every numbered design question receives a ruling with its reasoning.
2. Every unit names role, engine, owned files, dependencies, and checkable acceptance criteria.
3. The design violates no non-negotiable in `AGENTS.md` and no named rule file.
4. The exit criterion for the campaign is stated: the enumerated capabilities whose closure ends
   it.

## Review evidence

The subject is a design proposal: the proposal is `PROPOSAL.md`, the canon it must satisfy is
`AGENTS.md` plus the rule files named under Law, and the record of what motivated it is
`PROPOSAL.md:8-21` with the absorption distillate.
