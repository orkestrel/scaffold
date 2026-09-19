# Unit S2-4 — fix round for the skill API-existence sweep

## Role and engine

`opus` on Opus 5, a native Claude subagent with `Read`, `Grep`, `Glob`, `Edit`, `Write`, and `Bash`,
the sole writer in the `C:/Users/mikes/WebstormProjects/scaffold` checkout. You open this brief
yourself. The bench engine wrote rounds 2 and 3; this fix is routed to you because the bench's
file round-trip mangled a non-ASCII code point (item 7) and the fix touches that line.

## Objective

Close every finding the S2 audit carried, adopting each prescription verbatim, so the fix can be
accepted on mutation probes rather than a fresh audit round.

## Context

**Evidence.** Read, in order: `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/s2-audit-verdict.md`
(the ruling and the finding table), `s2-audit-objective-report.md` and
`s2-audit-subjective-report.md` (the lanes' evidence and prescriptions),
`s2-audit-reproduction.log.txt` and `s2-audit-vectors.test.ts.txt` (the Orchestrator's
reproduction of the sharp findings), then `tmp/codex/s2-brief-3.md` and `tmp/codex/s2-report-3.md`
for what the unit set out to do. The tree is at checkpoint `beb88af9`; `git diff 4c4edd93 --
tests/setupPolicy.ts tests/setupPolicy.test.ts tests/policy.test.ts guides/scaffold.md
.claude/rules/documentation.md` shows everything S2 landed.

Measured directly by the Orchestrator:

- `parseSync('skill.ts', "import { s2MissingValue } from '@orkestrel/test'\nconst value =\n")`
  returns one error and an empty `program.body`; `inspectSkillImports` (`tests/setupPolicy.ts:1145-1147`)
  reads `source.program.body` and ignores `source.errors`, so the fence passes.
- `readSkillExports(root, '@orkestrel/scaffold')` in this checkout returns `undefined`: it looks
  only under `root/node_modules/@orkestrel/scaffold`, which does not exist here. The workspace's
  own `package.json` names `@orkestrel/scaffold` and its `exports['.']` resolves to
  `./dist/src/core/index.d.ts`, which exists after `npm run build` (it exists now).
- `readSkillDeclarations(entry.d.ts)` over `export declare const VALUE: string` +
  `export { VALUE as ALIAS } from './bridge.js'`, with `bridge.d.ts` holding
  `export { VALUE } from './entry.js'`, returns `undefined`; the right reading is `['ALIAS', 'VALUE']`.
- `tests/setupPolicy.test.ts:615-616` carries `literal%20#?.ts` where the baseline `4c4edd93`
  carries `literal%20#雪.ts` (U+96EA) in both operands; it is the only non-ASCII line the diff
  removed.
- The installed `@orkestrel/guide`'s `extractFenceImports` drops a binding preceded by a comment
  inside the braces (probe output: `["WaitOptions"]` for a fence importing `waitForCondition as
  local` behind a comment and `type WaitOptions`), so the local Oxc reader stays.

**Law.** `AGENTS.md`; `.claude/rules/names.md`, `.claude/rules/typescript.md`,
`.claude/rules/architecture.md`, `.claude/rules/tests.md`, `.claude/rules/workspace.md`
(§ Configuration authority for the vendored import law, § Text integrity for item 7),
`.claude/rules/documentation.md`, `.claude/rules/quality.md` § Instruments,
`.claude/rules/writing.md`. Skill: none. Guide: `guides/scaffold.md` where it describes the sweep.

**Installed primitives.** `vite`'s `parseSync` (already imported), `@orkestrel/guide`'s
`createGuide(...).fences()` (already used), `@orkestrel/scaffold`'s `BASE_DEV_DEPENDENCIES`
(already imported). `typescript` is forbidden by `.oxlintrc.json` under `tests/**`.

**Host.** Windows 11; Bash for commands; multi-line programs go to a file under `tmp/probe/` and
run through `npm run test:probe` or `node <file>`. Write source through your editor tools, never
through a shell redirection, so no non-ASCII code point round-trips through cp1252.

**Measurements.** Baseline `beb88af9`; `git status --short` shows only the Orchestrator's
untracked `.orkestrel/campaign/` and `tmp/`. Gates over that tree, taken by the Orchestrator after
a build: lint, format, check, build, policy 107, setup 139 (3 skipped), core 421, config 173 (1
skipped), guides 23, each exit 0 (`tmp/verify/s2-summary.txt`).

**Control identifiers.** `S2-4-C1` through `S2-4-C8`. Name each test for what it proves.

**Standing conditions.** `host.json` reads stale after a vendored edit until the Orchestrator's
build; the `keeps the committed host inventory` case in `test:config` reddens for that reason
alone. Nothing else is known to fail.

## Unknowns

- **How a named re-export through a cycle is read soundly.** The prescription is the expected
  inventory (`['ALIAS', 'VALUE']`), not the mechanism. Settle it so that a name re-exported from an
  ancestor resolves against that ancestor's own local declarations (what it declares, not what it
  re-exports), and a star cycle still contributes nothing; record the rule in the reader's TSDoc.

## Scope

**Owned.** `tests/setupPolicy.ts`, `tests/setupPolicy.test.ts`, `tests/policy.test.ts`,
`guides/scaffold.md` (the sweep passage), `.claude/rules/documentation.md` (§ Workflow skills, the
two sentences S2 added).

**Shared (report-only).** None.

