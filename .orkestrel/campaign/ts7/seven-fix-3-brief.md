# Unit ts7-seven-fix-3 — round-4 edits for stage 2 in scaffold (exact transcriptions)

Successor of `tmp/units/ts7-seven-fix-2-brief.md` (report `tmp/units/ts7-seven-fix-2-report.md`). What changed: round 3 (`tmp/units/ts7-audit-scaffold-fix-2-{subjective,objective,checker}.md`, verifier `GATES: GREEN`) passed every claim and named findings outside them; every edit below transcribes a lane's prescription.

## Role and engine

`builder` on Sonnet, a native Claude Code subagent, the sole writer in `/home/user/scaffold`. Perform the assignment directly and spawn nothing. Another writer may be live in `/home/user/fleet/probe`, a disjoint checkout; never write there.

## Objective

The seven edits below land verbatim and the gates are green.

## Context

**Law.** `AGENTS.md` § Writing, `.claude/rules/writing.md`, `.claude/rules/tests.md`. Skill: none. Guide: `guides/scaffold.md`.

**Host.** Node v22.22.2, four CPUs. The working tree carries two earlier units' uncommitted edits in the same files; keep them. `guides/scaffold.md` is vendored: `npm run build` rebuilds `host.json`, so run `npm run build` after the guide edit and before `npm test`. Line numbers below were read at 17:05.

## Edits

1. `guides/scaffold.md:1153-1156` — replace "With that option cleared, the rollup resolves global types against the lib files of the compiler `@microsoft/api-extractor` bundles (5.9.3 at `@microsoft/api-extractor` 7.59.0), for every generated workspace whatever `typescript` major it installs, so a public declaration resolves only the lib types that compiler provides." with "With the option set to `''`, the rollup resolves global types against the lib files of the compiler `@microsoft/api-extractor` bundles, 5.9.3 at 7.59.0. That holds for every generated workspace whatever `typescript` major it installs, so a public declaration resolves only the lib types that compiler provides."
2. `guides/scaffold.md:1148-1162` — after edit 1, refill the whole paragraph greedily at word boundaries to at most 100 columns, so no line ends short of the bound while the next word fits (the line "foreign row earns: the workspace declares" is the one left short today). Change no word.
3. `guides/scaffold.md` — after edits 1 and 2, confirm the paragraph carries "cleared" nowhere; if a second occurrence remains, replace it with "set to `''`" in the same form.
4. `tests/src/core/compilers.test.ts:1440` and `:1444` — replace "a roll-up on the 7 major" with "a rollup on the 7 major" and "rolls up no declaration" with "rolls no declaration up"; keep the comment's line width.
5. `tests/setupServer.ts:1655-1656` and `:1677-1681` — rename the parameter `version` to `versions` in the signature and in the `published` binding (`typeof versions === 'string' ? [versions] : versions`), and replace the `@param version` line pair with "@param versions - The version to publish, or the versions to publish with the `dist-tags.latest` one first." wrapped to the block's width. Leave every call site as it is.
6. `tests/src/core/constants.test.ts:191` — replace "the control the assertion above needs" with "the control the preceding assertion needs".
7. `tests/setupServer.ts:1683` and `tests/setupServer.test.ts:542-544` — the guard refuses an empty list only while `buildPackument('')` and `buildPackument([''])` emit a version named `''`. Replace the guard line with
   ```ts
   	if (latest === undefined || published.some((entry) => entry.length === 0)) {
   		throw new Error('A packument publishes at least one version, and every version is named')
   	}
   ```
   and make the test row `refuses to publish no version, or an unnamed one` assert that `buildPackument([])`, `buildPackument('')`, and `buildPackument([''])` each throw that message.
8. Run `npm run format` to converge the edited files, then the gates.

## Scope

**Owned.** `guides/scaffold.md`, `tests/src/core/compilers.test.ts`, `tests/src/core/constants.test.ts`, `tests/setupServer.ts`, `tests/setupServer.test.ts`, `host.json` (rebuilt by `npm run build`, never edited by hand). **Off-limits.** everything else, `.orkestrel/**`, `tmp/**` except your own report; no commit, no push, no publish, no `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`.

## Gates

`npm run format:check`, `npm run lint:check`, `npm run check`, `npm run build`, `npm test`, in that order, reading each exit code. Before edit 7's guard lands, run `npm run test:setup` with the widened test row in place and record its red; after the guard, record its green.

## Output

A report at `/home/user/scaffold/tmp/units/ts7-seven-fix-3-report.md`: one row per edit naming the file and the line, the two `test:setup` readings, each gate's command and exit code, the longest line of the refilled paragraph, `git status --short`, deviations. Make your final message that report's text.

## Deviation contract

Stop and report on a gate red you cannot attribute to your own edit, on any need to edit a file outside the owned set, and on an edit whose "replace" text is absent at the cited line.

## Acceptance criteria

1. Every edit reads at its site as written here; the paragraph's longest line is at most 100 columns and no line but the last ends short while the next word fits.
2. `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run build`, `npm test` exit 0.
3. `git status --short` lists only owned files and the earlier units' files.
