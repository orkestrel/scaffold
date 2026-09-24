# Verdict — cb round 2, checker lane (Sonnet, workflow wf_2c4b0b26-14b)

## Verdict — Audit round 2 (`cb`), claims 1, 4, 6

**Claim 1 — Scope and delta: CONFIRMED**

- `cb-2-status.txt` (all 8 lines) lists exactly the 8 files round 1 owned: `app/browser/styles/_shell.scss`, `src/styles/elements/_button.scss`, and the six test files. Round 1's owned set is the same 8 `diff --git` headers in `cb.diff` (lines 1, 21, 128, 182, 219, 295, 315, 351) — identical file set, nothing added or dropped.
- `cb-instruments/cb-interdiff-2.diff` carries the entire owned delta against round 1, and it touches only `tests/src/styles/elements/button.test.ts` (lines 1–28), `tests/src/styles/components/nav.test.ts` (lines 29–51), and `tests/src/styles/components/list-group.test.ts` (lines 52–125). No hunk for `_button.scss` or `_shell.scss` appears anywhere in that file, confirming those two stay byte-equal.
- `cb-instruments/cb-shared-interdiff-2.diff` shows every hunk rooted at `guides/veneer.md` (lines 1, 12, 47, 62, 82) and no other file path — the shared patch changes only that file.

**Claim 4 — C-b: the guide: CONFIRMED**, with one outside-claims finding.

- § Files row (`cb-shared-interdiff-2.diff:8`) and § Styles opening (`:29-30`) both name the bare button by its two attributes and use the single term "bare button" throughout (Additions Reasons `:71,73,74,75,77,78`; Tailwind `:56`; Showcase `:90`) — one term used consistently.
- Reboot list (`:31-34`) adds "the pointer cursor while enabled, and no outline on a focus the browser does not mark as visible," matching `button:not(:disabled)` and `button:focus:not(:focus-visible)` in `cb-2.diff:125-127`, which sit outside the bare-selector block and so do reach every button — the added sentence reads true against the cascade.
- The `data-bs-target` sentence is split exactly as the brief specifies (`cb-shared-interdiff-2.diff:38-40` vs. brief `b-cross-cb-brief-2.md:38-41`).
- Tailwind and Showcase paragraph lines (`:56-58`, `:90-93`) each measure ≤100 characters per line, matching the guide's 100-column width the brief names (`b-cross-cb-brief-2.md:42`).

Outside claim 4, to the BROKEN standard: the § Files row wording ("the bare button, a button with no `class` attribute…") departs from the brief's literal specified text (`b-cross-cb-brief-2.md:32-33`, "…and the calibrated surface and its states on a button with no `class` attribute…"). The report (`b-cross-cb-report-2.md:93-95`) states this wording was "settled under the deviation contract," but the round-2 brief's deviation contract (`b-cross-cb-brief-2.md:70-72`) scopes the unit's self-decided choices to only "the replacement metrics, the case title, and where the case sits" — it names no license to reword the Files row. This is an unauthorized deviation under `.agents/orchestration.md` § Deviation protocol, not a scoped one.

**Claim 6 — Law and report: BROKEN**

- No changed line adds `any`, a non-const `as`, `!`, a suppression comment, or a nested function declaration (checked against every `+` line in `cb-2.diff`; the only `as` hit is `as const` at `cb-2.diff:455`).
- The report states no temporal word (`currently`/`now`/`new`/`latest`/`soon` — no hits) and no diff-stat tally (no hits), and it quotes each gate's literal result line from its log (`b-cross-cb-report-2.md:152-174`).
- The code-token-noun rule is violated twice: `b-cross-cb-report-2.md:148` ends the sentence "`PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`." with no noun following the token, and `b-cross-cb-report-2.md:163-164` uses `` `GIT_CEILING_DIRECTORIES=/home/user/veneer-cb/tmp/probe` `` as a bare sentence subject followed by the verb "keeps," with no noun pairing anywhere in the sentence — contrary to `.claude/rules/writing.md` § Code tokens ("Put a code token in backticks and follow it with a noun … Never … use one as an English verb").

Counts the report states, listed (`b-cross-cb-report-2.md`):
- Test tallies: `7 failed | 153 passed (160)` (:47); `4 failed | 156 passed (160)` (:59, :60, :61); `160 passed (160)` (:156); `22 passed (22)` (:170); `19 passed (19)` (:171); `4 passed (4)` (:172); `109 passed | 1 skipped (110)` (:173).
- Build times: `1.35s` (:155); `1.63s` (:169).
- Token/metric values: size tokens `12, 14, 16, 18, 20, 24, 30, 36` pixels at a `16px` root (:38-39); line ratios `1.5, 1.2, 1.6` (:40); wrapper metrics `20px/30px` (round 1, :64, :111) and `19px/29px` (round 2, throughout); mutation-reading values `29`→`30` and `19`→`20` (:61).
- Matrix before/after values (:119-127): `3.5px → 5px`; `14px → 20px` (font-size, several rows); `21px → 30px` (line-height, several rows); `0.65 → 1` (opacity, several rows); `6px → 0` (border-radius, several rows); `24px → 19.2px` and the `1.2` heading ratio over `16px` (:121); `24px → 30px` (:127).
- SHA-256 digest `f349fac5ba515e8e0394a00914b5154ef034a7fe0ead11c897bb69b8ca13288a` (:70).
- Gate exit codes: `0` for every row in both gate tables (:152-156, :169-174), and `git apply --check` exits `0` twice (:176-177).

VERDICT: FAIL 6; outside the claims: files-row-deviation-scope
