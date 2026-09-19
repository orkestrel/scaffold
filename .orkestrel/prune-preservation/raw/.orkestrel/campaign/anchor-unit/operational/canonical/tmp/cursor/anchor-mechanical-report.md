I'll read the brief first, then gather the evidence it asks for.The brief is a read-only mechanical check of the frozen WriteAnchor repair. Next I’ll load the named reports, diffs, and status files.Status and map are in. I’ll read the candidate reports, diffs, and the required contract files next.Reports and diffs are in. Next I’ll check the remaining source.diff, current types/helpers, host.json recipes, and the contract files.I’ll load the remaining contract files, host.json digest lines, and a few targeted searches to close the mechanical facts.Mechanical check of the frozen WriteAnchor repair in `tmp/release/scaffold-0.0.75` at baseline `2f78b38a7c938d7e4f5b5c8f2030385bfcb5d6eb`, plus the successor guide correction. No acceptance verdict.

Live `git status` was not obtained. The brief forbids inventing one after the prior read-only shell denial. Tracked dirt is taken from canonical `../../../../raw/canonical/tmp/audit/anchor-repair-status.txt`.

## Changed paths

Supplied porcelain:

- `guides/scaffold.md`
- `host.json`
- `src/server/helpers.ts`
- `src/server/types.ts`
- `tests/distribution.test.ts`
- `tests/src/server/WriteTransaction.test.ts`
- `tests/src/server/helpers.test.ts`
- untracked `.orkestrel/campaign/capture-recipe-unit/`

Predecessor `../../../../raw/candidate/tmp/units/anchor-repair-evidence/source.diff` covers those tracked paths. Successor `../../../../raw/candidate/tmp/units/anchor-repair-evidence-3/after.diff` replaces only the guide sentence and the two `host.json` digests. `package.json`, lockfile, and `src/server/WriteTransaction.ts` are not in either patch. Shared-file patches: none.

`verify-preservation.mjs` reports source/test sections of `source.diff` still match `preserved-source.diff` (`preservation-file.log.txt`). The inline Node comparison in `preservation.log.txt` is a syntax failure and is not preservation evidence.

## Contract now in the candidate

`WriteAnchor.device` / `inode` are `bigint` (`tmp/release/scaffold-0.0.75/src/server/types.ts:188-192`). Remarks keep location-not-lifetime (`:184-186`).

`readAnchor` calls `lstatSync(path, { bigint: true })` inside existing `attempt` (`helpers.ts:1929-1934`). `matchesAnchor` still compares `device` and `inode` with `===` (`:1961-1963`).

`WriteExpectation.device` / `inode` remain `number` (`types.ts:160-167`). `readExpectation` still uses default `lstatSync(path)` (`helpers.ts:1988-2010`). That surface is outside this repair.

Barrel is unchanged: `src/server/index.ts:1-7` re-exports `types.js` and `helpers.js`. Public names `WriteAnchor`, `WriteDirectoryResult`, `readAnchor`, `matchesAnchor` are the same. Package export `./server` is unchanged (`package.json:46-54`).

## Export / dependency overlap

No new export. No dependency add/remove in the diffs.

Declared/installed, unchanged:

- `@orkestrel/contract` `^0.0.17` / lock `0.0.17` (`package.json:97`, `package-lock.json:171-174`)
- `@orkestrel/test` `^0.0.18` / lock `0.0.18` (`package.json:108`, `package-lock.json:440-443`)
- `@types/node` `^26.5.1` / lock `26.5.1` (`package.json:109`, `package-lock.json:1637-1640`)

`helpers.ts:37` still imports `attempt` (and `isNumber`, unused by anchors). No `isBigInt`. No wrapper around `attempt`. Tests reuse `createScratch` / `requireValue`. Callers remain `WriteTransaction` (`callers.log.txt`).

## Numeric constructor / stale examples

No remaining `device: 1` / `inode: 2` in candidate `src/`, `tests/`, or `guides/`.

The only production `WriteAnchor` object is `{ path, device: status.value.dev, inode: status.value.ino }` from bigint `lstatSync` (`helpers.ts:1934`).

Tests construct `{ ...anchor, device: anchor.device + 1n }` and `{ ...anchor, inode: anchor.inode + 1n }` (`helpers.test.ts:2882-2883`) — bigint arithmetic on a live capture, not numeric literals.

