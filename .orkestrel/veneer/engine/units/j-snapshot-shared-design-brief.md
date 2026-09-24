# J-SNAPSHOT-SHARED design round — one recording of a target across the engines that write it

One brief for both lanes of the adversarial pass, blind to each other: `planner` on Opus 5.5 (the subjective lane) and `analyst` on GPT-6 Astra (the objective lane). Perform the assignment directly, spawn nothing, and edit nothing. This round proposes; the Orchestrator rules.

## Read first

`C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md` (Design laws: derive state, one concept one term, minimal public API, no superfluous wrappers); `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/architecture.md`, `patterns.md`, and `tests.md`; `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md` § E13 and its amendments (the J-SNAPSHOT amendment rules the presence record and names this unit's bound as different).

## The terrain (Veneer commit `e0dee7e`, the J-INTEGRATION landing)

Read each file with `git -C C:/Users/mikes/WebstormProjects/veneer show e0dee7e:<path>`; if the commit is not yet on the main checkout's history, read the same paths in `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/integration`, whose `HEAD` is `e0dee7e`.

- `src/browser/HostSnapshot.ts` and `tests/src/browser/HostSnapshot.test.ts`: each engine keeps one `HostSnapshot`; a snapshot records a target's value at its own first write and destruction writes it back. Snapshots that save a class token or an inline property on one element already share one record of whether the element carried the `class` or `style` attribute (the presence record, E13's J-SNAPSHOT amendment): read at the first save while no snapshot holds it, judged only by the last holder.
- The bound this round rules (`guides/veneer.md`, `#### Tab`, the paragraph ending "because no two tabs share the recording of one target"): each tab records a value when it first writes it, so a value another tab of the same list wrote reads to it as the markup's own, and a tab that saves the list only at its own later swap leaves the list with the values another tab wrote after destruction.
- The second bound (`guides/veneer.md`, `#### Carousel`, the sentences beginning "The `pointer` token is a second snapshot over the host"): a carousel constructed while a destroyed carousel's items are restored has its `pointer` token written back over by the first swipe's restoration, so the live carousel is left without it.
- Every other engine that keeps a `HostSnapshot` (`Collapse`, `Dropdown`, `Modal`, `Offcanvas`, `Toast`, `Tooltip`, `Popover`, `ScrollSpy`, `Alert`, `Button`, `Swipe`, `Placement`) is context: say whether each can meet the same bound (two live snapshots over one target), as an observation.

## The questions

1. State the bound as a defect or a limit: for each of the two bounds, the smallest real input (engines, markup, call order) and what the page reads after the last destruction against what the markup carried.
2. Rule the mechanism. Options with their cost: (A) one record per saved target across every snapshot, like the presence record: the value is read at the first save while no snapshot holds the target, each later saver joins it, and only the last holder writes the value back; (B) the engines that share targets (the tabs of one list, a carousel and its swipe) share one snapshot; (C) the bound stays and each guide paragraph states it with no closer; (D) another shape you name. For your recommendation give what a non-last holder's restoration writes, how takeover and first-save precedence (E13) and the write-back re-entry the J-SNAPSHOT amendment closed still hold, the public-surface change (none, or the exact `types.ts` members), and every engine whose behaviour changes.
3. The proofs: which cases pin the ruling, red first on `e0dee7e`, and the mutation each distinguishes.
4. The unit: owned files, its order against J-GUARDS (which owns every engine file's guard import and `resolveOptions` call, `validators.ts`, `helpers.ts`, and `types.ts` guard declarations until it lands) and J-SAMEWAY (`Modal.ts`, `Offcanvas.ts`), and acceptance criteria.

## Output

A numbered proposal answering each question, with `file:line` evidence at `e0dee7e` for every claim about the code, each claim marked read or inferred. End with one line: `PROPOSAL: <one-sentence recommendation>`.
