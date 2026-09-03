## Question

Map every `CONFIRMED` refuter ruling against the reconciliation rules and sweep breaking identifiers outside `sea`.

## Evidence

### `sea-obj-1` — `breaking: false`
Site: `/home/user/fleet/sea/src/server/injectors/Injector.ts:918-940`
- Fold candidate (rule 1): `none` — this is the carrier for `sea-subj-13`.
- Off-limits repair (rule 2): `none`.
- Consumer-only repair (rule 3): `none`.

### `sea-obj-2` — `breaking: false`
Site: `/home/user/fleet/sea/tests/setupServer.ts:358, :363, :561; tests/src/server/seals/SEA.test.ts:17`
- Fold candidate (rule 1): `none`.
- Off-limits repair (rule 2): `none`.
- Consumer-only repair (rule 3): `none`.

### `sea-obj-3` — `breaking: false`
Site: `/home/user/fleet/sea/src/server/assets/AssetManager.ts:1-15`
- Fold candidate (rule 1): `none`.
- Off-limits repair (rule 2): `none`.
- Consumer-only repair (rule 3): `none`.

### `sea-obj-4` — `breaking: false`
Site: `/home/user/fleet/sea/src/server/injectors/Injector.ts:1058-1067, :1232-1251, :1273-1282`
- Fold candidate (rule 1): `none` — this is the carrier for `sea-subj-6`.
- Off-limits repair (rule 2): `none`.
- Consumer-only repair (rule 3): `none`.

### `sea-obj-5` — `breaking: false`
Site: `/home/user/fleet/sea/tests/guides.test.ts:54-170`
- Fold candidate (rule 1): `none`.
- Off-limits repair (rule 2): `none`.
- Consumer-only repair (rule 3): `none`.

### `sea-obj-6` — `breaking: false`
Site: `/home/user/fleet/sea/tests/setupServer.ts:112, :117, :124, :305, :313, :338, :442, :581, :595, :609, :617, :798`
- Fold candidate (rule 1): `sea-obj-2` — “`alignTo4` with `alignELFNoteSize`, per sea-obj-2.”
- Off-limits repair (rule 2): `none`.
- Consumer-only repair (rule 3): `none`.

### `sea-obj-7` — `breaking: false`
Site: `/home/user/fleet/sea/tests/integration.test.ts:1-5, :14-17, :45-54`
- Fold candidate (rule 1): `none`.
- Off-limits repair (rule 2): `none`.
- Consumer-only repair (rule 3): `none`.

### `sea-obj-8` — `breaking: false`
Site: `/home/user/fleet/sea/src/server/seals/SEA.ts:151, :156`
- Fold candidate (rule 1): `none`.
- Off-limits repair (rule 2): `none`.
- Consumer-only repair (rule 3): `none`.

### `sea-obj-9` — `breaking: false`
Site: `/home/user/fleet/sea/src/server/helpers.ts:333-337, :352-356, :475-479, :488-492`
- Fold candidate (rule 1): `none`.
- Off-limits repair (rule 2): `none`.
- Consumer-only repair (rule 3): `none`.

### `sea-subj-1` — `breaking: false`
Site: `/home/user/fleet/sea/src/server/types.ts:237; src/server/assets/AssetManager.ts:53`
- Fold candidate (rule 1): `none`.
- Off-limits repair (rule 2): `none`.
- Consumer-only repair (rule 3): `none`.

### `sea-subj-2` — `breaking: false`
Site: `/home/user/fleet/sea/src/server/seals/SEA.ts:1; types.ts:248, :410; errors.ts:3, :11`
- Fold candidate (rule 1): `none`.
- Off-limits repair (rule 2): `none`; the `package.json` edit removes a keyword, not a dependency or version field.
- Consumer-only repair (rule 3): `none`.

### `sea-subj-3` — `breaking: true`
Site: `/home/user/fleet/sea/src/server/helpers.ts:620, :921`
- Fold candidate (rule 1): `none`.
- Off-limits repair (rule 2): `none`.
- Consumer-only repair (rule 3): `none`.

