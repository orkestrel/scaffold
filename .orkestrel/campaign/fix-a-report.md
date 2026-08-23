# FIX-A report — the vendored gate contradicted the generated configuration

Role `implementer`, Opus 5, clean context, sole serial writer.
Brief: `.orkestrel/campaign/fix-a-brief.md`. Finding:
`.orkestrel/campaign/audit-v50-final-reconciliation.md`.

## What was broken

W1 added a vendored assertion requiring every root `test.projects` entry to be a function.
`src/core/compilers.ts:821` pushed `'appBrowser()'` — a called factory returning a plain record —
so **every `app/browser` workspace went red on its own `npm test`** the moment it took this
release's vendored bytes. A workspace scaffold had just created failed its own gate.

The gate was not weakened. An inline row is exactly what converts the release-mode publish gate into
a skip, which is the hole the gate exists to close. The generator was corrected instead.

## What landed

`appBrowser` takes `(options?: UserConfig)` and merges it over `applicationBrowser(false)`, matching
every sibling factory, and the row is registered as the bare identifier. The generated
`configs/app/vite.browser.config.ts` still calls `appBrowser()`, which an optional parameter keeps
working.

## The whole surface, enumerated rather than sampled

The brief asked whether any other row carried the same defect. Every `projects.push` site in
`src/core/compilers.ts` was enumerated: `srcCore`, `srcBrowser`, `srcServer`, `srcBin`, `appCore`,
`appBrowser`, `appServer`, `policy`, `config`, `setup`, `guides`, `conformance`, `service`,
`distribution`, `integration`, `probe`. Only `appBrowser` was a call. The unit also established that
this push list is the array's complete source — it reaches the emitted file only through the join
and the wrapped-layout branch — and added a sweep test pinning every emitted row as a bare
identifier over selections producing both layouts, so a future non-identifier row reddens rather
than shipping.

## Failing-first evidence, three controls

Reverting the row alone reddened three tests including the sweep. Re-sealing the signature alone
reddened two, with `error TS2554: Expected 0 arguments, but got 1` — the inverted type control
firing. Rewriting `appBrowser` back to `appBrowser()` inside a real installed workspace reproduced
the audit's failure byte for byte: `Tests 1 failed | 43 passed (44)`, `AssertionError: expected
[ [Function policy], …(2) ] to include { resolve: … }` at `tests/config.test.ts:318`. Each was
restored by the inverse edit.

## The criterion that actually proves it

Two workspaces materialized outside this repository from the rebuilt CLI:

```text
appbrowser (--app browser)          projects: [appBrowser, policy, config, probe]
                                    npm test → exit 0, test:config 44 of 44
mixed (--src core --app browser)    projects: [srcCore, appBrowser, policy, config, distribution, probe]
                                    npm test → exit 0, test:config 44 of 44
```

The brief's reproduction was `1 failed | 43 passed`. Both workspaces carry this candidate's vendored
`tests/config.test.ts`, installed through the sanctioned unpublished-dependency path — the built
candidate packed, the range swapped to that tarball for the install, and the `^0.0.50` range restored
before any gate ran.

## Left alone, with its reason

`appShowcase` is still sealed. It is not a `projects` row and is reached only by the showcase config
calling it, so Vitest never calls it and the seal costs nothing; adding an override with no consumer
would be speculative under the minimal-API law. The compilers test now states that split, so the two
shapes cannot drift silently.

## Shared-file patch, integrated by the Orchestrator

The vendored `tests/config.test.ts` carried a comment saying a browser-application workspace emits an
inline row "because that factory refuses overrides and so is not a value Vitest may call". That is
now false. The unit correctly reported the replacement rather than editing an off-limits vendored
file. The Orchestrator applied it and regenerated the inventory — the file already moves in this
release, so the correction costs no additional propagation.
