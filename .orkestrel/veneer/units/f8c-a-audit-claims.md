# F8c-A READERS — audit claims

Subject: the F8c-A unit's uncommitted writes in `/home/user/veneer-f8b` over the checkpoint
`d9c03a2`, written by `opus` from `/home/user/veneer-f8b/tmp/units/f8c-a-brief.md` and its
completion brief `f8c-a-brief-2.md` (the first run died on the session rate limit) under the design
`/home/user/veneer-f8b/tmp/units/f8c-design-verdict.md` (D19; rulings 1, 2, 3, 5, and 7). Evidence:
`/home/user/scaffold/tmp/audit/f8c-a.diff` (the whole diff, untracked files as additions),
`f8c-a-status.txt`, the report `/home/user/scaffold/tmp/audit/f8c-a-report.md`. F8c-B (not yet
written) owns the move of the proofs to `tests/service/tailwind/`, the deletion of the wrapper and
the browser readers, and the guide; nothing here is ruled against F8c-B's obligations. Every lane
rules each claim CONFIRMED, BROKEN, or UNRESOLVED with `file:line` evidence; a claim about a proof
is ruled on the mutation named and whether the assertions distinguish it.

1. **`SheetReader` is the entity ruling 1 names.** In `tests/setupServer.ts` the class is
   constructed from CSS text, parses once, derives each reading lazily from that parse, and exposes
   one-word members `statement`, `order`, `layers`, `names`, `selectors`, `properties`, and
   `declarations` with the meanings ruling 1 fixes (`statement` is `undefined` when the sheet opens
   with another node; `order` records each layer at its first placement, statement or block;
   `layers` are `SheetLayer` records of `name`, `selectors`, `declarations`; `names` resolves escapes
   and reads adjacent classes through the `collectSelectorClasses` grammar; `properties` are custom
   properties declared anywhere, never an `@property` registration; each `SheetDeclaration` carries
   `selector`, `property`, `value` (trimmed), `important`, and its layer, a nested rule keeping its
   enclosing layer and a keyframe step excluded). `SheetLayer` and `SheetDeclaration` are declared in
   the same module with readonly members; the class uses `#` fields, no `as`, no `!`, no nested
   function, TSDoc in the file's voice; `collectSharedNames(names, others)`,
   `collectImportantNames(reader)`, and `collectInlineSources(source)` with `InlineSource` sit
   beside it as `{verb}{Noun}` helpers, the inline pair copied unchanged from
   `tests/setupBrowser.ts` (whose copy stays for F8c-B); each export is in the inventory case.
2. **The reader proofs bind.** `tests/setupServer.test.ts` proves each member over literal
   stylesheets as the report's table lists (statement: a leading comment, an empty sheet, a leading
   style rule, a leading block, a leading `@layer properties;`; order: repeated statements, blocks,
   a cascade before a profile, no layer; layers: the relabelled-`theme` plant empties the reading
   while `properties` still finds each variable; names: adjacent classes, escapes, functional
   arguments and attribute strings refused; selectors: nested media, keyframe steps excluded;
   declarations: importance and the nested rule's layer; `collectSharedNames`: disjoint, empty,
   repeated, overlapping; `collectImportantNames`: one name important in one rule and normal in
   another; `collectInlineSources`: the moved cases with the refusal). Mutations: `order`
   collecting blocks only, a nested rule omitted from `selectors`, an escaped class dropped from
   `names`, malformed inline syntax accepted silently — each reddens exactly the named case
   (`1 failed | 10 passed (11)`); a normal declaration classified important reddens the
   declarations case and the `collectImportantNames` case (`2 failed | 9 passed (11)`); after the
   reverts `tests/setupServer.ts` reads SHA-256 `7306d766…ce233` (one TSDoc example line changed
   after the mutation runs and the reader cases were re-run green).
