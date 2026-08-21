# Unit M-fix2: mcp teardown registration order (batch audit claim 8 + F4)

## Role and engine

Role `builder`, engine Sonnet, native subagent, sole writer in
`C:/Users/mikes/WebstormProjects/mcp`. Fully specified below. You perform the assignment
directly and spawn nothing.

## The edits

1. `tests/src/server/factories.test.ts`, the `runs every real server disposer after one
   fails` case. Two sites acquire a server, await `listen`, then register the disposer
   (lines 67-69 and 78-80). For each: move the `failureTeardown.add(...)` call to the line
   directly after its `createHTTPServer()` and before the `listen` await, keeping the
   disposer bodies exactly as they are (their close-with-reject behaviour is what the
   aggregation proof measures — do NOT adopt a tolerant `if (!listening) resolve()` shape
   here). Give each `listen` promise a reject path:
   `new Promise<void>((resolve, reject) => { server.once('error', reject); server.listen(0, '127.0.0.1', resolve) })`
   with the actual variable name. At the second registration add one comment line stating
   the constraint the code cannot show: the aggregation discrimination depends on the
   failing disposer registering last, because release runs newest-first.
2. `tests/src/server/transports/WebSocketClientTransport.test.ts`: delete the orphaned
   comment block at lines 39-43 ("A second registrar for the RAW `node:http` server…").
   There is no second registrar; the block's facts already live at lines 34-37 and 60-64.
   Leave everything else untouched.

## Scope

- Owned: the two named test files. Nothing else.
- Standing entries: everything `git status --porcelain` lists at your start.
- No commits, installs, or `git checkout`/`restore`/`stash`/`reset`/`clean`. Use `npx.cmd`.

## Acceptance criteria, in this order

1. `git status --porcelain` adds nothing beyond the standing entries plus the two owned
   files; report before/after.
2. Scoped `npx.cmd oxfmt --config .oxfmtrc.json --check` and
   `npx.cmd oxlint --config .oxlintrc.json --deny-warnings` on the two files exit 0.
3. `npx.cmd tsc --noEmit --project tsconfig.json` exits 0.
4. `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server`
   exits 0; totals reported.

## Output

The diff; raw output and exit code per criterion; any deviation. No process diary.

## Deviation contract

Stop on: the moved registration reddening the aggregation case for any reason; a criterion
unreachable. Comment wording is yours: decide, record, carry on.
