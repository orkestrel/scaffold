# Design brief: browser's four `protected` members become public API

Two blind lanes, one brief. `planner` (Opus 5, subjective) and `analyst` (GPT-5.6 Sol, objective).
Neither sees the other's answer. Read-only; propose, do not implement.

## Ruling already taken by the user — not open for debate

`protected` is compile-time only and erased at runtime, so these members already ship reachable by
any consumer. The user has ruled: **widen browser's public API rather than narrow the canon.** Your
job is not whether to widen, but *what the widened surface should be, member by member.*

## Context

Repository `/workspace/browser` (published `@orkestrel/browser`, a CDP-driven browser library).
`BrowserPage extends BrowserFrame`; both are exported from the core barrel. `BrowserFrameInterface`
and `BrowserPageInterface` live in `src/core/types.ts`. Canon: `AGENTS.md` (single-word
entity APIs, minimal public API, no superfluous wrappers), `.claude/rules/names.md`,
`.claude/rules/documentation.md` (every public export documented; behavioral interfaces get a
`## Methods` table and guide parity).

## The four members, with measured facts

All four sit in `src/core/BrowserFrame.ts` and are used by the `BrowserPage` subclass.

1. `assert(): void` — throws `BrowserError` when the client is disconnected. Called 9+ times inside
   `BrowserPage`, and **overridden** by `BrowserPage` (`super.assert()` at BrowserPage.ts:416). A
   genuine polymorphic seam.
2. `request(method, params?, timeout?): Promise<unknown>` — sends one raw CDP command through the
   client. Called throughout `BrowserPage`.
3. `raw(expression, timeout?): Promise<unknown>` — calls `#evaluate(expression, timeout)` directly.
   Compare the public sibling: `evaluate()` calls `this.assert()` then
   `#evaluate(guardEvaluateExpression(expression, BROWSER_RESULT_LIMIT), timeout)`. So `raw` is the
   deliberately **unguarded, unasserted** twin of `evaluate`. Exactly one subclass use:
   `await this.raw('location.href')` (BrowserPage.ts:553).
4. `update(url: string): void` — assigns the private `#url` field. No validation. Two subclass uses:
   BrowserPage.ts:555 (after resolving a navigation) and :792 (frame-tree update).

## The question

For each of the four, rule on the honest public shape and say why. The axes that matter:

- **Does a consumer have a legitimate reason to call it?** A CDP escape hatch (`request`) is
  standard in this class of library; Playwright and Puppeteer both expose one.
- **Does making it public weaken a guarantee the package makes?** `raw` bypasses
  `guardEvaluateExpression` and `BROWSER_RESULT_LIMIT`, which `evaluate` exists to apply. `update`
  can desynchronize the frame's recorded URL from reality with no validation.
- **Is there a coherence argument?** If `request` becomes public, a consumer can navigate
  out-of-band (`request('Page.navigate', …)`), after which the frame's `url` is stale — which is an
  argument that a public resync path is a genuine companion rather than a footgun.
- **Does the member need to exist at all in its current form?** `raw`'s single subclass use is the
  fixed literal `'location.href'`; the public `evaluate` would serve it, at the cost of a guard pass
  over a constant string.
- **Naming.** These become public entity members, so `.claude/rules/names.md` binds: single
  descriptive word, verbs for methods, no vague names. Rule on whether `update` and `raw` survive
  as names if they survive at all.

## Constraints on any proposal

- No `protected`, `private`, or `public` keyword, and no parameter property. `#` privacy is not
  subclass-accessible — say so plainly if your design needs a member the subclass cannot reach, and
  name the restructure that avoids it.
- Every member that ends public owes: a `types.ts` interface entry, complete TSDoc, and a guide
  `## Methods` row. Count that cost in your recommendation.
- Do not propose a wholesale inheritance-to-composition refactor. Bound proposals to these four
  members and the smallest supporting change.
- Preserve behavior. `BrowserPage` must keep working, and no existing public member changes meaning.

## Output

A per-member ruling table — member, verdict (public as-is / public renamed / internalized /
removed), and the one-line reason — then the exact resulting `BrowserFrameInterface` additions, then
the risks your ruling accepts. No process diary.
