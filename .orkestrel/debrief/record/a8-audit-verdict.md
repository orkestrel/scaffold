# A8 audit verdict — Sol (session 01a00726-bced-74a1-914c-ae886254f8a4)

Range audited: adc8d11..2d68a77. Journal: tmp/codex/a8-audit.log (215,540 tokens, ran to
completion, effort xhigh). AUDIT: PASS — all eight claims CONFIRMED with file:line evidence.

Notable rulings inside the confirmations:

- Claim 1: only status 'failed' suppresses the qualification; every other lifecycle status
  carries it; flattened phases + Intl.ListFormat produce the cross-phase plural join.
- Claim 2: durable units are not an input — only the task snapshot's current status counts,
  so quarantines, historical failed attempts, and recovered retries cannot produce a false
  qualification.
- Claim 4: the baseline had no workflow qualification and emitted unbounded raw strings;
  only the landed changes satisfy the added assertions.
- Claim 7: TaskView renders the failure message without the feed-card bound — the
  detail-destination ruling holds in code, not just prose.

A8 chain: 2d68a77 (unit + guide integration). Opus wrote, Sol audited, no fix round.
A8 ACCEPTED. Exit items 6 (settlement voice, with A7) and 7 (failed launch named) closed;
portfolio frames failed/mixed added to the 6-9 evidence set.
