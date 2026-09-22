<!-- Unit TEST-TOLERANCE report: `builder` on Sonnet (native subagent), returned 2026-09-22. Brief: units/test-tolerance-brief.md. Checkout /home/user/test, branch claude/inspiring-allen-t4qzv1. Retained verbatim. -->

## Changes

`/home/user/test/tests/src/browser/helpers.test.ts` — in the three "modern paint readings" cases (`measures the dark oklch text against the browser sRGB control`, `measures the light oklch text on an oklch surface against browser controls`, `measures the contrast ratio of an oklch box-shadow on a focused control`), changed the `toBeCloseTo` precision argument from `3` to `2` and added one comment above the first case explaining that the agreement is a cross-browser-version property with a tolerance admitting the measured ~0.0015 gap while still refusing a hundredth-scale drift. No other line changed.

## Scoped validation

Before the edit: `cd /home/user/test && npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project src:browser tests/src/browser/helpers.test.ts -t "modern paint readings"` — `Tests 2 failed | 16 passed | 310 skipped (328)`, both failures `expected 17.844838151785993 to be close to 17.84338343214622 … but expected 0.0005`.

After the edit: the same command with `--reporter=dot` — `Test Files 1 passed (1)`, `Tests 18 passed | 310 skipped (328)`, exit 0. `npx oxlint --config .oxlintrc.json tests/src/browser/helpers.test.ts` exit 0. `npx oxfmt --config .oxfmtrc.json --check tests/src/browser/helpers.test.ts` — `All matched files use the correct format.`, exit 0.

## Review evidence

`git status --porcelain`: ` M package-lock.json` (pre-existing, the regenerated lockfile) and ` M tests/src/browser/helpers.test.ts`.

## Deviation state

None.

## Orchestrator's review

Read the diff directly: three precision arguments `3` → `2` and one comment; nothing else. Accepted on the red-then-green record above, with the independent gate chain (`units/test-release-gates-brief.md`) as the acceptance evidence; a falsify round is not run for a change whose failure is immediately visible (`orkestrel-falsify` § When a round is warranted).
