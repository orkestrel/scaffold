# SSE native guide adoption report

## Outcome

SSE's authored guides test uses the public `GuideCommand` server entry with the installed
`readInventory` and `createVitest` ports. The unit is complete with no deviation.

## Frozen scope

The product change is `C:/Users/mikes/WebstormProjects/sse/tests/guides.test.ts`. Every other SSE
path remained off-limits and untouched. This file is the dispatch report required by the brief.

## Obligation mapping

| Obligation | Landed behavior |
| --- | --- |
| Native entry | `GuideCommand.execute` owns native argument handling, fresh worker registration, and runner cleanup. Package runtime exports, setup runtime exports, and Vitest registration load dynamically inside its direct callback. |
| Fresh inventory | The command reads `src/**/*.ts`, `tests/**/*.ts`, `guides/*.md`, and `*.md`. Assertions consume the callback's `root`, `files`, `rows`, and `report` values. |
| Package identity | The package guide row must resolve to `guides/sse.md`. The pitch report must be empty, which also refuses an absent README or tagline. |
| Generic parity | The test reads the report collections for input, titled examples, pitch, fences, methods, drift, function examples, method examples, self imports, links, and test links. |
| SSE surface policy | The test retains `INTERNAL`, its anti-staleness assertion, hidden-declaration checks, and the documented, direct, and barrel comparisons through public row primitives. |
| Method policy | The test retains a populated method-group assertion and uses the method report for behavioral-interface and implementing-class parity. |
| Source text | Guide and README presence guards read the command inventory. The file uses no separate filesystem reader. |
| Runtime and error controls | The real `SSEParser` paths, `captureError`, `isSSEError`, and `expectSSEError` controls remain registered. |
| Flagship behavior | Every executed SSE expression, source-text binding, presence guard, and literal code point remains unchanged. Formatting added callback indentation only. |
| Removed composition | The file no longer owns filesystem reads, manifest parsing, source-manager construction, or local fence, import, link, example, and drift aggregation. It introduces no helper function or standalone launcher. |
| Direction comments | The drift comment names `npm run test:guides -- --to guide` for source authority and `npm run test:guides -- --to source` for guide authority. |

## Baseline and validation

The native command was `node --experimental-strip-types tests/guides.test.ts`.

- Before the fix, the retained root baseline exited `1` with `ERR_MODULE_NOT_FOUND` for
  `@src/core`. Vitest did not collect a test file, so the failing test count was unavailable.
- After the fix, the same command exited `0`: `Test Files 1 passed (1)` and
  `Tests 38 passed (38)`.
- `npx oxfmt --config .oxfmtrc.json --check tests/guides.test.ts` exited `0` and reported that the
  matched file uses the correct format.
- `npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts` exited `0` with no
  diagnostic.
- `git -C C:/Users/mikes/WebstormProjects/sse diff --check -- tests/guides.test.ts` exited `0`.
- `git -C C:/Users/mikes/WebstormProjects/sse status --short` reported only
  `M tests/guides.test.ts`.

SSE diffstat:

```text
tests/guides.test.ts | 597 +++++++++++++++++++++------------------------------
1 file changed, 246 insertions(+), 351 deletions(-)
```

## Limits

The unit did not run a package-wide typecheck, build, test chain, install, rewrite direction, or
publication command. The Orchestrator owns final gates and independent review.

## Shared-file patches

None.
