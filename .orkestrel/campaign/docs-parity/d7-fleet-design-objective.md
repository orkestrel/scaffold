Lane held: objective

# D7.n design round — objective lane

Substitution recorded: the Sol bench is dark; `reviewer` (Opus 5) holds the objective lane. Every reading below is from source read first-hand at the cited `file:line`; no command was run.

---

## Decision 1 — release first or head starts

**What the mechanics forbid.** The registry copies cannot carry this work at all, in either direction:

- `@orkestrel/guide@0.0.17` is what every fleet checkout has installed (`/home/user/fleet/abort/node_modules/@orkestrel/guide/package.json:3`). Its published barrel declares `computeSymbolKey`, `createGuide`, `createSource`, `createSourceManager`, `extractSourceLines`, `findUnexampled`, `parseManifest`, and `selectModuleKeys`, and declares **none** of `findDrift`, `collectTitles`, `collectExamples`, `collectKeys`, `locateComment`, `normalizeComment`, `replaceCell`, `replaceExample`, `replaceSummary`, `spliceSpan`, `renderSurface`, the `Drift` type, or the `tagline` member (`node_modules/@orkestrel/guide/dist/src/core/index.d.ts`, searched for each name).
- The published `@orkestrel/scaffold@0.0.63` vendors no seed: `node_modules/@orkestrel/scaffold/dist/host/scripts/` holds `codex.sh`, `cursor.sh`, `deps.sh`, and `ollama.sh` alone. `DOCS_SEED_PATH` is in `HOST_PATHS` on the tip only (`/home/user/scaffold/src/core/constants.ts:112`, `:143`).
- The vendored seed imports every one of the missing symbols at module scope (`/home/user/scaffold/scripts/docs.ts:19-43`), and the fleet's root `tsconfig.json` declares no `include` and excludes only `node_modules`, `dist`, and `tmp` (`/home/user/fleet/abort/tsconfig.json:27`). So `tsc --noEmit --project tsconfig.json` reads `scripts/docs.ts`.

**Consequence the plan must obey.** `repair` from scaffold's tip into a checkout still pinned at `@orkestrel/guide@^0.0.17` lands a seed that fails `npm run check` and a `docs` script that fails at run time. Repair and the guide re-pin are one step, never two.

**Decision.** Release the guide first. Publishing `@orkestrel/guide@0.0.18` costs one owner-approved upload and removes a per-package `--no-save` install, a per-package restore before the release gate, and a per-package record of the replaced range (`.agents/orchestration.md` § Fixing a dependency before it publishes). Scaffold's tip does **not** need to publish first: P18 already proved the tip's CLI runs `repair --offline` from an extracted tarball with scaffold's `node_modules` linked, so one extracted tarball serves every checkout and no scaffold head start is installed anywhere. The fleet then re-pins `@orkestrel/scaffold` in phase B beside its own bump.

**The order this fixes.** Before the fleet pass: the guide publishes `0.0.18`; scaffold re-pins `@orkestrel/guide` to `^0.0.18`, re-stages `dist/host/guides/guide.md` from the guide's pushed branch, and its tip is packed once. During the pass, per checkout: re-pin guide to `^0.0.18` → `npm ci` (or a lockfile-only install) → `repair --offline` from the extracted tip → content work. After the pass: scaffold releases, each package re-pins `@orkestrel/scaffold`, and the publishes run in catalog layer order.

**One sequencing trap.** `guides/guide.md` is a vendored path (`constants.ts:156`). If the fleet repairs before scaffold re-stages the refreshed guide mirror, every package repairs twice. Stage it first.

---

## Decision 2 — the per-package unit

**What is mechanical, proven by the mechanism.**

