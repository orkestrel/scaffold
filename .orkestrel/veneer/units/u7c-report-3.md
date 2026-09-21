<!-- Retained from veneer/tmp/units/u7c-report-3.md. Native lane: opus on Opus 5 (Agent dispatch, clean context), over Veneer 0cbb563 with the brief-2 result in the tree, 2026-09-21; brief u7c-brief-3.md. The second fix round: findings 1 to 4 closed (FOCUS_RING table, the teardown marker, the setup proofs finally chain, Showcase.test.ts over BUTTON_SELECTOR); every gate exit 0 on Chromium and Edge; no deviation. -->

# Unit U7c — fix round report 3: the round-2 findings

Findings 1 to 4 of `u7c-brief-3.md` are closed at their sites. Every gate in the brief's
Execution item 2 exits 0 on managed Chromium and on Edge. No file outside the brief-3 owned set was
touched, and `git status --porcelain --untracked-files=all` still shows brief 1's owned set alone.
Recorded, not carried: reviewer 10 stands where brief 3 put it, against the unit that adds the
second section.

## Finding 1 — the focus-ring sweeps pin nothing

**Landed.** `tests/setup.ts:92-107` declares the calibrated table, doc-blocked, frozen, keyed by
mode:

```ts
export const FOCUS_RING = Object.freeze({
	light: 2.2797472825343092,
	dark: 2.358684054793209,
})
```

The constant carries no type annotation deliberately: `Object.freeze` over the object literal infers
the exact key set `light` and `dark` with a `number` at each, so a sweep naming a mode the table does
not carry is a typecheck failure rather than an `undefined` compared at run time.

`tests/setup.test.ts:80-88` proves the shape:

```ts
	it('pins one focus-ring ratio per mode, each a reading a contrast reader can return', () => {
		expect(Object.keys(FOCUS_RING).sort()).toStrictEqual(['dark', 'light'])
		expect(Object.values(FOCUS_RING).filter((ratio) => ratio <= 1 || ratio > 21)).toStrictEqual([])
		expect(FOCUS_RING.light).not.toBe(FOCUS_RING.dark)
	})
```

`tests/app/browser/integration.test.ts:314` and `:349` assert each sweep's shared value against its
mode's entry, replacing the `expect(primary ?? 0).toBeGreaterThan(1)` line at each site:

```ts
		expect(primary ?? 0).toBeCloseTo(FOCUS_RING.light, 3)
		expect(primary ?? 0).toBeCloseTo(FOCUS_RING.dark, 3)
```

The equality-across-specimens assertion stays beside each pin, because the two assertions prove
different things: the set equality proves one token serves every variant, and the pin proves which
token. `tests/app/browser/integration.test.ts:41` adds `FOCUS_RING` to the `tests/setup.js` import,
and `tests/setup.test.ts:49` adds it to the export-set assertion, whose `it` name already covers a
calibration table under "the case matrices".

**The red a uniform wrong ratio produces, reasoned from the assertion's shape.** `toBeCloseTo(value,
3)` passes when the absolute difference is under `10 ** -3 / 2`, so the tolerance at each site is
0.0005.

- Under the superseded pair, a uniform change of the shared focus token that moved every light
  specimen from 2.2797472825343092 to 3 passes both assertions: `3 > 1` holds, and every specimen
  reads 3 so `[...new Set(rings.values())]` is `[3]` and equals `[primary]`. That is the finding.
- Under the landed pin the same change reds, because `|3 - 2.2797472825343092|` is
  0.7202527174656908 against a tolerance of 0.0005, and Vitest reports the received value, the
  expected value, and that difference. The dark sweep reds the same way against 2.358684054793209.
- A table whose entries were copied over each other reds both sweeps rather than neither: the two
  readings differ by 0.0789367722589, which is larger than the tolerance at both sites. The setup
  proof's `expect(FOCUS_RING.light).not.toBe(FOCUS_RING.dark)` line reds first and names the cause.

No plant was run, as brief 3 Execution item 1 directs. The values themselves are corroborated by the
runs rather than asserted from the earlier reports alone: `npm run test:journey` and
`PLAYWRIGHT_CHANNEL=msedge npm run test:journey` both pass the two pins across every registered
variant, so the pinned readings hold on two engines.

## Finding 2 — a refused teardown leaves the next case mounting on stale state

**Landed.** `tests/app/browser/integration.test.ts:84-99` adds the module-scope marker beside
`mounted` and makes `beforeEach` refuse before it mounts:

```ts
let unclean: string | undefined

