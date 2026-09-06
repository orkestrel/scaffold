<!-- workflow wf_45a3007b-190, agent (the m3m4 lane; the capture named it by start order and the files were swapped back on 2026-09-06), captured from journal.jsonl, 2026-09-06 -->

# Report — ts6-m3m4 (`tsc --pretty false` text shapes on 6.0.3 and 7.0.2)

## Versions

- 6.0.3 (`node /home/user/scaffold/node_modules/typescript/bin/tsc --version`): `Version 6.0.3`
- 7.0.2 (`node <scratch>/package/bin/tsc --version`): `Version 7.0.2`

Setup note: 7.0.2 ships as `typescript` with a native `tsgo`-derived binary resolved through an optional platform package (`@typescript/typescript-linux-x64@7.0.2`). `npm pack typescript@7.0.2` alone is not runnable; `node package/bin/tsc` throws `Unable to resolve @typescript/typescript-linux-x64` until that platform package is packed separately and placed at `package/node_modules/@typescript/typescript-linux-x64` with its `lib/tsc` binary marked executable. Both binaries then answer `--version` and run normally. A parser's setup code that spawns `tsc` from a bare `npm pack` of the 7.x line must check for that native binary's presence, not just the package's existence.

## Case sections

Each stdout/stderr pair is fenced. "Identical" means the 6.0.3 and 7.0.2 texts match byte for byte except for the exit code, called out separately.

### `plain`

`src/a.ts`: `export const n: number = 'x';`

stdout (both majors, identical):
```
src/a.ts(1,14): error TS2322: Type 'string' is not assignable to type 'number'.
```
stderr: empty on both. Exit code: `2` on 6.0.3, `1` on 7.0.2.

### `elaborated`

The brief's literal case (`Shape { size: { width: number } }`, `s: Shape = { size: { width: 'wide' } }`) does not elaborate: the mismatch sits at the innermost leaf of a fresh object literal assigned directly, so `tsc` reports only the leaf comparison, on both majors:
```
src/a.ts(4,35): error TS2322: Type 'string' is not assignable to type 'number'.
```
Retained at `results/<major>/elaborated/`.

A substitute case that does produce indented elaboration lines (stored as `cases/elaborated2`, `results/<major>/elaborated2/`): assign a separately typed variable, not a fresh literal, so the checker walks the property path instead of pointing at the leaf directly.

`src/a.ts`:
```typescript
interface Shape {
  size: { width: number };
}
const obj: { size: { width: string } } = { size: { width: 'wide' } };
export const s: Shape = obj;
```
stdout (both majors, identical):
```
src/a.ts(5,14): error TS2322: Type '{ size: { width: string; }; }' is not assignable to type 'Shape'.
  The types of 'size.width' are incompatible between these types.
    Type 'string' is not assignable to type 'number'.
```
stderr: empty on both. Exit code: `2` on 6.0.3, `1` on 7.0.2. Each elaboration line is indented two spaces per nesting level and carries no `file(line,col):` prefix of its own, so a parser attaches every elaboration line to the single located diagnostic above it by indentation depth, never by a location it can parse from the line itself.

### `related`

Every location-bearing relatedInformation line this task set out to find is absent from this build's `--pretty false` text output. Tried, on 6.0.3, in addition to the brief's literal case (`take(shape: Shape)` called with `{ size: { width: 'wide' } }`, stored at `results/<major>/related/`, which itself elaborates to the leaf and shows no second location):

- excess property on a fresh literal argument (`TS2353`, `results/<major>/related15/`)
- missing required property (`TS2741`, `results/<major>/related10/`), including under plain `tsc --noEmit` with no `--pretty false`, to rule out a `--pretty false`-only suppression
- duplicate block-scoped declaration (`TS2451`), one interface conflict (`TS2320`)
- private-property collision between base and derived class (`TS2415`)
- incompatible method override between base and derived class (`TS2416`)
- overload signature incompatible with its implementation (`TS2394`)
- derived-class constructor missing a `super()` call (`TS2377`)

