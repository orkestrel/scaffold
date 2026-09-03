# Scaffold gates after the process 0.0.9 re-pin

## Role and engine

`verifier` on Sonnet, native Claude Code subagent. Read-only: no Edit, no Write, no fix.

## Objective

Run the authoritative gate chain in `C:\Users\mikes\WebstormProjects\scaffold` at commit
`a1b4bac` or later and report exit-code truth. The runtime range `@orkestrel/process` moved from
`^0.0.8` to `^0.0.9` and `npm install` ran, exit 0. The chain was green at `969fe8a` before the
re-pin.

## Context

Host: Windows 11, Git Bash; Playwright Chromium installed. `npm run build` regenerates
`host.json`; a diff in it after the build is a finding to report, not to fix. Perform the
assignment directly and spawn nothing.

## Commands, in order, each read bare

```text
npm run format:check
npm run lint:check
npm run check
npm run build
npm test
```

Run each alone from the checkout root, record its exit code, and continue past a red gate.

## Output

For each gate: the exit code and the summary line. For a red gate: the exact failing excerpt
with file and line. For `npm test`: per-project pass, skip, and fail counts, and the duration of
any project that ran longer than five minutes. Then `git status --porcelain`.
