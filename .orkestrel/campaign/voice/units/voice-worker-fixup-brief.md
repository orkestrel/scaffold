# Unit voice-worker-fixup — restore the verb fit the voice rewrite lost

## Role and engine

`builder` on Claude Sonnet, a native subagent. You perform the assignment directly and spawn
nothing.

## Objective

Each first sentence in `@orkestrel/worker` that the subjective lane ruled BROKEN reads the ruled
text, and nothing else in the tree changes.

## Context

The voice unit (`voice-worker-brief.md`) left an uncommitted comment-only sweep in
`/home/user/fleet/worker`; the subjective lane (`voice-worker-audit-subjective-brief.md`) confirmed
every other hunk and broke on the sentences listed under Edits. Rulings by the Orchestrator, one
per line; each names the file, the line, the text now there (a prefix where the sentence
continues), and the text that must replace it. Keep the rest of each sentence and block
byte-identical, and rewrap a line that crosses `printWidth: 100` the way the file already wraps.

## Edits

- `src/core/Worker.ts:9` — prefix `Runs resource-backed jobs — a thin facade` → `Represents a resource-backed job worker — a thin facade` (rest of the sentence unchanged; this matches the `WorkerInterface` sentence at `src/core/types.ts:79`).
- `src/server/NodeWorker.ts:10` — `Backs {@link createNodeWorker} with an internal composition entity.` → `Represents the internal composition entity backing {@link createNodeWorker}.`
- `src/server/Thread.ts:5-6` — `Backs the readonly {@link NodeThread} observation contract with an internal mutable implementation.` → `Represents the internal mutable implementation of the readonly {@link NodeThread} observation contract.`
- `src/server/Dispatch.ts:10` — `Manages the internal lifecycle of one dispatched worker-thread job.` → `Represents the internal lifecycle entity for one dispatched worker-thread job.`
- `src/core/types.ts:95` — prefix `Loads outstanding entries from the store and re-enqueues them` → `Re-enqueues outstanding entries loaded from the store` (rest of the sentence unchanged).

**Law.** `.claude/rules/typescript.md` § Comments and API documentation — the vendored copy at
`node_modules/@orkestrel/scaffold/dist/host/claude/rules/typescript.md` where the checkout has
no `.claude/rules/`.

**Host.** Linux, bash. Repository `/home/user/fleet/worker`, uncommitted voice sweep in place,
`node_modules` installed. Do not run `npm install`.

## Scope

**Owned.** The listed files, at the listed sentences. **Off-limits.** Every other line and file.

**Tools and limits.** Read, Grep, Edit, Bash. No commit, stage, push, install, or discarding `git`
command.

## Execution

Apply the edits, then run `npm run format:check && npm run lint:check && npm run check` (the
Orchestrator's landing chain runs build and test). Then refresh the evidence:

```text
git diff > /home/user/scaffold/tmp/units/voice/voice-worker.diff
git status --short > /home/user/scaffold/tmp/units/voice/voice-worker.status
```

## Output

Return, as data: each line changed (old → new), each command with its exit code, and
`git diff --stat`.

## Deviation contract

Stop and report when a listed line does not carry the quoted text.

## Acceptance criteria

1. Each ruled sentence is present verbatim at its file (`grep -n -F`).
2. `git diff --stat` lists only the files the voice sweep already listed.
