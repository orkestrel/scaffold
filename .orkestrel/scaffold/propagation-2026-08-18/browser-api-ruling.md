# Reconciliation: browser's four `protected` members

Both lanes returned. `planner` (Opus 5, subjective) and `analyst` (GPT-5.6 Sol, objective) ran blind
on one brief. Sol's journal: `tmp/codex/browser-api-sol.jsonl`, thread
`01a01572-2be8-7f70-9ea4-1ec5e15fd37b`.

## Where the lanes agreed

| Member    | Opus                                  | Sol                            | Ruling                       |
| --------- | ------------------------------------- | ------------------------------ | ---------------------------- |
| `assert`  | public — polymorphic seam `#` cannot hold | public as-is                   | **public**                   |
| `request` | remove; widen `send` with `timeout?`  | rename → `send` with `timeout?` | **removed; `send` widened**  |
| `raw`     | remove                                | removed                        | **removed**                  |

## Where they diverged, and the ruling

`update(url)`. Sol renames it `sync`. Opus keeps `update`. **Keep `update`.**

`.claude/rules/names.md` fixes one term per concept, and `BrowserDownloadInterface.update(progress)`
(`src/core/types.ts:728`) already fixes `update` in this package as "record externally-observed new
state onto this entity". `update(url)` is that same concept. `sync` names going to read reality,
which this method does not do.

Opus additionally proposed adding `sync(): Promise<string>` as the reconciler a public `send`
creates. **Dropped.** `AGENTS.md` gates a new capability on its first real consumer, and none exists:
`#handleFrameNavigated` (`BrowserPage.ts:788`) already tracks self-navigation off the frame tree, so
a consumer navigating out-of-band through `send` gets `url` reconciled without calling anything.

## Facts measured against the lanes

Two lane claims were checked and one is false.

- **False.** Opus's lane reasoned that `guardEvaluateExpression` "returns `location.href`
  unchanged". It does not. `src/core/helpers.ts:1937` always wraps its argument in a
  `JSON.stringify` length-check IIFE. The ruling survives anyway: `BROWSER_RESULT_LIMIT` is
  2,500,000, and no `location.href` Chrome will navigate to approaches it.
- **True.** `raw` is the unguarded, unasserted twin of `evaluate`, with exactly one use:
  `BrowserPage.ts:553`, the fixed literal `'location.href'`.

## The one accepted behavior delta

`request` does not assert; `send` does, and `BrowserPage` overrides `assert` to also throw when the
page is closed (`BrowserPage.ts:415`). Folding `request` into `send` therefore adds an assert to 13
call sites, and replacing `raw` with `evaluate` adds one to a 14th.

None of the 14 sits in `#close` or `#destroy`. Each reached through a public method that already
asserts on entry gains nothing but a redundant idempotent check. The residual delta is the
close-race: a page closed while a navigation or screenshot is in flight now throws
`Browser page is closed` where it previously issued the CDP command. That is the more correct
outcome, and `#completeNavigation` already catches, cleans up, and rethrows.

## Resulting interface

```ts
assert(): void
send(method: string, params?: Readonly<Record<string, unknown>>, timeout?: number): Promise<unknown>
update(url: string): void
```

`request` and `raw` add no interface members: they cease to exist.
