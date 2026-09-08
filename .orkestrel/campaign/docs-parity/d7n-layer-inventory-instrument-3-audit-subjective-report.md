# Verdict — subjective lane (design fit)

Lane held: **subjective** — design acceptance, API and vocabulary, architecture fit, simplification, product coherence. Correctness, constraint satisfaction, and test sufficiency stay with the objective lane; where I met one I refer it with evidence and rule nothing.

## Numbered verdicts

**1. Reads only the declared population; writes only below an absent validated output directory; cannot install, change repositories, load project source, inspect auth files, or send credentials — UNRESOLVED.**
The claim is a constraint claim end to end, and my lane cannot settle it. Referred to the objective lane. What I did settle: `PACKAGES` (layer-inventory.mjs:7-57) is the original instrument brief's population member for member (`tmp/units/d7n-layer-inventory-instrument-brief.md:29-33`), and the registry request carries only an `accept` header (:586-589). The design-acceptance half of the requested shape is present.

**2. Manifest, lock root, lock entries, and registry projections retain every required category and metadata; absent latest/release cannot be called complete; a nested foreign lock entry is not Orkestrel by ancestry — CONFIRMED.**
Field-by-field against the original brief's collection section: `MANIFEST_FIELDS` (:59-73) plus `name`/`version` (:143) carries every manifest field the brief names; `LOCK_FIELDS` (:84-98) carries every lock field; `NPM_FIELDS` (:100-111) carries every projection field and adds `optional`; `projectRegistryPayload` (:534-578) returns name, url, status, timestamp, tags, version identifiers, latest, and the release manifest with the dist digests. Absent `latest` and absent release each push a reason (:554, :556). `inferLockPathName` anchors its match at the path's end (:311), so `node_modules/@orkestrel/contract/node_modules/foreign` is excluded — the control at tests:236-249 drives that input. See finding F8 for a naming defect inside this retention, which does not falsify the claim.

**3. The npm projection preserves keyed identity, nested dependencies, and unhealthy-node observations; installed attestations compare real identity and version and surface absent optional nodes; failed attestations cannot silently disappear — UNRESOLVED.**
The comparison and failure-path correctness belongs to the objective lane; referred. From my lane the shape is present and loud rather than silent — see finding F6, which is that it is loud twice.

**4. Every failed required Git reading and changed status or hash makes collection incomplete; a negative ancestry check is retained as a real relation; empty error arrays cannot conceal an invalid component — UNRESOLVED.**
Correctness of the aggregation is the objective lane's; referred. Design note held rather than broken: the fallback string `${name} is incomplete` (:691) names the component and no fact, which is the honest floor when the component supplied no reason, not a defect.

**5. Child timeout and buffer limits preserve partial evidence and settle within a bound; Windows termination targets only this invocation's tree; timers and listeners do not retain settled work; registry fetch is bounded — UNRESOLVED.**
Termination and bounding now belong to `@orkestrel/process`, and ruling on them is the objective lane's. Referred, with evidence the objective lane needs: `termination.observed` is computed as `result.code !== null || result.signal !== null` (:240), and the installed declaration states that a spawn fault reports the host's negative errno as `code` for `execute` (node_modules/@orkestrel/process/dist/src/core/index.d.ts:151-152, 161). A child that never started therefore reads as an observed native exit. I rule nothing on it.

**6. Permanent controls exercise the actual projection, filesystem attestation, output preflight, and real-child boundaries; the final controls bind to the reported defects — BROKEN.**
Broken by finding F9 and by the red evidence's provenance. `red.txt:25` locates the first failing test at `test.mjs:68:1` while the shipped control file declares it at line 72, and each later failure's line differs the same way, so the red reading was taken against a control file that is not the one shipped. The brief asked for each control family's membership rule and what it excludes:

- **Structural** (tests:72-83). Members: the literal spellings `value|message|packagePath|packageName|sleepResult|terminateProcess` after `export function`, and a tab-indented `const`/`let`/`var` assigned a parenthesized-parameter arrow. Excludes every rename-only wrapper under any other name, a nested `function` declaration, `const f = x => …`, an arrow at any other indentation, and object-literal method shorthand.
- **Pure projection** (tests:85-144, 236-277). Members: `projectNpmTree`, `projectRegistryPayload`, `selectOrkestrelLocks`, `validateOrkestrelLocks`, `validateGitReading`, `evaluateCompleteness` on literal inputs. Excludes `readNpmTree`'s assembly of them (:494-532), `compareSnapshots` (:659-680), `validateSnapshotReading` (:645-657), and `selectManifest`/`selectLock` directly.
- **Filesystem** (tests:146-234, 279-285). Members: `readLocalPackage`, `attestInstalledNode`, `validateOutputPath` against real temporary files. Excludes `digestFile` and `digestOptionalFile` (:275-292), `readSnapshot` (:302-308), the `DIST_PATHS` hashing branch (:453-461), and `validateInputs` (:743-748).
- **Real child** (tests:287-307). Members: `executeCommand` through `child.mjs` at a timeout bound and a buffer bound. Excludes a spawn fault, a nonzero exit, `readGitReading` (:294-300), and `readNpmTree`'s own invocation.

