# Audit claims — F7 CAPTURE in `@orkestrel/veneer` (worktree `/home/user/veneer-f7` over `07fc3c3`, 2026-09-22)

## Subject

The F7 unit, written by `opus` on Opus 5.5 from `/home/user/veneer-f7/tmp/units/f7-brief.md` in its own
worktree from `07fc3c3`: the capture registry writes every frame as `<scenario>--<theme>-<viewport>[-<step>]` with stems aligned to the Elements portfolio and the alignment table in the guide, whole specimens with their background, one accessibility artifact per specimen and variant, the pixel guard over every written frame outside the capture flag with a region-taking sampler, the caption opt-out specimen in `TABLE_SPECIMENS` with the helper-key subject contract, and the Button frames re-shot under the grammar. The unit's report is
`/home/user/scaffold/tmp/audit/f7-report.md`.

## What this round decides

Whether F7 lands as one commit; the capture portfolio under `tmp/capture/` is the review input for every rendered claim and source is corroboration. A BROKEN claim in code sends the unit to a fix round; a BROKEN claim in prose
alone is corrected by the Orchestrator at landing. The worktree integrates into the main checkout
after this round, so a finding about integration order is outside the claims.

## Already established — do not re-run

- The capture terrain `/home/user/scaffold/tmp/audit/f7-terrain.md` and the retained observations `/home/user/scaffold/tmp/audit/cl13-portfolio-observations.md` (the Elements stems, the blank-page comparison limit, the origin-pixel guard).
- The user's rulings D2, D9, D10 (`ROADMAP.md` § Rulings); the installed `@orkestrel/test` 0.0.20 exports (`readFrame`, `describeTree`, `describeFocus`, `stagePane`, `releasePane`).

## Review evidence

`/home/user/scaffold/tmp/audit/f7-audit-evidence.md`: the status output `f7-status.txt`, the diff
`/home/user/scaffold/tmp/audit/f7.diff` (against `07fc3c3`), the unit's report, the brief at
`/home/user/veneer-f7/tmp/units/f7-brief.md`, the terrain, and the Orchestrator's gate log
`/home/user/scaffold/tmp/audit/f7-gates.log.txt` when present.

## Numbered falsifiable claims

Before confirming any claim about a proof, name the mutation that would make the proof fail and say
whether its assertions distinguish that mutation from the passing case.

1. **One frame grammar, aligned stems.** The registry types and `expandCaptures`' inputs enforce `<scenario>--<theme>-<viewport>[-<step>]` with the mode in the theme token and no project suffix (mutation: a project-suffixed name must be refused at the type or the proof); each stem aligns with the Elements portfolio's stem for the same subject where one exists; the guide's § Tests capture paragraph carries the alignment table and names each Veneer-only stem.
2. **Whole specimens with their background.** The link key's frame covers the whole `Role links` specimen with its background, never a single anchor's crop; every element frame whose specimen holds more than one element does the same; a specimen wider than the 900 px bound is staged through `stagePane` and `releasePane`; the guide records the bounded comparison as the stated limit of side-by-side reading.
3. **Per-specimen accessibility artifacts and honest variant names.** Beside each specimen frame the registry writes that specimen's `describeTree` and `describeFocus` output as one text file per specimen and variant named by the grammar with an `accessibility` step, while the per-variant page tree stays in the manifest; the focus-ring, contrast, pointer-paint, and journal readings for the 390 variants record their own names rather than `light-1280` or `dark-1280`.
4. **The pixel guard runs outside the flag with a declared region.** The frame-variation guard runs over every frame on disk whether or not capture is on, skipping only when the portfolio wrote nothing with the case title saying so; the sampler takes the compared region as an argument (an element box in frame coordinates read at staging time) and reports the fraction of pixels in that region differing from the region's first pixel; `readFrame` supplies the decoding and the local decoder is gone; the `tests/setupBrowser.test.ts` cases named under the brief's What asserts still bind (name the mutation each catches).
5. **The caption opt-out specimen and the helper-key contract.** `TABLE_SPECIMENS` carries the specimen with the F6 caption opt-out class, its frame is registered, and `TableSection.test.ts` proves it; every registry key names its subject region and the registry proof asserts that region exists in the specimen tables; the key the brief's Unknowns identified is either given a region through `constants.ts` or removed with the record for B-UTILITIES in the report.
6. **The Button frames are re-shot and read.** Every Button frame exists under the corrected grammar with capture on; the report's table gives each frame's `readFrame` size, bottom-row colour, and variation reading; a defect a reading exposed is reported as a finding and not fixed here.
7. **The written portfolio matches the grammar.** With capture on, `tmp/capture/` (or the directory the registry names) holds only names matching the grammar and one accessibility artifact per specimen and variant; the report lists them; read the listing and a sample of the frames as the review input.
8. **The gate chain is green.** Every `=== <gate> exit=` line in the Orchestrator's gate log reads `exit=0`, and the journey suite ran green both without capture and with capture on (UNRESOLVED if the log is absent or lacks `=== gates done` when you read it).
9. **Scope is honest.** `git status --porcelain` lists only files under `tests/journey/**`, `tests/setup.ts`, `tests/setup.test.ts`, `tests/setupBrowser.ts`, `tests/setupBrowser.test.ts`, `app/browser/constants.ts` and the table section it feeds, `tests/app/browser/sections/TableSection.test.ts`, and `guides/veneer.md` (§ Tests capture paragraphs and § Showcase helper-key sentence only); a `vite.config.ts` or `ROADMAP.md` change is a returned patch and not an edit; no probe remains under `tmp/probe/`.
10. **Prose holds.** No changed prose line contains a banned term in a banned sense (pattern `\b(?:should|simply|eas(?:y|ier|iest)|just|currently|via|utilize|leverage|robust|performant)\b|\b(?:e\.g\.|i\.e\.|etc\.)`, case-insensitive), and no count of a growable set is stated as a number.
11. **The unit is coherent.** The sampler and the guard each have one job; the registry types express the grammar rather than a comment beside a string; nothing duplicates an installed `@orkestrel/test` export (`readFrame`, `describeTree`, `describeFocus`, `stagePane`, `releasePane`); the guide's capture paragraphs read as one contract a consumer of the portfolio can rely on.

## Unknowns

- What the unit reported as a deviation or an unverified claim of its own; the report says, and a
  lane rules on each.

## The threshold

PASS when every claim is CONFIRMED, or every BROKEN claim is in prose and the Orchestrator corrects
it at landing. A BROKEN claim in code (1 to 7) opens a fix round. A lane that returns no verdicts
is a lane that did not run.
