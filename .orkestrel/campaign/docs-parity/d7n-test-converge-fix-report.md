# Report — `d7n-test-converge-fix`

Touched file: `/home/user/fleet/test/guides/test.md` — the `Shape` convention sentence moved above
every table that carries the column and reworded against that table's rows, the core and browser
Constants tables' declared-type column renamed to `Shape`, and § Tests given the titled fence's name.

Diffstat: `guides/test.md | 57 +++++++++++----------- , 33 insertions(+), 24 deletions(-)`.

## Item 1 — the convention sentence sits above its table, worded against that table's rows

Core Types (`guides/test.md:106-109`, above the table at `:111`). The sentence moved out of the
paragraph that sat under the table and gained the two idioms that table uses and the earlier wording
denied: `RetryOptions` (`` `WaitOptions` plus `{ attempts? }` ``) and `EventSourceInterface`
(`` `on` alone ``).

```diff
+A `Shape` cell holds an interface's `readonly` data members in braces and its call-signature
+members after `plus`, an extended interface's name before `plus` with the members it adds after,
+`alone` after the call-signature members of an interface that declares no data members, and a type
+alias's own type.
```

The rest of that paragraph stays under the table (`:133-135`), which is the pilot's shape at
`/home/user/fleet/abort/guides/abort.md:60` above and `:67` below:

```diff
-A `Shape` cell holds an interface's `readonly` data members in braces and its call-signature members
-after `plus`, and a type alias's own type. Each interface's call-signature members are listed under
-[Methods](#methods). `Result` defaults `E` to `Error`, where `@orkestrel/contract` publishes the same
-name defaulting to `unknown`; [Limits](#limits) rules that divergence.
+Each interface's call-signature members are listed under [Methods](#methods). `Result` defaults `E`
+to `Error`, where `@orkestrel/contract` publishes the same name defaulting to `unknown`;
+[Limits](#limits) rules that divergence.
```

Browser Types (`:232-233`, above the table at `:235`). That table carries neither an extension nor an
`alone` row, so the wording is unchanged and only the placement moved:

```diff
+A `Shape` cell holds an interface's `readonly` data members in braces and its call-signature
+members after `plus`, and a type alias's own type.
```

Server Types (`:597-599`, above the table at `:601`). The extension clause is added for
`UpgradeOptions` (`` `WaitOptions` plus `{ path?, protocols? }` ``); the `or` clause for
`UpgradeResult` stays, and no `alone` clause is added because that table has no such row:

```diff
+A `Shape` cell holds an interface's `readonly` data members in braces and its call-signature
+members after `plus`, an extended interface's name before `plus` with the members it adds after,
+and a type alias's own type, whose arms are written with `or`.
```

Server Constants keeps its sentence above the table, unchanged (`:614`, table at `:616`).

## Item 2 — one header for a constant's declared type

Core Constants (`:139-141`) and browser Constants (`:249-251`) take the server's header and the
server's sentence. The header cell keeps its padding, so the column's rendered width is unchanged:

```diff
 #### Constants
 
-| API                     | Kind  | Signature                                            …
+A `Shape` cell holds the constant's declared type.
+
+| API                     | Kind  | Shape                                                …
```

```diff
 #### Constants
 
-| API                  | Kind  | Signature                          | Summary          …
+A `Shape` cell holds the constant's declared type.
+
+| API                  | Kind  | Shape                              | Summary          …
```

`Signature` survives only where the cell holds a function signature — the Validators, Helpers, and
Factories tables at `:154`, `:170`, `:200`, `:265`, `:328`, `:624`, `:741`.

`docs` stays at zero, confirmed under criterion 2: the readers locate the compared column by
`Summary`, and no row's `Summary` cell moved.

## Item 3 — § Tests names the titled fence

`:2930-2933`. The bullet is rewrapped at the file's width because the inserted title pushes the line
past it; no code span straddles a line break:

```diff
-  `## Methods` bijection and each group's
-  members, the fence imports, and link resolution for this guide. It also runs the equality gate:
-  every `Summary` cell against the description paragraph of the declaration it documents, the titled
-  fence against the `@example` block of that title (pinned so the titled pair cannot be retired
-  silently), and the README pitch against this guide's tagline. Beside them it runs the fences
+  `## Methods` bijection and each group's members, the fence imports, and link resolution for this
+  guide. It also runs the equality gate: every `Summary` cell against the description paragraph of
+  the declaration it documents, the titled `Own a temporary directory` fence against the `@example`
+  block of that title (pinned so the titled pair cannot be retired silently), and the README pitch
+  against this guide's tagline. Beside them it runs the fences themselves and asserts what their
```

The remainder of the bullet is reflowed text with no wording change.

## Criterion 1 — format, lint, policy

`npx oxfmt --config .oxfmtrc.json --check guides/test.md`:

```text
All matched files use the correct format.
Finished in 1645ms on 1 files using 4 threads.
oxfmt exit=0
```

`npx oxlint --config .oxlintrc.json --deny-warnings guides/test.md`:

```text
No files found to lint. Please check your paths and ignore patterns.
oxlint exit=1
```

This criterion cannot pass as written, and the cause is the tool rather than the edit — see
§ Deviation state.

`npm run test:policy`:

```text
 Test Files  1 passed (1)
      Tests  90 passed | 1 skipped (91)
   Duration  1.25s (transform 546ms, setup 40ms, import 556ms, tests 424ms, environment 0ms)
