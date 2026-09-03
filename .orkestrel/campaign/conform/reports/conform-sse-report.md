# conform-sse report (2026-09-03, fix round 2)

Package `@orkestrel/sse` at `/home/user/fleet/sse`, unit baseline `b639721`. Every row is applied,
every audit finding from both rounds is closed, and the gate chain is green.

The unit's first pass is committed as the checkpoint `b003c67`. Fix rounds 1 and 2 sit uncommitted
on top of it, over the Orchestrator's later `bf34b39` (manifest ranges and lockfile only, not this
unit). `/home/user/work/evidence/conform-sse.diff` is therefore `git diff b639721` over the unit's
paths with `package.json` and `package-lock.json` excluded, and it carries the whole unit —
checkpoint plus both fix rounds. `/home/user/work/evidence/conform-sse.status` carries the raw
`git status --short`, the unit-wide `git diff --name-status`, and the two commands that prove the
manifest exclusion hides nothing.

## Rows

| Row | Disposition | Note |
| --- | --- | --- |
| sse-obj-1 | applied | `sliceStream` exported from `tests/setup.ts`, `chunkings` routes through it, `drain` deleted, each `SSEParser.test.ts` case that consumed `drain` calls `feedAll(new SSEParser(), sliceStream(stream, N))`, `describe('sliceStream')` added to `tests/setup.test.ts` (rejoin, oversize, empty). |
| sse-obj-2 | applied | `buildRepeated` deleted from `tests/setup.ts`, import and describe block removed, E1 uses `'data: x\n\n'.repeat(10000)`, header clause at `tests/setup.test.ts` dropped. |
| sse-obj-3 | applied | `describe('flagship fences')` in `tests/guides.test.ts` transcribes the Surface, Constants, Errors, Factories, Methods, flush, sticky, and limit fences of `guides/sse.md` plus the README Usage fence, each beside a presence guard; README read with `readFileSync(new URL('README.md', root), 'utf8')`, `ROOT_FILES` untouched. Fix round 1 completed the Surface presence guard. Fix round 2 rebuilt every guard as a whole-fence-body binding and put sticky state under the Methods fence's `clear()` claim; see § Fix round 2. |
| sse-obj-4 | applied | `captureError` from `@orkestrel/test` replaces the hand-rolled try/catch sites: `SSEParser.test.ts` cases (b) and (d), and `factories.test.ts` F2 options case. Loop case (e) left unchanged. |
| sse-obj-5 | applied | `probe`/`probe.polluted` deleted; the ruled `expect(Object.getPrototypeOf(requireValue(first[0]))).toBe(Object.prototype)` asserts the `__proto__` stream. Fix round 1 proved that assertion blind to the field-name vector and added the covering own-key assertion the objective lane prescribed; see § Fix round 1 and § Failing-first evidence. |
| sse-obj-7 | applied | Catalog comment citing `scratchpad/sse-test-catalog.md` deleted; `tests/setup.ts` header and constants banner rewritten as ruled; `tests/setup.test.ts` header rewritten. Fix round 2 rewrapped the header sentence across two comment lines with no word changed. |
| sse-subj-1 | applied | README fence sends `id: 7`, dispatches `{ data: '1', event: 'ping', id: '7' }`, and documents `parser.id // '7'`. Executed by the README transcription in `tests/guides.test.ts`, whose guard now binds the fence body. |
| sse-subj-2 | applied | README Requirements reads `- Node.js >= 22.12.0`; `engines` untouched. |
| sse-subj-3 | applied | `errors.ts:3` cites `.claude/rules/typescript.md, Errors and outcomes`; `guides/sse.md` and `guides/README.md` cite `(AGENTS.md, Documentation contract)` and `the rules, including the documentation contract`; `SSEParser.test.ts:23` cites `(.claude/rules/tests.md, Test contract)`. The `tests/setup.ts` rows are carried by sse-obj-7. |
| sse-subj-4 | applied | `guides/sse.md` BOM row and `constants.ts` TSDoc read `stripped from the first non-empty chunk`. |
| sse-subj-5 | applied | `@param chunk` and `@returns` added to `SSEParserInterface.parse` before `@throws`. |
| sse-subj-6 | applied | `via` → `through` at `SSEParser.ts:25,27,28` and `README.md:8`; `e.g.` → `for example` in `tests/setup.ts`; D1 title reads `__proto__ is an ignored or valued field`; G0 title reads `G0 the corpus dispatches events`. Wire literal `': just a comment'` left alone. |
| sse-subj-7 | applied | `(see the following bullet)`, `the following method table and are documented after it`, `The following constants`, `the twin assertion`, `the following cases`. |
| sse-subj-8 | applied | `factories.test.ts` header names `this file`; `guides/README.md` reads `with no \`@orkestrel/*\` runtime dependencies`. The count row on `tests/guides.test.ts:2` was discharged by sse-subj-7. |

