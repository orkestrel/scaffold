# Implementation brief — U-fix-2

## Role and engine

Opus `implementer`, native Claude subagent, sole serial writer in `/home/user/scaffold` from the
clean committed baseline you read with `git log --oneline -1`. Read `AGENTS.md`,
`.claude/rules/writing.md`, `.claude/rules/documentation.md`, and `.claude/rules/typescript.md`
§ TSDoc before editing. No skill is named for this unit.

## Objective

Land the bounded set the fix-round audit ruled must ship with `0.0.65`: prose in the documents a
developer meets first, one stale comment, one TSDoc line, and the ROADMAP rows that carry the
round's evidence and its successor findings. **Read `.orkestrel/campaign/u-fix-audit-verdict.md`
first**, then both lane reports under `.orkestrel/campaign/lanes/u-fix-audit-*.md`. Everything the
verdict names as carried to the successor is **out of scope here** except where item D records it
as a ROADMAP row; do not widen.

## Host facts

Linux, ambient npm `10.9.7` beneath the generated floor, ambient Node `22.22.2`. `rsync` is absent.
`host.json` is a generated inventory the Orchestrator's `build` rewrites after you exit; a
`test:config` failure naming `guides/scaffold.md` as a stale digest is that regeneration pending,
not your defect. Tests do not ship; `package.json` `files` names `dist/src`, `dist/bin`,
`dist/host`, and `README.md`, and `guides/scaffold.md` reaches every target through `dist/host`.

## Items — each finding has exactly this one carrier

