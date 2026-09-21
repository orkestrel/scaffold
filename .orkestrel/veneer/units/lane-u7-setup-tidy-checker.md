<!-- workflow wf_58c8653a-2ff, agent aa6360de88eb1ea38, label unknown, retained 2026-09-20 -->

## Claim table (mechanical claims only)

| Claim | Verdict | Evidence |
|---|---|---|
| 9 | CONFIRMED | `tmp/audit/u7-setup-tidy-status.txt` lists exactly the twelve owned files (`tests/setupBrowser.ts`, `tests/setupBrowser.test.ts`, `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, `tests/setupConformance.ts`, `tests/setupConformance.test.ts`, five `tests/src/styles/**` files, `vite.config.ts`); none of `src/**`, `app/**`, `guides/**`, `package.json`, `configs/**`, `tests/conformance.test.ts`, `tests/fixtures/**` appear. Grep of the diff for `any`, `eslint-disable`/`ts-ignore`/`ts-expect-error`/`ts-nocheck`, `.skip(`/`.only(`, a non-`const` type assertion, and a non-null assertion returned no matches (`\w!(\.|;|\)|,|$)` clean; `\bas\s+\w` matches are prose/comments/`import * as setup` only). No `PLANT` or `zzprobe` string anywhere in the diff or the live `C:/Users/mikes/WebstormProjects/veneer/tests` tree. `describeIncompleteRow` is the only added module-scope function (`tests/setupConformance.ts:453`) and is exported and driven by two cases (`tests/setupConformance.test.ts:354-397`). Export-set parity verified by hand against live exports: `tests/setupBrowser.ts` 10 exports = the 10 named in `tests/setupBrowser.test.ts:32-46`; `tests/setupConformance.ts` 31 value exports = the 31 named in `tests/setupConformance.test.ts:48-80`; `tests/setupStyles.ts` 47 value exports = the 47 named in `tests/setupStyles.test.ts:54-104`. |

## Probe readings

- **Wrappers**: `Grep` for `readPaintedColor|matchesPaintedColor` across `C:/Users/mikes/WebstormProjects/veneer/tests` returns zero hits. Every former call site under `tests/src/styles/**` now imports `matchesColor` (or `parseCSSColor`) from `@orkestrel/test/browser` (diff hunks for `body.test.ts`, `integration.test.ts`, `mixins.test.ts`, `theme.test.ts`, `tokens.test.ts`).
- **Pool**: `vite.config.ts:311` reads `pool: 'forks',` on the `setup` project.
- **Pins**: `BOOTSTRAP_VERSION` and `BOOTSTRAP_CSS_DIGEST` each declared exactly once, both in `tests/setupConformance.ts:190,203`. `BOOTSTRAP_DIGEST` and `BOOTSTRAP_CASCADE_PATH` return zero hits anywhere under `tests/`. `BOOTSTRAP_CASCADE_PATH` does not survive. `BOOTSTRAP_CSS_DIGEST` is consumed outside its own case by `tests/conformance.test.ts:8,40`.
- **Labels**: `describeIncompleteRow` refusals confirmed at `tests/setupConformance.ts:545-563` (`Compatibility`) and `tests/setupConformance.ts:570-588` (`Deferral`). The pinned invalid-status wording is unchanged: the new build `` `Compatibility row ${component}: ${obligation}: invalid status ${status}` `` (`tests/setupConformance.ts:563`) still produces `Compatibility row btn: Toggle active: invalid status pending`, matching the pinned string in `tests/setupConformance.test.ts`.
- **Reach**: the binding-table case at `tests/setupConformance.test.ts:272-286` asserts every `ORACLE_BINDINGS` entry answers at least one `readCompatibility()` row of its component and category. The empty-`events` refusal at `tests/setupConformance.ts:627-628` names the binding (`binding ${binding.component} | ${binding.category} names no events`), matched by the test string at `tests/setupConformance.test.ts:315-317`.
- **Scope**: status file's twelve lines are a subset of the brief's owned set; no off-limits path present (see claim 9 row).
- **Enumerating assertions**: export-set cases verified exact against live `Object.keys` population for all three setup modules (see claim 9 row); no `it(` was found removed without its subject removed with it in the reviewed hunks.

## Extra findings

None found (implementation scope only).

Verdict: accept
