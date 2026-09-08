# Report — `d7n-process-converge-fix`

Wall clock: 2026-09-08T01:30:24Z to 2026-09-08T01:41:20Z. Sole writer in `/home/user/fleet/process`
from `20b5f3f`. No deviation: no stop condition fired.

Owned files touched: `guides/process.md`, `tests/guides.test.ts`,
`tests/src/server/processes/Supervisor.test.ts`, `src/core/constants.ts`, `src/core/types.ts`,
`src/server/processes/ProcessManager.ts`. Diffstat: 6 files changed, 252 insertions(+),
233 deletions(-). Every `src/**` change is comment-only:
`git diff -U0 -- src/` filtered to lines outside a block comment returns nothing.

## Item 1 — the drop-in's bytes (P1, Rulings 13, 20, 21)

`tests/guides.test.ts` lines 1 to 3 are the pilot's:

```
// The consumer-side guides-parity drop-in: runs `@orkestrel/guide`'s checks against
// this repo's own `guides/README.md` manifest. The constants that follow are this
// package's own, as is the executed section that closes the file.
```

The package's fences sentence, which Ruling 21 strikes, is gone with the two lines that carried it.

The `INTERNAL` declaration carries the pilot's doc block verbatim, and `INTERNALS` keeps a doc that
names its per-face keying without repeating the sentence:

```ts
/**
 * Declarations deliberately kept out of a barrel, as `computeSymbolKey` strings, keyed by the face
 * whose module declares each one.
 *
 * `POPULATIONS` reads each row against that face's own barrel, and `INTERNAL` flattens every row
 * into the one scope a guide's source is read as.
 */
const INTERNALS: Readonly<Record<string, readonly string[]>> = Object.freeze({ /* … */ })
/**
 * Declarations deliberately kept out of the barrel, as `computeSymbolKey` strings.
 *
 * A class that one-class-per-file evicted from its single consumer cannot become a
 * local, so it stays exported without being public. Naming it here is what makes that
 * intentional rather than forgotten — and the assertion that follows it fails when a name
 * here stops being stranded, so the list cannot rot.
 */
const INTERNAL: readonly string[] = Object.freeze(Object.values(INTERNALS).flat())
```

The region from `const root = ` through the manifest loop's closing brace is the pilot's bytes plus
additions. The region diff against the pilot prints no deletion line:

```
$ diff <(awk '…' /home/user/fleet/abort/tests/guides.test.ts) <(awk '…' tests/guides.test.ts) | grep -c '^<'
0
```

What the pilot's bytes displaced, hunk by hunk:

- `const sourceManager = createSourceManager(…)` is `const sources = …`, and the one reader of it
  (`SOURCES`) reads `sources.source(face.specifier)`.
- `/Interface$/u` is `/Interface$/` at the methods loop and at the examples loop.
- `it('extracts non-empty aggregate barrel and documented surfaces', …)` is the pilot's
  `it('extracts a non-empty documented surface', …)`. The displaced
  `expect(source.surface().length).toBeGreaterThan(0)` is what
  `has non-empty direct and barrel populations` already asserts for each face barrel.
- `it('imports only real exports through published specifiers in every ts fence', …)` is the pilot's
  `it('imports only real exports in every ```ts fence', …)`. The specifier discipline it carried
  moves to the appended package case named for it, so no gate is lost.
- `links only to test files that exist` takes the pilot's body. The displaced
  `expect(guide.tests().length).toBeGreaterThan(0)` is implied by
  `lists every test file but the ones named unlisted`, which asserts every present test is listed.
- The `names.length` guard is lifted into the appended `documents at least one Surface function`
  case, per the brief's second option.

The package's own file-scope block — `FACES`, `SOURCES`, `REFUSALS`, `describe('public package
faces')`, `FIXTURE_FILES`, `POPULATIONS`, and the populations loop — sits after the pilot's README
case and before the manifest loop, in that order. `REFUSALS` left the constants block to sit beside
its only reader.

