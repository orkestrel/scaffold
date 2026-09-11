# Terminal preservation and Shape correction report

## Outcome

The bounded correction is complete at baseline `0b01536068f396c9c5e92f5fca93a107d598f201`. The Terminal checkout remains dirty for independent review. This report is implementation evidence, not acceptance.

## Exact correction

`tests/guides.test.ts` now preserves the predecessor behavior through the native Guide entry:

- `MODULES` resolves `@orkestrel/terminal`, `@src/core`, and `@src/server`. The predecessor-absent `@orkestrel/terminal/server` mapping is removed.
- `createSourceManager`, `extractFenceImports`, `findMissing`, `isExternalLink`, and `resolveLink` restore encountered import, relative-link, and test-link traversal against the joined `guide` and `source` rows.
- The predecessor-absent `report.sections`, `report.imports`, `report.links`, and `report.tests` assertions are removed.
- `report.methods` and the existing title, pitch, fence, drift, function-example, method-example, input, barrel, hidden-declaration, and package behavior assertions remain.
- The restored checks compare unfiltered diagnostic values. They add no empty-population assertion.

`guides/terminal.md` now documents the declaration-derived fixed-key shapes:

- `PROMPT_ICONS` names readonly `question`, `pointer`, `dot`, `selected`, `checked`, and `unchecked` string properties.
- `SSE_EVENTS` names readonly `pending`, `expire`, and `destroy` string properties.

The declarations remain unchanged in `src/core/constants.ts`. Every other guide Shape value and all guide prose remain semantically unchanged. Formatter alignment changed whitespace within the affected Surface table.

No source file changed in this correction. The reviewed source-comment edits already present in the dirty checkout remain untouched.

## Scoped evidence

The direct native command exited `0`:

```text
node --experimental-strip-types tests/guides.test.ts
```

Vitest reported every collected guide test passing in `1.06s`.

The owned-path formatter check exited `0`:

```text
npx --no-install oxfmt --check guides/terminal.md tests/guides.test.ts
```

It reported that all matched files use the correct format.

The owned test lint check exited `0`:

```text
npx --no-install oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts
```

The owned diff whitespace check exited `0`:

```text
git diff --check -- guides/terminal.md tests/guides.test.ts
```

The report formatter check also exited `0`:

```text
npx --no-install oxfmt --check C:\Users\mikes\WebstormProjects\scaffold\tmp\units\d7n-terminal-preservation-shape-fix-report.md
```

The frozen pre-correction native command was already green, so no failing total existed. Independent preservation and Shape review supplied the red finding: aggregate native reports had strengthened predecessor behavior, and the two constant rows had widened fixed declarations to arbitrary records.

No install, build, full gate, full suite, commit, ref update, push, publication, source edit, or secret access occurred. No shared-file patch is required.
