# u7d-bounds audit — checker brief

## Role and engine

`checker` on native Sonnet, clean context. Perform the assignment directly and spawn nothing.
You edit nothing and run nothing; you have no write tools and no shell.

## Objective

Rule mechanically on the claims
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u7d-bounds-audit-claims.md` marks
`[mechanical]` with `CONFIRMED`, `REFUTED`, or `UNDECIDABLE` and the deciding evidence
(`file:line` or exact text). Rule on no other claim. That file alone fixes the claim numbers.

## Evidence

The Orchestrator rendered the diff over the Veneer checkout's `7da6bb1` at
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u7d-bounds-diff.patch.txt` and the status at
`tmp/audit/u7d-bounds-status.txt`. Read those and the live Veneer tree at
`C:/Users/mikes/WebstormProjects/veneer` (`tests/setupBrowser.ts`, `tests/setupBrowser.test.ts`,
`tests/setupStyles.ts`, `tests/setupStyles.test.ts`, `tests/setupConformance.ts`,
`tests/setupConformance.test.ts`). Read the retained report
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u7d-bounds-report.md` only to
learn what the unit claims; rule on the tree.

## Probes

- Scope: the status file's tracked lines are a subset of the six files named in the preceding
  paragraph; `src/**`, `app/**`, `guides/**`, `package.json`, `vite.config.ts`, `configs/**`,
  `tests/src/**`, `tests/app/**`, `tests/conformance.test.ts`, and `tests/fixtures/**` are absent
  from the diff.
- Doc blocks: in the `readPaintedColor` and `matchesPaintedColor` doc blocks as landed, quote
  every sentence that names what the installed `parseCSSColor`, `parseColor`, or `matchesColor`
  does or cannot do, and beside each write whether
  `node_modules/@orkestrel/test/dist/src/browser/index.d.ts` (under Veneer) and the doc blocks it
  carries support it; name any sentence still claiming a modern colour function comes back
  unread.
- Cases: list the `it(` titles in `tests/setupBrowser.test.ts` as landed against those at
  `7da6bb1` (the diff's removed and added `it(` lines); confirm no title names a control.
- Letter of the law: sweep the diff's added lines for `: any`, ` as ` (outside a string,
  comment, or `as const`), `!.`, `!)`, `@ts-`, `eslint-disable`, `it.skip`, `it.todo`, `it.fails`,
  `test.skip`, `describe.skip`; list every module-scope function the diff adds with whether it is
  exported and tested; name any nested function declaration outside an anonymous callback passed
  as an argument or returned as a result.
- Installed-primitive probe: for every helper the diff adds, state whether the installed
  declaration entries export a symbol doing the same job
  (`node_modules/@orkestrel/test/dist/src/browser/index.d.ts`, `dist/src/core/index.d.ts`,
  `node_modules/@orkestrel/contract/dist/src/core/index.d.ts`, all under Veneer); name any
  overlap.

## Law

Scaffold's `AGENTS.md` (§ Non-negotiable rules, § Design laws), `.claude/rules/names.md`,
`typescript.md`, `tests.md`. A wording finding is a bound, never a round-forcer.

## Output

A table `Claim | Verdict | Evidence` over the mechanical claims; the probe readings; extra
findings numbered after the last claim with a site (or "none found"); then exactly one terminal
line: `Verdict: accept` or `Verdict: fix round` with the claim numbers that force it. No process
diary.
