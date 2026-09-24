# J-SANITIZER-CONTEXT — the writer's report (opus on Opus 5.5, native; retained from its final message, 2026-09-24)

The walk parses markup written into an HTML integration point inside an HTML `div` element of the inert document instead of a copy of the target, so its start tags become HTML elements whatever the build does with a foreign context. Everything is green on Chromium 153; Chromium 141 is unproven here, because this host could not show the failure before the fix, and the styles session's re-read decides it. Committed by the Orchestrator as Veneer `c6912b0` on `unit/sanitizer-context` over `ca83afb` (3 files, 113 insertions, 7 deletions).

## Files touched

- `src/browser/sanitizers/ConfigSanitizer.ts`: `write` picks an inert HTML `div` as the parse context when the target is an HTML integration point, else imports a copy of the target as before; the class `@remarks` states the rule.
- `tests/src/browser/sanitizers/ConfigSanitizer.test.ts`: four cases, each on both targets (unshadowed and `shadowSetHTML`).
- `guides/veneer.md`: the `ConfigSanitizer` paragraph under Tooltip states the rule; no Summary cell moved.
- `tmp/j-sanitizer-context/` (ignored): `mutations.py`, `mutations.log.txt`, `measurement.log.txt`, and the run logs.

## Measurement (Chromium 153, at `ca83afb`, before any edit; `j-sanitizer-context-measurement.log.txt`)

The walk writes `<a>kept</a>` into `shadowSetHTML(annotation-xml encoding=text/html)` as `<a>kept</a>`; the parsed `a` in the inert copy is in the XHTML namespace; the same context without `encoding` gives a MathML `a`; SVG `foreignObject` and HTML `div` contexts read the same as the copy, CDATA and the stray end tags `</p>`, `</br>`, and `</annotation-xml>` included; `mi`, `mo`, `mn`, `ms`, `mtext` contexts keep `mglyph` MathML and make `a` HTML. A second reading: Chromium 153 takes `annotation-xml` as an integration point only when `encoding` is in no namespace; `setAttributeNS('urn:x', 'encoding', 'text/html')` still answers `getAttribute('encoding')`, but the copy and `setHTML` parse MathML, so the walk reads `getAttributeNS(null, 'encoding')`.

## Mechanism

HTML Standard § 13.2.6 (the tree construction dispatcher; "HTML integration point" and "MathML text integration point"); in the fragment case the integration-point test reads the fake start tag token § 13.4 builds from the context element's attributes, which is why `annotation-xml` hangs on the build; for an HTML integration point context, start tags and characters go to the insertion mode and "reset the insertion mode appropriately" (§ 13.2.4.1) yields "in body", as for a `div` context (so `<tr>` and `<td>` are ignored and their text stays); an HTML context cannot keep `mglyph` and `malignmark` as MathML, so the text integration points keep the copy. For the styles session to confirm or refute: Chromium 141 does not read the context element's `encoding` attribute when it decides whether an `annotation-xml` context is an HTML integration point, so `<a>` went through the foreign-content rules as a MathML `a`, which `#clean` removed with its text.

## Cases (Chromium 153, both targets; all pass)

1. "parses in the context of the target, so an annotation-xml element whose encoding is text/html keeps an HTML anchor" (unchanged; the 141 log's red; the 141 re-read must show it green).
2. "…annotation-xml element whose encoding names HTML in any ASCII case as the body of an HTML element…" (`text/html`, `TEXT/HTML`, `application/xhtml+xml`, `Application/XHTML+XML`; `<tr><td>cell</td></tr><a>kept</a>` gives `cell<a>kept</a>` in XHTML; `setHTML` agrees).
3. "…annotation-xml element whose encoding attribute in no namespace names no HTML type as MathML…" (no attribute, `application/mathml+xml`, ` text/html`, a namespaced `encoding`; config `{}` gives `<a>kept</a>` in MathML).
4. "…SVG foreignObject, desc, or title element as the body of an HTML element…".
5. "…MathML text integration point as HTML except an mglyph or malignmark element, which stays MathML…".

Red: the 141 log at `b1d314d` (`Tests 1 failed | 63 passed | 2 skipped (66)`); on this host `Tests 70 passed (70)` before the fix. The namespaced-attribute defect read red here: `-t "names no HTML type as MathML"` gave `Tests 1 failed | 69 skipped (70)` before the `getAttributeNS` change, then `1 passed`. The 141 re-read must show `Tests 68 passed | 2 skipped (70)` for the file.

## Mutation table (`mutations.log.txt`; every row restored identical)

`unsubstituted` (always import the copy), case 1: survived, this host cannot see it, the 141 re-read decides it. `any-encoding`, `namespace-blind` (`getAttribute`), `trimmed`: case 3 red. `case-exact` and `xhtml-dropped`: case 2 survived, the 141 re-read decides them. `svg-dropped`: case 4 survived (153 parses an SVG context as a `div`). `text-points-added`: case 5 red. `template-context`: cases 2 and 4 red. `control-order`: survived, as required.

## Acceptance

`check:src:browser`, oxlint, oxfmt exit 0; `ConfigSanitizer.test.ts` `Tests 70 passed (70)`; `test:guides` 20; `test:policy` 109 and 1 skipped; root `tsc --noEmit` exit 0; observation: `test:src:browser` `Tests 894 passed (894)`.

## Deviation state

No stop; the `setHTML` path is unchanged. Decided: the integration-point table is folded into `write` because a constant in `constants.ts` would add a barrel export, which `tests/src/browser/index.test.ts` forbids under the brief; a `div` rather than a `foreignObject` context, because criterion 2 rules out relying on a foreign context; the SVG names stay in the table. No shared-file patches. Process note: a stray `python -` of the writer's blocked on stdin and was stopped by its own PID.
