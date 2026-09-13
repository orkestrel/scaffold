# Implementation brief — U-fix-4

## Role and engine

Opus `implementer`, native Claude subagent, sole serial writer in `/home/user/scaffold` from the
clean committed baseline you read with `git log --oneline -1`. Read `AGENTS.md` § Writing,
`.claude/rules/writing.md`, `.claude/rules/documentation.md`, and `.claude/rules/typescript.md`
§ TSDoc before editing. No skill is named for this unit.

## Objective

Rewrite the generated-workspace toolchain prose in one pass, as a closed set of sentences each
with a named retained source, in the guide, the README, and the published doc block; and land the
token-rule corrections in the ROADMAP rows. This is the strategy switch after three sentence-level
rounds on one paragraph (`u-fix-3-audit-verdict.md`): the paragraph is rewritten whole, and no
sentence outside § Sentences enters it. **Read `.orkestrel/campaign/u-fix-3-audit-verdict.md`
first**, then both lane reports under `.orkestrel/campaign/lanes/u-fix-3-audit-*.md`.

## Sentences — the closed set, each with its source

Write the guide paragraph so that it states these facts in this order, in your own sentences, one
idea per sentence, and states nothing else. Every source is retained under
`.orkestrel/campaign/evidence/linux-gate/`.

1. Every generated manifest declares the toolchain it is gated on. — `src/core/compilers.ts:580-581`.
2. The `engines.node` field carries the blueprint's `engines` value, which defaults to the
   `>=22.18.0` range. — `src/core/constants.ts` (`DEFAULT_ENGINES`, `MINIMUM_NODE_VERSION`).
3. The `devEngines.packageManager` record names npm at the `>=11.6.0` range with its `onFail` key set
   to the `error` value, and no blueprint field varies it. — `src/core/constants.ts`
   (`WORKSPACE_DEV_ENGINES`), `src/core/compilers.ts:580`.
4. npm reads that record from its 10.9.0 release on. — `devengines-floor.log.txt` (10.9.0 and
   10.9.3 read it and refuse; 10.5.0 and 10.8.3 ignore it), `npm-boundary-readings.log.txt` (10.9.7
   and 11.0.0 through 11.5.0 read it and refuse).
5. An npm at 10.9.0 or later and earlier than 11.6.0 refuses the `npm install` command in a
   generated workspace with the `EBADDEVENGINES` code before it resolves the dependency graph. —
   `devengines-floor.log.txt` (10.9.0, 10.9.3), `npm-boundary-readings.log.txt` (10.9.7, 11.0.0
   through 11.5.0).
6. npm 10.9.7 refuses an `npm run` command in such a workspace with the same code. —
   `path-prepend.log.txt` ("ambient npm, nested run": `EBADDEVENGINES`, exit 1). State it of
   10.9.7, the one release measured; claim it of no other.
7. npm 10.5.0 and 10.8.3, the releases measured earlier than 10.9.0, ignore the record and fail
   inside dependency resolution instead. Claim it of those two releases and of no other: nothing
   earlier than 10.5.0 was measured. — `devengines-floor.log.txt` (10.5.0, 10.8.3: the `edgesOut`
   crash, no refusal).
8. Every Node release at or after 22.18.0 bundles an npm at 10.9.0 or later, so a generated
   workspace meets an npm that ignores the record only where a developer installed one in place
   of the bundled npm. — `node-index-floor.log.txt` (the Node release index read 2026-09-13: lowest bundled npm
   across every release at or after 22.18.0 is 10.9.0, at 23.3.0).
9. npm 11.6.0 is the first release that installs a generated workspace, so run a generated
   workspace on npm 11.6.0 or later. — `npm-boundary-readings.log.txt`.
10. Read the ambient version with the `npm --version` command, and raise it with the
    `npm install --global npm@11.6.0` command, or a later release, before the first install; the
    command installs an npm that reports 11.6.0. — `remedy-control.log.txt` (ambient 10.9.7, exit
    0, installed npm self-reports 11.6.0).
11. The npm readings come from a Linux host on Node 22.22.2 on 2026-09-13, and the bundled
    versions from the Node release index read the same day. — the bound.

