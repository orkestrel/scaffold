# Review of item 12 (`cc93a2b..5900987`)

Lane: objective, plus the copy a model reads. Opus 5.5, read-only at `5900987`, 2026-10-03.

VERDICT: FAIL 4, 6. Claims 1 (contract), 2 (rename, in code and tests), 3 (wake and release in code), 5 (copy and bound), and 7 (rules; roadmap items 6 to 8 citations hold) PASS.

## 4. Text semantics: FAIL

- Matches: visibility, `display`, closed `details`, and `until-found` agree with the capture (`src/core/types.ts:2313-2320`).
- Divergence on `content-visibility: auto`: item 11's P1 measured offscreen `auto` text as absent from `body.innerText` (scaffold `.orkestrel/veneer/showcase/browse.md:98`), while the capture keeps it ("`content-visibility: auto` remove[s] nothing", `src/core/types.ts:2337`). On a page with offscreen `auto` sections, `read` shows text an absent `wait` reports gone at its first check. The guide says only that off-screen positioning does not remove text (`guides/browser.md:2932`).
- Shadow content: item 11's P3 reads shadow-root-owned text as absent from `innerText` (`browse.md:100`), so text and capture agree, but `look` lists shadow content, so an absent wait on a web component's own text passes vacuously.
- The vacuous-pass paragraph (`guides/browser.md:2934`) names only a misspelled string and outline tokens.

## 6. Proofs: FAIL

Every code proof can fail (P1 in DOM and CDP, the toolset, compilers, recorder, validators, and journey replay cases). Two guide statements have no executed assertion (`.claude/rules/documentation.md` § Parity):

- `guides/browser.md:2932`: the P5 reading (closed `details`, `until-found`), and the opacity and `aria-hidden` statements; P5 settled a claim and was deleted instead of promoted (`.claude/rules/tests.md` § Probes).
- `guides/browser.md:2882`: the navigation difference ("settles `done` in the CDP placement and fails with `GONE` in this one").

## Findings outside the claims

- `src/core/compilers.ts:26`: "Events inside a shadow root do not cross its boundary" is false in general; composed events such as `click` cross. P4 measured only that `transitionend` is not composed.
- Stale trigger lists (ruling 5 requires every summary naming the triggers to change): `compilers.ts:30` (`@param predicate` "after each mutation batch"); `src/browser/BrowserDOMWait.ts:27` ("discovers it at the next mutation or `load`"); the fence comments at `guides/browser.md:1729` and `:2875`.
- Cost (advisory, unmeasured): the DOM engine re-checks synchronously on every `transitionend` and `animationend` with no frame coalescing; one class change that transitions N elements dispatches N events, each running `collectBrowserRoots` and `innerText` (a full outline capture for an element wait).
- Timing margin (advisory): `tests/service/browser.test.ts:951` takes `start` after the removal's round trip, so the at-least-150 ms check loses that latency under load.
- Names (subjective): nine test titles open "item 12" or "item 12 P1".
- Constant placement (subjective): `BROWSER_WAIT_EVENTS` sits at the end of `constants.ts`, not beside `BROWSER_STABLE_FRAME_COUNT` as the design placed it.
- UNRESOLVED: the U2 full service run's failed "appearance-control replay assertion"; only the writer's rerun calls it a flake.
- Referred: the rename's guide row changed in `5900987`, not `c797e1a`.

## Required changes

- R1: `guides/browser.md:2932` and `:2934`: add both cases to the text-wait paragraph and to the vacuous-pass list as text `read` or `look` shows while an absent wait passes at once: offscreen `content-visibility: auto` text is absent from this reading while `read` keeps it; shadow-root-owned text never counts.
- R2: beside `tests/src/browser/BrowserDOMView.test.ts:47` and `tests/service/browser.test.ts:940`: executed assertions that an absent wait on a closed `details` body and on `until-found` text resolves at once and opening the `details` makes it time out; that an absent wait on `opacity: 0` text times out; and that in the CDP placement an absent wait a navigation ends settles, while in the DOM placement it rejects `GONE`.
- R3: `tests/src/browser/BrowserDOMWait.test.ts:28-30`: the release-after-settle assertion cannot fail, because `#recheck` returns early on the aborted `#release` (`BrowserDOMWait.ts:81`), so a leaked listener runs no check. Wrap each root's `addEventListener` with a recorder that delegates to the real method and keeps each `signal`, and assert every recorded signal is aborted after settle, after abort, and at the deadline.
- R4: `src/core/compilers.ts:26`: "`transitionend` and `animationend` inside a shadow root are not composed in Chromium 154.0.4258.53, so this document listener does not see them."
- R5: `src/core/compilers.ts:30` and `src/browser/BrowserDOMWait.ts:27`: name the wait events beside the mutation batch and `load` in both trigger lists.