### `sea-subj-4` — `breaking: true`
Site: `/home/user/fleet/sea/src/server/helpers.ts:54`
- Fold candidate (rule 1): `none`.
- Off-limits repair (rule 2): `none`.
- Consumer-only repair (rule 3): `none`.

### `sea-subj-5` — `breaking: false`
Site: `/home/user/fleet/sea/src/server/injectors/Injector.ts:1442-1444`
- Fold candidate (rule 1): `none`.
- Off-limits repair (rule 2): `none`.
- Consumer-only repair (rule 3): `none`.

### `sea-subj-6` — `breaking: false`
Site: `/home/user/fleet/sea/src/server/injectors/Injector.ts:1058-1067, :1232-1282`
- Fold candidate (rule 1): `sea-obj-4` — “No separate edit: sea-obj-4 declares `ELFProgramHeader` and `PEResourceLeaf` in types.ts with Surface rows.”
- Off-limits repair (rule 2): `none`.
- Consumer-only repair (rule 3): `none`.

### `sea-subj-7` — `breaking: false`
Site: `/home/user/fleet/sea/src/server/seals/SEA.ts:52`
- Fold candidate (rule 1): `none`.
- Off-limits repair (rule 2): `none`.
- Consumer-only repair (rule 3): `none`.

### `sea-subj-8` — `breaking: false`
Site: `/home/user/fleet/sea/src/server/helpers.ts:217-221, :265-269`
- Fold candidate (rule 1): `none`.
- Off-limits repair (rule 2): `none`.
- Consumer-only repair (rule 3): `none`.

### `sea-subj-9` — `breaking: true`
Site: `/home/user/fleet/sea/src/server/assets/AssetManager.ts:62-102`
- Fold candidate (rule 1): `none`.
- Off-limits repair (rule 2): `none`.
- Consumer-only repair (rule 3): `none`.

### `sea-subj-10` — `breaking: false`
Site: `/home/user/fleet/sea/src/server/injectors/Injector.ts:1050-1053, :1317`
- Fold candidate (rule 1): `none`.
- Off-limits repair (rule 2): `none`.
- Consumer-only repair (rule 3): `none`.

### `sea-subj-12` — `breaking: false`
Site: `/home/user/fleet/sea/src/server/seals/SEA.ts:50; injectors/Injector.ts:63; assets/AssetManager.ts:19; assets/Asset.ts:6`
- Fold candidate (rule 1): `none`.
- Off-limits repair (rule 2): `none`.
- Consumer-only repair (rule 3): `none`.

### `sea-subj-13` — `breaking: false`
Site: `/home/user/fleet/sea/src/server/injectors/Injector.ts:918-940`
- Fold candidate (rule 1): `sea-obj-1` — “`sea-obj-1` is the carrier: its deletion of Injector.ts:916-940 removes this comment.”
- Off-limits repair (rule 2): `none`.
- Consumer-only repair (rule 3): `none`.

### `sea-subj-14` — `breaking: false`
Site: `/home/user/fleet/sea/src/server/helpers.ts:77, :217, :1070`
- Fold candidate (rule 1): `none`.
- Off-limits repair (rule 2): `none`.
- Consumer-only repair (rule 3): `none`.

### `sea-subj-15` — `breaking: false`
Site: `/home/user/fleet/sea/src/server/constants.ts:21; helpers.ts:84; types.ts:373`
- Fold candidate (rule 1): `none`.
- Off-limits repair (rule 2): `none`.
- Consumer-only repair (rule 3): `none`.

### `sea-subj-16` — `breaking: false`
Site: `/home/user/fleet/sea/guides/sea.md:178, :182, :199`
- Fold candidate (rule 1): `none`.
- Off-limits repair (rule 2): `none`.
- Consumer-only repair (rule 3): `none`.

### `sea-subj-17` — `breaking: false`
Site: `/home/user/fleet/sea/guides/README.md:27`
- Fold candidate (rule 1): `none`.
- Off-limits repair (rule 2): `none`.
- Consumer-only repair (rule 3): `none`.

