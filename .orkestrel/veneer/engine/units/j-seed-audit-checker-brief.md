# J-SEED audit — the checker's brief (round 1)

## Role and lane

`checker` on Sonnet, reached as a native Claude subagent with `Read`, `Grep`, and `Glob`; mechanical conformance only. State that in your first line.

## Subject

The J-SEED unit's uncommitted change in the worktree `C:/Users/mikes/WebstormProjects/veneer-seed` on `unit/seed` (base `376d84a`). Review evidence: the actual diff `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-seed.diff` and the actual status `j-seed-status.txt`; the brief `j-seed-brief.md` (its § Scope and § Acceptance criteria); the report `j-seed-report.md`.

## Claims

Rule on claims 4 and 7 of `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-seed-audit-claims.md` and on these mechanical items, one piece of evidence each (`file:line` or the grep): the diff touches only the brief's owned files; no `any`, `as`, `!`, `@ts-`, or `eslint-disable`; no `public`, `protected`, `private`, or parameter property; every doc block's first sentence opens with a third-person `-s` verb and never names the symbol; the guide sentence carries no term `writing.md` § Substitutions bans (run the substitution table over the edited sentence); no new file and no moved file; the installed-primitive probe: no helper, guard, wait, or recorder the diff adds whose job an `@orkestrel/test` or `@orkestrel/contract` export does (grep the diff for `export function|export const|export class` and compare against `node_modules/@orkestrel/test/dist/src/core/index.d.ts` and `node_modules/@orkestrel/contract/dist/src/core/index.d.ts` names). A claim whose only evidence is the report's quoted command is `UNRESOLVED`.

## Law

`C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `.claude/rules/typescript.md`, `architecture.md`, `names.md`, `tests.md`, `writing.md`; skill: `.agents/skills/orkestrel-falsify/SKILL.md` § Verdict shape.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape as your final message and nothing else: verdicts on claims 4 and 7 (numbered as in the claims file), the checklist of mechanical items (met or not met with evidence), referrals for any judgment question, and exactly one terminal line.
