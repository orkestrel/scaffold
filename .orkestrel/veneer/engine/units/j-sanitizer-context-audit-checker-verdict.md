# J-SANITIZER-CONTEXT audit — the checker (Sonnet, native; retained from its notification, 2026-09-24)

| Claim | Verdict | Evidence |
|---|---|---|
| 5 | CONFIRMED | Every DOM read and creation the diff adds goes through a prototype `.call`: `Element.prototype.getAttributeNS.call(element, null, 'encoding')` (`ConfigSanitizer.ts:145`) and `Document.prototype.createElement.call(inert, 'div')` (`:153`); `.toLowerCase()` runs on the extracted string, outside the DOM-clobbering rule; `Document.prototype.importNode.call(inert, element, false)` (`:154`) is unchanged. |
| 7 | FAIL (two literals and a table inlined against the rule; brief-forced unresolved) | `'http://www.w3.org/1998/Math/MathML'` (`:144`) and `'http://www.w3.org/2000/svg'` (`:150`) are namespace URIs; `constants.ts` centralizes namespace strings beside `SANITIZER_NAMESPACE` (`constants.ts:741`) and in `SANITIZER_BASELINE` (`:756-770`), so AGENTS.md § Centralize by kind and `architecture.md` § Kind purity place them there. `['foreignObject', 'desc', 'title']` (`:151`) is a name table, which is a constant by kind. `'annotation-xml'`, `'text/html'`, `'application/xhtml+xml'`, and `'div'` are single-use comparisons, a judgment call. Whether the brief forced the inlining could not be checked: the brief was missing from disk at the time of the check (the Orchestrator's prune pattern had removed it; the Orchestrator restored it from its own copy afterwards). |
| 8 | UNRESOLVED | The class `@remarks` (`:28-34`) and the guide paragraph (`guides/veneer.md:2681-2685`) state the rule the code's `integration` condition (`:147-151`) applies; neither states the Chromium 141 outcome as measured; exhaustiveness beyond the diff hunk was not read. |

Scope: CONFIRMED. The status lists `guides/veneer.md`, `src/browser/sanitizers/ConfigSanitizer.ts`, and `tests/src/browser/sanitizers/ConfigSanitizer.test.ts`; the `setHTML` branch of `write` is byte-identical to `ca83afb`.

Mutation readings: `any-encoding`, `namespace-blind`, `trimmed`, `text-points-added`, `template-context` red under mutation and green on the source; `unsubstituted`, `case-exact`, `xhtml-dropped`, `svg-dropped` survive on Chromium 153 and are named for the Chromium 141 re-read; `control-order` survives as the control; all rows `restored=True` and the final file hash matches.

VERDICT: FAIL 7, 8
