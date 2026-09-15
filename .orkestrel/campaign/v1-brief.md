# Unit V1 — authoritative gate evidence for `@orkestrel/agent`

## Role and engine

`verifier`, native Claude (Sonnet), read-only with Bash: run the exact commands named and report
exit-code truth. Perform the assignment directly, spawn nothing, and fix nothing.

## Objective

Run the acceptance gate chain in `C:/Users/mikes/WebstormProjects/agent` at commit `d84b1a2`, in
the order given, and report each command's exit code, the test counts per project, and the exact
failure excerpt for any non-zero exit.

## Context

- Checkout: `C:/Users/mikes/WebstormProjects/agent`, Windows 11, Git Bash. The tree must be clean
  at `d84b1a2` (`git status --porcelain` prints nothing) — report it if it is not, and still run.
- Standing conditions: API Extractor prints a non-failing notice about TypeScript being newer than
  its bundled engine during `check` and `build`; it is not a failure. Vitest runs its projects
  (`src:core`, `setup`, `guides`, `policy`, `config`, `conformance`, `distribution`, `probe`, and
  `service` where present) under `npm test`; `service` may be absent in this package.
- Never run `lint`, `format`, or any mutating command; never install, commit, or read a credential.

## Commands, in order

```bash
git -C C:/Users/mikes/WebstormProjects/agent rev-parse --short HEAD
git -C C:/Users/mikes/WebstormProjects/agent status --porcelain
npm run format:check
npm run lint:check
npm run check
npm run build
npm test
```

Run each `npm` command from the checkout root. Do not stop at the first failure; run the whole
chain and report every exit code.

## Output

Return as your final message: a table with one row per command (command, exit code, duration if
the tool prints it); the per-project `Test Files` and `Tests` lines from `npm test`; for any
non-zero exit the first failing assertion or diagnostic verbatim (at most 40 lines per command);
the `git status --porcelain` output after the chain (a build must leave the tree clean apart from
ignored paths); and one line `GATES: GREEN` or `GATES: RED <commands>`.
