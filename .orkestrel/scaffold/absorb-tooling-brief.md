# Unit absorb-tooling — interactive and visual test mechanisms across the fleet

## Role and engine

`grok` on Cursor Grok (`cursor-grok-4.6-high`), reached through the versioned Cursor CLI entry in
`-p --trust --mode=ask`. You are the bench engine reading this brief inside your own CLI: perform
the reading yourself and spawn nothing.

## Objective

Return one distilled inventory of every mechanism the listed repositories use to test a rendered
interface — statechart tables and runners, playground harnesses, inspectors, rendered goldens,
runtime switches, style readers, capture portfolios, journals, and the claim prover — with what each
proves, where it lives, and whether `@orkestrel/test/browser` already publishes it.

## Context

**Evidence.** These repositories sit as siblings under `C:\Users\mikes\WebstormProjects\`. The
working directory of this run is that parent directory. Paths are relative to it.

- `test/src/browser/` — the published journey layer. `test/src/browser/helpers.ts` exports the
  resolver family (`resolveAccessible`, `resolveRendered`, `isReachable`, `isRendered`), the verbs
  (`clickAccessible`, `clickAccessibleWithin`, `clickDisclosure`, `typeAccessible`, `fillAccessible`,
  `pressKeys`, `traverseAccessible`), the readers (`readPerception`, `readPage`, `readFocus`,
  `readValue`, `readText`, `readRole`, `readName`, `readStates`, `describeTree`, `describeFocus`),
  the fixture builders (`build`, `mount`, `render`, `typeInput`, `commitInput`), the color and
  contrast family (`parseColor`, `rgba`, `colorEqual`, `blendColor`, `measureLuminance`,
  `measureContrast`, `readLayers`, `readBackdrop`, `contrast`, `readRing`), the cascade readers
  (`readCascade`, `readRules`, `findRule`, `findKeyframes`, `readRows`, `extractOrphans`, `style`,
  `token`, `rootToken`, `pixels`), and the capture verbs (`stagePane`, `releasePane`,
  `captureFrame`, `expandCaptures`). `test/src/browser/factories.ts` exports `createPortfolio`,
  `createJournal`, `createChannel`, `createPointerEvent`, `createDragEvent`.
  `test/guides/test.md` § Browser (lines 172–460) documents each. Treat this list as the
  baseline: report every mechanism elsewhere as `published` (name the export), `partial` (name
  the export and the gap), or `absent`.
- `elements/tests/setup.ts` declares `StateTransition` and `StateScenario`;
  `elements/tests/setupBrowser.ts` ships `runScenarios`; `elements/app/browser/playgrounds/`
  holds `StatechartHarness.vue` and one `*PlaygroundPage.vue` per factory;
  `elements/tests/app/browser/playgrounds.test.ts` is the gate that mounts each page, presses
  `Play all`, and polls `data-statechart-status`. `elements/src/browser/inspector/` is a DOM
  content-model inspector; `elements/guides/inspector.md`, `showcase.md`, `surfaces.md`,
  `traversals.md`, and `patterns.md` describe it and the showcase.
- `veneer/tests/setup.ts` and `veneer/tests/setupBrowser.ts` declare the same statechart contract
  and a `runScenarios(name, build, scenarios)` runner with `settle(element, event)`;
  `veneer/tests/app/browser/*.test.ts` drive real Bootstrap components (Modal, Offcanvas,
  Collapse, Alert, Tabs, Tooltip, Popover) through `source × event → target` tables.
  `veneer/tests/src/styles/rendered.test.ts` renders the whole showcase in light and dark and
  snapshots a computed-style matrix; `switches.test.ts` proves `data-vn-*` runtime switches;
  `veneer/guides/showcase.md`, `styles.md`, `tokens.md` describe the design.
- `mailbox/src/browser/inspector/`, `mailbox/tests/setupStyles.ts`, `mailbox/tests/setupBrowser.ts`,
  and `mailbox/guides/styles.md`, `composables.md`.
- `terrain/tests/app/browser/styles/tokens.test.ts` — a focus-ring contrast proof that computes
  luminance inline; `terrain/tests/setupBrowser.ts` and `terrain/tests/app/browser/setup.ts`.
- `taverna/tests/setupBrowser.ts` — `DESKTOP`, `MOBILE`, `viewport()`; `taverna/tests/app/browser/harness.ts`.
- `probe/guides/probe.md` — the `prove` MCP tool: a `Claim` with a case, a negative control, and a
  Vitest project inferred from the test path (`tmp/probe/**` names the `probe` project;
  `tests/{src,app}/<environment>/**` names `<axis>:<environment>`), run through the workspace's
  own TypeScript, Oxlint, and Vitest. `probe/src/server/helpers.ts` holds `inferTestProject`.
  Read § Prerequisites (411–454), § What the runtime overlay serves (826–861), and § Cost
  (989–1010). Answer this precisely: can a `prove` claim run a test in a browser Vitest project
  today, and what would the claim's test path have to be?

**Law.** Read-only. No coding law applies to a reading lane.

**Host.** Windows 11, Git Bash launcher, no network. Skip every `node_modules/` and `dist/`
directory.

**Measurements.** `grep -rln "statechart\|StateScenario\|runScenarios" --include=*.ts --include=*.vue --include=*.md elements mailbox veneer taverna terrain test probe`
is the sweep that bounds the statechart population. Run it and cite the scope.

**Control identifiers.** none.

**Standing conditions.** `elements` and `mailbox` are frameworks that replaced Bootstrap with
custom systems; report their tooling, not their styling.

## Unknowns

- Whether `probe`'s runtime stage can target a browser project. Report the exact sentence in the
  guide or the exact code path that decides it.
- Whether any repository already drives a Vitest browser test from a URL query the way
  `StatechartHarness.vue` does (`?scenario=`, `?autoplay=all`). Report the search.

## Scope

**Owned.** Nothing. This lane writes no file.

**Shared (report-only).** Every file named under Evidence.

**Off-limits.** Every other path. Never open a `.env*`, `auth.json`, `.npmrc`, or key file.

**What asserts the state this change ends.** Not applicable to a reading lane.

**Tools and limits.** Read, search, and list. No edits, no commands that change the tree, no
`--force`.

## Execution

You are the bench engine reading this brief inside your own CLI: perform the assignment directly
and spawn nothing.

## Output

Return, as your final message and nothing else, Markdown with these sections:

- `Question`: one line.
- `Evidence`: one table, one row per mechanism: columns `Mechanism`, `Site` (`path:line`),
  `Proves` (one clause), `Drives` (real user event, constructed event, direct API call),
  `Published in @orkestrel/test/browser` (`published <export>`, `partial <export>: <gap>`, or
  `absent`), `Notes`.
- `Distillate`: at most twelve bullets: what the statechart contract looks like in each
  repository and how the two differ, what the playground harness adds that a test cannot, what
  the rendered golden pins, what the inspector checks, and the probe answer.
- `Unknowns`: unresolved facts, not recommendations.
- `Deviation`: an unreadable path or a sweep that could not run; otherwise `none`.

No raw file dumps. No design proposals. No verdicts on quality.

## Deviation contract

Stop and report when a listed directory does not exist or cannot be read. Decide, record, and
carry on when a listed file holds no test mechanism.

## Acceptance criteria

1. Every row cites a `path:line` that exists.
2. The probe unknown is answered with a cited sentence or code path.
3. The statechart sweep is reported with its pattern, its scope, and its hits.

## Review evidence

The Orchestrator reads the distillate against the cited lines before using any row.
