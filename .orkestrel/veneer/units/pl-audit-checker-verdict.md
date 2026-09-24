## Verdict — claims 1, 6, 8 (PREFLIGHT-HOST round 1)

**1. Scope.** CONFIRMED. `pl-status.txt:1-3` lists exactly the three brief-owned files (`tests/service/tailwind/preflight.test.ts`, `tests/setupStyles.test.ts`, `tests/setupStyles.ts`), matching `b-preflight-host-brief.md:59-60`. `pl-shared.patch:1-2` touches only `guides/veneer.md`, matching the brief's Shared list (`b-preflight-host-brief.md:62`). No off-limits path (`b-preflight-host-brief.md:65-67`) appears in either.

**6. The setup tables and helper.** CONFIRMED. `PREFLIGHT_BUILDS` and `PREFLIGHT_DIMENSIONS` are `Object.freeze`d exported constants with TSDoc (`pl.diff:387-416`). `computeContentExtent` (`pl.diff:356-368`) subtracts each edge only when `box-sizing` reads `border-box`, else returns the dimension's own length — matching the claim. Mutations M9, M10, M11 each reddened on the stated assertion: `pl-instruments/pl-mutations.log.txt:121-130` (M9, sublayer), `:132-141` (M10, box-sizing ignored → `19` vs `20.5`), `:143-152` (M11, foreign edge `margin-top`).

**8. Law and report.** BROKEN.
- No `any`, no bare `as` beyond `as const`, no `!` non-null assertion, no `@ts-*`/`eslint-disable`, no mock — confirmed by grep of `pl.diff` (only `as const` hits, at lines 293, 374, 393, 411, 415).
- The report violates its own "no tally of a growable set" and "no temporal word" requirements: `b-preflight-host-report.md:7` states `Diffstat: 3 files changed, 284 insertions(+), 54 deletions(-)`, a count of the growable "files changed" population, which `AGENTS.md` § Writing bans outright ("NEVER state a count... files... are such sets"). `b-preflight-host-report.md:10` writes "because the new comparison uses the same row shape" — `new` is a banned temporal word per `.claude/rules/writing.md` § Substitutions ("`new`, `latest` → Delete, or give the version"), used here in its banned descriptive sense (recently changed comparison), not a permitted sense.

**Findings fitting no claim:** none substantiated beyond the above.

**Attacked and held:** helper naming (`computeContentExtent` as a `{verb}{Noun}` module helper) and const-freezing structure — attacked against the naming and immutability rules and held.

VERDICT: FAIL 8; outside the claims: none
