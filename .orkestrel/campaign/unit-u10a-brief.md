# Unit U10-A: the template-TODO instrument

## Role and engine

Role `implementer`, engine **GPT-5.6 Sol**, sandbox `workspace-write`, rooted at
`C:/Users/mikes/WebstormProjects/scaffold`. You perform the assignment directly and spawn
nothing: do the work yourself inside this session.

## Objective

Design round 3 (S10) converted the template-TODO sweep from review-owned to mechanical, with a
membership rule whose naive forms redded healthy references. Land the instrument in the policy
sweep with its controls.

## Context

Authority: `AGENTS.md`; `.claude/rules/quality.md` § Instruments (a negative control from
outside the covered population; coverage stated beside the result),
`.claude/rules/documentation.md` § Workflow skills (the template-TODO clause),
`.claude/rules/typescript.md`, `.claude/rules/tests.md`, `.claude/rules/writing.md`.

The instrument's home: `tests/setupPolicy.ts` carries the skill-family inspection
(`inspectSkill` near `:1179-1314`, `inspectSkillFamily` near `:1322`), its fixture controls
(`SKILL_POLICY_CONTROLS` near `:1742`), and the accepting backtick control
(`SKILL_POLICY_BACKTICKED` near `:2091`). `tests/policy.test.ts` runs the real tree
(`:345-347`) and the control loop (`:357-364`). Both files are vendored `dist/host` surface —
a change here rides scaffold's next release; that is expected and recorded.

The membership rule, fixed by the round:

- POPULATION: every `TODO` occurrence in a discovered skill's `SKILL.md` or named
  `references/*.md`, OUTSIDE an inline backtick span and OUTSIDE a fenced code block.
- A member is a violation. The rule reaches nothing else — not YAML, not this repository's
  other Markdown.

The known healthy references the naive form redded, which MUST stay green:
`.agents/skills/orkestrel-harden-package/references/research.md:40` carries a backticked
`` `TODO` `` in prose (the only `TODO` in the family), and a skill may legitimately show the
forbidden form inside a fenced block.

## The design

1. In `tests/setupPolicy.ts`: extend the skill inspection with the template-TODO rule —
   implement the backtick-span and fence exclusions as real text handling (a fence toggles on
   lines starting with the fence marker; an inline span is a matched backtick pair on one
   line), never as a regex over the raw file alone. State the rule's coverage in TSDoc: what
   the exclusions can and cannot see (an unterminated fence, a backtick inside a code span's
   language tag — name the honest limits).
2. Fixture controls, added to the existing control table in that file's own idiom:
   - NEGATIVE (must red): a fixture skill whose `SKILL.md` prose carries a bare line
     `TODO: describe the workflow` — a construct every existing check passes.
   - POSITIVE (must stay green): a fixture carrying the backticked prose form transcribed from
     `research.md:40`.
   - POSITIVE (must stay green): a fixture whose fenced code block contains `TODO:`.
3. `tests/policy.test.ts`: the control loop exercises the new controls (follow how existing
   controls register); the real-tree case must keep reporting no violation.

## Scope

- Owned: `tests/setupPolicy.ts`, `tests/policy.test.ts`.
- Off-limits: everything else, including `.agents/skills/**` (the healthy reference is
  transcribed into a fixture, never edited) and every standing-modified file.
- Standing entries, all expected, none yours: ` M .claude/rules/documentation.md`,
  ` M .claude/rules/workspace.md`, ` M ROADMAP.md`, ` M guides/scaffold.md`,
  ` M package-lock.json`, ` M package.json`, ` M src/core/compilers.ts`,
  ` M tests/setupServer.ts`, ` M tests/src/core/compilers.test.ts`,
  ` M tests/src/core/fixtures/setup-false-manifest.txt`,
  ` M tests/src/server/WriteTransaction.test.ts`, `?? .orkestrel/`.
- No commits, installs, publishes, or credential reads. No
  `git checkout`/`restore`/`stash`/`reset`/`clean`. The sandbox denies network. Use `npx.cmd`.

## Acceptance criteria, in this order

1. `git status --porcelain` adds exactly the owned files to the standing entries.
2. `npx.cmd oxfmt --config .oxfmtrc.json --check tests/setupPolicy.ts tests/policy.test.ts`
   exits 0.
3. `npx.cmd oxlint --config .oxlintrc.json --deny-warnings tests/setupPolicy.ts tests/policy.test.ts`
   exits 0.
4. `npx.cmd tsc --noEmit --project tsconfig.json` exits 0.
5. Failing-first: with the rule landed and the NEGATIVE control registered but the rule
   temporarily disabled (or before the rule lands — your choice of expression), the control
   case reds; with the rule live, the control loop passes: record both runs.
6. `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=dot --project policy`
   exits 0 — the real tree reports no violation and every control discriminates.

## Output

The complete diff; raw output and exit code per criterion including the failing-first pair;
the TSDoc coverage statement quoted; any deviation. No process diary.

## Deviation contract

Stop on: the exclusion handling requiring a Markdown parser (that is the "no second parser"
line — the fence/span handling stays the simple line discipline described, and a case it
cannot express honestly is named a limit instead); a criterion unreachable. Fixture naming and
control-table placement are yours: decide, record, carry on.