- The header rename. `extractRowSummary` locates the compared column by the literal header text `Summary` (`/home/user/fleet/guide/src/core/helpers.ts:1443-1449`, `constants.ts:43`), returns `undefined` for a table without it, and `computeDrift` reports that absence (`helpers.ts:2289-2300`). Until the header reads `Summary`, every row drifts as `guide absent` (P15's reading of the guide, `disagreements found: 139`).
- The propagation. `npm run docs -- --to guide` writes only where a `Summary` cell carries the key and refuses the rest with a named reason (`/home/user/scaffold/scripts/docs.ts:290-307`).
- The `docs` script and the seed both arrive from `repair`: `blueprintToWritableScripts` treats `docs` as writable (`/home/user/scaffold/src/core/compilers.ts:451`) and `blueprintToScripts` writes `node --experimental-strip-types scripts/docs.ts` when the workspace carries guides (`compilers.ts:350-353`).
- No existing fleet test reads the header literal: searching `'Behavior'`, `"Behavior"`, and `` `Behavior` `` over `/home/user/fleet/*/tests/**/*.ts` hits only `/home/user/fleet/guide/tests/src/core/helpers.test.ts:3398`, which is the guide's own helper fixture. The rename breaks no suite.

**What is not mechanical, and the brief calls mechanical.** "The gate cases pasted in the landed shape" does not survive contact:

- The landed pin case filters titles through `isNonEmptyString` from `@orkestrel/contract` (`/home/user/fleet/guide/tests/guides.test.ts:26`, `:100`, `:104`). `codec`, `contract`, `msg`, `pool`, and `test` declare no `@orkestrel/contract` (searched `"@orkestrel/contract"` over `/home/user/fleet/*/package.json`; `contract`'s only hit is its own `name` at `package.json:2`). `AGENTS.md` § Non-negotiable rules forbids adding it. Write the pin with a local type predicate instead, in one shape for the whole fleet.
- The landed suite imports the readers from `@src/core` because the guide documents itself (`guides.test.ts:4-25`); every fleet package imports them from `@orkestrel/guide`. Each package's existing header is the template, not the guide's.
- `requireText` is the guide's own `./setup.js` helper (`guides.test.ts:29`); each package's equivalent differs.

**Decision.** Per checkout, one `builder` prelude then one Opus `implementer` unit, in that order, never a fleet-wide builder pass followed by a fleet-wide Opus pass. The prelude owns re-pin, `npm ci`, `repair --offline`, and nothing else, and it ends on a recorded `npm run docs` reading. The Opus unit owns the header renames, the class rows, the gate cases, the cell convergence, the tagline and pitch, the titled pair, and the voice sites. Rationale: a fleet-wide prelude leaves every checkout dirty and red on `check` and `lint:check` while the Opus units queue, and `.agents/orchestration.md` § Writing concurrency requires each writing dispatch to start from a committed baseline.

**Red-first proof.** On the unconverged tree every gate case is naturally red and no planting is needed: the equality case reports each row as `guide absent`, the pin reports empty title sets, and the README case fails at `expect(pitch).not.toBeUndefined()` because no fleet README but codec's carries a blockquote. Record the three readings before the convergence in the unit's report.

**Acceptance criteria per Opus unit, cheap first.** `npx oxfmt --check` over the owned paths; `npx oxlint --config .oxlintrc.json --deny-warnings` over the owned paths; `npm run check`; `npm run docs` exit 0 with `disagreements found: 0` and a non-zero `rows read`; `npm run test:guides`; `npm run test:policy`; `npm run test:config`. Name `npm test` and `npm run build` as observations the unit reports, not criteria — `.agents/orchestration.md` § Check the brief before you send it bars a whole-suite gate as a criterion inside a unit's own exec.

---

## Decision 3 — the pin's population

**The brief's premise is false.** A fence's title is its nearest preceding heading, at any level, flattened (`helpers.ts:2181-2183`, `:2214-2225`). Every fence in every fleet guide therefore already carries a title. `tool.md` has no `## Patterns` and still offers `Anatomy of a tool` (`:119`), `The registry` (`:160`), and `Calls and results` (`:195`), each with a fence beneath it. No package needs a new section, and no package needs a fence moved.

**What is actually missing** is the source half: `grep -rn "^\s*\*\s*@example[ \t]\+[^ \t]" src/` over the fleet hits only `guide/` (absorption § 5), and `findDrift` skips a titled fence whose title no `@example` carries (`helpers.ts:2354-2355`).

**What the mechanism forbids.** Pairing is per title across the whole document and the first fence a title reaches wins, whether under the same heading or a later heading of the same text (`helpers.ts:2314-2316`). A title chosen from a heading text that repeats in the guide binds to the earlier fence. The compared text is the fence language on the first line and the body beneath (`helpers.ts:2356-2360`), so language and body must both agree. `collectTitles` reaches exported declaration heads plus the own members of documented classes and interfaces (`helpers.ts:2368-2371`) — a title on anything else is invisible.

**Decision.** Each package titles exactly one `@example`, on an exported declaration the chosen fence demonstrates, with the title text equal to that heading's flattened text. Choose the heading whose first document-order fence is the intended one, and reject a heading text that occurs twice. Carry the fence body into the block with `npm run docs -- --to source` and read the result; where the block refuses the rewrite, the seed says so by name (`scripts/docs.ts:350-352`) and the unit writes the block by hand. Refuse a candidate fence whose body encloses a three-backtick run — `replaceExample` refuses it, and D7.guide already hit that case.

---

## Decision 4 — the pitch

**What the readers permit.** `extractCellText` drops a link to its text (`helpers.ts:984-993`), so two blockquotes whose hrefs differ still compare equal. `extractTagline` opens on the H1, returns `undefined` if another heading arrives before a blockquote, and joins every paragraph of that blockquote with a single space through `normalizeSummary` (`helpers.ts:2246-2267`).

**What the rules forbid.** `.claude/rules/documentation.md` § Parity fixes a guide tagline and a README pitch as noun phrases, and Ruling 6 (`rulings.md:24`) closed that on the owner's word. Adopting a present fleet tagline verbatim is therefore barred wherever it is not one noun phrase — and `abort.md:3-5` shows the fleet shape: two paragraphs inside one blockquote, with bold runs, which `extractTagline` compares as one long text.

**Decision.** Every package takes the guide precedent: the H1 blockquote becomes one noun phrase in plain text and code spans, the displaced sentences fold into the guide's opening paragraph, and the README gains that same blockquote under its H1. Keep no relative link inside the blockquote. The equality gate would tolerate differing hrefs, but a href copied from `guides/<pkg>.md` into `README.md` resolves against a different base and no gate over the README reads links — a silently broken link is worse than a link removed.

---

## Decision 5 — the class rows

**What the reader forbids.** `extractSurface` unions every backticked H3 entity heading in the `## Surface` section into the surface as `{name, keyword: 'class'}` (`helpers.ts:1452-1459`). Such a symbol has no row and therefore no summary, so it drifts against its class doc block for as long as it stays an H3, and `--to guide` refuses it with `no Summary cell carries the key` (`scripts/docs.ts:299-302`). The H3 form can never satisfy the gate. `tool.md:78` and `:88` are the shape.

**Decision.** contract, csv, html, markdown, msg, tool, and workspace each gain a `### Classes` table placed before the H3 sections, on the D7.guide precedent (`d7-guide-plan.md:7`); the H3 narrative stays.

**Mirrors do not move here.** `.claude/rules/documentation.md` § Parity fixes a vendored dependency guide as fetched bytes to refresh rather than rewrite, and the policy sweep excludes a catalog-registered mirror from the term sweep for that reason (`/home/user/scaffold/tests/setupPolicy.ts:1450-1453`). A mirror is refreshed after its owner publishes, never edited in place. See the risk section for what that costs.

---

## Decision 6 — the voice rule's red

**What repair does.** The fleet's lint configuration at `0.0.63` enables `policy/no-mocking` and `policy/no-keyword-privacy` only (`/home/user/fleet/abort/.oxlintrc.json:59-60`); it enables neither `policy/no-malformed-summary` nor `policy/no-banned-term`. The tip's configuration enables both at the root (`/home/user/scaffold/.oxlintrc.json:59-62`). So the red P18 measured — one site in abort, 183 diagnostics in mcp of which 132 are `no-malformed-summary` and 51 `no-banned-term` — is created by `repair`, at the moment `repair` runs, in every checkout.

**What the rule actually reads.** `no-banned-term` reports comment prose alone, outside code spans, fenced blocks, link tags, and URLs (`/home/user/scaffold/configs/policy.ts:1356-1372`). A banned term inside a string literal a test asserts is **not** reported and needs no edit. The authored-Markdown sweep is the other instrument, and it descends everything but `.git`, `.orkestrel`, `dist`, `node_modules`, and `tmp` (`tests/setupPolicy.ts:238-244`), so a Markdown fixture under `tests/` **is** swept; where such a fixture's text is asserted, reword the fixture and the assertion in one edit.

**Decision.** Keep the voice convergence inside each package's own unit, not in a separate builder pass. `repair` and the lint red are inseparable in time, and a separate pass would leave a checkout committed red or force a second baseline. Where the count is large — mcp's 132 malformed summaries — the unit is split by owned file set (`tests/setupConformance.ts`, `tests/setup.ts`, `tests/setupServer.ts`, `tests/fixtures/browserServer.ts`, `src/core/types.ts`, `tests/src/server/middlewares.test.ts`, per P18), not by rule. Suppression is barred outright by `AGENTS.md`.

---

## Decision 7 — probe

**What the seed does with probe today.** `parseManifest` reads table blocks inside the `## By concept` section and nothing else (`/home/user/fleet/guide/src/core/parsers.ts:30-74`). probe's index is a list (`/home/user/fleet/probe/guides/README.md:3-14`), so `parseManifest` returns an empty array. In the seed, an empty array is not a missing index: `collectMissing` filters over it and returns nothing (`scripts/docs.ts:185-195`), the run reports `rows read: 0, disagreements found: 0`, and `process.exitCode` stays 0 (`scripts/docs.ts:446-452`). The pitch check is also skipped, because `own` is found by `guides/${name}.md` among the rows (`scripts/docs.ts:418-422`).

**So probe's `docs` gate is a false green, not a pass.** Any acceptance criterion written as "`npm run docs` exits 0" passes for probe while measuring nothing.

**Decision.** probe's manifest becomes a `| Concept | Spec | Source | Tests |` table under `## By concept`, and probe adopts the gate cases in its own hand-rolled suite rather than the drop-in — its suite imports `@src/core` and `@src/server` and drives real workspace state (`/home/user/fleet/probe/tests/guides.test.ts:1-12`), and replacing it would delete proofs nothing else carries. probe declares `@orkestrel/guide` at `package.json:105`, so importing `findDrift`, `createGuide`, `createSource`, and `parseManifest` beside its existing imports adds no dependency. Add the `manifest lists at least one guide` assertion with them, so an empty manifest reddens rather than passing.

---

## Decision 8 — batching and concurrency

**What the floor permits.** Disjoint checkouts, one writer each, is permitted and is the shape here (`.agents/orchestration.md` § Permission floor). Two limits bind anyway:

- "Concurrent executors never run tree-wide `format`, lint `--fix`, or `build`." Scope every convergence to `npx oxfmt --write` over the owned paths and `npx oxlint --config .oxlintrc.json --deny-warnings` over the owned paths. The seed's `next: npm run format` line (`scripts/docs.ts:451`) is advice a unit must not take literally. P16 already proved the file-scoped form over a guide.
- A fleet pass reports in slices and commits only the rows it recorded green (§ Writing concurrency, rules 8 and 9).

**What sizing the pass needs.** `npm run docs` in a fleet package needs no local build: the seed's imports resolve to the installed `@orkestrel/guide` dist, not to the workspace's own `dist/` — that self-referential resolution is the guide checkout's alone. The brief's "`npm run build && npm run docs` at zero" is the guide's requirement carried over; verify with M2 and drop the build from every per-package criterion, which removes a build from each of the fleet's units.

**Decision.** Slice by catalog layer, L0 first, with the slice width set by the audit budget rather than by the checkout count. Per package: `builder` prelude, Opus `implementer`, then `verifier` at the end of the layer. Audit shape: `checker` on every package, because every acceptance criterion here is mechanical (exit codes, header text, row presence, one titled pair); the objective and subjective lanes run **per slice**, each lane reading the whole slice's diffs with one shared claim sequence. `.agents/orchestration.md` § Context and decomposition sanctions exactly that fan-out over disjoint slices, and it satisfies the falsification law's per-claim requirement without spending a lane pair per checkout. Do not run the lanes on a sample and the checker on all: a sampled lane leaves an unaudited judgment surface, and the judgment is the part a checker cannot read.

**Wall clock and tokens are unmeasured.** Nothing in P15 to P18 timed a per-package pass. M1 and M3 must run on one L0 package before a slice width is chosen.

---

## Decision 9 — scaffold's own template

**What the emitter says.** `blueprintToTestArtifacts` deliberately emits no guides proof, and the reason is stated in place: "A guide proof is not emitted while the workspace intentionally has empty barrels and no package guide" (`/home/user/scaffold/src/core/compilers.ts:1203-1204`). A birth-owned guides test would redden a newborn target on its first gate run. A presence-owned one would land nowhere, because every existing target already carries the file.

**Decision.** Do not take it. It delivers nothing to the fleet, obliges a scaffold `dist/src` bump and publish, and contradicts a documented emitter ruling. If the owner wants a newborn target born with the cases, it is a scaffold successor unit whose brief must first settle what a newborn workspace's empty barrels do to the equality case — a design question, not a template edit.

---

## Decision 10 — the exit criterion

Per package, each of these ends implemented, repaired, retained, or intentionally excluded on evidence:

1. `@orkestrel/guide` pinned to `^0.0.18` and the lockfile carrying it.
2. `repair --offline` applied, its written path list recorded.
3. Every `## Surface` and `## Methods` table heads `Summary`, beside only `Kind`, `Shape`, `Signature`, `Value`, `Returns`.
4. Every H3-documented class carries a row.
5. `npm run docs` reports a non-zero `rows read` and `disagreements found: 0`, exit 0.
6. One titled `@example` pairs with its fence, and the pin case names both title sets on failure.
7. The H1 blockquote is one noun phrase and the README pitch is that text.
8. The equality case, the pin, and the README case are in `tests/guides.test.ts`, each read red before its convergence, with the readings recorded.
9. `format:check`, `lint:check`, `check`, `build`, and `npm test` green, each exit code read by an independent `verifier`.
10. The version bumped with the lockfile.

For the pass: every fleet checkout closes those rows, `probe`'s manifest is a table and its suite carries the cases, and the mirror question is ruled explicitly rather than left silent.

**The owner decides** the guide's release ahead of the pass, scaffold's release after it, and each package's publish in catalog layer order. Phase B carries, per package: the `@orkestrel/scaffold` re-pin, the runtime re-pins to whatever its layer-below dependencies just published, the gates against the registry copies, and the upload.

---

## Measurements missing before a unit can be briefed

| # | Question | Command |
| --- | --- | --- |
| M1 | Each package's drift size, which fixes the unit's cost | in a scratch clone with the guide re-pinned and repaired: `npm run docs` — record `rows read` and `disagreements found` |
| M2 | Whether `npm run docs` needs a local build outside the guide checkout | in a scratch clone: `rm -rf dist && npm run docs`; read the exit code |
| M3 | The post-repair gate state per package (P18 read lint alone, for abort and mcp alone) | `npm run check`; `npx oxlint --config .oxlintrc.json --deny-warnings .`; `npm run test:policy`; `npm run test:config`; `npm run test:guides` |
| M4 | `--to guide` fidelity over table shapes the guide does not have — a `Signature` column carrying `\|` (`/home/user/fleet/codec/guides/codec.md:12`), a Types table gaining an empty `Summary` cell | in a scratch clone: `npm run docs -- --to guide`; `npx oxfmt --write guides/<pkg>.md`; `npm run docs`; then the P16 cell comparator over before and after |
| M5 | Whether the guide re-pin leaves the tree otherwise clean | `git status --porcelain` after the re-pin and the lockfile install |
| M6 | What else `repair` will overwrite per package, tsconfig content in particular | `node <extracted-tip>/dist/bin/main.js audit --offline --json` before repair |
| M7 | Which packages hold a mirror of which owner's guide, and whether any gate reads one | `ls /home/user/fleet/*/guides/*.md`; then `grep -rn "guides/<owner>.md" <pkg>/tests` |
| M8 | The host's Node version against `--experimental-strip-types` and `engines: >=22.12.0` (`/home/user/fleet/abort/package.json:88-90`) | `node --version` |
| M9 | Which existing suites the README blockquote breaks (form, html, mcp, ndjson, process, sse, table, test, timeout, workspace, csv, and brief read the README) | after the README edit alone: `npm run test:guides` |
| M10 | One package's end-to-end wall clock, to set the slice width | time the L0 pilot from re-pin to `verifier` green |

---

## Numbered falsifiable claims the plan must survive

1. `@orkestrel/guide@0.0.17` exports none of `findDrift`, `tagline`, `collectTitles`, `collectExamples`, `collectKeys`, `locateComment`, `normalizeComment`, `replaceCell`, `replaceExample`, `replaceSummary`, `spliceSpan`, so both the vendored seed and the gate cases fail to compile in a checkout pinned there.
2. `@orkestrel/scaffold@0.0.63` vendors no `scripts/docs.ts`, so no fleet checkout can acquire the seed without the tip or a scaffold release.
3. `tsc --noEmit --project tsconfig.json` reads `scripts/docs.ts` in every fleet checkout, because the root tsconfig declares no `include`.
4. `npm run docs` in a fleet checkout requires no local build.
5. A `## Surface` or `## Methods` table whose compared column is not headed `Summary` yields no summary for any of its rows, and `--to guide` refuses every such row.
6. A backticked H3 entity heading under `## Surface` enters the surface with no summary and cannot be converged without a table row.
7. Every guide fence already carries a title; the missing half of every example pair is a titled `@example` on the source side.
8. Two blockquotes whose links differ only in href compare equal, so codec's pitch and tagline already agree in the compared form.
9. A multi-paragraph blockquote compares as one joined text, so no fleet tagline satisfies the noun-phrase rule as written.
10. The landed pin case cannot be pasted into codec, contract, msg, pool, or test, because none declares `@orkestrel/contract`.
11. probe's `npm run docs` exits 0 today while reading no rows, so an exit-code criterion passes vacuously there.
12. Every package's published surface moves in this campaign — `files` ships `README.md` and `dist/src`, and the declarations carry the edited doc comments — so each package bumps and publishes on its own account, and each dependent re-pins in layer order.
13. `repair` rewrites the root `tsconfig.json` and the `docs` script wholesale, so any hand-tuned compiler option in a fleet checkout is reverted by the prelude.
14. The voice rule's red is created by `repair`, not present today: the fleet's `0.0.63` lint configuration enables neither `no-malformed-summary` nor `no-banned-term`.
15. `no-banned-term` reads comment prose only, so a banned term inside an asserted string literal needs no edit; a banned term in an authored Markdown fixture does, because the prose sweep descends `tests/`.

---

## Risks the subjective lane is likely to understate

**The mirror fan-out has no mechanism and no gate.** mcp alone holds mirrors of codec, contract, emitter, process, router, server, sse, tool, websocket, and test. D7.n rewrites every one of those owners' guides. No gate reads a mirror: it is outside the concept index, so `findDrift` never sees it; the term sweep excludes it (`tests/setupPolicy.ts:1450-1453`); `scaffold audit` covers only `guides/guide.md` and `guides/scaffold.md` (`constants.ts:156-157`). Worse, guides do not ship — `files` is `dist/src` and `README.md` (`/home/user/fleet/abort/package.json:20-23`) — so a mirror **cannot** be refreshed from an installed tarball at all. Either the plan rules mirrors intentionally excluded on that evidence, or it names the copy mechanism and the pass that runs it after the owners land. Silence here ships every dependent with a guide describing a shape its dependency no longer has.

**The publish is a full layer cascade, not a devDependency re-pin.** The guide and scaffold re-pins reach nobody (`.agents/orchestration.md` § What a bump obliges), but the doc-block edits move each package's `.d.ts`, so every package publishes, and every dependent must then re-pin its runtime ranges to the versions just published, re-run its gates, and bump again. That second per-package edit sits after the content work, is strictly serial by layer, and is not in the brief's unit list.

**mcp does not fit one unit.** Its `## Patterns` heading is at `mcp.md:3747`, its post-repair lint reads 183 diagnostics, and its suite reads the README. Sizing the pass at one unit per package prices mcp, browser, agent, contract, html, test, and process the same as abort.

**A vacuous green reads exactly like a pass.** probe is the known case; any package whose `## By concept` table fails to parse produces the same `rows read: 0` exit 0. Every `docs` criterion must assert a non-zero `rows read`, not an exit code.

**The lockfile step is unbudgeted.** The bump must reach `package-lock.json` — D7.guide's R1 correction found `0.0.17` surviving at `package-lock.json:3` and `:9` after the manifest was edited. That is a network install per package, and `.agents/orchestration.md` § Long-running commands keeps network work out of bench execs.

**`--to guide` fidelity is proven over one guide's table shapes.** P16 covered the guide's four-column tables. The fleet has three-column tables (`abort.md:25`), a `Signature` column carrying an escaped pipe (`codec.md:12`), and Types tables that must gain a `Summary` column with initially empty cells. M4 is the control.

**A unit's own timing readings are systematically pessimistic** (§ Writing concurrency, rule 10). Under a layer slice, a red `npm test` inside a unit is a question for the Orchestrator's own re-run, not a deviation.

---

## Corrections to this brief's evidence

1. **The codec row in the absorption is wrong.** `d7-fleet-absorb-distillate.md:142` records codec's pitch as unequal because the spec writes `[`src/core`](../src/core)` and the README writes `[`src/core`](src/core)`. `extractCellText` drops a link to its children (`helpers.ts:984-993`), so both sides flatten to the same text and the pair already agrees. The distillate's closing set repeats the error at `:248`. Treat codec's pitch as satisfied pending M1's reading, and treat the brief's decision 4 rationale for banning links as resting on the README link resolving to nothing, not on the comparison.
2. **The goal statement carries the guide's build precondition.** "`npm run build && npm run docs` at zero" is true in the guide checkout, where `@orkestrel/guide` resolves through the workspace's own `exports` to its `dist/`. In a fleet checkout the seed resolves to the installed dependency. Confirm with M2 and strike the build from the per-package criteria.
3. **Decision 3's premise is false.** No package needs a `## Patterns` section, and no fence needs relocating: a fence's title is its nearest preceding heading at any level (`helpers.ts:2181-2183`).
4. **Decision 2 lists the gate cases as mechanical.** They are not portable verbatim: the `@orkestrel/contract` import is unavailable in codec, contract, msg, pool, and test, and the reader imports and the text helper differ per package.
5. **The evidence section says the drop-in "imports `findDrift` from the registry" after a release.** True, and the seed does too — the brief's release-first branch omits that the seed's whole import list (`scripts/docs.ts:26-43`) is unavailable at `0.0.17`, which is what makes repair-before-re-pin an unconditional red rather than a preference.
6. **The evidence section omits the mirror-staging order.** `guides/guide.md` is vendored (`constants.ts:156`), so scaffold must re-stage it from the guide's pushed branch before the fleet pass, or every checkout repairs twice.
7. **The brief's decision 6 asks what a unit does with a banned term in an asserted fixture.** The premise holds only for a comment or an authored Markdown fixture; `no-banned-term` never reads a string literal (`configs/policy.ts:1356-1372`).