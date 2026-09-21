<!-- checker on sonnet, native subagent, clean context, read-only. Retained 2026-09-21. Subject:
the CL8 brief as it stood before this report's corrections were folded in. Terminal line:
Dispatch: fix. Every defect it names was accepted and corrected in units/cl8-brief.md before
dispatch; the defects are kept here because the brief no longer shows them. -->

# CL8 scope read — the brief before dispatch

## Path check

Every path the brief names resolves, or is marked new. The guide carries a `### Deferred
selectors` section at `guides/veneer.md:212`.

## Fact check

- The bucket counts — 44 grid rows and 36 `.row-gap-*` rows under the `row` key, 84 grid columns
  and 3 `.col-form-label*` rows under the `col` key, 71 rows under `offset` — CONFIRMED, and they
  cross-check against the scout's independently measured totals.
- `.row-gap-*` recorded identically under `components['row-gap']` — CONFIRMED.
- A breakpoint-scoped selector row carries its own `condition` while the key's `media` array is
  empty — CONFIRMED.
- **`offset` has an empty properties object and `row` and `col` do not — REFUTED for `col`.**
  `col`'s properties object is empty, the same shape as `offset`'s. `row`'s is non-empty.

## Ruling check

The container partial's logical properties, its `--bs-gutter-x: var(--vn-gutter-x)` alias, the
existence of `--vn-gutter-x`, `--vn-gutter-y`, and `TOKEN_NAMES.gutter`, and the styles rule
barring literal colors rather than literal lengths — all CONFIRMED. The rule barring repeated
per-variant blocks was not independently located in this pass and is recorded as unresolved detail
rather than as load-bearing for dispatch.

## Scope gaps

None beyond the fact defect. The owned and off-limits lists cover every file the obligations touch.

## Criterion check

Every criterion reachable as written, but the criterion naming the listing rests on an Unknown that
is not honestly named: **the deferral mechanism already exists in full.** The guide carries a
`### Deferred selectors` table of `Name | Owner | Reason`, and `tests/setupConformance.ts`
implements `DeferralRow` and `readDeferrals` and consumes them in `scanCompatibilityPresence`. The
brief should have stated this as a ruling rather than posing it as a question.

## Defects

1. **The `col` properties fact is false.** `col` carries an empty properties object, like `offset`.
   A wrong measured fact stated as ground truth risks the unit trusting it over the inventory, and
   it contradicts the brief's own instruction to re-derive each fact.
2. **The carried ordering finding names the wrong site.** The container entries in
   `tests/setupStyles.test.ts`'s exports assertion are correctly ordered. The slip there is
   `LIST_CLASS_CASES` sitting before the `LINK_*` entries. As written, the unit is directed to fix
   a correctly ordered pair and may leave the real slip in place.
3. **Unknown 1 is not an unknown.** The deferral mechanism exists; state the ruling rather than
   asking the unit to rediscover it.

Dispatch: fix

## What the Orchestrator did with each

1. Accepted and corrected. The brief now states that `offset` and `col` carry empty properties
   objects and `row` does not, and tells the unit to verify each against the inventory.
2. Accepted, and corrected further after a first-party reading. **Both sites carry a slip, and they
   are different slips.** The container entries are misordered in the **import list**, which is
   what CL7's audit found; `LIST_CLASS_CASES` is misordered in the import list **and** in the
   exports assertion, which is what this lane found and which predates CL7. The brief now names all
   of them and says explicitly not to move the exports assertion's container entries.
3. Accepted, and it changed the unit's plan rather than only its wording. Reading
   `scanCompatibilityPresence` showed it **skips a deferred name** when checking a shipped row, and
   `collectShippedComponents` withholds a key only on an `accepted` row of its own, which a
   deferral is not. So a key with shipped rows and deferrals for the names it does not carry **does**
   list. The brief's criterion had said `row` and `col` must not list; it now says all three list,
   with a deferral row per withheld name. The lane found the mechanism; the consequence was the
   Orchestrator's to read.
