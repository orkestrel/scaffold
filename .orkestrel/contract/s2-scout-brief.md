# Unit S2 — scout the remaining per-call cost on the contract 0.0.15 tree

## Role and engine

`grok` on Cursor Grok (`cursor-grok-4.6-high`), reached through the `agent` CLI in ask mode. Read-only. Spawn nothing, edit nothing, install nothing.

## Objective

Map, with `file:line` pointers into `/home/user/contract/src/core/*.ts` and `/home/user/contract/tests/src/core/*.test.ts` as they are on disk now, where the remaining per-call work sits on each compiled family after the 2026-09-01 performance campaign landed, so a design round can attribute cost without re-reading the files.

## Context

The tree is `@orkestrel/contract` 0.0.15 at commit 3193da1. The previous campaign already landed these mechanisms, so line numbers in any older distillate are stale:

- `readArrayEntries` in `helpers.ts` is order-aware: it sorts only when own keys arrive out of order.
- `ContractCompiler.ts` object cases in guard, parser, auditor, and reporter carry a compile-time presence bitmask (`PRESENCE_MASK_LIMIT` in `constants.ts`) with a collection-branch fallback past the mask width, and hoisted declared/known vocabularies with a per-call fallback.
- `#trackGuard` and `#trackFaults` use a single-slot ledger: one slot per scope, promoted to a `WeakMap` only on the second distinct object.
- `#auditOf` and `#reportOf` string/number leaves gate `createStringFaults`/`createNumberFaults` behind a compile-time `refined` constant.
- `anyOf` union plans return at the first clean variant in audit and report.

Measured on this tree today (node v22.22.2, ns/op median of 7 rounds): medium `is` 2100, `parse` 2204, `audit` 4802, `explain` 3262, `generate` 5813; deep `is` 6383, `parse` 6597, `audit` 13731, `explain` 8897, `generate` 16870. The medium shape is a closed object of five leaves (`name` string min 1, `age` integer 0..150, `active` boolean, `tags` array of strings max 16, `role` literal of three). The deep shape nests medium under `user`, an array of address objects (one with a pattern), and an `anyOf` union of two tagged objects.

## Questions (answer each, in order)

1. **Guard (`is`) on a valid medium object.** List every allocation and every intrinsic indirection that still runs per call, per object node and per array node, with the line of each. Say whether `collectMembers`, `enumerableKeys`, `holds`/`isRecord`, `attempt`, and `Object.freeze` still run on the masked (in-width) object path, and what the array node still allocates.
2. **Parser (`parse`) on a valid value.** Same list. Name what the result record costs (`INTRINSICS.create(null)`, per-key assignment) and whether any identity fast path exists when every leaf is already the right primitive.
3. **Auditor (`audit`) and reporter (`explain`).** Same list, and additionally: the door `contain`, `#trackFaults`, every `readValue` call on the valid path (line and what it reads), `pathOf` per field, the fault arrays allocated on a clean walk (object level and leaf level), `limitEntries`, `preview`, and for unions what `oneOf` still runs (every variant plan, guard re-runs, tally).
4. **Generator.** The per-sample `contain`/`attempt` in `drawRandom`, the string per-character draw, `defineProperty` per field, union candidate re-guarding — lines.
5. **Compile tier.** What each compiled object node now allocates at compile time (positions records, mask constants, hoisted vocabularies, per-family closures), with lines, so the compile-heap increase (medium full contract 11721 -> 13734 B, deep 48476 -> 59322 B) can be attributed.
6. **Working-state churn outside the compiler.** `ShapeValidator` `#clear` per `validate`, and the `#empty*` peers in `ShapeCloner`/`SchemaCloner`: lines, what is allocated per call, and which public doors reach them.
7. **What asserts the current state.** For each mechanism above, the tests (file:line) that pin its current behaviour — the ledger, the mask fallback, the order-aware array read, the refined gate, the first-clean union, `readValue` diagnostics, path shapes, `FAULT_LIMIT`, frozen returns — so a later change knows which tests its result makes false.
8. **`INTRINSICS` per-call sites.** Every `INTRINSICS.apply` (and other `INTRINSICS.*` rows) reached per call on the families above, as a table of line, callee, and allocated argument list.

## Scope

Read only `/home/user/contract/src/core/` and `/home/user/contract/tests/src/core/`, plus `/home/user/contract/guides/contract.md` where a documented guarantee bounds a mechanism (frozen returns, refusal of exotic views, guard never throws). Do not read `node_modules`, `dist`, or any other repository. Run `git -C /home/user/contract status --porcelain` before and after; any change is a deviation.

## Output

Return exactly: `Question` (one line), `Evidence` (numbered facts with `file:line`), `Distillate` (one table per family: allocations per call, intrinsic indirections per call, the compile-time facts, and the pinning tests), `Unknowns`, `Deviation`. No raw file dumps, no design proposals, no verdicts.
