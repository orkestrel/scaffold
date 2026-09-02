# Unit voice-test-fixup — restore the sentences the voice rewrite bent

## Role and engine

`builder` on Claude Sonnet, a native subagent. You perform the assignment directly and spawn
nothing.

## Objective

Each first sentence in `@orkestrel/test` that the subjective lane ruled BROKEN reads the ruled
text, and nothing else in the tree changes.

## Context

The voice unit (`voice-test-brief.md`) left an uncommitted comment-only sweep in
`/home/user/fleet/test`; the subjective lane (`voice-test-audit-subjective-brief.md`)
confirmed every other hunk and broke on the sentences listed under Edits. Rulings by the
Orchestrator, one per line; each names the file, the line, the text now there (a prefix where the
sentence continues), and the text that must replace it. Keep the rest of each block
byte-identical, and rewrap a line that crosses `printWidth: 100` the way the file already wraps
(a single-line `/** … */` that grows past the width becomes a block comment).

## Edits

- `src/core/types.ts:82` — `Holds the instrumented signal.` → `Holds the signal to hand to the code under test.`
- `src/core/types.ts:105` — `Lists the ids returned by `create`, in order.` → `Records the ids returned by `create`, in order.`
- `src/core/types.ts:107` — `Lists the ids passed to `destroy`, in order.` → `Records the ids passed to `destroy`, in order.`
- `src/browser/types.ts:84` — `Expands the registry across every variant: the filenames a complete portfolio holds.` → `Lists the filenames a complete portfolio holds: the registry expanded across every variant.`
- `src/server/types.ts:92` — `Names the identifier of the device holding the directory.` → `Holds the identifier of the device holding the directory.`
- `src/server/types.ts:100` — `Configures the allocation of a scratch directory.` → `Configures a scratch directory allocation.`
- `src/server/types.ts:115` — prefix `Lists the files to write on allocation, keyed by path below the scratch directory.` → `Holds the files to write on allocation, keyed by path below the scratch directory.` (rest of the block unchanged)
- `src/server/types.ts:128` — `Names the ephemeral port the host assigned.` → `Holds the ephemeral port the host assigned.`
- `src/server/types.ts:165` — `Configures the reading of a source inventory.` → `Configures a source inventory read.`
- `src/server/types.ts:194` — `Reports what one server did with a client upgrade request.` → `Represents what one server did with a client upgrade request.`
- `src/browser/constants.ts:31` — `Names the page a browser paints an unstyled document onto.` → `Names the color a browser paints an unstyled document with.` (the `@remarks` beneath stay untouched)

**Law.** `.claude/rules/typescript.md` § Comments and API documentation — the vendored copy at
`node_modules/@orkestrel/scaffold/dist/host/claude/rules/typescript.md` where the checkout has
no `.claude/rules/`.

**Host.** Linux, bash. Repository `/home/user/fleet/test`, uncommitted voice sweep in place,
`node_modules` installed. Do not run `npm install`.

## Scope

**Owned.** The listed files, at the listed sentences. **Off-limits.** Every other line and file.

**Tools and limits.** Read, Grep, Edit, Bash. No commit, stage, push, install, or discarding `git`
command.

## Execution

Apply the edits, then run `npm run format:check && npm run lint:check && npm run check` (the
Orchestrator's landing chain runs build and test). Then refresh the evidence:

```text
git diff > /home/user/scaffold/tmp/units/voice/voice-test.diff
git status --short > /home/user/scaffold/tmp/units/voice/voice-test.status
```

## Output

Return, as data: each line changed (old → new), each command with its exit code, and
`git diff --stat`.

## Deviation contract

Stop and report when a listed line does not carry the quoted text.

## Acceptance criteria

1. Each ruled sentence is present verbatim at its file (`grep -n -F`).
2. `git diff --stat` lists only the files the voice sweep already listed.
