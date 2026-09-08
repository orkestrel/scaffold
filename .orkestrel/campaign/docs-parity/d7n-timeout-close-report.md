# Report — `d7n-timeout-close`

Checkout: `/home/user/fleet/timeout`, tip `d221dba` at start, no commit made.

## Item 1 — the `Shape` idiom (Rulings 15, 18, 20)

Hunk (`guides/timeout.md`):

```diff
### Constants

-| API              | Kind  | Summary                                                                               |
-| ---------------- | ----- | ------------------------------------------------------------------------------------- |
-| `MAX_TIMEOUT_MS` | const | Names the largest timeout duration the package accepts, `2_147_483_647` milliseconds. |
+A `Shape` cell holds the constant's declared type.
+
+| API              | Kind  | Shape    | Summary                                                                               |
+| ---------------- | ----- | -------- | ------------------------------------------------------------------------------------- |
+| `MAX_TIMEOUT_MS` | const | `number` | Names the largest timeout duration the package accepts, `2_147_483_647` milliseconds. |

### Validators

-| API                 | Kind     | Summary ...
+In a guard table a `Shape` cell holds the type the guard narrows to.
+
+| API                 | Kind     | Shape         | Summary ...
+| `isTimeoutDuration` | function | `number`      | ...
+| `isTimeoutSignal`   | function | `AbortSignal` | ...

### Types

-A `Shape` cell holds an interface's members in braces.
+A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an optional member and `plus` introducing its call-signature members, and a type alias's own type literal with a union's arms escaped as `\|`.

-| `TimeoutInterface` | interface | `{ id, ms, signal, expired, start, clear }` | ...
+| `TimeoutInterface` | interface | `{ id, ms, signal, expired } plus start, clear` | ...

-`TimeoutInterface` lists every member it declares. The `id`, `ms`, `signal`,
-and `expired` its `Shape` cell lists are `readonly` members with no method row;
-`start` and `clear` are its call-signature methods, documented under
-[Methods](#methods). `expired` derives directly from the owned signal's
-`aborted` state rather than storing a duplicate lifecycle flag.
+The `id`, `ms`, `signal`, and `expired` members of `TimeoutInterface` are
+`readonly` data members (Shape cell, earlier) — its call-signature methods are
+documented under [Methods](#methods). `expired` derives directly from the
+owned signal's `aborted` state rather than storing a duplicate lifecycle flag.
```

The Constants and Validators tables gained the `Shape` column and their own convention
sentences (Ruling 18, Ruling 20). The Types table's sentence took Ruling 15's exact wording,
and both interface rows now read the members in braces with call-signature members after
`plus` (`TimeoutOptions` already carried no call signature, so only its own row's spacing
changed under `oxfmt`). The prose sentence naming `TimeoutInterface`'s members was rewritten
to point at the `Shape` cell instead of repeating a member list — no member is now listed
twice. Factories and Classes carry no interface or type rows, so neither table gained
`Shape`.

## Item 2 — member references

Sites: none. `npm run docs` read `rows read: 1, disagreements found: 0`, confirming no row
disagrees on a link-versus-bare-name reading.

## Item 3 — the drop-in's canon (Rulings 13 and 20)

Hunk (`tests/guides.test.ts`):

```diff
 // The consumer-side guides-parity drop-in: runs `@orkestrel/guide`'s checks against
-// this repo's own `guides/README.md` manifest, then executes this package's flagship
-// fences. The constants below, the `@src/core` import the executed cases use, and the
-// `flagship fences` block are this package's own, and are the parts a sibling package
-// changes.
+// this repo's own `guides/README.md` manifest. The constants that follow are this
+// package's own, as is the executed section that closes the file.

  * A class that one-class-per-file evicted from its single consumer cannot become a
  * local, so it stays exported without being public. Naming it here is what makes that
- * intentional rather than forgotten — and the second assertion below fails when a name
+ * intentional rather than forgotten — and the assertion that follows it fails when a name
  * here stops being stranded, so the list cannot rot.
```

The header now reads the pilot's three lines byte for byte, and the `INTERNAL` block carries
the pilot's sentence. `diff <(sed -n '47,258p' timeout/tests/guides.test.ts) <(sed -n '47,258p' abort/tests/guides.test.ts)`
(the `const root = …` line through the manifest loop's closing brace on both sides) prints
nothing: the drop-in's shared region is byte for byte the pilot's. The file's own executed
`describe('flagship fences')` section, past that region, stays package-specific and untouched.

## Item 4 — fence lead-ins (Ruling 21)

Hunk (`guides/timeout.md`):

```diff
 ### Race work against a deadline

+Builds a deadline handle, arms it, and clears it in a `finally` once the race resolves:
+
 ```ts
 import { createTimeout } from '@orkestrel/timeout'
```

```diff
 ### Reuse a handle across deadlines

+Clears an armed deadline before it fires, then arms the same handle again for a fresh window:
+
 ```ts
 import { createTimeout } from '@orkestrel/timeout'
```

Both fences that sat directly under a heading now have one sentence between the heading and
the fence; "Race work against a deadline" is the titled `@example` in `src/core/factories.ts`,
so its sentence states what the demonstration builds, matching Ruling 9's pinned pair. "Link
a parent signal" already carried a lead-in sentence and is unchanged.

## Item 5 — propagation

Commands and their last lines, in order:

```text
$ npx oxfmt --write guides/timeout.md tests/guides.test.ts
Finished in 524ms on 2 files using 4 threads.

$ npm run docs
rows read: 1, disagreements found: 0

$ npm run docs -- --to guide
rows read: 1, disagreements found: 0, written: 0, reported: 0

$ npm run docs -- --to source
rows read: 1, disagreements found: 0, written: 0, reported: 0
```

## Acceptance criteria

1. `git status --short` → `M guides/timeout.md`, `M tests/guides.test.ts` — owned files only.
2. `grep -n '| interface *| `{[^`]*:' guides/timeout.md` → no output (exit 1).
   `grep -n '…' guides/timeout.md` → no output (exit 1).
   Each `Shape`-carrying table's convention sentence sits between its heading and the table
   (Constants at line 60, Validators at line 68, Types at line 83).
3. `diff <(sed -n '47,258p' tests/guides.test.ts) <(sed -n '47,258p' /home/user/fleet/abort/tests/guides.test.ts)`
   → exit 0, empty. `diff <(sed -n '1,3p' tests/guides.test.ts) <(sed -n '1,3p' /home/user/fleet/abort/tests/guides.test.ts)`
   → exit 0, empty (line 2 equals the pilot's).
4. `npx oxfmt --check guides/timeout.md tests/guides.test.ts` →
   `All matched files use the correct format.` exit 0.
   `npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts` → no output, exit 0.
5. `npm run docs` → `rows read: 1, disagreements found: 0`, exit 0.
   `npm run docs -- --to guide` and `-- --to source` → each `written: 0`, exit 0.
6. `npm run test:guides` → `Test Files 1 passed (1)`, `Tests 29 passed (29)`, exit 0.
   `npm run test:policy` → `Test Files 1 passed (1)`, `Tests 90 passed | 1 skipped (91)`, exit 0.

Wall clock: the full item-5-through-6 command sequence ran within one minute (recorded
Unix timestamps 1788833206–1788833260).

No deviation.
