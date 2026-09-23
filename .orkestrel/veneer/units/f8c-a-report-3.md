# F8c-A READERS, round 3: report (`f8c-a-brief-3.md`)

Executor: `opus` on Opus 5.5, a native Claude subagent. It was the sole writer in `/home/user/veneer-f8b` (branch `unit/f8b`, checkpoint `5099318`). Nothing is committed.

Every carried finding is closed in the owned files. Every gate the brief names exits 0.

One conflict sits outside this unit's gates, and you need to rule on it. The conformance case `runtime boundaries › imports no forbidden runtime package from source, application, or tests` is red on `tests/setupService.ts`. It was already red at `5099318`. The only form that passes lint is a literal `import('@tailwindcss/postcss')`, and that case refuses any literal Tailwind specifier under `tests/`. See § Deviations.

## Carried findings

1. **Analyst 1 / R4: `SheetReader` misses declarations under a conditional block, and the prefixed keyframes exclusion.** `#collect(container)` walks declarations in source order with `walkDecls`. Each declaration takes its selector from the nearest style-rule ancestor (`#rule`) and its layer from the nearest layer block (`#layer`). A declaration that no style rule encloses, such as an `@font-face` descriptor, is left out. `declarations` and `layers` both read through `#collect`. `#framed` now matches `/^(?:-[a-z]+-)?keyframes$/u`. The following regression cases were added:
   - the conditional case: `reads a declaration a conditional block wraps inside a rule under that rule selector`;
   - `@-webkit-keyframes` in the selectors case, retitled `… and no keyframe step, prefixed or not`;
   - a `@keyframes` block in the declarations case (retitled `… and no keyframe step`), the layers case, and the `collectImportantNames` case;
   - `.panel { @media … { color: red !important } }` in the `collectImportantNames` case.
2. **Analyst 5 / reviewer 5: the `NEUTRAL_MARKUP` case derives its tags from the markup it judges.** The case is retitled `renders each tag the preflight pairing reaches once, inside a parent its content model mandates`. It now derives the required tags from two independent sources. The first is the installed reset, `tailwindcss/preflight.css`, read with `SheetReader.selectors` and `collectTypeSelectors`. The second is `ELEMENT_TAGS`. The case requires the markup's tags to equal that set when sorted. It also checks that every tag a rendering writes, where `MANDATED_TAG_PAIRS` names a parent for it, sits after one of those parents opens and before that parent closes. A probe showed that the Node-derived set equals the markup's tag set exactly.
3. **Analyst 7: the `READY` fixture is local to one test file.** It is exported as `PASSING_READINESS` from `tests/setupService.ts`, frozen, with TSDoc. It is in the inventory case, and its frozen state is asserted.
4. **F1 / D23: two members are named with the wrong part of speech or scope.** `StageManager.properties(css)` is renamed `expand(css)`, and `SheetReader.properties` is renamed `variables`. TSDoc, cases, and titles follow. `SheetDeclaration.property`, `StageRule.properties`, and the `read(selector, properties?)` parameter keep their names.
5. **F2: the setup proof bundles several behaviours per case.** `describe('StageManager') › describe('an open stage')` owns one `StageManager`. `beforeAll` opens it (with `STAGE_TIMEOUT`), `afterEach` clears it, and `afterAll` destroys it. That block has one case per behaviour: a loaded sheet over the cascade, the default snapshot without custom properties, `expand`, `clear`, and the second-open refusal. The failed-open case and the never-opened case each use their own instance. `scanReadiness` is split into `passes evidence from every gate` and `refuses the compiler first, then the cascade, then the browser, then the floor`. The floor case sits under `describe('CANDIDATE_FLOOR')`. A mutation to `expand` reddens the `expand` case alone (see § Mutations).
6. **F3: prose in the setup modules breaks the writing rules or contradicts the code.**
   - The module header names the conditions the gates check without counting them.
   - The `scanReadiness` remarks state that the leaf fixes the order of refusals.
   - The floor refusal now gives its cause and names no command: `… class of the candidate floor, so the cascade or the class grammar reading it lost a family`.
   - Every temporal `once` is replaced, and the possessive code tokens are rewritten.
   - The `stage` TSDoc is a convention: a proof file shares this instance; construct a `StageManager` only to read a cascade under another root.
   - The `collectFencedBlocks` TSDoc line in `tests/setupStyles.ts` is reflowed.
