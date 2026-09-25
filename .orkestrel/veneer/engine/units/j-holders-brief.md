# Unit J-HOLDERS — route each hand-rolled holder rule through the shared snapshot record, or rule why it stays

## Role and engine

`opus` on Opus 5.5, a native Claude Code subagent writing in its own worktree.

## Objective

Every holder rule in `src/browser` either uses `HostSnapshot`'s shared record (E25: one record per target, whose last holder writes it back), or stays with a stated reason that the record cannot express it. The record's private shapes are named once, and two missing proofs are added.

## Context

**Evidence.** The Orchestrator read these facts at Veneer `main` `6dd5034` with `git grep -n -E "#holdOpen|#releaseOpen|static #|holders|#claims|WeakMap|new Set" 6dd5034 -- src/browser/Modal.ts src/browser/Isolation.ts src/browser/ScrollLock.ts`:
- `Modal` keeps `static readonly #opened = new WeakMap<…, Map<string, { holders: Set<Modal>; snapshot: HostSnapshot }>>` and hand-rolls `#holdOpen(document)` and `#releaseOpen(document)` around the body's `open` token.
- `Isolation` keeps `static readonly #claims = new WeakMap<…>`, holding one snapshot and a list of `{ isolation, inert }` claims per element, and releases the last claim itself.
- `ScrollLock` keeps `static readonly #locks = new WeakMap<Document, { holders: Set<ScrollLock>; snapshot: HostSnapshot }>`. Its first lock measures the scrollbar and writes the body and the compensated selectors, and later locks join that first lock without measuring.
- `HostSnapshot` writes its private held-target shape `{ readonly target: HostSnapshotTarget; readonly key: string }` inline in four places (J-SNAPSHOT-SHARED round 3), and its record and presence map values are inline the same way.

The carried rows are in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/plan.md` § Carried findings: the J-HOLDERS row, the inline-shape row, and the proof-gap row from the J-SNAPSHOT-SHARED round-3 audit (`units/j-snapshot-shared-audit-3-verdict.md`).

**Law.** `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md` (Centralize by kind; Consolidation; No superfluous wrappers; Greenfield). The rules `.claude/rules/architecture.md`, `.claude/rules/typescript.md`, `.claude/rules/names.md`, `.claude/rules/tests.md`, and `.claude/rules/browser.md`. The decisions E13, E22 (amendment 3), E25 with its amendments, and E30 in `engine/decisions.md`. Skill: none. Guide: `guides/veneer.md` § Engine.

**Installed primitives.** `@orkestrel/test` and `@orkestrel/contract`. A helper whose job an installed export or an existing `src/browser/helpers.ts` export does is a defect.

**Host.** Windows 11 with Git Bash. The worktree is `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/holders` on branch `unit/holders`, cut from Veneer `main` at `4cd56a8` (the J-INTEGRATION and J-SAMEWAY landing). The browser is Chromium 153 through the Vitest project `src:browser`. A foreground call is capped at 10 minutes. Write each program to a file under `tmp/j-holders/` and run the file: no heredoc, no `python -`, no `node -e`.

**Control identifiers.** H1 is Modal's `open` token. H2 is Isolation's claims. H3 is ScrollLock's holders. H4 is the named shapes. H5 is the proofs. Name each test for what it proves.

**Standing conditions.** Other writers run in their own worktrees on `Collapse`, `Toast`, `Tab`, `Carousel`, `Dropdown`, `Tooltip`, and `Popover`. The styles session writes `src/styles/**` and `tests/setup*`.

## Unknowns

For each of H1, H2, and H3: whether the shared record expresses the rule exactly. That means the same writes, the same write-back by the last holder, the same behaviour when a holder is destroyed mid-change, and, for H3, measuring once. Report each as routed or stays, with the reason read from the source and a case that pins it.

## Scope

**Owned.**
- `src/browser/Modal.ts`, `Isolation.ts`, `ScrollLock.ts`, and `HostSnapshot.ts`. `types.ts` for H4's shapes alone, if the kind rule places them there.
- `tests/src/browser/Modal.test.ts`, `Isolation.test.ts`, `ScrollLock.test.ts`, `HostSnapshot.test.ts`, and `ColorMode.test.ts`.
- The sentences in `guides/veneer.md` § Engine that state a mechanism this unit moves.
- `tmp/j-holders/`.

**Shared (report-only).** None.

**Off-limits.** Every other `src/browser` source and test. `src/styles/**`. `tests/setupBrowser.ts` and `tests/setupBrowser.test.ts`. The vendored files: `tests/setupPolicy.ts`, `tests/policy.test.ts`, the root `tsconfig.json`, `vite.config.ts`, and `configs/**`.

**What asserts the state this change ends.** Every case in the owned test files that reads `#opened`'s, `#claims`'s, or `#locks`'s observable behaviour, found by running the owned files after each change.

**Tools and limits.** Read, Grep, Glob, Edit, Write, and Bash. Commit nothing. Install nothing. Never run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`. Format owned files with `npx oxfmt --config .oxfmtrc.json --write <files>`.

## Execution

Perform the assignment directly and spawn nothing.

## Output

Your final message holds:
- the files touched;
- for each of H1, H2, and H3: routed or stays, the reason, and the pinning case with its red and green readings verbatim;
- H4's named shapes and where they live;
- H5's cases with their red readings under the mutation that each distinguishes;
- the mutation table from the instrument's log;
- the acceptance output verbatim;
- `git status --short`;
- the deviation state.

## Deviation contract

Stop and report on a change that needs an off-limits file or a public type change beyond H4. You decide and record the order of H1, H2, and H3, and the names of H4's shapes under `.claude/rules/names.md`.

## Acceptance criteria

1. `npm run check:src:browser`, `npm run lint:check`, and `npm run format:check` exit 0.
2. **H1 to H3.** Each rule is routed through `HostSnapshot`'s shared record, or stays with its stated reason. A routed rule's static map and holder set are deleted, with no wrapper left in their place (Greenfield, E6). Each routed rule has a case that reads red when the last holder does not write the target back.
3. **H4.** `HostSnapshot`'s held-target shape and its record and presence value shapes are each declared once, where the kind rule places them, and no inline copy remains.
4. **H5.** A `ScrollLock` case passes a signal to a body-less first lock and proves that aborting it afterwards writes nothing and throws nothing. A ColorMode case uses a root whose theme attribute is present before construction, has persisting throw, and asserts that the attribute's value is restored and that the thrown error is the same object (`toBe(error)`). Each case reads red under a mutation it distinguishes.
5. **The instrument binds.** `tmp/j-holders/mutations.py` plants one mutation per obligation. It reads each case's failure message, refuses a kill caused by a `ReferenceError`, a syntax or transform error, an unbound identifier, or a collection failure, and holds one control. It restores every source byte for byte.
6. The owned test files pass in a scoped run.

**Observations, not criteria.** The whole `npm run test:src:browser` reading, which the Orchestrator takes after you exit.

## Review evidence

The Orchestrator commits your work on `unit/holders` and gives the lanes the commit's diff, `git status`, your report, and its own replay of your instrument with each killed case's failure message.
