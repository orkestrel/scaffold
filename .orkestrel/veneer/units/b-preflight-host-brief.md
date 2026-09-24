# Unit PREFLIGHT-HOST (`pl`) — the preflight pairing reads the same on any Chromium build

## Role and engine

`opus` on Opus 5.5, a native subagent in the worktree `/home/user/veneer-pl` (branch `unit/pl` from the session
head `fc3ddfe`). The executor that opens this brief is that subagent. The work is objective and routes to `sol` on
Astra by class; the proof runs in Chromium, which the bench sandbox cannot launch, so it runs native.

## Objective

`tests/service/tailwind/preflight.test.ts` passes on a Chromium build whose user-agent defaults for `select` and
`table` differ from Chromium 141's, and still reddens when Veneer's cascade or Tailwind's preflight changes a value
the pairing measures.

## Context

**The failure, as the engine session measured it on Chromium 153**
(`/home/user/scaffold/.orkestrel/veneer/engine/units/host-chromium-153-reading.md`, the preflight row and the
"Two rows closed" section). The case "keeps every property the elements layer declares, and records every property
the profile moves" collects each property whose value the preflight profile moves, as `tag | property | preflight
value`, and holds that population equal to the guide's recorded rows (`readPreflightDepartures`). On Chromium 153 the
`select | height` move reads `21px` where the guide records `18px`, and the four `table | border-*-color` moves are
absent, because the user-agent default equals the preflight value there. So both the population and one value
depend on the build's user-agent defaults, which D45 rules a proof must not assert.

**The rule (D45, `/home/user/scaffold/.orkestrel/veneer/units/decisions-round-2.md`).** A style proof reads the
resolved geometry or accepts every serialization of the same computed value; the preflight proof compares each move
against the value Tailwind's preflight sets.

**Unknowns.**
- Which properties in the moved population are declared by the preflight profile itself and which are consequences
  of a declaration (a `height` that follows from font and padding): read the profile and classify each row; a
  consequence row compares by a build-independent reading or leaves the equality population with the reason stated.
- Only Chromium 141 is installed here. Emulate a build whose defaults differ by staging a user-agent-like rule set
  beneath the page (the lowest layer, for `select` height and `table` border colors, with the values the engine
  session read on 153) and show the proof reads the same with and without it. Report how the emulation stands in for
  the real build.

**Law.** `AGENTS.md` in the worktree; `/home/user/scaffold/.claude/rules/{tests,styles,typescript,names,documentation,writing,quality}.md`;
the notes `/home/user/scaffold/.orkestrel/veneer/units/w2-w3-note-1.md` and `w2-w3-note-2.md`; skill: none. Case
populations live in setup files. Every changed assertion runs red against its named mutation, and each red run is
retained.

**Host.** Linux; npm 11 on `PATH` through
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`;
`PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers` (Chromium 141); the worktree's `node_modules` is a hard-linked copy. Build
the styles (`npm run build:src`) before the service proof. Write every instrument and log under the worktree's
`tmp/units/` or `tmp/probe/` with the `pl` prefix.

**Testing.** Run scoped tests only: `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project
service tests/service/tailwind/preflight.test.ts` (or the project name the config gives the service suite), and the
setup files you touch. Run `npm run test:service` at most once, as the final acceptance reading.

**Standing conditions.** Seven other units write in their own worktrees; none owns a file this unit owns. The
container is loaded; a timeout in a file you did not touch is an observation you report with its command.

## Scope

**Owned.** `tests/service/tailwind/preflight.test.ts`; the setup reader `readPreflightDepartures` and its proof where
the comparison's shape changes them (name the setup file you edit).

**Shared (report-only).** `guides/veneer.md` (the preflight departure rows and the sentence that the Standalone
column is the Chromium 141 reading). Return one `pl-shared.patch` against `fc3ddfe` and edit nothing there.

**Off-limits.** `src/**`, `app/**`, `tests/setupBrowser.ts`, `tests/app/**`, `tests/src/**`, `tests/fixtures/oracle/**`,
`configs/**`, the manifests, the vendored `tests/setupPolicy.ts`, `tests/policy.test.ts`, and `tests/config.test.ts`,
`ROADMAP.md`.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No commit, push, install, `git checkout`, `git restore`,
`git stash`, `git reset`, or `git clean`; no tree-wide `format` or `lint --fix`.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The report `/home/user/veneer-pl/tmp/units/pl-report.md` and the same text as the final message: the classification
of each moved row; the comparison's shape after the change; the emulated-build reading with and without the staged
defaults; each mutation and its red run (a preflight value changed; a Veneer elements-layer declaration that stops
holding its value; a guide row removed); each gate's command exactly as it ran, its exit, and its result line;
`pl-mutations.log.txt`, `pl-shared.patch`, `pl.diff`, and `pl-status.txt` under `tmp/units/`. No tally of a growable
set and no temporal word.

## Deviation contract

Stop and report per `/home/user/scaffold/.agents/orchestration.md` § Deviation protocol when the fix needs an
off-limits file, or when no build-independent reading exists for a moved row. Decide, record, and carry on for case
names, helper names, and where each added case sits.

## Acceptance criteria

1. `npx oxfmt --check` over the owned files, `npm run lint:check`, and `npm run check` exit 0.
2. The preflight proof exits 0 with and without the emulated Chromium 153 defaults, and reddens on each named mutation.
3. `npm run test:guides` exits 0 in a scratch copy with `pl-shared.patch` applied.

## Review evidence

`pl.diff`, `pl-status.txt`, `pl-shared.patch`, `pl-report.md`, and `pl-mutations.log.txt`.
