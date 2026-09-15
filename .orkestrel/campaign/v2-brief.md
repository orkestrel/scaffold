# Unit V2 — authoritative gate evidence for `@orkestrel/ollama`

## Role and engine

`verifier`, native Claude (Sonnet), read-only with Bash: run the exact commands named and report
exit-code truth. Perform the assignment directly, spawn nothing, and fix nothing.

## Objective

Run the acceptance gate chain in `C:/Users/mikes/WebstormProjects/ollama` at commit `e689e5b`, in
the order given, and report each command's exit code, the test counts per project, and the exact
failure excerpt for any non-zero exit.

## Context

- Checkout: `C:/Users/mikes/WebstormProjects/ollama`, Windows 11, Git Bash. The tree must be clean
  at `e689e5b` apart from `node_modules` — report `git status --porcelain` verbatim and still run.
- `node_modules/@orkestrel/agent` is the packed tarball from agent commit `d84b1a2`, installed
  with `--no-save` (the declared range `^0.0.21` is untouched; the registry's `0.0.21` lacks the
  base, so the package re-pins after agent's next release). Report the installed version and
  whether its declaration carries `UPSTREAM_RELAY_STATUS`
  (`grep -c UPSTREAM_RELAY_STATUS node_modules/@orkestrel/agent/dist/src/core/index.d.ts`).
- The Ollama daemon: the `service` project needs a warm daemon on `127.0.0.1:11434`; the
  Orchestrator starts it before this unit. Run `curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:11434/api/tags`
  first and report the code; if it is not `200`, still run the chain and report the `service`
  project's own reading verbatim.
- Standing conditions: the API Extractor notice is not a failure; the `service` project's tests
  are slow (120 s timeouts) and run without file parallelism.
- Never run `lint`, `format`, or any mutating command; never install, commit, or read a credential.

## Commands, in order

```bash
git -C C:/Users/mikes/WebstormProjects/ollama rev-parse --short HEAD
git -C C:/Users/mikes/WebstormProjects/ollama status --porcelain
curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:11434/api/tags
npm run format:check
npm run lint:check
npm run check
npm run build
npm test
npm run test:service
```

Run each `npm` command from the checkout root. Do not stop at the first failure; run the whole
chain and report every exit code. The `service` project is outside `npm test` (it runs under
`prepublishOnly`), so its command is named on its own line.

## Output

Return as your final message: a table with one row per command (command, exit code); the
per-project `Test Files` and `Tests` lines from `npm test`, the `service` project's reading
called out; for any non-zero exit the first failing assertion or diagnostic verbatim (at most 40
lines per command); the `git status --porcelain` output after the chain; and one line
`GATES: GREEN` or `GATES: RED <commands>`.