3. **Readiness is ruling 2's.** `tests/setupService.ts` exports `Readiness` (`compiler`, `cascade`,
   `browser`, each evidence or `undefined`), the pure leaf `scanReadiness(readiness): string |
   undefined`, and `verifyReadiness(root = WORKSPACE_ROOT): Promise<void>`, and the module body
   awaits `verifyReadiness()` at top level. The gates run cheap first: the installed compiler
   compiles `READINESS_INPUT` (`@tailwind utilities source(none);` then `@source inline("flex");`,
   passing when `.flex` is declared); `CASCADE_PATH` (`dist/src/styles/index.css`) is present and
   non-empty with the refusal naming `npm run build:src:styles`; the pinned browser resolves through
   `resolveBrowser(resolvePinnedBrowser(), process.platform, process.env)` and
   `resolveBrowserExecutable` names an executable file, a channel or a remote connection refusing
   with the install command, without a launch; the candidate list is `new SheetReader(cascade).names`
   checked against `CANDIDATE_FLOOR` (`container`, `table`, `col-1`, `caption-top`,
   `caption-bottom`) and written sorted, one name per line, to `CANDIDATES_PATH`
   (`tmp/tailwind/candidates.txt`, the path `tests/setup.css` names). `tests/setupService.test.ts`
   drives every refusal sentence and the gate order with literal `Readiness` values, runs the real
   gates green (asserting `active` in the list and `5` absent), produces the missing-cascade sentence
   through a scratch root, and refuses a cascade missing one floor member; the mutations "gates
   reordered" and "one refusal sentence changed" each redden the first-refusal case (`1 failed | 5
   passed (6)`), and `tests/setupService.ts` reads SHA-256 `2ff813bf…4a2a48` after the reverts.
4. **The stage is ruling 3's.** `StageManager`, exported as `stage`, carries `open()` (headless
   Chromium the oracle's way, a scratch page under `createScratch()` linking the built cascade
   first, navigated by `pathToFileURL`), `mount(markup)`, `load(css)` (a recorded style tag),
   `read(selector, properties?)` (every match's computed snapshot in document order from one
   `page.evaluate`), `properties(css)` (the longhand names Chromium assigns a detached constructed
   sheet, per rule, never attached to the measured document), `clear()` (empties the container and
   removes every loaded sheet; a no-op when not open), `destroy()` (closes the browser and the
   scratch, also after a failed `open`, idempotent), and the `connected` getter; `StageRule` and
   `STAGE_TIMEOUT` (`12_056`, twice the contended 3528 ms lifecycle plus 5000 ms, the
   `ORACLE_TIMEOUT` rule) sit beside it; `compileProfile(path)` reads the file and runs
   `postcss([tailwindcss()]).process(text, { from: path })`. The cases run a real launch: `read`
   returns the loaded `7px` and a default snapshot with no custom property; `properties` returns the
   longhands for `border: 0 solid` without `border`, reaches a rule nested in `@layer` and `@media`,
   and leaves the page's `hr` reading unchanged; `clear` empties the container and removes the sheet;
   a failed `open` under a scratch root without a cascade rejects with `ENOENT`, `connected` reads
   `true` and after `destroy` `false`, a second and a never-opened `destroy` are no-ops;
   `compileProfile` compiles a two-line recipe from a scratch path and refuses an unresolvable import
   (the test-side mutation `rejects.toThrow` → `resolves.toContain` reddens it, `1 failed | 5 passed
   (6)`; `tests/setupService.test.ts` reads SHA-256 `e2468fa3…837bb` after the revert). Rule whether
   the stage holds one browser per proof file (no per-case launch) and polls nothing.
5. **`tests/setupStyles.ts`.** `NEUTRAL_MARKUP` is exported with TSDoc in the case-table section
   after `TABLE_MARKUP`, inventoried and proved (each preflight tag once, inside the relative its
   content model mandates), and `tests/tailwind/preflight.test.ts` imports it with its local
   declaration and comment deleted and nothing else changed; `collectFencedBlocks` keeps its
   contract, its body is `extractFences(createMarkdown(source).document)` filtered by language, its
   TSDoc keeps the reason, and the fence case gains a fence nested in a list item.
6. **`package.json`.** `"test:service": "vitest run --config vite.config.ts --no-cache
   --reporter=dot --project service"` sits beside the other `test:*` scripts and `prepublishOnly`
   ends `… && npm run test:distribution -- --mode release && npm run test:service`;
   `test:src:tailwind` and its `test:src` clause are kept for F8c-B.
7. **The law holds.** Across the diff: no `any`, `as`, `!`, or suppression comment; no nested
   function beyond a callback passed or returned directly; interface members readonly; entity
   members one word; module helpers `{verb}{Noun}`; no `@orkestrel/*` primitive duplicated by job
   (rule `collectSharedNames`, `collectImportantNames`, `resolveBrowserExecutable` against
   `@orkestrel/test`, `@orkestrel/reason`, and `@orkestrel/guide` exports); no mock, spy, fake
   clock, or module replacement (the launches and compiles are real); no polling; `tests/setupService.ts`
   imports nothing from the browser environment.
8. **The transitional state is named, not hidden.** `collectInlineSources`, `InlineSource`, and
   `collectSharedNames` are declared in both `tests/setupServer.ts` and `tests/setupBrowser.ts`
   (different signatures for `collectSharedNames`), and readiness and the wrapper
   `configs/src/vite.tailwind.config.ts` both write `tmp/tailwind/candidates.txt` (484 names by the
   reader's grammar, 527 by the wrapper's expression, the wrapper's carrying numeric fragments and
   missing `active`, `show`, `disabled`); the report records each for F8c-B and nothing on the
   worktree flags them (the policy sweep and the `setup` project pass). Rule whether either is a
   defect this unit had to close rather than a carried item.
9. **Scope is honest.** The status lists `package.json`, `tests/setupServer.test.ts`,
   `tests/setupServer.ts`, `tests/setupStyles.test.ts`, `tests/setupStyles.ts`,
   `tests/tailwind/preflight.test.ts`, and the untracked `tests/setupService.ts` and
   `tests/setupService.test.ts`, and nothing else; `vite.config.ts`, `tests/config.test.ts`,
   `tests/policy.test.ts`, `tests/setupPolicy.ts`, `configs/**`, `tests/setupBrowser.ts`, and the
   vendored files are untouched; no `tmp/probe/` file remains; the three SHA-256 readings in the
   report match the tree.
10. **Gates.** `format:check`, `lint:check`, `check` exit 0; `test:policy` `109 passed | 1 skipped`
    (no `## Surface` collision for `SheetReader`); `test:setup` `189 passed`; `test:src:tailwind`
    `17 passed`; `test:config` red on the two cases the unregistered `service` project reddens
    (`registers every workspace project…` with `service has no project factory or configuration`;
    `registers proof scripts in the correct gate` on the `test:service` script) and nothing else.
    UNRESOLVED until the Orchestrator's independent chain after `scaffold repair --groups configs`;
    rule `npm run check` yourself where the sandbox allows it.
