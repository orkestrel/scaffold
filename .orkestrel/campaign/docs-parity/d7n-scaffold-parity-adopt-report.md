# Scaffold parity adoption report

## Result

Not done. The real-command regression is green, but the native guides project exposes
an unresolved contract and policy mismatch. I stopped without weakening the shared
report assertions or editing the off-limits scaffold guide and source.

## Expected

The installed `createParity` engine would replace scaffold's generic parity loops while
preserving scaffold's existing assertion population. Each shared report group would be
asserted independently. The package-specific assertions and executable guide examples
would remain downstream.

## Found

`report.examples` applies Guide's exhaustive behavior-example policy. Scaffold's prior
gate used these expressions at campaign baseline `0e697e17` in
`tests/guides.test.ts`:

```ts
const examples = guide.fences().filter((fence) => fence.language === EXAMPLE_LANGUAGE)
if (examples.length === 0) vacant.push(`${entry.spec}: no code fence`)
```

That check required a `ts` fence in each indexed guide. The equality case then passed
each row to `findDrift(guide, source)`, which compared only already-paired titled examples.
The scaffold-specific population pin used:

```ts
const titled = new Set(documented.source.examples().map((example) => example.title))
const paired: string[] = []
for (const fence of documented.guide.fences()) {
	if (fence.title !== undefined && titled.has(fence.title)) paired.push(fence.title)
}
expect(paired.length).toBeGreaterThan(0)
```

Those expressions appear at baseline `tests/guides.test.ts:91-92`, `:175`, and
`:192-197`. They required a configured-language fence per guide, equality for matched
titles, and a matched title in scaffold's own guide. They did not require an example for
every function or documented member.

No other installed report family adds the exhaustive behavior population.
`report.drift` retains the matched summary/example comparisons. `report.fences` only
rejects languages outside `ParityOptions.languages`; it does not preserve the old
configured-language fence requirement. The retained scaffold-specific rows assertion
still pins a matched titled example in `guides/scaffold.md`. The installed
`ParityOptions` contract has no selector that lets this caller preserve the earlier
population while using `report.examples`, and the other report groups do not restore the
per-guide `ts` fence requirement.

The native guides run reports missing examples for these documented members:

- `MaterializerInterface.repair`
- `MaterializerInterface.mirror`
- `MaterializerInterface.catalog`
- `MaterializerInterface.remove`
- `WriteTransaction.copy`
- `WriteTransaction.establish`
- `WriteTransaction.remove`

The same run reports an `ORCHESTRATION_PATH_NAMES` summary mismatch. Root owns that
source-authority `--to guide` integration because `guides/scaffold.md` and product source
are off limits to this unit.

## Written product paths

- `tests/guides.test.ts`
- `tests/setupServer.ts`
- `tests/src/core/templates.test.ts`
- `tests/src/core/compilers.test.ts`
- `PROPOSAL.md`

The native entry now composes `createParity`, uses `readInventory`, validates input before
writes, writes returned changes once per path, rereads the inventory, reports fresh
findings, and starts the real guides project. It retains strict argument handling,
`VITEST === 'true'` dispatch, exit precedence, and runner closure.

The worker asserts the shared `input`, `surface`, `methods`, `links`, `tests`, `fences`,
`examples`, `imports`, `drift`, and `pitch` groups separately. It keeps scaffold's API
assertions and executable examples.

`driveClassifier` moved from duplicate guide/template implementations into
`tests/setupServer.ts`. The command fixture links the installed Test package and covers
native execution through npm in a workspace whose path carries spaces.

`PROPOSAL.md` now names `npm run test:guides -- --to guide` instead of the retired
`npm run docs` command.

## Defect proof

Permanent real-command case:

```text
node node_modules/vitest/vitest.mjs run tests/src/core/compilers.test.ts --config vite.config.ts --no-cache --reporter=dot --project src:core -t "the guides entry"
```

Before adoption, `tmp/pass/scaffold-parity-adopt/before.log.txt` and
`before.exit.txt` record exit 1 with:

```text
Tests  6 failed | 9 passed | 98 skipped (113)
```

After adoption, `tmp/pass/scaffold-parity-adopt/after-green.log.txt` and
`after-green.exit.txt` record exit 0 with:

```text
Tests  15 passed | 98 skipped (113)
```

The retained launcher is `tmp/pass/scaffold-parity-adopt/run.sh`. The successful host
invocation was:

```powershell
& 'C:/Users/mikes/scoop/apps/git/current/bin/bash.exe' /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/scaffold-parity-adopt/run.sh after-green
```

Launching the same script through the Windows Apps `bash.exe` shim failed before script
execution with `Bash/CallMsi/Install/REGDB_E_CLASSNOTREG`. No phase log was created by
that failed host invocation.

## Blocking scoped proof

Command:

```text
npm run test:guides
```

Evidence is retained at `tmp/pass/scaffold-parity-adopt/guides.log.txt` and
`guides.exit.txt`. It exited 1 with:

```text
Tests  2 failed | 19 passed (21)
```

The failures are the exhaustive `report.examples` findings above and the root-owned
summary drift. I did not run the remaining classifier, typecheck, lint, or format checks
after this contract divergence.

## Diff and status

Scoped diffstat:

```text
PROPOSAL.md                      |   8 +-
tests/guides.test.ts             | 833 ++++++++++++++++++++-------------------
tests/setupServer.ts             |  79 +++-
tests/src/core/compilers.test.ts | 588 ++++++++++++++++++---------
tests/src/core/templates.test.ts |  39 +-
5 files changed, 898 insertions(+), 649 deletions(-)
```

The existing dirty manifest, staged lock, generated inventory, guide, source, and retired
launcher changes remain untouched by this adoption unit. No shared-file patch is pending
outside the owned paths.

## Hypothesis

The extracted engine adopted the fleet's exhaustive example rule without a caller policy
boundary, so scaffold cannot preserve its prior example population through the installed
public contract.
