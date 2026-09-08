# U4-fix report — the round-1 findings on the distribution proof template

## Per edit

1. **The require drive's empty case** (`src/core/templates.ts` ~1900–1917 pre-edit, now ~1908–1918). Added `const drivers = selectDrivers(entry, 'commonjs')` and `expect(drivers).not.toStrictEqual([])` before the `flatMap`, mirroring the import drive's guard, and replaced the comment with the prescribed sentence.
2. **One scratch project per surface** (`checkSurface`, ~1561–1564). `name` now carries the extension — `surface.<label><slug>.<extension>` — and `module` is `\`${name}\``, so `writeProject`'s `tsconfig.${name}.json` and the module path both carry the extension and no longer collide across an entry's `.ts`/`.cts` surfaces or the `bundler` browser/Node faces.
3. **`Entry.declaration` as facts** (interface ~1173–1180, `readDeclaration` ~1437–1444, `buildStage` ~1665–1673, three readers at ~1889, 1906, 2036). The interface members are now `boolean`. `readDeclaration`'s own return type is a local inline object type (paths), decoupled from `Entry['declaration']`, since `buildStage` still needs the paths locally for the undeclared/excluded partition before reducing to booleans with `!== undefined`; the `join(installed, …)` calls that built path strings for the interface are dropped. The three guards now read `!entry.declaration.module`, `!entry.declaration.commonjs`, `!entry.declaration.browser`.
4. **The browser drive's driver** (~1163–1170, ~2044–2051). Added `requireDriver(label)` beside `RESOLUTIONS` (throwing when no row matches, naming the missing label) and `const BROWSER_DRIVER = requireDriver('bundler')`, replacing the filter/assertion/flatMap-over-one-element with `checkSurface(stage, { entry, extension: 'ts', published, driver: BROWSER_DRIVER })`. Dropped the `BUNDLER` constant and its comment; `RESOLUTIONS` now carries the literal `label: 'bundler'`.
5. **Prose sweep.** Searched the proof block (`src/core/templates.ts` lines 1024–2100, the whole `distribution: Object.freeze({ … })` entry) for `above`, `below`, `should`, `simply`, `easy`, `just`, and a stated count of a growable set:
   - `grep -niE "\babove\b|\bbelow\b|\bshould\b|\bsimply\b|\beasy\b|\bjust\b" <(sed -n '1024,2100p' src/core/templates.ts)` — no hits.
   - Manual scan of every numeral and every `one `/`two `/`three ` occurrence in that range — every hit names a single instance ("one archive", "one driver", "one entry") or an ordinal position, never a count of a set that can grow. No rewrite needed.

## Unknown: the emitted proof over the staged copy

Rebuilt first, since the staged copy was stale against `dist/`:

```
$ npm run build:src:core   # exit 0
$ npm run build:src:bin    # exit 0
```

Ran the staged instrument (`/tmp/claude-0/.../scratchpad/u4/emit.mjs` into `stage/`, then `plant.sh`'s proof run) per its own read; the run's own summary line: **not reached** — the scoped `npm run test:src:core` run (the criterion this unknown is nested under) reddened first, on an off-limits file (`tests/src/core/templates.test.ts`), before the emitted-proof step. Per the Deviation contract this stops the unit rather than improvising past it. See Deviation below.

## Criteria

1. `npx oxfmt --config .oxfmtrc.json --check src/core/templates.ts` — **PASS**, exit 0.
2. `npx oxlint --config .oxlintrc.json --deny-warnings src/core/templates.ts` — **PASS**, exit 0.
3. `grep -n "BUNDLER\|drive above\|The runtime drive above" src/core/templates.ts` prints nothing — **PASS** (only `BUNDLER_CONDITIONS` matches, which is not `BUNDLER` as a bare token; the ban is the dropped constant). `grep -c "join(installed, declaration" src/core/templates.ts` — **prints 1, not 0**. The one match is `targetToDeclaration`'s pre-existing, unrelated `matchesFile(join(installed, declaration))` (line ~1315), where `declaration` is a local string-path variable, not `entry.declaration`. The exact pattern this edit needed to clear — `join(installed, declaration.` (with the dot into a field) — prints 0. Flagging the literal-string mismatch rather than silently treating it as green.
4. `npx tsc --noEmit --project tsconfig.json` — **PASS**, exit 0.
5. `npm run test:src:core` — **FAIL**. 1 of 385 tests fails: `tests/src/core/templates.test.ts > emitted distribution classifier > classifies staged exports by browser reachability and runtime format` (assertion at line 1565), because that off-limits test's fixture literals assert the old string-or-undefined shape for `declaration` (for example `declaration: { module: undefined, commonjs: join(installed, './common.d.cts'), browser: undefined }`) against the new boolean shape edit 3 produces. Two other failures seen mid-fix (`is an oxfmt fixed point across the emitted content corpus`, `prints no line past the vendored width the formatter could have broken`) are now fixed: they came from my own `readDeclaration` return-type annotation not matching oxfmt's emitted multi-line form; reformatting it to the multi-line object-type shape cleared both, confirmed by rerun.
6. Unknown (emitted proof over the staged copy) — **not run**; blocked by criterion 5's finding, per the Deviation contract.

## Deviation

- **Expected:** `npm run test:src:core` exits 0 after edit 3 reshapes `Entry.declaration` to booleans, per the brief's Unknown and criterion 5.
- **Found:** `tests/src/core/templates.test.ts:1565` (`classifies staged exports by browser reachability and runtime format`) asserts the pre-edit shape — `declaration: { module: undefined | string, commonjs: undefined | string, browser: undefined | string }` — against the classifier's own emitted output, which edit 3 now produces as booleans. `tests/src/core/templates.test.ts` is named off-limits in the brief's Scope.
- **Evidence:**
  ```
  FAIL  |src:core| tests/src/core/templates.test.ts > emitted distribution classifier > classifies staged exports by browser reachability and runtime format
  AssertionError: expected [ …(6) ] to strictly equal [ …(6) ]
  …
  -           "browser": undefined,
  -           "commonjs": "/home/user/scaffold/tmp/scaffold-e2-stage-classification-4UwYgS/installed/module.d.mts",
  -           "module": undefined,
  +           "browser": false,
  +           "commonjs": true,
  +           "module": false,
  ```
- **Done / not done:** Edits 1, 2, 4, and 5 are done and pass their own gates. Edit 3 is done in `src/core/templates.ts` and typechecks and lints clean, but its consequence in the off-limits `tests/src/core/templates.test.ts` needs an update this unit cannot make. The staged-proof unknown did not run because the gate ahead of it (criterion 5) reddened first.
- **Hypothesis:** the fixture literals in `tests/src/core/templates.test.ts` around lines 1513–1780 need the same `declaration` reshape from paths to booleans that edit 3 applied to the generated template, and a writer with that file in scope should make that change together with a re-run of `test:src:core` and the staged emitted proof.
