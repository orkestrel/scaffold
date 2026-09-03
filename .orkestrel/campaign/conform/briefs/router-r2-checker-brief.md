# Grok checker lane — unit conform-router, audit round 2

Read-only. You are the mechanical conformance checker (the `checker` job routed to Cursor Grok, the first step of the tedious-work ladder): acceptance criteria, letter-of-the-law conformance on the changed files, scope honesty, and guide parity — evidence-first, one piece of evidence per item, no judgment call. A question that needs judgment becomes a referral, never a verdict. Never create, change, or delete a file; never run a command that changes the tree.

## Subject and evidence

- Audit brief: `/home/user/scaffold/tmp/units/conform/conform-router-audit-brief.md` — read it in full; its § Claims is the subject. Rule the checker's claims: 1, 3, 5, 7, and 9. Do not rule claims 2, 4, 6, and 8; write `not held` for each.
- The unit's brief: `/home/user/scaffold/tmp/units/conform/conform-router-brief.md` (§ Rows, § Fleet rows, § Scope).
- The writer's report: `/home/user/scaffold/tmp/units/conform/conform-router-report.md`.
- Evidence: `/home/user/work/evidence/conform-router.diff` and `/home/user/work/evidence/conform-router.status`; the proof files under `/home/user/work/evidence/router-proofs/`.
- The tree: `/home/user/fleet/router`, with the unit's uncommitted changes in place. Exclude `node_modules/**` from every sweep.
- Law: `/home/user/scaffold/AGENTS.md` and the rule files a row cites under `/home/user/scaffold/.claude/rules/`.

round 2 after fix round 1 (briefs/conform-router-fix1-brief.md, a builder on Sonnet): the round-1 checker refuted claim 5 and the objective lane claims 4 and 5 — dangling AGENTS §N citations no row owned across the sources, the guide, and the guides map; two missing sweep records; a below pointer at src/browser/types.ts:65; via and e.g. in the tests — and the fix round removed every citation (the cited fact stated inline or the parenthetical deleted), rewrote the pointer, replaced the test substitutions, and added the two sweep rows; the status now spans the fix round's prose sites across src, tests, and the guides; the offline audit's one drift row, configs/browsers.ts stale, is the vendored baseline the landing repairs; read the report's Fix round 1 section against the diff

## Method

Read the tree, not the report: a claim whose only evidence is the writer's report is `UNRESOLVED`, never `CONFIRMED`; a quoted command and exit code inside the report is the writer quoting itself. Run your own sweeps (word boundary, and case-insensitive over `-s`, `-ed`, `-ing` inflections) and name the pattern and the paths behind every sweep result, including a clean one. Read every claim against the tree as it stands; where the brief's line numbers have moved, report the current line beside them.

## Output

Per claim, in order 1 to 9: `CONFIRMED`, `REFUTED`, `UNRESOLVED`, or `NOT-EVIDENCED` for the gate reading claim 8 asks of a read-only lane (which you do not hold), or `not held` for claims 2, 4, 6, and 8 — each with `file:line` evidence or the sweep that produced it, under 120 words. Then `Findings outside the claims`, each with the exact prescription that closes it, or `none`. Then `Referrals`, each a question specifically evidenced and addressed to the Orchestrator. Then exactly one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>`. Then `Journal` (leave for the driver) and `Deviation` (any tree change your containment shows, any file you could not read).
