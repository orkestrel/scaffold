**X-TENETS-STYLES, rendered lens: verdict**

I held the subjective lane as `reviewer` on Opus 5.5. My lens was Tailwind compatibility proved in the browser and interactive states decided by the rendered result. The judges were `/home/user/veneer-probe/ROADMAP.md` § Tenets and exit criteria 5, 7, and 9. I could read but not run anything. Every verdict below is a review of source and of the supplied landing log. I took no browser reading. The dispatch has no defects.

**Per-claim verdicts**

11. **BROKEN.** The `tailwind` profile is proved in the browser. The `preflight` profile is proved in the browser only for bare tags. No browser case reads a Veneer component class under Tailwind's preflight.
   - **The recipe consumers copy is never compiled.** The shipped preflight recipe is `/home/user/veneer-probe/guides/veneer.md:3387-3394`. The profile the tests run is `/home/user/veneer-probe/tests/fixtures/tailwind/preflight.css:3-6`, and it differs from the recipe in three ways:
     - it writes `@import 'tailwindcss' source(none);`;
     - it scans the candidate list with `@source`;
     - it has no `@import '@orkestrel/veneer/styles';` line.
   - **Nothing holds that recipe's lines to anything except its exclusion line.** `consumer.test.ts:63-66` selects only fences containing `tailwindcss/theme.css`. `profiles.test.ts:184-211` compares only the exclusion line.
   - **The mutation no test distinguishes:** delete the order line at `veneer.md:3388`. Every test stays green. A consumer following the recipe then gets Tailwind's own order first (`node_modules/tailwindcss/index.css:1`: `@layer theme, base, components, utilities;`). Veneer's `reset` and `elements` layers land after `utilities`, so bare-tag defaults beat component classes and utilities.
   - **No component class is ever mounted under preflight.** `preflight.test.ts` mounts only `NEUTRAL_MARKUP`, which `setupStyles.test.ts:1449` requires to carry no `class` attribute. `consumer.test.ts` loads only `consumerProfile` and `instrumentProfile`, and neither contains preflight. So "a Veneer component class wins over Tailwind's preflight on every property both write" has no rendered case. By layer order it plausibly holds, but that is a derivation.
   - **No run at the audited commit.** The landing chain `eid-land-3.log.txt` (stage list lines 28-9586) runs no `test:service`, so the supplied evidence contains no run of any `tests/service/tailwind/` proof.
   - **Which proofs discriminate:**
     - The consumer pairing has a working negative control: dropping the exclusion line moves `.col-1` `grid-column-start` from `auto` to `1` (`consumer.test.ts:243-260`).
     - The preflight pairing reddens if `base` moves above `elements` (`preflight.test.ts:239-244`, floor at 271-274).
     - Nothing distinguishes a component class losing to preflight.
   - **Wording slip in the claim:** the standalone profile's browser proof is `tests/src/styles/index.test.ts:33-75`, not a file under `tests/service/tailwind/`. The guide table at `veneer.md:3335` says so. I did not rule on this.
   - **Smallest fix:**
     1. Add `tests/fixtures/tailwind/preflight-consumer.css`, equal to the preflight fence except its `@source` line, the way `consumer.css` mirrors the `tailwind` fence.
     2. Hold it line for line to the fence in `consumer.test.ts`.
     3. Compile it. Render the component classes that share properties with preflight: `.btn`, `.form-control` on an `input`, `.form-select`, `.form-check-input`, `.btn-close`, `.nav-link`, `.page-link`, and `.table`.
     4. Assert that every longhand each component rule declares resolves identically with the cascade alone and with the compiled recipe.
     5. Repeat the shared-name equality under this profile.

