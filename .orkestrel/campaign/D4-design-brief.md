# Unit D4 — design: a fleet-wide duplicate-export gate in scaffold's vendored policy set, and every package guide hosted in scaffold's published host

## Role and engine

This one brief goes, unchanged, to two blind lanes:

- **Subjective lane:** `planner` on Opus 5, a native Claude subagent (read-only tools: Read, Grep,
  Glob). Fill `Design`, `Alternatives`, `Units`, `Tensions`, `Risks`.
- **Objective lane:** `analyst` on GPT-6 Astra (`gpt-6-astra`, the objective engine for this
  campaign, in the Sol seat), reached as a read-only `codex exec` rooted at
  `C:/Users/mikes/WebstormProjects`. Fill `Constraints`, `Refusals`, `Measurements`, `Units`,
  `Tensions`, `Risks`.

Whichever lane you are: perform the assignment directly and spawn nothing. Do not see, guess at,
or reconcile the other lane's answer. Do not hedge toward an imagined consensus. State which lane
you hold in your first line.

## Objective

Return a design — mechanism, placement, vocabulary, units, acceptance criteria — that makes the
following true with the smallest coherent change to `@orkestrel/scaffold`:

1. Every target package's gates fail when an export of its own `src/**` barrels, or a helper
   exported from its own `tests/setup*.ts` modules, carries a name that another `@orkestrel/*`
   package already exports, as read from that package's guide `## Surface` table.
2. The check runs offline in every target, reading the other packages' guides from the installed
   scaffold's published host (`node_modules/@orkestrel/scaffold/dist/host/...`), and in the
   scaffold checkout itself from its own `guides/`.
3. Scaffold hosts every package guide in `dist/host`, so `catalog` can serve a mirror when the
   network is unavailable and the policy check always has the full set.

## What this round decides

The units, their order, their ownership, the rule's name and violation shape, where the hosted
guides live, and how the fleet's existing name collisions are phased in. What you do not name is
not built.

## The user's rulings (verbatim, authoritative over every later item)

On the gate: "Yes, and even nam conflicts across packages too, remember createChannel, and
scaffold has the guides for all packages it should be able to run that check and it should have
all the guides as it's hosted files since it should be able to provide them when access to guides
is offline."

On the trigger for the whole change: "for some reason the agent keeps adding `waitForCondition`
back to `tests/setupBrowser.ts` when it already exists in the orkestrel test package. Make sure
that you and your agents are fully aware of the test and contract packages that orkestrel have and
clean up the work that is done with them."

So a bare-name match across packages is a hit (`createChannel` in `@orkestrel/agent` core and in
`@orkestrel/test`'s browser entry is the user's example), and the hosted guide set is a
requirement, not an option.

## Context

