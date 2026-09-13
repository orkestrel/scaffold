# Implementation brief — U-fix-3

## Role and engine

Opus `implementer`, native Claude subagent, sole serial writer in `/home/user/scaffold` from the
clean committed baseline you read with `git log --oneline -1`. Read `AGENTS.md` § Writing,
`.claude/rules/writing.md`, `.claude/rules/documentation.md`, and `.claude/rules/typescript.md`
§ TSDoc before editing. No skill is named for this unit.

## Objective

Bound the prose that claims every npm beneath the floor refuses a generated workspace's install, to
what the readings show, in every shipped and repository document that states it; and land the
token-rule and successor-row corrections the U-fix-2 audit ruled. **Read
`.orkestrel/campaign/u-fix-2-audit-verdict.md` first**, then both lane reports under
`.orkestrel/campaign/lanes/u-fix-2-audit-*.md`. Nothing outside the items below.

## Measured facts, every one retained — write only these

- npm reads the `devEngines` record from its 10.9.0 release on. npm 10.5.0 and 10.8.3 ignore the
  record and, on the lockfile-free generated workspace, crash inside dependency resolution at the
  `#loadPeerSet` step in `@npmcli/arborist`. npm 10.9.0 and 10.9.3 read the record and refuse the
  install with the `EBADDEVENGINES` code. `evidence/linux-gate/devengines-floor.log.txt`, measured
  2026-09-13 on Linux, Node 22.22.2.
- npm 10.9.7 and every npm from 11.0.0 through 11.5.0 read the record and refuse beneath the
  floor; without the record every one of them crashes the same way; npm 11.6.0 is the first that
  installs the workspace. `evidence/linux-gate/npm-boundary-readings.log.txt`.
- Node 22.12.0 bundles npm 10.9.0, Node 22.18.0 bundles npm 10.9.3, Node 22.22.2 bundles npm
  10.9.7, Node 24.0.0 bundles npm 11.3.0, and Node 24.4.0 bundles npm 11.4.2, read from
  `https://nodejs.org/dist/index.json` on 2026-09-13. So every npm a supported Node bundles reads
  the record; only an npm a developer downgraded below 10.9.0 does not.
- The readings are one Linux host. Name that bound where the prose would otherwise claim every
  host.

## Items — each finding has exactly this one carrier

**A. `guides/scaffold.md`, the toolchain paragraph after the artifact list in § Generated
workspace** (verdict claims 2, 3, 13). Keep its placement and every fact it states, and rewrite it
so that: the refusal is claimed only of an npm that reads the record, with the 10.9.0 start named
and the bundled-npm fact that makes the bound harmless on a supported Node; an older npm's
failure inside dependency resolution is named; the `npm --version` reading and the
`npm install --global npm@11.6.0` remedy stay; and every version number in running prose is a
plain numeral with no backticks, as `README.md:12` writes Node 22.18.0. Keep backticks only for a
declared value or a field: the `>=22.18.0` range, the `>=11.6.0` range, the `error` value, the
`EBADDEVENGINES` code, the `engines.node` field, the `devEngines.packageManager` record. No count,
no banned term, one idea per sentence.

**B. `README.md` § Notes, the npm-floor paragraph** (verdict claims 3, 4, 13; README-voice). Replace
the paragraph. Make the acting component the subject: the `scaffold new` command generates the
workspace. State the floor, the bounded refusal (an npm from 10.9.0 through 11.5.0 refuses with
the `EBADDEVENGINES` code; an older npm fails inside dependency resolution instead), and the
remedy, in short sentences rather than one sentence joined by "so" and a semicolon. Versions as
plain numerals. Do not write the phrase `Node <version> or later` anywhere in the file: the pin in
`tests/guides.test.ts` matches the first such phrase and must keep reading line 12.

**C. `ROADMAP.md`** (verdict claims 3, 8; R4-carry). Four edits and nothing else:

