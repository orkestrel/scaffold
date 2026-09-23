# UTIL-PLACEMENT (`upl`) audit, round 2: subjective-lane verdict

I held the subjective lane as `reviewer` on Opus 5.5, in a clean context and read-only. I ran nothing; every reading below comes from a retained log or a file I read. Paths are relative to `/home/user/scaffold/.orkestrel/veneer/units/` unless they start with `/home/user/veneer-upl/`.

## Per-claim verdicts

**1. Delta and scope: CONFIRMED.**
- `upl-2-status.txt:1-17` holds exactly the listed paths.
- The file headers in `upl-2.diff` (lines 1, 32, 60, 88, 116, 157, 204, 243, 265, 300, 548, 729, 856, 983, 1216, 1362, 1449) name only those paths.
- `upl-instruments-2/round-delta.diff:1-33` shows that, among the partials and sections, only the `_position.scss` and `_sizing.scss` map comments changed. The shell partial and the section classes are absent from it.
  - The claim's exception for "the shell partial's `Maximum sizes` move" describes no change. The move is in `app/browser/constants.ts` (`upl-shared-2.patch:147`). The byte-identity holds regardless.
- Every file header in `upl-shared-2.patch` names a Shared-row file, and each carries an `index` line (2, 31, 192, 203, 688, 703, 744, 782, 852, 949, 959, 995, 1005, 1063, 1073, 1202, 1237, 1312, 1563).
- `upl-instruments-2/logs/fresh.log.txt:3` reads `apply-check shared at base exit=0`.
- `upl-unlisted-2.patch:1` touches only `tests/setupBrowser.test.ts`.
- No hunk touches a vendored file, `src/browser/**`, `src/core/**`, `package.json`, `README.md`, or `ROADMAP.md`.
- `round-delta-shared.diff` shows no change to any file the rulings do not name. Its constants hunk is stale; see Referrals.

**2. The matrix and the missing logs: BROKEN**, on the log-header clause only.
- What breaks: the claim says each log's header names "the copy and the digests before and after the restore". Neither exists.
  - `upl-instruments-2/tools/mutate.py:35-45` writes the mutation, file, old and new text, rebuild flag, command, exit, population, result, and red titles, and nothing else.
  - `logs/mutations/maximum-outside-frame.log.txt:1-10` shows that header. The copy appears only in Vitest's own `RUN` line (`:13`), and no digest appears anywhere (a search for `digest|sha` over `upl-instruments-2/` finds none).
- Bound: the brief never asked for digests (`upl-brief-2.md:62` asks for one log per run in one copy, with its population), and the report never claims them (`b-utilities-upl-report-2.md:375-376`). The defect is the claim's wording, not the unit's work.
- Smallest fix: strike the clause, or have `mutate.py` write `# copy:` and a SHA-256 of the restored file into the header.
- The rest holds:
  - `logs/matrix.txt:1-55` equals the report's style and section rows (`b-utilities-upl-report-2.md:308-362`). The report's setup and consumer rows (`:363-366`) come from other logs, not from `matrix.py`.
  - Every case has a reddening mutation.
  - `frame-height-unbounded` reddens the Sizing geometry case (`matrix.txt:50-51`).
  - `importance-dropped` reddens the same eight titles its round-1 log records (`upl-instruments/logs/importance-dropped.log.txt:361-506`, against `matrix.txt:18-39`).
- Mutations named, and whether the assertions tell them apart:
  - `visibility-order-reversed` makes `.invisible.visible` resolve `visible` against the expected `hidden` (`upl-2.diff:1422-1424`): yes.
  - `fixed-important` makes `.fixed-top.probe` keep `fixed` against the expected `absolute` (`upl-2.diff:974`): yes.

**3. The `Maximum sizes` placement: CONFIRMED.**
- The markup opens `<div class="viewport"><p><span class="placeholder vw-100 mw-100"…` (`upl-shared-2.patch:147`).
- The cap readings are equal before and after the move: `logs/caps-before.log.txt:1-2` and `logs/caps-after.log.txt:1-2` both read `[[390,390],[192,192]]` and `[[1280,1280],[192,192]]`.
- The frame logs cite the shipped proof's lines: `frame-height-unbounded.log.txt:181,216,218,244` resolve to `PositionSection.test.ts:157,184,198` and `SizingSection.test.ts:143`.
- Mutations named:
  - `maximum-outside-frame` fails the `.viewport > p > …mw-100` selector and the `closest('.viewport')` filter (`SizingSection.test.ts`, the contract case). Its log reads `1 failed` (`maximum-outside-frame.log.txt:9-10`). The assertions tell it apart.
  - `frame-contain-dropped` moves `origin` to `[0, -1662]`, `frame-overflow-auto` moves `scrolled` to `[50, 0]`, and `frame-height-unbounded` sets an `inset` entry false (report `:474-476`). The assertions tell each one apart.
