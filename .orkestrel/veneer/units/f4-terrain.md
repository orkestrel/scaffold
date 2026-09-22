# F4 HOST-OBSERVATIONS — terrain record

The single home for this unit's measurements. The brief restates none of them. Where the brief and
this record disagree, this record and the tree win, and the unit stops rather than resolving it.
Every line citation reads "currently around"; locate a site by its symbol or case title.

## Tree

- Veneer checkout `/home/user/veneer`, branch `claude/inspiring-allen-t4qzv1`, HEAD `751c3ed`,
  tracked tree clean (`git status --porcelain` prints nothing; `tmp/` is ignored by `.gitignore`
  line 11).
- `@orkestrel/test` `0.0.19` installed from the registry (lockfile pin, commit `5c85b09`).
- Host: Linux container, bash, Node 22, npm 11.19.1 on the unit's `PATH` (the host `npm` 10.9.7 is
  refused by `devEngines`), Playwright 1.63.0, Chromium `141.0.7390.37` at
  `/opt/pw-browsers/chromium-1194/chrome-linux/chrome` (`HeadlessChrome/141.0.0.0`).

## The two red cases (baseline and F3 readings, 2026-09-22)

`npm run test:src:browser` exits 1 on exactly these cases; every other `src:browser` case passes
(41 passed, 2 failed):

- `tests/src/browser/Button.test.ts`, case "dispatches the completed state once as a bubbling
  non-cancelable event": `expect(event?.target).toBe(host)` receives `null`. The case builds a
  detached `div` root with a `button` host, records the hook's `CustomEvent` through the installed
  `createRecorder`, and reads `target` from the stored event after `toggle()` returns.
- `tests/src/browser/helpers.test.ts`, case "dispatches the supplied type and detail
  synchronously through the parent": `expect(event.target).toBe(host)` receives `null`. Same shape:
  detached root, stored event, `target` read after `emitEvent` returns.

Probe `/home/user/scaffold/.orkestrel/veneer/units/event-target-probe.mjs` on this Chromium:

```text
attachedDuring true   attachedAfter true    attachedAfterIsNull false
detachedDuring true   detachedAfter false   detachedAfterIsNull true
```

Reading: after `dispatchEvent` returns, a recorded event's `target` is `null` when the host was
detached from the document, and remains the host when attached. Inside the listener the target is
the host on either. The same cases passed on Chromium 153.0.8010.12 (Windows, 2026-09-20).

Every other `event.target` read in `tests/src/browser/**` sits inside a listener body
(`tests/src/browser/Delegate.test.ts` reads no stored event's target; the grep bound is
`grep -n 'target' tests/src/browser/*.test.ts` less the `targets` and `Target` matches).

## Installed primitives the unit reuses

From `/home/user/veneer/node_modules/@orkestrel/test/dist/src/core/index.d.ts` and
`.../browser/index.d.ts` (declarations; the guide `## Surface` is in
`/home/user/scaffold/guides/test.md`):

- `createRecorder<TArgs>()` returns a recorder whose `handler` appends calls in order (`calls`,
  `count`). It records the arguments as delivered; it takes no snapshot of an event's mutable
  fields, so a `target` read from a stored event after dispatch is the browser's later value.
- `build`, `mount`, `render` (DOM construction and attachment), `readName`, `readStates`,
  `isReachable`, `pressKeys`, `traverseAccessible(name)` (document-wide by accessible name),
  `holdAccessible(name)` and `holdAccessible(role, name)` (document-wide), `releasePointer`,
  `sendProtocol`, `POINTER_HOLD`, `waitForFrame`, `waitForAnimations`.
- No installed export records an event's `target`, `currentTarget`, `relatedTarget`, or
  `composedPath()` at delivery time. Search: `grep -n 'composedPath\|relatedTarget\|currentTarget'`
  over both declaration files returns nothing.

`tests/setupBrowser.ts` already exports `recordListeners` (records the `EventTarget` instances an
action adds listeners to, through `createRecorder`) and `recordState` (a `ButtonReading` after an
action). Neither snapshots event fields inside a listener.

## The Button engine's restoration (source, off-limits to this unit)

