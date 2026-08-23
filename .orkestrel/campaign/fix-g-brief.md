# FIX-G — a legal export shape escapes the partition

## Role and engine

`implementer`, Opus 5, clean context.

## Objective

Close the classifier hole both lanes of the successor round found, and the two false reds beside it.
Publication is blocked until this is closed. Read
`.orkestrel/campaign/audit-successor2-reconciliation.md` first.

## The defect

Node's exports field permits an **array** as a fallback list. In the generated proof:

- `collectTargets` rejects an array through `isRecord`, so it returns **no targets at all**.
- The subpath therefore lands in `excluded` — the bucket meaning "published for a reader" — where it
  is never imported, never required, never compiled against, and never existence-checked.
- The totality assertion stays green, because the subpath is accounted for.

Reproduced by the Orchestrator against the shipped functions:

```text
array fallback  {"./thing": ["./dist/src/core/index.js"]}   targets=[]  -> excluded
```

Sol did not stop at a reading. It published `{"./feature":["./feature"]}` and **drove
`require('runtime-package/feature')` successfully**, with an absent subpath throwing as its control.
The shape loads. And `isModule` recognizes only `.js`, `.mjs`, and `.cjs`, so an **extensionless**
runtime target escapes the module test even when the array is unwrapped.

The same hole makes the browser guard unreachable for that shape: an array-valued browser face
classifies `excluded`, so the guard stays green while a browser face is published.

## Two false reds in the same classifier

Both measured, both legal shapes that redden the publish gate today:

- `{"import":{"types":["./dist/src/core/index.d.ts"],"default":"./dist/src/core/index.js"}}` —
  an array-valued `types` condition. `resolveTarget` skips it, falls through to `default`, and the
  subpath reports `undeclared`.
- `{"require":{"types":"./dist/src/core/index.d.cts","default":"./dist/src/core/index.cjs"}}` —
  a `require`-only subpath **that does declare types**. The declaration lookup is
  `['types', 'import']` and never consults `require`.

## What to build

Both lanes converged on the same three-part repair. Adopt it or improve on it, and say which.

- **Recurse through export arrays** in `resolveTarget` — first resolving member — and in
  `collectTargets` — flat-map.
- **Admit an extensionless runtime target** to the module test. Settle the exact rule yourself: the
  property is that a target Node will load as code is classified as a module, while a target
  published for a reader is not. State what you chose and what it excludes.
- **Resolve the declaration through `require` as well as `import`**:
  `resolveTarget(entry, ['types','import']) ?? resolveTarget(entry, ['types','require'])`, or a
  shape you argue is better.

## What must not regress

Measured correct today and must stay so: `./package.json`, a `.css` stylesheet, a `.wasm` target,
and an extensionless target all currently land in `excluded`; `isModule` rejects `.d.ts` and
`.d.cts`. **The `.wasm` and extensionless cases are the tension** — extensionless must become a
module while `.wasm` must not, so a rule keyed on "has no known non-runtime extension" needs care.
Say how you separated them.

A `./*` subpath pattern currently reaches `driven` with a literal `./dist/*.d.ts` declaration and
fails on a file that cannot exist. Rule on whether that is acceptable, and report; do not silently
change it.

## Unknowns

Whether any published `@orkestrel` package uses an array form, an extensionless target, or a
`require`-only typed subpath. Measure across the eleven checkouts and report. It decides whether this
reddens or un-reddens a real target on adoption.

## Scope

**Owned:** `src/core/templates.ts` and the focused tests under `tests/src/core/`.

**Off-limits:** `guides/` — FIX-I owns the prose and will state whatever boundary you settle.
`src/core/compilers.ts`, `src/bin/`, `src/server/`, `tests/distribution.test.ts`,
`tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, `host.json`,
`vite.config.ts`, `package.json`, everything under `.orkestrel/`.

Do not commit, push, install a dependency, or run any `git` command that discards a working-tree
change. You are the sole serial writer.

## Execution

Perform this assignment directly and spawn nothing.

## Deviation contract

A conflict with the objective stops you and you report it. The module rule's exact shape, helper
names, and test placement are yours to settle, record, and carry on from.

## Acceptance criteria

Ordered so a cheap gate cannot be skipped by an expensive one failing first.

1. `npm run format:check` exits 0.
2. `npm run lint:check` exits 0.
3. `npm run check` exits 0.
4. `npm run test:src:core` exits 0.
5. **Executed with a firing control.** In a real materialized workspace, publish an array-form
   subpath whose target is a runtime module with no declaration, and show the generated proof
   **fails naming that subpath**. Then declare its types and show it passes. Paste both. This is the
   state both lanes measured green.
6. **Executed.** Publish an array-form **browser** face and show the core-only variant's guard
   reddens rather than staying silent.
7. **Executed.** Show the two false reds are gone: an array-valued `types` condition and a
   `require`-only typed subpath both pass.
8. **Executed, negative controls.** `./package.json`, a `.css` target, and a `.wasm` target still
   land in `excluded` and do not redden.
9. `npm run build` exits 0, then `npm test` exits 0. If `npm test` fails, run each link of its `&&`
   chain separately and report every one.

## Review evidence

Return the actual `git diff` of `src/core/templates.ts` and the actual `git status --short`.

## Output

Return, with no process diary: the diff and status; one line per criterion with its exit code or
evidence; the criterion 5 through 8 transcripts; how you separated an extensionless module from a
`.wasm` asset; your ruling on the `./*` pattern; the unknown answered; and anything you could not
close, named.
