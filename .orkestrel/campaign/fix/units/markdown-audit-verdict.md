# Audit verdict — unit breaking-markdown

Bench: Sol dark; objective lane on the writer's engine (Opus 5) in a clean context, told so;
`checker` and `verifier` on Sonnet. Subject: commit `9c0dfc7` (`units/markdown.diff`,
`units/markdown-report.md`). The subjective lane did not run: one rename, one comment repoint,
and seven guide cells, below the wide-unit trigger.

| Claim | Objective | Checker | Verifier | Orchestrator |
| --- | --- | --- | --- | --- |
| 1 rows (s10-08, s10-02, s10-06) | CONFIRMED | CONFIRMED | — | stands |
| 2 no old name (`isWhitespace` and the retired "inline whitespace" term gone; `isFenceWhitespace` untouched); the seven named types already in `types.ts` | CONFIRMED | CONFIRMED | — | stands |
| 3 ruled form (`isFlankingWhitespace` stays `is*` in helpers with both call sites) | CONFIRMED | — | — | stands |
| 4 no alias or shim | CONFIRMED | — | — | stands |
| 5 guide rows and `@example` moved; no `INTERNAL` list; the s10-02 index fix corroborated against the compilers test | — | CONFIRMED | — | stands |
| 6 only owned files | CONFIRMED | CONFIRMED | — | stands |
| 7 gates | UNRESOLVED (no shell) | CONFIRMED on the quoted commands | GREEN (801 tests) | stands |
| 8 nothing hidden | CONFIRMED | — | — | stands |

The requested finding: the seven named return types match the declared return types exactly
(`extractHeading` `HeadingMatch`, `extractFence` `FenceMatch`, `scanCode` `CodeSpanMatch`,
`locateLink` `LinkBounds`, `locateEmphasis` `EmphasisBounds`, `collectTable` `TableCollection`,
`collectList` `ListCollection`); `scanLink` and `scanEmphasis` return anonymous shapes and their
cells stay inline. No fix-up.

Recorded for the next change: every boolean `@returns` in `src/core/helpers.ts` uses the
"`true` when …" form the TSDoc rule replaces with "True if …; false otherwise" (the voice wave
sweeps the file rather than leaving one block in the required form); the `scanLink` and
`scanEmphasis` guide cells drop the `readonly` modifiers the source declares.

Terminal lines: objective PASS; checker PASS; verifier GREEN. **Verdict: PASS.** The unit closes
**applied** for every row. Tip packed: `markdown-9c0dfc7.tgz`.
