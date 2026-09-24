# J-TOAST landing — the verifier's brief (the authoritative gates on Veneer `main` after the fast-forward)

## Role and engine

`verifier` on Sonnet (native subagent, read-only, no edit or write tool). Perform the assignment directly and spawn nothing.

## Objective

Exit-code truth for the gate chain on Veneer `main` at `TOAST_HEAD` (the J-TOAST landing: `fb00017` and its merge commit), in the checkout `C:/Users/mikes/WebstormProjects/veneer`.

## Context

- Host: Windows 11, Git Bash; Chromium 153.0.8010.12 runs the browser suites. WebStorm holds a tailwind binary under `node_modules`, so run no install. `npm test` stops at its first red script, so run the later rows one by one after it.
- Standing red rows on this host, per `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/host-chromium-153-reading.md`: read that file before reporting and mark a red row that it names as standing.
- The `HostSnapshot` suite prints an expected `SyntaxError: Failed to execute 'toggle' on 'DOMTokenList'` diagnostic while passing; it is not a failure.

## Commands, in order, each from the checkout root

```text
git log --oneline -1
git status --short
npm run format:check
npm run lint:check
npm run check
npm run build
npm test
npm run test:app
npm run test:journey
npm run test:config
npm run test:setup
npm run test:setup:browser
npm run test:policy
npm run test:conformance
npm run test:guides
npm run test:service
```

Run every row even after a red one. Capture each row's exit code and its `Test Files` and `Tests` summary lines, and for a red row the exact failing case titles and the first assertion excerpt.

## Output

A table of row, exit code, and summary; then each red row with its excerpt and whether `host-chromium-153-reading.md` names it as standing; then the head commit and the status output. No process diary. Fix nothing.
