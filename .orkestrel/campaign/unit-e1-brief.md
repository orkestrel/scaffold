# Unit E1: bound the signing tools — `SEAOptions` gains `timeout`

## Role and engine

Role `implementer`, engine **GPT-5.6 Sol**, sandbox `workspace-write`, rooted at
`C:/Users/mikes/WebstormProjects/sea`. You perform the assignment directly and spawn nothing:
do the work yourself inside this session.

## Objective

The ROADMAP row (recorded at process's 0.0.3 adoption): `SEAOptions` exposes no `timeout`, so
`runShell` cannot bound a signing tool whose descendants inherit stdio — a hung `signtool` or
`codesign` hangs the build. Add the option and thread it to every shell the build spawns.

## Context

Authority in this checkout: `AGENTS.md`; `.claude/rules/typescript.md` (types first),
`.claude/rules/names.md` (single-word option keys), `.claude/rules/tests.md`,
`.claude/rules/documentation.md`, `.claude/rules/writing.md`. Guide: `guides/sea.md`, granted
for the rows and sentences the new option obliges.

Ground (verified 2026-08-21 from the fleet absorption; confirm first-hand): `SEAOptions` is
`src/server/types.ts:330-342` — `on`, `error`, `name`, `entry`, `output`, `assets`,
`compression`, `windows`, `root`, `signal`, `blob`; no `timeout`. `SEAShellOptions`
(`types.ts:107-111`) already carries `timeout`, and `runShell` (`src/server/helpers.ts:163-202`)
already maps it to `runSync(..., { timeout })` with an `expired → SEAError('TIMEOUT')`
translation. The build's shell object is composed at `SEA.ts:287` from `signal` alone; signing
and verify spawns run through `runShell` at `SEA.ts:324`, `:334`, `:375-377`, and siblings.
Whether `runSync` applies a default timeout when omitted is UNKNOWN — read the installed
`@orkestrel/process` declaration and report what you find before relying on either answer.

## The design

1. Types first: `SEAOptions` gains `readonly timeout?: number` — milliseconds bounding each
   spawned shell; absent means unbounded (or the process package's own default if it has one —
   your reading above decides the TSDoc's wording). Single word, top-level, TSDoc per the
   package's option idiom.
2. Thread it: the shell object composed at `SEA.ts:287` (and any sibling composition site —
   sweep `runShell` callers) carries `timeout` from `this.#options.timeout` beside `signal`,
   so every signing, verify, and tool spawn is bounded when the caller asked.
3. Proofs, in the matching test file(s): the option reaches a real spawned shell — drive a
   real short-lived command through the path with a generous timeout (passes), and a real
   hanging command (a child that sleeps beyond a small timeout) asserting the `TIMEOUT`
   `SEAError` surfaces through the public door the option feeds. Follow the file's existing
   real-process idiom; no mocks. If the public build path cannot be driven hermetically on
   this host, prove at the narrowest public seam that can be (report which seam and why).
4. Guide: the `SEAOptions` row gains the member; any sentence enumerating the options moves
   with it; delete any count your edits touch.
5. `package.json` gains `"prepack": "npm run build"` in `scripts`, directly before
   `prepublishOnly` — wait: this manifest ALREADY carries it from the fleet sweep (verify);
   if present, touch nothing there.

## Scope

- Owned: `src/server/types.ts`, `src/server/SEA.ts`, `src/server/helpers.ts` (only if the
  threading genuinely needs it — report if so), the matching `tests/src/server/*.test.ts`
  file(s) for the proofs, `guides/sea.md` rows.
- Off-limits: everything else. Before writing, run the make-false sweep yourself: grep
  `tests/` and `guides/` for assertions or fences enumerating `SEAOptions` members or pinning
  the shell composition, and report every hit with whether your grant covers it — a hit
  outside your owned set STOPS the unit before you edit.
- Standing conditions: `package.json` carries the campaign's `prepack` line (` M` in status) —
  leave the file; the tree is otherwise clean; `node_modules` installed.
- No commits, installs, publishes, or credential reads. No
  `git checkout`/`restore`/`stash`/`reset`/`clean`. The sandbox denies network and may deny
  process trees: your hanging-command proof spawns ONE child — if the sandbox refuses even
  that, record the refusal as an observation, leave the proof in place, and the Orchestrator
  takes the run on the host. Use `npx.cmd`.

## Acceptance criteria, in this order

1. The make-false sweep report (before any edit), with every hit covered or the unit stopped.
2. `git status --porcelain` adds exactly the owned files to the standing entries.
3. Scoped `npx.cmd oxfmt --config .oxfmtrc.json --check` and
   `npx.cmd oxlint --config .oxlintrc.json --deny-warnings` on the owned files exit 0.
4. `npx.cmd tsc --noEmit --project tsconfig.json` exits 0.
5. Failing-first where expressible: the timeout proof red before the threading (the option
   ignored), green after; where the red cannot be expressed without the option existing,
   record the shape you used instead.
6. `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=verbose --project src:server <owned test file>`
   — every pre-existing proof passes; report totals (sandbox refusals as observations).
7. `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=dot --project guides`
   exits 0.

## Output

The complete diff; the sweep report; raw output and exit code per criterion; the `runSync`
default-timeout reading; any deviation. No process diary.

## Deviation contract

Stop on: a sweep hit outside scope; the threading needing a type or file not granted; the
proof unable to reach any public seam. TSDoc wording, proof placement, and fixture commands
are yours: decide, record, carry on.

## Amendment 1, 2026-08-21, after the first launch stopped on a path mismatch

The stop was correct: the brief cited `src/server/SEA.ts`, and the class lives in its
extension-category folder. The grant is corrected: OWNED are `src/server/types.ts`,
`src/server/seals/SEA.ts`, `src/server/helpers.ts` (only if genuinely needed),
`tests/src/server/seals/SEA.test.ts`, and the `guides/sea.md` rows — every earlier mention of
the un-nested paths reads as these. Your first run's temporary implementation demonstrated the
design (the TIMEOUT red/green pair); re-apply it as the real change and close every criterion
from the top. Everything else in the brief is unchanged.
