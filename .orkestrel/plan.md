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
- 2026-10-30, the user: `.orkestrel/jsonrpc-design.md`'s proposed rulings stand, mcp's error envelopes carry `id: null`, the `orkestrel/jsonrpc` repository is created, and its package publishes 0.0.1; the wave runs to completion, asking only for one-time codes.
- 2026-10-30, the user: a name moves to the keeper a `ROADMAP.md` item names through a declared transfer, `.claude/rules/names.md` § Fleet name ownership rule 5: `SURFACE_TRANSFERS` names it, the stage admits exactly that keeper, the policy sweep grandfathers a name the installed record admits the target to, and the close empties the list; one scaffold release carries it before layer 0.
- 2026-10-30, the user: a renamed concept carries its new term across its package's whole API in the same release: interpret's remaining template vocabulary becomes recipe, and workspace's `clampPosition` becomes `clampCaret`.

## Open decisions

- None.

## State

- 2026-10-30: the fleet surface campaign retired at `e8b95e120`, leaving items 77 to 112 as this wave's units; scaffold 0.0.118 records 107 collisions.
- 2026-10-30: contract's release visit re-pinned scaffold 0.0.118 and guide 0.0.28 and committed `Overwrite with scaffold 0.0.118` (contract `fb46eac`, unpushed), every gate green and its built output unchanged; item 81's design round returned `.orkestrel/jsonrpc-design.md`.
- 2026-10-30: the item units for contract, jsonrpc, codec, html, indexeddb, and test are written and reviewed; contract's, codec's, and jsonrpc's policy sweeps refuse their added names until a scaffold release declares the transfers.
- 2026-10-30: step 0's transfer unit committed and scaffold 0.0.119's release chain passed (`Release 0.0.119`, unpublished, awaiting the user's code). On the user's authorization, dependents work ahead on local tarballs: `swap.ts --pin` holds each changed upstream's unpublished `main` in the dependent's uncommitted manifest, and each publish wave restores the pins and re-pins to the registry. The adoption census compares each changed package's mirrored guide with its checkout's guide, and finds imports of the dropped names in agent, capture, guide, lsp, mcp, ollama, probe, scaffold, and toolbox, with brief calling interpret's renamed accessors.
- Pending dispatch: the deferred units for router, workspace, csv, form, sse, and guide with markdown's adoption; rater item 99; sea item 103; after their visits, capture, ollama, and toolbox adoptions and console item 84; after interpret's review, its deferred unit, then brief item 83 with interpret's adoption; after each in-flight unit, agent's and probe's adoptions, lsp's and mcp's item 81 adoption on a jsonrpc tarball, and scaffold item 102 with its process and contract adoption.

## Sequence

0. **Transfers.** scaffold: rule 5 and the wave's transfers, released before layer 0.
1. **Layer 0.** contract: item 79.
2. **Layer 1.** codec: item 80. jsonrpc: item 81's design round and first release. html: item 88. indexeddb: item 89. test: item 107.
3. **Layer 2.** csv, msg, and sse, each declaring codec after item 80 publishes: items 85, 95, and 105. form: item 86. markdown: item 92. process: item 97. reason: item 100. router: item 101. table: item 106; then console: item 84.
4. **Layer 3.** guide: item 87. interpret: item 90. lsp: items 91 and 81's adoption. rater: item 99. sea: item 103. server: item 104. workspace: item 110. scaffold: item 102, with item 107's rule and skill updates.
5. **Layer 4.** brief: item 83. mcp: items 77, 81's adoption, and 93. middleware: items 78 and 94. program: items 98 and 112. worker: items 108 and 111. workflow: item 109.
6. **Layer 5.** agent: item 82. probe: item 96.
7. **Close.** A scaffold catalog refresh and release; then the live `scaffold surface` run over every catalog checkout.
