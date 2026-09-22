# Unit G2 — Absorb the Veneer checkout

## Role and engine

`grok` on Cursor Grok 4.7 (`grok-4.7-high`), reached through the Cursor CLI in `--mode=ask`
(read-only). You are the bench engine reading this brief inside your own CLI: perform the assignment
directly and spawn nothing.

## Question

What does the checkout at `/home/user/veneer` contain and how does it work — the published engine
under `src/browser`, the `src/core` surface, the SCSS cascade under `src/styles`, the test projects
and proofs under `tests/`, the guide `guides/veneer.md`, the showcase under `app/browser`, and the
workspace configuration — and what evidence in it bears on each tenet in
`/home/user/scaffold/.orkestrel/veneer/tenets.txt`?

## Scope

Read-only. Read `/home/user/scaffold/.orkestrel/veneer/tenets.txt` whole first. Then read under
`/home/user/veneer`: `package.json`, `tsconfig.json`, `vite.config.ts`, `configs/**`, `src/**`
(every `.ts` and `.scss` file whole), `tests/**` (every `.ts` file; read the setup modules whole and
each test file far enough to state what it proves), `app/browser/**`, `guides/README.md`, and
`guides/veneer.md` (whole; it is large). Read `guides/scaffold.md` and `guides/guide.md` only by
their headings.

Do not read `node_modules`, `dist`, `package-lock.json`, or `.git`. Do not edit, create, or delete any
file. Run `git -C /home/user/veneer status --porcelain` before reading and again before answering,
and report both outputs verbatim.

## Output

Return evidence only: no decisions, no recommendations, no design proposals. Cite every fact as
`file:line` (path relative to `/home/user/veneer/`). Quote at most two lines per citation. Never
paste a file whole. Keep the whole answer under 500 lines. Use exactly these headings:

### A. Module map
One line per file under `src/`, `app/browser/`, and `tests/` (setup modules and root proofs; group
the mirrored style tests by folder): what it declares or proves, and its exports (names only).

### B. Engine
How `Button`, `ColorMode`, and `Delegate` work: construction, lifecycle (start/stop/destroy or
equivalent), event model, the DOM contract each reads (classes, `data-*` attributes, `aria-*`),
focus and keyboard handling, and how each honours a Bootstrap 5.3 markup contract. State, with grep
evidence (pattern and paths), whether any file under `src/` or `app/` imports or references
`bootstrap`, `@popperjs`, `vue`, or `@vue/reactivity`.

### C. Styles
The partial inventory by folder; the cascade-layer scheme; the token prefixes in use (`--vn-*`,
`--bs-*`, others) and where each is declared; the theme mechanism (`data-theme`, `color-scheme`,
`prefers-color-scheme`); the reset partial's behaviour; every selector that styles a bare element
by its position beside or inside another element (descendant, child, sibling, or `:has` selectors
over tags with no class), quoted with `file:line`; every literal colour outside `_tokens.scss`
(pattern and paths); the mixin list; every `transition`/`animation` declaration and whether it is
paired with reduced-motion handling.

### D. Tests and proofs
For each Vitest project `vite.config.ts` declares: its files, environment, and setup. For the
styles tests: which assert a resolved browser style or rendered pixel and which assert only the
compiled cascade text (name the helper each uses). The conformance mechanism: what
`tests/setupConformance.ts` and `tests/fixtures/oracle/*` do, where the Bootstrap reference comes
from, and what `tests/conformance.test.ts` compares. The journey layer: what
`tests/app/browser/integration.test.ts` drives and through which `@orkestrel/test` exports. Any
`vi.mock`, `vi.fn`, `vi.spyOn`, `vi.useFakeTimers`, `.skip`, `.todo`, or conditional skip (pattern
and paths).

### E. Guide
The heading map of `guides/veneer.md`; its `## Surface` tables (names only); its compatibility and
deferral tables (the keys admitted and the keys deferred, with line ranges); every sentence
claiming Bootstrap compatibility, Tailwind compatibility, framework independence, or native
platform use, with `file:line`.

### F. Dependencies
`package.json` `dependencies`, `peerDependencies`, and `devDependencies` (names and ranges); the
`exports` map; the `files` list; which `@orkestrel/*` packages `src/` and `tests/` import
(pattern and paths).

### G. Rule-conformance evidence
Grep the tree (name each pattern and its paths) for: `: any`, `<any>`, ` as ` type assertions
(exclude `as const`), non-null `!.` or `!)`, `@ts-ignore|@ts-expect-error|@ts-nocheck`,
`eslint-disable|oxlint-disable`, `export default`, `public |protected |private ` on class members,
nested `function` declarations or `const x = (` inside function bodies (report the files and the
enclosing function names), module-scope declarations in `*.ts` implementation files that are not the
one class, and non-exported module-scope declarations in centralized files (`types.ts`,
`constants.ts`, `helpers.ts`, `validators.ts`, `errors.ts`).

### H. Unknowns
Facts the question needs that you could not establish from the files read, one line each.

### Journal
The `git status --porcelain` outputs, before and after.
