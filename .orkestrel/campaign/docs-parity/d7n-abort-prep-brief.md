# Brief — A.1 `d7n-abort-prep` (the pilot's prep: the tip's repair, the drop-in's adaptation, the voice site, the bump)

## Role and engine

`builder` on Sonnet: a fully specified unit. Sole writer in `/home/user/fleet/abort` (branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `864415f`, clean). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command (`checkout`, `restore`, `stash`, `reset`, `clean`); undo an edit by editing.

## Objective

abort's checkout carries scaffold's vendored delta and the seed from the extracted tip, its drop-in suite compiles and passes against the `0.0.18` readers, the one voice-rule site is fixed, and `version` is bumped, so the converge unit starts from a green baseline with the seed's worklist recorded.

## Standing conditions, taken before this dispatch

- The Orchestrator installed `@orkestrel/guide@0.0.18` (packed at the guide's `c25c689`) into `node_modules` with `--no-save` (`instruments/d7/a1/head-start-abort.log.txt`); `package.json` still declares `^0.0.17` and stays so in this unit (the registry serves no `0.0.18` yet; the re-pin lands after the release). Do not run `npm install` or `npm ci`.
- Scaffold's tip is extracted at `/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/p18/scaffold-tip/package`; its CLI is `node <that path>/dist/bin/main.js`. P19 ran the same steps in a scratch clone of this checkout and read: `repair --offline` writes `.oxlintrc.json`, `configs/helpers.ts`, `configs/policy.ts`, `package.json` (the `docs` script row), `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, `tsconfig.json` (the `"@orkestrel/abort": ["./src/core/index.ts"]` paths entry), and `scripts/docs.ts`; `npm run docs` then reads `rows read: 1, disagreements found: 9` (exit 1, the converge unit's worklist); `npm run check` reads `tests/guides.test.ts(138,28): Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'`; `npx oxlint --config .oxlintrc.json --deny-warnings .` reads one diagnostic at `tests/src/core/Abort.test.ts:108` (`just`); `test:guides` reads `5 failed | 17 passed` on the record shapes.
- The `0.0.18` readers return records: `guide.methods()` groups carry `methods: readonly MethodEntry[]` (each with `name`), `source.methods(name)` returns `readonly MethodEntry[]`, `source.examples()` and `source.examples(name)` return `readonly SourceExample[]` (each with `name`). `findMissing` and `findUnexampled` take names. Scaffold's own suite shows the adaptation at `/home/user/scaffold/tests/guides.test.ts:123-151`.
- `npm run format` after editing; the acceptance gate is `format:check`. The vendored voice rule reads every doc block and comment after `repair`.

## Items

1. **`repair --offline`.** Run `node <tip>/dist/bin/main.js repair --offline` in the checkout; record its summary line and `git status --short` after (expected: the P19 list exactly).
2. **The drop-in's adaptation** (`tests/guides.test.ts`), each an exact edit:
   - `:94` `const members = source.methods(group.interface)` → `const members = source.methods(group.interface).map((method) => method.name)`.
   - `:98` stays (`group.methods.length`).
   - `:101` `findMissing(members, group.methods)` → `findMissing(members, group.methods.map((method) => method.name))`; `:104` `findMissing(group.methods, members)` → `findMissing(group.methods.map((method) => method.name), members)`.
   - `:108` `findMissing(source.methods(entity), group.methods)` → `findMissing(source.methods(entity).map((method) => method.name), group.methods.map((method) => method.name))`.
   - `:123` `findUnexampled(names, fences, source.examples())` → `findUnexampled(names, fences, source.examples().map((example) => example.name))`.
   - `:135-138`: the `examples` binding maps each record to its name — `source.examples(group.interface).map((example) => example.name)` and the concatenation the same way — and `findUnexampled(group.methods, fences, examples)` → `findUnexampled(group.methods.map((method) => method.name), fences, examples)`.
   Where a mapping repeats inside one `describe`, bind it once to a `const` with a one-word name and reuse it; no other change to the suite.
3. **The voice site.** `tests/src/core/Abort.test.ts:108`: replace `not just a pair` with `not a pair`.
4. **The bump.** `package.json:3` `"version": "0.0.9"` → `"version": "0.0.10"`. The lockfile's root version lands with the Orchestrator's lockfile-only install after this unit; do not edit `package-lock.json`.

## Scope

Owned: the paths `repair --offline` writes, `tests/guides.test.ts` (the sites above), `tests/src/core/Abort.test.ts:108`, `package.json:3`. Off-limits: everything else, including `guides/**`, `README.md`, `src/**`, `package-lock.json`, `node_modules`.

## Acceptance criteria, cheapest first

1. `git status --short` lists the P19 repair list plus `tests/guides.test.ts`, `tests/src/core/Abort.test.ts`, and nothing else.
2. `npm run format:check`, `npx oxlint --config .oxlintrc.json --deny-warnings .`, `npm run check` exit 0.
3. `npm run test:guides` exit 0 with `22 passed`; `npm run test:policy` and `npm run test:config` exit 0.
4. `npm run docs` reads `rows read: 1, disagreements found: 9` and exits 1 (expected; the worklist), reported verbatim with every line it prints.

## Output

`/home/user/scaffold/tmp/units/d7n-abort-prep-report.md`: per item the hunk, per criterion the command and its last lines, the `docs` worklist verbatim. No count in prose. No process diary.

## Deviation contract

Stop and report if `repair` writes a path outside the P19 list, if a before-text is not found verbatim, or if a gate other than `docs` reads red after the items.
