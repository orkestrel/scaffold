# CANON — land the two writing rules, and repair every count they condemn

## Role and engine

`implementer`, Opus 5. Instruction-file voice, in the files every agent in the fleet loads. The
auditor of this unit will be GPT-5.6 Sol, which did not write it.

## Objective

Add two rules to `.claude/rules/writing.md`, and repair the nine live count defects a two-lane design
round found in this repository's own canon.

## What this closes toward

`.claude/rules/writing.md` is vendored into forty-four packages. Both rules were drafted by the
Orchestrator, attacked by two blind design lanes, and amended on what those lanes found. The census
behind them read five disjoint slices of this repository and produced nine live defects against
roughly a hundred correct counts, so the rule has to condemn the nine and spare the hundred.

Two of the nine sit in `.agents/orchestration.md`, the file that governs every dispatch in this
project, and one of them tells a reader to follow six rules where eleven are numbered.

## Context

Read before acting, in this order:

1. `/home/user/scaffold/AGENTS.md`, in particular § Writing and § Instruction files.
2. `/home/user/scaffold/.claude/rules/writing.md` — the file you edit. Read all of it before adding
   to it, because both rules sit in tension with bullets already there.
3. `/home/user/scaffold/.claude/rules/quality.md` § Instruments.

No skill is named for this unit.

Host: Linux container, bash, network available. `/home/user/scaffold` is a clean checkout on branch
`claude/oxlint-conventions-audit-m66uiq`. Expect `tmp/` to hold campaign files; it is git-ignored.

## Unknowns

One. **Whether repairing a count changes a line's wrap.** These are hand-wrapped Markdown files at
100 columns and no gate reads that. Rewrap each paragraph you edit, and nothing else. Report any
paragraph where the repair forced more than its own reflow.

## Scope

Owned files, the only files you may write:

- `.claude/rules/writing.md`
- `.agents/orchestration.md`
- `.claude/rules/workspace.md`
- `.claude/agents/analyst.md`, `.claude/agents/sol.md`
- `.agents/skills/orkestrel-falsify/SKILL.md`
- `src/bin/helpers.ts`

Off-limits, do not write: every other file, and in particular `AGENTS.md`, `CLAUDE.md`, every other
rule file, every other agent and skill file, `src/core/`, `src/server/`, `tests/`, `guides/`,
`package.json`, and `vite.config.ts`.

Tools: Read, Grep, Glob, Edit, Write, Bash. No commits, no pushes, no dependency installs, no
destructive command. Never run `git checkout`, `git restore`, `git stash`, `git reset`, or
`git clean`.

## Execution

Perform this assignment yourself. Spawn nothing.

## Rule A — the count rule

Add these four bullets to `.claude/rules/writing.md` § Examples, numbers, and abbreviations,
immediately after the existing bullet "Write a numeral for a technical quantity, a version, or a
count." That bullet and this rule are in direct tension — one says write a numeral for a count, this
one deletes most of them — so an agent reading the first must find the second beside it.

```markdown
- Delete a number that only tallies the rows of a list or table it introduces. The enumeration is the
  count, and a number a later edit can leave behind is a second copy that drifts when a row moves.
- Keep a number that does more than tally: one asserting the set is closed, one fixing a quantity the
  reader must produce, one counting something other than the enumeration's members — a bound, a
  budget, a selection size — and one written into the same sentence as the items it counts.
- Name a rule, a law, or a section rather than its position. An ordinal into a list breaks silently:
  after a row moves, no number on the page still looks wrong.
- Recount what every retained number and every ordinal points at, in the same change that adds,
  removes, or reorders a row, and repair each one that disagrees.
```

The test that decides a hit is **separability**: can the list be edited without touching the sentence
that states its size? If yes, the number drifts and goes. If the number and its items sit in one
sentence, or the number asserts something beyond the tally, it stays and bullet four maintains it.

Do not restate the reasoning in the rule beyond what the four bullets carry. `AGENTS.md` §
Instruction files orders the persuasion cut.

## Rule B — the sweep rule

Add these three bullets to `.claude/rules/writing.md` § Substitutions, immediately after the
substitution table and before the bullets that follow it.

```markdown
- Sweep case-insensitively and across inflections when checking prose against the preceding table. A
  pattern for `easy` reaches neither `Easy` nor `easier`, and a temporal `once` most often appears as
  a sentence-initial `Once`.
- Rule every hit by the sense its row bans, not by the match. `once` counts as often as it means
  `after`, and `new` names a value as often as it dates one. Record a hit in a permitted sense as
  permitted rather than dropping it.
- Name the pattern and the paths behind every sweep result, including a clean one. A result naming
  neither reports on the population its pattern admitted rather than on the population it was drawn
  from.
```

