# Fleet campaign: the contract 0.0.24 and scaffold 0.0.137 wave

## Goal

Move every package in the catalog, and the taverna application, onto `@orkestrel/contract` 0.0.24, `@orkestrel/scaffold` 0.0.137, `@orkestrel/database` 0.0.27, and the relation release that re-pins it, and move each door the user ruled repairing onto `repairValue`.

## Exit criterion

A registry sweep after the last window lists no `@orkestrel` range, in any catalog package or in taverna, that trails the version the registry serves. Scaffold `ROADMAP.md` item 178 is closed or carries its trigger.

## Repositories

- Every package in the catalog table of `.claude/agents/orkestrel.md`, between its `orkestrel:catalog` markers, at `https://github.com/orkestrel/<package>`. The table's layer column is the release order; `node .agents/skills/orkestrel-publish/scripts/wave.ts --plan` prints it.
- `@orkestrel/scaffold`, this repository, for the catalog refresh and the items in § Scaffold's own items.
- Taverna, in its own session, per § Taverna.

## Governing skills

- `orkestrel-publish` for each visit, bump ruling, release window, and adoption.
- `orkestrel-harden` for a package whose door moves to `repairValue`.
- `orkestrel-align` for a change that crosses two or more packages.
- `orkestrel-falsify` for each review the size gate in `.agents/orchestration.md` names.

## Standing rulings

- Publish only with a one-time code the user gives in the session, in one `window.ts --publish` call per window covering every release-ready directory, in layer order. A package releases only after the registry serves every range it pins, so a layer whose packages pin the layer before it opens its own window.
- Push a release commit only after the registry serves its version, then fast-forward `main` to it.
- Run timing readings on Node 22 only.
- Write prose once, after the implementation is final, per `AGENTS.md` § Work loop step 6.
- Hold every change to Linux and Windows alike, per `.claude/rules/portability.md`.

## State

- 2026-11-14 to 2026-11-15, the database family campaign published contract 0.0.24 (contract `419be61`), sqlite 0.0.19 (sqlite `b1443ac`), indexeddb 0.0.19 (indexeddb `57eeac4`), database 0.0.25 (database `d717ff2`) and 0.0.26 (database `6ab4e29`), relation 0.0.23 (relation `c2489c1`) and 0.0.24 (relation `9228254`), and scaffold 0.0.136 (`d647970`). Database's `.orkestrel/release.md` records each visit and ruling, and database's `.orkestrel/database/plan.md` records that campaign, its stops, and its triggers.
- Contract, sqlite, and indexeddb carry their scaffold 0.0.136 adoption on their working branches (contract `ef7f2bf`, sqlite `72f0793`, indexeddb `df5d14e`), with no bump owed; each ships with that package's next release.
- The catalog refresh at `7db15bd` writes database 0.0.26, relation 0.0.24, and scaffold 0.0.136 into the table and moves the vendored database guide mirror, so scaffold owes 0.0.137.
- On 2026-11-15 a Windows chain of the tree at `9fa2de7` passed clean, format:check, lint:check, check, build, and the src:core, src:server, src:bin, policy, and config suites; test:setup failed one registry case that compared two live pings, repaired in `c061665`. The skills, guides, templates, and distribution steps run in scaffold's release chain.
- The user closed `ROADMAP.md` items 179 and 181 on 2026-11-15 without a further Linux reading, and centered the wave on contract, scaffold, and the dependents of database and its family; item 178 and the lane advisories wait until that wave closes.
- Contract 0.0.24 makes `admitValue` strict and adds `repairValue`. Every catalog package that pins contract `^0.0.23` owes a re-pin and a release.
- 2026-11-15, layer 1 published and confirmed: abort 0.0.18, budget 0.0.19, codec 0.0.11, emitter 0.0.17, html 0.0.17, jsonrpc 0.0.4, ndjson 0.0.18, test 0.0.40, and timeout 0.0.18; each release commit is pushed. Each owed its release to the contract range alone. Contract 0.0.24 previews a revoked Proxy as `instance`, which moved budget's expectations (budget `6357e2c`).
- 2026-11-15, layer 2 published and confirmed: console 0.0.21, csv 0.0.15, database 0.0.27, form 0.0.19, markdown 0.0.22, msg 0.0.18, pool 0.0.22, process 0.0.20, reason 0.0.19, router 0.0.22, sse 0.0.15, table 0.0.18, template 0.0.15, tool 0.0.24, and websocket 0.0.20. Database 0.0.27 re-pins emitter alone, so the wave's database target is 0.0.27 and relation re-pins it in layer 3. Reason and tool carry their `repairValue` doors.
- The doors of workflow (workflow `1f914a8`), agent (agent `42fea1a4`, `dc5dd1a8`), and toolbox (toolbox `fbcfe10`) are committed, unpushed, ahead of their visits, and reviewed. Agent and toolbox typecheck only after tool, queue, and workspace publish on contract 0.0.24 and their visits re-pin them.
- Scaffold releases once, after layer 7: its catalog vendors each package's guide, and workflow, agent, and toolbox move theirs in layers 4 to 6. Every catalog package then re-pins its scaffold range per § Close the wave in the publish skill's wave reference.
- The database campaign holds taverna's three inputs and its question on the default order (database `bd0cac8`).
- 2026-11-15, layer 3 published and confirmed: capture 0.0.8, guide 0.0.32, interpret 0.0.24, lsp 0.0.16, qualifier 0.0.23, queue 0.0.24, rater 0.0.23, relation 0.0.25, sea 0.0.24, server 0.0.28, terminal 0.0.27, and workspace 0.0.20; relation, queue, terminal, and workspace take database 0.0.27.
- 2026-11-15, layer 4 published and confirmed: brief 0.0.19, mcp 0.0.44, middleware 0.0.33, program 0.0.22, worker 0.0.24, and workflow 0.0.30. Workflow carries its `repairValue` doors. Brief's shapes embed contract 0.0.24's fault union, which moved its emitted types and guide signatures (brief `674e06b`); middleware's refusal names U+007F through contract 0.0.24's escaping preview (middleware `85b2ab6`). Mcp's distribution proof pins earlier fleet releases by design; its release commit records them as standing for mcp's owner.
- 2026-11-15, layer 5 published and confirmed: agent 0.0.45, browser 0.0.34, and probe 0.0.31. Agent carries its `repairValue` re-admissions and states the repair in every built-in and `recall` description (agent `dc5dd1a8`). Browser's five distribution cases that read a `/proc` table or park on a FIFO need a Linux host; its release commit (browser `b683d0a`) records them as unread.
- 2026-11-15, layer 6 published and confirmed: ollama 0.0.39 and toolbox 0.0.34; toolbox carries its `repairValue` door and the strict database tool. Ollama's service proof passed 89 of 89 against a second daemon on 11435, per `ROADMAP.md` item 114.
- 2026-11-15, layer 7 published and confirmed: study 0.0.21.
- 2026-11-15, scaffold 0.0.137 published and confirmed (`7f9465f`), with the catalog refresh (`8dcfdc1`). Its release chain on Windows closes § Scaffold's own items' Windows reading. The release commit was pushed before the registry served the version; the registry served it within the confirm's wait.
- 2026-11-15, the closing round re-pinned scaffold `^0.0.137` and the trailing development ranges in every package from contract to workflow, each ruled dist same, ranges same, with every self-pin hit in a vendored guide mirror or mcp's standing distribution pins; those 40 packages' visit commits are pushed.
- 2026-11-15T13:58Z, a session outside this campaign published process 0.0.21 (process `bd6da48`) outside the wave. Its runtime dependents owe a release in layer order: capture, lsp, and sea in layer 3; mcp in layer 4; browser and probe in layer 5; ollama in layer 6; study in layer 7; then scaffold 0.0.138, whose runtime range and vendored process guide trail. Probe and scaffold are development ranges of every catalog package, so a second closing round follows scaffold 0.0.138. The process visit is rebased onto `bd6da48`.
- Next: release the process cascade layer by layer, run the second closing round, then the registry sweep of the exit criterion.

