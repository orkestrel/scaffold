# Unit D1 audit — subjective lane report

Lane: `reviewer` holding the **subjective** lane, Opus 5, native subagent, clean context,
2026-09-17. Transcribed by the Orchestrator from the lane's returned message; the role carries no
write tool.

Staged in the Orchestrator's scratchpad while the objective lane was still reading
`.orkestrel/scaffold/`, so that lane could not meet this answer before returning. Moved into the
campaign folder after it did.

**Decision: REJECT, with a bounded fix list.** The defect is closed and the mechanism is right — the
split is not to be re-litigated. What blocks acceptance: the pivot identifier names the wrong fact,
the shipped comment's central claim is not true in the workspaces it addresses, and the retained
evidence for the skip was taken in a contaminated workspace. All of it ships to every target on the
next `repair`.

## Per-claim verdicts

1. **CONFIRMED.** `tests/config.test.ts:72` declares `const published = existsSync(resolve(root, 'src'))`;
   `:2164` is `it.skipIf(!published)(…)`. The face walk and throw at `:2168-2173` are byte-identical
   to the pre-fix text quoted in `d1-red.log.txt:59-63`.
2. **CONFIRMED.** The condition reads `resolve(root, 'src')` — the axis directory. The wrapper probe
   is a separate walk inside the case body at `:2169-2172`. A workspace with the axis enters the case
   and reaches the throw.
3. **CONFIRMED**, with one qualification filed as Finding 5. `:2217` carries no `skipIf` and every
   reading it holds runs on either axis.
4. **REFUTED as written.** `d1-skipreport.log.txt:4` names the measured workspace as
   `tmp/units/d1-skipreport/generated` — nested inside the scaffold checkout. Lines 6 and 10 show
   `rolls one face into a single declaration and rewrites its core specifier` producing API Extractor
   output; that case is `it.skipIf(extractorPath === undefined)` at `:2310`, so
   `@microsoft/api-extractor` resolved there, from the parent checkout's `node_modules`, which Node
   reaches by walking up. The genuine app-only workspace in the OS temp directory reports
   `1 failed | 170 passed | 2 skipped (173)` at `d1-red.log.txt:35-40` — two skips, meaning
   `extractorPath` was undefined. So in an uncontaminated app-only target the post-fix counts are
   `171 passed | 3 skipped (174)`: two more skips than this checkout, not one. What survives is that
   the case skips rather than passing vacuously and the skipped count rises. The stated numeric
   relation does not hold.
5. **CONFIRMED.** `d1-red.log.txt:45-52` shows the generated workspace's own `npm run test` expanding
   to `test:app && test:policy && test:config`, and the failure at `:56-58` arriving from inside
   `scaffold-e4-app-install-SjpVlr/generated`. The gate loop at `tests/distribution.test.ts:1101-1111`
   invoked it.
6. **CONFIRMED.** `src/core/compilers.ts:405` emits `prepublishOnly` only under `publishes`, defined at
   `:278` as `blueprint.src.length > 0`. `tests/distribution.test.ts:1100` asserts the descriptor is
   `undefined`, so an emitted script reddens the case.
7. **CONFIRMED.** Line-by-line against the removed text: the pack status, archive length,
   archive-undefined throw, consumer manifest write, and install status survive in
   `installPackedScaffold` (`:143-170`); the generate status, emitted `^version` equality, re-pin,
   floor read, provision, install status, and lockfile `resolved` equality survive in
   `installGeneratedWorkspace` (`:185-267`). Nothing dropped, weakened, reordered, or moved behind a
   condition. Two assertions were strengthened with failure messages they lacked.
8. **UNSETTLED.** The vendored-bytes half is confirmed: `dist/host/tests/config.test.ts:72` and `:2164`
   carry the change at the same line numbers. The digest half needs a SHA-256 the lane cannot compute
   without a shell.
9. **CONFIRMED.** `d1-red.log.txt:56` names a case title that exists nowhere in the tree, so the run
   predates the fix. The throw is nested under the generated workspace's run header.
10. **CONFIRMED.** The sweep returns only prose hits and `expect.any(String)`, which is Vitest's
    asymmetric matcher rather than the `any` type.
11. **UNSETTLED.** The lane's two status sources disagreed and it could not run `git`. Correct
    handling. **Resolved by the Orchestrator against the live tree: HEAD `53d4a58e`, only
    `host.json`, `tests/config.test.ts`, and `tests/distribution.test.ts` modified, nothing under
    `src/`.** The contradicting evidence was the stale session-start snapshot the harness injects
    into every subagent context, which still reports HEAD `d6ef2689`.

