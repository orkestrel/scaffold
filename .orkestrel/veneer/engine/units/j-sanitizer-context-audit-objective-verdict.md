# J-SANITIZER-CONTEXT audit — the objective lane (analyst on GPT-6 Astra)

Thread `01a0d5ac-5650-7422-95e1-ea935b636e05`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-sanitizer-context-audit.jsonl` (launch copy under `tmp/codex/`); 17 commands; 272 s; usage {"input_tokens":585045,"cached_input_tokens":510720,"cache_write_input_tokens":0,"output_tokens":8045,"reasoning_output_tokens":3620}. Retained verbatim from the exec's last message.

---

Source review of `c6912b0` against `ca83afb`; no tests or network requests run. Runtime evidence below comes from the supplied logs.

| Claim | Ruling | Evidence and mutation assessment |
|---|---|---|
| 1. Equivalent fragment trees | **FAIL** | `src/browser/sanitizers/ConfigSanitizer.ts:153` substitutes an HTML context. The standard’s “adjusted current node,” “Markup declaration open state,” and fragment-parsing sections distinguish that context from a foreign integration point. For `<![CDATA[x]]>`, the standard admits CDATA in the foreign context and produces text `x`; the HTML context produces a bogus comment, which the walk removes at `ConfigSanitizer.ts:193`. Also, §13.2.6’s integration-point dispatch condition covers start tags and characters, not every end tag. The supplied Chromium 153 CDATA readings agree with each other (`j-sanitizer-context-measurement.log.txt:18`), but browser agreement does not establish the claimed standard equivalence. Neither `unsubstituted` nor `template-context` tests this counterexample. |
| 2. Exact integration-point predicate | **CONFIRMED** | `ConfigSanitizer.ts:144` reads only a no-namespace `encoding` attribute; lines 148–151 match the required values, namespaces, and SVG local names. No non-ASCII lowercase mapping produces a false match for these particular MIME strings. Spaces remain and prevent equality. This matches §13.2.6’s integration-point definitions. `any-encoding`, `namespace-blind`, and `trimmed` are distinguished; `case-exact` and `xhtml-dropped` are not distinguished on Chromium 153. |
| 3. MathML text-integration-point handling | **CONFIRMED** | `ConfigSanitizer.ts:147` excludes the MathML text integration points, retaining their imported context at line 154. This preserves §13.2.6’s `mglyph` and `malignmark` exception. Other start tags receive HTML insertion-mode processing; that processing still creates MathML for `<math>` and SVG for `<svg>`. The namespace assertions at `tests/src/browser/sanitizers/ConfigSanitizer.test.ts:342` distinguish `text-points-added`. |
| 4. Unchanged alternative routes | **CONFIRMED** | Against `ca83afb`, the baseline refusal and native return remain unchanged at `ConfigSanitizer.ts:115` and `:124`. Non-integration targets retain the same import operation at `:154`; template-content selection and replacement remain unchanged at `:165`. The diff introduces no change to these routes. |
| 5. Prototype-based reads | **CONFIRMED** | The added operations use `Element.prototype.getAttributeNS.call` at `ConfigSanitizer.ts:145` and `Document.prototype.createElement.call` at `:153`. Namespace and local-name reads also use prototype getters in `src/browser/helpers.ts:635`. A target’s named properties cannot replace these operations. No supplied mutation specifically proves resistance to clobbering these added calls. |
| 6. Proof discrimination | **UNRESOLVED** | The supplied Chromium 153 results agree with the assertions and mutation specifications, as detailed below. The Chromium 141 log establishes the older lowercase `text/html` failure only (`configsanitizer-alone.log.txt:8`). It does not establish discrimination for uppercase encodings, XHTML encodings, or SVG contexts. The instrument itself makes SVG discrimination conditional (`j-sanitizer-context-mutations.py:57`). |
| 7. Constant placement | **FAIL** | `ConfigSanitizer.ts:144`, `:150`, and `:151` inline the MathML namespace, SVG namespace, and `['foreignObject', 'desc', 'title']` table. These belong in `src/browser/constants.ts` under the specified centralization rule, alongside `SANITIZER_NAMESPACE` at `constants.ts:741`. Scope did not force this placement: `j-sanitizer-context-brief.md:34` explicitly permits the needed constants table. |
| 8. Prose correspondence | **UNRESOLVED** | Excluded from this lane’s findings by the instruction to report no prose or wording finding. The behavioral equivalence issue is adjudicated under claim 1. Relevant locations are `ConfigSanitizer.ts:28` and `guides/veneer.md:2681`. |

The mutation specifications and assertions distinguish the following behaviors. Test references are to `tests/src/browser/sanitizers/ConfigSanitizer.test.ts`; log references are to `units/j-sanitizer-context-mutations.log.txt`.

| Mutation | Distinguished? | Assertion and evidence |
|---|---|---|
| `unsubstituted` | **No on Chromium 153** | The imported integration context satisfies the anchor and table-text assertions at test lines 266 and 286. Log line 3 records survival. The older Chromium 141 anchor failure supports the original defect, but is not a run of this mutation at the audited commit. |
| `any-encoding` | **Yes** | The absent/invalid encoding variants incorrectly produce an HTML anchor, violating the MathML namespace assertion at test line 311. Log line 7 records failure. |
| `namespace-blind` | **Yes** | The namespaced, unprefixed `encoding` attribute at test line 298 becomes visible through `getAttribute`, incorrectly selecting HTML. The namespace assertion at line 311 catches it. Log line 12 records failure. |
| `trimmed` | **Yes** | The leading-space value at test line 297 incorrectly selects HTML. The namespace assertion at line 311 catches it. Log line 17 records failure. |
| `case-exact` | **No on Chromium 153** | Uppercase variants fall back to an imported context that this browser already handles correctly. Test line 286 therefore passes. Log line 22 records survival; Chromium 141 discrimination remains unmeasured. |
| `xhtml-dropped` | **No on Chromium 153** | XHTML variants likewise pass through the correctly handled imported context. Log line 26 records survival; Chromium 141 discrimination remains unmeasured. |
| `svg-dropped` | **No on Chromium 153** | The imported SVG contexts satisfy test lines 324–325. Log line 30 records survival. No supplied evidence establishes that Chromium 141 handles these contexts incorrectly. |
| `text-points-added` | **Yes** | Substitution produces HTML `mglyph` and `malignmark` elements instead of the MathML namespaces required at test lines 343–344. Log line 34 records failure. |
| `template-context` | **Yes** | The template context retains table elements; the default allowlist then removes their `cell` text. Test lines 286 and 324 require that text. Log line 39 records failure. |
| `control-order` | **No, as required** | Reordering membership candidates changes no behavior. Log line 45 records survival. |

Outside the claims, the mutation instrument can misclassify a runner failure as survival. At `units/j-sanitizer-context-mutations.py:108`, an empty parsed failure list produces `survived` regardless of the process exit status or whether tests executed. A collection or startup failure without a matching test-failure line therefore receives the wrong classification. This condition is not shown in the supplied run.

VERDICT: FAIL 1, 7
