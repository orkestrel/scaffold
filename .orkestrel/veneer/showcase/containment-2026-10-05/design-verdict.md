# Showcase containment: design verdict (2026-10-05)

Brief: `/home/user/scaffold/tmp/claude/showcase-containment-brief.md`. Lanes: planner (Opus, subjective; `planner-proposal.md`) and analyst (GPT-6 Astra read-only, objective; `analyst-proposal.md`, journal `scaffold/tmp/codex/showcase-containment-analyst-2.jsonl`; a first pass stopped at the deviation gate on the recipe premise, `analyst-1-last.md` in `scaffold/tmp/codex/`). Probes: `respell-1.md`, `runs/containment-spellings-1`, `runs/containment-fractions-1`, `census-1.json`.

## Ruling

Option (a), face-invariant markup, as the planner cut it (spellings S1 to S7 of `scaffold/tmp/codex/containment-markup-brief.md`), with these objective additions from the analyst:

1. The containment proof compares residual findings after narrowly named exemptions, never raw counts: the tooltips placement grid's `g-4` top gutter (7 px, every face), and, only where it survives the markup unit, the typography description lists' right edge at 390 px under `bootstrap` and `unexcluded`. The proof asserts the `bootstrap` residual is empty and each other face's residual equals it.
2. A progress proof reads each bar's width as its announced fraction (`aria-valuenow` over the range) of its track, and each stacked segment's outer `.progress` width as that fraction of `.progress-stacked`, with a restored `w-25` as the control.
3. The inventory counts both class attributes (286 tokens in 264 attributes) and caption text (26 tokens); a caption changes with its specimen's spelling, and the Position utilities captions keep the raw names they measure.
4. The three stacked-progress outer `.progress` widths (`progress.html:191`, `:201`, `:211`) are respelled with the bars.
5. The chrome guard at `tests/app/browser/sections/integration.test.ts:240-242` is kept and extended by the section case that refuses the 16 names outside the Sizing matrix and the Position utilities section.

Rulings on the options: (a) adopted; (b) refused, because the faces render the same markup (`guides/veneer.md:2163-2164`), a runtime spelling swap adds behavior, grows `TAILWIND_CLASSES`, regenerates `app/browser/recipe.json`, adds census escaped-selector exceptions, and changes the journey partition's grouping, all for a defect the markup fixes; (c) the analyst's hybrid is (b) with a raw-reference boundary and carries the same cost; (d) refused by both lanes (fixed Tailwind lengths fit no stage at both widths, and the 390 px overflows are wrappers). The inline `style` width for progress is refused by the page's no-style contract (`guides/veneer.md:2082-2086`); `col-3`, `col-6`, `col-9`, `col-12` give the widths with classes alone, on Bootstrap's placeholder precedent.

The analyst's reading of the architecture rule ("smallest complete implementation") favors (a) once the runtime, record, and proof changes of (c) are counted; the analyst's refusal of clipping as a structural repair stands and is honored: `overflow-hidden` enters only the five demonstrative frames of the Position utilities section, whose captions state the layer reading, which is ruling 14's intent.

## Deferred

- A Tailwind-section percentage reference specimen (`w-50` beside `w-1/2`, and the other fraction spellings) that executes the guide's `w-full` sentence: costs `TAILWIND_CLASSES` growth, a regenerated record, and census exceptions; recorded as a `ROADMAP.md` § Next item, not part of this unit.
- Light color mode containment reading: geometry does not depend on the color mode; the proof reads the dark mode the screenshots used and says so.

## Units and order

1. `containment-markup` (Astra, worktree `/home/user/.wave/veneer-containment` at `737a2f4`): sections, factories, one factories assertion, census reading on the rebuilt page. Starts now.
2. `containment-proofs` (Astra): `tests/setupBrowser.ts` instruments with controls, the census, span, z-index, progress, and section cases; starts after the journey-cost unit lands, because that unit owns `tests/setupBrowser.ts` and `tests/app/browser/integration.test.ts` until then; the markup worktree is rebased onto that landing first.
3. `containment-prose` (Opus): guide § Showcase paragraph and § Specimen geometry subsection, `ROADMAP.md` row and § Next item.
4. Gates and rebuild (verifier): the full gate set, one `test:journey` through the queue, `build:showcase`, the census on the committed page.
5. Landing on veneer main after the journey-cost landing; the scaffold flip verdict amendments (rulings 4, 8, 14, chrome paragraph) applied by the Orchestrator with the planner's text.

## Amendment text for the flip verdict (planner's, adopted)

- Ruling 8: "Chrome: replace `h-100`, card-body `w-100`, `gap-3`, `rounded`, `border` with Bootstrap-only names; a card body whose specimens each fill its width is `card-body vstack` with a `row-gap-*` class, and those specimens carry no width class; accept Tailwind's scale on the remaining chrome spacing (2026-10-05, `showcase-containment`)."
- Ruling 14: "Percentage shared names (`w-25`, `top-50`, `start-100`) read Tailwind's spacing multiples under the layer (R1); the Sizing matrix and the Position utilities section carry them, clip their frames so the reading stays inside the figure, and state it in their captions, and the guide states it. Every other specimen spells a fraction of its container with a grid column class (`col-3`, `col-6`, `col-9`, `col-12`), a `vstack` body, or zero offsets, and holds the same geometry under the three faces (2026-10-05, `showcase-containment`)."
- Chrome paragraph (`:79`): replace "`w-100` inside specimen markup stays and reads Tailwind's value." with "Specimen markup carries none of the 16 percentage names outside the Sizing matrix and the Position utilities section (§ 10 item 14)."
- Ruling 4 (`:120`): append "This governs a consumer's markup; the showcase spells its own markup face-invariantly (§ 10 item 14)."
