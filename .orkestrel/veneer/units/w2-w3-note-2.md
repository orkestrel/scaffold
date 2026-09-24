# Mid-campaign note 2 to the in-flight wave-2 and wave-3 units (2026-09-24, 01:52 UTC)

Sent to OFFCANVAS, UTIL-EFFECT, UTIL-FONT, UTIL-PAINT, and UTIL-TEXT while they write, and bound into
UTIL-SPACING's brief before its dispatch. A returned unit wrote generically named files (`report-head.md`,
`guide.py`, `env.sh`, a `fresh/` extract) into the session scratchpad, a sibling unit overwrote one of
them, and its `rm -rf` of `fresh/` could have removed a sibling's directory. The session scratchpad is
shared by every unit, so it is a shared file under `.agents/orchestration.md` § Permission floor ("Treat
every shared file as report-only"). Your brief's scope and criteria are unchanged.

1. Write every instrument, extract, draft, and log under your own worktree's `tmp/units/` or
   `tmp/probe/`, named with your unit prefix. Write nothing into the session scratchpad.
2. Read from the scratchpad only what your brief names there, such as the npm 11 `PATH` entry.
3. Remove only a directory you created, by the path you created it at.
