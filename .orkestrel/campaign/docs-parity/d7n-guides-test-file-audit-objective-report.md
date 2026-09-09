Objective lane held. This is a source-review verdict under the read-only audit constraint.

G1 — BROKEN

Attack: invoke `npm run test:guides -- --to guide` with `VITEST=false` in the environment. [tests/guides.test.ts](C:/Users/mikes/WebstormProjects/scaffold/tests/guides.test.ts:850) treats every defined value as worker mode, so [main](C:/Users/mikes/WebstormProjects/scaffold/tests/guides.test.ts:344) never validates the arguments, rewrites, or starts the public runner. The installed Vitest worker contract supplies the exact value `"true"` at `node_modules/vitest/dist/chunks/cli-api.CnMVyzaz.js:3805`. The fixture deletes inherited `VITEST` at `tests/src/core/compilers.test.ts:2320`, so its command cases cannot catch this state.

Observable failure: the requested guide remains unchanged and registration runs outside an active Vitest worker. This breaks the documented direct command for a reachable environment.

Bounded correction: recognize the exact Vitest worker value rather than mere presence, then add a child-command case carrying `VITEST=false`. Preserve the current argument and no-write controls.

Adjacent behavior held: with `VITEST` absent, invalid arguments return before writes and startup at `tests/guides.test.ts:344-367`. The package and generated manifest point directly at the test file at `package.json:80` and `src/core/compilers.ts:351`.

G2 — BROKEN

Attack: give a surface row the key `function shape`, then title a paired guide fence and source `@example` `function shape`. Keep the summary equal and make only the example bodies differ. The installed `Drift` contract permits the same string as a symbol key or example title at `node_modules/@orkestrel/guide/dist/src/core/index.d.ts:502-511`.

Concrete failure:

- `findDrift` emits the example disagreement with key `function shape`.
- `writeGuide` sees that key in `row.summaries` at `tests/guides.test.ts:175-184` and calls `replaceCell`, corrupting the equal summary while leaving the fence unchanged.
- `writeSource` makes the same key-only choice at `tests/guides.test.ts:205-227` and calls `replaceSummary`, corrupting the description while leaving `@example` unchanged.
- Fresh reporting then fails with newly created summary drift plus the original example drift.

Impact: explicit authority does not replace a valid matched titled example when its title collides with a summary key. It also changes the wrong text.

Bounded correction: carry a local comparison category with every drift occurrence and select replacers and reason keys from that category, never from key membership. Add collision fixtures for `--to guide` and `--to source`. Keep `findDrift` and the existing Guide replacers; no Guide API change is needed.

Adjacent behavior held: non-colliding summary and example rewrites use `replaceCell`, `replaceFence`, `replaceSummary`, and `replaceExample`. Writes accumulate by file, flush changed bytes, reread inventory, then import worker assertions at `tests/guides.test.ts:360-393`. Existing whole-file and overlap cases cover those paths at `tests/src/core/compilers.test.ts:2417-2560`.

G3 — CONFIRMED

Attack: leave unresolved drift while the fixture suite passes; provide an empty project, an unhandled error, or a failing module; inspect close and exit-status handling. Fresh drift raises status before the runner at `tests/guides.test.ts:379-393`. `passedGuides` rejects empty modules, unhandled errors, and any non-passed module at `tests/guides.test.ts:309-315`. The runner closes in `finally` at `tests/guides.test.ts:317-330`, and `raiseExit` preserves stronger numeric status at `tests/guides.test.ts:333-338`. Missing index and guide cases stop before startup at `tests/guides.test.ts:360-368`.

Adjacent correct behavior: pitch disagreement remains report-only mutation-wise and becomes failure status at `tests/guides.test.ts:291-306`.

G4 — CONFIRMED

Attack: search host ownership for the rejected launcher and package-owned test, then inspect no-guides selection and retired-path deletion safeguards. `HOST_PATHS` contains neither path, while `RETIRED_HOST_PATHS` remains `scripts/docs.ts` at `src/core/constants.ts:157`. `blueprintToScripts` gates the command on `blueprint.guides` at `src/core/compilers.ts:350-352`. Retirement enters the snapshot only for its inferred selected group at `src/server/Materializer.ts:637-655`; removal still requires a clean worktree, tracked membership, matching preview bytes, and transaction preconditions at `src/server/Materializer.ts:467-494` and `src/server/Materializer.ts:885-928`. The retained real-Git receipt confirms clean removal and refusal for untracked, dirty, and moved states.

Adjacent correct behavior: unrelated `scripts/custom-guides.mjs` survives the retained retirement cases.

G5 — CONFIRMED

Attack: separate script propagation from host propagation and search the final product for `GUIDES_ENTRY_PATH`, launcher files, replacement commands, and new Guide surface. `GUIDES_TEST_PATH` supplies the generated command at `src/core/compilers.ts:351`. The accepted predecessor remains the released Vitest command at `src/core/compilers.ts:446-459`. Custom values remain outside accepted replacement. No launcher exists under `scripts`, and neither `GUIDES_ENTRY_PATH` nor `scripts/guides.ts` appears in product source.

Adjacent correct behavior: the package-owned test stays outside host artifacts, while guide-free blueprints omit the script.

G6 — CONFIRMED

Attack: compare removed and registered package case names, inspect native-load imports, inspect the command fixture’s working path, and distinguish predecessor evidence from final gates. Existing parity and executable cases remain registered through `registerGuides` at `tests/guides.test.ts:396-848`. The unresolved `@src/core` alias is type-only; runtime aliases load after worker entry. The process fixture uses the actual test file and a scratch prefix containing spaces at `tests/src/core/compilers.test.ts:2290-2302`. Owner pins remain in `package.json:109-113` and generated fixtures. Final ordered gate exits are `0`, and manifest/index preservation records match. No publication claim appears.

Adjacent correct behavior: predecessor launcher evidence is not used as proof of the corrected entry; the final `npm test` log records the direct test-file command and passing guides project.

Findings fitting no claim: none.

Attacked and held: none beyond the attacks stated above.

VERDICT: FAIL G1, G2; outside the claims: none
