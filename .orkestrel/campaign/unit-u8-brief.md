# Unit U8: the accepted U7-audit findings

## Role and engine

Role `implementer`, engine **Claude Opus 5**, in the main checkout at
`C:/Users/mikes/WebstormProjects/process`. You perform the assignment directly and spawn
nothing beyond the suites you run. Read `AGENTS.md`, the applicable `.claude/rules/*` files
(`typescript.md`, `architecture.md`, `tests.md`, `documentation.md`, `writing.md`), and
`guides/process.md` before editing. Ruling record:
`.orkestrel/campaign/audit-u7-reconciliation.md` in the scaffold repository — its accepted
findings are restated here in full, so this brief is self-contained.

## Context

The working tree is the uncommitted 0.0.6 campaign delta; treat every currently-dirty file
as a standing entry. The terminal contract as landed: every native exit arms the `drain`
bound (`#expire`, `src/server/Process.ts:387`), `#settle` delivers every terminal surface
at once, and `#kill` waits through `waitForClose` (`:490`). `waitForClose`
(`src/server/helpers.ts`) races the child's `close` against its own timer, resolves a
boolean, and cleans up both sides in a `finally`. The `npm` PowerShell shim is blocked —
use `npm.cmd` / `npx.cmd`.

## Fixes, in this order

1. **One bounded wait per close** (the accepted finding 4; Sol's prescription adopted
   verbatim: "Store one idempotent close-wait promise backed by `waitForClose`, and share
   it between native exit and termination completion."). The defect: `#expire` arms a raw
   `setTimeout(#cut, drain)` while `#kill` independently starts
   `waitForClose(child, drain)` after `stopChild` returns, so one close carries two
   overlapping bounded waits, and a `stop()` entering `#kill` late in the native-exit
   drain window waits a fresh full drain from there — resolving up to a full `drain`
   after the terminal moment. Replace the pair: a private idempotent method creates the
   shared promise once (`waitForClose(this.#child, this.#drain)` continued by
   `if (!this.#settled) this.#settle(false)`); `#expire` starts it, `#kill` awaits the
   same one. `#cut` and `#cutoff` disappear, and `#settle` drops its `clearTimeout` —
   `waitForClose` clears its own timer on either outcome. Keep the arming comment's
   substance on the survivor. Ordering note that keeps the natural-close path green: the
   constructor's `close` listener (`#close`) is registered before any `waitForClose`
   listener, so a natural close settles with `drained: true` before the shared
   continuation runs its `#settled` check.
2. **The latency pin, failing first** (finding 4's proof). Property: `stop()` resolves at
   the terminal moment, not a fresh drain later. Vector: a fixture whose root exits at
   once while its descendant holds the inherited read ends past the bound; `drain` around
   1000; after the root's exit is observable, park most of the drain window, then call
   `stop()` shortly before the bound elapses and measure from that call to `stop()`'s
   resolution. Against the current tree the wait re-arms from the call and the elapsed
   time nears the full drain; fixed, it is the remaining sliver of the original window.
   Assert a boundary that separates the two with wide margin (elapsed below roughly half
   the drain), plus `settled === true` and `(await exit).drained === false` at
   resolution. Record the red run's exact command and failing count before fix 1 lands,
   then the same command green after it. Use the existing fixture family in
   `tests/src/server/fixtures/child.mjs` and the suite's real-wait helpers; no fake
   clocks.
3. **Narrow two test comments** (finding 5): the preamble at
   `tests/src/server/Process.test.ts:1247` and the row comment at `:1287-1288` ("The host
   close that the read-end destruction fires arrives after this...") present host-close
   arrival timing as load-bearing. State only the observable rule: the latch precedes the
   single resolution and delivery of the terminal value, and that is what prevents a
   truncated read from being relabeled. Say nothing about when the host `close` arrives.
4. **The guide paragraph** (finding 6): `guides/process.md:292-296` still says `drain`
   "never starts on its own and cannot fire unless a caller already asked for a
   termination". Rewrite the paragraph: `drain` bounds the window between the child's
   ending and the release of its read ends; the native exit arms it, and so does a
   termination this package initiated; it cannot end a running child. Keep the
   no-completion-deadline sentence that opens the paragraph — it is still true.
5. **The `lines` loss window** (finding 7a): `src/core/types.ts:222-226` ends "only bytes
   that would have arrived after the termination the caller asked for are lost". Correct
   the sentence: bytes that would have arrived after the terminal moment are lost —
   whether that moment came from the streams closing, from the `drain` bound after a
   native exit, or from a requested termination — and an unframed trailing partial
   written before an undrained cutoff is not promised.
6. **The `PROCESS_DRAIN` doc** (finding 7b): the summary and remark in
   `src/core/constants.ts` frame the constant as "a termination waits". Reframe: the
   default window the package waits for the child's read ends to close after the native
   exit or after an initiated termination, before cutting them off. Keep the measured
   basis lines untouched.

## Scope

- Owned: `src/server/Process.ts`, `src/core/types.ts`, `src/core/constants.ts`,
  `guides/process.md`, `tests/src/server/Process.test.ts`,
  `tests/src/server/fixtures/child.mjs` (only if the pin needs a new mode),
  `tests/guides.test.ts` (only if a `toContain` string pins prose a fix rewrites — check
  before and report).
- Off-limits: everything else, including `src/server/helpers.ts` (`waitForClose` is
  consumed, not changed) and `tests/src/server/helpers.test.ts`.
- No commits, no installs, no `git checkout`/`restore`/`stash`/`reset`/`clean`, no
  tree-wide `format`/`lint --fix`.

## Acceptance criteria, in this order

1. `git status --porcelain` adds nothing beyond the standing entries plus owned files;
   report before and after.
2. Scoped `npx.cmd oxfmt --config .oxfmtrc.json --check <owned files>` and
   `npx.cmd oxlint --config .oxlintrc.json --deny-warnings <owned TypeScript files>`
   exit 0.
3. `npx.cmd tsc --noEmit --project tsconfig.json` exits 0.
4. The latency pin's red-then-green pair recorded with exact commands and counts.
5. `npm.cmd run test:src:server`, `npm.cmd run test:guides`, and
   `npm.cmd run test:distribution -- --mode release` each exit 0; totals reported.

## Output

The complete diff of what U8 changed (not the whole campaign delta), the red-then-green
record, per-criterion exit codes and totals, and the `tests/guides.test.ts` check result.
No process diary.

## Deviation contract

Stop on: the shared-promise unification breaking any existing row you cannot repair inside
owned files; the latency pin refusing to separate old from new behaviour with wide margin;
a needed edit outside the owned set. Comment wording, constant naming, and the pin's exact
timings within the stated property are yours: decide, record, carry on.
