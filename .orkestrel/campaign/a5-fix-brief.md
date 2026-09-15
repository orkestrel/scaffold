# Unit A5-fix — the findings of audit round A5-R1 on the relay transcription

## Role and engine

`builder` on Claude Sonnet, reached as a native Claude Code subagent (tools: Read, Grep, Glob,
Edit, Write, Bash), working in the checkout `C:/Users/mikes/WebstormProjects/agent` as its sole
writer. You are the engine reading this brief: perform the assignment directly and spawn nothing.
Every replacement below is fully specified; apply each exactly, and stop on anything the text
does not settle (see Deviation contract).

Read `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md` first (§ Non-negotiable rules,
§ Writing), then `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/writing.md` and
`tests.md`. Skill: none. Guide: `guides/agent.md` in the agent checkout (the pattern at line 1093).

## Objective

Apply the repairs R1–R12 below to `tests/guides.test.ts`, `guides/agent.md`, and one TSDoc line of
`src/core/factories.ts`, so that every comment and sentence the A5 change added states measured
behaviour, the fence's stop comment is true of the installed `@orkestrel/server`, the abort handle
in the socket cases is the fence's own `createAbort`, and the post-stop assertions sit outside
`finally`.

## Context

**Evidence — the tree.** `git -C C:/Users/mikes/WebstormProjects/agent log --oneline -1` →
`0af0785 test: drive the relay fences over a started server, correct the fence's stop comment`;
`git status --porcelain` → empty. V3 read the gate chain green at `0af0785` (`guides` 43 passed,
twice).

**Evidence — what the audit measured.** With a request held in flight, `server.stop()` reports the
status `stopping`, aborts the in-flight request's signal, still accepts a fresh connection and
answers it `200` with `request.signal.aborted === true`, and refuses a connection only after the
stop completes (`ECONNREFUSED`): the Orchestrator's probe `a5-probe-stopping.mjs.txt` with
`a5-probe-stopping.log.txt` in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/`.
So "refuse new connections" is false of the installed server; what `stop()` does is signal
cancellation, drain, then close the listener. After a completed call and a cancel on one server,
`stop()` took ~3 s with the drain event reporting `pending=0 upgraded=0`: the wait sits in
`server.close()` on the client's aborted keep-alive socket, which `closeIdleConnections` does not
reach, not in the `drain` budget (`a5-probe-stop-3.log.txt`).

**Evidence — the abort handle the browser fence uses.** `createAbort(options?)` from
`@orkestrel/abort` returns an `AbortInterface` with `signal: AbortSignal`, `aborted: boolean`,
and `abort(reason?: unknown): void` (`node_modules/@orkestrel/abort/dist/src/core/index.d.ts:53-63`,
`:120`). `@orkestrel/abort` is a declared runtime dependency of agent (`package.json`), and the
guide's browser fence imports it (`guides/agent.md:1135`).

**Evidence — the current text you replace** (`tests/guides.test.ts` at `0af0785`; line numbers
are those of the committed file):

- lines 456-457: `// The server half runs as written, apart from the `host` a test listener needs: the` / `// fence omits it because a deployed server binds every interface.`
- lines 468-470: `// The route the server half declares is the dispatcher's own contract: it answers` / `// every call that misses the declared method or the declared path itself, so neither` / `// the relay nor the upstream provider is entered.`
- lines 486-487: `// An authorization refusal crosses the hop as a ProviderError carrying the HTTP code` / `// and that status, and it leaves the upstream provider unentered.`
- lines 501-503: `// The browser end drives `ProviderInterface` exactly like a local provider, and the` / `// credential never leaves the listener's side of the hop: the same script driven` / `// directly in this process answers what the relayed call answers.`
- lines 516-520: the flagship case's `finally` block with `await server.stop()`, `expect(server.status).toBe('stopped')`, `expect(server.address).toBeUndefined()`.
- line 523: `it('cancels the upstream turn when the relay reader goes away mid-stream', async () => {`
- line 540: `const abort = new AbortController()` in the cancel case, with its `abort.abort()` call a few lines later; `new AbortController().signal` at lines 492, 509, and 512 in the flagship case.
- lines 561-572: the cancel case's `finally` block with `gate.resolve()`, the `performance.now()` pair around `await server.stop()`, the comment `// A cancel leaves the client's socket aborted rather than idle, so a server that also` / `// served a completed call on a reused keep-alive socket waits out its whole `drain`` / `// budget here. One server per case keeps the stop immediate.`, `expect(drained).toBeLessThan(1000)`, `expect(server.status).toBe('stopped')`.
- line 653: the substring guard `"process.on('SIGTERM', () => server.stop()) // refuse new connections, drain, then close"`.

