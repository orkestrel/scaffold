# Checker verdict — ACCORDION (`ac`) audit round 1, claims 1, 5, 7, 8

## Claim 1 — Delta and scope: CONFIRMED

- `ac-status.txt:1-4` lists exactly the four owned files (`app/browser/sections/AccordionSection.ts`, `src/styles/components/_accordion.scss`, `tests/app/browser/sections/AccordionSection.test.ts`, `tests/src/styles/components/accordion.test.ts`) and nothing else.
- `ac-shared.patch` `diff --git` headers (lines 1, 21, 66, 75, 243, 288, 300, 326, 340, 419, 459, 499, 511, 672) name exactly the fourteen files the claim lists — `app/browser/Showcase.ts`, `app/browser/constants.ts`, `app/browser/index.ts`, `guides/veneer.md`, `src/styles/_tokens.scss`, `src/styles/index.scss`, `tests/app/browser/Showcase.test.ts`, `tests/app/browser/index.test.ts`, `tests/app/browser/integration.test.ts`, `tests/conformance.test.ts`, `tests/setup.ts`, `tests/setupServer.test.ts`, `tests/setupStyles.test.ts`, `tests/setupStyles.ts` — and no vendored file, sibling file, `src/browser/**`, `src/core/**`, `tests/fixtures/**`, `package.json`, `README.md`, or `ROADMAP.md`.
- Removals match: `ac-shared.patch:264-267` (`$assets` loses the two accordion rows), `:255-262` (`$icons` comment rewritten), the guide's retained-variables paragraph pair rewritten (report embed, `b-collapse-ac-report.md:458-474`), the conformance order comment extended (`b-collapse-ac-report.md:707-718`), and `setupStyles.test.ts`'s icon-map comment and site rows rewrapped (`b-collapse-ac-report.md:817-826, 834-835`).

## Claim 5 — The capture rows: CONFIRMED