**Evidence (read every file).** Under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/`:

- `G7-scaffold-policy-distillate.md` — how `dist/host` is assembled (`stageHost` over `HOST_PATHS`
  and `CANON_PATHS`, disjoint by prefix, `manifest.json`; `host.json` the committed inventory),
  what `repair` writes, what `catalog` fetches (`{repoBase}/orkestrel/{bare}/refs/heads/{branch}/guides/{bare}.md`),
  how a policy rule is declared and swept (`PolicyRule` union in `tests/setupPolicy.ts`;
  `inspectPolicyWorkspace`; `createPolicyViolation { rule, path, message, line? }`; the live gate
  `expect(inspectPolicyWorkspace(process.cwd())).toEqual([])`), the vendored import law (only
  `node:` and `BASE_DEV_DEPENDENCIES`, which include `@orkestrel/guide` and `@orkestrel/scaffold`),
  and the enumerators `@orkestrel/guide` already ships (`createGuide().surface()` for a guide's
  Surface; `createSource({ module }).surface()` for a barrel, which reads only complete relative
  `export * from './x.js'` rows; `Parity` bijection-checks the two).
- `P6-surface-collisions.txt` — the Orchestrator's measurement of the fleet today (2026-09-15):
  over the 49 guides in `scaffold/guides/` (5033 Surface rows), 113 names appear in more than
  one guide. Read the whole list. Some rows are the same domain implemented twice (`JSONRPC*`
  in `lsp` and `mcp`; `html` and `markdown` share `walkNodes`, `renderHTML`, `parseDocument`;
  `database` and `table` share `TableInterface`, `filterRows`, `sortRows`); some are a
  dependency's type re-exported by a consumer (`contract` and `test` share `Success`, `Failure`,
  `Result`, `JSONValue` — verify which is a re-export before ruling); some are unrelated
  same-name helpers (`createChannel` in `agent` and `test`; `isRecord` in `contract` and `msg`).
- `G6-reuse-sweep-distillate.md` — the duplication that triggered this design.

Then read first-hand (the decision-bearing files):

- `C:/Users/mikes/WebstormProjects/scaffold/src/core/constants.ts` lines 125–205 (`HOST_PATHS`,
  `CANON_PATHS`, the disjointness refusal) and 505–525 (`BASE_DEV_DEPENDENCIES`);
  `src/server/helpers.ts` lines 1200–1240 (`readHostFloor`) and 1490–1650 (`stageHost`);
  `src/server/Upstream.ts` lines 230–280 and 420–500 (`catalog`, `fetch`); `src/bin/CLI.ts`
  lines 289–449 and 780–830 (`audit`, `repair`, `catalog`, `#fetch`, `#publish`);
  `src/server/Materializer.ts` lines 290–400 (`repair`, `mirror`, `catalog`); `host.json`
  (the inventory shape); `src/core/helpers.ts` lines 180–200 (`isDeferredPath`), 380–390
  (`nameToGuide`), 450–465 (`selectHostPaths`).
- `C:/Users/mikes/WebstormProjects/scaffold/tests/setupPolicy.ts` (whole file: the rule union,
  the sweeps, `POLICY_PROSE_EXCLUSIONS`, `POLICY_TESTS_MODULE_GLOB`, `readPolicyCatalog`,
  `inspectPolicyWorkspace`) and `tests/policy.test.ts`; `configs/policy.ts` (the AST rules);
  `tests/src/server/helpers.test.ts` lines 390–470 (the import-law control).
- `C:/Users/mikes/WebstormProjects/guide/src/core/helpers.ts` lines 1085–1120 (`extractExports`),
  1415–1440 (`extractRowSymbol`), 1510–1550 (`extractSurface`); `guide/src/core/sources/Source.ts`
  lines 90–110 and 170–220; `guide/src/core/types.ts` lines 435–470; `guide/src/core/Parity.ts`
  lines 210–235.
- `C:/Users/mikes/WebstormProjects/scaffold/guides/README.md` lines 25–45; `guides/scaffold.md`
  (the sections on `repair`, `catalog`, the host, and policy); `guides/guide.md` § Surface for
  `createGuide`, `createSource`, `Guide`, `Source`.
- `C:/Users/mikes/WebstormProjects/scaffold/.claude/agents/orkestrel.md` lines 40–95 (the catalog
  table: package, version, layer, dependencies).

