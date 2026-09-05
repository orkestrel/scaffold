**Role and lane:** `reviewer` on Claude Opus 5, holding the **objective** lane (correctness, constraints, and what the code and contracts permit) as the recorded substitution for the dark GPT-5.6 Sol bench. The writer was `builder` on Claude Sonnet, so my engine did not write this work. I ran nothing; every reading below is from the supplied evidence and the live tree.

# Per-claim verdicts

## 1. `catalogToLayers` orders a found row after every found row its `peers` name — CONFIRMED

Traced on the real function, not on the report. `/home/user/scaffold/src/core/helpers.ts:730` builds each row's edge set as `[...entry.dependencies, ...entry.peers]`, filtered to `published` (rows whose lookup is `found`). On the diff's fixture (`tests/src/core/helpers.test.ts:388-412`): `published = {middleware, server}`; `pending` = `middleware → {server}`, `server → {}`; round 0 emits `['@orkestrel/server']` and deletes it from middleware's set; round 1 emits `['@orkestrel/middleware']`. Result `[['@orkestrel/server'], ['@orkestrel/middleware']]`, exactly the assertion.

The mutation control is sound by construction rather than by the writer's word: without the `...entry.peers` spread, middleware's set is empty, both rows are ready in round 0, and the function returns `[['@orkestrel/middleware', '@orkestrel/server']]` — the exact red reading the report quotes. The test cannot pass without the spread.

Attacks that came back clean: a peer naming a package outside the fleet (`published.has` filters it — `@orkestrel/probe` peers `oxlint`, `typescript`, `vitest` and still lands at `L5`; `@orkestrel/test` peers `vitest` and still lands at `L0`, `/home/user/scaffold/.claude/agents/orkestrel.md:72,90`); a name appearing in both `dependencies` and `peers` (the `Set` dedupes); a peer naming a row whose lookup failed (absent from `published`). Independent corroboration from the shipped artifact: the regenerated live table places `@orkestrel/middleware` and `@orkestrel/mcp` at `L4`, after `@orkestrel/server` at `L3` (`.claude/agents/orkestrel.md:66,67,83`), and every row still carries a layer, so the peer edges introduced no cycle in the live fleet.

## 2. `Upstream.catalog()` reads `peerDependencies` from the same version record, answers `[]` when absent, and reads no development edge — CONFIRMED

`/home/user/scaffold/src/server/Upstream.ts:616-640`: `#edges` resolves `versions[version]` once and then reads `manifest[section]`, so both sections come from the same version record of the same fetched packument; `#entry` at `:594-600` is the only construction site of a found `CatalogEntry` in `src/` (grep for `lookup: 'found'` returns no other). `if (!isRecord(declared)) return []` gives `peers: []` for a record with no `peerDependencies`. The `section` parameter's type is `'dependencies' | 'peerDependencies'`, and no call passes anything else, so `devDependencies` is unreachable. The new case (`tests/src/server/Upstream.test.ts`, packument built with `peer` and `development`) pins `peers: [server]` with `dependencies: []`, and the existing dev-edge case now pins `peers: []` beside its runtime edges — the two together exclude both leak directions.

Observation, no action required: `#edges` now runs `parseJSON(content)` twice per package, once per section.

## 3. `isCatalogEntry` refuses a found row without `peers`, admits `peers: []`, and the missing branch carries `peers?: never` — CONFIRMED

The installed declaration settles the guard's semantics: `node_modules/@orkestrel/contract/dist/src/core/index.d.ts:5160-5189` — with no `optional` argument, `recordOf` requires every shape key and rejects extra keys. So a found row lacking `peers` fails the first branch on the missing key (`src/core/validators.ts:513`), and cannot fall through to the second branch, whose `lookup` is `literalOf('missing', 'unmatched', 'failed')` and whose exactness check refuses `version` and `dependencies`. `peers: []` is admitted because `isCollection` is `isArray(value) && value.length <= MAX_COLLECTION_ITEMS` (`src/core/validators.ts:144-146`) and `arrayOf` over an empty array is vacuous. `src/core/types.ts:265` carries `readonly peers?: never`, and `:256` carries `readonly peers: readonly Dependency[]`.

Non-fleet peer names pass the row guard: `isDependency` is structural (`src/core/validators.ts:216-223`) and does not apply `isDependencyName`, so `oxlint` and `vitest` in a real `peers` list do not turn a live catalog row invalid.

## 4. The rendered table carries the padded `Peer dependencies` column — CONFIRMED

`src/server/Materializer.ts:1128-1139` appends the fifth header and renders `entry.peers` with the same `` `name` `range` `` join as column four; `:1122` gives a not-found row a fifth empty cell; `:1140-1148` computes each width over the header and every row cell and pads every cell with `padEnd`, so the new column is padded by the same code path as the others.

