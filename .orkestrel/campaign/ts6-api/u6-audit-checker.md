# U6 audit round 1 — checker lane (Workflow wf_9f096249-676, agent af8179d6c32ef7173)

# Audit verdict — U6 scaffold-seeds (checker lane)

## Claim 1 — `DECLARATION_DEV_DEPENDENCIES` and its readers/fixtures

**PASS.**
- `src/core/constants.ts` diff drops the `vite-plugin-dts` row from `DECLARATION_DEV_DEPENDENCIES`, keeps `@microsoft/api-extractor` (`u6-scaffold-seeds.diff.txt:406-409`).
- `package.json` diff drops the `vite-plugin-dts` devDependency (`u6-scaffold-seeds.diff.txt:386`).
- `src/core/compilers.ts:218` reads the constant generically (`...(blueprint.src.length > 0 || blueprint.bin ? DECLARATION_DEV_DEPENDENCIES : {})`), never names the package, so it needed no edit.
- `tests/src/core/compilers.test.ts` diff removes the three `vite-plugin-dts` expectations; the "keeps library publishing tools" test still asserts `planned['@microsoft/api-extractor']` `.toBe('^7.59.0')` for a `src:['core']` blueprint — a published-source blueprint still plans the extractor (`tests/src/core/compilers.test.ts` grep, clean).
- Fixtures `tests/src/core/fixtures/{source,setup-false}-manifest.txt`, `tests/src/bin/CLI.test.ts`, `tests/src/bin/main.test.ts` diffs drop every `vite-plugin-dts` line/packument/list entry.
- `Grep 'vite-plugin-dts'` over `src`, `package.json`, `guides`, `ROADMAP.md`, `PROPOSAL.md`, and every named test/fixture file: no hits outside `.orkestrel/campaign/` history and `tests/src/core/constants.test.ts` (grep: no matches, file correctly needed no edit — it reads by symbol).

## Claim 2 — `.oxlintrc.json` restriction

**FAIL** (bump-obligation clause).
- The restriction itself is correct: `.oxlintrc.json` carries exactly seven `no-restricted-imports` blocks (`src/core:122`, `src/browser:170`, `src/server:214`, `app/core:262`, `app/browser:306`, `app/server:346`, `src/bin:390`), each adding `"regex": "^typescript(?:[/?#]|$)"` with `"message": "the in-process compiler API is not a surface the fleet uses"` in the existing `patterns` shape; no other rule in the file's diff changed.
- But `.oxlintrc.json` is a vendored `dist/host` file (`.agents/orchestration.md` § Publishing the fleet: "Bump and publish `scaffold` when any vendored byte changes"), and the report never states this bump obligation. `Grep 'bump|vendor'` over `u6-scaffold-seeds-report.md` returns only lines 16, 40, 51, 70, 129, 191, 194, 199, 246 — none of which says scaffold itself must bump/publish because `.oxlintrc.json` (or `guides/scaffold.md`) moved. Line 70 names only *downstream* consumers bumping on import-line moves, a different obligation.

## Claim 3 — `guides/scaffold.md` passages and table parity

**PASS.**
- Declaration passage sits inside `## Generated workspace` (heading at `guides/scaffold.md:1317`, passage at `:1363-1374`): names the `tsc` command, API Extractor's own bundled engine, one `index.d.ts` per face, and `rewriteCoreSpecifier` for server/browser.
- Distribution-proof passage sits inside `## Limits` (heading at `:1534`, passage at `:1683-1691`): the two-direction `Record<keyof typeof entry, true>` / `Record<keyof typeof published, true>` shape.
- Policy passage sits inside `## Tests` (heading at `:1778`, text at `:1810-1814`): "the syntax-shaped laws are... a rule of the vendored oxlint plugin `configs/policy.ts`" plus the new `tests/config.test.ts` row.
- `DECLARATION_DEV_DEPENDENCIES` Surface row updated at `guides/scaffold.md:121` (diff) to "roll declarations up."
- `Grep 'vite-plugin-dts|nameToRewrite'` over `guides/scaffold.md`: no matches.
- `Grep` for the writing-rules substitution-table terms and for stated numerals over the diff's added guide lines: no hits beyond file:line/version/date references.

## Claim 4 — `PROPOSAL.md` control-path rewrite

