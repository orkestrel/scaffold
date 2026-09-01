# Unit devadopt and the W-DEV sweep — report (2026-09-01)

Adoption: `adoptguide.mjs` rewrote `tests/guides.test.ts` in every checkout except `guide` and
`probe` (no old-name hit there): `fenceImports` → `extractFenceImports`, `missingSymbols` →
`findMissingSymbols`, `symbolKey` → `computeSymbolKey`, comments included, import specifiers
re-sorted; `brief`'s two `declarationBody` calls became `extractDeclaration(...)?.body ?? []`;
`mcp`'s `tests/setupServer.ts` adopted `extractFenceImports` after the sweep surfaced it. Each
checkout committed "Adopt the renamed guide helpers in the parity test" and pushed (47 pushes in
`/home/user/work/logs/adopt-all.log`).

Sweep (`devsweep-parallel.sh`, logs under `/home/user/work/logs/devsweep/`, rows in
`devsweep2.log` and `devsweep3.log`): every checkout's @orkestrel closure staged from committed
tips in one install and verified; `npm run check` and `npm run test:guides` per checkout.

- Green (`check=0 guides=0`): abort, agent, brief, budget, codec, console, contract, csv, emitter,
  form, guide, html, indexeddb, interpret, lsp, markdown, middleware, msg, ndjson, ollama, pool,
  process, program, qualifier, queue, rater, reason, relation, router, sea, server, sqlite, sse,
  table, template, terminal, test, timeout, tool, toolbox, websocket, worker, workflow, workspace,
  scaffold; mcp after its setup-helper adoption (`check=0`).
- Red on `test:guides` only, carried to the owning unit as a ruling in `fix/rulings.json`:
  browser (`BrowserPageInterface > documents every interface method`), database
  (`DriverInterface`), mcp (`MCPProgressOwnerInterface`) — the guide's parity now resolves
  methods through `extends`, so an extending interface's Methods table must list inherited
  call-signature members.
- Red, pre-existing and unrelated: probe (`guides fences > earns the receipt the guide documents`
  fails because the Oxlint language server exits before arming in this container, the same
  instrument failure recorded on pristine main).

Defect found and fixed in the harness during the sweep: three concurrent packs of `guide` raced on
its `dist/` and produced a tarball without compiled files that verified as installed; `pack-dep.sh`
now locks per package, packs with scripts ignored after its own build, and trips on a tarball
carrying no declaration file (commit `5db3ed0`).

W-DEV closes: test and guide applied and audited; canon carrier landed; every checkout adopts the
renamed helpers; the register (`fix/tarballs.json`) names every staged tarball with its commit.
