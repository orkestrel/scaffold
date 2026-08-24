## PD3 report

Baseline: `c342227 Recover the runtime warm and share the stage fault door`

### Mechanism

`RuntimeStage` records:

- `#loads`: module IDs that reached probe’s Vite loader.
- `#reads`: normalized overlay paths whose bytes the loader returned.

After each run, importer reachability identifies covered modules used by the generated specification. A missed overlay reports:

- `workspace` when the target configuration served the module before probe’s loader.
- `instrument` when probe’s loader received the module ID but failed to resolve overlay bytes.

Lookup strips at the first `?`. `?raw` retains its default-export behavior using the overlaid text.

Bare specifiers remain with Vite’s resolver. Probe overlays them only after Vite resolves an existing covered file. TypeScript overlays the declared test path; runtime executes a generated sibling and overlays candidate files only.

### Red and green records

Query pin:

```text
npm run test:src:server -- tests/src/server/stages/RuntimeStage.test.ts -t "serves candidate bytes through every query"
```

- Red: exit 1; 1 failed. `?raw&source=candidate` returned disk bytes.
- Green: exit 0; 1 passed.

Serve-detection pin:

```text
npm run test:src:server -- tests/src/server/stages/RuntimeStage.test.ts -t "reports when workspace configuration serves a covered module before the overlay"
```

- Red: exit 1; 1 failed. The missed overlay produced no issue.
- Green: exit 0; 1 passed.

Additional scoped reading:

```text
npm run test:src:server -- tests/src/server/stages/RuntimeStage.test.ts
```

Exit 0; 38 passed.

Acceptance gates:

```text
npx oxfmt --config .oxfmtrc.json --check src/server/stages/RuntimeStage.ts tests/src/server/stages/RuntimeStage.test.ts
npx oxlint --config .oxlintrc.json --deny-warnings src/server/stages/RuntimeStage.ts tests/src/server/stages/RuntimeStage.test.ts
npm run check:src:server
git diff --check
```

All exited 0.

### Files changed

```text
 src/server/stages/RuntimeStage.ts            | 107 ++++++++++++++++++++++-----
 tests/src/server/stages/RuntimeStage.test.ts |  42 ++++++++++-
 2 files changed, 129 insertions(+), 20 deletions(-)
```

No guide or public type file changed.

### Working tree

```text
 M src/server/stages/RuntimeStage.ts
 M tests/src/server/stages/RuntimeStage.test.ts
```

### Host observations

The scoped Vitest commands ran without spawn denial. The full suite was not run, as required. The Orchestrator must take that host reading after this unit exits. If it exposes a false finding, a successor must demote serve detection to recording-only.

### Deviations

None.