## Controls table

| Row | Command | Red | Green |
| --- | --- | --- | --- |
| program-obj-1 | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setup.test.ts` | 1 failed, 84 passed — `program-obj-1-red.txt` | 85 passed — `program-obj-1-green.txt` |
| program-obj-2 | same setup command | 1 failed, 84 passed — `program-obj-2-red.txt` | 85 passed — `program-obj-2-green.txt` |
| program-obj-5 | same setup command | 1 failed, 84 passed — `program-obj-5-red.txt` | 85 passed — `program-obj-5-green.txt` |
| program-obj-4 | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/helpers.test.ts` | 1 failed, 73 passed — `program-obj-4-red.txt` | 74 passed — `program-obj-4-green.txt` |
| program-obj-6 | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/factories.test.ts` | 1 failed, 6 passed — `program-obj-6-red.txt` | 7 passed — `program-obj-6-green.txt` |
| program-obj-3 | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project guides tests/guides.test.ts` | 1 failed, 25 passed — `program-obj-3-red.txt` | 26 passed — `program-obj-3-green.txt` |

## Presence guard

`tests/guides.test.ts:257` adds the `gates`, qualification/ruling, and base quantitative-rating setup.

## Split `@throws` rows

- `src/core/helpers.ts:68,69`
- `src/core/types.ts:267,269,272,298,300,303,467,469,472,474`
- `src/core/programs/Program.ts:180,182,185,211,213,216`
- `src/core/programs/ProgramManager.ts:191,193,196,198`

Each row names one code and starts with “Thrown when”.

## O1 sentences

`src/core/types.ts:462-463` and `src/core/programs/ProgramManager.ts:186-187`:

> After appending the program, the `add` event fires with its id.

## O2 shape

`tests/guides.test.ts:229-252` wraps execution and assertions in `try`, with `program.destroy()` in `finally`.

## R1 sentence

`guides/program.md:174-176`:

> `completeTallies` writes every `Status` member as a literal record, and `isTallies` checks membership through `STATUSES`.

## `git status --short`

```text
 M README.md
 M guides/README.md
 M guides/program.md
 M src/core/constants.ts
 M src/core/errors.ts
 M src/core/helpers.ts
 M src/core/programs/Program.ts
 M src/core/programs/ProgramManager.ts
 M src/core/types.ts
 M src/core/validators.ts
 M tests/guides.test.ts
 M tests/setup.test.ts
 M tests/setup.ts
 M tests/src/core/factories.test.ts
 M tests/src/core/helpers.test.ts
 M tests/src/core/programs/Program.test.ts
 M tests/src/core/programs/ProgramManager.test.ts
 M tests/src/core/validators.test.ts
```

## Exit codes

| Run | Exit |
| --- | --- |
| `npm run format:check` | 0 |
| `npm run lint:check` | 0 |
| `npm run check` | 0 |
| scoped `guides` | 0 |
| scoped `setup` | 0 |
| scoped `src:core` helpers | 0 |
| scoped `src:core` Program | 0 |
| scoped `src:core` ProgramManager | 0 |