# J-BINDER-PRECEDENCE round 5 — the unit's report (sol on GPT-6 Astra, codex exec workspace-write in the veneer-precedence worktree, 2026-09-23)

Thread `01a0d0ee-876b-70c2-9221-0732171bcd21`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-binder-precedence-5.jsonl` (launch copy under `tmp/codex/`); 34 commands; 347 s; usage {"input_tokens":1727637,"cached_input_tokens":1424896,"cache_write_input_tokens":0,"output_tokens":7775,"reasoning_output_tokens":777}. Retained verbatim from the exec's last message.

---

Implemented brief 5 in this worktree. The scoped gates passed. The mutations were removed after each case ran red, then green.

**S1.** Updated the class remark, `HostSnapshotInterface.restore` remark, guide, and `#publish` comment. Added the throwing-reaction case: `earlier` is Z and `started` is X. It asserts the reported `SyntaxError`, final `height: 20px`, and a later save restoring `30px`, proving no stale height entry remains pending.

The exact sentences are:

> A restoration whose write throws withdraws every target it has not written back, a target whose earliest recording it held included, so no restoration writes that target back.

> Each restoration judges the removal of a `class` or `style` attribute it recorded as absent once, after its own token or property writes, so an overlapping or later restoration by another engine can leave that attribute present and empty; the tokens and properties themselves are restored unless a write throws.

**S2.** Updated `readTag`’s `@returns` and added a case using a same-origin iframe appended through `mount`. The case confirms its element has `tagName: 'DIV'`, fails this realm’s `instanceof Element`, and reads `undefined`.

The exact sentence is:

> The value's string tag name, or undefined when the value fails this realm's `instanceof Element` check, its tag name is not a string, or reading it throws.

The mutation readings were:

| Edit | Mutation | Red reading | Green reading |
|---|---|---|---|
| S1 | Changed `entry === undefined \|\| stamp < entry.stamp` to `entry === undefined` | Exit 1; `1 failed \| 23 skipped (24)`; expected `20px`, received `10px` | Exit 0; `1 passed \| 23 skipped (24)` |
| S2 | Read `tagName` from any non-null object carrying that property | Exit 1; `1 failed \| 29 skipped (30)`; expected `undefined`, received `DIV` | Exit 0; `1 passed \| 29 skipped (30)` |

Each red/green pair used the same command:

```text
npm.cmd run test:src:browser -- tests/src/browser/HostSnapshot.test.ts -t 'withdraws an overlapping earliest recording'
npm.cmd run test:src:browser -- tests/src/browser/helpers.test.ts -t 'returns undefined for an element created in a same-origin iframe document'
```

**Unknown resolved.** The reaction’s exception reaches the `window` error listener. The listener records `event.error` and calls `preventDefault()`. Vitest still prints the diagnostic, but the case and complete browser suite exit 0. An abort controller removes the listener after the test.

The scoped validation output follows verbatim. Every command exited 0.

`npm.cmd run check:src:browser` produced:

```text
npm notice run @orkestrel/veneer@0.0.1 check:src:browser
npm notice run tsc --noEmit -p configs/src/tsconfig.browser.json
```

`npx.cmd oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser` produced:

```text
npm notice run @orkestrel/veneer@0.0.1 npx
npm notice run oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser
```

`npx.cmd oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser guides/veneer.md` produced:

```text
npm notice run @orkestrel/veneer@0.0.1 npx
npm notice run oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser guides/veneer.md
Checking formatting...

All matched files use the correct format.
Finished in 4926ms on 20 files using 16 threads.
```

`npm.cmd run test:src:browser` produced:

