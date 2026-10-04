# Tokens: the Orchestrator's rulings after the design round (2026-10-04)

The critic (`design/critic.md`) holds the verdict until nine measurements run (its § 3, M1 to M9) and six questions are answered (its § 4). The user asked to be kept aware and to adjust as the work goes, so the defaults the judges applied stand as rulings, each reversible at the user's word, and the T0 probe takes the measurements before the verdict is written.

## The six questions, ruled by default

1. **Fonts, radii, and shadows follow the consumer's `@theme`** through `var(--TOKEN, FALLBACK)` references whose fallback is Tailwind 4.3.3's default: a consumer `--font-sans` reaches Bootstrap's body text and a consumer `--radius-md` reaches `.btn`; the default rendering is pinned by the fallback. M2 settles feasibility inside the full recipe (the theme block's emitted variables, pin 4's flattened equality, the `prefix(tw)` form); if M2 shows the references break pin 4 or the prefix form, the fallback literal is emitted instead and the guide states the limit.
2. **Colors pin to Tailwind's default palette** as resolved sRGB hex at build time, because the `-rgb` triplets, the mixes, and the `%23` escapes need channels; a consumer `--color-blue-600` does not reach `.btn-primary` through the CSS export; the guide states it, and a Sass `$palette` for Sass consumers stays a roadmap item.
3. **Container widths take Tailwind's convention**, `max-width` equal to the breakpoint (`40rem` to `96rem`), beside the aligned breakpoints (`40/48/64/80/96rem`), because R11 reads "where the scales can agree" as making them agree; the guide names the bands (576 to 639, 992 to 1023, 1200 to 1279, 1400 to 1535px) where Bootstrap's documented layouts move.
4. **`@custom-variant dark`** stays an optional guide sentence beside the Color mode limit; the three-line recipe stands.
5. **The law gains one clause**: `.claude/rules/styles.md` § Prohibitions names token substitution in a derived build under a switch the guide records, beside the reset placement; it lands in scaffold `main` with the token units' prose unit.
6. **No veneer release ships between the flip's landing and the token units' landing**, so a consumer meets one visual change; publishing needs the user's word in any case.

## The blocking findings, ruled

- **Finding 1 (scale output form):** references, per question 1, subject to M2.
- **Finding 2 (the map's measurement and the dark tertiary text):** M1 over the union population; the `#dee2e6` collision (the light border and the dark body color share one literal) is split by context when the value key cannot hold both floors: the mechanism gains a context key for that one literal (light `--bs-border-color` to `gray-300`, dark `--bs-body-color` to `gray-200`) if M1 shows the floor cannot be met with one value; otherwise the recorded exception stands.
- **Finding 3 (the integration partition and witness cases under the map):** both cases read their baseline from the tuned sheet adopted alone; one added case pins the tuned sheet alone against `./bootstrap` alone at `RELATION_WIDTHS`, every departing (name, width, longhand) listed as a map row or a band state, with the identity-map control.
- **Finding 4 (the dark secondary fill):** `gray-900` for the dark `--bs-secondary-bg-subtle`, and the contrast case gains the separation clause with this row as its control.
- **Finding 5 (`mapReading` keys):** a scale row is keyed by selector role and longhand; `.modal-xl` reads 1140px under both faces at 1280 as the control.
- **Findings 6, 7, 9 (unmeasured mechanism, self-asserting proofs, unreadable judge scripts):** M3, M4, M8, M9; the T0 probe ports the judges' scripts into `tmp/probes/tokens2/` and runs each twice to byte identity.
- **Finding 8 (the showcase contrast cases never read the map):** the four contrast subjects read under the `tailwindcss` face in both color modes and the header buttons under each face in light mode; M6 records the cost.
- **Findings 10 to 16:** M5 (the `xl` boundary and the down forms at 125% and 150% scale), the captions in the face form, ramp's scale keys and controls in the derivation case, the records list and the units list in the verdict, the gray collapse stated in the guide, M7's pixel reads and the wide-gamut residual sentence.

## Order

T0 (the nine measurements) runs after the header unit, beside fix unit A (tmp only); the verdict follows T0; the token units follow the structural flip's landing on `main`, and no release ships between.
