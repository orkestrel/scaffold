# Unit U1-fix — successor brief 7

## What this supersedes

This brief supersedes `tmp/units/u1-fix-brief-6.md`; successors 1 to 6 stand as landed in
`e9f2a2f`. Same role and engine: `builder` on native Sonnet, sole writer in
`C:/Users/mikes/WebstormProjects/veneer` (clean at `e9f2a2f`), performing the assignment directly
and spawning nothing. No `git` command that writes.

## Why a successor

Round 5's objective lane (`units/u1-fix-5-audit-reviewer-report.md`) found two readings the
successor-5 diff introduced and four documentation defects, and referred one scope gap and one
naming question, ruled here.

## Rulings

- **`EDGE_KEYWORD_PROPERTIES` merges into `SIDE_KEYWORDS`'s property set.** `float` and `clear`
  join `text-align`, `background-position`, and `background` under one constant naming the
  properties whose side keyword is checked (`SIDE_KEYWORD_PROPERTIES`), with one branch; the
  duplicate constant and branch go.
- **R6 is a recorded limit, not a rule.** The guard covers the ruled property families; gradient
  directions, shadow offsets, and transforms are not scanned. `scanPhysicalDeclaration`'s TSDoc
  names that limit in one sentence, and the cascade case's name stays as it is. U3 rules that class
  when it lands declarations.

## Fixes

1. **Lowercase the value** (N11). `matchesDirectionSensitive` lowercases the value once before
   splitting and passes the lowercased tokens to every predicate; `scanPhysicalDeclaration`
   still returns the value in postcss's original case; the `@param value` description says the
   comparison is case-insensitive. Fixtures: `text-align:RIGHT` flagged (returning
   `text-align: RIGHT`), `float:LEFT` flagged, `margin:0 1PX 0 1px` permitted.
2. **A bare `/` is its own token** (N12). `splitTopLevelValues` emits a top-level `/` (outside
   parentheses and quotes) as a separate token whatever the surrounding spacing, so
   `matchesRadiusShorthand`'s `indexOf('/')` finds it; a `/` inside parentheses stays inside its
   token (`calc(1px/2)` is one token). Fixtures: `border-radius:1px 1px/2px 2px` permitted,
   `border-radius:1px 2px/3px 3px` flagged, `splitTopLevelValues('1px 1px/2px 2px')` →
   `['1px', '1px', '/', '2px', '2px']`, `splitTopLevelValues('calc(1px/2) 3px')` → two tokens.
3. **One side-keyword constant and branch** (N13): per the ruling above; update the export-set
   assertion; keep the `float`/`clear` fixtures.
4. **TSDoc** (N14, N15): `matchesDirectionSensitive`'s `@returns` states the full condition in
   the block (physical longhand; or a side-keyword property with a `left` or `right` token; or an
   edge shorthand with four tokens whose second and fourth differ; or `border-radius` with an
   asymmetric side; `false` otherwise); `matchesRadiusShorthand`'s two-token clause reads "two
   differing tokens in a two-token side"; `scanPhysicalDeclaration` names the R6 limit.
5. **Report record** (N16). In `tmp/units/u1-fix-report.md`: under `### Deviation` in
   `## Successor 5` and at the `border-radius:1px 2px 1px / 3px 3px 3px` row, add a one-line
   note "superseded by ## Successor 6, which corrected the rule and the fixture"; replace the
   temporal "now flags" with "flags"; then append `## Successor 7`.
6. **Gates.** `npm run format:check`, `lint:check`, `check`, `test:setup`, `test:src:styles`,
   `test:policy`.

## Scope

**Owned.** `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, `tmp/units/u1-fix-report.md`.
**Off-limits.** Everything else. Check every new or renamed export against the hosted guides'
`Surface` rows and record the check.

## Output

Append `## Successor 7` to `tmp/units/u1-fix-report.md`: the export set, the new fixture
readings, the name checks, the gate readings, and `git status --porcelain`; return that section.

## Acceptance criteria

1. The gates in step 6 exit 0.
2. Every fixture above reads as specified and every earlier fixture still passes.
3. `git status --porcelain` lists only `tests/setupStyles.ts` and `tests/setupStyles.test.ts`.
