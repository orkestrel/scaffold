# Audit claims — T1 TEST-SCOPED and T2 TEST-FORCED-COLORS on `@orkestrel/test` at `774ba14`

## Subject

The Test checkout at `/home/user/test`, HEAD `774ba14` (the 0.0.19 release commit, branch
`claude/inspiring-allen-t4qzv1`), with the uncommitted working tree the Orchestrator on Opus 5 wrote
under `/home/user/scaffold/.orkestrel/veneer/units/t1-t2-brief.md`: `src/browser/helpers.ts`,
`src/browser/types.ts`, `tests/src/browser/helpers.test.ts`, and `guides/test.md`. One writer, one
run; no earlier round.

## What this round decides

Whether these changes ship in the next Test release (`0.0.20`), which every fleet package consumes
and which Veneer's F9 re-pin depends on. A defect here is published.

## Already established — do not re-run

Verified by the Orchestrator directly on 2026-09-22:

- `npm run check` and `npm run lint:check` exit 0 on the tree; `npm run test:src:browser` exits 0
  (389 passed, 2 expected failures that predate this change); `npm run test:guides` exits 0
  (51 passed). The whole chain's reading is in `t1-t2-gates.log.txt` beside the evidence.
- The host is Chromium 141.0.7390.37; `Emulation.setEmulatedMedia` with a `forced-colors` feature
  changes `matchMedia('(forced-colors: active)')` here, as the pre-existing case "preserves a
  provider forced colors inverse through stage and release" already relied on.

## Review evidence

`/home/user/scaffold/tmp/audit/t1-t2-audit-evidence.md`: the status output, the diffstat, the full
diff `t1-t2.diff`, and the gate log.

## Numbered falsifiable claims

Attempt refutation. `CONFIRMED` requires naming the attack you tried that failed. A claim you cannot
decide is `UNRESOLVED`, not `CONFIRMED`; say what would settle it. Before confirming a claim about a
proof, name the mutation that would make that proof fail and say whether its assertions distinguish
that mutation from the passing case. Do not hedge toward an imagined consensus.

1. **The region-scoped resolver is the old inline resolution, unchanged in behaviour.**
   `resolveAccessibleWithin(region, role, name)` performs exactly what `clickAccessibleWithin`
   performed inline at `774ba14` (region locator by exact name, role locator with the name matched
   loosely and hidden included, the reachability filter, the three refusal voices with the same
   text), and `clickAccessibleWithin` now composes it; every pre-existing `clickAccessibleWithin`
   case passes unchanged.
2. **The hold drive is the old hold, unchanged in behaviour and order.** `driveHold(resolve, name)`
   refuses a held pointer before calling the resolver, then maps, presses, marks, waits, and reads
   `:active` back with release-on-miss, with the same two refusal voices; `holdAccessible` composes
   it with the same overloads; every pre-existing `holdAccessible` case, including "refuses a double
   hold before resolving an absent second name", passes unchanged.
3. **The traversal loop is the old loop, unchanged in behaviour.** `driveTraversal(resolve, name)`
   calls the resolver before the first step and on every step, counts a step only when focus lands
   on an element, ends on a revisit, caps off `FOCUSABLE_SELECTOR`, and raises the same refusal
   voice with the trail; `traverseAccessible` composes it over `resolveRendered`; every
   pre-existing `traverseAccessible` case passes unchanged.
4. **The scoped verbs leave a twin alone.** `holdAccessibleWithin` presses only the control inside
   the named region while a same-named control in another region stays unpressed, and
   `traverseAccessibleWithin` reaches the control inside the named region while a same-named
   control earlier in the tab order is passed over; each proof names the mutation it distinguishes
   (a scoped verb that resolves document-wide).
5. **Refusals come before input.** `traverseAccessibleWithin` on a name the region does not reach
   refuses before any Tab is sent (the proof records no focus event on the region's control), and
   `holdAccessibleWithin` with a held pointer refuses before resolving (the proof's resolver would
   throw its own message if reached).
6. **The forced axis is staged and read back like the motion axis.** `MediaOptions.forced` is a
   readonly optional boolean; `stageMedia({ forced: true })` sends `forced-colors: active` and
   waits for `(forced-colors: active)` to match; `forced: false` sends `none` and waits for
   `(forced-colors: none)`; an omitted `forced` keeps the pre-call reading, including through a
   later motion-only stage; `stageMedia({})` still refuses; a refused read-back restores the
   pre-call features as before; `releaseMedia` restores the axis from the marker unchanged.
7. **The marker semantics are unchanged.** The first stage still records the pre-call forced bit
   at position four of `MEDIA_STAGE`, and later stages keep the marker.
8. **No installed or existing export is duplicated.** The new exports compose existing helpers; no
   two of `resolveRendered`, `resolveAccessible`, `resolveAccessibleWithin`, `driveHold`, and
   `driveTraversal` do the same job; nothing under `src/core` or `@orkestrel/contract` already
   provides them.
9. **The public surface is documented to parity.** Every new export has a `## Surface` row whose
   Summary equals the doc block's description paragraph, an `@example`, and single-word `readonly`
   members where it declares any; the `Voice` tables name the throwing site of each voice
   (`resolveAccessibleWithin`, `driveHold`, `driveTraversal`); the § Patterns prose and the shipping
   rows state the composition; `npm run test:guides` passes.
10. **The names fit the vocabulary.** `resolveAccessibleWithin`, `holdAccessibleWithin`, and
    `traverseAccessibleWithin` follow `clickAccessibleWithin`; `driveHold` and `driveTraversal` are
    `{verb}{Noun}` module helpers; `forced` beside `print` and `motion` reads as one axis family.
    Would you ship this surface?
11. **Scope is honest.** `git status --porcelain` lists only the four owned files; `package.json`,
    `package-lock.json`, `src/core/**`, `src/server/**`, and the vendored policy files are
    untouched.
12. **Prose holds.** No banned term (`should`, `simply`, `easy`, `just`, `currently`, `via`, `e.g.`,
    `i.e.`, `etc.`) enters the guide's changed lines or the doc blocks, and no count is stated as a
    number there.

## Unknowns

Whether Chromium reports `(forced-colors: none)` as matching after `forced: false` on a host whose
provider reads active by default; the forced-colours proof stages both directions from the host's
own reading, and the lanes rule on whether it covers both.

## The threshold

A finding is worth more than a clean pass: these exports ship to every fleet package, and the
version is spent on upload.