Two gaps follow from those rules and belong to my lane rather than to sufficiency. `collectInventory` (:697-732) and `executeMain` (:750-766) have no control, so the artifact the instrument exists to produce — the per-package JSON and the `summary.json` a reader opens — is never produced under any control, and its shape is asserted nowhere. `fetchPackument` (:580-609) is exercised by nothing; the registry path is a **limit** of this round's evidence, correctly so given the read-only constraint, and I record it as a limit rather than a defect. Whether the remaining exclusions are sufficient is referred to the objective lane.

**7. Helpers and stateful orchestration obey placement and naming rules, reusable logic is exported, and no assigned nested callback, rename-only wrapper, parser duplication, host-path literal algorithm, or unsolicited dependency remains — BROKEN.**
Broken by findings F1, F2, F3, F4, F5, and F10. The nested-callback half holds: every remaining function expression is an anonymous callback passed directly as an argument (:383, :582, :689, :728, :769), which `.claude/rules/architecture.md` § Functions and orchestration permits. The dependency half holds: `@orkestrel/process` is a declared runtime dependency (package.json:101), so the import adds nothing. The scope half holds for tracked paths — `status.txt` reports only the owner's `package.json` and `package-lock.json` and another unit's campaign records — with this **limit**: `.gitignore:11` ignores `tmp`, so `git status --short` can report nothing about any write under `tmp/`, and the three supplied `--no-index` diffs cover only the three named files.

## Findings outside the claims

**F6 — The same reason reaches the output twice (:524-530, :712-713, :123-130).**
`readNpmTree` folds the attestation reasons into its own `reasons`, and `collectInventory` also stores the attestation result as a top-level component that `evaluateCompleteness` reads separately, because `attestations` is its own member of `COMPLETENESS_COMPONENTS`. A failed attestation therefore prints its reason once under `npm` and once under `attestations` in the same `record.reasons` array. This matters because the array is the human-readable product of the whole instrument, and a duplicated reason reads as two independent failures. Right looks like: either drop `attestations` from `COMPLETENESS_COMPONENTS` and let `npm` own the fact, or stop folding the attestation reasons into `readNpmTree`'s reasons. One owner, one report.

**F7 — `validateOutputPath` throws into its own catch (:734-741).**
The function calls `lstat`, then throws `output directory already exists` inside the same `try`, and its own `catch` re-throws it because that error carries no `code`. A reader has to trace that the deliberate error survives by lacking a property the accidental one has. Right looks like: read existence into a value, then decide outside the `try` — throw the occupancy error where a reader meets it, and let only the `lstat` failure reach the catch.

**F8 — The registry projection flattens the external `dist` grouping (:562-563).**
`dist.integrity` and `dist.shasum` are written onto the manifest projection as `integrity` and `shasum`, while `LOCK_FIELDS` (:87) uses `integrity` for a lock entry's own field. One record therefore carries one key name for two provenances, and a reader comparing `registry.manifest.integrity` against a lock entry's `integrity` cannot see that they came from different places. `.claude/rules/names.md` § General vocabulary keeps an external field's wording in this project's casing. Right looks like: `manifest.dist = { integrity, shasum }`, keeping the external grouping the registry itself publishes.

## Findings carried by claims 6 and 7

**F1 — `projectNpmTree` carries a parameter no caller supplies (:183).**
`inherited = []` is never passed: the recursive call passes two arguments (:215), `readNpmTree` passes two (:506), and each control passes two (tests:86, 100). It is the renamed residue of the predecessor's accumulator (`layer-inventory.predecessor.mjs:48`), so the round touched this exact line and kept the dead parameter under a new name. It matters because the name asserts reasons flow down the recursion while they flow up, which is the opposite of what the function does. Right looks like: `projectNpmTree(node, expected)` with `const reasons = []`.

**F2 — `readJSON` returns a single-field envelope every caller unwraps (:270-273).**
Each call site writes `(await readJSON(path)).json` (:364, :369, :445). The envelope adds no boundary, invariant, translation, or narrower contract, which is what `AGENTS.md` § Design laws requires of a wrapper. Right looks like: return the parsed value, and delete `.json` at the three call sites.

**F3 — `executeCommand` renames the substrate's settled vocabulary (:240-247).**
`@orkestrel/process` declares `code`, `expired`, and `truncated` (node_modules/@orkestrel/process/dist/src/core/index.d.ts:161-172); the instrument re-emits them as `exit`, `timedout`, and `overflow`. `AGENTS.md` § Design laws fixes one term per concept, and `.claude/rules/names.md` § General vocabulary names `expired` as the model boolean form — the rename replaces it with the non-word `timedout`. It matters twice over: every downstream reader holds two names for one fact (`validateGitReading`:620-634, `readNpmTree`:512-518, tests:298-303), and the evidence files a human opens carry field names that match nothing in the dependency's own guide. Right looks like: carry `code`, `signal`, `failed`, `expired`, `aborted`, and `truncated` through unchanged.

