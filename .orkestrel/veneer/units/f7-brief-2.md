# Unit F7 CAPTURE — successor brief 2 (the fix round)

Supersedes the F7 run from `f7-brief.md`. What changed and why: the F7 audit round (analyst on
Astra, thread `01a0ca70-dea8-7dd0-be91-8688e953b08a`; reviewer on Opus; checker on Sonnet) found the
accessibility artifacts, the pixel guard's population, the registry types, and the guide's capture
paragraphs short of the contract the first brief fixed, and the Orchestrator's own
`CAPTURE=1 npm run test:journey` over the worktree settled the capture-run claim (exit 0, 100
passed, `f7-capture-journey.log.txt`). Everything else the first run landed stays.

## Role and engine

`opus` on Opus (the `opus` alias; served `claude-opus-5`), the sole writer in the F7 worktree
`/home/user/veneer-f7` (detached at `07fc3c3` plus the F7 unit's writes, uncommitted), reached as a
native subagent. Perform the assignment directly and spawn nothing. Do not commit, push, install, or
run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`.

## Objective

Make the portfolio's artifacts say what they show, make the guard read the frames on disk, make
the registry's types carry the grammar, and make the guide's capture paragraphs one contract a
reader of the portfolio can rely on.

## Context

**Evidence.** `/home/user/scaffold/tmp/audit/f7-audit-analyst-verdict.md` (claims 3, 4, 10, 11 and
claim 1), `/home/user/scaffold/tmp/audit/f7-audit-reviewer-verdict.md` (claims 10, 11; findings F1
to F7; the referrals), the first run's report `/home/user/scaffold/tmp/audit/f7-report.md`, and the
portfolio under `/home/user/veneer-f7/tmp/capture/states/` (the Orchestrator's capture run rewrote it
at 18:56 UTC; read it as it stands). Copies of the verdicts sit beside this brief in `tmp/units/`.

**Law.** `/home/user/scaffold/AGENTS.md`; `.claude/rules/tests.md`, `typescript.md`, `names.md`,
`architecture.md`, `browser.md`, `documentation.md`, `writing.md`. Skill: none. Guide:
`/home/user/veneer-f7/guides/veneer.md` § Tests (the capture paragraphs) and § Showcase.

**Installed primitives.** `@orkestrel/test` (`readFrame` gives dimensions and the bottom-row floor
and no region pixels, so the local region sampler stays; `describeTree`, `describeFocus` walk a
subject's descendants and exclude the root, per the installed reader at
`node_modules/@orkestrel/test/dist/src/browser/index.js` around the `describeFocus` definition;
`createPortfolio`, `captureFrame`, `stagePane`, `releasePane`). A helper whose job an installed
export does is a defect.

**Host.** Linux, bash, npm 11 on `PATH`
(`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`);
Chromium 141 at `/opt/pw-browsers`; `node_modules` installed; a foreground command is capped at
10 minutes; `CAPTURE=1 npm run test:journey` takes about 80 s.

**Measurements.** Take before editing: whether the installed portfolio prunes `tmp/capture/states/`
at the start of a capture run (the baseline's `home--*.png` frames are gone from the directory);
what `describeFocus` returns for a control-rooted subject when called on an enclosing scope.

**Control identifiers.** none.

**Standing conditions.** The tree is dirty with the first run's writes; keep every one of them.

## Unknowns

Whether the counterpart portfolio's stems can be verified here: no Elements or Bootstrap listing is
retained, so obligation 5 states the Veneer-side rule and marks the pairing as verified by the
appearance unit; report if a listing exists after all.

## Obligations

### Obligation 1 — the accessibility artifacts (analyst 3; reviewer F3, F6)

Read each subject's tree and focus order through an enclosing scope so a subject that is itself a
control records its own role and name; word the empty-focus fallback for what the walk covers ("No
control inside this subject is reachable.") or include the subject itself; add the state the reading
was taken in to the artifact body (`state:` beside `subject:` and `variant:`); the proof asserts that
a control-rooted subject's artifact names that control. The guide states that one artifact covers a
subject and a variant (its stem is the subject's), while a frame's stem is the scenario's.

### Obligation 2 — the guard's population (analyst 4; reviewer referral)

The frame-variation guard discovers the frames on disk under the portfolio's directory
independently of the capture flag, pairs each with its scenario's declared region (retain the
regions the run recorded in the manifest, or derive them by staging the scenario's subject again),
and guards that population; it skips only when the directory holds no frame, and the case title says
so. The sampler's clip case pins its denominator so removing the clamps reddens (reviewer referral).

### Obligation 3 — the registry types (analyst 11)

`CaptureKey.scenario` and the variant names are constrained types that carry the grammar (a
template-literal type over the stem and, for a variant, `<theme>-<viewport>`), preserved through
the derived collections and `FrameManager.place`'s inputs, so a project-suffixed scenario fails the
typecheck rather than the runtime proof alone.

### Obligation 4 — the proof that cannot fail, the duplicated law, and the placement signature
(reviewer F4, F5, F7)

The accessibility proof asserts that two subjects' artifacts differ and that a specimen's reading
names an element the page reading of another subject does not; the scenario-level filename law lives
in `tests/setup.test.ts` alone and the journey keeps only the expanded-filename law;
`FrameManager.place` defaults `frame` to `subject` and takes a named entry for a page frame, so no
absent argument carries a meaning; retire the dead assertion `declared.size > CAPTURE_KEYS.length`
if no mutation distinguishes it from its neighbour, and de-duplicate `readSubject`'s candidate set
before the ambiguity check (reviewer referrals).

### Obligation 5 — the guide's capture paragraphs (analyst 1; reviewer F1, F2)

State the Veneer-side rule (a scenario's stem is its subject's stem; a driven state follows it) and
name the counterpart portfolio the rule was derived from as CL13's Bootstrap portfolio; drop the
column of counterpart stems or mark it derived and unverified until the appearance unit reads a
listing; separate the side-by-side-limit paragraph from the style-proof index with a blank line;
move the capture-registry sentences in § Showcase into their own paragraph after the region sentence
and name the actor ("The showcase's own button drives the controller").

### Obligation 6 — the counts (analyst 10; reviewer 10)

Remove the growable-set counts in `tests/app/browser/integration.test.ts` ("nine role links"),
`tests/setup.ts` ("a ninth"), and `tests/setupBrowser.ts` ("the three declarations", "three ways"),
naming the members where a sentence needs them.

## Scope

**Owned.** `tests/setup.ts`, `tests/setup.test.ts`, `tests/setupBrowser.ts`, `tests/setupBrowser.test.ts`,
`tests/app/browser/integration.test.ts`, `guides/veneer.md` § Tests (the capture paragraphs) and
§ Showcase (the capture-registry sentences).

**Shared (report-only).** `ROADMAP.md`, `vite.config.ts`. **Off-limits.** everything else.

**What asserts the state this change ends.** `tests/setup.test.ts` (the registry freezes and laws);
`tests/setupBrowser.test.ts` (the sampler, `readRegion`, `readSubject`, the frame manager);
`tests/app/browser/integration.test.ts` (the portfolio, guard, subject, and accessibility cases);
`tests/guides.test.ts` parity over § Tests and § Showcase.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash for the gate commands and
`node_modules/.bin/oxfmt --config .oxfmtrc.json --write <owned file>`; a probe under `tmp/probe/`,
deleted before you return; no install, no commit, no tree-wide mutating `format` or `lint --fix`.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

Write `./tmp/units/f7-report-2.md` and return its full content as your final message, nothing else:
the two pre-edit measurements; per obligation what changed with the files touched and the
red-then-green reading where a proof changed; the written artifact and frame names after the final
capture run; the commands you ran with exit codes, the gate chain run after your final edit and
said to be so; `git status --porcelain` and `git diff --stat`; every deviation and every claim of
your own you flag as unverified. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, at most one short
hypothesis — per `/home/user/scaffold/.agents/orchestration.md` § Deviation protocol, on: a region
the guard cannot recover for a frame on disk; a type constraint the installed portfolio's inputs
refuse; a gate that cannot reach green inside your owned files. Decide, record, and carry on from:
the artifact's `state:` wording; case titles; the guide sentences' wording within the rulings.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, and `npm run check` exit 0.
2. `npm run test:setup` and `npm run test:setup:browser` exit 0.
3. `npm run test:app` exits 0.
4. `npm run test:journey` exits 0 with saved frames present and capture off (the guard reads them),
   and `CAPTURE=1 npm run test:journey` exits 0.
5. `npm run test:guides` and `npm run test:policy` exit 0.
6. `grep -n 'nine role links\|a ninth\|the three declarations\|three ways' tests/setup.ts tests/setupBrowser.ts tests/app/browser/integration.test.ts` prints nothing.
7. `git status --porcelain` lists the first run's files and nothing outside the owned set.

**Observations, not criteria.** The whole-chain `npm test` reading.

## Review evidence

The Orchestrator takes the actual diff, status, and capture listing after you return; `analyst` on
Astra audits the fix round.
