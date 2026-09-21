# Unit U7b — fix round brief 4: the prune key is root membership

## What changed and why

This brief supersedes `u7b-brief-3.md`; that brief stands (with briefs 2 and 1 it
carries), and `u7b-report-3.md` is the baseline: the round-2 audit confirmed every
claim on the fix round, the verifier's whole chain exits 0 on Chromium and Edge, and the
objective reviewer found that the prune key brief 3 fixed — `button.host.isConnected` — is
document connectivity rather than membership of the delegate's own root. The key was the
Orchestrator's error.

## Findings carried

1. (reviewer 8) With `isConnected` as the key, a delegate over a `DocumentFragment` or a
   detached element destroys and rebuilds every engine on every click: the second click on a
   fragment-rooted host prunes engine A (restoring the absent attribute), constructs engine B
   from that restored state, and toggles on again, so the host reads `aria-pressed="true"`
   where the oracle reads `"false"`. A fragment root is declared support (`DelegateOptions.root`
   is a `ParentNode`; the fragment case asserts it) and the suite cannot see the defect because
   every detached-root case clicks once.
2. (reviewer 9) The same key never prunes a host that stays connected but is moved outside the
   root, so the delegate holds that engine and its host for its whole life and a consumer's
   `new Button(host)` refuses with `BUTTON_HOST_OWNED` with no way to release.

Ruling: the prune key is root membership — `this.#root.contains(button.host)` keeps an engine;
anything else is destroyed and dropped before target matching. That equals `isConnected` for a
`document` root and is right for fragment and detached roots.

## Role, engine, law, context, host, controls, unknowns, output, deviation contract

As in `u7b-brief-3.md`, verbatim. `HEAD` is `91e5906`; the working tree carries the
complete brief-3 result, uncommitted (some additions staged). Continue from it; do not restore
or reset anything. Make no wording, comment, or guide-prose change beyond what the code
requires.

## Scope

As in brief 3: `src/browser/Delegate.ts` and `tests/src/browser/Delegate.test.ts`. Nothing else.

## Execution

1. Add two cases red first on the current key: a fragment-rooted `data-bs-toggle` host clicked
   twice reads `aria-pressed="false"` after the second click and one engine is reused (no
   second construction; the ownership refusal or the engine identity proves it); a host the
   delegate toggled, then moved outside the root while still connected, is pruned on a later
   click elsewhere (its class and attribute restored) and a consumer's `new Button(host)`
   acquires it. Then change the key and run green. No plant is needed: the current key is the
   red.
2. Re-run and record: `npm.cmd run format:check`, `npm.cmd run lint:check`, `npm.cmd run check`,
   `npm.cmd run build:src:browser`, `npm.cmd run test:src:browser`,
   `PLAYWRIGHT_CHANNEL=msedge npm.cmd run test:src:browser`.

## Output

Write `u7b-report-4.md` and return its content: the key as landed, the two cases with
their red-then-green pairs (command and counts), each gate's final lines on both engines, the
actual `git diff --stat` and `git status --porcelain --untracked-files=all`. Do not repeat
reports 1 to 3.

## Acceptance criteria

1. The prune key is root membership; the two cases reddened on the old key and are green on the
   new one; every existing `Delegate` case stays green.
2. Every gate in item 2 exits 0 on managed Chromium and Edge.
3. `git status --porcelain --untracked-files=all` shows only brief 3's owned set and the report.

## Review evidence

The actual `git diff` and `git status` at return; this report with reports 1 to 3.
