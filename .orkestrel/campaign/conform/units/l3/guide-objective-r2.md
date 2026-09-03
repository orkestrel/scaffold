## Verdict — unit `conform-guide`, round 2 — OBJECTIVE lane

Lane held: **objective** (correctness, constraints, and what the code and contracts actually permit), on Claude Opus 5, as the recorded substitution for the dark GPT‑5.6 Sol bench. Read-only; no command run. Evidence read directly at every site I rule on; the Grok distillate was treated as a map, not a verdict, and every round‑1 refutation was re-derived from the tree.

### 1. Every row dispositioned — CONFIRMED

The report's table (`/home/user/scaffold/tmp/units/conform/conform-guide-report.md:10-33`) carries a disposition for every row the brief declares: `guide-obj-1..9`, `guide-subj-1,2,3,4,5,7,8,9,10,11,12,13,15`, `fleet-F1`, `fleet-F2`. `guide-subj-6` and `guide-subj-16` are folded by their carrier rows' own instruction (`conform-guide-brief.md:77`, `:63`), not skipped; `guide-subj-14` is not a row of this brief. `fleet-F2` is `noop` with checkable evidence — a sweep of `/home/user/fleet/guide/src` for `readonly id`, `public`, `private`, `protected` returns only the prose hits `src/core/helpers.ts:40` and `src/core/sources/Source.ts:217`, and `Guide`, `Source`, `SourceManager` declare `#` fields only (`src/core/Guide.ts:31-36`, `src/core/sources/SourceManager.ts:25-27`).

### 2. Each applied row implements the refuter's operative repair — CONFIRMED

I checked the amendments, which are where a wrong reading would hide.
- `guide-obj-2` LI amendment: `tests/guides.test.ts:176` and `:185` carry `guide.links().length` and `guide.tests().length`; FI carries `compared` at `:162,167,172`.
- `guide-obj-4` amendments: the rationale paragraph is gone (`tests/setup.ts:30-44`) and the header comment is corrected (`tests/setup.test.ts:7-9`).
- `guide-obj-5` amendment: the guide Behavior cell `guides/guide.md:216` and the LI/TE catalog rows `guides/guide.md:390-396` both state the directory case.
- `guide-obj-6` amendments: `src/core/types.ts:385-390` names the `ExportKeyword` subset; the Types row is `guides/guide.md:49`; the signature cell is `:86`.
- `guide-subj-15`: `src/core/sources/SourceManager.ts:48-60` walks `Object.keys`, resolves through `source()`, deduplicates by identity.

### 3. No old name survives — CONFIRMED (round‑1 refutation closed)

`src/core/types.ts:104` now reads "Lists every `## Surface` identifier + keyword", matching `guides/guide.md:203`. I re-derived the sweeps rather than reading the report's rows: `ExportKind|EXPORT_KINDS|isExportKind|isBrowserVuePath|extractCodeLines|moduleDirs|moduleKeys|patterns\(\)|setupServer`, case-insensitive over the whole checkout excluding `node_modules`, returns only the retained export `selectModuleKeys`, the vendored `tests/config.test.ts:88,94,112,292` rows gated on absent environments, and the vendored mirrors `guides/scaffold.md`. Case-insensitive `kind` over `src`, the non-vendored `tests`, `guides/guide.md`, `guides/README.md`, and `README.md` leaves only the markdown `Kind` header, `findKindIndex`, the `wrong-kind` fixture path, and the local variable at `tests/src/core/helpers.test.ts:471` whose value carries `keyword`.

### 4. Failing-first proofs and old-form sweeps — CONFIRMED

The proof files corroborate the report's table exactly, and I read them rather than the table: `guide-obj-1-red.txt:609` `2 failed | 40 passed (42)`; `guide-obj-2-red.txt:83` `4 failed | 38 passed (42)` with three `expected 0 to be greater than 0` failures at `:46,58,70` naming exactly the FI, LI, TE guards; `guide-obj-4-red.txt:30` `1 failed | 6 passed (7)`; `guide-obj-9-red.txt:35` `1 failed | 41 passed (42)`; `guide-subj-15-red.txt:36` `1 failed | 377 passed (378)`; `gate-test.txt` green at each. The round‑1 refutation is closed: § Sweeps now carries the inline-union and `stateful` rows, and both re-derive empty. The deletion rows carry sweeps in place of a plant, which the brief's § Method permits. See finding F‑2 for the sweep rows still absent.

