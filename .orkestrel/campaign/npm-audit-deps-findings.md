# Campaign findings: fleet dependency update, scaffold conformance, and src audit

Registry and repository readings taken 2026-08-28.

## Bench routing

| Engine | State | Evidence |
| --- | --- | --- |
| Cursor Grok | Live | Bounded round trip returned `GROK-LIVE` |
| GPT-5.6 Sol | Dark | The `codex` binary does not resolve, and the `codex` MCP server reports `ENOENT` |
| `probe` MCP server | Dark | The server reports `CONNECTION_CLOSED` |

Sol being dark puts every adversarial lane on Opus 5, as `.agents/orchestration.md` § Engine
assignment requires. The `prove` tool is unavailable, so TypeScript claims fall back to the probe
instrument `.claude/rules/tests.md` § Probes names.

## Pre-existing defects found in `scaffold@main`

These predate this campaign. The dependency update surfaced them; it did not cause them.

### The published 0.0.59 artifact is behind `main`

`dist/src/core/index.js` on the registry writes `"@orkestrel/probe": "^0.0.10"` into a generated
workspace. `main` declares `^0.0.11`, and `BASE_DEV_DEPENDENCIES` derives that floor from scaffold's
own manifest, so every workspace generated from the published package receives a floor one release
behind.

`dist/host/claude/agents/orkestrel.md` on the registry carries a catalog table one release behind:
it has no `@orkestrel/codec` row and it names `lsp` `0.0.4`, `mcp` `0.0.26`, `probe` `0.0.10`,
`process` `0.0.7`, `scaffold` `0.0.58`, `sea` `0.0.12`, and `server` `0.0.16`. The `catalog` step of
`repair` and `overwrite` rewrites the marker-bounded table from the live registry, so a target that
runs either verb corrects the table in place; a target that only reads the vendored file does not.

Consequence: `scaffold` republishes on its own account.

### `host.json` records a stale digest

The committed `host.json` records `d61d8c80…` for `.claude/agents/orkestrel.md`, and the committed
file hashes to `0407d93b…`. Running `build:inventory` recomputes it correctly.

### The generated-manifest fixtures were red on `main`

`tests/src/core/fixtures/source-manifest.txt`, `app-only-toolchain.txt`, and
`setup-false-manifest.txt` recorded `@orkestrel/probe` at `^0.0.10` while the manifest declared
`^0.0.11`, so `npm test` was red on `main` before this campaign. Regenerating the three snapshots
moves that one pin and nothing else.

## Dependency update

Every external dependency was already at the registry latest except the rows below. typescript
holds at `^6.0.3` by the user's decision; the registry latest is 7.0.2 and the newest stable 6.x is
6.0.3.

| Declaration | From | To | Where |
| --- | --- | --- | --- |
| `@orkestrel/probe` | `^0.0.10` | `^0.0.11` | 40 repos, development |
| `@orkestrel/scaffold` | `^0.0.58` | `^0.0.59` | 40 repos, development |
| `@orkestrel/server` | `^0.0.16` | `^0.0.17` | `middleware` peer, `ollama` development |
| `oxlint` | `^1.77.0` | `^1.80.0` | `probe` peer |
| `typescript` | `^6.0.0` | `^6.0.3` | `probe` peer |
| `vitest` | `^4.1.0` | `^4.1.11` | `probe` peer, `test` peer |
| `@modelcontextprotocol/conformance` | `0.2.0-alpha.10` | `0.2.0-alpha.11` | `mcp` development |

`scaffold overwrite` cannot undo the typescript decision: `guides/scaffold.md` § Dependency floors
states that a newer major is never crossed for you, and that peer declarations are caller-owned and
never rewritten after creation.

## Gate results

The fleet gate chain is `format:check`, `lint:check`, `check`, `build`, `test`. Run 4-way parallel
across 49 repositories, then each red re-run alone.

| Repository | Parallel | Alone | Reading |
| --- | --- | --- | --- |
| `scaffold` | FAIL `check` | FAIL `test` | Install contention, then the pre-existing fixture drift |
| `database` | FAIL `test` | OK | Contention: a 60-second guide-fence compile budget |
| `process` | FAIL `test` | pending | |
| `probe` | FAIL `test` | pending | |
| `mcp` | FAIL `test` | pending | |

## Instruments

`distdiff.mjs` compares a built `dist/` against the published tarball of the same version, over every
non-`.map` file, by file set and by whitespace-normalized content. Controls: a material mutation to
`dist/src/core/index.js` reported `changed`; a whitespace-only mutation reported unmoved; the
unmutated tree reported unmoved.

`manifestdiff.mjs` compares the local `package.json` against the published tarball's and splits each
differing field into consumer-visible and development. Controls: `middleware` reported its
`peerDependencies` change; `abort` reported development movement only. An earlier form reported
`codec` and `sse` as consumer-visible because npm writes `"dependencies": {}` into a packed manifest
that declared none; the instrument now reads an absent key and an empty collection as one
declaration, and the `middleware` control still reports.

`recon.mjs` reports what `scaffold overwrite` would change in a target, from `scaffold audit --json`.
Control: a planted byte in `abort`'s `.editorconfig` reported `stale` drift on that path, and the
restored file reported aligned.

## Probe gate verdict (2026-08-28, control run)

The full `npm test` in `probe` is red on pristine `main` at `a40ca19` in this container: 13 failures in `tests/src/bin/main.test.ts`, 213 passing, measured by `/home/user/work/probe-control2.sh` with output at `/home/user/work/probe-control2.log`. The campaign branch's red therefore predates the dependency update. The failures are container-environment failures (LSP arm deadlines under this host), not campaign regressions. The scoped `npm run test:src:server` passes 177/177 on the same checkout.

