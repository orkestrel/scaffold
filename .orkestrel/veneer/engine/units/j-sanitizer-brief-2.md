# Unit J-SANITIZER, round 2 — parse in the target's context

Successor to `j-sanitizer-brief.md` (in force for everything this file does not change). What changed and why: round 1 stopped on an E21 contradiction (`j-sanitizer-report.md` § Deviation): the `template` parse keeps table parts that `setHTML`, parsing in the target's context, drops, so under the allowlist the walk loses text the native route keeps. The Orchestrator amended E21 (`decisions.md`, the paragraph "E21 amended at J-SANITIZER round 1"): the walk parses in a context element of the target's namespace and local name, created in an inert document from `document.implementation.createHTMLDocument`, through that element's `innerHTML`.

## Role and engine

`opus` on Opus 5.5, the same writer, resumed with its context, in the same worktree `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/sanitizer`. Perform the assignment directly and spawn nothing.

## Obligations

- **R1 The parse.** Replace the `template` parse with the amended mechanism: an inert document (created once per write or held by the instance, your ruling, recorded), a context element with the target's namespace and local name in it, `innerHTML`, the walk over that element's children, and the move into the target. A `template` target keeps writing into its content. Red first: add matrix cases through both routes (`<tr><td>x</td></tr>`, `<td>y</td>`, and `<caption>c</caption>` into a `div`, under `{}` and under the allowlist), which fail on the round-1 walk and pass after.
- **R2 The declarative shadow root.** `<div><template shadowrootmode="open"><b>s</b></template></div>`: the platform attaches the shadow root, and the walk keeps a `template` whose content it walks. Pin it as a `walked` literal case, state it in the class TSDoc beside the Trusted Types limit, and confirm that inserting the walked result attaches no shadow root.
- **R3 The instrument.** Add a row, "the walk parses in a template context", that restores the round-1 parse and reddens R1's cases. Re-run the whole instrument once at the end.

## Scope, tools, output, deviation

As `j-sanitizer-brief.md`. Test in widening rings: the new cases, then `ConfigSanitizer`, `Tooltip`, `helpers`, `validators`, and `index`, then the whole browser suite once. Re-run `tmp/j-sanitizer/acceptance.sh` and the whole instrument at the end, never beside each other. Return the round-2 report in the brief's Output shape: the new cases with their red and green readings, the instrument's new row, any `types.ts` change, the updated `tests/setupBrowser.ts` patch in full as `tmp/j-sanitizer/setupBrowser.patch` (named in the report), the acceptance output, `git status --short`, and the deviation state.
