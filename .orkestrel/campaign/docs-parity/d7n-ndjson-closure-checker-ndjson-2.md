Lane held: checker ndjson

## Claim 1 — scope honesty (items landed as the brief states, nothing else changed)

PASS. `d7n-ndjson-close-2.status.txt:1` lists exactly one path, `guides/ndjson.md`. `d7n-ndjson-close-2.diff.txt:1-15` shows one hunk inserting two lines between the `### Types` table's last row (`guides/ndjson.md:46`) and the `` ```ts `` fence (line 51): "Types a helper's parameter as `NDJSONParserInterface` and returns the records its `parse` call completes:". This is exactly and only item 1 of `d7n-ndjson-close-2-brief.md:13` (the Ruling 21 fence lead-in the first checker found missing). `tests/guides.test.ts` carries no diff, consistent with the report's own claim (`d7n-ndjson-close-2-report.md:21`) and with the status file naming only `guides/ndjson.md`.

## Claim 2 — report citations match the tree; no count in prose

PASS. The diff hunk quoted in the report (`d7n-ndjson-close-2-report.md:6-19`) matches the live file byte for byte at `/home/user/fleet/ndjson/guides/ndjson.md:44-51`. The report's numerals are exit codes and quoted tool output (`rows read: 1, disagreements found: 0`; `Tests 31 passed (31)`; `Duration 425ms`) — each a measurement reported with the run that produced it, permitted under `AGENTS.md` § Writing's exception for a "measurement reported with the run that produced it." No count answering "how many" over a growable set appears in prose.

## Claim 3 — the first checker's finding is closed in the tree

PASS on the finding actually raised, with one item outside the closing unit's scope noted below.

- No `Shape` cell is empty: the sole table carrying `Shape` (`### Types`, `guides/ndjson.md:44-46`) has one row, `` `{} plus parse, clear}` `` (rendered `` `{} plus parse, clear` `` — no `}` typo in the file itself), matching Ruling 27's no-data-member form.
- Ruling 26 (function/guard row `Shape`) and Ruling 28 (class row `Shape`) are inert here: `### Factories` (`guides/ndjson.md:59-63`) and `### Classes` (`guides/ndjson.md:79-83`) carry no `Shape` column, so no function, guard, or class row is subject to either ruling in this guide.
- Ruling 25 (shape value cell) and Ruling 19 (event-map alias) are inert: the guide has no `### Shapers`/`### Shapes` table and no object-literal type alias.
- Fence lead-ins: the fence at `guides/ndjson.md:29` (under `## Surface`, lead-in at lines 25-27), the fence at line 70 (under `#### Create a parser`, lead-in at lines 67-68), and the newly landed fence at line 51 (lead-in at lines 48-49, the closed finding) each sit under a complete sentence naming what they demonstrate.
- Sibling fence headings (Ruling 22): no untitled sibling fence sits under `#### Create a parser`; confirmed by direct read — one fence, one heading.
- README fences (Ruling 24): `README.md:11-15` (`## Install` immediately followed by the `` ```sh `` fence) and `README.md:26-28` (`## Usage` immediately followed by the `` ```ts `` fence) both sit directly under their headings.
- Drop-in canon (Rulings 13, 20, 21): `tests/guides.test.ts:1-3` in ndjson is byte-identical to `/home/user/fleet/abort/tests/guides.test.ts:1-3`. The region from `const root = new URL('../', import.meta.url)` (ndjson:48, abort:47) through the manifest loop's closing brace (ndjson:259, abort:258) is structurally identical outside package-specific constants and imports (`GUIDE_SPEC`, `MODULES`, the barrel import), matching Ruling 20's stated exception. ndjson's own cases (the `feed` helper at lines 267-272 and `describe('flagship fences', ...)` at lines 280-354) sit after that closing brace, matching Ruling 20's "appended after the pilot's cases."

## Finding outside the claims

The fence at `guides/ndjson.md:100` (under `` #### `NDJSONParserInterface` ``) is preceded by a caveat paragraph (`guides/ndjson.md:97-98`, "`parse` holds an unterminated line indefinitely...") rather than a sentence naming what the fence demonstrates, which `AGENTS.md` § Writing ("introduce every... code fence with a complete sentence naming what follows") and Ruling 21 appear to require. This predates `d7n-ndjson-close-2`: it is unchanged by the diff, and the first checker's verdict (`d7n-ndjson-closure-checker-ndjson.md:23`) did not raise it — the awk sweep both units ran only catches a heading directly followed by a blank line then a fence, and this fence has intervening non-blank content that sweep does not flag. Whether a caveat paragraph satisfies "naming what follows" is a reading the checker lane should not settle alone.

## Referrals

Whether the pre-existing lead-in at `guides/ndjson.md:97-100` satisfies Ruling 21 / `AGENTS.md` § Writing, or is a defect the mechanical sweep (used fleet-wide as the operational test) does not catch — referred to the Orchestrator, since it falls outside this closing unit's brief and outside the first checker's raised finding.

VERDICT: PASS
