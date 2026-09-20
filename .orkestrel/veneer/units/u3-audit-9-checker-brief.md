# U3 audit round 9 — checker brief

## Role and engine

`checker` on native Sonnet, clean context. Mechanical conformance alone: export presence, line
widths, word sweeps, law sweeps, digest and unchanged-file readings, scope honesty. Perform the
assignment directly and spawn nothing. You edit nothing and run nothing; you have no write tools
and no shell.

## Objective

Check the mechanically checkable claims of
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u3-audit-claims-9.md` — that file alone fixes
the claim numbers — and report each check as `PASS` or `FAIL` with the exact site. The checks:

- **Claim 2, the export list.** Grep `C:/Users/mikes/WebstormProjects/veneer/tests/setupStyles.ts`
  for `extractCompoundAlternatives`, `extractSelectorSubject`, `extractBareTag`,
  `mergeCompoundTags`, `expandCompoundSelector`, `expandComplexSelector`, and
  `dropTaglessCompounds`: none is declared, exported, or named in a comment. Grep
  `tests/setupStyles.test.ts` for the same names: none is imported or named in a case title.
- **Claim 3, the reader list.** Read the `walkSelector` TSDoc block. List every function in
  `tests/setupStyles.ts` whose body calls `walkSelector`, and compare that list plus
  `readIdentifier` against the names the TSDoc lists: report any name in one set and not the
  other.
- **Claim 4, line widths and words.** Report every line of either file longer than 100
  characters (count characters, not bytes; the diff at
  `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u3-diff-9.patch.txt` shows the lines the unit
  touched, and the live file is the authority). Grep both files case-insensitively for `tagless`:
  no hit. Grep both files for the substring `cannot pass as a permitted selector`: no hit.
- **Claim 5, law sweeps.** Grep both files for `: any`, `<any>`, `as any`, ` as ` outside
  `as const`, a non-null `!` after an identifier or `)` (not `!==` or `!=`), `@ts-`,
  `eslint-disable`, `export default`, and a `function` keyword or `=>` declaration nested inside
  another function body other than an anonymous callback passed as an argument. Report each hit
  with its line. Confirm `tests/src/styles/index.test.ts` appears nowhere in the rendered diff
  and `tmp/audit/u3-status-9.txt` carries no row for it.
- **Claim 6, scope honesty.** Compare every path in
  `C:/Users/mikes/WebstormProjects/scaffold/tmp/audit/u3-status-9.txt` against the files the
  briefs own or grant: `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u3-brief-4.md`
  § Scope, and the successor briefs `u3-brief-5.md` through `u3-brief-12.md` beside it, plus the
  two integrated patch sites `configs/src/vite.styles.config.ts` and `tests/distribution.test.ts`.
  Name any path no brief owns.

Read the live Veneer tree (`C:/Users/mikes/WebstormProjects/veneer`) and the rendered diff, never
the reports alone. Claims 1 and 7 are not yours: claim 1 is a behavioural reading the lanes
execute, claim 7 the Orchestrator rules from the verifier.

## Output

A table `Claim | Check | PASS/FAIL | Site`, one row per check; the reader-list comparison as two
name lists; then one line naming any path in the status that no brief owns. No verdict line, no
process diary.
