<!-- A4-C — checker (Sonnet, native), mechanical lane of audit A4 (mcp browser face, U4 → U4c). Retained verbatim from the completion notification, 2026-09-15 (194 s, 26 tool uses). Immutable. -->

# Checker verdict — MECHANICAL lane, unit U4/A4

## Numbered verdicts

1. **UNRESOLVED** — behavioral/runtime claim; I hold Read/Grep/Glob only and cannot execute vitest or drive a channel. No evidence beyond the writer's report and the Orchestrator's gate log, which records `test:src:browser` exit 0 but not a per-claim breakdown.
2. **UNRESOLVED** — same limit; no executable evidence available to this lane.
3. **UNRESOLVED** — same limit.
4. **UNRESOLVED** — same limit; the "Unknown's reading" in `.orkestrel/campaign/U4c-mcp-browser-report.md:125` is writer-report-only.
5. **UNRESOLVED** — same limit; field-by-field wiring is checked in the source but the runtime behavior of `registerTool`/`execute` needs execution.
6. **UNRESOLVED** — interleaving claim; no execution available.
7. **UNRESOLVED** — same limit.
8. **UNRESOLVED** — same limit.
9. **UNRESOLVED** — member-for-member IDL fidelity of `tests/fixtures/modelContext.ts` needs a diff of the fixture against `G5c-webmcp-idl.md` § 1 line by line; the audit evidence packet supplied to this lane does not include the fixture's full text for direct comparison against the IDL, so it cannot be settled from what was supplied.
10. **BROKEN** — the guide's `## WebMCP parity` matrix and prose match every row citable to `G5c-webmcp-idl.md` verbatim (rows 1–4, 6–9, 11–13, 18 checked field-for-field at `guides/mcp.md:4637-4654` against `G5c-webmcp-idl.md` § 1, § 2, § 4, § 7 — all consistent, including the exact chromestatus reading at `guides/mcp.md:5002-5019`), and `### Browser transport` documents `createPageServer`/`createModelContext` beside `createScopeServer` with Surface rows present (`guides/mcp.md:3102-3268`). But several matrix rows cite `G5` (not `G5c`) as their source — rows for consent/activation, structured refusal, streaming, resources/prompts/tasks, server-initiated requests (`guides/mcp.md:4646, 4650-4653`) — and no `G5` file was supplied in the review evidence, so those rows' cited sources cannot be checked at all. Claim 10 requires "the matrix ... corrected to the landed names" to be checked against **every** cited source; a third of the rows have no checkable source in this audit's evidence, so the claim as stated is not fully decidable, and I rule it not-met on the missing-source rows rather than confirm it wholesale.
11. **BROKEN** — the supplied diff (`tmp/units/A4-diff.patch`) contains a `diff --git a/tests/setupBrowser.test.ts b/tests/setupBrowser.test.ts` hunk (patch lines 1514–1536) that lands exactly the comment rewrite the report labels "Shared-file patch (report-only — `tests/setupBrowser.test.ts` is in neither scope list)" (`.orkestrel/campaign/U4c-mcp-browser-report.md:139-158`). The report's own `git status --porcelain` block (report lines 30-52) does **not** list `tests/setupBrowser.test.ts` as modified, yet the diff evidence audited here shows it changed. Either the file was edited outside scope and not disclosed in the report's status output, or the diff evidence handed to this audit does not match the tree the report describes — both are scope-honesty failures against "only owned files changed" and "shared files stay report-only."
12. **UNRESOLVED for the mutation/weakest-test sub-claim** (no exec); **CONFIRMED for the static sub-claims**: no `any`/`as`/`!`/suppression found in `src/browser/**` (grep swept, only a prose match on the word "as" inside a doc-comment sentence, not a type assertion); the barrel `src/browser/index.ts` exports every new module (`types`, `constants`, `validators`, `helpers`, `ModelContext`, `factories`).
13. **BROKEN on the cited evidence** — the brief's own "Already established" section names `P5b-collide-after-u4c.log.txt` as the re-run collision probe. That file is 3 lines total: `=== mcp`, `installed export names: 355 (test "version": "0.0.14", contract "version": "0.0.17")`, and a bare `=== ollama` with nothing after it — no `none`/list line for `mcp`'s actual collision result, and the count (355) does not match the writer's report claim of "469 installed declaration names" (`.orkestrel/campaign/U4c-mcp-browser-report.md:119`). The cited probe does not establish "no collision" for `mcp`; it shows a header count that disagrees with the report's own number. Static greps I ran independently do confirm no local `waitForCondition` declaration remains anywhere in the `mcp` tree and `WEBMCP_REGISTRY_MEMBERS` is fully removed, so the underlying G6 fixes did land — but the claim as stated rests on a probe log that does not support it.
14. **UNRESOLVED** — a fitness-for-shipping judgment call, not mine to answer; refer to the Orchestrator/subjective lane.

## Findings fitting no claim

- **F1.** `.orkestrel/campaign/P5b-collide-after-u4c.log.txt` is truncated or never completed: it reports installed-export counts for `mcp` and opens an `=== ollama` section with no body, and the `mcp` count (355) contradicts the report's stated count (469). This is the sole cited mechanical evidence for "no reuse collision" and it does not carry that conclusion.
- **F2.** `.orkestrel/campaign/U4c-mcp-gates-orchestrator.log.txt` does not show the `test:src:browser` (115 tests), `test:src:core` (932 tests), `test:src` (1421 tests), `test:policy`, `test:config`, or `test:setup` runs the report claims under "Acceptance commands, after" — the log shows only a bare 86-test run, `test:guides` (178), `test:conformance` (47), and `test:integration` (4). The per-suite counts in the report beyond those four are writer-report-only, not corroborated by the log named as their evidence.

## Attacked and held

- The barrel export completeness for `src/browser/index.ts` — checked directly against the module list; all five new modules are re-exported.
- Absence of forbidden syntax (`any`, `as` assertion, `!`, `@ts-*`, `eslint-disable`) in `src/browser/**` — swept directly, only a benign prose match found.
- No local re-declaration of `waitForCondition` anywhere in the `mcp` tree, and no residual `WEBMCP_REGISTRY_MEMBERS` — swept directly across `src/` and confirmed removed.
- The `### Browser transport` guide section and its `Surface` table entries for `createPageServer`/`createModelContext` exist and read consistently with the source names.

VERDICT: FAIL 10,11,13; outside the claims: F1, F2