## Src-audit verification round (2026-08-28)

The audit lanes s12-s18 returned 273 findings over 26 packages (parse: `/home/user/work/groupprep.mjs`); the original lanes ruled 258 CONFIRMED and 15 EXEMPT. Slices s01-s11 are not yet dispatched. Every returned finding is being re-ruled from primary evidence before any fix lands: workflow `wf_2ce5d3a7-015` runs a blind objective lane and a blind subjective lane per package group (group files under `src-audit/groups/`, lane brief `src-audit/verify-brief.md`), a fleet-wide TSDoc-convention lane (`src-audit/g16-tsdoc-brief.md`), and a judge on every lane disagreement. Verdict vocabulary: DRIFT, DRIFT-RESHAPE, EXCEPTION, INVALID.

Bench ledger for the round: the `codex` CLI is absent from PATH (`command not found`, probed 2026-08-28), so the Sol bench is dark and every lane runs on Claude Opus 5 as a separate clean-context subagent, per the engine-assignment table in `.agents/orchestration.md`. The Cursor Grok bench round-tripped earlier in the campaign and holds no lane here because verification is judgment-bearing work.

The mcp conformance re-record closed its server half green and stopped on a clean deviation: the client driver `tests/conformanceClient.ts` omits object-typed schema arguments, so the runner's `json-schema-2020-12-preservation` scenario cannot arm. Successor unit `mcp-client-rerecord` (brief in `src-audit/`) owns the driver change and the client baseline re-measurement.

## Process refactor coordination (2026-08-28)

The user is refactoring `process` in a different session and removing the `Retention` class
(superfluous); a release follows. Prepared here, measured on 2026-08-28 against the fleet
checkouts and the registry at `process@0.0.8`:

- Runtime dependents that re-pin and republish: `lsp`, `mcp`, `sea` (each pins `^0.0.8`), and
  `scaffold` (runtime `dependencies` too). `probe` follows transitively (it pins `lsp` and `mcp`,
  not `process`), and nothing runtime-depends on `probe`, so the cascade closes there. No package
  declares `process` in `devDependencies`, `peerDependencies`, or `optionalDependencies`.
- `Retention` removal costs dependents no code: `grep -rn Retention` over `src/` and `tests/` of
  `lsp`, `mcp`, `sea`, `scaffold`, and `probe` returns nothing. The `Retention` hits in `console`
  and `contract` are unrelated symbols of their own. The only dependent-side carriers are the
  vendored `guides/process.md` mirrors in `lsp`, `mcp`, and `sea`, which still document
  `Retention` and must be refreshed from the refactored guide during the wave (the published
  package ships only `dist/src`, so the mirror refresh follows the `orkestrel-publish` wave
  procedure).
- `/home/user/work/process-repin.sh <new-version>` stages the re-pin and lockfile regeneration
  for the direct dependents once the release is on the registry.
- Freeze: no fix unit dispatches into `/home/user/fleet/process` while the refactor session owns
  that tree, and the process rows in the g05 verification verdicts are advisory input for the
  refactor rather than fix work here. The s13 process findings (ProcessChild interface naming,
  snapshotCommand cloners placement, SupervisorFace type extraction, ProcessError @example,
  undocumented signal members) were handed to the user for that session.

## Process 0.0.9 re-pin evidence (2026-08-28)

`@orkestrel/process@0.0.9` reached the registry with no `Retention` in its published
declarations (verified against the unpacked tarball). The re-pin to `^0.0.9` landed in `lsp`,
`mcp`, `sea`, and `scaffold` with regenerated lockfiles, and `/home/user/work/repin-gates.sh`
ran the full gate chain in each — `format:check`, `lint:check`, `check`, `build`, `test` — with
every repo green (`/home/user/work/repin-gates.log`: `lsp OK`, `mcp OK`, `sea OK`,
`scaffold OK`). The scaffold run also closes the re-gate owed after the fixture repair. The
`guides/process.md` mirrors in `lsp`, `mcp`, and `sea` are refreshed from the process
repository's main after the release and carry no `Retention` section. The process campaign
branch carries a merge of that main; its own gate run is recorded beside this entry when it
completes. The wave remainder is release work: bump and publish `lsp`, `mcp`, `sea` in layer
order, `scaffold` on its own account, then re-pin `lsp` and `mcp` in `probe` and publish
`probe` last.

## Overwrite pass (2026-08-28)

`scaffold overwrite` ran serially in all fleet targets except `scaffold` itself (recon proved
overwrite there would delete the instruction canon the package vendors). Every run exited 0.
The only files that moved were the vendored catalog `.claude/agents/orkestrel.md` and stale
dependency guide mirrors — a forward refresh from the live registry that adds the `codec` row
and carries `lsp 0.0.5`, `mcp 0.0.27`, `probe 0.0.11`, `sea 0.0.13`, `server 0.0.17`, and
`process 0.0.9`. No package-owned file moved, so no walk-back was needed. Committed in every
target as "Adopt the catalog and guide mirrors for the wave" and pushed. Per-repo logs:
`/home/user/work/logs/ow-*.log`; progress: `/home/user/work/overwrite-progress.log`.

The registry read also settles the wave state: the lsp, mcp, sea, server, and probe releases
predate this campaign; the packages still owing a republish for `process@0.0.9` are `lsp`,
`mcp`, `sea` (published versions pin `^0.0.8`), then `probe`, with `scaffold` on its own
account — the release remainder recorded under the process coordination entry.

