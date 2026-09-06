# Unit brief — U3-fix-2: the waiver's home, one vocabulary for the rewrite, the proof's scratch (scaffold)

Supersedes nothing; follows `u3-fix-brief.md`. Carries round 2's findings (`u3-fix-audit-subjective.md` claim 9 and findings A, B, C; `u3-fix-audit-objective.md` claim 9 and its first two findings outside the claims), reconciled in `u3-fix-audit-verdict.md`.

## Role and engine

`builder`, Sonnet. Perform the assignment directly and spawn nothing. You are the sole writer in `/home/user/scaffold` for the life of this unit.

## Objective

Give the placement waiver one true home in the workspace rule, make the browser and server seeds say the rewrite the same way and prove it with one assertion, remove the sentinel and the derived flag from the roll-up proof's skip, prove the temporary scratch is removed, and give the extractor guard the prototype case its remarks claim.

## Context

- Read first: `/home/user/scaffold/AGENTS.md` § Design laws and § Writing, `.claude/rules/writing.md`, `.claude/rules/tests.md` § Shared test infrastructure, `.claude/rules/workspace.md` § Configuration authority.
- The tree is dirty with U3 and U3-fix, uncommitted; the round-2 verifier ran every gate green on it (`.orkestrel/campaign/ts6-api/u3-fix-verify-report.md`). Commit nothing.
- Host: Linux, Node 22.22.2. `npm run test:config` drives real Vite builds and takes about a minute; give it a 600000 ms timeout in the foreground. `npm run test:src:core` takes under a minute.
- `createPolicyScratch({ prefix })` in `tests/setupPolicy.ts:54-76` allocates under `os.tmpdir()`, writes through `scratch.write(target, text)` with escape refused, and removes itself with `scratch.destroy()`.
- `configs/helpers.ts` resolves `tsc` and the extractor through `createRequire(import.meta.url)`, so neither depends on the fixture workspace's location; whether the extractor's `packageJsonFullPath` reading or Vite's build tolerates a fixture root outside the repository is the unknown named under Unknowns.

## Scope

