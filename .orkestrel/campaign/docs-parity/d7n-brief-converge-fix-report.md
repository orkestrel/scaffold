# Report — `d7n-brief-converge-fix`

`implementer` on Claude Opus 5, sole writer in `/home/user/fleet/brief` from the committed tip
`db926ac`. Every item closed. Wall clock 01:47 to 01:57 UTC on 2026-09-08. Nothing committed.

## Touched files

| File | Change |
| --- | --- |
| `guides/brief.md` | The `## Surface` lead-in moved under its heading, the `### Constants` table's `Shape` column and sentence, the raised fence comments lowered, the duplicate reading replaced, the identity fence's lead-in |
| `README.md` | `## Install`, `## Requirements`, `## Usage`, and `## Guide` headings, with a lead-in sentence before each fence |
| `src/core/errors.ts` | `BriefError`'s `@remarks` names `code` and `context` |
| `src/core/constants.ts` | `SINGLE_LINE_PATTERN`'s description names the `stringShape` `pattern` |
| `src/core/types.ts` | Both event map aliases gain an `@remarks` naming each event's payload |
| `tests/guides.test.ts` | The pilot's header line, the package's file-scope case moved out of the pilot's block, the blocking-path and identity fence transcriptions |

```text
 README.md             | 17 +++++++++++++
 guides/brief.md       | 41 ++++++++++++++++++--------------
 src/core/constants.ts |  2 +-
 src/core/errors.ts    |  3 +++
 src/core/types.ts     | 16 +++++++++++--
 tests/guides.test.ts  | 66 ++++++++++++++++++++++++++++++++++++++++++++-------
 6 files changed, 116 insertions(+), 29 deletions(-)
```

## Per item

### 1 — the lead-in (BR1, Ruling 21)

```diff
 ## Surface
 
-Compile a request into a `Briefing`, then project the brief it carries:
-
 ### Compile and project a brief
 
+Compile a request into a `Briefing`, then project the brief it carries:
+
 ```ts
```

`## Surface` takes no section lead: its H3 follows immediately, and the brief permits none. The
fence's title still pairs, because `@orkestrel/guide` pairs a fence on its nearest preceding
heading and a lead-in sentence sits between them without changing that.

### 2 — the header (BR2, Ruling 21)

```diff
-// package's own, and are the only part a sibling package changes.
+// package's own, as is the executed section that closes the file.
```

### 3 — the interleaved case (BR3, Ruling 20)

`reads a real inventory covering the documented source` moved from directly after
`manifest lists at least one guide` to directly after `opens the README with the guide tagline`,
so the pilot's block is contiguous and the package's file-scope case sits between that block and
the manifest loop. The region diff against the pilot now carries append hunks alone (criterion 4).

### 4 — fence comments (BR4)

```diff
-stopped.verdict?.trace // the reasoner's narration of the rules that DERIVED, not the misses
+stopped.verdict?.trace // the reasoner's narration of the rules that derived, not the misses
-	ruling.rules.filter((entry) => !entry.applied) // the rules that MISSED
+	ruling.rules.filter((entry) => !entry.applied) // the rules that missed
-// A house gate: this package's readiness UNCHANGED, plus one rule of your own, on your engine.
+// A house gate: this package's readiness unchanged, plus one rule of your own, on your engine.
```

### 5 — the duplicate line (BR5)

```diff
 stopped.brief // undefined — the gate failed closed, and that absence is the signal
-stopped.brief // undefined — nothing to project, deliberately
 stopped.questions // [{ field: 'output', question: 'Does the result need…', blocking: true, … }]
+stopped.questions.length // 1 — one question to answer, then re-compile
 stopped.failures // [{ stage: 'gate', code: 'BLOCKED', message: '1 blocking gap(s)' }]
```

The reading is executed, not asserted from prose: a probe ran the fence and printed
`questions.length 1`, and the same probe asserting `2` went red. The probe is deleted and its
claim is promoted into the flagship-fence block (see § Decisions).

