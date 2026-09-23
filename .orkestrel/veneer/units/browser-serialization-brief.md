# Unit BROWSER-SERIALIZATION (`bs`) — the proofs read what the browser computes, not one build's serialization (D45)

## Role and engine

`builder` on Sonnet, a native Claude subagent, the sole writer in `/home/user/veneer-bs` (branch `unit/bs` from `97ac9ab`, its own `node_modules`, `npm run build:src` green at staging).

## Objective

The close, form-select, and validation style proofs and the Tailwind preflight service proof pass on Chromium 141 (this container) and on Chromium 153 (the engine session's host) by asserting computed geometry and build-independent values, per D45 in `/home/user/scaffold/.orkestrel/veneer/units/decisions-round-2.md`, with the guide's preflight paragraph naming the rule.

## Context

**Evidence.** The engine session's reading `/home/user/scaffold/.orkestrel/veneer/engine/units/host-chromium-153-reading.md` names each red assertion with both builds' readings: `tests/src/styles/components/form-select.test.ts` (the case "reads its spacing … so both factors rescale it", the `background-position` match `/^right 12px 50%,/u` around line 277; Chromium 153 reads `calc(100% - 12px) 50%, 12px 50%`); `tests/src/styles/components/validation.test.ts` (the case "carries the valid and invalid marks …", `toBe('right 9px 50%')` around line 77; the case "reaches every host through the scope …", `toBe('right 9px top 9px')` around line 335; Chromium 153 reads `calc(100% - 9px) 50%` and `calc(100% - 9px) 9px`); `tests/src/styles/components/close.test.ts` (the case "resolves the recorded content box, inset, and mark", `background-size` `toBe('<em>px')` around line 52; Chromium 153 reads `14px auto`); `tests/service/tailwind/preflight.test.ts` (the case "keeps every property the elements layer declares, and records every property the profile moves", the equality of the measured moves with the guide's recorded rows around line 150; Chromium 153's `select` and `table` user-agent defaults differ). Read each site in the worktree before editing; the line numbers are approximate.

**Law.** `AGENTS.md`; `.claude/rules/{tests,styles,documentation,writing,typescript}.md`; D45. Skill: none. Guide: `guides/veneer.md` § Tailwind (the preflight paragraph around lines 486 to 500, "each as Chromium 141 reports it") — owned for this unit's sentences and the preflight table's column semantics.

**Installed primitives.** `@orkestrel/test` browser readers (`readStyle`, `readPixels`, `readHit`; the entry `node_modules/@orkestrel/test/dist/src/browser/index.d.ts`); `getBoundingClientRect` and `getComputedStyle` in the browser project; this unit adds no helper and no package.

**Host.** Linux, `bash`; the worktree `/home/user/veneer-bs`; npm 11 on `PATH` through `export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`; Chromium 141 at `/opt/pw-browsers` (Chromium 153 is not available here; the engine session reads the proofs green on its host at its next landing, which is the acceptance evidence this unit cannot take). Several sibling units run in their own worktrees; a timing failure under load is re-run alone once and reported with the load reading.

**Measurements.** Take them yourself in the worktree before editing: the scoped runs of the four proofs green at `97ac9ab` on Chromium 141 (record the commands and result lines).

**Control identifiers.** None. A test is named for what it proves.

**Standing conditions.** `tests/setupPolicy.ts` and `tests/policy.test.ts` are vendored. No `git checkout`, `git restore`, `git stash`, `git reset`, `git clean`, `git worktree`, or `git add -N`. The mark and caret geometry: a `background-position` of `right 12px 50%` on a control whose box is `W` wide places a mark of width `m` with its right edge `12px` from the control's right border edge; read it through a probe that draws the same image at the computed position, or through the computed `background-position-x` and `background-position-y` longhands parsed to lengths against the control's padding box (`calc(100% - 12px)` and `right 12px` denote the same offset); choose one method, state it in a comment, and apply it at every red site. For `background-size`, accept a one-value serialization and its `<length> auto` form by parsing the width and asserting the height is `auto` or absent. For the preflight proof, compare each measured move by `tag | property | <preflight value>` and assert the standalone value is not equal to the preflight value, keeping the guide's table as it stands (its standalone column stays the Chromium 141 reading, informational); the guide's preflight paragraph gains one sentence stating D45's rule and names Chromium 141 as the build the standalone column was read on.

## Unknowns

None.

## Scope

**Owned.** `tests/src/styles/components/form-select.test.ts`, `tests/src/styles/components/validation.test.ts`, `tests/src/styles/components/close.test.ts`, `tests/service/tailwind/preflight.test.ts`, `guides/veneer.md` (the preflight paragraph's sentences and, if the reader function needs it, `tests/setupService.ts`'s preflight row reader), `tmp/units/bs-report.md`.

**Shared (report-only).** `ROADMAP.md`.

**Off-limits.** Everything else: every partial under `src/styles/`, the vendored files, `tests/setup.ts`, `tests/setupStyles.ts`, `package.json`, the sibling units' files (`_alert.scss`, `_carousel.scss`, the utilities and disclosure partials and their proofs and sections).

**What asserts the state this change ends.** The four owned proofs (green on Chromium 141 here; green on Chromium 153 on the engine session's host, its reading), `tests/guides.test.ts` and `tests/policy.test.ts` (the guide sentence).

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No commit, push, install, or destructive git command; no tree-wide `format` or lint `--fix`; scoped runs only.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

The report `tmp/units/bs-report.md`: each site's before and after with the method chosen, a mutation per changed assertion showing it still reddens on a wrong value (for example the caret placed `24px` from the edge, the mark sized `20px`, a preflight row dropped from the guide) with its command and result line, each gate's command and result line, and the guide sentence verbatim. The report states no count of a growable set and uses no banned term.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, one hypothesis — when a computed reading cannot be taken through the installed readers and `getComputedStyle`, or when the preflight comparison cannot be expressed without changing the guide's table. Decide, record, and carry on for the exact assertion shapes and the sentence's wording.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, and `npm run check` exit 0 in the worktree.
2. `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/form-select.test.ts tests/src/styles/components/validation.test.ts tests/src/styles/components/close.test.ts` exits 0 after `npm run build:src`, and no assertion in those files compares a serialized `background-position` or `background-size` string that names `right <length>` or a bare `<length>` where a build may serialize `calc(100% - <length>)` or `<length> auto`; each changed assertion reddens under its named mutation, recorded.
3. `npm run build:src:styles && npm run test:service` exits 0, and `preflight.test.ts` compares each measured move by tag, property, and preflight value and asserts the standalone value differs, with the guide's table unchanged; a guide row dropped reddens it, recorded.
4. `npm run test:guides` and `npm run test:policy` exit 0; the guide's preflight paragraph names Chromium 141 as the build the standalone column was read on and states that the proof compares the preflight value and the difference, not the build's default.
5. The report carries each item of § Output.

**Observations, not criteria.** The Chromium 153 reading is the engine session's at its next landing.

## Review evidence

`git -C /home/user/veneer-bs diff 97ac9ab` and `git -C /home/user/veneer-bs status --porcelain` at hand-back (`bs.diff`, `bs-status.txt`), and the report.
