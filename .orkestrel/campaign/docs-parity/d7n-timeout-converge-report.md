# Report — `d7n-timeout-converge`

Wall clock: 2026-09-07T15:24:58Z (first command) to 2026-09-07T15:35:10Z (last command), in `/home/user/fleet/timeout` from `9b09bac`.

## Criterion 1 — red-first on the unconverged tree

`npm run test:guides` after adding the three cases and before any convergence: `Tests  3 failed | 26 passed (29)`.

`pairs at least one example title across the guide and the source`:

```
AssertionError: expected [ Array(1) ] to deeply equal []
+   "guides/timeout.md pairs: guide [\"Surface\",\"Race work against a deadline\",\"Link a parent signal\",\"Reuse a handle across deadlines\"] source []",
```

`opens the README with the guide tagline`:

```
AssertionError: expected undefined not to be undefined
 ❯ tests/guides.test.ts:110:20
    110|  expect(pitch).not.toBeUndefined()
```

`Timeout > keeps every compared summary and example equal to its source`:

```
AssertionError: expected [ …(10) ] to deeply equal []
+   "guides/timeout.md function createTimeout: guide \"Create a `TimeoutInterface` deadline handle from `TimeoutOptions`.\" source \"Creates a controllable deadline whose native signal aborts on expiry.\"",
+   "guides/timeout.md class Timeout: guide \"The controllable `setTimeout` wrapper; implements `TimeoutInterface` exactly.\" source \"Represents a controllable deadline whose native `AbortSignal` aborts when it expires.\"",
+   "guides/timeout.md const MAX_TIMEOUT_MS: guide \"Largest accepted duration: `2_147_483_647` milliseconds.\" source \"Names the largest timeout duration accepted by the package, in milliseconds.\"",
+   "guides/timeout.md function isTimeoutDuration: guide \"Total validator for an integer in the inclusive timeout range.\" source \"Determines whether a value is an accepted timeout duration.\"",
+   "guides/timeout.md function isTimeoutSignal: guide \"Total native-brand validator for a genuine `AbortSignal`.\" source \"Determines whether a value is a genuine native `AbortSignal`.\"",
+   "guides/timeout.md function validateTimeoutOptions: guide \"Validate once-read timeout options and return a fresh copy omitting absent option keys.\" source \"Validates and normalizes timeout construction options.\"",
+   "guides/timeout.md interface TimeoutOptions: guide absent source \"Represents the options for constructing a timeout deadline.\"",
+   "guides/timeout.md interface TimeoutInterface: guide absent source \"Represents a controllable deadline exposing a native `AbortSignal` that aborts on expiry.\"",
+   "guides/timeout.md TimeoutInterface.start: guide absent source \"Arms or re-arms the deadline.\"",
+   "guides/timeout.md TimeoutInterface.clear: guide absent source \"Cancels an armed deadline without aborting its signal and resets expiry state.\"",
```

## Criterion 2 — the headers and the class rows

Header rows after the change (a header row is the row before a `| ---` row), read from `guides/timeout.md`: `48: | API | Kind | Summary |`, `54: | API | Kind | Summary |`, `60: | API | Kind | Summary |`, `66: | API | Kind | Summary |`, `73: | API | Kind | Summary |`, `81: | Type | Kind | Shape | Summary |`, `102: | Method | Returns | Summary |`.

Rows moved:

- `### Entities` → `### Classes`. Its only row's `Kind` is `class`. `Timeout` is documented in that table and under no H3, so no row was added.
- `### Types` gained `Summary` as its last column. `Type`, `Kind`, and `Shape` stay. The convention sentence `A `Shape` cell holds an interface's members in braces.` sits under the `### Types` heading, above the table, the placement the abort pilot took at `guides/abort.md:58-62`.
- `## Methods` → `#### `TimeoutInterface`` table: `Behavior` renamed `Summary`. `Method` and `Returns` stay.

Rows whose literal stayed in `Shape`: `TimeoutOptions` keeps `` `{ id?: string; ms: number; signal?: AbortSignal }` ``; `TimeoutInterface`'s prose members were rewritten into the same braced idiom, `` `{ id, ms, signal, expired, start, clear }` ``. The `MAX_TIMEOUT_MS` literal took no `Value` column: `2_147_483_647` moved into the doc block's description instead, so the Constants table keeps `API | Kind | Summary`.

