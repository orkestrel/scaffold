VERDICT: FAIL 8; outside the claims: REPORT-COUNT

## Claim 1 — Delta and scope: CONFIRMED

- `upl-3-status.txt` lists the seventeen owned paths, identical to `upl-2-status.txt` (both files, lines 1-17: ` M app/browser/styles/_shell.scss` plus sixteen `??` untracked paths, byte-for-byte the same set).
- `upl-instruments-3/round-delta.diff` confines the round-2→round-3 delta to exactly the four sites the claim names: `app/browser/styles/_shell.scss` (the `.viewport`/`.scroller` comment, round-delta.diff:110-141), `tests/src/styles/utilities/position.test.ts` (`TRANSLATION_BOX` import at line 7 and substitution at lines 16, 25), `tests/src/styles/utilities/sizing.test.ts` (`SIZE_STEP_CASES`→`SIZING_STEP_CASES` rename and `PLACEMENT_CONTAINER` composition, lines 36, 44-48, 57), and `tests/app/browser/sections/SizingSection.test.ts` (the rename, lines 68, 77, 86, 95, 105-106).
- `upl-shared-3.patch` carries an `index` line per file (spot-checked around the `position` table move and the export-list edits) and its round-2→round-3 delta (`round-delta-shared.diff`) sits at the brief's named sites (the `#### position` table move, `TRANSLATION_BOX`, `SIZING_STEP_CASES`, "class stem"→"class prefix").
- `upl-unlisted-3.patch`'s stated SHA-256 (`d025920ecd5aa4f21e5fe9e7c047b8014d52dc1dc67703e60439dc215b429c90`) matches the same value in the claims file and the report; I could not independently run `sha256sum` to verify the byte-identity claim against `upl-unlisted-2.patch` — **UNRESOLVED** on that sub-clause; the command is `sha256sum /home/user/scaffold/.orkestrel/veneer/units/upl-unlisted-2.patch /home/user/scaffold/.orkestrel/veneer/units/upl-unlisted-3.patch`.
- `fresh-run-2.log.txt` lines 3-4 read `apply-check shared at base exit=0` and `apply-check unlisted at base exit=0`, matching the claim.
- A grep for `+++ b/(src/browser|src/core|package.json|README.md|ROADMAP.md)` in `upl-shared-3.patch` returned no matches, and the owned-file diff (`upl-3.diff`) touches only the seventeen listed paths — no vendored, sibling, or off-limits file is touched.

Mutation this proof must distinguish: a patch that added a line to `src/core/**` (for example). The status/diff file-list check and the `+++ b/` grep both fail (report a match) on that mutation and pass (no match) on the actual round-3 artifacts, so the check does distinguish it.

## Claim 4 — The fixtures (F-FIXTURE): CONFIRMED

