# F8 TAILWIND — design verdict

Reconciled 2026-09-22 by the Orchestrator from the blind design round on
`units/f8-design-brief.md`: `planner` on Opus (`units/f8-design-planner-proposal.md`) and `analyst`
on GPT-6 Astra (`units/f8-design-analyst-proposal.md`, thread `01a0ca92-a8b1-7d43-9b1b-e8f5e540bd2e`),
and from the Orchestrator's F8p IMPORT-FORM probe (`units/f8p-probe-readings.md`, instruments
`units/f8p-probe.mjs`, `-2.mjs`, `-3.mjs`), taken with the installed `tailwindcss` 4.3.3 through
`@tailwindcss/postcss` over the built cascade at `04114c5`.

## What the probe settled

- The composable form `@import "tailwindcss/theme.css" layer(theme); @import "tailwindcss/utilities.css" layer(utilities)`
  compiles and emits `theme` and `utilities` layer blocks alone; the bare `@import "tailwindcss"`
  adds the `base` block (preflight). Tailwind's own `@layer theme, base, components, utilities;`
  statement lands after the consumer's order line and re-declares nothing.
- `source(none)` on an import silences automatic source detection; without it the compiler scans the
  stylesheet's directory, which in pass 1 reached the probe script itself.
- A `.css` (or `.scss`) file is ignored as a scan source even when named by an explicit `@source`;
  a text file is scanned, and a gitignored text file is scanned too.
- `@source not inline("container collapse table caption-top caption-bottom col-auto col-{1..12}")`
  removes every named utility from generation; names are space-separated and brace ranges expand.
  `@source inline("gap-0 container px-8")` adds names the same way.
- The built cascade at `04114c5` declares 527 class names; the names Tailwind 4.3.3 also generates are
  `caption-top`, `caption-bottom`, `col-1` through `col-12`, `col-auto`, `container`, and `table`.
  Every one is a normal declaration in Veneer; the important utilities in the measured 209-name
  Bootstrap intersection are not shipped yet. `caption-bottom` is outside the Bootstrap intersection
  (Bootstrap has no such class) and inside the Veneer one, so the derived set is Veneer's, never the
  oracle's.

## Rulings

1. **Profiles.** `standalone` (the product: `@orkestrel/veneer/styles` alone), `tailwind` (the
   recommended pairing: the order line, `theme.css` and `utilities.css` in their layers with
   `source(none)` absent so the consumer's markup is scanned, `@source`, the exclusion line, then the
   cascade), and `preflight` (the same with the bare `@import 'tailwindcss'`). A profile is named for
   what its entry carries. The planner's `utilities` profile name is refused because it collides with
   the layer name, the planner's own recorded tension.
2. **One order line.** Every profile declares `theme, reset, base, elements, components, utilities`,
   the line `_tokens.scss` already declares and `tests/src/styles/index.test.ts` asserts. The
   analyst's reorder (`utilities` before `components`) is refused: ruling 4 makes Bootstrap win every
   shared name without it, and the reorder would stop a Tailwind-only utility (`px-8`, `rounded-xl`)
   from overriding a component declaration, which is what a consumer pairs Tailwind for.
3. **Where the profiles live.** `tests/` only. No published Tailwind entry, no export subpath, no
   dependency, optional, or peer declaration. `tests/setup.css` carries the `tailwind` profile;
   `tests/fixtures/tailwind/preflight.css` the `preflight` profile;
   `tests/fixtures/tailwind/unexcluded.css` the `tailwind` profile without its exclusion line, the
   instrument that proves the exclusion list complete. The two departures from the workspace rows
   (`tests/setup.css` wired into the Tailwind project alone; the bare import in the fixture rather
   than the canonical file) are recorded rows in § Departures from the workspace rows.
4. **Bootstrap wins every shared class name, by construction.** A shared name whose Veneer
   declaration is important wins by importance in any layer order (the F6 contract). A shared name
   whose Veneer declaration is normal is excluded from Tailwind's generation by the recipe's
   `@source not inline("…")` line, so Tailwind emits no rule for it and Bootstrap's is the only
   declaration. The list's rule: every shared name whose Veneer declarations are all normal, and no
   other name. Today that is `caption-bottom caption-top col-auto col-{1..12} container table`.
   The additive case (`collapse` setting `visibility`, `col-*` setting `grid-column`, `table` setting
   `display`) disappears at the source. The analyst's `visibility: inherit` repair on `.collapse` is
   refused: Veneer ships no rule whose reason is Tailwind.
5. **The derived set, never a list.** The proof's candidate set is every class selector the built
   cascade declares, written to `tmp/tailwind/candidates.txt` by a plugin in
   `configs/src/vite.tailwind.config.ts` before Tailwind compiles (a CSS file cannot be the source;
   a text file can, gitignored or not). The proof loads the unexcluded instrument, intersects its
   `.NAME` selectors with the Veneer sheet's, and asserts every member is either important in Veneer
   or named in `tests/setup.css`'s exclusion line (read through `?raw` and split on whitespace, with
   the list written without brace ranges so no expander is needed); it asserts the set contains
   `container`, `table`, `col-1`, `caption-top`, and `caption-bottom` so a scan that found nothing
   cannot pass. Fallback if the plugin cannot be shown to run before the compile: a committed
   `tests/fixtures/tailwind/candidates.txt` regenerated in the ledger's refresh loop and drift-gated.
   The analyst's promoted-measurement fixture is refused as the input (it is the calibration floor).
