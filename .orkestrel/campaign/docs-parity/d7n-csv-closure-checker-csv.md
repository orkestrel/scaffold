Lane held: checker csv

## Claim 1 — Scope honesty

PASS. `d7n-csv-close.status.txt` lists exactly three modified files: `guides/csv.md`, `src/core/constants.ts`, `tests/guides.test.ts` (`/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-csv-close.status.txt:1-3`). All three sit inside the brief's owned scope: `guides/csv.md` and `tests/guides.test.ts` directly, and `src/core/constants.ts` under the brief's grant of "doc blocks under `src/**` only where item 1 needs a constant's literal named (Ruling 18)" (`/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-csv-close-brief.md:73`). The `constants.ts` diff touches only `/** ... */` doc comments, never code (`/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-csv-close.diff.txt:170-248`). Nothing else changed.

## Claim 2 — Report citations and no count in prose

FAIL. The report states counts in prose, in violation of `AGENTS.md` § Writing ("NEVER state a count") and the brief's own output instruction ("No count in prose: name the members or recast the sentence"):

- `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-csv-close-report.md:128`: "`grep -n '…' guides/csv.md` → **four matches**, each in a `Summary` cell or in body prose (`POSITIONAL_COLUMN_PREFIX`, `SUFFIX_SEPARATOR`, `uniqueColumns`, and the "Total parsing" section)". This is a paraphrase of grep's output (not the raw quoted output the criterion asks for), and it states the count "four" alongside naming the members — the rule bans stating the number even when members are also named.
- `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-csv-close-report.md:97`: "— **the ten headings** the brief listed". This states a count of a growable set (guide headings).

The citations otherwise match the tree: I independently confirmed exactly four `…` occurrences at `/home/user/fleet/csv/guides/csv.md:99,101,123,277`, none in a `Shape` cell, and confirmed the ten listed headings each carry the added lead-in sentence. The factual content is accurate; the prose form is not.

## Claim 3 — The `Shape` idiom

PASS. Verified against `/home/user/fleet/csv/guides/csv.md`:

- `### Types` (lines 38-73): convention sentence sits directly above the table (lines 44-46); every interface row uses bare-name braces with `?` on optionals; `CSVInterface` correctly uses `{ table, rows, errors } plus find, filter, map, reduce, stream, toJSON, export` (line 73); no extended interfaces exist in `/home/user/fleet/csv/src/core/types.ts` so Ruling 21's parent-`plus` clause has no site to apply.
- `### Constants` (lines 86-107): header is `Shape`, sentence "A `Shape` cell holds the constant's declared type." sits above the table (line 91), every cell holds a declared/widened type (`string`, `number`, `RegExp`, `Required<Omit<...>>`, `ReadonlySet<string>`) and never a literal; each Ruling 18 literal (`'\uFEFF'`, `'column'`, `"'"`, `'_'`, `'true'`, `'false'`, `100`) moved into the matching description in `/home/user/fleet/csv/src/core/constants.ts:6,68-70,75-77,82-84,109,112,116-117`.
- `### Validators` (lines 187-197): header is `Shape`, guard sentence present (line 192), cells hold `CSVTable` / `ColumnType` (the narrowed type), not `Guard<...>`.
- No `Shape` cell holds `…` (confirmed via grep, all four `…` hits sit in `Summary` cells or body prose) or a member's type.

Referral (outside this claim's literal wording): `### Shapers` (lines 174-185) still heads its column `Signature`, not `Shape`, and mixes two function rows with one `const` row (`csvTableShape`). Ruling 25 binds "a table whose rows are `const` values," which this table is not (it is mixed), so claim 3's third bullet does not reach it as written. Ruling 25's own text names "`### Shapers`" as an example needing the conversion in another package (`brief`), and Ruling 26 (function rows in a `Shape` table) lists packages queued for a fix round that does not include `csv`. Whether `csv`'s `Shapers` table needs a successor unit under Ruling 26 is a judgment call outside a checker's mandate — referred to the Orchestrator rather than ruled here.

## Claim 4 — The drop-in's canon

PASS. `/home/user/fleet/csv/tests/guides.test.ts:1-3` equals `/home/user/fleet/abort/tests/guides.test.ts:1-3` byte for byte (verbatim three-line header). The region from `const root = ` (csv line 61, pilot line 47) through the manifest loop's closing brace (csv line 272, pilot line 250) matches the pilot's structure and text exactly: same `new URL('../', import.meta.url)` root construction, same `/Interface$/` regex with no flag, same comments, same `INTERNAL` sentence ("the assertion that follows it fails when a name here stops being stranded" — csv line 49, pilot line 39), and the "opens the README with the guide tagline" case reverted to the pilot's single-line literal form (`files['README.md']`, `'Missing file: README.md'` — csv line 116, pilot line 102), matching the report's applied hunk. The package's own additions (extra imports, `ROOT_FILES`/`GUIDE_SPEC`/`PACKAGE_README` constants, the `flagship fences` describe block) sit outside this canon region, in the constants block and the trailing executed section, per Ruling 20's allowance.

## Claim 5 — Fence lead-ins, sibling fences, retired terms, README fences

PASS. All ten headings the brief listed under `## Patterns` carry a lead-in sentence directly before their fence (`/home/user/fleet/csv/guides/csv.md:349,363,380,392,409,423,437,449,464,477`). No sibling fence sits under a shared heading with no heading of its own. No guide or README heading carries a retired term (no "entities" or similar). `/home/user/fleet/csv/README.md`'s `## Install` fence (line 15) and `## Usage` fence (line 26) both sit directly under their headings with no intervening sentence, matching Ruling 24; the README's other fences (`## Collecting parse errors...`, `## Exporting a schema...`) are outside Ruling 24's scope and carry their own lead-ins already.

## Findings outside the claims

- The `### Shapers` table's `Signature`/`Shape` status (see claim 3 referral) is worth a successor brief decision but is not a defect under this closing unit's stated claims.

VERDICT: FAIL 2