`src/browser/Button.ts`: the constructor stores `#active = host.classList.contains('active')` and
`#attribute = host.getAttribute('aria-pressed')`; `destroy()` runs
`classList.toggle('active', #active)` and restores `aria-pressed` (removal when it was absent).
The documented contract (`guides/veneer.md` `destroy` row) is "Releases hooks and restores the
original active membership and aria-pressed value": membership, not the serialized `class`
attribute. `tests/src/browser/Button.test.ts` currently proves restoration for `classes: 'active
original'` with `aria-pressed="mixed"` plus consumer edits, and for an absent versus empty
`aria-pressed` on detached hosts; it compares `Array.from(host.classList).sort()`, never the
serialized attribute, and covers no absent-class-attribute host and no whitespace variant. The
audit's objective lane (claim 3) bounded the proof there; its "attacked and held" note: consumer
class and attribute edits are intentionally preserved, so a fix must not restore an entire old
attribute snapshot over them.

## The delegation's release ordering (source, off-limits)

`src/browser/Delegate.ts` `#activate`: on every delegated click, before resolving the click's own
host, the delegate walks its owned engines and destroys (restoring) each one whose host the root no
longer contains; then it resolves `event.target.closest(BUTTON_SELECTOR)`, prevents the default,
refuses `disabled`, `.disabled`, and `aria-disabled="true"` hosts, and acquires or reuses the
engine. `destroy()` restores every owned host. So a host removed from the root keeps its toggled
state until the next click that reaches the root or the delegate's destruction. Cases in
`tests/src/browser/Delegate.test.ts`: "restores removed hosts on a later unrelated click and
releases their ownership", "releases a connected host moved outside the root on a later unrelated
click", "reacquires a pruned host after reinsertion". The guide carries no sentence on that
timing: `guides/veneer.md` describes `Delegate` in its `## Surface` rows and the
`#### DelegateInterface` method table (`destroy` only), and the paragraph after the surface table
(currently around line 43) describes the `ColorMode` controller alone.

## Receipts

- `README.md` (currently around lines 15 to 21) carries the receipts table. Its Chromium row reads
  "Managed Chromium, revision `1243`" with the reading "The source, application, setup, styles,
  and journey projects pass on Windows on 2026-09-20", and names no build. Retained readings pin
  that build: the vitest Playwright provider reported `HeadlessChrome/153.0.8010.12` as the managed
  Chromium on 2026-09-20
  (`/home/user/scaffold/.orkestrel/veneer/research/instruments.md`, the `userEvent.hover` row) and
  the managed executable was `chromium-1243/chrome-win64/chrome.exe`
  (`/home/user/scaffold/.orkestrel/veneer/units/cl5b-report.md`, the browser-selection reading).
  The Edge row names `153.0.4234.48` and stays; the Chrome row stays open.
- `tests/fixtures/oracle/button.json` is the recorded official Button behaviour; its header carries
  `version` (`5.3.8`) and `component` (`btn`) and no browser build. `OracleFixture` in
  `tests/setupConformance.ts` (`version`, `component`, `steps`, `excluded`) is its contract;
  `recordButtonOracle()` launches Playwright Chromium through `resolveBrowser(resolvePinnedBrowser(),
  …)` from `configs/browsers.ts` and returns `{ version: BOOTSTRAP_VERSION, component: 'btn',
  steps, excluded: [] }`. `scanOracleFixture(recording, fixture)` compares the fixture's metadata
  and step membership with the live recording through a JSON round-trip (`compared`), and reports
  `Oracle fixture metadata or step membership differs` on a `version` change
  (`tests/setupConformance.test.ts`, the altered-fixture case currently around line 546).
  `tests/conformance.test.ts` re-records live on every run, rewrites the fixture only under
  `ORACLE_REFRESH=1`, and then scans the saved fixture against the recording; that proof passed on
  this host on 2026-09-22 against the fixture recorded on Chromium 153 (`npm run test:conformance`,
  10 passed), so the recording's readings are build-stable across 141 and 153.
- `tests/setupStyles.ts` names the calibration's build in the `CALIBRATED_TIERS` doc comment
  (`153.0.8010.12` and Edge `153.0.4234.48`); `guides/veneer.md` line 322 names "the managed
  Chromium and Edge receipts" without a build, inside a deferral reason, and stays.

## The `specimen` term

Two senses share the browser setup module's public surface (`tests/setupBrowser.ts`):

