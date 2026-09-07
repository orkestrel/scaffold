# Brief — U4 `d7-guide-links` (the compared form of a `{@link}` drops the module part of its target)

## Role and engine

`implementer` on Claude Opus 5. Sole writer in `/home/user/fleet/guide` (branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `c86f7fd`, clean; `@orkestrel/scaffold@0.0.63` installed; version `0.0.18`, unreleased). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing. Read `/home/user/scaffold/AGENTS.md`, `.claude/rules/documentation.md` § Parity, `.claude/rules/tests.md`, and `/home/user/fleet/guide/guides/guide.md` § The compared form (or the section that owns `normalizeSummary`'s description) first.

## Objective

`normalizeSummary` (`src/core/helpers.ts:1716`) renders a `{@link}` tag as the code token of its target's declaration, with the module part of a declaration reference dropped, so a description paragraph can keep a cross-file link and still equal its guide cell. Today `{@link import('./errors.js').SSEError}` renders as `` `import('./errors.js').SSEError` ``, and sse's converge unit had to flatten every such link into a plain code span to converge (`/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-sse-converge-report.md:196`).

## What is fixed

- The compared token of a `{@link target}` and of a `{@link target | text}` is unchanged where the target carries no module part. Where the target is TypeScript's inline import form `import('<specifier>').Name` or `import('<specifier>').Owner.member`, the token is the part after the closing parenthesis and its dot (`SSEError`, `Owner.member`). Where the target is TSDoc's declaration reference `<package>#Name` (a package or module part, then `#`), the token is the part after `#`. A `Owner.member` target without a module part stays `Owner.member`. The `| text` form still renders its text.
- Red-first: add the cases to `tests/src/core/helpers.test.ts` beside `normalizeSummary`'s existing cases (the inline import form with a relative specifier, with a package specifier, with a member; the `#` form; the `| text` form over a module-qualified target; the unchanged plain form), record them red, then implement.
- `normalizeSummary`'s doc block: the description paragraph states the rendering including the dropped module part; its `@example` gains the module-qualified case. The `## Surface` row that carries it in `guides/guide.md` converges through `npm run docs -- --to guide` after `npm run build` (the guide's seed resolves the built readers here — P19's rule that no build is needed holds in fleet checkouts only). The guide's prose that states the compared form (search `code token` in `guides/guide.md`) gains the module-part sentence; `README.md` carries no such sentence unless you find one.
- `findDrift` and `replaceCell` need no change; verify with one round-trip case in `tests/src/core/helpers.test.ts` (a source block carrying `{@link import('./x.js').Widget}` against a cell carrying `` `Widget` `` reads as no drift).
- The version stays `0.0.18` (unreleased); `package.json` and the lockfile are untouched.

## Scope

Owned: `src/core/helpers.ts` (`normalizeSummary` and its doc block only), `tests/src/core/helpers.test.ts`, `guides/guide.md` (the compared-form prose and the converged cell), `README.md` only if it states the compared form. Off-limits: everything else, including `src/core/types.ts`, every vendored file, `package.json`, `package-lock.json`.

## Acceptance criteria, cheapest first

1. The new cases recorded red before the change (the command and the failing lines), then green.
2. `npx oxfmt --check <owned paths>`, `npx oxlint --config .oxlintrc.json --deny-warnings <owned paths>`, `npm run check` exit 0.
3. `npm run build` then `npm run docs` exit 0 at a non-zero `rows read` and `disagreements found: 0`.
4. `npm run test:src:core`, `npm run test:guides`, `npm run test:policy` exit 0 (record the summaries).
5. `git status --short` lists owned files only (plus `dist/**` if it is tracked — it is not; confirm).

## Output

`/home/user/scaffold/tmp/units/d7-guide-links-report.md`: the hunks, per criterion the command and its last lines, the wall clock. No count in prose. No process diary.

## Deviation contract

Stop on: a target form the rule above does not cover that the guide's own doc blocks use; a `findDrift` round trip that still reports a drift after the change; a gate outside the owned files going red.
