# U1-conform audit round 3 — checker brief

## Role and engine

`checker` on native Sonnet, clean context. Mechanical conformance alone. Perform the assignment
directly and spawn nothing. You edit nothing and run nothing; you have no write tools and no shell.

## Objective

Check the mechanically checkable claims of
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u1-conform-audit-claims-3.md` — that file
alone fixes the claim numbers — and report each check as `PASS` or `FAIL` with the exact site.
Read the live Veneer tree (`C:/Users/mikes/WebstormProjects/veneer`) and the rendered diff
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u1-conform-diff-3.patch.txt`, never the report
alone. The checks:

- **Presence.** In `tests/setupConformance.ts`: the `import type { ESTree } from 'vite'` line
  precedes every value import; `parseSync(` is called with a third argument carrying
  `preserveParens: false`. In `tests/setupConformance.test.ts`: assertions whose inputs are
  ``require((`bootstrap`))``, `require(("bootstrap"))`, ``import((`bootstrap`))``, and
  ``(require)(`bootstrap`)``, each expecting `['bootstrap']`. In `tests/setupBrowser.ts`: the
  string `The named sheets carry no Veneer cascade` in `collectLayer` and in its `@throws` line,
  and no `The document loaded no Veneer cascade` in that file. In `tests/setupBrowser.test.ts`:
  one `toThrow('The named sheets carry no Veneer cascade')`. In `app/browser/Showcase.ts`: no
  `behaviour`.
- **The diff's population.** Compare every `index <old>..<new>` blob line of the round-3 patch
  against `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u1-conform-diff-2.patch.txt`
  (round 2): report every file whose pair differs, and confirm each is one brief 4 owns
  (`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u1-conform-brief-4.md`
  § Scope). The five untracked files are rendered with `git diff --no-index` and carry no `index`
  line: compare their hunks between the two patches instead, and confirm only
  `app/browser/Showcase.ts` differs, by the one word `behaviour` to `behavior`. Confirm
  `tmp/audit/u1-conform-status-3.txt` equals the round-2 status (`units/u1-conform-status-2.txt`)
  row for row.
- **Law over the added lines.** Grep the round-3 patch's added lines for `: any`, `as ` outside
  `as const`, `!.`/`!)`/`!;`, `@ts-`, `eslint-disable`, `export default`; report every hit.

## Output

A table `Claim | Check | PASS/FAIL | Site`, one row per check; then one line naming any file whose
blob pair differs from round 2 that brief 4 does not own. No verdict line, no process diary.
