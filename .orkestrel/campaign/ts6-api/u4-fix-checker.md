<!-- Agent dispatch, checker lane over the U4-fix and U4-fix-2 slices, captured from the task transcript -->

## Per-claim verdicts

**Claim 1 — require-drive guard and comment.** PASS.
`src/core/templates.ts:1920-1923` — `const drivers = selectDrivers(entry, 'commonjs')`, `expect(drivers).not.toStrictEqual([])`, then `drivers.flatMap(...)`, matching the import drive's shape at `src/core/templates.ts:1899-1901`. The comment at `src/core/templates.ts:1916-1919` reads exactly the brief's prescribed sentences ("A subpath whose `require` resolves to a module that no typed CommonJS consumer can compile against carries no declared side to compare here, and whether it may publish one at all is the untypable set's question rather than this drive's. The preceding runtime drive ran either way."), with `whose … that` intact and `preceding` in place of `above`.

**Claim 2 — one scratch project per surface.** PASS.
`src/core/templates.ts:1573-1574` — `const name = \`surface.${surface.driver.label}${slug}.${surface.extension}\`` and `const module = \`${name}\``; `writeProject` (`u4-fix-2.full.diff.txt:201`) builds `tsconfig.${name}.json`, so the project is `tsconfig.surface.<label><slug>.<extension>.json`. The extension distinguishes an entry's `.ts`/`.cts` surfaces and the `bundler` browser (`ts`) versus Node (`cts`/`ts` under different drivers) faces.

**Claim 3 — `Entry.declaration` as booleans.** PASS.
Interface at `src/core/templates.ts:1179-1182` is `{ module: boolean; commonjs: boolean; browser: boolean }`; comment at `src/core/templates.ts:1171-1174` describes the members as facts ("whether the declarations its consumer formats resolve at all…"). `buildStage` sets them at `src/core/templates.ts:1680-1682` (`declaration.module !== undefined`, etc., where `declaration` is the `resolveDeclaration(...)`-derived value `readDeclaration` returns) with no `join(installed, …)`. Readers at `src/core/templates.ts:1895`, `1912`, `2042` all read the boolean (`!entry.declaration.<face>`). `grep -c "join(installed, declaration\."` finds no match in the current file (only the unrelated `matchesFile(join(installed, declaration))` local-variable use the U4-fix report flagged, which is not `entry.declaration`).

**Claim 4 — `BROWSER_DRIVER` fold.** PASS.
`src/core/templates.ts:1163-1164` — `const BROWSER_DRIVER = RESOLUTIONS.find((candidate) => candidate.label === 'bundler')` followed by `if (BROWSER_DRIVER === undefined) throw new Error("RESOLUTIONS carries no 'bundler' row")`, module-scope, beside `RESOLUTIONS`. `grep -n "requireDriver" src/core/templates.ts` returns nothing (confirmed by direct read of the surrounding lines). The browser drive calls `checkSurface` once, at `src/core/templates.ts:2056-2061`, passing `driver: BROWSER_DRIVER`. No `BUNDLER` constant remains (removed in `u4-fix.diff.txt:7-10`, not reintroduced); `RESOLUTIONS`'s row carries the literal `label: 'bundler'` (`src/core/templates.ts` per `u4-fix-2.full.diff.txt:83`).

**Claim 5 — prose sweep.** PASS.
`u4-fix-report.md:9-11` names the pattern (`\babove\b|\bbelow\b|\bshould\b|\bsimply\b|\beasy\b|\bjust\b`), the searched range, and rules every hit (none found; the numeral/count scan ruled every hit a single-instance reference). Independent check: `grep -niE "\babove\b|\bbelow\b|\bshould\b|\bsimply\b|\beasy\b|\bjust\b" src/core/templates.ts` finds one hit, at `src/core/templates.ts:752` ("sorting below it"), which is outside the proof block (1024–2100) the claim scopes to and uses "below" in a spatial-ordering sense, not a document pointer.

**Claim 6 — classifier fixture shape, nothing else changed.** PASS.
`u4-fix-2.diff.txt:18-83` (= `u4-fix-2.full.diff.txt:492-583`) shows exactly the seven `declaration` literals in `classifies staged exports by browser reachability and runtime format` changed from path-or-`undefined` to boolean (`decl-cts-rt-mjs`, `decl-mts-rt-cjs`, `invalid`, `esm-only`, `browser`, `module-sync`, `node-addons`), each `join(installed, …)` becoming `true` and each `undefined` becoming `false`. No other hunk in `tests/src/core/templates.test.ts` appears in either interdiff.

**Claim 7 — scope honesty across the two slices.** PASS.
`u4-fix.diff.txt` touches only `src/core/templates.ts` inside the distribution proof block (lines 1071–2078 range). `u4-fix-2.diff.txt` touches `src/core/templates.ts` (the `BROWSER_DRIVER` fold, lines 1160–1165) and `tests/src/core/templates.test.ts` (the one fixture, claim 6). `u4-fix-2.status.txt:2` shows `tests/distribution.test.ts` modified, but neither fix diff touches it (confirmed against `u4-fix-2.full.diff.txt:445-487`, which carries that file's hunk from the pre-existing U4 change, not from either fix), so it sits outside this round's scope rather than contradicting the claim. Reports match their slices: `u4-fix-report.md`'s Deviation (lines 33-51) names the off-limits fixture it could not touch; `u4-fix-2-report.md` (Edit 1, lines 3-5; Deviations, line 51) records that fixture closed with no other deviation.

VERDICT: PASS
