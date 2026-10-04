# Review of `e7bf576a8` and `245248689` (objective lane, Opus, 2026-10-03)

VERDICT: FAIL 1, 3, 4; outside: X1, X2, X3.

## 1. Census: FAIL

Held: the shared-file bridge is gone; the file gate reads `gates.files` alone (`discovery.ts:364-366`); each listing builds its own fold set (`:297`); `vitest.mjs`/`vitest.js` recognized (`:157-159`); `--mode test` is the default (`:172`); `mergeCollected` (`:310-322`) counts no test twice in a row beyond one listing's repeats.

Still marks a project gated by a gate that never runs it:
- (a) A listing names a project but collects none of its tests. `vite.config.ts` has `node` and `browser`; `wrapper.config.ts` has `wrapped`; the script `vitest run --project node && vitest run --config wrapper.config.ts --project wrapped --project browser`. Vitest throws only when no project matches at all (`cli-api.CnMVyzaz.js:13230-13232`), so the wrapper run passes and never runs `browser`, yet `:359` adds that listing to `browser`'s units and `:363` gates it; exit 0 instead of `ungated: ['browser']`, exit 3.
- (b) A test file passed to Vitest counts as a file gate: `vitest run --project node tests/a.test.ts` with `node` and `browser` both including that file; the loop at `:177-183` also runs for Vitest commands, so `browser` gets a file gate. Record test-file arguments only for commands that are not Vitest invocations.
- (c) A gate reaches a same-named project in another config: `vite.config.ts` `{ name: 'node', include: ['tests/a.test.ts'] }`, `other.config.ts` `{ name: 'node', include: ['tests/b.test.ts'] }`, script `vitest run --config other.config.ts`; row `node` reports 2 files and `gate: 'test'` though `tests/a.test.ts` never runs. Gate each merged test (its `[file, projectName, name]` identity) by the listings that collected it, and flag a row with any ungated test; this also closes (a) and keeps veneer's same-factory wrapper rows gated.
- (d) Folding accepts any trailing parenthetical (`:80-83`): a plain project `core (legacy)` folds into `core` under `--project core`, though Vitest matches `^core$` (`index.UpGiHP7g.js:40-45`, `cli-api:14111-14118`). Fold only browser-instance suffixes.

Pre-existing: `--project "src:*"`, `--project !browser`, and `--project Core` run in Vitest (wildcard, negation, case-insensitive) but the census compares exact names (`:297`, `:359`, `:363`); match filters with Vitest's semantics. The basename scan checks every token (`:157-159`), so `npm ls vitest` or `vitest list` counts as an unfiltered gate; require the Vitest token in command position.

## 2. Proofs: PASS

Each new or rewritten case (`discovery.test.ts:10-200`) runs real `vitest list` and would fail on `81ac20857`; O1 closed at `:365-381`. None covers inputs (a) to (c).

## 3. Templates: FAIL

Held: `BrowserInstanceOption.name?: string` (`reporters.d.DtoKVV2s.d.ts:1574`); both naming sites use `??=` (`cli-api:10356`, `:14253`); no generated script filters by an instance name; names under `vite.config.ts` do not change.

Failed:
- Hardcoded names drift from an overridden label (`templates.ts:246`, `:289`, `:424`, `:662`): `srcBrowser({ test: { name: { label: 'src:widgets' } } })` now reports `src:browser (chromium)` (before: `src:widgets (chromium)`); two such calls with different labels now throw "Cannot define a nested project … already defined" (`cli-api:11287-11288`); `mergeConfig` concatenates arrays (`templates.ts:125`), so an instance a consumer adds through `override` still reports `[object Object] (firefox)` as a root config. `guides/scaffold.md:1101-1103` is false whenever a label is overridden. Fix: emit factories without instance names and name each unnamed instance from the merged label after `mergeOverride` (`templates.ts:117-125`); `appVue` (`:454-457`) and `appJourney` (`:487-490`) then drop inherited names rather than restate the label.
- The Vue, journey, and sheet changes are unproven by the gates that ran: the live proof (`templates.test.ts:811-880`) covers `srcBrowser` alone; the emitted-text checks cover `setup:browser` and `app:browser` (`compilers.test.ts:2167`, `:2996`); scaffold's own `vite.config.ts` has no browser factories, so `tests/config.test.ts:184-189`, `:360-367`, `:412-416` cannot fail under `test:config` and run only in `tests/distribution.test.ts:288-314`, which was not run. Deleting the remap at `templates.ts:454-457` or `:487-490` would make `app:vue` and every journey reuse `app:browser (chromium)` and crash Vitest with no gate catching it. Fix: extend the live proof to a blueprint with app browser and Vue, the journey, and a sheet, or run `npm run test:distribution`.

## 4. Full `npm test` timeouts: FAIL

The setup and bin cases are unaffected. The compilers case (`compilers.test.ts:4286`, 5 s, spawns processes) runs in the parallel `src:core` pool beside the new 180 s case `templates.test.ts:811`, which starts three Vitest processes with Chromium; the timeout came in that run (`test-final.err:13-14`) and passed on retry. Run `npm run test:src:core` three times at `81ac20857` and three times at `245248689`; if the tip times out and the base does not, move the proof out of `src:core`. `.claude/rules/tests.md` § Expensive proofs puts a proof that spawns processes or drives a real build in its own project.

## 5. Rules: PASS on syntax; parity follows items 1 and 3

`SKILL.md:16` and the opening comment (`:14-16`) are false under 1(a) and 1(b); the guide sentence is false under item 3's override case.

## Outside the claims

- X1 (`discovery.ts:372-374`): a row's `units` lists listings that only name the project without collecting it.
- X2 (`:157-172`): `vitest bench` counts as a test gate in the default mode, but Vitest's bench default mode is `benchmark`.
- X3 (subjective, referred): the instance-naming paragraph sits inside the journey section of `guides/scaffold.md` (`:1101-1103`).
