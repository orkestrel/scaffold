# E-ID-LAYOUT round 5 — the Orchestrator's closing read (2026-09-25)

The round applied three texts the round-4 subjective lane prescribed (`eil-audit-4-verdict.md` L8, L9, L10), written by
`builder` on Sonnet under `e-id-layout-brief-5.md`. Verbatim prescriptions close with a mechanical read
(`.claude/rules/quality.md` § Rounds and verdicts), taken by the Orchestrator on Opus 5.5, an engine that did not write
them:

- `figure.test.ts` carries the title `ends $holder at the footer edge and starts the next block 16px after it` and the
  comment "The readings pin the figure's flow and margin and the caption's spacing, size, line height, and muted
  color."; `calibration-content` appears nowhere in it.
- `FIGURE_IMAGE_CASES` carries the `d-flex flex-column` holder and the prescribed remark; `d-block` appears nowhere in
  `tests/setupStyles.ts`.
- The owned run reads `Tests 10 passed (10)` (`eil-instruments/r5/eil-5-owned.log.txt`); removing the caption margin
  reddens the flex-column holder's case (`Tests 4 failed | 6 passed (10)`), and the file's SHA-256 digest before the
  mutation, after the restore, and in the live tree is `8e83da13…22b1`
  (`eil-instruments/r5/eil-5-mutation-no-caption-margin.log.txt`).
- `format:check`, `lint:check`, `check`, and `test:setup` end `exit=0`; the status equals round 4's.

E-ID-LAYOUT is accepted and lands with the E-ID units.

VERDICT: PASS
