# Unit J-BINDER — successor brief 3: the round-2 audit's findings

This brief supersedes `j-binder-brief-2.md` for the unit's third round, run by the same executor on the same uncommitted tree. What changed and why: the round-2 audit (`units/j-binder-audit-2-verdict.md`, reconciling the objective lane's `FAIL 4, 5, 6, 7, 8`, the subjective lane's `FAIL 6, 7, 8` with F1 to F3, and the checker) broke the option resolver's prefix axis (the brief's own B2 error), found a teardown interleaving the delegate can drive a dead engine through, and adopted the lanes' findings and bounds. Every ruling is an edit here. Round 2's report-only patches (`j-binder2-app.diff`, `j-binder2-roadmap.diff`, `j-binder-patch-buttonsection.diff`) stay report-only and integrate at landing; do not apply them.

## Role and engine

`opus` on Opus 5.5, the native subagent that ran round 2, resumed; the sole writer in the worktree `C:/Users/mikes/WebstormProjects/veneer-binder` (branch `unit/binder`, tip `cea3359`, round 2 uncommitted in the tree).

## Objective

Make the option resolver read the entity's attribute table, close the teardown interleaving with a regression proof, align the two resolvers, extract the shared recorder, and land the adopted sentences and types, with the round-2 acceptance commands green again.

## Context

**Evidence.** `units/j-binder-audit-2-verdict.md` (every ruling with its citation), `units/j-binder-audit-2-objective-verdict.md` (claim 4's interleaving, step by step, with the HTML standard's custom-element reaction ordering; claim 5), `units/j-binder-audit-2-subjective-verdict.md` (F1 to F3, R1 to R3, the bounds); the design verdict's R11 and R19 (`j-engine-design-verdict.md` § Amendments) and `units/j-engine-shape-verdict.md` § Question 1 (the attribute-reading functions receive the effective names); the landed contracts in the worktree's `src/browser/types.ts`; `tests/setupBrowser.ts` (`recordListeners`, the prototype-swap recorder to build on). Locate each site by its symbol.

**Law, host, and standing conditions.** As in `j-binder-brief-2.md`, with these additions: `tests/setupBrowser.ts` is owned this round for the recorder alone (C3); `src/browser/types.ts` is owned this round for the sentences and declarations C5 and C6 name and nothing else; the tree-wide `npm run check` stays red on the three app files until the Orchestrator applies the patches at integration, so run the scoped `check:src:browser` and report the tree-wide reading as an observation.

## The edits

- **C1 (claim 5, F1, F2).** `resolveOptions(element, attributes, code, defaults, parsers, options)`: `attributes` is the entity's resolved attribute table (a key-to-name map, typed by C6), and for each declared key the resolver reads `element.getAttribute(attributes[key])`, the key being an attribute-map key; the `prefix` parameter goes, and `OPTION_PREFIX` goes from `constants.ts`, the barrel, the index proof, and the guide's § Surface (E6, no consumer remains). `resolveVocabulary(code, defaults, guard, overrides)` takes the same tail order (code, defaults, per-key check, supplied object) and every call site follows. `resolveOptions` skips a supplied value that is `undefined`, as `resolveVocabulary` does (R2), with a proof. The prefix proof becomes a replaced-name proof mirroring `readTargets`'s "reads the target attribute the table names": a declared key read through a replaced name and not through the default. The guide's `resolveOptions` paragraph says the attribute is the one the entity's `attributes` group names for the key; the nested option paths (Dropdown's `placement.*`, Modal's `dismiss.*`) are not this round's, and a sentence in the paragraph says the first unit that meets one rules its projection.
- **C2 (claim 4, claim 7).** Reproduce the interleaving as a proof in `tests/src/browser/Delegate.test.ts`: a registered custom element carrying the button trigger attribute whose `attributeChangedCallback` for `aria-pressed`, on the removal that restoration performs, reinserts the host into the root and calls `click()` synchronously; assert, red first, that the click after restoration reaches a live engine (a fresh acquisition that toggles and dispatches `toggle.vn.button`) and never a dead one (no consumed click without a toggle event). Then close it at the teardown and activation boundary: `Button.destroy` releases the registry before it restores the host, the snapshot's restore order making the attribute its last write so no later write of the old engine can overwrite a replacement engine's state (state the order in `HostSnapshot`'s `restore` remark if the order is a contract, or keep it internal and prove it), and the delegate's activation performs a fresh `find` after any restoration in flight. Rule the exact order under those constraints and record it under Rulings; the guide's "returns a live engine" sentence binds to the new proof by title. Report the proof's red reading and its green reading.
- **C3 (F3).** Extract one general prototype-method recorder into `tests/setupBrowser.ts` (for example `recordCalls(prototype, name, action)` returning a recorder with a count and a restore that `onTestFinished` runs), make `recordListeners` build on it, and call it from the Delegate pruning case; delete the inline recorder. Report the exact `tests/setupBrowser.ts` diff separately so the Orchestrator records it as a shared change.
- **C4 (bounds).** Split `#release(delivered)` into two private methods with names you choose that say what each does (the drop of engines the registry no longer holds; the release of hosts the root no longer contains at a delivery); type `#mark`'s route parameter as the engine constructor; the guide says "once per click for each entity whose selector matches" in place of "once per click and route"; the `readTargets` and `readTarget` examples pass an entity's table (`COLLAPSE_ATTRIBUTES` does not exist yet, so pass `{ target: TARGET_ATTRIBUTE }` and say the entity's resolved table goes here); the guide gains one sentence on `ButtonOptions.signal` where the Button's lifetime is described; the `resolveVocabulary` loop builds a mutable local and freezes once.
- **C5 (R1).** In `src/browser/types.ts`, `ButtonOptions.selectors`' sentence and `ButtonSelectorMap`'s description say that the delegate routes button clicks by the selector and that a button constructed directly matches with none; the `BUTTON_SELECTORS` doc block in `constants.ts` and the guide's rows follow.
- **C6 (R3).** In `src/browser/types.ts`, declare the attribute-table parameter type the helpers take (the key-to-name map `resolveOptions` and `readTargets` read; name it under `names.md`, for example `AttributeNames`) and the resolved button vocabulary type the delegate keeps (`classes` and `selectors` resolved; for example `ButtonVocabulary`), with TSDoc and guide rows, and use them in `helpers.ts` and `Delegate.ts`; no inline object type remains on a public signature.
- **C7 (parity).** Every changed description's Summary cell, the deleted `OPTION_PREFIX` row, the added rows, and the `### Vocabulary`, `### Delegation`, and `## Engine` sentences updated; the export list in `tests/src/browser/index.test.ts` names exactly the exports.

## Unknowns

1. Whether the custom-element reaction the proof needs fires synchronously inside `removeAttribute` in Chromium 153 (the standard's reaction ordering says it does): measure it in the proof and report.
2. Whether releasing the registry before restoration lets a replacement engine constructed during restoration snapshot a half-restored host: reason it through, then prove the order you choose with the C2 proof extended by a second engine constructed inside the reaction, and report.

## Scope

**Owned.** As in `j-binder-brief-2.md`, plus `tests/setupBrowser.ts` (C3 alone) and, in `src/browser/types.ts`, the sentences C5 names and the declarations C6 adds. **Shared (report-only).** `tests/setup.ts`, `app/**`, `tests/app/**`, `ROADMAP.md`. **Off-limits.** Every other file, the vendored files included. **Tools and limits.** As in `j-binder-brief-2.md`.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

Return the report as your final message: per edit C1 to C7, what changed and the finding it closes; the ruling on the teardown order with its reasoning; the C2 proof's red and green readings and the Unknowns' answers; the `tests/setupBrowser.ts` diff; the red-first record and the mutation rows for every new or rewritten proof (extend `binder2-mutate.mjs` into a round-3 instrument and result file in the scratchpad); the output of the round-2 acceptance criteria 1 to 6 verbatim; `git status --short` and `git diff --stat`.

## Acceptance criteria

Criteria 1 to 6 of `j-binder-brief-2.md`, the export list updated; the C2 proof present, red before and green after; `grep -rn "OPTION_PREFIX\|prefix" src/browser tests/src/browser guides/veneer.md` returns no hit that names the removed prefix axis.

## Review evidence

The actual diff (`git diff HEAD` with the renames intent-to-add) and status of the worktree, captured by the Orchestrator as `j-binder-3.diff` and `j-binder-3-status.txt` (rounds 2 and 3 together), and the report.
