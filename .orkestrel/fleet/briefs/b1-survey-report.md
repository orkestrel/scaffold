# b1-survey report (2026-08-17) — distillate

Routing: dispatched as grok; executor answered from its driver engine (no Cursor journal) —
recorded as a driver-engine substitution. Evidence is grep output with file:line, independently
verifiable.

- B1: 43/43 fleet packages import @orkestrel/test. One genuine duplicate fleet-wide:
  mcp/tests/setupServer.ts:459 local generic createTeardown<T> beside the imported one.
  fenceImports/findUnlisted (from @orkestrel/guide): 44/44 guides.test.ts files. The fleet
  adoption pass B1 contemplated is unnecessary.
- B4 counts: createRecorder 32/43 packages; createScratch 40/43; waitForDelay 16/43;
  captureError 15/43; createLoopback 6 (mcp, middleware, router, terminal, websocket + 1);
  fences universal.
- Inline setTimeout waits (helper exists, not used at those sites): middleware ×10 sites
  (does not import waitForDelay at all), browser ×4, workflow/queue/router/agent ×1 each.
- Full matrix in the returned distillate (session transcript); searched scope: every
  /workspace/<pkg>/{tests,src} minus supervisor, node_modules, dist, with named patterns.
