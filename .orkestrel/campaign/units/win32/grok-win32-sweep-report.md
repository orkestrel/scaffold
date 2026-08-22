**Scope swept:** every `.ts` file under `tests/**` and `src/**`. Grep also touched `configs/**` and `vite.config.ts` where spawn/platform leaked; those are noted only when they are not hits.

Confirmed `TMPDIR` override is not re-derived. Siblings below.

---

### Hits

| path:line | class | win32 consequence | gated? |
| --- | --- | --- | --- |
| `tests/src/server/helpers.test.ts:1262–1275` (and `1268`) | `TMPDIR` / `TEMP` / `TMP` | For every host probe (`supportsDirectoryLinks`, `supportsFileLinks`, `supportsMode`, `supportsCase`, `supportsBytes`): `process.env.TMPDIR = owned.path` does not steer `os.tmpdir()`, so `expect(tmpdir()).toBe(owned.path)` fails. Residue emptiness is never measured against the owned directory. | no |
| `tests/src/server/helpers.test.ts:1283–1296` | `TMPDIR` / `TEMP` / `TMP` | Same loop: `TMPDIR` pointed at a missing path is ignored, the probe allocates in the real temp dir and returns a boolean, `captureError` is not an `Error`, `code === 'ENOENT'` never runs. | no |
| `tests/src/server/factories.test.ts:212` | POSIX errno pinned as `EISDIR` | `scratch.write('', 'root')` writes onto the allocation directory. Node on win32 reports `EPERM` (sometimes `EACCES`), not `EISDIR`, so `toThrow('EISDIR')` fails. Comment at `210–211` states the POSIX code as if it were universal. | no |
| `tests/src/browser/factories.test.ts:187`, `191–194`, `212–214`, `239` | path separator / exact path `toBe` | `written` / `portfolio.paths` compared to `` `${server.config.root}/tmp/capture/portfolio/…png` ``. Playwright’s `shot.path` is often native `\\`; Vite `root` may already be slash-normalized. Exact equality and `paths` membership go red when the two spellings differ. | no |
| `tests/src/browser/helpers.test.ts:1500` | path separator / exact path `toBe` | `captureFrame` returns the provider path; the case requires `` `${server.config.root}/tmp/capture/frame/page.png` ``. Same mismatch as the portfolio cases. (`1505` only plants a control file; it does not assert provider spelling.) | no |
| `tests/src/server/helpers.test.ts:218–232`, `235–251` | symlink creation | `createLink` for a live directory, with `lstatSync(…).isSymbolicLink()`, is not behind `DIRECTORY_LINKS`. Typical NTFS still passes via the junction fallback in `src/server/helpers.ts:94–111`. A win32 volume that cannot create junctions (`DIRECTORY_LINKS === false`) throws here while the dangling/occupied cases in the same file are skipped. | no |

### Published `src/**` (version decision, not only a test fix)

| path:line | class | win32 consequence | gated? |
| --- | --- | --- | --- |
| `src/browser/factories.ts:136` | path separator | `path: \`${options.directory}/${file}\`` always inserts `/`. Relative POSIX directories stay consistent; an absolute win32 `directory` becomes mixed-separator. That string is what `captureFrame` asks Playwright to write, and what `place` stores. Changing this spelling is a published-path change. | no |
| `src/browser/helpers.ts:1799–1812` | path separator / trailing-separator | Verification slash-normalizes `options.path` and `shot.path`, so the helper itself should not throw on `\\`. It still **returns** `shot.path` unnormalized. Consumers (and the tests above) that compare to a `/`-joined string see host-native spelling. Normalizing the return value is a contract change. | no (internal `replaceAll('\\', '/')` only) |

No `TMPDIR` / `TEMP` / `TMP` **writes** in `src/**`. Allocation uses `os.tmpdir()` (`src/server/factories.ts:34`, probes in `src/server/helpers.ts:526, 560, 588, 614, 640`), which is the correct win32 reader. That is why the residue/allocation proofs are a test-override bug, not a published temp-dir bug.

---

### Swept and not hits (so a writer does not reopen them)

**Env temp.** Only the two `process.env.TMPDIR` blocks above. No `TEMP`/`TMP` reads or writes in `tests/**` or `src/**`.

**Hard-coded OS `/tmp`.** None. Workspace-relative `tmp/capture/…` (browser tests and TSDoc) is the gitignored capture dir, not POSIX `/tmp`. The only POSIX absolute filesystem path in `src/**` is `` `/proc/${pid}/stat` `` at `src/server/helpers.ts:286`, behind `process.platform !== 'linux'` at `282` — correct for win32.

**`process.platform`.**  
- `src/server/helpers.ts:282` — skip `/proc` except Linux: correct.  
- `tests/src/server/helpers.test.ts:151` (win32 cwd hold / `removeTree` retry), `:183` (POSIX cwd removal), `:920` (win32 live-process hold on `destroyScratch`): these match real host removal semantics, not a mistaken skip.

**Capability probes — already used where they matter.**  
- Mode `0700`: `tests/src/server/factories.test.ts:31` uses `POSIX_MODE`. `chmod` in `helpers.test.ts:58–81`, `:882`, `:1327–1343` is the permission-hold probe / stored-bit control, not an ungated `mode & 0o777 === 0o700` assertion.  
- Case: `factories.test.ts:314` uses `CASE_SENSITIVE_FS`. Inventory at `helpers.test.ts:664–671` picks `MIXED` vs `mixed` from `existsSync`.  
- Raw bytes: `factories.test.ts:345` uses `RAW_BYTE_NAMES`.  
- Links: inventory/symlinkSync cases and `describe.runIf(DIRECTORY_LINKS)('link')` in `factories.test.ts` (including `FILE_LINKS` / `!FILE_LINKS` complements) are gated. `createLink` EPERM-rethrow at `helpers.test.ts:287` is `!FILE_LINKS && DIRECTORY_LINKS`.

**Path assertions that use `join` / `sep` / inventory `/` keys.** `resolveContained` vs `join` (`helpers.test.ts:109`), inventory keys after `split(sep).join('/')` in `src/server/helpers.ts:207,227`, `isExcluded` `/` grammar (`:78`) plus tests with `'src/index.ts'`-style keys, `dirname(scratch.path) === resolve(tmpdir())` (`factories.test.ts:941`), `ensure` vs `join` (`:591`). `resolveRoot` (`tests/src/core/helpers.test.ts:746`) asserts `URL.pathname`, which stays `/`-separated on win32 file URLs.

**Spawn / binaries.** `spawn(process.execPath, …)` in `helpers.test.ts:157,189,684,924`. `tests/config.test.ts:716–746` already avoids `node_modules/.bin/oxlint` (POSIX `sh` / win32 `.cmd`) and runs oxlint’s JS entry through `process.execPath`. `tests/setupPolicy.ts:2050` `#!/bin/sh` is fixture text for a skill-policy control, not executed. No `chmod +x`, no `/bin/*` spawn in `tests/**` or `src/**`.

**Adjacent, outside this table:** `configs/browsers.ts` win32 channel layouts and `vite.config.ts` passing `process.platform` into that resolver are win32-aware, not hazards. `tests/config.test.ts:865` `/@fs/${root}` is covered by a drive-letter branch in `configs/helpers.ts:56`.
