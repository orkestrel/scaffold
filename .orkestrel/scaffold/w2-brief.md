# Unit W2 — fixture shadows, the vendored policy re-scope, and the canon-family proof

## Role and engine

`implementer` on Opus 5, a native subagent, the sole serial writer (recorded substitution: the
Codex bench is dark, so this unit runs on Opus instead of Sol).

## Objective

Land the shared-file patches W1 validated, re-scope the vendored policy suite so it binds where
the canon trees exist and passes where they are absent, and pin the canon family through the
committed inventory — so the server, bin, and policy projects are green.

## Context

**Law.** `AGENTS.md`; `.claude/rules/names.md`, `typescript.md`, `architecture.md`, `patterns.md`,
`tests.md`, `workspace.md`, `portability.md`, `writing.md`, `quality.md`. Skill: none. Guide:
`guides/scaffold.md`. The reconciled plan is `.orkestrel/scaffold/plan.md`; the predecessor unit's
report is `.orkestrel/scaffold/w1-report.md` — read both whole before editing. The baseline is the
committed tree at `8f5c20d`, which carries W1's canon split.

**Evidence, from W1's validated run in a checkout copy (see its report for the full record).**

- `tests/setupServer.ts` `createCheckout` and `buildCheckoutManifest` walk `HOST_PATHS` alone, so
  the fixture checkout lacks the canon and the union-walking `stageHost` refuses it
  (`ScaffoldError: The checkout does not carry every vendored path`). W1's report carries the
  exact validated patch: a `STAGED_PATHS` export (`[...HOST_PATHS, ...CANON_PATHS]`) that the two
  stager fixtures read.
- **`buildFleetManifest` must keep walking `HOST_PATHS`.** Walking the union there was measured to
  break the `FLEET_ARTIFACT_COUNT` expectation in `tests/src/bin/CLI.test.ts` — a canon entry
  inflates the count against a plan that claims no canon path.
- `tests/src/server/Materializer.test.ts:661` fails `ENOENT .claude/rules/sample.md`, and the
  byte-drift witness must move to a host-origin path (`.claude/settings.json`) with the missing
  and foreign witnesses moved to `.cursor/rules/` — `buildCompiledPlan()` now plans `AGENTS.md` as
  a content-owned template artifact, so the pure-compiler audit reports its drift and an
  `'aligned'` expectation there reverses. W1's report carries the full validated patch.
- `tests/distribution.test.ts:280-289` — the `stages exactly the declared vendored host inventory`
  case walks `HOST_PATHS` in both containment directions; the reverse loop reports every canon
  destination as undeclared. The fix is the union in both loops, `expanded` unchanged.
- The vendored `tests/policy.test.ts` holds two assertions that fail in a canon-absent target,
  verified by the Orchestrator: `:347-351` requires `readSkillFamily(process.cwd())` non-empty and
  containing `orkestrel-falsify`; `:493-497` requires `readPolicyPaths(process.cwd())` to contain
  `.claude/rules/names.md`. Every inspector already passes on absence: `readPolicyDirectories`
  returns `[]` for an absent root (`tests/setupPolicy.ts:1033-1034`), and `inspectPolicyRuleMap`
  returns `[]` when `.claude/rules` does not resolve.
- `POLICY_PORTABILITY_GLOB` (`tests/setupPolicy.ts:272-277`) has the branches
  `{src,app,configs,tests,scripts,guides}/**/*`, `{.agents,.claude,.codex,.cursor,.github}/**/*`,
  `*`, and `.*`. `.claude/settings.json` stays vendored in every target and covers the harness
  branch.
- The committed `host.json` records each staged file as `storage`/`destination`/`executable`/
  `digest`; the canon family stages under storage names with the leading dot stripped per segment
  (`agents/skills/orkestrel-falsify/SKILL.md`, `claude/rules/names.md`).
- The vendored-file import law (`.claude/rules/tests.md` § Shared test infrastructure): the
  vendored test set keeps helpers within itself and imports nothing from `@orkestrel/test`.

**Host.** POSIX shell at `/home/user/scaffold`. Clean committed baseline at `8f5c20d`. Node and
npm installed.

**Measurements, taken in this container at the baseline.** `test:src:core` green.
`test:src:server` red only through the shared fixtures this unit repairs. `test:policy` green in
scaffold today.

**Control identifiers.** None. Name every test for what it proves.

**Standing conditions.** `tests/src/bin/main.test.ts` has failing cases that drive the built
executable at `dist/bin/main.js`; `dist/` is absent in this container until `npm run build` runs,
which this unit must not do. Those failures are the Orchestrator's to settle after integration —
do not diagnose or touch them. `tmp/` and `.orkestrel/` are campaign records; read them, never
edit them. The `prove` tool is unavailable this session; use fallback probes per
`.claude/rules/tests.md` § Probes where needed, with controls, and delete or promote them.

## The changes

1. **`tests/setupServer.ts`** — apply W1's validated patch: add the exported, documented
   `STAGED_PATHS` list and point `createCheckout` and `buildCheckoutManifest` at it.
   `buildFleetManifest` stays on `HOST_PATHS`. Keep the patch's shape; you own the TSDoc wording.
