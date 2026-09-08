Lane held: checker msg

**Claim 1 — Scope honesty (every brief item landed as stated, nothing else changed): PASS**
`git status --short` (`.orkestrel/campaign/docs-parity/d7n-msg-close.status.txt`) lists exactly `guides/msg.md`, `src/core/constants.ts`, `tests/guides.test.ts` — the brief's owned set (`guides/msg.md`, `tests/guides.test.ts`, and `src/**` doc blocks only where item 1 needs a constant's literal named). The `d7n-msg-close.diff.txt` hunks in `src/core/constants.ts` touch only `/**...*/` doc-block text (literal parentheticals added), no code. `MSGSourceInterface`'s cell reads `{} plus parse, attachment` and `MSGInterface`'s reads `{ options, chain, fields } plus attachment, burn` (`/home/user/fleet/msg/guides/msg.md:61,71`), matching the only two interfaces in `/home/user/fleet/msg/src/core/types.ts` that carry call-signature members (`MSGSourceInterface` at line 295, `MSGInterface` at line 440); every other row the brief flagged as "no plus" has no call-signature members in the declaration, so no `plus` is correctly absent. `MSGMutableFieldData`'s cell keeps `[key: string]` (line 55), consistent with the corrected predecessor hunk. `MSGFieldData`'s cell (line 59) enumerates every member of the declaration (`src/core/types.ts:161-271`) in declaration order with `?` correctly placed.

**Claim 2 — Report citations and no count in prose: FAIL**
The report states multiple counts in prose, in direct violation of the brief's own Output instruction ("No count in prose: name the members or recast the sentence") and `AGENTS.md` § Writing ("NEVER state a count. ... rules, rows, members, exports, files, options, steps, cases, stages, findings, and tests are such sets"):
- "The predecessor left **four** hunks across..." (`d7n-msg-close-report.md:3`)
- "**Two** hunks in `src/core/constants.ts` ... were correct and kept" (`d7n-msg-close-report.md:12`)
- "(**33** doc blocks in `src/core/constants.ts`: ... the **four** `MSG_CATEGORY_*` bytes, the **four** `MSG_PREFIX_*` strings, the **two** `MSG_FIELD_*` tag strings, the **three** `MSG_MAPI_RECIPIENT_*` values...)" (`d7n-msg-close-report.md:18`)

Each names a count over a set of doc blocks/constants that can grow, exactly the class the rule bans. The report should have named the members or recast the sentences instead. Wall-clock and test-count-with-run-output lines (`d7n-msg-close-report.md:42-45`) are permitted (duration, and a measurement quoted with the run that produced it), so this finding is confined to the four counts listed.

**Claim 3 — The `Shape` idiom: PASS**
The convention sentence at `guides/msg.md:40-43` is Ruling 15's exact wording (verified against `rulings.md:62`), with the permitted `MSGInterface` sentence appended after it. The constants sentence at `guides/msg.md:77` ("A `Shape` cell holds the constant's declared type.") and the guard sentence at `guides/msg.md:304` ("In a guard table a `Shape` cell holds the type the guard narrows to.") match Rulings 18/20 exactly. Every constants `Shape` cell holds the declared/widened type (`number`, `string`, `readonly number[]`, `readonly string[]`), verified against the actual declarations in `/home/user/fleet/msg/src/core/constants.ts` (for example `EML_EXTENSIONS: readonly string[]`, `MSG_FILE_HEADER: readonly number[]`), never a literal. `grep -n '…' guides/msg.md` returns no matches. No extended interfaces exist in `types.ts`, matching the brief's "(none)" finding.

**Claim 4 — The drop-in's canon: PASS**
`/home/user/fleet/msg/tests/guides.test.ts:1-3` is byte-for-byte identical to `/home/user/fleet/abort/tests/guides.test.ts:1-3`. The region `const root = ` (pilot line 47, msg line 87) through the manifest loop's closing brace (pilot line 258, msg line 298) is byte-for-byte identical between the two files, read and compared directly. The `INTERNAL` doc block at `tests/guides.test.ts:79` reads "the assertion that follows it fails" (Ruling 13's amendment), not the struck "second assertion below" wording. The package's own `describe('flagship fences')` section (`tests/guides.test.ts:307` on) sits appended after the shared region, as required.

**Claim 5 — Fence lead-ins, sibling fences, retired terms, README fences: PASS**
A lead-in sentence was added at `guides/msg.md:373` ("Narrows the `createMSG` `Result` with `isSuccess`...") between the `#### Parse an email file and read its format` heading and its fence — the only heading-directly-above-fence site the brief's own search found (line 366→368 in the pre-edit numbering). No other fence in the guide sits directly under a heading with no sentence between (each remaining fence follows a table). No heading in `guides/msg.md` carries a retired term (a targeted search for "entity"/"entities" in headings returns none). `/home/user/fleet/msg/README.md`'s `## Install` (line 12) and `## Usage` (line 24) fences sit directly under their headings.

Findings outside the numbered claims: none beyond the count violations already charged to claim 2.

Referrals: none — every claim resolves on direct file evidence, no judgment call required.

Re-dispatchable instruction for the not-met item: strike the four count phrases in `d7n-msg-close-report.md` (lines 3, 12, and the two instances on line 18) and replace each with the named members or a recast sentence carrying no number, per `AGENTS.md` § Writing and the brief's own Output contract.

VERDICT: FAIL 2
