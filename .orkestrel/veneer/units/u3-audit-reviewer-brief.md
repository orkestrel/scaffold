# U3 audit round 1 — subjective lane brief (reviewer, native Opus 5)

Retained after the fact on 2026-09-20: this is the dispatch text as sent through the harness's
Agent tool, written to disk on the Orchestrator's own retention audit. The lane's report is
`u3-audit-reviewer-report.md`; the claims file is `../u3-audit-claims.md`.

---

Role `reviewer` on native Opus 5 (clean context). You hold the SUBJECTIVE lane (shape, naming,
ergonomics, guide voice, design fit, the feel the token contract presents to a consumer) of an
audit round on unit U3 of the Veneer campaign, which Opus wrote in the Veneer checkout; judge it
as a stranger would. Perform the assignment directly and spawn nothing. You edit nothing; you have
no write tools.

Read, in this order, before ruling:
1. `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`, then `.claude/rules/styles.md`,
   `names.md`, `typescript.md`, `architecture.md`, `tests.md`, `documentation.md`, `writing.md`
   under `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/`.
2. The claims file `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u3-audit-claims.md` (16
   numbered falsifiable claims). It is the audit's subject.
3. The actual diff `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u3-diff.patch.txt` (tracked
   changes, then each untracked file against `/dev/null`), and the live files in
   `C:/Users/mikes/WebstormProjects/veneer` (HEAD `b661142` plus the uncommitted U3 diff):
   `src/core/constants.ts`, `src/core/types.ts`, `src/styles/_tokens.scss`, `_theme.scss`,
   `_mixins.scss`, `index.scss`, `elements/*.scss`, `tests/setupStyles.ts`, `tests/src/styles/**`,
   `tests/src/core/index.test.ts`, `guides/tokens.md`, `guides/veneer.md`, `guides/README.md`.
4. The unit's report `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u3-report.md`.
5. The design the unit implements:
   `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u3-design-planner-report.md`
   as amended by `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u3-design-verdict.md`
   (the verdict wins), and the value sources under
   `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/research/` (`calibration.md`,
   `instruments.md`, `inventory.json`, `ledger.md`).

Rule on every claim 1 to 16 with `CONFIRMED`, `REFUTED`, or `UNDECIDABLE` and the deciding evidence
(`file:line` or exact quoted text). Judge against the code, the cascade, and the diff, never against
the report alone. Look especially for: a token name that breaks the path-is-name law or the naming
rulings (full-word radius names, Bootstrap breakpoint names, `-rgb` suffix, `base`/`subtle`/
`emphasis`/`border` tiers); a group in `TOKEN_NAMES` whose members do not belong together; a mixin
or helper name outside the layer's vocabulary; a guide table a consumer cannot read (source column
vague, value not the declared value); a recipe in `guides/tokens.md` a consumer cannot follow; a
TSDoc or guide sentence that promises more than the cascade does (the density island rule
especially); a `tests/setupStyles.ts` export that duplicates an installed `@orkestrel/test`
primitive or hides a helper; a test named for a control. Add extra findings no claim names,
numbered from 17, each with a site and a one-line failure scenario.

Output: a table `Claim | Verdict | Evidence` for claims 1 to 16; a numbered list of extra findings
(or the words "none found"); then exactly one terminal line: `Verdict: accept` or `Verdict: fix
round` followed by the claim numbers that force it. No process diary.
