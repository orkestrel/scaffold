# Unit D4-3 — `@orkestrel/scaffold`: the vendored `surface` policy rule

## Role and engine

`sol` route: GPT-6 Astra, a `workspace-write` `codex exec` rooted at
`C:/Users/mikes/WebstormProjects/scaffold`. Perform the assignment directly and spawn nothing. You
are the sole writer in this checkout while this unit runs. D4-1 and D4-2 landed before you (their
reports are staged beside this brief).

## Objective

Add the `surface` rule to the vendored policy set so every target's `test:policy` fails when a
name the target declares — an export reachable through its `src/**` barrels, or an export of its
own `tests/setup*.ts` modules — is claimed by another package's hosted guide `## Surface` table,
under the grandfather and refusal rules the design fixed.

## Context

**Design record (binding).** `.orkestrel/campaign/plan.md` § Re-baseline 3, D4 table, rows
"Rule name", "Subject", "Comparison", "Re-exports", "Phase-in"; `D4-design-planner.md` § 2–3 and
`D4-design-astra.md` § 2–3 (the plan row picks between them). The rules: name `surface`, a
`PolicyRule` member; the sweep `inspectPolicySurface(root)` appended to `inspectPolicyWorkspace`;
the violation keeps `createPolicyViolation`'s shape with the message
`surface name belongs to one package: NAME (OWNER)`, `path` the declaring file, `line` the
declaration line, sorted by path, line, name, owner. **Subject:** the target's live barrels
through `@orkestrel/guide`'s `createSource({ files, module }).surface()` over the environments
present, where any barrel statement outside the relative star-export law is itself a `surface`
violation (population incomplete — the enumerator may never report clean over an unread row);
plus the target's own `tests/setup*.ts` exports through `extractExports`, minus the vendored setup
modules `HOST_PATHS` names. **Comparison:** every hosted guide's `## Surface` column-0 names
through `createGuide().surface()`, excluding the target's own guide (by `readPolicyPackage`);
bare-name identity, case-sensitive; environment and kind ignored; a missing hosted root or a
catalog row without a hosted guide is a `surface` violation, never a pass. **Re-exports:** no
carve-out. **Phase-in:** a subject name fires only when another package's hosted guide claims it
AND the target's own hosted guide does not (grandfather by the hosted guide); a setup-module
export is fail-closed with no grandfather. **Read paths:** a target reads
`node_modules/@orkestrel/scaffold/dist/host/guides/` (D4-1's layout; read its report for the
exact storage and manifest axis); the scaffold checkout itself reads its own `guides/` when no
installed host resolves (a base package resolves its own checkout, never an installed copy).
**Growth refusal at stage time** (the D4 plan row): `stageHost` recomputes the cross-guide
collision set of the staged guides and refuses when it exceeds the set of the previously published
host — that lives in D4-1's file (`src/server/helpers.ts`); if D4-1 did not land it, report it as
a finding for D4-1b rather than adding it here.

**The code today.** `tests/setupPolicy.ts` (`PolicyRule` union `:16-23`; `PolicyViolation`
`:31-37`; `normalizePolicyPath` `:277`; `createPolicyViolation` `:312-318`;
`POLICY_TESTS_MODULE_GLOB` `:145`; `POLICY_PROSE_EXCLUSIONS` `:239-245`; `readPolicyPackage`
`:1390-1402`; `readPolicyCatalog` `:1415-1430`; `isPolicyStray` `:1478`; `inspectPolicyWorkspace`
`:1574-1582`; physical controls `:1594`), `tests/policy.test.ts` (`:470-484`), the vendored import
law (`.claude/rules/workspace.md:77-79`; `BASE_DEV_DEPENDENCIES` in `src/core/constants.ts:511-522`
— `@orkestrel/guide`, `@orkestrel/scaffold`, `@orkestrel/test`, `typescript` are declared;
`@orkestrel/contract` is NOT, so the sweep narrows with `node:` and the vendored siblings only),
`tests/src/server/helpers.test.ts:397-463` (the import-law control), `@orkestrel/guide`'s
`createSource`, `Source.surface()`, `Source.exports()`, `extractExports`, `createGuide`,
`Guide.surface()` (`node_modules/@orkestrel/guide/dist/src/core/index.d.ts`).

