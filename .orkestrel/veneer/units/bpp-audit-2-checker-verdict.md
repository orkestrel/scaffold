# B-PASSIVE-PROSE (`bpp`) audit round 2 — `checker` on Sonnet verdict (claims 1, 3, 4, 5, 7)

**Claim 1 (delta and scope) — CONFIRMED.** `bpp-2.diff` and `bpp-2-status.txt` both show exactly the files `tests/setupServer.ts`, `tests/setupStyles.ts`, and `tests/src/styles/components/button-group.test.ts` (`bpp-2-status.txt:1-3`). Every hunk in `tests/setupServer.ts` and `tests/setupStyles.ts` sits inside a `/**...*/` doc-comment block (`bpp-2.diff:5-472`); no non-comment line changes in either file. No other path appears in the diff or status.

**Claim 3 (F2 closed) — CONFIRMED.** `/home/user/veneer-bpp/tests/setupServer.ts:1594` reads "…or not; the {@link collectKeyframeNames} helper answers the neighbouring question…", lowercase after the semicolon, matching `bpp-2.diff:116-117`.

**Claim 4 (no `{@link X} function` residue; the named symbols read `helper` everywhere) — CONFIRMED.** `grep -n '\{@link [A-Za-z_.#]*\} function'` over both files returns no matches. `grep` for `collectSelectorClasses|readCascadeBlocks|collectKeyframeNames` in `setupServer.ts` shows every `{@link}` site (lines 1356, 1413, 1450, 1504, 1594, 1694, 1879, 2097, 2217, 2219) reading `helper`, never bare `function`.

**Claim 5 (round-1 claim 3 closed) — CONFIRMED.** `/home/user/veneer-bpp/tests/setupStyles.ts:3615` reads "The `engine` field is the axis the range family varies on…", matching the required rewrite and D42.

**Claim 7 (fed-case titles, § Tests patch scope, files exist, no pre-existing link, link phrasing) — CONFIRMED.**
- Fed-case titles match exactly: `tests/src/styles/components/button-group.test.ts:297` (`'lifts the pressed child of a %s'`) and `:382` (`'reads its radius and its overlap from the compatibility variables the token module declares'`), as the report states.
- `guides/veneer.md` `## Tests` runs `4032`–`4171` (next `##` is end of file). None of the named style-proof files (card, button-group, pagination, placeholder, progress, spinner, list-group, validation) and no section proof beyond `ButtonSection.test.ts`, `TypeSection.test.ts`, `MediaSection.test.ts` appears in that range.
- Every named style-proof file and every named section-proof file (`BadgeSection.test.ts` through `ValidationSection.test.ts`) exists under `/home/user/veneer-bpp/tests/` (confirmed by glob).
- Each proposed link (`[the card classes](...)`, `[badge specimens](...)`, and the rest) is a descriptive phrase, not `here` or a bare URL, satisfying `.claude/rules/writing.md` § Code tokens, references, and links.

## Findings outside the claims (BROKEN standard)

The report states counts of sets that can grow, which `AGENTS.md` § Writing and `.claude/rules/writing.md` forbid in developer-facing prose:

- `b-passive-prose-report-2.md:9` — "shows three modified files" (files).
- `b-passive-prose-report-2.md:25` — "The only two remaining hits" (hits).
- `b-passive-prose-report-2.md:177` — "feed two cases" (cases).
- `b-passive-prose-report-2.md:219,222,224` — "the eight style proofs" (proofs), repeated.
- `b-passive-prose-report-2.md:251` — "the application-proofs paragraph's existing three entries" (entries).

These sit outside claims 1, 3, 4, 5, and 7 and are reported for the record.

VERDICT: PASS
