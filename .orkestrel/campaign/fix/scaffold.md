# Fix dossier: scaffold

Verified fix-producing findings for the `scaffold` package. DRIFT: the finding's own repair
stands. DRIFT-RESHAPE: the violation is real and the corrected repair under Verification
replaces the finding's repair line. Re-verify each finding against the current tree before
applying; the audit predates the dependency update commits and any later merges.

## s02-01 — DRIFT

1. package=scaffold file=`/home/user/scaffold/src/server/Materializer.ts:132-133` rule=`.claude/rules/architecture.md` § Centralized-file pattern, § Declaration placement, § Kind purity verdict=CONFIRMED
   wrong: `static readonly #opening = '<!-- orkestrel:catalog -->'` and `static readonly #closing = '<!-- /orkestrel:catalog -->'` are constant data declared in an implementation file, whose sole permitted content is imports plus one class; the in-file comment's justification ("the pair belongs in core as soon as both consumers exist") is already false, because `tests/setupServer.ts` and `tests/src/bin/CLI.test.ts` restate the same literals.
   repair: declare `CATALOG_OPENING_MARKER` and `CATALOG_CLOSING_MARKER` in `src/core/constants.ts`, import them in `Materializer.#recatalog`, delete the two static fields and the comment, and have the two test files import them instead of repeating the literal.

## s02-02 — DRIFT

2. package=scaffold file=`/home/user/scaffold/src/server/Upstream.ts:100-116` rule=`.claude/rules/architecture.md` § Centralized-file pattern, § Kind purity verdict=CONFIRMED
   wrong: eight constants (`#defaultRepository`, `#defaultRegistry`, `#defaultBranch`, `#defaultTimeout`, `#defaultConcurrency`, `#defaultRetries`, `#scope`, `#vendor`, `#unreadable`, `#packument`) are declared as static data inside an implementation file. The comment's stated reason — "each is read by exactly one line of this class" — is false for `#defaultTimeout` (read at :167 and :172), `#packument` (:402 and :613), `#unreadable` (:416 and :622), and `#scope` (:660, :753, :764); and `src/server/constants.ts` already holds exactly this class of value (`MANIFEST_NAME` at :115), so the "constants.ts is frozen" premise contradicts the package's own precedent.
   repair: move all ten into `src/server/constants.ts` as `DEFAULT_REPOSITORY_BASE`, `DEFAULT_REGISTRY_BASE`, `DEFAULT_BRANCH`, `DEFAULT_UPSTREAM_TIMEOUT`, `DEFAULT_UPSTREAM_CONCURRENCY`, `DEFAULT_UPSTREAM_RETRIES`, `ORKESTREL_SCOPE`, `SCAFFOLD_REPOSITORY`, `UNREADABLE_VERSION_NOTE`, `PACKUMENT_MEDIA_TYPE`, import them, and delete the static block and its comment.

## s02-03 — DRIFT

3. package=scaffold file=`/home/user/scaffold/src/server/Materializer.ts:591` rule=`.claude/rules/architecture.md` § Kind purity; `AGENTS.md` § Design laws ("One concept, one term") verdict=CONFIRMED
   wrong: `#reconcile` compares against the string literal `'manifest.json'` while `MANIFEST_NAME` exists for exactly this purpose, and that constant's own TSDoc (`src/server/constants.ts:106-115`) states "both sides read one constant rather than repeating a literal that only agrees by inspection" — the shipped code no longer matches the claim the constant documents.
   repair: import `MANIFEST_NAME` from `./constants.js` in `Materializer.ts` and use it at :591.

## s02-04 — DRIFT

