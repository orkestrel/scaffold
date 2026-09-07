# Report — `d7n-msg-converge-fix`

Both items landed in `/home/user/fleet/msg`; every acceptance criterion is green. One brief expectation did not hold and is recorded as an observation, not a stop: `npm run docs` reported no disagreement in the intermediate state (heading added, `@example` not yet retitled), because `findDrift` skips a guide fence title the source does not carry (`node_modules/@orkestrel/guide/dist/src/core/index.js:2289-2290`, `if (example === void 0) continue`). The pin case in `tests/guides.test.ts` is what reddens on the broken pair, and it is quoted as the failing-first proof.

## Item — the titled example's heading (Ruling 9)

`### Factories` stays. The heading one level deeper sits directly above the demonstrating fence, worded as what the fence shows: it calls `createMSG` on bytes, guards the `Result` with `isSuccess`, and reads `chain.format`.

`guides/msg.md`:

```diff
@@ -363,6 +363,8 @@ From [`factories.ts`](../src/core/factories.ts).
 | `createMSG` | function | `(input: MSGInput, options?: MSGOptions) => Result<MSGInterface, MSGError>` | Creates an `MSGInterface` for raw `.eml` or `.msg` input …
 
+#### Parse an email file and read its format
+
 ```ts
 import { createMSG, isSuccess } from '@orkestrel/msg'
```

`src/core/factories.ts`:

```diff
@@ -21,7 +21,7 @@ import { isMSGError } from './errors.js'
  * @returns A `Result` carrying a working {@link MSGInterface} on success,
  * or the {@link MSGError} on failure
  *
- * @example Factories
+ * @example Parse an email file and read its format
  * ```ts
  * import { createMSG, isSuccess } from '@orkestrel/msg'
```

`guides/msg.md` § Tests named the retired title, so the same sentence now names the live one:

```diff
-… the titled `Factories` fence against the `@example` block of that title …
+… the titled `Parse an email file and read its format` fence against the `@example` block of that title …
```

Heading-scoped uniqueness, read against the final tree:

```
$ grep -n '^#\+ Parse an email file and read its format' guides/msg.md
366:#### Parse an email file and read its format
$ grep -n '@example' src/core/factories.ts
24: * @example Parse an email file and read its format
```

Failing-first reading, taken with the heading added and the title still `Factories`:

```
$ npm run test:guides
- []
+ [
+   "guides/msg.md pairs: guide [\"Surface\",\"Errors\",\"Helpers\",\"Shapers\",\"Parsers\",\"Validators\",\"MSG\",\"Parse an email file and read its format\",\"MSGSourceInterface\"] source [\"Factories\"]",
+ ]
 ❯ tests/guides.test.ts:138:19
 Test Files  1 failed (1)
      Tests  1 failed | 35 passed (36)
```

The same command in that state, which the brief expected to report the pair:

```
$ npm run docs
rows read: 1, disagreements found: 0
```

After the retitle:

```
$ npm run docs
rows read: 1, disagreements found: 0
$ npm run docs -- --to source
rows read: 1, disagreements found: 0, written: 0, reported: 0
```

## Item — the `Shape` idiom (objective F4)

The row is written as bare members in braces, the form `guides/msg.md:38-42` states and `sse`'s `SSEParserInterface` row uses (`/home/user/fleet/sse/guides/sse.md:42`). `MSGSourceInterface`'s call signatures and return types stay documented under `## Methods` (`guides/msg.md:388`).

```diff
@@ -57,7 +57,7 @@
-| `MSGSourceInterface`  | interface | `{ parse(): MSGFieldData, attachment(index): MSGAttachment }` | Represents the parsed MSG source `extractMessageFromMSG` reads from: the field tree plus indexed attachment access. |
+| `MSGSourceInterface`  | interface | `{ parse, attachment }`                                       | Represents the parsed MSG source `extractMessageFromMSG` reads from: the field tree plus indexed attachment access. |
```

The row was split on a pipe not preceded by a backslash and each cell compared against the baseline. Every cell other than `Shape` is byte-identical:

```
BEFORE cells: ['', '`MSGSourceInterface`', 'interface', '`{ parse(): MSGFieldData, attachment(index): MSGAttachment }`', 'Represents the parsed MSG source `extractMessageFromMSG` reads from: the field tree plus indexed attachment access.', '']
AFTER cells:  ['', '`MSGSourceInterface`', 'interface', '`{ parse, attachment }`', 'Represents the parsed MSG source `extractMessageFromMSG` reads from: the field tree plus indexed attachment access.', '']
```

`npx oxfmt --config .oxfmtrc.json --write guides/msg.md` re-padded that row only; the table's column widths did not move.

## Criteria

1. Formatting, lint, typecheck.

```
$ npx oxfmt --config .oxfmtrc.json --check guides/msg.md src/core/factories.ts
All matched files use the correct format.
Finished in 1014ms on 2 files using 4 threads.
EXIT=0

$ npx oxlint --config .oxlintrc.json --deny-warnings guides/msg.md src/core/factories.ts
EXIT=0

$ npm run check
> tsc --noEmit -p configs/src/tsconfig.core.json
EXIT=0
```

2. Parity and suites.

```
$ npm run docs
rows read: 1, disagreements found: 0
EXIT=0

$ npm run docs -- --to guide
rows read: 1, disagreements found: 0, written: 0, reported: 0
EXIT=0

$ npm run docs -- --to source
rows read: 1, disagreements found: 0, written: 0, reported: 0
EXIT=0

$ npm run test:guides
 Test Files  1 passed (1)
      Tests  36 passed (36)
EXIT=0

$ npm run test:policy
 Test Files  1 passed (1)
      Tests  90 passed | 1 skipped (91)
EXIT=0
```

3. Owned files only.

```
$ git status --short
 M guides/msg.md
 M src/core/factories.ts
```

## Touched files

- `/home/user/fleet/msg/guides/msg.md` — the descriptive heading over the demonstrating fence, the § Tests sentence naming that title, and the `MSGSourceInterface` `Shape` cell as bare members.
- `/home/user/fleet/msg/src/core/factories.ts` — the `@example` title line on `createMSG`.

```
$ git diff --stat
 guides/msg.md         | 6 ++++--
 src/core/factories.ts | 2 +-
 2 files changed, 5 insertions(+), 3 deletions(-)
```

## Shared-file patches

None. Both edits are inside the owned pair.

## Deviation state

No stop. The retitled pair converges under `--to source` at `written: 0`, and no correction needed a file outside the owned pair. The brief's intermediate `docs` expectation is recorded as an observation in the opening paragraph, with the guide reader line that explains it.
