<!-- checker on Claude Sonnet, native, read-only, clean context, on the worktree ollama-audit at 2178171 with o4-diff.txt and o5-diff.txt; returned 2026-09-14 after 105 s; retained verbatim from the returned message. Its evidence-gap finding is closed: o4-exports.txt is now retained beside this file. -->

Lane: mechanical (checker, Sonnet)

## Findings outside the claims

- **F-checker-1 (evidence gap).** The brief names `o4-exports.txt` as the export list backing claim 1. That file does not exist in `.orkestrel/campaign/` (glob for `o4-exports*` returns nothing; only `o4-brief.md` mentions the filename, and `a3-exports.txt` is the only `*-exports.txt` present). Claim 1's export-enumeration reading rests on the gate result and my own re-derivation from the guide's Surface table rather than on the named artifact.

## Claim verdicts

**Claim 1** — CONFIRMED (with the gap above noted).
- `npm run test:guides` exits 0 at `2178171`: `o4-gates.log.txt:72-85` and `o5-gates.log.txt:72-85` both show `Test Files 1 passed (1)`, `Tests 32 passed (32)`, `=== exit=0`.
- Surface table (`guides/ollama.md:220-241` in `o4-diff.txt`) rows: `createOllama`, `OllamaProvider`, `OllamaOptions`, `WireChatRequest`, `DEFAULT_OLLAMA_URL`, `DEFAULT_KEEP_ALIVE`, `OLLAMA_CHAT_PATH`, `mapMessages`, `extractContent`, `extractThinking`, `extractUsage`, `extractTools`, `extractArguments` — matches `o4-report.md:81-83`'s named clause changes (dropped exports, added `OLLAMA_CHAT_PATH`).
- Methods table (`o4-diff.txt:256-265`) lists `frame`, `body`, `read`, `finish` only; `generate`/`stream` named in the lead paragraph (`o4-diff.txt:249`) and clause 15 (`o4-diff.txt:300`) with a link to `agent.md`.
- README pitch equals guide tagline: identical blockquote text at `README.md:3-6` and `guides/ollama.md:1-4` (both read).

**Claim 2** — CONFIRMED.
- `grep` for every removed export name over `guides/ollama.md` and `README.md` in the worktree: no matches.
- `OLLAMA_CHAT_PATH` has a row: `guides/ollama.md:75`.
- `grep` for `process\.stdout|process\.stderr` over `guides/ollama.md` and `README.md`: no matches (diff confirms both rewritten to `answer.push`/array collection, `o4-diff.txt:46-56`, `176-189`).

**Claim 5** — CONFIRMED.
- Five TSDoc lines changed in `src/core/helpers.ts` (`o4-diff.txt:510-548`): the `@param` lines for `extractContent`, `extractThinking`, `extractUsage`, `extractTools` (each `One parsed \`/api/chat\` record — a non-stream body or an NDJSON line` → `One parsed \`/api/chat\` NDJSON record`), plus the `@remarks` line for `extractUsage` — five edited lines total.
- Read live at `src/core/helpers.ts:50,73,94,119,143`: none mention a non-stream path; all describe the NDJSON record alone.
- Every guide Summary cell quoting these functions (`guides/ollama.md:229-240`) still equals the (unedited) description paragraph.

**Claim 6** — CONFIRMED.
- `README.md` pitch equals `guides/ollama.md` tagline: identical text, `o4-diff.txt:8-15` and `142-152`.
- `guides/README.md` dependency paragraph (`o4-diff.txt:108-137`, then `o5-diff.txt:1-16`) names runtime dependencies `@orkestrel/agent`, `@orkestrel/ndjson`, `@orkestrel/contract`, `@orkestrel/tool`, `@orkestrel/budget`, and states `@orkestrel/timeout` moved to development. `package.json:74-91` `dependencies` lists exactly `agent`, `budget`, `contract`, `ndjson`, `tool`; `devDependencies` includes `@orkestrel/timeout` — matches the guide paragraph exactly.

**Claim 7** — CONFIRMED.
- Case-insensitive sweep of `guides/ollama.md`, `guides/README.md`, `README.md` for the banned-term pattern set: no matches in any of the three files.
- Spot-checked code-token usage in the read passages follows the backtick-plus-noun convention; no violation found in the read material.

**Claim 8** — CONFIRMED.
- Pre-O4 baseline count: `o2-fix-gates.log.txt:38-39` — `Tests 99 passed (99)`. Post-O4 and post-cleanup: `o4-gates.log.txt:38-39` and `o5-gates.log.txt:38-39` both report `4 files, 99 tests`.
- No source behavior changed: the only `src/**` file in either diff is `src/core/helpers.ts`, and its only edits are the five TSDoc lines in claim 5 — no code line changed. TSDoc edits outside claim 5: none exist.

**Claim 9** — CONFIRMED for O4's own commit (`o4-diff.txt`).
- `grep '^diff --git'` over `o4-diff.txt` lists exactly: `README.md`, `guides/README.md`, `guides/ollama.md`, `src/core/helpers.ts`, `tests/guides.test.ts` — matching the claim's owned-file list exactly.
- The cleanup commit (`o5-diff.txt`) touches `guides/README.md`, `guides/ollama.md`, `package-lock.json`, `package.json`, `tests/conformance.test.ts` — outside claim 9's file list, but the brief scopes claim 9 to the diff O4 owns and separately directs the cleanup's sentences to claim 3.

**Claim 3** — UNRESOLVED (analyst's row).
**Claim 4** — UNRESOLVED (analyst's row).
**Claim 10** — UNRESOLVED (reviewer's row).

VERDICT: FAIL none; outside the claims: F-checker-1