## Fix round 2

The objective lane returned FAIL on claim 2 with findings 1 and 2 blocking, findings 3 and 4
non-blocking, and referral 1 to the Orchestrator. The checker lane returned PASS with one
outside-claims observation. Each is closed or ruled here.

- **Finding 1 — the Methods fence's `persisted id/retry` claim was bound and asserted by nothing.**
  Closed by adopting the lane's prescription. `returns the Methods fence values from the class the
  guide constructs` now parses `id: 9\ndata: q\n\n` before the `clear()` the fence documents and
  asserts `expect(parser.id).toBeUndefined()` after it, so the comment's distinctive claim is
  executed. The guard half is closed by finding 2's stronger form, as the lane itself states: the
  Methods guard binds the fence body, which carries `guides/sse.md:129` verbatim. Failing-first
  readings are in § Failing-first evidence, including the pre-fix run that stayed green with the
  claim falsified.
- **Finding 2 — fences were bound only by text living in a different fence.** Closed by
  adopting the lane's general prescription, "bind each fence body as one multi-line string rather
  than as separate shared lines", for every guard in the block rather than only for the Factories,
  Methods, and flush guards it named. The Surface guard carried the same weakness — `guides/sse.md:31`
  is byte-identical to `:96` and `:126`, so a false claim on any one of them was satisfied by the
  others — and the remaining guards gain the same per-fence uniqueness for one form across the block.
  Each guard is now a single `toContain` over its own fence body, tabs and blank lines included.
- **Finding 3 — the round-1 header rewrite still enumerated a surface it got wrong.** Closed by
  adopting the lane's prescribed sentence at `tests/guides.test.ts:3-5`, which names the constants,
  the `@src/core` and `./setup.js` imports the executed cases use, and the `flagship fences` block.
- **Finding 4 — `tests/setup.ts:5` ran 110 columns against a `printWidth` of 100.** Closed by
  wrapping the same text across two `//` lines with no word changed, matching how fix round 1 closed
  the identical condition at `src/core/errors.ts:3`. The departure from sse-obj-7's "as a single line
  reading" wording is recorded under § Deviations as an ancillary decision.
- **Referral 1 — whether the manifest exclusion in the evidence hides a `package.json` or
  `package-lock.json` edit by this unit.** Closed by the command the lane named.
  `git diff --name-status b639721 b003c67 -- package.json package-lock.json` returns empty, so the
  unit's checkpoint touched neither file, and `git diff --name-status b003c67 bf34b39` returns
  exactly those two files, so the Orchestrator's own commit is the sole source of their movement.
  Each reading is in `/home/user/work/evidence/conform-sse.status`.
- **Checker observation — `src/core/SSEParser.ts:157` reads "Total characters currently buffered".**
  No tree change. The checker rules it out of this round's scope and prescribes it for the next
  matrix, and no row of the brief names that site; it stays recorded under § Observations against
  sse-subj-6's capability.

## Fix round 1

The objective lane returned FAIL on claim 4 with finding F1 blocking, and findings F2 and F3
non-blocking. The checker lane returned PASS with no finding. Each is closed.

- **Claim 4 — sse-obj-5 carried no failing-first proof.** Closed by running the probe the lane
  required and then adopting the lane's own prescribed assertion. The probe refutes the row's
  operative claim: the ruled prototype assertion cannot fail for the `__proto__`-field vector D1
  names. `tests/src/core/SSEParser.test.ts:722` now also carries
  `expect(Object.hasOwn(requireValue(first[0]), '__proto__')).toBe(false)`, the assertion referral R1
  named, and a mutation probe reddens exactly that line and nothing else.
- **F1 — the `tests/guides.test.ts` header claimed the constants were the only package-specific
  part.** Closed by adopting the lane's prescribed rewrite, which fix round 2's finding 3 then
  corrected again.