**F4 — `termination` stores what its own object already carries (:249-254).**
`exit` and `signal` duplicate the sibling fields; `requested` is `expired || aborted`; `observed` is derived from `code` and `signal`. `AGENTS.md` § Design laws forbids storing a second label that can drift from the fields it is derived from. Its only consumer is the control at tests:304-305. Right looks like: delete `termination`, and derive the termination question at the site that asks it.

**F5 — One npm tree, two recursion idioms (:183-223 against :469-492).**
`projectNpmTree` returns `{valid, projection, reasons}`. `collectInstalledAttestations` returns nothing and writes into caller-supplied `attestations` and `reasons` arrays, and `attestInstalledTree` exists only to allocate them. An exported leaf that mutates its caller's collections is the one shape the rest of this module avoids, and `AGENTS.md` § Design laws asks for pure exported leaves with stateful orchestration kept above them. Right looks like: give the attestation walk the returning shape its sibling already has, exporting one entry, or keep the accumulator private and export only the returning entry.

**F10 — Two helper prefixes the naming rule does not fix (:140, :149, :321, :183, :534).**
`.claude/rules/names.md` § Standalone helpers enumerates the prefixes that carry one project-wide meaning, and `select*` is not among them; § Fixed derivation/construction forms already fixes the projection form as `{noun}To{Noun}`, and `project*` displaces it. Right looks like: `extractManifest`, `extractLock`, and `extractOrkestrelLocks` for the field selectors, which `extract*` ("extracts structure") already covers, and `nodeToProjection` and `payloadToProjection` for the projections.

**F9 — The structural control cannot fail for the class it names (tests:72-83).**
It greps the module's own source for a fixed list of the previous round's identifier spellings. Rename `packagePath` to `getPackagePath` and it passes; introduce any new rename-only wrapper and it passes. Its nested-callback pattern reaches only a tab-indented assignment of a parenthesized-parameter arrow, so a nested `function` declaration and `const f = x => …` both pass. Oxlint ran clean over the same file in the same evidence (`validation.txt:17-18`), so the gate that owns style already answered. Right looks like: delete the control and let lint own style, or, where a structural property genuinely needs pinning, pin it by parsing rather than by matching text. Sufficiency referred to the objective lane.

## Attacked and held

- **Reuse of `@orkestrel/process` for bounded child execution (:5, :229-268).** I attacked it as an unsolicited dependency and as a wrapper around a declared primitive. It is neither: the package is a declared runtime dependency (package.json:101), `.claude/rules/portability.md` § Processes and executables requires spawning and terminating through it where the package declares it, and it replaces the predecessor's hand-rolled `sleepResult` and `terminateProcess` (`layer-inventory.predecessor.mjs:95-127`). This is the round's best decision. The defect is in the translation layer above it, not in the choice — see F3 and F4.
- **`digestFile` beside `digestOptionalFile` (:275-292).** I attacked this as a near-duplicate. It survives: the two carry materially different contracts, one treating `ENOENT` as evidence of a real absence and the other as a failure, and the wrapper test admits a materially narrower contract. The adjacent shape that looks like the same defect and is correct is `validateManifestReading` (:169-181), reused unchanged across the manifest, the lock root, the registry release, and the installed manifest — one validator, four callers, which is what consolidation looks like here.
- **The vocabulary of the record — reading, snapshot, projection, attestation, record.** I attacked this as alternating synonyms for one concept. Each names a different thing: a reading is a command's output, a snapshot is a before-and-after pair, a projection is a field selection, an attestation is a disk comparison. The `valid`/`complete` split holds for the same reason — a component is valid, a package's collection is complete.
- **`cachedOrigin` as a prose sentence in the output (:702).** I attacked it as documentation smuggled into data. It holds: the original brief required the limit to be labelled in the evidence, and a reader of `summary.json` meets it where the limit applies.

## Referrals to the objective lane

- `termination.observed` reads true for a spawn fault, given the installed declaration's statement that `execute` reports the host's negative errno as `code` (:240 against node_modules/@orkestrel/process/dist/src/core/index.d.ts:151-152, 161).
- `readNpmTree` marks the reading incomplete on any nonzero `npm ls` exit (:512-519), while the audit brief holds that a nonzero `npm ls` reading is retained evidence. Whether that makes an unhealthy-but-readable tree indistinguishable from an unavailable one is the objective lane's to rule.
- The red evidence's provenance: `red.txt` reports failing tests at line numbers the shipped control file does not have.
- Sufficiency of every control-family exclusion listed under claim 6.

VERDICT: FAIL 1, 3, 4, 5, 6, 7; outside the claims: F6, F7, F8
