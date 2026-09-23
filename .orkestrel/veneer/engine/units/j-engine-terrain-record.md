# J-ENGINE terrain record (2026-09-23)

The one home for the measurements the engine session's briefs point at. A brief cites this record and restates no measurement; where a brief and this record disagree, this record wins and the unit stops. Every reading names the run that produced it.

## Host

- Windows 11 (`10.0.26200`), Claude Code `2.1.280`, Git Bash for the Orchestrator's tracked commands; the user runs PowerShell inside WebStorm, whose MCP server holds the four repositories.
- Node `v24.21.0`, npm `12.0.2` (Veneer's `devEngines.packageManager` pins npm `>=11.6.0`, satisfied; no npm 11 shim is needed on this host).
- Checkouts, all under `C:/Users/mikes/WebstormProjects/`: `scaffold` (the Orchestrator's, branch `claude/j-engine`), `veneer` (the user's, on `main`, an uncommitted `prompt.txt` edit the session never touches), `veneer-engine` (the session's integration worktree on `claude/j-engine`, E2), `elements` (`3b41900`), `mailbox` (`8b54542`). Every checkout has `node_modules` from `npm ci --ignore-scripts` with the lockfile digest written to `node_modules/.orkestrel-lock.sha256` (`29dacf6b…7539`).
- The browser: Playwright `1.63.0` resolves its pinned managed revision `chromium-1243` under `%LOCALAPPDATA%/ms-playwright`, Chromium `153.0.8010.12` (`HeadlessChrome/153.0.8010.12`), through the vendored `configs/browsers.ts` resolver's managed-revision step, ahead of the verified system channel Microsoft Edge `153.0.4234.48`. Every receipt names Chromium 153.0.8010.12 (E3).

## Benches (probed 2026-09-23 15:32 UTC)

| Bench | Binary | Probe | Answer | Handle | Record |
| --- | --- | --- | --- | --- | --- |
| Codex (Astra) | `codex-cli 0.156.1`, `Logged in using ChatGPT` | `codex exec --json --sandbox read-only --model gpt-6-astra`, effort low, prompt "Reply with the single word READY" | `READY` in 6 s | thread `01a0cee5-83f9-7fe2-aa97-6c31ea69355d` | `bench-probe-codex.log.txt` |
| Cursor (Grok 4.7) | versioned entry `2026.09.18-9a7762b` | `node.exe index.js -p --trust --mode=ask --model grok-4.7-high --output-format stream-json` | `READY` in 12.7 s | session `3e59bf7c-1fc4-4fb7-b9fa-69b306b2e778` | `bench-probe-cursor.log.txt` |

Both benches are live at session start. The routing for this session: `planner` and `reviewer` and `opus` native on Opus 5.5 (the alias's served model recorded per lane); `analyst` on `gpt-6-astra` through `codex exec` from a file brief, re-probed at each dispatch; `grok` on `grok-4.7-high` through the versioned Cursor entry, one lane at a time, launched detached through `tmp/cursor/<unit>.ps1`; `builder`, `checker`, `verifier`, `orkestrel` native on Sonnet. No substitution is recorded yet.

## Platform readings (the probe suite, run 2026-09-23 11:38 local)

Instrument: `j-engine-terrain-platform.test.ts` run through `j-engine-terrain-platform.config.ts` (the workspace's `srcBrowser` factory over `tmp/probe/**`), log `j-engine-terrain-platform.log.txt`. Controls: `control.present` (`addEventListener` on `HTMLElement.prototype`) read `true` and `control.absent` (a member that does not exist) read `false`, so the instrument tells presence from absence. Trusted input readings drove the page through Playwright's `userEvent`. The readings, verbatim from the run:

```json
{
 "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/153.0.8010.12 Safari/537.36",
 "control.present": true,
 "control.absent": false,
 "dialog.showModal": true,
 "dialog.requestClose": true,
 "dialog.closedBy": true,
 "dialog.closedBy.reflect": "any",
 "popover.attribute": true,
 "popover.showPopover": true,
 "popover.hidePopover": true,
 "popover.togglePopover": true,
 "popover.popoverTargetElement": true,
 "popover.selector": true,
 "popover.hint": true,
 "ToggleEvent": "function",
 "CommandEvent": "function",
 "command.attribute": true,
 "commandForElement": true,
 "inert": true,
 "CloseWatcher": "function",
 "anchor.anchorName": true,
 "anchor.positionAnchor": true,
 "anchor.positionArea": true,
 "anchor.positionTryFallbacks": true,
 "anchor.positionTryOrder": true,
 "anchor.positionVisibility": true,
 "anchor.area.physical": true,
 "anchor.area.logical": true,
 "anchor.area.span": true,
 "anchor.fallbacks.flip": true,
 "anchor.fallbacks.area": true,
 "anchor.visibility": true,
 "anchor.function": true,
 "anchor.size": true,
 "transition.allowDiscrete": true,
 "CSSStartingStyleRule": "function",
 "interpolateSize": true,
 "calcSize": true,
 "getAnimations": true,
 "animation.finished": true,
 "animation.commitStyles": true,
 "CSSTransition": "function",
 "startViewTransition": true,
 "beforematch": true,
 "hidden.untilFound": "until-found",
 "details.name": true,
 "details.contentPseudo": true,
 "IntersectionObserver": "function",
 "IntersectionObserver.scrollMargin": true,
 "IntersectionObserver.trackVisibility": true,
 "ResizeObserver": "function",
 "scrollend": true,
 "scrollSnap": true,
 "scrollIntoView.container": "accepted",
 "scrollbarGutter": true,
 "overscrollBehavior": true,
 "AbortSignal.any": "function",
 "AbortSignal.timeout": "function",
 "CSS.escape": "function",
 "checkVisibility": true,
 "moveBefore": true,
 "userActivation": true,
 "reducedMotion.matches": false,
 "forcedColors.matches": false,
 "setHTML": true,
 "setHTMLUnsafe": true,
 "Sanitizer": "function",
 "sanitizer.default": "<b>safe</b><a>link</a>",
 "focusVisible.option": true,
 "popover.togglePopover.return": "true/false",
 "popover.beforetoggle.cancelable": "cancelable=true openedDespitePreventDefault=false",
 "dialog.beforetoggle": "beforetoggle",
 "details.beforetoggle": "none",
 "dialog.showModal.scrollLock": "bodyOverflow=visible scrollTopAfterScrollTo500=500",
 "dialog.showModal.inert": "outsideFocusable=false insideFocusedOnOpen=true",
 "transition.getAnimations": "count=1 kind=CSSTransition property=width finished=resolved",
 "transition.cancel": "events=run,start,cancel outcome=finished-rejected:AbortError",
 "transition.removeMidway": "events=cancel outcome=finished-rejected:AbortError",
 "transition.reducedMotionZero": "animations=0 events=",
 "popover.lightDismiss.trusted": "openBefore=true openAfterOutsideClick=false",
 "popover.escape.trusted": "openAfterEscape=false",
 "dialog.closedby.any.trusted": "openAfterOutsideClick=false cancelEvents=1",
 "closeWatcher.escape.trusted": "closed=1 cancelCancelable=true"
}
```

What the readings settle, each a fact of this build and not of a version table:

- Every feature the research report's § A and its unresolved-inputs list named ships here: `<dialog>` with `showModal`, `requestClose`, and `closedBy` (the `closedby="any"` attribute reflects and light-dismisses a modal on an outside click, firing `cancel` once); the Popover API in `auto`, `manual`, and `hint`; `ToggleEvent` and `CommandEvent` with the `command` and `commandfor` attributes; `inert`; `CloseWatcher` (Escape fires a cancelable `cancel` then `close`); CSS anchor positioning whole, physical and logical `position-area` keywords, `span-*`, area and flip fallbacks, `position-visibility`, `anchor()` and `anchor-size()`; `transition-behavior: allow-discrete` and `@starting-style`; `interpolate-size` and `calc-size()`; `IntersectionObserver` v2 (`trackVisibility`) and `scrollMargin`; `scrollend`; `scrollIntoView` with a `container` option; `AbortSignal.any` and `timeout`; `Element.setHTML` and `Sanitizer`; `focus({ focusVisible })`; `navigator.userActivation`; `Element.moveBefore`.
- A popover's `beforetoggle` is cancelable, and `preventDefault()` keeps it closed. A `<dialog>` fires `beforetoggle` on `show()`. A `<details>` fired no `beforetoggle` when its `open` property was set by script in this run.
- `showModal()` makes the rest of the document inert (an outside button cannot take focus; the dialog's first focusable child takes focus on open) and does not lock document scroll (`body` overflow stays `visible`, and `scrollTo(0, 500)` moves the document to 500). Scroll locking is the engine's own obligation.
- A CSS transition is an `Animation` this build exposes through `getAnimations()` as a `CSSTransition` with its `transitionProperty`; its `finished` promise resolves at completion. Reverting the property mid-flight fires `transitioncancel` and rejects `finished` with an `AbortError`; removing the element mid-flight does the same. A `0s` transition creates no animation and fires no event. Completion therefore reads from the animation itself with no timer, and the reduced-motion case is "no animation", not a shorter wait.
- The default `Sanitizer` used by `setHTML` removes a `<script>` element, an `onclick` attribute, and a `javascript:` `href` (the anchor kept, the attribute dropped), which is stricter than Bootstrap's allowlist on the URL but drops the attribute rather than the element.
- Trusted input: `popover="auto"` light-dismisses on an outside click and on Escape; a `closedby="any"` modal dialog light-dismisses on an outside click.
- This host runs with `prefers-reduced-motion` unmatched and `forced-colors` inactive; a proof stages either through the installed Test `MediaOptions` contract.

## Spot checks over the candidate map (the Orchestrator, 2026-09-23)

Taken in `C:/Users/mikes/WebstormProjects/veneer/node_modules/@orkestrel/` after the map returned:

- `emitter/dist/src/core/index.d.ts:74` and `:147` read `emit<K extends keyof TMap>(event: K, ...args: TMap[K]): void;` — the map's reading that `emit` cannot be cancelled holds.
- `timeout/dist/src/core/index.d.ts:108` opens `export declare class Timeout implements TimeoutInterface`; `abort/dist/src/core/index.d.ts:169` declares `linkSignal(own: AbortSignal, parent: AbortSignal | undefined): AbortSignal`.
- `test/dist/src/browser/index.d.ts:2992` declares `waitForAnimations(element: Element, options?: WaitOptions): Promise<void>`; its `@remarks` (`:2960-2990`) state that it parks on each animation's own `finished` promise, re-reads the list after each completion or cancellation, leaves infinite, filling, and paused animations out, defaults the budget to `1000` ms, and refuses a detached element.
- `grep -l "node:"` over the built core entries `abort`, `timeout`, `emitter`, `template`, and `contract` (`dist/src/core/index.js`) matched none; it matched `html/dist/src/core/index.js` once (unread in context; `html` is not a candidate the engine imports for a live element).
- Built core entry sizes (bytes): `abort` 8289, `timeout` 7906, `emitter` 6242, `template` 27962, `html` 138896, `contract` 397467 (already the sole runtime dependency).
- `test/package.json` maps `./browser` to `dist/src/browser/index.d.ts` and `index.js` under `import` only.

## Reads this record points at

- The Grok terrain distillate over Elements and Mailbox: `j-engine-terrain-distillate.md` (brief `j-engine-terrain-brief.md`; journal `tmp/cursor/j-engine-terrain.jsonl` at launch, session id recorded in the distillate's header when it returns).
- The installed `@orkestrel/*` candidate map: `j-engine-orkestrel-2-map.md` (brief `j-engine-orkestrel-2-brief.md`).
- The baseline's absorption records this session inherits: `../../units/j-engine-research-report.md`, `../../units/j-engine-orkestrel-report.md`, `../../units/b-collapse-terrain-report.md` § B and § D, `../../units/b-modal-terrain-report.md` § B and § C.
- The engine seed: `veneer-engine/src/browser/{types,constants,helpers,validators,Button,ColorMode,Delegate,index}.ts`, `veneer-engine/src/core/{types,constants,errors,index}.ts`, their proofs under `tests/src/browser/` and `tests/src/core/`, and the guide's § Surface, § Methods, § Examples, and § Compatibility `engine` rows.
