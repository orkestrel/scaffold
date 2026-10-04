# Unit eager-fix — repair the U9 review's confirmed findings

## Role and engine

`astra` on GPT-6 Astra through `codex exec` with reasoning effort high and `--sandbox danger-full-access`. Sole writer in `C:\Users\mikes\WebstormProjects\browser` on `main` at `b5aa262` (U2 to U8). Perform the assignment yourself and spawn nothing. Commit in coherent steps (source repairs, then test repairs, then guide rows); never push, publish, or install a package. Never run `npm ci` or `npm install`: `@orkestrel/pool` 0.0.14 is staged unpublished in `node_modules` by `npm install --no-save`, and a reinstall removes it. The measurement writer may run instruments under `tmp/probes/eager/` meanwhile; it changes no tracked file.

## Inputs

- `tmp/review/u9-findings.json`: every finding with its skeptic's verdict and reason. Each item below names its finding ids; read the finding and the verdict before repairing.
- The design of record: `C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\lifecycle\eager\design.md` and `pool-design-3.md` beside it. The refuted findings (`surface-2`, `surface-7`, `surface-8`, `tests-5`, `tests-9`, `tests-15`) stay as they are.

## Assignment

Repair each item at its source. Every behavior repair gets a case that fails before the repair (red) and passes after (green); record both.

**Source:**

1. **A pending note survives a cancelled call** (`loss-lifecycle-1`). `#forward` consumes `#notice` only into an outcome that is delivered: a call whose signal aborted leaves every pending note for the next delivered outcome (A3). Red: cancel a call after it reached the toolset while a note is pending, then show the next call carries the note.
2. **No `LAUNCH` line during shutdown** (`surface-1`, `pool-setup-2`, `teardown-destructive-2`). `#warm` writes its `LAUNCH` line only while `#closing` is undefined, as `#destroySlot` guards `TEARDOWN`. The case "destroys during a held connect without releasing it or writing afterward" asserts the log holds no line.
3. **The crash note states only what is true of it** (`loss-lifecycle-2`). The F-9 sentence ("the next call acquires a browser that starts at `about:blank`, or answers `BROWSER_SERVER_UNAVAILABLE` …") belongs to `UNRESOLVED` alone (pool-design-3.md § Loss and the operation lifecycle); the `CRASH` note drops it. Assert both texts.
4. **One code token and one terminal period per rendered line** (`pool-setup-3`, `surface-5`, `loss-lifecycle-4`). Per A-19, each surface adds `CODE: ` one time and the message carries the cause only. `describeBrowserServerLoss` adds no second period, the stranded refusal carries the stranded failure as its cause rather than a pre-rendered `TEARDOWN` line, and `#setup` does not re-wrap a refusal that already carries `BROWSER_SERVER_UNAVAILABLE`. Assert the stranded and A2 refusal texts end in one period and carry one code token.
5. **The exit-versus-transport cause branch is proven** (`loss-lifecycle-3`). Let the double report a pid of a live process the test itself spawned and owns, never a pid it does not own, so `drop()` with a live pid reports a transport loss and `kill()` reports an exit; assert both cause texts.
6. **`probeProcess` on `EPERM`** (`surface-6`). Prove the live-but-unsignalable branch against a pid that the runtime probe shows answers `EPERM` on this host; when no such pid is found, report the branch `NOT-EVIDENCED`.
7. **The bin survives a closed stderr** (`teardown-destructive-3`). Ruling A8 binds the library class: the bin owns its process, so `src/bin/main.ts` handles `error` on `process.stderr` and teardown still completes when the reader of stderr has gone. Prove it with the built entry: close the reader of the child's stderr, end its input, and assert every recorded browser pid is gone and no `<pid>-` profile remains. When this host cannot produce the write failure, report that with the probe's result.
8. **TSDoc shapes** (`surface-9`): repair the option and return doc blocks to the shapes `.claude/rules/typescript.md` prescribes.

**Tests** (each must fail for the behavior it names; show the red by removing that behavior):

9. `tests-2`, `pool-setup-1`: rewrite "launches one time under two concurrent first calls" so concurrent first calls meet the shared acquire (for example, calls issued while setup's grant is held), or remove it where the line-630 failover case already pins the shared acquire, and say which.
10. `tests-3`: the V5 case asserts its precondition that the bound is spent before the lease kill.
11. `tests-4`: the background-crash assertion waits on a condition that a reported loss would change, not a synchronous read.
12. `teardown-destructive-1`, `tests-7`: the one-turn close plants a folder the sweep would parse (`<pid>-<uuid>` with an exited owner) so its survival proves no sweep ran.
13. `tests-8`: where the runtime refuses `SIGSTOP`, the hang case is skipped at runtime with its reason, never reported as passed.
14. `tests-10`, `tests-11`: the `defer()` and held-index setup proofs assert something that changes when the behavior breaks; remove `defer()` and `resume()` if no server case consumes them.
15. `tests-12`: the stalling-sweep case asserts the sweep attached to the stall server before destroy aborts it.
16. `tests-13`: the persistent-removal case gates on a runtime probe of the host property it needs and starts its server inside the guarded block.
17. `tests-14`: the refill's `about:blank` claim reads the refill's page URL, not the absence of a command.
18. `tests-16`: the dispatcher-after-destroy case can fail under the eager start, and waits on a named condition, never a fixed delay.
19. `tests-17`: the setup proof asserts behavior, not a constant against its own literal.
20. `tests-1`: the U2 cases set a deadline only where the claim needs one, sized from the case with the reasoning in a comment; the case whose claim is that `ping` inherits the client-wide deadline keeps that contract with a budget derived from the case.
21. `tests-6`: replace hand-counted microtask hops with a placement that an observable event or a double hook pins, and assert where the kill landed in the R2-9 case.
22. `teardown-destructive-5`: restore the bin's `SIGTERM` exit case this build deleted from `tests/src/bin/main.test.ts`, with its runtime host guard, or show why it cannot exist.

**Guide rows** (API rows only; narrative prose belongs to U13):

23. `surface-3`: the `cdp.discover: false` row states that the probe runs only when `cdp.port` is set.
24. `teardown-destructive-6`: the root-layout row names `.profiles/<pid>-<uuid>/` and the eager teardown, sweep, and recheck.

## Gates

After the last commit, each exit code read bare: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run build`, `npm run test:src`, `npm run test:src:bin`, `npm run test:setup`, `npm run test:guides`, `npm run test:policy`, and `npm run test:service`; then `git diff --check`. The final `git status --porcelain` is empty.

## Output

Write `tmp/codex/eager-fix-report.md` and return it as your final message: per item, the finding ids, the commit, the change at file:line, and the red and green evidence (command, count, failure line) or the `NOT-EVIDENCED` reason; then the gate table with exit codes. No process diary.

## Deviation contract

Stop and report (expected, found, evidence, one hypothesis) when a repair contradicts a ruling in the design of record, or when a gate fails for a cause outside these items.
