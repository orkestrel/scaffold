# Mid-campaign note 5 to UTIL-TEXT and UTIL-SPACING (2026-09-24, 02:40 UTC)

Sent while they write, from the UTIL-PAINT audit (`up-audit-verdict.md`). The audit broke
`up-unscoped-profiles.patch`: its slice readings of the profile order pass an extra layer written ahead
of the order line. UTIL-PAINT's round 2 revises it to compare whole orders, and that revision is the
one that lands. Your brief's scope and criteria are unchanged.

1. Keep applying `up-unscoped-profiles.patch` on your copy only to read your own names' effect on
   `npm run test:service`; do not build a patch of your own on its slice readings.
2. Where your names still redden a profiles case with that patch applied, report the case, the
   reading, and the names behind it rather than patching `profiles.test.ts`; the Orchestrator routes
   it to the revised patch's carrier.
