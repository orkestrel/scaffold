# Unit U1-fix — successor brief 5

## What this supersedes

This brief supersedes `tmp/units/u1-fix-brief-4.md`; briefs 1 to 4 stand as landed in `bd4284c`.
Same role and engine: `builder` on native Sonnet, sole writer in
`C:/Users/mikes/WebstormProjects/veneer` (clean at `bd4284c`), performing the assignment directly
and spawning nothing. No `git` command that writes.

## Why a successor

Round 4 (`u1-fix-audit-verdict.md` § Round 4) confirmed the postcss scanner against every fixture
and found: four unexported module-scope predicates in `tests/setupStyles.ts` (N8, the checker
too); a splitter that is not quote-aware and never clamps depth (N9); a `@returns` that omits the
lowercasing (N10); and five forms the Orchestrator's scope ruling itself left open (R1 to R5),
ruled below. The Orchestrator already replaced the report's remaining count phrases.

## Amended scope ruling on direction sensitivity

Replace brief 4's ruling with this one. A declaration is direction-sensitive when, with the
property lowercased and the value split into top-level tokens (whitespace outside parentheses
and outside quoted strings; `!important` is not part of the value):

- the property is one of `margin-left`, `margin-right`, `padding-left`, `padding-right`, `left`,
  `right`, `border-left`, `border-right`, `border-left-width`, `border-right-width`,
  `border-left-style`, `border-right-style`, `border-left-color`, `border-right-color`,
  `border-top-left-radius`, `border-top-right-radius`, `border-bottom-left-radius`,
  `border-bottom-right-radius`, `background-position-x` — flagged unconditionally (R4: a
  symmetric `left`/`right` pair is still two physical declarations, and the cascade authors
  logical ones);
- the property is `float` or `clear` and a token is `left` or `right` (R4: `none` and `both`
  are permitted);
- the property is `text-align`, `background-position`, or `background` and a token equals
  `left` or `right` exactly (R3 adds `background`; R5: a token such as `var(--left-offset)` is
  not the keyword);
- the property is `margin`, `padding`, `inset`, `border-width`, `border-style`, or
  `border-color` with four tokens whose second and fourth differ;
- the property is `border-radius`: split the token list at a bare `/` token into one or two
  sides (R2) and for each side with tokens `a b`: flagged when `a` differs from `b`; `a b c`:
  flagged when `a` differs from `b` or `c` differs from `b` (R1); `a b c d`: flagged when `a`
  differs from `b` or `c` differs from `d`; one token: permitted.

## Fixes

1. **Export and prove the predicates** (N8). In `tests/setupStyles.ts`, every module-scope
   function is exported with a TSDoc block opening with a third-person verb and stating its
   return; rename them to the `matches*` predicate form (`names.md` § helper prefixes):
   `matchesEdgeShorthand(values)`, `matchesRadiusShorthand(values)` (taking the token list, and
   splitting on the bare `/` inside), `matchesSideKeyword(values)` (a token equal to `left` or
   `right`), `matchesDirectionSensitive(prop, value)`; `scanPhysicalDeclaration` composes them.
   Add the `float`/`clear` and `background` cases per the amended ruling.
2. **Quote-aware splitter** (N9). `splitTopLevelValues` tracks single- and double-quote state
   beside paren depth, never lets depth go below zero, and its `@returns` states the contract.
3. **Return wording** (N10). `scanPhysicalDeclaration`'s `@returns` states: the property
   lowercased, then `: `, then the value as postcss reports it, without `!important`; and its
   `@throws` names the `CssSyntaxError` postcss raises on unparseable input.
4. **Proof** in `tests/setupStyles.test.ts`: update the export-set assertion; one case per
   exported predicate with a true and a false reading each; splitter fixtures for
   `0 "a b" 0 1px` (four tokens), `url("a)b") 1px` (two tokens), and `0 1px)` (no throw, the
   remainder handled); scanner fixtures added for the amended ruling — flagged:
   `border-radius:1px 1px 3px`, `border-radius:1px 2px / 3px 3px`, `background:#fff left center no-repeat`,
   `float:left`, `clear:right`; permitted: `float:none`, `clear:both`,
   `border-radius:1px 2px 1px / 3px 3px 3px`, `background-position:var(--left-offset) center`,
   `border-radius:1px 1px 1px`. Keep every earlier fixture.
5. **Gates.** `npm run format:check`, `lint:check`, `check`, `test:setup`, `test:src:styles`,
   `test:policy`.

## Scope

**Owned.** `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, `tmp/units/u1-fix-report.md`
(append `## Successor 5`). **Off-limits.** Everything else. Before naming an export, check it
against every `Surface` row in `node_modules/@orkestrel/scaffold/dist/host/guides/*.md` and
record the check.

## Output

Append `## Successor 5` to `tmp/units/u1-fix-report.md`: the export set, each predicate's true
and false readings, every new fixture's reading, the name checks, the gate readings, and
`git status --porcelain`; return that section.

## Acceptance criteria

1. The gates in step 5 exit 0.
2. `tests/setupStyles.ts` has no unexported module-scope declaration besides its side-effect
   import, and every export has a proof.
3. `git status --porcelain` lists only the two owned test files.
