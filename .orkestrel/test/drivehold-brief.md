# Unit TEST-DRIVEHOLD — `driveHold` releases the pointer on any failure after the marker, for the 0.0.23 release

## Role and engine

`builder` on Sonnet, reached as a native Claude subagent (Read, Grep, Glob, Edit, Write, Bash); the sole writer in the checkout `C:/Users/mikes/WebstormProjects/test` on `main` (`a5d7af3`, "Release 0.0.22"). Perform the assignment directly and spawn nothing.

## Objective

`driveHold` in `src/browser/helpers.ts` releases a held pointer on any failure that follows the marker write, not only on a missed press, with the release rejection carried as the cause of the original error where the release fails too; the doc block, the guide, and the proofs say so; `package.json` and `package-lock.json` carry version `0.0.23`; the package's gate chain is green, so the Orchestrator can hand the user the publish command.

## Context

**The ruling (the user, 2026-09-24).** Veneer's `tests/setupBrowser.ts` carries `holdOraclePointer`, a copy of `driveHold`'s pointer-driving sequence that differs in one way: after the marker write it wraps the frame wait and the `:active` read in one `try`, releases the pointer on any exception from either, and where the release itself fails it throws the original error's message with the release rejection as `cause`. `driveHold` releases only when the press is missed, so a rejected frame wait escapes with the marker set and the pointer held. The user ruled that the difference goes upstream into `driveHold`, this package republishes, and Veneer then routes `holdOraclePointer` through `driveHold` and deletes its copy. This unit is the upstream half.

**Evidence.** `src/browser/helpers.ts` `driveHold` (around line 670: the held-marker refusal, the resolver, the scroll and the unreachable refusal, the frame-scaled centre, the trusted move and press, the marker write, `await waitForFrame()`, the `:active` read that releases before refusing a missed press). Veneer's copy for the exact target behaviour, read-only: `C:/Users/mikes/WebstormProjects/veneer/tests/setupBrowser.ts`, the `holdOraclePointer` function (its `try` block after the marker write). The existing proof `tests/src/browser/helpers.test.ts` `describe('driveHold')` (around line 1250). The guide `guides/test.md`: the `driveHold` § Surface row (around line 311; its Summary equals the doc description and stays), the paragraph naming `driveHold` as the one pointer drive every hold verb shares (around line 452), and the errors table rows naming `driveHold` (around lines 1136 to 1137).

**Law.** `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/typescript.md` (TSDoc), `tests.md` (real implementations; a hostile input is an inert stub, never a mock of project behaviour), `documentation.md` (a guide Summary equals the doc description; the errors table names every thrown message), `writing.md`; skill: none.

**Host.** Windows 11; Git Bash (`npm.cmd` and `npx.cmd` resolve as `npm` and `npx`); the checkout root; the browser project launches Chromium through Playwright; `npm run test:src:browser -- <file>` runs one file. The `prove` MCP server is not reachable to a subagent; record that you made no call.

**Standing conditions.** No `any`, `as`, non-null `!`, `@ts-` directive, or `eslint-disable`; the platform element's own `matches` property shadowed on one test element is the hostile read this unit uses, an inert stub on a platform object, and no project-owned function is replaced or spied on. E6 applies: no alias or shim. Run the scoped checks while you work and the whole chain once at the end (the user's instruction).

**The obligation (an edit and a proof; red first).**

- **D1.** After the marker write, `driveHold` runs the frame wait and the `:active` read inside one containment; on any exception from either it releases the pointer (`releasePointer()`) and rethrows the original error; where the release rejects, it throws an `Error` carrying the original error's message with the release rejection as `cause`. A missed press keeps its message `Interactive target "<name>" did not enter the pressed state`. The doc block's `@throws` reads that a frame wait or pressed-state read that fails releases the pointer before the refusal, and that a failure whose release also fails carries the release rejection as its cause; the `@remarks` sentence naming "the `:active` read-back that releases before refusing a missed press" becomes the frame wait and the read-back both releasing before the refusal. The guide's paragraph (around line 452) says the same in one sentence; the errors table's two `driveHold` rows stand.
- **D2 The proof, red first.** In `describe('driveHold')`, a case "releases the pointer and rethrows when the pressed-state read fails after the marker is written": a fixture button as the existing case builds it, whose own `matches` property (a data property on the element instance) throws `new Error('read refused')`; `driveHold(() => button, 'Apply')` rejects with `read refused`, and afterwards the document element carries no held-pointer marker (the attribute `POINTER_HOLD` names, read through the same constant the helper uses, or the module-scope name it is exported under) and a following `driveHold` on a fresh button succeeds and is released. Record the failing command and its count before the fix (the case fails on the marker still present), then the same command green.
- **D3 The version.** `package.json` `version` reads `0.0.23`; `package-lock.json` reads `0.0.23` at its root `version` and at `packages[""].version`. No other manifest field changes.

## Scope

**Owned.** `src/browser/helpers.ts` (the `driveHold` function and its doc block only), `tests/src/browser/helpers.test.ts` (the `driveHold` describe), `guides/test.md` (the one paragraph), `package.json` and `package-lock.json` (the version fields only), `tmp/drivehold/**` for your logs.

**Off-limits.** Every other file.

**Tools and limits.** `Read`, `Grep`, `Glob`, `Edit`, `Write`, `Bash`. No install, commit, push, publish, or discarding git command; no tree-wide `format` or `lint --fix`. Scoped checks while you work: `npm run check`, `npx oxlint --config .oxlintrc.json --deny-warnings src tests`, `npx oxfmt --config .oxfmtrc.json --check src tests guides`, `npm run test:src:browser -- tests/src/browser/helpers.test.ts`. The whole chain once at the end, in this order, each exit recorded: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run build`, `npm test`. Write the chain to `tmp/drivehold/acceptance.sh` and run the file.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

Return the report as your final message: the diff of `driveHold` and its doc block, the added case, the red reading (command and count) and the green reading verbatim, the guide sentence, the two version edits, the verbatim exit line of every chain command with the last two lines of each test run, `git status --short` and `git diff --stat`, and the deviation state. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short hypothesis — when the hostile `matches` read cannot be arranged on a real element, when a gate outside your owned files is red at the baseline (record it as standing and continue), or when the guide's parity gate needs a change outside the one paragraph. Decide, record, and carry on from the case's position in the describe and the sentence's wording.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, and `npm run check` exit 0.
2. `npm run test:src:browser -- tests/src/browser/helpers.test.ts` green with the D2 case present and its red reading recorded before the fix.
3. `npm run build` exit 0, then `npm test` exit 0 (`test:guides` inside it green with the paragraph).
4. `package.json` and `package-lock.json` read `0.0.23` in the three fields named, and nothing else in them changed.
5. The status lists only the owned files.
