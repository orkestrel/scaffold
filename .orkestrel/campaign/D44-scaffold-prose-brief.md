# Unit D4-4 — `@orkestrel/scaffold`: the prose for the hosted guides, the `catalog` floor, and the `surface` rule

## Role and engine

`implementer` on Opus 5, a native Claude subagent (tools: Read, Grep, Glob, Edit, Write, Bash).
Perform the assignment directly and spawn nothing. You are the sole writer in the
`C:/Users/mikes/WebstormProjects/scaffold` checkout while this unit runs. D4-1, D4-2, and D4-3
landed before you (their reports are under `.orkestrel/campaign/`).

## Objective

State the landed mechanisms where their readers meet them: the fleet name-ownership rules in
`.claude/rules/names.md`; the `surface` rule in `.claude/rules/workspace.md` § Policy instruments;
the hosted guide set, the `catalog` floor and partial operation, the `audit` question, and the
`surface` rule in `guides/scaffold.md`; the "every guide is hosted" sentence in `guides/README.md`
§ Line reference; guide parity green.

## Context

**Design record (binding).** `.orkestrel/campaign/plan.md` § Re-baseline 3, D4 table (every
row); the resolution rules: R1 reuse beats rename; R2 the subject keeps the name and the other
names what its thing is (`createChannel` stays agent's, test's console recorder is renamed;
`isRecord` stays contract's, msg's states its broader contract); R3 extract a shared package only
on an equivalence proof and an authorized dependency change, otherwise qualify; R4 no accept path.
The lane reports `D4-design-planner.md` § 4 and `D4-design-astra.md` § 4 (the plan row picks).
The landed code: D4-1, D4-2, D4-3 reports and their diffs (read what shipped; write only what the
code earns — `.claude/rules/documentation.md` "Re-read the prose last").

**The files.** `.claude/rules/names.md` (add `## Fleet name ownership` with R1–R4 as directives —
instruction-file voice per `AGENTS.md` § Instruction files: every line a directive, no history, no
persuasion); `.claude/rules/workspace.md` § Policy instruments (the `surface` rule: subject,
comparison, grandfather, setup fail-closed, read paths, what a target may not do — never edit the
vendored policy; rename or reuse); `guides/scaffold.md` (the host section: `REFERENCE_PATHS`, the
hosted guide root, the stage refusal; the `catalog` section: the floor, `'floor'` provenance,
`EXIT_DRIFT`, the partial operation and its `note`; the `audit` section: the `Question`; the
policy section: the `surface` rule; Surface rows already added by D4-1..3 stay); `guides/README.md`
§ Line reference (the host carries every guide; `catalog` refreshes from `main` and falls back to
the host offline); `tests/guides.test.ts` (only if a fence you author needs an executed
transcription).

**Law.** `AGENTS.md` § Writing and § Instruction files; `.claude/rules/writing.md`;
`.claude/rules/documentation.md`; `.claude/rules/names.md` (its own conventions).

**Host.** Windows 11, Git Bash. `npm run test:guides`, `npm run test:policy` run here (the
policy sweep reads every authored Markdown file for banned terms — run it).

**Standing conditions.** Dirty with the Orchestrator's earlier edits to `.claude/rules/tests.md`
and `.agents/templates/brief.md` (leave them), D4-1..3, `.orkestrel/`, the mirrored
`guides/supervisor.md`. Do not bump `version`; add no package. `.claude/rules/*` and
`.agents/**` are the canon this checkout publishes — you may edit `names.md` and `workspace.md`
here because this is the canon's home, not a target.

## Scope

**Owned.** `.claude/rules/names.md`, `.claude/rules/workspace.md`, `guides/scaffold.md`,
`guides/README.md`, `tests/guides.test.ts` (transcriptions only). **Off-limits.** `src/**`,
`tests/setupPolicy.ts`, `tests/policy.test.ts`, `host.json`, `.claude/rules/tests.md`,
`.agents/**`, `.orkestrel/**`, `package.json`.

## Output

Final message: touched files with the sections added or changed; `git diff --stat`; the
`test:guides` and `test:policy` readings; deviation state.

## Deviation contract

Stop and report on: a landed behaviour the code contradicts (report it for a fix unit; do not
document the intended behaviour); a rule sentence that would restate a rule already homed
elsewhere (name the home). Decide, record, carry on for section placement and wording.

## Acceptance criteria

1. `npm run test:guides` exit 0; `npm run test:policy` exit 0 on the prose sweep (the `surface`
   rule's own reading on this checkout is reported separately).
2. `npm run format:check` exit 0.
3. `names.md` § Fleet name ownership carries R1–R4 as directives; `workspace.md` § Policy
   instruments names the `surface` rule and what a target does when it fires.
4. Only owned files changed beyond the inherited state.

## Amendment 2026-09-15 (before the first launch; the sections above stay as written)

- **Landed since this brief was drafted.** U14 and U14b renamed the setup helper
  `readErrorCode` → `captureScaffoldCode` (no prose owed). D4-1c added the stage-time growth
  refusal, and D4-1d/D4-1e moved its baseline to the committed inventory: `HostManifest.surface`
  records the collision set (collisions only, sorted, covered by the manifest digest),
  `readSurfaceBaseline` reads it, `HostStageOptions.inventory` names the inventory (default
  `INVENTORY_NAME`, `'host.json'`), an absent inventory establishes the baseline, and an inventory
  whose `surface` is missing or malformed is refused rather than reset. Read the D4-1c and D4-1e
  reports (`.orkestrel/campaign/D41c-scaffold-growth-refusal-report.md`,
  `D41e-scaffold-inventory-baseline-report.md`) and the code before writing the host section; the
  Surface rows those units added stay.
- **Acceptance criterion 1 tightens.** `npm run test:policy` exit 0 outright: the `surface` rule's
  own reading on this checkout is green since U14b.
- **Standing conditions.** Add U14, U14b, D4-1c, D4-1e to the dirty set; `host.json` carries the
  seeded `surface` and is regenerated by the Orchestrator's build after you exit.
- **Off-limits addition.** `src/server/**` stays off-limits; a behaviour the code contradicts is a
  deviation report, never a source edit.
