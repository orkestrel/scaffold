# U1 round-4 audit report, objective lane (reviewer, native Opus 5, 2026-09-20, 314 s), Veneer `a0447d2..bd4284c`

**1. `scanPhysicalDeclaration` implements the scope ruling over a postcss parse — CONFIRMED** (walkDecls stops on `false`; comments and strings never reach the predicate; `decl.value` excludes `!important`; the longhand, keyword, edge, and radius predicates reproduce the ruling; no permitted form inside the ruling is flagged). Forms escaping trace to the ruling: R1 to R5.

**2. `splitTopLevelValues` — PARTLY CONFIRMED.** Nested parentheses correct; commas never separators (matches the ruling); quoted strings not handled — N9.

**3. The cascade case can no longer pass on an empty population — CONFIRMED** (`parse('')` yields no nodes, so the `@layer` assertion fails on an unbuilt or empty file); the scan still runs over zero declarations today and the case name records that coverage begins with U3 (N6's "record the gap" branch).

**4. N4, N5, N6, N7 — closed** at their sites; the hidden-declaration class reappears as N8.

**5. postcss is the declared tooling, not a second parser — CONFIRMED** (`package.json:108`; the change removes the hand-written regexes; no installed `@orkestrel/*` package exports a CSS-text scanner; the named import avoids `no-named-as-default-member`).

## Findings

**N8 (required).** `tests/setupStyles.ts:69,76,98,102` — four module-scope predicates neither exported nor tested; `policy/no-hidden-declaration` is scoped to `app/**` and `src/**` so lint cannot see it. Export and prove them.

**N9 (required, low).** `splitTopLevelValues` is not quote-aware and never clamps depth below zero.

**N10 (required, low).** The `@returns` of `scanPhysicalDeclaration` omits that the property is lowercased and the value is as postcss reports it.

## Scope-ruling questions referred to the Orchestrator

R1 three-value `border-radius` (third versus second); R2 the elliptical slash form; R3 the `background` shorthand keyword; R4 `float: none`, `clear: none|both`, symmetric `left`/`right` pairs; R5 `-` treated as a word boundary flags `var(--left-offset)`.

## Observations

Scope honoured; the six new names are free in the hosted guides; the brief's gate list omits `test:policy` and the whole-suite `test` (the verifier covers them); `parse` throws `CssSyntaxError` on unparseable input, which is correct for a guard and not yet named in the TSDoc.

Verdict: fix round — N8 forces it, with N9 and N10 carried into the same successor and R1 to R5 referred to the Orchestrator.