**A. The guide paragraph interrupts the list it was inserted into, names no remedy, and carries
bare code tokens** (fix-round claims 7 and 13; the Orchestrator's `guides/scaffold.md:908` reading).
In `guides/scaffold.md` § Generated workspace, the toolchain paragraph sits between "Nothing is
fixed except the manifest." and the bullet list that sentence introduces. Move the paragraph to
**after** the artifact list, so the introducing sentence is again directly followed by its list
(`.claude/rules/writing.md` § Structure). Make it usable by the developer who arrives having just
read `EBADDEVENGINES`: name that code as the refusal they see, and give the command that satisfies
the floor, `npm install --global npm@11.6.0` or a later release, rather than only the requirement.
Follow every code token with a noun: the objective lane read `>=22.18.0`, `>=11.6.0`, `error`, and
the later `11.6.0` as bare, so write forms such as the `>=22.18.0` range, the `>=11.6.0` range, the
`error` value, and npm `11.6.0` or later. At line 908 the sentence "applies `new`'s rule itself"
possessivizes a code token; recast it (for example, "applies the rule the `new` verb follows").
Keep every claim true, in the guide's voice, with no count and no banned term.

**B. A comment names a symbol that no longer exists** (fix-round claim 5).
`tests/distribution.test.ts:926` reads "`resolveNpm` throws when …"; the helper is `provisionNpm`.
Correct the token. Change nothing else in that comment.

**C. The README carries no npm floor** (fix-round F-10, claim 13). `README.md` § Notes is the
file's own precedent for an operational caveat. Add one sentence there stating that a workspace
`scaffold new` generates declares an npm floor of `11.6.0` and refuses `npm install` beneath it with
`EBADDEVENGINES`, so a reader on Node 22 or Node 24 upgrades npm first. One sentence, the README's
voice, the same writing rules as item A. The pin in `tests/guides.test.ts` matches the first
"Node <floor> or later" sentence in the file, so do not write that phrase in the new sentence.

**D. The ROADMAP rows carry counts, possessives, a dangling evidence pointer, and no home for the
successor findings** (fix-round claim 9, F-6, and the carried list). In `ROADMAP.md`:

- Line 385 reads "so one failing project hides every project after it" and line 386 "one red case
  in `src:server` suppressed every project after it". Delete each count: write "a failing project"
  and name the case — the mapped-loopback case in `tests/src/server/helpers.test.ts`.
- Line 297, `` `SetupPanel`'s disabled busy submit ``, and line 368,
  `` `OllamaProvider.test.ts`'s warmup ``, possessivize code tokens. Recast each ("the disabled busy
  submit in `SetupPanel`", "the warmup in `OllamaProvider.test.ts`").
- The scaffold row recording npm `10.9.7` and `11.0.0` through `11.5.0` crashing cites "its own
  install log" and no path. Name the retained artifact,
  `.orkestrel/campaign/evidence/linux-gate/npm-boundary-readings.log.txt`, and state that the
  campaign folder is pruned at acceptance so the readings live in git history from the commit that
  retained them.
- Add one scaffold row under § The next conformance matrix's rows, after the `supportsMappedLoopback`
  row, carrying the test-side findings the `0.0.65` fix audit ruled out of the release. Name each
  member and its file: the mapped-loopback case in `tests/setupServer.test.ts` hard-codes
  `EAFNOSUPPORT` where the predicate is the probe that read the code, and the errno set across
  hosts is unmeasured; `resolveTool` in `tests/setupServer.ts` accepts a regular file without the
  execute bit; the shadow directory `executeOllamaSetup` builds is inline, unexported, and asserted
  nowhere, and a tool it cannot resolve is dropped silently; `OLLAMA_TOOLS` has no mechanism that
  can disagree with `scripts/ollama.sh`; the `executeOllamaSetup` doc block uses `host` for the
  endpoint parameter and for the machine; its `provisionNpm` doc block says "host npm" once beside
  "ambient"; whether `provisionNpm` or `resolveNpm` is the registered prefix for a floor-and-fallback
  selection is an open design question for a blind pass; the guide's claims that no blueprint field
  varies `devEngines` and that an npm beneath the floor refuses the install carry no executed
  assertion; the README pin's imports sit inside the case body and its regex anchors on no subject;
  nothing pins `package.json` `engines.node` to `MINIMUM_NODE_VERSION`. Write it as one row in the
  voice of its neighbours, no count, dated 2026-09-13.

Change nothing else in `ROADMAP.md`.

**E. Published TSDoc carries a bare code token** (objective lane F1). `src/core/constants.ts:496`,
in the `@remarks` block of `WORKSPACE_DEV_ENGINES`, reads "with `onFail` set to `error`". Write
"with the `onFail` key set to the `error` value". The summary line is unchanged, so the guide's
parity row is unchanged; verify that with `npm run test:guides`.

## Owned files

`guides/scaffold.md`, `tests/distribution.test.ts`, `README.md`, `ROADMAP.md`, `src/core/constants.ts`.

## Off-limits

Every other file. In particular `tests/guides.test.ts` (its README pin must keep passing
unchanged), `host.json`, `package.json`, `package-lock.json`, `scripts/**`, `tests/setupServer.ts`,
`tests/setupServer.test.ts`, `.orkestrel/**`, `tmp/**`.

## Execution

Perform this assignment directly and spawn no agent. Write only the owned files. Run no `git`
command that discards a working-tree change.

## Deviation contract

Stop and report if item A cannot be placed without changing the list's content, if the README pin
in `tests/guides.test.ts` reddens on item C, if item E moves the summary line, or if a file outside
the owned list must change. The exact wording of items A, C, and D's successor row is yours to
decide and record.

## Acceptance criteria, cheap-first

1. `npm run format:check` exits 0.
2. `npm run lint:check` exits 0.
3. `npm run check` exits 0.
4. `npm run test:policy` exits 0 — the prose sweep over the edited Markdown and the TSDoc.
5. `npm run test:guides` exits 0 — the README pin, the parity rows, and the transcriptions hold.
6. `grep -c EBADDEVENGINES guides/scaffold.md README.md` reads 1 or more for each file.
7. `grep -c resolveNpm tests/distribution.test.ts` reads 0.
8. `grep -n "\`'s" ROADMAP.md guides/scaffold.md README.md src/core/constants.ts` prints nothing.
9. `grep -n 'one failing project\|one red case' ROADMAP.md` prints nothing.
10. `grep -c npm-boundary-readings.log.txt ROADMAP.md` reads 1 or more.
11. In `guides/scaffold.md`, the line "except the manifest." is followed, after one blank line, by
    the first `- ` bullet of the artifact list.
12. `git diff --stat` names only the owned files.

`test:setup`, `test:config`, `test:distribution`, and `test:src:*` are the Orchestrator's after
`build` regenerates the vendored inventory; report them only if you run them.

## Output

Return, as structured data: touched files with a one-line reason each; each criterion with its
exact exit code or reading; the final wording of items A, C, and D's successor row verbatim; the
deviation state. No process diary.
