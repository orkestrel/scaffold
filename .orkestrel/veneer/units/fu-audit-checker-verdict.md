<!-- Checker: checker on Sonnet, workflow wf_34cd1842-3f4, brief fu-audit-checker-brief.md. -->

## Verdict — UTIL-FRAMES (`fu`) round 1, `checker`, claims 1, 5, 8

### Claim 1 — Scope and P9: CONFIRMED

- `fu-status.txt:1-7` lists exactly the seven files: `app/browser/constants.ts`, `tests/app/browser/integration.test.ts`, `tests/app/browser/sections/{FocusRingSection,LinkSection,VisibilitySection}.test.ts`, `tests/setup.test.ts`, `tests/setup.ts` — every one inside the brief's Owned list (`b-util-frames-brief.md:70`).
- Mutation to falsify: an edit to `src/styles/utilities/_color-bg.scss` or its proof, or to any off-limits path (`b-util-frames-brief.md:75-78`), would appear in `fu-status.txt` as an `M` row; none does. `fu.diff` (grepped for `color-bg`) contains no hunk touching that file, corroborating the status-file reading — the mutation that would break this claim (a stray `_color-bg.scss` edit) is absent from both artifacts, and the assertions (status list, diff content) distinguish that mutation from the passing case.
- `fu-shared.patch:1-97` touches only `guides/veneer.md`; the visible hunks are the § Showcase helper-key rewrite, the unframed-rings/outside-variants paragraph, and the § Tests link move — no ledger-table row (`text-bg`) appears in any hunk.
- Off-limits cross-check: none of `tests/setupBrowser.ts`, `tests/fixtures/oracle/**`, `src/browser/**`, `src/core/**`, `configs/**`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `ROADMAP.md` appear in `fu-status.txt`.

### Claim 5 — Derived populations: CONFIRMED

- Section proofs read specimen names from the tables, not literal lists: `fu.diff:524-530` (`FocusRingSection.test.ts`, `.toEqual(FOCUS_RING_SPECIMENS.map((specimen) => specimen.name))`), `fu.diff:550-561` (`LinkSection.test.ts`, `LINK_SPECIMENS.map(...)`), `fu.diff:580-587` (`VisibilitySection.test.ts`, `VISIBILITY_SPECIMENS.map(...)`).
- `emphasis-link-merged` reddens `LinkSection`: `fu-instruments/fu-mutations.log.txt:79-89` — mutation rejoins the emphasis link into `Role links`; `LinkSection.test.ts:15` fails `expected [ 9 ] to deeply equal [ 1 ]`. The mutation (merging the specimen) is exactly the condition the assertion (`.toEqual([1])` count of emphasis links inside its own specimen, per `fu.diff:564-568`) is built to catch, and the log shows it failing only under that mutation and passing on the unmutated tree (`fu-gate-sections.log.txt:975-976`, all 19 files/66 tests green).
- `default-ring-unrested` reddens the `tests/setup.test.ts` driven-row case: `fu-instruments/fu-mutations.log.txt:67-77` — removing the `default-focus-ring` resting row fails `tests/setup.test.ts` "names each driven row…" with `expected [ { …(2) } ] to strictly equal []`, matching the row-orphan check the case exists to run.

### Claim 8 — Law and report: CONFIRMED, with one finding for the record

- No changed line adds `any`, `as` (beyond a const assertion), `!`, a suppression comment, a nested function declaration, or a mock/spy/fake clock: swept `fu.diff` for `: any`, `@ts-`, `eslint-disable`, `vi.mock`, `vi.fn`, `useFakeTimers`, bare `as X`, non-null `!.`/`!;`/`!,`/`!)` and standalone `function` declarations inside added (`+`) lines — no match.
- Case populations sit in setup files or derive from the specimen tables: same evidence as claim 5 (`fu.diff:524-590`), plus `tests/setup.ts` carries the registry rows per the report's Touched-files section (`b-util-frames-report.md:240-241`).
- The report quotes each gate's command and result line from its log: verified against the actual logs, not the report's self-quotation —
  - `fu-gate-format.log.txt:3` "All matched files use the correct format." matches `b-util-frames-report.md:193`.
  - `fu-gate-setup.log.txt:47-48` "1 failed | 298 passed (299)" matches report line 197; `fu-gate-setup-2.log.txt:31-32` "299 passed (299)" matches line 198.
  - `fu-gate-sections.log.txt:975-976` "19 passed (19)" / "66 passed (66)" matches line 199.
  - `fu-capture-light-1280.log.txt:78-79` and `fu-capture-dark-390.log.txt:80-81` both "48 passed (48)" match lines 200-201.
  - `fu-gate-guides.log.txt:10-11` "1 passed (1)" / "20 passed (20)" matches line 202.
  - `fu-gate-guide-format.log.txt:3` matches line 206; `fu-scratch-policy.log.txt:10-11` "109 passed | 1 skipped (110)" matches line 207.
  - No mutation needed here beyond a fabricated result line, and none of the eight spot-checked gate quotes diverge from their logs.

**For the record — counts, temporal words, code tokens without a noun (per the claim's own request):**
- Count: `b-util-frames-report.md:250` states a diffstat tally of a growable set — `` `7 files changed, 554 insertions(+), 83 deletions(-)` `` — a count of files/insertions/deletions.
- Temporal words in authored prose: none found in the report (`once` at `b-util-frames-report.md:257` sits in `fu-shared.patch`, a different file, and there in the numeric-quantifier sense "each region appears once," not the temporal sense).
- Code tokens left without a following noun: `b-util-frames-report.md:3` ("`opus` on Opus 5.5"), `:11` ("`git status --short` lists"), `:59` ("`LinkSection` failed"), `:114/:220` ("`FocusRingSection` … failed").

**Referrals:** whether the diffstat tally and the four bare code-token uses constitute a writing-rule violation on this report is a prose-judgment call (data-quote exemption vs. authored-count/token-noun rule) that this mechanical read does not resolve; route it to the subjective lane (`reviewer`)/Orchestrator.

**Findings outside claims 1, 5, 8:** none identified while executing this brief's scope.

VERDICT: PASS
