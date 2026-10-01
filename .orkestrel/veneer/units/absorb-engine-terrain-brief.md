# Unit absorb-engine-terrain — the platform and Bootstrap terrain the old engine measured

Fill every section. Write `none` in an empty one.

## Role and engine

`grok` on Grok 4.7 (`grok-4.7-high`), reached as the Cursor `agent` CLI in print mode. Executor: BENCH_ENGINE. You perform the whole reading yourself and spawn nothing.

## Objective

Produce one Markdown document that extracts every measured platform capability, every Bootstrap 5.3.8 obligation per component, and every prior-art lesson the old engine campaign's terrain records carry, so that a new engine design can start from the measurements instead of repeating them.

## Context

- **Evidence.** The files are the terrain and research records of the old Veneer engine campaign under `.orkestrel/veneer/`. Each names the Chromium build it measured on (Chromium 141 on the Linux gate host, Chromium 153 on the Windows host) and cites a probe or a Bootstrap source file.
- **Background.** The successor campaign keeps Bootstrap 5.3.8's markup, class, `data-bs-*`, event, option, and method contracts and redesigns the engine from scratch on native browser APIs. It must not rediscover what was measured.
- **Law.** Read-only. Cite `file:line` for every fact. Quote no more than one sentence per citation. Extract; do not summarize whole files.
- **Host.** Windows, working directory `C:\Users\mikes\WebstormProjects\scaffold`. Your shell is restricted; read files with your file-reading tool and run no command.

## Unknowns

Where a record names a probe log that is not in scope, say `log not in scope` and cite the record's line.

## Scope

- **Read, whole.**
  - `.orkestrel/veneer/engine/units/j-engine-terrain-record.md`
  - `.orkestrel/veneer/engine/units/j-engine-terrain-distillate.md`
  - `.orkestrel/veneer/units/j-engine-research-report.md`
  - `.orkestrel/veneer/engine/units/j-native-probe-report-3.md`
  - `.orkestrel/veneer/engine/units/j-placement-141-diagnosis-verdict.md`
  - `.orkestrel/veneer/engine/units/j-placement-141-fix-ruling.md`
  - `.orkestrel/veneer/engine/units/j-tailwind-probe-report.md`
  - `.orkestrel/veneer/engine/units/j-tailwind-probe-verdict.md`
  - `.orkestrel/veneer/engine/units/j-collapse-size-probe-report-2.md`
- **Off-limits.** Every other file. Write nothing.

## Execution

Read every file in scope completely, then write the document.

## Output

Your final message is the document. Structure it exactly so:

```markdown
# Engine terrain distillate

## Platform capabilities

| Capability | Chromium build | Measured behaviour (one sentence) | Adopted, refused, or deferred by the old engine | Citation |
| --- | --- | --- | --- | --- |

One row per distinct capability: the `popover` attribute and its UA reset, `beforetoggle`, anchor positioning and `position-area`, `position-visibility`, `position-try-fallbacks`, `CloseWatcher`, invoker commands, `hidden="until-found"`, `calc-size()`, `interpolate-size`, `Element.getAnimations()`, `Element.setHTML` and the `Sanitizer` dictionary, `inert`, `<dialog>` and its scroll lock, `checkVisibility()`, `scrollend`, `ResizeObserver`, `IntersectionObserver`, `MutationObserver` reinsertion within a task, event `target` after dispatch on a detached host, `structuredClone`, and any other the records measure.

## Bootstrap obligations per component

For each of Collapse, Dropdown, Tab, ScrollSpy, Modal, Offcanvas, Tooltip, Popover, Alert, Toast, Carousel, Button, Backdrop, FocusTrap, ScrollBarHelper, Swipe, Sanitizer, TemplateFactory: one bullet list of the obligations the research report records (events, options, data attributes, methods, timing), each with its citation.

## Prior art lessons

One bullet per lesson the Elements and Mailbox reading recorded (mechanisms adopted, refused, or measured), with citation.

## Chromium 141 versus 153 differences

One bullet per behaviour that differed between the two builds, with both citations.

## Unknowns

What the records assert without evidence in scope.
```

No process diary, no preamble, no closing remarks.

## Deviation contract

If a file cannot be read, stop and report the path and the error. Settle every classification yourself and state the reason in the row.

## Acceptance criteria

1. Every capability the records name appears once in the Platform capabilities table.
2. Every row and bullet cites a `file:line` in a file in scope.
3. Every component in the list under Bootstrap obligations has at least one bullet or the line `none recorded`.

**Observations, not criteria.** none

## Review evidence

The document itself; the Orchestrator runs `node .agents/skills/orkestrel-dispatch/scripts/cite.ts` over it and checks each citation.
