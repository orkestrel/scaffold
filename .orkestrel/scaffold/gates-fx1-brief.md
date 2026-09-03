# Gates — scaffold at `4fb7ff2` after the skills fix round

## Role and engine

`verifier` on Sonnet, native Claude Code subagent. Read-only: no Edit, no Write, no fix.

## Objective

Run the authoritative gate chain in `C:\Users\mikes\WebstormProjects\scaffold` and report
exit-code truth. The skills fix edited vendored skill files and regenerated `host.json`.

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
spawn nothing. A `host.json` diff after the build is a finding to report, not to fix.

## Output

For each gate: the exit code and the summary line. For a red gate: the exact failing excerpt with
file and line. For `npm test`: per-project pass, skip, and fail counts. Then `git status
--porcelain`.
