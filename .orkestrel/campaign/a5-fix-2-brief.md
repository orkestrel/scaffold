# Unit A5-fix-2 — two comment sentences from the A5-fix check

## Role and engine

`builder` on Claude Sonnet, native Claude Code subagent (tools: Read, Grep, Glob, Edit, Write,
Bash), the sole writer in `C:/Users/mikes/WebstormProjects/agent`. Perform the assignment directly
and spawn nothing. Read `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/writing.md`
§ Code tokens first.

## Objective

Replace two comments in `tests/guides.test.ts` so that no code token stands as a bare sentence
subject and the stop's placement is stated where it sits. Nothing else changes.

## Context

The tree is at `c9b35b2`, clean (`git status --porcelain` empty). The checker of unit A5-fix
(`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/a5-fix-check-verdict.md`) ruled the
two comments below against `writing.md` § Code tokens ("Put a code token in backticks and follow
it with a noun") and referred the phrase "after the case", which misstates where the stop sits
(it sits in the case's `finally` block).

**Current text, `tests/guides.test.ts:464-467`:**

```ts
			// The server half's composition runs as written apart from the `host` option a test
			// listener needs. The fence's `serve` export is the alternative entry this listener stands
			// in for, and `await server.stop()` after the case replaces the `SIGTERM` listener a test
			// process outlives.
```

**Current text, `tests/guides.test.ts:570-573`:**

```ts
			// A cancel leaves the client's socket aborted rather than idle, so `closeIdleConnections`
			// does not reach it and `server.close()` waits on the socket itself — seconds, on a server
			// that also served a completed call over that reused keep-alive socket. One server per
			// case keeps the stop immediate.
```

**Host.** Windows 11; Git Bash; `npm run <script>` works. Never run `npm install`, `npm ci`,
`npm run build`, or a git command that changes the tree (the installed `@orkestrel/guide` is a
`--no-save` tarball an install would revert).

## Scope

**Owned.** `tests/guides.test.ts`, those two comments only. **Off-limits.** Every other line and
every other file.

## The repairs

**S1.** Replace the first comment with:

```ts
			// The server half's composition runs as written apart from the `host` option a test
			// listener needs. The fence's `serve` export is the alternative entry this listener stands
			// in for, and the `await server.stop()` call in the case's `finally` block replaces the
			// `SIGTERM` listener a test process outlives.
```

**S2.** Replace the second comment with:

```ts
			// A cancel leaves the client's socket aborted rather than idle, so the
			// `closeIdleConnections` step does not reach it and the `server.close()` call waits on the
			// socket itself — seconds, on a server that also served a completed call over that reused
			// keep-alive socket. One server per case keeps the stop immediate.
```

The formatter may re-wrap a comment line; the words and their order must stay as written.

## Output

Return, as your final message, and write to `tmp/units/a5-fix-2-report.md`: the two landed line
ranges; the commands you ran with exit codes; `git diff --stat`. No process diary.

## Deviation contract

Stop and report when either current text is not found verbatim or a command below fails.

## Acceptance criteria

1. `grep -c "the \`await server.stop()\` call in the case's \`finally\` block replaces" tests/guides.test.ts` reports 1;
   `grep -c "the \`closeIdleConnections\` step does not reach it and the \`server.close()\` call waits" tests/guides.test.ts` reports 1;
   `grep -c "after the case replaces" tests/guides.test.ts` reports 0.
2. `git diff --stat` names only `tests/guides.test.ts`.
3. `npm run format:check`, `npm run lint:check`, and `npm run check` exit 0.
4. `npm run test:guides` exits 0 with 43 passed.
