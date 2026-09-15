# Audit A4o — the U4e-h text round (`@orkestrel/mcp` subscription stream), mechanical lane only

## Role and lane

`checker` on Sonnet (native; Read, Grep, Glob): the MECHANICAL lane, the only lane this round runs.
The A4n reviewer prescribed the edits verbatim and the A4n checker closed the chain walk; this
round confirms each edit landed at its site with no behaviour change, and records the one refusal.
Perform the verification directly and spawn nothing; state in your first line which lane you hold.

## Subject

The `mcp` checkout at commit `7959f08` plus the working tree after U4e … U4e-h. Brief:
`U4e-h-mcp-remark-brief.md`; report: `U4e-h-mcp-remark-report.md`; the findings it carries:
`A4n-audit-reviewer.md` (R1 required; three recommended). Evidence under
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/`: `A4o-u4e-h-only.patch.txt` (the
delta, three files), `A4o-whole.patch.txt` (the whole chain, fifteen files),
`U4e-h-mcp-gates-orchestrator.log.txt` with `U4e-h-mcp-gates-test-full.log.txt` (the
Orchestrator's authoritative gates after U4e-h), `collide3-mcp-after-u4e-h.txt`.

## Numbered falsifiable claims

1. **One TSDoc home** (R1): the sentence "The producer advances on the stream's demand." appears
   exactly once under `src/**`, on `MCPSubscriptionOptions.producer`'s `@remarks`; the
   `MCPSubscriptionHandler` `@remarks` no longer carries the pair and reads as a filled paragraph.
2. **The folded pins**: one `it.each` over `[new Error('private producer detail'), undefined]`
   titled `delivers the queued frame before the failure terminal whatever the producer threw (%s)`
   replaces the two pins, keeping every assertion of both (the queued frame first, then the
   `-32603` terminal, the caught value on the `error` event where the Error case asserted it);
   the `waitForDelay(10)` is gone; the file's test count is unchanged (244).
3. **The guard clause**: the comment above `#change`'s early return names why the failure check is
   the whole closed-stream test (listeners registered only when the filter carries the tools
   family; the graceful close only when it omits it).
4. **The refusal is right**: renaming the `registry` binding to `tools` would shadow the
   module-scope `tools()` helper in the same file (`no-shadow` under `--deny-warnings`), so the
   binding stays `registry`; confirm the helper exists and is used, and that the binding is
   unchanged.
5. **Nothing else moved**: the delta touches only `src/core/types.ts`, `src/core/MCPServer.ts`,
   and `tests/src/core/MCPServer.test.ts`; the whole patch is still fifteen files; the collision
   probe clean; every gate step exit 0 and the src projects green; no `any`, assertion, nested
   function, or default export in the hunks.

## Output

The `orkestrel-falsify` verdict shape: one line per claim with the evidence; `outside:` (or
`outside: none`); ONE terminal line `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>`.
