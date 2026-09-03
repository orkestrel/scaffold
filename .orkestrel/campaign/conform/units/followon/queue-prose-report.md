# Unit queue-prose — report

## Sites

- `tests/src/core/stores/DatabaseQueueStore.test.ts:194`: "property access following compiles with NO `as` — the contract narrows the read)."
- `tests/src/core/stores/MemoryQueueStore.test.ts:12`: "The cases cover the surface and its semantics: a `save` → `load` round-trip by value, `save` upserts by id"
- `tests/guides.test.ts:47`: "intentional rather than forgotten — and the internal-name assertion fails when a name here stops being stranded, so the list cannot rot."
- `src/core/types.ts:106`: "Represents the per-attempt context a queue handler receives."

## Sweep

Pattern `\babove\b|\bbelow\b` and `\b(one|two|three|four|five|six|seven|eight|nine|ten)-?(method|member|step|case|stage|row)`, case-insensitive, over `tests/**/*.ts` excluding `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, and `tests/distribution.test.ts`.

- `above|below`: two remaining hits, both in `tests/policy.test.ts` and `tests/setupPolicy.ts` — both excluded files, ruled out of scope.
- Numbered-noun pattern: no hits in the swept scope.

The swept scope, after the three rewrites, reads empty of banned senses.

## Gates

- `format:check`: exit 0 — "All matched files use the correct format."
- `lint:check`: exit 0 — no output, no denied warnings.
- `check`: exit 0 — `tsc --noEmit` for the root project and `configs/src/tsconfig.core.json` both clean.
- `build`: exit 0 — `dist/src/core/index.js` and `.cjs` built, declaration files generated.
- `test`: exit 0 — main suite 111 passed, config 46 passed, setup 7 passed, guides 26 passed.

## Audit

`npx scaffold audit --offline`: "0 of 34 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 6."

## Evidence

`node /home/user/scaffold/tmp/work/evidence.mjs queue`:
- `/home/user/work/evidence/conform-queue.diff` 54 lines
- `/home/user/work/evidence/conform-queue.status` 4 entries

`git -C /home/user/fleet/queue status --short` lists only the four Owned paths: `src/core/types.ts`, `tests/guides.test.ts`, `tests/src/core/stores/DatabaseQueueStore.test.ts`, `tests/src/core/stores/MemoryQueueStore.test.ts`.