2. **`tests/src/server/Materializer.test.ts`** — apply W1's validated patch: the byte-drift
   witness moves to `.claude/settings.json`, the missing and foreign witnesses move to
   `.cursor/rules/`, and the compiler-audit expectations follow.
3. **`tests/distribution.test.ts`** — the declared-inventory case walks the union in both
   containment loops; `expanded` stays as it is.
4. **`tests/policy.test.ts`** — re-scope the two membership assertions without weakening any
   inspector:
   - The skill-family case asserts the relationship: `readSkillFamily(process.cwd())` returns a
     non-empty list exactly when the `.agents/skills` root holds at least one subdirectory, read
     directly with `node:fs` — a second mechanism that can disagree with the function under test.
     It binds in scaffold and passes in a canon-absent target. Drop the `orkestrel-falsify`
     literal from this vendored file; the scaffold-side proof in change item 5 carries it.
   - The path-population case swaps the witness `.claude/rules/names.md` for
     `.claude/settings.json`; the other witnesses stay.
   - Add one case proving the vendored suite's shape claim: build a scratch workspace under
     `node:os` `tmpdir()` shaped like a post-migration target — the pointer-shaped `AGENTS.md`
     and `CLAUDE.md`, `.claude/settings.json`, a `.claude/agents/orkestrel.md` file, a
     `package.json`, no `.agents/`, no `.claude/rules`, no `.claude/skills` — and assert
     `inspectPolicyWorkspace` reports no violation there. Pair it with the negative control that
     the same workspace with one violation planted (a canonical skill directory present while the
     bridge side is absent) reports the twin-directory violation. Remove the scratch directory in
     cleanup that runs on failure too.
5. **`tests/src/server/helpers.test.ts`** — add the canon-family proof: the committed `host.json`
   carries entries whose storage names include `agents/skills/orkestrel-falsify/SKILL.md` and
   `claude/rules/names.md`. This binds scaffold's own trees through the inventory the config
   proof already holds equal to a fresh stage, and it proves the published fallback delivers the
   family. Pair it with a negative control drawn from outside the staged population
   (`.claude/settings.local.json` has no entry).

## Unknowns

None the changes depend on. Where a patch from W1's report does not apply cleanly against
`8f5c20d`, that is a deviation — stop and report the exact hunk.

## Scope

**Owned.** `tests/setupServer.ts`, `tests/src/server/Materializer.test.ts`,
`tests/src/server/helpers.test.ts`, `tests/distribution.test.ts`, `tests/policy.test.ts`.

**Shared (report-only).** `tests/setupPolicy.ts` — no inspector change is required; if you find
one is, stop and report it with the exact violation rather than editing. `tests/src/bin/CLI.test.ts`
— W1 landed its cases; if a change of yours breaks one, report the exact patch.

**Off-limits.** Everything under `src/`, `host.json`, `AGENTS.md`, `CLAUDE.md`, `.agents/**`,
`.claude/**`, `.codex/**`, `.cursor/**`, `guides/**`, `README.md`, `ROADMAP.md`, `PROPOSAL.md`,
`package.json`, `vite.config.ts`, `tsconfig.json`, `.orkestrel/**`, secrets.

**What asserts the state this change ends.** The failing set at baseline: the fixture-raised
failures in `tests/src/server/helpers.test.ts`, the Materializer case at `:661`, and the
distribution declared-inventory case. Derive the rest by running the named projects; anything
outside owned files is a report, not an edit.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. Run only `npm run check`,
`npm run test:src:core`, `test:src:server`, `test:src:bin`, `test:policy`, and single-file vitest
runs. No `build`, no tree-wide `format` or `lint --fix`, no commit, push, or dependency change, no
`git checkout`, `restore`, `stash`, `reset`, or `clean`.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

Return: touched files with one-line summaries; the failing-first record for each new assertion
(command, red count, green count) — for the repairs, the baseline red counts from W1's report
stand as the red half; scoped validation evidence per command with exit status; any shared-file
patch; deviation state. Write the same content to `tmp/units/w2-report.md`. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, one short hypothesis — when a
W1 patch does not apply, when an inspector change appears required, or when a failure outside the
owned files appears. Decide and record yourself: TSDoc wording, test names, assertion phrasing,
scratch-workspace layout details beyond the members the brief names.

## Acceptance criteria

1. `npm run test:policy` exits 0.
2. `npm run test:src:server` exits 0.
3. `npm run test:src:core` exits 0.
4. `npm run test:src:bin` reports no failure outside the two build-dependent
   `tests/src/bin/main.test.ts` cases the standing conditions name.
5. `git status --porcelain` shows changes only in owned files; `git diff --exit-code host.json`
   exits 0.

**Observations, not criteria.** The full `npm test`, `npm run build`, and `test:distribution` —
the Orchestrator runs them after integration; report nothing about them.

## Review evidence

The subject is a code change: supply the actual diff and the actual status output in the report.
