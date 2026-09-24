## Verdict — PREFLIGHT-HOST (`pl`) round 2, checker (claims 2, 4, 5 only)

**Claim 2 — The dimension key.** CONFIRMED.
- `PreflightDimension` interface declared once (`pl-2.diff:468-475`) and used to type both `PREFLIGHT_DIMENSIONS: readonly PreflightDimension[]` (`pl-2.diff:534`) and the `dimension: PreflightDimension` parameter of `computeContentExtent` (`pl-2.diff:505`).
- The height row's `tags` is exactly `Object.freeze(['input', 'select', 'textarea'])` (`pl-2.diff:537`).
- D1a/D1b: a height move on `hr` (outside those tags) is refused with no row (`pl-mutations-2.log.txt:23-34`, "expected `['hr | height | 5px']` to deeply equal `[]`") and passes once the row is added (`pl-mutations-2.log.txt:35-41`, `exit 0, 4 passed (4)`) — the same move recorded like any other, confirming it is not exempted.
- D2 ("select" dropped from height tags) fails on the exact guard the report names — "expected […] to include 'select | height'" (`pl-mutations-2.log.txt:43-52`).
- D3 (guide records `select | height`) fails on "expected ['select | height'] to deeply equal []" (`pl-mutations-2.log.txt:54-66`).
- D4 (edge dropped) fails on "expected 'input | height | 21' to be 'input | height | 22'" (`pl-mutations-2.log.txt:68-77`).
- D5 (`width` in place of `height`) fails on all three named readings — population, lookup, guard (`pl-mutations-2.log.txt:79-92`).
Each mutation is the one that would falsify the claim, and each failing assertion is the one the report names, distinguishing the mutated case from the passing case (`pl-r4-round1-base-defaults.log.txt`/`pl-green-2.log.txt` show the unmutated tree passing the same lines).

**Claim 4 — Titles and guide.** CONFIRMED.
- Control title matches verbatim: `'places the staged Chromium 153 defaults beneath the whole cascade and the profile'` (`pl-2.diff:96`), and passes as that name in `pl-green-2.log.txt:5`.
- Case title matches verbatim: `'keeps every longhand the elements layer declares, holds each moved form-control height to its content box height, and every other move to its recorded preflight value, under %s'` (`pl-2.diff:226`), instantiated over rows `'the host defaults'` and `'staged Chromium 153 defaults'` (`pl-2.diff:561-564`; both rows pass, `pl-green-2.log.txt:6-7`), the staged row explicitly named "staged."
- Every sentence `pl-shared-2.patch` adds reads true against the executed proof: the "no row for a form-control height" claim matches the `PREFLIGHT_DIMENSIONS` edges/`computeContentExtent` mechanism (`pl-2.diff:503-515`, `534-545`) and the removed `height` rows (`pl-shared-2.patch:54,62,70`); "a table border color resolves to the text color" is the literal assertion `table.get('border-top-color')).toBe(table.get('color'))`, which passes (`pl-2.diff:130`, `pl-green-2.log.txt:5`); "the select content box height fixed at 21px" matches `contain-intrinsic-height: 21px` in `PREFLIGHT_BUILDS` (`pl-2.diff:564`); "runs under both … and passes under both" matches the two green rows in `pl-green-2.log.txt:6-7`.

**Claim 5 — Gates and law.** Mostly CONFIRMED, one sub-clause UNRESOLVED.
- Format, lint, check, setup, service pairing, guides, guide-format, and `test:service` gates each exit 0 with the result line the report states: `pl-gate-format-2.log.txt` ("All matched files use the correct format.", exit 0), `pl-gate-lint-2.log.txt` (exit 0), `pl-gate-check-2.log.txt` (exit 0), `pl-setup-2.log.txt` (`149 passed`, exit 0), `pl-green-2.log.txt` (`4 passed (4)`, exit 0), `pl-test-guides-2.log.txt` (`20 passed (20)`, exit 0), `pl-guide-format-2.log.txt` (exit 0), `pl-test-service-2.log.txt` (`Test Files 3 passed (3)`, `Tests 20 passed (20)`, exit 0) — this satisfies "`npm run test:service` among them on the round-2 tree."
- No changed line adds `any`, `!`, `@ts-*`, `eslint-disable`, or a mock: confirmed by grep over `pl-2.diff` (only hits are prose "as" and `as const` const assertions at `pl-2.diff:521,561,565`; no `any`, `!`, suppression comment, or mock construct). No nested function declaration is added — the only function-shaped additions are the top-level `computeContentExtent` export (`pl-2.diff:503`) and arrow callbacks passed directly to `map`/`filter`/`find`, which the exception in `AGENTS.md` § Design laws permits.
- UNRESOLVED sub-clause: the report's gate table lists `git apply --check .orkestrel/veneer/units/pl-shared-2.patch` with "exit 0" but names no log file (unlike every other row, which cites a `pl-*-2.log.txt`). No such log exists under `pl-instruments/` (confirmed by search — no file matches `*apply*`). This exit code is the writer's own report quoting itself and evidences nothing per the dispatch's standing rule. Command to run: `git apply --check .orkestrel/veneer/units/pl-shared-2.patch` from the worktree root, or equivalently confirm `pl-2-status.txt` (already-modified files, consistent with an already-applied change) against a clean re-apply.

**Findings outside claims 2, 4, 5:** none observed while reading this evidence slice.

**Counts the report states, listed:** the report's own gate table names `test:service` as `Test Files 3 passed (3)`, `Tests 20 passed (20)`; the setup gate as `Tests 149 passed (149)`; the pairing gate as `Tests 4 passed (4)`, both rows; `test:guides` as `Tests 20 passed (20)`.

VERDICT: FAIL 5; outside the claims: none