Appended inside the manifest loop's `describe`, after the pilot's examples loop:

```ts
		it('documents at least one Surface function', () => {
			const named = guide
				.surface()
				.filter((symbol) => symbol.keyword === 'function')
				.map((symbol) => symbol.name)
			expect(named.length).toBeGreaterThan(0)
		})

		it('documents at least one method group', () => {
			expect(guide.methods().length).toBeGreaterThan(0)
		})
```

Appended after the pilot's last case, the specifier case and the unlisted-tests case:

```ts
		it('imports through a published specifier in every ts fence', () => {
			const refused: string[] = []
			for (const fence of guide.fences().filter((row) => row.language === EXAMPLE_LANGUAGE)) {
				const projected = extractSourceLines(fence.code)
					.map((line) => line.code)
					.join('\n')
				for (const statement of extractFenceImports(projected)) {
					const specifier = statement.specifier
					if (specifier.startsWith('@src/') || specifier.startsWith('@app/')) {
						refused.push(specifier)
						continue
					}
					if (SOURCES.has(specifier)) continue
					if (specifier === ROOT || specifier.startsWith(`${ROOT}/`)) refused.push(specifier)
				}
			}
			expect(refused).toEqual([])
		})
```

Control, proving that case can fail: one guide fence's specifier changed to `@src/server`,
`npm run test:guides` read

```
FAIL  |guides| tests/guides.test.ts > Process > imports through a published specifier in every ts fence
AssertionError: expected [ '@src/server' ] to deeply equal []
     Tests  1 failed | 118 passed | 1 skipped (120)
```

then the specifier was restored by editing and the same command read
`Tests 119 passed | 1 skipped (120)`.

## Item 2 — the lost nuance (P2)

`tests/src/server/processes/Supervisor.test.ts`:

```
-			// margin the sibling comparator in `Process.test.ts` reads. An override sized past
-			// the race turns a contended run into a red gate reporting a timeout.
+			// same margin the sibling comparator in `Process.test.ts` reads. An override sized
+			// barely past the race turns a contended run into a red gate reporting a timeout.
```

The phrase sits on one line, so `grep -c 'barely past the race'` reads 1.

## Item 3 — the count (P3)

```
-Two moments arm the bound. The child's native exit arms it, which is what carries a natural exit to
+The child's native exit arms the bound, which is what carries a natural exit to
```

The sentence that follows already names the second arming, so the paragraph carries itself.

## Item 4 — one sentence, two rows (P4)

`src/server/processes/ProcessManager.ts` says what the class does, `src/core/types.ts` what the
contract is, and neither repeats the other:

```
-/**
- * Represents a keyed registry of live supervised child processes.
+/**
+ * Launches supervised children under caller-chosen ids, evicts each one as it settles, and destroys
+ * every live child on teardown.
```

`ProcessManagerInterface` keeps `Represents a keyed registry of live supervised child processes.`
`ProcessErrorCode` names its arms:

```
-/** Names the machine-readable {@link ProcessError} categories, derived from {@link PROCESS_ERROR_CODES}. */
+/**
+ * Names the machine-readable {@link ProcessError} categories, derived from {@link PROCESS_ERROR_CODES}:
+ * `spawn`, `timeout`, `input`, `duplicate`, `protocol`, and `invalid`.
+ */
```

`npm run docs -- --to guide` carried each into its `Summary` cell:
`rows read: 1, disagreements found: 2, written: 2, reported: 0`.

## Item 5 — the guard table (P5, Ruling 20)

```
+In a guard table a `Shape` cell holds the type the guard narrows to.
+
+| API              | Kind     | Shape          | Summary                                              |
+| ---------------- | -------- | -------------- | ---------------------------------------------------- |
+| `isProcessError` | function | `ProcessError` | Checks whether an unknown value is a `ProcessError`. |
```