Measured on the artifact the built CLI actually produced, not only on the fixture: in `/home/user/scaffold/.claude/agents/orkestrel.md`, the header's fifth cell is `Peer dependencies` plus padding to 62 columns and the separator row's fifth cell is exactly 62 dashes, which equals the width of the widest peer cell (`` `@orkestrel/database` `^0.0.13`, `@orkestrel/server` `^0.0.18` ``, line 67, 62 characters). Peer cells render comma-joined at lines 66, 67, 72, and 90. The live table has no not-found row, so the empty-fifth-cell case rests on the `Materializer` case alone, which asserts the padded row text (`tests/src/server/Materializer.test.ts:1182-1190`).

## 5. Every enumerated sentence about which edges the catalog reads is true after the change — CONFIRMED

Each site read in the live tree, not in the diff: `guides/scaffold.md:1086,1089-1093` ("`dependencies` and `peerDependencies` are read", with the peer-ordering sentence and the retained `devDependencies` exclusion); `src/core/types.ts:242-245`; `src/core/helpers.ts:699-703` ("Only RUNTIME and PEER edges … count"); `src/server/Upstream.ts:609-615`; `.claude/agents/orkestrel.md:123-124` ("derived from the runtime and peer edges in the same row"). No enumerated site says only `dependencies` is read, and none says development edges are the only edges not read.

One weak spot inside the claim, ruled not broken: `src/core/types.ts:239-241` still reads "`dependencies` are the RUNTIME edges the published version declares, which is what a publish order is computed over". That clause is now non-exhaustive rather than false, and the sentence added immediately after it states that peers order a dependent the same way. A reader gets the truth from the paragraph. If a fix round opens for another reason, tightening that clause is cheap.

See the referral for `.agents/orchestration.md`, which is a sentence of the same kind outside this claim's sites and outside this unit's scope.

## 6. `git status --short` and the `host.json` regeneration account for the tree — BROKEN

The path conjunct holds. Every path in `tmp/units/catalog-peers.status` is under the writer's Owned row, is `host.json`, or is under `.orkestrel/campaign/wave-debrief/**`, which the standing conditions admit; `tests/setup.ts` is named in the report under "any further test file `npm run check` reddens"; `package.json`, `README.md`, `.agents/**`, and `src/bin/**` are absent.

The `host.json` conjunct is broken, and the tree is currently red because of it.

**Failing evidence.** `.claude/agents/orkestrel.md`'s marker-bounded catalog table was regenerated **after** the `npm run build` the audit brief records.

- `/home/user/scaffold/dist/host/claude/agents/orkestrel.md:123-124` carries the unit's prose edit ("derived from the runtime / and peer edges in the same row"), so that staging ran after the unit returned, as recorded.
- The same staged file at `:46-49` carries a **four-column** table with `@orkestrel/abort` `0.0.8` and `@orkestrel/contract` `^0.0.13`.
- The live `/home/user/scaffold/.claude/agents/orkestrel.md:46-97` carries a **five-column** table with `@orkestrel/abort` `0.0.9`, `@orkestrel/contract` `0.0.16`, and peer cells.
- `host.json:339-344` records `digest: c951745239db0594955aa7667a7d5d89d7a8e1b3e8475c645d9bfcfda6afb360` for destination `.claude/agents/orkestrel.md`, written by the same `npm run build` that staged the four-column copy.
- `src/server/helpers.ts:1211-1238`: when the module runs from TypeScript source, `readHostFloor` reads `HOST_INVENTORY_PATH` and each entry's **destination in the checkout**, and throws `The vendored host cannot read the declared file at <path>` when the live bytes do not hash to the recorded digest.

So the digest `host.json` records for that destination was taken over the pre-regeneration bytes, and `readHostFloor()` now throws for it — reinstating exactly the failures the writer's deviation section reported. The recorded `test:src:server` (432 passed) and `test:src:bin` (245 passed) readings no longer describe this tree. `dist/host/guides/scaffold.md:1086,1089` is current, so the staleness is scoped to the catalog file alone.

The supplied evidence also cannot show this: `tmp/units/catalog-peers.diff` contains no `host.json` hunk and no hunk over `.claude/agents/orkestrel.md:44-99`, while the status was re-rendered later. The diff and the status are not one snapshot of the subject.

**Smallest correct fix.** Regenerate the catalog first, then run `npm run build` again so `host.json` and `dist/host` digest the current `.claude/agents/orkestrel.md`; re-render `git diff` with `host.json` and the table region included; re-run `npm run test:src:server` and `npm run test:src:bin` and record their exit codes. One command settles the residual alternative (a `build-inventory` run without restaging, which nothing records): `npm run test:src:server`.

## 7. The changed prose carries no banned term — CONFIRMED

