# conform-sse report (2026-09-03, fix round 1)

Package `@orkestrel/sse` at `/home/user/fleet/sse`, unit baseline `b639721`. Every row is applied,
every audit finding is closed, and the gate chain is green.

The unit's first pass is committed as the checkpoint `b003c67`. Fix round 1 sits uncommitted on top
of it, over the Orchestrator's later `bf34b39` (manifest ranges and lockfile only, not this unit).
`/home/user/work/evidence/conform-sse.diff` is therefore `git diff b639721` over the unit's paths
with `package.json` and `package-lock.json` excluded, and it carries the whole unit — checkpoint plus
fix round. `/home/user/work/evidence/conform-sse.status` carries the raw `git status --short` for the
fix round and the unit-wide `git diff --name-status` beside it, each labelled with the command that
produced it.

## Rows

| Row | Disposition | Note |
| --- | --- | --- |
| sse-obj-1 | applied | `sliceStream` exported from `tests/setup.ts`, `chunkings` routes through it, `drain` deleted, the four `SSEParser.test.ts` cases call `feedAll(new SSEParser(), sliceStream(stream, N))`, `describe('sliceStream')` added to `tests/setup.test.ts` (rejoin, oversize, empty). |
| sse-obj-2 | applied | `buildRepeated` deleted from `tests/setup.ts`, import and describe block removed, E1 uses `'data: x\n\n'.repeat(10000)`, header clause at `tests/setup.test.ts` dropped. |
| sse-obj-3 | applied | `describe('flagship fences')` in `tests/guides.test.ts` transcribes the Surface, Constants, Errors, Factories, Methods, flush, sticky, and limit fences of `guides/sse.md` plus the README Usage fence, each beside a presence guard; README read with `readFileSync(new URL('README.md', root), 'utf8')`, `ROOT_FILES` untouched. Fix round 1 completed the Surface presence guard (finding F3). |
| sse-obj-4 | applied | `captureError` from `@orkestrel/test` replaces the three hand-rolled try/catch sites: `SSEParser.test.ts` cases (b) and (d), and `factories.test.ts` F2 options case. Loop case (e) left unchanged. |
| sse-obj-5 | applied | `probe`/`probe.polluted` deleted; the ruled `expect(Object.getPrototypeOf(requireValue(first[0]))).toBe(Object.prototype)` asserts the `__proto__` stream. Fix round 1 proved that assertion blind to the field-name vector and added the covering own-key assertion the objective lane prescribed; see § Fix round 1 and § Failing-first evidence. |
| sse-obj-7 | applied | Catalog comment citing `scratchpad/sse-test-catalog.md` deleted; `tests/setup.ts` header and constants banner rewritten as ruled; `tests/setup.test.ts` header rewritten. |
| sse-subj-1 | applied | README fence sends `id: 7`, dispatches `{ data: '1', event: 'ping', id: '7' }`, and documents `parser.id // '7'`. Executed by the README transcription in `tests/guides.test.ts`. |
| sse-subj-2 | applied | README Requirements reads `- Node.js >= 22.12.0`; `engines` untouched. |
| sse-subj-3 | applied | `errors.ts:3` cites `.claude/rules/typescript.md, Errors and outcomes`; `guides/sse.md` and `guides/README.md` cite `(AGENTS.md, Documentation contract)` and `the rules, including the documentation contract`; `SSEParser.test.ts:23` cites `(.claude/rules/tests.md, Test contract)`. The `tests/setup.ts` rows are carried by sse-obj-7. |
| sse-subj-4 | applied | `guides/sse.md` BOM row and `constants.ts` TSDoc read `stripped from the first non-empty chunk`. |
| sse-subj-5 | applied | `@param chunk` and `@returns` added to `SSEParserInterface.parse` before `@throws`. |
| sse-subj-6 | applied | `via` → `through` at `SSEParser.ts:25,27,28` and `README.md:8`; `e.g.` → `for example` in `tests/setup.ts`; D1 title reads `__proto__ is an ignored or valued field`; G0 title reads `G0 the corpus dispatches events`. Wire literal `': just a comment'` left alone. |
| sse-subj-7 | applied | `(see the following bullet)`, `the following method table and are documented after it`, `The following constants`, `the twin assertion`, `the following cases`. |
| sse-subj-8 | applied | `factories.test.ts` header names `this file`; `guides/README.md` reads `with no \`@orkestrel/*\` runtime dependencies`. The count row on `tests/guides.test.ts:2` was discharged by sse-subj-7. |

