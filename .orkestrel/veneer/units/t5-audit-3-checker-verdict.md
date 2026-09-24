<!-- Retained from Workflow run wf_d0a9503a-5af, agent a504308d046955c21 (checker on Sonnet). -->

# Checker verdict — T5 audit round 3 (claims 1, 6, 8)

## Claim 1 — Scope and gates

**CONFIRMED.**

- Status list: `/home/user/scaffold/.orkestrel/veneer/units/t5-3-status.txt:1-3` lists exactly `guides/test.md`, `src/browser/helpers.ts`, `tests/src/browser/helpers.test.ts` — no more, no fewer.
- Gate logs each end with the exit status their own run wrote:
  - `t5-instruments-3/t5-3-gate-format.log.txt:5` `exit 0`
  - `t5-instruments-3/t5-3-gate-lint.log.txt:5` `exit 0`
  - `t5-instruments-3/t5-3-gate-check.log.txt:21` `exit 0`
  - `t5-instruments-3/t5-3-gate-file.log.txt:11` `exit 0`
  - `t5-instruments-3/t5-3-gate-browser.log.txt:49` `exit 0`

## Claim 6 — Retained mutations (RB, RC, RD)

**PARTIALLY UNRESOLVED.**

- Application and reddening: CONFIRMED. `t5-instruments-3/t5-3-run.sh:9-23` applies each retained JSON file (`replace` or unique-match `edits`), and `t5-3-mutations-summary.log.txt:1-65` shows all eleven runs failing on the named proofs, restoring `helpers.ts` afterward (`restored` on each block, e.g. lines 6, 11, 65).
- No-attribute restore branch: CONFIRMED. `t5-3-mutations/emptystyle.json:4-8` flips the removal branch to set an empty attribute, and `t5-3-mutations-summary.log.txt:62-64` shows it reddens exactly "hands back a frame that carried no style attribute without one."
- Assertions distinguishing mutation from passing case: CONFIRMED for the sampled proofs — each failure line in the summary log names the specific test title the mutation breaks, matching the report's table (`t5-test-frame-report-3.md:123-135`).
- **UNRESOLVED sub-clause**: "runs on the final test file (whose digest is checked before and after)." Only a pre-run digest exists: `t5-instruments-3/t5-3-test-final.sha256.txt:1` records the SHA-256 once. No log records a post-run `sha256sum -c` result; the report's line "`sha256sum -c` returned OK after them" (`t5-test-frame-report-3.md:98`) is the writer's self-report with no corroborating log file. Per the report-only-evidence rule, this sub-clause is UNRESOLVED — command to close it: `sha256sum -c t5-3-test-final.sha256.txt` run against the test file state at the end of the mutation series, in `/home/user/test-tf`.

## Claim 8 — Prose (W8)

**CONFIRMED**, at the sites read (every `+`-prefixed sentence in `t5-3.diff` over `guides/test.md`, `src/browser/helpers.ts` TSDoc, and the added `tests/src/browser/helpers.test.ts` comments).

- Token-noun rule: every backticked identifier is followed by its noun — `t5-3.diff:84-86` "the `captureFrame` function stages", `:100` "the `releasePane` function returns", `:104` "the `page.viewport` method", `:127,131` "The `readFrame` function takes", "The `readCascade` function takes", `:260-262` "the `stagePane` function writes", `:270` "The `releasePointer` function parks".
- Possessive check: the only `` `X`'s `` pattern found (`` `readFrame`'s other two refusals ``) is on a **removed** line (`t5-3.diff:67`, `-` prefix), not an added one; its replacement (`:70`, "The remaining refusals of the `readFrame` function") drops the possessive. No added sentence possessivizes a code token.
- Count law: no added sentence states a count of a growable set (rules, rows, members, exports, files, options, steps, cases, stages, findings, tests). Numerals present (`30%`, `70 rows`, `40000x30000 device pixels`) are measurements naming a technical quantity, not counts.
- Temporal/banned-term rows: no `now`, `currently`, `new`, `latest`, `once` (temporal), `since` (causal), `should`, `simply`, `just`, `via`, `e.g.`, `etc.` found in any added line (grep of the diff against the substitution table returned no matches).
- Cross-reference row: every `above`/`below` occurrence in added text (`t5-3.diff:19,119-120,171,387-388,402,414,436,464,512`) is a spatial/domain use ("above the fold", "below the pane", pixel geometry), never a document cross-reference; `above`/`below` in that sense is outside the banned row.

## Findings outside the claims

None identified while reading these three claims' evidence.

## Counts the report states

- Diffstat: 3 files changed, 539 insertions, 34 deletions (`t5-test-frame-report-3.md:159`).
- Gate table: 5 commands run, one (`npm run test:guides`) not run (`t5-test-frame-report-3.md:150-155`).
- New-proof run: red 3 failed / 23 passed / 334 skipped; green 26 passed / 334 skipped (`t5-test-frame-report-3.md:108-109`).
- Retained mutation files: 11 listed in the mutation table (`t5-test-frame-report-3.md:125-135`), matching 11 blocks in `t5-3-mutations-summary.log.txt`.

VERDICT: FAIL 6; outside the claims: none
