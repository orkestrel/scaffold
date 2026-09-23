# Unit T4 TEST-CLIP — the capture harness ends a clipped descendant at its frame

## Role and engine

The Orchestrator (Opus 5.5 in this harness) writes this unit itself in the `@orkestrel/test` checkout `/home/user/test` (branch `claude/inspiring-allen-t4qzv1` at `936bc4a`, the 0.0.20 release), so its auditor is `analyst` on GPT-6 Astra, an engine the Orchestrator does not share, with `checker` on Sonnet beside it.

## Objective

`measureContent` in `src/browser/helpers.ts` stops counting an element's bottom edge at any ancestor that clips its overflow, so a viewport-height specimen inside a bounded frame no longer stretches the measured document with every staged pane and `captureFrame` settles on such a document.

## Context

**The defect.** The UTIL-PLACEMENT landing on Veneer (`ac96f81`) adds sizing specimens with `vh-100` and `min-vh-100` placeholders inside the shell's `.viewport` frame (`height: 24rem; overflow: clip; contain: layout paint`). The Veneer portfolio regeneration (`CAPTURE=1`, the `journey:light-1280` project) refuses every page-wide frame with `Capture frame at … never settled after 4 restagings: 309361 over a 281310 pane` (`.orkestrel/veneer/units/regen-upl.log.txt`), because `measureContent` takes every element's `getBoundingClientRect().bottom` and the clipped placeholders' rectangles grow with the pane. The TOGGLES regeneration on the tip before that landing settled (`regen-tg.log.txt`).

**Law.** `AGENTS.md`; `.claude/rules/typescript.md`, `tests.md`, `documentation.md`, `writing.md`, `names.md`. Skill: none. Guide: `guides/test.md` (§ Capture, the Surface table, the pattern "Measure a document's content edge").

**Standing conditions.** The browser tests run in Chromium through Vitest's browser mode; the host has Chromium and npm 11 on `PATH` through the scratchpad's `npm11`. The Veneer chain (`verify-upl.sh`) runs on the same container while this unit's gates run, so a timing failure is re-run alone before it is believed.

## Unknowns

None.

## The edits

- **E1.** `clipsOverflow(element)` in `src/browser/helpers.ts`, exported, before `measureContent`: `true` when the computed `overflow-y` is other than `visible` or the computed `contain` carries `paint`, `content`, or `strict`, with TSDoc naming the vertical axis and the scroll, clip, and containment cases.
- **E2.** `measureContent` walks each element's ancestors up to the body and caps the element's contribution at the padding edge (the border box bottom less the bottom border width) of every ancestor `clipsOverflow` reports; the TSDoc remarks state the rule.
- **E3.** `tests/src/browser/helpers.test.ts`: a `clipsOverflow` describe over the overflow values, the per-axis clip, and the containment values; two `measureContent` cases, a clipped viewport-height child under a short and a tall pane reading the frame's padding edge each time, and a paint-contained frame stacked over a scroll container reading their summed heights.
- **E4.** `guides/test.md`: the Surface row for `clipsOverflow` before `measureContent`, the § Capture paragraph's clipping sentence, and the pattern's closing sentence.

## Scope

Owned: `src/browser/helpers.ts`, `tests/src/browser/helpers.test.ts`, `guides/test.md`. Off-limits: everything else, `package.json` and the lockfile included (the version bump is the release's, not this unit's).

## Execution

The Orchestrator performs the edits directly; no subagent writes.

## Output

The diff and the gate log `t4-gates.log.txt`, retained beside this brief.

## Deviation contract

`.agents/orchestration.md` § Deviation protocol.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, and `npm run check` exit 0.
2. The scoped browser run over `helpers.test.ts` for `clipsOverflow` and `measureContent` exits 0, and the guides project exits 0.
3. The full `npm test` exits 0 before the release (the release's own gate).
4. With the built package packed and installed into the Veneer checkout as a head start, the Veneer regeneration's `journey:light-1280` project exits 0 on `ac96f81` (the proof the diagnosis holds), the registry copy restored before any gate that proves the published artifact.

## Review evidence

`git -C /home/user/test diff` and `git -C /home/user/test status --porcelain`, captured as `t4.diff` and `t4-status.txt`, and `t4-gates.log.txt`.