4. package=scaffold file=`/home/user/scaffold/src/server/Upstream.ts:468-473, 500-503, 562-567` rule=`AGENTS.md` § Non-negotiable rules ("ALWAYS define reusable and public types in `*/types.ts`"); `.claude/rules/typescript.md` § Types verdict=CONFIRMED
   wrong: the inventory record type `{ readonly lookup: Lookup; readonly digests: ReadonlyMap<string, string>; readonly duplicates: ReadonlySet<string>; readonly note: string }` is written inline three times; the allowance carrier `{ remaining: number }` is written inline at :212, :247, :295, :329, :397, :434, :475, :505, :562, :608, :659, :788, :795, :802, :828, :835, :842, :903, :909, :914; and the read outcome `{ lookup; content|hex; note }` is written inline across every overload of `#readWithRetries`, `#request`, and `#body`. Three reusable shapes carry no name, so a change to any of them has to be made in every copy.
   repair: declare `HostInventory`, `ReadAllowance`, and a `ReadOutcome` pair (text and binary) in `src/server/types.ts` and reference them at every site. They stay unexported from the barrel only if they are genuinely internal; `src/server/index.ts` star-exports `types.js`, so they become public — which is correct, because `UpstreamOptions` already publishes the bounds they carry.

## s02-05 — DRIFT

5. package=scaffold file=`/home/user/scaffold/src/bin/CLI.ts:741, 832, 854, 873, 1019, 1481, 1491, 1533, 1552, 1567, 1580, 1594, 1684, 1717` rule=`.claude/rules/architecture.md` § Functions and orchestration (leaf test), § Declaration placement ("Export and test reusable logic. No hidden module helpers or declarations") verdict=CONFIRMED
   wrong: fourteen `#` private methods reach no `#` field and call no sibling method, so by the leaf test each is a pure exported helper being hidden inside the class: `#assertVersions` (:741), `#catalogReleases` (:832), `#assertFetched` (:854), `#pin` (:873), `#invocations` (:1019 — a 108-line shell tokenizer, the largest single untested leaf here), `#probe` (:1481), `#previous` (:1491), `#inventory` (:1533), `#environments` (:1552), `#groups` (:1567), `#packages` (:1580), `#merge` (:1594), `#tally` (:1684), `#sanitize` (:1717).
   repair: move each to `src/bin/helpers.ts` as an exported `{verb}{Noun}` function (`assertVersions`→`versionsToRefusal`, `#invocations`→`scriptToInvocations`, `#merge`→`mergeResults`, `#tally`→`resultToTally`, `#sanitize`→`sanitizeLine`, `#environments`→`selectionToEnvironments`, `#groups`→`selectionToGroups`, `#packages`→`selectionToPackages`, `#probe`→`targetToEnvironments`, `#previous`→`catalogToNames`, `#inventory`→`readGitRecords`, `#pin`→`releasesToPins`, `#catalogReleases`→`entriesToReleases`, `#assertFetched`→`fetchToRefusal`), call them from `CLI`, and add a unit test per extracted function in `tests/src/bin/helpers.test.ts`.

## s02-06 — DRIFT

6. package=scaffold file=`/home/user/scaffold/src/bin/CLI.ts:144-145` rule=`.claude/rules/architecture.md` § Declaration placement, § Functions and orchestration verdict=CONFIRMED
   wrong: `static readonly #stdout: OutputHandler = (line) => void process.stdout.write(...)` and the `#stderr` twin are function declarations living in an implementation file, hidden from test and reuse; they are the package's only process-stream writers and nothing can exercise them without driving the real process.
   repair: export `writeOutput` and `writeDiagnostic` from `src/bin/helpers.ts`, default to them in the `CLI` constructor, and delete the two static fields.

## s02-07 — DRIFT

7. package=scaffold file=`/home/user/scaffold/src/server/Materializer.ts:700-707, 732-737, 751-758` rule=`.claude/rules/architecture.md` § System constraints ("Centralize any pattern repeated twice") verdict=CONFIRMED
   wrong: the same two-branch block — `if (WORKSPACE_OWNED_PATHS.includes(path)) { push presence; continue }` followed by an identical `if (isDeferredPath(path)) { push presence; continue }` — is written three times with byte-identical bodies, in `#expand` once and `#expandRaw` twice. Two branches doing the same thing is also one condition written as two.
   repair: export `isRetainedPath(path: string): boolean` from `src/core/helpers.ts` returning `WORKSPACE_OWNED_PATHS.includes(path) || isDeferredPath(path)`, document that it names "a path whose present bytes another surface owns", test it, and collapse all three sites to one `if`.

