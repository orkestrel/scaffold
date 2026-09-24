# J-SANITIZER-CONTEXT round-2 audit — the objective lane (analyst on GPT-6 Astra)

Thread `01a0d5be-9085-7113-942b-e2ec267b6d87`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-sanitizer-context-audit-2.jsonl` (launch copy under `tmp/codex/`); 16 commands; 265 s; usage {"input_tokens":1238307,"cached_input_tokens":1115776,"cache_write_input_tokens":0,"output_tokens":7134,"reasoning_output_tokens":2356}. Retained verbatim from the exec's last message.

---

Source review of `85c04ac` against `c6912b0`; no tests run. Runtime findings rely on the supplied logs. The counterexample under claim 1 is a derivation from the standard, not a browser measurement.

| Claim | Ruling | Evidence and proof assessment |
|---|---|---|
| 1. The prose states the standard exactly | **FAIL** | The writer correctly interprets leading `</p>` and `</br>`: [§13.2.6.5](https://html.spec.whatwg.org/multipage/parsing.html#parsing-main-inforeign) reprocesses them through the HTML insertion mode. However, formatting end tags differ after the stack returns to its root. For `<p><b>x</p></b>y`, closing `p` pops `b` but leaves its active-formatting entry. In the foreign integration-point context, `</b>` is ignored at the root; subsequent `y` reconstructs `b`, producing `<p><b>x</b></p><b>y</b>`. In a `div` context, the adoption-agency algorithm removes that entry, producing `<p><b>x</b></p>y`. See [§13.2.6.4.7](https://html.spec.whatwg.org/multipage/parsing.html#parsing-main-inbody). This contradicts the exclusive CDATA qualification at `src/browser/sanitizers/ConfigSanitizer.ts:43` and `guides/veneer.md:2691`. The bound case at `tests/src/browser/sanitizers/ConfigSanitizer.test.ts:359` does not exercise this state. |
| 2. The measurement supports the Chromium 153 sentence | **CONFIRMED** | Within the measured comparisons, raw copy and raw `div` results agree, and sanitized walk and native results agree: `units/j-sanitizer-context-bound.log.txt:2` and `units/j-sanitizer-context-bound-2.log.txt:2`. Raw CDATA comments and sanitized empty output are different stages. The prose explicitly limits browser agreement to measured inputs at `ConfigSanitizer.ts:41`. These readings establish no general standard equivalence. |
| 3. Constants are centralized and named correctly | **CONFIRMED** | Namespace declarations are at `src/browser/constants.ts:746` and `:751`; frozen tables are at `:794` and `:807`. SVG floor entries use the constant at `:771` and `:777`. Reading the namespace-URI matches across `src/browser/**` at the subject commit found only those declarations and the acknowledged TSDoc example at `src/browser/helpers.ts:302`. Names follow the qualified-constant rule. Constant mutations are distinguished as recorded below. |
| 4. Public surface is complete and consistent | **CONFIRMED** | `src/browser/index.ts:2` exports the constants. `tests/src/browser/index.test.ts:131` names them in the export inventory. The guide summaries at `guides/veneer.md:126` match the corresponding TSDoc descriptions at `constants.ts:744`, `:749`, `:785`, and `:801`. No export-removal or summary-drift mutation was supplied. |
| 5. Walk behavior did not change | **CONFIRMED** | The diff replaces literals with equal-valued constants. The guarded encoding membership check at `ConfigSanitizer.ts:164` accepts the same strings as the preceding equality checks; SVG membership and context selection remain equivalent at `:165` and `:167`. Floor namespace values remain equal. Existing test bodies are unchanged. The supplied baseline run at `units/j-sanitizer-context-mutations-2-orchestrator.log.txt:3` records success at `85c04ac`. |
| 6. The proofs bind | **CONFIRMED** | The bound case at `tests/src/browser/sanitizers/ConfigSanitizer.test.ts:359` asserts every claimed input on unshadowed and shadowed MathML/SVG targets. `tests/setupBrowser.ts:2693` forces the walk by shadowing `setHTML`. The constants case at `ConfigSanitizer.test.ts:383` independently checks parser namespaces, table contents, and freezing. Supplied mutation outcomes agree with those assertions. Chromium 153 survivors are named for further Chromium 141 investigation; the supplied evidence does not establish that later discrimination. |

The following table assesses every mutation row. `T` denotes `tests/src/browser/sanitizers/ConfigSanitizer.test.ts` at `85c04ac`; `M` denotes `units/j-sanitizer-context-mutations-2.log.txt`.

| Mutation | Distinguished? | Evidence |
|---|---|---|
| `unsubstituted` | **No on Chromium 153** | Replacing the `div` with the imported target passes the suite, including the bound case. `M:4`; `T:261`, `T:359`. |
| `any-encoding` | **Yes** | Forcing `text/html` wrongly makes invalid or absent encodings select HTML. Namespace assertion: `T:315`; failure: `M:8`. |
| `namespace-blind` | **Yes** | `getAttribute` admits the namespaced encoding fixture at `T:302`; `T:315` rejects the resulting HTML namespace. `M:13`. |
| `trimmed` | **Yes** | Trimming admits the leading-space encoding at `T:301`; `T:315` rejects the resulting HTML namespace. `M:18`. |
| `case-exact` | **No on Chromium 153** | Removing lowercasing falls back to a copy that already handles the uppercase fixtures correctly. `T:279`, `T:281`; `M:23`. Chromium 141 discrimination remains unmeasured here. |
| `svg-dropped` | **No on Chromium 153** | Imported SVG contexts satisfy the output and namespace assertions at `T:328` and `T:329`. `M:27`. The instrument makes older-browser discrimination conditional. |
| `text-points-added` | **Yes** | Substitution changes `mglyph` and `malignmark` to HTML elements; the namespace assertion at `T:346` fails. `M:31`. |
| `template-context` | **Yes** | Template parsing violates the encoding, SVG, and bound-output cases at `T:290`, `T:328`, and `T:378`. `M:36`. |
| `mathml-namespace-changed` | **Yes** | Appending `/` to the constant disagrees with the parser-derived namespace at `T:386`. `M:43`. |
| `svg-namespace-changed` | **Yes** | Appending `/` fails `T:386` and SVG floor behavior. `M:48`. |
| `encodings-missing-entry` | **Yes** | Removing `text/html` fails the independent table assertion at `T:393`. `M:58`. |
| `xhtml-missing-entry` | **Yes** | Removing `application/xhtml+xml` fails `T:393`. `M:63`. |
| `svg-integrations-missing-entry` | **Yes** | Removing `title` fails the independent table assertion at `T:392`. `M:68`. |
| `control-operands` | **No, as required** | Reordering the integration predicate’s operands preserves behavior. The suite succeeds. `M:73`. |

Outside the claims, the mutation instrument retains its runner-failure classification defect. At `units/j-sanitizer-context-mutations-2.py:118`, an empty parsed failure list means `survived`, regardless of the process exit status or whether tests executed. A startup or collection failure without a matching failure line therefore receives a false survival result. The supplied successful survival rows do not exhibit that condition.

VERDICT: FAIL 1