`guides/agent.md` at `0af0785`: line 1097 begins `` `@orkestrel/agent` declares no runtime dependency on a newline-delimited JSON parser, on a router, or on a server adapter, so ``; line 1099 begins `The transcription substitutes where a test process differs from a deployment.` and ends with the sentence `And it holds the byte-limit refusal to a direct handler call, because `limit` caps the body `createRelay` reads itself while the server's own `limit` caps the `body()` a middleware context reads, and this composition calls neither middleware nor that context.`; line 1126 is `process.on('SIGTERM', () => server.stop()) // refuse new connections, drain, then close`. `src/core/factories.ts:104` is ` * process.on('SIGTERM', () => server.stop()) // refuse new connections, drain, then close`.

**Law.** `AGENTS.md` § Writing (no count, no `should`, no `now`/`new`/`latest`, present tense),
`writing.md` § Code tokens (a token in backticks followed by a noun), `tests.md`.

**Host.** Windows 11; your Bash tool runs Git Bash; `npm run <script>` works as written. The
installed `@orkestrel/guide` is a packed tarball installed `--no-save`: never run `npm install`,
`npm ci`, or `npm update`. `npm run check` prints a non-failing API Extractor notice. The `guides`
project binds loopback listeners on `127.0.0.1` during its relay cases.

**Control identifiers.** R1–R12 are this brief's labels; a test is named for what it proves.

**Standing conditions.** None beyond the tarball above. The tree is clean at `0af0785`.

## Unknowns

None.

## Scope

**Owned.** `tests/guides.test.ts` (the two socket cases, the flagship case's comments, the
substring guard, and the dynamic import you add); `guides/agent.md` (lines 1097, 1099, 1126 only);
`src/core/factories.ts` (line 104 only).

**Shared (report-only).** None.

**Off-limits.** Everything else: every other line of `src/**` and `guides/agent.md`, `tests/setup.ts`,
`tests/setup.test.ts`, `package.json`, `package-lock.json`, the vendored scaffold set, `README.md`,
`dist/**`, the ollama checkout.

**What asserts the state this change ends.** The substring guard in `tests/guides.test.ts`
(Owned); the titled-example equality between the fence and `factories.ts` (both twins Owned).

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. You may run `npm run format` and
`npm run lint` to converge, then `npm run format:check`, `npm run lint:check`, `npm run check`,
and `npm run test:guides`. Do not run `npm install`, `npm ci`, `npm run build`, or any `git`
command that changes the tree.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## The repairs

**R1 — the fence's stop comment, three sites.** Replace `// refuse new connections, drain, then close`
with `// signal cancellation, drain, then close the listener` at `guides/agent.md:1126`, at
`src/core/factories.ts:104` (the rest of each line unchanged), and inside the substring guard's
expected string at `tests/guides.test.ts:653`.

**R2 — the cancel case's stop comment.** Replace the three comment lines beginning
`// A cancel leaves the client's socket aborted rather than idle, so a server that also` with:

```ts
// A cancel leaves the client's socket aborted rather than idle, so `closeIdleConnections`
// does not reach it and `server.close()` waits on the socket itself — seconds, on a server
// that also served a completed call over that reused keep-alive socket. One server per
// case keeps the stop immediate.
```

**R3 — the "runs as written" comment.** Delete the two comment lines at 456-457, and place
these lines directly above the `const server = createServer(...)` line of the flagship case:

```ts
// The server half's composition runs as written apart from the `host` option a test
// listener needs. The fence's `serve` export is the alternative entry this listener stands
// in for, and `await server.stop()` after the case replaces the `SIGTERM` listener a test
// process outlives.
```

**R4 — the credential clause.** Replace the three comment lines at 501-503 with:

```ts
// The browser end drives the `ProviderInterface` contract exactly like a local provider:
// the same script driven directly in this process answers what the relayed call answers.
```

**R5 — the guide's dependency sentence.** At `guides/agent.md:1097`, replace the opening
`` `@orkestrel/agent` declares no runtime dependency on a newline-delimited JSON parser, on a router, or on a server adapter, so ``
with `` The `@orkestrel/agent` package declares no dependency on a newline-delimited JSON parser, and no runtime dependency on a router or on a server adapter, so ``.
The rest of the paragraph is unchanged.