## s02-08 — DRIFT

8. package=scaffold file=`/home/user/scaffold/src/server/helpers.ts:1326, 1332` and `/home/user/scaffold/src/bin/CLI.ts:640` rule=`.claude/rules/architecture.md` § System constraints; `AGENTS.md` § Design laws ("One concept, one term") verdict=CONFIRMED
   wrong: the composite predicate `isDeferredPath(x) || isCanonPath(x)` is spelled out at three sites in two environments, and each site re-explains the same concept in a comment (`helpers.ts:1295-1301`, `CLI.ts:635-638`). The concept — "a destination whose floor bytes an overlay keeps" — has no name, so a fourth caller must rediscover it from prose.
   repair: export one named predicate from `src/core/helpers.ts` (for example `isFloorPath`), give it the TSDoc the three comments currently carry between them, test it, and call it at all three sites.

## s02-09 — DRIFT

9. package=scaffold file=`/home/user/scaffold/src/core/compilers.ts:96-99, 2139-2151` rule=`.claude/rules/architecture.md` § Kind purity ("Wrong file, right name → move it") verdict=CONFIRMED
   wrong: `srcToRoot` (:96) is a two-line selection over a list and `artifactToFinding` (:2139) is a projection that wraps `inferDrift` — both are pure leaves, not shape or algorithm compilers. Their exact siblings already sit in `helpers.ts`: `selectGroups`, `selectHostPaths`, `artifactToHex`, and `inferDrift` itself. The same kind of function is split across two kind files by nothing but where it was first needed. `pathToCondition` (:123) sits on the same boundary and needs the same ruling.
   repair: move `srcToRoot` and `artifactToFinding` into `src/core/helpers.ts` (both import only types and `inferDrift`, so the leaf-pair rule still holds), import them into `compilers.ts`, and rule explicitly on `pathToCondition` in the same change. The barrel star-exports both files, so the published surface is unchanged.

## s02-10 — DRIFT

10. package=scaffold file=`/home/user/scaffold/src/server/helpers.ts:1193` rule=`.claude/rules/workspace.md` § Text integrity verdict=CONFIRMED
    wrong: the `readHostFloor` TSDoc reads ``@throws `ScaffoldError('TARGET', â€¦)` `` — `â€¦` is mojibake, a UTF-8 ellipsis decoded as Latin-1 and re-encoded. Every sibling `@throws` line in the file writes `…` correctly.
    repair: replace `â€¦` with `…` at :1193.

## s02-11 — DRIFT

11. package=scaffold file=`/home/user/scaffold/src/server/helpers.ts:1064-1065` rule=`AGENTS.md` § Writing ("Word every sentence so the reader understands it on the first read"); `.claude/rules/writing.md` § Sentence and paragraph order verdict=CONFIRMED
    wrong: the `readSnapshot` `@remarks` reads "…and an empty string as a present directory; the / they are different verdicts." — a stranded `the` makes the load-bearing sentence ungrammatical, and this is the sentence that explains why absence is omission rather than an empty value.
    repair: delete the stranded `the`, so the clause reads "…as a present directory; they are different verdicts."

## s02-12 — DRIFT

12. package=scaffold file=`/home/user/scaffold/src/bin/CLI.ts:1656, 1659` rule=`.claude/rules/portability.md` § Line endings verdict=CONFIRMED
    wrong: `#reportReplacements` counts lines with `.split(/\r\n|\r|\n/u)`, which splits on a bare `\r`. The rule fixes the separator set as `/\r\n|\n/` and states "never split on a bare `\r`". A file containing a lone `\r` inside a line is reported with an inflated line count, and the report is what a maintainer reads to judge a replacement. `#sanitize` at :1718 already uses the compliant `/\r?\n/`.
    repair: change both patterns to `/\r\n|\n/u`.

## s02-13 — DRIFT-RESHAPE

