# J-TAILWIND-PROBE — the Orchestrator's ruling (2026-09-25)

**Subject.** The probe run at Veneer `b867c96` in `tmp/worktrees/tailwind-probe`. The report is `units/j-tailwind-probe-report.md`, and the instruments are `units/j-tailwind-probe-{control,census,plant,collide,extended}.test.ts`. No tracked file changed.

**The reading.**
- Every scenario in `PLUGIN_SCENARIOS` reads zero departures under the consumer preflight profile (`TAILWIND_PATHS.consumer.preflight`, compiled through `compileProfile`) compared with Veneer alone. That covers all 11 plugins, from 10 to 22 steps each.
- **The control reads the profile on the page.** `html` takes the preflight's `tab-size: 4`, `border-style: solid`, `line-height: 24px`, and system font stack. Values Veneer's own element rules declare did not move, as the guide states for a reset beneath the `elements` layer.
- **A null control** recorded collapse twice alone and read no departure, so the recorder adds no noise.
- **A planted control** added `#panel.show { opacity: 0 }` to the profile and read 24 `visibility` departures, so the path reports a stylesheet difference when one exists.

**The ruling.** The Tailwind tenet ("Work with Tailwind and without it", Veneer ROADMAP § Tenets) holds for the engines on every facet the oracle reads: tag, class, attribute, visibility, content, parent, scroll, focus, and lock. No engine unit follows. The carried finding "The Tailwind tenet … has no engine evidence" (`units/rebaseline-0925.md`) closes on this reading.

**The limit.** The reading does not cover geometry, inline style values, or opacity. E28 keeps those out of the oracle's facets, so a preflight layout move there would not show. That limit is the oracle's, stated in E28, and this probe does not widen it.

**Relayed to the styles session.** The probe's collision reading, which its own proofs may want: under a consumer scan that sees the scenario markup, Tailwind generates `p-3` (toast) and `w-100` (carousel), which the exclusion line does not withhold. With both generated, toast and carousel still read no departure. The guide lists `p-*` and the width steps among the names Veneer declares with `!important`.

VERDICT: PASS