Current examples:

- `helpers.ts:1925-1926` — `readAnchor(process.cwd())` plus `typeof … === 'bigint'`
- `tests/distribution.test.ts:602` — same bigint typeof line
- `helpers.ts:1957-1958` / `distribution.test.ts:598` — `matchesAnchor` untouched path (no numeric fields)

Guide type row still has no field types (`guides/scaffold.md:327`). Helper row is the successor wording (`:411`). Frozen prose: “Directory anchors capture native bigint device and inode values without numeric rounding.” (`:1864`). Lifetime limitation is unchanged (`:1865-1867`). Predecessor `source.diff` still has the wider “The transaction captures…” sentence; `after.diff` is the frozen replacement.

## Helpers / wrappers / nested / suppression / skip / deferral

No new production helper, class, alias, or 1:1 wrapper. `readAnchor` / `matchesAnchor` stay in `helpers.ts`. `attempt(() => lstatSync(path, { bigint: true }))` is an anonymous callback passed directly.

No `@ts-nocheck` / `@ts-ignore` / `@ts-expect-error` / `eslint-disable` under `src/server` or `tests`.

New write-anchor tests have no `it.skip` / `it.todo`. Existing `it.skipIf` rows in `helpers.test.ts` sit outside `describe('write anchors')`.

Added local `const native = lstatSync(...)` inside the establish test loop (`WriteTransaction.test.ts:378-384`) — a test-local value, not a nested function.

Inventory proof gained `toStrictEqual` against `readHostManifest` (`helpers.test.ts:2511`).

## `host.json` digest and recipe rows

Frozen values (`host.json:910-913`, `:2004`):

- `guides/scaffold.md` digest `7c89a20cba178e493d6cb46e517742cf31d12836eb24481a0eb7c96a2f20acad`
- manifest digest `24e8b79f87c0f2d40f9d28aa3637e81174fcad6041cc873c78153e521d554b6d`

Predecessor freeze had `77f67192…` / `39b84f85…`. Baseline had `333f3a02…` / `4aebcf82…`.

`after.diff` changes only those two digest fields. Capture-recipe inventory rows are untouched, including:

- `agents/skills/orkestrel-prove-journey/SKILL.md` → digest `c558fb0a…` (`host.json:232-235`)
- `agents/skills/orkestrel-prove-journey/references/captures.md` → `e36b5640…` (`:244-247`)
- remaining prove-journey reference rows (`:238-271`)
- `claude/skills/orkestrel-prove-journey/SKILL.md` → `b5ab959e…` (`:532-535`)

## Search population

Candidate: `WriteAnchor|readAnchor|matchesAnchor`; `bigint: true`; `lstatSync`; `inode:` / `device:`; `device: 1` / `inode: 2`; `JSON.stringify` / `toJSON`; `isBigInt`; suppressions; `it.skip` / `TODO` in changed tests; `host.json` recipe/prove-journey storage; export barrels; declared/lock `@orkestrel/contract`, `@orkestrel/test`, `@types/node`.

Supplied artifacts: candidate `../../../../raw/candidate/tmp/units/anchor-repair-report.md`, `anchor-repair-report-3.md`, `anchor-repair-evidence/source.diff`, `callers.log.txt`, `anchor-repair-evidence-3/after.diff`, `before.diff`, `preserved-source.diff`, `preserved-hashes.json`, `preservation.log.txt`, `preservation-file.log.txt`, `verify-preservation.mjs`; canonical `../../../../raw/canonical/tmp/cursor/anchor-repair-map-report.md`, `../../../../raw/canonical/tmp/audit/anchor-repair-status.txt`. Affected source/tests/guide/`host.json` as needed. Secrets, `.env*`, `.npmrc`, `.codex/config.toml`, keys, tokens, and original Roughnotes were not read.

## Missing or inaccessible

- Live porcelain `git status` (shell denied). Used `../../../../raw/canonical/tmp/audit/anchor-repair-status.txt`.
- `../../../../raw/candidate/tmp/units/anchor-repair-evidence/lint-check.log.txt` exists and is empty, so the report’s lint exit is not evidenced by that file.
- Whether any consumer outside this repository serializes `WriteAnchor`.
- Whether `dist/` matches these types (`dist/` is gitignored; not in the patches).
- Numeric `WriteExpectation` identity stays an independent capability and was not repaired.