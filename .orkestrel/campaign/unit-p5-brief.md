# Unit P5: process polish (fix-round audit findings F1, F2, F3, F7)

## Role and engine

Role `implementer` route `sol`, engine **GPT-5.6 Sol**, sandbox `workspace-write`, rooted at
`C:/Users/mikes/WebstormProjects/process`. Ruling record:
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/audit-fixrounds-reconciliation.md`
§ Findings routed — read it, plus the finding detail in the Opus lane's report quoted there.
You perform the assignment directly and spawn nothing beyond probes under `tmp/` that you
delete after reading. Audited afterwards by Opus.

## The findings

1. **F1 — two named doors.** `src/server/Process.ts` `#failInput(cause, emitted = false)`
   selects between two algorithms with a boolean: the stream door (may stay quiet under the
   input phase) and the callback door (always classifies). Split into two named private
   methods, one per door, no boolean at any call site; the stream-door method carries the
   phase rule, the callback-door method the failure-state rule. Behaviour is unchanged —
   every existing proof stays green untouched.
2. **F2 — derive the phase state.** `#inputFault` clears only through a quiet stream error
   while the phase is open; a callback fault with no following stream `error` would leave it
   set for the channel's life. Clear it whenever `#input` reaches `0`, independent of
   `#inputEvent`, and remove `#inputEvent` if that makes it derivable. Unreachable on
   Node's current write-failure ordering, so this is drift-proofing: no observable
   behaviour change, every existing proof stays green untouched.
3. **F3 — pin the residual signature.** `guides/process.md:644-646` and
   `src/core/types.ts:250-252` claim the input-fault residual is `failed: true` with the
   state flags false, `code: 0`, `signal: null`; `tests/src/server/execution/execute.test.ts`
   holds the exact vector near `:202` and asserts `failed` alone near `:211`. Add
   `expect(result).toMatchObject({ expired: false, aborted: false, truncated: false, code: 0, signal: null })`
   beside the existing assertion.
4. **F7 — name the input-fault door.** `src/server/execution/execute.ts:204` rejects the
   newly reachable input-fault run through `createExecuteError`, which codes it `spawn` and
   phrases it as an exit-code message. Give the input-fault rejection a code and message
   naming its door: add the code member where the error codes live (`src/core/types.ts` /
   `src/core/errors.ts` per the file layout), route `execute`'s strict rejection through it
   when the cause is the input fault, update the guide's strict-mode sentence, and pin the
   code and message in the execute suite. Keep the `spawn` code's behaviour for genuine
   spawn faults byte-identical.

## Scope

- Owned: `src/server/Process.ts`, `src/server/execution/execute.ts`, `src/core/types.ts`,
  `src/core/errors.ts`, `guides/process.md` (the named passages),
  `tests/src/server/execution/execute.test.ts`, `tests/src/server/Process.test.ts` (only if
  a rename requires it).
- Standing entries: everything `git status --porcelain` lists at your start.
- No commits, installs, or `git checkout`/`restore`/`stash`/`reset`/`clean`. Use `npx.cmd`.
  The sandbox denies network and grandchild processes; report any timing-sensitive or
  whole-suite reading as an observation with both readings — the Orchestrator re-takes the
  authoritative host run after you exit.

## Acceptance criteria, in this order

1. `git status --porcelain` adds nothing beyond the standing entries; report before/after.
2. Scoped `npx.cmd oxfmt --config .oxfmtrc.json --check` and
   `npx.cmd oxlint --config .oxlintrc.json --deny-warnings` on the owned files exit 0.
3. `npx.cmd tsc --noEmit --project tsconfig.json` exits 0.
4. Failing-first for F3 (the added flags assertion red against a mutated residual — a probe
   flipping one flag is acceptable; record what you used) and F7 (the code-and-message pin
   red against the unfixed `spawn`-coded rejection).
5. Scoped: the execute suite file and the Process suite file each exit 0 under
   `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server`
   filtered to the file, or the whole project as an observation if filtering is unavailable.
6. `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=dot --project guides`
   exits 0.

## Output

The diff; raw output and exit code per criterion including the failing-first pairs; any
deviation. No process diary.

## Deviation contract

Stop on: any existing proof reddening under F1 or F2 (they are behaviour-preserving by
prescription); a prescription that cannot be implemented as ruled; a criterion unreachable.
Naming and message wording are yours within the rules: decide, record, carry on.
