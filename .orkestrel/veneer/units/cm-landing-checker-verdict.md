# cm landing check (`checker` on Sonnet) — verdict

Brief: `units/cm-landing-checker-brief.md`. Instrument: `units/cm-probe-cm-integration.py`. Diff: `units/cm-integration.diff`.

Claim 1 — CONFIRMED. `cm-integration.diff:1-10` shows one content hunk against `tests/setupStyles.ts` changing only the head comment's two file tokens ("belongs in the `tests/setupServer.ts` module, and"; "belongs in the `tests/setupBrowser.ts` module."). `cm-status.txt:1-11` and `cm-2-status.txt:1-11` list identical modified-file sets.

Claim 2 — CONFIRMED. `/home/user/veneer-cm/tests/setupStyles.ts:1-7` carries the required text verbatim at lines 6-7; comparing `cm.diff:36-41` against `cm-2.diff:41-47` shows the sole wording change is the two insertions of "the" and "module"; no line exceeds 100 columns (line 5 measures exactly 100, line 6 measures 97).

Claim 3 — CONFIRMED. Every code token in the comment is followed by a noun (`REDUCED_MOTION` query; `setup` project; `src:styles` project; `node:*` import; `tests/setupServer.ts` module; `tests/setupBrowser.ts` module); no count; no banned term.

Findings outside the claims: none.

VERDICT: PASS