### 6 — `BriefError`'s clause (BR6, Ruling 7)

```diff
  * @remarks
+ * Extends `Error` with a readonly `code` on the `BriefErrorCode` vocabulary and an optional
+ * readonly `context` record carrying whatever the raising site can supply.
+ *
  * Throws are reserved for caller misuse: `assertBrief`, `snapshotBrief`, and `pinBrief` on
```

The guide sentence under `### Errors` stays untouched. The description paragraph is unchanged, so
the compared cell does not move.

### 7 — `SINGLE_LINE_PATTERN` (BR7, Ruling 14)

```diff
- * Holds the positive form of {@link LINE_BREAK_PATTERN}, for the shape DSL.
+ * Holds the positive form of {@link LINE_BREAK_PATTERN}, for a `stringShape` `pattern`.
```

`npm run docs` reported the disagreement, `npm run docs -- --to guide` wrote the cell, and a
re-read came back at zero.

### 8 — the Constants table (BR8, Rulings 18 and 20)

The sentence `A `Shape` cell holds the constant's declared type.` sits between the `### Constants`
heading and the table, which now heads `| API | Kind | Shape | Summary |`. Cells, read from
`src/core/constants.ts` and cross-read against the emitted `dist/src/core/index.d.ts`:

| API | Shape |
| --- | --- |
| `TASK_OPERATIONS` | `readonly TaskOperation[]` |
| `TASK_DOMAINS` | `readonly TaskDomain[]` |
| `OUTPUT_FORMATS` | `readonly OutputFormat[]` |
| `RISK_SEVERITIES` | `readonly RiskSeverity[]` |
| `INTERPRETATION_MEMBERS` | `readonly (keyof Interpretation)[]` |
| `DEFAULT_BRIEF_TURNS` | `number` |
| `GATE_ID` | `string` |
| `LINE_BREAK_PATTERN` | `RegExp` |
| `SINGLE_LINE_PATTERN` | `RegExp` |
| `BLANK_PATTERN` | `RegExp` |

The emitted declarations for `DEFAULT_BRIEF_TURNS`, `GATE_ID`, and `INTERPRETATION_MEMBERS` are
literal types (`= 16`, `= "gate"`, and the literal union array), so the cells hold the widened type
Ruling 21 fixes. Ruling 18's literals are already in the descriptions: `DEFAULT_BRIEF_TURNS` names
`16` and `GATE_ID` names `'gate'`. The vocabulary lists' literals sit in the executed fence under
the table, which Ruling 18 permits as a demonstration beside the descriptions.

### 9 — the README (BR9, Ruling 6)

Sections added: `## Install`, `## Requirements`, `## Usage`, `## Guide`. `## Requirements` carries
the pilot's lines, each read off `package.json`: `engines.node` is `>=22.12.0`, and `exports`
declares `import` and `require` conditions. The pitch blockquote is untouched and the guides suite's
`opens the README with the guide tagline` case passes. Lead-in sentences, chosen here: "Install the
package from npm:", "Compile a request, then read the `Briefing` and project the brief it carries:",
and "Install the workspace and run its suites:" over the `## Development` fence, which the
criterion's awk also reaches.

### 10 — the event maps (BR10, Ruling 19)

```diff
-/** Declares the `BriefCompiler`'s push observation surface. */
+/**
+ * Declares the `BriefCompiler`'s push observation surface.
+ *
+ * @remarks
+ * `compile` carries the `Briefing` the call produced, `block` carries the blocking `Gap` list
+ * that stopped emission, `error` carries the thrown value, and `destroy` carries nothing.
+ */
```

```diff
-/** Declares the `BriefManager`'s push observation surface. */
+/**
+ * Declares the `BriefManager`'s push observation surface.
+ *
+ * @remarks
+ * `add` and `remove` each carry the record id the store minted from the brief's content hash,
+ * and `destroy` carries nothing.
+ */
```

