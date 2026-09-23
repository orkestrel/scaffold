# CLOSE-GUIDE (`cg`) audit — objective lane verdict (`reviewer` on Opus 5.5, substituted for `analyst` on Astra: Codex bench dark on quota)

**Lane:** objective lane (correctness, constraints, and what the code and the rules permit), held by `reviewer` on Opus 5.5 in place of the Astra analyst. The subject is `/home/user/veneer-cg` against `88684bc`, read from `cg.diff`, `cg-status.txt`, `close-guide-report.md`, and `close-guide-sweep.md`. I ran nothing. Every red or green run below rests on the writer's report alone. Where a claim says "the report records", I confirmed that the record exists. The run results themselves stay unresolved until the verifier's own gate run.

**Verdicts**

1. **CONFIRMED.**
   - `cg-status.txt:1-3` and the `diff --git` headers in `cg.diff` (lines 1, 1724, 1767) name only `guides/veneer.md`, `tests/guides.test.ts`, and `tests/src/styles/integration.test.ts`.
   - No `+|` or `-|` table line in `cg.diff` falls outside the stem table (`cg.diff:1659-1692`). No fence line changed. The Departures and Additions hunks (`cg.diff:1450-1489`, `1493-1515`) change only the introductory prose.
   - The guides case and its imports sit inside the `execute` callback (`tests/guides.test.ts:35-84`).
   - The integration file also changes its `afterEach` hook to `await releaseMedia()` (`cg.diff:1786-1790`). This is the teardown the case's `stageMedia` call needs. It must run even when the case fails, and it follows the sibling pattern in `tests/src/styles/reset.test.ts:8` and `tests/src/styles/components/button.test.ts:28`.
   - The report records the conformance and parity runs green (`close-guide-report.md:137-138`).
   - Attack that failed: I looked for a changed ledger cell, a changed fence, or an edited file outside the owned set, and found none.

2. **CONFIRMED.**
   - The order rule sentence and the proof link are at `guides/veneer.md:3997-4000`. `Showcase.test.ts:80-114` pins the region order that `app/browser/Showcase.ts:92-116` constructs, with one region per section after `Showcase`.
   - No "follow" or order wording remains: a grep for `follows? the (Table|Spinner|Close) region|region follows|alphabetical` returns nothing.
   - The retained facts are at `guides/veneer.md:4000-4011`, 4018-4020, 4029-4033, and 4035-4037.
   - The helper placements are true: icon links sit in `LINK_SPECIMENS` (`app/browser/constants.ts:485`), the ratio boxes in Media (`:440`), the vertical rule in Layout (`:578`), and the list and quote classes in Type (`:398-412`).
   - The "cascade carries" paragraph now points at § Compatibility (`guides/veneer.md:4022-4023`), and § Compatibility carries class rows per key (around `:3880`).
   - The dropped facts have homes: the Close specimens moved to § Close classes (`:1705-1706`), the badge's dark surface is at `:1667`, and the bare button is in the Files table (`:192`).

3. **CONFIRMED.**
   - The bound sentence and the palette sentence are at `guides/veneer.md:2208-2215`. The select and control border sentences are at `cg.diff:595-597` and `644-645`. The close shadow sentence is at `cg.diff:1145-1147` and matches `src/styles/components/_close.scss:19` and `:43`.
   - The case is at `tests/src/styles/integration.test.ts` (`cg.diff:1797-1865`). It reads the paints the brief names, under no sheet, under `CUSTOMIZATION_RECIPE`, and under a `--vn-palette-blue` retune.
   - It asserts that the recipe applied: `matchesColor(..., '#2e7d32')`.
   - It asserts `expect(retuned).toEqual(unretuned)`.
   - It asserts that every paint moves under the palette retune: `moved.filter(...)` returns `[]`.
   - The thumb is read from the resting rule's declared value on a probe element. That value is `var(--vn-palette-blue)`, a root token, per `src/styles/components/_form-range.scss:50-57`, so the probe resolves it.
   - Mutation: point one paint at `--vn-color-primary-base`. The report records the pagination plant, which sets `--bs-pagination-active-bg` to `var(--vn-color-primary-base)` (`close-guide-report.md:148-158`). The assertions distinguish it: `retuned[0]` becomes `rgb(46, 125, 50)` against `oklch(0.48 0.255 264)`.
   - A paint that reads nothing, or a focus that never lands, fails the palette-move assertion, so the no-change assertion cannot pass vacuously. A later family retuning a named paint through the primary token reddens the same equality.

