# Gates — lloyds at `5a4f6eb` after the visit, migration, chrome, journey, and repair

## Role and engine

`verifier` on Sonnet, native Claude Code subagent. Read-only: no Edit, no Write, no fix.

## Objective

Run the authoritative gate chain in `C:\Users\mikes\WebstormProjects\lloyds` and report exit-code
truth, then the capture runs at every declared variant.

## Standing conditions

`git status --porcelain` shows `D  package-lock.json` and `?? package-lock.json`; that pair is the
user's and is not a finding. Do not run `npm install`. Host: Windows 11, Git Bash; Playwright
Chromium installed. Perform the assignment directly and spawn nothing.

## Commands, in order, each read bare

```text
npm run format:check
npm run lint:check
npm run check
npm run build
npm test
```

Then, each alone: `VITE_CAPTURE=true VITE_VARIANT=<v> npx vitest run --config vite.config.ts
--no-cache --reporter=dot --project app:browser tests/app/browser/integration.test.ts` for
`light-1280`, `dark-1280`, `light-390`, `dark-390` (write each as a one-line script file and run
the file if the environment prefix is refused).

## Output

For each gate and run: the exit code and the summary line; for a red one, the exact failing
excerpt with file and line. For `npm test`: per-project passed, skipped, and failed counts. Then
`git status --porcelain`.