7. **F4: `CASCADE_PATH` has two homes.** `CASCADE_PATH` is declared in `tests/setupServer.ts` after `WORKSPACE_ROOT`. `readBuiltCascade` defaults to `resolve(WORKSPACE_ROOT, CASCADE_PATH)`. `tests/setupService.ts` and its test import it from `tests/setupServer.ts`. The inventory row moved to the server inventory, and the built-cascade case asserts that the default equals the explicit path.
8. **R1: the browser gate refuses a channel or endpoint that the stage can use.** `resolveBrowserExecutable` is renamed `resolveBrowserTarget` because it no longer returns only executables. It returns:
   - the channel;
   - the `wsEndpoint`;
   - an executable path, which must pass `isBrowserExecutable`. For empty options, that path is the pinned revision;
   - `undefined` when the path has no executable, which triggers the refusal naming `npx playwright install chromium`.

   Each branch has its own case with literal provider options.
9. **R2: a missing compiler package fails module linking before readiness can refuse.** The module-scope static import is gone. `importCompiler()` is the one exported leaf, tested, that `compileProfile` and the gate share. It does a literal `await import('@tailwindcss/postcss')`. `verifyReadiness(options: ReadinessOptions = {})` takes `root` and `compiler`. `compiler` is the loader seam, and its default is `importCompiler`. The gather catches the loader or compile error and throws the `npm ci` refusal with that error as `cause`. Cases:
   - `importCompiler › resolves the installed plugin, which compiles the readiness input`;
   - `verifyReadiness › refuses a compiler that does not load, naming the restoring command and keeping the load error as its cause`. This case uses a rejecting loader, which is a boundary stub for the loader interface.
10. **R3: the TSDoc hides how nested layer blocks read.** The class remarks, the `order` remarks, `SheetDeclaration.layer`, and the nested-layer comment in the layers case state that a nested block reads by its written name (`inner`), while the cascade places it as `outer.inner`. No code changed.
11. **R6 / D23: `StageManager` hand-rolls its release order.** `StageManager` composes `createTeardown()`:
    - `open` refuses while the list holds anything (`The stage is already open; destroy it first`).
    - `open` then registers the scratch removal, launches the browser, and registers `browser.close()`.
    - `destroy` drops the page and the sheets, then runs the list, which empties.
    - `connected` is still derived from the browser.

    The failed-open case covers four behaviours:
    - After a failed open, `connected` is true and a second `open` is refused.
    - After `destroy`, `connected` is false.
    - A second `destroy` is a no-op.
    - The same instance opens again after its root gains a cascade, which shows the list emptied.

    The never-opened case covers `destroy`, `clear`, and the `read` refusal.
12. **R5 and R7: observations.** See § Timing and § Deviations.

## Unknowns settled

- **Pairs added to `MANDATED_TAG_PAIRS`:** `['datalist','option']`, `['menu','li']`, `['select','optgroup']`, `['table','tr']`, `['tbody','tr']`, `['tfoot','tr']`, and `['thead','tr']`. Each one completes the legal parents of a tag the markup renders (`option`, `li`, `optgroup`, `tr`), so the table's claim "legal only under the parents the table lists" holds for them.
  - Two `ELEMENT_TAGS` rows had to change so that `names every partial … and gives each mandated child a legal parent` stays green. The `optgroup` row gains `select`, and the `tr` row gains `table`. The distinct tag set is unchanged, so conformance's `collectElementTags` comparison and `STYLED_TAGS` are unaffected.
  - Adding `tbody` to the `tr` row was tried first. It reddened that case (`tr names tbody without a legal parent`), so `table` was used instead.
- **Compiler loader name:** `importCompiler`.

## Mutations

The instrument is `/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/f8c3/mutate.py`, and its log is `mutations.log.txt` beside it. For each mutation, the instrument applied the plant, ran the command, and restored the exact original text. It then re-ran the command and hashed the file.

The first two mutations restore the pre-fix code, so their red readings are this unit's failing-first proofs.

The commands are:

- **Reader:** `npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project setup tests/setupServer.test.ts -t "SheetReader|collectImportantNames"`
- **Markup:** `… --project setup tests/setupStyles.test.ts -t "preflight pairing reaches"`
- **Service:** `… --project setup tests/setupService.test.ts`

