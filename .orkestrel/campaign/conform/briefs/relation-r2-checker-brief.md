# Grok checker lane — unit conform-relation, audit round 2

Read-only. You are the mechanical conformance checker (the `checker` job routed to Cursor Grok, the first step of the tedious-work ladder): acceptance criteria, letter-of-the-law conformance on the changed files, scope honesty, and guide parity — evidence-first, one piece of evidence per item, no judgment call. A question that needs judgment becomes a referral, never a verdict. Never create, change, or delete a file; never run a command that changes the tree.

## Subject and evidence

- Audit brief: `/home/user/scaffold/tmp/units/conform/conform-relation-audit-brief.md` — read it in full; its § Claims is the subject. Rule the checker's claims: 1, 3, 5, 7, and 9. Do not rule claims 2, 4, 6, and 8; write `not held` for each.
- The unit's brief: `/home/user/scaffold/tmp/units/conform/conform-relation-brief.md` (§ Rows, § Fleet rows, § Scope).
- The writer's report: `/home/user/scaffold/tmp/units/conform/conform-relation-report.md`.
- Evidence: `/home/user/work/evidence/conform-relation.diff` and `/home/user/work/evidence/conform-relation.status`; the proof files under `/home/user/work/evidence/relation-proofs/`.
- The tree: `/home/user/fleet/relation`, with the unit's uncommitted changes in place. Exclude `node_modules/**` from every sweep.
- Law: `/home/user/scaffold/AGENTS.md` and the rule files a row cites under `/home/user/scaffold/.claude/rules/`.

round 2 after fix round 1 (briefs/conform-relation-fix1-brief.md, a builder on Sonnet): the round-1 checker and objective lane held every tree claim; the objective lane found four test sites binding a parsed value as Relation without a guard (F2) and a sweep row stating a false result (F1); the fix round bound the three parses unknown, replaced the wrong-typed-member throw case with guard refusals (the signature admits no wrong-typed member) and an empty-descriptor throw case, dropped the unused Relation import, planted the guard's member-type check out and captured red and green under relation-proofs/fix1-guard-*.txt with src/core/validators.ts restored byte for byte, and rewrote the § sweep row; read the report's Fix round 1 section against the diff and confirm src/core/validators.ts carries only the unit's own change; F3 (guarantee) is the relation-prose follow-on, recorded, not refuted

## Method

Read the tree, not the report: a claim whose only evidence is the writer's report is `UNRESOLVED`, never `CONFIRMED`; a quoted command and exit code inside the report is the writer quoting itself. Run your own sweeps (word boundary, and case-insensitive over `-s`, `-ed`, `-ing` inflections) and name the pattern and the paths behind every sweep result, including a clean one. Read every claim against the tree as it stands; where the brief's line numbers have moved, report the current line beside them.

## Output

Per claim, in order 1 to 9: `CONFIRMED`, `REFUTED`, `UNRESOLVED`, or `NOT-EVIDENCED` for the gate reading claim 8 asks of a read-only lane (which you do not hold), or `not held` for claims 2, 4, 6, and 8 — each with `file:line` evidence or the sweep that produced it, under 120 words. Then `Findings outside the claims`, each with the exact prescription that closes it, or `none`. Then `Referrals`, each a question specifically evidenced and addressed to the Orchestrator. Then exactly one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>`. Then `Journal` (leave for the driver) and `Deviation` (any tree change your containment shows, any file you could not read).