Swept case-insensitively over the added lines of `tmp/units/catalog-peers.diff` with the pattern `^\+.*(should|simply|just|easy|easier|via|e\.g\.|i\.e\.|etc\.|currently|latest|leverage|utilize|allows you to|in order to|sanity|dummy|ensure|guarantee)` and, for counts, `^\+.*\b(new|now|both|two|three|one|all)\b`. Every hit ruled by its sense:

- `via` at diff line 170 — inside the word `abbreviated` in `src/server/Upstream.ts:610`. Permitted; not the word the row bans.
- `both` at diff line 390 (`tests/src/core/helpers.test.ts` comment) — the sentence names middleware and server, which is the condition the `both` rule states. Permitted.
- Every `one` hit (`one request per package`, `one exact release`, `one layer after`, `one with peers: []`, `the wrong one`, `a stored one`) is a value or a singular referent, never a tally of a growable set. Permitted.
- `both edge kinds` in the removed `tests/setupServer.ts` comment became `every edge kind` — a count removed rather than corrected.

No `should`, `simply`, `just`, `easy`, `via` as a word, `e.g.`, `i.e.`, `etc.`, `currently`, `now`, `new`, or `latest` in a dating sense.

## 8. Diff hygiene and recorded gate readings — BROKEN, narrowly

The code conjuncts hold. No `any`, no `as` assertion, and no `!` non-null assertion appears in an added line. No nested function declaration: the added `.map((dependency) => …)` in `src/server/Materializer.ts:1129` is an anonymous callback passed directly as an argument, which `.claude/rules/architecture.md` § Functions and orchestration permits. Every new interface property is readonly: `readonly peers: readonly Dependency[]` and `readonly peers?: never` (`src/core/types.ts:256,265`), `readonly peer?: Readonly<Record<string, string>>` (`tests/setupServer.ts:221`). The test names state what they prove.

The gate-reading conjunct is false. `tmp/units/catalog-peers-report.md:73-77` names exit codes for `format:check`, `lint:check`, `check`, `test:src:core`, and `test:guides`, but records `test:src:server` and `test:src:bin` as "**1 failure**" and "**5 failures**" with no exit code.

**Smallest correct fix.** Record the exit codes for those two gates in the retained report, or replace those rows with the Orchestrator's own superseding readings once claim 6's rebuild is done.

This break is about the record, not the code. It alone would not justify a fix round; it closes inside the rebuild claim 6 already forces.

# Findings outside the claims

**F1 — `.agents/orchestration.md:858` still states the order law the code now falsifies.** The sentence reads "the fleet publishes in topological layer order derived from runtime `dependencies` alone." After this change the order is derived from runtime and peer edges. The prose is a sentence of exactly the kind claim 5 tests, at a site claim 5 does not enumerate. Right looks like: the runtime and peer edges named, with development edges stated as excluded because they reach no consumer of the published package. **Carrier:** the standing conditions place `.agents/orchestration.md` with the in-flight canon unit, and `.orkestrel/campaign/wave-debrief/instraudit-objective.md:57` already assigns it that landing. Do not dispatch it twice; confirm it landed before this change ships.

# Referrals

**R1 — an optional peer is treated as an ordering edge (no verdict from me).** `catalogToLayers` counts every entry in `peers`, and nothing reads `peerDependenciesMeta`. Delaying a publish by one round is harmless, but two fleet packages that declare each other as optional peers would form a cycle and both rows would lose their layer cell. No such pair exists in the live catalog (every row at `.claude/agents/orkestrel.md:48-97` carries a layer). This is a design boundary rather than a defect: whether an optional peer orders a dependent is a ruling, and the guide's cycle paragraph (`guides/scaffold.md:1114-1118`) already tells a reader how to read an omitted row. Referred to the Orchestrator, because the subjective lane is not running this round.

**R2 — cosmetic line shape, subjective lane not running.** `.claude/agents/orkestrel.md:124` now runs to 99 columns inside a paragraph otherwise wrapped near 85, because the inserted words were not re-wrapped. Markdown sits outside `oxfmt`'s scope (`.oxfmtrc.json` covers the JavaScript, TypeScript, and JSON surfaces), so no gate reads it, and the file is vendored to every target through `repair`. Referred to the Orchestrator.

# Claims attacked and held

Claims 1, 2, 3, and 4 were attacked with concrete adverse inputs — a peer outside the fleet, a duplicated edge name, a peer to a failed row, a packument with all three sections, a found row missing `peers`, an unscoped peer name, a not-found row's fifth cell — and held. Claim 1's mutation control was re-derived independently of the writer's report and predicts the report's quoted red output exactly. Claim 5 held over its enumerated sites and produced F1 outside them.

VERDICT: FAIL 6, 8; outside the claims: F1
