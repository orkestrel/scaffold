# Unit J-RELEASE-SWEEP — a breadth probe of every release path in the engines

## Role and engine

Each lane is a read-only lens with a clean context. It holds the objective lens over one slice, named in its launch prompt:
- slice S1 runs as `analyst` on GPT-6 Astra, through `codex exec` in a read-only sandbox;
- every other slice runs as `reviewer` on Opus 5.5, as a native subagent.

No lane sees another lane's answer.

## Objective

Map, for your slice, every place where an engine gives back something it took, and rule whether each place obeys the two invariants in § The invariants. The map locates the source of a defect class that four audit rounds have found through a new door each time. It also bounds the repair that follows.

## Context

**Evidence.** Four rounds of J-SAMEWAY-ENGINES-B, and five of J-SAMEWAY-ENGINES-A before it, each found a release that broke one of the two invariants at a door the previous round had not probed. The repair units follow this sweep. Your map is their work list.

**The invariants.**
- **I1, the record.** A step that releases, returns, unlinks, or restores something acts on the value recorded when the engine took it. The record covers an id, an element, an attribute's prior presence or value, a token's prior membership, and a style's prior value. The step never acts on a fresh read of state that consumer code could have changed between the take and the release. A fresh read counts wherever consumer code runs between the take and the release: an event listener, a `MutationObserver`, a `ResizeObserver`, a `beforetoggle` or `toggle` listener, a focus or blur listener, or a getter.
- **I2, reach until released.** A field or local that holds a releasable resource stays reachable from `destroy()` until that resource's release has returned. The resource might be a placement, an isolation, a scroll lock, a backdrop, an observer, an `AbortController`, a host snapshot, a timer, or a linked id. The field is cleared after the release returns, and only if it still holds the same resource. Consumer code can run inside a release, for example an event the release dispatches. If that code calls the engine's `destroy()`, the `destroy()` must reach every holding and finish restoring the page before it returns.

**The bound against over-correction.**
- A release records and returns only writes the engine made. It records nothing for a write that changed nothing.
- No holding outlives `destroy()`.
- The sweep proposes no public API.
- A case reachable only through a foreign implementation of a published contract is an obligation to document, not a repair. Rule it that way.

**The consumer's interface.** An engine's `destroy()`, called at any point, including inside an event the engine dispatches, restores every write the engine made before it returns. A completed `hide` returns every write its `show` made.

**The slices.** Read each file whole. Also read the helpers it imports from `helpers.ts`, `HostSnapshot.ts`, and `Registry.ts` wherever they decide a release.

| Slice | Files | Root |
| --- | --- | --- |
| S1 | `src/browser/Dropdown.ts`, `src/browser/Placement.ts` | `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/engines-b` |
| S2 | `src/browser/Tooltip.ts`, `src/browser/Popover.ts` | `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/engines-b` |
| S3 | `src/browser/Modal.ts`, `src/browser/Offcanvas.ts`, `src/browser/Backdrop.ts`, `src/browser/Isolation.ts`, `src/browser/ScrollLock.ts` | `C:/Users/mikes/WebstormProjects/veneer` |
| S4 | `src/browser/Collapse.ts`, `src/browser/Tab.ts`, `src/browser/Carousel.ts`, `src/browser/Swipe.ts` | `C:/Users/mikes/WebstormProjects/veneer` |
| S5 | `src/browser/Toast.ts`, `src/browser/Alert.ts`, `src/browser/ScrollSpy.ts`, `src/browser/Button.ts`, `src/browser/ColorMode.ts` | `C:/Users/mikes/WebstormProjects/veneer` |
| S6 | `src/browser/HostSnapshot.ts`, `src/browser/Registry.ts`, `src/browser/Delegate.ts`, and the record and release helpers in `src/browser/helpers.ts` | `C:/Users/mikes/WebstormProjects/veneer` |

The engines-b root holds Veneer `3bb9afb`. The Veneer root holds `main` at `1290162`. The contracts are `src/browser/types.ts` in the same root. The guide is `guides/veneer.md`.

S6 is the upstream station. Rule on the record mechanism itself: does it make I1 and I2 the default an engine gets, or something each engine re-implements by hand? Name what a single shared mechanism would change.

**Law.**
- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`.
- `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/quality.md` § Falsification and § Rounds and verdicts.
- `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md` § E18, § E24 with every amendment, and § E25.
- Skill: none.

**Host.** Windows 11. The lanes are read-only.
- An Opus lens has Read, Grep, and Glob only. It reads by absolute path.
- The Astra lane can run read-only shell commands, such as `git show`, but it writes nothing and runs no test.

## Unknowns

- Whether a violation is reachable. Rule each one: reachable through shipped code, through a documented event or option, or only through a foreign implementation of a contract. Give the smallest input for each reachable one.

## Scope

**Owned.** None. Each lane reads its slice and returns its map as its final message.

**Off-limits.** Every file for writing.

## Execution

Perform the assignment directly and spawn nothing.

## Output

Your final message is the map, labelled as a source review, because no lane executes. It holds:

1. **A station table.** One row per release station in the slice. A station is each place the engine gives back something it took: a stopped show's return, a hide, a discard, a `destroy()`, a takeover, a replacement, a supersession, or an abort path. Each row gives:
   - the file and the symbol, with the line number as approximate;
   - the holding;
   - where the engine takes it;
   - where it gives it back;
   - the I1 ruling: `holds`, `violates`, or `n/a`;
   - the I2 ruling: `holds`, `violates`, or `n/a`;
   - for each violation, the smallest input that reaches it, and its reachability.
2. **The consumer code each station runs,** and which station's field is still set while that code runs.
3. **The source.** Say in two sentences or fewer why the class recurs in this slice. Name what one change at the source would close.
4. **Claims you could not break,** so the repair's audit knows what has been attacked.

Rule only what the files show. Cite `file:line` for every ruling.

## Deviation contract

Report and stop if a slice file does not resolve at its root. Settle for yourself which symbol a station belongs to, and in which order you list stations.

## Acceptance criteria

1. Every release station in the slice has a row.
2. Every `violates` ruling carries a smallest input and a reachability.
3. Every citation resolves in the file it names.

## Review evidence

The slice files at the named roots. The Orchestrator runs each reachable witness red-first in the repair units that follow.
