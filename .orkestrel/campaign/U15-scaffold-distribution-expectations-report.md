<!-- U15-scaffold — builder (Sonnet, native), the distribution expectations the D4 chain moved. Retained from the completion notification, 2026-09-15 (205 s, 24 tool uses). -->

## Changes

- `tests/distribution.test.ts` — added `REFERENCE_PATHS` to the `@src/core` import, added it to the `staged` containment list with an updated comment, added the 51 literal `guides/*.md` entries to `expanded` (49 new, keeping `guides/guide.md` and `guides/scaffold.md` in their alphabetical position), and added the two new printed examples to the `glossed` expectation list at `tests/distribution.test.ts:604-605` (`readSurfaceBaseline` and `readSurfaceCollisions`), inserted alphabetically between `readHostManifest` and `resolveRealPath`.
- `tmp/units/U15-list-reference-paths.mjs` — retained throwaway script that expands `REFERENCE_PATHS = ['guides']` against the real `guides/` directory; printed `51` entries, used to derive the literal list added above.

## Two example lines added

- `tests/distribution.test.ts:604` — `"dist/src/server/index.d.ts: readSurfaceBaseline('./host.json') // the recorded collisions, if the inventory exists"`
- `tests/distribution.test.ts:605` — `"dist/src/server/index.d.ts: readSurfaceCollisions('./guides').get('Shared') // the guides claiming Shared, if it collides"`

## Scoped validation

- `git diff --stat -- tests/distribution.test.ts`: `1 file changed, 57 insertions(+), 5 deletions(-)`.
- `npm run test:distribution`: `Test Files 1 passed (1)`, `Tests 5 passed | 1 skipped (6)`, exit 0.
- `npx oxfmt --config .oxfmtrc.json --check tests/distribution.test.ts`: "All matched files use the correct format." exit 0.
- `npx oxlint --config .oxlintrc.json --deny-warnings tests/distribution.test.ts`: no output, exit 0.
- `git status --porcelain tmp/units/U15-list-reference-paths.mjs`: empty (the file sits under the git-ignored `tmp/` directory, so it is untracked by design and not part of the diff).

## Deviation state

None. The third possible failure the brief warned about did not occur; all six tests in the `distribution` project passed (one skip, unrelated to this unit, was already present before the change).
