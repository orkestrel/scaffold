# Unit COLLAPSE (`co`) — round 2 (successor brief 3): the guide patch against the landing base, the prose forms, and the factor case

This brief succeeds `co-brief-2.md` (round 1, complete in the worktree) and carries the round-1 audit verdict `co-audit-verdict.md` § Rulings: F1 (the guide hunks no longer apply to the landing base), claim 8 (the exact prose forms both lanes returned), and the `--vn-factor-motion` prose claim. Every owned file round 1 wrote stays; this round touches `tests/src/styles/components/collapse.test.ts` (one added case) and produces a revised shared patch.

## Role and engine

`builder` on Sonnet, a native Claude subagent, the sole writer in `/home/user/veneer-co` (branch `unit/co`, uncommitted round-1 writes over `87ff1d0`, its own `node_modules` and built `dist/`).

## Objective

A revised shared-file patch `tmp/units/co-shared-2.patch` whose guide hunks apply to the landing base `eb422a9` with the ruled prose, whose non-guide hunks are round 1's post-BPO forms, and a collapse proof that gates the motion-factor sentence.

## Context

**Evidence.** `co-audit-verdict.md` § Rulings and the two lane verdicts beside it (`co-audit-objective-verdict.md` claim 8 and F1; `co-audit-subjective-verdict.md` claim 8 and the referrals) name every site and the exact right text. The landing base is the commit `eb422a9` on the session branch of the same repository (`git -C /home/user/veneer-co show eb422a9:guides/veneer.md` reads it; `git -C /home/user/veneer-co log -1 eb422a9` confirms it exists). Round 1's patches are `co-shared.patch` (against `87ff1d0`) and `co-shared-post-bpo.patch` (the barrel and conformance hunks), retained under `/home/user/scaffold/.orkestrel/veneer/units/`; the report `b-collapse-co-report.md` § Guide text lists the guide items. The unit's own instruments are retained under `/home/user/scaffold/.orkestrel/veneer/units/co-instruments/` (`sync-owned.sh`, `gates.sh` for the validation-copy technique; `apply-guide.py`, `section.md`, `plugin-cell.txt` for the guide text).

**Law.** `AGENTS.md`; `.claude/rules/{documentation,writing,tests,styles}.md`; the design verdict `/home/user/scaffold/.orkestrel/veneer/b-collapse-design-verdict.md` (R1 as amended, R8, R14, R17); the family record `units/b-collapse-family.md`. Skill: none. Guide: `guides/veneer.md` (report-only: the patch).

**Installed primitives.** `@orkestrel/test` browser readers (`readStyle`, `stageMedia`) as round 1 used them; this round adds no helper.

**Host.** Linux, `bash`; the worktree `/home/user/veneer-co`; npm 11 on `PATH` through `export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`; Chromium 141 for the browser proof; no network needed.

**Measurements.** The objective lane read the non-guide hunks' context as matching the landing base at every site it checked (`Showcase.ts:113-117`, `tests/setup.ts:199,369-381,1063-1066`, `Showcase.test.ts:7,113,143-144`, `integration.test.ts:47,1680`, `index.test.ts:29-31`, `setupServer.test.ts:1347-1350`), and the guide hunks' context as stale (§ Surface at `guides/veneer.md:64-69`; the § Tailwind sentence joined at 408; the `### Collapse classes` insertion context at 827-832 — line numbers as read before B-PASSIVE-ORDER-GUIDE moved the sections; locate each site by its heading and text). Re-take each against `eb422a9`.

**Control identifiers.** None. A test is named for what it proves.

**Standing conditions.** The worktree's owned files are dirty by design (round 1); do not revert anything. `tests/setupPolicy.ts` and `tests/policy.test.ts` are vendored. `git checkout`, `git restore`, `git stash`, `git reset`, `git clean`, and `git worktree` are forbidden. The shared files stay report-only in the worktree. A validation copy is built under `tmp/probe/base/`: `git -C /home/user/veneer-co archive eb422a9 | tar -x -C tmp/probe/base`, then `cp -al node_modules tmp/probe/base/node_modules`, then `git -C tmp/probe/base init -q && git -C tmp/probe/base add -A && git -C tmp/probe/base commit -qm base` so `git apply --check` runs there; copy the owned files over it (`co-instruments/sync-owned.sh` shows the set); delete `tmp/probe/` before the report.

