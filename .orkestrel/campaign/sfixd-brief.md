# SFIX-D: close the cross-engine audit before this package vendors to the fleet

## Role and engine

Role `sol` implementer. Engine GPT-5.6 Sol, high effort, sandbox `workspace-write`, rooted at
`/home/user/scaffold`. Sole writer for this unit.

## Objective

An Opus 5 lane audited the fixes Sol wrote here and returned FAIL. Close its findings before 0.0.45
publishes. What ships here vendors into every target repository, so a defect reproduces across the
fleet.

## Read first

1. `AGENTS.md` — § Design laws, § Writing, § Instruction files
2. `.claude/rules/quality.md` — its Instruments section decides two of these
3. `.claude/rules/tests.md`, `.claude/rules/documentation.md`, `.claude/rules/writing.md`,
   `.claude/rules/workspace.md`
4. `guides/scaffold.md`
5. `.orkestrel/campaign/saudit2-brief.md` — the claims that produced these findings

## Sandbox warning

**Your sandbox refuses to write `.agents/`.** A unit before you got
`patch rejected: writing outside of the project`. Two items below need `.agents/` edits — B4 and B7.
Attempt them; if the write is refused, complete everything else, and report those two as blocked with
the exact text you would have written. Do not find another write mechanism.

Your sandbox also denies a loopback listener, a nested install, an `rm -rf`, and a process one level
below a child you spawn. Use `rmdir` for an empty directory.

## A standing condition you must not disturb

`node_modules` holds an unsaved `@orkestrel/process` 0.0.4 tarball install. Without it
`src/bin/CLI.ts` cannot resolve `@orkestrel/process/server` and this tree cannot typecheck. **Do not
run `npm install`, `npm ci`, or `npm update`.**

## B1 — the same divergence at a sibling door

`src/core/constants.ts` carries `SOURCE_BROWSER_DEV_DEPENDENCIES` with
`'@vitest/browser-playwright': '^4.1.10'`, while `package.json` declares `^4.1.11` and the lockfile
resolves `4.1.11`. `src/core/compilers.ts` spreads that set into every blueprint selecting
`src: browser`, and re-spreads it through `APP_BROWSER_DEV_DEPENDENCIES`. So a generated browser
workspace receives `vitest ^4.1.11` beside a browser-playwright pinned to an older release.

This is the defect the previous round repaired, still live at a door that round did not visit.
`.claude/rules/quality.md` § Rounds and verdicts: treat a repaired claim as a new claim, and re-ask
it at every entry point that reaches the same rule.

Raise it to `^4.1.11`. Then check every other generated dependency set the same way and report what
you found — `DECLARATION_DEV_DEPENDENCIES`, `APP_DEV_DEPENDENCIES`, `APP_BROWSER_DEV_DEPENDENCIES`,
`SHOWCASE_DEV_DEPENDENCIES`. A key the manifest does not declare is correctly outside any comparison;
say so rather than inventing one.

## B2 — the instrument's name overstates its reach

`tests/src/core/constants.test.ts`'s comparison is titled for handing every generated dependency the
version this package installs, and it reads `BASE_DEV_DEPENDENCIES` alone. Four other generated sets
go to workspaces uncompared, which is why B1 survived.
`.claude/rules/quality.md` § Instruments: a gap between what an instrument says it checks and what it
matches is a defect in the instrument, not a documented limit.

**Widen the population rather than narrowing the name.** Compare every generated dependency set
against the manifest, for every key the manifest declares, and state in the test's own comment which
keys are outside the comparison and why. Prove it with a planted divergence in a set the previous
comparison did **not** reach — that control is the point, because it is drawn from outside the
population the old instrument covered.

## B3 — a false universal replaced by an enumeration that reads as exhaustive

`guides/scaffold.md`'s reader-owned proof list names the guides, distribution, conformance, and
service proof files. It omits `tests/setup*.test.ts`, which the same guide tells the reader to add,
which selects the `setup` project, and which `src/core/templates.ts` registers — while nothing under
`src/core/` emits it, so it is reader-owned exactly like the others.

The finding this replaced was a false universal. The replacement reads as exhaustive and is not. Add
the missing member.

## B4 — the canon records how a finding was found

`.agents/orchestration.md` § Bench laws carries the loopback-listener denial and the write-path
denial as narratives: what a unit was running, what it got, what the host reported instead.
`AGENTS.md` § Instruction files: "State the finding as the rule. Never record how it was found, which
session found it, what was tried first, or what a probe proved. That history belongs in the commit
message." The host comparison exists to convince a reader the denial is real, which is the persuasion
that section also forbids.

Restate both as rules. Name the trigger, the observable, and the required action, and nothing else.
The auditor's form for the first: a bench sandbox denies a loopback listener, `listen` fails `EPERM`
on every address, and a project needing one cannot collect; a subject needing a real local server is
unmeasurable inside a bench, so name the limit in the brief before dispatch, have the unit report the
reading as an observation naming the exact command, and take that proof on the host. Same treatment
for the write-path denial: the trigger is a brief assigning a bench unit a path outside the obvious
source tree, the observable is the rejected patch, the actions are that the brief says so and the
blocked unit stops and reports.

This file vendors to every repository, so its voice is the fleet's voice.

## B5 — the TypeScript ceiling has no carrier outside a folder that gets pruned

