# Unit F-W56 report — the totality guard and the portfolio case

Both `BROKEN` findings from `tmp/codex/w56-audit-last.md` landed. Nothing was committed. The working
tree carries exactly the two owned files.

## Fix 1 — the discovery walk in `tests/guides.test.ts`

- `tests/guides.test.ts:98-101` — `FENCE_OPEN` (`/^ {0,3}(`{3,})[^`]*$/`), `FENCE_CLOSE`
  (`/^ {0,3}(`{3,})[ \t]*$/`), and `HEADING` replace the `line.startsWith('```')` test and the inline
  heading pattern. An opener is a backtick run of three or more indented up to three spaces whose
  info string carries no backtick; a closer is a run at least as long, indented up to three spaces,
  carrying nothing but spaces.
- `tests/guides.test.ts:113-115` — `carriesMarker(text, marker)` reports whether some line's trimmed
  text starts with the marker. It replaces the whole-file `String.includes` test at both call sites:
  the transcribed check at `tests/guides.test.ts:289-291` and the routed-carrier check at
  `tests/guides.test.ts:300-305`.
- `tests/guides.test.ts:254-283` — the walk keeps the open delimiter in `open` rather than a boolean,
  so a closer shorter than its opener does not end the fence. `###` re-assigns `heading`; a `####` or
  deeper heading leaves it standing (`tests/guides.test.ts:279`); a `#` or `##` clears it, and `##`
  also re-assigns `section`.
- The population unit stays the `###` heading: `markers` is still keyed by heading, so several fences
  under one heading remain one entry. Discovery over the guide as it stands is unchanged —
  `npm run test:guides` reports 38 passed both before and after.

## Fix 2 — the disabled-placement case in `tests/src/browser/factories.test.ts`

- `tests/src/browser/factories.test.ts:298-316` — before the disabled `place`, the case stages a
  viewport and a theme the `dark-390` variant does not produce: `await page.viewport(320, 480)` and
  `document.documentElement.removeAttribute('data-theme')`, each read back at
  `tests/src/browser/factories.test.ts:304-305` so a staging failure is told apart from a resize.
  After the call, `tests/src/browser/factories.test.ts:314-316` assert `window.innerWidth` is 320,
  `window.innerHeight` is 480, and `data-theme` is absent. An erroneous resize or variant application
  under a disabled placement now reddens the case instead of coasting on the enabled placement's
  state. The file's existing `afterAll` hands the runner's own viewport back.

## Mutation controls

Each control was applied by a script, run, and restored by copying the pre-control bytes back;
`sha256sum` matched the pre-control digest after every restore. The scripts are retained at
`tmp/units/f-w56-controls/control1.mjs`, `control2.mjs`, and `control3.mjs`.

**Control 1 — an uncarried `###` with a `####` and a three-space-indented fence under it.**
Appended `### Uncarried`, `#### Detail`, and a fence opened by three spaces and three backticks to
`guides/test.md`.

- Against the unfixed guard, `npm run test:guides` reported 38 passed — the defect the audit named.
- Against the fixed guard, `npm run test:guides` failed at `tests/guides.test.ts:296`
  (`expect(findMissing(discovered, [...transcribed, ...routed])).toEqual([])`) with
  `expected [ 'Uncarried' ] to deeply equal []`: 1 failed | 37 passed.
- Restored; `guides/test.md` digest `b58b2b711c6f415824401ea964eb70061a1896e5c09a35b67685c26f66cb1ff0`
  matches the pre-control file. `npm run test:guides` back to 38 passed.

**Control 2 — the `Place a capture portfolio` marker present but not line-anchored.**
Deleted the marker line at the head of the case in `tests/src/browser/factories.test.ts` and put the
same `// guides/test.md → Patterns → "Place a capture portfolio"` text mid-sentence inside the
replacement comment, so no line's trimmed text starts with it.

- Against the unfixed guard, `npm run test:guides` reported 38 passed — the defect the audit named.
- Against the fixed guard, `npm run test:guides` failed at `tests/guides.test.ts:306`
  (`expect(unmarked).toEqual([])`) naming
  `[ "Place a capture portfolio", "tests/src/browser/factories.test.ts" ]`: 1 failed | 37 passed.
- Restored; `tests/src/browser/factories.test.ts` digest
  `8236b74adfa0a305aeddc931abe344cfab8ab020f49b0e269f9a88a063007675` matches the pre-control file.

**Control 3 — the unchanged-viewport expectation mutated to a wrong value.**
Changed the post-call `expect(window.innerWidth).toBe(320)` to `toBe(321)`.

- `npx vitest run --config vite.config.ts --project src:browser tests/src/browser/factories.test.ts`
  failed at `tests/src/browser/factories.test.ts:314` with `expected 320 to be 321`: 1 failed |
  30 passed (31).
- Restored; the file digest `58f0eb7aabb10a7cc459625d246fee979c69383b3321ebc7517d458f4baf17e7`
  matches the fixed file, and the same command returned 31 passed.

## Closing scoped validations

| Command                                                                                             | Result           |
| --------------------------------------------------------------------------------------------------- | ---------------- |
| `npm run test:guides`                                                                                 | 38 passed (38)   |
| `npx vitest run --config vite.config.ts --project src:browser tests/src/browser/factories.test.ts`     | 31 passed (31)   |
| `npx oxfmt --config .oxfmtrc.json --check tests/guides.test.ts tests/src/browser/factories.test.ts`    | exit 0           |
| `npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts tests/src/browser/factories.test.ts` | exit 0    |
| `npx tsc --noEmit --project tsconfig.json`                                                            | exit 0           |
| `npm run test:policy` (observation, not a named criterion)                                            | 93 passed (93)   |

`tsconfig.json` is the narrowest project covering `tests/**`; the `configs/src/tsconfig.*.json`
projects each cover one `src` environment only.

`git status --porcelain` reports `M tests/guides.test.ts` and `M tests/src/browser/factories.test.ts`
and nothing else. `git diff --stat`: 2 files changed, 53 insertions(+), 9 deletions(-).
`git diff --check` is clean.

## Deviation state

No deviation. One judgment call inside the file-internal latitude the brief grants: the audit asked
for every fence occurrence to be retained, and the brief fixes the population unit at the `###`
heading, so `markers` stays keyed by heading and several fences under one heading remain one entry.
The brief governs.