## Unknowns

None.

## Scope

**Owned.** `tests/src/styles/components/collapse.test.ts` (one added case), `tmp/units/co-shared-2.patch`, `tmp/units/co-report-2.md`.

**Shared (report-only, inside the revised patch).** `src/styles/index.scss`, `tests/conformance.test.ts` (both in the post-BPO form), `app/browser/constants.ts`, `app/browser/index.ts`, `app/browser/Showcase.ts`, `tests/setup.ts`, `tests/app/browser/Showcase.test.ts`, `tests/app/browser/index.test.ts`, `tests/app/browser/integration.test.ts`, `tests/setupServer.test.ts`, `tests/fixtures/tailwind/markup.html`, `guides/veneer.md`.

**Off-limits.** Everything else, the other round-1 owned files included (no change), the vendored files, `ROADMAP.md`.

**What asserts the state this change ends.** `tests/guides.test.ts` on the validation copy (the links and headings), `tests/policy.test.ts` (the banned-term sweep over the guide), the collapse proof (Owned).

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No commit, push, install, or destructive git command; no tree-wide `format` or lint `--fix` outside the validation copy.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

`tmp/units/co-shared-2.patch` (one unified diff against `eb422a9` covering every shared file, the guide included, with no § Showcase hunk) and the report `tmp/units/co-report-2.md`: each guide site's before and after, the added case and the mutation it distinguishes, each gate's command and result line on the validation copy, and the `git apply --check` line. The report states no count and uses no banned term.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, one hypothesis — when a guide site the ruling names cannot be located on `eb422a9` or a non-guide hunk fails `git apply --check` there. Decide, record, and carry on for the paragraph wrapping and the exact position of the added case in the proof.

## Acceptance criteria

1. `git -C tmp/probe/base apply --check tmp/units/co-shared-2.patch` exits 0, and the patch's file list equals the Shared row above.
2. In the patched guide: § Surface reads "The `emitEvent` and `bindEventMap` functions and the `Delegate` class are mechanisms with one consumer, so they stay that shape until the first engine component carrying a cancelable pre-change event lands." and carries no B-COLLAPSE sentence; § Tailwind ends the shared-name sentence at "…would hide every shown panel." and continues "[The consumer pairing](../tests/service/tailwind/consumer.test.ts) reads the `.collapse.show` element in its markup fixture as visible, which is what the shipped cascade alone resolves for it."; `### Collapse classes` sits directly before `### Button group classes`, opens without "This section describes what each class renders, and", reads "A panel carries the `collapsing` class while it opens or closes." for the former "is the box" sentence, and closes with "The `tests/src/styles/components/collapse.test.ts` proof reads each state in the browser: the written selectors, the hidden and the shown display, the clip under an inline height with a hit test below the panel's edge, the zero-height box on a panel carrying no inline height, the horizontal compound against a nested element, each transition at rest and under the staged preference, and every state inside a dark island."; the Files row, the `collapse | selector` and `collapsing | selector` rows, the plugin row ending "Owner: J-ENGINE.", the R8 sentence, both recipe fences with `collapse`, and the § Tests link are present; no § Showcase hunk.
3. `collapse.test.ts` gains a case reading `.collapsing`'s `transition-duration` as `0.35s` inside a wrapper that sets `--vn-factor-motion: 2` (the mutation it distinguishes: the partial writing the duration through `calc(0.35s * var(--vn-factor-motion))`, which reads `0.7s`); the scoped run `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/collapse.test.ts` exits 0 in the validation copy.
4. On the validation copy with the patch and the owned files applied: `npm run check`, `npm run test:guides`, `npm run test:policy`, and `npm run test:conformance` exit 0, recorded with their result lines.
5. The report carries each item of § Output.

**Observations, not criteria.** The journey and `CAPTURE=1` are the Orchestrator's at landing.

## Review evidence

`tmp/units/co-shared-2.patch`, `git -C /home/user/veneer-co diff 87ff1d0` and `git -C /home/user/veneer-co status --porcelain` at hand-back (`co-2.diff`, `co-2-status.txt`), and the report.
