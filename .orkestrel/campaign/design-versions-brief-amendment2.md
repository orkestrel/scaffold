# Design brief amendment 2 — the user's floor ruling, 2026-08-21

Binds over the reconciliation's Q3 form. The bare-`^MAJOR` range loses; the floor is a full
triple at the latest version known when it was written.

- **The floor carries the latest known minor and patch.** Scaffold's manifest and every
  derived or seeded table row is a caret over a full triple — `typescript ^6.0.3`, never
  `^6` — where the triple is the newest the registry served at the last online check. An
  offline generation then propagates the latest-known floor, not a lazy `*.0.0`.
- **The verbs raise the floor.** When online, `audit` names a row whose registry-newest
  under the declared major exceeds the floor; `repair` and `overwrite` rewrite the range to
  a caret over that newest triple. This is what makes the major-zero caret semantics moot:
  `^0.64.0` → `^0.65.0` by rewrite, not by range width.
- **Major stays the only boundary.** A newer MAJOR is never auto-crossed: `audit` reports
  it as the non-blocking advisory; a person crosses it.
- **The publish cycle re-bakes the floor.** Before each scaffold release, scaffold runs its
  own raise (audit → repair, or `npm update` plus the manifest raise) so every release
  ships the then-latest floor, and the cycle continues. The guide states this as the
  release procedure.

Consequences for landed and in-flight units:

- V1 (landed): the manifest's bare-major foreign rows and the bare-major seeds are
  corrected back to full-triple carets at the current registry-latest under each major. The
  derivation mechanism, the range-to-major helper, and `replacePlanRanges` stand unchanged.
- V2 (in flight): its fleet-verb work stands. The resolved set the verbs write gains the
  foreign rows — newest-under-declared-major, full-triple caret — beside the exact fleet
  pins. Landed as a correction unit (V-floor) after V2 exits, never beside it.
- V3: the range-shape instrument is caret-plus-full-triple (rejecting bare `^6`, `~`,
  bare versions, prereleases); the drift comparison stays major-extracted for the
  compatibility question and gains the floor-staleness question (newest-under-major vs the
  declared triple).
