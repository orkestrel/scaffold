## Per-claim verdicts

1. **CONFIRMED.** `tests/config.test.ts:72` defines `published` as `existsSync(resolve(root, 'src'))`. Lines 2164–2172 guard the scope case with `it.skipIf(!published)` and retain the exact `The workspace declares no face project` throw.

2. **CONFIRMED.** When `src` exists, the case runs. Lines 2168–2172 search only `configs/src/tsconfig.{core,browser,server}.json` and throw when no wrapper exists.

3. **CONFIRMED.** The unconditional case at `tests/config.test.ts:2217-2293` exercises the named `parseProjectScope`, `isStringList`, `buildExtractorOverride`, `packageManifestName`, `rewriteCoreSpecifier`, and `isExtractorModule` helpers. Its inputs do not depend on a `src` environment.

4. **CONFIRMED.** `.orkestrel/scaffold/d1-skipreport.log.txt:16-19` records `172 passed | 2 skipped (174)` in the app-only workspace. The file contains conditional skips only at `tests/config.test.ts:2164`, `2297`, `2302`, and `2310`. In this checkout, `src` exists and `@microsoft/api-extractor` resolves, leaving `173 passed | 1 skipped (174)`. The app-only run therefore has an added skip and no added pass.

5. **CONFIRMED.** `tests/distribution.test.ts:1101-1110` invokes the generated manifest’s declared `test` script. `.orkestrel/scaffold/d1-red.log.txt:45-52` shows that script expanding through `test:app`, `test:policy`, and `test:config`; lines 56–64 show the vendored generated-workspace file throwing.

6. **CONFIRMED.** `tests/distribution.test.ts:1086-1100` reads the generated manifest and asserts that `prepublishOnly` is absent. An emitted value would fail line 1100 before the gate loop.

7. **REFUTED.** The assertions, environment, install flags, order, and cleanup of the core/server case remain intact, but its behavior is not exact. `53d4a58e:tests/distribution.test.ts:933` emitted `The generated proof blueprint was blocked`; `tests/distribution.test.ts:201` emits `The generated blueprint was blocked`. The extracted pack and install assertions also add child output to their failure messages at lines 154 and 168. No prior assertion was dropped or weakened; the refutation is limited to observable failure diagnostics.

8. **CONFIRMED.** SHA-256 reads produced the same value for `tests/config.test.ts` and `dist/host/tests/config.test.ts`: `ca623ae1a20daafacfd9332196c03e957f5200e6441c7e249f7024495755f11f`. `host.json:1035-1040` carries that value. An independent SHA-256 computation over the projected manifest membership reproduced the declared digest at `host.json:2014`: `ec210fc08b9733ab2563e1fb31158fab176314e0f93b653b75f8b098d47d3cf8`.

9. **UNSETTLED.** The recorded failure itself is genuine. `.orkestrel/scaffold/d1-red.log.txt:1-2` identifies the command, lines 15 and 56–64 locate the throw in the generated workspace, and lines 87–92 record exit code `1`. The retained evidence does not prove that the source fix was absent when the command ran: `npm pack` reads staged `dist/host` bytes, so stale built bytes could produce the same red after a source edit. No retained journal or source snapshot settles that chronology. The blocked `npm run test:distribution -- -t "app-only workspace through its gates"` command was not rerun.

10. **CONFIRMED.** Inspection of every added patch line found no `any` type, type assertion, non-null assertion, `@ts-nocheck`, `@ts-ignore`, `@ts-expect-error`, or lint-suppression comment. `expect.any(String)` at `tests/distribution.test.ts:1102` is a Vitest matcher, not the TypeScript `any` type.

11. **CONFIRMED.** `git diff --name-only` reports only `host.json`, `tests/config.test.ts`, and `tests/distribution.test.ts`. `package.json` remains at `0.0.72`, matching `53d4a58e`. `git status --short --untracked-files=all` also lists the untracked `.orkestrel/scaffold/d1-*` audit records; those are retained evidence rather than package changes.

## Hazard rulings