**R6 — the guide's byte-limit sentence.** At `guides/agent.md:1099`, replace the final sentence
(from `And it holds the byte-limit refusal` to the end of the line) with:

`The byte-limit refusal stays a direct handler call. The `limit` option of the `createRelay` factory caps the body the relay reads, and the `limit` option of the `createServer` factory caps the `body()` read a middleware context makes. This composition registers no middleware, so the server's cap never sees these bytes.`

**R7 — the `url` token.** In the same line 1099, replace `It points the browser half's `url` at that address`
with `It points the browser half's `url` option at that address`.

**R8 — two comment tokens.** At lines 486-487 replace `as a ProviderError carrying` with
`` as a `ProviderError` instance carrying ``. At lines 468-470 replace the three lines with:

```ts
// The route the server half declares is the dispatcher's own contract: the dispatcher itself
// answers every call that misses the declared method or the declared path, so neither the
// relay nor the upstream provider is entered.
```

**R9 — the fence's abort handle.** Add `const { createAbort } = await import('@orkestrel/abort')`
beside the other dynamic imports inside the `GuideCommand.execute` callback (next to the
`@orkestrel/test` import). In the cancel case replace `const abort = new AbortController()` with
`const abort = createAbort()` (the `abort.signal` and `abort.abort()` uses stay as they are). In
the flagship case replace each `new AbortController().signal` (lines 492, 509, and 512) with
`createAbort().signal`. Leave every other case in the file untouched.

**R10 — the placeholders sentence.** At `guides/agent.md:1099`, after the sentence
`The transcription substitutes where a test process differs from a deployment.` insert:
`The fence's `declare` placeholders become a scripted upstream provider and a fictional bearer, and the `messages` binding is typed as `readonly Message[]` rather than narrowed with `as const`.`

**R11 — the cancel case's name.** Replace `'cancels the upstream turn when the relay reader goes away mid-stream'`
with `'cancels the upstream turn when the relay reader goes away with the first pull pending'`.

**R12 — the assertions leave `finally`.** In the flagship case, the `finally` block keeps only
`await server.stop()`; the two assertions `expect(server.status).toBe('stopped')` and
`expect(server.address).toBeUndefined()` move directly after the `try`/`finally` statement, still
inside the case. In the cancel case, declare `let drained: number | undefined` before the `try`;
the `finally` block keeps `gate.resolve()`, the `performance.now()` reading, `await server.stop()`,
and the assignment `drained = performance.now() - closing`; the comment from R2 and the two
assertions `expect(drained).toBeLessThan(1000)` and `expect(server.status).toBe('stopped')` move
directly after the `try`/`finally` statement.

## Output

Write the report to `tmp/units/a5-fix-report.md` in the agent checkout and return the same text as
your final message: per repair R1–R12, the file and the line it landed on; the commands you ran
with exit codes and the `guides` count; `git status --porcelain` and `git diff --stat`; any claim
you flag. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short
hypothesis — when a replacement's "current text" is not found verbatim, when `npm run check` or
`npm run test:guides` fails after the repairs, or when the formatter rewrites a repaired comment so
that it no longer reads as specified. Decide, record, and carry on from: where a blank line sits
and how a comment wraps at the formatter's width.

## Acceptance criteria

1. `grep -c "signal cancellation, drain, then close the listener" guides/agent.md src/core/factories.ts tests/guides.test.ts`
   reports 1 for each file, and `grep -c "refuse new connections" guides/agent.md src/core/factories.ts tests/guides.test.ts`
   reports 0 for each.
2. `grep -n "AbortController" tests/guides.test.ts` shows no hit inside the two socket cases
   (the hits that remain belong to the other cases), and `grep -c "createAbort" tests/guides.test.ts`
   reports at least 5.
3. `grep -n "whole \`drain\`\|credential never leaves\|apart from the \`host\` a test listener needs: the\|declared path itself\|as a ProviderError carrying\|goes away mid-stream\|declares no runtime dependency on a newline\|reads itself while the server" tests/guides.test.ts guides/agent.md`
   finds nothing.
4. `git diff --stat` names only `tests/guides.test.ts`, `guides/agent.md`, and `src/core/factories.ts`;
   `git diff src/core/factories.ts` shows one changed line.
5. In both socket cases no `expect(` call sits inside a `finally` block.
6. `npm run format:check`, `npm run lint:check`, and `npm run check` exit 0.
7. `npm run test:guides` exits 0 with 43 passed and no skipped or todo case.

## Review evidence

The Orchestrator supplies the checker the diff and status after you return.