The sentence sits between the section's prose and the table.

## Item 6 — the constants table (P6, Rulings 18 and 20)

The table drops `Value`, heads `Shape` with each declared type under the constants sentence alone:

```
+A `Shape` cell holds the constant's declared type.
+
+| API                    | Kind  | Shape                         | Summary                        …
+| `PROCESS_GRACE`        | const | `number`                      | Names the default cooperative POSIX window, 5000 ms, between `SIGTERM` and `SIGKILL` during termination.
+| `PROCESS_PATHEXT`      | const | `string`                      | Lists the executable extensions a Windows lookup applies when the environment declares no `PATHEXT`, `.COM;.EXE;.BAT;.CMD`.
+| `PROCESS_ERROR_CODES`  | const | `readonly ProcessErrorCode[]` | Lists the machine-readable failure categories a `ProcessError` carries, in declaration order: `spawn`, `timeout`, `input`, `duplicate`, `protocol`, and `invalid`.
```

Every literal moved into its declaration's description paragraph in `src/core/constants.ts`, so
`--to guide` carries it. Each number-valued constant reads `number`, matching Ruling 21's ban on a
literal type in the cell.

The owned case reads the literal from the `Summary` cell beside the row, and `PROSE_CONSTANTS` is
gone with the column that gave it meaning:

```ts
	it('names every constant literal in the Summary its Constants table prints', () => {
		const guide = requireValue(files['guides/process.md'], 'Missing file: guides/process.md')
		const section = guide.slice(guide.indexOf('### Constants'))
		const table = section.slice(0, section.indexOf('\n\n', section.indexOf('| API')))
		const rows = Array.from(
			table.matchAll(/^\| `(\w+)` +\| const +\| [^|]+ \| (.+?) +\|$/gmu),
			(match) => ({ name: match[1] ?? '', summary: match[2] ?? '' }),
		)
		const unnamed: string[] = []
		for (const row of rows) {
			const value = requireValue(CONSTANTS[row.name], `Undeclared constant row: ${row.name}`)
			const literals = typeof value === 'object' ? [...value] : [String(value)]
			for (const literal of literals) {
				if (!row.summary.includes(literal)) unnamed.push(`${row.name} ${literal}`)
			}
		}

		expect(rows.map((row) => row.name).sort()).toEqual(Object.keys(CONSTANTS).sort())
		expect(unnamed).toEqual([])
	})
```

Control, proving the rewritten case can fail: the `PROCESS_GRACE` row's `5000 ms` changed to
`5500 ms`, `npm run test:guides` read

```
FAIL  |guides| tests/guides.test.ts > flagship fences > names every constant literal in the Summary its Constants table prints
AssertionError: expected [ 'PROCESS_GRACE 5000' ] to deeply equal []
     Tests  2 failed | 117 passed | 1 skipped (120)
```

(the equality case reddened beside it, as a drifted cell must), then the cell was restored by
editing and the same command read `Tests 119 passed | 1 skipped (120)`.

No mirror of that table exists: `grep -c '| Value |' guides/process.md` reads 0 and the header
census lists `Shape` on the Guards, Constants, Types, and Server contracts tables and nowhere else.
The `Option | Type | Required | Meaning` tables name a constant with its literal inside a `Meaning`
cell (`Default: `PROCESS_GRACE` (`5_000`)`), which is not a `Value` column and sits outside
Ruling 18's population; they are unchanged.

## Item 7 — the opening clause (P7)

```
-`ExecuteResult` carrying the captured output and the exit, while `detach` returns without waiting
-for anything.
+`ExecuteResult` carrying the captured output and the exit, while a detached child owns no stdio and
+is unreferenced, so nothing in this process observes its outcome.
```

The replacement is the fact `detach`'s own `@remarks` states and the tagline's `fire-and-forget`
does not. The paragraph was reflowed after the edit, which is why its hunk is larger than the
sentence.

