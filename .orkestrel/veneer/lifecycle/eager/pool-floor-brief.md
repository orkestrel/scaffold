# Unit floor — `@orkestrel/pool` 0.0.14: a warm floor, loss, and a refill bound

## Role and engine

`astra` on GPT-6 Astra, reached as `codex exec` with reasoning effort high and `--sandbox danger-full-access`. Sole writer in `C:\Users\mikes\WebstormProjects\pool` on `main` at `66ddb12`. Make two commits (the contract bump, then the capability); never push or publish. Perform the assignment yourself and spawn nothing.

## Why

The user ruled (2026-10-03, D13 in `C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\lifecycle\eager\design-brief.md`) to put the resource lifecycle into this package now. `@orkestrel/browser`'s `browse` server is the first consumer: a small pool (one to three Chromium browsers) created eagerly at server start, replaced when one dies, bounded against a crash loop, and torn down in one place. `@orkestrel/probe` (its `ROADMAP.md` item 1) is the second. Read, for the case and its rulings: `resource/ruling.md` (the judge's ruling, V1 to V5 required), `resource/position-now.md` (the type sketch), `eager/revision-3.md` § "Workarounds Pool 0.0.13 forces" (W1 to W8, what each member replaces), all under `C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\lifecycle\`. This checkout's `AGENTS.md` and rules govern; the guide is `guides/pool.md`.

## Commit 1: the contract bump

Re-pin `@orkestrel/contract` to `^0.0.19`, update the lockfile with an install inside this checkout, and run the gates. Report whether `@orkestrel/emitter` `^0.0.11` still pulls a `^0.0.18` contract copy (it is not this unit's to change).

## Commit 2: the capability, types first

The contract, in `src/core/types.ts` terms (names are fixed; shape the internals as the code needs):

- `PoolOptions.min?: number`: a floor of records the pool keeps warm. While `min` is set, the pool creates only to restore the floor, never because a waiter is queued. Refuse `min` greater than `max`, and `min` below `max` (no consumer needs capacity above the floor; lifting that refusal later is additive), as `invalid`; `max` defaults to `min`.
- `PoolOptions.restarts?: number`: the bound on consecutive failed refills. Required whenever `min` is set, with no default; refused as `invalid` when `min` is set without it, or when it is not a non-negative safe integer.
- `PoolOptions.watch?: (value: T, signal: AbortSignal) => Promise<unknown>`: called once per record after its `create` resolves; when the promise settles, the record is lost, and the pool disposes it (idle or leased) and refills the floor. The signal aborts when the record's disposal begins by any path (`validate`, `clear`, `destroy`, a token's `destroy`, or the watch itself), so the consumer releases its listeners (V4). A watch that rejects counts as a loss and reaches the `error` channel.
- `PoolInterface.start(): Promise<void>`: fills the floor; resolves when `min` live records are owned; rejects with `create`, carrying the last cause, when the refill bound is spent; calling it again after the floor was spent resets the bound and fills again. Without `min`, it resolves at once.
- `PoolToken.destroy(): Promise<void>`: the holder declares its record lost; the pool disposes that exact record instead of returning it to idle, and refills the floor. A repeat call, and a call after `release()`, are no-ops.
- The bound: a strike is a failed `create` during a refill, or the loss of a record that was never leased since its creation; a granted lease resets the strikes; when strikes exceed `restarts`, the floor is spent: no further refill until `start()` is called again, and an `acquire` with nothing idle rejects with `create`. A leased record's loss always gets one refill attempt, even when the bound is spent, and that attempt's failure counts a strike (V5). Pin the last allowed failure and the first refused one in tests (V2).
- Under `min`, a record whose `destroy` hook rejects stays counted against `max` and is not replaced, so the pool runs short and never runs a replacement beside a resource that may still live; `destroy()` then rejects with `cleanup` (the Orchestrator's correction of V1). Without `min`, `#clean` keeps its 0.0.13 behavior.
- Under `min`, an `acquire` queued while the floor is short waits for a refill and never triggers a `create` (V3); acceptance: with an acquire queued during a failed refill, the `create` calls equal the refills.
- No holder field, no event payloads, no `acquire(options)`, no token signal (V6).
- Without `min`, every behavior and every existing test is unchanged; `@orkestrel/worker` (which pins `^0.0.13` and forwards only named options, `C:\Users\mikes\WebstormProjects\worker\src\core\Worker.ts:81-89`) keeps working.
- The `release` event's wording (`src/core/types.ts:40-41`) must stay true when a refill reaches idle; fix the contract text and the guide row together.

## Proofs

Real implementations, deterministic tests (`.claude/rules/tests.md`): each rule above gets a case that fails without its code, including adverse orderings (a loss during a refill, a refill whose create rejects, a destroy hook that rejects, a watch that settles twice or rejects, a token destroyed after release, `destroy()` during `start()`, an acquire queued while the floor is short). Record each red and green command with counts.

## Version, guide, and gates

Set the version to 0.0.14. Update `guides/pool.md` (rows, the lifecycle, the floor and loss rules), `README.md`, and every TSDoc in parity. After each commit, each exit code read bare: `npm run format:check`, `npm run lint:check`, `npm run check`, the scripts `package.json` declares for this package's tests (read them; at least the core project, the guides, the policy, and the config), `npm run build`, then `npm test`; then `git diff --check`. The final `git status --porcelain` is empty. Never raise a budget.

## Output

Write `tmp/codex/floor-report.md` and return it as your final message: per rule its red and green evidence, the emitter finding, the gate tables, both commit hashes, and any deviation. No process diary.

## Deviation contract

Stop only when a rule cannot hold without changing a contract this brief does not name, and report: expected, found, evidence, and one hypothesis.
