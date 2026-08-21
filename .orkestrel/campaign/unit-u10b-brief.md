# Unit U10-B: the strict skill-directory inventory

## Role and engine

Role `implementer`, engine **GPT-5.6 Sol**, sandbox `workspace-write`, rooted at
`C:/Users/mikes/WebstormProjects/scaffold`. You perform the assignment directly and spawn
nothing: do the work yourself inside this session.

## Objective

Design round 3 (S10)'s second conversion: generalize the skill-directory walk from a denylist
of two filenames to an allowlist of three shapes, so no skill ships a file outside its
contract.

## Context

Authority: `AGENTS.md`; `.claude/rules/quality.md` § Instruments,
`.claude/rules/documentation.md` § Workflow skills, `.claude/rules/typescript.md`,
`.claude/rules/tests.md`, `.claude/rules/writing.md`.

`tests/setupPolicy.ts` (which unit U10-A just extended — its template-TODO rule and controls
are in the working tree; leave them) walks each discovered skill's whole directory near
`:1298-1312` and rules today only on `readme.md` and `changelog.md` by lowercased name. The
rule, fixed by the round:

- MEMBERSHIP: every regular file beneath `.agents/skills/<name>/`, for every discovered skill.
- RULE: each is exactly `SKILL.md`, `agents/openai.yaml`, or `references/<file>.md` where that
  markdown file is named by the skill's own `SKILL.md`. Anything else is a `skill` violation
  naming the path.
- The existing named-reference rule (a `references/*.md` nothing names) and the
  README/CHANGELOG messages keep their own distinct messages, so the rules stay
  distinguishable by message.
- Real-tree fact (2026-08-21): every file in the family is one of the three shapes, so the
  real tree stays green.

Controls, added in the file's control idiom:

- NEGATIVE (must red): a fixture skill carrying `scripts/run.sh` — a regular file none of the
  three shapes admit and every existing check passes.
- DISTINGUISHABILITY: a fixture whose `references/` holds a `.md` file `SKILL.md` does not
  name still reds under the EXISTING named-reference rule's message, not the new rule's.
- The existing controls (including U10-A's) all stay green.

## Scope

- Owned: `tests/setupPolicy.ts`, `tests/policy.test.ts`.
- Off-limits: everything else, including `.agents/skills/**`. Standing entries: everything
  `git status --porcelain` currently lists (U10-A's edits to these same files included) is
  standing except your additions.
- No commits, installs, publishes, or credential reads. No
  `git checkout`/`restore`/`stash`/`reset`/`clean`. The sandbox denies network. Use `npx.cmd`.

## Acceptance criteria, in this order

1. `git status --porcelain` is unchanged (both owned files already listed).
2. `npx.cmd oxfmt --config .oxfmtrc.json --check tests/setupPolicy.ts tests/policy.test.ts`
   exits 0.
3. `npx.cmd oxlint --config .oxlintrc.json --deny-warnings tests/setupPolicy.ts tests/policy.test.ts`
   exits 0.
4. `npx.cmd tsc --noEmit --project tsconfig.json` exits 0.
5. Failing-first: the negative control red before the rule lands (or with it disabled), green
   discrimination after; record both runs.
6. `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=dot --project policy`
   exits 0.

## Output

The complete diff; raw output and exit code per criterion including the failing-first pair;
any deviation. No process diary.

## Deviation contract

Stop on: the walk's shape rules colliding with an existing rule in a way messages cannot
separate; a criterion unreachable. Fixture naming and control placement are yours: decide,
record, carry on.