13. package=scaffold file=`/home/user/scaffold/src/bin/CLI.ts:496-499, 521-526, 549` rule=`.claude/rules/names.md` § Value-level identifiers ("Method: camelCase bare verb"); `.claude/rules/documentation.md` § Parity ("Re-read the prose last, against what actually shipped") verdict=CONFIRMED
    wrong: three separate defects in one seam. `const online` (:496) is assigned the result of `#offline` on the offline branch, so the identifier states the opposite of what it holds. `#offline` (:526) is an adjective naming its trigger, not a verb naming what it does. The comment at :521-525 — "The network half of `overwrite`, collected rather than thrown" — describes `#reconcile`, which is the method that actually reads the network and catches, while `#reconcile` (:549) carries no comment at all; the comment is attached to the wrong method.
    repair: rename the local to `remainder` (or `second`), rename `#offline` to `#declareOffline` (what it does: re-declare from the floor and report the skipped catalog step), and move the "network half" comment onto `#reconcile`, leaving `#declareOffline` a comment that says it substitutes for that half when `--offline` is given.

### Verification

**Judge (DRIFT-RESHAPE/high):** The violations are real but every repair on the table is wrong, including both lanes'. Real: `#offline` is an adjective where names.md:100 fixes methods as verbs, and `online` holds `#offline`'s result on the `--offline` branch while names.md:150 makes an adjective the boolean form. The objective la

**Lane DRIFT/high:** amend: rename the local to `remainder`, move the "network half" comment onto `#reconcile` and give `#declareOffline`'s replacement a comment saying it substitutes for that half under `--offline`, but rename `#offline` to a bare verb such as `#declare` rather than `#declareOffline`, which the quoted row refuses.

**Lane DRIFT-RESHAPE/medium:** amend: keep the `offline`/`online` locals as a pair — rename both together or neither (`local`/`remote` if either moves); rename `#offline` to a bare verb naming what it does, such as `#declareOffline`; move the "network half" comment onto `#reconcile` (:549) and give `#declareOffline` a comment saying it substitutes for that half when `--offline` is given

## s02-16 — DRIFT

16. package=scaffold file=`/home/user/scaffold/src/bin/helpers.ts:165, 477` rule=`.claude/rules/patterns.md` § Declared ecosystem capabilities; `AGENTS.md` § Design laws ("One concept, one term") verdict=CONFIRMED
    wrong: `cause instanceof Error` (:165) and `error instanceof Error` (:477) test the same thing that `@orkestrel/contract`'s installed `isError` tests, and this package already routes that question through `isError` at `src/server/helpers.ts:76` and `src/server/Upstream.ts:971`. One question, two spellings, in the same package.
    repair: import `isError` from `@orkestrel/contract` in `src/bin/helpers.ts` and use it at both sites, or record in the file why `instanceof` is deliberate here.

## s02-17 — DRIFT

17. package=scaffold file=`/home/user/scaffold/src/core/helpers.ts:170, 194`; `/home/user/scaffold/src/server/helpers.ts:253, 835, 879, 1188, 1657` rule=`.claude/rules/typescript.md` § Comments and API documentation ("The first sentence states what the symbol does in the third person with an `-s` verb") verdict=CONFIRMED
    wrong: `src/` carries 123 TSDoc first sentences; 116 open with an imperative verb (`Narrow`, `Coerce`, `Test`, `Compute`, `Read`, `Project`, `Select`, `Compile`, `Replace`, `Measure`, `Stage`, `List`, `Capture`, `Resolve`, `Derive`, `Assemble`, `Construct`, `Tear`) and 7 open with the third-person `-s` form the rule requires. The listed seven are the in-package minority: `isDeferredPath` ("Checks whether…"), `isCanonPath` ("Checks whether…"), `hexToDigest` ("Projects…"), `listCanonPaths` ("Lists…"), `pruneEmptiedDirectories` ("Removes…"), `readHostFloor` ("Reads…"), `stageInventory` ("Stages…"). Whichever form is correct, the package uses both.
    repair: do not fix this inside scaffold alone — see the Deviation section. Once the Orchestrator rules, rewrite one population to match the other in a single pass, so `src/` carries one form.

