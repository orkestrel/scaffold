# Unit P4-fix: the process audit round's survivors

## Role and engine

Role `implementer`, engine **GPT-5.6 Sol**, sandbox `workspace-write`, rooted at
`C:/Users/mikes/WebstormProjects/process`. You perform the assignment directly and spawn
nothing. This is a fix round: its findings come from a blind two-lane audit
(`scaffold/.orkestrel/campaign/audit-process-reconciliation.md` is the ruling record — read
it), and your work is audited afterwards by the engine that did not write the engine half.

## The findings, each with its bounding constraint

1. **Quiet closure is broken on the `end`-after-`input` path** (executed: a 4 MiB constructor
   `input` to a non-reading child that later exits emits a `protocol` error from the package's
   own write). Fix: an input-phase state — a fault arising from the constructor-supplied
   `input` write or its `end` is package-initiated: no event, no channel-failure
   classification for it. CONSTRAINT: a HOST fault on a `writable: true` channel after the
   input phase still surfaces exactly as shipped; do not widen the quiet window past the
   input write's own lifecycle. The executed vector becomes the pin (failing-first: red on
   the current tree, green after).
2. **The flood adaptation's control comparison reads half the ending**
   (`tests/src/server/Process.test.ts` near `:462`): replace with the pair comparison —
   escalated `SIGKILL`, or BOTH `code` and `signal` equal to the untrapped control's.
   CONSTRAINT: the POSIX escalation expectation stays intact.
3. **Send-during-stop divergence from 0.0.4 is RULED deliberate and kept**: a send issued
   after `stop` began resolves `false` (0.0.4 resolved `true` and then destroyed the pipe).
   Document it — `send`'s TSDoc and the guide's stdin section state that a send after
   teardown begins answers `false`, naming the 0.0.4 divergence — and pin it with a proof
   driving a real send after `stop` starts.
4. **The `execute` stdin-fault path has no executed proof**: add one to
   `tests/src/server/execution/execute.test.ts` — a pending `input` write faulted by the
   child's exit on this host — asserting `failed: true`, the `strict` rejection, and its
   `cause`; assert the no-fault control unchanged. (Note: with finding 1's input-phase state,
   decide and RECORD how `execute`'s input fault interacts — `execute` writes `input` with a
   callback and terminates on its fault BY DESIGN; the quiet rule is `Process`'s constructor
   path, not `execute`'s. Keep the two behaviours distinct and state each where it lives.)
5. **Two stdin prose sentences over-claim** (`guides/process.md` near `:341` and `:348`): the
   full-pipe sentence gains its size condition (a write larger than the host's pipe buffer to
   a child that never reads it); the fd-0 sentence matches the TSDoc's measured modality
   ("can leave", with the dated measurement) instead of a universal.
6. **The ended-ways enumeration drifted across three homes**: `src/core/types.ts:241-244` (a
   0.0.4-byte-identical sentence), the guide's result section, and `helpers.ts:733` state one
   rule — name the host-fault door in all three, and document the `failed`-with-no-flags
   residual as that door's signature so a `strict: false` caller can interpret it. CONSTRAINT:
   no new `ExecuteResult` member.
7. **Delivery proof additions**: `errors.count === 0` on the delivery-bound case, and a
   companion case with `delivery` set and a READING child asserting the confirmed `true`.
8. **Distribution-proof provenance** (`tests/distribution.test.ts`): one header sentence —
   the gate chain builds before packing (`prepublishOnly` runs `build` ahead of
   `test:distribution`), so the flag-suppressed `prepack` leaves the chain sound; a
   standalone run reads the artifact on disk.

## Scope

- Owned: `src/server/Process.ts`, `src/server/execution/execute.ts`, `src/core/types.ts`,
  `tests/src/server/Process.test.ts`, `tests/src/server/execution/execute.test.ts`,
  `guides/process.md`, `tests/distribution.test.ts` (the header sentence only).
- Standing entries: everything `git status --porcelain` lists at your start.
- No commits, installs, publishes, or credential reads. No
  `git checkout`/`restore`/`stash`/`reset`/`clean`. The sandbox denies network. Use `npx.cmd`.

## Acceptance criteria, in this order

1. `git status --porcelain` adds nothing beyond the standing entries (every owned file is
   already standing except possibly `execute.test.ts` — report its before/after lines).
2. Scoped `npx.cmd oxfmt --config .oxfmtrc.json --check` and
   `npx.cmd oxlint --config .oxlintrc.json --deny-warnings` on the owned files exit 0.
3. `npx.cmd tsc --noEmit --project tsconfig.json` exits 0.
4. Failing-first for findings 1, 2 (the pair comparison red against a planted
   code-differing control BEFORE the repair, or an equivalent expression — record the shape),
   3's pin, and 4's proof.
5. As an OBSERVATION: `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server`
   raw (the Orchestrator takes the authoritative host run after you exit; do not iterate
   against sandbox-only failures such as the grandchild-tree proofs).
6. `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=dot --project guides`
   exits 0.

## Output

The complete diff; raw output and exit code per criterion including every failing-first pair;
the finding-4 interaction ruling recorded; any deviation. No process diary.

## Deviation contract

Stop on: finding 1's constraint unimplementable without widening the quiet window (name why);
a criterion unreachable. Wording within the fixed content and proof placement are yours:
decide, record, carry on.
