Now assembling the final verdict.

## Verdict

| Claim | Check | PASS/FAIL | Site |
|---|---|---|---|
| 1 | `matchesLooseTagPair('h1\64 p')` false / `('h1\64x p')` true; `extractCompoundTags('h1\+p')` `['h1+p']`; `readEscape('\D800',0)`/`('\110000',0)` → U+FFFD spans 5/7; `readEscape('\10FFFF',0)` → U+10FFFF span 7 — each written as a literal case | PASS (case-existence only; truth of the assertion is an execution fact this lane cannot run) | `u3-diff-7.patch.txt:2544-2545,2485,2395-2397` |
| 2 | `readIdentifier(walkSelector('[a="\64"]'), 4)` and `('[a="d"]', 4)` `undefined`; `('a"b"', 0)` `{text:'a', end:1}`; `walkSelector('h1\"p')` marks no step quoted | PASS (case-existence only) | `u3-diff-7.patch.txt:2414-2416,2375` |
| 3 | `matchesCSSWhitespace`/`trimCSSWhitespace` named for space/tab/LF/CR/FF, refuse U+00A0/U+2028; the six named executed readings are cases; "no selector reader in `tests/setupStyles.ts` uses `\s` or `trim()`" | PASS (case-existence); the `\s`/`.trim()` sweep of `tests/setupStyles.ts` is clean — the diff's only `\s`/`.trim()` use is `normalizeSelectorText` in `tests/setup.ts`, a different file the claim's own wording excludes | `u3-diff-7.patch.txt:2434-2451,3305-3320` (clean); `:1401` (`normalizeSelectorText`, out of the named file) |
| 4 | `extractCompoundAlternatives`/`extractSelectorSubject` cases and the eight executed readings | PASS (case-existence only) | `u3-diff-7.patch.txt:2548-2559,2565-2570` |
| 5 | `walkSelector`'s TSDoc states the grammar as a closed list and carries the `BOOTSTRAP_SCOPE_PATTERNS` carve-out; other readers' TSDoc refer to it | PASS | `u3-diff-7.patch.txt:3420,3434-3435` (`walkSelector` doc-block), `:3415-3416` (cross-reference) |
| 6 | `scanUnreadForm` names `\|`, `:has(`, `of` clause, `/* */` at any depth/case; `matchesLooseTagPair` throws naming the form; the four controls named all present as cases | PASS (case-existence only) | `u3-diff-7.patch.txt:2573-2592,3756-3805` |
| 7 | No `any`, `!`, illegal `as`, `@ts-`, `eslint-disable`, default export, nested function, or hidden/mutable module-scope declaration in the two touched files; every new export prefix-conformant; sweeps clean | PASS on the syntax and prefix sweep (no forbidden token found; the file's `export default` is confined to `configs/src/vite.styles.config.ts`, a framework config, not one of the two touched files) | grep of `u3-diff-7.patch.txt` for `any`/`as `/`@ts-`/`eslint-disable`/`!` inside `tests/setupStyles.ts`/`.test.ts` hunks (lines 2026–3989): no match outside `as const` |
| 7 (digest) | cascade SHA-256 unchanged (`8dc6e2f...`) | UNDECIDABLE — a build-artifact fact, not present in the diff or status; only a re-run of `build` establishes it, and the claim's only evidence today is the writer's report, which this role cannot accept as CONFIRMED | n/a |
| 8 | `tmp/audit/u3-status-7.txt` lists exactly the files briefs 4–10 own or grant, the two integrated patch sites, and nothing else | PASS at file level | every path in `tmp/audit/u3-status-7.txt:1-31` resolves to a brief grant — see placement table |
| 9 | Gate exit codes, `scaffold audit` drift | UNRESOLVED — ruled "by the Orchestrator from the retained verifier report" per the claims file itself; this lane holds no gate evidence and cannot confirm a command it did not run | n/a |

## Placement table

| Owned file | Placing rule / grant |
|---|---|
| `README.md` | brief 4 Scope: "the sentence at line 27" |
| `configs/src/vite.styles.config.ts` | brief 4 Scope: "the `setupFiles` line alone"; also an integrated patch site named in the checker brief |
| `guides/README.md` | brief 4 Scope: "the sentence at line 17 and the `src/styles` row at line 31" |
| `guides/veneer.md` | brief 4 Scope: "in full" |
| `src/core/constants.ts` | `u3-brief.md` Scope: `src/core/constants.ts` |
| `src/core/index.ts` | `u3-brief.md` Scope: `src/core/index.ts` |
| `src/core/types.ts` | `u3-brief.md` Scope: `src/core/types.ts` |
| `src/styles/_mixins.scss`, `_theme.scss`, `_tokens.scss`, `index.scss`, `elements/_body.scss`, `elements/_html.scss` | `u3-brief.md` Scope: `src/styles/**` |
| `tests/distribution.test.ts` | integrated patch site named in checker brief and in brief 4's "Context" (D3 patch) |
| `tests/setup.test.ts` | brief 5 Scope: "plus `tests/setup.test.ts` (new)" |
| `tests/setup.ts` | brief 4 item 7: "gains the exported registry walk (`collectTokenNodes`)"; referral below on `normalizeSelectorText` |
| `tests/setupBrowser.ts`, `tests/setupBrowser.test.ts` | brief 4 Scope: named directly |
| `tests/setupConformance.ts`, `tests/setupConformance.test.ts` | brief 7 Scope: "for item 8's addition alone" — diff confirmed to add only `readBootstrapCascade` and its case, per brief 7 item 8's "touch nothing else" |
| `tests/setupStyles.ts`, `tests/setupStyles.test.ts` | brief 10 Scope: the two owned files |
| `tests/src/core/index.test.ts` | `u3-brief.md` Scope: named directly |
| `tests/src/styles/**` (`elements/body.test.ts`, `elements/html.test.ts`, `fixtures/mixins.scss`, `index.test.ts`, `integration.test.ts`, `mixins.test.ts`, `theme.test.ts`, `tokens.test.ts`) | `u3-brief.md` Scope: `tests/src/styles/**` |

No path in the status file falls outside a brief grant.

## Referral

`tests/setup.ts:1401` — `normalizeSelectorText` uses JavaScript `\s` and `.trim()`, and brief 4's scope grant for `tests/setup.ts` names only "the registry walk alone" (`collectTokenNodes`). This function was moved into `tests/setup.ts` by brief 3/4's item 7 and accepted in round 3 (`u3-report-3.md:18,367`), so it predates round 7 and round 7's claims name none of it (per the claims file's own instruction to "re-read other sites only where a claim names them"). Whether the narrower "registry walk alone" wording in brief 4's current Scope section still covers it, or is stale relative to item 7's broader text, is a judgment call for the Orchestrator or the subjective lane, not a mechanical one.