## Fix round 1

The objective lane returned FAIL on claim 4 with finding F1 blocking, and findings F2 and F3
non-blocking. The checker lane returned PASS with no finding. Each is closed here.

- **Claim 4 — sse-obj-5 carried no failing-first proof.** Closed by running the probe the lane
  required and then adopting the lane's own prescribed assertion. The probe refutes the row's
  operative claim: the ruled prototype assertion cannot fail for the `__proto__`-field vector D1
  names. `tests/src/core/SSEParser.test.ts:722` now also carries
  `expect(Object.hasOwn(requireValue(first[0]), '__proto__')).toBe(false)`, the assertion referral R1
  named, and a mutation probe reddens exactly that line and nothing else. Counts and mutations are in
  § Failing-first evidence. Referral R1's reading holds in full and is recorded there.
- **F1 — the `tests/guides.test.ts` header claimed the constants were the only package-specific
  part.** The shipped file contradicts that: the `flagship fences` block names `guides/sse.md`,
  imports the SSE barrel, and asserts this package's own values. Closed by adopting the lane's
  prescribed rewrite at `tests/guides.test.ts:1-4`, which names the constants and the
  `flagship fences` block as the parts a sibling package changes and states no count.
- **F2 — `src/core/errors.ts:3` ran 119 columns against a `printWidth` of 100.** Closed by
  rewrapping `src/core/errors.ts:3-7` with the text unchanged; the widest line is now 99 columns
  (`awk 'NR<=8 {printf "%d:%d\n", NR, length($0)}' src/core/errors.ts`).
- **F3 — the Surface presence guard omitted the fence's `parser.clear()` line.** Closed by adding
  `expect(guideText).toContain('parser.clear() // drop any buffered partial line / event - ready for a fresh stream')`
  to `carries the Surface fence lines the transcription copies`, and by proving the guard reddens; see
  § Failing-first evidence.
- **R2 — gate evidence, including whether the policy suite accepts a cross-cutting proof that now
  executes source.** `npm test` exits 0 with `policy` 111 passed and `guides` 36 passed, so the
  `guides` project resolves `@src/core` and `./setup.js` and the policy sweep reports nothing against
  the executed block. The Orchestrator's own deciding run is still owed; this reading is the unit's.

## Files touched

- `/home/user/fleet/sse/README.md` — Node floor 22.12.0, `via` → `through`, Usage fence sends `id: 7` and documents `parser.id // '7'`.
- `/home/user/fleet/sse/guides/README.md` — section-number citations replaced by section names, `zero` → `no`, dependency-mirror sentence corrected and the sibling mirrors named.
- `/home/user/fleet/sse/guides/sse.md` — BOM row says first non-empty chunk, `(AGENTS §22)` and `below` replaced, Constants table realigned.
- `/home/user/fleet/sse/src/core/SSEParser.ts` — class TSDoc: `via` → `through`, `(see below)` → `(see the following bullet)`.
- `/home/user/fleet/sse/src/core/constants.ts` — `BOM` TSDoc says first non-empty chunk.
- `/home/user/fleet/sse/src/core/errors.ts` — comment cites `.claude/rules/typescript.md, Errors and outcomes`, and fix round 1 rewrapped the paragraph under 100 columns.
- `/home/user/fleet/sse/src/core/types.ts` — `parse` doc block gains `@param chunk` and `@returns`.
- `/home/user/fleet/sse/tests/guides.test.ts` — header prose fixed and, in fix round 1, corrected to name the `flagship fences` block; that block executes every guide fence and the README Usage fence with presence guards, the Surface guard now covering its `parser.clear()` line.
- `/home/user/fleet/sse/tests/setup.ts` — header and banner rewritten, `sliceStream` added, `chunkings` routes through it, `buildRepeated` deleted, `e.g.` → `for example`.
- `/home/user/fleet/sse/tests/setup.test.ts` — header rewritten, `buildRepeated` block replaced by `sliceStream` block.
- `/home/user/fleet/sse/tests/src/core/SSEParser.test.ts` — `drain` replaced by `sliceStream`, catalog comment removed, citation renamed, D1 prototype and own-key assertions, E1 `.repeat`, `captureError` at (b) and (d), titles reworded.
- `/home/user/fleet/sse/tests/src/core/factories.test.ts` — `captureError` import and use, header voice.

