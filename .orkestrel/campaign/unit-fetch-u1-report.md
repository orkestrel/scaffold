# Unit fetch-U1 report: the digest chain and the committed inventory, landed

Role `implementer` route `sol`, engine GPT-5.6 Sol, in the scaffold checkout. Briefs:
`unit-fetch-u1-brief.md` plus `unit-fetch-u1-brief-amendment1.md` after the deviation
stop recorded in `unit-fetch-u1-deviation.md`. Resumed and returned 2026-08-22; every
amended criterion green; one recorded standing observation.

## Landed

- `HOST_INVENTORY_PATH` in `src/core/constants.ts`; `ManifestEntry.digest` and its
  contract in `src/server/types.ts`; `hexToDigest`, digest emission in membership
  hashing and staging, and `stageInventory` in `src/server/helpers.ts`; the digest
  requirement in `src/server/validators.ts`.
- The `build:inventory` script and the generated committed `host.json`
  (`host-inventory: entries=108`).
- The staleness gate in `tests/config.test.ts` — `tests/conformance.test.ts` does not
  exist, and the config project already performs cheap root-artifact checks.
- The granted manifest builders in `tests/setupServer.ts` carry digests; rows in
  `tests/src/server/helpers.test.ts` cover hexadecimal hashing, digest membership,
  host emission, and inventory staging; the guide's interface, constant, and helper
  table rows follow.

## Failing-first evidence

- Digest emission: red `1 failed | 156 skipped`, green `1 passed | 160 skipped`.
- Membership negative control green under the same conditions.
- Staleness mutation control: red `1 failed | 42 passed` with
  `Error: The committed host inventory is stale at guides/scaffold.md`, green
  `43 passed` after regeneration; probe restoration digest
  `4BF379B55B649956C310B8E4A6940E9D40D67632B88076B34ECDBA545277CAF8`.

## Gate evidence

`check:src:core` and `check:src:server` exit 0; scoped lint and format exit 0 on U1's
whole-file surfaces; `src:server` project `361 passed | 4 skipped` exit 0; `config`
project `43 passed` exit 0. The observational root typecheck exits 1 only at the
amendment's standing consolidation sites. Recorded standing observation: `oxfmt
--check tests/setupServer.ts` exits 1 on the consolidation's unformatted hunks — not
U1's, boundary preserved.

The cross-engine coverage of U1 arrives with the campaign's audit units after the
verbs land, per the reconciliation's plan.
