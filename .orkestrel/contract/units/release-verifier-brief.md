# CONTRACT-ISINSTANCE release — the verifier's brief

## Role and engine

`verifier` on Sonnet, reached as a native Claude subagent with `Read`, `Grep`, `Glob`, and `Bash`. The executor that opens this brief is that subagent.

## Objective

The authoritative gate chain's exit-code truth on the contract checkout at the release commit, so the Orchestrator publishes on evidence.

## Context

**Evidence.** The checkout `C:/Users/mikes/WebstormProjects/contract`, at the commit the dispatch names (`git -C C:/Users/mikes/WebstormProjects/contract log --oneline -1` shows it), installed from the lockfile (`node_modules/.orkestrel-lock.sha256` carries the lockfile digest).

**Law.** The checkout's own `AGENTS.md` § Work process (the gate order: `npm run format:check` → `npm run lint:check` → `npm run check` → `npm run build` → `npm test`), then the package's own `npm run test:distribution -- --mode release` (the packed tarball's proof, which `prepublishOnly` runs before every upload); read each gate bare; skill: none.

**Host.** Windows 11; the subagent's `Bash` is Git Bash; run every command from `C:/Users/mikes/WebstormProjects/contract`; npm `12.0.2`; no network is needed except by `test:distribution`, which packs and installs the tarball into a temporary consumer from the local pack (report exactly what it does if it reaches the registry). Run each command in the foreground and read its exit code.

**Standing conditions.** `git status` is clean at the release commit; a dirty tracked file is a finding to report, never to discard. `npm run build` writes `dist/`, which is expected. Fix nothing; edit nothing.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

Return the report as your final message: each command with its exit code first, then any red test by file, title, and assertion message, then the `test:distribution` reading (what it packed, where it installed, what it proved), then `git status --short`.
