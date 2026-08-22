# Unit mcp-adopt report: the transport sheds what the supervisor now owns

Role `implementer`, engine Claude Opus 5, in the main checkout of `@orkestrel/mcp` at
0.0.21, with `@orkestrel/process` 0.0.6 installed from the local tarball. Briefs:
`unit-mcp-adopt-brief.md` plus `unit-mcp-adopt-brief-amendment1.md`. Returned 2026-08-21;
every criterion green, no deviation trigger fired. The unit's full diff is retained at
`mcp tmp/mcp-adopt/unit-mcp-adopt.diff` until the sweep; the instruments `drained.mjs` and
`orphan.mjs` sit beside it.

## What was deleted

`#evidence` (both capture sites, in `#teardown` and `#onExit`), `#release` and the
`Promise.race` in `#pump`, `#pumping` and its join, and the `this.#process = undefined`
clears that made the held reference unreachable. Code lines went 99 to 97; the file grew
211 to 219 lines because the contract comments outweigh the workaround comments they
replace. The `#pumping` deletion is the recorded in-scope decision: `#teardown` sets
`#closed` synchronously before its first `await` and `#pump` re-checks it after every
`await`, which is the mechanism that stops a post-close `message`; `#onExit` never joined
the pump; `#pump` has no rejecting path, so the join served neither ordering nor rejection.

## What was added

`#report(exit)` emits one `error` per lifetime when `exit.drained` is false, from the
single terminal moment — `#teardown` calls it after `destroy()` on the close path,
`#onExit` on every other path. Host measurement 2026-08-21 (`drained.mjs`, `orphan.mjs`):
a live child under `destroy()`, a natural exit, and a refused spawn all report
`drained: true`; a detached orphan descendant holding the inherited pipes reports
`drained: false` with the terminal moment at 1017 ms — the `drain` bound.

## Failing-first evidence

- Implementation changed, suite untouched: the descendant-held-pipe row timed out at its
  1000 ms budget — exit 1, `1 failed | 35 passed (36)`. Its subject was `#release`; the
  rewrite (`close() settles inside the supervisor drain bound...`) bounds on
  `PROCESS_DRAIN + CLOSE_SLACK` imported rather than a written number, and the descendant
  lives on an interval until killed, so an unbounded wait never settles and the bounded
  settle stays the whole proof.
- The notice row with the branch neutered: exit 1,
  `expected [] to have a length of 1 but got +0`; restored by the exact inverse edit.
  The control row proves the negative: a child whose own streams close reports no notice.

## Acceptance evidence

- `git status --porcelain`: the owned files plus the standing manifest pair, nothing else.
- Scoped `oxfmt --check` exit 0 (the guide needed one scoped `--write` first),
  `oxlint --deny-warnings` exit 0, `npm.cmd run check` exit 0.
- `test:src` exit 0, `Test Files 30 passed (30)`, `Tests 1074 passed (1074)`;
  `test:guides` exit 0, `138 passed (138)`; the transport file alone `38 passed (38)`.

## Consumer-visible changes, recorded

- `close()` on a descendant-held pipe settles at the `drain` bound (about 1 s) rather
  than at the child's own exit; the bound now does the work `#release` did.
- `send()` after `close()` or a natural exit rejects on the transport's own closed state,
  because a held tail is not a channel.

## Orchestrator integration

The unit returned a report-only patch for the shared `src/server/types.ts` (the
`evidence` Lifetime and close-path remarks describing the deleted capture mechanism, the
drain-cutoff notice sentence, and the bound's version). The Orchestrator applied it
2026-08-21 and verified scoped: `oxfmt --check src/server/types.ts` exit 0, `tsc --noEmit`
exit 0, `test:guides` exit 0 with `138 passed (138)`.

The cross-engine audit is `audit-mcp-adopt-brief.md`; its verdict file is
`audit-mcp-adopt-verdict.md`. The manifest pair still references the tarball; the restore
target is `^0.0.6` after process publishes, through the retained restore script.
