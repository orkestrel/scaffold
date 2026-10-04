# Unit browse-11-2 — item 11 on the safety-floor ruling

## Role and engine

`astra` on GPT-6 Astra, reached as `codex exec` with reasoning effort high and `--sandbox danger-full-access`. Sole writer in the worktree `C:\Users\mikes\WebstormProjects\browser-wt-browse`, branch `ccr-d15a48b1-yyyll6` at `73c608f`. Make one commit; never push, publish, or install outside the worktree. Perform the assignment yourself and spawn nothing.

## Objective

Finish item 11 as `tmp/codex/browse-11-brief.md` assigns it, on the ruling that settles your first run's stop. Read your report `tmp/codex/browse-11-report.md` and restart from `tmp/codex/browse-11-stopped.patch` and `tmp/codex/browse-11-probe.test.ts`. The probe readings P1 to P3 and the bench B0 stand; do not rerun them except where a promoted test needs them.

## The ruling

Item 11 governs the capture, never the projection. The HTML and Markdown safety floors (`@orkestrel/html` `UNSAFE_ELEMENTS`, `guides/markdown.md:544`) stay as they are, and the capture keeps `select` and `option` markup as it renders. The two-way oracle `markdown.includes(X) === innerText.includes(X)` covers text outside the elements the installed `UNSAFE_ELEMENTS` list names. For text inside them, the tests assert that the captured HTML keeps the rendered element and its text, and that the Markdown omits it under the documented floor, with that list read from the installed package so a change to the floor reddens the test. State the floor in the item's guide edit where `read` describes what it returns. The record of this ruling is `C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\showcase\browse.md` § Item 11 probe readings and stop.

## Gates, output, deviation

As `tmp/codex/browse-11-brief.md` states, with the report at `tmp/codex/browse-11-2-report.md`, including B1 beside B0.
