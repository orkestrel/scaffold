# Unit V3 — authoritative gate evidence for `@orkestrel/agent` after A5

## Role and engine

`verifier`, native Claude (Sonnet), read-only with Bash: run the exact commands named and report
exit-code truth. Perform the assignment directly, spawn nothing, and fix nothing.

## Objective

Run the acceptance gate chain in `C:/Users/mikes/WebstormProjects/agent` at commit `0af0785`, in
the order given, and report each command's exit code, the test counts per project, and the exact
failure excerpt for any non-zero exit.

## Context

- Checkout: `C:/Users/mikes/WebstormProjects/agent`, Windows 11, Git Bash. The tree must be clean
  at `0af0785` (`git status --porcelain` prints nothing) — report it if it is not, and still run.
- Standing conditions: API Extractor prints a non-failing notice about TypeScript being newer than
  its bundled engine during `check` and `build`; it is not a failure. `npm test` runs the projects
  `src:core`, `policy`, `config`, `setup`, and `guides`; the `guides` project starts loopback
  listeners on `127.0.0.1` during its relay cases, which is expected. The installed
  `@orkestrel/guide` is a packed tarball installed `--no-save`; never run `npm install` or `npm ci`.
- Never run `lint`, `format`, or any mutating command; never install, commit, or read a credential.
- Read-only audit lanes may be reading this checkout while you run; they write nothing and you
  write nothing but `dist/` through `npm run build`, which is expected.

## Commands, in order

```bash
git -C C:/Users/mikes/WebstormProjects/agent rev-parse --short HEAD
git -C C:/Users/mikes/WebstormProjects/agent status --porcelain
npm run format:check
npm run lint:check
npm run check
npm run build
npm test
npm run test:guides
```

Run each `npm` command from the checkout root. Do not stop at the first failure; run the whole
chain and report every exit code. The final `npm run test:guides` is a second reading of the
project that binds the loopback listeners, so a flake in it shows as disagreement between the two
runs.

## Output

Return, as your final message and nothing else:

- a table of every command with its exit code;
- the per-project test counts from `npm test` (`Test Files` and `Tests` lines per project) and
  from the second `npm run test:guides`;
- the exact failure excerpt (the failing test names and the assertion text) for any non-zero
  exit;
- `git status --porcelain` after the chain;
- one terminal line: `GATES: GREEN` when every exit code is 0, `GATES: RED <command list>` otherwise.