beforeEach(async () => {
	if (unclean !== undefined) {
		throw new Error(`An earlier journey teardown was refused and never cleared: ${unclean}`)
	}
	mounted = await mountShowcase()
	JOURNAL.start()
})
```

`tests/app/browser/integration.test.ts:122-125` records the failure on the path the catches feed,
where the collected refusals are raised:

```ts
	if (refused.length > 0) {
		unclean = refused.map((reason) => String(reason)).join('; ')
		throw new AggregateError(refused, 'The journey teardown was refused')
	}
```

The marker is never cleared, because nothing after a refused teardown can show the state that
teardown was meant to leave. The comment above the declaration names the mechanism: the installed
media helper keeps its stage marker until a read-back succeeds.

**The marker's effect, read off the code path.** Take a restoration that rejects in the case that
stages reduced motion.

- `afterEach` catches the rejection into `refused`, so `releaseMedia` never restored the emulation
  and the installed helper's stage marker is still set.
- The aggregate branch runs, sets `unclean` to the stringified reason, and throws, so that case
  fails on its teardown as it did before.
- Before the change, the next case's `beforeEach` called `mountShowcase()` regardless and the case
  drove the surface under the emulation. Its paint, animation, and ring readings would then describe
  the emulated preference, and it would report that as a property of the surface — passing where the
  emulation happens to agree and failing with a reading nobody can attribute where it does not.
- After the change, `beforeEach` throws `An earlier journey teardown was refused and never cleared:
  <reason>` before `mountShowcase()` is reached, so every following case in the file fails with a
  sentence naming the earlier refusal and none of them runs on the stale state.

The failing `beforeEach` adds no second failure that could hide the named one: `afterEach` still
runs, `mounted` holds the previous case's already-cleaned mount and `cleanup()` is idempotent (the
`mounts real content and cleans it up repeatedly` case in `tests/setupBrowser.test.ts` is the proof),
`JOURNAL.stop()` on a stopped journal does nothing per the installed `JournalInterface` declaration
at `node_modules/@orkestrel/test/dist/src/browser/index.d.ts:1491-1498`, and `refused` is empty so
the aggregate branch does not fire again.

No plant was run, as brief 3 Execution item 1 directs.

## Finding 3 — a rejected release leaves the mount for the next case

**Landed.** `tests/setupBrowser.test.ts:140-148` and `:171-179` put the mount cleanup under the
release in an unconditional `finally`, in the two cases the file's `releasePointer` calls sit in:

```ts
		} finally {
			// The release is the step that can reject, and the mount is what the next case inherits,
			// so the cleanup sits under the release rather than after it.
			try {
				await releasePointer()
			} finally {
				mounted.cleanup()
			}
		}
```

The nesting keeps the rejection propagating — the case still fails on a refused release — while the
mounted showcase and its document delegate are taken down either way.

**No other case in the file mounts and releases.** `grep -n "releasePointer\|holdAccessible\|
hoverAccessible\|releaseMedia\|stageMedia" tests/setupBrowser.test.ts` over the landed file returns
the import at `:13` and the two calls at `:144` and `:175`, and nothing else, so no third site
carries the shape.

## Finding 4 — the ownership rule re-declared by hand, with a check that holds by construction

**Landed.** `tests/app/browser/Showcase.test.ts:2` imports the published selector
(`import { Button, BUTTON_SELECTOR } from '@src/browser'`), and `:58-77` derives the owned
population from it, guards the population against emptiness, and closes on the reclaimed-host name
list:

```ts
			const owned = specimens.filter((element) => !element.matches(BUTTON_SELECTOR))
			expect(owned).not.toStrictEqual([])
			// ...
			for (const engine of reclaimed) engine.destroy()
			expect(reclaimed.map((engine) => readName(engine.host))).toStrictEqual(
				owned.map((element) => readName(element)),
			)
```

That is the shape `tests/app/browser/sections/ButtonSection.test.ts:154-156` already carries. The
`readName` import the name list needs was already in the file. The case reads `BUTTON_SELECTOR` for
the delegated population beside the `BUTTON_CLASS` it already read for the rendered one, so both
populations come off published declarations rather than off a hand-written attribute test that would
pass while the published selector moved.

## Gates

Run in the brief's order, each to completion. Managed Chromium unless the row names Edge. The full
`npm test` output is retained at `tmp/u7c/npm-test-chromium.log.txt`.