Every one of these prints exactly one primary diagnostic line, sometimes followed by indented, unlocated elaboration text, and never a second `file(line,col):`-prefixed line. This holds identically on 7.0.2. Measured conclusion: this compiler's plain-text `--noEmit --pretty false` renderer folds every cross-reference into the same indented elaboration channel as nested-type detail; it does not emit a distinct related-information line carrying its own position, across the fault classes tried. A parser can treat "indented lines under a diagnostic" as one elaboration channel and drop the planned separate related-information line kind, or must find a fault class outside the set tried here before adding one.

### `nonbmp`

`src/a.ts` (one line): `const 😀 = 1; export const n: number = 'x';`

stdout (both majors, identical):
```
src/a.ts(1,7): error TS1127: Invalid character.
src/a.ts(1,10): error TS1134: Variable declaration expected.
src/a.ts(1,12): error TS1134: Variable declaration expected.
```
**Column counting uses UTF-16 code units, not Unicode code points.** The emoji `😀` (U+1F600) is one code point but two UTF-16 units (a surrogate pair). Counting the source `const␣😀␣=␣1;` by UTF-16 unit: `c`=1 `o`=2 `n`=3 `s`=4 `t`=5 `␣`=6, the emoji occupies 7–8, `␣`=9, `=`=10, `␣`=11, `1`=12, `;`=13. The reported columns 7, 10, and 12 land exactly on the emoji's start, the `=` sign, and the digit `1` — the three tokens the diagnostics name. Counting by code point instead (emoji = one column) would place `=` at column 9 and `1` at column 11, which the actual output contradicts.

### `crlf`

`src/a.ts` (`\r\n` line endings): `const a = 1;\r\nconst b = 2;\r\nexport const n: number = 'x';\r\n`

stdout (both majors, identical):
```
src/a.ts(3,14): error TS2322: Type 'string' is not assignable to type 'number'.
```
The line and column match the `plain` case's column exactly, on line 3. `\r` is not counted as a column and does not shift the following line's column count.

### `twofiles`

`src/a.ts` and `src/b.ts` each carry the `plain` mismatch.

With cwd = the case folder (both majors, identical):
```
src/a.ts(1,14): error TS2322: Type 'string' is not assignable to type 'number'.
src/b.ts(1,14): error TS2322: Type 'string' is not assignable to type 'number'.
```
With cwd = `<scratch>` (both majors, identical):
```
cases/twofiles/src/a.ts(1,14): error TS2322: Type 'string' is not assignable to type 'number'.
cases/twofiles/src/b.ts(1,14): error TS2322: Type 'string' is not assignable to type 'number'.
```
**Ordering** is `a.ts` before `b.ts`, matching declaration/include order, on both majors. **Path form** is always relative to the invoking process's current working directory, never relative to the project file and never absolute, on both majors: the same case run from two different directories prints two different path prefixes for the same files.

### `noinputs`

`tsconfig.json`: `"files": []`, `"include": []`.

stdout, both majors, identical:
```
tsconfig.json(1,137): error TS18002: The 'files' list in config file '<absolute path to>/noinputs/tsconfig.json' is empty.
```
Exit code: `2` on both majors — the one config-fault case where 7.0.2 does not diverge to `1`. `--showConfig` on 6.0.3 reproduces the same diagnostic and exits `1`; on 7.0.2, `--showConfig` silently ignores the empty `files`/`include` arrays and prints the resolved config with exit `0` — see § Differences between the majors.

### `malformed`

`tsconfig.json`: `{ "compilerOptions": {` (truncated JSON).

stdout, both majors, identical:
```
tsconfig.json(1,23): error TS1005: '}' expected.
```
`--showConfig` on both majors recovers tolerantly and prints the same default config, exit `0` on both:
```
{
    "compilerOptions": {},
    "files": [
        "./src/a.ts"
    ]
}
```

### `unknownoption`

