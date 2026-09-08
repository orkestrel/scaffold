# Brief — `d7n-test-examples` (test: an example for every Surface function, and the retired `alone` row)

## Role and engine

`implementer` on Claude Opus 5. Sole writer in `/home/user/fleet/test` from the committed tip `997499c` (clean; the final guide tarball `0.0.18` installed `--no-save`). Perform the assignment directly and spawn nothing. Do not commit, install, or run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; undo an edit by editing. Put every instrument under `tmp/d7n-test-examples/` inside this checkout.

## Read first

`/home/user/scaffold/AGENTS.md` § Writing and § Non-negotiable rules; `/home/user/scaffold/.claude/rules/typescript.md` § TSDoc; `/home/user/scaffold/.orkestrel/campaign/docs-parity/rulings.md` § Ruling 14, § Ruling 15, § Ruling 27; `/home/user/fleet/test/tests/guides.test.ts` (the case `documents an example for every Surface function` and the `findUnexampled` call that feeds it); `/home/user/fleet/test/node_modules/@orkestrel/guide/dist/src/core/index.d.ts` for `findUnexampled` (a Surface function is exampled by a `ts` fence in its guide that mentions its name, or by an `@example` block on its own declaration); `/home/user/fleet/abort/src/core/helpers.ts` (untitled `@example` blocks on helper declarations, the pilot's form).

## The defect

The closing unit converged the drop-in on the pilot's bytes, which carries the case `documents an example for every Surface function`; the guide's fences and the source's `@example` blocks reach no example for `isRecorderMapComplete`, `checkBounds`, `buildRetryExhausted`, `dropRegistration`, `decodeJSONLines`, `requireContained`, `isExcluded`, `readIdentity`, `matchesIdentity`, `readErrorCode`, `createLink`, `removeTree`, `isRunning`, `waitForSocketClose`, `supportsDirectoryLinks`, `supportsMode`, `supportsCase`, and `supportsBytes` (declared under `src/core/helpers.ts`, `src/core/validators.ts`, and `src/server/helpers.ts`), so `npm run test:guides` reads `1 failed | 94 passed (95)` at that case. Reproduce it first: record the command and its failing line.

## The unit

1. Give each of those declarations one untitled `@example` block in its own doc comment, demonstrating a real call with its result named in a trailing comment, importing the published specifier (`@orkestrel/test` or `@orkestrel/test/server` as the face requires). Each example is true of the code: read the declaration and its tests under `tests/src/**` before writing it, and settle any reading you are unsure of by running it under `tmp/probe/` (the `probe` Vitest project) then deleting the probe. Where a function is better shown in the guide's own prose than in an isolated block (a helper the guide already narrates), add the demonstration as a `ts` fence under a heading in `guides/test.md` instead, with a lead-in sentence (Ruling 21) — but prefer the doc-block form, and keep every block untitled so the titled pair is unchanged.
2. `guides/test.md:119`: `EventSourceInterface`'s `Shape` cell reads `{} plus on` (Ruling 27's second bullet), replacing the retired `\`on\` alone` device.
3. `npx oxfmt --config .oxfmtrc.json --write <paths>`; `PATH=/opt/npm11/bin:$PATH npm run docs` reads `rows read: 1, disagreements found: 0` and both write directions read `written: 0` (an `@example` block moves no description paragraph, so no cell moves).

## Scope

Owned: the doc blocks under `src/**` (no code token moves), `guides/test.md`. Off-limits: everything else, including `tests/**`, `README.md`, every vendored file, `package.json`, `package-lock.json`.

## Acceptance criteria, cheapest first

1. `git status --short` lists owned files only; `git diff -U0 -- src | grep -E '^[-+]' | grep -vE '^(\+\+\+|---)' | grep -vE '^[-+]\s*(\*|//|/\*\*)'` prints nothing.
2. `grep -c "{} plus on" guides/test.md` reads 1 and `grep -c '\`on\` alone' guides/test.md` reads 0; `grep -c '@example [A-Za-z]' src/core/helpers.ts src/core/validators.ts src/server/helpers.ts` reads 0 for each file (every added block untitled).
3. `npx oxfmt --config .oxfmtrc.json --check guides/test.md src` and `npx oxlint --config .oxlintrc.json --deny-warnings src` exit 0; `PATH=/opt/npm11/bin:$PATH npm run check` exits 0.
4. `npm run docs` at zero; both directions `written: 0`.
5. `PATH=/opt/npm11/bin:$PATH npm run test:guides` exits 0 with the examples case green (record the summary, and the red reading taken first); `npm run test:policy` exits 0.

## Output

`/home/user/scaffold/tmp/units/d7n-test-examples-report.md`: the red-first reading, per declaration the block added (or the fence, with its heading), per criterion the exact command and its last lines. No process diary. No count in prose.

## Deviation contract

Stop if a declaration's behaviour cannot be demonstrated truthfully in a short block (name it and what you found), or if a gate outside the owned files goes red. Decide the examples' wording yourself and record any reading you settled by probe.