## User rulings at the decision gate (2026-08-28)

The user ruled on the four open decisions:

1. **Fix scope: proceed.** Apply the verified fixes that keep published surfaces still. Deliver
   every breaking rename, deletion, or signature change as a layer-ordered work order for separate
   approval, without applying it.
2. **TSDoc voice: migrate, last.** The fleet migrates to the rule's third-person first sentence,
   with the boolean `@returns` wording in the same pass, as the final fix wave after every other
   fix unit has landed.
3. **Conflicts: the rules win.** Batch operations follow `patterns.md` § Batch operations
   (all-succeed); the `guides/workspace.md` any-succeeded sites conform to the rule. Guard
   families follow `architecture.md` § Kind purity; `guides/html.md` conforms to the rule. Both
   are behavioral rulings, so the conforming changes are movers and land with the fix phase.
4. **Release: prepared, not published.** The process 0.0.9 wave remainder and every other publish
   hold until the user asks. Fix work continues on the campaign branches.

## Fix phase round 1 (2026-08-28)

Workflow `wf_a88c02f6-538` dispatches one Claude Opus 5 writer per package with fix-producing
verdicts, in disjoint repository checkouts, each running the full gate chain and leaving the tree
uncommitted for orchestrator review. The shared brief is `fix/fix-brief.md`; the per-package
dossiers under `fix/` join each finding's text with its final verdict and, for DRIFT-RESHAPE, the
corrected repair from the verification lanes and judges. The brief carries the breaking test: a
repair that renames or removes published API, changes a published signature non-additively, or
changes unpinned consumer-observable behavior is deferred to the breaking work order, not
applied. The 2026-08-28 rulings ride in the unit briefs: workspace conforms its batch operations
to all-succeed (s17-37), html moves the five predicates to `helpers.ts` under kind purity
(s08-06), terminal and tool keep their all-succeed repairs, and voice-only findings defer to the
final TSDoc wave. The multi-package TSDoc findings (s13-01, s18-01, s18-02) route to
`fix/tsdoc-wave.md`. The lane-raised mcp extras ride the mcp dossier as s01-ex-A and s01-ex-B;
the judge-ruled s01-ex-03/ex03 (INVALID) and s01-ex-04/ex04 (EXCEPTION) produce no fix work.
Writers run on the Opus engine because the Sol bench remains dark (`codex` absent, re-probed at
session resume); the substitution is recorded per the engine-assignment table.

## Fix round 1 outcome and the contract reconciliation (2026-09-01)

Workflow `wf_a88c02f6-538` completed with the writer units for browser, middleware, workflow,
toolbox, server, mcp, interpret, contract, reason, database, agent, console, scaffold, markdown,
sea, ollama, guide, terminal, rater, test, template, html, queue, indexeddb, and msg returned,
gated green in their own repositories, tripwired for surface removals, reviewed, committed, and
pushed (reports under `fix/reports/`). The remaining units — program, form, csv, table,
qualifier, lsp, brief, router, workspace, sqlite, relation, process, websocket, probe, sse, pool,
ndjson, budget, tool, emitter, abort, worker — failed to launch on the account's weekly usage
limit (reset 2026-09-02 03:00 UTC) and re-run from the same script with `resumeFromRunId` once
the limit lifts.

Contract published 0.0.14 (10:56 UTC) and 0.0.15 (15:29 UTC) on 2026-09-01 from the user's other
session. The campaign branch merged `origin/main` with two conflicts, both resolved in favor of
main's landed design (see `fix/reports/contract.md` § Reconciliation). The fleet re-pins
`@orkestrel/contract` to `^0.0.15` through `/home/user/work/contract-repin.sh`: manifest rewrite,
lockfile regeneration, `npm run check`, and a commit and push only for rows that pass; the row log
is `/home/user/work/contract-repin.log`. Per the runtime-bump law every re-pinned package is a
mover for the second inventory; publishing stays held by the user's ruling.

### Contract re-pin outcome (2026-09-01)

`/home/user/work/contract-repin.sh 0.0.15` moved every fleet dependent's `@orkestrel/contract` pin
to `^0.0.15` with a regenerated lockfile and `npm run check` green, committed and pushed row by row
(`/home/user/work/contract-repin.log`), with two rows outside the pass:

- **worker stays at `^0.0.13`.** Its `queue` dependency pins contract `0.0.13`, so the re-pin
  installs a second contract copy under `node_modules/@orkestrel/queue/node_modules`, and the
  compiler reads `Infer` from the two copies as distinct types (`src/server/factories.ts:43`,
  TS2322 then TS2589). This is the layer cascade the publish law names: worker re-pins after
  queue (and its other L2–L3 dependencies) republish against 0.0.15. The pin was returned to
  `^0.0.13` by edit and reinstall; the tree is clean and typechecks.
- **qualifier re-pinned with a scoped commit.** The tree held uncommitted drafts from the first
  run of its fix unit, interrupted by the usage limit. The manifest and lockfile committed alone;
  the drafts stay for the resumed unit, whose brief names them as untested input to re-derive
  finding by finding.

Every other re-pinned package installs the same transient state — its own 0.0.15 at the root and a
nested 0.0.13 under each `@orkestrel/*` dependency that still pins the old release — until the wave
republishes layer by layer. `isContractError` brands by an own descriptor rather than by `instanceof`
against one copy, so cross-copy detection holds; the fleet gate sweep after the fix round is the
runtime proof.

## Fix round 1 audit (2026-09-01)

