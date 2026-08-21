# Design brief amendment 1 — the user's ruling, 2026-08-21

The user ruled mid-round; this binds over any lane's contrary recommendation.

- **Registry first.** Scaffold checks npm for the latest version of each package — or fetches
  the available-version list — and determines the correct latest under the pinned major.
- **Offline is not a design constraint.** Installing needs the network anyway; a generation
  path that crashes offline is acceptable.
- **The table is the fallback floor, audited into correctness.** Where the registry was not
  consulted, emit what the current scaffold table carries; `audit` then points out the
  staleness so `repair` and `overwrite` fix the ranges before install.

Consequences for the questions: Q4's offline sub-question is settled as stated. Q1 and Q3
now assume the authority chain registry → manifest-derived table → literal floor, with the
verbs closing the gap. The lanes still rule on mechanism, instruments, range form, the
non-installed literals, and blast radius.
