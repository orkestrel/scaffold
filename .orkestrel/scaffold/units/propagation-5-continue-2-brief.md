# Unit propagation-5, second continuation — rewrite every lookaround pattern the real linter cannot match, then finish the vendored proofs

Fill every section. Write `none` in an empty one.

## Role and engine

`astra` on GPT-6 Astra (`gpt-6-astra`, effort high), reached as `codex exec` from this file brief with a full shell. Executor: BENCH_ENGINE. Perform the whole assignment yourself and spawn nothing. You are the sole writer in `C:/Users/mikes/WebstormProjects/scaffold` for this unit's duration (a guide unit edits `guides/**` and `tests/guides.test.ts` in parallel; never touch those).

## Objective

The two previous runs (reports: `tmp/units/propagation-5-report.md`; briefs: `tmp/units/propagation-5-brief.md` and `propagation-5-continue-brief.md`, whose sections still bind where this brief is silent) anchored the vendored `.oxlintrc.json`'s root override and then found that the `src/vue` and `app/vue` sheet-face refusals never match through the real binary: their patterns use negative lookahead. Lookahead also appears in two pre-existing patterns of every environment block (`^(?!node:)[A-Za-z][A-Za-z0-9+.-]*:` refusing non-Node URL schemes, and `(?:^|/)(?!\.{1,2}(?:/|$))[^/]+/\.{1,2}(?:/|$)` refusing a `..` segment after a path segment; lines 144, 148, 196, 200, 236, 244, 248, 292, 296, 344, 348, 392, 396, 428, 436, 440, 480, 484, 524, 528 of `.oxlintrc.json` on 2026-09-30). Establish through the real binary which of those patterns match, rewrite every one that does not into a form the binary matches with the same refusals and the same admissions, make the real-linter proof report every mismatch in the matrix at once, and then finish the original brief: the face enumerations with their mutation controls, the root setup mirror with its controls, the veneer reading, and the gates.

## Context

- **The engine.** Read `node_modules/oxlint/` for what regex engine `no-restricted-imports` compiles its `regex` patterns with and what `group` (gitignore-style globs, with `!` negation if supported) the schema at `node_modules/oxlint/configuration_schema.json:18929` admits; name what you read. Probe before deciding: a fixture per pattern through the real binary with `--no-ignore`, as `tmp/units/propagation-5-anchor.ts` does.
- **The rewrite's law.** Each rewritten pattern refuses exactly what the original intended and admits exactly what it admitted, proven by a refused fixture and an admitted fixture per pattern through the binary: the scheme refusal refuses `https://host/x` and `data:text/plain,x` and admits `node:fs`; the `..` refusal refuses `../core/../server/index.js`-style imports (a `..` after a named segment) and admits `../core/index.js` and `./index.js`; the sheet refusal refuses `@src/print` and `../print/index.js` from `src/vue`, and `@src/print`, `@app/print`, and `../print/index.js` from `app/vue`, and admits `@src/core`, `@src/browser`, `@app/core` and `@app/browser` (from `app/vue`), and `./index.js`. Prefer `group` globs with negation where the binary honours negation (`!node:*`); otherwise a regex without lookaround that enumerates the admitted names explicitly (`@src/(?:core|browser|vue)` admitted means the refusal matches `@src/` followed by a name that is not one of those: without lookahead, match `@src/[^/?#]+` and exclude the admitted set through a second `group`-negated entry, or build the refusal as an alternation over characters, whichever the binary matches). Keep every pattern on one line. Keep the message beside it.
- **The proof.** `tests/config.test.ts:1953` (the real-linter case) asserts fixture by fixture and stops at the first mismatch, which is how the sheet failure hid everything behind it. Collect every fixture's reading into one record (`{ path, expected, actual }`), and assert the whole record once, so a failure prints the complete mismatch list. Keep the debugger sentinel, the root-file cases, the disabled-restriction mutation (which must redden the sheet refusal and the scheme refusal alike), and the 106 fixtures; add the per-pattern fixtures named under the law.
- **The gap's reach.** Record in the report, per block and per pattern, whether the original matched through the binary. That reading is the fleet's exposure (every target vendors this file), and the release notes carry it.
- **Everything else** as the earlier briefs: the face enumerations and mutation controls; the root setup mirror in `tests/setupPolicy.ts` with its five controls in `tests/setupPolicy.test.ts`, no name-based exemption; the veneer reading; `npm run build` before `test:src:bin`, `test:config`, and `test:policy`; the host-drift rerun rule; this checkout as a generated target (no template change is expected here; if one is needed, regenerate and quote).

## Unknowns

- Whether the binary honours `!` negation in `group`; the probe settles it, and the report says which form each rewritten pattern took and why.

## Scope

- **Owned.** As the earlier briefs, plus `.oxlintrc.json` for every `no-restricted-imports` pattern that the binary does not match as written (the rewrite alone: no block gains or loses a refusal), and `host.json` (regenerated only).
- **Off-limits.** As the earlier briefs; `guides/**` and `tests/guides.test.ts`.
- **Tools and limits.** As the earlier briefs.

## Execution

1. Probe every lookaround pattern through the binary with a refused and an admitted fixture; record the matrix of originals.
2. Rewrite each non-matching pattern; re-probe; keep the admitted and refused fixtures as the proof's per-pattern cases.
3. Make the real-linter case collect-then-assert; add the per-pattern fixtures; run it.
4. Implement the rest of the original brief's steps 1 to 3 (face enumerations and controls; the root setup mirror and controls; the veneer reading).
5. Run, in order: `npx oxfmt --config .oxfmtrc.json --write <owned files>`, `npx tsc --noEmit --project tsconfig.json`, `npx oxlint --config .oxlintrc.json tests` (bare), `npm run lint:check` (bare; the repaired patterns may surface a hit the dead ones hid: report each with its file and line, and stop if one is outside your owned set), `npm run build`, `npm run test:setup`, `npm run test:policy`, `npm run test:config`, `npm run test:src:bin`, `npm run test:guides` (observation), then `npx oxfmt --config .oxfmtrc.json --check <owned files>`.

## Output

Rewrite `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/propagation-5-report.md` as the finished unit's report: the files changed; the per-block, per-pattern matrix of original readings and the adopted form of each rewrite with its readings; every case added with its control; the veneer reading; the architecture sentence (report only); each command, its exit code, and its test count; every lint hit the repaired patterns surfaced; every deviation. Your final message is that report verbatim. No process diary.

## Deviation contract

Stop and report (expected, found, evidence, done or not done, one hypothesis) when a pattern cannot be rewritten without changing a refusal or an admission, when `lint:check` surfaces a boundary hit outside your owned set (quote it: a real finding), when a gate reddens for a reason outside your files, or when a change needs a file outside the owned set.

## Acceptance criteria

1. Every `no-restricted-imports` pattern in `.oxlintrc.json` matches through the real binary, with a refused and an admitted fixture each.
2. The real-linter case asserts the whole matrix at once and reddens under the disabled-restriction mutation.
3. Root `tsc`, scoped lint, scoped format, and `lint:check` exit 0, or `lint:check`'s hits are quoted and the stop is taken.
4. `npm run build`, `test:setup`, `test:policy`, `test:config`, and `test:src:bin` exit 0 with every new case and control; `test:guides` is quoted.
5. No file outside the owned set differs from its state at your start except the guide unit's files; `host.json` differs by regeneration alone; `tmp/probes/` and every scratch directory are empty at the close.

## Review evidence

The diff of the owned files and the report.
