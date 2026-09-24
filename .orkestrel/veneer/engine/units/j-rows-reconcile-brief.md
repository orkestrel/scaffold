# J-ROWS reconciliation — which carried rows the landed source already closes

## Role and engine

`grok` on Cursor Grok (the bridge carries this brief to the Grok engine unaltered and returns its journal path and session id with the distillate). Read-only. The engine performs the assignment directly and spawns nothing.

## Objective

For every row of the table in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/plan.md` § Carried findings, rule whether Veneer `main` (`C:/Users/mikes/WebstormProjects/veneer`, commit `e3031a3`) already closes it, so the next implementation unit (J-INTEGRATION) owns only open work.

## Context

- Each row has four cells: the finding, its source, its carrier, and "Closes with" (the condition that closes it). A row whose carrier is J-POPOVER is in flight: rule it `in flight` without reading further.
- A record a row cites that is absent from `.orkestrel/veneer/engine/units/` was pruned; read it with `git -C C:/Users/mikes/WebstormProjects/scaffold show 9ebf73ff~1:.orkestrel/veneer/engine/units/<file>`, or `fd96a0b1~1:` or `dc681254~1:` for older units, only when the row's text alone does not name the site to check.
- Check the "Closes with" condition against the source on `main`: `src/browser/**`, `tests/src/browser/**`, `guides/veneer.md`, `tests/setupBrowser.ts`. Search for the named symbol or sentence; do not reason about whether it is likely fixed.

## Output

Return one table, one line per row in plan order: the row's first eight words; the ruling `closed`, `open`, `in flight`, or `unclear`; the evidence (`file:line` and a quoted fragment of at most 15 words, or the search pattern and paths that came back empty); and, for `open`, whether closing it is code (source or a test) or prose (a comment, TSDoc, or guide sentence). No process diary.

## Acceptance criteria

Every row appears once. Every `closed` and `open` ruling carries a `file:line` or a named empty search.
