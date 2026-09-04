# Publish wave — preparation report

Written 2026-09-04 for the owner's release decision, at the close of the conformance round (`verdict.md`, `VERDICT: PASS`). A Grok 4.6 lane drafted the report from the fourth inventory, the catalog, the publish skill, the roadmap's wave obligations, and every manifest (`units/wave-draft-grok.result.md`); a second lane checked it against the manifests and the registers (`units/wave-draft-checker-grok.result.md`: the versions, the peer edges, and the re-pins confirmed; a sentence citing outside the sources removed, and form's `@orkestrel/probe` range added on its referral; the numbered procedure kept, because the steps are an ordered sequence and `.claude/rules/writing.md` § Structure numbers a list where order matters). The Orchestrator's rulings on the draft's open items close the report. Nothing here publishes: publishing is the owner's decision and credential.

### The round

The inventory of 2026-09-04 records a material `dist/` move for every package it lists, so each of those packages takes a `0.0.x` patch and publishes (`inventory-4.md:3`, `inventory-4.md:59`; bump rule at `.agents/orchestration.md:849` and `.agents/skills/orkestrel-publish/references/wave.md:56-67`). The next version is the declared version with the patch component raised by `1`. A package whose `README.md` file stands still publishes when its `dist/` tree moved (`inventory-4.md:59`).

The following table is the round: catalog layer, declared version, next patch, and the inventory evidence row.

| Package | Layer | Declared | Next | `dist` moved | `README` moved | `changed` | Tip | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `@orkestrel/codec` | `L0` | `0.0.1` | `0.0.2` | true | true | `2` | `93af38e` | `inventory-4.md:12` |
| `@orkestrel/contract` | `L0` | `0.0.15` | `0.0.16` | true | true | `4` | `aae8c4c` | `inventory-4.md:14` |
| `@orkestrel/msg` | `L0` | `0.0.8` | `0.0.9` | true | true | `4` | `db29a1e` | `inventory-4.md:27` |
| `@orkestrel/sse` | `L0` | `0.0.5` | `0.0.6` | true | true | `4` | `483eb60` | `inventory-4.md:44` |
| `@orkestrel/test` | `L0` | `0.0.12` | `0.0.13` | true | true | `10` | `bccbafc` | `inventory-4.md:48` |
| `@orkestrel/abort` | `L1` | `0.0.8` | `0.0.9` | true | true | `4` | `8650d55` | `inventory-4.md:7` |
| `@orkestrel/budget` | `L1` | `0.0.8` | `0.0.9` | true | true | `4` | `e69ac63` | `inventory-4.md:11` |
| `@orkestrel/csv` | `L1` | `0.0.5` | `0.0.6` | true | true | `4` | `0d9e184` | `inventory-4.md:15` |
| `@orkestrel/emitter` | `L1` | `0.0.8` | `0.0.9` | true | true | `4` | `2633dee` | `inventory-4.md:17` |
| `@orkestrel/html` | `L1` | `0.0.7` | `0.0.8` | true | false | `4` | `075ab1a` | `inventory-4.md:20` |
| `@orkestrel/indexeddb` | `L1` | `0.0.9` | `0.0.10` | true | true | `2` | `3f0bc58` | `inventory-4.md:21` |
| `@orkestrel/ndjson` | `L1` | `0.0.8` | `0.0.9` | true | true | `4` | `daed151` | `inventory-4.md:28` |
| `@orkestrel/sqlite` | `L1` | `0.0.9` | `0.0.10` | true | true | `4` | `f180803` | `inventory-4.md:43` |
| `@orkestrel/timeout` | `L1` | `0.0.8` | `0.0.9` | true | true | `4` | `7315d2c` | `inventory-4.md:49` |
| `@orkestrel/tool` | `L1` | `0.0.12` | `0.0.13` | true | true | `4` | `5b70253` | `inventory-4.md:50` |
| `@orkestrel/console` | `L2` | `0.0.11` | `0.0.12` | true | true | `10` | `e4a2707` | `inventory-4.md:13` |
| `@orkestrel/database` | `L2` | `0.0.12` | `0.0.13` | true | true | `10` | `4b5087d` | `inventory-4.md:16` |
| `@orkestrel/form` | `L2` | `0.0.4` | `0.0.5` | true | true | `4` | `40b9091` | `inventory-4.md:18` |
| `@orkestrel/markdown` | `L2` | `0.0.12` | `0.0.13` | true | true | `4` | `771fa80` | `inventory-4.md:24` |
| `@orkestrel/middleware` | `L2` | `0.0.18` | `0.0.19` | true | true | `8` | `8364025` | `inventory-4.md:26` |
| `@orkestrel/pool` | `L2` | `0.0.9` | `0.0.10` | true | true | `4` | `21ffb8c` | `inventory-4.md:30` |
| `@orkestrel/process` | `L2` | `0.0.9` | `0.0.10` | true | true | `8` | `8d321dd` | `inventory-4.md:32` |
| `@orkestrel/reason` | `L2` | `0.0.8` | `0.0.9` | true | true | `4` | `1321747` | `inventory-4.md:37` |
| `@orkestrel/router` | `L2` | `0.0.12` | `0.0.13` | true | true | `10` | `915088e` | `inventory-4.md:39` |
| `@orkestrel/table` | `L2` | `0.0.3` | `0.0.4` | true | true | `4` | `46a7b53` | `inventory-4.md:45` |
| `@orkestrel/template` | `L2` | `0.0.5` | `0.0.6` | true | true | `4` | `74c01ff` | `inventory-4.md:46` |
| `@orkestrel/websocket` | `L2` | `0.0.10` | `0.0.11` | true | true | `4` | `1b56037` | `inventory-4.md:52` |
| `@orkestrel/browser` | `L3` | `0.0.14` | `0.0.15` | true | true | `8` | `6206f6d` | `inventory-4.md:10` |
| `@orkestrel/guide` | `L3` | `0.0.15` | `0.0.16` | true | true | `4` | `a8caefd` | `inventory-4.md:19` |
| `@orkestrel/interpret` | `L3` | `0.0.11` | `0.0.12` | true | true | `4` | `c3b95fc` | `inventory-4.md:22` |
| `@orkestrel/lsp` | `L3` | `0.0.5` | `0.0.6` | true | true | `8` | `00106db` | `inventory-4.md:23` |
| `@orkestrel/mcp` | `L3` | `0.0.27` | `0.0.28` | true | true | `10` | `cd631bb` | `inventory-4.md:25` |
| `@orkestrel/qualifier` | `L3` | `0.0.12` | `0.0.13` | true | true | `4` | `79e7086` | `inventory-4.md:34` |
| `@orkestrel/queue` | `L3` | `0.0.11` | `0.0.12` | true | true | `4` | `113e374` | `inventory-4.md:35` |
| `@orkestrel/rater` | `L3` | `0.0.12` | `0.0.13` | true | true | `4` | `a61a457` | `inventory-4.md:36` |
| `@orkestrel/relation` | `L3` | `0.0.10` | `0.0.11` | true | true | `4` | `4103d30` | `inventory-4.md:38` |
| `@orkestrel/scaffold` | `L3` | `0.0.60` | `0.0.61` | true | true | `49` | `7f47c023` | `inventory-4.md:40` |
| `@orkestrel/sea` | `L3` | `0.0.13` | `0.0.14` | true | true | `4` | `c20c9a6` | `inventory-4.md:41` |
| `@orkestrel/server` | `L3` | `0.0.17` | `0.0.18` | true | true | `4` | `10b489b` | `inventory-4.md:42` |
| `@orkestrel/terminal` | `L3` | `0.0.13` | `0.0.14` | true | true | `8` | `0ce9a02` | `inventory-4.md:47` |
| `@orkestrel/workspace` | `L3` | `0.0.6` | `0.0.7` | true | true | `4` | `fe0bfc4` | `inventory-4.md:55` |
| `@orkestrel/brief` | `L4` | `0.0.6` | `0.0.7` | true | true | `4` | `71d12f8` | `inventory-4.md:9` |
| `@orkestrel/probe` | `L4` | `0.0.11` | `0.0.12` | true | false | `9` | `cc54d40` | `inventory-4.md:31` |
| `@orkestrel/program` | `L4` | `0.0.11` | `0.0.12` | true | true | `4` | `be4e5a3` | `inventory-4.md:33` |
| `@orkestrel/worker` | `L4` | `0.0.10` | `0.0.11` | true | true | `8` | `f3b14c3` | `inventory-4.md:53` |
| `@orkestrel/workflow` | `L4` | `0.0.16` | `0.0.17` | true | true | `10` | `affe372` | `inventory-4.md:54` |
| `@orkestrel/agent` | `L5` | `0.0.19` | `0.0.20` | true | true | `4` | `b5f826b` | `inventory-4.md:8` |
| `@orkestrel/ollama` | `L6` | `0.0.13` | `0.0.14` | true | true | `4` | `c3c8c05` | `inventory-4.md:29` |
| `@orkestrel/toolbox` | `L6` | `0.0.11` | `0.0.12` | true | true | `8` | `4dd0983` | `inventory-4.md:51` |

Declared versions match the local `version` field and the catalog `Version` column (`.claude/agents/orkestrel.md:48-97`; each `/home/user/fleet/<pkg>/package.json` file; `/home/user/scaffold/package.json:3`). Bump from what the registry serves, not from the local `version` field (`.agents/skills/orkestrel-publish/references/wave.md:82-85`). The `@orkestrel/scaffold` package ships the `dist/src` surface and the `dist/host` surface (`package.json:22-27`; `.agents/orchestration.md:866-870`).

The `@orkestrel/supervisor` package appears in the catalog at `0.0.1` in the `L5` layer (`.claude/agents/orkestrel.md:86`) and has no inventory row and no `/home/user/fleet/supervisor/package.json` file. It is not in this round.

### The order

The catalog `Layer` column is the publish round (`.agents/orchestration.md:855-858`; `inventory-4.md:59-67`):

- `L0`: codec, contract, msg, sse, test
- `L1`: abort, budget, csv, emitter, html, indexeddb, ndjson, sqlite, timeout, tool
- `L2`: console, database, form, markdown, middleware, pool, process, reason, router, table, template, websocket
- `L3`: browser, guide, interpret, lsp, mcp, qualifier, queue, rater, relation, scaffold, sea, server, terminal, workspace
- `L4`: brief, probe, program, worker, workflow
- `L5`: agent
- `L6`: ollama, toolbox

Prepare the next layer only after the previous layer is on the registry (`.agents/skills/orkestrel-publish/references/wave.md:91-93`). Refresh registry evidence between layers (`.agents/skills/orkestrel-publish/SKILL.md:62`; `.agents/skills/orkestrel-publish/references/wave.md:119-123`).

A `peerDependencies` edge that points at a later layer reorders that consumer: it publishes after that peer, with the peer range re-pinned to the released version.

The `@orkestrel/middleware` package sits in the `L2` layer (`inventory-4.md:26`; `.claude/agents/orkestrel.md:67`) and declares `@orkestrel/server` `^0.0.17` and `@orkestrel/database` `^0.0.12` in the `peerDependencies` field (`middleware/package.json:112-115`). The `@orkestrel/server` package publishes in the `L3` layer (`inventory-4.md:42`). Middleware therefore leaves the `L2` window and publishes after `@orkestrel/server` is on the registry, with `@orkestrel/server` re-pinned to `^0.0.18`. The 2026-08-27 / 2026-08-28 history is the same edge left stale: middleware `0.0.18` pins `@orkestrel/server` `^0.0.16` after server `0.0.17` landed (`.orkestrel/campaign/visit-taverna-report.md:52-76`; `.orkestrel/campaign/conform/ledgers/session-2026-09-03.md:31` records the branch already at `^0.0.17`). The `@orkestrel/database` peer is the `L2` layer, so a delayed middleware prepare also takes `@orkestrel/database` `^0.0.13` after the `L2` window.

The `@orkestrel/mcp` package sits in the `L3` layer with `@orkestrel/router` `^0.0.12` and `@orkestrel/server` `^0.0.17` in the `peerDependencies` field (`mcp/package.json:125-128`). Router is the `L2` layer, so the `L3` prepare re-pins `@orkestrel/router` to `^0.0.13`. Server is the same `L3` layer, so the later-layer rule does not move mcp. Same-window pins keep the resolvable previous range and take a development-only re-pin after the window closes (`.agents/skills/orkestrel-publish/references/wave.md:123`); a re-pinned runtime range is published surface (`.agents/skills/orkestrel-publish/references/wave.md:64`). Whether mcp publishes after server inside the `L3` window with `@orkestrel/server` `^0.0.18`, or keeps `^0.0.17` and re-pins after, is a ruling the sources leave open.

The `@orkestrel/probe` package and the `@orkestrel/test` package peer only on toolchain packages: probe on `oxlint` `^1.80.0`, `typescript` `^6.0.3`, and `vitest` `^4.1.11` (`probe/package.json:116-120`); test on `vitest` `^4.1.11` (`test/package.json:100-102`). Those edges do not reorder the wave.

The `@orkestrel/scaffold` package is the `L3` layer in the catalog (`.claude/agents/orkestrel.md:81`; `inventory-4.md:40`) and sits outside runtime layering because it is a development dependency of every package (`.agents/orchestration.md:860-864`). `ROADMAP.md:118-121` and `ROADMAP.md:290-293` place its publish on its own account before the catalog layers, then each target re-pins `@orkestrel/scaffold` and runs the `scaffold repair` command. A visit that runs before that release uses `scaffold overwrite --offline` (`.agents/skills/orkestrel-publish/references/wave.md:46-51`). That placement is a ruling the sources leave open; see What the owner decides.

Never edit a vendored file inside a target (`.agents/orchestration.md:879-883`; `.orkestrel/campaign/conform/HANDOFF.md:209`).

### Every re-pin

Re-pin every `@orkestrel` range to what the registry serves after the previous layer publishes, then install (`.agents/skills/orkestrel-publish/references/wave.md:86-87`). A runtime `dependencies` bump forces dependents in later layers to re-pin, re-run gates, bump, and republish (`.agents/orchestration.md:836-837`). A `devDependencies` re-pin after a package has already published is a commit to `main` with no bump, unless the published artifact moved (`.agents/orchestration.md:838-847`). A pin in the same window keeps the previous resolvable range until that window closes (`.agents/skills/orkestrel-publish/references/wave.md:123`).

The following table is each consumer's `@orkestrel/*` ranges that change when their targets release. Pins are the local manifests (aligned to the registry caret on 2026-09-03 per `.orkestrel/campaign/conform/ledgers/session-2026-09-03.md:29-31`). After-values are the next patch of that target. Catalog runtime ranges still read older carets (contract `^0.0.13` in `.claude/agents/orkestrel.md:48-97` against `^0.0.15` in the manifests); regenerate the catalog before sequencing (`.agents/orchestration.md:856-858`).

Shared development pins, except where a row names a different set: `@orkestrel/guide` `^0.0.15` → `^0.0.16`, `@orkestrel/probe` `^0.0.11` → `^0.0.12`, `@orkestrel/scaffold` `^0.0.60` → `^0.0.61`, `@orkestrel/test` `^0.0.12` → `^0.0.13`. After the `@orkestrel/scaffold` release, every target that declares that `devDependencies` range re-pins it and runs the `scaffold repair` command (`.agents/orchestration.md:871-874`; `ROADMAP.md:290-293`). The `@orkestrel/scaffold` package does not declare `@orkestrel/scaffold`. The `@orkestrel/test` package does not declare `@orkestrel/test`. The `@orkestrel/guide` package does not declare `@orkestrel/guide`. The `@orkestrel/probe` package does not declare `@orkestrel/probe`.json:68-80`).

| Package | `dependencies` | `devDependencies` (beyond or instead of the shared set) | `peerDependencies` |
| --- | --- | --- | --- |
| codec | — | shared; no self `test` wait: declares `test` `^0.0.12` (`codec/package.json:77-82`) | — |
| contract | — | shared (`contract/package.json:75-78`) | — |
| msg | — | shared (`msg/package.json:78-81`) | — |
| sse | — | `@orkestrel/contract` `^0.0.15` → `^0.0.16`; shared (`sse/package.json:73-79`) | — |
| test | — | `@orkestrel/guide` `^0.0.15` → `^0.0.16`; `@orkestrel/probe` `^0.0.11` → `^0.0.12`; `@orkestrel/scaffold` `^0.0.60` → `^0.0.61` (`test/package.json:85-89`) | toolchain only; unchanged by this wave |
| abort, budget, csv, emitter, html, indexeddb, ndjson, sqlite, timeout, tool | `@orkestrel/contract` `^0.0.15` → `^0.0.16` | shared | — |
| console | `@orkestrel/contract` `^0.0.15` → `^0.0.16`; `@orkestrel/emitter` `^0.0.8` → `^0.0.9` | shared | — |
| database | `@orkestrel/contract` `^0.0.15` → `^0.0.16`; `@orkestrel/emitter` `^0.0.8` → `^0.0.9`; `@orkestrel/indexeddb` `^0.0.9` → `^0.0.10`; `@orkestrel/sqlite` `^0.0.9` → `^0.0.10` | shared | — |
| form | `@orkestrel/contract` `^0.0.15` → `^0.0.16`; `@orkestrel/emitter` `^0.0.8` → `^0.0.9` | `@orkestrel/guide` `^0.0.15` → `^0.0.16`; `@orkestrel/probe` `^0.0.11` → `^0.0.12`; `@orkestrel/scaffold` `^0.0.60` → `^0.0.61`; `@orkestrel/test` `^0.0.12` → `^0.0.13` | — |
| markdown | `@orkestrel/contract` `^0.0.15` → `^0.0.16`; `@orkestrel/html` `^0.0.7` → `^0.0.8` | shared | — |
| middleware | `@orkestrel/abort` `^0.0.8` → `^0.0.9`; `@orkestrel/budget` `^0.0.8` → `^0.0.9`; `@orkestrel/contract` `^0.0.15` → `^0.0.16`; `@orkestrel/timeout` `^0.0.8` → `^0.0.9` | `@orkestrel/database` `^0.0.12` → `^0.0.13`; `@orkestrel/router` `^0.0.12` → `^0.0.13`; `@orkestrel/server` `^0.0.17` → `^0.0.18`; plus shared | `@orkestrel/database` `^0.0.12` → `^0.0.13`; `@orkestrel/server` `^0.0.17` → `^0.0.18` |
| pool | `@orkestrel/emitter` `^0.0.8` → `^0.0.9` | shared | — |
| process | `@orkestrel/contract` `^0.0.15` → `^0.0.16`; `@orkestrel/emitter` `^0.0.8` → `^0.0.9` | shared | — |
| reason | `@orkestrel/contract` `^0.0.15` → `^0.0.16`; `@orkestrel/emitter` `^0.0.8` → `^0.0.9` | shared | — |
| router | `@orkestrel/abort` `^0.0.8` → `^0.0.9`; `@orkestrel/contract` `^0.0.15` → `^0.0.16`; `@orkestrel/emitter` `^0.0.8` → `^0.0.9` | shared | — |
| table | `@orkestrel/contract` `^0.0.15` → `^0.0.16`; `@orkestrel/emitter` `^0.0.8` → `^0.0.9` | shared | — |
| template | `@orkestrel/contract` `^0.0.15` → `^0.0.16`; `@orkestrel/emitter` `^0.0.8` → `^0.0.9` | shared | — |
| websocket | `@orkestrel/emitter` `^0.0.8` → `^0.0.9` | `@orkestrel/contract` `^0.0.15` → `^0.0.16`; plus shared | — |
| browser | `@orkestrel/contract` `^0.0.15` → `^0.0.16`; `@orkestrel/emitter` `^0.0.8` → `^0.0.9`; `@orkestrel/html` `^0.0.7` → `^0.0.8`; `@orkestrel/websocket` `^0.0.10` → `^0.0.11` | shared | — |
| guide | `@orkestrel/contract` `^0.0.15` → `^0.0.16`; `@orkestrel/markdown` `^0.0.12` → `^0.0.13` | `@orkestrel/probe` `^0.0.11` → `^0.0.12`; `@orkestrel/scaffold` `^0.0.60` → `^0.0.61`; `@orkestrel/test` `^0.0.12` → `^0.0.13` | — |
| interpret | `@orkestrel/contract` `^0.0.15` → `^0.0.16`; `@orkestrel/emitter` `^0.0.8` → `^0.0.9`; `@orkestrel/reason` `^0.0.8` → `^0.0.9`; `@orkestrel/template` `^0.0.5` → `^0.0.6` | shared | — |
| lsp | `@orkestrel/contract` `^0.0.15` → `^0.0.16`; `@orkestrel/emitter` `^0.0.8` → `^0.0.9`; `@orkestrel/process` `^0.0.9` → `^0.0.10` | shared | — |
| mcp | `@orkestrel/codec` `^0.0.1` → `^0.0.2`; `@orkestrel/contract` `^0.0.15` → `^0.0.16`; `@orkestrel/emitter` `^0.0.8` → `^0.0.9`; `@orkestrel/process` `^0.0.9` → `^0.0.10`; `@orkestrel/sse` `^0.0.5` → `^0.0.6`; `@orkestrel/tool` `^0.0.12` → `^0.0.13`; `@orkestrel/websocket` `^0.0.10` → `^0.0.11` | `@orkestrel/router` `^0.0.12` → `^0.0.13`; `@orkestrel/server` `^0.0.17` → `^0.0.18`; plus shared | `@orkestrel/router` `^0.0.12` → `^0.0.13`; `@orkestrel/server` `^0.0.17` → `^0.0.18` if that pin is taken in this window |
| qualifier | `@orkestrel/contract` `^0.0.15` → `^0.0.16`; `@orkestrel/emitter` `^0.0.8` → `^0.0.9`; `@orkestrel/reason` `^0.0.8` → `^0.0.9` | shared | — |
| queue | `@orkestrel/abort` `^0.0.8` → `^0.0.9`; `@orkestrel/contract` `^0.0.15` → `^0.0.16`; `@orkestrel/database` `^0.0.12` → `^0.0.13`; `@orkestrel/emitter` `^0.0.8` → `^0.0.9`; `@orkestrel/timeout` `^0.0.8` → `^0.0.9` | shared | — |
| rater | `@orkestrel/contract` `^0.0.15` → `^0.0.16`; `@orkestrel/emitter` `^0.0.8` → `^0.0.9`; `@orkestrel/reason` `^0.0.8` → `^0.0.9` | shared | — |
| relation | `@orkestrel/contract` `^0.0.15` → `^0.0.16`; `@orkestrel/database` `^0.0.12` → `^0.0.13`; `@orkestrel/emitter` `^0.0.8` → `^0.0.9` | shared | — |
| scaffold | `@orkestrel/console` `^0.0.11` → `^0.0.12`; `@orkestrel/contract` `^0.0.15` → `^0.0.16`; `@orkestrel/emitter` `^0.0.8` → `^0.0.9`; `@orkestrel/markdown` `^0.0.12` → `^0.0.13`; `@orkestrel/process` `^0.0.9` → `^0.0.10`; `@orkestrel/template` `^0.0.5` → `^0.0.6` | `@orkestrel/guide` `^0.0.15` → `^0.0.16`; `@orkestrel/html` `^0.0.7` → `^0.0.8`; `@orkestrel/probe` `^0.0.11` → `^0.0.12`; `@orkestrel/test` `^0.0.12` → `^0.0.13` (`package.json:95-108`) | — |
| sea | `@orkestrel/contract` `^0.0.15` → `^0.0.16`; `@orkestrel/emitter` `^0.0.8` → `^0.0.9`; `@orkestrel/process` `^0.0.9` → `^0.0.10` | shared | — |
| server | `@orkestrel/abort` `^0.0.8` → `^0.0.9`; `@orkestrel/codec` `^0.0.1` → `^0.0.2`; `@orkestrel/contract` `^0.0.15` → `^0.0.16`; `@orkestrel/emitter` `^0.0.8` → `^0.0.9`; `@orkestrel/router` `^0.0.12` → `^0.0.13`; `@orkestrel/timeout` `^0.0.8` → `^0.0.9` | shared | — |
| terminal | `@orkestrel/console` `^0.0.11` → `^0.0.12`; `@orkestrel/contract` `^0.0.15` → `^0.0.16`; `@orkestrel/database` `^0.0.12` → `^0.0.13`; `@orkestrel/emitter` `^0.0.8` → `^0.0.9`; `@orkestrel/form` `^0.0.4` → `^0.0.5`; `@orkestrel/sse` `^0.0.5` → `^0.0.6` | shared | — |
| workspace | `@orkestrel/contract` `^0.0.15` → `^0.0.16`; `@orkestrel/database` `^0.0.12` → `^0.0.13`; `@orkestrel/emitter` `^0.0.8` → `^0.0.9` | shared | — |
| brief | `@orkestrel/contract` `^0.0.15` → `^0.0.16`; `@orkestrel/emitter` `^0.0.8` → `^0.0.9`; `@orkestrel/interpret` `^0.0.11` → `^0.0.12`; `@orkestrel/reason` `^0.0.8` → `^0.0.9` | shared | — |
| probe | `@orkestrel/contract` `^0.0.15` → `^0.0.16`; `@orkestrel/emitter` `^0.0.8` → `^0.0.9`; `@orkestrel/lsp` `^0.0.5` → `^0.0.6`; `@orkestrel/mcp` `^0.0.27` → `^0.0.28`; `@orkestrel/queue` `^0.0.11` → `^0.0.12`; `@orkestrel/timeout` `^0.0.8` → `^0.0.9`; `@orkestrel/tool` `^0.0.12` → `^0.0.13` | `@orkestrel/guide` `^0.0.15` → `^0.0.16`; `@orkestrel/scaffold` `^0.0.60` → `^0.0.61`; `@orkestrel/test` `^0.0.12` → `^0.0.13` | toolchain only; unchanged by this wave |
| program | `@orkestrel/contract` `^0.0.15` → `^0.0.16`; `@orkestrel/emitter` `^0.0.8` → `^0.0.9`; `@orkestrel/qualifier` `^0.0.12` → `^0.0.13`; `@orkestrel/rater` `^0.0.12` → `^0.0.13`; `@orkestrel/reason` `^0.0.8` → `^0.0.9` | shared | — |
| worker | `@orkestrel/contract` `^0.0.15` → `^0.0.16`; `@orkestrel/database` `^0.0.12` → `^0.0.13`; `@orkestrel/emitter` `^0.0.8` → `^0.0.9`; `@orkestrel/pool` `^0.0.9` → `^0.0.10`; `@orkestrel/queue` `^0.0.11` → `^0.0.12` | shared | — |
| workflow | `@orkestrel/abort` `^0.0.8` → `^0.0.9`; `@orkestrel/budget` `^0.0.8` → `^0.0.9`; `@orkestrel/contract` `^0.0.15` → `^0.0.16`; `@orkestrel/database` `^0.0.12` → `^0.0.13`; `@orkestrel/emitter` `^0.0.8` → `^0.0.9`; `@orkestrel/queue` `^0.0.11` → `^0.0.12`; `@orkestrel/timeout` `^0.0.8` → `^0.0.9` | shared | — |
| agent | `@orkestrel/abort` `^0.0.8` → `^0.0.9`; `@orkestrel/budget` `^0.0.8` → `^0.0.9`; `@orkestrel/contract` `^0.0.15` → `^0.0.16`; `@orkestrel/database` `^0.0.12` → `^0.0.13`; `@orkestrel/emitter` `^0.0.8` → `^0.0.9`; `@orkestrel/queue` `^0.0.11` → `^0.0.12`; `@orkestrel/timeout` `^0.0.8` → `^0.0.9`; `@orkestrel/tool` `^0.0.12` → `^0.0.13`; `@orkestrel/workflow` `^0.0.16` → `^0.0.17`; `@orkestrel/workspace` `^0.0.6` → `^0.0.7` | shared | — |
| ollama | `@orkestrel/agent` `^0.0.19` → `^0.0.20`; `@orkestrel/budget` `^0.0.8` → `^0.0.9`; `@orkestrel/contract` `^0.0.15` → `^0.0.16`; `@orkestrel/ndjson` `^0.0.8` → `^0.0.9`; `@orkestrel/timeout` `^0.0.8` → `^0.0.9`; `@orkestrel/tool` `^0.0.12` → `^0.0.13` | `@orkestrel/abort` `^0.0.8` → `^0.0.9`; `@orkestrel/router` `^0.0.12` → `^0.0.13`; `@orkestrel/server` `^0.0.17` → `^0.0.18`; `@orkestrel/workspace` `^0.0.6` → `^0.0.7`; plus shared | — |
| toolbox | `@orkestrel/agent` `^0.0.19` → `^0.0.20`; `@orkestrel/contract` `^0.0.15` → `^0.0.16`; `@orkestrel/database` `^0.0.12` → `^0.0.13`; `@orkestrel/form` `^0.0.4` → `^0.0.5`; `@orkestrel/relation` `^0.0.10` → `^0.0.11`; `@orkestrel/server` `^0.0.17` → `^0.0.18`; `@orkestrel/terminal` `^0.0.13` → `^0.0.14`; `@orkestrel/tool` `^0.0.12` → `^0.0.13`; `@orkestrel/workflow` `^0.0.16` → `^0.0.17`; `@orkestrel/workspace` `^0.0.6` → `^0.0.7` | shared | — |

The `files` field is `dist/src` and `README.md` on the fleet packages that declare it; probe also ships `dist/bin` (`probe/package.json:24-28`); scaffold ships `dist/src`, `dist/bin`, `dist/host`, and `README.md` (`package.json:22-27`). The `prepublishOnly` script is `npm run format:check && npm run lint:check && npm run check && npm run build && npm test && npm run test:distribution -- --mode release` on those manifests. The `@orkestrel/browser` script and the `@orkestrel/ollama` script append `npm run test:service` (`browser/package.json` `prepublishOnly` at the grep hit; `ollama/package.json:68`).

### The wave's obligations

Each `ROADMAP.md` § 4 row closes on the condition it names (`ROADMAP.md:286-324`). The following table attaches each row to the procedure step that runs it.

| Obligation | Closes when | Procedure step |
| --- | --- | --- |
| Merge `origin/main` into scaffold, test, and form; re-pack, re-stage, and re-pin before packing (`ROADMAP.md:288-289`; `HANDOFF.md:215-220`) | Those branches contain `main`, then packing uses that tip | **Before packing.** Session 2026-09-03 records test fast-forwarded to `261b350`, scaffold merged, and form merged (`session-2026-09-03.md:18-20`). Form's inventory tip is `40b9091` (`inventory-4.md:18`). |
| Scaffold publishes on its own account; every target re-pins `@orkestrel/scaffold` and runs `repair` so the vendored host — the `names.md` vocabulary, the `tests.md` helper names, and the single-literal `as const` rule landed as `17e00993` — reaches it (`ROADMAP.md:290-293`) | Each target's installed `@orkestrel/scaffold` range names the released version and `repair` has run | **At the visit** (re-pin and `scaffold overwrite` / `repair`, `.agents/skills/orkestrel-publish/references/wave.md:12-17`) **and after scaffold's release.** |
| After the `@orkestrel/guide` re-pin, scaffold `tests/guides.test.ts:132,140` reads `symbol.keyword` (`ROADMAP.md:294-295`) | Those lines read `symbol.keyword` | **After a layer closes** (after guide `0.0.16` is on the registry, at scaffold's guide re-pin). |
| Indexeddb: `scaffold repair` leaves `configs/browsers.ts` matching the published scaffold (`ROADMAP.md:296-297`) | That file matches the published host | **At the visit** (`repair`). |
| Each `lint` script is `oxlint --config .oxlintrc.json --fix .`; the `--deny-warnings` flag stays on `lint:check` (`ROADMAP.md:298-299`) | Every `package.json` `lint` script matches that string | **Before packing / at the visit** (manifest alignment). Manifests that still put `--deny-warnings` on `lint` still need that rewrite. |
| The registry tarball for `@orkestrel/codec` exports `encodeHex`; server re-pins to that release before its own gates and publish (`ROADMAP.md:300-302`) | Server's `@orkestrel/codec` range names the release that exports `encodeHex`, then server gates run | **After a layer closes** (`L0` codec on the registry), **at the visit** of server (`L3` prepare). |
| `npm run test:distribution` exits `0` on lsp and on scaffold on the publishing host (`ROADMAP.md:303-304`) | Those commands exit `0` | **On the publishing host**, inside `prepublishOnly`, outside the window. |
| `npm run test:service` exits `0` on ollama on a daemon host (`ROADMAP.md:305-306`) | That command exits `0` | **On a daemon host.** Ollama's `prepublishOnly` script also invokes `test:service` (`ollama/package.json:68`), so the publishing-host run needs that daemon or a split of that script. |
| Refresh the named vendored guide mirrors from the released guide, byte copy, never a rewrite (`ROADMAP.md:307-318`) | Each named `guides/<pkg>.md` file in each named consumer matches the released bytes | **After a layer closes**, at that consumer's visit, after the source guide's release. |
| Middleware publish notes name the removed `UploadedFileInput` type and the renamed `multipartBoundary` option (`ROADMAP.md:319-320`) | Those names are in the release notes | **At the visit / before packing** (bump notes). |
| Timeout publish notes name `Timeout.id` and `Timeout.ms` as prototype getters (`ROADMAP.md:321-322`) | Those names are in the release notes | **At the visit / before packing.** |
| Worker's bump ruling names `spawnThread` → `createThread`, `dispatch` → `Dispatch`, and `QueueExecution` → `QueueContext` (`ROADMAP.md:323-324`) | The bump ruling carries those names | **At the visit** (bump ruling). |

Restore each unpublished tarball and each registry copy before the quality gates and before any upload (`.agents/orchestration.md:821-824`; `.agents/skills/orkestrel-publish/references/wave.md:40-44`). Fetch and merge the dependency's default branch before packing it (`.agents/orchestration.md:817-820`).

### What runs outside the window

Per layer, outside the upload window (`.agents/skills/orkestrel-publish/SKILL.md:49-50`; `.agents/skills/orkestrel-publish/references/wave.md:80-97`):

1. Visit each repository in that layer (`.agents/skills/orkestrel-publish/references/wave.md:12-38`): re-pin `@orkestrel/scaffold` and install; run `scaffold overwrite` (or `scaffold overwrite --offline` when scaffold has not released); force-verify every `@orkestrel` range against a registry sweep taken after the previous layer published; run the full install; run the mutating `format` script; run the quality gates; compare rebuilt `dist/` against the published tarball for material content.
2. Bump from what the registry serves.
3. Re-pin every `@orkestrel` range to what the registry serves, and install.
4. Sweep the self-pins (`.agents/skills/orkestrel-publish/references/wave.md:99-117`).
5. Run each package's own `prepublishOnly` script to green. The `--ignore-scripts` flag at publish is what keeps that chain out of the window (`.agents/skills/orkestrel-publish/references/wave.md:95-97`).
6. Commit and push before the window opens.

At the window, you (`.agents/skills/orkestrel-publish/references/window.md`):

- Signal that you are at the keyboard, then the login chain starts (`window.md:36-38`; `SKILL.md:51-52`).
- Approve `npm login --browser=false`. The login URL is put on the first line of the message, relayed byte for byte (`window.md:37-47`). Confirm with `npm whoami` (`window.md:24-27`).
- Take the account's one-time code where the account has one, and run `npm publish --ignore-scripts --otp=<code> --browser=false` (`window.md:76-82`). Ask for the code at the moment of the upload (`window.md:81-84`). Never paste a password, an access token, or an auth file (`.agents/orchestration.md:779-782`; `window.md:83-84`).
- Where the account answers with no code, approve the `auth/cli/<id>` URL. That click opens the five-minute window (`window.md:86-90`, `window.md:92-97`). Open the layer with a package, confirm that upload from the registry, then chase the remaining uploads back-to-back (`window.md:97-101`). Click only the URL last in log order (`window.md:104-105`). Never retry a publish that is still waiting for authorization (`window.md:107-110`).
- Read the verdict from the registry, not from an exit code (`window.md:136-149`).

On a Windows host the upload step is operator-driven (`window.md:30-33`).

### What the owner decides

You decide the go. Publishing is your decision and your credential (`ROADMAP.md:116`; `.agents/orchestration.md:779-782`). Nothing in this draft publishes.

You decide each login approval and each upload authorization, in the moment you can click (`window.md:7-8`, `window.md:36-38`).

You decide the path the account answers with: one-time code, or browser `auth/cli/<id>` (`window.md:76-90`).

The rulings that follow settle the items the draft left open; the closing list names what stays with you.

## Rulings on the draft's open items

Ruled by the Orchestrator on 2026-09-04 after the draft returned; each ruling names the source that settles it.

1. **The catalog is current.** Regenerated at 16:12 UTC through the built entry (`node dist/bin/main.js catalog`: `0 written, 12 unchanged, 0 removed`; `50 published`). Its ranges are the registry's as published, so the drift the draft names (contract `^0.0.13` in the table against `^0.0.15` in the manifests) is the branch's unpublished re-pins, and the registry serves the declared versions the inventory used.
2. **Scaffold publishes first, on its own account, before L0** (`ROADMAP.md:118-121`, the plan of record; `.agents/orchestration.md` § Publishing the fleet). Its `dist/host` and its `dist/src` both moved (`inventory-4.md`, the scaffold row), so it takes `0.0.61`, and every target's visit re-pins `@orkestrel/scaffold` to that release and runs the `scaffold repair` command before its own gates.
3. **A peer edge is an ordering edge.** A caret at `0.0.x` is an exact pin and a peer range is published surface, so the same-window rule (`wave.md:119-123`, a runtime pin the registry cannot yet serve) does not cover a peer. Inside the L3 round, server publishes and is registry-confirmed first; middleware and mcp then re-pin `@orkestrel/server` to `^0.0.18` (middleware also `@orkestrel/database` `^0.0.13`, mcp also `@orkestrel/router` `^0.0.13`, from L2) and publish in the second half of the round. Probe, the only runtime dependent of mcp, sits in L4 and follows; toolbox, the only runtime dependent of server, sits in L6.
4. **`@orkestrel/supervisor` is not in this round.** The three-application register (`.orkestrel/campaign/carry.md` § Open with a live unit) carries its bump and publish after its resume unit.
5. **Rebuild after the bump before packing** where published server code reads the package's own manifest: probe (`src/server/helpers.ts`, `src/server/Probe.ts`, `src/server/ProbeServer.ts`, `src/server/types.ts`) and scaffold (`src/server/helpers.ts`, `src/server/Materializer.ts`, `src/core/templates.ts`, `src/core/helpers.ts`). Every other package ships the dist its close-out build produced (`wave.md:68-72`).
6. **Ollama needs a daemon host.** Its `prepublishOnly` script runs `test:service`, which drives an Ollama daemon this container lacks. The owner names the daemon host, or runs ollama's `prepublishOnly` there and the upload proceeds from here with `--ignore-scripts` and that reading recorded. Browser's `test:service` script (`tests/service/browser.test.ts`, a real browser launch) runs on this host, which has Chromium installed.
7. **Form's post-merge proof is closed.** The guide-keyword landing chain ran on the merged tip and read every gate exit 0 with the offline audit clean (`40b9091`, `units/followon/land-guide-keyword-A.log.txt`).
8. **The publishing host reaches the registry.** The tarball fetch of 16:0x UTC (`instruments/published.sh`) pulled every published copy through the proxy, so `test:distribution` runs inside `prepublishOnly` here for scaffold and lsp.
9. **The host is Linux.** The operator-driven Windows upload path applies only where the owner publishes from a Windows machine.

## What stays with the owner

- The go for the wave, per layer, in the order the report states.
- The login path at each window: the one-time code, or the browser `auth/cli/<id>` approval that opens the five-minute window.
- The daemon host for ollama's service suite, or the `--ignore-scripts` upload with the suite run there.
- The prune of the fleet campaign's section of `.orkestrel/campaign/` (the disposition in the closing report), which the Orchestrator deletes only on the owner's word.