6. **Build and project.** `configs/src/vite.tailwind.config.ts` spreads the browser configuration
   the way the styles wrapper does, attaches `@tailwindcss/postcss` in `css.postcss`, names the
   project `src:tailwind`, includes `tests/src/tailwind/**/*.test.ts`, and mirrors the styles
   project's setup files ending in the built cascade. `test:src:tailwind` builds the cascade first
   and runs the config; `test:src` gains it. The root `vite.config.ts` is scaffold-owned and is not
   edited. `src:styles` stays Tailwind-free and gains one case asserting no Tailwind sheet reaches its
   document. `@tailwindcss/vite` is refused (not installed; skips Sass output).
7. **Loading a profile per case.** Import each profile file with `?inline` so the case holds the
   PostCSS-compiled text and loads it through `scene.load`, after the built cascade, so the cascade's
   own order line is the first layer statement. If `?inline` does not run the PostCSS chain under the
   browser project, the fallback is one project per Tailwind profile with the profile as a setup
   file; F8a settles that and records it.
8. **Sheet identity.** `readCascadeSheet` selects by a `theme` layer block, which a Tailwind sheet
   also carries. F8a makes the reader identify Veneer's sheet by a Veneer-only signature (its
   `--vn-` custom property at `:root`) or takes the sheet element explicitly, with a plant proving the
   reader refuses the Tailwind sheet while both are loaded.
9. **Preflight.** Supported as preserving every property Bootstrap's reboot declares (Veneer's
   `elements` layer sits after `base`) and recording every property preflight adds. The proof walks the
   measured overlapping elements per property: reboot-declared properties keep their standalone values;
   every property that moved is a row of the guide's preflight departure table keyed by tag, property,
   standalone value, and profile value; an unrecorded move and a stale row each redden, each proved by
   a plant. `src/styles/**` is off-limits to the preflight unit, so no reversal rule can land.
10. **The guide.** § Styles gains `### Tailwind` after § Files: the profile table (entry, layers,
    parts, proof file); one recipe fence per Tailwind profile carrying the order line, the imports,
    `@source './src'` for the consumer's markup, the exclusion line, and the cascade import; the
    shared-name rule (importance or exclusion, with the list's one home being the recipe); the
    preflight ruling and its departure table; the sentence that Veneer ships no rule whose reason is
    Tailwind; the supported Tailwind version (4.3) and the test command. The deferral bullet in
    § Departures from the workspace rows becomes the two landed rows. § Tests names the proof files.
    § Compatibility owes nothing. The `Where a class name exists in Bootstrap and in Tailwind`
    sentence F6 landed stays and points at the subsection.
11. **Sequencing.** F8 closes over today's shipped names; the analyst's move behind B-UTILITIES is
    refused. Every later unit that ships a shared name whose Veneer declaration is normal extends the
    exclusion line and the guide's list in the same change, and the gate reddens until it does; the
    B briefs carry that as a standing condition and ROADMAP § Carriers names it.

## Units and routing

| Unit | Role and engine | Owned | Depends on |
| --- | --- | --- | --- |
| F8a PROFILES | `opus` on Opus (served Opus 5) | `configs/src/vite.tailwind.config.ts`, `package.json` scripts, `tests/setup.css`, `tests/fixtures/tailwind/preflight.css`, `tests/fixtures/tailwind/unexcluded.css`, `tests/src/tailwind/profiles.test.ts`, `tests/src/styles/index.test.ts`, `tests/setupBrowser.ts` (the sheet reader), `tests/setupBrowser.test.ts`, `guides/veneer.md` § Tailwind skeleton and the workspace departure rows | F6 (landed `04114c5`) |
| F8b SHARED-PREFLIGHT | `opus` on Opus (served Opus 5) | `tests/src/tailwind/shared.test.ts`, `tests/src/tailwind/preflight.test.ts`, `tests/setupStyles.ts` (readers the two proofs share), `tests/setupStyles.test.ts`, `guides/veneer.md` § Tailwind rules and tables | F8a |

Audit per unit: `analyst` on Astra (objective) and `reviewer` on Opus (subjective), with the
browser measurements the sandbox cannot take settled by the Orchestrator on the host. F8a runs in a
worktree from `04114c5` beside the F5c, F7, and F5b integrations; its `tests/setupBrowser.ts` and
`guides/veneer.md` edits integrate by cherry-pick after F7 lands.

## Exit criterion

The standalone profile is proved Tailwind-free; the `tailwind` and `preflight` profiles compile through
the installed PostCSS plugin in the browser project; every shared name is important in Veneer or
excluded by the recipe, derived at run time with a floor; every preflight move is a recorded row; the
guide carries the recipes and the rules; `npm run test:src:tailwind` is green and in `npm test`; the
manifest and the built cascade carry no Tailwind requirement.
