# Report — `d7n-sea-converge-fix` (sea's fix round on the audit's findings)

Checkout `/home/user/fleet/sea`, baseline `2b94a78` (clean at start). Every acceptance criterion
closed. No deviation. Owned files only in `git status --short`.

Diffstat:

```text
 guides/sea.md         | 16 ++++++++++++----
 src/server/helpers.ts | 12 ++++++------
 src/server/types.ts   | 14 +++++++++-----
 tests/guides.test.ts  |  4 +---
 4 files changed, 28 insertions(+), 18 deletions(-)
```

## Item 1 — all-caps emphasis (S1)

Every named site is inside an `@remarks` block, so no description paragraph moved and no
`--to guide` write was owed. Three further emphasis hits inside owned doc blocks that the audit's
list did not name — `helpers.ts:573` `FIRST`, `:830` `CONTAINING`, `:924` `OMITTED` — were found by
this item's own closing sweep and lowered with the rest.

`src/server/types.ts`:

```diff
  * `sign`      — Authenticode signing options. When present, the assembled
- * executable is signed with `signtool` (and verified) as the LAST content
+ * executable is signed with `signtool` (and verified) as the last content
  * mutation before the atomic finalize; when absent, the output is unsigned
@@
- * These options apply only when the build HOST is Windows — there is no
+ * These options apply only when the build host is Windows — there is no
  * cross-compilation, so building on a non-Windows host ignores `windows.*`.
@@
  * `file`       — path to a `.pfx`/`.p12` certificate file (`signtool /f`).
- * `password`   — certificate password (`signtool /p`). SENSITIVE — never
+ * `password`   — certificate password (`signtool /p`). Sensitive: never
  * logged and never included in a thrown error's message or `context`.
@@
- * Exactly ONE of `file` or `thumbprint` must be supplied — they identify two
+ * Exactly one of `file` or `thumbprint` must be supplied — they identify two
  * different certificate sources and are mutually exclusive. `password`
```

`SENSITIVE — never` took a colon rather than a lowercased word plus its em dash, because the line
already carries the member's own em dash (`` `password`   — certificate password ``) and a second one
on the same line reads as a second member. Ancillary decision, recorded.

`src/server/helpers.ts`:

```diff
  * very end of the file (the common case for `signtool`-signed binaries), the
- * file is truncated to the certificate's start FIRST so the overlay bytes are
+ * file is truncated to the certificate's start first so the overlay bytes are
@@
  * @remarks
- * Requires EXACTLY ONE certificate source — `sign.file` (a `.pfx`/`.p12`
+ * Requires exactly one certificate source — `sign.file` (a `.pfx`/`.p12`
@@
  * through a shell — so nothing in `sign` can be interpreted as a flag or
- * injected into a command line. `sign.password` is NEVER included in a
+ * injected into a command line. `sign.password` is never included in a
@@
  * equal the real base or begin with the real base plus a path separator.
- * Dereferencing BOTH sides means a symlinked base itself (for example macOS `/tmp`
+ * Dereferencing both sides means a symlinked base itself (for example macOS `/tmp`
@@
  * @remarks
- * A `rename`/`create` is only durable once its CONTAINING directory entry is
+ * A `rename`/`create` is only durable once its containing directory entry is
@@
  * field (`'commonjs' | 'module'`) exists only in Node >= 25.7 — for a `'cjs'`
- * entry (the default) `mainFormat` is OMITTED entirely so the config still
+ * entry (the default) `mainFormat` is omitted entirely so the config still
```

`both` stays in the `ensureContained` block: the preceding sentence names the members it tallies
(the resolved path and `base`), which is the case `AGENTS.md` § Writing keeps.

### The closing sweep

Pattern: `\b[A-Z]{3,}\b`. Paths: `guides/sea.md src/server/*.ts src/server/**/*.ts` (the glob reaches
`constants.ts`, `errors.ts`, `factories.ts`, `helpers.ts`, `index.ts`, `types.ts`, `validators.ts`,
`assets/Asset.ts`, `assets/AssetManager.ts`, `injectors/Injector.ts`, `seas/SEA.ts`).

```text
$ grep -nE '\b[A-Z]{3,}\b' guides/sea.md src/server/*.ts src/server/**/*.ts | wc -l
342
$ grep -ohE '\b[A-Z]{3,}\b' guides/sea.md src/server/*.ts src/server/**/*.ts | sort -u
ABORT AFTER API ASSET BEFORE BLOB BROWSER CLI COFF DOS DWORD EACCES EINVAL EISDIR ELF ENOENT
ENOTSUP ENTRY EOF EPERM ESM FORMAT FULL FUSE GUI IMAGE INJECT JSON MUST NEW NUL OLD ORIGINAL
OUTPUT PHT PLATFORM README ROOM RVA SAME SEA SHELL SIGN STATE TIMEOUT TRUE URL UTF WASM WORD XOR
```