- The move itself creates a new design defect; see F-CAP.

**4. The guide: CONFIRMED.**
- Every class, token, file, and mixin in the three utility sections and the § Showcase frame paragraph takes its noun (`upl-shared-2.patch:433-544`, `:642-652`).
- The ruled wordings are present: "each resolved value" (`:623`); "sets aside a width or height the element declares, so the box takes its content's size" (`:491-492`); "including a box inside an invisible ancestor" (`:516`).
- The frame paragraph opens on the frame and names the specimens the shipped markup frames. Every `POSITION_SPECIMENS` entry and the `Height steps`, `Maximum sizes`, and `Viewport sizes` entries open with `<div class="viewport">` (`:61-96`, `:131`, `:147`, `:152`). The region-order sentence is gone.
- The § Tailwind clause states the ruled cause (`:420-423`).
- `round-delta-shared.diff:25-231` confines the guide changes to the ruled sites.
- The exclusion line carries the `start-*` and `end-*` names in both recipe fences and both fixtures (`:391`, `:400`, `:957`, `:1003`) and in `tests/setup.css` (`:1071`).
- Sites the ruling did not name still break the token-noun rule; see F-ROWS.

**5. Tables, fixtures, infixes, start control, and comments: CONFIRMED.**
- The constants are exported with TSDoc (`upl-shared-2.patch:1570-1699`). Every table and entry is frozen, and the freeze loop checks them (`:1533-1557`). `PLACEMENT_CONTAINER` and `PLACEMENT_BOX` are primitive strings.
- The binding case passes: `fresh.log.txt:12` reads `110 passed (110)`.
- `mountTraversalStart(): HTMLButtonElement` mounts through `scene` (`:1227-1235`).
- The unlisted patch adds the export name and the case (`upl-unlisted-2.patch:17`, `:26-36`). The run reads `66 passed (66)` with the patch (`fresh.log.txt:19`) and `1 failed | 64 passed (65)` without it (`setup-browser-without-unlisted.log.txt:112`).
- The nested function is gone (`upl-shared-2.patch:1028`, `:1039`, `:1048`).
- The comments name their members without a count (`round-delta.diff:7-30`; `upl-2.diff:1291-1292`).
- No proof restates a list.
- Mutations named:
  - `setup-share-wrong` breaks `parseFloat(value)/100 === share` (`setup-share-wrong.log.txt`, `1 failed`).
  - `setup-infix-narrowed` breaks `BREAKPOINT_INFIXES` against the ramp keys.
  - `start-unfocused` breaks `document.activeElement === start`.
  - The assertions tell each one apart.
- Restated fixtures and the constants' vocabulary are outside the claim; see F-FIXTURE and F-SETUP.

**6. F1 and F2: CONFIRMED.**
- The remark matches the F1 ruling (`upl-shared-2.patch:1101-1104`).
- `longhands.get(name) ?? []` is inlined at the standalone read, the coverage check, and the paired read (`:1028`, `:1039`, `:1048`). Only those lines and the comment change from round 1 (`round-delta-shared.diff:234-271`).
- Mutation named: `importance-dropped-service` empties the important branch, so `toContain('gap-3')` fails (`3 failed | 15 passed`, report `:447`). The assertion tells it apart. The unmutated service control is green (`fresh.log.txt:15`).

**7. Frame runs and failing-first evidence: CONFIRMED.**
- § Frame runs cites each mutation against the shipped section proofs at both variant widths, with shipped line numbers (report `:472-478`).
- The failing-first record runs red before the fix and green after:
  - setup tables: `2 failed | 108 passed (110)`, then `110 passed`;
  - the start builder: a collection failure, with `start-unfocused` as the assertion-level control;
  - the Sizing section: `1 failed | 3 passed (4)`, then `4 passed` (`caps-before.log.txt:4`, `caps-after.log.txt:3`).
- The controls are green.
- Note for the Orchestrator: the claim's text says "pre-fix green and post-fix red". That is inverted. I ruled on the failing-first law the claim names.

**8. Law and report: BROKEN**, on the count rule and on one false report statement.
- Counts: the report says "This report states no count of a set anyone can add to" (`b-utilities-upl-report-2.md:271-272`), but it states counts (listed at the end of this claim).
  - The set of report-only patches grew this round, so "both patches" tallies a growable set without naming its members.
  - Fix: write "the shared and unlisted patches", and "`tests/setupBrowser.test.ts` sits outside the Shared row and needs a ruling".