- **F2 — `src/core/errors.ts:3` ran 119 columns against a `printWidth` of 100.** Closed by
  rewrapping `src/core/errors.ts:3-7` with the text unchanged; the widest line is 99 columns.
- **F3 — the Surface presence guard omitted the fence's `parser.clear()` line.** Closed by binding
  that line, and superseded in fix round 2 by the whole-body binding.
- **R2 — gate evidence.** `npm test` exits 0, so the `guides` project resolves `@src/core` and
  `./setup.js` and the policy sweep reports nothing against the executed block.

## Files touched

- `/home/user/fleet/sse/README.md` — Node floor 22.12.0, `via` → `through`, Usage fence sends `id: 7` and documents `parser.id // '7'`.
- `/home/user/fleet/sse/guides/README.md` — section-number citations replaced by section names, `zero` → `no`, dependency-mirror sentence corrected and the sibling mirrors named.
- `/home/user/fleet/sse/guides/sse.md` — BOM row says first non-empty chunk, `(AGENTS §22)` and `below` replaced, Constants table realigned.
- `/home/user/fleet/sse/src/core/SSEParser.ts` — class TSDoc: `via` → `through`, `(see below)` → `(see the following bullet)`.
- `/home/user/fleet/sse/src/core/constants.ts` — `BOM` TSDoc says first non-empty chunk.
- `/home/user/fleet/sse/src/core/errors.ts` — comment cites `.claude/rules/typescript.md, Errors and outcomes`, rewrapped under 100 columns.
- `/home/user/fleet/sse/src/core/types.ts` — `parse` doc block gains `@param chunk` and `@returns`.
- `/home/user/fleet/sse/tests/guides.test.ts` — header names the package-specific surface; the `flagship fences` block executes every guide fence and the README Usage fence, each guard binding its own fence body, and the Methods case exercises the sticky state its `clear()` comment claims to drop.
- `/home/user/fleet/sse/tests/setup.ts` — header rewrapped across two lines, banner rewritten, `sliceStream` added, `chunkings` routes through it, `buildRepeated` deleted, `e.g.` → `for example`.
- `/home/user/fleet/sse/tests/setup.test.ts` — header rewritten, `buildRepeated` block replaced by `sliceStream` block.
- `/home/user/fleet/sse/tests/src/core/SSEParser.test.ts` — `drain` replaced by `sliceStream`, catalog comment removed, citation renamed, D1 prototype and own-key assertions, E1 `.repeat`, `captureError` at (b) and (d), titles reworded.
- `/home/user/fleet/sse/tests/src/core/factories.test.ts` — `captureError` import and use, header voice.