Permitted hits, ruled by the sense each carries:

- `SEAErrorCode` members, quoted as themselves in prose and in `@throws` clauses: `ABORT`, `ASSET`,
  `BLOB`, `BROWSER`, `ENTRY`, `FORMAT`, `FUSE`, `INJECT`, `OUTPUT`, `PLATFORM`, `ROOM`, `SHELL`,
  `SIGN`, `STATE`, `TIMEOUT`.
- Binary-format and platform vocabulary: `COFF`, `DOS`, `DWORD`, `ELF`, `EOF`, `ESM`, `GUI`,
  `IMAGE`, `NUL`, `PHT`, `RVA`, `SEA`, `UTF`, `WASM`, `WORD`, `XOR` (`XOR` in the
  `buildSignCommand` block names the exclusive-or relation between `sign.file` and
  `sign.thumbprint`, which is the operator's own name).
- Node error codes: `EACCES`, `EINVAL`, `EISDIR`, `ENOENT`, `ENOTSUP`, `EPERM`.
- Abbreviations this audience reads daily and a filename: `API`, `CLI`, `JSON`, `URL`, `README`.

Hits that are emphasis and remain, with their reason:

```text
src/server/injectors/Injector.ts:123   TRUE
src/server/injectors/Injector.ts:440   AFTER
src/server/injectors/Injector.ts:1043  MUST
src/server/injectors/Injector.ts:1142  SAME
src/server/injectors/Injector.ts:1347  BEFORE
src/server/injectors/Injector.ts:1350  FULL
src/server/injectors/Injector.ts:1388  ORIGINAL
src/server/injectors/Injector.ts:1420  OLD
src/server/injectors/Injector.ts:1474  NEW
src/server/injectors/Injector.ts:1479  OLD
src/server/seas/SEA.ts:381             SAME
```

Each sits in a `//` line comment inside a method body, not in a doc block, so each falls outside
this unit's owned scope ("the doc blocks under `src/server/**`"). They are named here for the next
carrier rather than edited. `grep -nE ':[0-9]+:[[:space:]]*//'` over those hits matches all of them,
which is the reading behind the classification.

## Item 2 — `execute`'s failure clause (S2, Ruling 21)

```diff
 	readonly status: SEAStatus
-	/** Runs the compress, blob, and assemble stages and returns the build result. */
+	/**
+	 * Runs the compress, blob, and assemble stages and returns the build result.
+	 *
+	 * @throws SEAError with the `SEAErrorCode` of the stage that failed, after `status` becomes `'error'`
+	 */
 	execute(): Promise<SEAResult>
```

The description paragraph is byte-identical to what it was, so the `SEAInterface.execute` cell is
unchanged and `npm run docs` still reads zero. The clause is true of the implementation: every
`throw` on the `SEA.execute` path in `src/server/seas/SEA.ts:93-148` carries a `SEAErrorCode`
(`'STATE'` on a destroyed or already-active build, `'PLATFORM'` on an unsupported host, whatever the
stage helpers raise inside the `try`), and each of the `catch` and the `PLATFORM` branch sets
`#status = 'error'` before rethrowing. The wording follows the house form the package's other
`@throws` clauses use (`@throws SEAError with code `'SIGN'` when …`), generalized to the code set
because the stage decides the code.

## Item 3 — fence lead-ins (S3, Ruling 21)

Four fences sat directly under a heading. Each gained one complete sentence, in the pilot's
imperative-plus-colon form at `/home/user/fleet/abort/guides/abort.md:19`. The sentences are the
ancillary decision this unit was told to take:

```diff
 ### Build a single executable
 
+Describe the build to `createSEA` — its entry script, output directory, assets, and compression — then `await sea.execute()` for the finished executable and its size:
+
 ```ts
@@
 ### Injecting a resource directly
 
+Construct an injector over an already-assembled executable, read the format it detected, and call `inject` to write the blob into it:
+
 ```ts
@@
 ### Assets
 
+Create an asset from a buffer, register it with a manager configured to load more from disk, then read the collection back and tear it down:
+
 ```ts
@@
 ### Boundary and formatting helpers
 
+Every helper the build pipeline runs on is exported too, from the shell boundary and the path assertions to the fixed-width binary readers, the PE patches, and the size formatter:
+
 ```ts
```

The titled fence's sentence names what the demonstration builds, per the brief. The inserted
paragraph does not disturb the titled pair: `@orkestrel/guide` reads "a fence's nearest preceding
heading as its `title`" (`node_modules/@orkestrel/guide/dist/src/core/index.js:2188`), and
`test:guides` confirms the pair still resolves.

## Item 4 — the Methods preamble (S4)

```diff
-The public methods of each behavioral interface — one table per type, keyed by its backticked name, every call-signature member listed. A `readonly` data member, `format` on `Injector` and `emitter` / `status` / `count` on the others, stays in the interface's `Shape` cell and off these tables. Each concrete class implements its interface exactly, so this doubles as the class's instance-method surface.
+The public methods of each behavioral interface — one table per type, keyed by its backticked name, every call-signature member listed. A `readonly` data member stays in the interface's `Shape` cell and off these tables: `format` on `InjectorInterface`, `emitter` and `status` on `SEAInterface`, `emitter` and `count` on `AssetManagerInterface`. Each concrete class implements its interface exactly, so this doubles as the class's instance-method surface.
```

Each interface's declared data members, read from `src/server/types.ts`:
`InjectorInterface:260-265` declares `readonly format`; `SEAInterface:546-559` declares
`readonly emitter` and `readonly status`; `AssetManagerInterface:324-343` declares `readonly emitter`
and `readonly count`. The named members match those declarations.

The paragraph's opening clause stays as written. It is a fragment, but it is the fleet's form for
this preamble — `abort/guides/abort.md:71` and `browser/guides/browser.md:922` carry the same shape —
so rewriting it here would have made sea the outlier. Ancillary decision, recorded.

## Item 5 — the H1 (S5)

```diff
-# SEA — Single Executable Application Builder
+# SEA
```

The tagline blockquote is untouched and keeps the expansion ("The Node.js single executable
application (SEA) builder: …"). No reader of the H1 text exists outside the guide:

```text
$ git grep -n 'Single Executable Application Builder' 2b94a78 -- '*.ts' '*.md' '*.json'
2b94a78:guides/sea.md:1:# SEA — Single Executable Application Builder

$ grep -rn 'Single Executable Application Builder' --include='*.ts' --include='*.md' --include='*.json' . \
    --exclude-dir=node_modules --exclude-dir=.git --exclude-dir=dist --exclude-dir=tmp
(no output; exit 1)
```

The baseline reading over the whole checkout found the H1 line and nothing else, so the edit left no
stale reader behind.

`guides/README.md`'s manifest row reads `Sea` in its `concept` column, which is what the drop-in
reads, and it is unchanged. No deviation was owed.

## Item 6 — the extended interface's cell (S6, Ruling 21)

`grep -n 'extends' src/server/types.ts` returns one declaration,
`src/server/types.ts:86 export interface SEACompressionOptions extends SEABrotliOptions`, so one row
takes the form:

```diff
-A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an optional member and `plus` introducing its call-signature members, and a type alias's own type literal with a union's arms escaped as `\|`.
+A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an optional member and `plus` introducing its call-signature members, and a type alias's own type literal with a union's arms escaped as `\|`. An extended interface's name comes before `plus`, with the members it adds after.
@@
-| `SEACompressionOptions`  | interface | `{ paths, mode?, quality? }`      | Controls Brotli compression of one or more directories. |
+| `SEACompressionOptions`  | interface | `SEABrotliOptions plus { paths }` | Controls Brotli compression of one or more directories. |
```

The added sentence is `/home/user/fleet/browser/guides/browser.md:221`'s wording verbatim, and the
cell is the form its `BrowserWaitOptions` row carries at `:240`. `SEACompressionOptions` declares
only `readonly paths`, so `{ paths }` is what it adds.

## Item 7 — the drop-in's header and `INTERNAL` sentence (S7, Rulings 13 and 21)

```diff
 // The consumer-side guides-parity drop-in: runs `@orkestrel/guide`'s checks against
 // this repo's own `guides/README.md` manifest. The constants that follow are this
-// package's own, and are the only part a sibling package changes. The `sea.md fences`
-// block at the end transcribes the flagship fences of `guides/sea.md` and asserts the
-// values their comments claim, which name resolution alone cannot prove.
+// package's own, as is the executed section that closes the file.
```

The `INTERNAL` block already carried the pilot's sentence and needed no edit:

```text
$ diff <(sed -n '50,58p' tests/guides.test.ts) <(sed -n '34,42p' /home/user/fleet/abort/tests/guides.test.ts)
(no output)
```

The region from `const root = ` through the manifest loop's closing brace was not touched.

## Item 8 — propagation

```text
$ npx oxfmt --write guides/sea.md tests/guides.test.ts src/server/types.ts src/server/helpers.ts
Finished in 432ms on 4 files using 4 threads.
FMT WRITE EXIT 0

$ npm run docs
rows read: 1, disagreements found: 0
DOCS EXIT 0

$ npm run docs -- --to guide
rows read: 1, disagreements found: 0, written: 0, reported: 0

$ npm run docs -- --to source
rows read: 1, disagreements found: 0, written: 0, reported: 0
```

## Acceptance criteria

### Criterion 1 — owned files only

```text
$ git status --short
 M guides/sea.md
 M src/server/helpers.ts
 M src/server/types.ts
 M tests/guides.test.ts
```

`package.json`, `package-lock.json`, `README.md`, `guides/README.md`, `tests/src/**`,
`tests/setup*.ts`, and every vendored file are untouched. No code token moved in `src`:

```text
$ git diff -U0 src | grep -E '^[+-]' | grep -vE '^[+-]{3}' | grep -vE '^[+-]\s*(\*|//|/\*\*)'
(no output; exit 1)
```

### Criterion 2 — format, lint, typecheck

```text
$ npx oxfmt --check guides/sea.md tests/guides.test.ts src/server/types.ts src/server/helpers.ts
All matched files use the correct format.
Finished in 544ms on 4 files using 4 threads.
FMT EXIT 0

$ npx oxlint --config .oxlintrc.json --deny-warnings src/server tests/guides.test.ts
LINT EXIT 0

$ npm run check
> @orkestrel/sea@0.0.15 check:src:server
> tsc --noEmit -p configs/src/tsconfig.server.json
CHECK EXIT 0
```

### Criterion 3 — `npm run docs` at zero, both directions at `written: 0`

Recorded under Item 8.

### Criterion 4 — the mechanical readings

```text
$ grep -nE '\b(LAST|HOST|SENSITIVE|ONE|EXACTLY|NEVER|BOTH)\b' src/server/types.ts src/server/helpers.ts
(no output; exit 1)

$ grep -c '@throws SEAError' src/server/types.ts
1

$ awk '/^#/{h=NR; blank=0; next} /^[[:space:]]*$/{if(h)blank=1; next} /^```/{ if(h && blank) print h" -> "NR; h=0; next } {h=0}' guides/sea.md
(no output)

$ sed -n 1p guides/sea.md
# SEA

$ grep -c 'SEABrotliOptions plus { paths }' guides/sea.md
1

$ diff <(sed -n 1,3p /home/user/fleet/abort/tests/guides.test.ts) <(sed -n 1,3p tests/guides.test.ts)
(no output; exit 0)

$ grep -c 'stops being stranded' tests/guides.test.ts
1
```

### Criterion 5 — the suites

```text
$ PATH=/opt/npm11/bin:$PATH npm run test:guides
 Test Files  1 passed (1)
      Tests  37 passed (37)
   Duration  1.02s
GUIDES EXIT 0

$ npm run test:policy
 Test Files  1 passed (1)
      Tests  90 passed | 1 skipped (91)
   Duration  682ms
POLICY EXIT 0
```

Observation, taken inside this unit's own exec under sibling load:

```text
$ npm run test:src:server
 Test Files  7 passed (7)
      Tests  190 passed (190)
   Duration  1.47s
SRC EXIT 0
```

No timing red to carry.

## Observation outside this unit's items

`src/server/helpers.ts:830` reads "A `rename`/`create` is only durable once its containing directory
entry is flushed". That `once` is temporal, which `.claude/rules/writing.md` § Substitutions replaces
with `after`. The line was edited here only to lower `CONTAINING`, and the substitution belongs to
whichever unit owns the voice sweep over `src/server` doc blocks. Recorded, not changed.

## Wall clock

First command 2026-09-07T21:40:01Z, last command 2026-09-07T21:43:37Z: about 4 minutes.

## Deviation state

None. `npm install` and `npm ci` were not run. No `git checkout`, `git restore`, `git stash`,
`git reset`, or `git clean` was run. Nothing was committed. Instruments are under
`/home/user/fleet/sea/tmp/d7n-sea-converge-fix/` (`start.txt`, `allcaps.txt`), which
`.gitignore:11` ignores.