### `sea-subj-18` — `breaking: false`
Site: `/home/user/fleet/sea/guides/README.md:18-38`
- Fold candidate (rule 1): `none`.
- Off-limits repair (rule 2): `none`.
- Consumer-only repair (rule 3): `none`.

### `sea-subj-19` — `breaking: false`
Site: `/home/user/fleet/sea/README.md:105; package.json:94-96`
- Fold candidate (rule 1): `none`.
- Off-limits repair (rule 2): `package.json` — “Set package.json `engines.node` to `>=24.8.0`.”
- Consumer-only repair (rule 3): `none`.

### `sea-subj-20` — `breaking: false`
Site: `/home/user/fleet/sea/guides/sea.md:26`
- Fold candidate (rule 1): `none`.
- Off-limits repair (rule 2): `none`.
- Consumer-only repair (rule 3): `none`.

Breaking identifiers swept outside `sea`:

- `sea-subj-3`: `createSignCommand`, `createBlobConfig` — no source consumer.
- `sea-subj-4`: `platformConfig` — no source consumer.
- `sea-subj-9`: `CLIENT_ASSET_KEY_RAW`, `CLIENT_ASSET_KEY_BR` — no source consumer.

No mirror `guides/sea.md` hit occurred outside `sea`.

## Distillate

- Confirmed ids: `sea-obj-1`, `sea-obj-2`, `sea-obj-3`, `sea-obj-4`, `sea-obj-5`, `sea-obj-6`, `sea-obj-7`, `sea-obj-8`, `sea-obj-9`, `sea-subj-1`, `sea-subj-2`, `sea-subj-3`, `sea-subj-4`, `sea-subj-5`, `sea-subj-6`, `sea-subj-7`, `sea-subj-8`, `sea-subj-9`, `sea-subj-10`, `sea-subj-12`, `sea-subj-13`, `sea-subj-14`, `sea-subj-15`, `sea-subj-16`, `sea-subj-17`, `sea-subj-18`, `sea-subj-19`, `sea-subj-20`.
- Rule 1 flagged: `sea-subj-6 → sea-obj-4`; `sea-obj-6 → sea-obj-2`; `sea-subj-13 → sea-obj-1`.
- Rule 2 flagged: `sea-subj-19` on `package.json`.
- Rule 3 flagged: none.
- Source-consumer checkouts: none.
- Sweep sites unread: none. The requested fleet and scaffold source roots were readable; no non-`sea` source or mirror hit occurred.

## Unknowns

The report did not read these paths in full:

- `/home/user/fleet/sea/tests/src/server/injectors/Injector.test.ts`
- `/home/user/fleet/sea/tests/src/server/assets/Asset.test.ts`
- `/home/user/fleet/sea/tests/src/server/factories.test.ts`
- `/home/user/fleet/sea/tests/src/server/validators.test.ts`
- `/home/user/fleet/sea/tests/setup.test.ts`
- `/home/user/fleet/sea/tests/setupServer.test.ts`
- `/home/user/fleet/sea/tests/distribution.test.ts`
- `/home/user/fleet/sea/tests/integration.test.ts`
- `/home/user/fleet/sea/tests/setupServer.ts`
- `/home/user/fleet/sea/tests/setup.ts`
- `/home/user/fleet/sea/tests/config.test.ts`
- `/home/user/fleet/sea/tests/policy.test.ts`
- `/home/user/fleet/sea/tests/setupPolicy.ts`
- `/home/user/fleet/sea/configs/**`
- `/home/user/fleet/sea/guides/contract.md`
- `/home/user/fleet/sea/guides/emitter.md`
- `/home/user/fleet/sea/guides/guide.md`
- `/home/user/fleet/sea/guides/process.md`
- `/home/user/fleet/sea/guides/probe.md`
- `/home/user/fleet/sea/guides/scaffold.md`
- `/home/user/fleet/sea/guides/test.md`

## Journal

Leave for the driver.

## Deviation

none