12. **BROKEN** at `.form-range`, which is one of the form controls the claim names.
   - **The class defines a press state and a disabled state:**
     - press: `.form-range::-webkit-slider-thumb:active` (`src/styles/components/_form-range.scss:73-79`);
     - disabled: `.form-range:disabled { pointer-events: none }` (`:34-36`) and `.form-range:disabled::-webkit-slider-thumb` (`:93-95`).
   - **No test reads either state.** A case-insensitive search of `tests/src/styles/components/form-range.test.ts` for `active|disabl|hover|press|hold` matches only unrelated comments (lines 118, 257, and 273). That file drives keyboard focus only (`:75-110`, `:145`). The only other disabled range is `tests/app/browser/sections/FormRangeSection.test.ts:13-46`, which reads the accessibility state, not paint.
   - **Mutation no rendered case distinguishes:** change the held thumb's mix at `:74-78` or the disabled thumb fill at `:94`, and record the change as a departure row. Every rendered case stays green. The accounting gate reads the compiled text, not the rendered paint.
   - **Fix:** add cases to `form-range.test.ts`:
     - hold the pointer on the thumb and assert `:active`;
     - read the thumb's paint from a pixel capture of the thumb box, because Chromium withholds the thumb pseudo-element's computed style;
     - render a disabled range and assert host `pointer-events: none`;
     - confirm `elementFromPoint` at the host's centre does not land on it;
     - read the disabled thumb's painted fill against the resolved `--bs-secondary-color`.

**Findings outside the claims**

- **F1: The Tailwind browser proofs sit outside every gate that runs at landing.**
  - Tenets broken: "Remain compatible with Tailwind CSS without requiring it" (prove the supported combinations in the browser), exit criterion 9, and the roadmap's D41 obligation that the Tailwind proofs stay green (`ROADMAP.md:174-175`).
  - Evidence: the `test` script omits `test:service` (`/home/user/veneer-probe/package.json:60`). Only `prepublishOnly` runs it (`:90`). The guide confirms this at `veneer.md:3524-3525`. The landing chain `eid-land-3.log.txt` has no `test:service` stage.
  - Failing state: a landing that breaks the preflight or consumer pairing passes the whole chain.
  - Fix: run `test:service` in the landing chain after `build:src:styles`, or add it to `test`.

- **F2: The Tailwind guide section is garbled mid-sentence at `/home/user/veneer-probe/guides/veneer.md:3480-3496`.**
  - Tenet broken: "Remain compatible with Tailwind CSS without requiring it". This prose is where a consumer learns which shared names stay on the exclusion line.
  - Evidence:
    - line 3481 opens with the fragment "cover it.";
    - line 3487 ends "The proof asserts that" and line 3488 opens "cover it.";
    - lines 3495-3496 repeat "The proof asserts that the `gap-3` name is in the branch and reads what the rule claims:", followed by an unrelated paragraph.
  - Fix: restore the lead sentences of the `bg-*`/`border*`/`rounded` paragraph and of the `text-*` paragraph, and delete the dangling repeat at 3496.

**Attacked and held**

These checks are claim 12's evidence apart from the range, plus claim 11's controls.

- **`.btn` family:**
  - real hover, pointer hold, keyboard `:focus-visible`, the `.active` and `.show` classes, and disabled, each with its resolved fill, label, and ring (`button.test.ts:214-265`, `298-346`);
  - the check-label variants (`396-443`);
  - disabled on four hosts (`445-457`).
- **Nav links:** keyboard ring, a held pointer that shows no ring, hover repaint on links, tabs, and underline links, and disabled paint for both spellings (`nav.test.ts:125-150`, `172-216`, `218-281`).
- **Pagination links:** hover lift and repaint, focus ring, and disabled pointer refusal and paint (`pagination.test.ts:119-181`, `236-260`). Bootstrap 5.3.8 defines no `:active` state for `.page-link`.
- **List-group actions:** hover, focus, and held pointer on both hosts, with the `:not(.active)` guard exercised, plus disabled paint (`list-group.test.ts:128-161`, `181-226`, `228-285`).
- **Dropdown items:** hover, focus, hold, and disabled (`dropdown.test.ts:253-384`).
- **Close button:** hover, focus, and disabled (`close.test.ts:105-169`). Focus is programmatic, but `.btn-close:focus` paints the same whether the keyboard or a script focuses it.
- **Form controls:**
  - `.form-control`: keyboard focus, file-button hover, and disabled paint (`form-control.test.ts:184-296`, `383-415`);
  - `.form-select`: keyboard ring and disabled surface (`form-select.test.ts:118-141`, `314-408`);
  - `.form-check-input`: keyboard ring, hold at `brightness(0.9)`, and disabled (`form-check.test.ts:282-401`).
- **Correct behaviour that looks like a defect:** Tailwind's `[hidden] { display: none !important }` in preflight beats a component class's `display`. Veneer's own `reset`-layer `[hidden]` rule (`src/styles/_reset.scss:7-9`) produces the same result, so this is intended.

VERDICT: FAIL 11, 12; outside the claims: F1, F2