- False statement: `:249-251` says "A proof restates no table, fixture, or infix list", and names the translation case's selectors as single-case literals. The translation box also sits in a second case; see F-FIXTURE.
- What holds:
  - I found no `any`, no `as` beyond `] as const` (`upl-shared-2.patch:1478`), no `!`, no suppression, no mock, and no nested function beyond callbacks passed directly.
  - `mountTraversalStart` has no installed counterpart. The `@orkestrel/test` browser declarations export only `describeFocus` and `readFocus` near that name.
  - Banned-term sweep: the pattern `should|just|simply|eas(y|ier|ily)|currently|via|e.g.|i.e.|etc.|once|since|above|below|now|new|latest|ensure|guarantee|please`, case-insensitive, over the added lines of `upl-shared-2.patch` and `upl-2.diff` and over the report. Each hit is in a permitted sense: fixture text ("since your last visit", "now"), spatial "below" (`:458`, `:470`), and "above the unconditional one" (`:1570`).
  - Every gate line matches `fresh.log.txt:11-19`.
  - D1 carries expected, found, evidence, and done. D2 and D3 are bounded ancillary choices and D4 is an observation, which is the right form for each.

Counts the report states:
- `:7` "One file outside the Shared row needs a ruling"
- `:486` "checked and applied both patches … reversed both patches"
- `:557` "writes both patches from the land copy"

Permitted: measurements with their commands (`:69-76`, `:78`, `:300-304`, every `Tests` line, the cap readings at `:115-117`), line numbers, the `:506` sentence that names both apply lines, and deviation identity numbers (`:10`, `:56`, `:452`).

## Findings outside the claims

**F-CAP: the `Maximum sizes` width cap is neither visible nor measurable inside the clipping frame.**
- Where: `upl-shared-2.patch:147`. The line `<p>` fills the `.viewport` frame, and the frame clips (`/home/user/veneer-upl/app/browser/styles/_shell.scss:48-52`).
- What is wrong:
  - An uncapped `.vw-100` box overflows the line, and the clip cuts it at the frame edge, which is the line's edge. So a capped box and an uncapped box paint the same pixels.
  - The section proof reads the capped width equal to the viewport width at both variants (`caps-after.log.txt:1-2`: `[390,390]`, `[1280,1280]`). An uncapped box would read the same, so the pair at `SizingSection.test.ts:121-122,144` cannot fail for a missing `.mw-100`.
  - The height cap does not have this problem: 192 against 896 (`caps-after.log.txt:1`).
- Why it matters: family ruling 8 requires a specimen to show its behaviour (`b-utilities-family.md:64-69`). Round 1's prescription ("the frame is full-width, so `.mw-100` still caps at the line") was right about where the box sits, but it did not account for the clip. This half of the Orchestrator's claim-4 ruling is wrong.
- What right looks like:
  - Narrow the line inside the frame with a shipped step: `<div class="viewport"><p class="w-50"><span class="placeholder vw-100 mw-100" aria-hidden="true"></span></p>…`. An uncapped box then runs past the line to the frame edge, and the section proof's pair tells the two states apart.
  - Add one sentence to the `SIZING_SPECIMENS` remark saying so.
  - Add a section-run mutation that drops `mw-100` from the specimen.
- The rendered appearance is NOT-EVIDENCED: no capture portfolio was supplied. The landing `CAPTURE=1` run is where it gets checked.

**F-FIXTURE: fixtures are still restated.**
- Where:
  - `/home/user/veneer-upl/tests/src/styles/utilities/position.test.ts:92` and `:191` both carry `style="width: 100px; height: 40px"`. The translation case and the later-value case both derive readings from it (`[150, 80]`; `matrix(1, 0, 0, 1, -50, 0)`).
  - `/home/user/veneer-upl/tests/src/styles/utilities/sizing.test.ts:37` restates `width: 400px; height: 200px`, although line 21 composes `${PLACEMENT_CONTAINER}; display: flex`.
- What is wrong: `.claude/rules/tests.md:183-184` says to extract a fixture that serves more than one test and treats a near-duplicate as a defect, and criterion 3 (`upl-brief-2.md:61`) says "restate no … fixture". The report says otherwise (`:249-251`).
- What right looks like:
  - a documented `TRANSLATION_BOX` constant in `tests/setupStyles.ts`, imported by both cases;
  - `${PLACEMENT_CONTAINER}; display: flex; align-items: flex-start` at `sizing.test.ts:37`.