### 5. Guide parity — CONFIRMED

`GuideInterface`'s call-signature members `sections`, `surface`, `methods`, `links`, `tests`, `fences` (`src/core/types.ts:102,108,114,125,136,148`) match `guides/guide.md:202-207` exactly; `SourceInterface`'s `exports`, `surface`, `methods`, `exists`, `hidden`, `examples` (`:171,211,235,243,260,274,297`) match `:213-218`; `SourceManagerInterface`'s `source`, `sources` (`:344,357`) match `:245-246`. Readonly data stays in Surface rows (`guides/guide.md:35,45,46,47,48,49`). Every `## Patterns` fence imports `@orkestrel/guide` (`guides/guide.md:440,450,461,481,500,521,530`). `README.md:122-158` names only real exports. A sweep for `AGENTS\s*(§|section)|§\d` over `src`, the non-vendored `tests`, `guides/guide.md`, `guides/README.md`, `README.md` is empty.

### 6. Breaking changes named with consumers — CONFIRMED (round‑1 refutation closed)

§ Shared-file patches now carries the `database` entry, and I verified it against the consumer tree rather than the report: `/home/user/fleet/database/tests/setupServer.ts:8,210,258,264,266,329` and `/home/user/fleet/database/tests/setupServer.test.ts:337,361,376,420,427,465` carry `ExportKind` and the `kind` axis, and the report's patch hunks match that text byte for byte. I widened the fleet sweep past the report's pattern to catch a consumer reading `.kind` under another variable name: `\.kind\b` over every non-`node_modules` `.ts` in `/home/user/fleet` adds only `middleware/tests/setupServer.ts:412` (a multipart form discriminant) and `lsp/tests/setupConformance.ts:373,491,1002,1021` (LSP wire fields and `ts.SyntaxKind`). Neither touches `@orkestrel/guide`.

### 7. Scope containment — CONFIRMED

The diff's file headers (`/home/user/work/evidence/conform-guide.diff:1,55,74,521,…,2664`) enumerate the same paths as `/home/user/work/evidence/conform-guide.status:1-32`, and every one sits under the brief's Owned row. No `package-lock.json`, no `node_modules`, no `vite.config.ts`, no `tsconfig.json`, and none of the vendored `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`. `src/core/index.ts:1-10` is unchanged and contains no alias row; a sweep of added lines for ` as `, `@deprecated`, and `alias` returns only prose and test titles, so no compatibility alias, re-export, or shim entered the tree.

### 8. Residue conjunct CONFIRMED; independent gate reading NOT-EVIDENCED

A sweep of the diff's added lines for `\.skip\(|\.only\(|\.todo\(|TODO|FIXME|console\.|debugger|retry|testTimeout|timeout:` returns nothing, and `vite.config.ts` is untouched, so no skip, only, todo, retry, or inflated timeout was added. The report's § Gates (`conform-guide-report.md:113-117`) names `format:check`, `lint:check`, `check`, `build`, and `test`, each with its command, exit 0, and an output file under `/home/user/work/evidence/guide-proofs/`. **NOT-EVIDENCED:** the independent gate run is a reading no read-only lane can take; the Orchestrator's deciding run at landing settles it.

### 9. Nothing hidden — CONFIRMED

No TODO, FIXME, `console.`, `debugger`, or commented-out code enters through an added line (same sweep as claim 8). The report's § Files touched (`conform-guide-report.md:37-55`) matches the diff's file set path for path, including `tests/src/core/parsers.test.ts`, `tests/src/core/shapers.test.ts`, and the five fixture files. The disposition table's notes match what the tree holds at every row I opened.

---

## Findings outside the claims

**F‑1 — The report's authored prose states counts.** `conform-guide-report.md:312` reads "Returns the same forty-six `tests/guides.test.ts` consumers", and `:139` reads "Two further consequences to carry into the release note". Both answer "how many" about sets the fleet can add to, which `AGENTS.md` § Writing forbids in every artifact including a report ("Delete a count you find. Do not correct it."). The report is retained under `.orkestrel/<package>/`, so the defect is durable. **Prescription:** write `:312` as "Returns the same `tests/guides.test.ts` consumers § Shared-file patches already named" and `:139` as "Further consequences to carry into the release note:", changing nothing else. Do not substitute a corrected number. Borderline and for the Orchestrator to rule: `:57` "Diffstat: 32 files changed, 2721 diff lines" is a tool tally cited to the artifact it measures.

