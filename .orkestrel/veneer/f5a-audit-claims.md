# Audit claims — F5a ACCOUNTING-SPLIT in `@orkestrel/veneer` (working tree over `d93bb85`, 2026-09-22)

## Subject

The F5a unit, written by `opus` on native Opus 5 from `/home/user/scaffold/.orkestrel/veneer/units/f5a-brief.md`:
`tests/setupStyles.ts` split into `tests/setupCases.ts`, `tests/setupCalibration.ts`, and the
remaining `tests/setupStyles.ts`, each with its own root proof; the tag-pair selector grammar
retired for the rendered position-independence reader `scanPositional` in `tests/setupBrowser.ts`
and its two cases in `tests/src/styles/index.test.ts`; the visitor in `tests/setupConformance.ts`
moved to module scope as `SPECIFIER_VISITOR` with `SPECIFIER_READINGS`; the duplicate
`::file-selector-button` text assertion removed from `tests/src/styles/elements/input.test.ts`; the
built-closure sweep `scanForbiddenBuild` with `FORBIDDEN_SIGNATURES`, its plants, and the
`tests/conformance.test.ts` case; the guide's § Styles and § Tests prose. The unit's report is
`/home/user/scaffold/.orkestrel/veneer/units/f5a-report.md`.

## What this round decides

Whether F5a lands as one commit. A BROKEN claim in code sends the unit to a fix round; a BROKEN
claim in prose alone is corrected by the Orchestrator at landing and never opens a fix round.

## Already established — do not re-run

- The rendered proof's predicate and its wall clock (`/home/user/scaffold/.orkestrel/veneer/units/position-probe.md`).
- The terrain's export groups and importers (`/home/user/scaffold/.orkestrel/veneer/units/f5-terrain-report.md` § C).
- The F4 verdict (`/home/user/scaffold/.orkestrel/veneer/units/f4-audit-verdict.md`): the recorder, the Button
  restoration, the `scene` rename.
- The user's rulings D2 to D11 (`/home/user/veneer/ROADMAP.md` § Rulings; D11, ruled after that
  file was last written, reverts the cascade to physical properties in the F5d unit that follows
  and is outside this round).

## Review evidence

`/home/user/scaffold/.orkestrel/veneer/units/f5a-audit-evidence.md`: the status output, the diffstat, the diff
`/home/user/scaffold/.orkestrel/veneer/units/f5a.diff` (the four new modules included as additions), the unit's
report, and the gate log the Orchestrator is running (`/home/user/scaffold/.orkestrel/veneer/units/f5a-gates.log.txt`,
copied when it completes; the unit's own chain reading is in its report and is not the
authoritative run).

## Numbered falsifiable claims

Before confirming any claim about a proof, name the mutation that would make the proof fail and say
whether its assertions distinguish that mutation from the passing case.

1. **Every export moved once, unrenamed, with its behaviour unchanged.** Every symbol
   `tests/setupStyles.ts` exported at `d93bb85` (read it with `git show d93bb85:tests/setupStyles.ts`)
   is exported by exactly one of the three modules now, under the same name, with the same
   declaration body; the only text differences are doc references to a moved module or proof, and
   the symbols the brief named for deletion (claim 7).
2. **The new modules are host-independent.** `tests/setupCases.ts` imports only the token registry
   and `tests/setupCalibration.ts` imports nothing; neither names `document`, `window`, a DOM type,
   or a `node:*` module, and both typecheck in the `setup` project.
3. **Each module's inventory case lists its exports exactly and binds.** The export inventory cases
   in `tests/setupCases.test.ts`, `tests/setupCalibration.test.ts`, and `tests/setupStyles.test.ts`
   each compare the module's runtime export names with a literal list; an export added to or removed
   from the module reddens the case (say whether the assertion is an exact set comparison or a
   subset check).
4. **The `ELEMENT_TAGS` case closes the staleness hole.** The case in `tests/setupCases.test.ts`
   reads `src/styles/elements/` and requires the partial stems found there to equal the table's
   partial column exactly, so a partial added without a row reddens it and a row without a partial
   reddens it; and a row naming a mandated descendant names a legal parent from `MANDATED_TAG_PAIRS`.
5. **`scanPositional` answers the judgment through the engine.** It mounts through `scene`, reads
   rule membership through `Element.matches`, parses no selector text, compares each tag alone,
   nested inside each other tag outside the mandated pairs, and after each other tag as a sibling,
   and returns `<outer> > <inner>` and `<outer> + <inner>` strings. The planted case in
   `tests/src/styles/index.test.ts` loads `@layer elements { p:not(h1 + p) { margin: 0 } }` through
   `scene.load` and expects exactly `['h1 + p']`; a reader that never compares the sibling placement
   returns `[]` there and fails, and a reader that returns `[]` unconditionally fails it too.
6. **The shipped elements layer is position-independent.** The shipped-layer case runs over every
   distinct tag in `ELEMENT_TAGS`, including `html` and `body`, and expects `[]`; the unit's report
   reads it green at 1039 ms; the Orchestrator's gate log confirms or refutes.
