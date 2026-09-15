# Unit D4-7 — `@orkestrel/scaffold`: the prose findings of audit AD4

## Role and engine

`implementer` on Opus 5, a native Claude subagent (tools: Read, Grep, Glob, Edit, Write, Bash).
Perform the assignment directly and spawn nothing. You are the sole writer in the
`C:/Users/mikes/WebstormProjects/scaffold` checkout while this unit runs. D4-5 and D4-6 landed
before you (`.orkestrel/campaign/D45-scaffold-audit-fixes-report.md`,
`D46-scaffold-shape-fixes-report.md`); read them and `AD4-audit-reviewer.md`,
`AD4-audit-analyst.md` first. Write only what the code now does.

## Carriers

1. **R4 states the invariant the code obeys (reviewer 4).** `.claude/rules/names.md` § Fleet name
   ownership, the fourth rule: the committed `host.json` baseline records the collisions that
   predate the rule and may only shrink; never widen it, never suppress the violation, never edit a
   vendored policy instrument to clear it. In `guides/scaffold.md` (near `:1465`) replace the
   "deleting the record is not a route to a wider one" sentence with what is true after D4-5: the
   release path is `npm run build`, which passes no option, so an absent inventory refuses and a
   present one is compared; `HostStageOptions.inventory` and `establish` are the API's own routes
   and a widened or re-established baseline is visible in the `host.json` diff.
2. **One home per rule (reviewer 8).** The bare-name identity definition lives whole in
   `.claude/rules/names.md` (including case sensitivity); `.claude/rules/workspace.md` § Policy
   instruments keeps the narrowed "rule id" line and the evidence-location bullet and drops the
   identity, grandfather, and closure substance (and the vendored-instrument clause that restates
   R4). The `.claude/rules/tests.md` § Condition paragraph the Orchestrator added (read the
   surface first; a name or job match is a defect whichever file declared it first) moves into
   § Shared test infrastructure and § Condition keeps only the wait-helper directive.
3. **The README is true (reviewer 8).** `guides/README.md`: the library faces reach contract,
   emitter, markdown, and template (the server face imports `@orkestrel/markdown` since D4-3);
   `@orkestrel/guide` backs the guides-parity suite, `readSurfaceCollisions` in the server face,
   and the `surface` rule in `tests/setupPolicy.ts`; the `catalog` sentence names "the mirrors"
   rather than "them"; the seed sentence points at `SEED_GUIDE_PATHS` (D4-6).
4. **The prose claims what the reflector does (analyst 8).** Where `guides/scaffold.md` (near
   `:1063`) and `workspace.md` say the `surface` rule refuses every unaccounted export, say exactly
   what D4-5 made true (the forms covered; the loud refusal for the rest), and near `:1462` the
   release distinction (carrier 1).
5. **The policy setup table (F10).** `guides/scaffold.md` near `:1071`: demote the heading to the
   level its parent sets, and replace the lede with the selection rule ("These
   `tests/setupPolicy.ts` exports implement the `surface` rule; the module's other exports are
   internal to the sweep."), or fold the table into the prose — choose and record.
6. **D4-5 and D4-6 rows.** Every Surface, option, and result row those units changed reads true
   (`test:guides` proves parity; you prove the sentences).

## Law, host, standing conditions

`AGENTS.md` § Writing and § Instruction files; `.claude/rules/writing.md`, `documentation.md`,
`names.md`. Windows 11, Git Bash; `npm run test:guides`, `npm run test:policy` (the prose sweep).
Dirty checkout with the whole chain; `.orkestrel/` and `guides/supervisor.md` untracked; `dist/`
and `host.json` from the last build (leave them; `format:check` ignores `host.json`).

## Scope

**Owned.** `.claude/rules/names.md`, `.claude/rules/workspace.md`, `.claude/rules/tests.md`,
`guides/scaffold.md`, `guides/README.md`, `tests/guides.test.ts` (transcriptions only).
**Off-limits.** `src/**`, `tests/setup*.ts`, `tests/policy.test.ts`, `host.json`, `.agents/**`,
`.orkestrel/**`, `package.json`, `package-lock.json`, `dist/**`.

## Acceptance criteria

1. `npm run test:guides` exit 0; `npm run test:policy` exit 0.
2. `npm run format:check` exit 0.
3. Only owned files changed beyond the inherited state.

## Output

D4-4's Output shape (touched files with the sections changed; `git diff --stat`; the readings;
deviation state), plus the judged-term sweep over the added lines.

## Deviation contract

Stop and report a landed behaviour the code contradicts (for a fix unit); decide and record
placement and wording yourself.
