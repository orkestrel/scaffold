# Unit browser-stage-b-design — objective lane of the design pass for stage B

## Role and lane

`analyst` (GPT-6 Astra through `codex exec`, reasoning effort high), holding the objective lane: correctness, constraints, measurements, and what each shape must not break. Claude Opus planners hold the subjective lane (shape, names, ergonomics) in clean contexts; no lane sees another's answer. Read-only over the repository: edit no file under `src`, `app`, `tests`, `guides`, `configs`, or the root, other than a probe you delete before returning, and spawn nothing. Perform the assignment yourself.

Your own engine wrote most of the code these questions touch. Judge it as an adversary would.

## The questions

Read `tmp/units/browser-stage-b-design-brief.md` from disk first and completely. It carries the subject, the user's rulings of 2026-10-03, the questions D1 to D5, the law, where a probe may run, and the output shape. Answer every question. For D3, re-run at the tip every stage B measurement a writer would rely on (the `dialog-modal`, `scroll-lock`, `collapse-intrinsic`, `dropdown-anchor-popover`, `tooltip-arrows`, `focus-inert`, and `top-layer` readings of `tmp/units/browser-feasibility-report.md`), each with its control, and against Bootstrap's own engine in the oracle frame where a departure row would depend on it. For D2, count every consumer site by file.

## Output

Write the answer to `tmp/codex/browser-stage-b-design-verdict.md` and return the same text as your final message, in the shape the design brief's § Output fixes. Cite every reading as `path:line` or as a measurement you ran with its command. No process diary.
