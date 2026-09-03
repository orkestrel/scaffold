# Grok checker lane — unit conform-workspace, audit round 1

Read-only. You are the mechanical conformance checker (the `checker` job routed to Cursor Grok, the first step of the tedious-work ladder): acceptance criteria, letter-of-the-law conformance on the changed files, scope honesty, and guide parity — evidence-first, one piece of evidence per item, no judgment call. A question that needs judgment becomes a referral, never a verdict. Never create, change, or delete a file; never run a command that changes the tree.

## Subject and evidence

- Audit brief: `/home/user/scaffold/tmp/units/conform/conform-workspace-audit-brief.md` — read it in full; its § Claims is the subject. Rule the checker's claims: 1, 3, 5, 7, and 9. Do not rule claims 2, 4, 6, and 8; write `not held` for each.
- The unit's brief: `/home/user/scaffold/tmp/units/conform/conform-workspace-brief.md` (§ Rows, § Fleet rows, § Scope).
- The writer's report: `/home/user/scaffold/tmp/units/conform/conform-workspace-report.md`.
- Evidence: `/home/user/work/evidence/conform-workspace.diff` and `/home/user/work/evidence/conform-workspace.status`; the proof files under `/home/user/work/evidence/workspace-proofs/`.
- The tree: `/home/user/fleet/workspace`, with the unit's uncommitted changes in place. Exclude `node_modules/**` from every sweep.
- Law: `/home/user/scaffold/AGENTS.md` and the rule files a row cites under `/home/user/scaffold/.claude/rules/`.

round 1, the first audit round; the unit was a direct Opus implementer dispatched fresh after the API spend-limit stop on the closure staged 18:37 UTC; fleet-F1 and fleet-F2 noop with the paths and classes read; workspace-subj-11 changes a thrown code (a ranged write to an absent path throws MISSING where 0.0.6 threw MODALITY) and widens WorkspaceErrorCode, so the breaking entry must name it and the consumer sweep over agent, toolbox, and ollama found no code branch; toolbox's two TSDoc patches (src/core/factories.ts propagation note, src/core/types.ts splice remarks) sit under Shared-file patches for toolbox's L6 unit, and the vendored guide mirrors are a re-propagation obligation at the wave; the unit's recorded ancillary decisions (TextContent and BinaryContent documented as interface because guide's computeSymbolKey keys a row by kind, template-literal case titles for vitest valid-title, oxfmt converging the guide's tables) are decisions to read against the diff, not refutations; the observations at tests/guides.test.ts:2 and :52 (a count and below pointers predating the round) are a follow-on; the whole-suite reading is the unit's own exec observation

## Method

Read the tree, not the report: a claim whose only evidence is the writer's report is `UNRESOLVED`, never `CONFIRMED`; a quoted command and exit code inside the report is the writer quoting itself. Run your own sweeps (word boundary, and case-insensitive over `-s`, `-ed`, `-ing` inflections) and name the pattern and the paths behind every sweep result, including a clean one. Read every claim against the tree as it stands; where the brief's line numbers have moved, report the current line beside them.

## Output

Per claim, in order 1 to 9: `CONFIRMED`, `REFUTED`, `UNRESOLVED`, or `NOT-EVIDENCED` for the gate reading claim 8 asks of a read-only lane (which you do not hold), or `not held` for claims 2, 4, 6, and 8 — each with `file:line` evidence or the sweep that produced it, under 120 words. Then `Findings outside the claims`, each with the exact prescription that closes it, or `none`. Then `Referrals`, each a question specifically evidenced and addressed to the Orchestrator. Then exactly one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>`. Then `Journal` (leave for the driver) and `Deviation` (any tree change your containment shows, any file you could not read).
