# Plan conformance audit — verdict, 2026-09-20

Subject: every remaining unit of `plan.md` and `units/u3-brief-4.md`, read against scaffold's
`AGENTS.md`, `CLAUDE.md`, `.agents/orchestration.md`, every rule file, the bound skills, and the
fleet's layout, after the user's ruling that a package documents itself in one guide. Brief:
`units/plan-conformance-brief.md`. Lanes, blind to each other, through workflow `wf_a12cf13d-5bf`:
`checker` on native Sonnet (`units/plan-conformance-checker-report.md`) and `reviewer` on native
Opus 5 (`units/plan-conformance-reviewer-report.md`). The same workflow's `verifier` ran the
scaffold release gate chain (`units/scaffold-release-gate-report.md`): every step exit 0 on the tip
`307516e7`, `host.json` unchanged after `build`, the config proof green.

## Rulings

Every row names the plan edit that carries it; the edits landed in the commit that carries this
file, recorded in the re-baseline entry of the same date.

| Finding | Lanes | Ruling | Carrier |
| --- | --- | --- | --- |
| `src/vue/` as a "fourth environment" the canon's tables do not list | both | accepted: a Veneer unit never invents a published environment; the Vue unit's prerequisite is a scaffold canon change | § Build this product Vue row; § Deferred: Vue environment |
| `guides/browser.md`, `guides/styles.md`, `guides/vue.md` | both | accepted: folded into `guides/veneer.md` sections | U7 guide bullet; § Deferred: Vue |
| `./browser/auto` absent from the export map; no kind row admits a side-effect module under `src/browser/` | checker (bound), reviewer (forces) | accepted: U7's design round names the file and, where no row admits it, the ruling is a scaffold rule change first; U7 owns `exports` and `sideEffects` | § Build this product JavaScript row |
| `tests/__fixtures__/oracle/` | both | accepted: `tests/fixtures/oracle/` | U4b |
| `src/browser/buttons/Button.ts` nests a lone class | both (bound) | accepted as a fix: flat until a family exists | U7 engine bullet |
| Button as the first statechart over a one-boolean state | reviewer | accepted: the family opens at Collapse; Button has no table | plan preamble; U7 journeys bullet; § Close each component Artifacts row |
| Bootstrap method spellings as a "declared wire body" proved by instruments | reviewer | accepted: the exemption reaches transliterated fields; the adapter behind `./browser/auto` carries the spellings; no instrument reads a method name | § Build this product Compatibility row; U7 compatibility bullet |
| `tests/src/core/constants.test.ts` | reviewer | accepted: `index.test.ts`, as brief 4 already routes | U3 |
| `tests/setupConformance.ts` listed as vendored in brief 4 | reviewer | accepted: package-owned, U4b owns it; harmless to U3, which never touches it | U4b; brief 4 stands unedited (live) |
| "showcase" and "shell" for one surface; no unit authors scaffold's showcase target | reviewer | accepted: one term, "shell", for `app/browser`; the scaffold `showcase` target is deferred as its own unit or the dependency is struck | U7; § Close each component; § Deferred: Showcase target |
| queue names already owned across the fleet (`Progress`, `Spinner`, `Table`, `Form`, `Range`, `Theme`) | reviewer | accepted: every component design round checks names against the hosted guides' `## Surface` tables | § Component queue; the process rule |
| utilities family versus the Tailwind unit on who ships Bootstrap's utility classes | reviewer | accepted: Veneer CSS ships them; the Tailwind profiles are an additional supported combination | § Component queue |
| `orkestrel-polish-surface` unbound while the exit criterion demands a portfolio verdict | reviewer | accepted: bound | § Authority and routing; § Exit criterion; Artifacts row |
| `resetSpecimens` in brief 4 | reviewer | accepted: `reset` is a banned lifecycle synonym; carried to U3's audit claims because the writer is live | U3 audit |
| new setup helpers overlapping installed exports (`render`, `readContrast`, `matchesColor`) | reviewer (bound) | accepted as a U3 audit claim: each helper names the installed export it overlaps or yields to it | U3 audit |
| `non-Orkestrel`, `once`, "fourth", "both receipts", "the eight", the plural "guides", contrast "per theme" | reviewer (bounds) | accepted: rewritten | the named rows |
| conformance project timeout budget; accepted-list reader from `@orkestrel/guide`; event helpers named | reviewer (bounds) | accepted: named in U4b and the JavaScript row | U4b; § Build this product |
| `orkestrel-align-packages` not read | checker (coverage) | noted; the skill governs U6, which is closed | none |

## Gates

The scaffold tip is release-ready on the verifier's reading. The vendored-only release (bump to
0.0.76, publish) waits on the user's one-time code.
