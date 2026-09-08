# Report — `d7n-ndjson-close`

Checkout: `/home/user/fleet/ndjson`, tip `7ce1e46`, no other files touched.

## Items

### 1. The `Shape` idiom (Rulings 15, 18, 20)

`guides/ndjson.md` § Types: the off-canon sentence "A `Shape` cell holds the interface's members in braces." became the fleet sentence "A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an optional member and `plus` introducing its call-signature members, and a type alias's own type literal with a union's arms escaped as `\|`." `NDJSONParserInterface` has no data members, so its cell became `{} plus parse, clear` (the `{} plus <method>` idiom `/home/user/fleet/contract/guides/contract.md:386` already carries for a no-data-member interface). The trailing sentence "Its `parse` and `clear` members are call-signature methods, documented under [Methods](#methods)." was deleted: it only restated the members the cell now holds, unlike the pilot's analogous sentence (`abort.md:69`, `budget.md:72`), which points a data member at its own earlier Surface row — a fact this interface has none of.

No other `## Surface` table, guard table, or constants table carries `Shape` in this guide (checked: `### Factories` and `### Classes` keep `API`/`Kind`/`Summary`).

### 2. Member references

Sites: none. `npm run docs` read `disagreements found: 0` before any edit in this unit, and no cell in this guide carries a bare `member` link needing `Owner#member` or `#member` correction.

### 3. The drop-in's canon (Rulings 13 and 20)

`tests/guides.test.ts` lines 1-3 took the pilot's header verbatim: "The consumer-side guides-parity drop-in: runs `@orkestrel/guide`'s checks against this repo's own `guides/README.md` manifest. The constants that follow are this package's own, as is the executed section that closes the file." The `INTERNAL` block already carried the pilot's sentence, and the region from `const root = new URL('../', import.meta.url)` through the manifest loop's closing brace (`tests/guides.test.ts:48-259` here, `abort/tests/guides.test.ts:47-258` in the pilot) diffs empty against the pilot byte for byte, confirmed after the edit.

### 4. Fence lead-ins (Ruling 21)

`guides/ndjson.md:62` (`#### Create a parser`) sat directly over its fence with no sentence. Added: "Creates a parser through the factory and feeds it two complete lines, then a line that completes only once its own newline arrives:" — naming what the demonstration builds.

### 5. Propagation

`npx oxfmt --write guides/ndjson.md tests/guides.test.ts` reformatted the `### Types` table's column widths to the widened `Shape` cell; no other file moved. `npm run docs`, `-- --to guide`, and `-- --to source` all ran clean afterward.

## Scoped validation

1. `git status --short` → `M guides/ndjson.md`, `M tests/guides.test.ts` (owned files only).
2. `grep -n '| interface *| `{[^`]*:' guides/ndjson.md` and `grep -n '…' guides/ndjson.md` → no output from either.
3. `diff <(sed -n '1,3p' abort/tests/guides.test.ts) <(sed -n '1,3p' ndjson/tests/guides.test.ts)` → no output; `diff <(sed -n '47,258p' abort/tests/guides.test.ts) <(sed -n '48,259p' ndjson/tests/guides.test.ts)` → no output. Only difference in the file outside that region and the header is the package-specific constants block and the appended Types-fence transcription plus the flagship-fences `describe` block after the manifest loop, both permitted by Ruling 20.
4. `npx oxfmt --check guides/ndjson.md tests/guides.test.ts` → exit 0, "All matched files use the correct format." `npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts` → exit 0, no output.
5. `npm run docs` → `rows read: 1, disagreements found: 0`, exit 0. `npm run docs -- --to guide` → `rows read: 1, disagreements found: 0, written: 0, reported: 0`, exit 0. `npm run docs -- --to source` → the same line, exit 0.
6. `npm run test:guides` → `Test Files 1 passed (1)`, `Tests 31 passed (31)`, `Duration 371ms`, exit 0 — the equality case ran under the default budget. `npm run test:policy` → `Test Files 1 passed (1)`, `Tests 90 passed | 1 skipped (91)`, `Duration 540ms`, exit 0.

No deviation. No stop condition in the brief's deviation contract was met.
