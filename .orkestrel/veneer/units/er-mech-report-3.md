# ER-MECH round 3 report

## Item 1 — the Receipts Platform check (F1)

Added, in `readReceipts` (`tests/setupServer.ts`), a check placed right after the row's `label` is
computed:

```ts
if (platform === ABSENT_CELL || !NODE_PLATFORMS.some((value) => value === platform))
	throw new Error(`${label}: invalid Platform ${platform}`)
```

Unlike `readSupportedHosts`, this refuses `ABSENT_CELL` (`—`) too, because a receipt records the
platform its run read rather than a platform a future run might supply. The TSDoc `@remarks` for
`readReceipts` now states that Platform must name a member of `NODE_PLATFORMS` and can never read
`—`, unlike a Supported host row.

In the scratch-guide case (`reads receipts only within their Hosts subsection and refuses each
malformed cell`, `tests/setupServer.test.ts`), added two rows to the malformed-cell table:

```ts
['`linux`', '`Linux`', 'Receipt row 1: invalid Platform Linux'],
['`linux`', '—', 'Receipt row 1: invalid Platform —'],
```

**Plant.** Deleted the new check (the `if`/`throw` pair and its comment) and ran:

```
npx vitest run tests/setupServer.test.ts -t "reads receipts only within their Hosts subsection and refuses each malformed cell"
```

Result: 1 failed.

```
AssertionError: expected [Function] to throw an error
- Expected:
null
+ Received:
undefined
 ❯ tests/setupServer.test.ts:1344:38
```

**Restore.** Restored the check byte-identically. `sha256sum tests/setupServer.ts` before the
plant and after the restore both read
`a6bd5bbf6970a09b103784e0985891748102a08423ff03c2dcc058758df4e11a`.

## Item 2 — the title (claim 5)

Moved the case `lists the platform this process runs on among the platforms Node reports` out of
`describe('server setup', …)` into its own block placed immediately after that block closes, in
`tests/setupServer.test.ts`:

```ts
describe('NODE_PLATFORMS', () => {
	it('holds the platform this process runs on, and each platform once', () => {
		expect(NODE_PLATFORMS).toContain(process.platform)
		expect(new Set(NODE_PLATFORMS).size).toBe(NODE_PLATFORMS.length)
	})
})
```

The title matches the brief verbatim; the body is unchanged.

## Item 3 — the engine-strict reading (R3)

Copied `tmp/units/erm-2-engines.sh` to `tmp/units/erm-3-engines.sh`, added
`export npm_config_engine_strict=true` to the environment, pointed the scratch packages at
`.../scratchpad/erm3/erm-3-engines-<name>`, and ran it to `tmp/units/erm-3-engines.log.txt`.

Reading, npm 11.19.1, `npm_config_engine_strict=true` (`engine-strict=true` per `npm config get`):

- `engines.node: ">=99"` (excluded): `npm run hello` still runs the script — `exit=0`.
- `devEngines.packageManager: ">=99.0.0"` (excluded): `npm run hello` refuses with `EBADDEVENGINES`
  — `exit=1`.

This matches round 2's reading under the default (non-strict) configuration
(`tmp/units/erm-2-engines.log.txt`): `engines.node` exclusion still ran the script (`exit=0`) and
`devEngines.packageManager` exclusion still refused (`exit=1`). The two readings agree, so the
`guides/veneer.md` § Hosts sentence beginning "npm 11.19.1 refuses to run a script" is left
unchanged: `engine-strict` does not change either outcome for npm 11.19.1.

## Gate table

| Gate | Log | Exit |
| --- | --- | --- |
| `npm run format:check` | `tmp/units/erm-3-format.log.txt` | 0 |
| `npm run lint:check` | `tmp/units/erm-3-lint.log.txt` | 0 |
| `npm run check` | `tmp/units/erm-3-check.log.txt` | 0 |
| `npm run test:setup` | `tmp/units/erm-3-test-setup.log.txt` | 0 |
| `npm run test:guides` | `tmp/units/erm-3-test-guides.log.txt` | 0 |
| `npm run test:policy` | `tmp/units/erm-3-test-policy.log.txt` | 0 |

Changed files (`tests/setupServer.ts`, `tests/setupServer.test.ts`) were formatted with
`./node_modules/.bin/oxfmt --config .oxfmtrc.json <file>` before the gate run.

## Diff and status

- `git diff 873f715` → `tmp/units/erm-3.diff`
- `git status --short` → `tmp/units/erm-3-status.txt`, showing modified `guides/veneer.md`,
  `tests/distribution.test.ts`, `tests/guides.test.ts`, `tests/setupServer.test.ts`, and
  `tests/setupServer.ts` (rounds 1 and 2 plus this round's edits, uncommitted over `873f715`).
