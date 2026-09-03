# Verdict — unit conform-guide, round 1

Lane held: **objective** (correctness, constraints, what the code and contracts permit) — the recorded substitution for the dark GPT-5.6 Sol bench. I did not rule on design fit, taste, or voice except where a rule the rows cite makes it a checkable condition.

## Per-claim verdicts

**1. Every row dispositioned, none silently skipped — CONFIRMED.**
The report's table at `/home/user/scaffold/tmp/units/conform/conform-guide-report.md:8-33` carries a disposition for every row the brief lists (`guide-obj-1`…`guide-obj-9`, `guide-subj-1/2/3/4/5/7/8/9/10/11/12/13/15`, `fleet-F1`, `fleet-F2`). `guide-subj-6`, `-14`, `-16` are not rows: the brief folds them into `guide-obj-5`, `guide-obj-3` (`/home/user/scaffold/tmp/units/conform/conform-guide-brief.md:63,77`). `fleet-F2`'s `noop` names the three classes read; I confirmed no public `readonly id` field in `src/core/Guide.ts`, `src/core/sources/Source.ts`, `src/core/sources/SourceManager.ts`.

**2. Each applied row implements the refuter's operative repair — CONFIRMED.**
Sampled the amendments most likely to be dropped, all present: `tests/setup.test.ts:7-9` (obj-4 header amendment), `src/core/types.ts:237-241` and `guides/guide.md:216,393-397` (obj-5 contract + LI/TE catalog rows), `src/core/types.ts:385-390` with the guide Types row and `extractDeclaration` signature (obj-6), `README.md:124-126` carrying obj-7 and subj-2 on one line, `tests/guides.test.ts:45-76` bounded to `## API` per the refuter's narrower form (obj-9), `src/core/helpers.ts:1013-1015` with the `var` parenthetical deleted per subj-1 correction 2, `src/core/types.ts:345-357` additive `sources()` (subj-15). The report's ancillary decisions 3 and 4 sit inside the deviation contract's ancillary clause.

**3. No old name survives — REFUTED.**
`src/core/types.ts:104` still reads "Lists every `## Surface` identifier + kind" for `GuideInterface.surface`, the member `guide-subj-12` renamed to `keyword`. `guides/guide.md:203` documents the same method as "identifier + keyword", so the published `.d.ts` and the guide disagree on the renamed axis — the exact split the row exists to close. The report's recorded pattern for that rename is `kind: '|symbol\.kind|\.kind\b` (report:94), which cannot reach prose; the brief's Method step 2 requires "a word-boundary search over the old name". My `\bkind\b` sweep over `src`, non-vendored `tests`, `guides/guide.md`, `guides/README.md`, `README.md` returns this one owned hit; every other hit is a retained markdown `Kind` header, the `wrong-kind` fixture, or vendored `tests/setupPolicy.ts`.
**Right looks like:** write `src/core/types.ts:104` as "Lists every `## Surface` identifier + keyword — table rows union backticked entity headings", and record the `\bkind\b` word-boundary sweep and its case-insensitive inflection sweep with their paths.

**4. Failing-first proof per behavioural row; sweep per placement/naming/documentation row — REFUTED on the second half.**
First half holds: `guide-obj-1-red.txt:609`, `guide-obj-2-red.txt:83`, `guide-obj-4-red.txt:30`, `guide-obj-9-red.txt:35`, `guide-subj-15-red.txt:36` each name the command, the failing count, and a failure that points at the row's own assertion; `gate-test.txt:15,57,71` carries the green counts. Second half fails: `guide-obj-6` is a placement row and the report records no sweep over its old inline `'class' | 'interface'` union at its three former sites, and `guide-subj-13` is a naming row with no `\bstateful\b` sweep in report:90-105. I re-derived both — the union is declared once at `src/core/types.ts:390` and `stateful` reads empty across the population — so the tree is right and the record is not.
**Right looks like:** add the two sweep rows (pattern, paths, result) to the report's § Sweeps.

**5. Guide parity — CONFIRMED.**
`GuideInterface`/`SourceInterface`/`SourceManagerInterface` members in `src/core/types.ts` match the tables at `guides/guide.md:200-207,213-218,244-246`, including the added `sources` row; the new `DeclarationKeyword` carries its Types row and the `extractDeclaration` signature cell. No readonly data member exists, so no Surface row is owed. Every `## Patterns` fence imports `@orkestrel/guide`. An `AGENTS\s*(§|section)|§\s*[0-9]|4\.6\.1` sweep over the whole checkout hits only the vendored mirrors `guides/markdown.md` and `guides/contract.md`, which are shared/report-only and untouched.

**6. Every breaking change named with its consumers and the exact edit — REFUTED.**
`/home/user/fleet/database/tests/setupServer.ts:8` reads `import type { ExportKind, SurfaceSymbol } from '@orkestrel/guide'` and uses `ExportKind` at `:210` and `:258`; `/home/user/fleet/database/tests/setupServer.test.ts:376,420` read `symbol.kind`. The report's § Shared-file patches (report:150-172) names only the one `symbol.kind` line in each package's `tests/guides.test.ts`, and its verification grep was bound to `--include=guides.test.ts`, which cannot reach `setupServer.ts`. `database` therefore re-pins to a type name that no longer exists and reddens its own typecheck with nobody briefed.
**Right looks like:** add to § Shared-file patches a `database` entry naming `tests/setupServer.ts:8,210,258` (`ExportKind` → `ExportKeyword`) and `tests/setupServer.test.ts:376,420` (`symbol.kind` → `symbol.keyword`), and restate the verification sweep as `ExportKind|EXPORT_KINDS|isExportKind|symbol\.kind` over `**/tests/**/*.ts` and `**/src/**/*.ts`, which is the population I ran; it returns no other consumer outside `@orkestrel/guide` itself.