**Off-limits.** Everything else: `src/**`, `tests/config.test.ts`, `tests/src/**`, `.agents/**`,
`.claude/agents/**`, `.claude/skills/**`, other `.claude/rules/*`, `configs/**`, `vite.config.ts`,
`package.json`, `host.json`, `dist/**`, `ROADMAP.md`, other `guides/*.md`.

**What asserts the state this change ends.** `tests/policy.test.ts` (control loop),
`tests/setupPolicy.test.ts` (reader proofs), the guide passage through `tests/guides.test.ts`.

**Tools and limits.** All of your tools. No commit, push, install, or `git checkout`,
`git restore`, `git stash`, `git reset`, `git clean`. `npm run lint` then `npm run format` before
the checks are permitted (no other writer is live in this checkout).

## Execution

A native subagent, or a bench engine reading this brief inside its own CLI: perform the assignment
directly and spawn nothing.

## The items

1. **Unparseable fence.** When a fence's `parseSync` reports errors and the fence's code mentions
   `@orkestrel/`, refuse it with a violation naming the skill file and the first error's message
   (`skill fence could not be parsed: <message>`); a fence with errors that mentions no
   `@orkestrel/` specifier stays outside the sweep. State it in the reader's TSDoc and the guide
   passage. Mutation probe: remove the error check and the `S2-4-C1` case reddens.
2. **The workspace's own package.** In `readSkillExports`, before the `node_modules` lookup, read
   `<root>/package.json`; when its `name` equals the specifier's package segment, resolve the
   exports map against `<root>`. Everything after is unchanged. Probe: `readSkillExports(root,
   '@orkestrel/scaffold')` in this checkout lists `BASE_DEV_DEPENDENCIES`; a fence importing it
   yields no violation (`S2-4-C2`).
3. **Named re-export through a cycle.** Per the unknown above; the fixture from the reproduction
   returns `['ALIAS', 'VALUE']` (`S2-4-C3`), and the existing star-cycle fixture still returns
   nothing for the cycle.
4. **Distinct messages.** Give each `undefined` cause its own sentence: an absent or unreadable
   package (`has no installed package`), an exports key the map lacks or maps through an unsupported
   form (`has no declaration entry for <key>`), a declaration target that does not exist, a parse
   error in the declaration, and a refused declaration form (naming the form). Route them by
   returning a discriminated reading from the reader rather than `undefined` for every cause
   (`AGENTS.md` § Design laws: named discriminants; absence is `undefined` only where nothing is
   known). Correct the guide's refusal list to include the unresolvable relative target, the
   re-exported name the target lacks, and the syntax error, and to name the wildcard exports key as
   a refused form. `S2-4-C4`: a fixture per cause asserts its own sentence.
5. **A control the sweep's absence would redden.** Beside the acceptance control (kept as the
   false-positive guard), add a control identical to it except that one binding in the same fence
   is planted absent, asserting exactly that violation (`S2-4-C5`). Record the red by disabling the
   sweep's call site once, not by mutating the reader.
6. **The refusal inventory.** Add `'export declare const value: string\nexport { value as default }'`
   and `'export declare namespace Vocabulary { }'` to `SKILL_DECLARATION_REFUSALS`; drop
   `FunctionDeclaration` from the read union unless you give it a fixture; rewrite the constant's
   TSDoc to say it enumerates the refusals a declaration file can carry (`S2-4-C6`).
7. **The code point.** Restore U+96EA in both operands of `tests/setupPolicy.test.ts:615-616` by
   editing the line through your editor tool, then prove it with a code-point dump of that line
   (`node -e` reading the file and printing each code point above 0x7F) recorded in the report
   (`S2-4-C7`), and sweep `git diff 4c4edd93` for any `-` line carrying a code point above 0x7F
   whose `+` counterpart does not.
8. **One home for the obligation.** Keep "put every taught symbol in a named import inside a
   Markdown fence" and "import only base-set packages in those fences" in
   `.claude/rules/documentation.md`; rewrite the guide passage and the readers' TSDoc to describe
   what the sweep reads and refuses (mechanism and coverage) without restating the author's
   obligation (`S2-4-C8`: a grep for the obligation's wording matches the rule file alone).

## Output

Write `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/s2-report-4.md` and return its path as
your final message: each item with the change, the control, and its red-then-green counts; the
mutation probe per prescription with the command and the reading; the code-point dump; every gate
command with exit code and totals; the claims you flag as least certain. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, one hypothesis at most —
where a prescription cannot be adopted as written (say why and what you would do instead; do not
do it). Decide, record, and carry on on: message wording within the shape item 4 fixes, the
discriminant's name, fixture contents, TSDoc wording.

## Acceptance criteria

1. `npm run check` exits 0.
2. `npm run format:check` and `npm run lint:check` exit 0.
3. `npm run test:setup` exits 0 with `S2-4-C3`, `S2-4-C4`, `S2-4-C6`, and `S2-4-C7`'s neighbour
   proof (the normalizer case) green, and the mutation probes recorded.
4. `npm run test:policy` exits 0 with `S2-4-C1`, `S2-4-C2`, `S2-4-C5` green and every earlier
   control unchanged; the real skill family passes.
5. `npm run test:guides` exits 0.
6. `git diff 4c4edd93 -- tests/setupPolicy.test.ts` removes no line carrying a code point above
   0x7F that its replacement lacks (`S2-4-C7`), and `S2-4-C8`'s grep matches the rule file alone.

**Observations, not criteria.** `npm run test:config` (the inventory case), the whole `npm test`
chain.

## Review evidence

The Orchestrator takes `git diff` and `git status --short` after you return and runs its own
reproduction probe over the fixed tree.
