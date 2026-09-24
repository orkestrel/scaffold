# J-BINDER-PRECEDENCE — the unit's report (sol on GPT-6 Astra, codex exec workspace-write in the veneer-precedence worktree, 2026-09-23)

Thread `01a0d0b8-b642-7e21-9d2d-a1b492634966`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-binder-precedence.jsonl` (launch copy under `tmp/codex/`); 52 commands; 902 s; usage {"input_tokens":3944796,"cached_input_tokens":3817344,"cache_write_input_tokens":0,"output_tokens":22306,"reasoning_output_tokens":5878}. Retained verbatim from the exec's last message.

---

P1–P6 are implemented. Every scoped validation command exits 0. The `prove` tool receipt remains unavailable because the tool requires approval under an approval policy of `never`.

The edits close these findings:

| Edit | Change and finding closed |
|---|---|
| P1 | Added a class-static save counter and per-record stamps. Pending entries retain the earlier stamp and owner; taking an entry preserves its stamp. Updated the precedence contract and overlap proof. Preserved owner checks, self-take, withdrawal after writing, and captured-record cleanup. |
| P2 | Added stamped style-attribute presence records with the same handoff mechanism as class presence. Restoration removes an originally absent attribute only when its properties leave it empty. Existing empty attributes and unrelated consumer properties survive. A presence read before removal handles Chromium’s pending style-attribute synchronization. |
| P3 | `resolveOptions` skips attribute parsing when the constructor supplies the key. Invalid unoverridden attributes still throw the supplied code. Updated TSDoc. |
| P4 | Added and exported `readTag`, replaced Button’s duplicate reading with it, and added its behavioral proof, export expectation, and guide row. |
| P5 | Added readonly `CollapseVocabulary` beside `ButtonVocabulary`, its guide row, and a type equality proof against the resolved option groups. |
| P6 | Changed detail-less events in `CollapseEventMap`, `TooltipEventMap`, `PopoverEventMap`, `AlertEventMap`, and `ToastEventMap` to `CustomEvent<null>`. Updated their guide cells and added type and platform-value proofs. |

The proof readings are:

| Proof | Red reading | Green reading |
|---|---|---|
| Target overlap | Initial snapshot run: `1 failed \| 13 passed (14)`; observed `started` instead of `original`. | Final snapshot run: `17 passed (17)`. |
| Shared class presence | Baseline with the added style proof: `3 failed \| 13 passed (16)`; class attribute remained present. | Final snapshot run passes, including the reversed restoration order. |
| Style presence, original empty attribute, and consumer property | Baseline failed the absent-style assertion. The presence and consumer-property controls separately fail this case. | Final snapshot run passes. |
| Taken value retains its stamp | Discarding the inherited stamp: `1 failed \| 16 passed (17)`; returned `first` instead of `original`. | Final snapshot run passes. |
| Overridden invalid attribute | Reverting the parsing guard: `1 failed \| 27 passed (28)`. | Helpers and entry run: `31 passed (31)`. |
| Tag reading and export | Initial run failed helper-suite import because `readTag` was absent, and failed the export-list assertion. The behavioral control subsequently failed the named tag-reading case. | Helpers and entry run passes. |
| Resolved collapse vocabulary | TypeScript reported TS2305: missing `CollapseVocabulary`. | The focused TypeScript program exits 0 without diagnostics. |
| Platform event detail | TypeScript reported TS2344: expected `null`, actual `undefined`. | The focused TypeScript program exits 0; the browser assertion reads `null`. |

The browser commands used for these readings were:

```text
npm.cmd run test:src:browser -- tests/src/browser/HostSnapshot.test.ts
npm.cmd run test:src:browser -- tests/src/browser/helpers.test.ts tests/src/browser/index.test.ts
```

The type proof used TypeScript’s installed compiler API, the browser project’s compiler options, and `tests/src/browser/index.test.ts` as its root.

The Unknowns resolve as follows:

- **Stamp location:** the class-static counter, saved records, presence records, and pending entries suffice. No snapshot-wide timestamp is needed.
- **Consumer properties:** removal checks the remaining property list. An unrelated consumer property keeps its value and the style attribute.
- **Intentional undefined event payloads:** no implemented engine in this worktree dispatches one. Button dispatches its structured pressed detail. The helper’s collapse example passes `undefined`, which the platform delivers as `null`.

For R8, an overlapping restoration’s later token write **can recreate the class attribute after removal**. The strengthened class-presence case demonstrates this with a retained consumer token. The code judges removal after the writing restoration’s token writes and preserves the later token; it adds no coordination across all overlapping restorations. The guide states this bound.

No guard in `src/browser/validators.ts` compares detail with `undefined`. `isButtonEvent` checks a non-null object carrying a boolean `pressed` property. `isCollapseEvent` is absent from this worktree.

The mutation results are:

| Mutation | Case reddened | Run reading |
|---|---|---|
| `#writeBack` checks presence instead of owner | Target overlap | `1 failed \| 16 passed (17)` |
| `#withdraw` checks presence instead of owner | Target overlap | `1 failed \| 16 passed (17)` |
| `#publish` unconditionally replaces the owner | Target overlap | `1 failed \| 16 passed (17)` |
| `#publish` ignores the stamp | Target overlap, shared class presence, inherited stamp | `3 failed \| 14 passed (17)` |
| Style removal omits its presence read | Style restoration | `1 failed \| 16 passed (17)` |
| Style removal ignores original presence | Style restoration | `1 failed \| 15 passed (16)` |
| Style removal drops consumer properties | Style restoration | `1 failed \| 15 passed (16)` |
| Attribute parsing ignores constructor precedence | Overridden invalid attribute | `1 failed \| 27 passed (28)` |
| Tag reading always returns undefined | Tag reading | `1 failed \| 27 passed (28)` |
| Taking a value discards its stamp | Inherited stamp | `1 failed \| 16 passed (17)` |