**F-ROWS: code tokens in the compatibility rows lack their noun.**
- Where:
  - `upl-shared-2.patch:630` "reading `--vn-stack-fixed`" and `:631` "reading `--vn-stack-sticky`";
  - `:628` "Every official `.translate-middle` selector" (the key has three selectors, so the row reads as if one class name had several selectors).
- What is wrong: ruling 11 requires "every code token with its noun" across the guide (`b-utilities-family.md:80`). The round-1 ruling named the sections, and these rows carry the same defect by another route.
- What right looks like: "reading the `--vn-stack-fixed` token"; "The official `.translate-middle`, `.translate-middle-x`, and `.translate-middle-y` selectors ship…".

**F-SETUP: the new setup constants use more than one term per concept, and two list insertions break the sort order.**
- `SIZE_STEP_CASES` (`upl-shared-2.patch:1611`) sits beside `SIZING_ENTRY_CASES`, `SIZING_COPY`, and `SIZING_SPECIMENS`. In this file, `SIZE` already names size variants (`BUTTON_SIZE_CASES`, `PAGINATION_SIZE_CASES`, `SPINNER_SIZE_CASES`; `/home/user/veneer-upl/tests/setupStyles.test.ts:217,283,298`). Right: `SIZING_STEP_CASES`.
- `OFFSET_STEP_CASES` is documented "Lists the offset steps…" (`:1645`), the same opening as the grid's `GRID_OFFSET_STEPS` (`/home/user/veneer-upl/tests/setupStyles.ts:1829`). Right: "Lists the position offset steps…".
- The field is named `prefix` (`:1620-1627`, `:1668-1674`), but its TSDoc and the case comment call it a "class stem" (`:1618`, `:1641`, `:1666`, `:1470-1471`). The file's own vocabulary is "prefixes" (`setupStyles.ts:56`). Right: write "class prefix" throughout.
- The export literal is kept in code-point order at base (`setupStyles.test.ts:195-363`). `PLACEMENT_*` is inserted inside `PLACEHOLDER_*` (`:1382-1383`) and `POSITION_*` after `PROGRESS_*` (`:1389-1390`). The same happens in the import list (`:1327`, `:1333-1334`). Right: `PLACEMENT_*` goes after `PLACEHOLDER_SIZE_CASES`, and `POSITION_*` before `PROGRESS_MARKUP`.

**F-SHELL: the shell comment no longer matches the guide.**
- Where: `/home/user/veneer-upl/app/browser/styles/_shell.scss:39-47`.
- What is wrong: the comment says the frame holds "a fixed, sticky, or viewport-sized specimen" and bounds its height for a fixed descendant and a dialog. The guide (`upl-shared-2.patch:646-649`) and the `POSITION_SPECIMENS` remark (`:51-53`) also give the frame's definite height to percentage heights and offsets. The `Edge offsets`, `Centered translation`, `Stacking levels`, and `Height steps` specimens use the frame for that reason alone.
- What right looks like: the comment adds that the bounded height gives a percentage height or offset a definite height to resolve against.

## Attacked and held

- **D1 holds.** Without the unlisted patch, the export-list case reddens alone (`setup-browser-without-unlisted.log.txt:112`).
- **D3 holds.** The `SIZE_STEP_CASES` TSDoc bounds the omission of `auto` (`:1608`).
- **The `PLACEMENT_CONTAINER` string shape holds.** The binding case re-parses the string with a regex (`:1527`), but a changed size reddens the proofs loudly.
- **The builder holds.** `mountTraversalStart` fits the sibling `mount*` family (`mountClose(): HTMLButtonElement`). Its `@returns` phrase copies the file's precedent (`setupBrowser.ts:1582,1607,1633`).
- **A line-length nit is not a finding.** `upl-shared-2.patch:423` runs past the paragraph's wrap width. No rule governs it, and `format:check` passes.

## Referrals

- **To the objective lane:**
  - `round-delta-shared.diff:10-12` is stale. It carries the mutation-run `SIZING_SPECIMENS` remark, not the final text (`upl-shared-2.patch:114-117`), yet the report calls these records "the full text of every change" (`:82-83`).
  - The test-sufficiency half of F-CAP (`SizingSection.test.ts:144`).
  - The `#### position` ledger table sits between `placeholder` and `icon-link` (`upl-shared-2.patch:603`). The guide says the tables follow "the order the shipped keys sort" (`guides/veneer.md:2316`). Confirm whether a gate reads that order.
- **To the Orchestrator:**
  - Claim 7's text is inverted.
  - Claim 2's digest clause was never briefed.

VERDICT: FAIL 2, 8; outside the claims: F-CAP, F-FIXTURE, F-ROWS, F-SETUP, F-SHELL
