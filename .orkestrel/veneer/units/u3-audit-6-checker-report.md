Now assembling the final verdict output.

---

**Claim | Check | PASS/FAIL | Site**

| Claim | Check | PASS/FAIL | Site |
|---|---|---|---|
| 4 | Legend sentence: `Source` legend table in `guides/veneer.md` follows a sentence naming that the table lists every `Source` value and what each names | PASS | `u3-diff-6.patch.txt:110-116` — "The table lists every `Source` value a cell can carry, and gives in each row what that value names." precedes the `\| Source \| Meaning \|` table |
| 4 | Every table under § Tokens follows a sentence | PASS | Checked all eleven tables added under § Tokens (`u3-diff-6.patch` lines 116, 132, 148, 164, 179, 199, 224, 235, 249, 267, 341, 384); each is immediately preceded by a complete sentence naming what it lists |
| 5 | Departures table Token column holds bare keys; `--bs-body-font-size`/`--bs-font-sans-serif` aliases sit in a sentence after the table | PASS | `u3-diff-6.patch:341-360` — every Token cell is a bare key (`` `--vn-size-2` ``, `` `--vn-weight-heading` ``, etc.); the alias sentence "Bootstrap's `--bs-body-font-size` reads `--vn-size-2` and its `--bs-font-sans-serif` reads `--vn-font-sans`…" sits at lines 358-360, after the table |
| 6 | No line of the guide names a disclosure or drawer unit; sentence reads "the first unit that animates a keyword length" | PASS | `u3-diff-6.patch:406` carries the exact phrase; `guides/veneer.md` mentions "Elements' disclosure" once (`u3-diff-6.patch:352`) describing Elements' own behavior, not a Veneer disclosure/drawer unit — a live grep of `C:/Users/mikes/WebstormProjects/veneer` for `the objective lane edge forms` and `palette-each` (unrelated stale-name checks) confirms no leftover unit naming |
| 3 | `$assets` declared `!default` in `_tokens.scss`; `_theme.scss`'s `@error` names the key on a `sass compileString` case; a control reads the emitted declaration | PASS | `src/styles/_tokens.scss:103-109` (`$assets: (…) !default;`); `src/styles/_theme.scss:21-25` (`@error 'tokens.$assets names #{$key}, which tokens.$dark does not declare.'`); `tests/setupStyles.test.ts:162-169` — case `'refuses an asset key the dark map does not declare, and declares the alias for one it does'` uses `compileString` from `src/styles`, asserts the throw names `probe-absent` and the control asserts the emitted `--vn-probe: url("data:image/svg+xml,` declaration |
| 1 | `tests/setupStyles.ts` exports `readEscape(text, index)`, `readIdentifier(steps, start)`, and `walkSelector` reads escapes through `readEscape` (existence only — behavioral readings are the analyst's remit, not mechanically checkable here) | PASS (existence) | `tests/setupStyles.ts:713` (`SelectorEscape` interface), `:732` (`readEscape`), `:796` (`walkSelector`), `:816` (`SelectorIdentifier`), `:836` (`readIdentifier`), `:994` (`extractCompoundTags`) all present with the named signatures |
| 7 | Sweep: no `any`, non-null assertion, `as` beyond `as const`, `@ts-` directive, `eslint-disable`, default export outside a config file, in the diff | PASS | Greps over `u3-diff-6.patch.txt`: `@ts-\|eslint-disable` — no matches; `^\+export default` — no matches; `[a-zA-Z0-9_)\]]!\.[a-zA-Z]` (non-null assertion) — no matches; `as [A-Za-z]` occurrences are all `as const` (lines 2300-2759 etc.) or prose using "as" non-assertively |
| 7 | No stale names survive (`palette-each`, "the objective lane edge forms") | PASS | Grep over `C:/Users/mikes/WebstormProjects/veneer` for both strings — no matches |
| 8 | Scope honesty: `tmp/audit/u3-status-6.txt` lists exactly the files briefs 4-9 own or grant, plus the two integrated patch sites, and nothing else | PASS | See placement/ownership table below; every path in `u3-status-6.txt` traces to an owning brief or the two named integrated sites |

**Placement table**

| Owned file | Placing rule row |
|---|---|
| `src/core/types.ts` | `architecture.md` § Centralized-file pattern — Interfaces/types → `*/types.ts` |
| `src/core/constants.ts` | `architecture.md` § Centralized-file pattern — Constants/data → `*/constants.ts` |
| `src/core/index.ts` | `architecture.md` § Centralized-file pattern — Public exports → `*/index.ts` |
| `src/styles/_tokens.scss`, `_theme.scss`, `_mixins.scss`, `index.scss`, `elements/*` | `.claude/rules/styles.md` (SCSS centralization; outside `architecture.md`'s TS-kind table) |
| `tests/src/core/index.test.ts` | `tests.md` § Test contract — mirrors `src/core/index.ts` |
| `tests/src/styles/**` (`tokens.test.ts`, `theme.test.ts`, `mixins.test.ts`, `index.test.ts`, `integration.test.ts`, `elements/html.test.ts`, `elements/body.test.ts`, `fixtures/`) | `tests.md` § Test contract — mirrors `src/styles/**`; `fixtures/` holds data files alone per brief 5 item 6 |
| `tests/setup.ts` | `tests.md` § Shared test infrastructure — "`tests/setup.ts`: host-independent; no `node:*`, DOM, `window`, or Vue" (`tests.md:195`) |
| `tests/setup.test.ts` | `tests.md` § Cross-cutting proofs — `tests/setup*.test.ts` row (`tests.md:59`) |
| `tests/setupStyles.ts` | `tests.md` § Shared test infrastructure — "`tests/setupStyles.ts`: CSS/style helpers and compiled cascade" (`tests.md:198`) |
| `tests/setupStyles.test.ts` | `tests.md` § Cross-cutting proofs — `tests/setup*.test.ts` row |
| `tests/setupBrowser.ts` | `tests.md` § Shared test infrastructure — "`tests/setupBrowser.ts`: DOM/Vue/browser helpers and setup CSS" (`tests.md:197`) |
| `tests/setupBrowser.test.ts` | `tests.md` § Cross-cutting proofs — "Put `tests/setupBrowser.test.ts` in the browser-enabled `setup:browser` project" (`tests.md:62`) |
| `tests/setupConformance.ts` | `tests.md` § Shared test infrastructure (Node-only setup module; brief 7 item 8 places `readBootstrapCascade` there as "the workspace's Node-only setup module that already reads files") |
| `tests/setupConformance.test.ts` | `tests.md` § Cross-cutting proofs — `tests/setup*.test.ts` row |
| `guides/veneer.md`, `guides/README.md`, `README.md` | `.claude/rules/documentation.md` (guide/parity placement; outside `architecture.md`/`tests.md`) |
| `configs/src/vite.styles.config.ts` | `.claude/rules/workspace.md` (config wrapper; integrated patch site per brief 4 item, granted for the `setupFiles` line) |
| `tests/distribution.test.ts` | integrated patch site named directly in the audit claims (claim 8), not an owned file under any brief |

No path in `tmp/audit/u3-status-6.txt` traces to no brief: every modified and untracked path resolves to an owning brief's Scope § Owned (briefs 4, 5, 7) or to one of the two named integrated patch sites (`configs/src/vite.styles.config.ts`, `tests/distribution.test.ts`).