Owned: `.claude/rules/workspace.md` (§ Configuration authority bullets only), `src/core/templates.ts` (the `vites.src.browser` seed's comment only), `tests/src/core/compilers.test.ts` (the case `reaches core through the rewrite in every emitted published face` only), `tests/config.test.ts` (the module-scope extractor resolution, the two skip controls, the roll-up proof case, and the `isExtractorModule` cases only).

Off-limits: everything else, in particular `configs/helpers.ts`, `configs/src/**`, `src/core/compilers.ts`, `src/core/helpers.ts`, `package.json`, `package-lock.json`, `host.json`, every other vendored file, and `.orkestrel/**`.

No `git checkout`, `git restore`, `git stash`, `git reset`, `git clean`, no commit, no install, no tree-wide `format` or lint `--fix`.

## Edits

1. **The waiver's home** (`.claude/rules/workspace.md`, about lines 63 to 76). Move the placement waiver to the bullet that names every leaf and drop it from the `configs/policy.ts` bullet, so it has one home and no tally:
   - The leaves bullet (about lines 63 to 66) becomes: "- `configs/helpers.ts`, `configs/browsers.ts`, and `configs/policy.ts`: the only permitted leaves under `configs/`. Each imports nothing from the workspace, which is what keeps it a leaf, so no `configs/types.ts` exists for one to import: each keeps its own types, data, and functions in its one file, and the centralized-kind placement in `.claude/rules/architecture.md` does not reach a leaf. Each `configs/src/*.config.ts` imports the root config rather than a leaf, so shared build logic stays in one place."
   - The `configs/policy.ts` bullet (about lines 71 to 76) ends at "…is the only form that resolves in all of them." Delete the sentence beginning "Because it may import nothing" and everything after it in that bullet.
   - Wrap at 100 columns as the file does. Change no other bullet.
2. **One vocabulary for the rewrite** (`src/core/templates.ts`, the `vites.src.browser` seed, about lines 582 to 583). Make the browser seed's two comment lines byte-identical to the server seed's (about lines 599 to 600): "// The roll-up reaches src/core through a specifier the tarball does not carry, so the rewrite" and "// externalizes core through the package's own published root export, on the final roll-up alone.". Change nothing else in the seed.
3. **One assertion over the comment** (`tests/src/core/compilers.test.ts`, about lines 1418 to 1421). Replace the two `toContain` calls that straddle the comment with one `toContain` over the whole two-line comment as edit 2 spells it, `\n` between the lines.
4. **No sentinel, no derived flag** (`tests/config.test.ts`, about lines 55 to 61). Replace `let extractorResolved = true` and `let extractorPath = ''` with one `let extractorPath: string | undefined`, assigned in the `try` and left `undefined` by the `catch`. The skips read `it.skipIf(extractorPath === undefined)` and `it.skipIf(extractorPath !== undefined)`; the existence assertion reads the narrowed value (`if (extractorPath === undefined) throw new Error(...)` before `existsSync`, or an equivalent narrowing the rules permit — no assertion operator). Keep the comment above the resolution.
5. **The proof's scratch** (`tests/config.test.ts`, the roll-up proof case, about lines 1848 to 1955). Build the fixture workspace with `createPolicyScratch({ prefix: 'orkestrel-config-rollup-' })`, write the project and the sources through `scratch.write`, take `workspace` from `scratch.path`, and close with `scratch.destroy()` in the `finally`; remove the `mkdirSync(resolve(root, 'tmp'))`, the `mkdtempSync`, the bare `writeFileSync` calls, and the `rmSync`. Drop any import the change leaves unused. If Vite's `build()` or the extractor refuses a fixture root outside the repository, stop: keep the case as it stands, and report the exact error text and the command under Deviation.
6. **The scratch's removal, proven** (the same case). Before the builds, read `readdirSync(tmpdir())` and keep the names beginning `orkestrel-declarations-`; after the builds and the `serve` control, read it again and assert that no name beginning `orkestrel-declarations-` is present that was absent before. Add a one-line comment naming what the assertion proves (the hook removes its temporary emit in the `finally`).
7. **The prototype case** (`tests/config.test.ts`, the `isExtractorModule` cases, about lines 1815 to 1828). Add one true case beside the existing own-property case whose `Extractor` and `ExtractorConfig` are functions carrying `invoke` and `prepare` only through their prototype chain, for example `Object.setPrototypeOf(() => undefined, { invoke: () => undefined })` and its `prepare` twin, with a comment naming what it proves (the guard reads through the prototype, as its remarks state). If the guard returns `false` for that case, stop and report it under Deviation rather than changing the guard.

## Unknowns

- Whether the extractor or Vite accepts a fixture root under `os.tmpdir()` (edit 5). Run the case and report the outcome either way.

## Output

Write `/home/user/scaffold/tmp/units/ts6-u3-fix-2-report.md` with: the file list touched; per edit one to three sentences on what landed; the exact command and last lines of each scoped run; the unknown answered; every criterion below with PASS or FAIL and its evidence; and any deviation.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, at most one hypothesis — when edit 5 or edit 7 meets the refusal it names, when an edit needs a file you do not own, or when a scoped run reddens a case outside the edits. Wording inside a sentence you were told to write is fixed; wording of a comment is yours.

## Acceptance criteria (cheap first)

1. `npx oxfmt --config .oxfmtrc.json --check .claude/rules/workspace.md src/core/templates.ts tests/src/core/compilers.test.ts tests/config.test.ts` exits 0.
2. `npx oxlint --config .oxlintrc.json --deny-warnings src/core/templates.ts tests/src/core/compilers.test.ts tests/config.test.ts` exits 0.
3. `grep -n "extractorResolved\|either vendored leaf\|extend that waiver" .claude/rules/workspace.md tests/config.test.ts` prints nothing, and `grep -c "source path the tarball" src/core/templates.ts` prints 0.
4. `npx tsc --noEmit --project tsconfig.json` exits 0.
5. `npm run test:src:core` exits 0.
6. `npm run test:config` exits 0 (the host-inventory row was green under the round-2 verifier's build and stays so while `host.json` is untouched; report its row if it reddens).

## Review evidence

The Orchestrator captures `git diff` and `git status --short` after you exit; write nothing under `.orkestrel/`.
