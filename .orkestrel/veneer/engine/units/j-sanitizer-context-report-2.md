# J-SANITIZER-CONTEXT round 2 — the writer's report (opus on Opus 5.5, native, the round-1 writer resumed; retained from its final message, 2026-09-24)

The constants live in `constants.ts`, and the remarks and guide describe the walk's parse as measured; all acceptance commands exit 0. One deviation: the brief asked for prose saying the standard ignores a stray `</p>` or `</br>`, and the standard says the opposite, so the prose follows the standard. Committed by the Orchestrator as Veneer `85c04ac` over `c6912b0` (5 files, 142 insertions, 30 deletions).

## Files touched

`src/browser/constants.ts` (the four constants; the `SANITIZER_BASELINE` SVG entries read `SANITIZER_SVG_NAMESPACE`); `src/browser/sanitizers/ConfigSanitizer.ts` (imports the constants; the class `@remarks` and the inline comment rewritten; the mechanism unchanged); `tests/src/browser/sanitizers/ConfigSanitizer.test.ts` (two cases); `tests/src/browser/index.test.ts` (four export names); `guides/veneer.md` (the `ConfigSanitizer` paragraph and four Surface rows); `tmp/j-sanitizer-context/` (`bound.py`, `bound.log.txt`, `bound-2.log.txt`, `standard.txt`, `rows.py`, the round-2 logs, and the revised `mutations.py`).

## R2 measurement (Chromium 153, before editing; `bound.log.txt`, retained as `j-sanitizer-context-bound.log.txt`)

Identical under the allowlist and under `{}`, for the `annotation-xml encoding=text/html` and `foreignObject` targets, on all three paths (the round-1 walk's copy, the round-2 walk's `div`, and `setHTML`): `<![CDATA[x]]>` gives `''`; `</p>x` gives `<p></p>x`; `</br>x` gives `<br>x`; `x</annotation-xml>y` gives `xy`. Before sanitizing, both contexts parse the CDATA section as the comment `<!--[CDATA[x]]-->`. `bound-2.log.txt`: `<b>y</b><![CDATA[x]]>`, `y<![CDATA[x]]>`, and `<b>y</b></p>x` give `<b>y</b>`, `y`, and `<b>y</b><p></p>x` on all three paths.

## Rewritten prose

The class `@remarks` and the guide's `ConfigSanitizer` paragraph state: markup written into an HTML integration point (an SVG element `SANITIZER_SVG_INTEGRATIONS` names, or a MathML `annotation-xml` whose `encoding` in no namespace, lowercased, is in `SANITIZER_ENCODINGS`) is parsed in an HTML `div` of the inert document; the dispatcher (§ 13.2.6) sends such a context's start tags to the HTML insertion mode; on Chromium 153 the `div` builds the tree the copy and `setHTML` build for every input measured, a CDATA section and a stray `</p>`, `</br>`, or `</annotation-xml>` included; the standard differs in one place, a CDATA section outside every element the markup opens, which it keeps as text because the context element is foreign (§ 13.2.5.42), and which the walk, like Chromium 153's `setHTML`, removes with its text whatever the configuration lists; a stray `</p>` or `</br>` yields an empty `p` or a `br`, and any other stray end tag is ignored, under the foreign-content rules (§ 13.2.6.5) as in the `div`.

## R1 constants

`SANITIZER_MATHML_NAMESPACE` ("Names the MathML namespace, in which the `ConfigSanitizer` class's walk reads an `annotation-xml` element as an HTML integration point."), `SANITIZER_SVG_NAMESPACE` ("Names the SVG namespace, the namespace of the SVG elements the `SANITIZER_BASELINE` floor removes and the `SANITIZER_SVG_INTEGRATIONS` list names."), `SANITIZER_SVG_INTEGRATIONS` ("Lists the local names of the SVG elements the HTML standard makes HTML integration points by their name alone."), `SANITIZER_ENCODINGS` ("Lists the `encoding` attribute values, in ASCII lowercase, that make a MathML `annotation-xml` element an HTML integration point."). The tables take the `{QUALIFIER}_{NOUN}` form; plain names rather than `{name, namespace}` entries, so the class does not repeat the `.some(…)` match in `helpers.ts`.

## Cases (Chromium 153; `ConfigSanitizer.test.ts` and `index.test.ts` together 75 passed)

Every round-1 case unchanged and green. "parses markup written into an HTML integration point in an HTML div, so a CDATA section outside every element is removed with its text and a stray end tag reads as in HTML content, through the host route and the walk" pins `''`, `<b>y</b>`, `<p></p>x`, `<br>x`, and `xy` on four targets (`annotation-xml` and `foreignObject`, each unshadowed and shadowed). "names the namespaces the HTML parser gives MathML and SVG elements, and the HTML integration points the HTML standard defines" compares the namespace constants with a parsed `<math>` and `<svg>`, compares the tables with the standard's lists written out in the test, and checks both tables frozen; it exists because Chromium 153 parses the `div` and the copy alike, so no behavioural case sees a constant mutation here.

## Mutation table (`mutations.py`, retained as `j-sanitizer-context-mutations-2.py`; each row restored byte for byte)

`unsubstituted` survived (the 141 re-read decides it); `any-encoding`, `namespace-blind`, `trimmed` red on the "names no HTML type" case; `case-exact` survived (the 141 re-read, `TEXT/HTML`); `svg-dropped` survived (only a build that mishandles an SVG context tells it apart); `text-points-added` red on the text-integration-point case; `template-context` red on the HTML-encoding, SVG, and bound cases; `mathml-namespace-changed`, `encodings-missing-entry`, `xhtml-missing-entry`, `svg-integrations-missing-entry` red on the constants case; `svg-namespace-changed` red on the constants case and five floor cases; `control-operands` survived, as required.

## Acceptance

`check:src:browser`, oxlint, oxfmt exit 0; `ConfigSanitizer.test.ts` and `index.test.ts` 75 passed; `test:guides` 20; `test:policy` 109 and 1 skipped; root `tsc --noEmit` exit 0; observation: `test:src:browser` 896 passed.

## Deviation state

The standard's § 13.2.6.5 "An end tag whose tag name is "br", "p"" reprocesses the token in the HTML insertion mode, giving `<p></p>` and `<br>` as the `div` does, and "Any other end tag" returns at the topmost element, so it is ignored as in the `div`; the only real difference is CDATA (§ 13.2.5.42). The writer fetched the standard on 2026-09-24 (excerpts retained as `j-sanitizer-context-standard.txt`); the round-1 objective lane's claim 1 is wrong on `</p>` and `</br>`. Criterion 2 is unmet in one off-limits spot: `src/browser/helpers.ts`'s `readTag` `@example` keeps the SVG URI (a TSDoc example, not code; patch offered: `readTag(document.createElementNS(SANITIZER_SVG_NAMESPACE, 'svg'))`). The test files keep the URIs as literals on purpose, so the proofs do not read their answers from the constants. A Python text-mode write briefly put CRLF into the guide; LF was restored and the file has no CR byte. A stray `python -` of the writer's waited on stdin and was stopped by its own PID.
