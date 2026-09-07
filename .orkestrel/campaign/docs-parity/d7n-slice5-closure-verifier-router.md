Lane held: verifier router

Command 1 (`git rev-parse --short HEAD && git status --short`) — exit 0. `699ec66`, matching the brief's recorded tip; `git status --short` empty (clean tree).

Command 2 (`node -p ... @orkestrel/guide version`) — exit 0. `0.0.18`, matching the brief's recorded head start.

Command 3 (`npm run format:check`) — exit 0. `All matched files use the correct format. Finished in 4594ms on 74 files using 4 threads.`

Command 4 (`npm run lint:check`) — exit 0. No output beyond the command banner (no violations).

Command 5 (`npm run check`) — exit 0. `tsc --noEmit` across root, core, browser, server projects, no diagnostics.

Command 6 (`npm run build`) — exit 0. Core/browser/server bundles built; only the informational API Extractor notice about the bundled TypeScript version (5.9.3) versus the project's TypeScript version (6.0.3), no errors.

Command 7 (`npm run docs`) — exit 0. `rows read: 1, disagreements found: 0`, matching the brief's expectation.

Command 8 (`PATH=/opt/npm11/bin:$PATH npm test`) — exit 0. Per-project totals:
- `test:src` (core/browser/server vitest projects): 13 files, 265 tests passed.
- `test:policy`: 1 file, 90 passed, 1 skipped (91 total).
- `test:config`: 1 file, 172 passed, 1 skipped (173 total).
- `test:setup`: 3 files, 9 passed.
- `test:guides`: 1 file, 48 passed.

No project named `src:browser` in this checkout's vitest configuration drives an actual Chromium browser; it is a vitest project name run in the default (Node) environment. No timing red observed on any project.

Command 9 (`test:distribution`, declared in the manifest) — `PATH=/opt/npm11/bin:$PATH npm run test:distribution` — exit 0. 1 file, 11 passed, 4 skipped (15 total).

GATES: GREEN
