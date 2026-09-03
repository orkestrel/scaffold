# Unit V visit gates — `test`

## Role and engine

`verifier` on Sonnet, native Claude Code subagent. Read-only: no Edit, no Write, no fix.

## Objective

Run the authoritative gate chain in `C:\Users\mikes\WebstormProjects$t` after the fleet visit's
overwrite raised the toolchain floors, and report exit-code truth.

## Context

The overwrite moved `@types/node`, `oxfmt` (0.65 to 0.66), `oxlint` (1.80 to 1.81), and
`vite-plugin-dts` floors; `npm install` and `npm run format` already ran, exit 0, and format
rewrote no file. The pre-visit chain was green. Host: Windows 11, Git Bash; Playwright Chromium
installed. Perform the assignment directly and spawn nothing.

## Commands, in order, each read bare

```text
npm run format:check
npm run lint:check
npm run check
npm run build
npm test
```

Run each alone from the checkout root, record its exit code, and continue past a red gate so
every gate is read.

## Output

For each gate: the exit code and the summary line. For a red gate: the exact failing excerpt
with file and line, and whether it sits in a vendored file (`tests/setupPolicy.ts`,
`tests/policy.test.ts`, `tests/config.test.ts`, `configs/**`) or in the target's own code.
For `npm test`: the per-project pass, skip, and fail counts. Then `git status --porcelain`.
