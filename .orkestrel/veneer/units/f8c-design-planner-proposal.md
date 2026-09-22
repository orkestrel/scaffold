I hold the **subjective lane** (`planner` on Opus 5.5): shape, vocabulary, ergonomics, design fit, and the guide's voice. I read the brief at `/home/user/veneer-f8b/tmp/units/f8c-design-brief.md`, `/home/user/scaffold/AGENTS.md`, `/home/user/scaffold/.claude/rules/{tests,workspace,writing,documentation,names}.md`, the subject tree, the F8 verdict, and both F8b audit verdicts. I ran nothing and edited nothing.

# F8c — the Tailwind proofs move into the `service` project

The move is not a relocation. Driving the compiler from Node removes three of the seams the F8b audit found, because each one existed only to fake, inside a browser, a reading Node can take directly. That is the argument for the shape below, and it is why I rule for a wider rewrite than a file move.

## Rulings

### 1. Readers — one entity for compiled text in Node, and the browser keeps only what a browser can answer

**The reading splits by what the subject is, not by where the proof runs.** A structural reading asks what a stylesheet *declares*; that is a property of bytes, and `postcss` answers it in Node. A computed reading asks what a page *resolves*; only a browser answers it, and the answer crosses back as plain data.

**The structural family becomes one entity, not eight twin functions.** `/home/user/scaffold/.claude/rules/names.md:106` states the rule directly: "When a helper family grows around one shape, promote it to a class with entity-scoped one-word methods." The family here grows around one shape — a stylesheet's text — so it promotes. Eight Node functions named identically to eight surviving browser functions would be the near-duplicate defect `/home/user/scaffold/.claude/rules/tests.md:184` names, and a reader crossing modules would meet two `collectLayerOrder` declarations with different parameter types.

The entity is `SheetReader`, declared in `/home/user/veneer-f8b/tests/setupServer.ts`, constructed from CSS text, deriving each reading lazily from one parse. The form matches `SpecifierReader`, which already sits in that module (around line 730), and the module already imports `postcss`'s `parse` and `AtRule` (line 23). Every member is one noun:

| Member | Holds |
| --- | --- |
| `order` | Each layer name at its first declaration, statement or block, in order |
| `statement` | The names the sheet's opening `@layer` statement lists, or `undefined` when it opens with another node |
| `layers` | Each opened block in order, as `SheetLayer` values |
| `names` | Each class name the sheet declares a rule for, escapes resolved |
| `selectors` | Each style rule's selector text, in declaration order |
| `properties` | Each custom property the sheet declares, wherever it declares it |

`SheetLayer` carries `name`, `selectors`, and `declarations`; `SheetDeclaration` carries `selector`, `property`, `value`, and `important`. Flattening a block to its declarations is what collapses the readings a proof needs into filters: the `theme` variables are the declarations whose property starts with `--`, the `.px-8` rule is the declarations whose selector is `.px-8`, and the reset's property set is the distinct non-custom properties. `statement` returning `undefined` rather than throwing follows the absence law in `AGENTS.md`; the proof wraps it in `requireValue` with its own sentence, which reads better at the call site than a reader's generic refusal.

**Three module helpers stay functions**, because each takes two subjects or produces a derivation the entity has no business owning:

- `collectSharedNames(names, others)` — the intersection, over name lists rather than sheets, so it is provable with two literal arrays.
- `collectImportantNames(reader)` — the class names a sheet declares with an important declaration. This is F8b finding F2's carrier: the derivation is written twice inline in `tests/tailwind/shared.test.ts` (the `importantRules` blocks in the derived-shared-names case and in the important-declaration case), and both copies end by loading a synthetic stylesheet into the live document to parse names back out of `cssText`. In Node it is a filter over `declarations`, and referral R2 — a parsing device writing into the document under measurement — has no subject left.
- `collectInlineSources(source)` — **moves** from `tests/setupBrowser.ts` to `tests/setupServer.ts` unchanged. It always read recipe bytes and never touched the DOM; its home was wrong before the move and is right after it.