- The showcase's declared specimens: `SPECIMEN_ATTRIBUTE` (`data-specimen`), `readSpecimen(root,
  name)`, and the app's `ButtonSpecimen`, `SpecimenSection`, `*_SPECIMENS` tables under
  `app/browser/`, plus the guide's Showcase prose. This sense is product vocabulary and stays.
- The fixture registry: `SpecimenManager` (`mount(markup)`, `load(css)`, `clear()`) and its
  instance `specimens`, whose own doc comment says "Mounts one fixture's markup inside a container
  this registry removes". `fixture` is taken by `tests/fixtures/oracle/` and `OracleFixture`, so it
  cannot be the replacement.

Population of the registry sense, by the strict pattern
`grep -rlE '\bspecimens\.(mount|load|clear)\b|SpecimenManager|\bspecimens\b.*from' tests app src
guides README.md` (57 files): `tests/setupBrowser.ts`, `tests/setupBrowser.test.ts`,
`tests/src/styles/{integration,mixins,reset,theme,tokens}.test.ts`,
`tests/src/styles/components/{button,container,grid,icon-link,image,link,list,quote,ratio,table,type,vr}.test.ts`,
`tests/src/styles/elements/{a,abbr,address,b,blockquote,button,code,details,dl,fieldset,figure,heading,hr,iframe,img,input,kbd,label,mark,ol,optgroup,output,p,pre,progress,samp,select,small,strong,sub,sup,svg,table,textarea,tr,ul,var}.test.ts`,
`tests/src/styles/utilities/gap.test.ts`. `tests/setupStyles.ts`, `tests/setupStyles.test.ts`,
`tests/app/**`, `app/**`, `src/**`, and the guide carry the product sense only. The export
inventory case "exports the showcase mount, the case matrices, the oracle drive, the recorders,
and the cascade readers" in `tests/setupBrowser.test.ts` enumerates every export name. The word
`scene` appears nowhere in `tests`, `app`, `src`, `guides`, or `README.md`
(`grep -rniw 'scene\|scenes'` returns nothing).

## The stripe scope assertion

`tests/src/styles/tokens.test.ts`, case "re-declares every theme-dependent name inside each mode
scope": reads `light` and `dark` scope properties and asserts `canonical.filter((name) =>
!dark.includes(name))` is empty, one direction only. Case "resolves the stripe percentage to the
retained Bootstrap tint in each mode": asserts the dark closure alone contains
`TOKEN_NAMES.state.stripe`, then reads the stripe, hover, and active tokens on a light and a dark
island (`5%`, `12%`, `22%` on each). Origin: `cl2-audit-verdict.md` round 2, reviewer finding 6 — a
name declared at `:root` and in the dark scope but not the light one passes every case.

## Gate commands for this unit's owned scope

Run each from `/home/user/veneer` with npm 11 on `PATH`
(`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`):

- `npm run format:check`, `npm run lint:check`, `npm run check` (tree-wide, non-mutating; allowed).
- `npm run test:src:browser` (the `src:browser` project: `tests/src/browser/**`).
- `npm run test:setup:browser` (`tests/setupBrowser.test.ts`).
- `npm run test:setup` (the `setup` project: `tests/setup.test.ts`, `tests/setupConformance.test.ts`,
  `tests/setupStyles.test.ts`; 156 passed on 2026-09-22).
- `npm run test:src:styles` (builds the styles entry, then the styles project over
  `tests/src/styles/**`; 411 passed on 2026-09-22).
- `npm run test:conformance` (Playwright recording plus the fixture scan; 10 passed on 2026-09-22);
  `ORACLE_REFRESH=1 npm run test:conformance` rewrites `tests/fixtures/oracle/button.json`.
- `npm run test:policy` after any Markdown edit (109 passed, 1 skipped on 2026-09-22).
- `npm run test:guides` after any guide edit (18 passed on 2026-09-22).

Readings of the whole chain on this tree before the unit:
`/home/user/scaffold/.orkestrel/veneer/units/veneer-pin-gates-report.md`.

## Sandbox

The unit runs inside `codex exec --sandbox workspace-write` launched with
`-c sandbox_workspace_write.network_access=true`. Under that launch vitest's browser mode binds
its loopback listener and Chromium launches (probe
`/home/user/scaffold/.orkestrel/veneer/units/codex-sandbox-probe-2.log.txt`); without the override
`listen EPERM 127.0.0.1` stops every browser project. `.git` is read-only inside the sandbox: no
git command that takes the index lock runs; `git status`, `git diff`, and `git log` do.
