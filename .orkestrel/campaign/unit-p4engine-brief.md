# Unit P4-engine: stdin delivery — fault surfacing and the `delivery` bound

## Role and engine

Role `implementer`, engine **GPT-5.6 Sol**, sandbox `workspace-write`, rooted at
`C:/Users/mikes/WebstormProjects/process`. You perform the assignment directly and spawn
nothing: do the work yourself inside this session.

## Objective

Implement design round 4's reconciled subject-A engine
(`scaffold/.orkestrel/campaign/design4-reconciliation.md` is the record; this brief is
self-contained): host-reported stdin faults surface fast through the existing `error` event
and the affected `send`, an optional `delivery` bound settles unconfirmed writes, and the
contract's prose stops over-claiming. Source and types only — proofs and the guide belong to
the next unit.

## Context

Authority in this checkout: `AGENTS.md`; `.claude/rules/typescript.md`,
`.claude/rules/names.md`, `.claude/rules/patterns.md`, `.claude/rules/architecture.md`,
`.claude/rules/writing.md`. Guide `guides/process.md` read-only.

Measured facts (2026-08-21, Windows 11 / Node v24.18.1): a child closing its OWN fd 0 leaves
the parent's pipe writable — `write` returns `true`, no callback error, no stream error, child
alive — while POSIX reports `EPIPE`; a write AFTER child closure fails
`ERR_STREAM_DESTROYED`. So `true` means the host accepted the bytes, never that the child read
them, and some hosts report no fault at all.

Current code: `src/server/Process.ts:136-141` forwards child errors and swallows stdin errors;
`:201-213` is `send` (resolves `false` on a write-callback error, no event); `:366` teardown
destroys stdin. `src/server/execution/execute.ts:143` swallows stdin errors; `:162-163` writes
`input` then ends; `:185-187` already supports failed results and strict rejection;
`src/server/helpers.ts:756-772` derives `failed` from a captured host cause.
`ProcessOptions` timers validate through `validateTimer` (`src/server/helpers.ts:481`);
`ExecuteOptions.timeout` documents `0`-disables (`src/core/types.ts:304-305`).
`ProcessEventMap.error` exists (`types.ts:86-103`).

## The design, fixed by the reconciled round

1. HOST-REPORTED stdin faults: replace the swallow in `Process` with channel-failure handling —
   on a stdin `error` (or a write-callback error), the channel enters ONE failed state
   (deduplicate the two doors); every pending and later `send` settles `false`; the `error`
   event emits a `ProcessError` coded `protocol` whose `cause` is the host fault, ONCE.
   Package-initiated closure — teardown, `end` after `input`, destroy, `writable: false` —
   stays quiet: no event, `send` answers `false` as today.
2. In `execute`: a reported input-write fault terminates the child, marks the result failed
   with the host cause, and is the rejection cause under `strict`. The swallow there is
   likewise replaced with capture; no result-shape change (helpers already derive `failed`
   from a captured cause).
3. `ProcessOptions.delivery?: number` — milliseconds an unconfirmed `send` waits before
   resolving `false`; omitted or `0` disables; validated through `validateTimer` with the
   subject `"option 'delivery'"`; the timer clears on settlement and on teardown and holds the
   event loop open never (unref or clear — verify which the codebase's timer idiom uses). A
   `delivery` expiry emits NO event — nothing host-reported happened.
4. TSDoc corrections in `src/core/types.ts`: `send` states that `true` means the host accepted
   the bytes rather than that the child read them; the "stays pending until the child drains
   it" claim is corrected (an ordinary line settles when the kernel accepts it; only a full
   pipe holds it); the Windows fd-0 limit is stated with its measurement date; `delivery` is
   documented with its default-disabled convention; the `error` event's TSDoc names the stdin
   channel fault among its sources. `ProcessInterface` gains NO new member.

## Scope

- Owned: `src/server/Process.ts`, `src/server/execution/execute.ts`, `src/core/types.ts`.
- Off-limits: `tests/**`, `guides/**`, `package.json` (it carries the campaign's `prepack`
  line — standing), `tests/distribution.test.ts` (standing campaign edit), everything else.
- Standing entries, expected: ` M package.json`, ` M tests/distribution.test.ts`.
- Make-false sweep FIRST, before any edit: grep `tests/` and `guides/` for assertions pinning
  the swallow, the `send` semantics you change, the event set, or `ProcessOptions` member
  enumerations. Report every hit and whether it survives your change. A hit your change makes
  FALSE in an off-limits file does not stop the unit — the next unit owns tests and guide —
  but it must be NAMED in your report so that unit's brief carries it. (The known pending-write
  test at `tests/src/server/Process.test.ts:171-185` must survive: with `delivery` unset,
  behaviour is unchanged.)
- No commits, installs, publishes, or credential reads. No
  `git checkout`/`restore`/`stash`/`reset`/`clean`. The sandbox denies network. Use `npx.cmd`.

## Acceptance criteria, in this order

1. The make-false sweep report.
2. `git status --porcelain` adds exactly the owned files to the standing entries.
3. `npx.cmd oxfmt --config .oxfmtrc.json --check` on the owned files exits 0.
4. `npx.cmd oxlint --config .oxlintrc.json --deny-warnings` on the owned files exits 0.
5. `npx.cmd tsc --noEmit --project tsconfig.json` exits 0.
6. As an OBSERVATION (the suites spawn real children and the sandbox may refuse):
   `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server`
   — report the raw result whatever it is; do not iterate against it.

## Output

The complete diff; the sweep report with the named off-limits hits for the next unit; raw
output and exit code per criterion; any deviation. No process diary.

## Deviation contract

Stop on: the deduplication requiring state a listed file cannot hold, a criterion unreachable,
the design contradicting an authority file. Naming of private members, the failed-state
representation, and timer idiom are yours: decide, record, carry on.

## Amendment 1, 2026-08-21, fix round after the host reading

Your engine landed and its sweep was right, but the Orchestrator's authoritative host run
(outside the sandbox) reds ONE pre-existing proof, reproducibly and in isolation:

    Process > caps retained lines while termination drains a flooding child
    AssertionError: expected null to be 'SIGKILL'  (Process.test.ts:267)

The flooding child that previously trapped SIGTERM and had to be escalated to SIGKILL now
exits on its own — `exit.signal` is null. The cause to verify and fix: `#kill` now runs
`#settleWrites()` BEFORE `stopChild`, and settling must not change what the CHILD observes.
If your settle destroys or ends stdin (or otherwise hands the child an early EOF), the child's
termination path changes and this proof catches it. The requirement stands as designed —
pending `send` promises settle `false` at teardown — but the settlement is a PROMISE-side
action: resolve the pending callbacks and refuse new sends without altering the stream the
child sees before `stopChild` has done its work (settle after confirmation, or settle the
promises without touching the stream — your call, recorded).

Keep everything else. Fix, then close: (a) scoped format/lint/tsc on the owned files exit 0;
(b) as an observation, the sandbox run of
`npx.cmd vitest run --config vite.config.ts --no-cache --reporter=verbose --project src:server tests/src/server/Process.test.ts`
reported raw (the Orchestrator re-takes the authoritative host reading after you exit — do not
iterate against sandbox-only failures such as the grandchild-tree proofs).