## Criterion 3 — the doc blocks, then `--to guide`

Blocks rewritten by hand, each verb-first with the symbol unnamed in the first sentence:

| Declaration | Description now reads | Carried in from the cell |
| --- | --- | --- |
| `createTimeout` (`src/core/factories.ts`) | Creates a deadline handle from validated `TimeoutOptions` and returns it as a `TimeoutInterface`. | the contract it returns and the options type |
| `Timeout` (`src/core/Timeout.ts`) | Implements `TimeoutInterface` exactly, as a controllable `setTimeout` wrapper over one owned `AbortController` whose signal aborts when the deadline expires. | the `setTimeout` wrapper framing and the exact implementation claim |
| `MAX_TIMEOUT_MS` (`src/core/constants.ts`) | Names the largest timeout duration the package accepts, `2_147_483_647` milliseconds. | the literal |
| `isTimeoutDuration` (`src/core/validators.ts`) | Determines whether a value is an integer in the inclusive range from `0` through `MAX_TIMEOUT_MS`, staying total for every input. | totality and the inclusive range |
| `isTimeoutSignal` (`src/core/validators.ts`) | Determines whether a value is a genuine native `AbortSignal`, staying total for a structural spoof and for a hostile or revoked proxy. | totality and the native brand |
| `validateTimeoutOptions` (`src/core/helpers.ts`) | Validates once-read timeout construction options and returns a fresh normalized copy omitting absent optional keys. | once-read, the fresh copy, the omitted keys |
| `TimeoutOptions` (`src/core/types.ts`) | Represents the options `createTimeout` and the `Timeout` constructor accept. | the clause after the em dash in the old `Shape` cell |
| `TimeoutInterface.start` (`src/core/types.ts`) | Arms or re-arms the deadline for `ms`, installing a fresh `signal` when the current one has already aborted. | `ms` and the signal swap |
| `TimeoutInterface.clear` (`src/core/types.ts`) | Cancels an armed deadline without aborting its `signal`, and resets expiry by installing a fresh signal when the current one has already aborted. | the post-expiry swap |

`TimeoutInterface`'s own description was left as written: its guide cell was absent, so it carried nothing to move, and it already reads distinctly from the class's and the factory's.

Remark sentences the description now repeats, pruned under Ruling 7:

- `isTimeoutSignal`: the remark's containment sentence folded into the brand-check sentence; the description carries the totality claim.
- `validateTimeoutOptions`: the exactly-once and fresh-copy sentences folded into one remark naming only what the description does not — that no timer, controller, or listener lifecycle begins at the boundary.
- `TimeoutInterface.clear`: the fresh-signal sentence moved into the description, leaving the remark to state that a signal that never fired keeps its identity.

`npm run docs -- --to guide`: `rows read: 1, disagreements found: 10, written: 10, reported: 0`, then `npx oxfmt --write guides/timeout.md README.md`. `npm run docs` after it: `rows read: 1, disagreements found: 0`.

## Criterion 4 — the titled pair

The pair is the `@example` block of `createTimeout` in `src/core/factories.ts` — the primary factory, and the only `create*` export — titled `Race work against a deadline`, paired with the first fence under the `### Race work against a deadline` heading in `guides/timeout.md`.

The heading occurs once, heading-scoped: `grep -n '^#\+ Race work against a deadline' guides/timeout.md` → `144:### Race work against a deadline`. The fence body read before titling carries no three-backtick run and no doc-comment terminator; it is the `fetchWithDeadline` body ending `timeout.clear() // cancels the still-armed deadline when the fetch won the race`.

Ancillary decision recorded: the `## Surface` fence also demonstrates `createTimeout` and sits earlier in the document, so it was eligible alongside the race fence. The first `## Patterns` fence took the title, the choice the abort pilot made (`guides/abort.md:97` `### Create and abort` against `src/core/factories.ts:21`), because the heading text names the pattern while `Surface` names a section.

Runs, in order:

