# U1 audit report, objective lane (reviewer, native Opus 5, 2026-09-20, 635 s)

**Lane held: objective** (correctness, constraints, and what the code, the contracts, and the rules permit). Subject: Veneer at `ae0221d`, diff `a5de4c4..ae0221d`, status clean.

## Per-claim verdicts

**1. Styles axis — CONFIRMED.**
`configs/src/vite.styles.config.ts:8` declares the project through `defineConfig` directly; `:5-6` import `outputBoundary` from `../helpers.js` and `resolveBrowser` from `../browsers.js`; `:44` includes `tests/src/styles/**/*.test.ts` alone; `:45` lists `./tests/setup.ts`, `./tests/setupBrowser.ts`, `./tests/setupStyles.ts`; `:32-41` builds the lib with `cssFileName: 'index'` and `:21-30` emits `index.rtl.css`. The artifacts exist on disk: `dist/src/styles/index.css` (content `@layer theme,reset,base,elements,components,utilities;`) and `index.rtl.css`. `src/styles/index.ts:1` is exactly `import './index.scss'`; `src/styles/index.scss:1-2` loads `tokens` and `theme` only; `src/styles/_mixins.scss:1-18` declares mixins and emits nothing.

**2. ColorMode engine — CONFIRMED.**
`src/browser/color-mode/ColorMode.ts` holds imports plus one class with `#` fields and no module-scope declaration. Public members `root`, `mode`, `apply`, `toggle`, `destroy` match `ColorModeInterface` at `src/browser/types.ts:13-24` with nothing extra. `:36-37` removes the attribute for `light`; `:49-51` returns early when `#written` is false; `:23-24` applies a stored scheme only when `isColorScheme` accepts it; `:31-33` derives `mode` from the attribute on each read. Proofs against a real DOM and real `sessionStorage` sit at `tests/src/browser/color-mode/ColorMode.test.ts:11-21` (derived read, untouched attribute), `:23-35` (light removal, persistence), `:37-46` and `:48-56` (restoration), `:58-67` (invalid stored value), `:69-80` (ownership).

**3. Kind placement — CONFIRMED.**
`src/browser/` holds `types.ts`, `constants.ts`, `validators.ts`, `factories.ts`, the barrel, and `color-mode/ColorMode.ts` (class only); `app/browser/` holds `types.ts`, `constants.ts`, `factories.ts`, the barrel, `main.ts`, and `showcases/Showcase.ts` (class only). Sweeps over added lines of the diff for `^\+.* as `, `^\+.*[\w\)\]]![^=]`, `@ts-`, and `eslint-disable` return only the English word "any" in a test title at patch line 1900 and `import * as setup` at patch line 1646.

**4. No listener on import — CONFIRMED.**
`tests/src/browser/index.test.ts:8-15` installs the recorder, `:18` performs the import, `:20` restores in `finally`, `:22-24` asserts no `document` or `window` call, and `:34-56` is the control that imports `./fixtures/constants.js` (a module adding a `document` listener at `tests/src/browser/fixtures/constants.ts:4`) and observes `[[document]]`.

**5. Shell — CONFIRMED.**
`app/browser/showcases/Showcase.ts:26-44` builds the header, the `Dark mode` button with `aria-pressed` at `:32`, and the named region at `:37-43`; `:58-60` toggles through the controller and mirrors into `aria-pressed`; `:51-56` removes the listener, both containers, and destroys the controller; `:1,3` reach the engine through `@src/browser`. No `.vue` file exists under `app/`, and a case-insensitive sweep of `app/` for `vue|bootstrap` returns nothing.

**6. Setup helpers reuse primitives — REFUTED.**
The first conjunct holds: `tests/setupBrowser.ts:10-16` declares the `ProvidedContext` augmentation, and `:23-56` build `mountShowcase` and `applyTheme` from `mount`, `build`, `clickAccessible`, `waitForState`, and `waitForAnimations`. The second conjunct is false. `tests/setupConformance.ts:156-163` re-implements the containment predicate that `@orkestrel/test/server` already exports as `resolveContained(root, target): string | undefined` (`node_modules/@orkestrel/test/dist/src/server/index.d.ts:428-435`). The same file's suite already imports from that entry (`tests/setupConformance.test.ts:6`), so the primitive is installed, declared, and reachable.

**7. Journeys — CONFIRMED.**
`tests/app/browser/integration.test.ts:29` declares the families and `:189-191` asserts the proven set equals them, with `PROVEN.add` at `:65`, `:110`, `:119`, and `:183`. Arrival through `readPerception` at `:67`; the toggle through `aria-pressed`, `data-bs-theme`, and a post-`waitForAnimations` `background-color` difference at `:80-84`; keyboard reach through `traverseAccessible` at `:97`; the refusal voice at `:111-113`; the matrix over `VARIANTS` through `applyTheme` at `:121-123`; the registry `['home', 'home-dark']` at `:31` with always-on filename and placement proofs at `:171-180` and the disk proof under the flag at `:182`. The report records the omitted-act and `Sign in` mutations red and the restore green at `units/u1-author-report.md:240-245`.

