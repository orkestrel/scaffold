# Unit D6b-fix — template-rename-close: the browser member named from its condition, the member order, and the comments

## Role and engine

`builder`, Sonnet, a native Claude Code subagent. Sole writer in `/home/user/scaffold`, with no other unit live. Perform the assignment directly and spawn nothing. Apply the items exactly as written; stop and report on any deviation.

## Read first

`/home/user/scaffold/AGENTS.md`; `.claude/rules/names.md` § General vocabulary; `.claude/rules/writing.md` § Sentence and paragraph order; `/home/user/scaffold/.orkestrel/campaign/docs-parity/d6b-audit-subjective.md` (claims 1 and 2 and § Findings outside the claims); `d6b-template-rename-report.md`; `src/core/templates.ts:1160-1190`, `:1440-1490`, `:1650-1700`, `:1830-1845`, `:2035-2050`, `:2080-2090`; `tests/src/core/templates.test.ts` (every pinned occurrence of `bundled`).

## Items

- **O1. `bundled` becomes `browsable`, at both levels.** `Entry.bundled` and `Entry.declaration.bundled` are renamed `browsable` at the declaration (`src/core/templates.ts:1184`, `:1186`), the `buildStage` local and its reads (`:1674`, `:1675`, `:1686`, `:1687`), the pushed declaration record (`:1684`), the unreachable filter (`:1840`), the browser drive's gate and demand (`:2040`, `:2044`), and the guard fragment's filter (`:2087`), and in every pinned occurrence in `tests/src/core/templates.test.ts`. The name derives from the condition the exports map answers (`browser`), the way `importable` and `requirable` derive from `import` and `require`. Leave every other `bundled` in the file alone: the Vite-bundle sense (`:1982`, `:2003`, `:2032`) and the bundled-browsers sense in the Playwright helpers (`:688-960`) are other concepts.
- **O2. The member order follows the leading comment.** `Entry` reads `subpath`, `specifier`, `mapping`, `declaration` (`importable`, `requirable`, `browsable`), then `browsable`, `importable`, `requirable`, `loadable`, so `loadable` sits beside the `requirable` it narrows. The pushed record in `buildStage` and any pinned expectation whose key order matters follow.
- **O3. The leading comment names the facts.** `src/core/templates.ts:1172-1176` reads, verbatim: "One published subpath, resolved to what this proof can drive: the specifier a consumer writes, whether the declarations its consumer formats resolve at all, whether the exports map answers the browser condition with a target of its own, whether it answers `import` and `require` at all, and whether the target that `require` answers with is one that a CommonJS consumer loads." (with the backslash-escaped backticks the template text uses).
- **O4. `selectUntypable`'s comment names the member it filters.** `src/core/templates.ts:1475-1477` reads: "Requirable entries that declare CommonJS support but a typed CommonJS consumer cannot compile against. A default branch resolving under the require condition set makes no CommonJS claim."
- **O5. The gates and the emitted proofs.** `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:src:core`, `npm run build`, and the inventory digest stable across a second `npm run build:inventory`. Repeat D6b's probe as an observation, writing only under the session scratchpad: emit the core/server proof and the core/browser proof from the built entries (the way `d6b-template-rename-report.md` § Criteria describes) and typecheck each with `tsc --noEmit` under the same options; record both exits and that no emitted line exceeds 100 columns. Then `PATH=/opt/npm11/bin:$PATH npm run test:distribution` once, expected red on exactly the packed-install case.

## Standing conditions

D4, D5, D6, and D6b are on this tree uncommitted, accepted or under closure; nothing else is live. `node_modules/@orkestrel/guide` is a `--no-save` head start; never `npm install`. The distribution proof's packed-install case is red by dependency order (`plan.md` § Re-baseline after D6-fix-2 returned).

## Scope

- Owned: `src/core/templates.ts` (O1 to O4 only), `tests/src/core/templates.test.ts` (the pinned text only).
- Off-limits: everything else.
- Permitted commands: scoped `npx oxfmt --config .oxfmtrc.json --write <owned file>`, `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:src:core`, `npm run build`, `npm run build:inventory`, `node --input-type=module --eval …` and `npx tsc --noEmit -p <scratch>` for the emitted-proof observation under the session scratchpad, `PATH=/opt/npm11/bin:$PATH npm run test:distribution` (once). Never `npm install`, lint `--fix`, a discard-class git command, or a commit.

## Acceptance criteria, cheapest first

1. `grep -n "bundled" src/core/templates.ts` prints only the Vite-bundle and bundled-browser occurrences (none under `Entry`, `buildStage`, the drives, or the guard); `grep -c "browsable" src/core/templates.ts` prints the count of the sites O1 names; `grep -n "Requirable entries" src/core/templates.ts` prints the comment.
2. `npm run format:check`, `npm run lint:check`, `npm run check` exit 0.
3. `npm run test:src:core` exits 0.
4. `npm run build` exits 0; the inventory digest identical across a second `npm run build:inventory`.
5. Observations: both emitted proofs typecheck at exit 0 with no line over 100 columns; `PATH=/opt/npm11/bin:$PATH npm run test:distribution` red on exactly the packed-install case.

## Output

Write `/home/user/scaffold/tmp/units/docs-d6b-fix-report.md`: each O with `file:line`, each criterion with exit code and last lines, the observations, `git status --short` and `git diff --stat`, flagged claims, no count of a growable set. Return the same as your final message. No process diary.

## Deviation contract

Stop and report when a pinned expectation depends on member order in a way O2 cannot satisfy, when an emitted proof fails to typecheck, or when a gate fails outside the owned files. The scratch layout for the emitted-proof observation is yours to decide and record.
