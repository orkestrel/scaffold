# Unit voice-ndjson-fixup — restore the meaning the voice rewrite moved

## Role and engine

`builder` on Claude Sonnet, a native subagent. You perform the assignment directly and spawn
nothing.

## Objective

The one first sentence in `@orkestrel/ndjson` that the subjective lane ruled BROKEN reads the ruled
text, and nothing else in the tree changes.

## Context

The voice unit (`voice-ndjson-brief.md`) left an uncommitted comment-only sweep in
`/home/user/fleet/ndjson`; the subjective lane's audit (`voice-ndjson-audit-subjective-brief.md`)
confirmed every other hunk and broke claim 1 on one sentence. Ruling by the Orchestrator:

- `src/core/NDJSONParser.ts` at line 5: the first sentence now reads
  > Decodes an NDJSON (newline-delimited JSON) stream statefully — feed it string chunks, get back the complete JSON objects decoded so far.
  It must read
  > Decodes an NDJSON (newline-delimited JSON) stream statefully — feed the handle string chunks, get back the complete JSON objects decoded so far.

Everything else in the block stays byte-identical. Do not run `git diff` against a discarding
command; the sweep in the tree is the accepted state and this edit lands on top of it.

**Law.** `.claude/rules/typescript.md` § Comments and API documentation — the vendored copy at
`node_modules/@orkestrel/scaffold/dist/host/claude/rules/typescript.md` where the checkout has
no `.claude/rules/`.

**Host.** Linux, bash. Repository `/home/user/fleet/ndjson`, uncommitted voice sweep in place,
`node_modules` installed. Do not run `npm install`.

## Scope

**Owned.** `src/core/NDJSONParser.ts`, that one sentence. **Off-limits.** Every other line and file.

**Tools and limits.** Read, Grep, Edit, Bash. No commit, stage, push, install, or discarding `git`
command.

## Execution

Edit the sentence, then run `npm run format:check && npm run lint:check && npm run check` (the
Orchestrator's landing chain runs build and test). Then refresh the evidence:

```text
git diff > /home/user/scaffold/tmp/units/voice/voice-ndjson.diff
git status --short > /home/user/scaffold/tmp/units/voice/voice-ndjson.status
```

## Output

Return, as data: the line changed (old → new), each command with its exit code, and
`git diff --stat`.

## Deviation contract

Stop and report when the line does not carry the quoted old text.

## Acceptance criteria

1. `grep -n -F 'Decodes an NDJSON (newline-delimited JSON) stream statefully — feed the handle string chunks, get back the complete JSON objects decoded so far.' src/core/NDJSONParser.ts` returns line 5 (or the line the wrap places it on).
2. `git diff --stat` lists only the files the voice sweep already listed.
