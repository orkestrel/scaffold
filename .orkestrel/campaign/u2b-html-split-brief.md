# Unit U2b — html: split the wall-clock complexity tests

Role: implementer. Engine: Claude Opus 5 (native). You perform this unit directly and spawn
nothing.

## Objective

In `/home/user/orkestrel/html`, land the D1 Q2 ruling from
`/home/user/scaffold/.orkestrel/campaign/d1-reconciliation.md` § Q2 (read it first, and the two
lane reports' Q2 sections if you need the full detail — the planner's per-test table and the
analyst's retained-assertion list were merged): the wall-clock complexity tests in
`tests/src/core/helpers.test.ts` (the `stays subquadratic...` test, ~line 122) and
`tests/src/core/parsers.test.ts` (the hostile-corpus describe) split into clock-free value
assertions in the suite plus guarded bench blocks.

## Binding design (the merged ruling)

- Delete every `performance.now()` reading, ratio assertion, and total-milliseconds ceiling from
  the named tests; delete the unasserted warmup call.
- Each retained test parses or decodes the LARGE input only and asserts real values: the decoder
  test asserts the decoded outputs (recognized → the entity's characters repeated; unknown →
  unchanged; nested → single-pass result), and each parser test asserts the documented structure
  (child counts, `isHTMLDocument`, the attribute first-wins result `[{ name: 'a', value: '' }]`
  for the quoted-attributes case). TAKE EVERY EXPECTED LITERAL FROM A RED RUN'S ACTUAL OUTPUT,
  never from derivation — run the assertion with a placeholder first, read the real value, then
  pin it.
- The two parser tests that today assert nothing but elapsed time (~243 depth-overflow, ~270
  quoted-attributes) GAIN structural assertions — that is in scope by the ruling.
- The `NAMED_ENTITIES` table-size assertion moves out of the timing test to sit beside the
  entity-audit test (~line 90).
- Every retained test carries an explicit timeout argument with a comment naming its sizing
  basis (generous; it catches a hang, not a grade).
- One guarded block per file at the end: `if (import.meta.env.MODE === 'benchmark') { describe(...,
  () => { bench(...) }) }` holding the small/large growth pairs (the deleted ratio inputs);
  input construction inside the guard; no baseline output committed.
- Rename each test for what it now proves (no "subquadratic"/"linear" claims in suite names).

## Environment and standing state

Run from `/home/user/orkestrel/html`; `node_modules` installed. The `test:bench` script EXISTS
(materialized by a prior unit — verify with `node -p "require('./package.json').scripts['test:bench']"`;
if absent, STOP: your prerequisite unit has not landed). Vitest runs for you natively.

## Scope

- Owned: `tests/src/core/helpers.test.ts`, `tests/src/core/parsers.test.ts`.
- Off-limits: everything else (`src/**` especially — no operation counters, per the ruling).
  No commits, installs, tree-wide mutating commands.

## Acceptance criteria (cheap-first)

1. No `performance.now()` remains in either file; every retained test asserts a parsed or
   decoded value; the two empty tests gained structural assertions.
2. Scoped oxlint/oxfmt clean; `npm run check:src:core` green (verify the script name).
3. `npm run test:src:core` green.
4. `npm run test:bench` collects the new blocks (report its output tail as the observation).

## Output

Final message = report: per-test before/after summary (name + retained assertions), the
red-run-read literals, gate tails, `git diff --stat`, `git status --porcelain`, deviations or
none.
