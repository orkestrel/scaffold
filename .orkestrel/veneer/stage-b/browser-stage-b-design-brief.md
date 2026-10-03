# Design pass — browser stage B, the blank-slate boot, and `createVeneer`

## Subject

`@orkestrel/veneer`'s browser engine at veneer `main` `dc4654b` (checkout `C:\Users\mikes\WebstormProjects\veneer`). Stage A closed on 2026-10-03 at `959ed49`. The standing contract is `C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\browser-convention-verdict.md` (rulings 1 to 17; rulings 2 and 3 carry the 2026-10-02 dispatch amendment). The chunk's design verdict is `C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\browser-design-verdict.md`: read ruling 1 (the two stages), rulings 7 to 9 and 11, and § Open questions for the user with the user's answers of 2026-10-03 under it. The stage B measurements are `tmp/units/browser-feasibility-report.md` with `tmp/units/browser-feasibility-measurements.json`, and the two stage A design proposals are `tmp/units/browser-design-planner-proposal.md` and `tmp/units/browser-design-analyst-proposal.md`. The remainder map of the conflict study at the tip is `tmp/units/veneer-remainder-1.md`.

## The user's rulings of 2026-10-03

1. Stage B runs now, inside the browser chunk, before the Veneer styles chunk opens.
2. The engine starts as a blank slate. In the user's words: not too opinionated at the onset; a blank slate while providing all the pieces to use as seen fit, and providing the defaults as convenience but separate to not force anything. Starting tooltips and popovers at boot leaves the default boot and becomes a separate opt-in piece. Ruling 9 of the design verdict is withdrawn.
3. The boot scope is renamed: `createEngine` becomes `createVeneer`.

## What this pass decides

One shape per question, with the public contract written as it would land in `src/browser/types.ts` (TSDoc included), the error codes it adds or renames, the files it touches, the departure rows it adds, moves, or removes, and the proofs that would show it. Each answer rules on every option it lists. The Orchestrator rules after reading every lane; writers implement the ruling.

## Law

`AGENTS.md` at the checkout root, and the rules under `C:\Users\mikes\WebstormProjects\scaffold\.claude\rules\` (`names.md`, `typescript.md`, `architecture.md`, `patterns.md`, `tests.md`, `browser.md`). Single-word members, `#` privacy, readonly interface properties, `undefined` for absence, no `as`, no `!`, no `any`, kind files, plugin factories in `plugins.ts` as `create{Entity}Plugin` and `create{Name}Plugins`, minimal public API, no superfluous wrapper, no compatibility shim (every consumer migrates in the same change), no polling. Errors are `VeneerError` with a code declared in `src/core/types.ts`. Bootstrap parity wins wherever the oracle defines behavior; a deliberate difference is a departure row in `guides/veneer.md` § Browser entry, read in both directions by its family proof.

## The questions

### D1 — the blank-slate boot scope

Today `createEngine(root?, options?)` routes `options.plugins`, which defaults to `createBootstrapPlugins()` (`src/browser/factories.ts`, `src/browser/types.ts` `EngineOptions`), and the tooltip and popover plugins carry `boot` entries that construct every `[data-bs-toggle="tooltip"]` and `[data-bs-toggle="popover"]` at boot (`src/browser/plugins.ts`), a departure from Bootstrap, which leaves tips to page script. Decide:

- What a call with no plugins routes, and where the Bootstrap convenience lives, under the user's ruling. Rule on at least: no default (the consumer passes `createBootstrapPlugins()`), a default that keeps the twelve Bootstrap plugins without tip boot, and any other shape you find.
- Where tip start-at-boot goes as a separate opt-in piece. Rule on at least: an option on `createTooltipPlugin` and `createPopoverPlugin`, separate plugin factories, a separate collection factory, and a function over a live scope. Keep the plugin factory laws (a factory builds a value and registers nothing).
- Every other place where the engine forces a behavior Bootstrap's contract does not define (audit `src/browser`: boot entries, default options, additions such as `toggle.vn.button`, shared-host tips). For each, rule keep, separate, or drop, with the reason.
- The departure rows this removes (the tip boot rows) and the proofs that move.