## Item 8 — pointers (P8)

`below it` became `that follows` in both copies of the condition-budget comment in
`tests/src/server/processes/Supervisor.test.ts`, not only at `:104`: the same comment sits at `:56`
and criterion 4 admits no `below\b` in that file. The same pointer sense in
`tests/guides.test.ts` (the condition-budget comment twice, and `Each row below runs`) took the same
correction. In `guides/process.md` the two remaining hits were comparative rather than pointing
(`a `backlog` below `1``, `the `drain` bound driven below and above a descendant release`); both were
reworded to `under `1`` and `driven shorter and longer than a descendant release` so the mechanical
criterion reads clean.

## Item 9 — `both` (P9)

```
-Both share the rest: the same resolver and no implicit shell, the same environment merge, the same
+`execute` and `executeSync` share the rest: the same resolver and no implicit shell, the same
+environment merge, the same `input` override, the same `limit` bounding, and the same `strict`
+behavior.
```

## Item 10 — fence lead-ins (P10, Ruling 21)

One sentence between each heading and its fence, each naming what the fence demonstrates:

- `### Collect output in one call`: "The fence that follows runs one command to completion and reads
  its captured standard output."
- `### Stream a long-running child and cancel it`: "The fence that follows reads a child line by line
  and lets an `AbortController` end it."
- `### Close a byte session cooperatively`: "The fence that follows ends the session's input, waits
  out a window of the caller's own, and terminates the child only when that window elapses."
- `### Supervise a fleet by id`: "The fence that follows launches one child per task under its own id
  and tears the whole registry down at shutdown."

The sweep over every fence directly under a heading now prints nothing.

## Item 11 — propagation

```
$ npx oxfmt --write guides/process.md tests/guides.test.ts src/core/types.ts src/core/constants.ts src/server/processes/ProcessManager.ts tests/src/server/processes/Supervisor.test.ts
Finished in 680ms on 6 files using 4 threads.
$ npm run docs                     rows read: 1, disagreements found: 0                          exit 0
$ npm run docs -- --to guide       rows read: 1, disagreements found: 0, written: 0, reported: 0  exit 0
$ npm run docs -- --to source      rows read: 1, disagreements found: 0, written: 0, reported: 0  exit 0
```

## Acceptance criteria

**1. Owned files only.**

```
$ git status --short
 M guides/process.md
 M src/core/constants.ts
 M src/core/types.ts
 M src/server/processes/ProcessManager.ts
 M tests/guides.test.ts
 M tests/src/server/processes/Supervisor.test.ts
```

**2. Format, lint, typecheck.**

```
$ npx oxfmt --check guides/process.md tests/guides.test.ts src/core/types.ts src/core/constants.ts src/server/processes/ProcessManager.ts tests/src/server/processes/Supervisor.test.ts
All matched files use the correct format.
Finished in 820ms on 6 files using 4 threads.                                                    exit 0
$ npx oxlint --config .oxlintrc.json --deny-warnings tests src                     (no output)   exit 0
$ npm run check                                                                                  exit 0
```

**3. The seed, both directions.** The runs are quoted under Item 11: `disagreements found: 0`, and
`written: 0` in each direction.

**4. The mechanical sweeps.**

