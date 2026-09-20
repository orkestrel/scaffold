<!-- workflow wf_9df9c385-3e9, agent a13a488e19bd5b899, retained 2026-09-20 -->

## Checker report — U4b audit claims 1, 3, 5, 6, 7

| Claim | Check | PASS/FAIL | Site |
|---|---|---|---|
| 1 | Interfaces `CompatibilityRow`, `OracleReading`, `OracleStep`, `OracleFixture`, `OracleVocabulary`, `OracleInventory` declared, all properties `readonly` | PASS | `tests/setupConformance.ts:30-77` |
| 1 | `ORACLE_TIMEOUT = 10_100` declared | PASS | `tests/setupConformance.ts:83` |
| 1 | `readCompatibility`, `readBuiltCascade`, `readOracleControl`, `readOracleInventory`, `scanOracleObligation`, `recordButtonOracle` exported | PASS | `tests/setupConformance.ts:320,365,376,423,463,546` |
| 1 | Export-set assertion in `tests/setupConformance.test.ts` names every runtime export, in both directions | PASS | `tests/setupConformance.test.ts:37-61` (23 names, matches module's 23 runtime exports) |
| 1 | No `class` declared in `tests/setup*.ts` | PASS | grep `class ` on `tests/setupConformance.ts` — no matches |
| 3 | `tests/fixtures/oracle/button.json` exists and parses with `version`, `component`, `steps`, `excluded` keys | PASS | `tests/fixtures/oracle/button.json:1-4,1038` |
| 3 | `excluded` is an empty array | PASS | `tests/fixtures/oracle/button.json:1038` (`"excluded": []`) |
| 3 | Step names include `button.initial`, `button.click.toggle`, `button.keyboard.space`, `button.pointer.release`, `button.pressed.click`, `button.disabled.click`, and their `button.reduced.` twins | PASS | `tests/fixtures/oracle/button.json:6,49,141,329,423,470,522,565,657,845,939,986` |
| 3 | Fixture written only under `ORACLE_REFRESH=1` | PASS | `tests/conformance.test.ts:92-100` (read-and-compare unconditional; `writeFileSync` gated on `process.env.ORACLE_REFRESH === '1'`) |
| 3 | `tests/fixtures/oracle/` holds `.json` files only | PASS | directory listing: `button.json`, `inventory.json` |
| 5 | `guides/veneer.md` headings in order `## Tokens` … `## Compatibility` … `## Showcase` | PASS | `guides/veneer.md:188,486,547` |
| 5 | `## Compatibility` table header is `\| Component \| Kind \| Obligation \| Proof \| Status \|` | PASS | `guides/veneer.md:495` |
| 5 | Every row's `Status` cell is `accepted` | PASS | `guides/veneer.md:497-529` (every row) |
| 5 | Every `Proof` cell is `—` or a step name present in `button.json` | PASS | `guides/veneer.md:497-529` cross-checked against `tests/fixtures/oracle/button.json` step names |
| 5 | `## Tests` links `tests/conformance.test.ts` and `tests/setupConformance.test.ts` | PASS | `guides/veneer.md:586,588` |
| 6 | No `: any`, `as ` outside `as const`, `!.`/`!)`/`!;`, `@ts-`, `eslint-disable`, `export default` in the three changed TypeScript files | PASS | grep swept `tests/setupConformance.ts`, `tests/conformance.test.ts`, `tests/setupConformance.test.ts` — no matches for any pattern (` as ` hits are all prose, e.g. `tests/setupConformance.ts:477`) |
| 6 | `import(`/`require(` of the Bootstrap bundle (`bootstrap.bundle` / `bootstrap/dist/js`) | PASS — no `import(`/`require(` hit; every occurrence is a byte read | `tests/setupConformance.ts:555` (`scratch.write('bootstrap.bundle.js', ...)`) and `:557` (`readFileSync(...'dist/js/bootstrap.bundle.js')`); `tests/conformance.test.ts:43` (`computeArtifactDigest` → `readFileSync`) |
| 6 | `package.json` `devDependencies` names `@orkestrel/markdown` and `playwright` | FAIL (partial) | `playwright` present at `package.json:105`; `@orkestrel/markdown` absent from `devDependencies` (`package.json:91-114` — not listed), though `tests/setupConformance.ts:16` imports `createMarkdown` from it |
| 6 | No new file sits under `tests/` outside `tests/fixtures/oracle/` | PASS | `tmp/audit/u4b-status.txt:5-6` — only untracked files are `tests/fixtures/oracle/button.json` and `tests/fixtures/oracle/inventory.json` |
| 7 | `tmp/audit/u4b-status.txt` lists exactly `guides/veneer.md`, `tests/conformance.test.ts`, `tests/setupConformance.test.ts`, `tests/setupConformance.ts`, `tests/fixtures/oracle/button.json`, `tests/fixtures/oracle/inventory.json` | PASS | `tmp/audit/u4b-status.txt:1-6` |

Every export `tests/setupConformance.ts` declares:

`BOOTSTRAP_BUNDLE_DIGEST`, `BOOTSTRAP_CSS_DIGEST`, `BOOTSTRAP_MANIFEST_PATH`, `BOOTSTRAP_RTL_CSS_DIGEST`, `BOOTSTRAP_VERSION`, `CompatibilityRow` (type), `FORBIDDEN_RUNTIME`, `OracleFixture` (type), `OracleInventory` (type), `OracleReading` (type), `OracleStep` (type), `OracleVocabulary` (type), `ORACLE_TIMEOUT`, `WORKSPACE_ROOT`, `collectImportClosure`, `computeArtifactDigest`, `extractSpecifiers`, `extractStringArgument`, `readBootstrapCascade`, `readBuiltCascade`, `readCompatibility`, `readManifestMember`, `readOracleControl`, `readOracleInventory`, `recordButtonOracle`, `scanEscapingImport`, `scanForbiddenDependency`, `scanForbiddenSource`, `scanOracleObligation`.