## The nine repairs

Count each one yourself before repairing it. The numbers below are what two blind lanes measured and
the Orchestrator reproduced for the first four; treat them as a starting point, not as fact.

| # | Site | What it says | What it counts |
| - | ---- | ------------ | -------------- |
| 1 | `.agents/orchestration.md:226` | "Follow these six rules" | 11 numbered rules |
| 2 | `.agents/orchestration.md:506` | "Run these eleven checks on every brief" | 13 bullets |
| 3 | `.agents/orchestration.md:684` | "these four laws bind every bench" | 5 numbered laws |
| 4 | `.agents/orchestration.md:414` | "**Bench laws** rule 4 owns journals" | rule 4 is the sandbox law; the journal-retention law is rule 5 |
| 5 | `.claude/rules/workspace.md:158` | "A live-service project is the fifth kind" | an 8-row table |
| 6 | `.claude/agents/analyst.md:23` | "pins exactly one thing" | then names two, the route and the sandbox |
| 7 | `.claude/agents/sol.md:23` | "pins the one thing" | then names two |
| 8 | `.agents/skills/orkestrel-falsify/SKILL.md:136` | an ordinal into the verdict table | verify it against the table's real order |
| 9 | `src/bin/helpers.ts:79` | "seven of the nine options are shared" | both option constants hold 10 keys |

Repair each under the rule you just wrote, not by patching the number where the rule says delete it:

- Rows 1, 2, and 3 are pure tallies. Delete the number.
- Rows 4, 5, and 8 are ordinals. Name the law, the project, or the row rather than its position.
- Rows 6 and 7 say "one thing" and name two. Say two, or restructure so one is true. These are two
  bridge role files whose sentences are near-identical; keep them parallel.
- Row 9 counts a subset of a set it also miscounts. Repair the count, or name the options that
  differ rather than counting the ones that match. `src/bin/helpers.ts:79` also carries a causal
  `since`, which § Substitutions maps to `because`; fix both in one edit.

Row 9 is a TSDoc comment in published source, so its repair moves `dist/`. That is expected.

## Not yours

- **Every count the census found correct.** Roughly a hundred sentences in this repository state a
  number that agrees with what it counts. The rule spares them by design and so do you. Do not sweep
  and repair beyond the nine rows above.
- **`guides/process.md`** — the exemplar defect lives in a different repository and is already
  closed there.
- **The `above` and `below` ban's scope.** Whether it reaches an inline `//` comment is an open
  question the Orchestrator holds. Do not narrow it, do not widen it, and do not sweep for it.
- **A gate for either rule.** Neither rule is mechanically checkable without a parser this repository
  does not have, and `.claude/rules/architecture.md` forbids adding one. Review enforces them.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, at most one hypothesis — when:

- a row's count is not what the table says and your own count disagrees with both readings;
- a repair needs a file this brief marks off-limits;
- adding either rule contradicts a bullet already in `writing.md` in a way the placement does not
  resolve.

Decide and carry on, recording the choice in your report: the exact repaired wording of each of the
nine sites, and how far each rewrap reflows its paragraph.

## Acceptance criteria

Run these in order and report each bare exit code.

1. `.claude/rules/writing.md` carries both rules, at the two sections this brief names, in the order
   this brief gives them.
2. Each of the nine sites reads as you repaired it. Quote each before and after.
3. No sentence anywhere in `.agents/orchestration.md`, `.claude/rules/`, `.claude/agents/`, or
   `.agents/skills/` states a number that disagrees with what it counts. Run your own sweep and
   report the pattern and the paths, per Rule B's third bullet.
4. `npm run format` then `npm run format:check` exits 0.
5. `npm run lint:check` exits 0.
6. `npm run check` exits 0.
7. `npm run test:policy` exits 0.
8. `npm run test:guides` exits 0.
9. `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:bin` exits 0.

Do not run `npm test`, `npm run build`, or `npm run test:distribution`. An independent verifier takes
those readings.

## Output

A report with:

- the two rules as they now read in the file, verbatim;
- one row per repair, before and after;
- criterion 3's sweep: the exact pattern, the exact paths, and every hit with its ruling;
- one row per acceptance criterion with its bare exit code;
- the unknown answered;
- anything you could not close, named.

No process diary.
