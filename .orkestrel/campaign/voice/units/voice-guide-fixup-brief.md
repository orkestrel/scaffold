# Unit voice-guide-fixup — restore the sentences the voice rewrite bent

## Role and engine

`builder` on Claude Sonnet, a native subagent. You perform the assignment directly and spawn
nothing.

## Objective

Each first sentence in `@orkestrel/guide` that the subjective lane ruled BROKEN reads the ruled
text, and nothing else in the tree changes.

## Context

The voice unit (`voice-guide-brief.md`) left an uncommitted comment-only sweep in
`/home/user/fleet/guide`; the subjective lane (`voice-guide-audit-subjective-brief.md`)
confirmed every other hunk and broke on the sentences listed under Edits. Rulings by the
Orchestrator, one per line; each names the file, the line, the text now there (a prefix where the
sentence continues), and the text that must replace it. Keep the rest of each block
byte-identical, and rewrap a line that crosses `printWidth: 100` the way the file already wraps
(a single-line `/** … */` that grows past the width becomes a block comment).

## Edits

- `src/core/types.ts:22` — `Holds its identifier.` → `Holds the symbol's identifier.`
- `src/core/types.ts:24` — prefix `Holds its declaration kind` → `Holds the symbol's declaration kind` (rest unchanged)
- `src/core/types.ts:61` — `Names the directory (or directories) the guide documents.` → `Names the source directory (or directories) the guide documents.`
- `src/core/types.ts:63` — `Names the directory the guide's `## Tests` links resolve against.` → `Names the tests directory the guide's `## Tests` links resolve against.`
- `src/core/types.ts:74` — `Lists its documented Method-cell identifiers, in table order.` → `Lists the group's documented Method-cell identifiers, in table order.`
- `src/core/types.ts:85` — `Lists the imported identifiers, each alias resolved to the original exported name.` → `Lists the imported names, each alias resolved to the original exported name.`
- `src/core/types.ts:93` — `Holds the fence's verbatim body.` → `Holds the fence's verbatim code body.`
- `src/core/types.ts:299` and `:310` — the single-line comment `Holds the workspace's exact canonical-segment opaque inventory keys, root-relative path → text.` crosses the width: keep the words and wrap each into a block comment.
- `src/core/types.ts:333` — `Holds the joined, space-separated head.` → `Holds the joined, space-separated head text.`
- `src/core/types.ts:346` — prefix `Holds its raw lines,` → `Holds the declaration's raw body lines,` (rest unchanged)
- `src/core/shapers.ts:10`, `:28`, `:46` — prefix `Describes a {@link` → `Shapes a {@link` on each of the three lines (rest unchanged).
- `src/core/sources/Source.ts:19-22` — the first sentence `Reflects a module scope's intentional direct declarations, conventional barrel-reachable surface, and member methods over a consumer-supplied file inventory as a pure `SourceInterface`, using text-only line scanners rather than the TypeScript compiler API or the filesystem.` → `Reflects, as a pure `SourceInterface`, a module scope's intentional direct declarations, conventional barrel-reachable surface, and member methods over a consumer-supplied file inventory, using text-only line scanners rather than the TypeScript compiler API or the filesystem.` (rewrap; the sentence after it stays byte-identical).

**Law.** `.claude/rules/typescript.md` § Comments and API documentation — the vendored copy at
`node_modules/@orkestrel/scaffold/dist/host/claude/rules/typescript.md` where the checkout has
no `.claude/rules/`.

**Host.** Linux, bash. Repository `/home/user/fleet/guide`, uncommitted voice sweep in place,
`node_modules` installed. Do not run `npm install`.

## Scope

**Owned.** The listed files, at the listed sentences. **Off-limits.** Every other line and file.

**Tools and limits.** Read, Grep, Edit, Bash. No commit, stage, push, install, or discarding `git`
command.

## Execution

Apply the edits, then run `npm run format:check && npm run lint:check && npm run check` (the
Orchestrator's landing chain runs build and test). Then refresh the evidence:

```text
git diff > /home/user/scaffold/tmp/units/voice/voice-guide.diff
git status --short > /home/user/scaffold/tmp/units/voice/voice-guide.status
```

## Output

Return, as data: each line changed (old → new), each command with its exit code, and
`git diff --stat`.

## Deviation contract

Stop and report when a listed line does not carry the quoted text.

## Acceptance criteria

1. Each ruled sentence is present verbatim at its file (`grep -n -F`).
2. `git diff --stat` lists only the files the voice sweep already listed.