```text
npm notice run @orkestrel/veneer@0.0.1 test:src:browser
npm notice run vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser

 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/veneer-precedence

·······················9:05:21 PM [vite] (client) [Unhandled error] SyntaxError: Failed to execute 'toggle' on 'DOMTokenList': The token provided must not be empty.
 > src/browser/HostSnapshot.ts:163:30
    161 |  				const key = HostSnapshot.#key(target.category, target.name)
    162 |  				HostSnapshot.#writeBack(target.element, key, this, () =>
    163 |  					target.element.classList.toggle(target.name, value !== undefined),
        |                                ^
    164 |  				)
    165 |  			}
 > #writeBack src/browser/HostSnapshot.ts:248:2
 > HostSnapshot.restore src/browser/HostSnapshot.ts:162:28
 > tests/src/browser/HostSnapshot.test.ts:343:11
 > HTMLElement.attributeChangedCallback tests/src/browser/HostSnapshot.test.ts:316:27
 > src/browser/HostSnapshot.ts:163:30
 > #writeBack src/browser/HostSnapshot.ts:248:2
 > HostSnapshot.restore src/browser/HostSnapshot.ts:162:28
 > tests/src/browser/HostSnapshot.test.ts:345:10
 > node_modules/@vitest/runner/dist/chunk-artifact.js?v=57b6f09d:302:11

9:05:21 PM [vite] (client) [console.error] Error: Uncaught SyntaxError: Failed to execute 'toggle' on 'DOMTokenList': The token provided must not be empty.
    at throwUnhandlerError (http://localhost:63315/@fs/C:/Users/mikes/WebstormProjects/veneer-precedence/node_modules/@vitest/browser/dist/client/error-catcher.js:38:33)
    at http://localhost:63315/src/browser/HostSnapshot.ts:125:87
    at #writeBack (http://localhost:63315/src/browser/HostSnapshot.ts:194:3)
    at HostSnapshot.restore (http://localhost:63315/src/browser/HostSnapshot.ts:125:28)
    at http://localhost:63315/@fs/C:/Users/mikes/WebstormProjects/veneer-precedence/tests/src/browser/HostSnapshot.test.ts?import&browserv=1790211921369:476:11
    at http://localhost:63315/node_modules/@vitest/runner/dist/chunk-artifact.js?v=57b6f09d:302:11
    at http://localhost:63315/node_modules/@vitest/runner/dist/chunk-artifact.js?v=57b6f09d:1903:26
    at http://localhost:63315/node_modules/@vitest/runner/dist/chunk-artifact.js?v=57b6f09d:2326:20
    at new Promise (<anonymous>)
    at runWithCancel (http://localhost:63315/node_modules/@vitest/runner/dist/chunk-artifact.js?v=57b6f09d:2323:10)
stderr | tests/src/browser/HostSnapshot.test.ts:308:2 > HostSnapshot > withdraws an overlapping earliest recording when its restoration throws inside a reaction
[Error: Uncaught SyntaxError: Failed to execute 'toggle' on 'DOMTokenList': The token provided must not be empty.]
··································································································································

 Test Files  8 passed (8)
      Tests  153 passed (153)
   Start at  21:05:19
   Duration  2.25s (transform 0ms, setup 366ms, import 94ms, tests 220ms, environment 0ms)
```

`npm.cmd run test:guides` produced:

```text
npm notice run @orkestrel/veneer@0.0.1 test:guides
npm notice run node --experimental-strip-types tests/guides.test.ts

 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/veneer-precedence

···················

 Test Files  1 passed (1)
      Tests  19 passed (19)
   Start at  21:05:20
   Duration  1.18s (transform 212ms, setup 67ms, import 909ms, tests 52ms, environment 0ms)
```

`npm.cmd run test:policy` produced:

```text
npm notice run @orkestrel/veneer@0.0.1 test:policy
npm notice run vitest run --config vite.config.ts --no-cache --reporter=dot --project policy

 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/veneer-precedence

····································································································-·········

 Test Files  1 passed (1)
      Tests  109 passed | 1 skipped (110)
   Start at  21:05:19
   Duration  2.41s (transform 118ms, setup 66ms, import 282ms, tests 1.90s, environment 0ms)
```

The sentence searches used `rg` over the specified paths:

```text
rg -n 'always restored' src/browser/HostSnapshot.ts src/browser/types.ts guides/veneer.md
```

This returned no output, exit 1.

```text
rg -n 'unless a write throws' src/browser/HostSnapshot.ts src/browser/types.ts guides/veneer.md
```

This exited 0 and returned:

```text
src/browser/HostSnapshot.ts:30: * restored unless a write throws. A restoration runs synchronously, so only a synchronous reaction
src/browser/types.ts:305:	 * restored unless a write throws.
guides/veneer.md:569:unless a write throws.
```

`git diff --check` exited 0 with no output. `git status --short` returned:

```text
warning: unable to access 'C:\Users\mikes/.config/git/ignore': Permission denied
warning: unable to access 'C:\Users\mikes/.config/git/ignore': Permission denied
 M guides/veneer.md
 M src/browser/Button.ts
 M src/browser/HostSnapshot.ts
 M src/browser/helpers.ts
 M src/browser/types.ts
 M tests/src/browser/HostSnapshot.test.ts
 M tests/src/browser/helpers.test.ts
 M tests/src/browser/index.test.ts
```

`git diff --stat` returned the cumulative uncommitted worktree changes:

```text
 guides/veneer.md                       |  49 +++--
 src/browser/Button.ts                  |  13 +-
 src/browser/HostSnapshot.ts            | 126 ++++++++---
 src/browser/helpers.ts                 |  30 ++-
 src/browser/types.ts                   |  80 ++++---
 tests/src/browser/HostSnapshot.test.ts | 371 ++++++++++++++++++++++++++++++++-
 tests/src/browser/helpers.test.ts      |  81 ++++++-
 tests/src/browser/index.test.ts        |  13 +-
 8 files changed, 667 insertions(+), 96 deletions(-)
```

**Deviation state.** No scope or behavior deviation. No shared-file edits, commits, installs, or sub-agent dispatches. This round changes documentation and tests only.

The `probe.prove` calls for S1 and S2 were rejected before execution: `MCP tool call requires approval, but approval policy is never`. No probe receipt was issued. The red/green evidence comes from the authorized browser-test commands recorded in this report.
