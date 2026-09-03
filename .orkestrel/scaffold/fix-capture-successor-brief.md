# Unit FX2c — stage the shot at the body's real height, and re-read after the pane grows

## Role and engine

`implementer` on Opus 5, native Claude Code subagent, standing in for the Sol implementer (Codex
bench dark). Sole writer in `C:\Users\mikes\WebstormProjects\test`. Perform the assignment
directly and spawn nothing.

## Objective

Make `captureFrame` cover the whole document at any variant height, for a body whose box is
fractional and for a document that reflows when the pane grows.

## Context

Law: `AGENTS.md`, `.claude/rules/typescript.md`, `.claude/rules/tests.md`,
`.claude/rules/documentation.md`. TTTDD with the failing proof first. Host: Windows 11, Git Bash;
Playwright Chromium installed; browser tests through
`npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser <file>`.
Baseline `ce89721` plus the 0.0.12 bump at `87d8a01`; tree clean.

**Finding, measured in terrain on the rebuilt layer**
(`C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\scaffold\fix-terrain-successor-report.md`
§ Deviation B). At `390x844`:

```text
empty      scroll=1191  bodyBox=1191.46875
populated  scroll=1675  bodyBox=1674.53125
staged     scroll=1694  bodyBox=1694.40625  pane=1675   after stagePane(390, 1675)
armed      scroll=1718  bodyBox=1717.828125
```

Two faults in the one restaging line of `captureFrame` (`src/browser/helpers.ts`):

- **The floor.** `document.documentElement.scrollHeight` is an integer and the provider clips to
  the body's fractional box, so a `1191.46875` body over a `1191` pane leaves one runner row at
  the bottom of the frame.
- **The reflow.** Staging at `1675` reflows the document to `1694.40625`, because a rule bound to
  the viewport height lays out against the taller pane; `captureFrame` never re-reads, so the
  shot is a 1694-row body over a 1675-row pane and 29 runner rows follow.

The frames read back with `rgb(255, 255, 255)` on those rows against a dark surface, which is
the runner's own page.

**The suite's reading of the defect** is `terrain/tests/app/browser/integration.test.ts` at the
capture proof (`frame.floor` equals the surface background); it is red on the current build and
stays red until this lands. The unit that found it could not fix it from its own files.

**A second finding from the same report** (§ Deviation A): the hand-back in `releasePane` is right
for a capture and wrong for a helper that used stage-then-release as a resize. The layer publishes
no verb that puts the tester at a viewport and leaves it there; the suite now calls
`page.viewport` itself. Record in the `stagePane` and `releasePane` TSDoc and in the guide that a
suite resizing for a journey calls `page.viewport` directly, and that `stagePane` is a capture's
staging alone. Add no verb.

## The change

1. In `captureFrame`, after the first staging, measure the height the shot needs as
   `Math.ceil(document.body.getBoundingClientRect().height)` and the document's scroll height,
   take the larger, and where it exceeds the pane, restage at it; then re-measure and restage
   again while the height still grows, bounded (three restagings is a reasonable bound), and
   refuse the shot with a named voice when it never settles. Record the voice in the guide's
   refusal table.
2. Proofs, red before and green after, in the browser suite:
   - a fixture whose body height is fractional (a line-height or a padding in a fraction of a
     pixel) taller than the pane: the frame's floor is the fixture's background, not the runner's;
   - a fixture carrying a `min-height: 100vh` element plus content beyond the pane: the frame's
     floor is the fixture's background after the reflow;
   - the never-settles refusal, with a fixture whose height grows with every restaging (a rule
     that adds height as the viewport grows), reaching the named voice;
   - the existing coverage cases stay green.
3. TSDoc and guide: the coverage rule now states the measurement (body box, ceiling, re-read
   until stable), the bound, and the refusal; the pane paragraph states the journey-resize rule
   from the second finding.

## Scope

**Owned.** `src/browser/helpers.ts`, `src/browser/constants.ts` only for a named bound or voice,
`tests/src/browser/helpers.test.ts`, `guides/test.md`, `tests/guides.test.ts` where a fence is
transcribed. **Off-limits.** Every other file; `package.json` (already at 0.0.12); commits; no
`git checkout`/`restore`/`stash`/`reset`/`clean`.

## Output

Write `tmp/units/fix-capture-successor-report.md` and return it: the measurements, the change,
the red-then-green commands and counts per case, `git diff --stat`, `git status --porcelain`,
scoped gates (`format:check`, `lint:check`, `check`, `test:src:browser`, `test:guides`,
`test:policy`), claims not closed.

## Deviation contract

Stop and report when the provider's clip cannot be matched from inside the layer, or when a
proof cannot be made to fail before the change. Decide and record fixture shapes and names.

## Acceptance criteria

1. The fractional-height and the reflow cases are red before and green after.
2. The never-settles refusal is named, tested, and in the guide.
3. Scoped gates green; the existing capture cases still pass.
