## Question

Map every `CONFIRMED` refuter ruling against the fixed reconciliation rules and sweep breaking identifiers across the specified fleet paths.

## Evidence

### `router-obj-1` — breaking: true
- Fold candidate: none.
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep — `TypeError` → `ContractError`: source and test hits occur in `console`, `middleware`, `contract`, `msg`, `test`, `server`, `mcp`, `brief`, `html`, `sqlite`, `timeout`, `tool`, `budget`, `indexeddb`, `abort`, `reason`, `rater`, `qualifier`, `program`, `probe`, and `ollama`; guide mirrors hit at `/home/user/fleet/server/guides/router.md:165,180,216`, `/home/user/fleet/middleware/guides/router.md:165,180,216`, `/home/user/fleet/mcp/guides/router.md:165,180,216`, and `/home/user/fleet/ollama/guides/router.md:165,180,216`. No scaffold hit. No source consumer catches the router's `TypeError`. Ruling: `/home/user/work/reports/conform-router.json:476-481`.

### `router-obj-2` — breaking: false
- Fold candidate: none.
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep: not applicable. Ruling: `/home/user/work/reports/conform-router.json:484-489`.

### `router-obj-3` — breaking: false
- Fold candidate: none.
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep: not applicable. Ruling: `/home/user/work/reports/conform-router.json:492-497`.

### `router-obj-4` — breaking: false
- Fold candidate: none.
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep: not applicable. Ruling: `/home/user/work/reports/conform-router.json:500-505`.

### `router-obj-5` — breaking: false
- Fold candidate: none.
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep: not applicable. Ruling: `/home/user/work/reports/conform-router.json:508-513`.

### `router-obj-6` — breaking: false
- Fold candidate: none.
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep: not applicable. Ruling: `/home/user/work/reports/conform-router.json:516-521`.

### `router-obj-7` — breaking: false
- Fold candidate: none.
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep: not applicable. Ruling: `/home/user/work/reports/conform-router.json:524-529`.

### `router-obj-8` — breaking: false
- Fold candidate: none.
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep: not applicable. Ruling: `/home/user/work/reports/conform-router.json:532-537`.

### `router-obj-9` — breaking: false
- Fold candidate: none.
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep: not applicable. Ruling: `/home/user/work/reports/conform-router.json:540-545`.

### `router-subj-1` — breaking: true
- Fold candidate: none.
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep — `RouteEntry`: no source or test consumer. Mirror hits: `/home/user/fleet/server/guides/router.md:116,167`, `/home/user/fleet/middleware/guides/router.md:116,167`, `/home/user/fleet/mcp/guides/router.md:116,167`, and `/home/user/fleet/ollama/guides/router.md:116,167`. No scaffold hit. Ruling: `/home/user/work/reports/conform-router.json:548-553`.

### `router-subj-2` — breaking: true
- Fold candidate: none.
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep — `route` → `defineRoute`: no `defineRoute` hit outside router. `route` source hits occur in `browser`, `console`, `websocket`, `database`, `template`, `middleware`, `process`, `contract`, `test`, `workflow`, `toolbox`, `server`, `ollama`, `mcp`, and `agent`. Test hits also occur in `console`, `process`, `database`, `middleware`, `html`, `timeout`, `contract`, `test`, `indexeddb`, `ndjson`, `msg`, `workspace`, `workflow`, `worker`, `websocket`, `toolbox`, `tool`, `terminal`, `template`, `table`, `sse`, `sqlite`, `server`, `sea`, `mcp`, and `ollama`. Mirror hits occur in `/home/user/fleet/server/guides/router.md`, `/home/user/fleet/middleware/guides/router.md`, `/home/user/fleet/mcp/guides/router.md`, and `/home/user/fleet/ollama/guides/router.md`. README hits occur in `/home/user/fleet/test/README.md:175`, `/home/user/fleet/toolbox/README.md:39`, and `/home/user/fleet/server/README.md:56`. Scaffold hits: `/home/user/scaffold/src/core/shapers.ts:21`, `/home/user/scaffold/tests/src/server/Upstream.test.ts:602,775`, and `/home/user/scaffold/tests/setupPolicy.ts:781,1958,1961,2736,2766`. No source consumer imports `route` from `@orkestrel/router`. Ruling: `/home/user/work/reports/conform-router.json:556-561`.

