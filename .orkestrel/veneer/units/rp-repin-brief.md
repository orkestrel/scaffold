# Unit RP — Veneer re-pin prose and the origin-touching resting case (park ruling P6)

## Role and engine

`builder` on Sonnet, a native Claude subagent. Perform the assignment directly in `/home/user/veneer-rp` and spawn
nothing.

## Objective

Make Veneer's journey and frame manager describe the pointer parked outside the page, and add one resting case whose
lifted copy touches the page's origin and takes no `mouseover` event from the parked pointer.

## Context

**Evidence.** The ruling is `/home/user/scaffold/.orkestrel/veneer/units/t5-park-ruling-verdict.md`, P1 and P6. The
`releasePointer` function of the installed `@orkestrel/test` build releases any held pointer and parks it at (-1, -1)
in the runner page's coordinates, outside that page's viewport. The sweep `unhover-sweep-report.md` (beside the ruling)
found no `unhover` site to change. The sites that place the parked pointer elsewhere, from
`grep -rn -i -E "park|page's origin" tests/ guides/veneer.md` at `1ee0faf`:

- `tests/setupBrowser.ts`, the `FrameManager` class's `focus` method, the remarks paragraph that opens "The pointer is
  parked at the page's origin, on the wrapper's padding" (around line 992).
- `tests/app/browser/integration.test.ts`, the comment before the `releasePointer` call in the case whose loop records
  `entered` scenarios for the cascade keys (around lines 716 to 723): "The release parks the pointer at the page's
  origin, and each copy is lifted below the wrapper's top padding … so the parked pointer rests on the wrapper rather
  than on anything the frame shows."
- `guides/veneer.md`, the paragraph on the frame manager's `focus` method (around line 10590): "The `focus` method parks
  the pointer on the wrapper's padding".

The frame manager's `lift` method moves a specimen into a wrapper at the document's start, padded unless its `padded`
option is `false`.

**Law.** `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{tests,browser,names,typescript,writing,documentation}.md`;
skill: none; guide: `guides/veneer.md`.

**Installed primitives.** `@orkestrel/test` (its `releasePointer` function and its capture functions; read
`node_modules/@orkestrel/test/dist/src/browser/index.d.ts` first). A helper whose job an installed export does is a
defect.

**Host.** Linux, bash, working path `/home/user/veneer-rp`. Chromium 141 under `/opt/pw-browsers`; export
`PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`. Run the formatter as `./node_modules/.bin/oxfmt`, never through `npx`.
No network install.

**Measurements.** The retained cases must keep their frames: keep the `pt-5` padding on the cascade-key lift and the
default padding on every existing `lift` call.

**Control identifiers.** "P6" and "RP" stay inside this brief. Name the new case for what it proves.

**Standing conditions.** `node_modules/@orkestrel/test` holds the round-5 build packed from `/home/user/test-tf`, not
the registry's 0.0.23, while `package.json` still names the 0.0.23 range; the Orchestrator re-pins after the 0.0.24
release. `npm run test:src:browser` and `npm run test:setup:browser` carry reds on this host that belong to the engine
session (Chromium 141 has no `Element.setHTML`, and the showcase carries two "Dark mode" controls); do not diagnose
them.

## Unknowns

Whether a census in the journey or the guide enumerates frame names, so that a new scenario must be registered. Find
it by searching for an existing scenario name such as `list-group-actions-focus`; register the new name wherever the
existing names are enumerated, and report each file you touched for it.

## Scope

Owned: `tests/app/browser/integration.test.ts`, `tests/setupBrowser.ts`, and `guides/veneer.md`, plus any census file
the Unknowns search returns, which you name in the report. Off-limits: `package.json`, `package-lock.json`,
`tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `src/**`, and `ROADMAP.md` (report-only).
No commit, no push, no install, no `git checkout`, `restore`, `stash`, `reset`, or `clean`.

## Execution

Perform the assignment directly and spawn nothing.

1. Rewrite the three sites so each states that the release parks the pointer outside the page. Keep every
   `releasePointer` call and every `entered` recorder; each recorder is the journey's proof that the park holds. In the
   cascade-key comment, keep the padding and state the role it keeps: it is deeper than the widest negative gutter a
   specimen's first row pulls up by, so no row starts above the document.
2. Add one journey case beside the cascade-key case. It lifts a copy of a specimen that renders a link or a button at
   its top-left, through the `lift` method with `padded: false`, so the copy's first element touches the document's
   origin; calls `releasePointer`; records every `mouseover` event whose target lies inside the copy; places a resting
   frame on the copy; and asserts that no element was entered and that no element of the copy matches `:hover`.
3. Prove the case can fail: temporarily replace its `releasePointer` call with
   `await page.elementLocator(document.body).hover({ position: { x: 1, y: 1 } })` or the nearest pointer verb that puts
   the pointer on the copy's first element, run it red, restore the call, and run it green. Log both runs.

## Output

Write `tmp/units/rp-report.md` and return the same text: each change by site, the new case's title, its red and green
runs with log paths, the gate table with log paths, and `git diff` and `git status --short` captured to
`tmp/units/rp.diff` and `tmp/units/rp-status.txt`.

## Deviation contract

Per `/home/user/scaffold/.agents/orchestration.md` § Deviation protocol. You settle the sentence wording, the specimen
the new case copies, and where the case sits in the file. Stop and report if the new case takes a `mouseover` event
with `releasePointer` in place.

## Acceptance criteria

1. `./node_modules/.bin/oxfmt --check` over the owned files, `npm run lint:check`, and `npm run check` exit 0.
2. The new case passes under `journey:light-390` and `journey:dark-1280`, each run scoped with `-t` to its title:
   `CAPTURE=1 npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project
   "journey:light-390" -t "<title>"`.
3. The new case ran red with the pointer verb in place of the release, logged.
4. `grep -rn -i -E "page's origin|wrapper's padding" tests/ guides/veneer.md` returns no line describing the parked
   pointer.
5. The whole journey projects run by the Orchestrator after you exit.

## Review evidence

The Orchestrator supplies `rp.diff`, `rp-status.txt`, the report, and the logs to the checker.
