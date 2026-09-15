# Unit U4e-d — `@orkestrel/mcp`: the guide's `server/discover` reply comment advertises the tools family

Successor to U4e-c (`.orkestrel/campaign/U4e-c-mcp-host-tests-brief.md`; its report's carrier 4
named this site). U4e made `buildDiscoverResult` stamp `capabilities.tools` as
`{ listChanged: true }`; the guide's illustrative reply under the `server/discover` fence still
shows an empty `tools` capability, so the comment is false against the real reply.

## Role and engine

`builder` on Sonnet, a native Claude subagent (tools: Read, Grep, Glob, Edit, Write, Bash).
Perform the assignment directly and spawn nothing. You are the sole writer in the
`C:/Users/mikes/WebstormProjects/mcp` checkout while this unit runs. The tree is dirty with the
fourteen files of U4e, U4e-b, and U4e-c on commit `7959f08`; `guides/mcp.md` is one of them
(U4e edited other sections) — leave every other line as you find it.

## Carrier

In `guides/mcp.md`, near line 3451, the comment line

```text
//   "capabilities":{"tools":{}},"resultType":"complete","ttlMs":60000,"cacheScope":"private",
```

becomes

```text
//   "capabilities":{"tools":{"listChanged":true}},"resultType":"complete","ttlMs":60000,
//   "cacheScope":"private",
```

keeping the three-line comment's continuation style (`//   `) and the line that follows it
(`"_meta":…`) unchanged. Nothing else changes: the `capabilities: { tools: {} }` near line 5363
describes the legacy `initialize` result and stays true.

## Context, law, host, and bench

`.claude/rules/documentation.md` (a prose claim is falsified like a code claim) and
`.claude/rules/writing.md` in the scaffold checkout govern. Windows host: Git Bash for the Bash
tool; no heredocs, no `node -e`. Run only `npm run format:check` and `npm run test:guides`; never
tree-wide `format`. Do not commit, stash, checkout, restore, reset, clean, or run `npm install`.

## Scope

**Owned.** `guides/mcp.md`, only the named comment. **Off-limits.** Everything else.

## Deviation contract

Stop and report if the quoted line is not found exactly once, or if `test:guides` is red.

## Acceptance criteria

1. `npm run format:check` exits 0.
2. `npm run test:guides` exits 0.
3. `git diff HEAD -- guides/mcp.md` shows U4e's hunks plus exactly this comment's change.

## Output

The before and after; the acceptance readings (command, exit, reading); deviation state.