**The candidate derivation and the class-name grammar become one declaration.** `/home/user/veneer-f8b/configs/src/vite.tailwind.config.ts:10` (`CASCADE_CLASS`) and the inline pattern inside `collectClassNames` in `/home/user/veneer-f8b/tests/setupBrowser.ts` carry the same regular expression, and `collectClassNames`'s own TSDoc states the reason: "One grammar on both sides is what makes the comparison a comparison." With the wrapper deleted, `SheetReader.names` over the built cascade *is* the candidate list, so the two copies collapse to one and the sentence stops being a promise the code keeps by hand.

**Computed readings cross back as data.** No Node twin of `readComputedSnapshot` exists. `stage.read` (ruling 3) runs the enumeration inside one `page.evaluate` callback — an anonymous callback passed directly as an argument, which `AGENTS.md` permits — and returns the pairs; the method builds the `ReadonlyMap` in Node. Node does every comparison.

**These `tests/setupBrowser.ts` exports lose their last consumer and go**, with their cases in `tests/setupBrowser.test.ts`: `loadSheet`, `readLayerStatement`, `collectFilledLayers`, `collectSelectors`, `collectClassNames`, `collectSharedNames`, `collectDeclaredProperties`, `readComputedSnapshot`. Each answered a question about a compiled Tailwind sheet, and no proof loads one into a browser after the move. I confirmed by grep that no file under `/home/user/veneer-f8b/tests/src/` imports any of them.

**These stay, because a browser proof still reads them**: `readCascadeSheet` (its signature reading, per the brief, read by `tests/src/styles/index.test.ts` in the layer-order, sheet-identity, and Tailwind-free cases), `collectLayer`, `collectLayerRules`, `collectLayerOrder`, `collectSheetRules`, `collectNestedRules`, `collectCustomProperties` (read by the namespace cases in `tests/src/styles/index.test.ts`), `collectScopeProperties`, `collectMediaConditions`, `scanPositionalPairs`, `SceneManager`, `scene`, and `PROBE_CASCADE`. `SceneManager.load` stays; only the `loadSheet` crossing goes, and `tests/src/styles/index.test.ts` already reaches the sheet through `scene.load(...).sheet` in its planted-rule cases without it.

`readCascadeSheet`'s TSDoc names `tests/tailwind/profiles.test.ts` as the proof that reads Veneer's sheet beside a Tailwind one. That claim survives the move only as the standalone case; the TSDoc is rewritten to name `tests/src/styles/index.test.ts` and `tests/setupBrowser.test.ts`, which is where the plant actually lives.

