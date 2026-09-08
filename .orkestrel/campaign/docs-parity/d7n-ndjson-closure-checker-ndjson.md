Lane held: checker ndjson

## Claim 1 — scope honesty (items landed, nothing else changed)

PASS. `d7n-ndjson-close.status.txt` lists exactly two paths: `guides/ndjson.md`, `tests/guides.test.ts` — both files the brief grants (`/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-ndjson-close.status.txt:1-2`). The diff (`d7n-ndjson-close.diff.txt`) touches only those two files and only the hunks the brief's items name (the `Shape` sentence/table at `guides/ndjson.md:39-46`, the `#### Create a parser` lead-in at `guides/ndjson.md:64-65`, and the header/lines 1-3 of `tests/guides.test.ts`). No `src/**` doc block or comment was touched, consistent with the diff showing no `src/` hunk.

## Claim 2 — report citations match the tree; no count in prose

PASS. Checked each citation against the live files: `guides/ndjson.md:62` is `#### Create a parser` (confirmed by direct read); the drop-in region cited as `tests/guides.test.ts:48-259` (ndjson) against `abort/tests/guides.test.ts:47-258` (pilot) both terminate on the manifest-loop's closing `}` (verified by reading both files in full — ndjson line 259 is `}`, abort line 258 is `}`). The report's only numerals are exit codes and vitest's own quoted summary lines (`Tests 31 passed (31)`, `Duration 371ms`, `Tests 90 passed | 1 skipped (91)`, `Duration 540ms`) — each a measurement quoted with the run that produced it, permitted under `AGENTS.md` § Writing.

## Claim 3 — the `Shape` idiom

PASS. `guides/ndjson.md:40-42` carries the exact canonical sentence from Ruling 15. The lone `## Surface`-family table with type/interface rows is `### Types` (`guides/ndjson.md:44-46`); its row reads `` `{} plus parse, clear}` `` — matching Ruling 27's "no data member" form, and matches `src/core/types.ts:6-29`, where `NDJSONParserInterface` declares only the call-signature members `parse` and `clear` and no data member. No guard table or constants table exists in this guide (`### Factories` and `### Classes` keep `API`/`Kind`/`Summary`, confirmed by direct read), so no second convention sentence is owed. No cell holds `…` or a spelled-out member type.

## Claim 4 — the drop-in's canon

PASS. `tests/guides.test.ts:1-3` in ndjson equals `abort/tests/guides.test.ts:1-3` byte for byte (both carry the Ruling 21 header text, confirmed by side-by-side read). The region from `const root = ` (ndjson:48, abort:47) through the manifest loop's closing brace (ndjson:259, abort:258) is structurally identical: same `readInventory`/`parseManifest`/`createSourceManager` calls, the `INTERNAL` block carrying the Ruling 13 sentence verbatim ("...the assertion that follows it fails when a name here stops being stranded"), the equality case (`keeps every compared summary and example equal to its source`) sitting directly after the methods loop and before the examples case in both files, and the examples case named `documents an example for every Surface function` in both. The package-specific `feed` transcription helper and the `flagship fences` describe block sit after the shared region's closing brace in ndjson, matching Ruling 20's allowance for a package's own appended cases.

## Claim 5 — fence lead-ins, sibling fences, retired terms, README fences

FAIL. `guides/ndjson.md:44-48`: the `### Types` table ends at line 46, line 47 is blank, and the `` ```ts `` fence begins at line 48 with no sentence between the table and the fence. `AGENTS.md` § Writing requires "introduce every list, table, and code fence with a complete sentence naming what follows," and Ruling 21 requires "every code fence in a guide is introduced by a complete sentence between its heading and the fence." This fence sits after a table, not directly under the `### Types` heading, so it fell outside the brief's own enumerated site list (item 4 named only fences directly under a heading and found the single site at line 63), but the claim's wider wording ("between every heading or table and its fence") reaches it, and it currently has no lead-in.

The remaining parts of claim 5 pass: no heading carries a retired term (`# NDJSON`, `## Surface`, `### Types`, `### Factories`, `#### Create a parser`, `### Classes`, `## Methods`, `` #### `NDJSONParserInterface` ``, `## Tests`, `## See also` — none use `entities` or another retired term); no sibling untitled fence sits under the `#### Create a parser` heading needing its own heading; and both README fences (`README.md:13` install, `README.md:28` usage) sit directly under their headings, per Ruling 24.

## Re-dispatchable instruction for the not-met item

Add one sentence between `guides/ndjson.md:46` (the `### Types` table's last row) and `guides/ndjson.md:48` (the `` ```ts `` fence) naming what the fence demonstrates, in the guide's established voice (compare the added `#### Create a parser` lead-in at `guides/ndjson.md:64-65`).

## Referrals

None — this is a mechanical fence-lead-in gap, not a judgment call.

VERDICT: FAIL 5
