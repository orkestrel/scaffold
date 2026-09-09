# Contract native-entry adoption report

## Result

Contract's authored `tests/guides.test.ts` now enters the accepted public
`GuideCommand`. Native-safe ports remain static. Contract runtime imports,
Vitest registration, and test setup runtime imports occur inside the anonymous
`execute` callback.

Contract source, its public API, package metadata, lockfile, configuration,
guides, README, scripts, and vendored files remain unchanged. Source is frozen
for root's supported Scaffold overwrite and acceptance work.

## Touched paths

- `C:/Users/mikes/WebstormProjects/contract/tests/guides.test.ts`
- `C:/Users/mikes/WebstormProjects/contract/tests/setup.ts`
- `C:/Users/mikes/WebstormProjects/contract/tests/setup.test.ts`

Root clarified that `tests/setup.test.ts` is granted only for direct proof of
the moved `readMembers` helper and its retained controls. Its edit stays within
that boundary. It now proves callable, accessor, and data partitioning and keeps
the documentable-method and symbol-key controls.

## Obligation mapping

| Obligation | Prior entry | Adopted entry |
| --- | --- | --- |
| Native entry | Static `@src/core` runtime imports failed before test registration. | `GuideCommand`, `readInventory`, and `createVitest` are the native-safe static runtime ports. |
| Inventory and rows | The file read directories and root files, parsed the manifest, created sources, and constructed `Parity`. | `GuideCommand` supplies fresh `files`, `rows`, and `report`; the package row remains required. |
| Pitch and titled examples | Local Guide and Source compositions compared the pitch and built the title pairing. | `report.pitch` and `report.examples.titles` carry the accepted generic findings. |
| Generic parity | Local calculations produced fences, methods, drift, function examples, method examples, imports, links, and test-link findings. | The matching `report` collections are asserted for the Contract row. |
| Internal declarations | Local source comparisons admit only the declared `INTERNAL` exception. | The same exception remains over `row.source` and public Guide comparison primitives. |
| Surface and hidden declarations | Local Guide and Source views checked direct, barrel, documented, and hidden populations. | The checks remain package-owned over the command's joined `guide` and `source` row. |
| Runtime classes | Static source imports and a local prototype helper drove the class and control assertions. | Source runtime values load in the worker callback; exported `readMembers` comes from `tests/setup.ts`. |
| Flagship fences | Package-owned executable examples and their source-text bindings ran at top level. | The same runtime and transcription assertions register inside the command callback. |
| Rewrite guidance | Comments named the retired docs launcher. | Comments name `--to guide` for source authority and `--to source` for guide authority. |

## Native red and green

The baseline command was:

```text
node --experimental-strip-types tests/guides.test.ts
exit 1
Error [ERR_MODULE_NOT_FOUND]: Cannot find package '@src/core'
```

The same command after adoption was:

```text
node --experimental-strip-types tests/guides.test.ts
exit 0
```

The native process started the real guides worker and completed Contract's
package assertions.

The aligned direction controls were:

```text
node --experimental-strip-types tests/guides.test.ts --to guide
exit 0

node --experimental-strip-types tests/guides.test.ts --to source
exit 0
```

Neither direction printed a `wrote` line. These runs are no-op controls over
aligned content. They do not replace the accepted nonempty rewrite and
fresh-inventory controls.

## Scoped validation

The helper fixture proof was:

```text
node node_modules/vitest/vitest.mjs run tests/setup.test.ts --config vite.config.ts --no-cache --reporter=dot --project setup
exit 0
```

Scoped lint was:

```text
node_modules\.bin\oxlint.cmd --config .oxlintrc.json --deny-warnings tests\guides.test.ts tests\setup.ts tests\setup.test.ts
exit 0
```

Scoped format was:

```text
node_modules\.bin\oxfmt.cmd --config .oxfmtrc.json --check tests\guides.test.ts tests\setup.ts tests\setup.test.ts
exit 0
All matched files use the correct format.
```

Scoped whitespace validation was:

```text
git -C C:/Users/mikes/WebstormProjects/contract diff --check -- tests/guides.test.ts tests/setup.ts tests/setup.test.ts
exit 0
```

## Remaining limits and root action

The direction runs observed aligned no-op behavior. Root retains the accepted
nonempty rewrite evidence and will supply stronger file comparison if required.

This writer did not run package-wide gates, build, install, pack, or artifact
comparison. Root owns supported Scaffold overwrite, valid dependency metadata,
complete source gates, artifact measurement, independent review, commit, and
release preparation.
