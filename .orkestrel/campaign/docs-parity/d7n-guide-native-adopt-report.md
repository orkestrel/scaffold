# Guide native-entry adoption report

## Result

Guide's package-owned `tests/guides.test.ts` now uses the accepted public
`GuideCommand` as its direct native and Vitest-worker entry. The command
receives `readInventory` and `createVitest` directly. Its anonymous
registration callback loads runtime assertion dependencies and source-only
runtime imports after the worker boundary.

The public command API and runtime source did not change. Generated tooling,
package metadata, dependency ranges, the lockfile, and vendored files did not
change.

## Touched path

- `C:/Users/mikes/WebstormProjects/guide/tests/guides.test.ts`

`tests/setupServer.ts` remains unchanged because the existing command controls
already cover its reusable native carrier. No `tests/setupServer.test.ts` was
needed. `PROPOSAL.md` is absent and was not created.

The working-tree diffstat is:

```text
 tests/guides.test.ts | 755 +++++++++++++++++++++++++--------------------------
 1 file changed, 375 insertions(+), 380 deletions(-)
```

Most changed lines are the existing assertion body moving into the anonymous
`execute` callback.

## Removed generic shell

The entry no longer imports the core runtime statically before Node can enter
the shared command. It also no longer constructs its own full inventory,
manifest, source manager, `Parity`, rows, and report before registering tests.

The callback retains a package-specific `createSourceManager` composition for
the README API assertion. That assertion compares README tokens with the
package's public core surface and documented methods. It is package policy, not
a duplicate command shell.

The obsolete `npm run docs` comment now directs the reader to the native entry:
`--to guide` selects source authority and `--to source` selects guide
authority.

## Preserved assertions

The callback retains the indexed-input and row population checks, the Guide row,
the README API inspection, titled-example population, README pitch, row-scoped
surface, method, drift, function-example, method-example, import, link, test-link,
and fence-language checks.

The `flagship fences` group remains intact. It still executes Guide, fence
language, Source, SourceManager, bijection, drift, replacement, rendering,
tagline, projection, and path examples against fresh command inventory.

## Native red and green

Before the edit, the exact native command was:

```text
node --experimental-strip-types tests/guides.test.ts
exit 1
Error [ERR_MODULE_NOT_FOUND]: Cannot find package '@src/core'
```

The failure occurred before Vitest test discovery, so the process produced no
test-file or test-case failure tally.

After the edit, the same command was:

```text
node --experimental-strip-types tests/guides.test.ts
exit 0
Test Files  1 passed (1)
Tests  37 passed (37)
```

The default run printed no `wrote` line. It therefore followed the native
read-only branch.

The explicit source-to-guide direction was:

```text
node --experimental-strip-types tests/guides.test.ts --to guide
exit 0
Test Files  1 passed (1)
Tests  37 passed (37)
```

The explicit guide-to-source direction was:

```text
node --experimental-strip-types tests/guides.test.ts --to source
exit 0
Test Files  1 passed (1)
Tests  37 passed (37)
```

The aligned source caused neither directed run to print a `wrote` line. After
these runs, `git status --short` still named only
`tests/guides.test.ts`.

## Scoped validation

Guide project typecheck:

```text
node node_modules/typescript/bin/tsc --noEmit -p tsconfig.json
exit 0
```

Guides worker:

```text
node node_modules/vitest/vitest.mjs run --config vite.config.ts --no-cache --reporter=dot --project guides
exit 0
Test Files  1 passed (1)
Tests  37 passed (37)
```

Scoped lint:

```text
node_modules\.bin\oxlint.cmd --config .oxlintrc.json --deny-warnings tests\guides.test.ts
exit 0
```

Scoped format:

```text
node_modules\.bin\oxfmt.cmd --config .oxfmtrc.json --check tests\guides.test.ts
exit 0
All matched files use the correct format.
```

Scoped whitespace check:

```text
git -C C:/Users/mikes/WebstormProjects/guide diff --check -- tests/guides.test.ts
exit 0
```

## Installed artifact reading

The installed environment carries `@orkestrel/contract@0.0.17`,
`@orkestrel/markdown@0.0.14`, and `@orkestrel/test@0.0.14` from the accepted
local archives. Guide's declared ranges still name the prior releases, as the
brief states. `npm ls` reports those deliberate local overlays as
`ELSPROBLEMS`; no dependency or lockfile change was made.

The installed Test declaration accepts
`readInventory(root: URL | string, targets: readonly string[], options?)` and
returns an owned readonly inventory. The installed Vitest declaration accepts
`createVitest(mode, options, ...)` and returns a real `Vitest`. The
`GuideCommand` contract accepts those installed functions directly, confirmed
by the passing Guide typecheck and native run.

## Root action

Guide source is frozen for root. Root still owns supported Scaffold tooling
propagation, package metadata, ordered gates, distributable comparison, final
artifact replacement, independent review, and acceptance. Artifact impact has
not yet been measured by this writer.
