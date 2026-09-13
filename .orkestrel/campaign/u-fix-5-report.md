# Unit report — U-fix-5 (`builder`, Sonnet, native, returned 2026-09-13)

## Output

**Criteria readings**

1. `npm run format:check` exits 0 — "All matched files use the correct format." (225 files)
2. `npm run lint:check` exits 0 — no output, clean run.
3. `npm run test:policy` exits 0 — 91 passed (1 file).
4. `npm run check` exits 0 — `tsc --noEmit` across root, core, server, bin all clean.
5. `npm run test:guides` exits 0 — 23 passed (1 file).
6. `grep -c 'does not read the record' src/core/constants.ts` → `0`; `grep -c 'Holds the .devEngines. record every generated manifest carries.' src/core/constants.ts` → `1`.
7. `grep -c 'only under an npm other than the bundled one' guides/scaffold.md` → `1`; `grep -c 'every release from 10.9.0 up to 11.6.0 refuses it' guides/scaffold.md` → `1`; `grep -c 'or a later release'` → `0` for both `guides/scaffold.md` and `README.md`; `grep -c 'first release that installs' guides/scaffold.md` → `0`.
8. `grep -c 'Node [0-9.]* or later' README.md` → `1` (the unrelated "Node 22.18.0 or later" executable-requirement sentence).
9. `grep -n -i -E '\b(below|above|older|newer|beneath)\b|from 10\.9\.0 on' ROADMAP.md` prints only lines outside item C's rows (159, 163, 543) plus line 431, which is the literal quoted new row text the brief mandates verbatim.
10. `grep -c 'matchesEngines' ROADMAP.md` → `1`.
11. `git diff --stat` names only `README.md`, `ROADMAP.md`, `guides/scaffold.md`, `src/core/constants.ts`.

**Final guide sentences (`guides/scaffold.md`)**

1. "A generated workspace on Node 22.18.0 or later therefore meets an npm that ignores the record only under an npm other than the bundled one."
2. "Run a generated workspace on npm 11.6.0 or later: every release from 10.9.0 up to 11.6.0 refuses it, and 11.6.0 installs it."
3. "Raise it with the `npm install --global npm@11.6.0` command before the first install; that command installs an npm that reports 11.6.0."

**Final README sentence**

"Raise it with the `npm install --global npm@11.6.0` command before the first install."

**Final doc block (`src/core/constants.ts`, `WORKSPACE_DEV_ENGINES` `@remarks`)**

```
/**
 * Holds the `devEngines` record every generated manifest carries.
 *
 * @remarks
 * Every generated manifest names npm at the {@link MINIMUM_NPM_VERSION} floor with the `onFail`
 * key set to the `error` value, and no blueprint field varies that record. An npm at 10.9.0 or
 * later reads the `devEngines` record. Such an npm earlier than the floor refuses an install in a
 * generated workspace rather than resolving its dependency graph.
 * The neighbouring `DEFAULT_ENGINES` constant is the Node range, and a blueprint's `engines`
 * field does replace that one.
 */
```

**ROADMAP.md tokens given a noun, before → after**

- `vitest` alone → the `vitest` package alone
- `@types/node` is not involved → the `@types/node` package is not involved
- `.orkestrel/campaign/evidence/linux-gate/npm-boundary-readings.log.txt` (no noun) → the same path + " file"
- carries `devEngines.packageManager` at `>=11.6.0` with `onFail` error → carries the `devEngines.packageManager` record at the `>=11.6.0` range with the `onFail` key set to the `error` value
- `engines.npm` and `engine-strict` were measured → the `engines.npm` field and the `engine-strict` setting were measured
- An npm from 10.9.0 on reads → An npm at 10.9.0 or later reads
- `tests/src/server/helpers.test.ts` (no noun, `&&` row) → the same path + " file"
- `tests/setupServer.test.ts` (no noun) → the same path + " file"
- `EAFNOSUPPORT` (no noun) → the `EAFNOSUPPORT` constant
- `tests/setupServer.ts` (no noun, second mention in the `resolveTool` sentence) → the same path + " file"
- `guides/scaffold.md` (no noun) → the same path + " file"
- `tests/guides.test.ts` (no noun, two mentions) → the same path + " file" (both)
- "beneath the floor" → "earlier than the floor"

Plus the new row added verbatim after the `supportsMappedLoopback` row, naming `matchesEngines`, `guides/scaffold.md`, `earlier`/`later`, `src/core/`, and `dist/src`, ruled 2026-09-13.

**Deviation state**

No deviation from the primary objective. One token in the `&&` row's line, `src:server` (a project identifier, not a file/constant/helper/field/package), and the `scripts/ollama.sh` path in the 0.0.65 row (extension not in the `.ts`/`.md`/`.txt` list the rule names) matched no rule in item C's noun list; both are reported per the deviation contract and left unchanged.

Relevant paths: `guides/scaffold.md`, `README.md`, `ROADMAP.md`, `src/core/constants.ts`.
# Successor return — U-fix-5b (same `builder`, resumed with `u-fix-5b-brief.md`)

**Criteria readings**

1. `npm run format:check` exits 0 — "All matched files use the correct format." (225 files)
2. `npm run test:policy` exits 0 — 91 passed (1 file)
3. `grep -c 'the `src:server` project' ROADMAP.md` → `1`; `grep -c 'the `scripts/ollama.sh` script' ROADMAP.md` → `1`
4. `git diff --stat` names only `README.md`, `ROADMAP.md`, `guides/scaffold.md`, `src/core/constants.ts`

**Edited clauses verbatim**

- "went red under the `src:server` project and"
- "has no mechanism that can disagree with the `scripts/ollama.sh` script;"

**Deviation state**

None. Both tokens were found in the rows item C named, and nothing else in `ROADMAP.md` changed.
