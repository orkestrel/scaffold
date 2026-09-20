# U6 audit round 1 — objective lane brief (reviewer, native Opus 5)

Retained after the fact on 2026-09-20: this is the dispatch text as sent through the harness's
Agent tool, written to disk on the Orchestrator's own retention audit. The lane's report is
`u6-audit-reviewer-report.md`; the claims file is `../u6-audit-claims.md`.

---

Role `reviewer` on native Opus 5 (clean context). You hold the OBJECTIVE lane (correctness,
constraints, what the code and contracts actually permit) of an audit round on unit U6 of the
Veneer campaign, which GPT Astra wrote in the Test checkout. Perform the assignment directly and
spawn nothing. You edit nothing; you have no write tools.

Read, in this order, before ruling:
1. `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`, then `.claude/rules/tests.md`,
   `typescript.md`, `names.md`, `architecture.md`, `browser.md`, `documentation.md`, `writing.md`
   under `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/`.
2. The claims file `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u6-audit-claims.md` (13
   numbered falsifiable claims). It is the audit's subject.
3. The actual diff `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u6-diff.patch.txt` (the working
   tree of `C:/Users/mikes/WebstormProjects/test` at HEAD `f49bc7f` plus the uncommitted U6
   changes; read the live files there too — `src/browser/helpers.ts`, `src/browser/types.ts`,
   `src/browser/constants.ts`, `tests/src/browser/helpers.test.ts`, `tests/setup.ts`,
   `guides/test.md`).
4. The unit's reports `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u6-report.md` and
   `u6-report-2.md`, and the control logs beside them (`u6-plant-*-red.log`,
   `u6-browser-green.log`; they are UTF-16 PowerShell transcripts, read them as text).
5. The design the unit implements:
   `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u6-design-planner-report.md`
   as amended by `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u6-design-verdict.md`
   (the verdict wins where they disagree).

Rule on every claim 1 to 13 with `CONFIRMED`, `REFUTED`, or `UNDECIDABLE` and the deciding evidence
(`file:line` or exact quoted text). Judge against the code and the diff, never against the report
alone. Look especially for: a refusal that can be reached with the wrong message; a computation the
`:active` read-back cannot catch; a leak of pointer or media state across cases; a `pseudo` path
that reads the element instead of refusing; a payload that clears an axis the caller did not name;
a nested function, a hidden helper, a type assertion, a non-null assertion, or an `any`; a guide
`Summary` cell that differs from its TSDoc description paragraph; a Patterns fence whose
transcribed case asserts something weaker than the fence shows. Add extra findings no claim
names, numbered from 14, each with a site and a one-line failure scenario.

Output: a table `Claim | Verdict | Evidence` for claims 1 to 13; a numbered list of extra findings
(or the words "none found"); then exactly one terminal line: `Verdict: accept` or `Verdict: fix
round` followed by the claim numbers that force it. No process diary.
