# Audit verdict — browser (P.1 and P.2, with the version successor)

Workflow `wf_92c6e20e-51a` (the browser slice), 2026-09-07, 25 minutes: the subjective lane (`reviewer`, Opus 5) `FAIL 12`, the objective lane (`reviewer`, Opus 5, the recorded substitution for the dark Sol bench) `FAIL 5 9 12`, the checker (Sonnet) `FAIL 12`; lanes retained as `d7n-browser-audit-{subjective,objective,checker-browser}.md`. Claim 11 CANNOT RULE on the lanes' side (the retained logs corroborate the intermediate readings and the version successor read `docs` at zero on the tip); the closure's `verifier` settles it. Claim 12 fails on the reports' counts (annotated).

## Findings carried into the fix round (`d7n-browser-converge-fix-brief.md`)

| Item | Finding | Source |
| --- | --- | --- |
| B1 | Hyphenated compounds broken at a line end reach the guide as `mid- request` and `off- shape` (`src/core/errors.ts:58-59`, `src/core/helpers.ts:476-477`, `:1417-1418`, `:1585-1586`) | subjective F1, objective F1 → Ruling 22 |
| B2 | The core quickstart fence sits under the titled heading with no heading of its own | subjective F2, objective F3 → Ruling 22 |
| B3 | Code tokens unbackticked in compared cells (`CDPClient`, `BrowserCodegen`, `Browser`, `WebSocketCDPTransport`) and the transport described two ways | subjective F3 → Ruling 22 |
| B4 | Surfaces named by position in the opening prose (`:16-17`) | subjective F4 |
| B5 | `#### Extended constants and entities` and the README's `entities` | subjective F5 → Ruling 22 |
| B6 | The README teaches `new CDPClient` where the guide teaches `createCDPClient` | subjective F6 |
| B7 | `BROWSER_RESULT_LIMIT_PATTERN`'s description carries its rationale and drops its pattern literal | subjective F8, objective F6 (Rulings 7 and 18) |
| B8 | `BROWSER_WAIT_POLL_INTERVAL_MS` lost the slack and readiness-probe facts; `CDPError`'s description restates its `@remarks` | objective 5 |
| B9 | `{@link BROWSER_RESULT_LIMIT}` flattened at `src/core/errors.ts:80`; all-caps `STRING LENGTH` and `BYTES` at `src/core/constants.ts:94`, `LOCAL DETACH ONLY` and `REMOTE` at `src/server/types.ts:210-212` | objective 9 and F5 |
| B10 | `BROWSER_CODEGEN_SOURCE`'s `@remarks` left unwrapped at `src/core/constants.ts:229-232` | objective F2 |
| B11 | `below` and `above` as pointers at `guides/browser.md:217`, `:1082`, `:1137` | objective F4 |
| B12 | The reports' counts and a false sweep claim (annotated) | every lane's 12, objective 9 |

## Carries

- The seed's refusal of a line ending in `[a-z]-` inside a description paragraph → `d7-fleet-plan.md` § Findings carried to the guide package (subjective F1's guide-release question, ruled: the fix round rewraps; the reader gains the refusal in its next release, not before 0.0.18).
- A brief that names an output larger than a message caps it in advance (subjective F9) → the pass instruments already capture the whole worklist (`gen-p2.sh`); recorded.
- The unit's instruments are retained under `instruments/d7/units/browser/` (subjective F7).

The fix round dispatches to the Opus `implementer`; the closure re-installs the final guide tarball, then `checker` over the fix and `verifier` over the whole chain.