Diffstat for the whole unit (`git diff --stat b639721` over the unit's paths): 12 files changed,
267 insertions(+), 119 deletions(-). No file was created, so `git add -N` marked nothing.

## Failing-first evidence

Fix round 2, findings 1 and 2. Every mutation was made with an exact string edit and reversed with
its inverse; each restore is confirmed by `git status --short` no longer listing the file, which is a
content comparison rather than a digest.

- Baseline before the fix: `npm run test:guides` exit 0, 36 passed (36).
- **The defect, reproduced.** With `guides/sse.md:96` claiming
  `// [{ data: 'a' }] - only the first data line` and `guides/sse.md:129` claiming
  `parser.clear() // drop any buffered partial line / event - ready for a fresh stream`, both false
  against the code and against the fences they sit in, `npm run test:guides` exit 0, 36 passed (36).
  No assertion in the package could see either falsehood. Guide restored.
- **After the fix, the Methods claim.** With `/ persisted id/retry ` deleted from `guides/sse.md:129`:
  `npm run test:guides` exit 1, 1 failed | 35 passed (36), the sole failure
  `flagship fences > carries the Methods fence lines the transcription copies`. Guide restored:
  exit 0, 36 passed (36).
- **After the fix, the Factories claim.** With `guides/sse.md:96` claiming
  `// [{ data: 'a' }] - only the first data line`: `npm run test:guides` exit 1,
  1 failed | 35 passed (36), the sole failure
  `flagship fences > carries the Factories fence lines the transcription copies`. Guide restored:
  exit 0, 36 passed (36). This is the finding-2 control: the mutated line is byte-identical to
  `guides/sse.md:31`, which is what let the old guard pass it.
- **The executed half.** With `this.#lastId = undefined` deleted from `clear()` in
  `src/core/SSEParser.ts:147-155`: `npm run test:guides` exit 1, 2 failed | 34 passed (36), failing
  `flagship fences > returns the Methods fence values from the class the guide constructs`
  (`AssertionError: expected '9' to be undefined`) and
  `flagship fences > persists the sticky fence id and retry across dispatch, until clear drops them`.
  Source restored: `git status --short` no longer lists `src/core/SSEParser.ts`. Coverage of this
  control: it proves the added Methods assertion is non-vacuous for the behaviour the fence comment
  claims. It does not isolate that case, because the sticky fence case asserts the same behaviour
  through its own fence.

Fix round 1 and the unit's first pass.

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

Population: `src/**`, `guides/sse.md`, `guides/README.md`, `README.md`, `tests/setup.ts`,
`tests/setup.test.ts`, `tests/guides.test.ts`, `tests/src/**` (the vendored `tests/setupPolicy.ts`,
`tests/policy.test.ts`, `tests/config.test.ts`, and the vendored guide mirrors excluded). The
instrument's own control: the same glob searched for `parser` returns hits in `README.md`,
`guides/sse.md`, `tests/guides.test.ts`, `tests/setup.test.ts`, `tests/setup.ts`,
`tests/src/core/SSEParser.test.ts`, `tests/src/core/factories.test.ts`, `src/core/errors.ts`,
`src/core/types.ts`, `src/core/SSEParser.ts`, `src/core/factories.ts`, and `src/core/index.ts`, and
`guides/README.md` answers a search for `guide`, so the glob admits every owned file.

Case-insensitive, empty over that population:
`buildRepeat|\bdrain\b|probe\.polluted|scratchpad|AGENTS §|§[0-9]|\bvia\b|e\.g\.|\bsanity\b|\bbelow\b|\babove\b|very first|recorder infrastructure|Node\.js >= 24|zero \`|only part`.

Case-insensitive over the same population for
`\bjust\b|\bwe\b|\bour\b|let's|\bshould\b|simply|\beasy\b|currently|utilize|leverage|in order to|\betc\.|performant|allows you to|and/or|sanity check|dummy|blacklist|whitelist`
returns the permitted wire literal at `tests/src/core/SSEParser.test.ts:182`
(`': just a comment\n\n'`) and the hit outside this unit's rows recorded under § Observations.

## Gates

Each command was run bare in `/home/user/fleet/sse`, with no pipe, after fix round 2's edits.

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

- Finding 4's rewrap departs from sse-obj-7's "as a single line reading" wording. Every word of the
  ruled sentence stands; only the line break is new, and it matches how fix round 1 closed the same
  condition at `src/core/errors.ts:3`.
- Finding 2's body binding was applied to every guard in the `flagship fences` block, not only to the
  Factories, Methods, and flush guards the lane named. The lane's stated form is "bind each fence
  body as one multi-line string", and the Surface guard carried the same identical-line weakness the
  finding describes.
- The `flagship fences` header comment at `tests/guides.test.ts:179-185` now states what the guards
  bind, because the previous sentence described the weaker per-line form.
- `guides/README.md:20` (the observation the refuter attached to sse-subj-8): the sentence
  "it has no dependency-mirror guides to list here" contradicted the sibling mirrors `contract.md`,
  `probe.md`, `scaffold.md`, and `test.md`. Rewritten to say no runtime-dependency mirror sits beside
  the index and that the mirrors present are devDependency guides, with each named and linked after
  the `guide.md` paragraph.
- A scoped `oxfmt --write` was run in the first pass on `guides/sse.md`, `tests/guides.test.ts`, and
  `tests/setup.test.ts` only. Fix rounds 1 and 2 ran no mutating command outside the gate chain;
  their edits pass `format:check` as written.
- Every probe in fix round 2 mutated a tracked file with an exact string edit and reversed it with
  the inverse edit, never with a discarding git command. Each restore is confirmed by
  `git status --short` no longer listing that file.

## Observations

- `src/core/SSEParser.ts:157` reads "Total characters currently buffered". `currently` is a
  substitution-table row in `.claude/rules/writing.md` § Substitutions. No row of this brief names
  that site, and the checker lane prescribes it for the next matrix rather than for this round, so it
  is recorded against sse-subj-6's capability.
- `npm test` ran with no concurrent load in this checkout. The Orchestrator's deciding run is still
  owed.
