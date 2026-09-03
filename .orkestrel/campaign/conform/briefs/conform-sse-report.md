# conform-sse report (2026-09-03)

Package `@orkestrel/sse` at `/home/user/fleet/sse`, baseline `b639721`. The partial edits from the killed implementer were kept and completed; every row below is applied and the gate chain is green.

## Rows

| Row | Disposition | Note |
| --- | --- | --- |
| sse-obj-1 | applied | `sliceStream` exported from `tests/setup.ts`, `chunkings` routes through it, `drain` deleted, the four `SSEParser.test.ts` cases call `feedAll(new SSEParser(), sliceStream(stream, N))`, `describe('sliceStream')` added to `tests/setup.test.ts` (rejoin, oversize, empty). Partial carried it; verified by sweep and gates. |
| sse-obj-2 | applied | `buildRepeated` deleted from `tests/setup.ts`, import and describe block removed, E1 uses `'data: x\n\n'.repeat(10000)`, header clause at `tests/setup.test.ts` dropped. The E1 rewrite was the missing piece of the partial (it failed `check` with TS2304). |
| sse-obj-3 | applied | `describe('flagship fences')` in `tests/guides.test.ts` transcribes the Surface, Constants, Errors, Factories, Methods, flush, sticky, and limit fences of `guides/sse.md` plus the README Usage fence, each beside a presence guard; README read with `readFileSync(new URL('README.md', root), 'utf8')`, `ROOT_FILES` untouched. |
| sse-obj-4 | applied | `captureError` from `@orkestrel/test` replaces the three hand-rolled try/catch sites: `SSEParser.test.ts` cases (b) and (d), and `factories.test.ts` F2 options case. Loop case (e) left unchanged. |
| sse-obj-5 | applied | `probe`/`probe.polluted` lines deleted; `expect(Object.getPrototypeOf(requireValue(first[0]))).toBe(Object.prototype)` asserts the `__proto__` stream. |
| sse-obj-7 | applied | Catalog comment citing `scratchpad/sse-test-catalog.md` deleted; `tests/setup.ts` header and constants banner rewritten as ruled; `tests/setup.test.ts` header rewritten. |
| sse-subj-1 | applied | README fence sends `id: 7`, dispatches `{ data: '1', event: 'ping', id: '7' }`, and documents `parser.id // '7'`. Executed by the README transcription in `tests/guides.test.ts`. |
| sse-subj-2 | applied | README Requirements reads `- Node.js >= 22.12.0`; `engines` untouched. |
| sse-subj-3 | applied | `errors.ts:3` → `.claude/rules/typescript.md, Errors and outcomes:`; `guides/sse.md` and `guides/README.md` → `(AGENTS.md, Documentation contract)` and `the rules, including the documentation contract`; `SSEParser.test.ts:23` → `(.claude/rules/tests.md, Test contract)`. `tests/setup.ts` rows carried by sse-obj-7. |
| sse-subj-4 | applied | `guides/sse.md` BOM row and `constants.ts` TSDoc read `stripped from the first non-empty chunk`. Table realigned by the scoped formatter. |
| sse-subj-5 | applied | `@param chunk` and `@returns` added to `SSEParserInterface.parse` before `@throws`. |
| sse-subj-6 | applied | `via` → `through` at `SSEParser.ts` (three sites) and `README.md:8`; `e.g.` → `for example` in `tests/setup.ts`; D1 title reads `__proto__ is an ignored or valued field`; G0 title reads `G0 the corpus dispatches events`. Wire literal `': just a comment'` left alone. |
| sse-subj-7 | applied | `(see the following bullet)`, `the following method table and are documented after it`, `The following constants`, `the twin assertion`, `the following cases`. |
| sse-subj-8 | applied | `factories.test.ts` header names `this file`; `guides/README.md` reads `with no \`@orkestrel/*\` runtime dependencies`. The count row on `tests/guides.test.ts:2` was discharged by sse-subj-7. Adjacent observation (guides/README.md:20) corrected in the same pass, see § Deviations. |

## Files touched

