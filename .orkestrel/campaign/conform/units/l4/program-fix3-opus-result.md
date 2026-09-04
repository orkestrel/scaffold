Unit complete. Returning the brief's Output section.

## Claim 2 rewrites

- `src/core/types.ts:251` — deleted the `ProgramInterface` doc block's `@remarks` naming the array-first `execute` overload order; the note now sits before the overload block as `// Array overload first so a subject list resolves to the batch form.`, the wording `src/core/programs/Program.ts:179` already carried.
- `src/core/types.ts:491` — deleted the `remove(ids)` `@remarks` sentence "Declared FIRST so an id list resolves here rather than to the single-id overload."; the note now sits before the overload block as `// Array overload first so an id list resolves to the batch form.`, matching `src/core/programs/ProgramManager.ts:242`. The vacuous-empty-list fact moved from `@returns` into `@remarks`.

The `overload|[Dd]eclared FIRST|declared first` sweep over `src/` returns only the single-line comments at `src/core/types.ts:251`, `src/core/types.ts:491`, `src/core/programs/Program.ts:179`, and `src/core/programs/ProgramManager.ts:242`.

## TSDoc sweep

Population: every `/** … */` block on an exported symbol or an interface member in `src/core/constants.ts`, `src/core/errors.ts`, `src/core/factories.ts`, `src/core/helpers.ts`, `src/core/types.ts`, `src/core/validators.ts`, `src/core/programs/Program.ts`, and `src/core/programs/ProgramManager.ts`. `src/core/index.ts` is a barrel and carries no doc block.

| Bullet | Sites rewritten |
| --- | --- |
| Comments explain why, never restate what self-explanatory code does | none |
| Every public export has complete TSDoc: description, `@param`, `@returns`, `@example` | `src/core/programs/Program.ts:93-105` and `src/core/programs/ProgramManager.ts:50-56` — each constructor carried no block, so neither parameterized public entry point documented a `@param` |
| First sentence in the third person with an `-s` verb, never repeating the symbol's name | none |
| Boolean parameter as "If `true`, …; if `false`, …" and boolean return as "True if …; false otherwise" | returns `src/core/types.ts:408,501,519` and `src/core/programs/ProgramManager.ts:127,252,270`; the `validate` boolean option field `src/core/types.ts:218-220,374-376` and `src/core/factories.ts:15-17` |
| A default written as "Default: …" | `src/core/factories.ts:15-17` |
| A thrown error written as "Thrown when …" | `src/core/helpers.ts:451-454` |
| A prerequisite and the failure behavior stated wherever the symbol has either | none |
| `@deprecated` names the replacement first, then the reason | none — the `@internal\|@deprecated\|@alpha\|@beta\|@public\|@private` sweep over `src/` returns empty |
| An options object documented as one `@param`, with its short fields under `@remarks` | none — `ProgramOptions` and `ProgramManagerOptions` carry their fields under `@remarks`, and each factory takes one `options` `@param` |
| Private methods and overload-specific notes as single-line `//` comments | `src/core/types.ts:251` and `src/core/types.ts:491`; no `#` private method carries a doc block |
| No speculative future product behavior | none |
| No `@internal` | none — same sweep as `@deprecated`, empty |

## Claim 4

`tests/setup.test.ts:313-321`, the case `createRecordingEngine > counts every destroy, so a suite can prove an owned engine was released once`, calls `destroy()` twice and asserts `destroyCount` reaches 2. The control planted `RecordingReason.destroy` at `tests/setup.ts:144-147` to increment `#destroyCount` only on its first call, then restored it by editing the line back. Command: `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setup.test.ts`.

- Red: `1 failed | 84 passed (85)` — `/home/user/work/evidence/program-proofs/program-obj-1-red2.txt`. The only failure is the named case, at `tests/setup.test.ts:320`, `expected 1 to be 2`.
- Green: `85 passed (85)` — `/home/user/work/evidence/program-proofs/program-obj-1-green2.txt`.

The report's program-obj-1 row, its plant paragraph, and its capture list now name these files, and `## Fix round 3` is appended to `/home/user/scaffold/tmp/units/conform/conform-program-report.md`.

## `git status --short`

```
 M README.md
 M guides/README.md
 M guides/program.md
 M src/core/constants.ts
 M src/core/errors.ts
 M src/core/factories.ts
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

`src/core/factories.ts` is the one path this round added to the incoming list. It is inside the round's owned scope (`src/core/**` doc blocks), the edit is comment-only, and it is the "Default: …" rewrite the sweep required. Acceptance criterion 3's "nothing new" reads against that grant; no untracked path appears and no vendored file is touched. Flagging it rather than deciding it.

## Exit codes

| Command | Exit | Reading | Capture under `/home/user/work/evidence/program-proofs/` |
| --- | --- | --- | --- |
| `npm run format:check` | 0 | All matched files use the correct format. | `fix3-gate-1-format-check.txt` |
| `npm run lint:check` | 0 | No diagnostic. | `fix3-gate-2-lint-check.txt` |
| `npm run check` | 0 | Root and `src:core` TypeScript checks pass. | `fix3-gate-3-check.txt` |
| `npm run test:guides` | 0 | 26 passed (26). | `fix3-gate-4-test-guides.txt` |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setup.test.ts` | 0 | 85 passed (85). | `program-obj-1-green2.txt` |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core` | 0 | 216 passed (216). | `fix3-src-core.txt` |

Deviation state: no stop condition fired. No doc rewrite needed a signature change, and no gate reddened.
