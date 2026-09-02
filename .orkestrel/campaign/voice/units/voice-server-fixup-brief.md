# Unit voice-server-fixup — give the summary-less method block its first sentence

## Role and engine

`builder` on Claude Sonnet, a native subagent. You perform the assignment directly and spawn
nothing.

## Objective

The `format` method of `Negotiator` in `@orkestrel/server` opens its doc block with a third-person
first sentence; nothing else in the tree changes.

## Context

The voice unit landed at `de721d9` with both lanes PASS. The acceptance scan then listed one
block with no first sentence: `src/server/Negotiator.ts:71-75`, which opens with `@remarks` and
no summary. The program unit set the precedent (a block with only `@remarks` gains its summary
sentence). Ruling by the Orchestrator: insert, as the block's first line before `@remarks`, the
sentence

> Dispatches the request to the handler its `Accept` header negotiates, answering 406 when none matches.

followed by a blank comment line (` *`), so the block reads summary, blank, `@remarks`, the
existing remark text byte-identical. Wrap the sentence at the file's width the way its
neighbours wrap.

**Law.** `.claude/rules/typescript.md` § Comments and API documentation — the vendored copy at
`node_modules/@orkestrel/scaffold/dist/host/claude/rules/typescript.md`.

**Host.** Linux, bash. Repository `/home/user/fleet/server` at commit `de721d9`, committed clean
at launch, `node_modules` installed. Do not run `npm install`.

## Scope

**Owned.** `src/server/Negotiator.ts`, that one block. **Off-limits.** Every other line and file.

**Tools and limits.** Read, Grep, Edit, Bash. No commit, stage, push, install, or discarding `git`
command.

## Execution

Apply the edit, run `npm run format:check && npm run lint:check && npm run check`, then:

```text
git diff > /home/user/scaffold/tmp/units/voice/voice-server-fixup.diff
git status --short > /home/user/scaffold/tmp/units/voice/voice-server-fixup.status
```

## Output

Return, as data: the block before and after, each command with its exit code, and
`git diff --stat`.

## Deviation contract

Stop and report when the block does not open with `@remarks` at the named lines.

## Acceptance criteria

1. `grep -n -F 'Dispatches the request to the handler' src/server/Negotiator.ts` returns the line
   above the `@remarks` tag.
2. `git diff --stat` lists `src/server/Negotiator.ts` alone.