`tsconfig.json` compilerOptions carries `"bogus": true`.

stdout, both majors, identical:
```
tsconfig.json(1,128): error TS5023: Unknown compiler option 'bogus'.
```
`--showConfig` diverges: 6.0.3 reproduces the same `TS5023` diagnostic and exits `1`; 7.0.2 silently drops the unknown key and prints the resolved config with exit `0` — see § Differences between the majors.

### `missingextends`

`tsconfig.json`: `"extends": "./absent.json"`.

stdout, both majors, identical:
```
error TS5083: Cannot read file '<absolute path to>/missingextends/absent.json'.
```
`--showConfig` diverges: 6.0.3 reproduces the same `TS5083` and exits `1`; 7.0.2 silently proceeds as if `extends` were absent and prints the base config (`compilerOptions: { noEmit: true }`, no extended fields) with exit `0`.

### `missingproject`

`-p <scratch>/cases/absent/tsconfig.json` (no such path).

stdout, both majors, identical:
```
error TS5058: The specified path does not exist: '<absolute path>/cases/absent/tsconfig.json'.
```
Exit code `1` on both majors for `--noEmit`; `--showConfig` also fails the same way with exit `1` on both majors — the one config-fault case where `--showConfig`'s exit code does not diverge between majors.

### `mixed`

`unknownoption`'s config (`bogus: true`) plus `plain`'s source (`export const n: number = 'x'`).

stdout, both majors, identical:
```
src/a.ts(1,14): error TS2322: Type 'string' is not assignable to type 'number'.
tsconfig.json(1,128): error TS5023: Unknown compiler option 'bogus'.
```
**A config fault does not suppress the file diagnostic; both print, and the file diagnostic prints first**, on both majors. `--showConfig` diverges the same way as `unknownoption` alone: 6.0.3 exits `1` reproducing `TS5023`; 7.0.2 exits `0` with the resolved config, dropping `bogus`.

## Table: case × major → exit code, stream, first line's shape

| Case | 6.0.3 `--noEmit` exit | 7.0.2 `--noEmit` exit | Stream | First line's shape |
| --- | --- | --- | --- | --- |
| `plain` | 2 | 1 | stdout | `file(line,col): error TSnnnn: message.` |
| `elaborated` (literal, no elaboration) | 2 | 1 | stdout | `file(line,col): error TSnnnn: message.` |
| `elaborated2` (elaborates) | 2 | 1 | stdout | `file(line,col): error TSnnnn: message.` plus indented lines |
| `related` (no relatedInformation line found) | 2 | 1 | stdout | `file(line,col): error TSnnnn: message.` |
| `nonbmp` | 2 | 1 | stdout | `file(line,col): error TSnnnn: message.` repeated |
| `crlf` | 2 | 1 | stdout | `file(line,col): error TSnnnn: message.` |
| `twofiles` | 2 | 1 | stdout | `file(line,col): error TSnnnn: message.` repeated |
| `noinputs` | 2 | 2 | stdout | `file(line,col): error TS18002: message.` |
| `malformed` | 2 | 1 | stdout | `file(line,col): error TS1005: message.` |
| `unknownoption` | 2 | 1 | stdout | `file(line,col): error TS5023: message.` |
| `missingextends` | 2 | 1 | stdout | `error TS5083: message.` (no location prefix) |
| `missingproject` | 1 | 1 | stdout | `error TS5058: message.` (no location prefix) |
| `mixed` | 2 | 1 | stdout | `file(line,col): error TSnnnn: message.` (file error first) |

`--showConfig` exit codes:

| Case | 6.0.3 `--showConfig` exit | 7.0.2 `--showConfig` exit |
| --- | --- | --- |
| `plain`, `elaborated`, `elaborated2`, `related`, `nonbmp`, `crlf`, `twofiles` | 0 | 0 |
| `noinputs` | 1 | 0 |
| `malformed` | 0 | 0 |
| `unknownoption` | 1 | 0 |
| `missingextends` | 1 | 0 |
| `missingproject` | 1 | 1 |
| `mixed` | 1 | 0 |

