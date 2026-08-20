# SFIX-A: make the count ban obey itself, and close the holes the audit found

## Role and engine

Role `sol` implementer. Engine GPT-5.6 Sol, high effort, sandbox `workspace-write`, rooted at
`/home/user/scaffold`. You are the sole writer in this checkout for the duration of this unit.

## Objective

The canon change that bans the count went to publish unaudited. An objective lane has now ruled on
it and returned findings against the rule's own text, its coverage, and the canon around it. Close
them.

These files are the vendored host: `scaffold repair` delivers them to every target repository, so
what you write here becomes the standard in dozens of trees.

## Read first, in this order

1. `AGENTS.md` — in full. Its `Writing` and `Instruction files` sections are both the subject and the
   standard.
2. `.claude/rules/writing.md`
3. `.agents/orchestration.md`
4. `.claude/rules/documentation.md`

## F1, F2, F5 — the rule's own text, supplied

The rule quotes three positional references in the line that bans them, does not decide `both`, and
carries clauses that argue for itself rather than direct an agent. The replacement is settled. Put
exactly this in `AGENTS.md` § Writing, in place of the four bullets that stand there now:

```markdown
- **NEVER state a count.** A number answering "how many" about a set anyone can add to is a count — rules, rows, members, exports, files, options, steps, cases, stages, findings, and tests are such sets. Name the members, or write the sentence without the number.
- **NEVER name a list item by its position.** Write the item's name, never its ordinal or its number.
- Treat `both` as a count where it tallies a set that can grow. Keep it where the sentence names the members.
- Write a number only as a value the reader needs: a duration, a size, a limit, a version, a date, an exit code, or a measurement reported with the run that produced it.
- Delete a count you find. Do not correct it.
```

Do not reword it. If a line of it conflicts with something you find in the tree, stop and report
rather than adjusting it.

In `.claude/rules/writing.md`, the numeral row currently restates the ban and derives a consequence
from it, which drifts the moment the home changes. `AGENTS.md` § Instruction files gives a rule one
home. Replace that row's trailing clause with a bare pointer:

```markdown
- Write a numeral for a technical quantity, a version, or a measurement. Write a date as
  `YYYY-MM-DD` in evidence, commit messages, and reports. See `AGENTS.md` § Writing for what
  separates a value from a count.
```

## F5 continued — the two prohibition sites

`.agents/orchestration.md` § Permission floor and `.claude/agents/verifier.md` both carry the
git-discard prohibition with a trailing rationale. Apply the standard rather than a list: a clause
that changes what an agent does stays, and a clause that argues for the rule goes.

Keep **"Each discards a working-tree change silently"**. It names an observable property an agent
cannot infer — that the command warns nobody — and an agent that does not know it will reason its
way to an exception. Cut the rest of the rationale at both sites, including
`.claude/agents/verifier.md`'s "It is the unit under verification, not damage to repair or report."
after the directive that already says to read a dirty status as expected.

Report every clause you kept and the judgment call it changes.

## F3 — positional references survive across the canon

Each of these names an item by its position. Replace each with the item's name, or with the relation
that does not move:

- `.claude/agents/codex.md` — `second step of the tedious-work ladder`
- `.claude/agents/scout.md` — `last step of the tedious-work ladder`
- `.claude/agents/researcher.md` — the same construction
- `.claude/agents/checker.md` — the same construction
- `.agents/orchestration.md` — `second reason`, `second one`, `first`/`second`, `first step`
- `.agents/skills/enterprise-bootstrap/SKILL.md` — `rung 3`, `rung 4`, `rungs 1–3`
- `.agents/skills/enterprise-bootstrap/references/components.md` — the same construction
- `.agents/skills/enterprise-bootstrap/references/bootstrap-reference.md` — `Step 2 of 4`,
  `Last step`

The tedious-work ladder's members are Cursor Grok, then Luna, then Sonnet. Name them. `codex.md`'s
sentence about Luna, for instance, can say Luna sits between Cursor Grok and Sonnet on that ladder.

Locate each site yourself; line numbers taken earlier may have moved. Read each before editing it.
Where a position is genuinely the item's identity — an ordered procedure whose rank is what the
reader needs — say so in your report and leave it. Rule case by case and record every one you left.

`.claude/rules/quality.md`'s round value is an explicit budget, not a count. Leave it.

## F6 — stale measurements in test comments

