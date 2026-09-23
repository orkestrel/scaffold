# B-FORMS-SELECT, round 3 — `checker` on Sonnet

Subject: the round-3 prose fixes (`b-forms-select-brief-3.md`, `b-forms-select-report-3.md`). Read-only.

1. **BROKEN.** `guides/veneer.md:749-752` reads one grammatical sentence of three semicolon-joined independent clauses (no validation → rescale; validation → a single-row select keeps its padding; validation → a list form keeps the list padding and carries no caret) plus an embedded "so" sub-clause; no splice or dangling clause, but three ideas in one sentence, against `AGENTS.md` § Writing. The wording was the brief's obligation 1 verbatim.
2. **CONFIRMED.** `src/styles/components/_form-select.scss:24-29`: two sentences, the second a two-clause contrastive pair, reading cleanly.
3. **CONFIRMED.** `b-forms-select-report-3.md:73` carries the token-noun row with the required finding cell ("code tokens and link text in `guides/veneer.md` that stand without a following noun or without `see`", with a lead-in and a trailing "beyond the Range and Validation sections already swept") and the B-PASSIVE-CLOSE action cell; line 64 carries the D37 row to B-FORMS-CLOSE; line 52's restated B-FORMS row carries no audit clause; every row names one unit.
4. **CONFIRMED** by textual check (each new phrase appears once per file); the full diff rests on the report's hunks (no shell in this lane).

Finding outside the claims (BROKEN): `b-forms-select-report-3.md:41-43` claims the ROADMAP patch was built against the tree and that `git apply --check` passes, but the first hunk's removed line ("SELECT ran in `/home/user/veneer-bfs` on Opus 5.5, its audit … awaits its fix audit; GROUP is next") is absent from `ROADMAP.md:278`, so the check would fail on that hunk; the second hunk's removed line matches `ROADMAP.md:375`. A shared-file patch, so no tree damage; the stated verification is not evidence.

VERDICT: FAIL 1; outside the claims: the ROADMAP patch's false "git apply --check passes" claim