**PASS.**
- Every brief-named site is rewritten to the `vite`-re-exported parser as control path: tool table rows (now `:251-252`), C5 (`:313`), C12 (`:354`), the extractor-choice paragraph (`:412-415`), the risk heading (`:640`), "the extractor choice decides the dependency delta" (`:728-731`), the fallback-reader paragraph (`:1162-1164`), the open decision (`:1239-1244`), the refusal-table row (`:1254`), and Probe 1 (`:1267-1268`) — all confirmed in `u6-scaffold-seeds.diff.txt:83-245`.
- Re-running `grep -n 'ts\.[a-zA-Z]\|compiler API\|createProgram\|unplugin-dts\|vite-plugin-dts' PROPOSAL.md` (the report's own instrument) returns twelve lines, not the report's claimed two; ten are false-positive matches on file-path tokens ("`constants.ts:`", "`tests.md`" ending in `ts.`) that name no compiler-API concept, and the two genuine "compiler API" phrase hits (`:251`, `:255`) are each correctly worded — `:251` states no in-process API is available, `:255` quotes an external package's own text. The report's characterization of the grep as "two hits" is imprecise but the proposal's argument is intact and no genuine site was missed.

## Claim 5 — `ROADMAP.md` rows

**PASS.**
- Campaign row (`ROADMAP.md` diff, current `:38-52`ish) rewritten to what remains: probe's acceptance and the fleet visit in catalog layer order.
- Four carried rows added (classifier drive harness, `succeeded`/`logLevel: none`, the two policy-reader names, TSDoc noun-phrase openers) — all present in the diff.
- `@packageDocumentation` row transformed (not struck) citing the 2026-09-06 scaffold measurement, consistent with the report's own caveat that `dist/src/core/index.d.ts` "cannot answer the question directly" and the reading is a fixture reading (report `:127-162`); the roadmap row correctly says "a fixture face," not scaffold's own rollup.
- `Grep 'vite-plugin-dts' ROADMAP.md`: no matches.
- No substitution-table terms or stated counts in the new/changed rows.

## Claim 6 — `config` project budget

**FAIL.**
- The seed (`src/core/templates.ts:319-322`) and scaffold's own `vite.config.ts:153-156` are byte-identical (rationale text and `testTimeout: 60_000`), and the rationale correctly names both the linter's 15-second child caps and the compiler/extractor spawns.
- But the budget is not sized from a contended run. The report's own § Flagged claims states plainly: "The `60_000` budget is sized from an idle-host reading plus the capped case's arithmetic, not from a contended run. No contended reading of the `config` project was available to this unit" (`u6-scaffold-seeds-report.md:248-252`), and the measurement itself is headed "no other lane running" (`:164`). This directly contradicts the checker claim that the budget "is sized from a contended run," and it violates `.claude/rules/tests.md` § Expensive proofs: "size its budget from a full contended run rather than from an isolated one."

## Claim 7 — Scope and unchanged constants

**PASS.**
- `MINIMUM_NODE_VERSION` and every `engines` range: absent from the diff entirely (`u6-scaffold-seeds.diff.txt` — no `constants.ts` hunk touches those lines, no `package.json` `engines` hunk).
- `u6-scaffold-seeds.status.txt` lists exactly the 13 files the brief's owned scope allows (plus 3 untracked campaign artifacts); `package-lock.json`, `host.json`, `configs/**`, `tests/setupPolicy.ts` are absent, and `src/core/templates.ts`'s only hunk is the root-config rationale/budget region (`:316-326`).
- The report's Touched-files table (`u6-scaffold-seeds-report.md:10-24`) matches the diff file-for-file and change-for-change.

## Claim 8 — No forbidden syntax; prose compliance

**PASS.**
- `Grep ': any|as any|@ts-ignore|@ts-nocheck|@ts-expect-error|eslint-disable|oxlint-disable| as [A-Z]'` over the diff: no matches. No new function bodies (only comment/TSDoc/markdown/JSON changes), so no nested-function question arises.
- `Grep` for the writing-rules substitution-table terms over the diff: no matches.
- `Grep '^\+.*[0-9]'` over the diff: every numeral is a file:line reference, a version (`6.0.3`), a date (`2026-09-06`), a duration/timeout (`15-second`, `60_000`), or a constraint label (`C1`, `C5`, `C12`) — no stated count of a growable set.

## Referrals

None — every claim resolved on mechanical evidence (grep output, diff hunks, and the report's own stated text); no judgment call was needed.

VERDICT: FAIL 2, 6