**8. Conformance controls — REFUTED as written.**
Every reader and `FORBIDDEN_RUNTIME` carries a rejecting control in `tests/setupConformance.test.ts`: `readForbiddenDependency` at `:64-81`, `readSpecifiers` at `:98-100`, `readForbiddenSource` at `:104-105`, `readEscapingImport` at `:120-125`, `readImportClosure` at `:146-147`, `readFileDigest` at `:160-164`. The digest constants are not proved there at all — `:25-40` asserts only that the names are exported, and their values are compared against installed bytes elsewhere, at `tests/conformance.test.ts:27-36`, with no rejecting control. The rest of the claim holds: `tests/conformance.test.ts:24` (version), `:27-36` (digests), `:40-47` (manifest sections), `:49-69` (sweep over `src`, `app`, `tests`), `:71-85` (closure from the barrels under `src/`), `:87-108` (built `.js` and `.d.ts` specifiers); the report records the plant readings at `units/u1-author-report.md:166-172`. Those plant readings are the writer's own measurements and are not independently established here.

**9. Distribution — CONFIRMED.**
The patch for `tests/distribution.test.ts` adds only; the sole edit to existing code is a destructuring. The added case at `tests/distribution.test.ts:906-931` selects the browsable entry, and `bundleEntry` at `:645-647` resolves the installed `${name}/styles` through the consumer's resolver and writes it beside the page that links it at `:603`; `:699-709` reads `link.sheet` and the `CSSLayerStatementRule` names; `:918-926` asserts the layer order.

**10. Guides — CONFIRMED, less the gate reading.**
`guides/veneer.md:9-18` carries a `Surface` row for every `src/browser` export, each `Summary` equal to its declaration's description paragraph. `:29-35` is the `ColorModeInterface` method group over `apply`, `toggle`, and `destroy`. `:41-48` imports `createColorMode` from `@orkestrel/veneer/browser`. Every `## Tests` link at `:82-86` resolves. `README.md:3` equals `guides/veneer.md:3`. The `test:guides` green rests on the report alone and is carried to claim 13.

**11. Scope honesty — CONFIRMED.**
`package.json` and `package-lock.json` are absent from the changed list, and `package.json` declares no runtime dependency. Every changed path falls in an owned list. The one off-limits path, `tests/setupPolicy.ts`, matches the installed vendored copy byte-for-byte at the changed region, so it is a repair rather than an author edit.

**12. Names — CONFIRMED.**
Sweeps of `node_modules/@orkestrel/scaffold/dist/host/guides` for every declared name return only `createShowcaseApplication` in `guides/supervisor.md:2869`, a different name. Every interface member is one word.

**13. Report honesty — UNDECIDABLE** (settled green by the verifier, `units/u1-gate-report.md`).

## Findings outside the claims

**F1.** `tests/setupConformance.ts:156-163` re-implements `resolveContained`, and `tests/conformance.test.ts:79-82` repeats the predicate inline. Compose the installed primitive in both places.

**F2.** `tests/distribution.test.ts:927` (`expect(reading.layers).not.toStrictEqual(['utilities'])`) is entailed by the equality at `:919-926` and cannot fail. Replace with a control that can.

**F3.** The RTL emission at `configs/src/vite.styles.config.ts:21-30` copies LTR bytes unconditionally and no proof fires when a physical declaration appears. Add a case that fails on a physical inline-axis property while the RTL file is byte-identical.

**F4.** `app/browser/main.ts:4` reaches the cascade through `await import('../../src/styles/index.ts')` to get past the unassigned-import lint rule, which `.oxlintrc.json:43-48` already permits for a stylesheet. Import the stylesheet statically before the shell sheet.

**F5.** `src/browser/color-mode/ColorMode.ts:38` sets `#written` on the removal branch, so `apply('light')` → external `setAttribute('data-bs-theme', 'dark')` → `destroy()` removes an attribute the controller did not write, contradicting `src/browser/types.ts:22` and `guides/veneer.md:35`. Track ownership only when setting, and add the ordering case.

**F6.** `app/browser/showcases/Showcase.ts:37` and `:39` give the same accessible name `Showcase` to the `main` landmark and its child `section`. Drop the label on `main`.

## Observations, carrying no required change

- `guides/README.md` appears as a vendored destination in the scaffold host manifest, yet Veneer's copy diverged from the vendored bytes at `a5de4c4` and the briefs classify it as owned; whether `scaffold repair` restores it is a terrain question for the Orchestrator.
- `tests/setupBrowser.ts:31-37` hand-rolls the idempotent cleanup that `createTeardown` provides; its `destroy` awaits handlers, so the swap would make `cleanup` async. Not required.

Verdict: fix round — claims 6 and 8, carrying findings F1 through F6.
