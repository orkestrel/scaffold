# Unit S2 — the skill API-existence sweep and the duplicated local refusal case

## Role and engine

`sol` on the Codex bench, model `gpt-6-astra` (the owner's standing substitution for the transport's
`gpt-5.6-sol` pin), inside `codex exec` under `workspace-write` with
`-C C:/Users/mikes/WebstormProjects/scaffold`, the sole writer in the scaffold checkout, dispatched
after unit S1's tree was checkpointed. You open this brief yourself.

## Objective

Make the vendored policy sweep prove that every API a skill's fenced import names exists in the
installed package's public entry (ROADMAP 16), with its coverage and its blind spot stated, and rule
the duplicated local refusal case (ROADMAP 30) by deleting the copy the vendored proof supersedes.

## Context

**Evidence.** Read `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/design-verdict.md` first;
rulings D20 and D21 are yours. Then read S1's report at
`C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/s1-report.md` and the tree it left.

Measured directly by the Orchestrator:

- `tests/setupPolicy.ts:889-897` (`extractSkillReferences`) scans raw text for `references/*.md`
  tokens; `inspectSkill` (`:964-1064`) checks the frontmatter, the metadata token, template TODOs,
  and that each named reference resolves. Nothing reads a symbol against an installed package.
  `pressKeys` survived in the journey skill for an unknown period because of that gap
  (`git show 94200507`).
- Today no skill under `.agents/skills/` carries a fenced `import … from '@orkestrel/…'` (grep is
  empty), so the sweep's population is empty until unit S3 adds one import fence per journey
  reference; your planted controls are what prove the sweep before then.
- `tests/policy.test.ts:502-530` registers the skill cases and runs `SKILL_POLICY_CONTROLS` through
  `inspectPolicyControl`, each control a `PolicyControl` with in-memory `files`; read
  `SKILL_POLICY_CONTROLS` (`tests/setupPolicy.ts:2123`) for the shape.
- `tests/setupPolicy.ts` is vendored byte-identical to every workspace, so it may import only
  `node:` modules and packages `BASE_DEV_DEPENDENCIES` declares (`.claude/rules/workspace.md`
  § Configuration authority); `typescript` and `@orkestrel/test` are both in that set
  (`src/core/constants.ts:536-540`), so the sweep may resolve declarations with the TypeScript
  API and every target has `@orkestrel/test`'s declaration entries installed. `@orkestrel/test/browser`
  imports `vitest/browser` at module scope, so the sweep must never import it — read its `.d.ts`.
- ROADMAP 30's site: `tests/src/core/compilers.test.ts` (search for "refuses the Vitest invocation
  record a project row is called with", near line 3071) duplicates the vendored
  `tests/config.test.ts` case "keeps Vitest invocation fields out of project configurations" (near
  line 395), which drives every registered factory with the same sentinel and carries the
  planted-factory control. The retired campaign record ruled: "a case proving a vendored helper's
  refusal lives in the vendored proof, because that file ships with the helper and is the only copy
  every target runs; keep a local case only where it names a discrimination the vendored case
  cannot stage."
- `.claude/rules/documentation.md` § Workflow skills already states "Verify each API a skill
  instructs an executor to call against the installed package's public entry before landing the
  instruction, and name the entry you read."
- `host.json` and `dist/host` regenerate under `npm run build`, the Orchestrator's step after you
  exit; a vendored edit leaves them stale until then.

**Law.** `AGENTS.md`; `.claude/rules/names.md`, `.claude/rules/typescript.md`,
`.claude/rules/architecture.md`, `.claude/rules/tests.md`, `.claude/rules/workspace.md`,
`.claude/rules/documentation.md`, `.claude/rules/quality.md` § Instruments,
`.claude/rules/writing.md`, `.claude/rules/portability.md`. Skill: none. Guide: none beyond the
rule files; `guides/scaffold.md` where it describes the policy sweep.

**Installed primitives.** `typescript` (declaration resolution), `@orkestrel/test` 0.0.16 and its
`package.json` `exports` map (the entries to resolve), `@orkestrel/contract`. A helper whose job an
installed export does is a defect.

**Host.** Windows 11. Your exec shell is PowerShell with script execution disabled: write
`npm.cmd run <script>`, never a `.ps1` file; multi-line programs go to a file under `tmp/probe/`.
The sandbox denies network, mounts `.git` read-only, denies a grandchild process and a listening
socket. Vitest forks run. `npm run build`, `format`, and `lint --fix` stay with the Orchestrator;
run `oxfmt --config .oxfmtrc.json --check <files>` and `oxlint --config .oxlintrc.json
--deny-warnings <files>` over your own files. The `prove` MCP tool is blocked.

