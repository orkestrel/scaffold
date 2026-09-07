# Checker verdict — D3-fix (docs-d3-fix-check-brief.md)

## 1. E1 — rule id rename

PASS. `no-imperative-summary` matches zero times in tracked source (`grep -rn "no-imperative-summary" --include=*.ts --include=*.json --include=*.md .` under the brief's exclusion pattern returns nothing outside `.orkestrel/`). `no-malformed-summary` confirmed live at `.oxlintrc.json:61`, `configs/policy.ts:1391`, `tests/setupPolicy.ts:162`, `tests/config.test.ts:1338` and `:1890` (report cites `:1891`, off by one line but the content is present and correct), `guides/scaffold.md:1014`, `.claude/rules/typescript.md:80`, `PROPOSAL.md:986`. `VOICE_RULE` name unchanged (`configs/policy.ts:1335`, `:1391`); message ids `voice` (`configs/policy.ts:812`, `:1343`) and `name` (`:819`, `:1345`) unchanged.

## 2. E2 — vendored policy cases

PASS. Accounting case body at `tests/policy.test.ts:379-395` matches the brief's quoted body exactly, including the two `throw` narrowings. Population case at `:408-417` reads `guides/README.md` (`:412`) and `POLICY_CATALOG_FILE` (`:413`) in place of `guides/scaffold.md`/`POLICY_TERM_FILE`. Currency case at `:430-441` is `it.skipIf(!isPolicyFile(process.cwd(), POLICY_TERM_FILE))(...)` with the quoted comment at `:426-429` verbatim. Import list at `:17` (`isPolicyFile`), `:23` (`POLICY_CATALOG_FILE`), `:33` (`readPolicyGuide`), `:34` (`readPolicyPackage`) — order matches the list's existing alphabetical order.

## 3. E3 and E11 — tag-boundary case and stop-set labels

PASS. `rejects a description read past its first block tag` no longer exists in `tests/config.test.ts` (grep: no match). The valid case sits at `tests/config.test.ts:1388-1400`, directly after `accepts a word from the stop set after the opener` (`:1383`), with the amended description line ` * Creates a control` (no period) at `:1392`. `rejects an opener from the stop set [membership: opening words ending in s that name no verb]` present at `:1415-1418`. The helper case `reads a description paragraph up to its first block tag` stays at `:1681`. The report's § Deviation and § E3 revert reading record the plant, both measured readings, the restore, and the green count; the restored `configs/policy.ts` digest the report cites (`477235716dca10f84af294fa7ebad7ff4a321aafe563664b7cd24676f31459d9`) matches the digest `host.json` itself now carries for `configs/policy.ts`, an independent cross-check corroborating the report's self-reported command output.

## 4. E4 and E5 — rule sentences

PASS. `.claude/rules/typescript.md:80-83` and `.claude/rules/writing.md:110-113` read exactly as the brief quotes. `d3-fix.diff.txt` carries exactly one hunk per file (confirmed by header count), each covering only this bullet's lines, so no other line of either file moved in this round beyond D3's audited diff.

## 5. E6, E7, E8, E10

PASS. `unconditional`/`unconditionally` stands at `configs/policy.ts:333`, `:1355`, `:1361`; `tests/setupPolicy.ts:1469`; `guides/scaffold.md:1016`. No `in every sense` remains in any of those files. Comment-type doc lines at `configs/policy.ts:41` and `:47` read exactly as E7 quotes. `POLICY_PROSE_EXCLUSIONS` replaces `POLICY_PROSE_ROOTS` at `tests/setupPolicy.ts:238` (declaration), `:1346` (remark), `:1360` (walk). Stray message `guide is the package's own, the map, or a catalog row` at `tests/setupPolicy.ts:1491` and `:2328`.

## 6. E9 — readPolicyGuide

PASS. `readPolicyGuide` declared at `tests/setupPolicy.ts:1430`, before `isPolicyMirror` (`:1450`); both predicates' bodies are the exact two-line forms the brief gives (`:1451-1452`, `:1464-1465`); doc blocks intact. The case sits at `tests/policy.test.ts:397-406`, directly after the accounting case (`:379-395`).

## 7. E12 — guide

PASS. Index entry at `guides/scaffold.md:1824-1827` reads exactly as quoted. The mechanism paragraph sits at `:1013-1023`, between the paragraph ending "restore those files when their bytes drift or the files are missing." (`:1011`) and the `tests/distribution.test.ts` paragraph (`:1025`).

## 8. E13 and E14 — symbol tables, controls, strike

FAIL. Every checked row in `configs/policy.ts` (interfaces, patterns, constants, functions, `VOICE_RULE`/`TERM_RULE`, register rows) and every row in `tests/setupPolicy.ts` and `tests/policy.test.ts` matches the final tree exactly. But one `tests/config.test.ts` row is wrong: the report's table cites `rejects an opener from the stop set (relabelled here) | tests/config.test.ts:1402`; the case actually sits at `tests/config.test.ts:1415-1419` (name line `1416`), not `1402`. Every other `tests/config.test.ts` row checked (`:1338`, `:1383`, `:1389`, `:1444`, `:1650`, `:1655`, `:1673`, `:1681`, `:1695`, `:1701`, `:1711`, `:1750`, `:1889`, `:1890`) matches exactly, so this is an isolated citation error, not a systematic one. `PROSE_POLICY_CONTROLS` lists the stray control at `tests/setupPolicy.ts:2325-2334`, matching the report. The strike correctly names `configs/policy.ts:796` and the whitespace-only-gap reasoning. The two `sha256sum host.json` readings the report claims identical rest solely on the report's own narrative — no independent artifact in the diff or status lets me verify that specific pair of readings, so that sub-part is UNRESOLVED rather than confirmed.

## 9. Scope and flagged claims

PASS. `d3-fix.status.txt` lists exactly D3's nine files (`.claude/rules/typescript.md`, `.claude/rules/writing.md`, `.oxlintrc.json`, `configs/policy.ts`, `guides/scaffold.md`, `host.json`, `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`) plus `PROPOSAL.md`; `PROPOSAL.md:986`'s hunk changes only `no-imperative-summary` → `no-malformed-summary`, the one token. No `.orkestrel/` path appears in the status file, so the instruments are untouched in the final reading. `host.json`'s diff against `HEAD` (`d3-fix.diff.txt:2190-2259`) touches only `digest` values across the identical `storage`/`destination` entry set. `.claude/rules/writing.md:56` ("A vendored mirror is fetched bytes rather than authored prose...") sits outside the diff's one hunk (`:107-113`), so the report's flagged claim holds: criterion 1's phrase grep was over-wide there, in the third-party-mirror sense `.claude/rules/documentation.md` owns, and the line correctly stands unedited. The final status listing shows no `.orkestrel/campaign/docs-parity/ledger.md` or `d4-scout-distillate.md` entry, consistent with the checker brief's correction that the mid-unit reading the fix report flagged reflects the Orchestrator's own record commits rather than a second writer.

VERDICT: FAIL 8