**F‑2 — § Sweeps records no pattern for four rows whose repair removed a prose form.** The table (`conform-guide-report.md:90-105`, plus the fix-round rows at `:239-242`) carries no pattern for `guide-obj-5`'s old `@returns` sentence, `guide-subj-8`'s `since` and "local name", `guide-subj-9`'s "sees / notion / single mistake / most often", or `guide-subj-10`'s "Measured across / no longer needed". I re-derived all four over `src`, the non-vendored `tests`, `guides/guide.md`, `guides/README.md`, `README.md`: empty, so no old form survives and no claim fails. The gap is the record. It is not cosmetic: running the `since` sweep over the full owned population surfaces `/home/user/fleet/guide/tests/distribution.test.ts:28` ("Node refuses one directly since the …"), an owned, untouched file carrying the causal `since` the substitution table bans. That site is outside this unit's fixed scope, so it belongs to a successor unit rather than to this one. **Prescription:** add the four patterns with their population to § Sweeps, and open a successor row for `tests/distribution.test.ts:28` → "because".

**F‑3 — A guide fence marks omitted output with `...` (pre-existing, successor).** `guides/guide.md:524` ends `…, jsdoc: undefined }, ...]`, which `.claude/rules/writing.md` § Examples refuses ("Mark omitted code with a comment in the sample's language, never with `...`"). The unit did not author it — the diff adds the string only inside the new presence guard at `tests/guides.test.ts:347`, transcribing the existing fence. No row names it. **Prescription:** in a successor unit, end the fence comment at the first record and add a following line comment naming what is elided, then update the transcription at `tests/guides.test.ts:347` in the same edit.

## Referrals to the Orchestrator

**R‑1 — The two deletions are unstaged, and a path-scoped landing can drop them.** `conform-guide.status:23-24` shows ` D tests/setupServer.test.ts` and ` D tests/setupServer.ts` — worktree deletions with nothing staged, which follows from your ruling on the `rm` deviation (`conform-guide-report.md:193-196`). A commit that stages by path must name those two paths explicitly, or `guide-obj-4` lands half-applied: `requireText` in both `tests/setup.ts` and a resurrected `tests/setupServer.ts`, with `tests/config.test.ts`'s gated rows unaffected and the suite still green. Outside my lane to fix; it is a landing-mechanics decision.

**R‑2 — The vendored `guides/guide.md` mirrors are stale ahead of this rename.** § Breaking names the refresh obligation generically (`conform-guide-report.md:170-172`). The mirrors are further behind than the rename implies: `/home/user/fleet/workspace/guides/guide.md:74,76,78,79` still document `symbolKey`, `missingSymbols`, `exportsFrom`, and `hiddenFrom`, names this package no longer exports, and `:34-35` still carry `ExportKind` and `{ name, kind }`. The refresh wave is therefore larger than a `kind` → `keyword` pass. Sizing it is a plan decision, not a verdict of mine.

**R‑3 — No subjective lane ran this round.** Three items sit in that lane and I record them without ruling: the `DeclarationKeyword` TSDoc phrasing the writer substituted for the refuter's "two-member subset" (`src/core/types.ts:385-388`, report deviation 3); the `sources()` `@example` that shows identity instead of a value (`src/core/types.ts:351-355`, report deviation 4); and the fence comment `sources.sources() // [the one shared view both specifiers name]` (`guides/guide.md:494`), which describes a value rather than showing one while the transcription beside it asserts the real value (`tests/guides.test.ts:294`).

## Claims attacked and held

I attacked claims 3, 4, and 6 hardest, since my own engine wrote the subject and those three were round 1's refutations: I re-derived every sweep from the tree instead of reading the report's rows, widened the fleet breaking sweep past the writer's pattern, and read the `database` consumer sites directly. All three held. Claims 1, 2, 5, 7, and 9 held on direct reading of the diff, the status, and the sites. Claim 8's residue conjunct held; its gate conjunct is yours to settle at landing.

VERDICT: PASS
