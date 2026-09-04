All gates green; the unit's 6 owned paths are unchanged and no new paths appear.

## Edits

**`/home/user/fleet/codec/guides/codec.md`** (`helpers.test.ts` Tests row):
Before: `Beside the sweeps sit the written-out membership rows that bind each guard to its decoder, the hex rows that pin `isHex` and `decodeHex` to the same answer, the named vectors, the named measures on each face, the canonical refusals, the Base64 alphabets read against the specification in both directions, the hex alphabet read against the language's own radix conversion in both directions, and guard totality against hostile values.`
After: `Beside the sweeps sit the named vectors, the named measures on each face, the canonical refusals, the Base64 alphabets read against the specification in both directions, and the hex alphabet read against the language's own radix conversion in both directions.`

**`/home/user/fleet/codec/guides/codec.md`** (`validators.test.ts` Tests row, O-1):
Before: `the totality of both guardless directions`
After: `the totality of the total Latin-1 decoder and of the guardless UTF-8 text side`

**`/home/user/scaffold/tmp/units/conform/conform-codec-report.md`**: fixed the codec-subj-4 row's citations from `tests/setup.ts:270`/`:252` to `:275`/`:257`; replaced the § Sweeps `kind` row with the re-run inflection sweep and its hits; appended `## Fix round 1` naming both lane files, each edit before/after, the sweep, and the R-1/R-2 rulings.

## Recorded sweep

`grep -rniE '\bkind(s|ed|ing)?\b'` over `src`, `tests` (minus the vendored set), `guides/codec.md`, `guides/README.md`, `README.md`:

- `src/core/validators.ts:93,136,162` and `guides/codec.md:113` — TSDoc phrase "a sibling view kind" and its mirrored guide cell (permitted).
- `README.md:9,28` and `guides/codec.md:66,93,109` — `Kind` table-column header the parity suite locates by header text (permitted).
- `tests/guides.test.ts:171` — foreign `symbol.kind` member of `@orkestrel/guide`'s `SurfaceSymbol` (permitted).
- `tests/setup.ts:636` — prose "sibling view kinds" (permitted).
- `guides/README.md` — no hit.

Every hit outside `tests/setup.ts:275` and its readers is a permitted sense, per the brief's ruling.

## `git status --short`

```
 M README.md
 M guides/codec.md
 M tests/guides.test.ts
 M tests/setup.ts
 M tests/src/core/helpers.test.ts
 A tests/src/core/validators.test.ts
```

## Gate exit codes

- `npm run format:check` — 0
- `npm run lint:check` — 0
- `npm run check` — 0
- `npm run test:guides` — 0
