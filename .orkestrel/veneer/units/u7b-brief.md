# Unit U7b — the Button engine and the delegation

## Role and engine

`sol` on Astra through `codex exec --sandbox workspace-write -C C:/Users/mikes/WebstormProjects/veneer`.
You are the bench engine reading this brief inside your own CLI: perform the assignment directly
and spawn nothing. Sole writer in the Veneer checkout; commit nothing; install nothing; run no
`scaffold repair`, no tree-wide `format`, no lint `--fix`, no `npm run build`; never run
`git checkout`, `git restore`, `git stash`, `git reset`, `git clean`, or `git add`.

## Objective

Ship the first component's engine and its data API, both behind the existing `./browser` barrel
and nothing else: `Button`, one class over a `<button>` or anchor host, whose `pressed` state
derives from the host's `active` class and whose `toggle()` writes the class, then
`aria-pressed`, then dispatches one non-cancelable `toggle` event; and `Delegate`, one class that
installs one delegated native `click` listener on a root and drives `data-bs-toggle="button"`
hosts through one engine per host, constructed by a consumer's own entry. The package's surface
gains no subpath, no side-effect entry, no build wrapper, and no manifest row (the user's ruling:
a package takes no surface scaffold does not generate).

## Law

Read from `C:/Users/mikes/WebstormProjects/scaffold`: `AGENTS.md`; `.claude/rules/architecture.md`,
`names.md`, `patterns.md` (§ Emitters: the DOM variant, `emitEvent` and `bindEventMap`),
`browser.md`, `tests.md`, `typescript.md`, `documentation.md`. The design that fixes this unit is
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u7-design-verdict.md` (questions 1 to
4 and § The user's correction) with the planner's report (`units/u7-design-planner-report.md`
§§ 1 to 4) and the analyst's (`units/u7-design-analyst-report.md`, the engine and the boundary),
read through the correction: no `auto` entry, no adapter, no Bootstrap method spellings.

## Context

**The tree.** `HEAD` is the U7a landing commit (named in the dispatch message); the working tree
is clean except `tmp/`. `node_modules` carries `@orkestrel/scaffold` 0.0.76, the declared
`@orkestrel/markdown`, and the `@orkestrel/test` 0.0.18 tarball installed `--no-save`.

**Measured facts.**

- `src/browser/` holds `types.ts`, `constants.ts`, `validators.ts`, `ColorMode.ts`, `index.ts`
  (star exports of the four). `ColorMode` is the pattern: a lone class flat at the environment
  root, `#` fields, a getter that reads the host live, `toggle()` returning the applied mode,
  `destroy()` that restores only what it wrote. `tests/src/browser/index.test.ts` asserts the
  barrel's export set and that importing it registers no document listener (the recorder proof
  through `tests/setupListeners.ts`).
- The oracle fixture `tests/fixtures/oracle/button.json` records the official Button: on
  activation the class mutation precedes the `aria-pressed` mutation, the data-api click is
  prevented, no custom event is dispatched, and a disabled anchor refuses; the compatibility
  rows are in `guides/veneer.md` § Compatibility.
- Installed Test helpers (`node_modules/@orkestrel/test/dist/src/browser/index.d.ts`): `mount`,
  `build`, `clickAccessible`, `resolveAccessible`, `readStates`, `readRefusal`, `pressKeys`,
  `waitForState`; the recorder proof helpers in `tests/setupBrowser.ts` (read it).

**Host.** Windows. Your exec shell is PowerShell with script execution disabled: run scripts as
`npm.cmd run <name>`; a `.ps1` file is refused. Playwright Chromium launches inside this sandbox.
The `prove` tool is blocked. Write instruments under `tmp/u7b/`.

**Controls.** `PLANT-ORDER`: swap the class and attribute writes in `toggle()`; the ordered
mutation case must red; restore. `PLANT-LEAK`: leave a listener bound after `destroy()`; the
release case must red; restore. Name no test for a control.

## Scope

**Owned.** `src/browser/types.ts`, `constants.ts`, `helpers.ts` (new), `validators.ts`,
`Button.ts` (new), `Delegate.ts` (new), `index.ts`; `tests/src/browser/Button.test.ts`,
`Delegate.test.ts`, `helpers.test.ts` (new), `validators.test.ts`, `index.test.ts` (the export
list); the report. **Off-limits.** Everything else: `src/core/**`, `src/styles/**`, `app/**`,
`tests/app/**`, `tests/setup*.ts`, `tests/conformance*.ts`, `tests/distribution.test.ts`,
`guides/**`, `package.json`, every `configs/**` file, every content-owned and vendored path.

## Execution

Perform the assignment directly and spawn nothing. Types first, then constants and helpers, then
the classes, then the proofs; run `npm.cmd run check:src:browser` and
`npm.cmd run test:src:browser` after each item.

