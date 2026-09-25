# Unit J-MOTION-PROOFS-A — Modal, Offcanvas, Backdrop, and Alert proofs read the rendered motion, and Modal's show follows its longest motion

## Role and engine

`opus` on Opus 5.5, a native Claude Code subagent writing in its own worktree. It is native because the proofs run in Chromium.

## Objective

The Modal, Offcanvas, Backdrop, and Alert proofs stay green whatever motion values the styles session ships, and still fail when the engine completes before the motion it moves has settled. Modal's show settles on every element whose motion its completion follows.

## Context

**The ruling.** Read `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md` § E32 whole. It is this unit's law, and you conform to it:
- no pinned duration, easing, or transitioned property list;
- a positive duration read on each element the engine moves;
- no running animation on any moved element at each completion event;
- a motion-factor case as a ratio of two readings;
- the shipped cascade, never a test-local copy.

**Why.** The styles session's motion ruling moves these transitions to Elements' motion contract. The ruling is `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/e-id-motion-design-verdict.md`; read its § Proof, § Pending shared changes for the engine session, and § Risks. Its motion units hold their landings until these proofs stop pinning Bootstrap's literals.

**What pins a literal at Veneer `0865c67`**, read with `git grep`. Locate each by the case title around it:
- `Modal.test.ts`, the case `reads the shipped modal declarations the motion and stacking proofs run under`: host `0.15s`, dialog `0.3s`, backdrop `0.15s`, and the property names `opacity` and `transform`.
- `Offcanvas.test.ts`, around lines 108, 122, and 126: panel `0.3s`, backdrop `0s` and `0.15s`.
- `Alert.test.ts`, around lines 44, 46, 109, and 151: `0s`, `0.15s`, and the factor-4 product `0.6s`.
- `Backdrop.test.ts` reads animations but pins no duration literal that `git grep` found. Confirm it against E32.

Find every other pin in the four files by reading them. The `git grep` above searched for quoted durations, `transitionDuration`, `getAnimations`, `factor`, and `--vn-motion`, and nothing else.

**What the engine does at `0865c67`.**
- `settleAnimations(element, signal)` in `src/browser/helpers.ts` waits on `element.getAnimations()` alone, without the subtree.
- Modal's show settles on `this.#dialog ?? host`, around line 325, and its hide settles on `host`, around line 374. Bootstrap's modal also waits on the dialog for its show. That holds only while the dialog's transition outlasts the host's fade.
- The motion ruling adds a `scale(0.96)` dialog entry and moves `.fade` to `ease-out`, so that order is no longer fixed.

**The Modal change (E32).** Modal's show settles on the dialog and on the host, and on any other element whose motion its `shown` follows. Read the hide path the same way, and settle on every element the hide's completion follows. A red-first case proves it: a cascade in which the host's fade outlasts the dialog's transition dispatches `shown` only after both settle.

That case may load a rule that lengthens the host's fade. E32 forbids a test-local copy of a shipped rule; a rule that sets up the case's condition is not a copy. Name that distinction in the case's comment.

