# Gates — `test` at `df4a0b6` after the capture-coverage fix

## Role and engine

`verifier` on Sonnet, native Claude Code subagent. Read-only: no Edit, no Write, no fix.

## Objective

Run the authoritative gate chain in `C:\Users\mikes\WebstormProjects\test` at `df4a0b6` and
report exit-code truth.

## Commands, in order, each read bare

```text
npm run format:check
npm run lint:check
npm run check
npm run build
npm test
```

Run each alone from the checkout root, record its exit code, and continue past a red gate.
Host: Windows 11, Git Bash; Playwright Chromium installed. Perform the assignment directly and
spawn nothing.

## Output

For each gate: the exit code and the summary line. For a red gate: the exact failing excerpt with
file and line. For `npm test`: per-project pass, skip, and fail counts. Then `git status
--porcelain`.