Diffstat for the whole unit (`git diff --stat b639721` over the unit's paths): 12 files changed,
289 insertions(+), 119 deletions(-). No file was created, so `git add -N .` marked nothing.

## Failing-first evidence

- Partial tree at unit start: `npm run check` exit 2 (`TS6133 captureError unused`,
  `TS2304 Cannot find name 'buildRepeated'` at `SSEParser.test.ts:782`); `npm run test:src` exit 1,
  1 failed | 119 passed (120). After the sse-obj-2 and sse-obj-4 edits: `npm run check` exit 0;
  `npm run test:src` exit 0, 120 passed (120).
- sse-obj-3 / sse-subj-1 mutation probe: with `README.md:37` reverted to
  `parser.id // '1' - sticky last-event-id, survives dispatch`, `npm run test:guides` exit 1,
  1 failed | 35 passed (36), failing test
  `flagship fences > carries the README usage fence lines the transcription copies`. Restored: exit 0,
  36 passed (36).
- sse-obj-5 mutation probe (fix round 1). Baseline `npm run test:src` exit 0, 120 passed (120). Each
  mutation planted the parsed field name on the dispatched event in `src/core/SSEParser.ts`, through
  an `#extra` accumulator filled from the unknown-field branch of `#field` and merged in `#dispatch`;
  the file was restored from a byte copy after each run and its digest re-read
  (`1502b55f4ab7a5e8dd174b115d90a7fd6011ed90b4f9c64dbca5be65093c815d`).
  - `[[Set]]` shape (`target[name] = this.#extra[name]`): `npm run test:src` exit 1,
    7 failed | 113 passed (120). D1 is **not** among the failures. `Object.prototype`'s `__proto__`
    setter refuses a string value, so no own key and no prototype change occurs, and neither the
    ruled prototype assertion nor the pre-existing `toEqual` can see the mutation.
  - `CreateDataProperty` shape (`{ ...event, ...this.#extra }` over an `#extra` built with a computed
    key): `npm run test:src` exit 1, 8 failed | 112 passed (120). D1 fails at
    `tests/src/core/SSEParser.test.ts:720`, the pre-existing `toEqual`, reporting
    `expected [ { data: 'y', __proto__: 'x' } ] to deeply equal [ { data: 'y' } ]`. The ruled
    prototype assertion at line 721 still holds: the prototype is unchanged.
  - Isolating control (`Object.defineProperty(event, name, { value })`, so the planted own key is
    non-enumerable and invisible to `toEqual`): with the added assertion in place,
    `npm run test:src` exit 1, 1 failed | 119 passed (120), the sole failure being D1 at
    `tests/src/core/SSEParser.test.ts:722` — `expected true to be false`. Neither line 720 nor line
    721 reddens. Source restored: `npm run test:src` exit 0, 120 passed (120).
  - Reading: the ruled assertion cannot fail for the vector D1 names, and the added own-key assertion
    fails for it alone. Both stay — the prototype assertion still reddens for an event that is not a
    plain object, and the own-key assertion covers the field-name vector.
- F3 presence-guard control (fix round 1). Baseline `npm run test:guides` exit 0, 36 passed (36).
  With `guides/sse.md:34` shortened to
  `parser.clear() // drop any buffered partial line - ready for a fresh stream`,
  `npm run test:guides` exit 1, 1 failed | 35 passed (36), failing test
  `flagship fences > carries the Surface fence lines the transcription copies`. Guide restored from a
  byte copy (digest `3a9cd724e24b75196d6d524602537961906c04db446f4891e0191bbc6803fd7a`):
  exit 0, 36 passed (36).

## Sweeps

Population: `src/core/*.ts`, `guides/sse.md`, `guides/README.md`, `README.md`, `tests/setup.ts`,
`tests/setup.test.ts`, `tests/guides.test.ts`, `tests/src/core/SSEParser.test.ts`,
`tests/src/core/factories.test.ts`, `tests/distribution.test.ts` (the vendored `tests/setupPolicy.ts`,
`tests/policy.test.ts`, `tests/config.test.ts`, and the vendored guide mirrors excluded).

`grep -rn -i -E`, empty over that population:
`buildRepeat|\bdrain\b|probe\.polluted|scratchpad|AGENTS §|§[0-9]|\bvia\b|e\.g\.|\bsanity\b|\bbelow\b|\babove\b|very first|recorder infrastructure|Node\.js >= 24|zero \`|only part`.

`grep -rn -i -E` over the same population for
`\bjust\b|\bwe\b|\bour\b|let's|\bshould\b|simply|\beasy\b|currently|utilize|leverage|in order to|\betc\.|performant|allows you to|and/or|sanity check|dummy|blacklist|whitelist`
returns the permitted wire literal at `tests/src/core/SSEParser.test.ts:182`
(`': just a comment\n\n'`) and one hit outside this unit's rows, recorded under § Observations.

## Gates

Each command was run bare in `/home/user/fleet/sse` with its output captured to a file, not piped.

| Command | Exit | Reading |
| --- | --- | --- |
| `npm run format:check` | 0 | "All matched files use the correct format." on 37 files |
| `npm run lint:check` | 0 | no output |
| `npm run check` | 0 | root `tsc --noEmit` then `check:src:core` |
| `npm run build` | 0 | `dist/src/core/index.js` 12.10 kB, `index.cjs` 12.28 kB, declarations copied |
| `npm test` | 0 | src:core 120 passed, policy 111 passed, config 46 passed, setup 17 passed, guides 36 passed |

`git status --short` lists only files under Owned (see
`/home/user/work/evidence/conform-sse.status`).

## Breaking

None. No published symbol was renamed or removed; `buildRepeated` and `drain` were test-only, and
`sliceStream` is a `tests/setup.ts` helper outside the packed surface (`package.json` ships
`dist/src` and `README.md`).

## Shared-file patches

None.

## Deviations

None stopping. Ancillary decisions recorded:

- `guides/README.md:20` (the observation the refuter attached to sse-subj-8): the sentence
  "it has no dependency-mirror guides to list here" contradicted the sibling mirrors `contract.md`,
  `probe.md`, `scaffold.md`, and `test.md`. Rewritten to say no runtime-dependency mirror sits beside
  the index and that the mirrors present are devDependency guides, with each named and linked after
  the `guide.md` paragraph.
- A scoped `oxfmt --write` was run in the first pass on `guides/sse.md`, `tests/guides.test.ts`, and
  `tests/setup.test.ts` only. Fix round 1 ran no mutating command outside the gate chain; its edits
  pass `format:check` as written.
- Both fix-round probes mutated a tracked file and restored it by copying back a byte copy taken
  before the mutation, never with a discarding git command. Each restore was confirmed by digest and
  by `git status --short`.

## Observations

- `src/core/SSEParser.ts:157` reads "Total characters currently buffered". `currently` is a
  substitution-table row in `.claude/rules/writing.md` § Substitutions. No row of this brief names
  that site and no audit lane raised it, so it is recorded against sse-subj-6's capability for the
  next matrix rather than edited here.
- `npm test` ran with no concurrent load in this checkout. The Orchestrator's deciding run is still
  owed.
