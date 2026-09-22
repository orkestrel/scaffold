# Audit lane — `analyst` on GPT-6 Astra, objective lane, F8a PROFILES fix round

`analyst` route on GPT-6 Astra (`gpt-6-astra`), `codex exec --sandbox read-only` rooted at
`/home/user/veneer-f8`. You hold the objective lane over the fix round `opus` wrote from
`.orkestrel/veneer/units/f8a-brief-2.md` to close your round-1 findings
(`/home/user/scaffold/.orkestrel/veneer/units/f8a-audit-analyst-verdict.md`: 3, 5, 6, F-INFRA) and
the reviewer's (`/home/user/scaffold/.orkestrel/veneer/units/f8a-audit-reviewer-verdict.md`: F1 to
F7). Perform the audit directly and spawn nothing. Bound: rule within 20 minutes.

Evidence: `.orkestrel/veneer/units/f8a-fix.diff` (the whole diff against `6e74ec9`, untracked
files as additions), `f8a-fix-status.txt`, the report `.orkestrel/veneer/units/f8a-report.md`
(its `## Round 2` section), and the gate chain log `.orkestrel/veneer/units/f8a-fix-gates.log.txt`
(complete when its last line reads `=== gates done`; read it last). The sandbox runs no Vitest
project and no browser; `npm run check` and `node -e` that writes nothing are allowed, and the
installed compiler can be driven from a script under the system temporary directory. Rule a claim
about a proof on the mutation named and whether the assertions distinguish it. Never edit.

## Claims

1. **The imports are proved.** `tests/fixtures/tailwind/unexcluded.css` carries
   `@source inline("px-8 font-bold")`; the case reading the control names from that directive asserts
   the `theme` block declares `--spacing` and `--font-weight-bold` and the `utilities` block declares
   a rule per control name; removing either composable import from the instrument reddens it as the
   report records; the completeness reading subtracts the control names by reading the same
   directive (`collectInlineSources`), so no second list exists; the case `declares the Tailwind
   parts each profile is named for, and repeats them in the instrument` pins `tests/setup.css`'s own
   import lines and holds the instrument's equal, so removing an import from `tests/setup.css`
   reddens the suite.
2. **The standalone case pins no minifier detail.** `tests/src/styles/index.test.ts` derives the
   namespace set, deletes `--lightningcss-`, compares against `['--bs-', TOKEN_PREFIX]`, re-takes the
   reading after the `--tw-probe` plant expecting `['--bs-', '--tw-', TOKEN_PREFIX]`, and its comment
   names the minifier's lowering of `light-dark()` as permitted, not required.
3. **The guide states what Tailwind emits.** § Tailwind's layers column is headed
   `Layers Tailwind fills in a consumer build`; the paragraph after the table states the conditional
   emission (`utilities`, `theme`, `base`, the empty case) and the generated `properties` layer with
   its `@layer properties;` placed ahead of the order line, leaving Veneer's named layers in their
   declared order; the case `places the generated properties layer before the order line, leaving the
   named layers in order` asserts the compiled stylesheet's order
   (`properties, theme, reset, base, elements, components, utilities`) and the document's effective
   order (`theme, reset, base, elements, components, utilities, properties`); rule whether the
   report's deviation (the document order cannot place `properties` before `theme` because the
   cascade is a setup file) is true and whether the guide's consumer-facing statement is true of a
   consumer's single compiled entry; the restated case `declares the one order line in every profile,
   and leaves the document order unmoved` reads the instrument's order line behind the generated
   statement.
4. **No hidden helpers.** `tests/tailwind/profiles.test.ts` declares no module-scope function;
   `collectSheetRules`, `loadSheet`, `readLayerStatement`, `collectFilledLayers`,
   `collectSelectors`, `collectClassNames`, `collectInlineSources`, and `InlineSource` are exported
   from `tests/setupBrowser.ts`, inventoried, and each has a case in `tests/setupBrowser.test.ts`;
   `collectLayerOrder` and `collectCustomProperties` route through `collectSheetRules`;
   `collectClassNames` uses the wrapper's candidate grammar. Rule on the `collectSheetRules` control
   (a real `CSSStyleSheet` with a `cssRules` getter that throws `SecurityError`): is it an inert
   platform stub the rules permit, or a behavioural fake of project-owned behaviour they forbid?
5. **The reviewer's findings are closed.** `CASCADE_PREFIX` is gone and `TOKEN_PREFIX` is used
   (`grep -rn 'CASCADE_PREFIX' tests configs guides` prints nothing); the § Tailwind closing
   paragraph states the derived-list scan and the empty emission; one sentence states the exclusion
   line's membership rule (important wins by importance and needs no entry; a normal declaration is
   named on the line); the one-home sentence is replaced by what holds and the case `holds every
   written copy of the exclusion line equal to the profile that declares it` reads `guides/veneer.md?raw`
   and `tests/fixtures/tailwind/preflight.css?raw` and asserts each `@source not inline(...)` directive
   equals `tests/setup.css`'s (measured at two guide directives and one fixture directive: verify the
   count by reading the files); each recipe fence carries `/* Your own markup directory. */` above its
   `@source './src';` line and the sentence naming it precedes the first fence; one sentence records
   that no proof compiles the recipes as shipped and that F8b lands the executed consumer-shaped
   profile; § Files carries rows for the wrapper, `tests/setup.css`, `tests/fixtures/tailwind/`, and
   `tests/tailwind/`; `REACHED` is `FLOOR_SELECTORS`; the entry column is `Entry`; the link sentence
   introduces its link with `see`; the reader case is retitled.
6. **Scope is honest.** The status lists the five tracked files and the four untracked paths of
   round 1 and nothing else; `tests/src/tailwind/` and `tmp/probe/` are absent; `package-lock.json`,
   `src/**`, `tests/setupStyles.ts`, `configs/helpers.ts`, and the vendored files are untouched.
7. **The gate chain is green**, `test:src:tailwind` included (UNRESOLVED if the log lacks
   `=== gates done` when you read it).

Output: the `orkestrel-falsify` verdict shape — numbered verdicts with `file:line`, findings outside
the claims to the `BROKEN` standard, and one terminal line `VERDICT: PASS` or
`VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