7. **The deleted grammar set is exact and the kept set is the closure.** `matchesLooseTagPair`,
   `scanUnreadForm`, `extractSelectorCompounds`, `extractCompoundTags`, `extractSelectorIdentifiers`,
   `findGroupEnd`, `splitTopLevelCompounds`, `SelectorCombinator`, and `SelectorCompound` appear
   nowhere under `tests`, `src`, or `guides`; each kept symbol (`matchesCSSWhitespace`,
   `trimCSSWhitespace`, `SelectorEscape`, `readEscape`, `SelectorStep`, `walkSelector`,
   `SelectorIdentifier`, `readIdentifier`, `splitTopLevelList`, `normalizeComplexSelector`) has a
   consumer other than its own proof, so no grammar piece is kept for its test alone.
8. **The visitor move preserves behaviour and conforms.** `extractSpecifiers` returns the same
   readings as at `d93bb85` for the existing case; `SPECIFIER_READINGS` is empty between calls (the
   drain case reddens when the drain is removed); and the shape — an exported mutable module-scope
   array written by the handlers — either conforms to `AGENTS.md` (the readonly-collection law, the
   no-hidden-declaration law, the no-nested-function law) or a conforming alternative exists that
   the unit's report did not find (the report names one: leave the handler literal inside
   `extractSpecifiers` as an anonymous argument). Rule which.
9. **The input proof lost only the duplicate.** `tests/src/styles/elements/input.test.ts` no longer
   asserts the `::file-selector-button` declaration text; the resolved read still asserts
   `font` inheritance and `appearance: button`; the `-webkit-` internal parts stay text-accounted
   with the reason stated in a comment; the `::-webkit-file-upload-button` absence assertion stays.
10. **The built-closure sweep binds on both passes.** `scanForbiddenBuild(path, names, signatures)`
    reports a forbidden specifier through `extractSpecifiers` and `scanForbiddenSource`, or failing
    that the first signature in `FORBIDDEN_SIGNATURES` the text carries; the plants in
    `tests/setupConformance.test.ts` (clean copy, appended `jQueryInterface`, appended `createApp`,
    prepended `import '@popperjs/core'`, and the signature plant with an empty signature list)
    distinguish a sweep that greps signatures only from one that scans specifiers only; the
    `tests/conformance.test.ts` case sweeps `dist/src/core/index.js` and `dist/src/browser/index.js`
    and expects nothing.
11. **The signatures are real, not plausible.** Each member of `FORBIDDEN_SIGNATURES` occurs in a
    real distribution of the runtime it names: `jQueryInterface` and `EVENT_KEY` in
    `node_modules/bootstrap/dist/js/bootstrap.esm.js` (or another installed Bootstrap script),
    `@popperjs` in that bundle's imports, `createApp` and `__vue` in a Vue runtime, `tailwind` in a
    Tailwind runtime or its emitted CSS. Rule per member from the installed tree where a
    distribution is installed and name the member you could not measure.
12. **The guide is true and in parity.** § Files names the three modules; the setup paragraph names
    what each holds; the position-independence paragraph names `scanPositional` and
    `MANDATED_TAG_PAIRS`; the § Tests link for `index.test.ts` names position independence; the
    § Compatibility exclusion sentence and every § Deferred selectors row citing a contextual pair
    are unchanged; `npm run test:guides` passes on the tree.
13. **The gate chain is green on the returned tree.** Every `=== <gate> exit=` line in the
    Orchestrator's gate log reads `exit=0` (rule UNRESOLVED if the log is not yet complete when you
    read it, and say so).
14. **Scope is honest.** `git status --porcelain` lists only `guides/veneer.md`, files under
    `tests/`, and the four new modules; nothing under `src/**`, `app/**`, `configs/**`, or
    `tests/fixtures/**` changed; no file remains under `tmp/probe/`.
15. **The unit's own flagged claims are ruled.** (a) `scanPositional`'s refusal branch for a selector
    the engine cannot read: reachable or dead, and if dead whether the rules require its removal or
    permit it with the recorded reason; (b) `SPECIFIER_READINGS` reentrancy: whether any reachable
    interleaving exists; (c) covered by claim 11.
16. **Prose holds.** No changed prose line (the guide, doc comments, case titles, the report)
    contains a banned term in a banned sense: pattern
    `\b(?:should|simply|eas(?:y|ier|iest)|just|currently|via|utilize|leverage|robust|performant)\b|\b(?:e\.g\.|i\.e\.|etc\.)`
    case-insensitive, and no count of a growable set is stated as a number.
17. **The unit is coherent.** The three modules have one job each and their names say it; the new
    names (`scanPositional`, `ELEMENT_TAGS`, `SPECIFIER_VISITOR`, `SPECIFIER_READINGS`,
    `FORBIDDEN_SIGNATURES`, `scanForbiddenBuild`) fit `.claude/rules/names.md`; nothing duplicates
    an installed `@orkestrel/test` or `@orkestrel/contract` export.

## Unknowns

- Whether the Orchestrator's gate log completes before the lanes read it. The unit's self-reported
  chain is in the report; the authoritative reading is the Orchestrator's.

## The threshold

PASS when every claim is CONFIRMED, or every BROKEN claim is in prose or in a proof's wording and
the Orchestrator can correct it at landing. A BROKEN claim in code (claims 1 to 10, 15) opens a fix
round on the unit. A lane that returns no verdicts is a lane that did not run.
