# Brief — `d7n-sse-converge-fix` (slice 1's audit findings on sse)

## Role and engine

`implementer` on Claude Opus 5. Sole writer in `/home/user/fleet/sse` from its branch tip (clean; `@orkestrel/guide@0.0.18` re-installed `--no-save` from the guide's tip after U4, so `normalizeSummary` now drops a link target's module part: `{@link import('./errors.js').SSEError}` compares as `` `SSEError` ``). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing. Read `/home/user/scaffold/AGENTS.md` § Writing and § Design laws, `.claude/rules/documentation.md` § Parity, then `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-slice1-audit-verdict.md`, `rulings.md` § Ruling 9 and § Ruling 11, the subjective lane's F1 to F5 and the objective lane's claim 35, F1, F3, and F5 in `d7n-slice1-audit-{subjective,objective}.md`, and `/home/user/fleet/abort/guides/abort.md:154-160` (the pilot's § Tests) and `/home/user/fleet/abort/tests/guides.test.ts:206-235` (the examples loop's shape).

## Items

1. **The cross-file links (subjective F3).** Your converge round flattened every `{@link import('./x.js').Y}` in a description paragraph to a plain code span (`d7n-sse-converge-report.md:196`; the diff `d7n-sse-converge.diff.txt` shows each site). Restore each such link in the description paragraphs of `src/core/**` (read the diff's `-` lines for the original tag text), run `npm run docs`, and record `disagreements found: 0`: the compared form now renders the token after the module part.
2. **`## Tests` (claim 35, subjective F2).** `guides/sse.md` ends at `## Methods`. Add a `## Tests` section in the pilot's shape naming `tests/guides.test.ts` (the surface bijection, the method bijection, and the equality gate named descriptively: every `Summary` cell against its declaration's description paragraph, the titled fence against the `@example` of that title, the README pitch against the tagline), `tests/src/core/*` by file with one clause each on what each proves (read them), `tests/policy.test.ts`, and `tests/config.test.ts`. Leave `guides/README.md` as it is.
3. **The titled example's heading (Ruling 9, subjective F1).** The titled `@example` on `createSSEParser` carries `Factories`. Add a heading one level deeper directly above that fence in `guides/sse.md` (`#### <verb phrase naming what the fence shows>`, for example `#### Parse a stream chunk by chunk`; word it against the fence), confirm it occurs once heading-scoped, retitle the block, and confirm `npm run docs` at zero and `--to source` at `written: 0`. `### Factories` stays.
4. **`chunkings` (subjective F4, objective F3).** `tests/setup.ts:49-54` borrowed `partition`'s noun. Reword so the product keeps its own name without opening on the symbol: for example `Splits `stream` into a fixed set of chunk sequences for partition-invariance testing: one sequence per fixed size in `sizes` …`, keeping every fact; `partition` (`:74`) stays the sole owner of "partition". The voice rule must stay green (`npx oxlint --config .oxlintrc.json --deny-warnings tests/setup.ts`).
5. **The examples binding (subjective F5, objective F1).** In `tests/guides.test.ts`, hoist the mapped `examples` binding out of the `it` callback to the loop's own scope beside `documented`, matching the pilot's `/home/user/fleet/abort/tests/guides.test.ts:206-235` byte for byte outside this package's constants.
6. **`does NOT clear` (objective F5).** `guides/sse.md:146` region: write `does not clear`; sweep the guide and the README for any other all-caps emphasis and any count in prose and correct each, recording every site.

## Scope

Owned: `guides/sse.md`, `README.md`, the doc blocks under `src/core/**` (whole, Ruling 11), `tests/setup.ts` (the `chunkings` block), `tests/guides.test.ts`. Off-limits: everything else, including `src/core/SSEParser.ts` code, `guides/README.md`, `package.json`.

## Acceptance criteria, cheapest first

1. `npx oxfmt --check <owned paths>`, `npx oxlint --config .oxlintrc.json --deny-warnings <owned paths>`, `npm run check` exit 0.
2. `npm run docs` exit 0 at `rows read: 1, disagreements found: 0`; `--to guide` and `--to source` at `written: 0`; `grep -c "import('./" src/core/*.ts` reads the restored links.
3. `npm run test:guides`, `npm run test:policy`, `npm run test:src:core` exit 0 (record the summaries).
4. `git status --short` lists owned files only.

## Output

`/home/user/scaffold/tmp/units/d7n-sse-converge-fix-report.md`: per item the hunk and the runs, per criterion the command and its last lines. No count in prose. No process diary.

## Deviation contract

Stop if a restored link does not converge under the new compared form (name the tag text and the `docs` line), if the retitled pair does not converge, or if a correction needs a file outside the owned set.