**Measurements (Orchestrator).** P6: over 49 guides (5033 Surface rows) 113 names appear in more
than one guide (`.orkestrel/campaign/P6-surface-collisions.txt`) — every one grandfathered by the
hosted guides. P7: setup-module exports colliding with a guide name today, fail-closed on
adoption (`P7-setup-collisions.txt`): brief, browser, console, database, indexeddb, lsp, mcp,
middleware, ndjson, ollama, scaffold (`tests/setupServer.ts:1081 readErrorCode` — yours to see
fire in this checkout's own policy run and to report, not to fix here), sse, supervisor, test.

**Installed primitives you must reuse.** `@orkestrel/guide` (the enumerators above — no second
Markdown or TypeScript parser), `@orkestrel/test` (`createScratch` for fixture targets,
`createRecorder`, `requireValue`), `node:` modules. Read `guides/guide.md` § Surface and
`guides/test.md` § Surface first.

**Law.** `AGENTS.md`; `.claude/rules/{names,typescript,architecture,patterns,tests,workspace,
documentation,writing,quality}.md`; `.agents/orchestration.md` § "Publishing the fleet".

**Host and bench.** As D4-1. `npm.cmd run test:policy` runs the vendored gate on this checkout
itself — expect the scaffold setup collision (P7) to fire; that reading is an observation for the
report and a finding for U14-scaffold, not a criterion.

**Standing conditions.** Dirty with the rule edits, D4-1, D4-2, `.orkestrel/`, and the mirrored
`guides/supervisor.md`. Do not bump `version`; add no package.

## Scope

**Owned.** `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/setupPolicy.test.ts` (scaffold's
own proof of the vendored module, if it exists — else the policy proof), fixture targets under
`tests/fixtures/**` as the physical controls need, `guides/scaffold.md` (the policy section's
sentence naming the rule and Surface rows for new exports). **Off-limits.** `src/**`, `configs/**`,
`.claude/**`, `.agents/**`, `.orkestrel/**`, `host.json`, `package.json`, `package-lock.json`.

## Execution

TTTDD. Physical controls, each a test named for what it proves, run through the production
workspace route with a scratch target that has a hosted guide root present:

- a planted barrel collision (a `src/core/index.ts` star-exporting a module declaring a name another
  hosted guide claims and the target's own hosted guide does not) → one `surface` violation with
  the message form;
- a planted `tests/setupServer.ts` export colliding with a hosted name → one violation, even when
  the target's own hosted guide claims the name (no grandfather for setup);
- the target's own grandfathered name (claimed by its own hosted guide) → none;
- a vendored `tests/setupPolicy.ts` export → none;
- a barrel row outside the star-export law → one violation naming the incomplete population;
- no hosted guide root and incomplete own-`guides/` coverage → one violation naming the missing
  evidence;
- the scaffold checkout's own read path (no installed host) → reads `guides/`;
- ordering and normalization of paths in the output.

## Output

Final message: touched files; `git diff --stat`, `git status --porcelain` (labelled); baseline
readings; per control the test title and its red-then-green command with counts; this checkout's
own `test:policy` reading after the rule (the expected P7 hit named); acceptance commands with
exit codes; deviation state.

## Deviation contract

Stop and report on: a `src/**` change you need; `createSource` unable to read a fixture barrel
for a reason the barrel law does not cover; the hosted root layout differing from D4-1's report.
Decide, record, carry on for message wording and fixture layout.

## Acceptance criteria

1. `npm.cmd run lint:check`, `npm.cmd run check` exit 0.
2. `npm.cmd run test:policy` on the scratch targets (the physical controls) exit 0 with every
   control red first; this checkout's own `test:policy` reading reported (red on the P7 hit is
   expected and is not a criterion).
3. `npm.cmd run test:guides`, `npm.cmd run format:check` exit 0.
4. Only owned files changed beyond the inherited state.
