<!-- A4i — checker (Sonnet, native), mechanical lane over A4i-u4l-only.patch.txt, the U4l report, P19, and the chain walk. Retained from the completion notification, 2026-09-15 (96 s, 26 tool uses). -->

**MECHANICAL lane, Sonnet.**

1. CONFIRMED — the U4l report's carrier 1 pin at `ModelContext.test.ts:181-232` matches the live file exactly; the fixture holds A `[dropped, kept]`, B `[accepted, refused, kept]` with `refuse('refused')` armed (`:198-209`); rejection asserted with the fixture's message (`:211-213`); prune membership `['accepted', 'kept']` (`:220`); identity `toBe(carried)` (`:224`); recovery to `['accepted', 'kept', 'refused']` (`:226-232`). P19's `publish` and `identity` controls reproduce the report's exact red readings (`P19-a4i-probe.log.txt:2-19`) and restore byte-identical SHA-256 `56ac1dc5588e259d…` / `9e3296b66b8fcd6f…`.

2. CONFIRMED — `factories.test.ts:1327-1338` asserts `bridge !== undefined === ('modelContext' in document)`; `validators.test.ts:95-100` asserts `isWebMCPDocument(document) === ('modelContext' in document)`. `Grep` for `runIf|skipIf` inside these two blocks: none present (only the pre-existing native `describe.runIf` block at `ModelContext.test.ts:1170`, unchanged in shape). Isolated absence cases stand unchanged: `reports undefined for a document exposing no registry` (`factories.test.ts:1321-1325`), `refuses a document whose modelContext is not a registry` (`validators.test.ts:88-93`), and `accepts a real Document after a registry is installed on it` in `ModelContext.test.ts`. Factories comment (`:1328-1332`) states the guard/reddening relationship and points at `guides/mcp.md` `## WebMCP parity`. Native block's comment at `ModelContext.test.ts:1163-1169` names the isolated document as the ordinary absence assertion and this page's own relationship, verbatim as reported. P19's `factories` and `validators` controls reproduce the exact red readings and restore byte-identical.

3. UNRESOLVED — this is a judgment/behavioral generality question ("name any host state the pair misreads") outside a mechanical read-only check; no host with a shape-refused `document.modelContext` is available to run. Referred to the objective lane.

4. CONFIRMED — `A4i-u4l-only.patch.txt` touches exactly the three files: `tests/src/browser/ModelContext.test.ts`, `tests/src/browser/factories.test.ts`, `tests/src/browser/validators.test.ts` (diff headers, no others). No new export introduced (no `export` line added in the diff). `collide3-mcp-after-u4l.txt`: `collisions: none` over 469 export names, 98 files. `src/browser/ModelContext.ts` SHA-256 `56ac1dc5588e259d…` unchanged per P19 and the report; `tests/fixtures/modelContext.ts` and `guides/mcp.md` reported byte-identical and not present in the U4l-only diff.

5. CONFIRMED — A4h-audit-checker.md already chain-walked A4 through A4g and closed every named FAIL (A4-P9→U4c/d/f; A4b-P11→U4f; A4c-P12→U4g; A4d-P13/P13b→U4h plus the A4d-O generation-exemption ruling; A4f-P14→U4j; A4g→P16; R8 carried to a design round per A4g-audit-reviewer.md; R9 closed by `U4-chain-audit-verdict.md`). A4h's own FAILs (1, 2, 7, 8) close here: claim 2 by P18 (host reproduction of the finally-prune red); claims 1 and 7 by U4l, confirmed by P19; claim 8 (the shipping gate) follows once 1 and 7 close — outside the mechanical lane. All named closers (P9, P11, P12, P13/P13b, P14, P16, P18, P19) exist on disk. The nonblocking transport-recorder follow-up remains recorded as UNRESOLVED/non-blocking per A4h-audit-analyst.md's own outside note, consistent with a follow-up rather than a chain blocker.

6. Outside my lane — a shipping decision.

Gates: `U4l-mcp-gates-orchestrator.log.txt` shows `format:check`, `lint:check`, `check`, `build`, `test` (with `test:guides`, `test:conformance`, `test:integration`) all `exit=0`.

outside: none — chain closed on the mechanical evidence.

VERDICT: PASS
