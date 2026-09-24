# J-BINDER-PRECEDENCE round 3 — the unit's report (sol on GPT-6 Astra, codex exec workspace-write in the veneer-precedence worktree, 2026-09-23)

Thread `01a0d0d7-4881-7520-82e3-ec46ff56de3e`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-binder-precedence-3.jsonl` (launch copy under `tmp/codex/`); 47 commands; 557 s; usage {"input_tokens":1907796,"cached_input_tokens":1794048,"cache_write_input_tokens":0,"output_tokens":13860,"reasoning_output_tokens":2681}. Retained verbatim from the exec's last message.

---

Q1–Q4 are implemented. Q5’s guide wrapping is complete; its `emitEvent` example awaits a ruling because the requested omission conflicts with the function’s required arguments. All scoped validation commands exit 0.

**Q1 — Contract sentences.** Updated the `HostSnapshot` class remark, `#publish` comment, `HostSnapshotInterface.restore` remark, and guide. Retitled the overlap proof to describe a target neither restoration has written back.

The exact precedence sentences are:

> Where two restorations overlap on a target neither has yet written back, the restoration holding the earliest recording of that target writes it back, a taken value keeping the order of the recording it came from, because the earliest recording holds the value the target carried before either engine wrote it. A restoration that publishes a target another restoration already wrote back writes its own recorded value.

The exact removal sentence in the class remark, interface remark, and guide is:

> Each restoration judges the removal of a `class` or `style` attribute it recorded as absent once, after its own token or property writes, so an overlapping or later restoration by another engine can leave that attribute present and empty; the tokens and properties themselves are always restored.

**Q2 — Interleavings.** Added executed cases for A’s already-written attribute, A’s class-presence outcome using a real `Button` and a later consumer snapshot, and B’s token write that empties the list after removal was judged.

**Q3 — Presence handoff.** Added the style handoff case and separate class/style inherited-presence-stamp cases. The style handoff restores the property and leaves `hasAttribute('style') === false`.

**Q4 — Tag reading.** `readTag` reads the property into `unknown` and returns it only when `typeof tag === 'string'`. The proxy regression first failed with `23`, then passed with `undefined`. Its exact `@returns` sentence is:

> The element's string tag name, or undefined when the value is not an element, its tag name is not a string, or reading it throws.

**Q5 — Bounds.** Rewrapped the ownership paragraph. The example remains unchanged: `emitEvent` requires `(host, type, detail, cancelable)`. Omitting `detail` cannot preserve this call. The proposed correction pending the requested ruling is:

```ts
if (!emitEvent(host, 'show.vn.collapse', null, true)) return false
```

The red-first and green readings follow. Every mutation was removed in `finally`; each restoration check printed `source restored=True`.

| Case | Mutation or original defect | Red reading | Green reading |
|---|---|---|---|
| A: already-written attribute | Omit withdrawal after `#writeBack` | `original`, expected `earlier`; `1 failed \| 22 skipped (23)` | `earlier`; `1 passed \| 22 skipped (23)` |
| A: Button class presence; B: later token empties list | Remove an empty class attribute at the end of every restoration | Each returned `null`, expected `''`; `2 failed \| 21 skipped (23)` | Each returned `''`; `2 passed \| 21 skipped (23)` |
| Style handoff | Replace the styled take branch with `element.hasAttribute('style')` | Presence `true`, expected `false`; `1 failed \| 22 skipped (23)` | Presence `false`; `1 passed \| 22 skipped (23)` |
| Taken class-presence order | Replace `classed?.stamp ?? stamp` with `stamp` | Presence `true`, expected `false`; `1 failed \| 22 skipped (23)` | Presence `false`; `1 passed \| 22 skipped (23)` |
| Taken style-presence order | Replace `styled?.stamp ?? stamp` with `stamp` | Presence `true`, expected `false`; `1 failed \| 22 skipped (23)` | Presence `false`; `1 passed \| 22 skipped (23)` |
| Hostile SVG proxy | Original unguarded `tagName` return | `23`, expected `undefined`; `1 failed \| 28 skipped (29)` | `undefined`; `1 passed \| 28 skipped (29)` |

Each red/green pair used the same command, respectively:

```text
npm.cmd run test:src:browser -- tests/src/browser/HostSnapshot.test.ts -t 'writes its own recorded value'
npm.cmd run test:src:browser -- tests/src/browser/HostSnapshot.test.ts -t 'leaves an empty class attribute'
npm.cmd run test:src:browser -- tests/src/browser/HostSnapshot.test.ts -t 'hands pending style presence'
npm.cmd run test:src:browser -- tests/src/browser/HostSnapshot.test.ts -t 'preserves the order of a taken class presence'
npm.cmd run test:src:browser -- tests/src/browser/HostSnapshot.test.ts -t 'preserves the order of a taken style presence'
npm.cmd run test:src:browser -- tests/src/browser/helpers.test.ts -t 'returns undefined when an element proxy'
```