`tests/src/core/templates.test.ts` states measurements including `29 paths`, `125 of 126`, `63`
pairs, `2015` pairs over `126` blueprints, and `30` blueprints. Each counts a set this package
extends. Replace each with the relationship the test actually asserts, derived from the constant that
owns it — `MODULE_EMITTERS` and its neighbours — so the comment cannot go stale.

## A bench fact this campaign measured, to land in the canon

`.agents/orchestration.md` § Bench laws records that a bench sandbox denies a grandchild process and
a nested install. This campaign measured a third denial in the same class: **a bench sandbox denies a
loopback listener.** A unit running `@orkestrel/mcp`'s browser and server suites inside a
`workspace-write` bench sandbox got `listen EPERM: operation not permitted` on `0.0.0.0:24678` and on
`127.0.0.1`, and neither project could collect at all. The same suites exited 0 on the host: 16 test
files, 316 tests.

Add this to the sandbox rule in § Bench laws, in that section's voice. State the trigger and the
required action: a subject needing a real local server is unmeasurable inside a bench, so the brief
names the limit before dispatch, the unit reports the reading as an observation with the exact
command, and the Orchestrator takes it on the host. Keep it subordinate to the rule that already
stands; do not restate the grandchild or nested-install denials.

## Scope

- **Owned:** `AGENTS.md`, `.claude/rules/writing.md`, `.agents/orchestration.md`,
  `.claude/agents/codex.md`, `.claude/agents/scout.md`, `.claude/agents/researcher.md`,
  `.claude/agents/checker.md`, `.claude/agents/verifier.md`,
  `.agents/skills/enterprise-bootstrap/SKILL.md`,
  `.agents/skills/enterprise-bootstrap/references/components.md`,
  `.agents/skills/enterprise-bootstrap/references/bootstrap-reference.md`,
  `tests/src/core/templates.test.ts`.
- **Off-limits:** every other file. `package.json`, `vite.config.ts`, and every `guides/*.md` are not
  yours. Do not change the version. Do not touch `.orkestrel/`. Do not write a count detector; that
  is a separate decision.

## Host conditions

- The tree is committed and clean when you start. Untracked files under `tmp/` are expected.
- This repository is the source of the vendored host. Editing these files here is correct; editing
  the same file inside a target repository is not.
- `tests/src/core/templates.test.ts` runs under the `src:core` project and needs no listener.
- The network is unavailable. Do not install or fetch.
- Do not run tree-wide `npm run format`, `npm run build`, or the whole `npm test`.

## Execution

Perform this assignment directly. Spawn nothing.

## Prohibitions

- Never run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`. Each discards a
  working-tree change silently, and this tree has no other copy of your work. To undo your own edit,
  undo exactly that edit.
- Never commit, push, install, or read a credential.
- No `any`, no `as`, no `!`, no `@ts-ignore`, no `@ts-expect-error`, no `eslint-disable`.
- State no count in anything you write, and never name a list item by its position. You are editing
  the rule that says so.

## Acceptance criteria

Close them in this order and report each command with its exit code and counts.

1. `rg -n 'rule 4|the third row|the fifth kind' AGENTS.md` returns no hit, and `AGENTS.md` § Writing
   carries the supplied text verbatim.
2. `rg -n -i 'step of the tedious-work ladder|rung [0-9]|rungs [0-9]|Step [0-9] of [0-9]' .claude/ .agents/`
   returns no hit, or every surviving hit appears in your report with the judgment that kept it.
3. `.agents/orchestration.md` § Bench laws states the loopback-listener denial.
4. `npm run lint:check` exits 0.
5. `npm run check` exits 0.
6. `npx vitest run --config vite.config.ts --project src:core tests/src/core/templates.test.ts`
   exits 0. Report its counts.
7. `npx vitest run --config vite.config.ts --project guides` exits 0. Report its counts.

## Deviation contract

Stop and report if the objective itself conflicts with what you find: expected, found, exact
evidence, done or not done, and at most one short hypothesis. An ancillary choice — a wording within
a sentence the brief did not supply, where a sentence sits in its section — is yours to decide,
record, and carry on from. The supplied rule text is not ancillary: a conflict with it stops the
unit.

## Output

Write your report to `tmp/codex/sfixa-report.md` and make it your final message too. It contains: the
files you touched and what changed in each; every positional reference you left standing with the
judgment that kept it; every rationale clause you kept with the judgment call it changes; the exact
text you added to § Bench laws; each acceptance criterion with its exit code and counts; and anything
you could not close. No process diary.
