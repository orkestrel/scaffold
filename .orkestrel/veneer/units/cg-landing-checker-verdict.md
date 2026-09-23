# CLOSE-GUIDE (`cg`) landing check — `checker` on Sonnet verdict (2026-09-23)

Verdict: PASS

Checklist (claims per `cg-landing-checker-brief.md`):

1. **`cg-integration.diff` touches only the named sites** — met. Read in full, the diff has two file sections: `guides/veneer.md` (the `MANDATED_TAG_PAIRS` sentence at `/home/user/veneer-cg/guides/veneer.md:284`, the button-group `_tokens.scss` sentence at `:835`, the Form label insertion at `:1018-1021`, the range-thumb § Customization sentence around `:2250-2253`, the `Departure` cell sentence around `:2273-2278`, and the two § Showcase edits around `:4003` and `:4032-4036`) and `tests/src/styles/integration.test.ts` (one case-title line). No other file appears in `cg-integration.diff`. `tests/guides.test.ts` is absent from that diff (it appears only in `cg-status.txt` and `cg-2-status.txt`, the unit's own change outside this integration edit).

2. **Each changed sentence reads exactly as the verdict's Integration rulings state it** — met, quoted and located in `/home/user/veneer-cg/guides/veneer.md`:
   - Claim 8b, `:284`: "such as the `li` element under the `ol` and `ul` elements."
   - Claim 8a, `:835`: "the `_tokens.scss` partial already declares each of those over `--vn-radius-base` and `--vn-border-width`, so a consumer retuning either name moves the group."
   - F1, `:2252`: "...the range thumb's declared paint resolved on a stand-in element because Chromium withholds the part's computed style, the focused and checked check..."
   - F2, `:2274`: "a `tokenized` row routes the release value through a Veneer token, an `aliased` row reads another compatibility variable in its place, a `fallback` row keeps the release value behind a `var()` fallback, a `dropped` row writes no declaration at all, and a `declared` row writes the value in a form or at a value the other members do not name."
   - (a), `:4003`: "After the Showcase region, the regions render in the order the `Showcase` class constructs them; see [showcase mounting and destruction](../tests/app/browser/Showcase.test.ts), which pins that order."
   - (b), `:1020`: "The showcase's Form label region carries a label above its control with the help text the control names as its description, and a horizontal label level with the control beside it at each size and as the legend of a group." — inserted before "The form label proof reads" (`:1023`), and the old § Showcase paragraph beginning "The Form label region carries" is removed (confirmed absent by grep, see claim 3).
   - (f), `/home/user/veneer-cg/tests/src/styles/integration.test.ts:76`: `it('holds the palette paints it reads through the brand retune and moves each with the palette entry', ...)`, case body unchanged (verified lines 76-90 against the surrounding unmodified mount and assert block).

3. **Tokens, counts, banned terms, single occurrence, old title absent** — met.
   - Every code token in the changed lines is followed by a noun: `li` element, `ol` and `ul` elements, `_tokens.scss` partial, `Showcase` class. (The rewrapped `--vn-radius-base` and `--vn-border-width` fragment on `:835-836` predates this edit and follows the guide's custom-property convention.)
   - No count and no unconditionally banned `.claude/rules/writing.md` § Substitutions term appears in any changed line.
   - `grep -n "Form label region carries" guides/veneer.md` returns exactly one hit, at `:1020`, reading "The showcase's Form label region carries…"; `grep -n "^The Form label region carries" guides/veneer.md` returns no match.
   - `grep -rn "every paint on the release blue"` under `/home/user/veneer-cg` (tests and guides) returns no match.

4. **`cg-2-status.txt` names the same three files as `cg-status.txt`, no other** — met. Both list exactly `guides/veneer.md`, `tests/guides.test.ts`, and `tests/src/styles/integration.test.ts`.

Findings outside the claims: none.

VERDICT: PASS
