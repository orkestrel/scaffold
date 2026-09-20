# Unit U3-policy — report 3 (builder, native Sonnet, 2026-09-20, 163 s)

## Diff summary

- `tests/policy.test.ts`: the comment above the accounting case names both mechanisms without a
  numeral and reads "A guide neither mechanism accounts for reports." (findings 8, 13); the
  control comment reads "a name neither the catalog registers nor the index links is a stray
  whatever the directory holds" (claim 1).
- `tests/setupPolicy.ts`: `isPolicyMirror`'s remarks say the decision reads the catalog alone and
  point at `isPolicyStray`; `isPolicyStray` gains remarks naming both mechanisms and the ruling
  ("An index link is the workspace's own claim to author that guide, so a mirror the catalog stops
  registering while the index still links it is swept, and the banned terms it reports name the
  drift."); `readPolicyIndex` gains remarks naming the stripping and its inherited limits; the
  control row `ignores an index link written inside a fence` (finding 11).
- `guides/scaffold.md:1151-1155`: the ruling sentence after the exclusion sentence.

## Control

Red with the `stripPolicyCode` call removed: `AssertionError: expected [] to have a length of 1
but got +0` at `tests/policy.test.ts:658` (`Tests 1 failed | 112 passed (113)`). Green restored:
`Tests 113 passed (113)`; the fenced link accounts for nothing, `guides/console.md` reports the
stray message with no line.

## Gates

`format:check`, `lint:check`, `check` exit 0; `test:policy` `113 passed`; `test:setup`
`164 passed | 3 skipped`; `test:guides` `23 passed`; `test:config` reported the inventory stale at
`.claude/rules/styles.md`, `guides/scaffold.md`, `tests/policy.test.ts`, `tests/setupPolicy.ts`
(the Orchestrator's rebuild restages it).

## Deviations

None.
