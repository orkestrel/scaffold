## Package decisions

**HTML — CONFIRMED.** Frozen diff `56ac759..7128975` preserves its explicit surface/barrel/INTERNAL checks, method obligations, title population, summaries, examples, imports, links and pitch. Parsing, traversal, rewriting, streaming, sanitizing, distilling, scanner and roundtrip cases retain their inputs, results and transcription guards.

The [identity check](C:/Users/mikes/WebstormProjects/html/tests/guides.test.ts:118) is not vacuous. An invalid object shape fails the assertion before the early return. A JSON array cannot supply the required package name and fails the subsequent equality. Expected identity derives from the existing module map. HTML’s predecessor lacked the broader section/declaration/general-fence population assertions; their absence is not a lost obligation.

**NDJSON — CONFIRMED.** Frozen diff `53f7d2f..f63db46` preserves the parser’s split-line, buffered-tail, clear, malformed-line and README cases. The existing typed [feed transcription](C:/Users/mikes/WebstormProjects/ndjson/tests/guides.test.ts:36) remains at module scope rather than becoming a nested declaration. Shared reports retain the predecessor comparisons; explicit surface and INTERNAL policy remain. Added population checks do not replace weaker empty-filter comparisons. Manifest identity uses installed `parseJSON` and `isRecord`.

**SQLite — CONFIRMED.** Frozen diff `28ba1df..9539e4a` preserves the `src/server` module map and real SQLite operations: bound statements, row reads, iteration, transactions, pragmas, disposal and native-error wrapping. The file-backed WAL case still uses a native joined scratch path. [Scratch cleanup](C:/Users/mikes/WebstormProjects/sqlite/tests/guides.test.ts:169) remains registered through `afterAll`. No database fake or substituted result was introduced. Parity and identity obligations remain enforced.

**Timeout — CONFIRMED.** Frozen diff `2561766..f90ef6b` preserves [real expiry testing](C:/Users/mikes/WebstormProjects/timeout/tests/guides.test.ts:165), cancellation, parent-clearing behavior, signal identity and handle reuse. Delays, expected states and documented-line guards are unchanged. Native composition, shared parity reports and the package-name assertion preserve the predecessor obligations without fake clocks.

**Tool — CONFIRMED.** Frozen diff `3c01c32..1913ba8` preserves the [schema-bearing tool](C:/Users/mikes/WebstormProjects/tool/tests/guides.test.ts:161), registry ordering/removal, envelope guard, successful execution, missing-tool failure and ordered batch results. Schema remains descriptive data; validation here concerns the call envelope, not schema-driven argument validation. No runtime behavior was replaced or weakened.

## Shared findings

- **Native composition — CONFIRMED.** Each entry directly composes installed `GuideCommand`, keeps static runtime imports native-safe, loads runtime aliases and Vitest registration dynamically, and consumes fresh command context. No local launcher, parser or command wrapper was added.
- **Preservation — CONFIRMED.** Own-row and populated-surface assertions remain explicit. Installed report semantics preserve the predecessor method, summary, title, example, import, link, test and pitch comparisons. No required population silently disappears.
- **Identity — CONFIRMED by source review.** Missing inventory, malformed JSON, non-object roots, missing names and incorrect names cannot pass. Module identities remain package-owned. Abort’s retained control supplies the executed selector-bypass evidence; no equivalent mutation control was run here.
- **Scope — CONFIRMED.** Frozen statuses contain only `tests/guides.test.ts`. No new dependency, suppression, skip or removed executable case appears. Installed Guide and Contract declaration hashes match the accepted contracts previously reviewed.

Root’s raw `d7n-<package>-next-native-before` receipts show exit1 alias-resolution failures. Each corresponding `d7n-<package>-next-source-root` receipt shows exit0 with actual guides collection. Those are native-entry receipts, not final release acceptance.

Report annotations: “prototype membership” means reflected source-member comparison, not runtime prototype inspection. Missing historical reports remain unavailable evidence. Tool’s retained `npm run docs` comment is stale wording, not altered assertion behavior.

The falsification and hardening workflows kept this review limited to predecessor obligations. No objective result was consulted; no package commands or writes were performed. Generated preparation remains separate.

**VERDICT: PASS**
