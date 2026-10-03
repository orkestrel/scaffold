# Unit floor-fix — repair the pool 0.0.14 review

## Role and engine

`astra` on GPT-6 Astra, reached as `codex exec` with reasoning effort high and `--sandbox danger-full-access`. Sole writer in `C:\Users\mikes\WebstormProjects\pool` on `main` at `aea3bda` (pushed). Make one commit; never push or publish. Perform the assignment yourself and spawn nothing.

## The reviews

Two Opus lanes over `66ddb12..aea3bda` (2026-10-03): `tmp/codex/review-floor/objective.md` (FAIL 3, 8) and `tmp/codex/review-floor/subjective.md` (FAIL 2, 3, 4). Repair every REQUIRED change in both and take the advisories named here.

## Required

1. **A blocked floor never parks a waiter** (objective 8, subjective R1). Under `min`, when nothing is idle, no refill runs, no disposal is pending, `#resources.size >= #min`, and retained records exist, settle the waiter with the same `cleanup` error `start()` gets. Test: `min: 1`, a failing destroy hook, `token.destroy()`, then `acquire()` rejects with `cleanup`. State the rule in the guide (`guides/pool.md:6-7`, `:131-133`, `:144`) and both acquire `@throws` blocks.
2. **A watch settlement after its disposal began is ignored, rejection included** (objective 3, subjective R5). Report to `error(…, 'watch')` only a rejection that declares the loss of a live record; return when the watch's signal is already aborted. Test: a watch built as `once(emitter, 'event', { signal })` (which rejects with `AbortError` on abort), then `clear()`, a failed validation, `token.destroy()`, and `destroy()`; `error` stays uncalled. Say "while the record is live" in `types.ts:79-80` and `guides/pool.md:120-123`.
3. **`token.destroy()` keeps its promise** (subjective R3). When the record is already being disposed, return that disposal, mapped to `cleanup` on failure, so the TSDoc's "a promise for this record's cleanup attempt" holds; test both outcomes.
4. **The holder's view of a lost lease** (subjective R2). State in the guide and the `release` summary (both files, equal) that the pool disposes a lost leased record while its holder still holds the token, that the token's `release()` and `destroy()` then do nothing, and that the holder learns of the loss from its own `watch` or `destroy` hook.
5. **The floor fence is tied to the guide** (subjective R4). Add presence guards for each line of the floor fence in `tests/guides.test.ts`, as the boundary fence has, so deleting `restarts` or moving `start()` fails.

## Advisories taken

- Check `#ending` before `#refill` calls `create`, so `void pool.start(); void pool.destroy()` in one turn launches nothing.
- Give the refill operation a rejection handler, as `#startCreate` has.
- Add the owed credit at `#lose` entry and withdraw it in the catch, so a consumer microtask between `resources.delete` and `#lose` resuming cannot leave a stale extra attempt.
- A test that removing only the validation guard (`Pool.ts:554-562`) fails: validation returning `false` with `restarts: 1` still refills.
- A test that a watch settling after its record became retained takes no strike (the `#survivors` check in `#lose`).
- Delete the second `reject` at `Pool.test.ts:147-148`, which proves nothing.
- Guide: tell consumers to bound their `create` and `destroy` hooks (a hook that never settles blocks every later refill); "resets the strikes" for the reset throughout; "keeps a record whose cleanup fails counted against `max`" for "retains capacity"; "A token ends once: after `release()` or `destroy()`, the other call does nothing" for the latch internals; "a started floor" for "an active floor"; state that a spent floor and a rejected `start()` still serve their live records; show a `watch` that releases its listener on abort in the floor fence; mention the floor in the `package.json` description and the `Pool` summary; add the refill entry into `available` in the phase diagram; name what `restarts` bounds in the README; rewrap the lines the subjective review lists.
- Leave the guide-wide negative-contraction sweep (subjective A12) for a separate unit.

## Gates

After the commit, each exit code read bare: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:src:core`, `npm run test:guides`, `npm run test:policy`, `npm run test:config`, `npm run test:setup`, `npm run build`, `npm test`, `npm run test:distribution`; then `git diff --check`. The final `git status --porcelain` is empty.

## Output

Write `tmp/codex/floor-fix-report.md` and return it as your final message: per item the repair and its red and green evidence, the gate table, the commit hash, and any deviation. No process diary.
