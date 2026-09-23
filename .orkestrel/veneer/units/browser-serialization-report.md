# Unit BROWSER-SERIALIZATION (`bs`) — report

Worktree `/home/user/veneer-bs`, branch `unit/bs` from `97ac9ab`. Chromium 141 is the only browser
build available in this container; the Chromium 153 reading stays the engine session's observation
at its next landing, per the brief's Observations note.

## Sites: before and after, with the method chosen

### `tests/src/styles/components/form-select.test.ts`

Two resting-`background-position` assertions, both compared the mark's offset from the control's
padding box by matching the browser's serialized string. Chosen method: accept either serialization
of the same computed offset (D45's second branch), by regex alternation on the shorthand string,
rather than parsing the `background-position-x`/`background-position-y` longhands — the longhands
serialize the same `right <length>` keyword form the shorthand does, so parsing them buys nothing
the alternation does not already give, and the alternation stays a one-line change per site.

- Resting reading (around line 249's case, the assertion around line 277):
  - Before: `expect(readStyle(plain, 'background-position')).toMatch(/^right 12px 50%,/u)`
  - After: `expect(readStyle(plain, 'background-position')).toMatch(/^(?:right 12px|calc\(100% - 12px\)) 50%,/u)`
- Density-retuned reading (same case, factor 2, around line 300):
  - Before: `expect(readStyle(plain, 'background-position')).toMatch(/^right 24px 50%,/u)`
  - After: `expect(readStyle(plain, 'background-position')).toMatch(/^(?:right 24px|calc\(100% - 24px\)) 50%,/u)`

The density site was not named in the engine session's reading; it carries the identical pattern at
a rescaled offset, so it is the same defect and is owned by this unit's acceptance criterion 2
("no assertion in those files compares a serialized … string that names `right <length>` … where a
build may serialize `calc(100% - <length>)`"), which covers the whole file rather than the one cited
line.

### `tests/src/styles/components/validation.test.ts`

Three sites, same alternation method, plus one the reading did not name (line 85, textually
identical to the named line 335, same underlying case shape) that the file-wide criterion also
covers.

- `right 9px 50%` (the marked-control case, around line 77):
  - Before: `.toBe('right 9px 50%')`
  - After: `.toMatch(/^(?:right 9px|calc\(100% - 9px\)) 50%$/u)`
- `right 9px top 9px` on the marked textarea (same case, around line 85) and on the scoped textarea
  (the "reaches every host through the scope" case, around line 335):
  - Before: `.toBe('right 9px top 9px')`
  - After: `.toMatch(/^(?:right 9px top 9px|calc\(100% - 9px\) 9px)$/u)`

The `top` keyword drops in the `calc` serialization because the offset from the top edge needs no
keyword to disambiguate it (only the horizontal axis's default anchor differs from `right`), which
the added comment states.

### `tests/src/styles/components/close.test.ts`

One site, `background-size` (around line 52). Chosen method: parse the width from the leading term
and assert the second term, where a build writes one, is `auto` rather than compared by string, per
the brief's standing condition.

- Before: `expect(readStyle(control, 'background-size')).toBe(\`${String(em)}px\`)`
- After:
  ```ts
  const [size, height] = readStyle(control, 'background-size').split(' ')
  expect(size).toBe(`${String(em)}px`)
  expect(height === undefined || height === 'auto').toBe(true)
  ```

### `tests/service/tailwind/preflight.test.ts`

The move comparison (the case "keeps every property the elements layer declares…", around line
102) equated the full `tag | property | standalone | preflight` string against the guide's recorded
row, which pins the standalone column to Chromium 141's user-agent defaults. Chosen method: compare
by tag, property, and the preflight value alone; assert the measured standalone value differs from
the preflight value at the point the move is detected (already implied by the `resolved !== value`
guard, made explicit with its own assertion); and compare the recorded rows by their `preflight`
column alone, dropping the `standalone` column from the equality.

- Before:
  ```ts
  for (const [property, value] of standalone) {
    const resolved = paired.get(property)
    if (resolved !== value)
      measured.push(`${tag} | ${property} | ${value} | ${String(resolved)}`)
  }
  ...
  const recorded = readPreflightDepartures(readVeneerGuide())
    .map((row) => `${row.tag} | ${row.property} | ${row.standalone} | ${row.preflight}`)
    .sort()
  ```
- After:
  ```ts
  for (const [property, value] of standalone) {
    const resolved = paired.get(property)
    if (resolved === value) continue
    expect(String(resolved)).not.toBe(String(value))
    measured.push(`${tag} | ${property} | ${String(resolved)}`)
  }
  ...
  const recorded = readPreflightDepartures(readVeneerGuide())
    .map((row) => `${row.tag} | ${row.property} | ${row.preflight}`)
    .sort()
  ```

No helper was added to a centralized file: `readPreflightDepartures` in `tests/setupStyles.ts`
already returns the `preflight` field on every row, so the comparison change is confined to
`preflight.test.ts`, and `tests/setupService.ts` needed no reader edit.

### `guides/veneer.md`

The preflight paragraph (around the sentence naming Chromium 141) gains the sentence D45 asks for:
it names Chromium 141 as the build the Standalone column was read on, states that a build's own
user-agent default moves that column across a Chromium version, and states that the proof compares
by tag, property, and the preflight value alone rather than equating a user-agent default with a
recorded reading. The table itself is unchanged.

## Mutations (each reddened, then reverted)

Every mutation was applied to the working tree, run, read red, then reverted from the saved
original before the next one; the final tree carries only the intended edits (confirmed by
`git status --porcelain` after the last mutation).

1. **Caret placed 24px from the edge instead of 12px** (form-select.test.ts, resting reading):
   `sed` rewrote the resting regex's `12px` literals to `24px`.
   `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/form-select.test.ts`
   → `Tests 1 failed | 13 passed (14)`, `AssertionError: expected 'right 12px 50%, 12px 50%' to match /^(?:right 24px|calc\(100% - 24px\)) …/u`.
2. **Density-retuned caret asserted at 48px instead of 24px** (same file, density reading):
   rewrote that regex's `24px` literals to `48px`.
   Same command → `Tests 1 failed | 13 passed (14)`,
   `+ Received: "right 24px 50%, 24px 50%"` against the `48px` pattern.
3. **Mark asserted 20px from the edge instead of 9px** (validation.test.ts, marked-control case):
   rewrote the `right 9px|calc(100% - 9px)) 50%` alternation to `20px`.
   `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/validation.test.ts`
   → `Tests 2 failed | 19 passed (21)`,
   `AssertionError: expected 'right 9px 50%' to match /^(?:right 20px|calc\(100% - 20px\)) …/u`.
4. **Textarea top inset asserted 20px instead of 9px** (same file, both textarea sites):
   rewrote the `top 9px|... 9px)` alternation to `20px`.
   Same command → `Tests 4 failed | 17 passed (21)`,
   `AssertionError: expected 'right 9px top 9px' to match /^(?:right 9px top 20px|calc\(100% - 9px\) 20px)$/u`.
5. **Close mark sized 20px instead of the control's own font size** (close.test.ts):
   rewrote `expect(size).toBe(\`${String(em)}px\`)` to the literal `expect(size).toBe('20px')`.
   `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/close.test.ts`
   → `Tests 1 failed | 16 passed (17)`, `AssertionError: expected '14px' to be '20px'`.
6. **Preflight row dropped from the guide** (guides/veneer.md): removed the `a | tab-size | 8 | 4`
   row with `sed -i '510d'`.
   `npm run build:src:styles && npm run test:service`
   → `Tests 1 failed | 17 passed (18)`,
   `AssertionError: expected [ …(199) ] to deeply equal [ …(198) ]`, the diff naming
   `+ "a | tab-size | 4"` as the row present in the measured set and absent from the guide-derived
   set.

Every mutation was reverted from the file copied before editing began, and each file's scoped
proof was re-run green immediately after the revert (`14 passed`, `14 passed`, `21 passed`,
`21 passed`, `17 passed`, `18 passed` in turn), before the next mutation.

## Gates, each command and its result line

Commands run against `97ac9ab` before any edit (the record the acceptance criteria's baseline):

- `npm run build:src` → exit 0.
- `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/form-select.test.ts tests/src/styles/components/validation.test.ts tests/src/styles/components/close.test.ts` → `Test Files 3 passed (3)`, `Tests 52 passed (52)`.
- `npm run build:src:styles` → exit 0.
- `npm run test:service` → `Test Files 3 passed (3)`, `Tests 18 passed (18)`.

Commands run against the edited tree:

- `npm run format:check` → exit 0 (`All matched files use the correct format.`), after the local
  `npx oxfmt --config .oxfmtrc.json tests/src/styles/components/validation.test.ts` convergence run
  the standing condition permits on an owned file alone.
- `npm run lint:check` → exit 0.
- `npm run check` → exit 0 (`tsc`, `check:src:core`, `check:src:browser`, `check:src:styles`,
  `check:app:browser` all clean).
- `npm run build:src` → exit 0.
- `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/form-select.test.ts tests/src/styles/components/validation.test.ts tests/src/styles/components/close.test.ts` → `Test Files 3 passed (3)`, `Tests 52 passed (52)`.
- `npm run build:src:styles` → exit 0.
- `npm run test:service` → `Test Files 3 passed (3)`, `Tests 18 passed (18)`.
- `npm run test:guides` → `Test Files 1 passed (1)`, `Tests 19 passed (19)`.
- `npm run test:policy` → `Test Files 1 passed (1)`, `Tests 109 passed | 1 skipped (110)`.

`git status --porcelain` at hand-back reports exactly the five owned files: `guides/veneer.md`,
`tests/service/tailwind/preflight.test.ts`, `tests/src/styles/components/close.test.ts`,
`tests/src/styles/components/form-select.test.ts`, `tests/src/styles/components/validation.test.ts`.

## The guide sentence, verbatim

The preflight paragraph now reads (full paragraph, the added sentences following "each read on
Chromium 141"):

> The `Tag`, `Property`, `Standalone`, and `Preflight` columns name the element, the property, the
> value the shipped cascade alone resolves for it, and the value the `preflight` profile resolves,
> each read on Chromium 141. A build's own user-agent default for an element such as `select` or
> `table` moves the standalone column across a Chromium version, so the proof compares each measured
> move by tag, property, and the preflight value alone, and asserts the measured standalone value
> differs from it, rather than equating a user-agent default with a recorded reading. The Standalone
> column stays the Chromium 141 reading, informational. The proof holds the measured pairs and the
> recorded rows equal by tag, property, and preflight value, in both directions, so a move this table
> does not carry and a row the pairing no longer produces each redden.

## Deviations

None. The comparison was expressible without changing the guide's table (only the preflight
paragraph's prose changed), and every computed reading was taken through `readStyle`, `readPixels`,
and `getComputedStyle`'s own serialization, so the deviation contract's stop conditions were not
met.

## Ancillary choices settled

- Chose regex alternation on the resolved shorthand string over longhand parsing or a drawing probe
  for the `background-position` sites, because the shorthand's two known serializations are exactly
  what D45's evidence names, and the longhand form serializes the identical `right <length>`/`calc`
  ambiguity rather than resolving it.
- Left `readPreflightDepartures` and `tests/setupService.ts` untouched: the existing reader already
  exposes the `preflight` field the new comparison needs, so no reader edit and no new helper were
  required.
- Ran a scoped `oxfmt` write (no `--check`) confined to the one file it flagged, rather than the
  tree-wide `npm run format` this unit's permission floor forbids, to converge the format gate.

## Provenance

Native Claude subagent (`builder` on Sonnet); no bench lane, no journal.
