# Verdict — PASSIVE-FRAMES round 2, checker (claims 1, 5, 8)

**Claim 1 (Scope).** CONFIRMED.
- `fp-2-status.txt:1-7` lists exactly the seven files: `app/browser/constants.ts`, `tests/app/browser/integration.test.ts`, `tests/app/browser/sections/ButtonGroupSection.test.ts`, `tests/app/browser/sections/ListGroupSection.test.ts`, `tests/app/browser/sections/PlaceholderSection.test.ts`, `tests/setup.test.ts`, `tests/setup.ts` — matching `b-passive-frames-brief.md:60`'s Owned set (specimen tables in `app/browser/constants.ts`; `tests/setup.ts`; `tests/app/browser/integration.test.ts`; `tests/app/browser/sections/**`; `tests/setup.test.ts`).
- `fp-2.diff` `diff --git` headers (lines 1, 171, 618, 832, 969, 1057, 1136) match the status list exactly.
- `fp-shared-2.patch:1-73` touches only `guides/veneer.md` and `tests/app/browser/index.test.ts`, matching `b-passive-frames-brief.md:62-63`'s Shared set.
- None of the seven owned files, nor the two shared files, appear in the brief's Off-limits list (`b-passive-frames-brief.md:65-68`).

**Claim 5 (F5, one population).** CONFIRMED.
- `BUTTON_ROLE_CLASSES` is derived from `BUTTON_SPECIMENS` at `/home/user/veneer-fp/app/browser/constants.ts:249-255`, and is read by the `Pressed roles` specimen (`app/browser/constants.ts:1051`) and the role pointer case (`tests/app/browser/integration.test.ts:1383`).
- N4 (outline-roles filter narrowed) reddens the pressed-faces cascade-binding assertion: `fp-mutations-2.log.txt:40-51` (`ButtonGroupSection.test.ts:342:34`, exit 1).
- `LIST_GROUP_ROLE_WORDS` is a literal list at `app/browser/constants.ts:1490-1499`, read by the three List group role specimens (`app/browser/constants.ts:1562,1566,1570`) and by the section case (`tests/app/browser/sections/ListGroupSection.test.ts:66,119`).
- N5 (dropped `dark`) reddens the role-order binding assertion: `fp-mutations-2.log.txt:53-64` (`ListGroupSection.test.ts:119:33`, exit 1).
- `EXEMPT_SUBJECTS` is a constant at `tests/setup.ts:2525`, read by `tests/setup.test.ts:119`. N6 (dropped `'Link'`) reddens the exemption case: `fp-mutations-2.log.txt:66-77` (`tests/setup.test.ts:123:5`, exit 1).
- No sampled specimen or case (`ButtonGroupSection.test.ts:8,346`; `ListGroupSection.test.ts:4,66,119`; `integration.test.ts:56,1383`; `tests/setup.test.ts:10-14,119`) keeps a second literal copy of these populations; each reads the named constant.
- Each mutation's failing assertion is the one the passing case also runs (same line, same assertion), and the mutation changes only the value under test (outline-role filter, list membership, exemption entry), so the reddening is attributable to the mutation rather than to an unrelated break — the log's `reason` line for each shows the value diverging (e.g., N4: `[..7] to strictly equal [..16]`), distinguishing the mutated state from the passing one.

**Claim 8 (Law and report).** CONFIRMED, on the sites read.
- Lexical/syntax law: no added line in `fp-2.diff` matches `any`, `@ts-`, `eslint-disable`, an unsafe `as` (only `as const` at lines 599, 1026), a non-null assertion `!`, or `vi.mock`/`vi.spyOn`/fake-clock calls (all greps returned no matches over `fp-2.diff`). No nested function declaration/assignment pattern matched in the added lines sampled.
- Each round-2 gate log opens with its command and closes with its exit: `fp-gate-2.sh:9-16` writes `command:` then runs then `exit $code`; confirmed directly in `fp-2-check.log.txt:2,31` (`command: npm run check` … `exit 0`). The report's gate table (`b-passive-frames-report-2.md:153-164`) quotes each command and exit, matching this shape.
- Prose: "mode token" appears in `tests/setup.ts` TSDoc and `fp-shared-2.patch` (patch lines 37-39, 44-50); no "theme word" hit in `tests/setup.ts` or `fp-shared-2.patch` (both greps empty).
- § Tests sentence reads as brief 2 states: `b-passive-frames-report-2.md:89` quotes "The journey holds every role host beyond the filled primary and asserts that its held face is the face its pressed twin paints," matching `b-passive-frames-brief-2.md:29`'s required wording (F4).
- Rows named by role: `b-passive-frames-report-2.md:56,96` name "danger row" / "primary row", not position (F6).
- Typecheck sentence: `b-passive-frames-report-2.md:98-100` (R1) and `fp-shared-2.patch` lines 36-39 both state the registry proof, not the typecheck, refuses a mode token.
- Claim 8's dark-pressed-row content: the role action case (`tests/app/browser/integration.test.ts:1659-1781`) selects the danger row by `.list-group-item-danger` (line 1673) and the primary row by `.list-group-item-primary` (line 1669), and asserts `[hover, press].filter((ratio) => ratio < DRIVEN_CONTRAST)` is empty (line 1777). `DRIVEN_CONTRAST = 1.2` at `tests/setup.ts:2595`, with a proof holding it between 1 and `CONTRAST_BAR` at `tests/setup.test.ts:185-186`. N3 (press moved to the `dark` row) reddens this same assertion at 1.0834694430672245 (`fp-mutations-2.log.txt:27-38`); N8 (bar set to 0.5) reddens the bar case (`fp-mutations-2.log.txt:92-103`, `tests/setup.test.ts:185:27`). Each mutation's reason line shows the specific numeric divergence from the passing run, so the assertions distinguish the mutated case from the passing one.
- Report count check: no authored tally of a growable set found; the one numeric line matching the sweep pattern (`b-passive-frames-report-2.md:50`, "7 files changed, 1006 insertions(+), 49 deletions(-)") is quoted `git diff --stat` output, not authored prose stating a count. `b-passive-frames-report-2.md:78`'s "four rounded corners" names a fixed geometric property of a rectangle, not a count of a growable set. No temporal word (`currently`, `now`, `new`, `latest`, `soon`) found in the report (grep empty).

**Findings outside the claims:** none (BROKEN standard: not applied, no findings raised).

**Counts the report states:** none stated as authored counts (the sole numeric line found is quoted tool output, listed above).

VERDICT: PASS
