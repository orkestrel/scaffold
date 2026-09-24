# Unit J-SANITIZER — one sanitizer that works on every gate host's Chromium

## Role and engine

`opus` on Opus 5.5, a native Claude subagent (Read, Grep, Glob, Edit, Write, Bash); the sole writer in the worktree `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/sanitizer` (branch `unit/sanitizer`, cut from Veneer `main` `e3031a3`, `npm ci` already run). The work class is objective, and it routes to Opus native rather than `sol` on Astra because its proofs run in a real browser, which the bench sandbox cannot host (the design verdict's standing rule). J-POPOVER runs beside you in its own worktree; you share no checkout with it.

## Objective

Implement E21: `NativeSanitizer` becomes `ConfigSanitizer`, which writes through `setHTML` where the target element has it and otherwise parses the markup inert, walks it against the same `SanitizerConfig` and a declared safety floor, and moves the result in; so that every tooltip and popover works on Chromium 141 (no `Element.setHTML`) and Chromium 153, with every behavioural proof running on both.

## Context

**Read first, in order.** `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; the rule files `names.md`, `typescript.md`, `architecture.md`, `patterns.md`, `tests.md`, `portability.md`, and `documentation.md` in `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/`; the ruling `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md` § E21 (binding; where this brief and E21 differ, E21 wins and you stop to report); the two lane proposals it reconciles, `units/j-sanitizer-design-planner-proposal.md` (the adopted shape, with its proof plan) and `units/j-sanitizer-design-analyst-proposal.md` (its safety-floor tables and configuration-semantics table), both in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/`. Skill: none.

**Terrain (Veneer `e3031a3`).** `src/browser/sanitizers/NativeSanitizer.ts`; `tests/src/browser/sanitizers/NativeSanitizer.test.ts`; in `src/browser/types.ts` the sanitizer block (`SanitizerInterface` to `SanitizeTargetInterface`, around lines 630 to 720) and the `TooltipOptions.sanitizer` leaf (around line 1636); `SANITIZER_ALLOWLIST` in `constants.ts`; `buildTip`, `fillSlot`, `writeContent` in `helpers.ts`; `isSanitizeTarget` in `validators.ts` (its `// true on Chromium` example) and its block in `tests/src/browser/validators.test.ts` (the case "accepts an object whose setHTML member is a function and refuses every other value"); `index.ts` and `index.test.ts`; `Tooltip.ts` (the `NativeSanitizer` import and the `#sanitizer` default in the constructor); the guide `guides/veneer.md` (§ Surface sanitizer rows, `### Content` under `#### Tooltip`, the departures naming the sanitizer, the § Compatibility sanitizer row). Bootstrap 5.3.8's `node_modules/bootstrap/js/src/util/sanitizer.js` for behaviour only. The site list at dispatch, from `grep -rln "NativeSanitizer\|SANITIZER_UNSUPPORTED\|NativeSanitizerOptions"` over the checkout minus `node_modules`, `dist`, and `tmp`: `guides/veneer.md`, `src/browser/helpers.ts`, `src/browser/index.ts`, `src/browser/sanitizers/NativeSanitizer.ts`, `src/browser/Tooltip.ts`, `src/browser/types.ts`, `tests/src/browser/index.test.ts`, `tests/src/browser/sanitizers/NativeSanitizer.test.ts`.

**Host.** Windows 11; Git Bash (`npm` and `npx` resolve to the `.cmd` shims); the browser project runs Chromium 153.0.8010.12, which carries `setHTML` and the `Sanitizer` class. Chromium 141 is not on this host: the forced-walk slot (a target whose own `setHTML` is `undefined`) is how every walk proof runs here, and the Chromium 141 reading is an observation the Orchestrator takes from the styles session after landing. The `prove` MCP server is not reachable to a subagent; record that you made no call. On this host write each multi-step program to a file and run the file, and keep each shell call one plain command.

**Standing conditions.** E6: no alias, re-export, `@deprecated` tag, or shim; the rename updates every consumer. The element guard is `isInstance(x, HTMLElement)` (and `instanceOf` only as a predicate passed to `filter` or `find`). No dependency enters; `@orkestrel/html` stays unused. Greenfield: `SANITIZER_UNSUPPORTED` is removed, not kept.

**Test in widening rings.** While an obligation is open, run only the file that pins it (`npm run test:src:browser -- tests/src/browser/<path>.test.ts`, narrowed with `-t '<case title>'` while one case is red); when it closes, run the files its edit reaches (`sanitizers/ConfigSanitizer`, `Tooltip`, `helpers`, `validators`, `index`); run the whole browser suite once, after every obligation is closed. Implementation and proofs come first; touch comments and guide prose only where a gate requires it or your change makes a sentence false.

**The obligations (each an edit and a proof; red first where the behaviour is new).**

- **S1 Types and rename.** `ConfigSanitizer` and `ConfigSanitizerOptions` replace `NativeSanitizer` and `NativeSanitizerOptions` (file and test file renamed with `git mv`); `SanitizerBaseline` in `types.ts` with one-word members; the `SanitizeTargetInterface` and `TooltipOptions.sanitizer` TSDoc no longer promise a native-only path; every consumer updated.
- **S2 The walk.** Per E21 § Mechanism and § Safety floor: `write` reads `isSanitizeTarget(element)` each call; the fallback parses in a `template` of `element.ownerDocument`, walks with a private recursive method over a snapshot of child nodes, matches elements by namespace and local name, applies the configuration's element and attribute rules exactly as the `SanitizerConfig` TSDoc states (the analyst's configuration table is the checklist), applies `SANITIZER_BASELINE` regardless of the configuration, recurses into a kept `template`'s content, refuses a destination the floor removes before any mutation, and commits with `replaceChildren` with no reserialization. Comments follow the platform's behaviour for a configuration without a `comments` field: take that reading on Chromium 153 first and record it.
- **S3 Construction.** `isSanitizerConfig` in `validators.ts`; the constructor throws `AppError` `SANITIZER_OPTION_INVALID` before any write on an invalid configuration (at least `dataAttributes` without `attributes`; take the platform's refusals for the mirrored subset as a reading on 153 and record them); a frozen owned copy of the configuration.
- **S4 Proofs.** The matrix `SANITIZER_CASES` and the `buildWalkTarget` builder go in `tests/setupBrowser.ts` as a report-only patch (tests.md: data tables belong in a setup file). Write them there in your worktree, and return the exact diff; the Orchestrator lands it. Every case runs through the host's own route and a forced-walk slot against one literal; the selection proof (an own `setHTML` recorder from `createRecorder` receives one call with the configuration, and a forced-walk slot receives the walked markup); construction refusal; owned copy; the pure leaves' rows; the two platform-conformance proofs (baseline superset where `Sanitizer` exists; refusal agreement where `setHTML` exists), each registered with `it.skipIf` and a comment naming the missing platform member (tests.md § conditional skip). Record the red reading first: on the unchanged code, a forced-walk case fails with `SANITIZER_UNSUPPORTED`.
- **S5 The validator case.** Rewrite the `isSanitizeTarget` positive case to `isSanitizeTarget(Object.create({ setHTML() {} }))` and correct the guard's example comment, so the case asserts no host fact.
- **S6 The tooltip default.** `Tooltip.ts` imports `ConfigSanitizer` and defaults to `new ConfigSanitizer()`; touch no other line of `Tooltip.ts`. A Tooltip case shows a default text tooltip through a forced-walk path, or state why the matrix already pins it.
- **S7 The instrument.** A mutation instrument `tmp/j-sanitizer/mutations.py` (recorded digests, one row per mutation, the case each row must redden, the receipt `restored byte for byte`, each row run against the one test file its case sits in): the walk ignores the element list; the floor's element set, `on` rule, URL check (a regex without the platform parser), and animation rule each dropped; template content not walked; reserialization instead of `replaceChildren`; always-native selection; always-walk selection; validation removed; the caller's configuration held by reference.

## Unknowns

1. The platform's treatment of comments, `<noscript>`, and `<svg><use>` under `{}` and under the allowlist on Chromium 153: read them, record them, and make the walk agree or state the superset.
2. The configurations `setHTML` refuses for the mirrored subset: read them on 153 and set `isSanitizerConfig` to agree.
3. Whether the leaf helpers earn export (`matchesScriptURL`, `matchesKeptElement`, `matchesKeptAttribute`) or fold into the class as one-use logic: rule by AGENTS.md § Design laws and record it.

## Scope

**Owned.** `src/browser/sanitizers/ConfigSanitizer.ts` (renamed from `NativeSanitizer.ts`) and `tests/src/browser/sanitizers/ConfigSanitizer.test.ts` (renamed); `src/browser/types.ts` (the sanitizer block and the `TooltipOptions.sanitizer` leaf only); `src/browser/constants.ts` (`SANITIZER_BASELINE` only); `src/browser/helpers.ts` and `tests/src/browser/helpers.test.ts` (the sanitizer leaves and the `buildTip` example only); `src/browser/validators.ts` and `tests/src/browser/validators.test.ts` (`isSanitizerConfig`, the `isSanitizeTarget` block, and their rows only); `src/browser/index.ts` and `tests/src/browser/index.test.ts`; `src/browser/Tooltip.ts` (the import and the default only) and `tests/src/browser/Tooltip.test.ts` (a sanitizer case only); `guides/veneer.md` (the sanitizer § Surface rows, `### Content`, the sanitizer departures, the sanitizer § Compatibility row: only what the rename and the gates require); `tmp/j-sanitizer/**`.

**Shared (report-only).** `tests/setupBrowser.ts` (S4's matrix and builder; return the exact diff).

**Off-limits.** Every other engine file (`Popover.ts` does not exist on your base; `Placement.ts`, `Placement.test.ts`, and the rest); `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/src/styles/**`, `tests/service/**`, `src/styles/**`, `app/**`, `package.json`, `package-lock.json`, `tsconfig.json`, `vite.config.ts`, `configs/**`, `ROADMAP.md`.

**What asserts the state this change ends.** `tests/src/browser/index.test.ts` (owned; the export list); `tests/guides.test.ts` read-only, closed through the guide; `tests/conformance.test.ts` read-only; `tests/policy.test.ts` read-only. Run the site search in Context again before your report; it must return only historical text you did not write.

**Tools and limits.** `Read`, `Grep`, `Glob`, `Edit`, `Write`, `Bash`. No install, commit, push, or discarding git command (`checkout`, `restore`, `stash`, `reset`, `clean`); `git mv` for the rename is permitted. No tree-wide `format`, `lint --fix`, or `build` beyond the three builds the conformance gate needs. Scoped validation: `npm run check:src:browser`; `npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser tests/setupBrowser.ts`; `npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser tests/setupBrowser.ts guides/veneer.md` (`--write` on your own files where it fails, then `--check`). Write the acceptance chain to `tmp/j-sanitizer/acceptance.sh` and run the file; keep each log under `tmp/j-sanitizer/`.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

Return the report as your final message: the files touched; per obligation, what was built and the case that pins it with its red reading (where the behaviour is new) and its green reading, verbatim; the Unknowns' answers with the readings behind them; every `types.ts` change as its own diff block; the `tests/setupBrowser.ts` patch as an exact diff whose headers name `tests/setupBrowser.ts`; the mutation table copied verbatim from the instrument's log; the verbatim output of every acceptance command; `git status --short` and `git diff --stat`; the deviation state. No process diary.

## Deviation contract

Follow `C:/Users/mikes/WebstormProjects/scaffold/.agents/orchestration.md` § Deviation protocol. Stop and report on: a platform reading that contradicts E21; a configuration rule the walk cannot honour without changing a `SanitizerConfig` TSDoc sentence; a `Tooltip.ts` change beyond the two lines; a shared or off-limits file you would have to edit; a gate red you cannot close inside the owned files. Decide, record, and carry on for: the order of cases, the wording of comments and guide sentences, the order of declarations inside a centralized file, the private method split inside `ConfigSanitizer`, and the rulings the Unknowns name.

## Acceptance criteria

1. `npm run check:src:browser` exit 0; the scoped oxlint and oxfmt checks exit 0; `npm run check` exit 0.
2. The site search returns no `NativeSanitizer`, `NativeSanitizerOptions`, or `SANITIZER_UNSUPPORTED` in `src`, `tests`, or `guides`.
3. The red reading is recorded: a forced-walk case on the unchanged code fails with `SANITIZER_UNSUPPORTED`.
4. `npm run test:src:browser -- tests/src/browser/sanitizers/ConfigSanitizer.test.ts` green, then the reached files green, then the whole `npm run test:src:browser` green on Chromium 153.0.8010.12, with every walk case green through the forced-walk slot.
5. `npm run test:guides` and `npm run test:policy` green; the three builds exit 0, then `npm run test:conformance` and `npm run test:setup` green.
6. The instrument's log carries one row per S7 mutation, every named case reddening, and the receipt `restored byte for byte`.
7. The status lists only owned files plus `tests/setupBrowser.ts`, whose diff is returned.

**Observation, not a criterion.** The Chromium 141 reading of `src:browser`, which the styles session takes after the landing.

## Review evidence

The actual diff (`git diff HEAD` with the new and renamed files intent-to-add) and `git status --short`, captured by the Orchestrator as `j-sanitizer.diff` and `j-sanitizer-status.txt`, and the report; the audit runs `analyst` on Astra (objective: the walk's safety floor and configuration semantics against the platform, the selection, the proofs' binding) and `checker` on Sonnet; `reviewer` on Opus 5.5 at the landing round.