- `ac-shared.patch` (`tests/setup.ts` hunk) adds `CaptureSubject` members `Accordion items` and `Accordion flush`, appends `CASCADE_KEYS` rows `accordion-items` (`.accordion-button:not(.collapsed)`, `background-color`) and `accordion-flush` (`.accordion-flush > .accordion-item`, `border-left-width`) at the registry's end, and adds `DRIVEN_KEYS` row `accordion-items-focus` (`b-collapse-ac-report.md:752-771`).
- The journey case title in `tests/app/browser/integration.test.ts` matches verbatim: "reaches a collapsed accordion button through the keyboard and lifts its ring over the items beside it" (`b-collapse-ac-report.md:633`).
- `ACCORDION_SPECIMENS` is added to the portfolio's declared set (`b-collapse-ac-report.md:691`).
- No `CaptureState` member is touched by the patch.
- Each row's selector resolves inside its named specimen and its property is written by that specimen's own rule: `_accordion.scss:61-63` sets `background-color` on `.accordion-button:not(.collapsed)` (matched only by the "Accordion items" markup's expanded button, which carries no `collapsed` class), and `_accordion.scss:150-152` sets `border-left: 0` (driving `border-left-width`) on `.accordion-flush > .accordion-item` (matched only by the "Accordion flush" markup).

## Claim 7 — The guide content: BROKEN (one instance)

Confirmed: `### Accordion classes` inserted at the hunk anchored after Card classes and before Breadcrumb classes (`ac-shared.patch` guide hunk `@@ -1571,6 +1572,90`; live guide at `/home/user/veneer-ac/guides/veneer.md:1521,1574` shows Card then Breadcrumb with no Accordion heading, confirming the base the hunk inserts into); the `#### accordion` table inserted between the `card` and `breadcrumb` tables (`b-collapse-ac-report.md:478-491`); the `accordion` `selector`/`variable` compatibility rows follow the `nav` rows (`b-collapse-ac-report.md:506-507`); the `### Additions` row follows the `nav` row (`b-collapse-ac-report.md:495-498`); the `### Files` row follows the `_collapse.scss` row (`b-collapse-ac-report.md:358-359`); the § Tests link follows the collapse link (`b-collapse-ac-report.md:512-515`); the retained-variables paragraph pair no longer names the accordion pair as retained at theme scope, moving it to the component's-own-dark-rule paragraph (`b-collapse-ac-report.md:458-474`); the compatibility values check true against the partial (`--vn-space-8` at `_accordion.scss:35,56`, `--vn-size-3` at `_accordion.scss:49`, the `color-mix` box-shadow at `_accordion.scss:32`); no sentence states Veneer script behaviour — the prose attributes the state-moving plugin to an engine obligation (`b-collapse-ac-report.md:381-382`).

Broken: the claim states "every code token is followed by a noun." The added prose contains `` `z-index: 2` ``, immediately followed by a comma and "and," and `` `z-index: 3` ``, immediately followed by a comma and "so" — neither token is followed by a noun (`ac-shared.patch` guide hunk, embedded at `b-collapse-ac-report.md:407-408`: "A hovered button lifts to `z-index: 2`, and a focused one lifts to `z-index: 3`, so its ring paints"). The same pattern exists elsewhere in the guide's pre-existing Input group section (`/home/user/veneer-ac/guides/veneer.md:1252-1258`), so this is not a novel construction, but the claim's literal universal ("every") fails on this instance regardless of precedent.

## Claim 8 — Law and report: CONFIRMED

- No `any`, unsafe `as` (only `as const` at `accordion.test.ts:427,474`), `!` non-null assertion, suppression comment, mock, or `vi.fn`/`vi.mock` found in any of the four owned files (greps over `AccordionSection.ts`, `AccordionSection.test.ts`, `accordion.test.ts` returned no matches on `: any`, `@ts-`, `eslint-disable`, `vi.mock(`, `vi.fn(`, or unsafe `as`).
- `_accordion.scss` contains no literal color (hex or `rgb`/`rgba`) — grep for `#[0-9a-fA-F]{3,6}`/`rgba?\(` returned no matches; every color reads a `var(--bs-*)` or `color-mix()` expression.
- `AccordionSection.ts` exports one class and no module-scope helper; the test files export nothing, so no new exported helper exists to duplicate an installed `@orkestrel/test` or `@orkestrel/contract` export.
- The report records D1, D2, and D3 each with expected, found, evidence, and done (`b-collapse-ac-report.md:18-48`), and its § What the unit could not close names the frames, the header margin, the last panel radius, the states with no frame, and the button line-height observation (`b-collapse-ac-report.md:254-270`).
- Retained instruments and logs match the report's naming: `ac-instruments/` contains `mutate.py`, `mutate-section.py`, `gates-fast.sh`, `gates-proofs.sh`, `built-selectors.mjs`, `mutations-1.log.txt` through `mutations-4.log.txt`, `mutations-section.log.txt`, `accordion-green.log.txt`, and `accordion-final.log.txt` as named.

Counts the report states, listed (per the acceptance criterion, not as a claim of my own): baseline `22 passed (22)` and `151 passed (151)`; worktree `check` exit `2`; validation copy `format:check` exit `0`, `lint:check` exit `0`, `check` exit `0`, `build:src` exit `0`; `test:setup` `254 passed (254)` after one re-run; accordion proof `30 passed (30)`; styles cluster `138 passed (138)`; whole styles project `886 passed (886)`; `AccordionSection.test.ts` `4 passed (4)`; `test:app` `80 passed (80)`; `test:conformance` `22 passed (22)`; `test:guides` `19 passed (19)`; `test:policy` `109 passed | 1 skipped (110)`; two journey projects each `41 passed (41)`; failing-first accordion proof `29 failed | 1 passed (30)`; diffstats `+177`, `+494`, `+20`, `+177` for the owned files and `+2, +37, +1, +106/−8, +10/−6, +1, +3, +3, +54, +6/−2, +15, +1, +120/−5, +190` for the fourteen shared files.

## Findings outside the claims

None found beyond the sub-point already recorded under claim 7.

VERDICT: FAIL 7; outside the claims: none
