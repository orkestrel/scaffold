## Fix round 1

Closed the round-1 objective lane's refutation of claim 4 by adding and rewriting rows in
§ Sweeps and § Failing-first controls.

- Added the `readProperty(s|ed|ing)?` row, ruling the `guides/test.md` hits as the vendored
  `@orkestrel/test` mirror's own export, outside this package's population.
- Added the `readonly text: string; readonly language: string` and
  `readonly base64: string; readonly mime: BinaryMIME` rows, ruling `src/core/types.ts:7-16` as
  the named `TextContent` and `BinaryContent` arms.
- Added the `defaults to an in-memory driver` and `controls case sensitivity` rows.
- Added the `createDatabaseWorkspaceStore\(\)` row, ruling `src/core/factories.ts:126` as the
  factory's own `@example` and confirming `src/core/workspaces/stores/DatabaseWorkspaceStore.ts`
  carries no hit.
- Replaced the `function range` row with the `\brange\s*\(`, `function range\b`, and
  `const range\b` rows, each returning no match over `{src,tests,guides}` and `README.md`.
- Rewrote the `npm run test:setup` row's Red cell to state that obj-1's failing-first proof is
  the stores control in the preceding row and that this run is a green-only observation.
