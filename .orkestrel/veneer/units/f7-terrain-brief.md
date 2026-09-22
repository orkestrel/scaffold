# Unit F7-TERRAIN — Absorb the capture surface for F7 CAPTURE

## Role and engine

`grok` on Cursor Grok 4.7 (`grok-4.7-high`), reached through the Cursor CLI in `--mode=ask`
(read-only). You are the bench engine reading this brief inside your own CLI: perform the assignment
directly and spawn nothing. Your shell is allowlisted to `ls`; every command result you need is
supplied in this brief, so run nothing else and report nothing as blocked.

## Question

How does Veneer's capture portfolio work today — which frames the journey places, under what names
and variants, through which installed exports, with what pixel guard, sampler, and accessibility
artifacts, over which specimens and keys — and what did the retained portfolio verdicts and the
design round find open about it, so that the F7 CAPTURE unit can be briefed from evidence?

## Standing conditions

Another unit (F4 HOST-OBSERVATIONS) is writing the Veneer checkout while you read. Its uncommitted
edits touch `src/browser/Button.ts`, `tests/setup.ts`, `tests/setupBrowser.ts`,
`tests/setupBrowser.test.ts`, `tests/src/browser/Button.test.ts`, `tests/src/browser/helpers.test.ts`,
`tests/setupConformance.ts`, `tests/setupConformance.test.ts`, `tests/fixtures/oracle/button.json`,
`README.md`, `guides/veneer.md` (one paragraph after the `## Surface` table),
`tests/src/styles/tokens.test.ts`, and a rename of the fixture registry `specimens`/`SpecimenManager`
to `scene`/`SceneManager` across `tests/src/styles/**`. Read those files as they are, cite by symbol
or case title wherever a line could move, and record nothing about them as a deviation. The tracked
tree was clean at commit `751c3ed` when you were launched.

## Scope

Read-only. Under `/home/user/veneer`: `tests/app/browser/integration.test.ts` (whole),
`tests/setup.ts` (whole), `tests/setupBrowser.ts` (`measureFrameVariation`, `visitBreakpoint`,
`mountShowcase`, `collectPainted`, `applyTheme`, and the module's imports), `configs/app/vite.journey.config.ts`,
`vite.config.ts` (the `journey` project and the `appBrowser` factory only), `tests/app/browser/sections/*.test.ts`
(each far enough to state what it proves), `app/browser/constants.ts` (every specimen table: its
name, its row fields, and its row names), `app/browser/types.ts`, `app/browser/Showcase.ts`,
`app/browser/main.ts`, `app/browser/index.html`, `app/browser/styles/**`, `tmp/capture/light-1280.txt`,
`tmp/capture/dark-1280.txt`, `tmp/capture/light-390.txt`, `tmp/capture/dark-390.txt` (whole; they are
the capture manifests the journey writes), `guides/veneer.md` § Showcase and § Tests, and
`node_modules/@orkestrel/test/dist/src/browser/index.d.ts` (only the declarations of
`createPortfolio`, `expandCaptures`, `captureFrame`, `stagePane`, `releasePane`, `readPixels`,
`readFrame`, `readPage`, `readPerception`, `describeTree`, `describeFocus`, `CAPTURE_PANE`,
`CAPTURE_STAGINGS`, `stageMedia`, `releaseMedia`, and the `PortfolioInterface`, `PortfolioOptions`,
and `MediaOptions` types). Under `/home/user/scaffold`:
`.agents/skills/orkestrel-polish-surface/SKILL.md`,
`.agents/skills/orkestrel-polish-surface/references/capture-harness.md`,
`.orkestrel/veneer/units/cl13-portfolio-observations.md`,
`.orkestrel/veneer/cl13-verdict.md`, `.orkestrel/veneer/u7f-verdict.md`,
`.orkestrel/veneer/realign-design-verdict.md` (the rulings that name captures, frames, the polish
skill, or F7, and the F7 row of its ledger), `.orkestrel/veneer/units/realign-design-planner-report.md`
(the R6 unit and every row naming captures or frames), `.orkestrel/veneer/units/realign-design-analyst-report.md`
(the CAPTURE unit and every row naming captures or frames), and `/home/user/veneer/ROADMAP.md`
§ Carriers (the rows naming F7 CAPTURE).

Do not read `node_modules` beyond the one declaration file named, `dist`, `package-lock.json`,
or `.git`. Do not edit, create, or delete any file. Do not open image files.

Facts supplied so you need not run them: `tmp/capture/` in the Veneer checkout holds exactly those
four manifests and no image; the journey project is `configs/app/vite.journey.config.ts`, run by
`npm run test:journey`, which passed on this host on 2026-09-22 with 88 passed and 4 skipped across
4 files; Chromium on this host is `141.0.7390.37`, and the retained frames the verdicts ruled on were
shot on Chromium `153.0.8010.12` on Windows on 2026-09-20.

## Output

Return evidence only: no decisions, no recommendations, no design proposals. Cite every fact as
`file:line` (path relative to `/home/user/veneer/` or `/home/user/scaffold/`), naming the symbol,
case title, or heading beside the line. Quote at most two lines per citation. Never paste a file
whole. Keep the whole answer under 600 lines. Use exactly these headings:

### A. The portfolio harness
The `createPortfolio` call (its options and where they come from), every `place` call with its key
and target in journey order, the `expandCaptures` call and what it enumerates, the variants and how
a variant reaches the run, where frames and manifests land and under which names (the stem
grammar as written), the capture flag or environment variable that gates capture, and the four
manifests' contents.

### B. The pixel guard and the sampler
`measureFrameVariation` and every call of it (case title, threshold, the frame it reads, whether it
runs only under the capture flag); any sampler that reads a pixel or an origin pixel (`readPixels`,
`readFrame`, or a local reader): its target and the pixel it reads; the retained findings about the
guard and the sampler.

### C. Accessibility and journal artifacts
Every artifact line the journey writes beside a frame (`ARTIFACT`, `JOURNAL`, perception, tree, and
focus descriptions): what it records, in what shape, and whether the light and dark variants write
comparable shapes; the retained finding about comparability.

### D. Coverage
Which specimens and cascade keys are captured, in which states and variants, per section; the
retained findings about the one-sided palette gap, the link key's single-anchor frame, the link
crop, the differing context, the caption opt-out specimen, and the helper key with no subject
region; the specimen tables in `app/browser/constants.ts` that name what the showcase renders.

### E. The verdicts and the design rulings
Every finding in `cl13-verdict.md` and `u7f-verdict.md` with its disposition, and every ruling,
unit description, or carrier row in the design verdict, the two lane reports, and the roadmap that
names F7 CAPTURE, frames, stems, the polish skill, or the pixel guard.

### F. The installed capture surface
Each named Test declaration with its signature and one sentence from its doc comment, and what
`capture-harness.md` and the polish skill fix about the frame contract, the verdict shape, and the
harness.

### G. Unknowns
Every input in § Scope you did not reach or could not read, and every fact you could not settle.

### H. Journal
Your session id and the journal path `/home/user/scaffold/tmp/cursor/f7-terrain.jsonl`.
