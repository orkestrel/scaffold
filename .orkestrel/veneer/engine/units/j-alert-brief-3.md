# J-ALERT — round 3 brief (successor to `j-alert-brief-2.md`, which stays in place unedited)

What changed and why: round 2 was audited by the analyst on GPT-6 Astra and the checker; the reconciled verdict `j-alert-audit-2-verdict.md` reads `FAIL 5`: the rewritten `close` `@returns` promises more than the source reads. One item closes it. Everything else in the round-1 and round-2 briefs binds here as written.

## Role and engine

`opus` on Opus 5.5 (native subagent), the writer of rounds 1 and 2, resumed in the same worktree (`C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/alert`, uncommitted; do not merge `main`, do not commit).

## Item

**A. The `close` `@returns` sentence (round-2 claim 5).** In `src/browser/types.ts`, the `AlertInterface.close` `@returns` reads "…or the `shown` token returns to the alert or the alert returns to the document before the close completes." A `closed.vn.alert` hook that reinserts the host or re-adds the token runs before that dispatch returns, and the source then reads the lifetime alone and resolves `true`. Narrow the sentence to the states the close reads before it dispatches `closed.vn.alert`, for example "…or the `shown` token returns to the alert or the alert returns to the document before `closed` is dispatched." Change no source behaviour and add no write after `closed`. Check that `#### Alert` and the `AlertInterface` Methods row still agree with the sentence (the Methods row carries the summary, not the `@returns`).

## Acceptance

`npm run check:src:browser`; `npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser guides/veneer.md`; `npm run test:guides`; `npm run test:policy`; each exit 0. Your final message: the sentence before and after, the commands with their exits, and `git status --short`. Spawn nothing; no `prove` call is reachable.