**Unknown — Interleaving B.** B is reachable through public consumer snapshots with valid tokens (`active`, `collapsed`, and `show`); no malformed token is needed. It is not reachable through the shipped engines in this worktree: `Button` is the sole engine calling `HostSnapshot.save`, and it records its token at construction without a later token save. The B case therefore uses consumer snapshots. This finding does not claim execution of the out-of-scope Collapse implementation.

The final scoped command outputs are reproduced verbatim below. Each command exited 0.

`npm.cmd run check:src:browser`:

```text
npm notice run @orkestrel/veneer@0.0.1 check:src:browser
npm notice run tsc --noEmit -p configs/src/tsconfig.browser.json
```

`npx.cmd oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser`:

```text
npm notice run @orkestrel/veneer@0.0.1 npx
npm notice run oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser
```

`npx.cmd oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser guides/veneer.md`:

```text
npm notice run @orkestrel/veneer@0.0.1 npx
npm notice run oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser guides/veneer.md
Checking formatting...

All matched files use the correct format.
Finished in 4954ms on 20 files using 16 threads.
```

`npm.cmd run test:src:browser`:

```text
npm notice run @orkestrel/veneer@0.0.1 test:src:browser
npm notice run vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser

 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/veneer-precedence

·······················································································································································

 Test Files  8 passed (8)
      Tests  151 passed (151)
   Start at  20:43:33
   Duration  2.03s (transform 0ms, setup 323ms, import 84ms, tests 217ms, environment 0ms)
```

`npm.cmd run test:guides`:

```text
npm notice run @orkestrel/veneer@0.0.1 test:guides
npm notice run node --experimental-strip-types tests/guides.test.ts

 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/veneer-precedence

···················

 Test Files  1 passed (1)
      Tests  19 passed (19)
   Start at  20:43:37
   Duration  1.03s (transform 185ms, setup 63ms, import 775ms, tests 49ms, environment 0ms)
```

`npm.cmd run test:policy`:

```text
npm notice run @orkestrel/veneer@0.0.1 test:policy
npm notice run vitest run --config vite.config.ts --no-cache --reporter=dot --project policy

 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/veneer-precedence

····································································································-·········

 Test Files  1 passed (1)
      Tests  109 passed | 1 skipped (110)
   Start at  20:43:39
   Duration  2.18s (transform 111ms, setup 64ms, import 261ms, tests 1.70s, environment 0ms)
```

The policy skip is the existing substitution-table test, conditional on the workspace owning that rule file.

The sentence searches used `rg` over the specified paths. Searching for `saved that target first` returned no output and exit 1. Searching for `neither has yet written back` exited 0 with:

```text
src/browser/HostSnapshot.ts:20: * way. Where two restorations overlap on a target neither has yet written back, the restoration
src/browser/HostSnapshot.ts:215:	// Where two restorations overlap on a target neither has yet written back, the restoration
src/browser/types.ts:295:	 * Where two restorations overlap on a target neither has yet written back, the restoration
guides/veneer.md:559:Where two restorations overlap on a target neither has yet written back, the restoration holding
```

`git diff --check` exited 0 without output. `git status --short` exited 0 with:

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

`git diff --stat` exited 0 with the cumulative uncommitted rounds’ diff:

```text
 guides/veneer.md                       |  47 +++--
 src/browser/Button.ts                  |  13 +-
 src/browser/HostSnapshot.ts            | 118 +++++++++---
 src/browser/helpers.ts                 |  28 ++-
 src/browser/types.ts                   |  78 +++++---
 tests/src/browser/HostSnapshot.test.ts | 323 ++++++++++++++++++++++++++++++++-
 tests/src/browser/helpers.test.ts      |  70 ++++++-
 tests/src/browser/index.test.ts        |  13 +-
 8 files changed, 597 insertions(+), 93 deletions(-)
```

**Deviation state.** Q5’s example is stopped pending clarification. Expected: omit its detail argument. Found: `detail: T` and the following `cancelable: boolean` are required. Guide wrapping is done; the example is not changed. The [deviation protocol](C:/Users/mikes/WebstormProjects/scaffold/.agents/orchestration.md:418) says, “Stop when a conflict prevents the primary objective or requires an unowned change.” The brief fixes the example’s requested wording, so I requested a ruling instead of changing the API. No shared-file patch, dependency change, commit, or sub-agent dispatch occurred.

The `prove` tool refused the attempted Q4 proof with: `MCP tool call requires approval, but approval policy is never`. It issued no receipt. The local browser regressions and mutation controls provide the recorded runtime evidence; they do not constitute a `prove` receipt or independent audit acceptance.
