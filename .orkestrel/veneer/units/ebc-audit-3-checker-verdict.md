# Verdict — E-ID-BUTTON-CASCADE fix-round audit 3, claims 1, 2, 6

## Numbered verdicts

**Claim 1 — Titles: CONFIRMED**
- `ebc-brief-5.md` item 1 gives, verbatim: `writes the recorded accordion selectors, the dark icon rule, and the button reboot on the header's button form, and no other rule on the accordion classes` (`ebc-brief-5.md:18`). `/home/user/veneer-ebc/tests/src/styles/components/accordion.test.ts:42` carries this title verbatim.
- `ebc-brief-5.md` item 2 gives, verbatim: `writes the recorded carousel selectors and the button reboot on the controls' and the indicators' button forms, and no other rule on their classes` (`ebc-brief-5.md:21`). `/home/user/veneer-ebc/tests/src/styles/components/carousel.test.ts:44` carries this title verbatim.
- Each title is true of its case's assertions: `accordion.test.ts:52-58` expects `:where(button.accordion-button)` among the accepted selectors (the button reset on the class's button form) and rejects every other selector by construction of the `written` set. `carousel.test.ts:54-62` expects `:where(button.carousel-control-prev, button.carousel-control-next)` and `:where(.carousel-indicators [data-bs-target])` among the accepted selectors, same construction.

**Claim 2 — Comment: CONFIRMED**
- `ebc-brief-5.md` item 3 gives, verbatim: "The holder retunes the weight and the shadow the surface reads, so a button the surface misses reads the release's reboot and the browser's own values instead, which differ from the surface in the weight and the shadow." (`ebc-brief-5.md:23-25`).
- `/home/user/veneer-ebc/tests/src/styles/elements/button.test.ts:85-87` carries this text verbatim, wrapped by the formatter.
- The comment is true of the reading the `class` mutation produces: `/home/user/veneer-ebc/tmp/units/logs/ebc-3-mutation-class-final5.log.txt:566-605` (the "Emptied control" case, the button the surface misses) shows, under the `class` mutation, `font-weight` reading `"400"` (received) against `"700"` (expected surface value) and `box-shadow` reading `"none"` (received) against the surface's painted shadow (expected) — the browser's own weight and no shadow, exactly the pair the comment names.

**Claim 6 — Scope and law: CONFIRMED**
- `ebc-5-delta.diff` (`/home/user/scaffold/.orkestrel/veneer/units/ebc-5-delta.diff:1-40`) touches exactly the three files items 1-3 name: `tests/src/styles/components/accordion.test.ts`, `tests/src/styles/components/carousel.test.ts`, `tests/src/styles/elements/button.test.ts`. No other file appears in the diff.
- `ebc-5-status.txt` and `ebc-4-status.txt` name the identical 26-path set line for line (both files, lines 1-26 of each, are byte-identical listings).
- The delta's added lines (`ebc-5-delta.diff:10`, `:23`, `:36-37`) contain no `any`, no `as` type assertion, no non-null assertion (`!`), no `@ts-nocheck`/`@ts-ignore`/`@ts-expect-error`/`eslint-disable`, and no nested function declaration — the only additions are two retitled `it(...)` string arguments (anonymous callbacks passed directly to `it`, the permitted exception) and a two-line comment. No line states a count, and no banned-term row (`should`, `simply`, `currently`, `new`, `latest`, `via`, `etc.`, `above`/`below`, and so on) or backticked-token-without-noun instance appears in the added text.

## Findings fitting no claim

None found within the evidence read for claims 1, 2, and 6 (the two test files, `ebc-brief-5.md` items 1-3, `ebc-5-delta.diff`, `ebc-5-status.txt`, `ebc-4-status.txt`, and `ebc-3-mutation-class-final5.log.txt`).

## Attacked and held

- Claim 2's behavioral clause was attacked by checking whether the cited `class`-mutation log actually shows the browser-default weight/shadow reading the comment asserts, rather than accepting the report's characterization; `ebc-3-mutation-class-final5.log.txt:566-605` held.
- Claim 6's syntax-ban clause was attacked by reading every added line in the delta for `any`, `as`, `!`, suppression directives, and nested function declarations; none found.

VERDICT: PASS
