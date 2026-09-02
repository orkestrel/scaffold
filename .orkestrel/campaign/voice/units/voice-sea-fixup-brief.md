# Unit voice-sea-fixup — give the format-list header its first sentence

## Role and engine

`builder` on Claude Sonnet, a native subagent. You perform the assignment directly and spawn
nothing.

## Objective

The doc block at the head of `src/server/injectors/Injector.ts` in `@orkestrel/sea` opens with a
third-person first sentence; nothing else in the tree changes.

## Context

The voice unit landed at `09fd247` with both lanes PASS. The acceptance scan then listed one
block with no first sentence: `src/server/injectors/Injector.ts:1-5`, a `/** … */` block whose
lines are a per-format list (`PE — …`, `ELF — …`, `Mach-O — …`). Ruling by the Orchestrator:
insert, as the block's first line, the sentence

> Names the injection strategy per executable format:

followed by the three existing lines byte-identical.

**Law.** `.claude/rules/typescript.md` § Comments and API documentation — the vendored copy at
`node_modules/@orkestrel/scaffold/dist/host/claude/rules/typescript.md`.

**Host.** Linux, bash. Repository `/home/user/fleet/sea` at commit `09fd247`, committed clean at
launch, `node_modules` installed. Do not run `npm install`.

## Scope

**Owned.** `src/server/injectors/Injector.ts`, that one block. **Off-limits.** Every other line and
file.

**Tools and limits.** Read, Grep, Edit, Bash. No commit, stage, push, install, or discarding `git`
command.

## Execution

Apply the edit, run `npm run format:check && npm run lint:check && npm run check`, then:

```text
git diff > /home/user/scaffold/tmp/units/voice/voice-sea-fixup.diff
git status --short > /home/user/scaffold/tmp/units/voice/voice-sea-fixup.status
```

## Output

Return, as data: the block before and after, each command with its exit code, and
`git diff --stat`.

## Deviation contract

Stop and report when the block does not open with the `PE` line at the named lines.

## Acceptance criteria

1. `grep -n -F 'Names the injection strategy per executable format:' src/server/injectors/Injector.ts` returns line 2.
2. `git diff --stat` lists `src/server/injectors/Injector.ts` alone.