## Hazard rulings

- **The skip condition's shape — not a defect.** A `src` directory holding something else, or an
  empty one, makes the case run and throw at the face walk, which is the brief's second requirement
  working. Case-insensitive folding applies equally to the wrapper probe, so the readings stay
  consistent; `:90-93` already reads the axes this way.
- **Collection-time evaluation — not a defect.** `root` is per-module-instance, and a generated
  workspace runs its own vendored copy in its own process.
- **The count change and the case name — no consumer.** The old case name matches only campaign
  artifacts. No fixture, golden digest, expectation, or generated manifest reads the old name or the
  old total.
- **Vendored-surface consequences — no target reddens on the change.** A publishing target is
  unchanged; an app-only target stops failing and starts skipping. The moved control path
  `configs/tsconfig.absent.json` names a file no workspace shape carries, which is strictly better
  than the old `configs/src/` path.
- **Blueprint coverage — honest for this defect, unstated as a limit.** `app: ['core', 'server']`
  reproduces the axis-level defect, and an `app: ['browser']` workspace would be caught by the same
  reading. What it does not cover is a browser-carrying workspace's gate chain. Finding 8.
- **The skip as a permanent hole — real.** Nothing committed distinguishes a skip from a vacuous
  pass. Referral R1.

## Required changes

**Finding 1 — `published` names the wrong fact and collides with the file's own term.** `:72`. The
condition tests that the workspace carries a `src` axis, which this file's prose calls `publishes` at
`:541` and `:637` and `src/core/compilers.ts` calls `publishes` at `:278` and `:519`. One concept now
carries two identifiers differing by one letter, which `AGENTS.md` § Design laws forbids. Rename to
`publishes`.

**Finding 2 — the comment states a reader outcome the target's reporter does not deliver.**
`:2161-2163` claims a skip "reports that absence in the run". Every generated workspace runs vitest
with `--reporter=dot` (`src/core/compilers.ts:282`), so the skip prints as a single `-` with no name
and no reason. State what is observable, and put the condition into the case name in the bracket form
this repository already uses at `tests/distribution.test.ts:1124`.

**Finding 3 — `installGeneratedWorkspace` returns the wrong value and leaks its path convention.**
`:185-267` fixes the materialization directory internally and returns only `admitted.environment`, so
both callers must know the literal `'generated'` independently at `:976`, `:1068`, and `:1086`, and
the app-only case re-parses a manifest the helper already parsed. Return `{ target, environment, manifest }`.

**Finding 4 — the two case names are inconsistent and the second undersells its contents.** `:2164`
ends "a declaration roll-up requires"; `:2217` ends "a roll-up requires". The second also omits the
`parseProjectScope` refusals, the compiler refusal, `isStringList`, and `isExtractorModule`.

**Finding 5 — the case comment gives a reason false for its own readings.** `:2213-2214` says every
reading is decided by the text or the value handed to it. False for `packageManifestName` at `:2260`,
`readCompilerOutput` at `:2230`, and `createRequire(...).resolve` at `:2267`. The conclusion is true;
the reason is not.

**Finding 6 — a vendored sentence inverts its actor and leaves `it` unattached.** `:68-69`.

**Finding 7 — a comment states a past-state claim the case beneath it makes false.**
`tests/distribution.test.ts:1059-1060` says "nothing here has ever run the vendored set against a
workspace that carries none", directly above the case that does.

## Recommendations

**Finding 8 — record the blueprint's coverage limit beside the case.**

**Finding 9 — `blueprint: string` is a source expression, not a blueprint.** Rename it `expression`,
or pass typed options and let the helper serialize them.

## Referrals to the objective lane

- **R1** — nothing committed can tell the skip from a vacuous pass.
- **R2** — the retained instrument materializes its workspace inside the subject checkout.
- **R3** — the gate list at `tests/distribution.test.ts:1101` is a literal, so an added gate script is
  silently not run.
- **R4** — the `host.json` digest.
- **R5** — the working-tree disagreement. **Resolved by the Orchestrator; see claim 11.**

## Dispatch note

No dispatch defect. The dispatch supplied the diff and the status capture, named no report path, and
assigned no command.

VERDICT: REJECT
