# Unit P6: the P5 audit's survivors

## Role and engine

Role `implementer` route `sol`, engine **GPT-5.6 Sol**, sandbox `workspace-write`, rooted at
`C:/Users/mikes/WebstormProjects/process`. Ruling record: the Opus audit of P5 (its findings
are restated in full here; the Orchestrator's rulings are inline). You perform the assignment
directly and spawn nothing beyond probes under `tmp/` that you delete after reading.

## Context ruling

The `writableEnded` disjunct P5 added to the stream door is RETAINED — it implements the P4
reconciliation's rule ("a later host fault on a writable channel still emits `protocol`":
quiet is scoped to a channel the package or consumer has ended, and only a channel still
writable classifies a later fault). P5's defect was absorbing that silently; P6 makes the
rule explicit, deletes the state it orphaned, fixes the F7 routing, and pins both sides.

## The findings

1. **Delete the dead state** (`src/server/Process.ts:99, 396-397, 413`): `#completeInput`
   sets `#inputFault` and clears it in the same synchronous step whenever `#input` reaches
   `0`, so `#inputFault !== undefined` implies `#input > 0` at every observable moment and
   the stream door's third disjunct can never decide. Delete the field and the disjunct —
   the door reads `writableEnded || this.#input > 0`. Every existing proof stays green.
2. **Comment the door** (`src/server/Process.ts:412-413`): the guard comment states, in the
   file's existing style, that `writableEnded` is what keeps a package-ended or
   consumer-ended channel quiet after the input-phase latch was removed, and that a
   `writable: true` channel never sets it until ended, which is what keeps a later host
   fault classifiable.
3. **Pin both sides of the door**: a proof that a channel whose input phase settled cleanly
   and whose stdin then reports a host stream error emits NO event and reaches no
   channel-failure state (the ended-channel quiet rule); the existing writable-channel
   protocol proof stays as the other side. Name the tests for the behaviour.
4. **F7 routing** (`src/server/execution/execute.ts:211-220`): the strict rejection branches
   on the fact that the input fault ended this run — the listener at `:154-162` already
   decides that (it sets `cause` and terminates only then) — never on the raw
   `inputFailure.signal.aborted` flag, which the stream handler and the unconditional
   `stdin.end()` can set on runs the input fault did not end. Route: `input` code only when
   the settled cause IS the input fault; otherwise `createExecuteError` unchanged.
5. **Pin the spawn side** (`tests/src/server/execution/execute.test.ts` near `:179`): a
   strict `execute` against an unspawnable file asserts the rejection's `code` is `'spawn'`.
6. **Guide rows** (`guides/process.md`): the `protocol` row at `:829` names both doors —
   the `launch`-after-`destroy` refusal AND a supervised channel's host-reported stdin
   fault — and the `input` row states it belongs to `execute` alone. The quiet-phase
   passage at `:343-345` states the rule the code holds: a channel the package or consumer
   has ended is quiet for its remaining life, and only a `writable: true` channel not yet
   ended surfaces a later host fault as `protocol`.

## Scope

- Owned: `src/server/Process.ts`, `src/server/execution/execute.ts`,
  `tests/src/server/Process.test.ts`, `tests/src/server/execution/execute.test.ts`,
  `guides/process.md` (the named passages).
- Standing entries: everything `git status --porcelain` lists at your start.
- No commits, installs, or `git checkout`/`restore`/`stash`/`reset`/`clean`. Use `npx.cmd`.
  The sandbox denies network and grandchild processes; the known Windows grandchild
  cleanup assertion reds under sandbox load — report whole-suite readings as observations;
  the Orchestrator re-takes the authoritative host run after you exit.

## Acceptance criteria, in this order

1. `git status --porcelain` adds nothing beyond the standing entries; report before/after.
2. Scoped `npx.cmd oxfmt --config .oxfmtrc.json --check` and
   `npx.cmd oxlint --config .oxlintrc.json --deny-warnings` on the owned files exit 0.
3. `npx.cmd tsc --noEmit --project tsconfig.json` exits 0.
4. Failing-first: the finding-3 quiet pin red against a probe restoring classification for
   an ended channel (or an equivalent probe showing the old door's answer — record what you
   used); the finding-5 spawn pin red against a probe re-coding the branch to raw
   `aborted` (the F7 defect's exact shape), green with the plant removed and its removal
   shown in the diff.
5. The execute suite file and the Process suite file each green under a scoped run;
   whole-project readings reported as observations.
6. `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=dot --project guides`
   exits 0.

## Output

The complete unelided diff (every hunk, line numbers intact — a hand-summarized diff was the
prior unit's defect); raw output and exit code per criterion including the failing-first
pairs; any deviation. No process diary.

## Deviation contract

Stop on: any existing proof reddening beyond the named door pins; finding 4's routing
needing a listener change beyond reading the fact it already computes; a criterion
unreachable. Wording within the fixed content is yours: decide, record, carry on.
