# Unit P4-proofs: the process family's proofs and prose

## Role and engine

Role `implementer`, engine **Opus 5**, native subagent, sole writer in
`C:/Users/mikes/WebstormProjects/process`. You perform the assignment directly and spawn
nothing.

## Objective

Close design round 4's proof and prose obligations on top of the landed engine: the
stdin-fault and `delivery` proofs, the `lines` framing proofs and contract prose, the guide
corrections the engine's sweep enumerated, and one host adaptation for a pre-existing
POSIX-shaped proof.

## Context

Authority: `AGENTS.md`; `.claude/rules/tests.md`, `.claude/rules/typescript.md`,
`.claude/rules/documentation.md`, `.claude/rules/writing.md`. The engine unit's changes are in
the working tree (`src/core/types.ts`, `src/server/Process.ts`,
`src/server/execution/execute.ts`) — read them first-hand; they are your subject, not yours to
edit. The reconciliation record: `scaffold/.orkestrel/campaign/design4-reconciliation.md`.

Measured facts you rely on (2026-08-21, this host): lone `\r` frames a line in every position
under `crlfDelay: Infinity`; a chunk-split CRLF joins as one break; `"a\r\rb\n"` yields an
empty middle line. A child closing its OWN fd 0 leaves the parent's pipe writable here (no
fault ever reported), while POSIX reports `EPIPE`; a write AFTER child closure fails
`ERR_STREAM_DESTROYED`. This host ends a terminated child with a code and a NULL signal — a
child cannot trap-and-survive the stop path here, so escalation-shaped expectations are
host-conditional.

Host state: `src:server` currently reads `1 failed | 119 passed | 6 skipped (126)` — the one
red is the pre-existing `caps retained lines while termination drains a flooding child`
(`tests/src/server/Process.test.ts:267`, expects `exit.signal === 'SIGKILL'`), which fails
with HEAD's source too (verified). It is yours to adapt, not the engine's fault.

## The obligations

### 1. Guide corrections (the engine's sweep enumerated these; verify each against the tree)

In `guides/process.md`: extend the `error` event source text (`:264-265`, `:872-874`) with the
`protocol`-coded stdin channel fault; add `delivery` to the `ProcessOptions` table
(`:267-279`); replace "line handled" with host byte acceptance and state it does not prove the
child read the bytes (`:320-322`); replace the swallowed-fault claim (`:324-327`); correct the
every-non-reading-child-holds-the-write claim (`:328-330` — only a full pipe holds it, and
`delivery` can settle it earlier); state the Windows fd-0 limit with its measurement date and
that consumer deadlines remain mandatory; state the `lines` framing rule (LF, CRLF, and bare
CR each terminate; split CRLF joins; name the progress-bar consequence) in § Supervised
children (`:261-263`); correct the backlog terminator-accounting sentence (`:314-316`) to a
logical framing byte. Record the POSIX `EPIPE` fast path as a host-residue observation naming
its settling command, in the guide's existing form (`:1030-1038` is the precedent). Delete any
count your edits touch.

### 2. `lines` TSDoc

`src/core/types.ts` (`lines`, near `:176`): state the terminator rule. (The engine unit owned
this file for other members; the `lines` TSDoc is yours — coordinate is moot, the engine has
exited.)

### 3. Proofs, in `tests/src/server/Process.test.ts` (and a fixture file beside it if the
   suite's idiom uses one)

- Framing: a real child writing `"a\rb\n"`, `"a\r\nb\n"`, and `"x\ry\rz"` (no trailing break)
  to stdout; assert the exact lines `child.lines` yields per the measured rule.
- Delivery bound: a real non-reading child with `writable: true` and `delivery: 50`; the 4 MB
  write the existing pending-write test uses resolves `false` before any teardown; the
  EXISTING unbounded test (`:171-185`) stays green untouched and is named beside the new one
  as its control.
- Host-reported fault: on THIS host, drive the `ERR_STREAM_DESTROYED` door (a write after the
  child closed and settled) and assert the fault surfaces per the engine's design — `send`
  false AND one `protocol`-coded `error` event carrying the cause — gating on a runtime probe
  where the door is host-conditional; where only POSIX can produce `EPIPE`, record the case as
  a host-residue observation in the guide (already covered in point 1), not a fabricated test.
- Package-initiated quiet: teardown with a pending write emits NO error event and settles the
  write `false` (this also pins the engine's settle-ordering work).

### 4. The host adaptation

`caps retained lines while termination drains a flooding child`: gate its
escalation-shaped assertions on a runtime probe of how THIS host's stop path reports a child
that traps the stop signal (follow the probe-with-control idiom probe's own suite established
— a real child installing a handler, the reading taken through the same door the proof uses).
Where the host cannot express trap-and-survive, the proof skips with the measured citation;
its retained-lines and truncation assertions stay live if they are separable without
contortion (report the choice). Do not weaken the POSIX expectation.

## Scope

- Owned: `guides/process.md`, `tests/src/server/Process.test.ts` (+ one fixture beside it if
  needed), and in `src/core/types.ts` ONLY the `lines` TSDoc block.
- Off-limits: `src/server/**`, every other file. Standing entries (all expected):
  ` M package.json`, ` M tests/distribution.test.ts`, ` M src/core/types.ts`,
  ` M src/server/Process.ts`, ` M src/server/execution/execute.ts`.
- No commits, installs, or git checkout/restore/stash/reset/clean. Use `npx.cmd`.

## Acceptance criteria, in this order

1. `git status --porcelain` adds exactly the owned files to the standing entries.
2. Scoped `npx.cmd oxfmt --config .oxfmtrc.json --check` and
   `npx.cmd oxlint --config .oxlintrc.json --deny-warnings` on the owned files exit 0.
3. `npx.cmd tsc --noEmit --project tsconfig.json` exits 0.
4. `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=verbose --project src:server`
   exits 0 on this host — every proof passes or skips with a measured citation; report totals
   against the `1 failed | 119 passed | 6 skipped` baseline and name every skip.
5. `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=dot --project guides`
   exits 0.
6. Failing-first where expressible: each NEW behavioural proof recorded red against a
   temporarily reverted engine line ONLY if that is expressible by rewriting text within your
   owned files (it usually is not — the engine is off-limits); otherwise record the shape you
   used (a control within the proof).

## Output

The diff; raw output and exit code per criterion with baselines and the skip inventory; the
host-adaptation probe's readings; any deviation. No process diary.

## Deviation contract

Stop on: an engine behaviour contradicting the design (that is a finding against P4-engine —
report, do not patch `src/server`); parity red outside your edits; a criterion unreachable.
Proof naming, fixture shapes, and prose wording within the fixed content are yours: decide,
record, carry on.
