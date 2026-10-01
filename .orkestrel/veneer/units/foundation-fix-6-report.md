Foundation-fix-6 implements the shared order statement, the forwarded `$layered` switch, and the `layer`/`unlayer` mixins. The specified fixture proofs and scoped gates pass. Independent acceptance remains with the Orchestrator.

Files changed:

- `src/bootstrap/_tokens.scss`, `_mixins.scss`, `_reset.scss`, and `index.scss`.
- Every SCSS partial under `src/bootstrap/components/`, `src/bootstrap/elements/`, and `src/bootstrap/utilities/`, except their unchanged `_index.scss` barrels.
- `src/tailwindcss/_tokens.scss` and `src/styles/_tokens.scss`.
- `tests/fixtures/bootstrap/_sample.scss`, `layered.scss`, and `dropin.scss`.
- `tests/src/bootstrap/index.test.ts`, `tests/src/tailwindcss/index.test.ts`, `tests/src/styles/index.test.ts`, and `tests/conformance.test.ts`.
- `tmp/units/foundation-fix-6-report.md`.

Existing campaign changes were preserved. This unit edited no shared helpers, configuration, guides, roadmap, or scaffold files.

Run these commands from `C:/Users/mikes/WebstormProjects/veneer`, in order. Each face test command includes its face build.

```powershell
git status --porcelain
git diff
npx oxfmt --config .oxfmtrc.json --check 'src/bootstrap/**/*.scss' src/tailwindcss/_tokens.scss src/styles/_tokens.scss 'tests/fixtures/bootstrap/*.scss' tests/src/bootstrap/index.test.ts tests/src/tailwindcss/index.test.ts tests/src/styles/index.test.ts tests/conformance.test.ts
npx oxlint --config .oxlintrc.json tests/src/bootstrap/index.test.ts tests/src/tailwindcss/index.test.ts tests/src/styles/index.test.ts tests/conformance.test.ts
npm run test:src:bootstrap
npm run test:src:tailwindcss
npm run test:src:styles
npm run test:conformance
npm run test:setup
npm run test:setup:browser
git status --porcelain
```

Expected test counts match the final local runs on 2026-09-30:

| Project | Passed | Todo | Total | Exit |
| --- | ---: | ---: | ---: | ---: |
| `src:bootstrap` | 6 | 1 | 7 | 0 |
| `src:tailwindcss` | 1 | 0 | 1 | 0 |
| `src:styles` | 1 | 1 | 2 | 0 |
| `conformance` | 5 | 1 | 6 | 0 |
| `setup` | 11 | 0 | 11 | 0 |
| `setup:browser` | 7 | 0 | 7 | 0 |

Scoped formatting and lint exited 0. Existing roadmap todos remain. The placement predicate accepts the built sheet and real layered fixture, rejects the planted layered important declaration, and verifies media context and declaration order. The source check rejects planted literal importance and layer syntax through the same check used on the source population. Link 2 remains green.

The `@forward` finding: `@forward 'tokens' show $layered;` emits the order statement exactly once and first. No additional `@use 'tokens'` is needed in the barrel. Sass accepts the conditional order statement; the drop-in fixture emits no layer syntax and keeps its important declarations in place.

Deviations from the prescribed implementation: none. No missing-helper or unowned-edit stop condition occurred.

Additional finding: a broader fixture with a normal declaration after `unlayer` on the same selector did not preserve that declaration's textual position. Expected: color, lifted opacity, then layered margin. Found: layered color and margin, then lifted opacity. Evidence: the initial `npm run test:src:bootstrap` run reported 2 failed, 4 passed, and 1 todo. Hypothesis: Sass groups the selector's normal declarations before emitting the lifted rule. The prescribed mixin remains unchanged; the final fixture puts its following normal declaration on a separate `.after` selector. The required fixture cases pass, but arbitrary same-selector interleaving remains unproved and the observed counterexample is unresolved.

Build observation: `dist/src/bootstrap/index.css` measured 2229 bytes before this unit and 2316 bytes after its build, an increase of 87 bytes from replacing the order statement.
