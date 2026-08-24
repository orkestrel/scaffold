# Unit R1-AUDIT — objective audit of the contract-edit commit

## Role and engine
`analyst` on GPT-5.6 Sol, through the journaled codex CLI per the transport contract. The driver
carries this brief across unaltered and returns the journal path and session id with the verdict.

## Objective
Attempt to refute the following numbered claims about commit `c352b21` in
`/home/user/scaffold` (subject file `.agents/orchestration.md`). Per-claim verdicts, evidence
cited, one terminal line.

## Context
- The diff: `git -C /home/user/scaffold show c352b21 -- .agents/orchestration.md`.
- The rulings the edit must implement: `/home/user/scaffold/.orkestrel/debrief/reconciliation.md`
  rulings 1, 2, 3, 4, 5, 6, 7, and 9.
- The writer's report: `/home/user/scaffold/.orkestrel/debrief/r1-contract-report.md` — a claim
  under audit, not evidence.
- Writing law: `/home/user/scaffold/AGENTS.md` § Writing and § Instruction files;
  `/home/user/scaffold/.claude/rules/writing.md`.

## Claims
1. Every ruling listed in Context has its edit present in the committed file, and the edit's
   content matches what the ruling states — not a paraphrase that drops a binding clause.
2. No law the reconciliation names as a keeper was deleted: the user-credential and
   never-substitute-a-token laws, publish serialization, the long-running-command binding, the
   catalog-derived layer order, the bump-obligation rules, and the vendored-file laws all
   survive in the committed file.
3. Each pointer the edit introduces names its exact planned path
   (`.agents/templates/brief.md`, `.agents/skills/orkestrel-debrief/references/retention.md`,
   the `orkestrel-publish` skill with `references/wave.md` and `references/window.md`), and the
   deleted procedures are not duplicated elsewhere in the committed file.
4. No file in the repository outside `dist/`, `.orkestrel/`, `tmp/`, and `node_modules/` refers
   to a section heading the commit deleted.
5. The lines the commit adds obey the writing law: directive form, no counts of growable sets,
   no banned-vocabulary hits in the banned sense.
6. In the committed file, `ledger` names only the routing or carry ledger.

## Scope
Read-only. No edits, no git state changes, no writes outside the bench journal directory.

## Execution
The engine behind the CLI performs the audit directly and spawns nothing.

## Output
Per-claim: `CONFIRMED` with the evidence that convinced you, or `BROKEN` with the exact line and
the smallest correct fix. Then exactly one terminal line: `AUDIT: PASS` or `AUDIT: FAIL`.
