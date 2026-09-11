# Qualifier native guides entry report

## Outcome

Implemented the bounded native guides entry in
`C:/Users/mikes/WebstormProjects/qualifier/tests/guides.test.ts` at baseline
`7a65257fd9acd5c23dae71d5cdf7bb1105d64d43`.

The entry constructs `GuideCommand` with Qualifier's retained module, language,
guide, and internal-declaration policy. It inventories `src/**/*.ts`,
`tests/**/*.ts`, `guides/*.md`, root Markdown, and `package.json` through
`readInventory`, and runs the guides project through `createVitest`.

Static imports are native-safe. Vitest, contract, Guide core, test, reason, and
Qualifier source imports load inside the anonymous `execute` callback. The
package manifest is parsed and its `name` is bound to `@orkestrel/qualifier`
before the README pitch assertion.

## Assertion mapping

The native report supplies manifest input findings, title-pair findings, README
pitch findings, admitted fence-language findings, summary and titled-example
drift, function examples, and method examples.

Joined rows and direct Guide leaves preserve documented-surface non-vacuity,
direct-declaration export coverage, barrel-only exports, Qualifier's `INTERNAL`
policy, hidden-declaration refusal, documented method-group population,
interface and implementing-class checks, fence imports, relative links, and test
links. The entry does not read `report.sections`, `report.imports`,
`report.links`, `report.tests`, or `report.declarations`, because those aggregate
channels impose population policy the predecessor did not assert.

The complete flagship-fence block remains in the native worker callback. Its
inputs, calls, and expected results are unchanged. `oxfmt` reindented the block
and wrapped expressions to the configured width.

## Defect receipt

Before the change, root recorded the exact command:

```text
node --experimental-strip-types tests/guides.test.ts
EXIT 1
Error [ERR_MODULE_NOT_FOUND]: Cannot find package '@src/core' imported from
C:\Users\mikes\WebstormProjects\qualifier\tests\guides.test.ts
Tests: unavailable because collection did not start.
```

After the change, the same command returned:

```text
node --experimental-strip-types tests/guides.test.ts
EXIT 0
Test Files  1 passed (1)
Tests  25 passed (25)
Duration  722ms
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
git -C C:/Users/mikes/WebstormProjects/qualifier diff --check -- tests/guides.test.ts
EXIT 0
```

```text
rg -n "report\.(sections|imports|links|tests|declarations)" tests/guides.test.ts
EXIT 1
```

The empty search result confirms that the migration does not adopt the
strengthened aggregate channels.

```text
git -C C:/Users/mikes/WebstormProjects/qualifier status --short
 M tests/guides.test.ts
```

```text
git -C C:/Users/mikes/WebstormProjects/qualifier diff --stat -- tests/guides.test.ts
tests/guides.test.ts | 676 +++++++++++++++++++++++----------------------------
1 file changed, 310 insertions(+), 366 deletions(-)
```

## Scope and deviation

The Qualifier checkout carries the owned `tests/guides.test.ts` modification.
No source, guide, manifest, lockfile, vendored file, ref, or published state
changed. No install, build, full suite, generated timing test, commit, or push
ran. No deviation occurred. This report supplies implementation evidence and
does not claim source or release acceptance.
