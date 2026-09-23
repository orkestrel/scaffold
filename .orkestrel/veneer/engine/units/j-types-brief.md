# Unit J-TYPES — every public engine contract in `src/browser/types.ts`

## Role and engine

`opus` on Opus 5.5, reached as a native Claude subagent with `Read`, `Grep`, `Glob`, `Edit`, `Write`, and `Bash`. The executor that opens this brief is that subagent, the sole writer in the worktree `C:/Users/mikes/WebstormProjects/veneer-types` (branch `unit/types`, base `376d84a` of Veneer `main`).

## Objective

Land every public engine contract the design verdict rules — the shared mechanism contracts and, for each of Collapse, Dropdown, Tab, ScrollSpy, Modal, Offcanvas, Tooltip, Popover, Alert, Toast, and Carousel, its `{Entity}Detail`, `{Entity}EventMap`, `{Entity}Hooks`, `{Entity}Options`, and `{Entity}Interface` — in `src/browser/types.ts` with complete TSDoc, and their rows and method tables in `guides/veneer.md`, so every implementation unit conforms to one contract that typechecks before any class exists.

## Context

**Evidence.** `git -C C:/Users/mikes/WebstormProjects/veneer-types log --oneline -1` → `376d84a Remove the engine session's kickoff prompt`. `wc -l src/browser/types.ts` there → `70`: it declares `ColorModeState`, `ColorModeOptions`, `ColorModeInterface`, `ButtonDetail`, `ButtonEventMap`, `ButtonHooks`, `ButtonOptions`, `ButtonInterface`, `DelegateOptions`, `DelegateInterface`, and nothing else. `grep -n "^## \|^#### " guides/veneer.md | head` → `## Surface` at line 5, `## Methods` at 71 with `#### \`ColorModeInterface\``, `#### \`ButtonInterface\``, `#### \`DelegateInterface\`` tables, `## Examples` at 96. `cat tests/guides.test.ts` → the `GuideCommand` proof: every barrel export documented, every documented name a barrel export, `report.methods` (interface and class parity), `report.sections`, `report.examples.methods`, `report.drift` (a `Summary` cell equals the doc block's first paragraph as `findDrift` compares it). `sed -n 11,25p tests/src/browser/index.test.ts` → the runtime export list, which a type-only change does not move.

**Law.** `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/names.md` (one-word entity members, the type-level identifier table, the mirrored-name sentence in § General vocabulary, the fixed lifecycle vocabulary), `typescript.md` (readonly collections, `T | undefined`, TSDoc voice: first sentence a third-person `-s` verb that never repeats the symbol's name, booleans as "If `true`, …", defaults as "Default: …"), `architecture.md` § Centralized-file pattern (every reusable type in `types.ts`), `patterns.md` § Options and § Event maps, `documentation.md` § Parity (a `Summary` cell equals the doc block's description paragraph; one method table per behavioural interface keyed by its backticked name; the table's methods match the interface's call-signature members exactly, and readonly data properties stay in the § Surface row), `writing.md`; skill: none; the governing spec: `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/j-engine-design-verdict.md` (R2 to R12 fix the contracts; R13 the file; R14 the primitives), with the two proposals it reconciles at `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-engine-design-planner-proposal.md` and `j-engine-design-objective-proposal.md` for the shapes the verdict adopts by reference (the planner's Components table and Collapse template; the analyst's options table where the verdict names it). Read the verdict whole before writing.

**Installed primitives.** `@orkestrel/contract` `0.0.17` (`Guard<T>` is the type an `is{Entity}Event` guard returns; nothing else this unit needs), pointer `node_modules/@orkestrel/contract/dist/src/core/index.d.ts`. A type this unit declares whose job an installed export does is a defect; none is expected, because the contracts are DOM-bound.

**Host.** Windows 11; the subagent's `Bash` is Git Bash; run every command from the worktree root `C:/Users/mikes/WebstormProjects/veneer-types`; npm `12.0.2`, Node `24.21.0`, `node_modules` installed from the lockfile; the browser is the Playwright-managed Chromium 153.0.8010.12 (no browser run is needed here). No network is needed. `npm run` works as written.

**Measurements.** None restated; the terrain record `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-engine-terrain-record.md` holds the platform readings the contracts rest on (which DOM types exist: `CloseWatcher` and `Sanitizer` exist in the browser; whether the installed `lib.dom.d.ts` declares them the unit measures with `grep -n "CloseWatcher\|interface Sanitizer\|setHTML(" node_modules/typescript/lib/lib.dom.d.ts` before declaring any structural contract for them).

**Control identifiers.** None. A test is named for what it proves.

**Standing conditions.** No engine cascade key has landed on `main` (no `_collapse`, `_modal`, or sibling partial), which changes nothing here. The guide parity proof's behaviour over a behavioural interface with no implementing class is unmeasured (Unknown 1). `npm run test:policy` reads every authored Markdown file for the banned terms of `writing.md` § Substitutions, so the guide rows this unit writes must pass it. The Codex bench sandbox is not this unit's concern; the unit runs natively.

## Unknowns

1. Whether `npm run test:guides` admits a behavioural interface that no class implements yet and that no example fence exercises. Measure it after the contracts are written: run the command, and report its exact output. If it refuses (a `report.methods`, `report.sections`, or `report.examples.methods` finding naming an engine interface), keep the contracts and the § Surface rows, report each finding verbatim, and leave the § Methods tables in place; the W1a cohort that lands the first classes carries the closure, and the Orchestrator lands this unit with that cohort. Do not weaken the proof and do not remove a contract to make it pass.
2. Any shape the verdict leaves open — the exact members of `RegistryInterface`, `SnapshotInterface` and its target discriminant, `IsolationOptions`, `BackdropOptions`, `PlacementOptions`, `SwipeOptions`, the `SanitizeAllowlist` and `TipContent` types, the `EventHooks<TMap>` and `EventWire<TMap>` helper types, and each `{Entity}Detail` — is yours to rule inside the naming law and the verdict's rulings; record each ruling in the report under "Rulings taken", one line each with the rule that bounds it.

## Scope

**Owned.** `src/browser/types.ts`; in `guides/veneer.md`, the § Surface rows for every type, interface, and alias this unit adds (one row each, in the existing table, `Kind` per the table's vocabulary, `Summary` equal to the doc block's description paragraph) and one `#### \`{Entity}Interface\`` method table under § Methods for every behavioural interface this unit adds (the shared mechanisms included), each row's `Summary` equal to that method's TSDoc first paragraph.

**Shared (report-only).** None. `tests/src/browser/index.test.ts` lists runtime exports, which a type-only change does not move; confirm with `npm run test:src:browser -- tests/src/browser/index.test.ts` and report the reading rather than editing.

**Off-limits.** Every other file: `src/core/**`, every other `src/browser/*.ts` file (the implementations are later units), `tests/**` (the vendored `tests/setupPolicy.ts` and `tests/policy.test.ts`, `tests/setup.ts`, `tests/setupBrowser.ts` included), `src/styles/**`, `app/**`, `configs/**`, `vite.config.ts`, `tsconfig.json`, `package.json`, the lockfile, `ROADMAP.md`, `README.md`, and every guide section outside the rows and tables named under Owned.

**What asserts the state this change ends.** `tests/guides.test.ts` (every documented name resolves; every export documented; summary drift; method-table parity) — owned through the guide rows; `tests/src/browser/index.test.ts` (unmoved by types); `tests/policy.test.ts` (the prose sweep over the guide) — read-only, must stay green. The search bound the Orchestrator ran: `grep -rn "ButtonHooks\|ButtonEventMap\|ColorModeInterface" tests/ guides/ src/` returns only the seed's own uses, so no existing assertion enumerates the type set.

**Tools and limits.** `Read`, `Grep`, `Glob`, `Edit`, `Write`, `Bash`. No install, no commit, no push, no `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`, no tree-wide `format`, `lint --fix`, or `build`; validate read-only and scoped: `npm run check:src:browser`, `npx oxlint --config .oxlintrc.json --deny-warnings src/browser/types.ts`, `npx oxfmt --config .oxfmtrc.json --check src/browser/types.ts guides/veneer.md` (run `npx oxfmt --config .oxfmtrc.json --write src/browser/types.ts` on your own owned file where the check fails; never on the guide, whose prose oxfmt preserves), `npm run test:guides`, `npm run test:policy`.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

Write the report to `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/j-types-report.md` and return its path as your final message. The report carries, in this order: the contracts declared (one line each, grouped shared then per component); "Rulings taken" (Unknown 2); the exact command and output of each acceptance criterion; the Unknown 1 measurement verbatim; `git status --short` and `git diff --stat` of the worktree; every shared-file patch (none expected); deviation state. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short hypothesis — when a verdict ruling contradicts a rule file, when a contract cannot be expressed without `any`, an assertion, or a non-`#` privacy modifier, or when a file outside Owned must change for a criterion to close. Decide, record, and carry on from every shape question Unknown 2 names, from the order of declarations inside the file, and from the wording of a summary.

## Acceptance criteria

1. `npm run check:src:browser` exits 0 in the worktree.
2. `npx oxlint --config .oxlintrc.json --deny-warnings src/browser/types.ts` exits 0, and `npx oxfmt --config .oxfmtrc.json --check src/browser/types.ts guides/veneer.md` exits 0.
3. `src/browser/types.ts` declares, with complete TSDoc in the prescribed voice: the shared contracts (`EventHooks<TMap>`, `EventWire<TMap>`, the registry, snapshot, isolation, backdrop, scroll-lock, placement, and swipe interfaces and their options, `SwipeDirection`, `PlacementPosition` as Bootstrap's placement string union, `SanitizeAllowlist`, `TipContent`) and, for each of the eleven components, its `Detail` (where Bootstrap hydrates a payload: `relatedTarget` for Dropdown, Tab, ScrollSpy, Modal, Offcanvas, Carousel; `clickEvent` for Dropdown; `direction`, `from`, `to` for Carousel; none for Collapse, Tooltip, Popover, Alert, Toast), `EventMap` (keys per R3, each `CustomEvent<{Entity}Detail>` or `CustomEvent<undefined>`), `Hooks`, `Options` (paths per R11, plus `on` and `signal`), and `Interface` (members per R12: `host`, the state getters, the verbs, `destroy`; state-changing verbs return `Promise<boolean>`; every property `readonly`; every collection `readonly`); the seed's existing declarations stay unchanged in meaning.
4. `guides/veneer.md` § Surface carries one row per added export and § Methods one table per added behavioural interface, and `npm run test:policy` exits 0.
5. `npm run test:guides` is run and its result reported verbatim (Unknown 1); a `PASS` closes this criterion, a refusal naming only contract-only interfaces is reported as the Unknown's answer and does not fail the unit.

**Observations, not criteria.** `npm run test:src:browser` over the whole browser project (the Orchestrator takes the authoritative run).

## Review evidence

A code change: the actual diff (`git diff` in the worktree) and the actual status output (`git status --short`), both in the report; the audit round reads them with the verdict as the canon.