Both cells stay `{ compile, block, error, destroy }` and `{ add, remove, destroy }`.

### 11 — the closing items (BR11, Ruling 21)

The closing brief listed the fences sitting directly under a heading. `### Compile and project a
brief` is closed by item 1. `### Storing briefs by their own identity` gains:

```markdown
A record's id is its brief's own content hash, so re-adding identical content mints no second
record and moves no version:
```

That claim was run before it was written: a probe reported `first.id fc3ce4eb again.id fc3ce4eb`,
`again.version 1`, and `count 1`. The `INTERNAL` block already carried the pilot's sentence on this
tip, byte for byte, so nothing moved there.

### 12 — propagation

`npx oxfmt --config .oxfmtrc.json --write` over the owned files, `npm run docs` at zero, and
both write directions at `written: 0`. Commands and output under § Criteria.

## Criteria

### 1 — `git status --short`

```text
 M README.md
 M guides/brief.md
 M src/core/constants.ts
 M src/core/errors.ts
 M src/core/types.ts
 M tests/guides.test.ts
```

Owned files only.

### 2 — format, lint, typecheck

```text
$ npx oxfmt --check guides/brief.md README.md tests/guides.test.ts src/core/errors.ts src/core/constants.ts src/core/types.ts
Checking formatting...

All matched files use the correct format.
Finished in 740ms on 6 files using 4 threads.
exit 0

$ npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts src/core
exit 0

$ PATH=/opt/npm11/bin:$PATH npm run check
> tsc --noEmit -p configs/src/tsconfig.core.json
exit 0
```

### 3 — `npm run docs`

```text
$ PATH=/opt/npm11/bin:$PATH npm run docs
rows read: 1, disagreements found: 0

$ PATH=/opt/npm11/bin:$PATH npm run docs -- --to guide
rows read: 1, disagreements found: 0, written: 0, reported: 0

$ PATH=/opt/npm11/bin:$PATH npm run docs -- --to source
rows read: 1, disagreements found: 0, written: 0, reported: 0
```

### 4 — the text checks

```text
$ diff <(sed -n 1,3p /home/user/fleet/abort/tests/guides.test.ts) <(sed -n 1,3p tests/guides.test.ts)
exit 0, no output

$ diff <(sed -n '47,258p' /home/user/fleet/abort/tests/guides.test.ts) <(sed -n '99,466p' tests/guides.test.ts) | grep -E '^[0-9]|^<|^---'
65a66,72
209a217,365

$ grep -c "A \`Shape\` cell holds the constant's declared type." guides/brief.md
1

$ grep -n '^| API *| Kind *| Shape *| Summary' guides/brief.md
144:| API                      | Kind  | Shape                               | Summary                                                                         |
237:| API               | Kind  | Shape           | Summary                                                                                          |

$ grep -nE '\b(DERIVED|MISSED|UNCHANGED)\b' guides/brief.md
exit 1, no output

$ grep -c '## Requirements' README.md
1
$ grep -c '^## Install\|^## Usage' README.md
2
$ grep -c 'stringShape' src/core/constants.ts
2

$ awk '/^#/{h=NR; blank=0; next} /^[[:space:]]*$/{if(h)blank=1; next} /^```/{ if(h && blank) print h" -> "NR; h=0; next } {h=0}' guides/brief.md README.md
exit 0, no output
```

The region diff carries `a` hunks alone — no changed and no deleted line — so the region equals the
pilot's outside the package's appended cases. The `Shape` header grep lists the Constants table at
`144`; the row at `237` is the guard table that already carried the column on this tip.

### 5 — the suites

```text
$ PATH=/opt/npm11/bin:$PATH npm run test:guides
 Test Files  1 passed (1)
      Tests  39 passed (39)
   Duration  692ms
exit 0

$ PATH=/opt/npm11/bin:$PATH npm run test:policy
 Test Files  1 passed (1)
      Tests  90 passed | 1 skipped (91)
   Duration  847ms
