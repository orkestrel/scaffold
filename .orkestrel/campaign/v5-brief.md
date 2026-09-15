# Unit V5 — authoritative gate evidence for `@orkestrel/ollama` after the O8 mirror refresh and the A4-4 repack

## Role and engine

`verifier`, native Claude (Sonnet), read-only with Bash: run the exact commands named and report
exit-code truth. Perform the assignment directly, spawn nothing, and fix nothing.

## Objective

Run the acceptance gate chain in `C:/Users/mikes/WebstormProjects/ollama` at the commit named in
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/o8-head.txt`, in the order given,
and report each command's exit code, the test counts per project, and the exact failure excerpt
for any non-zero exit.

## Context

- Checkout: `C:/Users/mikes/WebstormProjects/ollama`, Windows 11, Git Bash. The tree must be clean
  at that commit (`git status --porcelain` prints nothing) — report it if it is not, and still run.
- Standing conditions: API Extractor prints a non-failing notice during `check` and `build`; it is
  not a failure. `npm test` runs the projects `src:core`, `setup`, `policy`, `config`, `guides`,
  and `conformance`. The `service` project (`npm run test:service`) is not part of this run: it
  needs the Ollama daemon, which is stopped, and nothing in the runtime moved — the installed
  `@orkestrel/agent` is a packed tarball (installed `--no-save`) whose only change from the
  previous one is a documentation comment in its declaration file. Never run `npm install` or
  `npm ci`; either reverts that tarball.
- Never run `lint`, `format`, or any mutating command; never install, commit, or read a credential.

## Commands, in order

```bash
git -C C:/Users/mikes/WebstormProjects/ollama rev-parse --short HEAD
git -C C:/Users/mikes/WebstormProjects/ollama status --porcelain
grep -c "signal cancellation, drain, then close the listener" C:/Users/mikes/WebstormProjects/ollama/guides/agent.md C:/Users/mikes/WebstormProjects/ollama/node_modules/@orkestrel/agent/dist/src/core/index.d.ts
npm run format:check
npm run lint:check
npm run check
npm run build
npm test
```

Run each `npm` command from the checkout root. Do not stop at the first failure; run the whole
chain and report every exit code. The `grep -c` line is a preflight reading (expected `1` for
each file); report its output verbatim.

## Output

Return, as your final message and nothing else:

- a table of every command with its exit code (and the `grep -c` output);
- the per-project test counts from `npm test` (`Test Files` and `Tests` lines per project);
- the exact failure excerpt (the failing test names and the assertion text) for any non-zero
  exit;
- `git status --porcelain` after the chain;
- one terminal line: `GATES: GREEN` when every exit code is 0, `GATES: RED <command list>` otherwise.