- after titling the block, `npm run docs` → `rows read: 1, disagreements found: 1`, the one line being `guides/timeout.md Race work against a deadline: guide "ts\nimport { createTimeout } from '@orkestrel/timeout'\n\nasync function fetchWithDeadline(url: string, ms: number): Promise<Response> {…}" source "ts\nimport { createTimeout } from '@orkestrel/timeout'\n\nconst timeout = createTimeout({ ms: 5_000 })…"`;
- `npm run docs -- --to source` → `wrote src/core/factories.ts` / `rows read: 1, disagreements found: 1, written: 1, reported: 0`;
- `npx oxfmt --write src/core/factories.ts`, then `npm run docs` → `rows read: 1, disagreements found: 0`.

`grep -rn '@example \S' src/` returns `src/core/factories.ts:23` alone, so every other block stays untitled.

## Criterion 5 — the tagline, the pitch, and the displaced prose

The blockquote under both H1 headings, byte-identical with the same line breaks:

```
> The time-bound half of the substrate's time-and-cancellation pair: a
> controllable `setTimeout` wrapper carrying a trace `id` and a deadline `ms`,
> whose native `AbortSignal` aborts on expiry.
```

One noun phrase, plain text and code spans, no link, no bold.

The guide gained an opening paragraph after the blockquote, carrying the displaced sentences and none of the tagline's clauses: the arm-then-race instruction, `clear()` cancelling without firing, the fresh signal after an expiry and the reuse it buys, the deliberate thinness with its scheduler, debounce, and retry-policy exclusions and the re-armable, clearable, parent-linkable summary, the native signal as the complete observation surface with no separate event map, and the `Source:` and barrel sentences that closed the old blockquote. The `[`src/core`](../src/core)` link moved out of the blockquote and into that paragraph, which is what lets the tagline stay link-free.

The README's opening paragraph is now onboarding it alone carries and restates no tagline clause: create a handle with `createTimeout`, `start()` to arm, hand the signal to the work the deadline bounds, `clear()` when the work finishes first, and pass a parent signal where an outer cancellation must retire the deadline; it keeps the `AbortSignal.any` note and the `@orkestrel` line sentence. The old README pitch's reference sentences about `ms`, the coded `ContractError`, and the validators already sat in the `## Usage` prose, which is unchanged.

`npm run test:guides` was run after the README edit: green, `Tests  29 passed (29)`.

## Criterion 6 — the seed

- `npm run docs` → `rows read: 1, disagreements found: 0`, exit 0.
- `npm run docs -- --to guide` → `rows read: 1, disagreements found: 0, written: 0, reported: 0`.
- `npm run docs -- --to source` → `rows read: 1, disagreements found: 0, written: 0, reported: 0`.

## Criterion 7 — the gates

Scoped to the owned paths `guides/timeout.md README.md tests/guides.test.ts src/core`:

- `npx oxfmt --check …` → `All matched files use the correct format.`, exit 0.
- `npx oxlint --config .oxlintrc.json --deny-warnings …` → no diagnostic, exit 0.
- `npm run check` → exit 0, no diagnostic.
- `npm run test:guides` → `Test Files  1 passed (1)` / `Tests  29 passed (29)`, exit 0. The three cases are green under the names `pairs at least one example title across the guide and the source`, `opens the README with the guide tagline`, and `Timeout > keeps every compared summary and example equal to its source`.
- `npm run test:policy` → `Test Files  1 passed (1)` / `Tests  90 passed | 1 skipped (91)`, exit 0.

Observations, not criteria:

- `npm run test:src:core` (the package's narrowest unit script) → `Test Files  4 passed (4)` / `Tests  62 passed (62)`, exit 0.
- `npm run test:config` → `Test Files  1 passed (1)` / `Tests  172 passed | 1 skipped (173)`, exit 0.

## Criterion 8 — status and diffstat

`git status --short`:

```
 M README.md
 M guides/timeout.md
 M src/core/Timeout.ts
 M src/core/constants.ts
 M src/core/factories.ts
 M src/core/helpers.ts
 M src/core/types.ts
 M src/core/validators.ts
 M tests/guides.test.ts
```

Owned files only. `git diff --stat`:

```
 README.md              | 17 +++++-----
 guides/timeout.md      | 90 +++++++++++++++++++++++++++-----------------------
 src/core/Timeout.ts    |  3 +-
 src/core/constants.ts  |  2 +-
 src/core/factories.ts  | 20 ++++++-----
 src/core/helpers.ts    |  6 ++--
 src/core/types.ts      | 11 +++---
 src/core/validators.ts | 11 +++---
 tests/guides.test.ts   | 81 +++++++++++++++++++++++++++++++++++++++++----
 9 files changed, 163 insertions(+), 78 deletions(-)
```

## The gate cases as written

`tests/guides.test.ts` gained `findDrift` beside the existing readers, `README.md` in `ROOT_FILES`, and an `own` binding for the manifest row of `GUIDE_SPEC`. The pre-existing `CORE_GUIDE` constant already held `'guides/timeout.md'`, so it was renamed `GUIDE_SPEC` rather than duplicated, and its doc comment now names what every reader of it uses it for; the `flagship fences` block reads the README from the shared inventory instead of a second `readFileSync` call, because `ROOT_FILES` now populates it.

The pin is at file scope in the abort pilot's accepted shape: `if (fence.title === undefined) continue` guards the loop body, `titled.has(fence.title)` decides the pair inline, no local predicate is declared, and the failure line is `${GUIDE_SPEC} pairs: guide [...] source [...]` with the defined titles on both sides. The brief names the expression `fence.title !== undefined && titled.has(fence.title)`; writing it that way needs the same condition twice, because the case also collects the heading set for the failure line, so the guard-plus-membership form the pilot shipped at `/home/user/fleet/abort/tests/guides.test.ts:82-86` was kept. The auditor rules whether the letter or the pilot's accepted form governs.

The equality case sits inside the manifest loop's `describe(entry.concept)` block, collecting `${entry.spec} ${drift.key}: guide ${left} source ${right}` with `absent` for an undefined side. The README case guards each side with `not.toBeUndefined()` before `toBe`.

## § Tests

`guides/timeout.md`'s `## Tests` gained a `tests/guides.test.ts` row naming the checks descriptively — the `## Surface` ↔ `src/core` bijection, the `TimeoutInterface` ↔ `Timeout` method bijection, and the equality gate as every `Summary` cell against its declaration's description paragraph, the titled fence against the `@example` block of that title, and the README pitch against the tagline — with no SQ/MQ/EQ/RQ identifier. The row names the titled fence by that description rather than by its title text, because `oxfmt` reflows the paragraph and split the `Race work against a deadline` code span across a line break, leaving the continuation line unindented inside the list item.

## Reader and seed defects met

None. `--to guide` located every cell the run reported, including the `TimeoutOptions` and `TimeoutInterface` rows of the four-column `Type | Kind | Shape | Summary` table, and `oxfmt` restored the committed alignment with no other cell disturbed. `--to source` located the titled block from the fence title and carried the body in. Neither direction reported a row.

## Ancillary decisions

- The `Shape` convention sentence sits between the `### Types` heading and its table, the abort pilot's placement, rather than after the table.
- The `MAX_TIMEOUT_MS` literal moved into the doc block rather than into a new `Value` column, so no Surface table gained a column.
- The `#### `TimeoutInterface`` lead-in sentence, which restated the `start` and `clear` rows of the table under it, was replaced by `The call-signature members, each with the type it returns:` — the table still carries an introducing sentence and no longer duplicates its own cells.
- The Surface tables under `### Factories`, `### Classes`, `### Constants`, `### Validators`, and `### Helpers` stay bare under their headings, as in the abort pilot; the `## Surface` prose introduces them.

## Observation outside this unit's scope

`guides/timeout.md:18-19` uses a code token as an English verb: `` `clear()` the deadline if the work finishes first ``. `.claude/rules/writing.md` § Code tokens, references, and links bans that. The sentence is pre-existing prose the P.1 voice pass left standing and it sits outside this unit's named surfaces, so it was not touched; it belongs to whichever unit next owns the guide's prose.

## Deviation state

No deviation. Every cell the seed had to locate was located, the titled body fit its block, no test outside `tests/guides.test.ts` went red, no vendored file needed an edit, no reader returned a shape the brief does not describe, and no disagreement survived the doc-block rewrites under the P16 comparator.
