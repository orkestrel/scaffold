# Unit U4m — `@orkestrel/mcp` browser tests: the file header, one binding, one test name, one comment sentence

Successor to U4l (`.orkestrel/campaign/U4l-mcp-browser-fix-brief.md`). This file carries the A4i
reviewer's prose and naming findings (`.orkestrel/campaign/A4i-audit-reviewer.md`, `outside:`
R10 required, R11–R13 recommended, every one accepted by the Orchestrator) and wins over any
sentence it amends. The A4i objective lane and checker passed; nothing here changes behaviour.

## Role and engine

`builder` on Sonnet, a native Claude subagent (tools: Read, Grep, Glob, Edit, Write, Bash).
Perform the assignment directly and spawn nothing. You are the sole writer in the
`C:/Users/mikes/WebstormProjects/mcp` checkout while this unit runs. Every edit below is fully
specified; make exactly those edits and no other.

## Carriers

1. **R10 — the file header of `tests/src/browser/ModelContext.test.ts` (lines 26-31).** The
   header reads today:

   ```text
   // src/browser/ModelContext.ts — the WebMCP bridge, driven in real Chromium against the
   // IDL-faithful registry double. No browser exposes `document.modelContext` (the chromestatus
   // record, read 2026-09-15 and last updated 2026-08-12, reports `Proposed` with `"flag": false`
   // and `"origintrial": false`), so every scenario here proves the TRANSLATION and none of them
   // claims the native integration; `factories.test.ts` records this page's own reading of the
   // global.
   ```

   Replace it with this text, rewrapped to the file's comment width:

   ```text
   // src/browser/ModelContext.ts — the WebMCP bridge, driven in real Chromium against the
   // IDL-faithful registry double. Every scenario against the double proves the TRANSLATION; the
   // native block at the end of this file claims the integration where the host exposes the
   // registry, and `factories.test.ts` holds this page's reading as the relationship between the
   // property and what the factory returns. The dated reading of what browsers ship lives in the
   // `## WebMCP parity` matrix in `guides/mcp.md`.
   ```

   Leave the paragraph that follows (`Each scenario owns an isolated Document …`) unchanged.
2. **R11 — the binding `pruned`** in the pin `prunes a failed publication and keeps the names it
   carries` (near lines 219-220 of the same file): rename it to `standing` at its declaration
   and its one use. The binding holds the registrations that survived the prune, so the old name
   read as its opposite.
3. **R12 — the factories test name.** In `tests/src/browser/factories.test.ts` (near line 1327)
   rename `builds a bridge exactly where this page exposes the registry` to
   `builds a bridge exactly where this page exposes the property`, because the assertion's right
   side reads the property (`'modelContext' in document`), not a registry; the sibling in
   `validators.test.ts` already says "property".
4. **R13 — the comment opening sentence** in `tests/src/browser/factories.test.ts` (near line 1328)
   and `tests/src/browser/validators.test.ts` (near line 96): replace the fragment
   `The relationship rather than the reading, so this holds on any host` with
   `The assertion pins the relationship rather than the reading, so it holds on any host`,
   keeping the rest of each comment and rewrapping to the comment width.

## Context, law, host, and bench

`.claude/rules/writing.md` and `.claude/rules/tests.md` in the scaffold checkout govern the prose.
The mcp tree is dirty with the whole U4 chain on checkpoint `b9ff0b9` (27 tracked paths in
`git status --short --untracked-files=no`); leave every one of them as you find it. Windows host:
Git Bash for the Bash tool; no heredocs, no `node -e`. A scoped run is
`npm run test:src:browser -- tests/src/browser/ModelContext.test.ts tests/src/browser/factories.test.ts tests/src/browser/validators.test.ts`;
Chromium launches natively here. Run only that scoped project and the non-mutating checks; never
tree-wide `format` or `lint --fix`. Do not commit, stash, checkout, restore, reset, or clean.

## Scope

**Owned.** `tests/src/browser/ModelContext.test.ts`, `tests/src/browser/factories.test.ts`,
`tests/src/browser/validators.test.ts`, each only at the sites the carriers name. **Off-limits.**
Everything else.

## Deviation contract

Stop and report (expected, found, evidence, done or not) if any quoted text is not found exactly
once at the named site, or if the scoped run is red. Decide, record, and carry on only for the
line wrapping of the replaced comments.

## Acceptance criteria

1. `npm run format:check` and `npm run lint:check` exit 0.
2. The scoped browser run named in Context exits 0 with the reading P19 took on the same three
   files: 129 passed, 2 skipped.
3. A search over `src/**`, `tests/**`, and `guides/**` for `exposes the registry'`, for
   `records this page's own reading`, for `The relationship rather than the reading`, and for
   `const pruned` finds nothing; a search for `exposes the property'` finds the two test names.
4. Only the three owned files changed; `git status --short --untracked-files=no` names the same
   27 paths.

## Output

Touched files with line pointers; each carrier's before and after text; the acceptance readings
(command, exit, reading); the search results for criterion 3; deviation state.
