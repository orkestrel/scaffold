1. CONFIRMED — The report lists every row with `applied` or `noop` at `tmp/units/conform/conform-scaffold-report.md:8-24`. Corresponding edits and noop conditions are present in the changed source, guide, manifest, and test files; `tests/setup.ts` has no F1 helper, and `src/**` has no public `readonly id: string` field.

2. not held

3. CONFIRMED — Word-boundary pattern `\b(extractFenceImports|findMissingSymbols)\b` and case-insensitive inflection pattern `(?i)\b(extractfenceimport|findmissingsymbol)(s|ed|ing)?\b` returned no matches across `src/**`, `tests/**`, `guides/scaffold.md`, `guides/README.md`, and `README.md`. The recorded sweep names the same population at `conform-scaffold-report.md:157-168`.

4. not held

5. CONFIRMED — Current guide surfaces and compiler rows are present at `guides/scaffold.md:223-280`; parity checks use `missingSymbols` and `fenceImports` at `tests/guides.test.ts:99-194`; public fences use `@orkestrel/scaffold`. The `AGENTS\s*§` sweep over touched source, guides, README files, and `tests/guides.test.ts` returned no matches.

6. not held

7. REFUTED — `/home/user/work/evidence/conform-scaffold.status:1-15` lists `host.json` and `.orkestrel/campaign/...` changes. The unit scope at `tmp/units/conform/conform-scaffold-brief.md:31-38` does not include either path under Owned. The diff confirms them at `conform-scaffold.diff:1-97,220-239`.

8. not held

9. CONFIRMED — The added-line sweep `^\+[^+].*(TODO|defer|deferred|debug|console\.log|commented[- ]out)` returned no matches, and the commented-code sweep returned no matches. The disposition table at `conform-scaffold-report.md:8-24` accounts for the row changes; the later integration sections account for generated and shared patches.

Findings outside the claims

none

Referrals

- Orchestrator: resolve the scope of `host.json` and `.orkestrel/campaign/...` before landing; the status lists them, but the unit’s Owned scope excludes them.

VERDICT: FAIL 7; outside the claims: none

Journal

Leave for the driver.

Deviation

none