## Answers to the named questions

- **`nonbmp` column counting**: UTF-16 code units. The reported columns 7, 10, and 12 match unit-counting (a surrogate pair counts as 2 columns) and do not match code-point counting (which would report 7, 9, 11) — see § `nonbmp`.
- **`crlf` line 3**: reported correctly as line 3 on both majors, column 14, matching the `plain` case's column on a single-line file. `\r` does not consume a column.
- **`twofiles` path form**: always relative to the process's current working directory at invocation, never to the project file's directory and never absolute. The same files print `src/a.ts` from one cwd and `cases/twofiles/src/a.ts` from another — see § `twofiles`.

## Differences between the majors

- **Exit code on any reported diagnostic**: 6.0.3 exits `2`; 7.0.2 exits `1`. Both majors exit `1` for a project-resolution fault that never reaches the checker (`missingproject`). `noinputs` is the sole diagnostic case where 7.0.2 also exits `2`, matching 6.0.3 — this happens before the checker starts, when there are no files to check.
- **`--showConfig` validates the effective config on 6.0.3 and reproduces the same config-level diagnostic (`TS5023`, `TS5083`, `TS18002`) with exit `1`. On 7.0.2, `--showConfig` skips that validation for `unknownoption`, `missingextends`, `noinputs`, and `mixed`: it drops the offending key or clause and prints the resolved config anyway, exit `0`.** `missingproject` (a path fault before config parsing starts) and `malformed` (a JSON-syntax fault) behave identically on both majors.
- Every diagnostic message text, every location, and every stdout/stderr split observed is byte-for-byte identical between 6.0.3 and 7.0.2 across every case. The only differences are the two exit-code behaviors listed here.
- 7.0.2's runnable artifact is architecturally different from 6.0.3's: it resolves a native platform-specific binary through an optional dependency (`@typescript/typescript-<platform>`) rather than running pure JavaScript. A harness that only does `npm pack typescript@7.0.2` and invokes `bin/tsc` without also packing and placing that platform package fails before any diagnostic is produced, with `Unable to resolve @typescript/typescript-linux-x64. Either your platform is unsupported, or you are missing the package on disk.` on stderr, a `Node.js v22.22.2` trailer, and a non-`tsc`-shaped stack trace on stdout — a shape a `tsc` output parser must recognize and reject rather than try to parse as diagnostics.

## Unknowns

- No fault class tried produces a location-bearing relatedInformation line in this build's `--pretty false` output; § `related` lists what was tried. A fault class outside that list might still produce one — this was not exhaustively enumerable inside the task's time budget — so a parser that must handle a genuine related-information block should keep watching for a second `file(line,col):`-prefixed line under a diagnostic, treating it as absent from the enumerated fault classes here rather than as proven impossible.
- Both majors were run only on Linux x86_64. Path-form and exit-code behavior on Windows, on macOS, or under a case-insensitive filesystem was not measured here.
- `7.0.2`'s label of `Version 7.0.2` is the only version string observed for the native/`tsgo`-based build; whether every `7.x` release keeps the same platform-package resolution mechanism and the same `--showConfig` validation-skip behavior was not measured.

## Retained instruments

- `<scratch>/make-cases.sh` — case generator, written before running.
- `<scratch>/run.sh` — command runner, written before running.
- `<scratch>/results/<major>/<case>/{out.txt,err.txt,exit.txt,cfg.txt,cfgerr.txt,cfgexit.txt}` for every case, both majors, plus the substitute `elaborated2`, `related10`, `related15` evidence cases.
- `<scratch>/package/` — unpacked `typescript@7.0.2` with its Linux x86_64 platform package placed at `package/node_modules/@typescript/typescript-linux-x64`.

Scratch folder: `/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/ts6/m3m4/` (no files under `/home/user/scaffold` or `/home/user/fleet` were created, edited, or deleted).
