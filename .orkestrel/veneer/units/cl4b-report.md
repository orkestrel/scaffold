# Unit CL4b report

## Obligation 1 — horizontal rule border reset

Change site: `tests/setupStyles.ts`, `TEXT_HR_CASES`' frozen `values` object. Added three entries,
each `'0px'`:

```ts
'border-inline-start-width': '0px',
'border-inline-end-width': '0px',
'border-block-end-width': '0px',
```

No other entry in `values` changed. `tests/src/styles/elements/hr.test.ts` needed no edit; it
derives the property list from `Object.keys(values)`.

### Red proof

Plant: `src/styles/elements/_hr.scss:5-7` replaced

```scss
@include box-reset {
	color: inherit;
}
```

with

```scss
margin: 0;
color: inherit;
```

which drops the mixin's `border: 0` emission.

Command: `npm run build:src:styles` then
`npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/elements/hr.test.ts`

Failing output (both `light` and `dark` mode cases failed, exactly the three new width entries
wrong; margin, block-start width/style, opacity, and color all matched):

```
AssertionError: expected { margin: '0px', …(6) } to deeply equal { margin: '0px', …(6) }

- Expected
+ Received

  {
-   "border-block-end-width": "0px",
+   "border-block-end-width": "1px",
    "border-block-start-style": "solid",
    "border-block-start-width": "1px",
-   "border-inline-end-width": "0px",
-   "border-inline-start-width": "0px",
+   "border-inline-end-width": "1px",
+   "border-inline-start-width": "1px",
    "margin": "0px",
    "opacity": "0.2",
  }

 Test Files  1 failed (1)
      Tests  2 failed (2)
```

Restoration: reverted `_hr.scss` to the `@include box-reset { color: inherit; }` form exactly as
it stands at `bc580c1`. `git diff src/styles/elements/_hr.scss` returned no output before the
rebuild, confirming byte-identical restoration.

Green rerun: `npm run build:src:styles` then the same vitest command.

```
 Test Files  1 passed (1)
      Tests  2 passed (2)
```

Plant removal evidence: final `git status --porcelain --untracked-files=all` (below) lists no
`src/styles/` path.

## Obligation 2 — content section independent control

Change site: `tests/app/browser/sections/ContentSection.test.ts`, inside the existing `it` case,
immediately after the existing `data-specimen` name assertion. Added:

```ts
expect(CONTENT_SPECIMENS.map((specimen) => specimen.name)).toEqual([
	'Heading 1',
	'Heading 2',
	// ... every CONTENT_SPECIMENS name from app/browser/constants.ts, in table order
	'Progress',
])
```

Transcribed from `app/browser/constants.ts:241-352` (`CONTENT_SPECIMENS`), in table order, with no
other assertion in the file changed and no case added.

### Red proof

Plant: `app/browser/constants.ts` — the first entry's `name` changed from `'Heading 1'` to
`'Renamed heading one'` (a value no other specimen name uses).

Command:
`npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/ContentSection.test.ts`

Failing output (new literal-array assertion caught the rename; the existing `data-specimen`
comparison against the same renamed table could not):

```
AssertionError: expected [ 'Renamed heading one', …(42) ] to deeply equal [ 'Heading 1', 'Heading 2', …(41) ]

- Expected
+ Received

  [
-   "Heading 1",
+   "Renamed heading one",
    "Heading 2",
    "Heading 3",
    ...

 ❯ tests/app/browser/sections/ContentSection.test.ts:18:62

 Test Files  1 failed (1)
      Tests  1 failed | 1 passed (2)
```

Restoration: reverted `app/browser/constants.ts` to `'Heading 1'`. `git diff --stat
app/browser/constants.ts` returned no output, confirming byte-identical restoration.

Green rerun: the same vitest command.

```
 Test Files  1 passed (1)
      Tests  2 passed (2)
```

Plant removal evidence: final `git status --porcelain --untracked-files=all` (below) lists no
`app/` path.

## Chain

Run from the Veneer checkout root, each step's exit code and final lines:

1. `npm run format:check` — exit 0. `All matched files use the correct format. Finished in 830ms
   on 172 files using 16 threads.`
2. `npm run lint:check` — exit 0. No output beyond the command echo (no warnings or errors).
3. `npm run check` — exit 0. Ran `tsc --noEmit` on `tsconfig.json`, `check:src:core`,
   `check:src:browser`, `check:src:styles`, and `check:app:browser` (`vue-tsc`); no diagnostics.
4. `npm run build` — exit 0. `build:src:core`, `build:src:browser`, `build:src:styles`, and
   `build:app:browser` all completed (`✓ built in ...`).
5. `npm run test:src:styles` — exit 0. `Test Files  46 passed (46)` / `Tests  199 passed (199)`.
6. `npm run test:setup` — exit 0. `Test Files  3 passed (3)` / `Tests  129 passed (129)`.
7. `npm run test:app:browser` — exit 0. `Test Files  4 passed (4)` / `Tests  13 passed (13)`.

## Final tree state

`git diff --stat`:

```
 tests/app/browser/sections/ContentSection.test.ts | 45 +++++++++++++++++++++++
 tests/setupStyles.ts                              |  3 ++
 2 files changed, 48 insertions(+)
```

`git status --porcelain --untracked-files=all`:

```
 M tests/app/browser/sections/ContentSection.test.ts
 M tests/setupStyles.ts
```

Only the two owned files are changed. `src/styles/elements/_hr.scss` and
`app/browser/constants.ts` are absent from the status output, confirming both plants were removed
and each file matches `bc580c1`. (`cl4b-report.md` itself is ignored by the checkout's
`tmp/` exclusion and does not appear in the status.)

## Deviations

None. Both red proofs reddened exactly as predicted (only the newly guarded properties/assertion
failed), both restorations left the tree identical to `bc580c1` on the planted files, and closing
both obligations needed only the files the brief names.
