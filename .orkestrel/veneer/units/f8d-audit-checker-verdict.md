# F8d IMPORTANCE-LONGHANDS — `checker` on Sonnet

Subject: claims 6 and 7 of `f8d-audit-claims.md`, read on the tree of `/home/user/veneer-f8d` on 2026-09-23. Read-only; the verdict text is the lane's handback verbatim.

## Checklist — claims 6 and 7 only (F8d IMPORTANCE-LONGHANDS)

### Claim 6 — The guide

- **§ Tailwind states the per-longhand rule once.** CONFIRMED. `guides/veneer.md:406-417` (worktree `/home/user/veneer-f8d`) replaces the sentence "The importance branch runs over the names Veneer declares important on some longhand" (removed diff line 18-19 of `f8d.diff`) with "The importance branch runs over the names whose `!important` declarations cover every longhand Tailwind's rule for the name declares." (`guides/veneer.md:411-412`). The per-longhand wording appears once, not duplicated elsewhere in § Tailwind.
- **§ Files `tests/setupServer.ts` row names the shared-name readings.** CONFIRMED. `guides/veneer.md:254` (table row): "...the compiled-stylesheet reader, the shared-name readings, the guide's compatibility..." — the phrase is present exactly as the report describes.
- **Every changed sentence follows `writing.md`.** BROKEN.
  - Noun-after-code-token, banned-term, and line-length checks pass: a ripgrep sweep for lines over 100 columns in `guides/veneer.md` (`^.{101,}$`) hits only pre-existing table rows and unrelated long lines (for example lines 10-40, 179-259, 459-586); none of the changed prose lines 402-417 appear in that hit set, so the changed sentences hold at or under 100 columns. No hit for the substitution-table terms (`should`, `simply`, `currently`, `utilize`, `via`, `in order to`, `etc.`, `performant`, `allows you to`, `and/or`, `please`, `sanity check`, `dummy`) in the changed text.
  - `guides/veneer.md:416` reads "A second plant makes only the `grid-column-start` longhand important, and the equality still holds with `col-1` on the line." This names a list item — the guide's second demonstration plant — by its ordinal ("second"), which `AGENTS.md` § Writing bans unconditionally: "**NEVER** name a list item by its position. Write the item's name, never its ordinal or its number." The sentence must name the plant (for example, "a plant that makes only the `grid-column-start` longhand important") rather than count its position among the guide's plants.

### Claim 7 — Law and scope (excluding the `npm run check` exit code, which addresses the objective lane)

- **No `any`.** CONFIRMED. No occurrence of `any` as a type in `f8d.diff`'s added lines (checked by reading the full diff; the only `any`-adjacent text is none).
- **No `as` other than `as const`.** CONFIRMED. A sweep of the diff for `\bas\b` (`f8d.diff` matches) returns only prose uses of "as" ("as Chromium serializes it", "such as", "reports as `important`") — none is a TypeScript type assertion, and no `as const` appears either.
- **No `!` non-null assertion or suppression.** CONFIRMED. Every `!` in the diff is either the string literal `!important` (a CSS priority token) or the boolean-negation operator in `tests/service/tailwind/consumer.test.ts:143` (`shared.filter((name) => !important.includes(name))`), not a postfix non-null assertion. No `@ts-ignore`, `@ts-expect-error`, `@ts-nocheck`, or `eslint-disable` anywhere in the diff.
- **No nested function beyond a callback.** CONFIRMED. `collectRuleLonghands` and `collectImportantNames` (`tests/setupServer.ts`, diff lines ~323-382) use only `for` loops and inline predicates passed directly as arguments (`rules.flatMap((rule) => ...)`, `properties.every((property) => ...)`); no function declaration or assignment is nested inside another function body.
- **Readonly members.** CONFIRMED. `LonghandRule` (`tests/setupServer.ts`, diff lines 301-308: `selector`, `properties`, `important`) and `StageRule.important` (`tests/setupService.ts`, diff lines 439-449) are declared `readonly`.
- **No helper duplicating an installed `@orkestrel/test` export.** UNRESOLVED. The brief and diff give no inventory of `@orkestrel/test`'s exports to check `collectRuleLonghands` or `collectImportantNames` against, and I hold no tool to inspect the installed package. Rule from the installed package's export list before confirming.
- **Status is the six owned files and nothing else.** CONFIRMED. `f8d-status.txt:1-6` lists exactly `guides/veneer.md`, `tests/service/tailwind/consumer.test.ts`, `tests/setupServer.test.ts`, `tests/setupServer.ts`, `tests/setupService.test.ts`, `tests/setupService.ts` — the same six files `f8d.diff` touches, and the report's § Changes names the same set.
- **`tmp/probe/` is absent.** CONFIRMED. `Glob("tmp/probe/**", path=/home/user/veneer-f8d)` and `Glob("tmp/probe", path=/home/user/veneer-f8d)` both return no files.

### Findings outside claims 6 and 7

None found to the BROKEN standard.

### Re-dispatchable instruction for the not-met item

- Rewrite `guides/veneer.md:416` to name the second plant rather than count it by ordinal, per `AGENTS.md` § Writing's list-item-by-position ban.

VERDICT: FAIL 6; outside the claims: none