```
$ diff <(sed -n 1,3p /home/user/fleet/abort/tests/guides.test.ts) <(sed -n 1,3p tests/guides.test.ts)
                                                                                    (no output)  exit 0
$ diff <(awk '/^const root = /{p=1} p{print} p && /^for \(const entry of manifest/{f=1} f && /^}$/{exit}' /home/user/fleet/abort/tests/guides.test.ts) <(awk '…' tests/guides.test.ts) | grep -c '^<'
0
$ tr '\n' ' ' < tests/guides.test.ts | grep -o 'stops being stranded' | wc -l
1
$ grep -n '/Interface$/u\|sourceManager' tests/guides.test.ts                       (no output)  exit 1
$ grep -n 'Two moments\|below\b' guides/process.md tests/src/server/processes/Supervisor.test.ts
                                                                                    (no output)  exit 1
$ grep -c 'barely past the race' tests/src/server/processes/Supervisor.test.ts
1
$ grep -n '^| API *| Kind *| Shape *| Summary' guides/process.md
93:| API              | Kind     | Shape          | Summary                                              |
173:| API                    | Kind  | Shape                         | Summary                     …
191:| API                       | Kind      | Shape                    …
225:| API                     | Kind      | Shape                      …
$ grep -c '| Value |' guides/process.md
0
$ awk '/^#/{h=NR; blank=0; next} /^[[:space:]]*$/{if(h)blank=1; next} /^```/{ if(h && blank) print h" -> "NR; h=0; next } {h=0}' guides/process.md
                                                                                    (no output)
```

Line 93 is the Guards table, 173 the Constants table, 191 the Types table, and 225 the Server
contracts table.

**5. The suites.**

```
$ PATH=/opt/npm11/bin:$PATH npm run test:guides
Test Files  1 passed (1);  Tests  119 passed | 1 skipped (120);  Duration 2.58s                   exit 0
$ npm run test:policy
Test Files  1 passed (1);  Tests  90 passed | 1 skipped (91);  Duration 668ms                     exit 0
```

Observation, the brief's timing-sensitive row: `PATH=/opt/npm11/bin:$PATH npm run test:src:server`
read `Test Files 7 passed (7); Tests 193 passed | 8 skipped (201); Duration 9.00s`, exit 0, started
2026-09-08T01:38:56Z under sibling load. The authoritative reading is the Orchestrator's after this
unit exits.

## Decisions this unit made

- **`PROCESS_ERROR_CODES`'s `Shape` cell reads `readonly ProcessErrorCode[]`.** Ruling 21 bars the
  literal type, which is what the frozen `as const` tuple declares, so the cell holds the widened
  type in form's `readonly FieldControl[]` idiom, and `ProcessErrorCode` carries its own row.
- **`PROSE_CONSTANTS` is gone.** It named the constant whose `Value` cell was prose. Every literal
  now sits in a description paragraph, including each error code, so the distinction it drew no
  longer exists and the case reads every row the same way.
- **The pilot's `INTERNAL` block, not `INTERNALS`, carries the pilot's sentence**, matching every
  other converged package, where that doc sits on the `readonly string[]` declaration. `INTERNALS`
  keeps a doc naming its per-face keying, so the phrase appears once.
- **The specifier discipline stayed as an appended package case** rather than being deleted with the
  pilot's bytes it had overwritten. Deleting it would have retired the rule that a public guide
  example imports through a published specifier.
- **`below` was corrected in `tests/guides.test.ts` too**, where it pointed rather than compared, and
  the two comparative uses in `guides/process.md` were reworded so criterion 4's sweep reads clean.
- **Two paragraphs were reflowed** after their sentence edits left a short line mid-paragraph
  (`guides/process.md:8-20` and the `execute` and `executeSync` paragraph). No sentence changed in
  the reflow.

## Instruments

Under the git-ignored `tmp/d7n-process-converge-fix/`: `rebuild-region.mjs`, `assemble.mjs`,
`tail-edits.mjs`, `constants-table.md`, `insert-b.txt`, `insert-c.txt`, `pilot-region.txt`,
`pilot-region-exact.txt`, `ours-region.txt`, `refusals.txt`, `faces.txt`, `own.txt`,
`before-fmt.ts`. No lint control was planted. The two red-first controls were guide-text edits,
each undone by editing and re-run green, and the tree carries neither.

---

Orchestrator's annotation (2026-09-08, from `d7n-process-closure-checker-process.md`): the report states a diffstat and a line count in prose; the members are named in the same sentences and the tree is authoritative.
