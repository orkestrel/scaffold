# U2 fix round 2 — successor to u2-brief-3.md

Two Orchestrator-verified findings from the re-run. Test-side only.

## Finding 1 — your new integration test file still imports the Vue-bound barrel

`tests/app/browser/integration/RosterManager.test.ts` fails at import analysis with the same
`.vue` parse error round 1 fixed in `setup.ts`. Apply the same fix to this file: every value
import from `@app/browser` moves to the owning module file (controllers/RosterManager.js,
errors.js, validators.js — whichever it uses). Sweep the whole integration directory for any
remaining `from '@app/browser'` value import.

## Finding 2 — `networkidle` can never arrive in this application again

```text
FAIL integration.test.ts > proves the same-origin login, cookie, bearer, CSRF, reload, logout wire
TimeoutError: page.reload: Timeout 30000ms exceeded. waiting for navigation until "networkidle"
```

This is the feature working: an authenticated page now holds a permanently open roster SSE
stream, so "no network connections for 500ms" is unreachable by design. Replace the
`waitUntil: 'networkidle'` with `waitUntil: 'load'` (the following locator wait already provides
the readiness condition), and sweep both integration files and the integration setup for every
other `networkidle` use — each one is now a guaranteed timeout. Name each site you change.

## Gates

Static gates in your sandbox; Orchestrator runs the integration project as acceptance.

## Output

The diffs; `git status --porcelain`; the list of changed wait sites; deviations or none.
