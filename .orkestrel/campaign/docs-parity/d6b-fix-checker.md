Lane held: checker

## Claim 1 — O1 (rename `bundled`/`declaration.bundled` to `browsable`): PASS

`grep -n "bundled" /home/user/scaffold/src/core/templates.ts` shows only the Vite-bundle sense (`:1983`, `:2004`, `:2033`) and the Playwright bundled-browsers sense (`:688-960`, `:1161`); none under `Entry`, `buildStage`, the drives, or the guard. `grep -n "entry.bundled\|declaration.bundled\|bundled: boolean"` returns no hits anywhere in the tree. Confirmed at the sites: declaration `src/core/templates.ts:1184`; local and reads `:1674`, `:1687`; pushed declaration record `:1685`; unreachable filter `:1841`; browser drive's gate `:2041` and demand `:2045`; guard fragment's filter `:2088`. `grep -n "bundled" tests/src/core/templates.test.ts` shows only the unrelated Playwright `bundled` local (`:1140`, `:1150`, `:1268`, `:1277`), not an `Entry` member.

## Claim 2 — O2 (member order): PASS

`src/core/templates.ts:1177-1190` reads `subpath, specifier, mapping, declaration{importable, requirable, browsable}, browsable, importable, requirable, loadable`. The pushed record at `:1678-1691` follows the identical order. `tests/src/core/templates.test.ts:1559-1655` (per `d6b-fix.diff.txt:2857-3003`) carries the same order (`browsable, importable, requirable, loadable`), correcting the alphabetical order the audit flagged in the pre-fix state (`d6b-template-rename.diff.txt:2862-2865`: `bundled, importable, loadable, requirable`).

## Claim 3 — O3 and O4 (comments verbatim): PASS

`src/core/templates.ts:1172-1176` reads exactly the brief's O3 text, including the restored `that` pronouns the audit's claim 2 required (`d6b-audit-subjective.md:23`). `src/core/templates.ts:1475-1477` reads exactly the brief's O4 text.

## Claim 4 — No behaviour moved: FAIL

`src/core/templates.ts:1675` introduces `const shadowed = browsable && requireTarget === browserTarget` (the report calls this local `overrides`, but the file has `shadowed` — see claim 6), a new statement with a new local binding that did not exist in the pre-fix state (`d6b-template-rename.diff.txt:1650-1653`, one combined expression `const requirable = requireTarget !== undefined && !(bundled && requireTarget === browserTarget)`). Splitting one expression into two statements introducing a new identifier is a structural change, not an identifier rename, a member-order change, or a comment change. The resulting value is behaviourally equivalent, but the claim's literal scope — "changes identifiers, member order, and comments only" — is false as written.

## Claim 5 — Scope honesty: PASS

`d6b-fix.status.txt` and `d6b-template-rename.status.txt` are byte-identical (both list the same 27 modified paths plus `?? scripts/docs.ts`). The `diff --git` header positions in `d6b-fix.diff.txt` and `d6b-template-rename.diff.txt` align exactly for every file before `src/core/templates.ts` and shift by a uniform +10 lines for every file after `tests/src/core/templates.test.ts`, consistent with only those two files differing in length. Direct comparison confirms byte-identical hunks outside the two owned files: `host.json`/`package.json` (`d6b-fix.diff.txt:1161-1232` vs `d6b-template-rename.diff.txt:1161-1232`) and `tests/src/server/helpers.test.ts`/`tsconfig.json` (`d6b-fix.diff.txt:3036-3139` vs `d6b-template-rename.diff.txt:3026-3129`).

## Claim 6 — Report honesty: FAIL

`d6b-fix-report.md:35-38` quotes `const overrides = browsable && requireTarget === browserTarget` followed by `const requirable = requireTarget !== undefined && !overrides`, citing `src/core/templates.ts:1674-1676`. The actual file at those lines reads `const browsable = resolvesBrowser(entry)` (`:1674`), `const shadowed = browsable && requireTarget === browserTarget` (`:1675`), `const requirable = requireTarget !== undefined && !shadowed` (`:1676`). No `overrides` identifier exists anywhere in `src/core/templates.ts` (confirmed by grep). The report's flagged claim cites code that is not in the file it names.

Additional citation drift in the same report: `d6b-fix-report.md:8` cites the browser drive's gate and demand at `:2042`, `:2046`, and the guard fragment's filter at `:2089`; the actual sites sit one line earlier at `:2041`, `:2045`, and `:2088`.

## Findings outside the claims

- `src/core/templates.ts:1675` — the intermediate local's name, `shadowed`, is a design choice not audited by any lane (the objective lane did not run; the subjective lane audited only the pre-split state). No claim here rules on the name itself; flagged for the Orchestrator to route to a design lane if the name matters going forward.

VERDICT: FAIL 4 6