### D2 — `createVeneer`

Rename the boot scope under `names.md` (fleet name ownership, single-word members, no compound names) and `architecture.md`. Decide the class name, the interface name, the options type, the interaction type (`EngineInteraction`), the error codes (`ENGINE_ROOT`, `ENGINE_DESTROYED`, `ENGINE_DESTROY`), the implementation and test file names (the mirror rule), and the guide's headings and prose. Check every new name against `VeneerError` in `src/core` and against the fleet's hosted guides (`C:\Users\mikes\WebstormProjects\scaffold\guides\*.md`, the `## Surface` tables). List every consumer the rename migrates, including the showcase lane's `app/browser` and `tests/app/browser` call sites and both sections of `tests/setupBrowser.ts`, and the statechart or journey rows it can move.

### D3 — stage B's native pieces

The design verdict's ruling 1 names four: `<dialog class="modal">` (the measured neutralisation recipe of `dialog-modal`, `closedby="none"` with Bootstrap's keydown path, the `div` backdrop kept, the Tab limit named), the `scrollbar-gutter: stable` scroll lock, `interpolate-size` vertical collapse, and `popover="manual"` floating parts. For each, under ruling 2 of 2026-10-03, decide:

- How an author or a consumer opts in (markup, a plugin option, a separate plugin factory, a separate collection), and what the default does.
- The mechanics against the tip's code: `Modal` and `Backdrop`, `Trap` (the feasibility report's `focus-inert` reading: `inert` alone does not replace focus wrapping), `Lock` and `Hold`, `Collapse`'s measured-pixel writes, `Placement` and the top-layer order the `top-layer` reading measured against Bootstrap's z-index scale.
- Where any CSS the piece needs lives (the dialog neutralisation rules, the arrow rules of `tooltip-arrows`): the engine's constructed stylesheet, the Bootstrap face's sheet in `src/bootstrap`, or the consumer's sheet, with the cascade contract of `ROADMAP.md` § Cascade contract.
- The departure rows each piece adds and the oracle case that consumes each, the measurement that must be re-run at the tip before a writer relies on it, and what each piece must not break among the stage A rows and proofs.
- Whether any of the four should not ship, with the evidence.

### D4 — the remainder map's partial items

`tmp/units/veneer-remainder-1.md` leaves R13 (each tip and dropdown binds its own touch `mouseover` listeners on the body's children where Bootstrap's `EventHandler` dedupes one shared noop), M1 (no proof adds and removes a page `aria-describedby` token between a tip's show and hide), and M4 (an inline `anchor-name` hiding a stylesheet `anchor-name` has no departure row; the proof model excludes the engine's own anchor properties from the transcript). R7 is a record fix already made. Decide each: the change, the proof, or the reason it closes as moot.

### D5 — units

Split the implementation into units with exclusive file ownership so that independent units run in parallel worktrees, name the order where ownership overlaps (the rename touches about 40 files), and say which units are objective (GPT-6 Astra) and which subjective (Claude Opus 5.5). Include the guide work and the lanes-log entries the showcase session needs before a landing (`C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\lanes.md` § Rules: predicted statechart rows by table and row).

## Evidence and probes

Read the code at the tip whole where a question names it. A lane with a shell may probe: a browser probe `tests/src/browser/design.probe.test.ts` run with `npx vitest run --config vite.config.ts --project src:browser tests/src/browser/design.probe.test.ts`, or a node probe under `tmp/probes/`, deleted before returning, with `git status --porcelain` confirmed unchanged. Pair a probe with a control. A lane without a shell names the measurement it needs instead.

## Output

One section per question, D1 to D5, each with: the shape (types and TSDoc as they would land), the alternatives considered and the ruling on each, the files touched, the departure rows, the proofs, and the risks with what over-correcting would break. Then a short list of what the pass could not decide. No process diary.
