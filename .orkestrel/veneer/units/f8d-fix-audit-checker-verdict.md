# F8d IMPORTANCE-LONGHANDS, round 2 (the fix round) — `checker` on Sonnet

Subject: claims 5 and 7 of `f8d-fix-audit-claims.md`, read on the tree of `/home/user/veneer-f8d` on 2026-09-23. Read-only; the verdict text is the lane's handback verbatim.

## Verdict — claims 5 and 7, F8d fix round (checker, Sonnet)

**Claim 5 (the prose). CONFIRMED.**

- One statement of the rule: `guides/veneer.md:388-393` states the rule once ("The exclusion line names the class names Veneer and Tailwind both declare... A shared name leaves the exclusion line only where Veneer declares with `!important` every longhand..."). The equality and branch sentences at `guides/veneer.md:406-408` and `guides/veneer.md:410-411` refer to it ("the derived names that the rule stated with the exclusion line keeps on the line"; "the shared names that rule lets leave the line") without restating the rule's substance.
- Banned phrasing gone: `grep -n "two sheets\|both longhands\|second plant\|first plant" /home/user/veneer-f8d/guides/veneer.md` returns nothing. The remaining bare-looking `col-1` hits (`guides/veneer.md:350,363`) sit inside `@source not inline(...)` code fences, not prose, so the bare-token ban does not reach them; every prose occurrence of `col-1` is backticked and followed by a noun (`` `col-1` `` rule at `guides/veneer.md:413`, `` `col-1` `` class at `guides/veneer.md:417`).
- The consumer proof's two edited comments name the longhands: `tests/service/tailwind/consumer.test.ts` diff hunk at (`f8d-2.diff:95-100`) reads "importance on `grid-column-start` and `grid-column-end`, the longhands Tailwind's `col-1` rule declares", and the new case's comment at (`f8d-2.diff:132-136`) reads "Tailwind's `col-1` rule declares `grid-column-start` and `grid-column-end`, and the plant makes `grid-column-start` important".
- `writing.md` conformance on the changed lines: every backticked token in the changed guide and comment text is followed by a noun (`` `!important` `` declarations, `` `col-1` `` rule/class, `grid-column-start`/`grid-column-end` longhands); no changed line matches the banned-term table (`git diff cdf7f55 -U0 -- guides/veneer.md tests/service/tailwind/consumer.test.ts` shows only "as" in a non-comparative sense, "once each" in `tests/setupServer.ts` TSDoc meaning "one time each", both permitted senses per the report's own sweep, which this reading corroborates rather than merely repeats); no changed line states a count of a growable set. Column width: the added guide lines (`guides/veneer.md:406-417`) each measure under 100 columns by direct count; the sole line over 100 columns in the paragraph's range, `guides/veneer.md:402`, is unchanged context.

**Claim 7 (law and scope), the parts open to reading-alone. CONFIRMED for those parts; the `npm run check` instruction is the objective lane's, not ruled here.**

- No `any`: no occurrence in `f8d-2.diff`.
- No `as` other than `as const`: `grep -n '\bas [A-Za-z]' f8d-2.diff` returns only prose uses of "as" (comparative/temporal English, e.g. "as Chromium expands it", "such as the built cascade's") inside comments and TSDoc, never a TypeScript type-assertion expression; no `as const` and none needed.
- No `!` non-null assertion: every `!` in the diff appears inside the `!important` CSS/string literal (for example `tests/setupServer.ts` around line 1697, `tests/service/tailwind/consumer.test.ts` planted strings), never as a bare postfix assertion operator.
- No suppression directive: `grep -n '@ts-ignore\|@ts-expect-error\|@ts-nocheck\|eslint-disable' f8d-2.diff` returns nothing.
- No nested function beyond a callback: the added `collectRuleLonghands` and `collectImportantNames` (`tests/setupServer.ts:1737-1770` area, per `f8d-2.diff:396-457`) are top-level module functions with `for` loops in their bodies; no function declaration or assignment nests inside another function body.
- Readonly members: `LonghandRule` at `tests/setupServer.ts:1727-1731` declares `selector`, `properties`, and `important` each `readonly`, confirmed by `grep -n "readonly (selector|properties|important)" tests/setupServer.ts` returning the interface's three members among its hits.
- Status is the seven owned files and nothing else: `f8d-2-status.txt` lists exactly `guides/veneer.md`, `tests/service/tailwind/consumer.test.ts`, `tests/service/tailwind/preflight.test.ts`, `tests/setupServer.test.ts`, `tests/setupServer.ts`, `tests/setupService.test.ts`, `tests/setupService.ts` — matching the claim's "seven owned files" with no extra row.
- `tmp/probe/` absent: a glob for `tmp/probe/**` in `/home/user/veneer-f8d` returns no files.
- `npm run check` exit code: the report (`f8d-report-2.md:111`) states it exited 0, but a writer's own report is not evidence I can confirm from; the brief assigns this instruction to the objective lane, so I record it UNRESOLVED-BY-THIS-LANE rather than ruling it, per the brief's own routing.

No findings outside claims 5 and 7 rose to the BROKEN standard.

VERDICT: PASS
