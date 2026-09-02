# Unit voice-workflow-fixup-2 — restore the link the ruled sentence dropped

## Role and engine

`builder` on Claude Sonnet, a native subagent. You perform the assignment directly and spawn
nothing.

## Objective

The `createWorkflowRunner` doc block in `/home/user/fleet/workflow/src/core/factories.ts` names
`{@link WorkflowRunnerInterface}` in its first sentence again, with the fix-up's wording otherwise
kept.

## Context

The fix-up (`voice-workflow-fixup-brief.md`) applied the subjective lane's wording to lines
333-335 and reported that it dropped the `{@link WorkflowRunnerInterface}` reference the original
carried. Ruling by the Orchestrator: the first sentence reads

> Creates the thin orchestrator — a {@link WorkflowRunnerInterface} — that EXECUTES a live W-b workflow tree by COMPOSING the shipped substrate: phases sequential, tasks concurrent, each task dispatched through its OWN resolved handler under the workflow's `bail` policy.

wrapped at the file's width the way the block already wraps; every later line of the block stays
byte-identical.

**Host.** Linux, bash. Repository `/home/user/fleet/workflow`, uncommitted voice sweep in place,
`node_modules` installed. Do not run `npm install`.

## Scope

**Owned.** `src/core/factories.ts`, that one sentence. **Off-limits.** Every other line and file.

**Tools and limits.** Read, Grep, Edit, Bash. No commit, stage, push, install, or discarding `git`
command.

## Execution

Apply the edit, run `npm run format:check && npm run lint:check && npm run check`, then:

```text
git diff > /home/user/scaffold/tmp/units/voice/voice-workflow.diff
git status --short > /home/user/scaffold/tmp/units/voice/voice-workflow.status
```

## Output

Return, as data: the block's first sentence before and after, each command with its exit code,
and `git diff --stat`.

## Deviation contract

Stop and report when lines 333-335 do not carry the sentence beginning `Creates the thin
orchestrator that EXECUTES`.

## Acceptance criteria

1. `grep -n -F 'a {@link WorkflowRunnerInterface} — that EXECUTES' src/core/factories.ts` returns a hit.
2. `git diff --stat` lists only files under `src/`.
