# Brief — `d7n-scaffold-config-face-2` (successor of `d7n-scaffold-config-face-brief.md`: the expected root is the committed project's own `rootDir`)

## What changed from the superseded brief and why

The first round's report (`tmp/units/d7n-scaffold-config-face-report.md`) landed the face walk, the derived project path, and the reworded errors, and stopped on the root assertion: a single-face target commits `"rootDir": "../../src"` (`/home/user/fleet/sqlite/configs/src/tsconfig.server.json`), not `src/<face>`, so `resolve(root, 'src/<face>')` reds the case there. Ruling: the committed project is the second mechanism the compiler's reading is compared against, the way the case already compares `lib` and `types` against the declared options. The expected root is the declared `compilerOptions.rootDir` resolved against the project file's directory. Everything else in the superseded brief stands: role, scope, the scratch-copy proof, the deviation contract.

## Role and engine

`builder` on Sonnet. Sole writer of `tests/config.test.ts` in `/home/user/scaffold` and of the scratch copy at `/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/p24-sqlite-config` (already present from the first round; reuse it). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing.

## Items

1. In the case at `tests/config.test.ts:2139-2201`, keep the first round's walk and errors, and replace the root assertion: read `rootDir` from `declaredOptions` with `Object.getOwnPropertyDescriptor(declaredOptions, 'rootDir')?.value`, throw `The ${face} project declares no rootDir` when it is not a string, bind `const expectedRoot = resolve(dirname(project), declaredRootDir)`, and assert `expect(scope.root).toBe(expectedRoot)`. `dirname` is already imported from `node:path`. Change nothing else.
2. Copy the edited file over the scratch copy's `tests/config.test.ts` and run `npm run test:config` there; record the summary line and exit code. Then run `npm run test:config` in `/home/user/scaffold`; the `keeps the committed host inventory aligned with the vendored checkout bytes` case reds there because this vendored file's digest moved — that is expected, the Orchestrator regenerates the inventory after you exit; record it as such and stop counting it as a failure of yours.

## Acceptance criteria, cheapest first

1. `git status --short` in `/home/user/scaffold` lists `tests/config.test.ts` and nothing you wrote.
2. `npm run format:check` and `npx oxlint --config .oxlintrc.json --deny-warnings tests/config.test.ts` exit 0.
3. `npm run test:config` in the scratch copy exits 0 with `172 passed | 1 skipped` or the copy's equivalent, the target case green against `rootDir ../../src`.
4. `npm run test:config` in `/home/user/scaffold` reads only the host-inventory case red, and the target case green (record both lines).

## Output

`/home/user/scaffold/tmp/units/d7n-scaffold-config-face-2-report.md`: the hunk of the whole case as it now stands, per criterion the command and its last lines. No count in prose. No process diary.

## Deviation contract

Stop and report if the scratch copy reds on a case other than the host-inventory one, or if the declared `rootDir` is absent in either tree.
