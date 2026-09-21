# Prose bounds carried to the next unit that owns each file (user ruling 2026-09-20)

## guides/veneer.md § Styles (carrier: U7's guide item, or the next unit editing the section)

- Proof-subject sentence (after the scripts table): narrow "the cases that read the shipped
  cascade" to "the cases that read that file", because `tests/src/styles/tokens.test.ts` also
  reads a second built stylesheet through a raw import; name no RTL artifact.
- Departures' opening sentence: "in each of its tables" overclaims; the workspace-proof and
  script tables of `.claude/rules/workspace.md` carry no styles row; limit to the tables named.
- Contractions in a guide (`writing.md` § Voice): "is not" → "isn't" (line ~154), "cannot" →
  "can't" (line ~167); make the wrapper the acting subject where "is declared" appears (lines
  ~163, ~165).
- Register: the package's bare-token register is a package-wide pass (reviewer bound from
  U1-conform round 2); never sentence by sentence.

## tests/setupBrowser.ts (carrier: next unit owning it)

- `collectLayer`'s `@throws` line and thrown text now agree (`The sheets carry no Veneer cascade`).
  No open bound.

## app/browser (carrier: U7, which owns the shell pass)

- A constructor that mounts, and `void new Showcase(document.body)` in the entry: design question
  for U7 (U1-conform round 2 bound 13).
- `Showcase.ts` constructor/`#mount` seam splits the button's setup (U1-conform round 1 bound 11).

## guides/veneer.md § Tokens and § Styles (carrier: U7e; from the U7d round, reviewer finding 22)

- `### Deferred names` under § Tokens (`Name | Waiting on`) and `### Deferred selectors` under
  § Styles (`Name | Owner | Reason`) name one idea with two shapes. Decide one deferral grammar
  for the guide, or state in each subsection why its shape differs; the readers
  (`readDeferrals` in `tests/setupConformance.ts`, the tokens reader from U3) follow the guide.
- An overlong prose line at `guides/veneer.md:543` (reviewer finding 21); wrap to the paragraph's
  width.

- U7c guide bounds 1 to 10 and the out-of-scope findings: see `u7c-guide-bounds.md` beside this file (retained as `.orkestrel/veneer/units/u7c-guide-bounds.md`).
