# Test-paint audit — checker brief

## Role and engine

`checker` on native Sonnet, clean context. Perform the assignment directly and spawn nothing.
You edit nothing and run nothing; you have no write tools and no shell.

## Objective

Rule mechanically on the claims
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/test-paint-audit-claims.md` marks as
mechanical — claims 2, 9, 10, and 11 — with `CONFIRMED`, `REFUTED`, or `UNDECIDABLE` and the
deciding evidence (`file:line` or exact text). Rule on no other claim. That file alone fixes the
claim numbers.

## Evidence

The Orchestrator rendered the diff over the Test checkout's `ed9b102` at
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/test-paint-diff.patch.txt` and the status at
`tmp/audit/test-paint-status.txt`. Read those and the live Test tree at
`C:/Users/mikes/WebstormProjects/test` (`src/browser/helpers.ts`, `src/browser/index.ts`,
`src/browser/types.ts`, `tests/src/browser/helpers.test.ts`, `guides/test.md`,
`package.json`). Read the retained report
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/test-paint-report-2.md` only to
learn what the unit claims; rule on the tree.

## Probes

- Claim 2: list every `export function convert*` in the diff and match each against a case in
  `tests/src/browser/helpers.test.ts` that calls it and compares with a browser control; confirm
  `src/browser/index.ts` is unchanged in the diff and star-exports `./helpers.js`.
- Claim 9: for every added or changed row in `guides/test.md` § Surface, compare the Summary
  cell with the description paragraph of the matching doc block in `src/browser/helpers.ts`
  (whitespace collapsed, a `{@link}` written as its target's code token); name any pair that
  differs.
- Claim 10: `package.json` and `src/browser/types.ts` absent from the diff; the status file's
  lines are exactly the three named paths.
- Claim 11: sweep the diff's added lines for `: any`, `as ` (outside a string or comment),
  `!.`, `!)`, `@ts-`, `eslint-disable`, `it.skip`, `it.todo`, `it.fails`, `test.skip`, and
  `describe.skip`; list every module-scope function added by the diff and whether it is exported
  and has a test; name any added helper whose name does not take the `{verb}{Noun}` form; name
  any nested function declaration outside an anonymous callback passed as an argument or
  returned as a result.
- Installed-primitive probe: for every added helper name, state whether
  `C:/Users/mikes/WebstormProjects/test/node_modules/@orkestrel/contract/dist/src/index.d.ts`
  exports a symbol doing the same job (a colour conversion or parser); name any overlap.

## Law

Scaffold's `AGENTS.md` (§ Non-negotiable rules, § Design laws), `.claude/rules/names.md`
(§ helper prefix table), `architecture.md`, `typescript.md`, `tests.md`, `documentation.md`
(§ Parity). A wording finding is a bound, never a round-forcer.

## Output

A table `Claim | Verdict | Evidence` over claims 2, 9, 10, and 11; the probe readings; extra
findings numbered from 13 with a site (or "none found"); then exactly one terminal line:
`Verdict: accept` or `Verdict: fix round` with the claim numbers that force it. No process diary.
