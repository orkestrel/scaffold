# Fleet name resolution wave of 2026-10-30

## Goal

Close `ROADMAP.md` items 77 to 112 in the packages that own them: every recorded surface collision and every environment conflict resolved by the rename, import, or shared export its item rules, published in layer order, so the fleet's recorded collisions reach none.

## Exit criterion

- Every item from 77 to 112 is closed by a published release of its owner, and `ROADMAP.md` no longer carries it.
- At the scaffold release after the last visit, `host.json` records no surface collision, and `scaffold surface` run live with every catalog checkout as a candidate exits `0` with no conflict.

## Repositories

Each package lives at `https://github.com/orkestrel/<name>`, checked out beside scaffold under its name: contract, codec, csv, html, indexeddb, msg, sse, test, console, form, markdown, process, reason, router, table, guide, interpret, lsp, rater, scaffold, sea, server, workspace, brief, mcp, middleware, program, worker, workflow, agent, and probe, plus the added `jsonrpc` at `https://github.com/orkestrel/jsonrpc`. Every dependent of a package whose names move re-pins and adopts them in the same round.

## Rulings

- 2026-10-30, the user: no compatibility path, deprecation, wrapper, or alias; each rename updates every consumer at its re-pin.
- 2026-10-30, the user: `@orkestrel/contract` gains `escapeRegExp`, `errorToMessage`, `success`, `failure`, `isSuccess`, `isFailure`, and the five shared `*_LIMIT` constants; `@orkestrel/codec` gains `BOM`, and csv, sse, and msg declare codec; the JSON-RPC 2.0 wire contract moves into an added `@orkestrel/jsonrpc` package at layer 1 that lsp and mcp declare, never into codec; table renames its family to `Grid*` and database keeps `Table*`; the sweep consult's replacement words stand.
- 2026-10-30, the user: the `astra` lane holds writer units, the `opus` role holds them while that lane is unavailable, and each review runs on an engine that did not write the work; a design question goes to a consult before a mechanism is improvised.
- 2026-10-30, the user: one one-time code per upload batch, asked for right before it; a release commit pushes only after the registry serves its version; never push tags.

## Open decisions

- Item 81's design round: whether the `JSONRPCErrorResponse` type requires `id`, and which arms the `JSONRPCMessage` union names, before `@orkestrel/jsonrpc` publishes.

## State

- 2026-10-30: the fleet surface campaign retired at `e8b95e120`, leaving items 77 to 112 as this wave's units; scaffold 0.0.118 records 107 collisions.
- Next: § Sequence step 1, contract's item 79, and item 81's design round beside it.

## Sequence

1. **Layer 0.** contract: item 79.
2. **Layer 1.** codec: item 80. jsonrpc: item 81's design round and first release. html: item 88. indexeddb: item 89. test: item 107.
3. **Layer 2.** csv, msg, and sse, each declaring codec after item 80 publishes: items 85, 95, and 105. form: item 86. markdown: item 92. process: item 97. reason: item 100. router: item 101. table: item 106; then console: item 84.
4. **Layer 3.** guide: item 87. interpret: item 90. lsp: items 91 and 81's adoption. rater: item 99. sea: item 103. server: item 104. workspace: item 110. scaffold: item 102, with item 107's rule and skill updates.
5. **Layer 4.** brief: item 83. mcp: items 77, 81's adoption, and 93. middleware: items 78 and 94. program: items 98 and 112. worker: items 108 and 111. workflow: item 109.
6. **Layer 5.** agent: item 82. probe: item 96.
7. **Close.** A scaffold catalog refresh and release; then the live `scaffold surface` run over every catalog checkout.
