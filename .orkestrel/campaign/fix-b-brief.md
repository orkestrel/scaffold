# FIX-B — two silent-pass holes in the generated proof

## Role and engine

`implementer`, Opus 5, clean context.

## Objective

Close the two paths through the generated `tests/distribution.test.ts` where evidence is missing and
the run still reports success under `--mode release`. Publication is blocked until both are closed.

Every lane of a three-lane adversarial audit broke the claim that no such path exists. Read
`.orkestrel/campaign/audit-v50-final-reconciliation.md` first.

## Hole 1 — a subpath with no declaration is dropped without a word

In `buildStage()` at `src/core/templates.ts:1368`:

```ts
const declaration = resolveTarget(entry, ['types', 'import'])
if (declaration === undefined || !declaration.endsWith('.d.ts')) continue
```

The intended exclusion — `"./package.json": "./package.json"`, a manifest-pointer convention — and
an unintended miss share one silent branch. A published `"./legacy": { "import": "./dist/src/core/legacy.js" }`
with no `types` receives no runtime test, no declaration comparison, and no place in the
module-resolution compile, and nothing records that it was skipped. A consumer writing
`import … from 'pkg/legacy'` gets no declarations under `node16` and nothing reddens.

The only guard is `expect(stage.entries.length).toBeGreaterThan(0)`, which any surviving entry
satisfies.

**Partition instead of dropping**, which is the discipline this package's own bespoke proof already
applies to its `driven`, `undriven`, `glossed`, and `elided` lists. Collect what the loop skips and
assert the remainder is empty.

**Be careful what you assert empty.** A `"./styles": "./dist/src/styles/index.css"` target is
correctly not driveable and must not redden — an objective lane ruled that split right. The property
to establish: a subpath whose resolved target **is a JavaScript module** and which resolves no
`.d.ts` is a defect and reddens by name; a subpath whose target is not a runtime module is excluded
and is named in the excluded list rather than dropped. Settle the exact predicate yourself and state
which extensions you treated as runtime modules.

## Hole 2 — the core-only proof is blind to a browser face the workspace later publishes

`src/core/compilers.ts:1302` chooses the branch once, at generation time:

```ts
const browser = blueprint.src.includes('browser')
```

The artifact is presence-owned, so no verb ever rewrites it. An objective lane measured the
consequence on a real copy of `@orkestrel/indexeddb` carrying the core-only variant:

```text
npm run test:distribution -- --mode release
 Test Files  1 passed (1)
      Tests  4 passed | 2 skipped (6)
```

`entry.browser` is true, so `it.runIf(!entry.browser)` and the CommonJS case both skip, the
core-only variant emits no browser block, and the run is green with the browser entry never
imported, bundled, or loaded. `audit` reports the file `aligned`, because presence ownership never
compares bytes.

That is a normal fleet move — `console`, `router`, and `test` all gained a published browser face.

**Make the core-only variant fail on an entry it has no branch for.** The property: a proof that
cannot drive a browser entry must redden when one appears, rather than skip. The objective lane's
suggested shape, which you may adopt or improve:

```ts
it('publishes no browser face this proof cannot drive [requires the registry]', (context) => {
	const stage = requireStage(context)
	expect(stage.entries.filter((entry) => entry.browser).map((entry) => entry.subpath)).toStrictEqual([])
})
```

Consider whether emitting the browser branch unconditionally is better than guarding the core-only
variant, and rule with a reason. The imports it needs — `playwright`, `@vitest/browser-playwright`,
`vite` — are declared only for a browser-face workspace, so an unconditional emission changes what a
core-only workspace must declare. That cost is why the guard is the safer default; say so if you
choose otherwise.

## Unknowns

Whether any published `@orkestrel` package today has a subpath that resolves no `.d.ts`. Measure it
across the eleven checkouts under `/home/user/orkestrel/` and `/home/user/supervisor` and report,
because it decides whether hole 1 reddens a real target on adoption.

## Scope

**Owned:** `src/core/templates.ts`, `src/core/compilers.ts`, and the focused tests under
`tests/src/core/`.

**Off-limits:** `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`,
`tests/distribution.test.ts`, `host.json`, `guides/`, `src/bin/`, `src/server/`, `vite.config.ts`,
`package.json`, everything under `.orkestrel/`.

Do not commit, push, install a dependency, or run any `git` command that discards a working-tree
change. You are the sole serial writer.

## Execution

Perform this assignment directly and spawn nothing.

## Deviation contract

A conflict with the objective stops you and you report it. Predicate shape, test names, and message
wording are yours to settle, record, and carry on from.

## Acceptance criteria

Ordered so a cheap gate cannot be skipped by an expensive one failing first.

1. `npm run format:check` exits 0.
2. `npm run lint:check` exits 0.
3. `npm run check` exits 0.
4. `npm run test:src:core` exits 0.
5. **Executed with a firing control, hole 1.** Materialize a workspace outside this repository, add
   a published subpath whose target is a JavaScript module with no `types`, and show the generated
   proof **fails** naming that subpath. Then give it a `types` target and show it passes. Paste both.
6. **Executed, hole 1 negative control.** Show a `"./package.json"` entry and a non-module target do
   **not** redden, so the assertion excludes what it should.
7. **Executed with a firing control, hole 2.** Take a core-only workspace, give it a published
   browser export target, and show the generated proof **fails** rather than skipping. Remove it and
   show it passes. Paste both. This is the exact state the audit measured green.
8. `npm run build` exits 0, then `npm test` exits 0. If `npm test` fails, run each link of its `&&`
   chain separately and report every one.

## Review evidence

Return the actual `git diff` of both source files and the actual `git status --short`.

## Output

Return, with no process diary: the diff and status; one line per criterion with its exit code or
evidence; the criterion 5, 6, and 7 transcripts; the unknown answered with its measurement; your
ruling on unconditional emission versus the guard; and anything you could not close, named.
