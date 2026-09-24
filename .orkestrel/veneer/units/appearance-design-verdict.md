# Design round APPEARANCE — the Orchestrator's reconciliation (2026-09-24)

Brief: `appearance-design-brief.md`. Lanes, blind to each other on that one brief: the subjective lane, `planner` on
Opus 5.5 (`appearance-design-planner-proposal.md`, workflow `wf_c8a9a5b5-77e`), and the objective lane, `analyst` on
GPT-6 Astra (`appearance-design-analyst-proposal.md`, thread `01a0d512-096f-7181-b8cd-6fa8be49976c`).

Orchestrator readings taken after both lanes returned, in the host's Chromium 141 over Veneer's built cascade:
`appearance-instruments/appearance-tier-probe.log.txt` (every role's emphasis tier, tertiary included, and the proposed
link hover, in both modes) and `appearance-instruments/appearance-fluid-arithmetic.log.txt` (a length divided by a length
inside `calc()` resolves; the 101px retune reads 51.7925px at 390 and 101px at 1280).

## Rulings

| Question | Planner | Analyst | Ruling |
| --- | --- | --- | --- |
| P7-1 population | In: `.text-<role>` and `.link-<role>` for primary to danger, outline-button resting and disabled text for every `$roles` member except light and dark, validation text through the light `valid` and `invalid` tokens. Out: light, dark, black, white, body, `.text-bg-*`, `.link-underline-*`, and surfaces already on the tier. | Same. | Adopted as both lanes state it. The exclusion of `light` and `dark` has one home in `_tokens.scss`. Tertiary text reads 8.58 in light and 5.25 in dark (tier probe). |
| `a` link and its readers | A user choice: the ruling's "Elements' tier" (80 percent dark) against its "70 percent". Recommends 70. | `--vn-link-base` reads the primary tier in each mode. | 70 percent in both modes, with no question to the user: the recorded ruling fixes the 70 percent mix for colored text on the page in both modes, and the `a` link is colored text on the page. Dark `a` reads 8.64, hover 11.23 (tier probe). The dark `link-rgb` and `link-hover-rgb` triplets are re-measured. |
| P7-2 mechanism | `rgb(from var(--bs-<role>-text-emphasis) r g b / var(--bs-text-opacity))`; `.link-<role>` over `--vn-color-<role>-emphasis`. | Same. | Adopted. |
| Link hover | The tier moved 20 percent toward `--vn-text-emphasis-base`. | The tier moved 20 percent toward black in light and white in dark. | The same rule: `--vn-text-emphasis-base` is black in light and white in dark (`_tokens.scss` `emphasis` keys). `color-mix(in srgb, <tier> 80%, var(--vn-text-emphasis-base))` raises contrast over the resting tier for every role in both modes (tier probe: dark danger 4.76 to 6.29). |
| P7-3 override contract | `--vn-color-<role>-base` moves fill, tiers, and text; `--vn-color-<role>-emphasis` or `--bs-<role>-text-emphasis` moves text; `-rgb` moves fills only. | Same, stated at the theme-declaring scope. | Adopted. The retune proof gains the negative `-rgb` case and the mix-partner case. |
| P7-4 identity | Accept; both read one alias. | Accept. | Adopted. |
| Validation | Light `valid` and `invalid` read the emphasis tier. | Same; the border and checked fill move with it. | Adopted, with the border and checked-fill change asserted rather than left implicit. |
| P8-1 and P8-2 formula | `calc(S - max(S * 0.9 - 1.125rem, 0px) * (1 - 100vw / 1200px))` over the live token, capped at `xl`. | `S - 0.9D + (D / 1rem) * 1.2vw`, `D = max(0rem, S - 1.25rem)`, capped at 1200px. | The planner's form. At a 16px root the two are one expression (`0.9D * 100vw / 1200px` equals `(D / 1rem) * 1.2vw` when `1rem` is 16px), so every value either lane tabled holds. The planner's form reaches the cap without a jump at any root size. Both lanes' default tables agree to the thousandth. |
| Caps | Every consumer, h4 to h6 included. | Same. | Adopted. |
| `legend` | Folded onto the shared function. | Left outside. | Folded. It is the same mechanism (the release sizes `legend` through its responsive rule at 1.5rem), and at the default token it resolves the same value as its hand formula. The analyst's reason, that the hand formula is not a general implementation, is the reason to replace it. |
| P8-3 ledger | Dropped cap rows become tokenized kept rows; h5, h6, `.h5`, `.h6`, `.fs-5`, `.fs-6` caps are additions. | Same. | Adopted. |
| Bootstrap evidence | — | `TEXT_COLOR_CASES` stays Bootstrap baseline; Veneer expectations go beside it. | Adopted. |

## Units

The work class is objective, which routes to Astra through `sol`. Both units route to `opus` natively instead: every
proof runs in Vitest browser mode, and a bench sandbox denies the browser process tree that needs (orchestration
§ Bench laws rule 5). The audit's objective lane therefore runs on Astra, an engine that did not write the work.

| Unit | Role and engine | Worktree | Brief |
| --- | --- | --- | --- |
| AP-COLOR (apc) | `opus` on Opus 5.5, native | `/home/user/veneer-apc`, branch `unit/apc`, from `712ae72` | `ap-color-brief.md` |
| AP-TYPE (apt) | `opus` on Opus 5.5, native | `/home/user/veneer-apt`, branch `unit/apt`, from `712ae72` | `ap-type-brief.md` |

The units own disjoint files. `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, and `guides/veneer.md` are shared;
each unit returns its hunks there as a patch, and the Orchestrator integrates AP-COLOR first. Each unit updates the guide
passages its mechanism moves, so no separate guide unit runs. The planner's U0 probe is settled by the two readings
named earlier, and its vitest viewport reading moves into AP-TYPE's first step.

## Findings and carriers

| Finding | Source | Carrier |
| --- | --- | --- |
| Heading pins at a viewport under 1200px beyond the named tables | planner risk | AP-TYPE (derives the set by running the suite) |
| Light validation borders and checked fills darken | both lanes | AP-COLOR (asserted), portfolio capture after landing |
| A Bootstrap migrant retuning `--bs-primary-rgb` no longer moves `.text-primary` | both lanes | AP-COLOR (guide departure sentence and negative proof) |
| Dark `link-rgb` and `link-hover-rgb` triplets go stale | analyst risk | AP-COLOR (the triplet-to-rendered test stays binding) |

VERDICT: design reconciled; AP-COLOR and AP-TYPE dispatched