- **The skip condition’s shape — finding F-1.** Empty `src` directories and `src` directories containing no recognized environment make `published` true, then reach the face-project throw. That reading conflicts with the repository’s definition: `src/bin/helpers.ts:899-903` derives the axis from physical `src/core`, `src/browser`, or `src/server` directories, and `src/core/compilers.ts:278` defines publishing as `blueprint.src.length > 0`. `existsSync` also accepts a regular file: the read-only control reported `package.json: exists=true, directory=false`. On this case-insensitive Windows host, `SRC` also resolves as present. The predicate therefore varies by host spelling and mistakes unrelated, empty, or non-directory entries for a published environment.

- **Collection-time evaluation — no finding.** `tests/config.test.ts:64` derives `root` from that module’s own `import.meta.url`. Each generated workspace launches its own Vitest process, as shown by the generated root at `.orkestrel/scaffold/d1-red.log.txt:15`. Collection therefore evaluates the generated copy against the generated workspace, not against the parent checkout.

- **The count change — no repository finding.** Searches outside `tmp/`, `.orkestrel/`, `dist/`, and `node_modules/` found no reference to the prior case name or the prior `config` total. The replacement names occur only at `tests/config.test.ts:2164` and `2217`. An external exact-name selector remains an unmeasured release consequence.

- **The helper extraction — claim 7’s diagnostic refutation and finding F-2.** The pre-existing assertions retain their order and conditions. The helpers preserve `--ignore-scripts`, `--no-audit`, `--no-fund`, the npm environment, self-pin check, lockfile check, and `prepublishOnly` invocation. The changed blocked-plan message prevents exact behavioral equivalence. Separately, the helpers violate the test-infrastructure placement contract.

- **Vendored-surface consequences — no additional behavioral finding.** `guides/scaffold.md:1070-1078` states that `tests/config.test.ts` is content-owned, so the next `repair` replaces an older or missing copy with these bytes. Standard project gates have no repository pin to the earlier name or total. The unconditional helper case can expose a genuine target-specific helper failure that the prior early throw concealed; the retained app-only gate run finished green.

- **Coverage honesty of the chosen blueprint — adequate for this defect, bounded from browser-specific behavior.** The old defect depends only on the absence of the `src` axis. The `app: ['core', 'server']` blueprint exercises that population and the red log proves it reached the vendored failure. An `app: ['browser']` workspace would take the same `!published` branch, so reintroducing the unconditional face walk would fail this proof. The case does not prove browser dependency installation or browser gates.

- **The skip as a permanent hole — no finding.** App-only workspaces intentionally do not run the scope reading. The scope proof remains at `tests/config.test.ts:2164-2211`. This checkout and the generated core/server prepublish case at `tests/distribution.test.ts:968-1054` supply publishing workspaces where that case applies. This read-only audit could not execute their final gate because Vitest attempted to write `node_modules/.vite-temp`, and the distribution command is blocked by the stated sandbox limit.

## Findings beyond the claims

- **F-1 — HIGH: `published` does not represent the repository’s publishing predicate.** `tests/config.test.ts:72` accepts any filesystem entry named `src`, while the workspace model requires a recognized physical source environment. A private workspace carrying an empty, unrelated, regular-file, or case-folded `src` entry can still fail with `The workspace declares no face project`. Derive applicability from recognized physical source environments while continuing to test a missing `configs/src` wrapper.

- **F-2 — MEDIUM: shared install scenarios remain hidden in a test file.** `tests/distribution.test.ts:143-266` declares the nontrivial, reused `installPackedScaffold` and `installGeneratedWorkspace` helpers locally. `AGENTS.md` requires reusable logic to be exported from its centralized home, and `.claude/rules/tests.md` requires test files to import shared infrastructure rather than declare local fixture or scenario helpers. Split setup mechanics into exported server test infrastructure and retain assertions in the distribution cases.

- **F-3 — LOW: added comments use prohibited developer prose.** Added comments use `here` at `tests/config.test.ts:2213` and `tests/distribution.test.ts:142`, `179`, `181`, `1060`, `1071`, and `1098`. `.claude/rules/writing.md` prohibits that word as an ambiguous reference. Name the file, proof, install, or assertion instead.

VERDICT: REJECT