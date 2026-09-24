LANE: apc-5-reviewer

**Lane held: subjective** (`reviewer`, Opus 5.5). I read the retained evidence under `/home/user/scaffold/.orkestrel/veneer/units/` and the worktree `/home/user/veneer-apc` without changing either. I ran nothing. Where a mutation is named without a log, I identified it by reading the code.

## Per-claim verdicts

**1. Scope: UNRESOLVED.**
- **Status holds.** `apc-5-status.txt:1-15` and `apc-4-status.txt:1-15` are identical.
- **The color test section holds, reading the claim case by case.** Apart from the added assertions and the retitles, the `color.test.ts` section of `apc-5.diff` differs from `apc-4.diff` in these places. Each one sits inside a case the report names, or is metadata that follows from those edits:
  - the `index` line (`apc-5.diff:2` against `apc-4.diff:2`) and the hunk headers (`:58`, `:148`, `:392`);
  - the M2 comment rewrite (`apc-5.diff:246-247` against `apc-4.diff:249`);
  - the added M1 comment (`apc-5.diff:290`);
  - the formatter's re-indent of the whole neutral case body (`apc-5.diff:86-107` against `apc-4.diff:86-110`).
  - The report names neither comment edit nor the re-indent.
- **The whole-tree clause cannot be decided.**
  - The instrument that wrote `apc-instruments-5/apc-5-status-check.txt` was not retained. The only matches for its output strings are the two copies of its output (`.orkestrel/veneer/units/apc-instruments-5/` and `/home/user/veneer-apc/tmp/units/`). No script matches.
  - Line 1 of the check file (`status-equals-round-4`) records a label with no result.
  - Lines 2 and 3 (`True files: 14`, and a control reading `False`) are the writer's output from an instrument nobody can read. No one can tell what it compared.
  - My own spot check holds for one file of the 14: the worktree `src/styles/utilities/_color.scss:7-20` matches `apc-3.diff:94-111`.
- **What settles it:** retain and re-run the script, or have the Orchestrator run `git diff 712ae72 -- <file>` for each of the 14 files and compare it against `apc-3.diff` or `apc-shared-3.patch`, with the same control.

**2. M1 and M2: CONFIRMED.**
- **M1** (`color.test.ts:280-286`) reads `.text-primary-emphasis` after the body-text retune. That is the element and the condition the title at `:246` names.
  - Named mutation: the emphasis entry mixes with `light-dark(<light text>, <dark text>)` instead of the live body token.
  - Before the assertion existed: `SURVIVED`. Both modes passed and the fill-half emphasis check stayed green (`apc-5-mutation-emphasis-resting-body-before.log.txt:140-141, 157-159`).
  - After: `RED` in both modes at `color.test.ts:286:5` (`apc-5-mutation-emphasis-resting-body.log.txt:140-143, 165, 182-184`). Restore byte-identical (`:185`).
  - The assertion distinguishes the mutation.
- **M2** (`:241`) reads the emphasis class under the channel retune, which the retitled `:217` names.
  - Named mutation: the emphasis entry reads `rgb(var(--vn-color-<role>-rgb))`.
  - Before: `SURVIVED` (`apc-5-mutation-emphasis-reads-channel-before.log.txt:138-139, 157-159`).
  - After: `RED` at `:241:40`. Light reads `expected 'rgb(20, 80, 140)' to be 'rgb(8, 65, 234)'`, and dark shows the same failure (`apc-5-mutation-emphasis-reads-channel.log.txt:138-141, 194-196`). Restore byte-identical (`:197`).
  - The assertion distinguishes the mutation.
- **The before logs ran on the round-4 file.** They carry the round-4 titles and line numbers (for example, `:220` "leaves a role color on its tier…").

**3. The seam invariant: BROKEN.**
- **Failing state.** The case-1 title (`color.test.ts:33`) is "resolves each text color to the value the release records, and each role outside the neutral roles to its on-canvas tier, in %s mode".
  - Its first clause claims that every text color resolves to the recorded value.
  - The case removes the tier roles from that equality (`:43-44`, filtered by `TEXT_TIER_CASES`). It then asserts that each tier role does **not** match the recorded value (`:69-74`, `` `${key} channel` `` `.toBe(false)`).
  - So for primary, secondary, success, info, warning, and danger, in both modes, the title states a property that the case's own assertion proves false.
  - The round narrowed the neutral title for a clause that was false for one role in one mode. This clause is false for every tier role in both modes, which is the same defect under the bound the ruling set.
