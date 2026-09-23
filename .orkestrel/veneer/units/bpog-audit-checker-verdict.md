# B-PASSIVE-ORDER-GUIDE (`bpog`) audit — `checker` on Sonnet verdict

Claim 1 — CONFIRMED. `bpog-status.txt` reads `M guides/veneer.md` alone (`bpog-status.txt:1`). `bpog.diff` contains exactly one `diff --git` block, for `guides/veneer.md` (`bpog.diff:1-3`). Reading the diff directly: every removed block sampled reappears byte-identical as an added block elsewhere — "Button group classes" (`bpog.diff:110-157` removed ↔ `bpog.diff:272-319` added), "Progress classes" (`bpog.diff:167-200` removed ↔ `bpog.diff:438-471` added), the `card`/`breadcrumb`/`pagination`/`badge`/`progress`/`list-group`/`btn-close`/`placeholder`/`icon-link` `####` tables (`bpog.diff:761-906`), and the `icon-link` cascade-comparison table (`bpog.diff:702-709` removed ↔ `bpog.diff:896-903` added). No line unique to one side found in the sampled boundaries.

Claim 2 — CONFIRMED. `grep -n "^### |^#### \`"` run against `/home/user/veneer-bpog/guides/veneer.md` prints, after `### Validation classes` (1233): Button group (1275), Button toolbar (1323), Card (1332), Breadcrumb (1383), Pagination (1411), Badge (1461), Progress (1485), List group (1520), Close (1565), Spinner (1600), Placeholder (1622), Helper (1663), then `### Deferred selectors` (1714) — the exact order named. After `#### valid-tooltip` (3492): card (3500), breadcrumb (3512), pagination (3519), badge (3537), progress (3543), list-group (3553), btn-close (3563), placeholder (3574), icon-link (3582) — the exact order named. Every other heading sits at the relative position the report's before and after listings show.

Claim 3 — CONFIRMED by sampling. Splice boundaries at `bpog.diff:271-272`, `328-329`, `473-474`, and each `####` table splice at `bpog.diff:813-814`, `825-826`, `850-851` show a single blank line; every `#### <key>` heading is immediately followed by its table (`bpog.diff:814-905`).

Claim 4 — UNRESOLVED. The report (`b-passive-order-guide-report.md:87-98`) states the gate commands and exits, but this dispatch supplies no independent verifier run; a claim whose only evidence is the writer's own report is UNRESOLVED.

Findings outside the claims: none found.

VERDICT: FAIL 4; outside the claims: none
