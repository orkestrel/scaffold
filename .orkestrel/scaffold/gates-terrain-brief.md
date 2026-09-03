# Gates — terrain after the fix round

## Role and engine

`verifier` on Sonnet, native Claude Code subagent. Read-only: no Edit, no Write, no fix.

## Objective

Run the authoritative gate chain in `C:\Users\mikes\WebstormProjects\terrain` at its head commit
and report exit-code truth.

## Standing conditions

`git status --porcelain` shows `D  package-lock.json` and `?? package-lock.json`; that pair is
the user's and is not a finding. `node_modules/@orkestrel/test` holds a packed campaign build
staged with `npm install --no-save`; do not run `npm install` or `npm ci`. Host: Windows 11,
Git Bash; Playwright Chromium installed. Perform the assignment directly and spawn nothing.

## Commands, in order, each read bare

```text
npm run format:check
npm run lint:check
npm run check
npm run build
npm test
```

Run each alone from the checkout root with a generous timeout (the app browser project runs
71 files), record its exit code, and continue past a red gate.

## Output

For each gate: the exit code and the summary line. For a red gate: the exact failing excerpt with
file and line, and whether it sits in a vendored file. For `npm test`: per-project passed,
skipped, and failed counts, and the duration of the app browser project. Then `git status
--porcelain`.
