# Unit voice-tool-fixup — restore the verb fit the voice rewrite lost

## Role and engine

`builder` on Claude Sonnet, a native subagent. You perform the assignment directly and spawn
nothing.

## Objective

Each first sentence in `@orkestrel/tool` that the subjective lane ruled BROKEN reads the ruled
text, and nothing else in the tree changes.

## Context

The voice unit (`voice-tool-brief.md`) left an uncommitted comment-only sweep in
`/home/user/fleet/tool`; the subjective lane (`voice-tool-audit-subjective-brief.md`) confirmed
every other hunk and broke on the sentences listed under Edits. Rulings by the Orchestrator, one
per line; each names the file, the line, the text now there (a prefix where the sentence
continues), and the text that must replace it. Keep the rest of each sentence and block
byte-identical, and rewrap a line that crosses `printWidth: 100` the way the file already wraps.

## Edits

- `src/core/tools/ToolManager.ts:12` — `Registers tools in insertion order with per-call error isolation.` → `Represents an insertion-ordered tool registry with per-call error isolation.`
- `src/core/types.ts:84` — `Advertises a concise description in place of the full description.` → `Holds a concise description to advertise in place of the full description.`
- `src/core/types.ts:110` — the same sentence, the same replacement.

**Law.** `.claude/rules/typescript.md` § Comments and API documentation — the vendored copy at
`node_modules/@orkestrel/scaffold/dist/host/claude/rules/typescript.md` where the checkout has
no `.claude/rules/`.

**Host.** Linux, bash. Repository `/home/user/fleet/tool`, uncommitted voice sweep in place,
`node_modules` installed. Do not run `npm install`.

## Scope

**Owned.** The listed files, at the listed sentences. **Off-limits.** Every other line and file.

**Tools and limits.** Read, Grep, Edit, Bash. No commit, stage, push, install, or discarding `git`
command.

## Execution

Apply the edits, then run `npm run format:check && npm run lint:check && npm run check` (the
Orchestrator's landing chain runs build and test). Then refresh the evidence:

```text
git diff > /home/user/scaffold/tmp/units/voice/voice-tool.diff
git status --short > /home/user/scaffold/tmp/units/voice/voice-tool.status
```

## Output

Return, as data: each line changed (old → new), each command with its exit code, and
`git diff --stat`.

## Deviation contract

Stop and report when a listed line does not carry the quoted text.

## Acceptance criteria

1. Each ruled sentence is present verbatim at its file (`grep -n -F`).
2. `git diff --stat` lists only the files the voice sweep already listed.