**Law.** `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; the rule files under
`C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/` — `names.md`, `typescript.md`,
`architecture.md`, `patterns.md`, `tests.md` (§ policy, § "Shared test infrastructure",
§ Condition), `workspace.md` (§ vendored files, the import law), `documentation.md` (mirrors),
`quality.md`, `writing.md`; `.agents/orchestration.md` § "Publishing the fleet" (what a vendored
change obliges) and § "Where campaign artifacts live" ("Prefer a mechanism that recomputes a fact
over a document that records it"); the skill `.agents/skills/orkestrel-align-packages/SKILL.md`.

**Host.** Windows 11. You are read-only. Every path above is absolute. The scaffold checkout is
dirty with two Orchestrator edits (`.claude/rules/tests.md` § Condition; `.agents/templates/brief.md`
Installed primitives row) that ride the same release; treat them as landed.

**Measurements (Orchestrator, 2026-09-15).** P6 as above. `@orkestrel/test` 0.0.14 and
`@orkestrel/contract` 0.0.17 are `BASE_DEV_DEPENDENCIES` members in every target. The scaffold
checkout has no built `dist/host`; `host.json` is committed. `supervisor` has a catalog row and
no `guides/supervisor.md`.

## Unknowns

- Whether `Source.surface()` sees every target's barrel (it reads only `export * from './x.js'`
  rows) — a lane may name the sampling unit; do not assume.
- Whether the `contract`/`test` shared names are re-exports (verify in
  `C:/Users/mikes/WebstormProjects/test/src/core/index.ts` and its `types.ts`) — rule on how a
  re-export is told apart from an independent declaration, because a re-export of a dependency's
  type is not a duplicate.

## The design questions (answer each by number)

1. **Hosting the guides.** Rule between: adding the whole `guides/` tree to `CANON_PATHS` (shipped
   in `dist/host` for reading, never planted in a target — but `HOST_PATHS` already carries
   `guides/guide.md` and `guides/scaffold.md`, and the two lists must be disjoint by prefix);
   adding it to `HOST_PATHS` (planted into every target by `repair`, while `catalog` still owns
   the bytes); a third list with its own staging rule. Rule on the `catalog` fallback: when a fetch
   fails, does `catalog` read the hosted copy, and how does `audit` report a mirror that is older
   than the hosted copy. Rule on `supervisor` (no guide) and on the scaffold checkout's own read
   path (its `guides/` is the source, not the host).
2. **The rule.** Name it (one word, a `PolicyRule` member), its violation shape, and its sweep:
   the subject population (the target's `src/**` barrel exports through `@orkestrel/guide`'s
   `createSource` — or `extractExports` per file, if the barrel enumerator's `export *`-only
   reading is too narrow; and the target's own `tests/setup*.ts` exports, excluding vendored
   setup modules), the comparison population (every hosted guide's Surface column-0 names,
   excluding the target's own guide), the identity (bare name; environment entries ignored),
   and how the sweep reads the guides in a target versus in scaffold itself. State what the
   vendored import law permits the sweep to import.
3. **Phase-in of the 113 existing collisions.** Rule between: fail-closed at once (every target
   with a listed name is red until a rename lands — name what that does to the release wave);
   a hosted ratchet (scaffold's host carries the accepted-collision list; the gate fails only a
   collision not on the list; each scaffold release shrinks the list; state where the list lives
   and who edits it); a per-target allowlist (refuse or accept with reasons). Whichever you pick,
   state the mechanism's home so it recomputes rather than records where it can.
4. **Resolving a collision.** Propose the rule that says which package renames (`createChannel`:
   agent's relay channel or test's console channel; `isRecord`: contract's guard or msg's), and
   the rule for the same-domain pairs (`lsp`/`mcp` JSON-RPC types; `html`/`markdown` walkers;
   `database`/`table` rows): rename, or extract one shared package, or record as accepted with
   a reason. This round proposes the rule; the renames are later units.
5. **Units and order.** For scaffold: the files each unit owns (`src/core/constants.ts`,
   `src/server/helpers.ts`, `src/server/Upstream.ts`, `src/bin/CLI.ts`, `tests/setupPolicy.ts`,
   `tests/policy.test.ts`, scaffold's own tests, `host.json` regeneration, `guides/scaffold.md`,
   `guides/README.md`), the tests that pin each behaviour (including a fixture target with a
   planted collision and a control without one), the release obligation (scaffold bump; every
   target re-pins and runs `repair`), and the order relative to the rest of the campaign. Name
   the role and engine per unit in the `.agents/orchestration.md` vocabulary.
6. **Exit criterion.** The enumerated capabilities whose closure ends this scaffold phase.

## Output

Return the same section shape as D1: the sections your lane owns, numbered answers to the design
questions, a `Units` table (unit, role, engine, owned files, acceptance criteria, dependencies),
and the exit criterion. Cite `file:line` for every factual claim. No process diary.