exit 0
```

Observation, `npm run test:src:core`:

```text
 Test Files  10 passed (10)
      Tests  281 passed (281)
   Duration  1.40s
exit 0
```

The skipped policy case is the tip's own conditional skip; this unit added no skip and changed no
policy input.

## Decisions recorded

- **`## Surface` takes no section lead.** The brief permits a non-colon lead or none. Its H3 follows
  immediately, and a second sentence there would restate the fence's lead-in.
- **The README's section set.** `## Install`, `## Requirements`, `## Usage`, and `## Guide` were
  added; the existing `## Development` section kept its place and gained a lead-in. The pilot's
  `## Package` and `## License` sections were not added: item 9 names Install, Usage, and
  Requirements, and neither a package paragraph nor a license line is content this unit was asked
  to author. Flagging it for the Orchestrator rather than deciding it silently.
- **The flagship-fence transcriptions promoted into `tests/guides.test.ts`.** The line added by item
  5 and the sentence added by item 11 are claims about behaviour, and
  `.claude/rules/documentation.md` requires an executed assertion behind such a claim while
  `.claude/rules/tests.md` requires a probe that settles a claim to promote or be deleted. Each
  claim was settled by a probe under `tmp/probe/`, every probe is deleted, and their assertions
  now sit in the package's own executed section — which Ruling 20 fixes as package-owned and which
  the drop-in region diff therefore does not cover. The cases are
  `runs the blocking path fence and yields the readings its comments claim` and
  `runs the identity fence and mints one record for repeated content`.
- **The probes ran from `tmp/probe/`, not `tmp/d7n-brief-converge-fix/`.** The `probe` Vitest project
  in `vite.config.ts` includes `tmp/probe/**/*.test.ts` and nothing else, so a runtime probe under
  the unit-named directory is collected by no project. `.claude/rules/tests.md` fixes that location.
  Each probe file carried the unit name, sat under the same git-ignored `tmp/` root the brief names,
  and is deleted; `tmp/probe/` was removed with them. No sibling unit writes this checkout, so the
  shared directory name collided with nothing.
- **`toEqual` rather than `toStrictEqual` in the blocking-path transcription.** The first run of that
  case failed with `expected [ { field: 'output', …(3) } ] to strictly equal
  [ { field: 'output', …(3) } ]` and `Compared values have no visual difference`. A probe read the
  produced record: `Object.getPrototypeOf(gap) === Object.prototype` is `false` and the record is
  frozen, so the compiler emits a null-prototype gap and a prototype-sensitive matcher cannot pass.
  The matcher choice carries that reason as a comment beside it. The guides suite went from
  `1 failed | 38 passed (39)` to `39 passed (39)` on that change.

## Observations, carried nowhere by this brief

- **The `### Shapers` table has no `Shape` column.** The closing generator listed
  `310: CONSTANTS TABLE WITHOUT Shape under 'Shapers'`. Item 8 names the `### Constants` table at
  `:142` alone, naming each of its cells, so the shapers table was left as found. It belongs to
  whichever unit carries the closing sweep's Ruling 18 population.
- **The compiler emits null-prototype records.** `Briefing.questions` holds frozen null-prototype
  gaps. Nothing in the guide says so, and no rule this unit read requires it to. Recorded because it
  changes which matcher a transcription can use.
- **The gate refuses on more than the blocking gap.** The blocking-path probe printed
  `unapplied [{"id":"specified",...},{"id":"ready",...}]`. The transcription asserts that the
  unapplied set is non-empty rather than pinning those ids, because the fence's comment reads
  "exactly which rules missed" without naming them.
- **Timing.** The host carried sibling units throughout. Every suite here finished under 1.5s, so no
  reading was near a budget; the authoritative gate run still belongs to the closure's `verifier`.

## Deviation state

None. No gate outside the owned files went red, and no cell resisted Ruling 12. No package was
installed, no commit made, and no discard-class git command run.
