# W4 audit verdict — subjective lane

Subject: commit `2391c3f` in the html repository. Lane: subjective, Opus 5 `reviewer` (native,
read-only) — the writer's engine was GPT-5.6 Sol, so this is the required non-writer lane. The
Orchestrator's gates: `test:src:core` 282 passed, `format:check` green tree-wide.

Per-claim: the loader CONFIRMED; the failure-naming and remnant-removal CONFIRMED against the
installed differ; the audit-case claim CONFIRMED as worded with its population drift carried as
F1; the guide prose CONFIRMED. Terminal line as returned: `AUDIT: FAIL`, riding on F1 — the
audit case's title names the shipped generated table while its body read the vendored fixture,
so a hostile entry added to `NAMED_ENTITIES` alone escaped the case its name promises.

Resolution: the fix adopts the prescription — the case iterates `NAMED_ENTITIES` again — and the
provenance comment states the formatter pass (the retained fixture digest predating the format
pass is corrected here: the committed file's digest opens `07a65058b3970731`). Closed under the
verbatim-adoption rule. Recorded for the ROADMAP, not fixed here: the `src/core/constants.ts`
TSDoc carries counts of the entity set and the older snapshot date (F2 — a `src` prose edit that
moves declarations and belongs to html's next release); the guide row's missing fixture link and
the loader import's near-name (F3, F4) are recorded as optional polish.
