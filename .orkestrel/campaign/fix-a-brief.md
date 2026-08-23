# FIX-A — the vendored gate contradicts the configuration scaffold generates

## Role and engine

`implementer`, Opus 5, clean context.

## What is broken, and how badly

W1 added an assertion to the **vendored** `tests/config.test.ts` requiring every entry of the root
`test.projects` array to be a function. Scaffold's own generator emits an entry that is not one.

`src/core/compilers.ts:821` pushes the literal `'appBrowser()'` — a **called** factory whose value
is a plain `UserConfig` record. The comment at `:817-820` says this is deliberate: "This one takes
no argument, so it is neither: the row carries the configuration it returns rather than the factory
itself."

So **every workspace with an `app/browser` axis goes red on `npm test` the moment it takes 0.0.50's
vendored bytes.** An audit lane measured it end to end:

```text
scaffold new demo --app browser --offline   → 122 written
vite.config.ts:132  projects: [appBrowser(), policy, config, probe]
npm run test:config → FAIL  root configuration > emits every project as a factory …
                      AssertionError: expected [ [Function policy], …(2) ] to include { resolve: … }
                      Tests  1 failed | 43 passed (44)
```

and reproduced it on the real `/home/user/supervisor`, which passes its **current** vendored proof
29 of 29 and fails 16 of 44 on the candidate's.

The propagation phase could not have caught this: none of the ten targets carries an `app/` axis,
and `supervisor` — the only checkout that does — is refused by `overwrite` for an unrelated
pre-existing reason.

## The fix, and the one you must not take

**Do not weaken the gate.** Exempting an inline row re-opens exactly the hole W1 exists to close:
`--mode release` reaches `import.meta.env.MODE` only through a function-form entry, so an inline row
silently converts the publish gate into a skip.

**Fix the generator instead.** Give the generated `appBrowser` the `(options?: UserConfig)` signature
every sibling factory has, and register the row as `appBrowser` rather than `appBrowser()`.

Verified facts you build on:

- `src/core/templates.ts:288` is `export function appBrowser(): UserConfig { return applicationBrowser(false) }`.
- Sibling factories take `(options?: UserConfig): UserConfig` and end `mergeConfig({...}, options ?? {})` — `policy` at `src/core/templates.ts:324` is the pattern.
- `src/core/templates.ts:720-722` generates `configs/app/vite.browser.config.ts` containing
  `import { appBrowser } from '../../vite.config.ts'` and `export default defineConfig(appBrowser())`.
  **That call site must keep working.** An optional parameter keeps it working; changing the call
  there is not required and should not be done unless you show it must.
- The comment at `src/core/compilers.ts:817-820` documents the old shape and becomes false. Rewrite
  it to say what the new shape is, and do not leave prose describing behaviour that no longer exists.

## Unknowns

Whether any other generated `projects` row is a called factory or an inline object. Enumerate every
`projects.push(...)` in `src/core/compilers.ts` and report what each pushes. If another one is not a
bare identifier, it has the same defect and you fix it the same way — say so in your report.

## Scope

**Owned:** `src/core/templates.ts`, `src/core/compilers.ts`, and the focused tests under
`tests/src/core/` that pin what you change.

**Off-limits:** `tests/config.test.ts` — it is vendored and its assertion is correct; the generator
is what is wrong. `guides/`, `src/bin/`, `src/server/`, `host.json`, `vite.config.ts`,
`package.json`, `tests/distribution.test.ts`, and everything under `.orkestrel/`.

Do not commit, push, install a dependency, or run any `git` command that discards a working-tree
change. You are the sole serial writer.

## Execution

Perform this assignment directly and spawn nothing.

## Deviation contract

A conflict with the objective stops you and you report it: expected, found, exact evidence, done or
not done, and at most one short hypothesis. Naming, comment wording, and where a test sits are
yours to settle, record, and carry on from.

## Acceptance criteria

Ordered so a cheap gate cannot be skipped by an expensive one failing first.

1. `npm run format:check` exits 0.
2. `npm run lint:check` exits 0.
3. `npm run check` exits 0.
4. `grep -n "appBrowser()" src/core/compilers.ts` returns nothing; the generated `projects` row is a
   bare identifier.
5. `npm run test:src:core` exits 0.
6. **Executed, not asserted.** Materialize an `--app browser` workspace outside this repository from
   the rebuilt CLI, install it, and run its `npm test` to a pass. Paste its `projects:` line and the
   `test:config` result. This is the criterion the defect is about; a passing unit test here is not
   a substitute for it.
7. **Executed.** Materialize a workspace with **both** a `src` axis and an `app/browser` axis and
   run its `npm test` to a pass, so the fix is not correct only for the app-only shape.
8. The `configs/app/vite.browser.config.ts` the generator emits still compiles in that workspace —
   covered by criterion 6's `check`, but report the file's relevant line.
9. `npm run build` exits 0, then `npm test` exits 0. If `npm test` fails, run each link of its `&&`
   chain separately and report every one; the chain short-circuits and hides every project after the
   first failure.

## Review evidence

Return the actual `git diff` of both source files and the actual `git status --short`.

## Output

Return, with no process diary: the diff and status; one line per criterion with its exit code or
evidence; the criterion 6 and 7 transcripts; the unknown answered with the enumeration; and anything
you could not close, named.