Workflow `wf_fb4a8aaa-e90` audits every landed fix unit on the terms of `fix/audit-brief.md`:
per package a read-only `reviewer` lane on Claude Opus 5 and a read-only `checker` lane on the
native tier, blind to each other, each handed the unit's dossier, its writer report, and the
committed diff pre-rendered under `tmp/units/fix/diffs/` (the roles carry no shell, so the
Orchestrator supplies the diff evidence per the permission floor). Each lane rules CONFIRMED or
REFUTED on the brief's seven claims — disposition coverage, fidelity to the operative repair
(the corrected one for DRIFT-RESHAPE), the breaking test on both sides, noop truth, scope,
off-limits files, and guide parity — and names any misapplied finding with its faithful
application. The writer engine was Opus and the Sol bench is dark, so the reviewer lane runs on
Opus as the recorded substitution; the checker lane supplies the second engine. The
Orchestrator reconciles: a claim either lane refutes becomes a fix-up unit or an on-record
dismissal in `fix/audit-1-verdict.md`. The units still running under `wf_a88c02f6-538` receive
the same round when they land.

### Routing correction (2026-09-01)

The audit round's `checker` lane launched with `agentType: 'checker'` and no explicit model. The
role file pins `model: sonnet`, but the Workflow tool's custom-agent path does not apply the
frontmatter pin and the lane inherited the session model instead — a Fable subagent, which the
routing rules forbid (`CLAUDE.md` § Models: never `inherit`). The run was stopped after its first
package, the script now names `model: 'sonnet'` on the checker lane beside the reviewer lane's
`model: 'opus'`, and the round resumed from cache for the reviewer results. Standing rule for
every later workflow in this campaign: every `agent()` call names its model alias explicitly,
whatever the role file says. The writer units all carried `model: 'opus'` and are unaffected.

## Breaking-change phase (opened 2026-09-01)

The user directed on 2026-09-01 that the deferred breaking changes be applied, using the tarball
method where a consumer must prove against a dependency that has not published, and that the
instruction set be read in full and followed strictly. The Orchestrator re-read `AGENTS.md`,
every `.claude/rules/*.md` file, `.agents/orchestration.md`, the `orkestrel-align-packages`,
`orkestrel-harden-package`, `orkestrel-falsify`, `orkestrel-publish`, and `orkestrel-debrief`
skills with their references, every `.claude/agents/*.md` role file, the brief template, and both
transport contracts before designing the phase.

The phase runs the execution loop: absorption of the work-order rows into an exact symbol ledger
on the Cursor Grok bench (brief `fix/breaking-ledger-brief.md`, one launch per layer chunk,
journals under `tmp/cursor/`), a scripted consumer blast radius over that ledger
(`instruments/radius.mjs`), an adversarial design round on one brief
(`tmp/units/fix/breaking-design-brief.md`; planner and the objective lane on Opus with the Sol
substitution recorded), then implementation in layer order with one Opus `implementer` per package
unit, consumers proving against the dependency's built tarball staged with `npm install --no-save`
and recorded in `fix/tarballs.json` (`instruments/pack-dep.sh`, `stage-dep.sh`, `restore-dep.sh`),
an `orkestrel-falsify` audit per unit, and the independent gate sweep (`instruments/fleet-gates.sh`).
Publishing stays held: every consumer's committed state names the registry range it still declares
beside the tarball it proved against, and the wave re-pins layer by layer when the user releases.
The all-succeed and kind-purity rulings are closed: workspace (s17-37), terminal, tool (s18-06),
and html (s08-06 plus the `isEmptyElement` residue) all landed under them.

### Fix round 1 closed (2026-09-01)

Workflow `wf_a88c02f6-538` finished with every writer unit returned (47 of 47, no errors after the
resume). Every unit is tripwired for surface removals, committed on its package's campaign branch
as "Apply the verified src-audit fixes", and pushed; the reports sit under `fix/reports/`. The
disposition tally from `instruments/workorder.mjs` over the 48 report files (2026-09-01): applied
311, deferred as breaking 158, deferred to the TSDoc wave 21, already resolved 2. The regenerated
`fix/work-order.md` carries 161 rows (the deferred rows plus the referral-derived extras) grouped
by layer, and is the input ledger for the breaking phase.

### Breaking ledger and blast radius, L0 and L1 (2026-09-01)

The Cursor Grok bench distilled the L0 and L1 rows (`fix/breaking-ledger-L0L1.json`, journal
`tmp/cursor/breaking-ledger-L0L1.log`, exit 0, report retained as
`fix/breaking-ledger-L0L1-report.md`). The chunk omitted three rows — sse s18-04, ndjson s18-03,
budget s18-19 — which the Orchestrator filled from the dossiers with the symbols verified by
search, marked as fill-ins in the records. `instruments/radius.mjs` computes each row's consumer
candidates over `src/`, `tests/`, `app/`, and the consumer's own guide; its first form counted
the vendored dependency guide mirrors and reported every package as a consumer of every contract
symbol, corrected to count only the consumer's own guide. Controls after the correction: the
contract-internal spine `schemaNodeToShape` reports no external consumer, and `createContract`
reports brief, csv, database, guide, html, markdown, queue, template, toolbox, and workflow.
Coverage: a word-boundary text search over files importing the owning package, so a member
rename with a common name (`describe`, `states`, `token`, `value`, `keys`) over-reports; the list
bounds which consumers a unit visits, and the compiler against the staged tarball is the proof of
consumption. It cannot under-report a consumer that imports the package by its published
specifier, and it does not see a consumer that reaches a symbol through a re-export or a dynamic
import (none exist under the barrel law).

