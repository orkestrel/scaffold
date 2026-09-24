# J-ISINSTANCE — the builder's report (returned 2026-09-24 by `builder` on Sonnet, native subagent, 20 tool uses, 119 s; retained verbatim from the subagent's return text; the tree is Veneer `main` at `e24e2c3` with the unit's edits uncommitted)

No probe file left behind; other `tmp/` subdirectories predate this unit. Also note the `prove` MCP server was not called — it is not reachable to this subagent, and no call was attempted.

## Report: J-ISINSTANCE

**Site table (re-measured after J-COLLAPSE landed on `main`, tip `e24e2c3`)**

| File | Symbol | Before | After |
|---|---|---|---|
| `src/browser/Button.ts:41` | guard in host check | `instanceOf(HTMLElement)(host)` | `isInstance(host, HTMLElement)` |
| `src/browser/Collapse.ts:86` | guard in host check | `instanceOf(HTMLElement)(host)` | `isInstance(host, HTMLElement)` |
| `src/browser/Collapse.ts:324,340` | `.filter(instanceOf(HTMLElement))` | unchanged (predicate-passed) | unchanged |
| `src/browser/Delegate.ts:147,149,160,173` | `#conflicts`/`#routeButton`/`#routeCollapse` host and trigger checks | `instanceOf(HTMLElement)(host\|trigger)` | `isInstance(host\|trigger, HTMLElement)` |
| `src/browser/helpers.ts:164` | `.filter(instanceOf(HTMLElement))` | off-limits, unchanged | unchanged |
| `src/browser/parsers.ts:25` | direct-element check | `instanceOf(HTMLElement)(value)` | `isInstance(value, HTMLElement)` |
| `src/browser/parsers.ts:28` | `.find(instanceOf(HTMLElement))` | unchanged (predicate-passed) | unchanged |
| `src/browser/validators.ts:107` | `isButtonEvent` class half | `value instanceof CustomEvent` | `isInstance(value, CustomEvent)` |
| `src/browser/validators.ts:138` | `isCollapseEvent` class half | `value instanceof CustomEvent` | `isInstance(value, CustomEvent)` |

Delegate.ts carries four immediately-invoked sites at the current tree (lines 147, 149, 160, 173), not the two the brief's earlier measurement recorded from the collapse worktree's round-2 tree; the landing added two more call sites (`#routeButton`, `#routeCollapse`) between that measurement and `main`. All four are guard-detail sites within the owned file, not a site outside scope, so no stop was warranted.

**Unknown's answer.** `InstanceType<typeof CustomEvent>` resolves to `CustomEvent<unknown>` under this checkout's TypeScript, confirmed with a throwaway probe (`tmp/probe-isinstance.ts`, removed after use, never committed) assigning `value.detail` to a `string`-typed local under `isInstance(value, CustomEvent)`:

```
tmp/probe-isinstance.ts(6,8): error TS5112... (fixed with --ignoreConfig)
tmp/probe-isinstance.ts(6,8): error TS2322: Type 'unknown' is not assignable to type 'string'.
```

The error names the source type as `unknown`, not `any`, so `detail` narrows to `unknown` rather than leaking `any`. `npm run check:src:browser` (`tsc --noEmit -p configs/src/tsconfig.browser.json`) is clean against the real change, confirming no red on `detail`. Per the brief's branch, `isInstance(value, CustomEvent)` replaces `value instanceof CustomEvent` in both event guards, and the remark now reads:

> "The class half routes through `isInstance`, which narrows `CustomEvent`'s own generic constructor to `CustomEvent<unknown>`, so `detail` reads as `unknown` rather than as `any`. The containment here covers both halves, because a `detail` accessor throws as readily as a hostile prototype does."

**`git status --short`**
```
 M src/browser/Button.ts
 M src/browser/Collapse.ts
 M src/browser/Delegate.ts
 M src/browser/parsers.ts
 M src/browser/validators.ts
```

**`git diff --stat`**
```
 src/browser/Button.ts     |  4 ++--
 src/browser/Collapse.ts   |  4 ++--
 src/browser/Delegate.ts   | 10 +++++-----
 src/browser/parsers.ts    |  4 ++--
 src/browser/validators.ts | 14 +++++++-------
 5 files changed, 18 insertions(+), 18 deletions(-)
```

**Acceptance commands, verbatim output**

1. `grep -rn "instanceOf(HTMLElement)(" src/browser tests/src/browser` — no output (no hit). `grep -rn "isInstance(" src/browser` — hits `Button.ts:41`, `Collapse.ts:86`, `Delegate.ts:147,149,160,173`, `parsers.ts:25`, `validators.ts:107,138`. The four predicate-passed `instanceOf(HTMLElement)` sites (`Collapse.ts:324,340`, `helpers.ts:164`, `parsers.ts:28`) are unchanged.

2. `npm run check:src:browser`:
```
npm notice run @orkestrel/veneer@0.0.1 check:src:browser
npm notice run tsc --noEmit -p configs/src/tsconfig.browser.json
```
Exit 0, no diagnostics.

`npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser`:
```
npm notice run @orkestrel/veneer@0.0.1 npx
npm notice run oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser
```
Exit 0, no diagnostics.

`npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser`:
```
npm notice run @orkestrel/veneer@0.0.1 npx
npm notice run oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser
Checking formatting...

All matched files use the correct format.
Finished in 12ms on 23 files using 16 threads.
```

3. The `isButtonEvent` remark carries no sentence naming `isInstance` as narrowing to `object` (rewritten, see above); true of the code as changed.

4. `npm run test:src:browser`:
```
npm notice run @orkestrel/veneer@0.0.1 test:src:browser
npm notice run vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser

 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/veneer
·····································································[Unhandled error] SyntaxError: Failed to execute 'toggle' on 'DOMTokenList'... (the standing-condition diagnostic from HostSnapshot.test.ts "withdraws an overlapping earliest recording when its restoration throws inside a reaction", by design)
·······································································································································

 Test Files  10 passed (10)
      Tests  204 passed (204)
   Start at  23:36:14
   Duration  7.44s
```

No file outside the owned set changed. `tests/src/browser/validators.test.ts` needed no edit — no assertion the change makes false. `prove` MCP was not reachable to this subagent; no call attempted, recorded as required by the brief.

---

The Orchestrator's retention note: the review evidence is `j-isinstance.diff` (`git diff HEAD`, 150 lines) and `j-isinstance-status.txt`; the Orchestrator's gate run is `j-isinstance-gates.log.txt` (`isinstance-gates.sh`); the checker's brief is `j-isinstance-audit-checker-brief.md`.
