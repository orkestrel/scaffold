# U1-conform audit round 2 — checker brief

## Role and engine

`checker` on native Sonnet, clean context. Mechanical conformance alone. Perform the assignment
directly and spawn nothing. You edit nothing and run nothing; you have no write tools and no shell.

## Objective

Check the mechanically checkable claims of
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u1-conform-audit-claims-2.md` — that file
alone fixes the claim numbers — and report each check as `PASS` or `FAIL` with the exact site.
Read the live Veneer tree (`C:/Users/mikes/WebstormProjects/veneer`) and the rendered diff
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u1-conform-diff-2.patch.txt`, never the report
alone. The checks:

- **Presence.** In `app/browser/styles/index.scss`: a `@use` line for the shell partial, no
  `sass:meta`, no `meta.load-css`, no `@layer` statement. In `app/browser/styles/_shell.scss`: the
  first statement is `@layer shell;`, no `body` rule, every rule inside `@layer shell { … }`. In
  `tests/setupBrowser.ts`: `mountShowcase` loads `../src/styles/index.scss` and then
  `../app/browser/styles/index.scss`, in that order. In `tests/setupConformance.test.ts`: a case
  whose input is ``require(`bootstrap`)`` expecting `['bootstrap']`, and controls for a
  substitution and an identifier. In `tests/guides.test.ts`: no `it` title containing `scheme`.
  In `guides/veneer.md` `## Tests`: a link to `tests/app/browser/Showcase.test.ts`. In
  `tests/setupBrowser.ts`: `readCascadeSheet` and `collectLayer` each declare a `sheets` parameter
  defaulting to `document.styleSheets`, and the module exports no name the round-1 tree did not.
  In `tests/setupConformance.ts`: `extractStringArgument` is exported and both the
  `ImportExpression` and the `require` branches call it.
- **The diff's population.** Compare every `index <old>..<new>` blob line of the round-2 patch
  against `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u1-conform-diff.patch.txt`
  (round 1): report every file whose pair differs, and confirm each is one the brief owns
  (`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u1-conform-brief-2.md`
  § Scope and `u1-conform-brief-3.md` § Scope). Confirm `tmp/audit/u1-conform-status-2.txt` equals the round-1 status
  (`units/u1-conform-status.txt`) plus nothing, or name each added row.
- **Law over the added lines.** Grep the round-2 patch's added lines for `: any`, `as ` outside
  `as const`, `!.`/`!)`/`!;`, `@ts-`, `eslint-disable`, `export default`; report every hit.

## Output

A table `Claim | Check | PASS/FAIL | Site`, one row per check; then one line naming any file whose
blob pair differs from round 1 that the brief does not own. No verdict line, no process diary.