| Mutation | Command | Red reading | Case that reddens | Green after revert | SHA-256 before = after |
| --- | --- | --- | --- | --- | --- |
| Conditional walk reverted to direct children only (pre-fix) | reader | 2 failed \| 7 passed | the `SheetReader` conditional case; `collectImportantNames › reports a name …` | 9 passed | `c89edb17…d5dd72` = |
| Prefixed keyframes exclusion dropped (pre-fix) | reader | 1 failed \| 8 passed | `SheetReader › reads every style rule selector, … prefixed or not` | 9 passed | `c89edb17…d5dd72` = |
| `#framed` guard removed from `declarations` (`#collect`) | reader | 2 failed \| 7 passed | `… reads each declaration … and no keyframe step`; `… reads each opened block by its own name …` (`layers` reads its declarations through the same `#collect`) | 9 passed | `c89edb17…d5dd72` = |
| `#framed` guard removed from `layers` (its selector walk) | reader | 1 failed \| 8 passed | `… reads each opened block by its own name …` | 9 passed | `c89edb17…d5dd72` = |
| `hr` removed from `NEUTRAL_MARKUP` | markup | 1 failed | the `NEUTRAL_MARKUP` case | 1 passed | `24b01940…7e3043` = |
| `optgroup` unwrapped from `select` | markup | 1 failed | the `NEUTRAL_MARKUP` case | 1 passed | `24b01940…7e3043` = |
| `expand` stops descending into grouping rules | service | 1 failed \| 22 passed | `… an open stage › expands each rule …` only | 23 passed | `1e9af0bd…f08581` = |
| Channel branch refusing | service | 1 failed \| 22 passed | `resolveBrowserTarget › names the channel a launch takes …` | 23 passed | `1e9af0bd…f08581` = |
| Gather swallowing the loader error (`failure = error` → `void error`) | service | 1 failed \| 22 passed | `verifyReadiness › refuses a compiler that does not load …` | 23 passed | `1e9af0bd…f08581` = |
| Browser gate judged before the cascade gates | service | 1 failed \| 22 passed | `scanReadiness › refuses the compiler first, …` only (the pass case stays green) | 23 passed | `1e9af0bd…f08581` = |
| `destroy` skipping the teardown list | service | 1 failed \| 22 passed | `StageManager › destroys a stage whose open failed part way …` | 23 passed | `1e9af0bd…f08581` = |

Every reader and markup run also reported the cases outside the `-t` filter as skipped: `74 skipped (83)` for the reader command and `74 skipped (75)` for the markup command.

The final SHA-256 values are:

- `tests/setupServer.ts`: `c89edb170519c8cc7760826812a8d22ac6b87f28b09d79d2181db35f51d5dd72`
- `tests/setupServer.test.ts`: `233c51555921720ff1ad572a554454e50f5494e486db7a48941b1a0870920634`
- `tests/setupService.ts`: `1e9af0bdc43e3fe6db15a2d8ef581b43ec03aaba701b7df7702318f036f08581`
- `tests/setupService.test.ts`: `85703486d553253ff5245188e907d2a1e7453e862503349ada84317d60c54949`
- `tests/setupStyles.ts`: `24b01940b9947d3be5affa6f692187d6a331b72067d58ea52525d5313f7e3043`
- `tests/setupStyles.test.ts`: `b937ac0bab948a650bbc5266cd4e1af3dec97f82ac1f848088642988435d835d`

## Timing (observation)

- **Before the restructure:** at the checkpoint, at load 5.3, `npm run test:setup` returned `1 failed | 188 passed (189)` in 23.6 s. The failure was the oracle case `records and reads official control state …` at its `ORACLE_TIMEOUT` (R7).
- **After the restructure:** the `test:setup` gate run gave exit 0, `200 passed (200)`, 12.0 s wall, at load 4.2. An earlier run gave `200 passed`, 13.6 s wall, at load 6.0.
- **Stage launches:** the stage cases now make one launch for the open stage, plus two launches in the failed-open case.

## Gate exits

All gates were run from `/home/user/veneer-f8b`:

- `npm run format:check`: exit 0 ("All matched files use the correct format", 220 files).
- `npm run lint:check`: exit 0, with no diagnostics.
- `npm run check`: exit 0.
- `npm run test:policy`: exit 0, `109 passed | 1 skipped (110)`. None of the new exports collides with a name a hosted guide claims.
- `npm run test:config`: exit 0, `173 passed | 1 skipped (174)`.
- `npm run test:setup`: exit 0, `4 passed (4)` files, `200 passed (200)` tests.
- `npm run test:src:tailwind`: exit 0, `3 passed (3)` files, `17 passed (17)` tests.

