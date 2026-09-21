# Unit CL5b — close the shared-block class across both style folders

## Role and engine

`sol` on Astra (GPT-6 Astra through `codex exec`, `workspace-write`), the sole writer in the
Veneer checkout (`C:/Users/mikes/WebstormProjects/veneer`), at the CL5 landing. Perform the
assignment directly and spawn nothing.

Read before acting: `AGENTS.md` at the Veneer checkout root, `.claude/rules/styles.md`,
`tests.md`, `architecture.md`, `names.md`, and `workspace.md`. This unit names no skill.

## Why this unit exists, and what is already measured

`.claude/rules/styles.md` moves a declaration block shared by two partials into
`src/styles/_mixins.scss`. That finding has come back in CL3, twice in CL4, and once more in
CL5's own report. Every sweep so far was scoped to one folder, and the rule is not: the
duplication that keeps reappearing crosses from `src/styles/elements/` to
`src/styles/components/`, where no folder-scoped sweep can see it.

The Orchestrator measured the whole space before writing this brief, so this unit closes a known
set rather than searching. Two instruments agree, and both readings are retained beside this
brief:

- `units/sweep-styles-authored.mjs` with `units/sweep-styles-authored.log.txt` — compiles each
  partial with Sass source maps and counts only declarations whose origin is that partial, the
  same discrimination CL4's own instrument used.
- `units/sweep-styles-source-2.mjs` with `units/sweep-styles-source-2.log.txt` — reads each
  partial's written SCSS text, grouped by brace block, and needs nothing beyond Node.

Over 44 partials and all 946 pairs, both return the same two hits:

| Partials | Shared block |
| --- | --- |
| `src/styles/elements/_heading.scss` and `src/styles/components/_type.scss` | `margin: 0`, `font-weight: var(--vn-weight-heading)`, `line-height: var(--vn-line-heading)`, `color: var(--bs-heading-color)` |
| `src/styles/elements/_img.scss` and `src/styles/components/_image.scss` | `max-inline-size: 100%`, `block-size: auto` |

Both were created by CL5's class twins reproducing the tag blocks CL3 landed, which is the
correct design under CL5's ruling; only the duplication is the defect.

## What this unit does

1. **Extract the heading block.** Add one mixin to `src/styles/_mixins.scss` emitting the four
   shared declarations, and include it from both `src/styles/elements/_heading.scss` and
   `src/styles/components/_type.scss`. Each partial keeps its own selector and its own distinct
   declarations, in particular the per-level size each already writes.

2. **Extract the image sizing block.** Add one mixin emitting the two shared declarations, and
   include it from both `src/styles/elements/_img.scss` and
   `src/styles/components/_image.scss`. Each partial keeps its own selector and its own distinct
   declarations.

3. **Land the sweep as a proof, so the rule enforces itself.** Neither extraction prevents the
   next one. Export the sweep as a function from the test setup module that owns it, cover that
   function with its own cases, and add one case asserting the tree carries no shared block. Use
   the dependency-free form: read each partial's written SCSS text, group declarations by brace
   block, and report every pair of partials from the population whose two blocks share two or
   more identical declarations. `units/sweep-styles-source-2.mjs` is the working reference; treat
   it as a reference, not as a file to copy, and write the function to this repository's rules.

   **The dependency constraint is absolute.** `source-map-js` is not declared in this package's
   manifest and reaches the tree only as another package's transitive dependency, so the shipped
   proof must not import it. Adding any package is the user's decision and is outside this unit:
   if you believe the proof needs one, stop and report rather than adding it. `sass` and
   `postcss` are declared, so either may be used if you find a reason to prefer them, but the
   text form already reproduces the source-map instrument's answer exactly.

## Unknowns

The Orchestrator has not settled these; the scope read that precedes your dispatch will answer
the first, and its answer will reach you in a successor brief. Settle the others yourself and
record what you chose.

- **Where the sweep function and its case live.** The function reads the filesystem, so it cannot
  sit in a module the browser-run styles project loads. The scope read names the setup module
  that runs under Node, the proof that covers it, and the proof that carries the tree-is-clean
  case.
- Each mixin's name, in the file's existing style, named for what it emits.
- Whether the sweep's population is the two style folders alone or every partial under
  `src/styles/`, given where partials actually sit.

## Scope

Owned: `src/styles/_mixins.scss`; `src/styles/elements/_heading.scss` and `_img.scss`;
`src/styles/components/_type.scss` and `_image.scss`; the setup module the scope read names, its
proof, and the proof carrying the tree-is-clean case.

Off-limits: every other file, including every other partial under `src/styles/`,
`src/styles/_tokens.scss`, `_reset.scss`, `tests/fixtures/**`, `guides/veneer.md`,
`package.json`, `configs/**`, and every vendored file. **`package.json` is off-limits without
exception**: this unit adds no dependency.

## Execution

1. The two extractions, then `npm run build:src:styles`.
2. Prove the emitted cascade is unchanged: compare `dist/src/styles/index.css` before and after
   the extractions and report whether it is byte-identical. The existing proofs for both tag
   partials and both class partials must stay green with no expectation edited.
3. The sweep function, its own cases, and the tree-is-clean case.
4. Prove the sweep can fail: plant a duplicated block across two partials the extractions did not
   touch, record the red run, remove the plant, and record the green run.
5. The ordered chain from the checkout root: `npm run format:check`, `npm run lint:check`,
   `npm run check`, `npm run build`, `npm test`, then the Edge runs of `test:src:styles`,
   `test:setup:browser`, and `test:app:browser` with `PLAYWRIGHT_CHANNEL=msedge`.

## Output

Write `cl5b-report.md` in the Veneer checkout and return it: each mixin's name, its
members, and its consumers; the cascade comparison's result; each proof that stayed green
unedited; where the sweep function and its cases live and why; the sweep's population, its pair
count, and its result; the plant's red run and the green run after its removal; each step's exit
code and final lines on both engines; the actual `git diff --stat` and
`git status --porcelain --untracked-files=all`; every plant's removal.

## Deviation contract

`.agents/orchestration.md` § Deviation protocol. Settle yourself: each mixin's name; the sweep
function's shape and signature; how its cases are written. **Stop and report** if either
extraction changes a resolved reading, if the sweep finds a pair this brief does not name, if the
proof appears to need a package the manifest does not declare, or if closing a criterion needs a
file this brief does not grant.

## Acceptance criteria

1. No two partials under `src/styles/` share a block of two or more identical written
   declarations, and the sweep proves it.
2. The built cascade is unchanged by the extractions, shown by a comparison you ran.
3. Every existing proof for the four touched partials stays green with no expectation edited.
4. The sweep is a covered, exported function with its own cases, and a planted duplicate reddens
   the suite.
5. `package.json` is absent from the diff.
6. Every gate exits 0 on managed Chromium and Edge.
7. The status lists only the files this brief owns.