Every mutation exited 1. The instrument restored the edited source bytes after each run.

The scoped validation output follows verbatim. Every command exited 0. Browser runs used the brief’s Playwright-managed Chromium 153.0.8010.12.

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
Finished in 5964ms on 20 files using 16 threads.
```

`npm.cmd run test:src:browser`:

```text
npm notice run @orkestrel/veneer@0.0.1 test:src:browser
npm notice run vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser

 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/veneer-precedence

················································································································································

 Test Files  8 passed (8)
      Tests  144 passed (144)
   Start at  20:14:23
   Duration  2.54s (transform 0ms, setup 448ms, import 118ms, tests 217ms, environment 0ms)
```

`npm.cmd run test:guides`:

```text
npm notice run @orkestrel/veneer@0.0.1 test:guides
npm notice run node --experimental-strip-types tests/guides.test.ts

 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/veneer-precedence

···················

 Test Files  1 passed (1)
      Tests  19 passed (19)
   Start at  20:14:24
   Duration  1.42s (transform 245ms, setup 80ms, import 1.07s, tests 65ms, environment 0ms)
```

`npm.cmd run test:policy`:

```text
npm notice run @orkestrel/veneer@0.0.1 test:policy
npm notice run vitest run --config vite.config.ts --no-cache --reporter=dot --project policy

 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/veneer-precedence

····································································································-·········

 Test Files  1 passed (1)
      Tests  109 passed | 1 skipped (110)
   Start at  20:14:24
   Duration  2.80s (transform 151ms, setup 82ms, import 330ms, tests 2.20s, environment 0ms)
```

The required searches returned no hits for `started first writes` in the named source and guide files, or for `CustomEvent<undefined>` in `src/browser/types.ts`. `git diff --check` produced no output.

`git status --short` reported:

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

`git diff --stat` reported:

```text
 guides/veneer.md                       |  27 ++++---
 src/browser/Button.ts                  |  13 ++--
 src/browser/HostSnapshot.ts            | 109 +++++++++++++++++++++-------
 src/browser/helpers.ts                 |  27 ++++++-
 src/browser/types.ts                   |  70 ++++++++++--------
 tests/src/browser/HostSnapshot.test.ts | 125 ++++++++++++++++++++++++++++++++-
 tests/src/browser/helpers.test.ts      |  47 +++++++++++++
 tests/src/browser/index.test.ts        |  13 +++-
 8 files changed, 354 insertions(+), 77 deletions(-)
```

No shared-file patches are required. `tests/setupBrowser.ts` and `ROADMAP.md` remain unchanged.

Deviation state: the initial P3 red run was blocked at helper-suite import by the missing P4 export. Its named behavioral failure was subsequently measured by reverting the parsing guard, before the green run. Guide event maps had summary cells rather than separate detail cells; those summaries and their matching TSDoc now state null detail.

The required `prove` invocation returned exactly: `MCP tool call requires approval, but approval policy is never`. It produced no receipt. The implementation and direct validation are complete; the receipt requirement remains unresolved.
