# Grok checker lane — unit conform-interpret, audit round 2

Read-only. You are the mechanical conformance checker (the `checker` job routed to Cursor Grok, the first step of the tedious-work ladder): acceptance criteria, letter-of-the-law conformance on the changed files, scope honesty, and guide parity — evidence-first, one piece of evidence per item, no judgment call. A question that needs judgment becomes a referral, never a verdict. Never create, change, or delete a file; never run a command that changes the tree.

## Subject and evidence

- Audit brief: `/home/user/scaffold/tmp/units/conform/conform-interpret-audit-brief.md` — read it in full; its § Claims is the subject. Rule the checker's claims: 1, 3, 5, 7, and 9. Do not rule claims 2, 4, 6, and 8; write `not held` for each.
- The unit's brief: `/home/user/scaffold/tmp/units/conform/conform-interpret-brief.md` (§ Rows, § Fleet rows, § Scope).
- The writer's report: `/home/user/scaffold/tmp/units/conform/conform-interpret-report.md`.
- Evidence: `/home/user/work/evidence/conform-interpret.diff` and `/home/user/work/evidence/conform-interpret.status`; the proof files under `/home/user/work/evidence/interpret-proofs/`.
- The tree: `/home/user/fleet/interpret`, with the unit's uncommitted changes in place. Exclude `node_modules/**` from every sweep.
- Law: `/home/user/scaffold/AGENTS.md` and the rule files a row cites under `/home/user/scaffold/.claude/rules/`.

round 2 after fix round 1 (briefs/conform-interpret-fix1-brief.md, report-only): the round-1 checker refuted claim 3 on complete hits and the Opus objective lane ruled them absence assertions and the English adjective, permitted; the objective lane refuted claim 4 on the record (no sweep row for interpret-obj-6; the complete sweep's population and inflection pass) and the fix round added them; the tree and the diff are unchanged since round 1; brief's consumer patches for the removed complete member sit under Shared-file patches; the follow-on rows (via in tests, design §N citations, the as const fence, the stages count) are recorded, not refuted

## Method

Read the tree, not the report: a claim whose only evidence is the writer's report is `UNRESOLVED`, never `CONFIRMED`; a quoted command and exit code inside the report is the writer quoting itself. Run your own sweeps (word boundary, and case-insensitive over `-s`, `-ed`, `-ing` inflections) and name the pattern and the paths behind every sweep result, including a clean one. Read every claim against the tree as it stands; where the brief's line numbers have moved, report the current line beside them.

## Output

Per claim, in order 1 to 9: `CONFIRMED`, `REFUTED`, `UNRESOLVED`, or `NOT-EVIDENCED` for the gate reading claim 8 asks of a read-only lane (which you do not hold), or `not held` for claims 2, 4, 6, and 8 — each with `file:line` evidence or the sweep that produced it, under 120 words. Then `Findings outside the claims`, each with the exact prescription that closes it, or `none`. Then `Referrals`, each a question specifically evidenced and addressed to the Orchestrator. Then exactly one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>`. Then `Journal` (leave for the driver) and `Deviation` (any tree change your containment shows, any file you could not read).