These runs are observations outside the brief's gates:

- `npm run test:setup:browser`: exit 0, `68 passed (68)`.
- `npm run test:src:styles`: exit 0, `58 passed (58)` files, `417 passed (417)` tests.
- `vitest --project conformance`: `1 failed | 16 passed (17)`. See § Deviations.

## `git status --porcelain`

```text
 M tests/setupServer.test.ts
 M tests/setupServer.ts
 M tests/setupService.test.ts
 M tests/setupService.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
```

## `git diff 5099318 --stat`

```text
 tests/setupServer.test.ts  |  44 +++++--
 tests/setupServer.ts       | 130 ++++++++++--------
 tests/setupService.test.ts | 320 +++++++++++++++++++++++++++++----------------
 tests/setupService.ts      | 276 +++++++++++++++++++++++---------------
 tests/setupStyles.test.ts  |  32 ++++-
 tests/setupStyles.ts       |  27 ++--
 6 files changed, 532 insertions(+), 297 deletions(-)
```

## Deviations and observations

- **Conformance red on `tests/setupService.ts`, standing since `5099318`.** This needs your ruling.
  - **The case.** `tests/conformance.test.ts › runtime boundaries › imports no forbidden runtime package from source, application, or tests` scans every file under `tests/` against `FORBIDDEN_RUNTIME` (`tailwindcss`, `@tailwindcss/`). It reports `"forbidden": "@tailwindcss/postcss", "path": "tests/setupService.ts"`.
  - **It was already red at the checkpoint.** A probe ran `scanForbiddenSource` over `git show 5099318:tests/setupService.ts` and returned `@tailwindcss/postcss`, while a control with no Tailwind import returned `undefined`.
  - **Why this unit cannot close it.** Design rulings 2 and 3 require this module to import the compiler. Lint's `import/no-dynamic-require` (`esmodule: true`) refuses a non-literal `import(specifier)`: the first draft took a variable specifier and failed lint at `tests/setupService.ts:212`. The scan refuses the literal form. The literal form keeps lint green and leaves conformance exactly as red as the checkpoint. The unit ruled out keeping any Tailwind specifier out of the scan's sight, because that would hide the import from the scan.
  - **F8c-B inherits it.** The `tests/service/**` proofs will meet the same case.
  - **A candidate patch for an off-limits file.** This patch is unverified, because the file is off-limits to this unit. It goes in `tests/conformance.test.ts`, inside that case's loop:

    ```ts
    // The service setup and its proofs drive the installed Tailwind compiler for real; that is their subject.
    if (path === 'tests/setupService.ts' || path.startsWith('tests/service/')) continue
    ```

    The inventory keys are workspace-relative with forward slashes: the failure printed `tests/setupService.ts`.
- **R2 settled in scope.** Because the import is literal, the cause case drives the gate through the `compiler` loader seam with a rejecting loader, rather than through a missing package. The brief's "loader swallowing the error" mutation is therefore applied where the error is kept, in the gather's `catch`. A mutation inside `importCompiler` cannot be driven without uninstalling the package. The installed-plugin case proves `importCompiler` itself.
- **R1 against the stage.** Per the brief, the gate passes a `wsEndpoint` as evidence without connecting. `StageManager.open` and `recordButtonOracle` still refuse a remote connection. Under `PLAYWRIGHT_WS_ENDPOINT`, readiness therefore passes, and the first `open` refuses with its own sentence.
- **Release order.** The scratch directory is private to `StageManager`, so no case observes that it is removed after the browser closes. That order comes from `createTeardown` (newest first) together with the order in which `open` registers the releases. The failed-open case proves the browser release and the emptied list.
- **R5.** Readiness and the `test:src:tailwind` wrapper still both write `tmp/tailwind/candidates.txt`. This is transitional until F8c-B.
- **Ancillary names settled in scope:**
  - `PASSING_READINESS`;
  - `importCompiler`;
  - `ReadinessOptions` with the `root` and `compiler` keys;
  - `resolveBrowserTarget`, a rename, because the function now returns a channel or an endpoint as well as a path;
  - the case titles listed in § Carried findings.
- **Instruments.** All runtime probes are deleted, and `tmp/probe/` is removed. The probes measured the Node-derived preflight overlap, variable-specifier import behaviour, and the checkpoint conformance scan.
