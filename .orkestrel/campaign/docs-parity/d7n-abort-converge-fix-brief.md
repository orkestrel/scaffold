# Brief — A.2-fix `d7n-abort-converge-fix` (the pilot's shape, as every fleet package will copy it)

## Role and engine

`implementer` on Claude Opus 5 — items 1 to 4 and 7 carry prose judgment. Sole writer in `/home/user/fleet/abort` from the committed baseline `41f893b` (clean; `@orkestrel/guide@0.0.18` installed `--no-save`). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing.

## Objective

A.3's findings (`d7n-abort-audit-verdict.md`) land, and the pilot's guide, README, doc blocks, and drop-in take the shape every fleet package copies; `npm run docs` reads `rows read: 1, disagreements found: 0` after every write and the gates are green.

## Read first

`/home/user/scaffold/AGENTS.md` § Non-negotiable rules and § Writing; `.claude/rules/writing.md`; `.claude/rules/documentation.md` § Parity; `rulings.md` § Ruling 7; `d7n-abort-audit-verdict.md` and the subjective lane's F1 to F7 in `d7n-abort-audit-subjective.md` for the reasoning; the reference shapes `/home/user/fleet/guide/guides/guide.md:1-30` and `/home/user/scaffold/tests/guides.test.ts:186-198` (the pin's inline title form).

## Standing conditions

- The seed needs no build here: `npm run docs`, `npm run docs -- --to guide`; the scoped format after every edit and every seed write (`npx oxfmt --config .oxfmtrc.json --write <paths>`); the scoped lint over your owned paths.
- The vendored voice rule reads every doc block (third-person verb opener); the prose sweep reads `guides/abort.md` and `README.md`.
- `package.json` and the lockfile stay untouched.

## Items

1. **The guide's opening paragraph** (`guides/abort.md:7`): remove the clauses the tagline at `:3-5` already carries (the trace `id`, the standard `AbortSignal`, the parent link and the cascade), keeping every fact the tagline does not carry — the cancellable-API hand-off, the fire-on-either rule, "no listener bookkeeping", "Async layers bound their work against a `signal`", "Deliberately thin" with its two `does **not**` sentences, the native observation contract, and the `Source:` link sentence — re-wrapped by hand to its neighbours' width.
2. **The README's opening paragraph** (`README.md:7-10`): rewrite to what a visitor does first — the handle they create, what they hand its `signal` to, and when they pass a parent — without restating the tagline's triple, keeping the `@orkestrel` line sentence; no code token the README's own fences have not introduced by then is required, so name `createAbort` rather than `abort.signal` where a token is needed.
3. **Three description paragraphs, each stating what is distinct** (then `npm run docs -- --to guide` and the scoped format): `createAbort` (`src/core/factories.ts:4-6`) states what it returns and why a caller prefers it to `new Abort` (the validated options, the linked signal); `Abort` (`src/core/Abort.ts:4-6`) states the class's own role (the owning controller behind `AbortInterface`); `AbortInterface` (`src/core/types.ts:15-17`) states the contract's shape (the traceable `id`, the exposed `signal`, `aborted`, and the idempotent `abort`). Keep each verb-first and each a summary; the `@remarks` keep their reference material.
4. **The `Shape` column's one idiom** (`guides/abort.md:55`): `AbortInterface`'s `Shape` cell becomes `` `{ id, signal, aborted, abort }` ``, and one sentence under the Types table's intro (`:50-51`) states the convention: a `Shape` cell lists an interface's property names in braces, and a type alias's value.
5. **The drop-in hoists the name mapping** (`tests/guides.test.ts`): inside `describe(\`${group.interface}\`)`, bind `const documented = group.methods.map((method) => method.name)` beside `members` and use it at the three `findMissing` sites; in the `${group.interface} examples` loop, bind the mapped `examples` once and pass `documented` to `findUnexampled`.
6. **The pin's title filter takes scaffold's inline form** (`tests/guides.test.ts`): delete the `isTitle` predicate and its comment; the pin collects `source.examples()` titles into a `Set` and pairs each `guide.fences()` fence whose `title !== undefined` and is in the set, in the shape `/home/user/scaffold/tests/guides.test.ts:188-198` landed, keeping the both-sides failure line (`${GUIDE_SPEC} pairs: guide [...] source [...]`) with the guide side listing the fence titles that are defined.
7. **The `@remarks` that now repeat their description** (`src/core/helpers.ts:10-13` for `validateAbortOptions`, `:88-92` for `linkSignal`, `src/core/validators.ts:6-9` for `isAbortSignal`): cut the sentence each remark repeats from its description and keep the conditions that remain distinct (the empty-object default, the once-read rule, the born-aborted parent, the `Reflect.apply` brand check).
8. **The reference word** (`guides/abort.md:57`): `(Surface rows, above)` → `(Surface rows, earlier)`.

## Scope

Owned: `guides/abort.md`, `README.md`, `src/core/factories.ts`, `src/core/Abort.ts`, `src/core/types.ts`, `src/core/helpers.ts`, `src/core/validators.ts` (doc blocks only), `tests/guides.test.ts`. Off-limits: everything else.

## Acceptance criteria, cheapest first

1. `git diff --stat` lists the owned files and no other.
2. `npx oxfmt --config .oxfmtrc.json --check <owned>`, `npx oxlint --config .oxlintrc.json --deny-warnings src/core tests`, `npm run check` exit 0.
3. `npm run docs` exits 0 at `rows read: 1, disagreements found: 0`; `npm run docs -- --to guide` and `-- --to source` each read `written: 0`.
4. `npm run test:guides` (25 passed), `npm run test:policy`, `npm run test:src:core` exit 0.
5. The report names each item's hunk and states no count in prose.

## Output

`/home/user/scaffold/tmp/units/d7n-abort-converge-fix-report.md`: per item the hunk, per criterion the command and its last lines. No process diary.

## Deviation contract

Stop and report if a cell the seed writes reads wrong after item 3, if a gate reads red, or if a before-text is not found. Items 1 to 4 and 7 are yours to word and record.
