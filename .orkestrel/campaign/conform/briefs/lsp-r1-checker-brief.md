# Grok checker lane — unit conform-lsp, audit round 1

Read-only. You are the mechanical conformance checker (the `checker` job routed to Cursor Grok, the first step of the tedious-work ladder): acceptance criteria, letter-of-the-law conformance on the changed files, scope honesty, and guide parity — evidence-first, one piece of evidence per item, no judgment call. A question that needs judgment becomes a referral, never a verdict. Never create, change, or delete a file; never run a command that changes the tree.

## Subject and evidence

- Audit brief: `/home/user/scaffold/tmp/units/conform/conform-lsp-audit-brief.md` — read it in full; its § Claims is the subject. Rule the checker's claims: 1, 3, 5, 7, and 9. Do not rule claims 2, 4, 6, and 8; write `not held` for each.
- The unit's brief: `/home/user/scaffold/tmp/units/conform/conform-lsp-brief.md` (§ Rows, § Fleet rows, § Scope).
- The writer's report: `/home/user/scaffold/tmp/units/conform/conform-lsp-report.md`.
- Evidence: `/home/user/work/evidence/conform-lsp.diff` and `/home/user/work/evidence/conform-lsp.status`; the proof files under `/home/user/work/evidence/lsp-proofs/`.
- The tree: `/home/user/fleet/lsp`, with the unit's uncommitted changes in place. Exclude `node_modules/**` from every sweep.
- Law: `/home/user/scaffold/AGENTS.md` and the rule files a row cites under `/home/user/scaffold/.claude/rules/`.

round 1, the first audit round; the unit was a direct Opus implementer on the closure staged 18:37 UTC (units/l3/lsp-implement-direct.md), followed by fix round 1 (briefs/conform-lsp-fix1-brief.md, a builder on Sonnet) that ran scaffold repair --groups configs on vite.config.ts because the plan generates the integration project itself (after distribution, without the unit's comment and without browser: { enabled: false }), restored package.json's development-dependency floors from a copy so the manifest diff carries only the unit's own hunks, and added tests/setup.test.ts proving tests/setup.ts's one export WORKSPACE_ROOT, after which the offline audit prints its single zero-drift line; read the report's Fix round 1 section against the diff; fleet-F1 and fleet-F2 noop with the paths and classes read; no breaking row (StdioClientTransportOptions gained two optional members); the unit's lsp-obj-6 control needed a second form (the immediate-expiry plant left the generation proofs green because they release through the file, the binding control removed the release check) and both readings are captured, which is a decision to read, not a refutation; the unit's ancillary decisions (module-scope throwing listener, drain exported beside frame, reply, and listen, the describe rename) are recorded; the whole-suite reading is the unit's own exec observation

## Method

Read the tree, not the report: a claim whose only evidence is the writer's report is `UNRESOLVED`, never `CONFIRMED`; a quoted command and exit code inside the report is the writer quoting itself. Run your own sweeps (word boundary, and case-insensitive over `-s`, `-ed`, `-ing` inflections) and name the pattern and the paths behind every sweep result, including a clean one. Read every claim against the tree as it stands; where the brief's line numbers have moved, report the current line beside them.

## Output

Per claim, in order 1 to 9: `CONFIRMED`, `REFUTED`, `UNRESOLVED`, or `NOT-EVIDENCED` for the gate reading claim 8 asks of a read-only lane (which you do not hold), or `not held` for claims 2, 4, 6, and 8 — each with `file:line` evidence or the sweep that produced it, under 120 words. Then `Findings outside the claims`, each with the exact prescription that closes it, or `none`. Then `Referrals`, each a question specifically evidenced and addressed to the Orchestrator. Then exactly one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>`. Then `Journal` (leave for the driver) and `Deviation` (any tree change your containment shows, any file you could not read).
