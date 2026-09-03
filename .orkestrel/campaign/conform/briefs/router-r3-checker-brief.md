# Grok checker lane — unit conform-router, audit round 3

Read-only. You are the mechanical conformance checker (the `checker` job routed to Cursor Grok, the first step of the tedious-work ladder): acceptance criteria, letter-of-the-law conformance on the changed files, scope honesty, and guide parity — evidence-first, one piece of evidence per item, no judgment call. A question that needs judgment becomes a referral, never a verdict. Never create, change, or delete a file; never run a command that changes the tree.

## Subject and evidence

- Audit brief: `/home/user/scaffold/tmp/units/conform/conform-router-audit-brief.md` — read it in full; its § Claims is the subject. Rule the checker's claims: 1, 3, 5, 7, and 9. Do not rule claims 2, 4, 6, and 8; write `not held` for each.
- The unit's brief: `/home/user/scaffold/tmp/units/conform/conform-router-brief.md` (§ Rows, § Fleet rows, § Scope).
- The writer's report: `/home/user/scaffold/tmp/units/conform/conform-router-report.md`.
- Evidence: `/home/user/work/evidence/conform-router.diff` and `/home/user/work/evidence/conform-router.status`; the proof files under `/home/user/work/evidence/router-proofs/`.
- The tree: `/home/user/fleet/router`, with the unit's uncommitted changes in place. Exclude `node_modules/**` from every sweep.
- Law: `/home/user/scaffold/AGENTS.md` and the rule files a row cites under `/home/user/scaffold/.claude/rules/`.

round 3 after fix rounds 2 and 3 (briefs/conform-router-fix2-brief.md and -fix3-brief.md, builders on Sonnet): the round-2 objective lane failed claim 4 on a dropped permitted above and found the unit's own below pointers and a temporal once; fix round 2 rewrote them and its widened sweep (with once added) found ten more banned-sense sites, which fix round 3 rewrote (five temporal once in src and the guide, five below pointers in the tests), and the one site outside its scope, tests/setup.test.ts:20, was applied by the Orchestrator as the exact returned patch and recorded in the report; read the report's Fix round 2, Fix round 3, and Orchestrator integration sections against the diff; the offline audit's one drift row, configs/browsers.ts stale, is the vendored baseline the landing repairs; F4 (U1, U3, U6 citations) and F5 (three faces) are the router-prose follow-on, recorded, not refuted

## Method

Read the tree, not the report: a claim whose only evidence is the writer's report is `UNRESOLVED`, never `CONFIRMED`; a quoted command and exit code inside the report is the writer quoting itself. Run your own sweeps (word boundary, and case-insensitive over `-s`, `-ed`, `-ing` inflections) and name the pattern and the paths behind every sweep result, including a clean one. Read every claim against the tree as it stands; where the brief's line numbers have moved, report the current line beside them.

## Output

Per claim, in order 1 to 9: `CONFIRMED`, `REFUTED`, `UNRESOLVED`, or `NOT-EVIDENCED` for the gate reading claim 8 asks of a read-only lane (which you do not hold), or `not held` for claims 2, 4, 6, and 8 — each with `file:line` evidence or the sweep that produced it, under 120 words. Then `Findings outside the claims`, each with the exact prescription that closes it, or `none`. Then `Referrals`, each a question specifically evidenced and addressed to the Orchestrator. Then exactly one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>`. Then `Journal` (leave for the driver) and `Deviation` (any tree change your containment shows, any file you could not read).
