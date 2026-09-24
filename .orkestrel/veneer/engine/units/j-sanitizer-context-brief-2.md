# Unit J-SANITIZER-CONTEXT, round 2 — the constants where the kind rule puts them, and the parse's true bound

Successor of `j-sanitizer-context-brief.md`, whose every section stands except what follows. What changed and why: the audit (`units/j-sanitizer-context-audit-verdict.md`; `analyst` on Astra, thread `01a0d5ac-5650-7422-95e1-ea935b636e05`, and `checker` on Sonnet) confirmed the integration-point test, the text-integration-point exception, the unchanged routes, and the prototype reads, and failed two claims:
- **Claim 7 (both lanes).** `ConfigSanitizer.ts` inlines the MathML and SVG namespace URIs and the `['foreignObject', 'desc', 'title']` table, which AGENTS.md § Centralize by kind and `architecture.md` § Kind purity place in `src/browser/constants.ts`. The round-1 brief's hold on `tests/src/browser/index.test.ts` pushed them inline; this round grants that file.
- **Claim 1 (objective lane).** The class remarks say the standard parses an integration point's markup "as the body of an HTML element", and that is not exact. In the standard's fragment algorithm, while the adjusted current node is still the context element (before the first element opens), an end tag goes through the foreign-content rules, where a stray end tag is ignored, and a CDATA section is admitted as text. In a `div` context, `</p>` inserts an empty `p`, `</br>` inserts a `br`, and a CDATA section becomes a bogus comment, which the walk removes. Your round-1 measurement read the copy and the `div` alike on Chromium 153 for CDATA and for `</p>`, `</br>`, and `</annotation-xml>`. So the build and the standard may differ there, and the prose must state what is measured and what the standard says.

## Objective

Move the constants to `constants.ts`, and make the remarks and the guide state the walk's parse exactly, with a case that pins the walk's output for the inputs where the standard's integration-point parse and a `div` parse differ.

## The obligations

- **R1 Constants.** In `src/browser/constants.ts`, beside `SANITIZER_NAMESPACE`, add:
  - `SANITIZER_MATHML_NAMESPACE` and `SANITIZER_SVG_NAMESPACE`;
  - a frozen table of the SVG HTML-integration-point names;
  - a frozen table of the `encoding` values that make `annotation-xml` an integration point.

  Give each a TSDoc summary in the file's voice, and replace every inline copy of those URIs in `constants.ts`, the `SANITIZER_BASELINE` entries included. `ConfigSanitizer.ts` imports them. Add each new export to the barrel's export list in `tests/src/browser/index.test.ts`, and add a guide § Surface row for each, with a Summary cell equal to its TSDoc. Where names.md's rules for constants and tables give a name other than these, use it and record why.
- **R2 The exact bound.** Before editing, measure on Chromium 153, both targets, and the native path where the target has `setHTML`: `<![CDATA[x]]>`, `</p>x`, `</br>x`, and `x</annotation-xml>y`, each written into an `annotation-xml encoding=text/html` target and a `foreignObject` target. Record for each the tree from the round-1 walk (the copy), from the round-2 walk (the `div`), and from `setHTML`.
  - Rewrite the class `@remarks` sentence and the guide's `ConfigSanitizer` paragraph to state what the code does: the walk parses an integration point's markup in an HTML `div`, which builds the build's own integration-point tree for every input you measured.
  - Name the standard's difference as a bound: a CDATA section, `</p>`, or `</br>` before the first element, where the standard keeps CDATA text and ignores a stray end tag. State the outcome within the configuration.
  - Add one case that pins the walk's output for those inputs on both targets, with the native path's reading beside it where this host has `setHTML`.
  - Cite HTML Standard § 13.2.6 (the tree construction dispatcher and the foreign-content rules) and § 13.2.5.42 (the markup declaration open state).
- **R3 Unchanged.** The mechanism, the integration-point test, and every round-1 case stay. Re-run round 1's instrument and add rows for R1's constants: a changed namespace constant, and a table missing an entry, each reddening its case.

## Scope (replaces round 1's where it differs)

**Owned.** `src/browser/sanitizers/ConfigSanitizer.ts`; `src/browser/constants.ts` (R1's constants and the `SANITIZER_BASELINE` URI replacements); `tests/src/browser/sanitizers/ConfigSanitizer.test.ts`; `tests/src/browser/index.test.ts` (the export list only); `guides/veneer.md` (the `ConfigSanitizer` paragraph and R1's Surface rows only); `tmp/j-sanitizer-context/**`.

**Off-limits.** As round 1, less `tests/src/browser/index.test.ts`.

## Output

Your final message: the files touched; R2's measurement table; the rewritten remarks and guide sentences; R1's constants with their summaries; each case's reading; the mutation table; the acceptance output (`check:src:browser`, oxlint and oxfmt over the owned files, `ConfigSanitizer.test.ts` and `index.test.ts`, `test:guides`, `test:policy`); `git status --short`; the deviation state.

## Acceptance criteria

1. The static gates exit 0 over the owned files.
2. No MathML or SVG namespace URI is left inline in `src/browser/**` outside `constants.ts`, and no inline copy is left in `constants.ts` beside its constant.
3. `ConfigSanitizer.test.ts`, `index.test.ts`, `test:guides`, and `test:policy` pass.
4. The instrument reddens each row this host can see, the control survives, and the sources restore byte for byte.
5. The status lists only owned files.

Perform the assignment directly and spawn nothing. Commit nothing.
