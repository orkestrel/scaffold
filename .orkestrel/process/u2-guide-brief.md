# Unit U2 — guide: retire `Retention` from the surface and document `captureChunk`

## Role and engine

`implementer`. Engine: Opus 5 (native). Documentation-voice work is the Opus route by default, so
no engine substitution applies to this unit.

## Context

Read `/home/user/process/tmp/units/shared-context.md` first; everything in it binds you. Then read
`/home/user/scaffold/.claude/rules/documentation.md` and `/home/user/scaffold/.claude/rules/writing.md`,
and `AGENTS.md` § Writing. This unit is prose, and those rules decide it.

Unit U1 has already landed in the tree. `src/server/execution/` and `src/server/Retention.ts` are
gone, `execute`, `executeSync`, `detach`, and a new `captureChunk` live in `src/server/helpers.ts`,
and `RetentionInterface` is gone from `src/server/types.ts`. Read `src/server/helpers.ts` for
`captureChunk`'s real signature and TSDoc before you document it. Do not trust this brief over the
tree.

## Objective

`guides/process.md` describes the surface that now exists: no `Retention`, no `RetentionInterface`,
a documented `captureChunk`, a Tests section naming the files that will exist after unit U3, and a
Vocabulary row settling `detach`.

## Owned files

- `guides/process.md` — edit. This is the only file you own.

## Off-limits

Everything else, including `README.md`, `guides/README.md`, all of `tests/`, and all of `src/`.
`README.md` names `execute`, `executeSync`, and `detach` as APIs and names no path and no
`Retention`, so it needs no edit; confirm that by reading it, and report if it is not so.

## The work

### 1. Remove the `Retention` surface

- The `Retention` class row in the Surface table's `### Entities` section, at line 78 before your
  edits. That section's preamble reads "The classes each factory constructs", and `Retention` was
  never factory-constructed, so its removal also makes that sentence true.
- The `RetentionInterface` row in the `### Types` table, at line 209 before your edits.
- The whole `#### RetentionInterface` subsection under `### Server contracts`: its prose, its
  method table, and its example fence. Lines 226 to 241 before your edits.
- The `tests/src/server/Retention.test.ts` bullet in the `## Tests` section, at line 1480 before
  your edits.

Leave the `### Retention helpers` heading and its table. It groups `trimHead`, `trimTail`, and
`buildExecuteResult`, which are byte-bounding helpers rather than the deleted class.

### 2. Document `captureChunk`

Add a row for `captureChunk` to the `### Retention helpers` table, in the position the table's
existing order implies. Write its summary in the same voice as the rows beside it: one line, saying
what it does rather than how.

Every public export must carry a runnable example that parity can execute, so `captureChunk` needs
one. Its TSDoc `@example` in `src/server/helpers.ts` is the model; the guide fence must import
through the published specifier `@orkestrel/process/server`, never through an `@src/*` alias, and
must assert a value in a trailing comment the way the guide's other fences do.

### 3. State the capture bound where a reader meets it

`### Output bounds` currently promises that a bounded capture never splits a UTF-8 sequence. That
promise was false before unit U1 and is true after it. The section needs no correction of its
claim, but a reader who has just been told the capture is "capped at `limit` bytes" and then finds
`limit + 1` in the source deserves the reconciliation. Add it to the prose of that section, briefly:
the capture reads one byte past the bound so the trim can retreat off a split sequence, and the
returned text is still bounded by `limit`.

Do not restate the mechanism a third time. It is in `captureChunk`'s remarks and in `execute`'s
remarks already.

### 4. Update the Tests inventory

After unit U3 the server test files will be exactly: `tests/src/server/Process.test.ts`,
`tests/src/server/ProcessManager.test.ts`, `tests/src/server/Session.test.ts`, and
`tests/src/server/helpers.test.ts`. The `execution/` folder and `Retention.test.ts` will not exist.

- Delete the three `tests/src/server/execution/*.test.ts` bullets, at lines 1493, 1496, and 1499
  before your edits.
- Fold what those bullets described into the `tests/src/server/helpers.test.ts` bullet, so nothing
  the guide claimed about that coverage is lost. That bullet must now also name the capture-bound
  and code-point-boundary coverage, and the one-shot and fire-and-forget runs.

`tests/guides.test.ts` asserts that every test file is either listed in a guide's Tests section or
named in its `UNLISTED_TESTS` list, so a bullet naming a file that does not exist, or a file no
bullet names, fails the `guides` project.

### 5. Add a Vocabulary row for `detach`

The `## Vocabulary` table settles each name on this surface that reads against a house rule. It
already carries a row for `execute`, `executeSync`. `detach` is a bare verb where the standalone
helper rule defaults to `{verb}{Noun}`, and two blind design lanes ruled that it stays. Record that
ruling so the next change does not re-litigate it: the name is unmistakable at its call site
because it takes a `ProcessCommand` and its own `DetachOptions`, and it is the one word for the
spawn that is not awaited.

Write it in the voice of the rows around it: the ruling, then what was refused and why.

## Deviation contract

Stop and report if `README.md` turns out to name `Retention` or a source path, if the guide names
something the brief did not anticipate, or if `captureChunk`'s real signature differs from what
this brief assumes. Where the brief leaves a wording choice open, make it, record it, and carry on.

## Acceptance criteria

Run each yourself and paste its real output.

1. `grep -n "Retention" guides/process.md` returns only the `### Retention helpers` heading and its
   table rows, and no reference to the class or the interface.
2. `grep -c "execution/" guides/process.md` returns 0.
3. `grep -n "captureChunk" guides/process.md` shows both the table row and the example fence.
4. `grep -n "detach" guides/process.md` shows a Vocabulary row.
5. `npm run format:check` exits 0.

The `guides` project will still be red at the end of your unit, because `tests/guides.test.ts`
still imports `Retention` and still carries its transcriptions. That is unit U3's work. Do not edit
any test file.

## Output

What you changed, section by section, with the before-and-after of each table row you touched; each
acceptance command with its real output; every wording decision you made where the brief left one
open; and anything you could not close.