1. **Types.** In `types.ts`: `ButtonDetail { readonly pressed: boolean }`, `ButtonEventMap
   { readonly toggle: CustomEvent<ButtonDetail> }`, `ButtonHooks { readonly toggle?: (event:
   CustomEvent<ButtonDetail>) => void }`, `ButtonOptions { readonly on?: ButtonHooks }`,
   `ButtonInterface { readonly host: HTMLElement; readonly pressed: boolean; toggle(): boolean;
   destroy(): void }`, `DelegateOptions { readonly root?: ParentNode }`, `DelegateInterface
   { readonly root: ParentNode; destroy(): void }`. Single-word members; readonly properties.
2. **Constants and helpers.** `constants.ts`: `BUTTON_TOGGLE = 'toggle.vn.button'`,
   `BUTTON_SELECTOR = '[data-bs-toggle="button"]'`, `BUTTON_ACTIVE = 'active'`. `helpers.ts`:
   `emitEvent(host, type, detail)` dispatching a bubbling, non-cancelable `CustomEvent`, and
   `bindEventMap(host, hooks, signal)` binding each hook with the signal; both exported and cased.
3. **`Button`.** `constructor(host: HTMLElement, options?: ButtonOptions)`: refuses a host that is
   not an `HTMLElement` and a host already owned by a live `Button` (hold the ownership in a
   `WeakSet` the placement rules admit — decide between a frozen collection in `constants.ts`
   and a `#` static on the class, record it, and prove it); snapshots the host's `active`
   membership and its `aria-pressed` value (`string | null`, the external format); binds hooks
   through `bindEventMap` with an `AbortController`. `pressed` reads
   `host.classList.contains('active')`. `toggle()` toggles the class, writes `aria-pressed` from
   the result, dispatches `BUTTON_TOGGLE` through `emitEvent`, returns the new state; no
   disabled guard. `destroy()` aborts the controller, restores the class membership and the
   attribute exactly as found, releases the ownership; idempotent; a later `toggle()` does
   nothing and the getter still reads the host.
4. **`Delegate`.** `constructor(options?: DelegateOptions)`: `root` defaults to `document`;
   registers one `click` listener on the root through an `AbortController`; on a click whose
   target's `closest(BUTTON_SELECTOR)` is an `HTMLElement` inside the root, calls
   `preventDefault()` and toggles the engine held for that host in a private `WeakMap`
   (constructing one on first sight); refuses activation on a host that is disabled (`disabled`
   property, `.disabled` class, or `aria-disabled="true"`) without toggling; `destroy()` aborts
   the listener, destroys every engine it constructed, and clears the map. Exported from the
   barrel like every other class; constructing it is the consumer's act, so importing `./browser`
   registers nothing.
5. **Proofs.** `Button.test.ts`: construction over a `<button>` and an anchor; `pressed`
   derivation from a host that starts `active` with and without the attribute; the write order
   through a `MutationObserver` (class before `aria-pressed`); the event's type, bubbling,
   non-cancelability, and detail; hooks bound and released; `destroy()` restoring a host that
   started active, a host that started without the attribute, and a host the consumer edited
   after construction (unrelated classes and attributes preserved); repeated construction after
   destruction; the ownership refusal; a detached host; destruction during a pending toggle from
   a listener; concurrent instances on separate hosts. `Delegate.test.ts`: a click on a child
   element inside a host toggles the host with the default prevented; a second click reuses the
   engine; a host inserted after construction is driven; a disabled host, a `.disabled` host, and
   an `aria-disabled` anchor are refused; constructing a `Delegate` registers exactly one
   listener on the root (the recorder proof) and `destroy()` releases it and the engines.
   `helpers.test.ts`: `emitEvent` and `bindEventMap`. `index.test.ts`: the export set gains
   `Button`, `Delegate`, the constants, and the guards; the barrel still registers no listener on
   import.
6. **Controls.** Run the two controls red and restore each.
7. **Gates.** `npm.cmd run format:check`, `npm.cmd run lint:check`, `npm.cmd run check`,
   `npm.cmd run build:src:browser`, `npm.cmd run test:src:browser`,
   `npm.cmd run test:setup:browser`, `PLAYWRIGHT_CHANNEL=msedge npm.cmd run test:src:browser`;
   record each command's final lines.

## Output

Write `u7b-report.md` and return its content: the diff per file; the ownership
decision; each control's red reading and restore proof; each gate's final lines on both engines;
deviations in the usual shape.

## Deviation contract

Stop and report on: a gate red after your own fix inside owned files; a need to edit an
off-limits file. Decide, record, and carry on from: the ownership's placement, names within the
prefix table, case order, doc-block wording.

## Acceptance criteria

1. `Button` and `Delegate` behave as items 3 and 4 state, with every proof in item 5 green on
   managed Chromium and Edge; importing `./browser` registers no listener; constructing a
   `Delegate` registers exactly one.
2. The two controls reddened and are removed.
3. Every gate in item 7 exits 0.
4. `git status --porcelain` shows only the owned files and the report; the manifest and every
   `configs/**` file are untouched.

## Review evidence

The actual `git diff` and `git status --porcelain` at return; the report.
