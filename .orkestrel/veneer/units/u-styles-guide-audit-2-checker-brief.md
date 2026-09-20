# U-styles-guide audit round 2 — checker brief

## Role and engine

`checker` on native Sonnet, clean context. Mechanical conformance alone. Perform the assignment
directly and spawn nothing. You edit nothing and run nothing; you have no write tools and no shell.

## Objective

Check the mechanically checkable claims of
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u-styles-guide-audit-claims-2.md` — that file
alone fixes the claim numbers — against the live Veneer tree (`C:/Users/mikes/WebstormProjects/veneer`)
and the rendered diff `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u-styles-guide-diff-2.patch.txt`
(over `fbbda43`), never the report alone. Report each check as `PASS` or `FAIL` with the exact
site:

- **The count.** The `## Styles` section's first sentence contains `./styles` and not
  `one standalone`.
- **The tokens.** Over lines 73 to the line before `## Tokens` in `guides/veneer.md`, list every
  backticked token that is followed by a period, a comma, a closing parenthesis, or the words
  `permits`, `builds`, `instead`, `is`, `are`, `loads`, `reaches`, `names`, `carries`, `declares`,
  `emits`, `runs`, `refuses` (a verb or a stop with no noun between); report each with its line.
  A token inside a table cell that is the whole cell, and a token that opens a sentence as its
  subject with a kind word after it, are permitted.
- **The list form.** Under `### Departures from the workspace rows`, no line begins with a digit
  followed by a period; each departure line begins with `- **`.
- **The attribution.** The departure on the environment boundary contains
  `configs/src/vite.core.config.ts` and `src/core`, and states `src/browser` and `app/browser`
  with `srcBrowser` and `appBrowser`.
- **The proof subject.** The sentence after the scripts table contains `mixin` and `fixture` and
  does not contain `every case`.
- **The replaced fields.** The `### Files` paragraph on the wrapper contains `build options` and
  `build-log handler`.
- **The rows.** The departures' opening sentence contains `src/styles/` and `@src/styles` and not
  `` `src:styles` row``.
- **The diff's population.** Compare every `index <old>..<new>` blob line of the round-2 patch
  against `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u-styles-guide-diff.patch.txt`
  (round 1): the only pair that differs is `guides/veneer.md`; `guides/README.md`'s pair is
  identical. Confirm `tmp/audit/u-styles-guide-status-2.txt` equals the round-1 status row for
  row. In `guides/veneer.md`'s hunks, every changed line sits between `## Styles` and `## Tokens`.
- **`rtl`.** A case-insensitive grep of `guides/veneer.md` lines 73 to the line before
  `## Tokens` for `rtl`: no hit.

## Output

A table `Check | PASS/FAIL | Site`, one row per check, with the token list under the tokens row.
No verdict line, no process diary.
