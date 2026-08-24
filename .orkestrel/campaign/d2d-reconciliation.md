# D2d reconciliation — the scaffold seams

Lanes: planner (Opus 5, subjective) and analyst (GPT-5.6 Sol, journaled exec
`tmp/codex/d2d-analyst.jsonl`). Ruled by the Orchestrator, 2026-08-24. Lane reports retained
beside this file.

## Rulings

1. **Browser-face classification: the two-signal classifier.** `resolvesBrowser(entry)`: false
   when the browser walk resolves nothing; true when its target starts with `BROWSER_OUTPUT`
   (the convention scaffold itself publishes — a pure identity reading would misclassify every
   generated browser workspace, whose browser and import walks resolve the same file); true when
   the browser target differs from both Node walks' targets (the ROADMAP vector); false when it
   equals a Node target outside the prefix. The fused fact splits: `module` and `required` narrow
   at `buildStage` (excluding the browser artifact), and the `!entry.browser` negations at the
   Node drives delete. Totality, browser gate, and core-only guard keep their text; the guard now
   fires for a condition-published browser face. Pin: a registry-independent classifier table
   emitted in the proof, outside `requireStage`, with the condition-selected, convention, universal,
   and Node-only control rows, plus the objective lane's shared-with-import and shared-with-require
   rows.
2. **The `commonjs` selector: membership from the require-walk's resolved target format.**
   Resolve with `RUNTIME_CONDITIONS.commonjs`; admit `.cjs`, `.node`, and extensionless targets;
   refuse `.mjs`; for `.js` read the nearest manifest's `type` (admit unless `module`).
   Declaration compatibility splits into its own helper (`declaresCommonJS`, the current
   `.d.cts`/`.d.mts`/`.d.ts`+type reading verbatim) consumed by `selectUntypable` as
   `entry.required && mapping declares require && !declaresCommonJS(...)`. `commonjs && !required`
   becomes unrepresentable. A genuine ESM-only subpath stays excluded (`.mjs`, or `.js` under
   `type: module`, or nothing under the require walk). U0 probes FIRST whether the ROADMAP's two
   vectors mis-select today — the subjective hand-walk suggests the current selector may already
   pass them, and the row's closing condition follows the probe, not the prose.
3. **`prepack`: fix the emitted value, then assert one literal.** The compiler emits
   `scripts.prepack = 'npm run build'` (delegation; the inlined chain drifts when `build` moves —
   today `compilers.ts:428` copies the chain while scaffold's own manifest and the guide say
   `npm run build`, so the assertion as the ROADMAP wrote it would invert across the fleet). The
   vendored assertion is a sibling test in `tests/config.test.ts` named for packing:
   `expect(prepack).toBe(publishes ? 'npm run build' : undefined)`, with the file's inline
   throwing-control idiom. It lands only after the script-refresh mechanism ships and the fleet
   census (grok) reports who reddens. `compilers.test.ts:443`'s self-referential
   `toBe(published.build)` becomes the literal.
4. **Factory signature: zero-parameter factories.** Every emitted factory declares
   `(): UserConfig`; the four wrappers that pass options compose
   `defineConfig(mergeConfig(srcCore(), {...}))` importing `mergeConfig`; project rows stay bare
   identifiers, so the vendored config proof's name-keyed lookup and the measured `--mode`
   behavior stay untouched. The options parameter was a `mergeConfig` rename the wrapper law
   refuses. The objective lane's arrow adapters are refused: anonymous rows break the vendored
   proof and demand a fresh mode probe. New pin: an emitted-template check that no factory
   declaration carries a parameter list, with a planted-parameter control; plus a sentinel-env
   invocation test asserting env fields do not enter the returned config.
5. **Seed history: documented exclusion.** No history table before a seed moves — an empty
   mechanism has no consumer and fails silently in the defect's own direction. Pin the planned
   seeds byte-exact (`ARTIFACT_TEMPLATES.tests.setup`, `.global`) with a mutation control; add
   the limit sentence to the guide's release-skew paragraph ("audit compares each setup module
   only with the seed the installed release plans; it does not retain earlier seed bytes"). The
   row closes as documented. The objective lane's future table shape (`SETUP_SEED_HISTORY`,
   exact paths to frozen prior nonempty seeds, empty seed omitted) is recorded here for the day
   a seed first moves.
6. **Script refresh: `repair` refreshes the unscripted half; chains stay the maintainer's.**
   `blueprintToWritableScripts` grows to the direct `test:<project>` scripts plus `test:probe`,
   `test:bench`, and `prepack` (with `prepublishOnly` as today); gate chains (`test`, `check`,
   `build`, `dev`, `serve`, `show`) stay advisory — the objective lane's full-authority
   restoration is refused because it clobbers maintainer-owned chains. `audit` gains a
   non-blocking `scripts` question (manifest group) naming each planned direct script the
   manifest lacks, in the `#dependencyQuestion` vocabulary; `#projectQuestion` keeps only the
   ungated half. For html: audit names `test:probe` and `test:bench`; repair appends both;
   intentional extra scripts survive byte-for-byte. Pin: the html-shaped CLI fixture test with
   the customized-script refusal control and the objective lane's negative control (a key omitted
   from the writable projection leaves the terminal question standing).

## Units (serial in the scaffold checkout; SD6 read-only parallel)

| Unit | Role / engine | Subject |
| --- | --- | --- |
| SD0 | sol | commonjs vector probe under `tmp/probe/` — blocks SD1's brief |
| SD1 | sol | distribution-proof classifiers (rulings 1 and 2) in `templates.ts` |
| SD2 | sol | script region and refresh + emitted `prepack` (rulings 3-generator and 6) |
| SD4 | implementer / Opus | factory signature (ruling 4) |
| SD3 | sol | vendored `prepack` assertion + guide line (ruling 3), after SD2 and SD6 |
| SD5 | implementer / Opus | seed pin + limit prose (ruling 5) |
| SD7 | implementer / Opus | editorial: templates.ts directional comments (654/678), the D1 architecture.md implementations-cell repair, the vendored instruction-file directional sense sweep |
| SD6 | grok | fleet `prepack`/`private` census (before SD3) |
| SDV | verifier | host gate chain at integration |

Audits: Sol-written units by reviewer (Opus); Opus-written units by analyst (Sol).
Propagation ledger: SD1 emitted-template (presence-owned proof — existing targets receive it only
by deleting the proof and running repair; record with the release); SD2 dist-only; SD3
vendored-host (bump + fleet repair); SD4 emitted-template (content-owned configs — repair
rewrites them); SD5 none; SD7 mixed (templates.ts emitted comments + vendored rules files).