- `upl-shared-3.patch:1613` — `export const TRANSLATION_BOX = 'width: 100px; height: 40px'`, with the TSDoc at line 1612: `/** Carries the inline box the translation proofs read their offsets from. */`, frozen only in the sense of a primitive string literal (matches the claim's "the frozen string").
- `upl-3.diff:1006, 1084, 1096-1097` (position.test.ts) and `upl-instruments-3/round-delta.diff:7,16,25` show the translation case and the later-value case reading `${TRANSLATION_BOX}` in place of the inline `style="width: 100px; height: 40px"`, at every occurrence; a grep of `upl-3.diff` for the literal inline string inside `position.test.ts` after the substitution found no remaining occurrence in that file.
- `round-delta.diff:57` (sizing.test.ts) shows the composed `` `${PLACEMENT_CONTAINER}; display: flex; align-items: flex-start` `` in place of the restated `'width: 400px; height: 200px; display: flex; align-items: flex-start'` literal, exactly as the claim states.
- `upl-shared-3.patch:1406` places `'TRANSLATION_BOX'` in the export-list case between `'THEME_DARK_ADDITIONS'` (line 1405) and `'TYPE_DISPLAY_CASES'` (line 1407).

Mutation this proof must distinguish: `sizing.test.ts` still restating `'width: 400px; height: 200px; …'` instead of composing `PLACEMENT_CONTAINER`. The diff evidence at `round-delta.diff:57` shows the literal replaced by the composed template string, so the mutation (reverting to the restated literal) is visibly absent from the landed patch.

## Claim 5 — Rows, names, order, shell comment, ledger position: CONFIRMED

- `upl-shared-3.patch:632-633` (the `table` heading's ledger rows): `"reading the `--vn-stack-fixed` token"` and `"reading the `--vn-stack-sticky` token"`, and line 630: `"The official `.translate-middle`, `.translate-middle-x`, and `.translate-middle-y` selectors ship"` — matches the claim verbatim.
- `SIZING_STEP_CASES` replaces `SIZE_STEP_CASES` at every site: the constant and TSDoc (`upl-shared-3.patch:1634`, comment at line 1628-1633), the export list (line 1392), the consumers (`round-delta.diff:36,44-48,68,77,86,95,105-106`); a grep for `SIZE_STEP_CASES` (without the `ING`) across `upl-3.diff` and `upl-shared-3.patch` returned no hits.
- `OFFSET_STEP_CASES`'s doc at `upl-shared-3.patch:1668` opens `"Lists the position offset steps in the release's map order."`.
- "class stem" is absent from `upl-shared-3.patch` and `upl-3.diff` (a grep across the units directory found it only in report/brief/round-2 prose, never in the round-3 patch); "class prefix" appears at `upl-shared-3.patch:1641,1689` and in `round-delta-shared.diff:237`.
- `upl-shared-3.patch:1328-1332` places `PLACEMENT_CONTAINER`, `POSITION_ENTRY_CASES`, `POSITION_VALUES` in the import list after `PLACEHOLDER_SIZE_CASES` and before `PROGRESS_MARKUP`; the export literal at lines 1380-1385 places `PLACEMENT_BOX`, `PLACEMENT_CONTAINER`, `POSITION_ENTRY_CASES`, `POSITION_VALUES` in the same span, code-point ordered.
- `app/browser/styles/_shell.scss` (`upl-3.diff:17-19`) states: "The bounded height also gives a percentage height or offset a definite height to resolve against, so the `Edge offsets`, `Centered translation`, `Stacking levels`, and `Height steps` specimens use the frame for that reason."
- The ledger position: `upl-shared-3.patch:566-575` shows `#### offset` ending at line 567, `#### position` inserted at line 569 with its `.position-sticky` row, and `#### reboot` beginning at line 575 — the `position` table sits directly between them, as the claim states.

Mutation this proof must distinguish: the `#### position` heading landing between `placeholder` and `icon-link` instead (its round-2 position). The diff hunk context at `upl-shared-3.patch:565-575` shows the addition site is inside the `offset`→`reboot` hunk, not a `placeholder`/`icon-link` hunk, so the location is directly readable rather than inferred.

## Claim 8 — Law and report: BROKEN

- Forbidden syntax: a scan of `upl-3.diff` and `upl-shared-3.patch` for `any`, `as <Type>` assertions, `!` non-null assertions, `@ts-*` suppressions, and `eslint-disable` found no such addition (the only near-hits — `unknown[]`, "as normal helpers" in prose — are not violations).
- Banned terms: a scan of `b-utilities-upl-report-3.md` against the `.claude/rules/writing.md` substitution table found no hit.
- `both` usages (lines 46, 81, 120, 205, 254) each tally a fixed, already-named pair (the before/after readings, the two test cases, the two edit sites, the two patches), consistent with the writing rule's exception for `both`.
- **Count of a growable set, not corrected:** `b-utilities-upl-report-3.md:13` states "the three owned files were re-applied directly in the worktree" and line 178 restates "the three owned files' round-3 edits." `AGENTS.md` § Writing lists `files` explicitly among the sets this rule bans counting. The brief's own item 9 required exactly this fix pattern ("`tests/setupBrowser.test.ts` sits outside the Shared row" instead of "one file"), and § What this round could not close (line 253) applies that pattern correctly — but § Deviation state does not: it never names the three files by name at line 13/178 (it named them once, earlier, at lines 8-10, inside a different clause), so the count stands uncorrected at its own site.
- Everything else the claim asserts (no duplicated `@orkestrel/test`/`@orkestrel/contract` export — the only new exports are the `PositionSection`/`SizingSection`/`VisibilitySection` classes, which are entity classes, not helpers; the report records each gate's command and result line, the failing-first history, the section proofs' execution population, and the frame-and-caps statement; `round-delta-shared.diff` is regenerated against the final patch) is CONFIRMED by the same evidence cited under claims 1, 4, and 5 and the gate table at `b-utilities-upl-report-3.md:184-209`.

Mutation this proof must distinguish: the report stating "the SIZE_STEP_CASES rename, the sizing.test.ts container composition, and the TRANSLATION_BOX substitution" (naming the members) instead of "the three owned files." The text at line 13 does not do this — it is the count form, not the named form — so the mutation that would make a correct proof fail (reverting the named form to a count) is already the state found, not a hypothetical.

## Findings outside the claims (BROKEN standard)

- **REPORT-COUNT**: `b-utilities-upl-report-3.md:13,178` states "the three owned files" as a count of a growable set (files), unnamed at that site, violating `AGENTS.md` § Writing's ban and contradicting claim 8's own assertion that the report "follows the writing rule (no count of a growable set …)." Not carried by any brief item; the brief's item 9 fix pattern was applied at the report's closing section (line 253) but not at its opening deviation-state paragraph.

## Counts the report states, listed

- Gate table (`b-utilities-upl-report-3.md:184-202`): `format:check` exit 0; `lint:check` exit 0; `check` exit 0; `build:src` exit 0; style proofs `42 passed (42)`; setup tables `110 passed (110)`; section proofs `18 passed (18)`; `test:conformance` `22 passed (22)`; `test:service` `18 passed (18)`; `test:guides` `19 passed (19)`; `test:policy` `109 passed | 1 skipped (110)`; `test:setup` `251 passed (251)`; `test:setup:browser` `66 passed (66)`.
- Mutation controls (`b-utilities-upl-report-3.md:33-71`): `max-width-cap-dropped` `3 failed | 10 passed (13)`; `control-sections-3` `13 passed (13)`; `edges-emptied` `1 failed | 109 passed (110)`; `viewport-cases-emptied` `1 failed | 109 passed (110)`; `scroller-offset-zero` `1 failed | 109 passed (110)`; `control-setup-styles-3` `110 passed (110)`.
- `caps-reading.sh` readings (line 40-41): at 390, `[[195,195],[192,192]] [390,390,896,896] 390`; at 1280, `[[640,640],[192,192]] [1280,1280,896,896] 1280`.
- The disputed count: "the three owned files" (lines 13, 178) — see REPORT-COUNT.
- SHA-256 values (lines 235-237): `upl-shared-3.patch` `7b83afc0afee344deba3dad4009b53027867845a8bf8e161a6bb6c3401883c04`; `upl-unlisted-3.patch` `d025920ecd5aa4f21e5fe9e7c047b8014d52dc1dc67703e60439dc215b429c90` (this second value also appears in the claims file and is UNRESOLVED for byte-identity verification per claim 1, above).

VERDICT: FAIL 8; outside the claims: REPORT-COUNT
