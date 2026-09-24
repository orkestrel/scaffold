# Unit UNHOVER-SWEEP — terrain: frames placed after an unhover with no release between

## Role and engine

`grok` bridge driving Cursor Grok, read-only. The driver carries this brief across unaltered and returns the journal
path, the session id, and Grok's answer. Grok performs the reading itself and spawns nothing.

## Objective

List every place in Veneer's journey and browser setup where a capture frame is placed after an `unhover` call with no
`releasePointer` call between them, so the Veneer re-pin that follows the T5 park ruling
(`/home/user/scaffold/.orkestrel/veneer/units/t5-park-ruling-verdict.md`, P6) can carry each one.

## Context

**Evidence.** `/home/user/veneer` is at `a744c68`. The installed `unhover` method on a Vitest locator moves the pointer
onto the tester's `document.body` (`node_modules/@vitest/browser/context.d.ts`, around lines 316 to 324). The
`releasePointer` function comes from `@orkestrel/test`. A frame is placed through the frame manager's `place`, `page`,
or `focus` method (`tests/setupBrowser.ts`, the `FrameManager` class) or through `FRAMES` in
`tests/app/browser/integration.test.ts`. The frame manager's `focus` method calls `releasePointer` itself.

**Law.** Read-only. `/home/user/scaffold/AGENTS.md` § Writing governs the answer's prose.

**Host.** Linux. Read files and run `grep` in `/home/user/veneer` only. Write nothing.

## Unknowns

None.

## Scope

Read `tests/app/browser/integration.test.ts`, `tests/setupBrowser.ts`, and any other file under `tests/` that calls
`unhover`. Write nothing.

## Execution

For every `unhover` call:

1. Name its file, line (approximate), and the enclosing test case's title.
2. Name the next frame placement after it in the same case, if any, with its line and method.
3. State whether a `releasePointer` call (directly, or through the `focus` method) runs between the two.
4. Mark the call **exposed** when a placement follows with no release between, and **clear** otherwise.

## Output

One Markdown table: file, line, case title, next placement (line and method, or none), release between (yes or no),
status. Then a short list of the exposed calls. No process diary.

## Deviation contract

Stop and report if no file under `tests/` calls `unhover`.

## Acceptance criteria

Every `unhover` call under `tests/` appears once in the table with a status and line citations.

## Review evidence

The Orchestrator samples the cited lines before briefing the re-pin.
