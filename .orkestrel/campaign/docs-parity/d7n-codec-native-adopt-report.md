# Codec native guide adoption report

## Outcome

Codec's authored guides test uses the public `GuideCommand` server entry with the installed
`readInventory` and `createVitest` ports. The unit is complete with no deviation.

## Frozen scope

The product change is `C:/Users/mikes/WebstormProjects/codec/tests/guides.test.ts`. Every other
Codec path remained off-limits and untouched. This file is the dispatch report required by the
brief.

## Obligation mapping

| Obligation | Landed behavior |
| --- | --- |
| Native entry | `GuideCommand.execute` owns native argument handling, fresh worker registration, and runner cleanup. The `@src/core` module and Vitest registration load dynamically inside its direct callback. |
| Fresh inventory | The command reads `src/**/*.ts`, `tests/**/*.ts`, `guides/*.md`, `*.md`, and `package.json`. Assertions consume the callback's `root`, `files`, `rows`, and `report` values. |
| Package identity | The package guide row must resolve to `guides/codec.md`. The pitch report must be empty, which also refuses an absent README or tagline. |
| Generic parity | The test reads the report collections for input, titled examples, pitch, fences, drift, function examples, self imports, links, and test links. |
| Codec surface policy | The generic surface collection cannot express Codec's intentional alphabet and lookup omissions without reporting them as defects. The test retains direct row primitives for the documented, direct, barrel, and hidden-declaration obligations, plus the `INTERNAL` anti-staleness assertion. |
| Export keys | The exact package export-key assertion parses `package.json` from the command inventory. It uses no separate filesystem reader. |
| Charter | The test retains Codec's named `Surface`, `The laws`, `Membership`, `Declared non-goals`, and `Tests` section assertions. It does not assert the generic section report. |
| Flagship behavior | The executed codec expressions and their literal code points remain unchanged. Formatting added callback indentation only. |
| Removed composition | The file no longer owns filesystem reads, manifest parsing, source-manager construction, or local fence, import, link, example, and drift aggregation. It introduces no helper function or standalone launcher. |

## Baseline and validation

The native command was `node --experimental-strip-types tests/guides.test.ts`.

- Before the fix, the retained root baseline exited `1` with `ERR_MODULE_NOT_FOUND` for
  `@src/core`. Vitest did not collect a test file, so the failing test count was unavailable.
- After the fix, the same command exited `0`: `Test Files 1 passed (1)` and
  `Tests 28 passed (28)`.
- `npx oxfmt --config .oxfmtrc.json --check tests/guides.test.ts` exited `0` and reported that the
  matched file uses the correct format.
- `npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts` exited `0` with no
  diagnostic.
- `git -C C:/Users/mikes/WebstormProjects/codec diff --check -- tests/guides.test.ts` exited `0`.
- `git -C C:/Users/mikes/WebstormProjects/codec status --short` reported only
  `M tests/guides.test.ts`.

Codec diffstat:

```text
tests/guides.test.ts | 612 +++++++++++++++++++++------------------------------
1 file changed, 248 insertions(+), 364 deletions(-)
```

## Limitations

The unit did not run a package-wide typecheck, build, test chain, install, rewrite direction, or
publication command. The Orchestrator owns final gates and independent review.

## Shared-file patches

None.