### Breaking ledger, L2 to L6 (2026-09-01)

The L2 chunk returned every row (`fix/breaking-ledger-L2.json`; two referral rows carried the
work order's `referral` prefix after normalization) and the L3 chunk returned every row
(`fix/breaking-ledger-L3.json`). The L4–L6 chunk, launched by the serial chain the moment L3
finished, returned an empty journal with exit 1 and no output. Per `.agents/orchestration.md`
§ Bench laws the lane was re-probed before ruling: a bounded round trip through the same CLI
answered `GROK-LIVE` (exit 0), so the empty lane reads as starvation or a transient launch
failure rather than a dark bench, and the lane re-ran alone. Each chunk's open naming questions
sit under `Unknowns` in `fix/breaking-ledger-<chunk>-report.md` for the design round to rule on.

### Breaking ledger complete (2026-09-01)

The L4–L6 chunk returned on its third launch (`fix/breaking-ledger-L4L6.json`; the two empty
lanes before it left no stderr once captured, so the failure mode stays unattributed beyond
"the CLI exited 1 with no output"). The merged `fix/breaking-ledger.json` now carries one verified
record per work-order row, and `fix/breaking-radius.json` maps each row's consumer candidates.
The fix-round audit reconciliation is written in `fix/audit-1-verdict.md` with a carrier for every
retained finding in `fix/audit-findings.json`, which the breaking unit briefs load; the five
packages whose lanes are still running (msg, qualifier, program, csv, form) receive their rulings
when they return.

### Breaking-phase design round launched (2026-09-01)

Workflow `wf_45980be9-63e` runs the adversarial design pass on `fix/breaking-design-brief.md`: a
subjective lane and an objective lane, each a `planner` role on Claude Opus 5 with a clean
context, blind to each other, with the Sol substitution recorded. Each returns the planner shape
(design, alternatives, units with role and engine, refusals, tensions, risks) as data; the
Orchestrator reconciles them into the plan, the routing ledger, and the exit criterion before any
breaking unit dispatches.

### Fix round 1 audit reconciled (2026-09-01)

Both audit rounds returned every lane (`wf_fb4a8aaa-e90` and `wf_e17268d6-07a`). The
Orchestrator reproduced each sharp refutation against the trees before ruling, and
`fix/audit-1-verdict.md` carries a ruling per package with the lanes' reports left unedited. Every
retained finding has a carrier in `fix/audit-findings.json`; the breaking unit for that package
loads them as its AUDIT_FINDINGS row, and the two packages with retained findings and no breaking
rows (queue, probe's observation aside) ride a prose fix-up unit. Dismissed on the record: the
checker's merge-commit refutations for contract (the merge is the reconciliation with the user's
release, not the unit), and the html third-person rewrite objection (the fix brief's voice rule
governed the touched block).

## Breaking phase — W0 (2026-09-01)

- **Plan reconciled** (`fix/breaking-plan.md`, commit `3f7d32c`): both design lanes read in full and
  every disagreement ruled; naming and shape rulings fixed per row (`fix/rulings.json` feeds every
  unit brief); refusals recorded with their rule text; the tally extension in `program`,
  `middleware`, `msg`, and `pool` recorded as a finding for the next change and not taken.
- **Catalog regenerated** (`units/catalog-report.md`, commit `0688c45`): contract `0.0.15`, process
  `0.0.9`, layer column unchanged; the contract and process guide mirrors refreshed from the
  registry.
- **Harness measured** (`units/harness-report.md`, commit `2d8df50`): a second
  `npm install --no-save` reverts the tarball an earlier one staged, so every consumer is staged
  with its whole @orkestrel closure in one command (`stage-closure.sh`); the closure from branch
  tips collapses the nested contract copies and `worker` typechecks green (it joins L4); the
  negative control of `verify-stage.mjs` reddens on the first differing file.
- **Vocabulary landed** (`units/vocabulary-report.md`, commit `766c3dc`): the prefix vocabulary in
  one home and the external-mirror rule with its never-licensed-word companion; quoted into every
  later brief through `fix/vocabulary.md`. Scaffold's vendored host surface moved: a scaffold bump
  is owed at the next release.
- **Findings carried to `scaffold-adopt` (L3):** `tests/src/core/fixtures/app-only-toolchain.txt:2`
  still pins contract `^0.0.13` while the manifest declares `^0.0.15`, failing
  `compilers.test.ts` at HEAD; `dist/host` predates the catalog regeneration and the vocabulary
  edit, so `readHostFloor` tests fail until `npm run build` runs (the ordinary chain builds first).
- **Bench:** `codex` absent from `PATH`; Sol dark; Opus holds every lane, told the writer's engine is
  its own; re-probed at each wave boundary.

## Breaking phase — W0 closed, W-DEV in progress (2026-09-01)

- **Vocabulary unit closed applied** after five audit rounds (`units/vocabulary-audit-verdict.md`):
  the prefix list has one home in § Standalone helpers; `describe*` and `render*` are disjoint by
  input; `build*` is neither a factory nor a combinator named for its constituents; `create*` is
  the factory form with `architecture.md` § Kind purity deciding what a factory is and where it
  lives; `*Of` is the combinator named for its constituents; § Fixed derivation/construction forms
  opens with "a form's contract binds a new name" and routes the retained exceptions to § Kind
  purity; the external-mirror rule and its never-licensed-word companion stand in § General
  vocabulary. Final text quoted in `fix/vocabulary.md` for every later brief. The `rgba` target
  moved from `resolveColor` to `parseCSSColor` under the landed text.
- **Findings for the next change:** define `entity` in `architecture.md` § Kind purity where "a
  function returning a live entity" is stated; a renamed interface member ships a stale guide
  sentence with parity green (every unit brief now carries a prose sweep).
- **test unit closed applied** (`units/test-audit-verdict.md`): commits `2f94b93`, `30f6211`,
  `4b86f16` in `/home/user/fleet/test`; every gate green on the verifier's run.
- **canon-tests closed applied** (commit `1eb39f0`): `.claude/rules/tests.md` names the renamed
  browser style helpers.
- **guide unit**: landed (`8eca8dc`), audited (objective `FAIL 2`, subjective `FAIL 5`, checker
  PASS, verifier GREEN), fix round `guide-fixup` in flight on Opus with every ruling in
  `units/guide-fixup-brief.md`.

## Breaking phase — W-DEV closed, L0 open (2026-09-01)

- **guide unit closed applied** after three rounds (`units/guide-audit-verdict.md`): one declaration
  locator (`extractDeclaration` returning body and bases), `Source.methods` reads the first
  declaring file (a head with a body or bases) and follows `extends`, `escapeRegExp` guards every
  interpolated name, `examples(name)` documented as not following `extends`.
- **Fleet adoption** (`units/devadopt-report.md`): every checkout's parity test imports the renamed
  guide helpers (committed and pushed per checkout); the sweep stages each checkout's whole closure
  from committed tips and typechecks it: every checkout green on `check`; `test:guides` red only in
  browser, database, and mcp (extending interfaces whose Methods tables omit inherited members —
  carried to their units in `fix/rulings.json`) and in probe (pre-existing language-server
  instrument failure).
- **Harness defect fixed:** concurrent packs of one package raced on its `dist/`; `pack-dep.sh` now
  locks per package and trips on a tarball without declarations (`5db3ed0`).
- **L0 launched:** contract, msg, sse as Opus implementer units against their staged closures.

## Breaking phase — L0 closed (2026-09-02)

- **contract** applied (`d24e79c` + fix-up `5b0ed57`): spines interned as engine classes,
  `limits`, `INTRINSICS.reflect`, `validateShape`, `build*Faults`, `matchesISOInstant`,
  `expansion: number | undefined`, the cloners' frozen empty-peer pattern; the `canonicalizeValue`
  fold ratified as a pure leaf. Audit: objective `FAIL 3`, subjective `FAIL 3, 5`, checker PASS,
  verifier GREEN; round 2 PASS after the fix-up (`units/contract-audit-verdict.md`).
- **msg** applied (`f58b968`): `category` discriminants, `MSG_CATEGORY_*`, the directory-entry
  type alias removed. All lanes PASS, verifier GREEN.
- **sse** applied (`c6d84e1`): `clear()` replaces `reset()`. All lanes PASS, verifier GREEN.
- **L1 launched** against contract `d24e79c` (surface-identical to the fix-up tip); the L1
  checkouts re-stage the reconciled tip at the L2 boundary.
- Findings for the next change: the s03-22 radius under-scopes the moved Reflect keys (the
  compiler is the scope); the shared per-sample classifier's cause prefix; `SampleMemo` trio kept
  as the walk's own memo.

## Breaking phase — contract main reconciled; L1 in progress (2026-09-02)

- **contract `origin/main` moved** by three unpublished commits (`c13cfae`: canonical array copy,
  refusal-only read diagnostics, compile-time string refinement patterns); unit `contract-merge`
  (Opus) reconciled them into the branch as `2c15840` keeping both intents (main's `pattern`
  argument on `buildStringFaults`, `INTRINSICS.reflect.members` in main's fast path, the derived
  composition test replacing the branch's census literal); objective lane PASS, verifier GREEN
  (`units/contract-merge-audit-verdict.md`). Merge base is now `c13cfae`; consumers re-stage
  `2c15840` at the L2 boundary.
- **L1 so far:** budget applied and accepted (`ff2659b`); html applied and accepted (`1cec0f4` +
  the index sentence fix `bc53632`); csv applied (`f73364d`), objective PASS, checker `FAIL 5`
  (contract comparisons without executed assertions) → fix round in flight; form fix-ups applied
  (`d51fac8`). indexeddb, ndjson, sqlite writers in flight.
- Findings for the next change: contract's `buildStringFaults` guide row carries a pre-existing
  count; csv's tests-mirror drift (leaf describes in `parsers.test.ts`); csv's
  `test:distribution` must run after the registry restore before any publish (module-init proof
  of the parsers ↔ inferers cycle); html's `HTML.ts` import-order residue.

## Breaking phase — L1 closing, L2 opened early (2026-09-02)

- **Accepted in L1:** budget, html (with the index sentence fix), csv (after the executed
  contract-comparison tests), ndjson (with two README fixes). indexeddb and sqlite writers in
  flight; the form fix-ups landed.
- **L2 opened for the eight units whose closures do not depend on indexeddb or sqlite** (console,
  markdown, middleware, process, reason, table, template, websocket), each staged against contract
  `2c15840` and the accepted L1 tips and verified before launch; `database` waits for indexeddb
  and sqlite. The layer order exists for the publish cascade; a unit's own staged closure is what
  its typecheck needs, and every closure the eight units compile against is accepted.

## Breaking phase — L1 closed (2026-09-02)

- **Accepted:** indexeddb (`0e5cf50`, fix-up `bf4730e` for the subjective lane's shape findings)
  and sqlite (`02cabef`, `90d3527`, fix-up `5a9340b` for an inflected test title). Every L1 unit is
  accepted: budget, csv, html, indexeddb, ndjson, sqlite. Tips packed: `indexeddb-bf4730e.tgz`,
  `sqlite-5a9340b.tgz`.
- **Process rule landed:** an old name's inflected forms hide from a bare word-boundary sweep
  (`execs` against `\bexec\b`), so the brief template and the audit claim generator require a
  second, case-insensitive sweep over `-s`, `-ed`, `-ing`.
- **Findings for the next change:** indexeddb's `open` as a state boolean on the database and the
  verb on the store manager, and `context.stores.open(name)` beside `transaction.store(name)`;
  the database's `stores` name list against the context's `stores` manager (stated in the guide,
  not renamed); sqlite's `SQLiteStatementInterface.run` synonym for `execute` and the guide's
  `src/server/sqlite` directory claim.
- **Next:** stage database's closure (contract `2c15840`, indexeddb `bf4730e`, sqlite `5a9340b`,
  plus emitter, guide, html, markdown, test), generate its brief, launch it beside the L2 writers.

## Breaking phase — L2 fix rounds (2026-09-02)

- **Landed and audited in L2 so far:** database (`c7baae0`), console (`a35c93f`), middleware
  (`453f794`), template (`50da0d2`); every checker and verifier lane green; reviewer lanes returned
  findings outside the claims, carried by one fix-up per package (`units/<pkg>-fixup-brief.md`).
- **Ruling reversed by rule authority — template s17-18.** The design ruling dropped the
  no-argument `remove()` overload as an alternation with `clear`. The objective lane showed it
  contradicts `.claude/rules/patterns.md` § Managers § Batch operations as written ("`method(): void`
  … No argument applies to all"), which a brief cannot repeal, and console, interpret, and table
  keep the same `clear` plus `remove()` pair. The rule wins: template restores the overload and
  s17-18 closes refused.
- **Question for the user:** a manager that owns `clear` (reset state, one `clear` event) and the
  batch family's no-argument `remove()` (remove all, one `remove` event per instance) carries two
  remove-all paths. Either the batch rule gains an exception (a manager that owns `clear` declares
  no no-argument form of its batch verb) and console, interpret, table, and template drop
  `remove()` in a successor wave, or the pair stands as two observations of one end state. The
  fleet keeps the pair until you rule.
- **Ruled by the Orchestrator:** middleware injects the rebuild step into `DatabaseSessionStore`
  to break the factories-to-store cycle; `SessionSnapshot.data` → `state`, `transferSessionData`
  → `transferSessionState`, `buildClientInfo` → `buildClient`, and the multipart default constants
  take the grouped `_SIZE` / `_COUNT` names, all before publish so no migration cost lands;
  database's IndexedDB `column.remove` migration fails closed on a non-record value; storage-array
  membership reads `includes`. Console keeps `createCaptureResult` as ruled (both lanes question
  the `create*` form for a function that runs a callback; recorded for the next change).
- **Findings for the next change:** middleware's `Session.set` beside `SessionStoreInterface.set`
  (one word, two operations), `SessionLimits` as a bare `*Limits` name for a partial, the guides
  test mapping no `@orkestrel/console/server` specifier, the `AGENTS §N` citations across guides
  and tests, and the stale vendored mirrors (`guides/indexeddb.md`, `guides/sqlite.md`) that the
  re-pin after publish refreshes.

## Breaking phase — L2 closed, L3 open (2026-09-02)

- **Accepted in L2:** console (`a35c93f`, fix-up `77ab53f`), database (`c7baae0`, `2ded05a`),
  markdown (`9c0dfc7`), middleware (`453f794`, `ec186e4`, `ea723c4`), process (`93555dd`,
  `8aa5dce`), reason (`a42bd0f`, `c363201`), table (`bdd1d7b`, `e270928`), template (`50da0d2`,
  `2eccc62`), websocket (`1f06c29`, `abcf675`). Every tip packed. Middleware re-staged against the
  accepted database, indexeddb, and sqlite tips with no adoption debt.
- **Rulings reversed or reshaped by audit:** template's s17-18 refused under the batch rule (the
  user question on `clear` versus `remove()` stands); websocket's codes name the fault (`LIMIT`,
  `CLOSE`) and its coercers and guards moved to their kind files with the surface unchanged;
  middleware's session store takes its rebuild step by injection, `SessionSnapshot.state`,
  `transferSessionState`, `buildClient`, grouped multipart defaults; database's IndexedDB
  migration fails closed on a non-record value.
- **scaffold-adopt** closed (`4ccd61d`): the fixture pin and the regenerated host digests; no
  console adoption arose. **queue-fixup** satisfied by the earlier prose fix-up.
- **L3 opened:** every L3 closure staged from the accepted tips and verified; nine units running
  (server first; mcp follows server).
- **Findings for the next change** (beyond those in the verdicts): console's `createCaptureResult`
  naming; the guides test mapping no `@orkestrel/console/server`; reason's fences do not execute;
  `AGENTS §N` citations across guides and tests; stale vendored mirrors until the re-pin after
  publish; the voice wave's `@returns` form.

## L3 fix rounds

Accepted this round: qualifier (`a8f71dc`), server (`522ed4c`), rater (`350608e`), sea
(`62b6f40`), relation (`e675bd0`); verdicts under `fix/units/`. Fix-ups dispatched: browser,
terminal, interpret (`implementer`, Opus 5), workspace (`builder`, successor brief
`workspace-fixup-2`), and template (`builder`, `template-fixup-2`). The mcp implementer is
running against `server-b32615d.tgz` and re-stages on `server-522ed4c.tgz` before its audit.

- **Fleet-wide README link.** `README.md` in abort, agent, browser, budget, console, contract,
  csv, database, emitter, indexeddb, interpret, markdown, middleware, msg, ndjson, ollama, pool,
  program, qualifier, queue, router, sea, server, sse, template, timeout, toolbox, websocket,
  worker, workflow, and workspace links `guides/src/<package>.md`, a path no repository has; the
  guide is `guides/<package>.md`. Rater, interpret, browser, and workspace close theirs inside
  their fix-ups. Carrier: the W-END `readme-links` sweep, one `builder` unit deriving its set
  from `grep -l 'guides/src/' /home/user/fleet/*/README.md`.
- **Template batch drift.** `@orkestrel/template`'s `remove(ids)` was all-or-nothing while
  `.claude/rules/patterns.md` § Managers § Batch operations applies to each listed item and
  reports `true` only when all succeed, the reading the workspace guide states. The L2 fix-round
  row naming the template unit as carrier was never carried; `template-fixup-2` carries it now.
  Interpret is template's only fleet dependent and re-stages after its own fix-up.
- **Rater F1 settled.** `@orkestrel/reason` declared `isSubject` as `isRecord` retyped
  (`src/core/validators.ts:259` at `a42bd0f~1`), so rater's swap changed identity and not
  narrowing; the rater report's "now meets `MISMATCH`" observation is false and the verdict
  records the correction.
- **Policy instrument coverage.** `tests/setupPolicy.ts` walks top-level statements while the
  oxlint policy plugin sees inside a class body, so a nested function inside a class is caught by
  one gate and invisible to the other. Carrier: scaffold host inventory, next change.
- **`filter*` prefix.** `.claude/rules/names.md` § Standalone helpers has no row for `filter*`;
  terminal ships `filterEnabled` and `filterDisabled`. Carrier: scaffold `names.md`, next change.
- **Successor rows recorded against the owning package.** Browser: `parseBrowserChord` (a
  throwing `parse*` in `helpers.ts`), `evaluate(expression, timeout?)`'s positional timeout, the
  driver-interface split that would let drive methods leave the consumer contract (the s04-10
  websocket and download half is refused under `documentation.md:46` in the fix-up). Terminal:
  `moveUp` and `redrawPrefix` naming, name enumeration on the manager. Interpret:
  `InterpretEventMap` publishes `add` without `remove`; variable-length aggregates have no
  declarable computation. Rater: `lineDefinition`, `ratingDefinition`, `worksheetStep`,
  `worksheetSteps` without the `build*` prefix; the `Worksheet` row's outcome sentence.
  Workspace: a snapshot persisted by 0.0.6 or earlier holding a binary file reads as absent after
  the `data → base64` rename (no shim, `AGENTS.md` § Design laws); the fix-up commit message
  records it.
- **Middleware re-staged on `server-522ed4c.tgz`** (`instruments/restage-middleware.sh`, log
  `restage-middleware.log`): stage exit 0 with every closure row OK, `npm run check` exit 0,
  `npm test` exit 0. The tip `aa8646a` stands; the L4 closures read it from there.
- **Workspace and template fix-ups landed.** Workspace at `e564c2d` (each empty-batch pin red
  under its own seed; verdict written). Template at `8fdc167` (`template-fixup-2`; the L2 verdict
  carries an addendum). Interpret re-stages on `template-8fdc167.tgz` when its fix-up lands, and
  `l3-standing.txt` names the new template tip for any later L3 re-brief.
- **mcp lanes.** Both lanes ratified the `serveMCP` and `serveMCPScope` merge into
  `createScopeServer(options, scope?)` and refused the strict `createMCPTransport` form for the
  server adapter (the slot is `createMessagePortTransport`'s and the function adapts rather than
  constructs); the s01-11 ruling is amended to `createDuplexServerTransport`, the mirror of
  `createDuplexClientTransport`. Successor rows recorded against mcp: publish
  `createHTTPClientTransport` once from core and drop the two identical face delegates;
  `createScopeMessageListener` returns a function and sits in `factories.ts` under the s01-03
  ruling (`buildScopeMessageListener` in a restored `helpers.ts` if repaired);
  `MCPSessionOptions` and `MCPSessionMiddlewareOptions` share `ttl` and `capacity` with different
  meanings and only `capacity` forwards (group the entity's knobs under a `session` key); the bare
  `ScopeInterface` beside `cacheScope`; `guides/README.md:58` names `openStream` for the vendored
  `guides/server.md` mirror until the re-pin. Browser's, terminal's, interpret's, and workspace's
  successor rows are in their verdicts.

## L4 open

- **Staging harness followed no peer dependency.** `stage-set.mjs` built a consumer's closure
  over runtime and development dependencies only, so a package reached through a peer resolved to
  the registry copy: probe consumes mcp, mcp declares `@orkestrel/server` and `@orkestrel/router`
  as peers, and probe's nested `@orkestrel/server@0.0.17` lacked `createStream`, which
  `mcp-51775d1.tgz` imports, so probe's test gate went red on module load while `npm run check`
  stayed green. The builder now follows `peerDependencies` transitively beside `dependencies`; a
  scan over every consumer in `tarballs.json` (49 rows) found only probe missing members (router,
  server). Only mcp and middleware declare peers in the fleet, and middleware stages server and
  database as direct dependencies. Probe re-stages with the corrected closure before its
  adopt-when-red reading.
- **L4 adopt-when-red readings on the accepted tips.** worker: check 0, test 0 (106 src). queue:
  check 0, test 0 (151 src). lsp: check 0, test 0 (159 src). probe: pending the re-stage.
