# Brief — `d7n-ndjson-converge-fix` (slice 3's audit findings on ndjson)

## Role and engine

`implementer` on Claude Opus 5. Sole writer in `/home/user/fleet/ndjson` from its branch tip (clean; `@orkestrel/guide@0.0.18` installed `--no-save`). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing. Read `/home/user/scaffold/AGENTS.md` § Design laws and § Writing, then `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-slice3-audit-verdict.md`, `rulings.md` § Ruling 9, § Ruling 13, § Ruling 14, the subjective lane's claims 15 and 22 and N-1 to N-3, F-1, and the objective lane's findings 1 to 3 and 5 in `d7n-slice3-audit-{subjective,objective}.md`, the pilot's `/home/user/fleet/abort/guides/abort.md:154-166` and `/home/user/fleet/abort/tests/guides.test.ts`, and sse's `chunkings` wording at `/home/user/fleet/sse/tests/setup.ts:49-54`.

## Items

1. **The drop-in (claim 15, Ruling 13).** `tests/guides.test.ts`: hoist `documented` and the mapped `examples` to the examples loop's own scope above its `describe`; map each side then concatenate as the pilot does; the `INTERNAL` doc block reads "the assertion that follows it fails when a name here stops being stranded"; the file matches the pilot byte for byte outside this package's constants.
2. **`## Tests` and `## See also` (claim 22).** Add `## Tests` in the pilot's shape naming `tests/guides.test.ts` (the bijections and the equality gate named descriptively, the titled fence by its title), `tests/src/core/NDJSONParser.test.ts` with one clause on what it proves, `tests/policy.test.ts`, and `tests/config.test.ts`; add `## See also` pointing at `AGENTS.md` and `README.md` as the pilot does.
3. **The titled example's heading (claim 22, Ruling 9).** Add `#### Create a parser` (or the verb phrase the fence supports) directly above the fence under `### Factories`, confirm it occurs once heading-scoped, retitle the block, confirm `docs` at zero and `--to source` at `written: 0`.
4. **The demonstration (N-1, Ruling 14).** Restore to `createNDJSONParser`'s `@example` the two deleted lines (`parser.parse('{"c":3}') // [] — buffered until its trailing newline arrives` and `parser.parse('\n') // [{ c: 3 }]`, with the spaced em dash) and add the same lines to the guide fence, so both sides carry the buffering demonstration and the gate reads equal.
5. **The buffer caveat (N-2).** One sentence under the `## Methods` table in the section's voice: "`parse` holds an unterminated line indefinitely and the buffer has no size limit, so a caller fronting an untrusted upstream enforces its own byte cap."
6. **`chunkings` (N-3, objective 3).** `tests/setup.ts:43-49` region: the product keeps its own noun without opening on the symbol (sse's wording: "Splits `stream` into a fixed set of chunk sequences … one sequence per fixed size …"); `partition` stays the sole owner of "partition"; the voice rule stays green.
7. **Links in descriptions (objective 2).** In `src/core/factories.ts` and `src/core/NDJSONParser.ts`, write the named declarations as `{@link NDJSONParserInterface}` and `{@link NDJSONParser}` where the descriptions carry bare code spans and the same blocks' `@returns` links; the compared form is unchanged.
8. `npm run docs` at zero, `--to guide` and `--to source` at `written: 0`, the suite green after the items.

## Scope

Owned: `guides/ndjson.md`, `README.md`, the doc blocks under `src/core/**` (whole; no code token moves), `tests/setup.ts` (the `chunkings` block), `tests/guides.test.ts`. Off-limits: everything else.

## Acceptance criteria

1. `npx oxfmt --check <owned paths>`, `npx oxlint --config .oxlintrc.json --deny-warnings <the owned .ts paths>`, `npm run check` exit 0.
2. `npm run docs` exit 0 at `rows read: 1, disagreements found: 0`; `--to guide` and `--to source` at `written: 0`; `npm run test:guides`, `npm run test:policy`, `npm run test:src:core` exit 0.
3. `git status --short` lists the owned files only.

## Output

`/home/user/scaffold/tmp/units/d7n-ndjson-converge-fix-report.md`: per item the hunk and the runs, per criterion the command and its last lines. No count in prose. No process diary.

## Deviation contract

Stop if the restored demonstration does not converge, if a correction needs a file outside the owned set, or if `docs` leaves zero.
