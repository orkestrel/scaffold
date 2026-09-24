# J-COLLAPSE audit round 4 — the checker's brief

## Role and lane

`checker` on Sonnet, reached as a native Claude subagent with `Read`, `Grep`, and `Glob`; mechanical conformance only. State that in your first line. This round's audit is the checker plus the Orchestrator's gates and replay, for the reason `j-collapse-audit-3-verdict.md` § Carrier records (no mechanism changed; the four new proofs are bound by the instrument rows the replay reproduces).

## Subject

The J-COLLAPSE unit's round 4 in the worktree `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/collapse` (branch `unit/collapse` at `eab447e`; the round-2, round-3, and round-4 edits uncommitted). Review evidence, all under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/`: the diff `j-collapse-4.diff` and the round-3 state `j-collapse-3.diff` (the round-4 delta is what the later diff carries beyond the earlier); the status `j-collapse-4-status.txt`; the brief `j-collapse-brief-4.md` (§ The edits, § Acceptance criteria); the report `j-collapse-report-4.md`; the Orchestrator's run `j-collapse-gates-4.log.txt`; the instrument `j-collapse-mutations-4.py` with its log `j-collapse-mutations-round-4.log.txt` and the round-3 instrument `j-collapse-mutations-3.py`; the probe `j-collapse-probe-r2-r3-single-door.py` (the four mutation texts the round had to bind); the patches under `j-collapse-patches-2/`; the worktree's `src/browser/*.ts`, `tests/src/browser/*.ts`, and `guides/veneer.md`.

## Items

Rule each item met or not met with one piece of evidence (`file:line` or the grep and its hits):

- The round-4 delta touches only `src/browser/Collapse.ts` (the remark wrap), `src/browser/Delegate.ts` (the `#activate` comment), `src/browser/parsers.ts` (the last remark sentence), `tests/src/browser/Collapse.test.ts` (three new cases and one retitled case), `tests/src/browser/Delegate.test.ts` (one new case), and `guides/veneer.md` (§ Delegation's two sentences, the takeover paragraph's rewrap); no source statement outside a comment changed in `Collapse.ts`, `Delegate.ts`, or `parsers.ts` (compare the two diffs line by line and name any code line that differs).
- The four new case titles the report names appear verbatim in the test files: the three F1 door cases and the F2 `href` refusal case; the retitled case reads "destroys a sibling collapse it constructed at its next show or hide call, refused or not, after that sibling panel leaves the document" and the old title appears nowhere in the tests or the instrument.
- `j-collapse-mutations-4.py` differs from `j-collapse-mutations-3.py` by `ROOT` (the new worktree path), the `LOG` path, the four added rows (whose mutation texts equal the four in `j-collapse-probe-r2-r3-single-door.py`, allowing for the row name), and the retitled case string; name any other difference.
- The log carries one `EXACT` or `JOINED` row per mutation the instrument lists, the four new rows `EXACT` on their one case each, the `GREEN?` rows at 0 failed with the totals the report states, and the receipt `restored byte for byte`.
- § Delegation carries the refusal sentence ("A click whose button host is one of the panels its collapse trigger names inside the root is refused when neither engine exists there, as § Components states under Collapse.") and the restoration sentence reads "the first live delegate whose root contains the host to reach it acquires a fresh engine at once"; `grep -n "in the first delegate to hear it" guides/veneer.md` hits nothing; the `#activate` comment names the refusal.
- The `parseElement` remark's last sentence reads "Where the selector as written is invalid, this reader returns undefined; `getElement` returns null for an empty string and throws for any other selector its escaping leaves invalid."
- No line of the `#### Collapse` takeover paragraph is under 20 columns mid-sentence, every line of it fits 100 columns, and the `Collapse.ts` remark carries no line ending "completes to. A"; `awk 'length > 100'` over the four sources names only the `@param` and `@throws` tag lines and the pre-existing `Collapse.ts` and `validators.ts` lines the round-3 checker named.
- The status lists exactly the eight files of rounds 2 and 3, all `M`, no new file, no off-limits file; `j-collapse-gates-4.log.txt` reads every gate green (`check:src:browser`, oxlint, oxfmt, `test:src:browser` with the totals the report states on Chromium 153, `test:guides`, `test:policy`, the three builds, `test:conformance`, the brief-4 greps as its criteria fix, the patches' apply check, the tree-wide `check`).
- The added lines carry no `any`, `as `, non-null `!`, `@ts-`, `eslint-disable`, `public`, `protected`, `private`, a parameter property, a default export, or a nested function declaration outside an anonymous callback; the added prose carries no term `writing.md` § Substitutions bans unconditionally (name the pattern and the paths swept); the report records that no `prove` call was made.

A claim whose only evidence is the report's quoted command is `UNRESOLVED`; the Orchestrator's gate log is independent evidence. The Orchestrator's replay `j-collapse-mutations-4-orchestrator.log.txt` runs after you return; record its clause `UNRESOLVED` without ruling an item not met on that absence alone.

## Law

`C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `.claude/rules/typescript.md`, `names.md`, `tests.md`, `documentation.md`, `writing.md`; skill: `.agents/skills/orkestrel-falsify/SKILL.md` § Verdict shape.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape as your final message and nothing else: the checklist of items (met or not met with evidence), referrals for any judgment question, and exactly one terminal line, `VERDICT: PASS` or `VERDICT: FAIL <item numbers>; outside the claims: <finding ids>`, numbering the items in the order listed.
