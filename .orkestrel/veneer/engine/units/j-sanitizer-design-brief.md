# J-SANITIZER design round — the tooltip's markup path on a Chromium without `setHTML`

One brief for both lanes of the adversarial pass: `planner` on Opus 5.5 (the subjective lane) and `analyst` on GPT-6 Astra (the objective lane). The lanes run blind to each other. Perform the assignment directly, spawn nothing, and edit nothing: this round proposes and the Orchestrator rules.

## Read first

`C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; the rule files `.claude/rules/names.md`, `typescript.md`, `architecture.md`, `patterns.md`, `tests.md`, and `portability.md` in that repository; the design verdict `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/j-engine-design-verdict.md` (R10 as amended, R15) and `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md` E11.

## The defect

The styles session runs the Veneer gates on Chromium 141, and this session runs them on Chromium 153. Both hosts are gate hosts. On Chromium 141, Veneer `main` reads 56 failures in `src:browser`: `tests/src/browser/Tooltip.test.ts` 48, `tests/src/browser/sanitizers/NativeSanitizer.test.ts` 6, `tests/src/browser/validators.test.ts` 1, `tests/src/browser/Placement.test.ts` 1. The native sanitizer throws `AppError` `SANITIZER_UNSUPPORTED` ("The element has no setHTML method"), because Chromium 141 has no `Element.setHTML`. Source of the report: `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/plan.md` § Intersession state, the paragraph "**In flight (this session), 2026-09-24 18:50 UTC.**".

Every tooltip show writes its template through the sanitizer (`buildTip(this.#template, this.#sanitizer)` in `src/browser/Tooltip.ts`'s `#build`; `buildTip` in `src/browser/helpers.ts`), and the default sanitizer is `new NativeSanitizer()` (the `#sanitizer` assignment in the `Tooltip` constructor). So on a platform without `setHTML` every show throws, including a text-only tooltip. E11 sets the platform floor at the Chromium family, and Chromium 141 is in that family.

## The terrain (Veneer `main` `3203369`, `C:/Users/mikes/WebstormProjects/veneer`)

- `src/browser/sanitizers/NativeSanitizer.ts`: the one class in the `sanitizers` family folder; it holds a `SanitizerConfig` and calls `element.setHTML(html, { sanitizer })`, throwing `SANITIZER_UNSUPPORTED` when `isSanitizeTarget(element)` fails.
- `src/browser/types.ts`: `SanitizerInterface` (`write(element, html): void`), `NativeSanitizerOptions`, `SanitizerConfig`, `SanitizerElementNamespaceWithAttributes`, `SanitizeTarget`, `SetHTMLOptions` (around lines 600 to 720), and `TooltipOptions.sanitizer` (around line 1636: "Default: the platform's `setHTML` over Bootstrap's allowlist").
- `src/browser/constants.ts`: `SANITIZER_ALLOWLIST`, the `SanitizerConfig` built from Bootstrap's `DefaultAllowlist`.
- `src/browser/helpers.ts`: `buildTip`, `fillSlot`, `writeContent` (the content writes; `html: false` writes `textContent`).
- `src/browser/validators.ts`: `isSanitizeTarget`.
- The tests: `tests/src/browser/sanitizers/NativeSanitizer.test.ts`, `tests/src/browser/Tooltip.test.ts`, the `isSanitizeTarget` block in `tests/src/browser/validators.test.ts`.
- Bootstrap 5.3.8's `node_modules/bootstrap/js/src/util/sanitizer.js` (the allowlist walk over a `DOMParser` document, the safe URL pattern) and `util/template-factory.js`.
- The terrain record `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-engine-terrain-record.md` carries the Chromium 153 readings (`setHTML`, `Sanitizer`, `sanitizer.default`).
- The Popover unit is in flight and owns `src/browser/Tooltip.ts` until it lands. A change to the default selection there is a one-line hand-off; name it.

## Constraints

- AGENTS.md design laws: one minimal interface and one shared engine, with native backend overrides only for a genuine faster path; no second parser or source-language analyzer duplicating HTML (parse through the platform); mechanism, not product policy; no dependency; greenfield (no shim, no alias).
- R10 as amended struck `buildSanitizer` and `SANITIZE_ALLOWLIST`; `sanitize: false` and `sanitizeFn` have no option. A proposal that reverses part of R10 says so and why.
- `portability.md` and `tests.md` govern a host-varying proof and the form of a conditional skip. AGENTS.md forbids leaving a current-scope requirement as a skipped test.

## The questions

1. Rule the mechanism that makes the tooltip and the popover work on a Chromium without `setHTML`, with every current proof still meaningful on Chromium 153. Name each option you considered, its cost, and your recommendation.
2. For your recommendation: the types (names under `names.md`, their file in `types.ts`), the class and its file, the algorithm (what it parses with, what it walks, which `SanitizerConfig` members it honours and how, what it removes regardless of the configuration — script-bearing elements, event-handler attributes, unsafe URLs — and where that set is declared), and how the default is selected (where, on what capability read, and when).
3. The proofs: which cases run on both hosts, which are host-conditional and in what form, and the one proof that fails if the selection picks the wrong backend on each host. Name the mutation each new proof distinguishes.
4. The other two Chromium 141 reds: `validators.test.ts` (1) and `Placement.test.ts` (1). Read each case and rule whether it is the same defect, a host-varying proof to rewrite, or a separate engine defect; give the case titles.
5. The unit or units: owned files, the hand-off to the Popover unit, and the acceptance criteria.

## Output

A numbered proposal answering each question, with `file:line` evidence for every claim about the code. Mark each claim as read (you opened the source) or inferred. No process diary. End with one line: `PROPOSAL: <one-sentence recommendation>`.
