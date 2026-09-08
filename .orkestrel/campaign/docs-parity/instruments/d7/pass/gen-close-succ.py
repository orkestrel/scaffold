#!/usr/bin/env python3
"""gen-close-succ.py: writes /home/user/scaffold/tmp/units/d7n-<pkg>-close-<n>-brief.md for each closing successor the closing checkers require."""
import subprocess, sys
UNITS = {
 'console': (2, [
  "**Ruling 26.** Every function row with an empty `Shape` cell in `guides/console.md` (the `### Factories`, `### Sinks`, `### Rendering`, `### Capture`, `### Errors`, `### Browser`, and `### Server` tables, about lines 67-72, 86-87, 119-134, 154, 166, 264-267, 301-306) holds its signature as a type literal read from its declaration; a guard row (`isConsoleError`, `isStreamTarget`, `isBufferEncoding`) holds the type it narrows to. Each such table's convention text gains \"A function row's `Shape` cell holds its signature, and a guard row's the type it narrows to.\"",
  "**Ruling 28.** Every class row with an empty `Shape` cell (`ANSIRenderer`, `Logger`, `LoggerManager`, `Reporter`, `Retention`, `Capture`, `ConsoleError`, `Spinner`, `Progress`, `ProcessCapture`) holds the interface it implements as a code token, or its constructor signature where it implements none (read `implements` in each class declaration). Each such table's convention text gains \"A class row's `Shape` cell holds the interface it implements, or its constructor signature where it implements none.\"",
  "**Ruling 19.** The event map type-alias rows whose cells spell tuple payload types (`LoggerEventMap` about line 90 and the other four the checker names in `d7n-console-closure-checker-console.md` claim 3) take bare member names: `{ entry, … }` with no payload type.",
 ]),
 'contract': (2, [
  "**Ruling 26.** Every function row with an empty `Shape` cell in `guides/contract.md` (about lines 204-209, 365, 535-540, 605-621, 660-667) holds its signature as a type literal read from its declaration; a guard row holds the type it narrows to; each such table's convention text gains \"A function row's `Shape` cell holds its signature, and a guard row's the type it narrows to.\"",
  "**Ruling 28.** The class rows `JSONCloner`, `SchemaCloner`, `ShapeCloner` (about 385-389), `ShapeValidator` (533), and `ContractCompiler` (542) hold the interface each implements, or its constructor signature where it implements none; the convention text gains the class sentence.",
  "**Rulings 21 and 22.** The second fence under `### Compiling a contract` (about 1029-1039, the undeclared-key audit) takes its own `###` heading naming what it demonstrates and a lead-in sentence; the fences directly after a table at about `:405->407`, `:419->421` (a second fence after the first), and `:745->747` each get a lead-in sentence between the table (or the previous fence) and the fence.",
 ]),
 'table': (2, [
  "**Ruling 26.** `createTable` (about line 114) holds its signature and `isTableError` (about 127) holds the type it narrows to; the convention text gains the function sentence.",
  "**Ruling 28.** `Table` and `TableError` hold the interface each implements, or the constructor signature where it implements none; the convention text gains the class sentence.",
  "**Ruling 20 (the drop-in's canon).** The region of `tests/guides.test.ts` from `const root = ` through the manifest loop's closing brace equals the pilot's byte for byte: the pilot's `manifest lists at least one guide` case is present at the pilot's position; the package's own `parses manifest rows that point at real files` and `imports only real exports in every root README ts fence` cases are appended after the pilot's README case (file scope) without folding a pilot assertion into them; the `readme` binding moves inside the case that uses it; the README case reads the pilot's inline form. `diff <(sed -n '47,258p' /home/user/fleet/abort/tests/guides.test.ts) <(sed -n '<start>,<end>p' tests/guides.test.ts)` then prints nothing for the region.",
  "**Ruling 24.** `README.md`'s `## Usage` lead-in sentence (\"Declare the columns, hold the rows, and read the ones to draw:\") is removed so the fence sits directly under its heading, as the pilot's does.",
 ]),
 'form': (2, [
  "**Ruling 26.** `createForm` (about line 108) holds its signature and `isFormError` (about 115) the type it narrows to; the convention text gains the function sentence.",
  "**Ruling 28.** `Form` and `FormError` (about 106, 113) hold the interface each implements, or the constructor signature where it implements none; the convention text gains the class sentence.",
  "**Rulings 21 and 22.** The second fence under `### Park-as-Promise: \\`answer\\`` (about 1247-1249, the `abandoned`-status example) takes its own `###` heading naming what it demonstrates and a lead-in sentence.",
 ]),
 'ndjson': (2, [
  "**Ruling 21.** One complete sentence naming what the fence demonstrates sits between the `### Types` table's last row (about line 46) and the fence at about line 48, in the voice of the `#### Create a parser` lead-in.",
 ]),
 'html': (2, [
  "**Ruling 20.** The `### Validators` table (about lines 70-83) heads `| Name | Kind | Shape | Summary |` with each cell the type the guard narrows to (read each `value is X` in `src/core/validators.ts`), under \"In a guard table a `Shape` cell holds the type the guard narrows to.\" placed between the section's prose and the table; the `Signature` column goes.",
  "**Ruling 25.** The `### Shapers` cells (about 142-147) hold the declared type in Ruling 25's form — `ObjectShape<{ name, value? }>` for `attributeShape`, `ObjectShape<{ category, value }>` for `textShape` and `commentShape`, `ObjectShape<{ category, name, public?, system? }>` for `doctypeShape` (read the members from each `objectShape({ ... })` call in `src/core/shapers.ts`) — under the constants sentence, replacing `ContractShape`.",
 ]),
 'markdown': (2, [
  "**Ruling 20.** The `### Validators` table (about lines 165-187) heads `| Name | Kind | Shape | Summary |` with each cell the type the guard narrows to (read each `value is X` in `src/core/validators.ts`), under \"In a guard table a `Shape` cell holds the type the guard narrows to.\" between the section's prose and the table; the `Signature` column goes.",
  "**Ruling 25.** The `### Shapers` cells (about 149-163) hold the declared type in Ruling 25's form: an `objectShape({...})` value `ObjectShape<{ members }>` in bare-member form and declaration order with `?` on an optional property, a `literalShape([...])` value `LiteralShape<'a' \\| 'b'>` with the literals (read `src/core/shapers.ts:32,49,66,84,103,123,139`), under the constants sentence.",
 ]),
 'tool': (2, [
  "**Ruling 20.** The `### Validators` table (about lines 62-68) heads `| Name | Kind | Shape | Summary |` with `isToolCall` and every other guard row holding the type it narrows to (read each `value is X` in `src/core/validators.ts`), under \"In a guard table a `Shape` cell holds the type the guard narrows to.\" between the section's prose and the table; the `Signature` column goes.",
 ]),
 'reason': (2, [
  "**Ruling 20.** The `### Validators` table (about lines 224-226) heads `| API | Kind | Shape | Summary |` with each row holding the type it narrows to (read each `Guard<X>` annotation and `value is X` in `src/core/validators.ts`), under \"In a guard table a `Shape` cell holds the type the guard narrows to.\" between the section's prose and the table.",
 ]),
 'database': (2, [
  "**Rulings 18 and 21.** The `### Constants` rows `DEFAULT_PRIMARY` and `MAX_PATTERN_LENGTH` (about lines 241-242) hold `string` and `number`; where a description does not already name the literal (`'id'`, `1024`), the doc block in `src/core/constants.ts` gains it in its description sentence and `--to guide` carries the cell.",
  "**Ruling 20 (the second manifest loop).** `tests/guides.test.ts` carries the pilot's loop (about 112-258) and a package-own second loop (about 643-821). A case in the second loop whose population equals a pilot case's (the same `findMissingSymbols` call over the same surfaces under another name) is a duplicate and is struck; a case reading a population the pilot's cases do not (published entry points from `package.json`, the compiler entry surfaces, the executable guide fences) stands. Record per case which it is; the pilot's region is untouched.",
 ]),
 'toolbox': (2, [
  "**Ruling 27.** In the guard table's convention text (about line 67), the interface sentence in front of \"In a guard table a `Shape` cell holds the type the guard narrows to.\" is struck; the guard sentence stands alone between the section's prose and the table.",
 ]),
 'lsp': (2, [
  "**Ruling 28.** The class rows `StdioClientTransport` (about line 347), `LSPClient` (360), and `LSPError` (389) hold the interface each implements as a code token, or the constructor signature where it implements none (read `implements` and the constructor in each class); each such table's convention text gains \"A class row's `Shape` cell holds the interface it implements, or its constructor signature where it implements none.\"",
  "**Ruling 27.** Where the `### Guards` table's convention text carries the interface sentence in front of the guard sentence, the interface sentence is struck.",
 ]),
 'brief': (3, [
  "**Ruling 27.** In the guard table's convention text (about line 235), the interface sentence in front of \"In a guard table a `Shape` cell holds the type the guard narrows to.\" is struck; the guard sentence stands alone between the section's prose and the table.",
 ]),
}
for pkg, (n, items) in UNITS.items():
    tip = subprocess.check_output(['git','-C',f'/home/user/fleet/{pkg}','rev-parse','--short','HEAD'], text=True).strip()
    unit = f'd7n-{pkg}-close-{n}'
    owns = f'`guides/{pkg}.md`, `tests/guides.test.ts`' + (', the doc blocks under `src/core/**` (no code token moves)' if pkg in ('database',) else '') + (', `README.md`' if pkg == 'table' else '')
    body = '\n'.join(f'{i+1}. {t}' for i, t in enumerate(items))
    extra_docs = " and the doc block behind any moved cell edited then carried with `npm run docs -- --to guide`" if pkg == 'database' else ''
    brief = f"""# Brief — `{unit}` ({pkg}: the closing checker's findings)

## Role and engine

`builder` on Claude Sonnet. Sole writer in `/home/user/fleet/{pkg}` from the committed tip `{tip}` (clean; the final guide tarball `0.0.18` installed `--no-save`). Perform the assignment directly and spawn nothing. Do not commit, install, or run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; undo an edit by editing. Put every instrument under `tmp/{unit}/` inside this checkout.

## Read first

`/home/user/scaffold/AGENTS.md` § Writing; `/home/user/scaffold/.orkestrel/campaign/docs-parity/rulings.md` § Ruling 15, § Ruling 18, § Ruling 19, § Ruling 20, § Ruling 21, § Ruling 22, § Ruling 24, § Ruling 25, § Ruling 26, § Ruling 27, § Ruling 28; `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-{pkg}-closure-checker-{pkg}.md` (the checker's findings this unit closes); the pilot `/home/user/fleet/abort/tests/guides.test.ts` and `/home/user/fleet/abort/guides/abort.md`; `/home/user/fleet/abort/guides/guide.md` (function rows carrying their signature) and `/home/user/fleet/abort/guides/probe.md` (class rows carrying the interface implemented).

## Items

{body}

Then `npx oxfmt --config .oxfmtrc.json --write <paths>`; `PATH=/opt/npm11/bin:$PATH npm run docs` reads `rows read: 1, disagreements found: 0` and both write directions read `written: 0`{extra_docs}. Move no `Summary` cell by hand.

## Scope

Owned: {owns}. Off-limits: everything else, including `guides/README.md`, every vendored file, `package.json`, `package-lock.json`, `tests/src/**`, `tests/setup*.ts`.

## Acceptance criteria, cheapest first

1. `git status --short` lists owned files only.
2. `grep -nE '^\\| `[^`]+` +\\| (function|const|class) +\\| +\\| ' guides/{pkg}.md` prints nothing (no empty `Shape` cell in a table that carries the column); the fence sweep `awk '/^#/{{h=NR; blank=0; next}} /^[[:space:]]*$/{{if(h)blank=1; next}} /^```/{{ if(h && blank) print h" -> "NR; h=0; next }} {{h=0}}' guides/{pkg}.md` prints nothing; `diff <(sed -n 1,3p /home/user/fleet/abort/tests/guides.test.ts) <(sed -n 1,3p tests/guides.test.ts)` prints nothing.
3. `npx oxfmt --config .oxfmtrc.json --check guides/{pkg}.md tests/guides.test.ts` and `npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts` exit 0.
4. `npm run docs` at zero; both directions `written: 0`.
5. `PATH=/opt/npm11/bin:$PATH npm run test:guides` exits 0 (record the summary).

## Output

`/home/user/scaffold/tmp/units/{unit}-report.md`: per item the hunk as a diff, per criterion the exact command and its last lines. No process diary. No count in prose.

## Deviation contract

Stop if a `Shape` cell cannot be expressed under Rulings 25, 26, and 28 (name the row and what you read), if `npm run docs` reports a disagreement `--to guide` does not clear, or if a gate outside the owned files goes red. Decide the wording of a heading or a lead-in sentence yourself and record it.
"""
    open(f'/home/user/scaffold/tmp/units/{unit}-brief.md','w').write(brief)
    print(unit, tip)