**`tests/setupStyles.ts` gains the case table and loses a duplicated walk.** `NEUTRAL_MARKUP` moves there, into the section that opens "The frozen case tables and markup strings the style proofs drive their scenarios from", beside `TABLE_MARKUP` and `ICON_LINK_MARKUP` (F8b F1, and the analyst's `FIXTURE-PLACEMENT`). `collectFencedBlocks` keeps its name and narrower contract and its body becomes `extractFences` from `@orkestrel/guide` filtered by language (F8b F3); the module already imports that entry, and `AGENTS.md`'s non-negotiable on inspecting installed `@orkestrel/*` capabilities binds. `collectTypeSelectors`, `readPreflightDepartures`, and `ELEMENT_TAGS` stay put and are imported by the service proofs unchanged — the module is host-independent, and `tests/conformance.test.ts` already imports `ELEMENT_TAGS` from it in a Node project.

### 2. Readiness — four cheap gates, a pure verdict leaf, and no browser launch

`tests/setupService.ts` verifies, in this order, and throws the first refusal:

1. **The compiler.** `postcss([tailwindcss()])` compiles a minimal two-line input. This proves the plugin is installed and functioning without compiling a profile.
2. **The built cascade.** `dist/src/styles/index.css` is present and non-empty. The refusal names `npm run build:src:styles`.
3. **The pinned browser.** `resolveBrowser(resolvePinnedBrowser(), process.platform, process.env)` resolves, and the executable it names exists on disk. The refusal names the install command. Readiness **resolves and does not launch**: a launch is the driver's lifecycle (ruling 3), and putting one in readiness would drag a browser start into every service file's setup for a fact a path check already settles.
4. **The candidate list.** `SheetReader(cascade).names` is written to `tmp/tailwind/candidates.txt`, the path `tests/setup.css`'s `@source` names. The derivation runs **in the setup module**, not in a proof's `beforeAll`: `tests/setup.css` names the file, the compiler reads it while resolving the profile, and a derivation sitting in one proof's hook would leave the other two proofs depending on a file a sibling wrote. Readiness is idempotent, so the per-file repeat costs one regex scan.

**The shape is a pure verdict leaf plus one imperative shell.** `scanReadiness(readiness: Readiness): string | undefined` takes the gathered facts and returns the refusal sentence or `undefined`; `Readiness` holds `compiler`, `cascade`, and `browser`, each carrying its evidence or `undefined` for absence. `verifyReadiness(): Promise<void>` gathers, calls the leaf, throws the sentence, and writes the list. This is `AGENTS.md`'s functional core with an imperative shell, and it is what gives `tests/setupService.test.ts` a subject: every refusal sentence and the gate order are driven with literal `Readiness` values, hermetically, with no service present.

**The module body is one statement: `await verifyReadiness()`.** Top-level, loud, never skipped, as `/home/user/scaffold/.claude/rules/tests.md` § Live-service tests requires. The cost this imposes is real and I name it rather than hide it: `tests/setupService.test.ts` matches `tests/setup*.test.ts`, so the `setup` project collects it (`/home/user/veneer-f8b/vite.config.ts`, the `setup` factory's `include: ['tests/setup*.test.ts']` with `exclude: ['tests/setupBrowser.test.ts']`), and importing the module runs readiness inside `npm test`. That is affordable **only** because the gates are cheap and because the `setup` project already depends on the built cascade — `tests/setupServer.test.ts` calls `readBuiltCascade()` on its default path today, in the case asserting `--vn-color-primary-base`. The added cost is one minimal compile and two `existsSync` calls. Had I put the launch or a profile compile in readiness, this design would be wrong. Item 1 in the § Unsettled section carries the measurement that confirms it.

### 3. Scene — one browser per file, a scratch page linking the real cascade, and `scene`'s vocabulary

**One browser per proof file.** `beforeAll` opens, `afterAll` destroys. The `service` project runs `fileParallelism: false` with 120-second timeouts, and `recordButtonOracle` sets the precedent of one launch per recording. A launch per case would multiply a fixed cost by dozens of cases for no reading it changes.

**A scratch HTML file, not `setContent`.** The stage writes the built cascade into a `createScratch()` directory and navigates to a page that `<link>`s it, the way `recordButtonOracle` links `bootstrap.css` in `/home/user/veneer-f8b/tests/setupServer.ts`. The cascade then arrives as a real stylesheet in document order, which is precisely what ruling 7's claim is about: the cascade's own order line must be the document's first layer statement, and a profile arriving later re-declares names already placed. An `addStyleTag` injection would arrive the same way but would assert it about a construction the test performed rather than about a document a consumer meets. The scratch is destroyed in `finally`, following the oracle.

**A profile arrives per case through `stage.load`**, which appends a `<style>` carrying the compiled text — the same contract `SceneManager.load` has, so one term covers both modules. `stage.clear()` removes what the case mounted and loaded, and each proof file registers `afterEach(() => stage.clear())`, unchanged in shape from today's `afterEach(() => scene.clear())`.

**Compilation happens once per file.** Each proof compiles its profiles in `beforeAll` and holds the text; the compile is the expensive step, and nothing about it varies per case.

**`prefers-reduced-motion` and viewport are irrelevant here, and the stage emulates neither.** Every reading is a before-and-after difference taken on one element in one document, so a viewport-conditional value such as `.container`'s `max-width` cancels from the comparison. The stage needs the viewport *stable*, not *chosen*, and Playwright's default is stable. The oracle emulates reduced motion because Bootstrap's transitions are motion-conditional; no claim in these proofs is.

**The driver is an exported class with one-word methods**, matching `SceneManager`/`scene`:

```
class StageManager, exported as `const stage`, in tests/setupService.ts
  open()                          launch, write the scratch page, navigate
  mount(markup)                   replace the fixture container's content
  load(css)                       append a recorded <style> to the head
  read(selector, properties?)     every matching element's computed snapshot, in document order
  clear()                         empty the container and remove every loaded sheet
  destroy()                       close the browser and destroy the scratch
```

`read` returns an array of snapshots rather than one, because most cases read every element carrying a name; a single-element case takes the first with its own `requireValue` sentence. It queries the document rather than the mounted container, because the preflight proof reads `html`. `destroy` takes its word from the installed `ScratchInterface`, so the lifecycle reads the same across the two owned resources.

The driver lives in `tests/setupService.ts` rather than `tests/setupServer.ts`. The live services this project drives are the compiler and the browser, readiness is their gate, and putting the driver beside its gate is what makes that module more than a stub. `tests/setupServer.ts` keeps what every Node proof reads.

`compileProfile(path): Promise<string>` also lives there: it reads the file and runs `postcss([tailwindcss()]).process(text, { from: path })`, so each profile's relative `@source` resolves from its own directory exactly as the F8c probe measured. The `compile*` prefix is this workspace's established vocabulary (`compileExpandedCascade`, `compileBreakpointRamp`).

### 4. Files and names — `tests/service/tailwind/`, fixtures unmoved, and `readFileSync` everywhere

- **`tests/service/tailwind/{profiles,consumer,preflight}.test.ts`.** The subdirectory names the service the project drives, which keeps the guide's § Files row one line and leaves room for a second service without a rename. The `service` include is `tests/service/**/*.test.ts`, so the depth costs nothing.
- **`shared.test.ts` becomes `consumer.test.ts`** (F8b F5). Its `describe` label, its fixtures, and every guide reference already say "consumer"; only the F8 unit row said "shared". The move is the one moment this rename is free.
- **The fixtures stay at `tests/fixtures/tailwind/`.** They are inputs, not proofs, and the convention is established. `tests/setup.css` stays at its conventional path as the `tailwind` profile's source — the workspace row describes that file, and moving it would trade a recorded departure for an unrecorded one.
- **`?inline` and `?raw` become `readFileSync`**, anchored to `WORKSPACE_ROOT` from `tests/setupServer.ts`. `?inline` must go: it depended on `css.postcss` in a deleted wrapper. `?raw` must go with it, because a Node proof reaching a fixture through a bundler transform is exactly the indirection this move removes. `guides/veneer.md?raw` becomes `readFileSync(resolve(WORKSPACE_ROOT, VENEER_GUIDE_PATH))`, reusing the constant `tests/setupStyles.ts` already declares.

### 5. Scripts and configuration

- `"test:service": "vitest run --config vite.config.ts --no-cache --reporter=dot --project service"`, exactly as `scaffold audit` demands. It does **not** build the cascade; readiness refuses and names `npm run build:src:styles`, which is what "throw loudly, never skip" means here.
- `prepublishOnly` gains `&& npm run test:service` after `npm run test:distribution -- --mode release`. It sits after `npm run build`, so the cascade exists.
- `test:src:tailwind` is deleted, and `test:src` loses its trailing `&& npm run test:src:tailwind`.
- `configs/src/vite.tailwind.config.ts` is deleted whole: the candidates plugin folds into readiness, the `css.postcss` block into `compileProfile`, the project registration into the generated `service` project, and **the alias dies on the probe** — `/home/user/veneer-f8b/tmp/units/f8c-probe-import.log.txt:1` shows `consumer.css` compiling verbatim in Node with `vn-signature=true btn=true px-8=true` and `warnings=0`, so `@import '@orkestrel/veneer/styles'` resolves through the manifest's `exports` self-reference with nothing standing in.
- The root `vite.config.ts` is regenerated by `scaffold repair --groups configs` after `tests/setupService.ts` exists and the scripts are declared. It is scaffold-owned and never hand-edited.
- **Also touched by the move:** the vendored `tests/config.test.ts` and `tests/policy.test.ts` now see a `service` project and a changed script set. Both are restored by `repair` and must not be edited; `npm run test:config` and `npm run test:policy` are acceptance criteria after the regeneration, not files a unit owns. `guides/README.md`'s tests column names the proof paths and needs the new ones.

### 6. The guide and the record

Rewritten as § "Guide sentences to change" later in this proposal. Two F8b rulings fold into that text:

- **The bundler sentence** (`guides/veneer.md`, the import-placement paragraph before the first recipe fence) is narrowed, which both lanes asked for and the analyst recorded as BROKEN. The CSS statement rule is true and stays; the clause "a bundler that inlines `@import` rules drops one written after a `@source` rule" is a behavioural claim about unnamed tools that the campaign measured in one implementation and measured a counter-example for. Name Vite's bundled `postcss-import` as the inliner the workspace proved it on, and say the recipe is written import-first so the rule holds whichever tool inlines it.
- **F8b F4 dissolves rather than lands.** The finding was that the guide describes the wrapper and omits the alias that makes the recipe resolve. There is no alias and no wrapper after this change, so the honest sentence is stronger than the one F4 asked for: the workspace compiles the recipe with the installed plugin, from the fixture's own path, and the specifier resolves through the manifest the way a consumer's install resolves it — nothing is substituted.

The 199-row preflight departure table stays where it is, for the reason the reviewer's ruling gives: a consumer meets the `preflight` profile in the guide and nowhere else, and the table is gated in both directions.

### 7. Units — two, serial, with the regeneration at the seam

One unit cannot span the regeneration, because the `service` project does not exist until `scaffold repair --groups configs` runs, and that run is the Orchestrator's tracked command. Splitting by file rather than by seam would leave a broken intermediate in a single checkout, which the one-writer rule makes worse rather than better. So the split is at the regeneration, and the earlier unit is additive.

**F8c-A READERS** — role `opus`, engine Opus 5.5.

Owns `tests/setupService.ts`, `tests/setupService.test.ts`, `tests/setupServer.ts`, `tests/setupServer.test.ts`, `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, and `package.json` scripts. Adds `SheetReader` and its helpers, moves `collectInlineSources` in, adds `collectImportantNames`, moves `NEUTRAL_MARKUP`, reroutes `collectFencedBlocks` through `extractFences`, writes the readiness module and the stage, declares `test:service`, and extends `prepublishOnly`. Deletes nothing the existing proofs consume, so `npm run test:src:tailwind` stays green throughout.

Acceptance criteria, cheap first: `npm run lint:check` and `npm run format:check` clean over the owned files; `npm run check` green; `npm run test:setup` green and reporting the new `tests/setupService.test.ts` cases; `npm run test:src:tailwind` still green; every new export carries a case and appears in its module's inventory case.

Routes to Opus rather than Astra despite being the objective half of the work, and the reason is mechanical: the unit must run `npm run test:setup`, and a bench exec's grandchild is denied, so a Vitest run under `npm` under `codex exec` cannot report. Record that as the routing deviation with its cause.

**Orchestrator, between the units:** `scaffold repair --groups configs`, then `npm run test:config` and `npm run test:policy`, with the diff to `vite.config.ts` retained.

**F8c-B MOVE** — role `opus`, engine Opus 5.5.

Owns `tests/service/tailwind/{profiles,consumer,preflight}.test.ts` (created), `tests/tailwind/**` (deleted), `configs/src/vite.tailwind.config.ts` (deleted), `tests/setupBrowser.ts`, `tests/setupBrowser.test.ts`, `tests/setup.css` (its comment), `package.json` (removing `test:src:tailwind` and its `test:src` clause), `guides/veneer.md`, `guides/README.md`, and `ROADMAP.md`. Off-limits: `src/**`, `vite.config.ts`, and every path `scaffold repair` restores — `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `configs/helpers.ts`, `configs/policy.ts`, `configs/browsers.ts`.

Acceptance criteria, cheap first: `npm run format:check` and `npm run lint:check` clean; `npm run check` green; `npm run test:guides` green; `npm run test:policy` green; `npm run build:src:styles && npm run test:service` green; `npm run test:src:styles` green with the standalone case intact; `npm test` reports no project collecting `tests/tailwind/**`.

**Mutations each proof must be shown to redden** — the unit records the exact command and its failing count before and after:

| Proof | Mutation | What reddens |
| --- | --- | --- |
| `profiles` | Relabel the compiled `theme` block to `reset` | The scoped layer reading empties while the whole-sheet property reading still finds each variable |
| `profiles` | Delete `tailwindcss/utilities.css` from `tests/setup.css` | The declared-imports equality |
| `profiles` | Edit one name in a guide fence's exclusion line | The copy-equality across the fence, the fixtures, and the profile |
| `consumer` | Drop the exclusion line from `consumer.css` | The shared-name snapshot comparison, reporting `grid-column-start: auto became 1` |
| `consumer` | Delete the cascade `@import` from the guide fence | The recipe line equality |
| `consumer` | Remove `px-8` from `markup.html` | The generated-rule requirement, and the override reading |
| `preflight` | Strike one row from the guide's table | The measured-against-recorded `toEqual` |
| `preflight` | Add a fabricated row to that table | The same `toEqual` |
| `preflight` | Move a property Veneer's `elements` layer declares | The per-tag kept assertion |
| `setupService` | Reorder the readiness gates | The first-refusal case |
| `setupService` | Change one refusal sentence | The case naming that sentence |

B also strikes the two assertions that cannot fail and their comment (the trailing `not.toEqual` pair at the end of the preflight comparison case, F8b F6 and referral R1) and retitles that case so `it` names the profile rather than the elements layer. The floors and the recorded red runs are the controls; an assertion that cannot fail is not one, and the comment claiming otherwise is the part a reader cannot check.

### 8. Exit criterion

The `standalone` profile is proved Tailwind-free by the browser styles project; the `tailwind`, `preflight`, and consumer recipes compile in Node through the installed PostCSS plugin from their own paths, with no alias and no bundler standing in; every shared class name is important in Veneer or excluded by the recipe, derived per run from the built cascade with a floor; every preflight move is a recorded guide row and every row a measured move; the guide carries the recipes, the rules, the service command, and the narrowed import-placement sentence; `tests/setupService.ts` verifies the compiler, the built cascade, the pinned browser, and the candidate list, throws loudly on each, and is proved by `tests/setupService.test.ts`; `npm run build:src:styles && npm run test:service` is green and `test:service` runs from `prepublishOnly`; no project collects `tests/tailwind/**` and `configs/src/vite.tailwind.config.ts` does not exist; the manifest and the built cascade carry no Tailwind requirement.

## The export set

| Export | Home | Proof |
| --- | --- | --- |
| `SheetReader`, `SheetLayer`, `SheetDeclaration` | `tests/setupServer.ts` | `tests/setupServer.test.ts` — each member over a literal stylesheet, plus the relabelled-`theme` plant that empties the layer reading while the sheet-wide reading holds |
| `collectSharedNames(names, others)` | `tests/setupServer.ts` | `tests/setupServer.test.ts` — two literal lists, including an empty side |
| `collectImportantNames(reader)` | `tests/setupServer.ts` | `tests/setupServer.test.ts` — a sheet mixing important and normal declarations for one name |
| `collectInlineSources`, `InlineSource` | `tests/setupServer.ts` (moved from `tests/setupBrowser.ts`) | `tests/setupServer.test.ts` — its cases move with it, refusal included |
| `Readiness`, `scanReadiness` | `tests/setupService.ts` | `tests/setupService.test.ts` — every absent member's sentence and the gate order |
| `verifyReadiness` | `tests/setupService.ts` | `tests/setupService.test.ts` — the real gates, green, plus the sentence a missing cascade produces |
| `compileProfile` | `tests/setupService.ts` | `tests/setupService.test.ts` — a two-line recipe compiled from a scratch path, and a refusal on an unresolvable import |
| `StageManager`, `stage` | `tests/setupService.ts` | `tests/setupService.test.ts` — scratch containment and `clear` emptying what a case loaded; the driven readings are the service proofs' own |
| `NEUTRAL_MARKUP` | `tests/setupStyles.ts` (moved) | `tests/setupStyles.test.ts` — the inventory case |
| `collectFencedBlocks` (body rerouted) | `tests/setupStyles.ts` | `tests/setupStyles.test.ts` — its existing cases, plus a fence nested in a list |

## Guide sentences to change

- **§ Files.** Drop the `configs/src/vite.tailwind.config.ts` row. Reword the `tests/setup.css` row: the `tailwind` profile the service proofs read as text, and the home of the exclusion line. Repoint the `tests/tailwind/` row to `tests/service/tailwind/` and reword it as the Node proofs of the three pairings. Add a `tests/setupService.ts` row — readiness for the compiler, the cascade, the candidate list, and the pinned browser, and the page driver. Reword the `tests/setupServer.ts` row to add the compiled-sheet readers.
- **The profile table.** Repoint every Proof cell to `../tests/service/tailwind/…`, and rename the consumer link's target to `consumer.test.ts`.
- **Every inline proof link** in § Tailwind: the layer-difference paragraph, the generated-properties paragraph, the executed-recipe paragraph, the exclusion-line paragraph, the shared-set paragraph, and the preflight paragraph.
- **The import-placement sentence.** Keep the CSS statement rule and its reason; replace "a bundler that inlines `@import` rules drops one written after a `@source` rule" with the measured subject — Vite's bundled `postcss-import` drops it — and state that the recipe is written import-first so the rule holds whichever tool inlines it.
- **The executed-recipe paragraph.** Keep the line-equality claim. Replace the resolution sentence: the workspace compiles the recipe with the installed PostCSS plugin in Node, from the fixture's own path, so `@orkestrel/veneer/styles` resolves through the manifest's `exports` entry exactly as a consumer's install resolves it, and no alias, wrapper, or bundler stands in.
- **The wrapper paragraph.** Replace with the service-project paragraph: the profiles are compiled and driven from `tests/service/tailwind/`; `tests/setupService.ts` verifies the compiler, the built cascade, the candidate list derived from that cascade, and the pinned Chromium, and refuses loudly naming the command that closes each; run `npm run test:service` after `npm run build:src:styles`, and `prepublishOnly` runs it.
- **§ Departures from the workspace rows.** Reword the `tests/setup.css` row: no project's setup wires the file; the service proofs read it as text and compile it per case, and the standalone case in `tests/src/styles/index.test.ts` reads that no stylesheet compiled from it reaches the styles document. Keep the bare-import row with its paths updated. Strike `configs/src/vite.tailwind.config.ts` from the hand-authored configuration sentence that closes the section.
- **§ Tests.** The Tailwind proofs compile each profile through the installed PostCSS plugin in Node and drive the pinned Chromium over the built cascade; repoint all three links. Add `tests/setupService.test.ts` beside the `tests/setupServer.test.ts` link.
- **`ROADMAP.md`**, the F8 row: replace the `npm run test:src:tailwind` clause with `npm run test:service`.
- **`guides/README.md`**, the concept index's tests column: the three new paths and `tests/setupService.test.ts`.
- **`tests/setup.css`'s own header comment**: it names "the `src:tailwind` project"; reword to the service proofs, and state that the candidates list is written by readiness.

## What I could not settle, and the probe that would settle each

1. **Whether the top-level `await verifyReadiness()` is affordable inside the `setup` project.** My ruling rests on it, and on `tests/setupServer.test.ts` already requiring the built cascade there. **Probe:** with `dist/src/styles/index.css` present, run `npm run test:setup` and record the wall time against the same command before the change; then delete the built cascade and confirm the refusal names `npm run build:src:styles`. If the added time is material, the fallback is to drop the compiler gate to a resolvability check.
2. **Whether `tests/setup.css` and the two fixtures compile in Node the way `consumer.css` did.** The F8c probe compiled `consumer.css`, whose `@source` names `./markup.html`. The other three name `../tmp/tailwind/candidates.txt` at two different depths. **Probe:** write the candidate list, then compile each of `tests/setup.css`, `tests/fixtures/tailwind/preflight.css`, and `tests/fixtures/tailwind/unexcluded.css` with `from` set to its own path, and assert the instrument emits `.container` while the `tailwind` profile emits nothing.
3. **Whether `npm run build` builds the styles target**, so `prepublishOnly`'s `test:service` finds the cascade. **Probe:** `npm run clean && npm run build && ls dist/src/styles/index.css`.
4. **What `scaffold repair --groups configs` emits**, and whether the vendored `tests/config.test.ts` passes against it. **Probe:** run the repair in a scratch worktree, diff `vite.config.ts`, then run `npm run test:config` and `npm run test:policy`.
5. **Whether `extractFences` returns the same blocks as the local walk for this guide** (F8b R3). **Probe:** a Node script printing both lists for `guides/veneer.md` and diffing them.
6. **Whether the bare name `SheetReader` collides across the fleet.** `/home/user/scaffold/.claude/rules/names.md` § Fleet name ownership grandfathers no root `tests/setup*.ts` export. **Probe:** `npm run test:policy` after the rename, and a grep of the hosted guides' `## Surface` tables for the name.
7. **Whether Playwright's `evaluate` serializer returns a `Map` intact.** My design avoids the question by returning pairs and building the `Map` in Node, so this is a belt check rather than a dependency. **Probe:** a throwaway script returning `new Map([['a','b']])` from `page.evaluate`.
8. **Whether a `## Surface` parity table owes rows for the new setup exports.** **Probe:** `npm run test:guides`.