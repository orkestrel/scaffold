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
- 2026-10-31: under a local contract pin, a dependent's `test:policy` and `test:config` cannot load, because scaffold 0.0.118 imports `compareValues`, which contract renames to `comparePrimitives`; from the registry, scaffold resolves its own contract 0.0.20, so those suites run in each publish wave, and scaffold's adoption of `comparePrimitives` and process's `Duplex` names ships in item 102's release after both publish. ollama's visit refuses its `tests/setupServer.ts` export `listChildren`, which markdown owns; its adoption unit renames the helper.
- 2026-10-31: 44 package guides still introduce their tables with sentences about a `Shape` cell, the column the surface campaign replaced with the computed `Signature` column, and some are false of it: a guard's cell holds its whole signature, not the type it narrows to. A prose sweep rewrites each against the cells `@orkestrel/guide` computes, one commit per package, before each package's upload.
- Publish-time follow-ups: toolbox gains a case for its workspace tool's `list` operation, whose `kind` reads `isTextContent`, once its suites load against a published agent; lsp's `package.json` description drops "JSON-RPC and protocol guards" after its pins are restored; mcp, lsp, and every package whose guide names a moved name refresh their vendored mirrors at their overwrite.
- Next: the reviews of the in-flight units and their commits; probe's adoption of lsp's renames after lsp's item 81 unit; scaffold's unit after every writer that runs `surface` from scaffold's `dist` finishes, because its contract pin stops that `dist` from loading until it adopts `comparePrimitives`; then the publish layers of § Sequence, starting with scaffold 0.0.119's upload on the user's code.

## Sequence

Each package's units are committed ahead of its upload on local tarballs. Publish in layer order, one one-time code per layer; prepare a layer only after the layer before it is served. For each package of a layer: `swap.ts --restore`, the release visit (`wave.ts --visit`: re-pin to the registry, overwrite with the latest served scaffold, gates), the bump from the registry's version, the self-pin sweep, `prepublishOnly` through a chain plan, the `Release <version>` commit, the upload through `window.ts`, and the push after the registry serves it. Before each upload, run `scaffold surface` live over the layer's checkouts.

0. **Transfers.** scaffold 0.0.119: rule 5 and the wave's transfers (`Release 0.0.119`, chain green).
1. **Layer 0.** contract: item 79.
2. **Layer 1.** codec: item 80. jsonrpc 0.0.1: item 81. html: item 88. indexeddb: item 89. test: item 107. abort, budget, emitter, ndjson, sqlite, and timeout re-pin.
3. **Layer 2.** csv, msg, and sse, each declaring codec: items 85, 95, and 105. console: item 84. form: item 86. markdown: item 92. process: item 97. reason: item 100. router: item 101. table: item 106. database, pool, template, tool, and websocket re-pin.
4. **Layer 3.** capture: process's renames. guide: item 87 and markdown's renames. interpret: item 90. lsp: items 91 and 81. rater: item 99. sea: item 103. server: item 104. workspace: item 110. scaffold 0.0.120: item 102, the contract, process, and test adoptions, and item 107's rule and skill updates. qualifier, queue, relation, and terminal re-pin.
5. **Layer 4.** brief: item 83 and interpret's renames. mcp: items 77, 81, and 93. middleware: items 78 and 94. program: items 98 and 112. worker: items 108 and 111. workflow: item 109.
6. **Layer 5.** agent: item 82 and workspace's and contract's adoptions. probe: item 96 and lsp's renames. browser re-pins, and scaffold's `BROWSE_UPSTREAM` gains jsonrpc when browser re-pins an mcp that declares it.
7. **Layer 6.** ollama: process's renames and the `collectTreeChildren` helper. toolbox: workspace's and server's renames.
8. **Layer 7.** study re-pins.
9. **Close.** A scaffold catalog refresh and release that empties `SURFACE_TRANSFERS`; then the live `scaffold surface` run over every catalog checkout.