Forms, binding throughout: a version in running prose is a plain numeral with no backticks;
backticks only for a declared value or a field (`>=22.18.0` range, `>=11.6.0` range, `error`
value, `EBADDEVENGINES` code, `engines.node` field, `devEngines.packageManager` record, `npm
install` command, `npm run` command, `npm --version` command, `npm install --global npm@11.6.0`
command), each followed by its noun; `earlier` and `later` for every version direction, never
`below`, `above`, `older`, `newer`, or `beneath` (`.claude/rules/writing.md` § Code tokens,
references, and links, and `AGENTS.md` § Design laws, one concept, one term); no sentence-initial
`It` whose referent a reader could attach elsewhere; no count; no banned term; every sentence
checkable against its named source.

## Items

**A. `guides/scaffold.md`, the toolchain paragraph after the artifact list in § Generated
workspace.** Replace the whole paragraph with the closed set. Keep its placement: after the list's
last bullet, before the declaration-rollup paragraph, with "except the manifest." still directly
followed by the list's first bullet.

**B. `README.md` § Notes, the npm-floor paragraph.** Replace the whole paragraph with the README's
subset: sentences 5 (the floor and the refusal, with the `scaffold new` command as the subject of
the opening sentence), 7 (the two measured releases, no wider), 8 written as "no Node release the
executable supports bundles an npm earlier than 10.9.0" (anchoring to line 12 without the phrase
`Node <version> or later`, which the pin in `tests/guides.test.ts` matches and must keep reading at
line 12), 10 (the remedy), and 11 (the bound, without the Node version). Short sentences.

**C. `src/core/constants.ts`, the `@remarks` block of `WORKSPACE_DEV_ENGINES`.** State sentences 3,
4, and 5's refusal (without the code, which is host-varying and belongs in no declaration), and 7
narrowed to "an npm that does not read the record fails inside dependency resolution instead",
which names no release and so claims nothing unmeasured. The description paragraph stays byte-identical.

**D. `ROADMAP.md`, the rows the previous round edited, token rule only.** Line 373: "the
`@npmcli/arborist` package"; line 428: "the `0.0.65` fix audit" becomes "the 0.0.65 fix audit"; the R-4 clause: "a host lacking the `setsid` command or the `timeout`
command changes the exit code and the message the pinned case in the
`tests/src/server/helpers.test.ts` file asserts"; each `devengines-floor.log.txt` path: "the
`.orkestrel/campaign/evidence/linux-gate/devengines-floor.log.txt` file"; and in the proof row,
`older than` and `below` become `earlier than`. Change nothing else in the file.

## Owned files

`guides/scaffold.md`, `README.md`, `src/core/constants.ts`, `ROADMAP.md`.

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

Stop and report if a fact you need is outside § Sentences, if `test:guides` reddens, if item C
cannot be written without touching the description paragraph, or if a file outside the owned list
must change. The sentence wording is yours; the fact set and the forms are not.

## Acceptance criteria, cheap-first

1. `npm run format:check` exits 0.
2. `npm run lint:check` exits 0.
3. `npm run check` exits 0.
4. `npm run test:policy` exits 0.
5. `npm run test:guides` exits 0.
6. `grep -c 'Node [0-9.]* or later' README.md` reads 1.
7. `grep -n -i -E '\b(below|above|older|newer|beneath)\b' README.md src/core/constants.ts` prints
   nothing, and the same pattern over the toolchain paragraph's line range in `guides/scaffold.md`
   prints nothing.
8. `grep -n '`[0-9][0-9.]*`' README.md` prints nothing, and the same pattern over the toolchain
   paragraph's line range prints nothing.
9. `grep -n 'path-prepend\|10\.9\.7' guides/scaffold.md` prints the sentence carrying the `npm run`
   reading, and `grep -c 'npm run' README.md` reads 0.
10. `grep -c 'the `@npmcli/arborist` package' ROADMAP.md` reads 1, `grep -c 'the `setsid` command
    or the `timeout` command' ROADMAP.md` reads 1, and `grep -c 'the `0.0.65` fix audit' ROADMAP.md`
    reads 0.
12. `grep -n -E 'older than|earlier than 10\.9\.0' README.md guides/scaffold.md` prints no line
    that claims a failure of every such release: each hit names 10.5.0 and 10.8.3, or says "no Node
    release … bundles", or is the README's anchored form.
11. `git diff --stat` names only the owned files.

## Output

Return, as structured data: touched files with a one-line reason each; each criterion with its
exact reading; the final guide paragraph, README paragraph, and doc block verbatim, each sentence
annotated with the number of the § Sentences entry it carries; the deviation state. No process
diary.
