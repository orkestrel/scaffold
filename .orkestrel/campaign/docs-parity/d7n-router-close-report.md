# Report — `d7n-router-close`

## Item 1 — the `Shape` idiom (Rulings 15, 18, 20, 21)

Hunk (Constants table, `guides/router.md:59-69`): replaced the compound sentence with the
constants sentence alone ("A `Shape` cell holds the constant's declared type.") per Ruling 20's
naming of router's interface-plus-constants sentence as the outlier. Also widened `TIER_LITERAL`,
`TIER_PARAM`, and `TIER_WILDCARD`'s `Shape` cells from their inferred numeric literal types (`2`,
`1`, `0`) to `number`, per Ruling 21's "No unit narrows a cell to a literal type"; each constant's
literal stays in its description paragraph. `METHOD_LIST`'s `Shape` cell keeps its `as const`
tuple type unchanged: that literal-string tuple is the constant's own deliberately declared type
(the single source `Method`, `METHODS`, and `parseMethod` derive from), not an incidental literal
narrowing, and the facts section did not name it.

Hunk (Guards table, `guides/router.md:99-104`): added the guard sentence ("In a guard table a
`Shape` cell holds the type the guard narrows to.") and a `Shape` column holding `{ encrypted }` —
`isEncryptedSocket`'s narrowed type is the inline object literal `{ readonly encrypted: true }`
(`src/server/validators.ts:26`), rendered in Ruling 19's bare-member-name form.

Interface rows without `plus` (`RouterMatch`, `RouterOptions`, `RouteContext`, `RouteInput`,
`RouteRecord`, `DispatcherOptions`, `NavigatorOptions`, `RequestOptions`): read each declaration
in `src/core/types.ts`, `src/browser/types.ts`, and `src/server/types.ts`. Every member on each is
a data member (including the function-valued `key?`, `unmatched?`, `guard?` properties, which are
readonly properties of function type rather than call-signature members). None carries a
call-signature member, so no `plus` applies and no row changed.

Interface rows spelling a member's type, tables without `Shape` carrying interface/type rows, and
extended interfaces: each population is empty, matching the brief's facts.

## Item 2 — member references

Sites: none. No edit.

## Item 3 — the drop-in's canon (Rulings 13 and 20)

Hunk (`tests/guides.test.ts:1-6`): replaced the outlier header clause "and are the only part a
sibling package changes. Every flagship fence in `guides/router.md` that this project can execute
is transcribed at the end of the file and asserted against what its comments claim: name
resolution is not a behavioural proof, so a fence documenting a value the code contradicts is
exactly what the transcriptions catch. Change a fence, change its transcription." with the
pilot's canon line "as is the executed section that closes the file." per Ruling 21's header text
and its "extra sentence naming its fences block" strike. Kept the following paragraph ("This
project runs in Node with the browser disabled...") because it names a genuine package-specific
fact — the browser/server fence coverage split into other test files — rather than restating what
the canon's third line already covers; this is an ancillary decision, recorded here.

The region from `const root = ` (line 63) through the manifest loop's closing brace (line 274)
diffs empty against the pilot's same region (`abort/tests/guides.test.ts:47-258`); the header's
lines 1-3 diff empty against the pilot's lines 1-3. No package-specific case existed to preserve
beyond this region — router's flagship-fence section already sat entirely after the manifest
loop's closing brace, unaffected by this item.

## Item 4 — fence lead-ins (Ruling 21)

Hunks (`guides/router.md`): added one sentence between each of the six headings and their directly
following fence:
- `### Method-dimensioned dispatch (auto-HEAD, auto-OPTIONS, 405)` → "Registering a single `GET`
  route yields an auto-derived `HEAD`, an auto-derived `OPTIONS`, and a `405` for every other
  method on that path:"
- `### Observing dispatch outcomes` → "The `on` hooks report every dispatch outcome, matched or
  missed, alongside the return value of `handle`:"
- `### Hash-mode navigation` → "A `Navigator` in hash mode dispatches on `location.hash` and
  updates `active` after each `hashchange`:"
- `### History mode with link interception` → "History mode binds `popstate` and, with
  `intercept` set, same-origin `<a>` clicks:"
- `### Basic server` → "`createListener` adapts a core `Dispatcher` into a `node:http` request
  listener:"
- `### Observing client disconnect` → "The `Request` returned by `buildRequest` carries a `signal`
  that aborts when the connection closes before the response completes:"

## Item 5 — propagation

Ran `npx oxfmt --write guides/router.md tests/guides.test.ts` before the remaining edits'
verification; `npm run docs` and both write directions confirmed below.

## Acceptance criteria

1. `git status --short` → `M guides/router.md` and `M tests/guides.test.ts` only.
2. `grep -n '| interface *| `{[^`]*:' guides/router.md` and `grep -n '…' guides/router.md` both
   print nothing (exit 1, no match). Every `Shape`-carrying table (`### Constants` at line 63,
   `### Guards` at line 103, `### Types` at line 128) has its canonical sentence directly above it.
3. The item 3 region diff against the pilot (`diff /tmp/abort_region2.txt /tmp/router_region2.txt`
   over `const root = ` through the manifest loop's closing brace) prints nothing; the header
   diff over lines 1-3 prints nothing.
4. `npx oxfmt --check guides/router.md tests/guides.test.ts`:
   ```
   Checking formatting...
   All matched files use the correct format.
   Finished in 563ms on 2 files using 4 threads.
   ```
   `npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts`: empty output, exit 0.
5. `npm run docs`:
   ```
   rows read: 1, disagreements found: 0
   ```
   `npm run docs -- --to guide`:
   ```
   rows read: 1, disagreements found: 0, written: 0, reported: 0
   ```
   `npm run docs -- --to source`:
   ```
   rows read: 1, disagreements found: 0, written: 0, reported: 0
   ```
6. `npm run test:guides`:
   ```
   Test Files  1 passed (1)
        Tests  48 passed (48)
     Duration  952ms (transform 211ms, setup 38ms, import 488ms, tests 199ms, environment 0ms)
   ```
   (the equality case is included in the 48 and passed under the default budget.)
   `npm run test:policy`:
   ```
   Test Files  1 passed (1)
        Tests  90 passed | 1 skipped (91)
     Duration  648ms (transform 245ms, setup 49ms, import 228ms, tests 237ms, environment 0ms)
   ```

Wall clock for the unit's own command sequence (oxfmt write, docs, docs --to guide, docs --to
source, git status, greps, oxfmt check, oxlint, test:guides, test:policy): approximately 20
seconds of command real time, read individually above.

---

Orchestrator's annotation (2026-09-08, closure): the checker ruled claim 2 FAIL on this report's prose alone (a count stated about a growable set); every citation was verified against the tree, and the tree is authoritative.
