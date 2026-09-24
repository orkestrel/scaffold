# Unit J-GUARDS, round 2 — the audit's wording bounds and two pins

Successor of `j-guards-brief.md`. What changed and why: the landing audit (`units/j-guards-audit-verdict.md`; the reviewer on Opus 5.5, the analyst on Astra, the checker on Sonnet) confirmed the mechanism and found wording that breaks `.claude/rules/writing.md` (two event-map summaries shortened by dropping helper words and joining two ideas; one idea named by two verbs), a guide paragraph the change left incomplete, and two proofs without a pin. Each fix below adopts the reviewer's prescription.

## Role and engine

`builder` on Sonnet, a native Claude subagent (Read, Grep, Glob, Edit, Write, Bash), the sole writer in `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/guards` (branch `unit/guards`: round 1 committed as `f609bb0`, Veneer `main` `ca83afb` merged over it; `node_modules` current). Perform the assignment directly and spawn nothing.

## Objective

Apply the five fixes below exactly, with their proofs, and change nothing else.

## Context

**Law.** `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md` § Writing; `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/writing.md`, `documentation.md` (a Summary cell equals its TSDoc description paragraph in the `findDrift` form), and `tests.md`. Skill: none.

**Host.** Windows 11, Git Bash; `npm` and `npx` resolve to the `.cmd` shims; Chromium 153. Write each multi-step program to a file and run the file; no heredoc, no `node -e`.

**Standing conditions.** The worktree is clean at the merge commit. `tmp/j-guards/**` holds round 1's instrument and receipts; add round 2's files beside them.

**The fixes.**
- **W1 (the event-map summaries).** In `src/browser/types.ts`, replace the `ModalEventMap` summary `Maps each verb to the modal event it names, whose \`relatedTarget\` detail member carries the trigger passed to \`show\` on the \`show\` and \`shown\` events, else undefined.` with `Maps each verb to the modal event it names. The \`relatedTarget\` detail member carries the trigger passed to \`show\` on the \`show\` and \`shown\` events, and undefined on every other event.`, and the `OffcanvasEventMap` summary likewise with `offcanvas event`. Update the two guide Summary cells (the `ModalEventMap` and `OffcanvasEventMap` rows of § Surface) to the same text. Leave `TabEventMap` as it is.
- **W2 (one verb).** In `src/browser/types.ts`, the `RelatedDetail` summary becomes `Describes the detail of an event whose \`relatedTarget\` member carries the other element of a change, as Bootstrap's \`relatedTarget\` field does.`, and its member doc becomes `Carries the other element of the change, or undefined when the change has none; each entity's event map states which element that is.` Update the guide's `RelatedDetail` Summary cell to the new summary. In `src/browser/validators.ts`, the `isRelatedEvent` remarks' first sentence (`A tab, a modal, and an offcanvas panel dispatch each event with a detail object whose \`relatedTarget\` member names the other element of the change, which each entity's event map names, or undefined.`) becomes `A tab, a modal, and an offcanvas panel dispatch each event with a detail object whose \`relatedTarget\` member carries the other element of the change, or undefined when the change has none. Each entity's event map states which element that is.` Rewrap the comment lines at the file's width.
- **W3 (the guide's resolver paragraph).** In `guides/veneer.md`, the `resolveOptions` paragraph's sentence beginning `An undeclared attribute is ignored,` gains, after `An undeclared attribute is ignored,`, the clause ` a constructor key the parser table does not declare is never read and never reaches the result, each declared key is read once, so an inherited or non-enumerable one counts,`. Keep the rest of the sentence.
- **W4 (a detail that is really undefined).** In `tests/src/browser/validators.test.ts`, inside the `isBareEvent` block, add a case titled `returns false for a custom event whose detail reads undefined` that builds `new CustomEvent('shown.vn.collapse')`, overrides its `detail` with an own accessor returning `undefined` (`Object.defineProperty(event, 'detail', { get: () => undefined })`), and asserts `isBareEvent(event)` is `false`. Prove it binds: run the case green, then plant `value.detail == null` in place of `value.detail === null` in `src/browser/validators.ts`, run the case and record it red, and restore the file byte for byte (record the `sha256sum` before and after). Write the plant to `tmp/j-guards/pin-w4.py` and run the file.
- **W5 (the total table's `-?`).** Add a type receipt `tmp/j-guards/receipts/partial.ts` with its own `tsconfig.partial.json` (extending `configs/src/tsconfig.browser.json`, `"exclude": []`, `include` naming the file): declare `type Options = { readonly delay: number; readonly title?: string }` and `const parsers: ParserMap<Options> = { delay: parseNumber }` (import `ParserMap` from `src/browser/types.ts` and a parser the tree exports), which must fail with a missing-property error for `title`. Confirm with `--listFilesOnly` that the file is compiled. Then plant the removal of `-?` from `ParserMap` in `types.ts`, record the receipt admitted (exit 0), and restore byte for byte (`tmp/j-guards/pin-w5.py`).

## Unknowns

None. If an old text is not found verbatim, stop and report it.

## Scope

**Owned.** `src/browser/types.ts` (the three TSDoc sites in W1 and W2 only); `src/browser/validators.ts` (the W2 remarks only, and W4's plant, restored); `guides/veneer.md` (the three Summary cells and the W3 clause only); `tests/src/browser/validators.test.ts` (W4's case only); `tmp/j-guards/**`.

**Shared (report-only).** None.

**Off-limits.** Every other file.

**What asserts the state this change ends.** `tests/guides.test.ts` (the Summary cells), `validators.test.ts`.

**Tools and limits.** No install, commit, push, or discarding git command. oxfmt may re-pad the guide's Surface table when a cell grows: run `npx oxfmt --config .oxfmtrc.json guides/veneer.md` once, then check.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

Your final message: `git diff` of the owned files; W4's green, red, and restore readings; W5's refused, admitted, and restore readings with the `--listFilesOnly` line; each acceptance command with its exit code and last lines; `git status --short`.

## Deviation contract

Stop and report if an old text is not found verbatim or a gate fails for a reason outside these fixes. Decide and record: comment line breaks.

## Acceptance criteria

1. `npm run check:src:browser`, `npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser`, and `npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser guides/veneer.md` exit 0.
2. `npx vitest run --config vite.config.ts --no-cache --project src:browser tests/src/browser/validators.test.ts` passes, and W4 read red under its plant.
3. W5's receipt is refused on the source and admitted under its plant, and both plants restore byte for byte.
4. `npm run test:guides` and `npm run test:policy` exit 0.
5. `git status --short` lists only the four owned files.

## Review evidence

The Orchestrator reads the diff against W1 to W5 and re-runs the landing chain on the result.
