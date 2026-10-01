Stopped at the scoped lint gate under the brief’s deviation contract. The registry rewrite and its proofs are written, but verification is incomplete.

Files changed by this unit:

- `src/core/constants.ts`: re-keyed the Bootstrap tree, removed `veneer`, and revised TSDoc.
- `src/core/types.ts`: revised TSDoc only; type declarations retain their names and shapes.
- `tests/src/core/index.test.ts`: updated exports, registry groups, and token assertions.
- `tests/src/bootstrap/index.test.ts`: added the derivation law, mis-keyed control, leaf count, and member floor; retained the two-way pin and its controls.
- `tests/setupServer.ts`: added `collectLeaves`.
- `tests/setupServer.test.ts`: added walker coverage.
- `guides/veneer.md`: updated Surface summaries and flagship examples.
- `tests/guides.test.ts`: updated the example transcription.

Leaf count: the generator read 117 declarations from Bootstrap 5.3.8’s combined root/light-theme block and emitted one leaf per declaration. The test walker’s count is **not measured**: its test was not run after lint stopped execution. The test requires 117 leaves.

Command results:

| Command | Exit code |
| --- | --- |
| `node tmp/probes/foundation-fix-3-generate.ts` | 0 |
| `npx oxfmt --config .oxfmtrc.json --write src/core/constants.ts src/core/types.ts tests/src/core/index.test.ts tests/src/bootstrap/index.test.ts tests/setupServer.ts tests/setupServer.test.ts guides/veneer.md tests/guides.test.ts` | 0 |
| `npm run check:src:core` | 0 |
| `npx oxlint --config .oxlintrc.json src/core tests/src/core tests/src/bootstrap tests/setupServer.ts tests/setupServer.test.ts tests/guides.test.ts` | 1 |
| `npm run test:src:core` | Not run |
| `npm run test:src:bootstrap` | Not run |
| `npm run test:setup` | Not run |
| `npm run build:src:core` | Not run |
| `npm run test:guides` | Not run |
| Scoped `oxfmt --check` | Not run |
| `git status --porcelain` | 0 |
| Scoped `git diff --stat` and `git diff` | 0 |
| `Get-ChildItem -Force tmp/probes` | 0; empty |

Generator: `tmp/probes/foundation-fix-3-generate.ts` read the installed CSS and emitted a patch containing the literal frozen tree. The patch tool applied it. The `secondary.bg` leaf order was adjusted to match declaration order. The generator was deleted with the patch tool; `tmp/probes/` is empty.

Deviations:

- **Lint refusal.** Expected: scoped lint exits 0. Found: `typescript(array-type)` errors at `tests/setupServer.ts:191:47`, `:192:17`, and `:193:16`. Evidence: lint requires `ReadonlyArray<readonly [readonly string[], string]>`, `Array<[readonly string[], unknown]>`, and `Array<readonly [readonly string[], string]>` in place of the tuple-array shorthand. Done: implementation and core typecheck. Not done: annotation repair and remaining gates, because execution stopped under the deviation contract. Hypothesis: applying the diagnostic’s generic array spellings resolves these lint errors.
- **Working-tree status.** Expected: status lists only owned files. Found: the initial status already contained changes outside this unit’s scope; the final status also contains `?? tests/showcase.test.ts`, which this unit did not create. Done: preserved unrelated work and restricted this unit’s edits to owned files and its temporary artifacts. Not done: the clean-scope status criterion. Hypothesis: the checkout is shared with other foundation work.
- **Breakpoint example.** The brief illustrates `breakpoint.xs`, but Bootstrap declares breakpoint tokens in a separate `:root` block at `bootstrap.css:782–789`. The registry follows the explicitly required 117-name combined root/light-theme population and excludes those tokens.

Other deviations: none.