- `/home/user/fleet/sse/README.md` — Node floor 22.12.0, `via` → `through`, Usage fence sends `id: 7` and documents `parser.id // '7'`.
- `/home/user/fleet/sse/guides/README.md` — section-number citations replaced by section names, `zero` → `no`, dependency-mirror sentence corrected and the four sibling mirrors named.
- `/home/user/fleet/sse/guides/sse.md` — BOM row says first non-empty chunk, `(AGENTS §22)` and `below` replaced, Constants table realigned.
- `/home/user/fleet/sse/src/core/SSEParser.ts` — class TSDoc: `via` → `through`, `(see below)` → `(see the following bullet)`.
- `/home/user/fleet/sse/src/core/constants.ts` — `BOM` TSDoc says first non-empty chunk.
- `/home/user/fleet/sse/src/core/errors.ts` — comment cites `.claude/rules/typescript.md, Errors and outcomes`.
- `/home/user/fleet/sse/src/core/types.ts` — `parse` doc block gains `@param chunk` and `@returns`.
- `/home/user/fleet/sse/tests/guides.test.ts` — header prose fixed; `flagship fences` block executes every guide fence and the README Usage fence with presence guards.
- `/home/user/fleet/sse/tests/setup.ts` — header and banner rewritten, `sliceStream` added, `chunkings` routes through it, `buildRepeated` deleted, `e.g.` → `for example`.
- `/home/user/fleet/sse/tests/setup.test.ts` — header rewritten, `buildRepeated` block replaced by `sliceStream` block, import line formatted.
- `/home/user/fleet/sse/tests/src/core/SSEParser.test.ts` — `drain` replaced by `sliceStream`, catalog comment removed, citation renamed, D1 prototype assertion, E1 `.repeat`, `captureError` at (b) and (d), titles reworded.
- `/home/user/fleet/sse/tests/src/core/factories.test.ts` — `captureError` import and use, header voice.

Diffstat: 12 files changed, 280 insertions(+), 115 deletions(-). No file was created, so `git add -N` had nothing to mark.

## Failing-first evidence

- Partial tree at unit start: `npm run check` exit 2 (`TS6133 captureError unused`, `TS2304 Cannot find name 'buildRepeated'` at `SSEParser.test.ts:782`); `npm run test:src` exit 1, 1 failed | 119 passed (120). After the sse-obj-2 and sse-obj-4 edits: `npm run check` exit 0; `npm run test:src` exit 0, 120 passed (120).
- sse-obj-3 / sse-subj-1 mutation probe: with README.md:37 reverted to `parser.id // '1' - sticky last-event-id, survives dispatch`, `npm run test:guides` exit 1, 1 failed | 35 passed (36), failing test `flagship fences > carries the README usage fence lines the transcription copies`. Restored: exit 0, 36 passed (36). The executed transcription `returns the README usage fence values, its sticky id included` asserts `parser.id` is `'7'` against the real parser.
- sse-obj-5: adequacy row; the new assertion runs green against the real `#dispatch` (`npm run test:src` 120 passed). No source mutation was run.

## Sweeps

Population: `src/core/*.ts guides/sse.md guides/README.md README.md tests/setup.ts tests/setup.test.ts tests/guides.test.ts tests/src/core/SSEParser.test.ts tests/src/core/factories.test.ts` (vendored `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, and the vendored guide mirrors excluded). `grep -n -i -E`, each pattern empty unless noted: `\bbuildRepeated\b`, `buildRepeat(s|ed|ing)`, `\bdrain\b`, `\bdrain(s|ed|ing)\b`, `probe\.polluted`, `scratchpad`, `AGENTS §`, `§[0-9]`, `\bvia\b`, `e\.g\.`, `\bsanity\b`, `\bbelow\b`, `\babove\b`, `\bwe\b`, `zero \``, `very first`, `recorder infrastructure`, `Node.js >= 24`, `parser.id // '1'`. `\bjust\b` matches only the wire literal at `tests/src/core/SSEParser.test.ts:182` (`': just a comment\n\n'`), permitted per the row.

## Gates

| Command | Exit |
| --- | --- |
| `npm run format:check` | 0 — "All matched files use the correct format." (37 files) |
| `npm run lint:check` | 0 |
| `npm run check` | 0 |
| `npm run build` | 0 |
| `npm test` | 0 — src:core 120 passed, policy 111 passed, config 46 passed, setup 17 passed, guides 36 passed |

`git status --short` lists only Owned files (see `/home/user/work/evidence/conform-sse.status`).

## Breaking

None. No published symbol was renamed or removed; `buildRepeated` and `drain` were test-only.

## Shared-file patches

None.

## Deviations

None stopping. Ancillary decisions recorded:

- guides/README.md:20 (the observation the refuter attached to sse-subj-8): the sentence "it has no dependency-mirror guides to list here" contradicted the four sibling mirrors `contract.md`, `probe.md`, `scaffold.md`, and `test.md`. Rewritten to say no runtime-dependency mirror sits beside the index and that the mirrors present are devDependency guides, and the four are named with links after the `guide.md` paragraph. `npm run test:guides` resolves the links (36 passed).
- Scoped `oxfmt --write` was run on `guides/sse.md`, `tests/guides.test.ts`, and `tests/setup.test.ts` only, to realign the Constants table and the partial's two wrapped statements. No tree-wide mutating command was run outside the gate chain.
- Observation: `npm test` ran with no concurrent load in this checkout; the Orchestrator's deciding run is still owed per the brief.
