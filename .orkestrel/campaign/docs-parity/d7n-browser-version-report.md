# Report — `d7n-browser-version`

## Items

1. Red-first reading, before the edit:

   ```
   PATH=/opt/npm11/bin:$PATH npx vitest run --project src:core tests/src/core/BrowserHARManager.test.ts -t 'stamps archives'
   ```

   ```
   FAIL  |src:core| tests/src/core/BrowserHARManager.test.ts > BrowserHARManager > stamps archives with the version the manifest declares
   AssertionError: expected '0.0.15' to be '0.0.16' // Object.is equality
   Expected: "0.0.16"
   Received: "0.0.15"
    ❯ tests/src/core/BrowserHARManager.test.ts:23:39
   Test Files  1 failed (1)
        Tests  1 failed | 5 skipped (6)
   ```

   Exit `1`.

2. Hunk applied to `src/core/constants.ts`:

   ```diff
   @@ -186,7 +186,7 @@ export const BROWSER_MOUSE_BUTTON_MASKS: Readonly<Record<BrowserMouseButton, num
    */
    export const BROWSER_HAR_CREATOR = Object.freeze({
      name: '@orkestrel/browser',
   -  version: '0.0.15',
   +  version: '0.0.16',
    })

    /** Names the attribute that tags temporary screenshot styles and masks. */
   ```

   No other byte of the file changed; the doc block above `BROWSER_HAR_CREATOR` is unchanged.

3. Re-run of the same command, after the edit:

   ```
   Test Files  1 passed (1)
        Tests  1 passed | 5 skipped (6)
   ```

   Exit `0`.

## Acceptance criteria

1. `git status --short`:
   ```
    M src/core/constants.ts
   ```
   `git diff --stat`:
   ```
    src/core/constants.ts | 2 +-
    1 file changed, 1 insertion(+), 1 deletion(-)
   ```

2. `grep -n "version: '0.0.16'" src/core/constants.ts`:
   ```
   189:	version: '0.0.16',
   ```
   `node -p "require('./package.json').version"`:
   ```
   0.0.16
   ```

3. `npx oxfmt --check src/core/constants.ts`:
   ```
   All matched files use the correct format.
   Finished in 27ms on 1 files using 4 threads.
   ```
   Exit `0`. `npx oxlint --config .oxlintrc.json --deny-warnings src/core/constants.ts`: no output, exit `0`. `npm run check`: every `tsc --noEmit` step (`tsconfig.json`, `configs/src/tsconfig.core.json`, `configs/src/tsconfig.server.json`) completed with no diagnostics, exit `0`.

4. The item 1 command: exit `1` before the edit (`expected '0.0.15' to be '0.0.16'`), exit `0` after (`Tests  1 passed | 5 skipped (6)`).

5. `PATH=/opt/npm11/bin:$PATH npm run docs`:
   ```
   rows read: 1, disagreements found: 0
   ```
   Exit `0`. Observation: the `BROWSER_HAR_CREATOR` row in `guides/browser.md:464` carries the Summary cell "Names the tool identity embedded in HAR 1.2 documents." — the doc-block description paragraph, which names no version literal. No cell in the guide's constants table reads `0.0.15` or `0.0.16`, so Ruling 18 finds nothing to compare and the gate stayed at zero disagreements without a guide edit.

## Scope

Only `src/core/constants.ts` changed, the `version` literal inside `BROWSER_HAR_CREATOR`. No other file, including the doc block, `guides/**`, `README.md`, `tests/**`, vendored files, `package.json`, or `package-lock.json`, was touched.
