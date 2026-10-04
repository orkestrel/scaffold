# Unit browse-11-3 — item 11: the capture keeps what a person sees, and nothing they cannot

## Role and engine

`astra` on GPT-6 Astra, reached as `codex exec` with reasoning effort high and `--sandbox danger-full-access`. Sole writer in the worktree `C:\Users\mikes\WebstormProjects\browser-wt-browse`, branch `ccr-d15a48b1-yyyll6` at `70a700e` (clean). Make one commit; never push, publish, or install outside the worktree. Perform the assignment yourself and spawn nothing.

## The design, in order of authority

1. The Orchestrator's rulings in `C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\showcase\browse.md` § Reading design (2026-10-03). They govern where the designs differ.
2. `tmp/codex/browse-11-design.md`: the per-element lowering of the HTML floor's text-bearing elements in the inert capture, the redaction of password and hidden inputs, the person-sees readings and their screenshots, the carrier and separator rules, and its edit map and proofs.
3. `tmp/browse-item-11-design.md` § Corrected design: the inert import, the paired live and copy traversal, the pruning of what is not rendered, the shadow-host rules, and the probes P1 to P3 and bench B0 (already run; their readings stand, recorded in `browse.md` § Item 11 probe readings and stop).

## The rulings in short

- Lower every text-bearing floor element as `browse-11-design.md` rules, in both placements (`compileReadFunction`, `readBrowserCapture`), and keep `script`, `style`, `template`, frames, `object`, `embed`, `applet`, `noscript`, `meta`, `link`, and `base` dropped. The floor in `@orkestrel/html` and `@orkestrel/markdown` is unchanged.
- Keep the region elements (`nav`, `header`, `footer`, `aside`, `menu`) as they are in the capture; do not neutralize them (N3). Do not change the `distill` default in this unit; the reading unit that follows flips it.
- Write each link's live resolved `href` into the capture (N2).
- The cases the design found no reader for (native control captions, localized dates, a number while edited, MathML) are declared limits: leave them out, never substitute a guessed string, state them in the `BrowserReadingInput` remarks and the guide, and pin the current behavior with a test. They do not block acceptance.
- Password values and hidden inputs never appear, in any projection or in `reading.html`, including the data-only fallback for a root with no window.

## Start from

Your two stopped runs' work: `tmp/codex/browse-11-stopped.patch` and `tmp/codex/browse-11-2-partial.patch` (apply what still fits; the review repairs merged at `70a700e` moved some lines), and the probe and design evidence under `tmp/codex/` (`browse-11-floor-*`, `read-rendered-*`). Re-read every `path:line` the designs cite before editing.

## Proofs and gates

Every proof `browse-11-design.md` lists must fail with its lowering or rule removed and pass with it (record each mutation, command, and counts), in both placements, with the person-sees fixture expectations authored independently of the implementation. Run B1 beside B0. Then, each exit code read bare: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:src:core`, `npm run test:src:browser`, `npm run test:src:server`, `npm run test:src:bin`, `npm run test:guides`, `npm run test:policy`, `npm run test:setup`, `npm run test:setup:browser`, then `npm run build` and `npm run test:service`; then `git diff --check`. Update the guide rows and `ROADMAP.md` item 11 as the design names. One commit. The final `git status --porcelain` is empty.

## Output

Write `tmp/codex/browse-11-3-report.md` and return it as your final message: each rule with its red and green evidence, B0 and B1, the declared limits and the tests that pin them, the gate table, the commit hash, and any deviation. No process diary.

## Deviation contract

Stop only if a ruling cannot hold without changing `@orkestrel/html`, `@orkestrel/markdown`, or a public contract the design does not name, and report: expected, found, evidence, and one hypothesis.
