# Mid-campaign note 3 to the in-flight wave-3 units (2026-09-24, 02:05 UTC)

Sent to UTIL-TEXT and UTIL-SPACING while they write. UTIL-EFFECT returned before this note, with
`npm run test:service` green on its copy and its shadow names on the exclusion line. UTIL-PAINT found that a shared
name its partials ship off the exclusion line makes both executed Tailwind profiles emit a utility
that registers a `--tw-*` property and a `theme` block that carries colour variables, and two cases in
`tests/service/tailwind/profiles.test.ts` assume neither happens. The briefs omitted that file, which
is the Orchestrator's scope gap. Your brief's criteria are unchanged; this note widens your Shared
list by one file.

1. `tests/service/tailwind/profiles.test.ts` is Shared (report-only) for every wave-3 unit. Edit it
   only on your validation copy, and return any change as an exact patch against `2a3f223`.
2. Before you patch it, read UTIL-PAINT's proposed patch at
   `/home/user/scaffold/.orkestrel/veneer/units/up-unscoped-profiles.patch`. If `npm run test:service`
   reddens the same two cases on your copy, apply that patch there first and re-run; return a patch of
   your own only for a case it leaves red, written to apply after it, and say so in your report.
3. Record which of your shared names trips the cases and the longhands Tailwind declares for each.