## Units each package owes

Database's `.orkestrel/database/dependents.md` holds each change in full; this table names the owner and the section.

| Package | Unit | Section of database `.orkestrel/database/dependents.md` |
| --- | --- | --- |
| `@orkestrel/tool` | `Tool.execute` admits through `repairValue`. | § Contract 0.0.24 |
| `@orkestrel/reason` | `SubjectDoor` admits through `repairValue`. | § Contract 0.0.24 |
| `@orkestrel/agent` | Both sites that re-admit built-in tool arguments use `repairValue`. | § Contract 0.0.24 |
| `@orkestrel/workflow` | `admitDefinition` and `admitPatch` use `repairValue`; database `^0.0.26`. | § Contract 0.0.24; § Database 0.0.26 and relation 0.0.24 |
| `@orkestrel/toolbox` | `requireToolCall` admits through `repairValue`; the database tool's `remove` reply reads one boolean; database `^0.0.26` and relation `^0.0.24`. | § Contract 0.0.24; § Database, from the coverage wave and the strict write door; § Database 0.0.26 and relation 0.0.24 |
| `@orkestrel/queue`, `@orkestrel/terminal`, `@orkestrel/workspace`, `@orkestrel/worker` | Database `^0.0.26`. | § Database 0.0.26 and relation 0.0.24 |
| Every catalog package | Contract `^0.0.24` and scaffold `^0.0.137`, the mirrored guides refreshed, and no site that reads `.repairs` or `.value.value` from `admitValue`. | § Contract 0.0.24, the "Every dependent" row |

## Scaffold's own items

- **ROADMAP 178.** Steady the lane timing case under host load.
- **Lane advisories.** Two readings of `readGroup` in `.agents/skills/orkestrel-parallel/scripts/lane.ts` stay unresolved. First, a `/proc` that belongs to another PID namespace than the one the probe signal addresses can read a live group as ended, and the header limit does not name that case; it reopens on a host that mounts such a `/proc`. Second, a `stat` read that races a reap might return `ESRCH` and read the group as present, which fails closed; it reopens on a measured `ESRCH`.

## Taverna

- Taverna takes contract 0.0.24, database 0.0.26, and relation 0.0.24. The database write door refuses a mistyped value and names every fault (database's `.orkestrel/database/dependents.md` § Database, from the coverage wave and the strict write door).
- Taverna's session owes the database campaign the three inputs database's `.orkestrel/database/plan.md` § Open decisions lists:
  - its client pin: the commit, the data slice, and the Node version;
  - its IndexedDB reads, which reopen the residual stops under that plan's § Refused, with triggers;
  - its search requirement, which opens the text wave.

## Sequence

1. Visit each catalog package layer by layer with `wave.ts --visit`, land the package's unit from § Units each package owes, and rule its bump. Open one release window per layer.
2. Publish scaffold 0.0.137 after layer 7 with every guide mirror refreshed, and close § Scaffold's own items, each in the scaffold release that follows its reading.
3. Taverna adopts the wave in its own session and returns its inputs to the database campaign.
4. Take the registry sweep of the exit criterion, and record the wave in this folder's `release.md`.