| Command                                                 | Exit | Final lines                                                      |
| ------------------------------------------------------- | ---- | ----------------------------------------------------------------- |
| `npm run format:check`                                  | 0    | `All matched files use the correct format.` / 96 files            |
| `npm run lint:check`                                    | 0    | no output                                                          |
| `npm run check`                                         | 0    | no diagnostics from `tsc` or `vue-tsc`                             |
| `npm run test:setup`                                    | 0    | `Test Files  3 passed (3)` / `Tests  121 passed (121)`            |
| `npm run test:setup:browser`                            | 0    | `Test Files  1 passed (1)` / `Tests  27 passed (27)`              |
| `npm run test:app:browser`                              | 0    | `Test Files  3 passed (3)` / `Tests  10 passed (10)`              |
| `npm run test:journey`                                  | 0    | `Test Files  4 passed (4)` / `Tests  80 passed \| 4 skipped (84)` |
| `CAPTURE=1 npm run test:journey`                        | 0    | `Test Files  4 passed (4)` / `Tests  84 passed (84)`              |
| `npm test`                                              | 0    | every project green (rows following)                               |
| `PLAYWRIGHT_CHANNEL=msedge npm run test:journey`        | 0    | `Test Files  4 passed (4)` / `Tests  80 passed \| 4 skipped (84)` |
| `PLAYWRIGHT_CHANNEL=msedge npm run test:app:browser`    | 0    | `Test Files  3 passed (3)` / `Tests  10 passed (10)`              |
| `PLAYWRIGHT_CHANNEL=msedge npm run test:setup:browser`  | 0    | `Test Files  1 passed (1)` / `Tests  27 passed (27)`              |

`npm test` per project, read from `tmp/u7c/npm-test-chromium.log.txt`: `src` 8 files, 51 passed;
`src:styles` 9 files, 104 passed; `app` 3 files, 10 passed; `journey` 4 files, 80 passed and 4
skipped; `policy` 109 passed and 1 skipped; `config` 173 passed and 1 skipped; `setup` 3 files, 121
passed; `setup:browser` 27 passed; `conformance` 8 passed; `guides` 18 passed.

`test:setup` moved from 120 to 121 passing, the one case being the `FOCUS_RING` shape proof. Every
other reading is unchanged from report 2, including the skips, which are the same `runIf` misses
report 2 names.

The `CAPTURE=1` run wrote 48 frames under `tmp/capture/states`
(`ls tmp/capture/states | wc -l` → `48`), unchanged from reports 1 and 2.

## Tree at return

```text
$ git diff --stat
 app/browser/Showcase.ts               |  19 +-
 app/browser/constants.ts              | 225 ++++++++++++++++++
 app/browser/index.ts                  |   1 +
 app/browser/main.ts                   |   6 +
 app/browser/styles/_shell.scss        |  10 +
 app/browser/types.ts                  |  26 +++
 tests/app/browser/Showcase.test.ts    |  45 +++-
 tests/app/browser/index.test.ts       |  13 +-
 tests/app/browser/integration.test.ts | 418 +++++++++++++++++++++++++++++++++-
 tests/distribution.test.ts            | 115 ++++++++--
 tests/setup.test.ts                   | 157 ++++++++++++-
 tests/setup.ts                        | 183 +++++++++++++++
 tests/setupBrowser.test.ts            | 251 +++++++++++++++++++-
 tests/setupBrowser.ts                 | 315 ++++++++++++++++++++++++-
 14 files changed, 1731 insertions(+), 53 deletions(-)

$ git status --porcelain --untracked-files=all
 M app/browser/Showcase.ts
 M app/browser/constants.ts
 M app/browser/index.ts
 M app/browser/main.ts
 M app/browser/styles/_shell.scss
 M app/browser/types.ts
 M tests/app/browser/Showcase.test.ts
 M tests/app/browser/index.test.ts
 M tests/app/browser/integration.test.ts
 M tests/distribution.test.ts
 M tests/setup.test.ts
 M tests/setup.ts
 M tests/setupBrowser.test.ts
 M tests/setupBrowser.ts
?? app/browser/sections/ButtonSection.ts
?? tests/app/browser/sections/ButtonSection.test.ts
```

`HEAD` is `0cbb563`, unchanged. The status is brief 1's owned set exactly; the reports and the
retained log sit under the ignored `tmp/` directory and so do not appear in it. Round 3 touched
`tests/setup.ts`, `tests/setup.test.ts`, `tests/setupBrowser.test.ts`,
`tests/app/browser/integration.test.ts`, and `tests/app/browser/Showcase.test.ts`, each in the
brief-3 owned set. No enumerating assertion outside the owned set was made false: the only
population this round grew is `tests/setup.ts`'s export set, whose sole enumeration is the
export-set assertion in `tests/setup.test.ts`, updated in the same step.

## Deviations

None. Every choice settled inside the owned scope is recorded with its finding: the marker's name
and its never-cleared lifetime, the nesting form of the `finally` chain, the table's name and its
unannotated declaration, and the wording of the comments each change required. No wording, comment,
or guide-prose change was made beyond what a code change required. No stop condition was reached.