**7. Scope and no shims — CONFIRMED.**
`/home/user/work/evidence/conform-guide.status:1-32` lists only paths under the brief's Owned row; `package-lock.json`, `node_modules`, `vite.config.ts`, `package.json`, `configs/`, and the vendored `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts` are absent. `src/core/index.ts:1-10` adds no alias row, and a sweep for `ExportKind|EXPORT_KINDS|isExportKind|patterns\(\)|isBrowserVuePath` over `src` and non-vendored `tests` reads empty, so no compatibility re-export survives.

**8. No skip/only/todo/retry/inflated timeout, and the gate table — CONFIRMED (first conjunct); the independent gate run NOT-EVIDENCED.**
A sweep of `/home/user/work/evidence/conform-guide.diff` for `\.skip\(|\.only\(|\.todo\(|TODO|FIXME|console\.(log|error|warn)|debugger|retry|testTimeout|timeout:` returns no match on any line. Report:111-118 names `format:check`, `lint:check`, `check`, `build`, and `test` with the exact command, exit 0, and an evidence file, and each file exists and reads clean (`gate-check.txt`, `gate-test.txt:15,29,43,57,71`). Per the dispatch, the deciding gate run is the Orchestrator's at landing and no read-only lane can take it: **NOT-EVIDENCED**, settled by the landing run, and it does not enter the terminal line.

**9. Nothing hidden; disposition table matches the diff — CONFIRMED.**
No TODO, FIXME, commented-out code, or debug residue on any diff line (same sweep as claim 8). The three residue-pattern hits in the tree — `src/core/helpers.ts:382`, `tests/src/core/helpers.test.ts:158,164`, `tests/src/core/sources/Source.test.ts:47` — are pre-existing lexical-scanner content the diff does not touch. Report:36-56 (files touched) covers exactly the paths in the status file, including the two ` D` rows.

## Plant check

No plant survives. `README.md:126` reads `fences()`; `tests/guides.test.ts:207,213-216` assert `keyword`; `tests/guides.test.ts:38` carries the intact `{ '@orkestrel/guide': 'src/core' }` policy and `:176` the real `guide.links().length` guard; `guides/guide.md:536` restores `## Tests`; `src/core/sources/SourceManager.ts:48-60` retains the dedupe; `tests/setup.ts:43` reads `Missing file: ${relative}`. The gate chain ran at 19:16:59-19:17:07, after the last control at 19:13:24.

## Vendored mirror reading

True. `/home/user/fleet/guide/node_modules/@orkestrel/markdown` ships `LICENSE`, `README.md`, `package.json`, and `dist/src/core/*` and no `guides/` directory, so no byte comparison against `guides/markdown.md` is possible and the standing refresh does not fire.

## Findings outside the claims

**F1. The `@orkestrel/markdown` mirror carries stale numbered citations and the banned axis word, and this package's own suite cannot see it.** `/home/user/fleet/guide/guides/markdown.md:200` reads "keyed by `element` (never `kind` / `type`, AGENTS §4.4)" and `:876` cites `§5`, `§14`, `§22`. The file is shared/report-only and correctly untouched here. **Closes by:** the Orchestrator carrying a mirror-refresh row to the `markdown` package's own unit, so the refreshed bytes come from the released package rather than a local rewrite.

## Referrals to the Orchestrator

**R1. `rm` was outside the brief's Bash allowlist.** The brief's § Context fixes the permitted Bash set (`npm`, `npx`, `git status/diff/add -N/mv`, `node evidence.mjs`); report deviation 2 records `rm` on `tests/setupServer.ts` and `tests/setupServer.test.ts`. Both are tracked and unstaged (` D` in the status), so the tree is recoverable, and `git mv` was genuinely unavailable because the destinations existed. Whether an executor may substitute a command its brief did not grant is yours to rule, not mine.

**R2. Report deviation 1 (an injected "auto mode" directive claimed inside `.claude/rules/documentation.md`) is UNRESOLVED.** Its only evidence is the writer's report. The canonical `/home/user/scaffold/.claude/rules/documentation.md` carries no such block, and a sweep of the vendored `node_modules/@orkestrel/scaffold/dist/host/claude/rules/` copies for `auto mode|sed|heredoc` returns nothing. I cannot rule it CONFIRMED and will not rule it false; if a rule file did carry an injected tool directive mid-session, that is a security question above this round.

**R3. Claim 8's gate reading.** The Orchestrator's deciding run at landing settles it. Report:130-131 already flags the whole-suite reading as an in-exec observation.

## Claims attacked and held

Attacked with independent sweeps or reads: 1, 2, 3, 4, 5, 6, 7, 8 (first conjunct), 9. Held after attack: 1, 2, 5, 7, 8 (first conjunct), 9. Broken: 3, 4, 6.

VERDICT: FAIL 3, 4, 6; outside the claims: F1
