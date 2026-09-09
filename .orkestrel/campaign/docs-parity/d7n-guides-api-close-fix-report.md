# Guide API close-fix report

## Result

The bounded Guide documentation and evidence corrections are complete. Guide
source is frozen for root's artifact replacement, ordered gates, installed
consumer rerun, and independent acceptance review.

The governing guide and README were corrected before the matching public TSDoc
was finalized. The guide now registers a real Vitest assertion inside
`GuideCommand.execute`, places the Vitest runtime import inside that callback,
states the native-versus-worker failure boundary, limits the pure inventory claim
to core, and names the direct `test:guides` entry.

## Touched paths

- `C:/Users/mikes/WebstormProjects/guide/README.md`
- `C:/Users/mikes/WebstormProjects/guide/guides/guide.md`
- `C:/Users/mikes/WebstormProjects/guide/src/server/types.ts`
- `C:/Users/mikes/WebstormProjects/guide/src/server/GuideCommand.ts`
- `C:/Users/mikes/WebstormProjects/guide/tests/setupServer.ts`
- `C:/Users/mikes/WebstormProjects/guide/tests/src/server/GuideCommand.test.ts`
- `C:/Users/mikes/WebstormProjects/guide/tests/src/server/helpers.test.ts`

No runtime method body, package metadata, dependency range, lockfile, barrel,
generated configuration, script, or vendored file changed in this close-fix.
The wider working tree still contains the accepted uncommitted command baseline
and root-generated server configuration.

The cumulative working-tree diff over these owned paths is:

```text
 README.md                             |  25 +-
 guides/guide.md                       | 435 ++++++++++++++++++++++++----------
 src/server/GuideCommand.ts            | 229 ++++++++++++++++++
 src/server/types.ts                   | 109 +++++++++
 tests/setupServer.ts                  |  50 ++++
 tests/src/server/GuideCommand.test.ts | 134 +++++++++++
 tests/src/server/helpers.test.ts      | 118 +++++++++
 7 files changed, 967 insertions(+), 133 deletions(-)
```

This diffstat includes the accepted API draft that preceded this correction
unit. It is not an attribution of every shown line to the close-fix.

## Example evidence

The original documented entry was exercised through the real installed Guide
artifact with:

```text
node tmp/pass/probe-guides-api-example.mjs C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/d7n-guides-api-example-red
```

The native child exited 1 with `No test suite found`. The parent instrument
completed at receipt `f28092`, and root read the retained evidence at
`71f42d`.

The attempted permanent Guide-local authored-entry control also ran red with:

```text
node node_modules/vitest/vitest.mjs run tests/src/server/GuideCommand.test.ts --config vite.config.ts --no-cache --reporter=dot --project src:server
```

The command exited 1 because the authored child returned status 1 where status
0 was required. A scratch entry kept within Guide's package scope resolved the
self-reference, then the real `readInventory` port rejected:

```text
ENOENT: no such file or directory, lstat '...\package.json'
```

Adding a fixture package manifest would create a separate package scope that
cannot resolve Guide's self-reference. Per the binding example-location
amendment, the non-working fixture and test were removed. No alias, junction,
package copy, link, install, skipped test, or conditional test remains.

Root then ran the corrected guide fence and corrected class TSDoc example through
the installed consumer using the unchanged native child command. Receipt
`551741`, read at `bc1142`, records status 0 and empty stderr for each
corrected example. Its registered control exited 0. Its immutable unregistered
control exited 1 with `No test suite found`. Root will repeat this proof
against the replacement archive.

## Public-edge readings

The tests import the installed `readInventory` and `createVitest` ports
directly. The real Guide TypeScript project accepts those assignments.

The installed Vitest declarations expose `createVitest` in
`node_modules/vitest/dist/node.d.ts:125`. The installed reporter declaration
exposes `onTestRunStart` in
`node_modules/vitest/dist/chunks/reporters.d.DtoKVV2s.d.ts:1057`.
The installed Vitest declaration exposes
`onClose(fn: () => Awaitable<void>)` in that declaration file at line 1507.

The native controls use those ports through isolated child processes. They
establish cleanup after a real reporter start rejection, reporting and exit
status after a real `onClose` rejection, and promise fulfillment after native
handling. The amended higher-exit carrier sets `process.exitCode` to 5, then
uses a real Vitest reporter whose supported `onTestRunStart` hook throws
`higher exit runner failed`. The command reports that failure, fulfills
`execute`, and preserves child status 5. The worker control uses the actual
installed reader and runner ports and establishes rejection by identity when
assertion registration rejects.

The native fixture centralizes the installed imports, event recorder, package
policy, command execution, and JSON observation in `tests/setupServer.ts`.
Each HOST case supplies only its real Vitest runner setup and keeps its selected
reporter or `onClose` seam visible. Unique native temporary entries and
`finally` cleanup remain in the subprocess boundary.

The helper controls exercise `formatGuideFinding` with absent, present, and
already-present prefixes; `resolveGuideRoot` with absolute and relative native
paths and a file URL containing spaces; and `selectGuidePitch` with a selected,
missing, and absent package name. Existing `matchesGuideResult` controls remain
unchanged.

## Scoped validation

TypeScript:

```text
node node_modules/typescript/bin/tsc --noEmit -p tsconfig.json
exit 0
```

Focused server controls:

```text
node node_modules/vitest/vitest.mjs run tests/src/server/GuideCommand.test.ts tests/src/server/helpers.test.ts --config vite.config.ts --no-cache --reporter=dot --project src:server
exit 0
Test Files  2 passed (2)
Tests  12 passed (12)
```

Guide parity:

```text
node node_modules/vitest/vitest.mjs run --config vite.config.ts --no-cache --reporter=dot --project guides
exit 0
Test Files  1 passed (1)
Tests  37 passed (37)
```

Scoped lint:

```text
node_modules\.bin\oxlint.cmd --config .oxlintrc.json --deny-warnings src\server\types.ts src\server\GuideCommand.ts tests\setupServer.ts tests\src\server\GuideCommand.test.ts tests\src\server\helpers.test.ts
exit 0
```

Scoped format:

```text
node_modules\.bin\oxfmt.cmd --config .oxfmtrc.json --check README.md guides\guide.md src\server\types.ts src\server\GuideCommand.ts tests\setupServer.ts tests\src\server\GuideCommand.test.ts tests\src\server\helpers.test.ts
exit 0
All matched files use the correct format.
```

No `.guide-command-*.ts` temporary carrier remains under Guide tests.

The registered Probe invocation remains unavailable because
`Legacy protocol 2025-11-25 cannot represent a stream result`. The unchanged
transport refusal was not repeated. The actual TypeScript project result above
is the contract reading; Vitest transformation is not presented as a typecheck.

## Freeze

Guide product source is frozen at this report. Root owns artifact replacement,
the post-pack installed-example rerun, ordered acceptance gates, and independent
review.
