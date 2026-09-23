# F8c-A READERS — report (successor round `f8c-a-brief-2.md`)

Executor: `opus` on Opus 5.5, native Claude subagent, sole writer in `/home/user/veneer-f8b` (branch
`unit/f8b`, checkpoint `d9c03a2`). Nothing committed. Every obligation in `tmp/units/f8c-a-brief.md` is
closed in the owned files. All gates are green except `test:config`, which is red only on the
missing `service` project, as the brief expects.

## State at resumption

I read the tree before editing. `git status --porcelain` showed ` M tests/setupServer.ts` and nothing
else. No report existed.

| Brief obligation | Tree at resumption | Ruling |
| --- | --- | --- |
| 1 `SheetReader`, `SheetLayer`, `SheetDeclaration`, helpers | Everything was declared, but no case proved any of it. The inventory case was red: `npm run test:setup` returned `1 failed \| 163 passed (164)` (`expected [ 'ABSENT_CELL', …(75) ] to deeply equal [ 'ABSENT_CELL', …(71) ]`). Review found these defects: (a) `#layer` and `#framed` stopped at the first ancestor that was not an at-rule, so a style rule nested in another style rule lost its layer and its keyframes exclusion; (b) a custom property's value kept the whitespace before `}` (`"red "`, measured); (c) a memo field per reading contradicted the class's own remark that the readings are derived rather than stored. | Partly closed |
| 2 Readiness (`tests/setupService.ts`) | File absent | Not closed |
| 3 Stage (`StageManager`, `stage`, `compileProfile`) | Absent | Not closed |
| 4 `tests/setupStyles.ts` (`NEUTRAL_MARKUP`, `collectFencedBlocks`) | Untouched | Not closed |
| 5 `package.json` scripts | Untouched | Not closed |
| 6 Mutations | No reading on disk | Not closed |

## Touched files

The following files changed, each with a one-line summary.

- `tests/setupServer.ts`: adds `SheetReader`, `SheetLayer`, `SheetDeclaration`, `collectSharedNames`, `collectImportantNames`, `InlineSource`, and `collectInlineSources`. `InlineSource` and `collectInlineSources` are copied unchanged from `tests/setupBrowser.ts`, whose copies stay. The file also fixes defects (a) to (c), imports `Container` and `list` from `postcss`, and updates the module header.
- `tests/setupServer.test.ts`: adds the `SheetReader` cases and the `collectSharedNames`, `collectImportantNames`, and `collectInlineSources` cases. Adds the runtime exports to the inventory case, whose title gains "the stylesheet reader".
- `tests/setupService.ts` (new): adds `Readiness`, `StageRule`, `CASCADE_PATH`, `CANDIDATES_PATH`, `READINESS_INPUT`, `CANDIDATE_FLOOR`, `STAGE_TIMEOUT`, `scanReadiness`, `resolveBrowserExecutable`, `verifyReadiness`, `compileProfile`, `StageManager`, and `stage`. The module ends with a top-level `await verifyReadiness()`.
- `tests/setupService.test.ts` (new): proves every export in the preceding item.
- `tests/setupStyles.ts`: exports `NEUTRAL_MARKUP` with TSDoc, placed in the case-table section after `TABLE_MARKUP`. The body of `collectFencedBlocks` becomes `extractFences(createMarkdown(source).document)` filtered by language, and its TSDoc keeps the reason.
- `tests/setupStyles.test.ts`: adds `NEUTRAL_MARKUP` to the inventory, adds a `NEUTRAL_MARKUP` case, and adds a fence nested in a list item to the fence case.
- `tests/tailwind/preflight.test.ts`: imports `NEUTRAL_MARKUP` and deletes its local declaration and comment. Nothing else changed.
- `package.json`: adds `"test:service": "vitest run --config vite.config.ts --no-cache --reporter=dot --project service"` after `test:setup`, and appends `&& npm run test:service` to `prepublishOnly` after `npm run test:distribution -- --mode release`. `test:src:tailwind` and its clause in `test:src` are kept.

## Export set and proofs

### `tests/setupServer.ts` (cases in `tests/setupServer.test.ts`)