**Law.**
- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`.
- These rules, all under `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/`: `tests.md`, `typescript.md`, `names.md`, and `browser.md`.
- `engine/decisions.md` § E9, E11, E24, E25, and E32.
- Skill: none. Guide: `guides/veneer.md` § Modal, § Offcanvas, § Backdrop, and § Alert, read-only.

**Installed primitives.** `@orkestrel/test` and the helpers in `tests/setupBrowser.ts`. Read those helpers before writing one. A reusable reading helper belongs in `tests/setupBrowser.ts`, which is off-limits here, so return it as a patch and keep a local call site until it lands. A helper duplicating one that exists is a defect.

**Host.** Windows 11 with Git Bash. The worktree is `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/motion-proofs-a` on branch `unit/motion-proofs-a`, cut from Veneer `main` `0865c67` with `node_modules` installed. Chromium 153 is installed for Playwright. A foreground call is capped at 10 minutes. Write each program to a file under `tmp/j-motion-proofs-a/` and run the file: no heredoc, no `python -`, no `node -e`. Run one test file at a time with `npx vitest run --config vite.config.ts --no-cache --project src:browser <file>`.

**A proof of the conversion.** A converted proof must survive the motion ruling's values. Plant them in a scratch copy of the cascade the test loads: a `250ms` panel, a `scale(0.96)` dialog entry, and `.fade` on `ease-out`. Run the four files against the plant, and record the reading. Then remove the plant exactly. It must never reach an owned file.

**Standing conditions.**
- Other units are changing `Collapse`, `Toast`, `Tab`, `Carousel`, `Dropdown`, `Tooltip`, `Popover`, `Placement`, `ScrollSpy`, `Button`, `src/browser/helpers.ts`, and `tests/setupServer.ts` in other worktrees. Touch none of them.
- J-OVERLAYS later owns Modal and Offcanvas for focus containment and composition. Change only what E32 requires.

## Unknowns

- Whether Offcanvas's `appearing` and `vanishing` promises already cover the backdrop's motion under every order of durations. Read them, and prove the order that reaches `shown` or `hidden` first.
- Whether the hide path of Modal needs the same two-element settle. Report the reading that decides it.

## Scope

**Owned.**
- `tests/src/browser/Modal.test.ts`, `Offcanvas.test.ts`, `Backdrop.test.ts`, and `Alert.test.ts`.
- `src/browser/Modal.ts`, for the settle alone.
- `src/browser/Offcanvas.ts`, `src/browser/Backdrop.ts`, and `src/browser/Alert.ts`, only to fix a completion that a converted proof finds firing before its motion settles.
- `tmp/j-motion-proofs-a/`.

**Report-only (return an exact patch against your tip).** `guides/veneer.md`, for each sentence your change makes false. `tests/setupBrowser.ts` and `tests/setupBrowser.test.ts`, for a reusable helper.

**Off-limits.** Every other file, including `src/browser/helpers.ts` and `tests/src/browser/helpers.test.ts`, which J-SAMEWAY-ENGINES-A owns. Also the vendored files: `tests/setupPolicy.ts`, `tests/policy.test.ts`, the root `tsconfig.json`, `vite.config.ts`, and `configs/**`, which the `scaffold repair` command restores.

**What asserts the state this change ends.** Every pin listed under § Context, and any case reading the dialog's animations at `shown` in `Modal.test.ts`. Find the rest by running the four files after each change.

**Tools and limits.** Read, Grep, Glob, Edit, Write, and Bash. Commit nothing. Install nothing. Never run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`. Format owned files with `npx oxfmt --config .oxfmtrc.json --write <files>`.

## Execution

Perform the assignment directly and spawn nothing.

## Output

Your final message holds:
- the files touched;
- a table of every converted pin: the file, the case title, what it pinned, and what it reads now;
- the Modal settle change, with its red-first case and the red reading on `0865c67`'s source, verbatim;
- any other engine defect a converted proof found, with its red and green readings;
- the plant run's reading, and the plant's removal;
- a mutation table: for each converted completion proof, the mutation that makes it fail (for example, settle on the dialog alone, or skip the settle), with the red reading;
- the report-only patches;
- the acceptance output verbatim;
- `git status --short`;
- the deviation state.

## Deviation contract

Follow § Deviation protocol in `C:/Users/mikes/WebstormProjects/scaffold/.agents/orchestration.md`. Stop and report when a change needs an off-limits file. You decide and record:
- the case titles and where each reading sits;
- whether a control reading of an element with no transition stays;
- how a completion case reads the settled state.

## Acceptance criteria

1. `npm run check`, `npm run lint:check`, and `npm run format:check` exit 0.
2. No owned test pins a duration, an easing, or a transitioned property list.
3. The Modal settle case reads red on `0865c67`'s source and green at your tip.
4. The four owned test files pass in scoped runs, both unplanted and against the plant.
5. Every mutation in the table reddens its proof by an assertion.

**Observations, not criteria.** The whole suite, which the Orchestrator runs after you exit.

## Review evidence

The Orchestrator commits your work on `unit/motion-proofs-a`, replays the red run, the plant, and the mutations, and gives the audit lanes the commit's diff, `git status`, your report, and its own replay.