4. **CONFIRMED.**
   - A grep for the brief's pattern over the worktree guide returns only `:155` (the § Styles home) and `:182` (the utility-escape line).
   - The § Styles home at `:154-158` matches `src/styles/index.scss:55-62`: label, control, select, check, range, floating, input group, then validation last.
   - The floating-label section keeps its consequence and points at § Styles (`cg.diff:856-859`), and so does the input-group section (`cg.diff:912-914`). The Form select sentence is gone (`cg.diff:605-615`).
   - Precision note, not a break: in `tests/conformance.test.ts:318`, `Bootstrap source order` is a `describe` block, and its single case at `:324` does the pinning. The guide calls it "the `Bootstrap source order` case".

5. **CONFIRMED.**
   - The stem rule paragraph is unchanged (context at `cg.diff:1640-1657`). The introduction and the registry link are at `guides/veneer.md:4074-4076`. The three example rows are at `:4078-4082`.
   - The case, at `tests/guides.test.ts:68-84`, reads `files[GUIDE_SPEC]`, where `GUIDE_SPEC` is `'guides/veneer.md'` (`:16`). It selects the table through `selectSectionBlocks` and `findColumnIndex`, which `@orkestrel/guide` exports. It reads cells through the existing `selectTableColumns` and `readTableCells` readers (`tests/setupStyles.ts:989` and `:1009`).
   - `@orkestrel/markdown` is a declared dependency (`package.json:99`).
   - Mutations: the report records the stem `capped-contaner` failing on `toContain` and the subject `Toggle` failing on `toBe` (`close-guide-report.md:164-172`). A rename of a registry scenario fails `expect(CAPTURE_SCENARIOS).toContain(stem)`.
   - A missing table fails `toHaveLength(1)`, and an empty table fails `toBeGreaterThan(0)`. The assertions distinguish every one of these mutations.

6. **CONFIRMED.**
   - The fragment is gone, and `guides/veneer.md:160-167` carries the `[hidden]` rule, the calendar-picker indicator rule, and the color swatch rules in one paragraph.

7. **CONFIRMED.**
   - I reran the verb pattern line by line over prose lines, including lines that start with a code span. It returned `:756`, 776, 1533, 1569, 1613, 1641, 1662, 1822, 1890, 1926, 1955, 1958, 1971, 1972, 2037, 2204, and 2263. Each one is a ledger row ruled permitted.
   - The comma-hit rerun on prose lines returned only rows the ledger rules permitted.
   - Every prose link follows `see` or continues a list that `see` opens (for example `:4041-4051`, `:4114-4145`, and `:4158-4161`).
   - Rows ruled fixed are fixed where I sampled them: `:4024-4025`, `:4066`, `:1215-1217`, and `:1976`.
   - Three record-keeping notes, none of which changes a guide ruling:
     - Rows 202, 532, and 534 use the label "permitted as a CSS declaration", which R7's set does not list. Each hit is a property and a value.
     - Row 265 is labelled "permitted as a table cell" for a prose hit that quotes a cell's written form.
     - The ledger's own link pattern admits `[the consumer pairing]` at `:320` and `[the preflight pairing]` at `:321`, and the ledger carries no row for either. Both are table cells, which sit outside the claim's population of prose links.

8. **BROKEN.** Two lines the delta wrote carry a code token with no noun after it. `.claude/rules/writing.md` § Code tokens requires the noun, and neither token fits any sense R7 permits.
   - `guides/veneer.md:835` (`cg.diff:440`, § Button group classes) reads "`_tokens.scss` already declares each of those". The sweep fixed the same token in § Helper classes and § Progress classes. It missed this one because the adverb sits between the token and the verb.
     - Why it matters: the whole-guide token-noun sweep is an exit criterion, and this line is authored text in the delta.
     - Right: "the `_tokens.scss` partial already declares each of those".
   - `guides/veneer.md:284` (`cg.diff:85`, § Files) reads "such as `li` under `ol` and `ul`". The unit rewrote this sentence and left the tag names bare. The guide itself writes "the `pre`, `samp`, and `var` tags" at `:1956`.
     - Right: "such as the `li` element under the `ol` and `ul` elements".
   - The rest of claim 8 holds:
     - A sweep of the added lines finds no count and no banned term.
     - Neither case uses `any`, `as`, a non-null `!`, a suppression, or a mock. Every nested function is a callback passed directly as an argument.
     - No installed export selects tables in a section: I checked `node_modules/@orkestrel/guide/dist/src/core/index.d.ts`.
     - The report records each gate's command and result line (`close-guide-report.md:131-141`) and the exact rule sentences it landed (`:175-221`).

**Findings outside the claims:** none meet the BROKEN standard.

VERDICT: FAIL 8; outside the claims: none