**Measurements.** Take `git status --short` first (expected clean at the checkpoint the dispatch
message names, plus the Orchestrator's untracked `.orkestrel/campaign/` and `tmp/`), and the totals
of `npm.cmd run test:policy` and `npm.cmd run test:setup` at that baseline.

**Control identifiers.** `S2-C1` through `S2-C6`. Name each test for what it proves.

**Standing conditions.** `host.json` stale until the Orchestrator's build; report an inventory proof
that reddens for that reason rather than diagnosing it.

## Unknowns

- **The cheapest sound reading of an installed entry's exports.** Two shapes qualify: the TypeScript
  API (`createProgram` over the entry's `.d.ts` with `checker.getExportsOfModule`) or a `.d.ts`
  walk following `export * from` and `export { … } from`. Choose the one that resolves the
  package's real entries (`dist/src/core/index.d.ts` re-exports `./types.js`, `./constants.js`,
  `./validators.js`, `./helpers.js`, `./factories.js`) and record the probe that settled it.
- **What the sweep does with a fenced import of a package outside `BASE_DEV_DEPENDENCIES`.** A
  skill is vendored to every workspace, so a package only some workspaces carry cannot be read
  everywhere. Rule it — a violation naming the package as one the vendored skill may not import
  in a fence, or a stated skip — and record why; `S2-C4` pins whichever you rule.

## Scope

**Owned.** `tests/setupPolicy.ts`, `tests/setupPolicy.test.ts`, `tests/policy.test.ts`,
`tests/src/core/compilers.test.ts` (the deletion alone), `.claude/rules/documentation.md`
(§ Workflow skills), `guides/scaffold.md` (where it describes the sweep).

**Shared (report-only).** None.

**Off-limits.** `tests/config.test.ts` (S1 landed there; read it, change nothing),
`src/**`, `.agents/**`, `.claude/agents/**`, `.claude/skills/**`, `.claude/rules/*` other than
`documentation.md`, `.codex/**`, `.cursor/**`, `configs/**`, `vite.config.ts`, `tsconfig.json`,
`package.json`, `package-lock.json`, `host.json`, `dist/**`, `ROADMAP.md`, every `guides/*.md` other
than `scaffold.md`.

**What asserts the state this change ends.** `tests/policy.test.ts` (the skill cases and the control
loop), `tests/setupPolicy.test.ts` (unit proofs of the reader), and `tests/src/core/compilers.test.ts`
(the deleted case's neighbours). Derive by running `npm.cmd run test:policy`, `test:setup`, and
`test:src:core`.

**Tools and limits.** The exec's shell and file tools. No commit, push, install, or index-locking
git command. No tree-wide `format`, `lint --fix`, or `build`.

## Execution

A native subagent, or a bench engine reading this brief inside its own CLI: perform the assignment
directly and spawn nothing.

## The change

1. **The sweep (D20).** For every skill document `inspectSkill` reads (`SKILL.md` and each named
   reference), find every fenced code block and, inside it, every
   `import { … } from '@orkestrel/<package>'` or `'@orkestrel/<package>/<environment>'` statement,
   value and type imports alike. Resolve the specifier through the installed package's `exports`
   map under `node_modules` to its declaration entry, read that entry's exported names, and refuse
   a named binding the entry does not export with a violation naming the skill file, the specifier,
   and the binding. Never import the entry. State the coverage in the reader's TSDoc and in
   `.claude/rules/documentation.md` § Workflow skills: fenced imports are read; an identifier in
   prose or in a table cell is not, so every symbol a skill teaches goes in an import fence. Add
   `PolicyControl` entries to `SKILL_POLICY_CONTROLS` for the controls below.
2. **The duplicate (D21).** Confirm the vendored case drives every registered factory with the
   planted control; delete the local `compilers.test.ts` case; name both in the report.

## Output

Write `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/s2-report.md` and make your final message
its full text: the reading you chose and the probe that settled it; the ruling on an out-of-base
package; each control with the command, the failing count before, and the passing count after; the
deleted case and the surviving proof by name; every gate command with exit code and totals; what
you could not close; the claims you flag as least certain. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, one hypothesis at most —
where the vendored import law forbids the reading you need, where a criterion cannot close without
an off-limits file, or where the vendored `tests/config.test.ts` case does not in fact cover the
local case's population. Decide, record, and carry on on: the violation message wording, the
reader's name and signature, control fixture contents, and TSDoc.

## Acceptance criteria

1. `npm.cmd run check` exits 0.
2. `oxfmt … --check` and `oxlint … --deny-warnings` over every file you touched exit 0.
3. `npm.cmd run test:setup` exits 0 with unit proofs of the reader: the export list of
   `@orkestrel/test` and `@orkestrel/test/browser` resolves through the installed `exports` map
   and contains `waitForCondition` and `clickAccessible` respectively; a specifier with no
   installed declaration is reported as such.
4. `npm.cmd run test:policy` exits 0 and includes:
   - `S2-C1` a control skill whose fence imports an unexported value binding from
     `@orkestrel/test/browser` yields exactly one violation naming file, specifier, and binding.
   - `S2-C2` a control whose fence imports an unexported type binding (`import type`) yields the
     same shape of violation.
   - `S2-C3` a control whose fence imports existing value and type bindings from the root and the
     browser entry yields no violation.
   - `S2-C4` a control whose fence imports a package outside the base set yields the outcome you
     ruled, named in the assertion.
   - `S2-C5` a control whose violation sits in a named reference file rather than in `SKILL.md` is
     reported against that reference file.
   - The real skill family passes the sweep unchanged (no skill carries an import fence today).
5. `npm.cmd run test:src:core` exits 0 after the deletion (`S2-C6`), and `tests/config.test.ts`'s
   invocation-fields case is named in the report as the surviving proof, with the planted-factory
   control confirmed by reading it.
6. `npm.cmd run test:guides` exits 0.

**Observations, not criteria.** The whole `npm.cmd test` chain; anything that reads `host.json`.

## Review evidence

The audit lane receives `git diff` and `git status --short` taken after you return, plus your report
and S1's.
