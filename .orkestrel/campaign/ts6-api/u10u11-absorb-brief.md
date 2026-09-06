# Role and engine
grok bridge (Cursor Grok). Read-only absorption. Never a git command: this sandbox refuses the
`git` binary. Do not run `git` in any form.

# Objective
Absorb, for two fleet checkouts that read generated or installed TypeScript through the
in-process compiler API, exactly what the code computes at each site, so a replacement unit that
migrates them to `typescript` 6.0.3-only surfaces (also valid on 7) can be briefed without
re-reading the source. Those surfaces are: the `tsc` command (`--noEmit --pretty false -p`,
`--showConfig`, `--declaration --emitDeclarationOnly`); the parser Vite re-exports as `parseSync`
(ESTree-shaped program, UTF-16 spans); `transformWithOxc`; and runtime `import()`. Do not propose
a redesign or a replacement implementation. Return only distilled evidence.

# Context
Read-only reconnaissance across two independent checkouts:
- `/home/user/fleet/database`
- `/home/user/fleet/lsp`

No writes anywhere. No `git` commands of any kind — the sandbox denies the `git` binary and any
attempt wastes the run. Use plain file reads and search only.

# Unknowns
Whether `/home/user/lsp/tests/setupConformance.test.ts` and
`/home/user/fleet/lsp/tests/conformance.test.ts` exist. Check for each and report absence plainly
rather than guessing.

# Scope
Read-only. No owned files, no edits, no shared files. Tools: file read and search only.

# Execution
Perform this reconnaissance directly and return the findings in this same response. Spawn nothing.

# Bounded question

Two fleet checkouts still read generated or installed TypeScript through the in-process compiler
API, which the campaign removes while staying on `typescript` 6.0.3 using only surfaces both
6.0.3 and 7 ship (the `tsc` command with `--noEmit --pretty false -p`, `--showConfig`, and
`--declaration --emitDeclarationOnly`; the parser Vite re-exports as `parseSync` returning an
ESTree-shaped program with UTF-16 spans; `transformWithOxc`; runtime `import()`). For each site,
absorb what the code computes so a replacement unit can be briefed without re-reading it.

A. `/home/user/fleet/database/tests/setupServer.ts` and
`/home/user/fleet/database/tests/setupServer.test.ts`:
1. Every `typescript` import and every member of `ts.` used, with `file:line`.
2. For each exported function that touches the compiler (`deriveEntrySurfaces` and any other):
   its signature, what it computes step by step (program creation, checker calls, symbol flags,
   alias resolution, declaration walks), its inputs (which files or installed package it reads,
   under which tsconfig or compiler options), and its outputs (the shape returned), with
   `file:line` per step.
3. Every consumer of those functions across `tests/**` and `guides/**` in the same checkout
   (`file:line`), and what each consumer asserts.
4. The test cases in `setupServer.test.ts` that pin those functions: names, fixtures, what each
   proves, and any planted control.
5. The guide passages in `/home/user/fleet/database/guides/*.md` that describe this machinery
   (fence checks, entry surfaces, the doc-comment reading), with `file:line`.
6. Any fixture files or scratch tsconfig the machinery writes or reads.

B. `/home/user/fleet/lsp/tests/setupConformance.ts` and
`/home/user/fleet/lsp/tests/setupConformance.test.ts` (if it exists) plus
`/home/user/fleet/lsp/tests/conformance.test.ts` (if it exists):
1. Every `typescript` import and every `ts.` member used, with `file:line`.
2. The import walk: its signature, what forms of import it detects (static, type-only, bare
   side-effect, `import =`, dynamic `import()`, `require`), how it walks (`createSourceFile` and
   `forEachChild` or otherwise), what it returns, and every consumer with what it asserts,
   `file:line` each.
3. The test cases pinning it and any planted control.
4. The guide passages in `/home/user/fleet/lsp/guides/*.md` describing it.

C. For both checkouts: the `package.json` test scripts that run these files (`test:setup`,
`test:conformance`, `test:guides`), and whether `tests/setup.ts` (the host-independent setup)
also names `typescript`.

# Output

Return only:
- Distilled evidence with `file:line` pointers, never raw file dumps.
- The closing table: one row per compiler-touching function (checkout, file:line, name, what it
  computes in one clause, consumers count, tests count).
- A coverage statement at the end naming every file read.

# Deviation contract
If a named file does not exist, report its absence and continue with the rest of the brief. Any
other conflict with this objective stops the unit with a short report of expected, found,
evidence, done or not done.

# Acceptance criteria
- Every file named in sections A, B, and C is either read and cited with `file:line`, or reported
  absent.
- The closing table has one row per compiler-touching function found.
- The coverage statement lists every file actually read.
