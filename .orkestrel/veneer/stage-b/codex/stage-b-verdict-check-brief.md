# Unit stage-b-verdict-check — objective check of the stage B design verdict

## Role and lane

`analyst` (GPT-6 Astra through `codex exec`, reasoning effort high), objective lane. Read-only over the repository: edit no file under `src`, `app`, `tests`, `guides`, `configs`, or the root, other than a browser probe you delete before returning (`tests/src/browser/check.probe.test.ts`, run with `npx vitest run --config vite.config.ts --project src:browser tests/src/browser/check.probe.test.ts`), with `git status --porcelain` confirmed empty. Spawn nothing; perform the assignment yourself. Checkout `C:\Users\mikes\WebstormProjects\veneer`, `main` at `419245d` (stage A finished: `createVeneer`, explicit plugin lists, tip boot opt-in).

## Subject

`tmp/units/stage-b-wide-agent-6.md`, the stage B design verdict a panel of Claude Opus planners, a judge, a completeness critic, and a revision produced (design only; nothing is implemented). Its inputs are named in `tmp/units/stage-b-wide-design-brief.md`; the measurements it rests on are `tmp/codex/stage-b-measurements.md` (with its JSON) and `tmp/codex/browser-stage-b-design-verdict.md` § D3, both written by your engine.

## Check

1. Every claim of W1 and W2 that cites a measurement: does the measurement say it? Every claim about the code: does it hold at `419245d` (the verdict cites `9885975` in places; stage A's landing renamed `Engine` to `Veneer`)?
2. Every added or gated surface (Modal `dialog`, `Lock` `gutter`, Collapse `intrinsic`, `topmost` on the floats): is the mechanics section implementable against the tip without breaking a stage A departure row or proof, and does each gate name a reading that can fail? Where a reading the verdict relies on is missing or contradicted, run the probe and report its control and output.
3. Every refusal and deferral: is the stated evidence the evidence, and is any refused surface one the measurements show reconcilable for an opted-in page?
4. The opt-in rule and W3's inventory: is every public type, option, factory change, and error code consistent with the law (`AGENTS.md`; `C:\Users\mikes\WebstormProjects\scaffold\.claude\rules\names.md`, `typescript.md`, `architecture.md`, `patterns.md`) and with the blank-slate rulings (no default plugins; every default a separate convenience)?
5. W5's units: does each unit's file ownership hold against the tip, and does each gate probe have a control?

## Output

Write the result to `tmp/codex/stage-b-verdict-check.md` and return it as your final message: per section, the claims confirmed, the claims false at the tip or against a measurement (with the evidence and the correction), any probe you ran with its control and output, and a closing list of corrections the verdict must take before it is recorded. No process diary.
