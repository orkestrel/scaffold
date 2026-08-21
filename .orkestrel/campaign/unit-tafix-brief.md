# Unit TA-fix: the test audit round's survivors

## Role and engine

Role `implementer`, engine **Opus 5**, native subagent, sole writer in
`C:/Users/mikes/WebstormProjects/test`. This is a fix round; the ruling record is
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/audit-test-reconciliation.md`
— read it first. The reviewer's full detail (exact lines, settling assertions, bounds) is in
the session's audit report; the reconciliation quotes what you need. Audited afterwards by
Sol. You perform the assignment directly and spawn nothing.

## The findings, each with its bounding constraint

1. **`readName` image chain** (`src/browser/helpers.ts:626`, tests near
   `tests/src/browser/helpers.test.ts:701`): return `element.alt` only when it is
   non-empty and let the chain continue otherwise, so `<img title="Chart">` resolves
   through the `title` step. Add that case beside the existing `alt` case. CONSTRAINT: an
   image with a non-empty `alt` keeps answering `alt` even when `title` is also present.
2. **Floor-omitted strictness** (`src/browser/helpers.ts`, `readBackdrop` near `:973` and
   `contrast` near `:1017`): the backdrop walk reports whether it terminated on an opaque
   layer; with `floor` omitted, `contrast` refuses when it did not — so a stack whose only
   painted layers are translucent refuses instead of measuring onto the assumed canvas.
   CONSTRAINTS: a translucent stack that reaches an opaque ancestor keeps measuring
   (`tests/src/browser/helpers.test.ts:1009-1019` stays green); a supplied `floor` keeps
   compositing in both cases (`:1028-1045` stays green); the unpainted-stack refusal and
   its message stay. Public types change only if the reported termination needs a shape —
   prefer keeping `readBackdrop`'s public signature and deriving the refusal privately.
   Adjust the strictness sentence at `guides/test.md:1652-1653` only if its wording no
   longer matches the now-true behaviour.
3. **One focus population** (`src/browser/helpers.ts:381`): `traverseAccessible` consults
   `FOCUSABLE_SELECTOR` instead of its inline literal. CONSTRAINT: the cap arithmetic
   (`×3 + 10`) does not move.
4. **Default numbers live with their functions** (`src/core/types.ts:45-48`,
   `src/server/helpers.ts`): remove the `1000`/`10` default values from `WaitOptions`'
   property TSDoc (member meanings stay); every consuming function states its own defaults
   in `@remarks` — verify `waitForCondition`, `retryUntil`, `waitForEvent`,
   `waitForSocketClose` already do and add `destroyScratch`'s `10_000`/`25` where missing.
5. **`destroyScratch` policy stated** (`src/server/helpers.ts:343-357`): `@remarks` states
   the deliberate retry-everything policy — every refusal retries until the budget elapses
   because a host hold is not classifiable across hosts — names that this is wider than
   `removeTree`'s classified `REMOVE_TREE_RETRYABLE_CODES` set, and states the residual: a
   non-transient fault costs the budget and surfaces wrapped with the refusal as `cause`.
6. **The guide's `destroy()` paragraph** (`guides/test.md:1269-1272`): rewrite —
   `destroy()` already outlasts about a second of the just-exited-holder `EPERM` through
   `removeTree`'s bounded retries; `destroyScratch` is the longer, abortable, non-blocking
   budget for a hold that outlasts that second (a still-live holder). Keep the row wording
   consistent with fix 5.
7. **Server `WaitOptions` sentence** (`guides/test.md`, the Server helpers section near
   `:1564`): one sentence stating the bounded server helpers take the core entry's
   `WaitOptions`, imported from `@orkestrel/test`. CONSTRAINT: no re-export from the server
   barrel.
8. **`EPERM` identity pinned** (`tests/src/server/helpers.test.ts:225-236`): the
   file-source refusal case asserts the surfaced error is the original `EPERM` — assert
   `code === 'EPERM'` on the thrown value (identity with the first fault, not a fresh
   `Error`).

## Scope

- Owned: `src/browser/helpers.ts`, `src/core/types.ts`, `src/server/helpers.ts`,
  `guides/test.md` (the named passages), `tests/src/browser/helpers.test.ts`,
  `tests/src/server/helpers.test.ts`, `tests/guides.test.ts` (only if a fence moves).
- Standing entries: everything `git status --porcelain` lists at your start.
- No commits, installs, or `git checkout`/`restore`/`stash`/`reset`/`clean`. Use `npx.cmd`.

## Acceptance criteria, in this order

1. `git status --porcelain` adds nothing beyond the standing entries; report before/after.
2. Scoped `npx.cmd oxfmt --config .oxfmtrc.json --check` and
   `npx.cmd oxlint --config .oxlintrc.json --deny-warnings` on the owned files exit 0.
3. `npx.cmd tsc --noEmit --project tsconfig.json` exits 0.
4. Failing-first for fixes 1 (the `<img title>` case red against the unconditional return),
   2 (the translucent-only floor-omitted refusal red against the current measurement), and
   8 (the identity assertion red against a probe substituting a fresh `Error` — an
   equivalent probe recording the old assertion's blindness is acceptable; record what you
   used).
5. `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=dot` per project:
   `src:core`, `src:server`, `src:browser`, `guides` — each exits 0; totals reported.

## Output

The diff; raw output and exit code per criterion including every failing-first pair; any
deviation. No process diary.

## Deviation contract

Stop on: fix 2 reddening either bounded case (that is the over-correction the bounds
exist to catch); a criterion unreachable. Wording within the fixed content is yours:
decide, record, carry on.