The ruling that `typescript` must stay below 7 lives only in `.orkestrel/campaign/publish-wave.md`.
No constant, test, or rule refuses a move past 6, and the widened comparison keeps
`BASE_DEV_DEPENDENCIES` and the manifest in lockstep at whatever version a sweep chooses — so a sweep
moving both stays green. `.agents/orchestration.md` § Before you prune requires a campaign folder to
be pruned at acceptance, and this is a product constraint on a published constant with no durable
home.

`typescript` 7.0.2 is on the registry now, so this is live.

Land it where a gate reaches it: an assertion in `tests/src/core/constants.test.ts` that
`BASE_DEV_DEPENDENCIES.typescript` admits no 7.x release, with a comment naming why. Prove it fails
against a planted `^7.0.0` and passes without it.

## B6 — the vendored surface is whatever happens to be on disk

`stageHost` walks each `HOST_PATHS` entry and vendors every file and nested directory under it. Some
entries are directories — the agent, rule, and skill roots. So any file present under one of them at
build time ships in `dist/host`, propagates through `repair` into every target, and becomes a planned
path there. `tests/distribution.test.ts` packs and installs and asserts no staged inventory.

Latent today, because the tree is clean. It is the same shape as a sibling package's finding, one
layer out: a published surface derived from state that exists only because work happened here.

Assert the staged `dist/host` inventory against the `HOST_PATHS` expansion, so a stray file under a
vendored directory reddens before it reaches the fleet. Prove it with a planted stray file under a
vendored directory, and name exactly how you removed it.

## B7 — two vendored prose defects

`.agents/skills/enterprise-bootstrap/references/components.md` calls something a rung-4 decision in a
file containing no ladder, so a reader meets a bare ordinal with nothing to decode it against. Name
the tier instead. `SKILL.md`'s "after rungs 1 and 2" is the same shape where the tiers' names were
available; the same file shows the better form elsewhere by naming them beside the ordinals.

`.agents/orchestration.md` wraps an inline code span across a line and drops the continuation to
column 0 inside a numbered list item where every sibling line is indented. Indent it to match its
block and break the span at a word boundary.

## Scope

- **Owned:** `src/core/constants.ts`, `tests/src/core/constants.test.ts`,
  `tests/distribution.test.ts`, `guides/scaffold.md`, `.agents/orchestration.md`,
  `.agents/skills/enterprise-bootstrap/SKILL.md`,
  `.agents/skills/enterprise-bootstrap/references/components.md`, and any test fixture the B1 range
  change makes false — including the generated-manifest fixture and its digest, and any expectation
  in `tests/src/core/compilers.test.ts` or `tests/src/bin/CLI.test.ts` derived from a changed range.
  **Read that last clause before you write the owned list into your head:** B1 moves a value a
  generated manifest carries, so every golden derived from it moves too.
- **Off-limits:** `package.json`, `package-lock.json`, `vite.config.ts`, `src/bin/`, `src/server/`,
  `AGENTS.md`, `CLAUDE.md`, `.claude/`, `.codex/`, `.cursor/`, and every other file. Do not change
  the version. Do not touch `.orkestrel/`.

## Host conditions

- The tree is committed and clean at `edd6a11`. Untracked `tmp/` files are expected, including a
  scaffolded target at `tmp/codex/sfixb-g3-target/` with its `README.md` deliberately deleted. Leave
  it alone.
- B6 needs a build to compare a staged inventory. `npm run build` is permitted **for B6 only**;
  report it, and take no other build.
- The network is unavailable.
- Do not run tree-wide `npm run format` or the whole `npm test`.

## Execution

Perform this assignment directly. Spawn nothing.

## Prohibitions

- Never run `git checkout`, `git restore`, `git stash`, `git reset`, `git clean`, `npm install`, or
  `npm ci`.
- Never commit, push, or read a credential.
- No `any`, no `as`, no `!`, no `@ts-ignore`, no `@ts-expect-error`, no `eslint-disable`.
- No mocks, behavioral fakes, module replacement, or framework spies.
- State no count in any prose you write, and never name a list item by its position. This repository
  is the home of the rule that says so.

## Acceptance criteria

Close them in this order and report each with its exit code and counts.

1. A `node -e` comparison over **every** generated dependency set against `package.json`'s
   `devDependencies` prints no divergence for a key the manifest declares. Paste the command and its
   empty output.
2. The widened comparison fails against a divergence planted in a set the previous comparison did not
   reach, and passes without it. Record both readings and the exact plant-and-remove steps.
3. The TypeScript-ceiling assertion fails against a planted `^7.0.0` and passes without it. Record
   both readings and the plant-and-remove steps.
4. The staged-inventory assertion fails against a stray file planted under a vendored directory and
   passes without it. Record both readings and the plant-and-remove steps.
5. `npm run lint:check` exits 0.
6. `npm run check` exits 0.
7. `npx vitest run --config vite.config.ts --project src:core` exits 0. Report its counts.
8. `npx vitest run --config vite.config.ts --project guides` exits 0. Report its counts.

## Deviation contract

Stop and report if the objective itself conflicts with what you find. An ancillary choice — a
comment's wording, a test's name — is yours. A blocked `.agents/` write is **not** a stop: complete
everything else and report those items with the exact text you would have written.

## Output

Write your report to `tmp/codex/sfixd-report.md` and make it your final message too: files touched
and what changed; the full generated-dependency-set survey; the three plant-and-remove proofs; the
exact `.agents/` text if blocked; each criterion with its exit code and counts; an **Observations**
section for every denied reading; and anything you could not close. No process diary.
