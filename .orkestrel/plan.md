# Fleet campaign: the contract 0.0.24 and scaffold 0.0.136 wave

## Goal

Move every package in the catalog, and the taverna application, onto `@orkestrel/contract` 0.0.24, `@orkestrel/scaffold` 0.0.136, `@orkestrel/database` 0.0.26, and `@orkestrel/relation` 0.0.24, and move each door the user ruled repairing onto `repairValue`.

## Exit criterion

A registry sweep after the last window lists no `@orkestrel` range, in any catalog package or in taverna, that trails the version the registry serves. Scaffold `ROADMAP.md` items 178, 179, and 181 are each closed or carry their trigger.

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
- The catalog refresh at `a372bc2` predates database 0.0.26, relation 0.0.24, and scaffold 0.0.136.
- Contract 0.0.24 makes `admitValue` strict and adds `repairValue`. Every catalog package that pins contract `^0.0.23` owes a re-pin and a release.
- Next: refresh the catalog in this checkout, then visit the first layer that pins contract `^0.0.23`.

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
| Every catalog package | Contract `^0.0.24` and scaffold `^0.0.136`, the mirrored guides refreshed, and no site that reads `.repairs` or `.value.value` from `admitValue`. | § Contract 0.0.24, the "Every dependent" row |

## Scaffold's own items

- **ROADMAP 181.** In a session whose `SessionStart` hook `scripts/browsers.sh` runs against this checkout, the hook installs the Chromium build the pinned Playwright names. Run the five `discovery.test.ts` titles item 181 lists in that session, and close the item when they pass.
- **ROADMAP 179.** Run the lane's unwritable run-record case on a Linux host as a user other than root.
- **ROADMAP 178.** Steady the lane timing case under host load.
- **Windows.** Run the next scaffold release chain on Windows. In 0.0.136, `TestLaneRun.kill` in `tests/setupServer.ts` resolves on the child's `exit`, and the forced-out holder case in `tests/agents/skills/orkestrel-parallel/scripts/lane.test.ts` waits for the forced-out run's tree to read gone; neither wait has run on Windows.
- **Lane advisories.** Two readings of `readGroup` in `.agents/skills/orkestrel-parallel/scripts/lane.ts` stay unresolved. First, a `/proc` that belongs to another PID namespace than the one the probe signal addresses can read a live group as ended, and the header limit does not name that case; it reopens on a host that mounts such a `/proc`. Second, a `stat` read that races a reap might return `ESRCH` and read the group as present, which fails closed; it reopens on a measured `ESRCH`.

## Taverna

- Taverna takes contract 0.0.24, database 0.0.26, and relation 0.0.24. The database write door refuses a mistyped value and names every fault (database's `.orkestrel/database/dependents.md` § Database, from the coverage wave and the strict write door).
- Taverna's session owes the database campaign the three inputs database's `.orkestrel/database/plan.md` § Open decisions lists:
  - its client pin: the commit, the data slice, and the Node version;
  - its IndexedDB reads, which reopen the residual stops under that plan's § Refused, with triggers;
  - its search requirement, which opens the text wave.

## Sequence

1. Refresh the catalog in this checkout with `scaffold catalog --all`, track each added mirror, build, and run `scaffold surface --from .`; this needs no scaffold release unless a vendored byte moves.
2. Visit each catalog package layer by layer with `wave.ts --visit`, land the package's unit from § Units each package owes, and rule its bump. Open one release window per layer.
3. Close § Scaffold's own items, each in the scaffold release that follows its reading.
4. Taverna adopts the wave in its own session and returns its inputs to the database campaign.
5. Take the registry sweep of the exit criterion, and record the wave in this folder's `release.md`.
