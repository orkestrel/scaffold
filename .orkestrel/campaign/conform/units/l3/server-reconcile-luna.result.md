## Question

Map every `CONFIRMED` ruling in `/home/user/work/reports/conform-server.json` against reconciliation rules 1–3. Sweep breaking identifiers across the specified fleet and scaffold paths, excluding `server` and `node_modules`.

## Evidence

### `server-obj-1` — breaking: `false`

- Fold candidate (rule 1): none.
- Off-limits repair (rule 2): none.
- Consumer-only repair (rule 3): none.
- Breaking sweep: none.

### `server-obj-2` — breaking: `false`

- Fold candidate (rule 1): none.
- Off-limits repair (rule 2): none.
- Consumer-only repair (rule 3): none.
- Breaking sweep: none.

### `server-obj-3` — breaking: `false`

- Fold candidate (rule 1): none.
- Off-limits repair (rule 2): `package.json` dependency/version fields — “else codec publishes first and server re-pins” (`/home/user/work/reports/conform-server.json:418-419`).
- Consumer-only repair (rule 3): none.
- Breaking sweep: none.

### `server-obj-4` — breaking: `false`

- Fold candidate (rule 1): none.
- Off-limits repair (rule 2): none.
- Consumer-only repair (rule 3): none.
- Breaking sweep: none.

### `server-obj-5` — breaking: `false`

- Fold candidate (rule 1): none.
- Off-limits repair (rule 2): none.
- Consumer-only repair (rule 3): none.
- Breaking sweep: none.

### `server-obj-6` — breaking: `false`

- Fold candidate (rule 1): none; this is the carrier for `server-subj-3`.
- Off-limits repair (rule 2): none; the repair says to leave `engines` and the build target untouched (`/home/user/fleet/server/README.md:19`, `/home/user/fleet/server/package.json:95-97`).
- Consumer-only repair (rule 3): none.
- Breaking sweep: none.

### `server-obj-7` — breaking: `false`

- Fold candidate (rule 1): none.
- Off-limits repair (rule 2): none.
- Consumer-only repair (rule 3): none.
- Breaking sweep: none.

### `server-obj-8` — breaking: `false`

- Fold candidate (rule 1): none.
- Off-limits repair (rule 2): none.
- Consumer-only repair (rule 3): none.
- Breaking sweep: none.

### `server-obj-9` — breaking: `false`

- Fold candidate (rule 1): none.
- Off-limits repair (rule 2): none.
- Consumer-only repair (rule 3): none.
- Breaking sweep: none.

### `server-obj-10` — breaking: `false`

- Fold candidate (rule 1): none; this is the carrier for `server-subj-7`.
- Off-limits repair (rule 2): none.
- Consumer-only repair (rule 3): none.
- Breaking sweep: none.

### `server-obj-11` — breaking: `false`

- Fold candidate (rule 1): none.
- Off-limits repair (rule 2): none.
- Consumer-only repair (rule 3): none.
- Breaking sweep: none.

### `server-subj-1` — breaking: `false`

- Fold candidate (rule 1): none.
- Off-limits repair (rule 2): none.
- Consumer-only repair (rule 3): none.
- Breaking sweep: none.

### `server-subj-2` — breaking: `false`

- Fold candidate (rule 1): none.
- Off-limits repair (rule 2): none.
- Consumer-only repair (rule 3): none.
- Breaking sweep: none.

### `server-subj-3` — breaking: `false`

- Fold candidate (rule 1): `server-obj-6` — “Land server-subj-3 through this row; do not apply it twice” (`/home/user/work/reports/conform-server.json:438-440`).
- Off-limits repair (rule 2): none.
- Consumer-only repair (rule 3): none.
- Breaking sweep: none.

### `server-subj-4` — breaking: `true`

- Fold candidate (rule 1): none.
- Off-limits repair (rule 2): none.
- Consumer-only repair (rule 3): none.
- Breaking sweep: `requestEncoding`
  - `/home/user/fleet/middleware/guides/server.md:121` — mirror
  - `/home/user/fleet/mcp/guides/server.md:121` — mirror
  - `/home/user/fleet/ollama/guides/server.md:121` — mirror
  - `/home/user/fleet/toolbox/guides/server.md:121` — mirror
  - No source consumer.

### `server-subj-6` — breaking: `false`

- Fold candidate (rule 1): none.
- Off-limits repair (rule 2): none.
- Consumer-only repair (rule 3): none.
- Breaking sweep: none.

### `server-subj-7` — breaking: `false`

- Fold candidate (rule 1): `server-obj-10` — “Land together with server-subj-7 in one unit” (`/home/user/work/reports/conform-server.json:471-472`).
- Off-limits repair (rule 2): none.
- Consumer-only repair (rule 3): none.
- Breaking sweep: none.

### `server-subj-8` — breaking: `false`

- Fold candidate (rule 1): none.
- Off-limits repair (rule 2): none.
- Consumer-only repair (rule 3): none.
- Breaking sweep: none.

### `server-subj-9` — breaking: `false`

- Fold candidate (rule 1): none.
- Off-limits repair (rule 2): none.
- Consumer-only repair (rule 3): none.
- Breaking sweep: none.

### `server-subj-10` — breaking: `false`

- Fold candidate (rule 1): none.
- Off-limits repair (rule 2): none.
- Consumer-only repair (rule 3): none.
- Breaking sweep: none.

### `server-subj-11` — breaking: `false`

- Fold candidate (rule 1): none.
- Off-limits repair (rule 2): none.
- Consumer-only repair (rule 3): none.
- Breaking sweep: none.

## Distillate

- Confirmed ids: `server-obj-1`, `server-obj-2`, `server-obj-3`, `server-obj-4`, `server-obj-5`, `server-obj-6`, `server-obj-7`, `server-obj-8`, `server-obj-9`, `server-obj-10`, `server-obj-11`, `server-subj-1`, `server-subj-2`, `server-subj-3`, `server-subj-4`, `server-subj-6`, `server-subj-7`, `server-subj-8`, `server-subj-9`, `server-subj-10`, `server-subj-11`.
- Rule 1 flagged: `server-subj-3` folds into `server-obj-6`; `server-subj-7` folds into `server-obj-10`.
- Rule 2 flagged: `server-obj-3`, because its conditional re-pin requires `package.json` dependency/version changes.
- Rule 3 flagged: none.
- Breaking sweep: `server-subj-4` renames `requestEncoding`; no source consumer found. Mirror hits are in `middleware`, `mcp`, `ollama`, and `toolbox`.
- Checkouts with source consumers: none.
- Sweep sites not readable: none.

## Unknowns

none

## Journal

Leave for the driver.

## Deviation

none