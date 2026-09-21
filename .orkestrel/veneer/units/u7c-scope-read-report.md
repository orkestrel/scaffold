<!-- Retained from the checker's returned result (native Sonnet, Agent dispatch, clean context, 2026-09-21) for u7c-scope-read-brief.md against Veneer 0cbb563. Item 4's audit command could not run under the checker's read-only allowlist; the Orchestrator took that reading on the host: the vendored host paths under tests/ are tests/config.test.ts, tests/policy.test.ts, tests/setupPolicy.ts (none owned by U7c), and `scaffold audit --target .` reports 0 of 48 planned paths drifted. Verdict: dispatch. -->

## Item 1 — every named path resolves from the writer's root

Every path the brief or the message names resolves (`app/browser/{types,constants,Showcase,main,index}.ts`, `app/browser/styles/`, `tests/app/browser/{Showcase,index,integration}.test.ts`, `tests/setup.ts`, `tests/setupBrowser.ts` and its proof, `tests/distribution.test.ts` with the `installed package consumer` describe at line 910 and the entry loop at 1043, `tests/setupConformance.ts` (`OracleStep`, `ORACLE_BINDINGS` at lines 61 and 95), `guides/veneer.md` § Styles `### Deferred selectors` at 171 and § Compatibility at 662, `src/browser/{index,constants,Delegate}.ts`, the installed `@orkestrel/test` 0.0.18 with `matchesColor` at `index.d.ts:1546`); `app/browser/sections/*` are the files the unit creates. None found that fail to resolve.

## Item 2 — the re-taken readings against the live tree

The barrel's star exports (`src/browser/index.ts:1-7`), `BUTTON_TOGGLE`/`BUTTON_SELECTOR`/`BUTTON_ACTIVE` (`src/browser/constants.ts:8,11,14`), the `Delegate` prune loop by `root.contains(host)` (`src/browser/Delegate.ts:52-57`) and the owned host left to its owner (`:74`), the deferred-selector families with owners (`guides/veneer.md:171-238`), the Button `selector` and `variable` rows `shipped` (`:676`, `:686`), `@orkestrel/test` 0.0.18 (`package.json:3`), no paint wrappers in `tests/setupBrowser.ts`, the `app/browser/` listing, and `STATES = ['home', 'home-dark']` (`integration.test.ts:31`) all hold. None found the tree contradicts.

## Item 3 — scope by falsified assertions

Search scope: `tests/**` and `app/**` (word-boundary sweep on `SHOWCASE_COPY`, `STATES`, `PLACED`, `mountShowcase`), direct reads of `tests/distribution.test.ts`, `tests/app/browser/index.test.ts`, `tests/app/browser/integration.test.ts`, `guides/veneer.md` § Compatibility and § Styles, `package.json` in full.

| Assertion the result falsifies | File | Granted |
| --- | --- | --- |
| export-set equality gaining `ButtonSection`, `SectionInterface`, the specimen constant | `tests/app/browser/index.test.ts:6` | owned |
| `STATES` and `PLACED` growth | `tests/app/browser/integration.test.ts:31-32` | owned |
| `FAMILIES`/`PROVEN` matrix, co-located | `tests/app/browser/integration.test.ts:29-30` | owned |
| a guide row the mechanism could stale | `guides/veneer.md` | off-limits by design: recorded as a bound for U7e |
| the installed-consumer entry walk | `tests/distribution.test.ts:1043-1117` | not falsified; the brief's consumer case is additive inside the owned describe at 910 |

No ungranted file found among the swept population.

## Item 4 — vendored files the brief owns

None: the brief's owned set (`app/browser/**`, `tests/app/browser/**`, `tests/setup*.ts` named, `tests/distribution.test.ts`) contains no vendored path; the Orchestrator's host reading names the vendored test files as `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`.

Verdict: dispatch.
