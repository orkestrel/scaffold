# Brief — `d7n-scaffold-config-face` (the vendored config test reads the first face a workspace has)

## Role and engine

`builder` on Sonnet: a fully specified unit. Sole writer of `tests/config.test.ts` in `/home/user/scaffold` (branch `claude/orkestrel-npm-audit-deps-14ibta`; the Orchestrator writes only under `.orkestrel/` while you run). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command (`checkout`, `restore`, `stash`, `reset`, `clean`); undo an edit by editing. Read `/home/user/scaffold/AGENTS.md` and `/home/user/scaffold/.claude/rules/tests.md` before editing.

## Objective

The case `reads the compiler scope and fixed extractor override a declaration roll-up requires` in `tests/config.test.ts` (`:2139-2200`) passes in every workspace shape the host vendors it into, not only in one with a `core` face.

## Standing conditions, taken before this dispatch

- The case hardcodes `configs/src/tsconfig.core.json` (`:2141`) and asserts `scope.root` equals `src/core` (`:2170`). `tests/config.test.ts` is vendored into every fleet target through `repair`, and a server-only target has no core project. Measured in `/home/user/fleet/sqlite` (a scratch clone repaired from scaffold's tip; the P.1 report `tmp/units/d7n-sqlite-prep-report.md` § Deviation report):

```text
$ ls /home/user/fleet/sqlite/configs/src/
tsconfig.server.json  vite.server.config.ts
$ npm run test:config   (in sqlite, after repair)
Error: ENOENT: no such file or directory, open '/home/user/fleet/sqlite/configs/src/tsconfig.core.json'
Test Files 1 failed (1) / Tests 1 failed | 171 passed | 1 skipped (173)
```

- Scaffold's own tree carries every face (`configs/src/tsconfig.core.json`, `tsconfig.browser.json`, `tsconfig.server.json`), so the case passes here today; `git log -1 -- tests/config.test.ts` is `20ac28ea`.
- `ENVIRONMENTS` in `src/core/constants.ts:13` is `['core', 'browser', 'server']`; the case imports `configHelpers` from `../configs/helpers.js` and `resolve` from `node:path`; `existsSync` is available from `node:fs` (check the existing `node:fs` import at `:5-15` and extend it rather than adding a second import statement).
- `npm run format` after editing; the acceptance gate is `format:check`. Every fleet target has at least one face.

## Items

1. In the case at `:2139`, replace the hardcoded core project with the first face project the workspace carries: walk `['core', 'browser', 'server']` (the `ENVIRONMENTS` order; import the constant from `../src/core/constants.js` if the file already imports from there, otherwise write the literal list with a comment naming `ENVIRONMENTS` as its source), take the first `face` whose `configs/src/tsconfig.<face>.json` exists, and throw `The workspace declares no face project` when none does. Bind the face once and derive the project path and the expected root (`resolve(root, 'src/<face>')`) from it. Reword the three `The core project …` errors to name the face (`The ${face} project …`). Change nothing else in the case: the `parseProjectScope` refusals, the `--showConfig` failure on an absent project, the `isStringList` checks, and the extractor-override assertion stay as they are.
2. Prove the shape against a server-only tree without touching it: copy `/home/user/fleet/sqlite` to `/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/p24-sqlite-config` with `cp -r` (a scratch copy under the scratchpad, `node_modules` included as the copy carries it or linked with `ln -sfn /home/user/fleet/sqlite/node_modules <copy>/node_modules` if the copy skipped it), copy your edited `tests/config.test.ts` over the scratch copy's `tests/config.test.ts`, run `npm run test:config` there, and record its summary line and exit code. Remove nothing from `/home/user/fleet/sqlite`.

## Scope

Owned: `tests/config.test.ts` (the one case) and the scratch copy under the scratchpad path above. Off-limits: everything else in `/home/user/scaffold`, every fleet checkout, `dist/**`.

## Acceptance criteria, cheapest first

1. `git status --short` in `/home/user/scaffold` lists `tests/config.test.ts` and nothing you wrote (the Orchestrator's `.orkestrel/` records may appear; leave them).
2. `npm run format:check` and `npx oxlint --config .oxlintrc.json --deny-warnings tests/config.test.ts` exit 0.
3. `npm run test:config` in `/home/user/scaffold` exits 0 with the case passing (record the summary line).
4. `npm run test:config` in the scratch copy of sqlite exits 0 with the case passing against `src/server` (record the summary line and the face it resolved, which you can print from a one-off `node -e` or read from the test's own error text on a deliberate failure you then revert).

## Output

`/home/user/scaffold/tmp/units/d7n-scaffold-config-face-report.md`: the hunk, per criterion the command and its last lines, the scratch copy's path. No count in prose. No process diary.

## Deviation contract

Stop and report if the case depends on the core face beyond the project path and the root assertion, if another case in the file reads `tsconfig.core.json` for the same reason, or if the scratch copy's `test:config` reds on a case other than this one.
