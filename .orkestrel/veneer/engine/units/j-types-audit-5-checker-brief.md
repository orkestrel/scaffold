# J-TYPES audit round 5 — the checker's brief (the amended contracts)

## Role and lane

`checker` on Sonnet, reached as a native Claude subagent with `Read`, `Grep`, and `Glob`; mechanical conformance only. State that in your first line.

## Subject

The J-TYPES unit's round 5 in the worktree `C:/Users/mikes/WebstormProjects/veneer-types` on `unit/types` (base `55ca0cd`), uncommitted. Review evidence: the actual diff `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-types-5.diff` and the actual status `j-types-5-status.txt`; the brief `j-types-brief-5.md` (edits E13 to E18, § Scope, § Acceptance criteria); the report `j-types-report-5.md`; the worktree's `src/browser/types.ts` and `guides/veneer.md`; the Orchestrator's own runs `j-types-gates-5.log.txt` and `j-types-probe-5.log.txt`.

## Claims

Rule on claims 1, 6, and 7 of `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-types-audit-claims-5.md` and on these mechanical items, one piece of evidence each (`file:line` or the grep): the diff touches only the brief's owned files; the added lines carry no `any`, `as `, non-null `!`, `@ts-`, `eslint-disable`, `null`, `public`, `protected`, `private`, or `import`; every added property line carries `readonly`; `grep -n "\.bs\.\|hidePrevented\|clickEvent\|SanitizeOptions\|SanitizeAllowlist\|data-bs-config\|SnapshotInterface\|SnapshotTarget\|SnapshotCategory\|animation?:\|toggle?:" src/browser/types.ts` returns only `HostSnapshot*` lines; `grep -n "Sanitizer\b" src/browser/types.ts` returns no reference to the global; the guide's § Surface has exactly one row per `export` line of `src/browser/types.ts` and no row for a deleted name (`SanitizeOptions`, `SanitizeAllowlist`, the `Snapshot*` names); the § Methods tables for `HostSnapshotInterface` and `SanitizerInterface` list the same members as their interfaces; every map interface's key TSDoc carries a "Default:" sentence; every added summary opens with a third-person `-s` verb and does not name its symbol; no term `writing.md` § Substitutions bans unconditionally appears in the added prose; no new or moved file; the report's rulings each name a bounding rule. A claim whose only evidence is the report's quoted command is `UNRESOLVED`; the Orchestrator's logs named under Subject are independent evidence.

## Law

`C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `.claude/rules/typescript.md`, `names.md`, `documentation.md`, `writing.md`; E6 in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md`; skill: `.agents/skills/orkestrel-falsify/SKILL.md` § Verdict shape.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape as your final message and nothing else: verdicts on claims 1, 6, and 7 (numbered as in the claims file), the checklist of mechanical items (met or not met with evidence), referrals for any judgment question, and exactly one terminal line naming the failed claims where there are any.