- **Why the sweep missed it.** The report's per-case row for case 1 (`ap-color-report-5.md:31`) says every `.text-<key>` is checked "against the recorded twin". That misreads the filter at `:44`.
- **Smallest correct fix.** Narrow the title with no assertion change, using the file's own terms: "resolves each role outside the neutral roles to its on-canvas tier rather than the value the release records, and every other text color to that value, in %s mode". The "rather than" clause names the assertion at `:69-74`, so the title claims nothing the case does not read. No runner selector matches case 1, so nothing else changes.
- **The other titles hold.** Each is ruled in Attacked and held. The narrowed neutral title (`:79`) removes a false clause. In dark mode `.text-light` sits on `gray-100`, `#f8f9fa`, which equals its `248, 249, 250` channels (`_tokens.scss:106, 345, 360, 532`). No assertion in the case reads an emphasis tier (`:88-99`).

**4. M3: CONFIRMED.**
- **Selectors.** The two proof selectors in `apc-mutate-5.py:32-33` each match exactly one current case (`apc-5-scoped-color.log.txt:98-101`). The third selector (`:34`) is stale by design, because it is the control.
- **Refusal.** When a proof executes no test, the runner sets `EMPTY SELECTION` and code 2 (`:87-88`) and exits with that code (`:104`).
- **Control log.** It shows `executed 0`, then `VERDICT: EMPTY SELECTION`, then a byte-identical restore (`apc-5-mutation-selection-control-before.log.txt:157-160`). That proves the path reached `sys.exit(2)`.
- **Mutation named: delete `:87-88`.** The control would then read `SURVIVED`, because vitest exited 0 (`:158`). The control distinguishes this mutation.
- **Correction to the claim's wording.** The control log records no exit status for the runner. Its only exit lines are `=== exit=0` (`:156`) and `vitest exit=0` (`:158`). The nonzero exit comes from the source, not from the log, and the report's "exit 2" is also read from the source.
- **Counts the report states:**
  - scoped color proof: 23 passed, 1 file, exit 0 (`apc-5-scoped-color.log.txt:111-112, 116`);
  - `test:src:styles`: 1456 passed, 115 files, exit 0 (`apc-5-final-test-src-styles.log.txt:8198-8199, 8203`). This equals round 4's count, as expected for a change that adds assertions and no tests.
  - status check: `files: 14` (`apc-5-status-check.txt:2`). This equals the 15 status rows minus `color.test.ts`.
  - The format, lint, and check logs each record exit 0 (`:10`, `:6`, and `:30` respectively). The chain log confirms all of them (`apc-5-final-chain.log.txt:1-5`).

## Findings outside the claims

None that meets the BROKEN standard.

## Attacked and held

- **Case 4 (`:120`).** "At the default opacity" is a fixture condition, meaning no opacity class is applied. It is not an unread element.
- **Case 5 (`:141`).** The check that dark differs from light (`:169-173`) is what "its own mode" means.
- **Case 6 (`:177`).** The emphasis class is read only as the tier reference.
- **Case 7 (`:217`).** "On their tier" is read as equal to the resting color. That the resting color is the tier is proven in cases 1 and 4. The `.text-bg-primary` read is a control.
- **Case 8 (`:246`).** The M1 comment "reads the same tier" matches the source. The role entry and the emphasis entry both read `--bs-<role>-text-emphasis` (`_color.scss:17, 36`).
- **Case 9 (`:291`).** The sibling is `role`, read at `:313`.
- **Case 10 (`:318`).** The check at `:327` is a control.
- **Case 12 (`:377`).** The consumer read at `:385` is a control.
- **Case 13 (`:390`).** Both pair reads are named.
- **Case 11.** Unchanged since round 4, where it was confirmed.

## Referrals

- **To the objective lane: the M3 control covers one branch.** Its selector matches no reporter line at all, so it cannot tell a correct runner from one whose executed-line pattern (`apc-mutate-5.py:82`) also counted skipped `↓` lines. Under that mutation the control log would not change. Rule whether a second control is needed, one that uses a selector matching a skipped line.
- **To the objective lane and the checker: the status-check instrument is missing.** Retention requires the exact instrument that was executed (`.agents/orchestration.md` § Dispatch anatomy), and no script produced the retained `apc-5-status-check.txt`. Its line 1 records no result.
- **To the objective lane and the Orchestrator: the successor runner drops every round-3 mutation.** The K2 emphasis-opacity mutation survives only as the stale-selector control. No retained runner can re-run it against the current K2 title (`:345`), and `apc-instruments-3/apc-mutate-2.py` still carries the stale selector.
- **To the Orchestrator: the retitles depart from the suite's wording.** "Keeps its priority over a later unlayered consumer rule" and "yields to an important override inside the utilities layer and to no unlayered one" are shared titles across the utility tests (for example `link.test.ts:322, 334` and `float.test.ts:119, 128`). `color.test.ts` is now the only file that departs from them. The seam ruling scopes the invariant to `color.test.ts`, so this is not a defect of this round. Decide whether the invariant extends to sibling files that read a pair element, or whether this file is a deliberate exception.

VERDICT: FAIL 1, 3; outside the claims: none