policy exit=0
```

## Criterion 2 — docs and guides

`npm run docs`:

```text
rows read: 1, disagreements found: 0
docs exit=0
```

`npm run test:guides`:

```text
 Test Files  1 passed (1)
      Tests  43 passed (43)
   Duration  3.00s (transform 383ms, setup 64ms, import 1.16s, tests 1.55s, environment 0ms)
guides exit=0
```

## Criterion 3 — the comparator

`node /home/user/scaffold/.orkestrel/campaign/docs-parity/instruments/d7/pass/cells/compare-cells.mjs /home/user/fleet/test HEAD guides/test.md`
(`HEAD` is `e62a981`):

```json
{
 "rowsBefore": 234,
 "rowsAfter": 234,
 "missing": [],
 "added": [],
 "changed": [
  { "key": "`STATECHART_ATTRIBUTES`", "col": "Signature", "was": "`Readonly<Record<'status' \\| 'passed' \\| 'failed' \\| 'total' \\| 'scenario' \\| 'result' \\| 'state', string>>`", "is": "(column absent)" },
  { "key": "`STATECHART_STATUSES`", "col": "Signature", "was": "`readonly ['pending', 'idle', 'running', 'passed', 'failed']`", "is": "(column absent)" },
  { "key": "`ACCESSIBLE_ROLES`", "col": "Signature", "was": "`readonly string[]`", "is": "(column absent)" },
  { "key": "`CANVAS_COLOR`", "col": "Signature", "was": "`Color`", "is": "(column absent)" },
  { "key": "`CAPTURE_PANE`", "col": "Signature", "was": "`string`", "is": "(column absent)" },
  { "key": "`CAPTURE_STAGINGS`", "col": "Signature", "was": "`number`", "is": "(column absent)" },
  { "key": "`CONTENT_ROLES`", "col": "Signature", "was": "`readonly string[]`", "is": "(column absent)" },
  { "key": "`FIELD_ROLES`", "col": "Signature", "was": "`Readonly<Record<string, string>>`", "is": "(column absent)" },
  { "key": "`FOCUSABLE_SELECTOR`", "col": "Signature", "was": "`string`", "is": "(column absent)" },
  { "key": "`HEADER_ROLES`", "col": "Signature", "was": "`Readonly<Record<string, string>>`", "is": "(column absent)" },
  { "key": "`IMPLICIT_ROLES`", "col": "Signature", "was": "`Readonly<Record<string, string>>`", "is": "(column absent)" }
 ]
}
```

Every changed cell is the renamed header's column and nothing else: each entry names `Signature`,
each is a row of the core or browser Constants table, and each reports `(column absent)` because the
header those rows sit under now reads `Shape`. `rowsBefore` equals `rowsAfter` at 234, with `missing`
and `added` empty.

The comparator reports the renamed column as absent rather than comparing its cells, so it leaves the
cell values unread. Corroboration, mapping `Signature` to `Shape` where the old header is gone and
comparing values on the retained comparator's own split — instrument at
`/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/values.mjs`:

```json
{ "rowsBefore": 234, "rowsAfter": 234, "changedUnderMappedHeader": [] }
```

No cell value moved under the renamed header.

## Criterion 4 — status

`git status --short` in `/home/user/fleet/test`:

```text
 M guides/test.md
```

## Deviation state

One criterion cannot pass as written; nothing in the deviation contract's stop conditions fired, so
the assignment ran to completion.

**Criterion 1's oxlint command exits 1 for any Markdown path.** oxlint 1.81.0 lints no Markdown file,
so the run reports `No files found to lint. Please check your paths and ignore patterns.` and exits 1
on content it never read. The unmodified `README.md` on this tip reads the same way, which is the
evidence that the cause is the tool rather than this edit:

```text
$ npx oxlint --config .oxlintrc.json --deny-warnings README.md
No files found to lint. Please check your paths and ignore patterns.
README exit=1
```

The reading available in its place is the package's own gate, which resolves its own paths and
exits 0:

```text
$ npm run lint:check
> oxlint --config .oxlintrc.json --deny-warnings .
lint:check exit=0
```

That gate reads no Markdown either, so it corroborates that the tree is lint-clean and says nothing
about `guides/test.md`. The prose in the guide is gated instead by the `test:policy` sweep over
authored Markdown, recorded under criterion 1.

Nothing outside `guides/test.md` was written in the subject checkout. The two edit instruments and
the corroboration instrument live in the session scratchpad at
`/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/`
(`edit.mjs`, `rewrap.mjs`, `values.mjs`).

## Observations

- The browser Types table's convention sentence is unchanged wording, moved only. Its rows use
  neither the extension idiom nor `alone`, so the narrower sentence is the accurate one for that
  table; the three Types sentences therefore differ by design rather than by drift.
- § Tests' bullet is reflowed past the sentence the item names, because inserting the fence title
  pushed the line past the file's width. No other wording in that bullet changed.

---

**Orchestrator annotation (closure, 2026-09-07):** the closure `checker` read counts in this report's prose (lines 12, 232, 241: the idioms, the edit instruments, the Types sentences). The tree is authoritative; the report's prose faults stand annotated, not rewritten.
