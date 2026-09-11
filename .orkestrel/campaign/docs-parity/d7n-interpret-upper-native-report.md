# Interpret native guides entry report

## Outcome

Implemented the bounded native guides entry in
`C:/Users/mikes/WebstormProjects/interpret/tests/guides.test.ts` at baseline
`1b11d3e093ad41c65bd148e4f044af90f133ea2b`.

The entry constructs `GuideCommand` with Interpret's retained module, language,
guide, and internal-declaration policy. It inventories `src/**/*.ts`,
`tests/**/*.ts`, `guides/*.md`, root Markdown, and `package.json` through
`readInventory`, and runs the guides project through `createVitest`.

The `Template` import remains static and type-only. Runtime Vitest, contract,
Guide core, test, reason, and Interpret source imports load inside the anonymous
`execute` callback. The package manifest is parsed and its `name` is bound to
`@orkestrel/interpret` before the README pitch assertion.

## Assertion mapping

The native report supplies manifest input findings, title-pair findings, README
pitch findings, fence-language findings, populated method-section findings,
behavioral-interface and implementing-class findings, summary and titled-example
drift, function examples, method examples, fence imports, relative links, and test
links.

Joined rows and direct Guide leaves preserve documented-surface non-vacuity,
direct-declaration export coverage, barrel-only exports, Interpret's `INTERNAL`
policy, hidden-declaration refusal, and guide/barrel bijection. The migration does
not use `report.declarations`.

The complete flagship-fence block remains in the native worker callback. Its
fixtures, calls, inputs, and expected results are unchanged. `oxfmt` reindented the
new callback body and rewrapped expressions to its configured width. A
whitespace-insensitive diff shows only those formatter changes in the executed
block.

## Defect receipt

Before the change:

```text
node --experimental-strip-types tests/guides.test.ts
EXIT 1
Error [ERR_MODULE_NOT_FOUND]: Cannot find package '@src/core' imported from
C:\Users\mikes\WebstormProjects\interpret\tests\guides.test.ts
Tests: unavailable because collection did not start.
```

After the change, with the same command:

```text
node --experimental-strip-types tests/guides.test.ts
EXIT 0
Test Files  1 passed (1)
Tests  41 passed (41)
Duration  1.05s
```

## Scoped validation

```text
npx oxfmt --config .oxfmtrc.json --check tests/guides.test.ts
EXIT 0
All matched files use the correct format.
```

```text
npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts
EXIT 0
```

```text
git diff --check
EXIT 0
```

```text
git status --short
 M tests/guides.test.ts
```

```text
git diff --stat
tests/guides.test.ts | 1340 +++++++++++++++++++++++---------------------------
1 file changed, 619 insertions(+), 721 deletions(-)
```

## Scope and deviation

The Interpret checkout has only the owned `tests/guides.test.ts` modification.
No source, guide, manifest, lockfile, vendored file, ref, or published state
changed. No install, build, full suite, generated timing test, commit, or push ran.
No deviation occurred. This report supplies implementation evidence and does not
claim acceptance.