### `router-subj-4` — breaking: false
- Fold candidate: none.
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep: not applicable. Ruling: `/home/user/work/reports/conform-router.json:572-577`.

### `router-subj-5` — breaking: false
- Fold candidate: none.
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep: not applicable. Ruling: `/home/user/work/reports/conform-router.json:580-585`.

### `router-subj-6` — breaking: false
- Fold candidate: none.
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep: not applicable. Ruling: `/home/user/work/reports/conform-router.json:588-593`.

### `router-subj-7` — breaking: false
- Fold candidate: none.
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep: not applicable. Ruling: `/home/user/work/reports/conform-router.json:596-601`.

### `router-subj-9` — breaking: false
- Fold candidate: none.
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep: not applicable. Ruling: `/home/user/work/reports/conform-router.json:612-617`.

### `router-subj-10` — breaking: false
- Fold candidate: none.
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep: not applicable. Ruling: `/home/user/work/reports/conform-router.json:620-625`.

### `router-subj-11` — breaking: false
- Fold candidate: none.
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep: not applicable. Ruling: `/home/user/work/reports/conform-router.json:628-633`.

### `router-subj-12` — breaking: false
- Fold candidate: none.
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep: not applicable. Ruling: `/home/user/work/reports/conform-router.json:636-641`.

### `router-subj-13` — breaking: false
- Fold candidate: `router-subj-19`; “Note that the last two also carry `§N` markers struck by router-subj-13, so apply that finding's deletion in the same edit.”
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep: not applicable. Ruling: `/home/user/work/reports/conform-router.json:644-649`.

### `router-subj-14` — breaking: false
- Fold candidate: none.
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep: not applicable. Ruling: `/home/user/work/reports/conform-router.json:652-657`.

### `router-subj-15` — breaking: false
- Fold candidate: none.
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep: not applicable. Ruling: `/home/user/work/reports/conform-router.json:660-665`.

### `router-subj-16` — breaking: false
- Fold candidate: none.
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep: not applicable. Ruling: `/home/user/work/reports/conform-router.json:668-673`.

### `router-subj-17` — breaking: false
- Fold candidate: none.
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep: not applicable. Ruling: `/home/user/work/reports/conform-router.json:676-681`.

### `router-subj-18` — breaking: false
- Fold candidate: none.
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep: not applicable. Ruling: `/home/user/work/reports/conform-router.json:684-689`.

### `router-subj-19` — breaking: false
- Fold candidate: none.
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep: not applicable. Ruling: `/home/user/work/reports/conform-router.json:692-697`.

## Distillate

- Confirmed IDs: `router-obj-1`, `router-obj-2`, `router-obj-3`, `router-obj-4`, `router-obj-5`, `router-obj-6`, `router-obj-7`, `router-obj-8`, `router-obj-9`, `router-subj-1`, `router-subj-2`, `router-subj-4`, `router-subj-5`, `router-subj-6`, `router-subj-7`, `router-subj-9`, `router-subj-10`, `router-subj-11`, `router-subj-12`, `router-subj-13`, `router-subj-14`, `router-subj-15`, `router-subj-16`, `router-subj-17`, `router-subj-18`, `router-subj-19`.
- Rule 1 flagged: `router-subj-13`, carried by `router-subj-19`.
- Rule 2 flagged: none.
- Rule 3 flagged: none.
- Rule 4 flagged: `router-obj-1`, `router-subj-1`, `router-subj-2`.
- Source-hit checkouts: `agent`, `browser`, `brief`, `console`, `contract`, `database`, `html`, `mcp`, `middleware`, `msg`, `ollama`, `process`, `probe`, `program`, `qualifier`, `rater`, `reason`, `server`, `sqlite`, `table`, `template`, `test`, `timeout`, `tool`, `toolbox`, `websocket`, `workflow`, plus `scaffold`.
- Actual router API consumers found for breaking identifiers: none.
- Sweep sites that could not be read: none.

## Unknowns

none

## Journal

leave for the driver

## Deviation

none