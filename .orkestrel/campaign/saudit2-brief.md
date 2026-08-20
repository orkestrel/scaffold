# SCAFFOLD-AUDIT2: audit the fixes Sol wrote, on the engine that did not write them

## Role and engine

Role `reviewer`. Engine Claude Opus 5, high effort. Read-only. You rule; you never edit.

## Why you exist

Every fix in the subject range was written by GPT-5.6 Sol, which also wrote the audit that found the
defects. `AGENTS.md` and `.agents/orchestration.md` require a lane whose engine did not write the
work, and Sol cannot audit itself.

The gates are green and are **not** the subject. An equivalent audit on a sibling package found a
`prepublishOnly` step that could never have run on a clean checkout while every gate reported green,
because the gate depended on a directory campaign work had incidentally created. Look for that class.

## Objective

`@orkestrel/scaffold` 0.0.45 publishes after this. It vendors the host every other repository
receives, so a defect here reproduces across the fleet. Rule on the claims below with evidence. A
claim you cannot substantiate is a FAIL, not a courtesy PASS.

## Read first

1. `AGENTS.md` — § Design laws and § Writing, and § Instruction files
2. `.claude/rules/quality.md` — the Falsification law, and its Instruments section
3. `.claude/rules/tests.md`, `.claude/rules/documentation.md`, `.claude/rules/writing.md`
4. `.agents/skills/orkestrel-falsify/SKILL.md` — it fixes the verdict shape and the terminal line
5. `guides/scaffold.md`

## Context

- Subject: `git diff ee886cf..HEAD -- src/ tests/ guides/ .agents/ .claude/`. Run it yourself.
- The tree is committed and clean at `10fa087`. Untracked `tmp/` files are expected.
- Host gates all exit 0, and `node dist/bin/main.js audit` reports no drift across 126 planned paths.
  Do not re-run the suite; another agent may be using this host.
- **A standing condition:** `node_modules` holds an unsaved `@orkestrel/process` 0.0.4 tarball
  install. Without it `src/bin/CLI.ts` cannot resolve `@orkestrel/process/server` and this tree
  cannot typecheck. Do not run any command that rewrites `node_modules`.
- `guides/*.md` other than `guides/scaffold.md` and `guides/README.md` are refetched mirrors, out of
  scope.

## The claims

**Claim 1.** The toolchain ranges moved in the right direction and completely. `BASE_DEV_DEPENDENCIES`
was raised to match this package's own manifest for `oxfmt`, `oxlint`, `vite`, and `vitest`. Rule on
whether raising is right rather than lowering, whether any key still diverges, and whether raising
what a generated workspace receives can break a target that installs it.

**Claim 2.** `typescript` did not move and cannot. It must stay below 7, and `7.0.2` is on the
registry. Verify the declared range excludes 7 rather than assuming a caret does, and rule on
whether anything in this range could let a future sweep move it.

**Claim 3.** The widened comparison in `tests/src/core/constants.test.ts` can fail for the reason it
exists, and its planted-divergence proof was drawn from a population the comparison genuinely covers.
Rule also on what it still cannot see.

**Claim 4.** The generated-manifest digest and the explicit fixture beside it do not contradict each
other, and every expectation that moved in `tests/src/core/compilers.test.ts`,
`tests/src/bin/CLI.test.ts`, and the manifest fixture moved for the stated reason — one of the four
ranges — and nothing else changed under cover of the digest update. This is the claim where a
regenerated golden value hides an unrelated change, so check it rather than trusting the account.

**Claim 5.** The six corrected guide claims are now true of the code. For each, name the code that
makes it true. The restore-row claim was proved against a real scaffolded target; verify the
correction matches what that reading showed, not what the reader might prefer.

**Claim 6.** The guides suite's new executable examples execute what the guide shows. Rule on whether
each transcription drives the fence a reader sees or something adjacent, and on whether the guide's
statement of what remains outside the gate is honest and complete.

**Claim 7.** The canon changes obey `AGENTS.md` § Instruction files: every line is a directive naming
an observable trigger and a required action, and none argues for the rule. This range rewrote the
count ban, cut rationale at two prohibition sites, replaced positional references, and widened the
brief-scoping rule. Quote every line that fails and name the requirement it fails.

**Claim 8.** The count ban and its neighbours are self-consistent after the rewrite. No line in the
canon states a count of a growable set or names a list item by position — including the lines this
range added. The bootstrap skill's rungs were deliberately kept as ordered-procedure identity; rule
on whether that judgment holds.

**Claim 9.** No gate in this package depends on incidental state — a directory that exists only
because work happened here, an unsaved dependency install, a file another test leaves behind, or an
ordering between projects. The unsaved `@orkestrel/process` tarball is one such dependency: rule on
what a clean `npm ci` would do to this tree today and whether any gate would notice.

## Unknowns

- Whether raising the generated toolchain ranges obliges anything of the targets that already
  installed the older ones. I have not ruled on that and it may be outside this package.
- Whether the vendored host's own tests can detect a canon file that contradicts another.

## Scope

Read-only. Own nothing. Edit nothing. Spawn nothing. Perform this assignment directly. Never run
`git checkout`, `git restore`, `git stash`, `git reset`, `git clean`, `npm install`, or `npm ci`.

State no count in anything you write, and never name a list item by its position. This repository is
the home of the rule that says so.

## Output

The verdict shape `.agents/skills/orkestrel-falsify/SKILL.md` fixes, and nothing else. Per-claim
verdicts with evidence, findings numbered in one sequence, and the single terminal line. No process
diary.