1. Line 297: "the disabled busy submit in `SetupPanel`" → "the disabled busy submit in the
   `SetupPanel` component". Line 369: "the warmup in `OllamaProvider.test.ts`" → "the warmup in
   the `OllamaProvider.test.ts` file".
2. In the successor row beginning "the `0.0.65` fix audit ruled these test-side findings", the
   clause "and a tool it cannot resolve is dropped silently;" becomes "and a tool it cannot resolve
   is dropped silently, so whether a host lacking `setsid` or `timeout` changes the exit code and
   the message the pinned case in `tests/src/server/helpers.test.ts` asserts is unmeasured;".
3. In the scaffold row recording npm 10.9.7 and 11.0.0 through 11.5.0 crashing, add that npm
   10.5.0, 10.8.3, 10.9.0, and 10.9.3 crash the same way on the plain manifest, citing
   `evidence/linux-gate/devengines-floor.log.txt` beside the existing citation.
4. In the scaffold row beginning "the proof launches the npm the generated manifest names", add
   that npm reads the `devEngines` record from 10.9.0 on, that npm 10.5.0 and 10.8.3 ignore it and
   meet the crash, and that every npm a supported Node bundles reads it, with the same citation
   and the date.

Within the rows this item edits, write versions as plain numerals. Leave every other row of the
file as it is: the file is unpublished, and a file-wide pass is a successor's.

**D. `src/core/constants.ts`, the `@remarks` block of `WORKSPACE_DEV_ENGINES`** (verdict claim 2
reaches the published declarations). Bound the sentence "so npm refuses an install in a generated
workspace beneath that floor rather than resolving its dependency graph" to an npm that reads the
record, naming 10.9.0 as the release the record is read from. Leave the description paragraph
byte-identical; `test:guides` proves the parity row.

## Owned files

`guides/scaffold.md`, `README.md`, `ROADMAP.md`, `src/core/constants.ts`.

## Off-limits

Every other file, in particular `tests/guides.test.ts`, `host.json` (the Orchestrator's `build`
regenerates it after you exit), `package.json`, `package-lock.json`, `tests/**`, `scripts/**`,
`.orkestrel/**`, `tmp/**`.

## Execution

Perform this assignment directly and spawn no agent. Write only the owned files. Run no `git`
command that discards a working-tree change. Run no tree-wide `format` or `lint --fix`; if
`format:check` reports a wrap, re-wrap by hand. `oxfmt` rejects a code span wrapped across a line
break in Markdown, so keep each span on one line.

## Deviation contract

Stop and report if a fact you need is not in § Measured facts, if `test:guides` reddens, if item D
cannot be bounded without touching the description paragraph, or if a file outside the owned list
must change. The exact wording of items A, B, and D is yours to decide and record.

## Acceptance criteria, cheap-first

1. `npm run format:check` exits 0.
2. `npm run lint:check` exits 0.
3. `npm run check` exits 0.
4. `npm run test:policy` exits 0.
5. `npm run test:guides` exits 0.
6. `grep -c 'Node [0-9.]* or later' README.md` reads 1.
7. `grep -c EBADDEVENGINES README.md guides/scaffold.md src/core/constants.ts` reads 1 or more for
   `README.md` and `guides/scaffold.md`.
8. `grep -n '10\.9\.0' README.md guides/scaffold.md src/core/constants.ts` prints at least one
   line for each file.
9. `grep -n '`[0-9][0-9.]*`' README.md` prints nothing, and the same pattern over
   `guides/scaffold.md` prints nothing between the artifact list's last bullet and the
   declaration-rollup paragraph.
10. `grep -c 'lacking `setsid` or `timeout`' ROADMAP.md` reads 1, and
    `grep -c devengines-floor.log.txt ROADMAP.md` reads 2.
11. `git diff --stat` names only the owned files.

## Output

Return, as structured data: touched files with a one-line reason each; each criterion with its
exact reading; the final wording of items A, B, and D verbatim; the deviation state. No process
diary.