| Export | Case (`describe` › `it`) |
| --- | --- |
| `SheetReader.statement` | `SheetReader` › reads the statement a sheet opens with, past a leading comment and nowhere else (covers a leading comment, an empty sheet, a leading style rule, a leading block, and a leading `@layer properties;` statement) |
| `SheetReader.order` | › orders each layer at its first placement, statement or block (covers repeated statements, repeated blocks, the cascade before a profile, and no layer) |
| `SheetReader.layers` | › reads each opened block by its own name, and loses a relabelled block while its variables stay declared (covers the relabelled-`theme` plant and nested blocks) |
| `SheetReader.names` | › reads class names with adjacent classes and escapes, and refuses a functional argument and an attribute string |
| `SheetReader.selectors` | › reads every style rule selector, nested ones included, and no keyframe step |
| `SheetReader.properties` | › reads the custom properties a sheet declares, and no registration |
| `SheetReader.declarations` | › reads each declaration with its importance and the layer it sits in (covers a nested style rule's layer) |
| `collectSharedNames` | `collectSharedNames` › keeps the names both lists carry, once, in the first list order (covers disjoint, empty, repeated, and overlapping lists) |
| `collectImportantNames` | `collectImportantNames` › reports a name one important declaration writes, even where another rule declares it normally |
| `collectInlineSources`, `InlineSource` | `collectInlineSources` › reads the source directives a stylesheet declares, apart from what a compiler does with them; › refuses a directive written in a form the grammar cannot read, rather than skipping it (the moved cases) |
| inventory | `server setup` › declares the identity constants, the specifier walk, the ledger readers, the stylesheet reader, and the helpers the conformance proof measures with |

### `tests/setupService.ts` (cases in `tests/setupService.test.ts`)

| Export | Case |
| --- | --- |
| inventory, `stage`, `CANDIDATE_FLOOR` frozen | `service setup` › exports the readiness verdict and its gathering, the profile compile, and the stage |
| `scanReadiness`, `Readiness` | `scanReadiness` › passes evidence from every gate, and refuses the first failing gate, cheapest first; › refuses a compile without the readiness rule and a cascade with nothing in it; › refuses a cascade missing any one member of the candidate floor, by name |
| `CANDIDATE_FLOOR` | `scanReadiness` › holds a floor every member of which the tailwind profile excludes (checked against the exclusion line in `tests/setup.css`, read with `collectInlineSources`) |
| `resolveBrowserExecutable` | `resolveBrowserExecutable` › names the executable a local launch uses, and nothing for a connection, a channel, or a path with no executable |
| `verifyReadiness`, `CANDIDATES_PATH`, `CASCADE_PATH` | `verifyReadiness` › passes the real gates and writes every class the cascade declares, sorted, one per line; › refuses a missing cascade under a scratch root before writing anything; › refuses a cascade missing a floor member, and writes a complete one sorted |
| `compileProfile`, `READINESS_INPUT` | `compileProfile` › compiles a profile from its own path through the installed plugin; › refuses a profile whose import resolves to nothing |
| `StageManager` (`open`, `mount`, `load`, `read`, `properties`, `clear`, `destroy`, `connected`), `StageRule`, `STAGE_TIMEOUT` | `StageManager` › opens a page carrying the cascade, reads what a loaded sheet resolves, and clears what the case loaded (real launch; `read` returns the loaded `7px` and a default snapshot with no custom property; `properties` returns the longhands for `border: 0 solid` without `border`, reaches a rule nested in `@layer` and `@media`, and leaves the page's `hr` reading unchanged; `clear` empties the container and removes the loaded sheet) › destroys a stage whose open failed part way, and one it never opened (a scratch root without a cascade: `open` rejects with `ENOENT`, `connected` is `true`, and after `destroy` it is `false`; a second `destroy` and a never-opened `destroy` are no-ops) |

### `tests/setupStyles.ts` (cases in `tests/setupStyles.test.ts`)

| Export | Case |
| --- | --- |
| `NEUTRAL_MARKUP` | `styles setup` inventory; › renders each preflight tag once, inside the relative its content model mandates |
| `collectFencedBlocks` (rerouted) | › reads the fenced blocks of one language, and leaves every other block out (adds a fence inside a list item) |

## Decisions settled within scope

- **`SheetReader.names` uses `collectSelectorClasses`.** That grammar reads adjacent classes and skips classes inside functional arguments and attribute strings, which is the grammar the verdict names. I measured it against the built cascade with a runtime probe in `tmp/probe/` and then deleted the probe. The top-level grammar and a grammar that also reads inside functional arguments each found the same 484 names, so the choice does not change the candidate population. The wrapper's `CASCADE_CLASS` expression found 527 names. It read 43 numeric fragments out of declaration values (such as `5`, `75`, and `125rem`) and missed `active`, `show`, and `disabled`, which the cascade writes only against another class (`.btn.active`). The `verifyReadiness` real-gates case asserts `active` is in the list and `5` is not.
- **The readiness browser gate names an executable file.** Empty provider options resolve to the pinned path, and an explicit `executablePath` resolves to that path. Either one must pass `isBrowserExecutable`. A channel or a remote connection gives `undefined`, which produces the refusal that names `npx playwright install chromium`, because neither can be checked without a launch.
- **The compiler gate input is `@tailwind utilities source(none);` followed by `@source inline("flex");`.** It imports nothing, so it compiles from any path. The probe showed that an `@import 'tailwindcss/…'` input cannot resolve from a scratch directory outside the workspace. The gate passes when the output declares `.flex`.
- **`verifyReadiness(root = WORKSPACE_ROOT)` takes a root parameter.** The brief's scratch-root cases need this seam. `StageManager(root = WORKSPACE_ROOT)` takes the same seam for the failed-open case.
- **`StageManager.connected` is a boolean getter.** It is the observable that proves `destroy` closes a browser a failed `open` left behind. `load` uses Playwright's `addStyleTag` and records the handle. `clear` does nothing on a stage that is not open.
- **`SheetDeclaration.value` is trimmed.** Without the trim, custom-property values differ from other values by trailing whitespace.
- **`STAGE_TIMEOUT` is `12_056`.** The lifecycle case took 3528 ms on a contended run (load 11.6). The budget is twice that plus 5000 ms, the rule `ORACLE_TIMEOUT` follows.

## Mutations

The instrument is `/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/f8c/mutate.py`, and its log is `mutations.log.txt` beside it. The instrument applied each plant, ran the command, and restored the original text, which is the exact reverse edit. It then re-ran the command.

The first command runs the reader cases:
`npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project setup tests/setupServer.test.ts -t "SheetReader|collectImportantNames|collectInlineSources|collectSharedNames"`

The second command runs the readiness and compile cases:
`npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project setup tests/setupService.test.ts -t "scanReadiness|compileProfile"`

| Mutation | Command | Red reading | Case that reddens | Green after revert | SHA-256 before = after |
| --- | --- | --- | --- | --- | --- |
| `order` collects blocks only (a statement contributes `[]`) | reader | 1 failed \| 10 passed | `SheetReader` › orders each layer at its first placement, statement or block | 11 passed | `c6743a52…2ca0e` restored |
| A nested rule (inside `@media`) omitted from `selectors` | reader | 1 failed \| 10 passed | `SheetReader` › reads every style rule selector, nested ones included, and no keyframe step | 11 passed | restored |
| An escaped class (`w-1/2`) dropped from `names` | reader | 1 failed \| 10 passed | `SheetReader` › reads class names with adjacent classes and escapes, … | 11 passed | restored |
| A normal declaration (`margin`) classified important | reader | 2 failed \| 9 passed | `SheetReader` › reads each declaration with its importance and the layer it sits in; `collectImportantNames` › reports a name one important declaration writes, … (each asserts importance) | 11 passed | restored |
| Malformed inline syntax accepted silently | reader | 1 failed \| 10 passed | `collectInlineSources` › refuses a directive written in a form the grammar cannot read, rather than skipping it | 11 passed | restored |
| Readiness gates reordered (compiler after the cascade gates) | service | 1 failed \| 5 passed | `scanReadiness` › passes evidence from every gate, and refuses the first failing gate, cheapest first | 6 passed | `2ff813bf…4a2a48` restored |
| One refusal sentence changed (the browser gate's install command) | service | 1 failed \| 5 passed | the same first-refusal case | 6 passed | restored |
| `compileProfile` given an unresolvable import and expected to succeed (the test side's `rejects.toThrow` becomes `resolves.toContain`) | service | 1 failed \| 5 passed | `compileProfile` › refuses a profile whose import resolves to nothing | 6 passed | `e2468fa3…837bb` restored |

After the mutation runs, one TSDoc line in `tests/setupServer.ts` changed (the escape example in `names`). No code changed. The reader cases were re-run after that edit: 11 passed. The final hashes are:

- `tests/setupServer.ts`: `7306d76637fab129a6cb06efb8c974c3782d5adf98cc64376037c25aefcce233`
- `tests/setupService.ts`: `2ff813bf5856595702139c0ed0921ce602f2e97711402950f6a795a86e6e2a48`
- `tests/setupService.test.ts`: `e2468fa3ddefb600a7212a0562ad3ae62eb6eff17f222724f2ba89a1875837bb`

## `test:setup` timings (observation)

- **Before readiness:** 16.4 s wall, 164 tests, load 2.0. The tree held only the partial round's `tests/setupServer.ts`, and the inventory case was red.
- **After readiness:** 21.5 s wall at load 9.3 and 18.3 s wall at load 5.0 (the final run), 189 tests, exit 0.
- **Readiness itself:** the real-gates `verifyReadiness` case took 147 ms uncontended and 39 ms contended. It covers the compile, the cascade read and parse, the executable check, and the list write. Most of the added wall time is the stage cases, each with a real Chromium launch (1.2 to 3.5 s each).

## Gate exits

- `npm run format:check`: exit 0 ("All matched files use the correct format", 220 files).
- `npm run lint:check`: exit 0.
- `npm run check`: exit 0.
- `npm run test:policy`: exit 0, `109 passed | 1 skipped (110)`. `SheetReader` collides with no hosted `## Surface` name. The first run, taken right after the `SheetReader` cases went green, gave the same count.
- `npm run test:setup`: exit 0, `Test Files 4 passed (4)`, `Tests 189 passed (189)`.
- `npm run test:src:tailwind`: exit 0, `Test Files 3 passed (3)`, `Tests 17 passed (17)`.
- `npm run test:config`: exit 1, `Tests 2 failed | 171 passed | 1 skipped (174)`. The failures come from the unregistered `service` project, which the Orchestrator's `scaffold repair --groups configs` supplies:
  - `tests/config.test.ts > root configuration > registers every workspace project with its fixed include and setup files`: `Error: service has no project factory or configuration`
  - `tests/config.test.ts > root configuration > registers proof scripts in the correct gate`: `AssertionError: expected 'vitest run --config vite.config.ts --…' to be undefined`. The received value is the `test:service` script. The case expects the script to be absent while the project is unregistered.

## `git status --porcelain`

```text
 M package.json
 M tests/setupServer.test.ts
 M tests/setupServer.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
 M tests/tailwind/preflight.test.ts
?? tests/setupService.test.ts
?? tests/setupService.ts
```

## `git diff d9c03a2 --stat`

This covers tracked files only. The new files are untracked.

```text
 package.json                     |   3 +-
 tests/setupServer.test.ts        | 243 +++++++++++++++++++++++++-
 tests/setupServer.ts             | 369 ++++++++++++++++++++++++++++++++++++++-
 tests/setupStyles.test.ts        |  25 +++
 tests/setupStyles.ts             |  71 +++++++-
 tests/tailwind/preflight.test.ts |  52 +-----
 6 files changed, 699 insertions(+), 64 deletions(-)
```

## Deviations and observations

- **Deviation state: none.** No gate named a file outside § Scope, `SheetReader` has no collision, and no verdict ruling contradicts the tree.
- **Timing observation.** One verbose `setup` run at load 11.6 reddened the existing oracle case `server setup › records and reads official control state and rejects contradicted or absent obligation steps` at its own 10 100 ms budget (`ORACLE_TIMEOUT`). The stage cases in `tests/setupService.test.ts` launch Chromium in parallel with that oracle file. The timed `npm run test:setup` runs at load 9.3 and load 5.0 each exited 0. The Orchestrator should take the deciding re-run.
- **Transitional duplicates for F8c-B.** `collectInlineSources`, `InlineSource`, and `collectSharedNames` are declared in both `tests/setupServer.ts` and `tests/setupBrowser.ts`. The browser copies are off-limits in this unit, and F8c-B deletes them. The browser `collectSharedNames` takes stylesheets, and the server one takes name lists.
- **Readiness writes the candidate list.** Importing `tests/setupService.ts`, which the `setup` project does, writes `tmp/tailwind/candidates.txt` with the `SheetReader.names` grammar. The wrapper in `configs/src/vite.tailwind.config.ts` writes the same file with its regular expression while its configuration resolves, so whichever runs last owns the file's content. `test:src:tailwind` passed 17 of 17 against the list its wrapper writes. No run in this unit compiled the profiles against the readiness list. F8c-B deletes the wrapper.
- **Tailwind logs the refusal.** The `compileProfile` refusal case prints the plugin's own resolve error to stderr, and the case still passes.
- **Instrument cleanup.** The runtime probes I wrote under `tmp/probe/` are deleted, and so is the directory.
