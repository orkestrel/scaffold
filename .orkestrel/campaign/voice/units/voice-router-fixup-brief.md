# Unit voice-router-fixup — restore the sentence the voice rewrite bent

## Role and engine

`builder` on Claude Sonnet, a native subagent. You perform the assignment directly and spawn
nothing.

## Objective

Each first sentence in `@orkestrel/router` that the subjective lane ruled BROKEN reads the ruled
text, and nothing else in the tree changes.

## Context

The voice unit (`voice-router-brief.md`) left an uncommitted comment-only sweep in
`/home/user/fleet/router`; the subjective lane (`voice-router-audit-subjective-brief.md`)
confirmed every other hunk and broke on the sentences listed under Edits. Rulings by the
Orchestrator, one per line; each names the file, the line, the text now there, and the text that
must replace it. Keep the rest of each block byte-identical, and rewrap a line that crosses
`printWidth: 100` the way the file already wraps.

## Edits

- `src/core/types.ts:416` — `Represents a route handler — receives the raw fetch `Request` plus its typed {@link RouteContext} and returns (or resolves) a fetch `Response`.` → `Receives the raw fetch `Request` plus its typed {@link RouteContext} and returns (or resolves) a fetch `Response`.` (drop the head clause that spells the identifier; the sentence may now fit one line — rewrap accordingly).

**Law.** `.claude/rules/typescript.md` § Comments and API documentation — the vendored copy at
`node_modules/@orkestrel/scaffold/dist/host/claude/rules/typescript.md` where the checkout has
no `.claude/rules/`.

**Host.** Linux, bash. Repository `/home/user/fleet/router`, uncommitted voice sweep in place,
`node_modules` installed. Do not run `npm install`.

## Scope

**Owned.** The listed files, at the listed sentences. **Off-limits.** Every other line and file.

**Tools and limits.** Read, Grep, Edit, Bash. No commit, stage, push, install, or discarding `git`
command.

## Execution

Apply the edits, then run `npm run format:check && npm run lint:check && npm run check` (the
Orchestrator's landing chain runs build and test). Then refresh the evidence:

```text
git diff > /home/user/scaffold/tmp/units/voice/voice-router.diff
git status --short > /home/user/scaffold/tmp/units/voice/voice-router.status
```

## Output

Return, as data: each line changed (old → new), each command with its exit code, and
`git diff --stat`.

## Deviation contract

Stop and report when a listed line does not carry the quoted text.

## Acceptance criteria

1. Each ruled sentence is present verbatim at its file (`grep -n -F`).
2. `git diff --stat` lists only the files the voice sweep already listed.
