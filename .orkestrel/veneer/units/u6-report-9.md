# Unit U6 — report 9

## Diff (this unit's edits)

`git diff --stat` for the checkout (six U6 files, carrying every prior round's uncommitted work
plus this round's five items):

```
 guides/test.md                    | 288 ++++++++++++++++-----
 src/browser/constants.ts          |  18 ++
 src/browser/helpers.ts            | 376 ++++++++++++++++++++++++++-
 src/browser/types.ts              |   8 +
 tests/setup.ts                    |   3 +
 tests/src/browser/helpers.test.ts | 530 +++++++++++++++++++++++++++++++++++++-
 6 files changed, 1145 insertions(+), 78 deletions(-)
```

This round touched only `guides/test.md`, `src/browser/helpers.ts`, and
`tests/src/browser/helpers.test.ts`. The five items, as they land in `git diff`:

**Item 1 — re-flowed bullet** (`guides/test.md`, the `stageMedia`/`releaseMedia` bullet, lines
1622-1641): the whole paragraph re-wrapped as one block at the file's ~100-column width, no words
changed.

**Item 2 — undrivable path** (`guides/test.md`, `holdAccessible` bullet):

```
 also rejects, the missed-press refusal carries it as its cause. That path can't be driven from
 inert input against a conforming engine, because the marker is built from the coordinates the
 press used; it is covered by review. The measured layout is a single accessible, uniformly
 scaled tester iframe. A covered centre or unsupported geometry can refuse
```

**Item 3 — one home for the aggregate sentence** (`src/browser/helpers.ts`, `releasePointer`
`@remarks`):

```
 * An idle pointer sends no button release. Calling this after an explicit release is safe in an
 * `afterEach` hook. A rejected release keeps the marker for a later retry. The pointer still moves
 * to the origin in cleanup, and a rejection there joins the aggregate described under `@throws`.
 * The provider must expose a DevTools session.
```

**Item 4 — named control** (`tests/src/browser/helpers.test.ts`, `records the marker only after the
press send resolves`):

```
+		// Control: a rejected send must record no marker, so the later `[[false]]` reading is
+		// unambiguous evidence of the resolved press, not a leftover from this failed attempt.
 		await expect(
 			sendProtocol('Input.dispatchMouseEvent', {
```

## Bullet's line lengths (`guides/test.md`, lines 1622-1641)

```
1622: 91
1623: 94
1624: 94
1625: 99
1626: 99
1627: 95
1628: 96
1629: 96
1630: 97
1631: 97
1632: 99
1633: 92
1634: 100
1635: 98
1636: 99
1637: 92
1638: 100
1639: 97
1640: 98
1641: 22
```

Every line but the last (22, the closing "runs files serially.") sits within a few columns of the
`.oxfmtrc.json` `printWidth` of 100, and none ends a short fragment.

## Gates

- `npx oxfmt --config .oxfmtrc.json --write` on the owned files: reformatted `guides/test.md`
  (pre-existing accumulated content from earlier rounds); the two other owned files were already
  formatted. Exit 0.
- `npm run format:check`: `All matched files use the correct format.` Exit 0.
- `npm run lint:check`: no output, exit 0.
- `npm run check`: `tsc --noEmit` across root, core, browser, and server projects; exit 0.
- `npm run build`: `✓ built in 86ms` (browser), `✓ built in 102ms` (server), `.d.cts` copy
  succeeded; exit 0.
- `npm run test:guides`: `Test Files 1 passed (1)`, `Tests 50 passed | 1 skipped (51)`; exit 0.
- `npm run test:src:browser -- tests/src/browser/helpers.test.ts -t holdAccessible`:
  `Test Files 1 passed (1)`, `Tests 8 passed | 289 skipped (297)`; exit 0.

## `git status --porcelain`

```
 M guides/test.md
 M src/browser/constants.ts
 M src/browser/helpers.ts
 M src/browser/types.ts
 M tests/setup.ts
 M tests/src/browser/helpers.test.ts
```

Exactly the six U6 files; nothing else.

## Deviations

None. All five items landed as briefed; every named gate exited 0 on the first run.
