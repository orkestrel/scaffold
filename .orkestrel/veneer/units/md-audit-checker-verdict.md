## Verdict

**Claim 1 — Scope and delta.**
- `md-status.txt` lists exactly the four owned paths and nothing else: CONFIRMED (`/home/user/scaffold/.orkestrel/veneer/units/md-status.txt:1-4`).
- `md.diff` carries those four files and no other: CONFIRMED (`/home/user/scaffold/.orkestrel/veneer/units/md.diff:1,271,845,871` — the four `diff --git` headers match the owned-file list exactly).
- `md-shared.patch` touches only the brief's Shared files plus the granted fixture: CONFIRMED. The patch's 16 `diff --git` headers (grep on `md-shared.patch`) are exactly the brief's Shared list (`Showcase.ts`, `constants.ts`, `index.ts`, `guides/veneer.md`, `_mixins.scss`, `index.scss`, `Showcase.test.ts`, `index.test.ts`, `integration.test.ts`, `conformance.test.ts`, `setup.ts`, `setupServer.test.ts`, `setupStyles.test.ts`, `setupStyles.ts`, `mixins.test.ts`) plus `tests/src/styles/fixtures/mixins.scss`, which the claims file's Orchestrator ruling grants retroactively. None matches an off-limits pattern (`src/browser/**`, `src/core/**`, `tests/fixtures/**`, `package.json`, `README.md`, vendored files).
- `git apply --check` against a fresh `2a3f223` extract: UNRESOLVED — this needs a command run (`git apply --check` from a clean archive of `2a3f223`), which this lane cannot execute. The Orchestrator takes that reading.
- OFFCANVAS/TIP/TOAST entries left as the base has them: CONFIRMED — `md-shared.patch:1210-1214` (CLOSE_DEFERRED) leaves `.toast-header .btn-close` and `.offcanvas-header .btn-close` untouched, only the modal entry moves; `md-shared.patch:824-831` (barrel) inserts only `components/modal`; `md-shared.patch:1-19` (Showcase.ts) inserts only `ModalSection`.
- § Compatibility hunks change only modal rows apart from re-padding: CONFIRMED by sampling — the large hunk at `md-shared.patch:315-464` and `:688-742` reproduces every non-modal row byte-identical apart from column padding (spot-checked `g`/`gx` rows and the full `engine | plugin` block), with the sole content changes being the new `modal | plugin` row (`md-shared.patch:741`), the `#### modal` ledger table (`md-shared.patch:297-310`), and the stacking-table Alias-cell edit (`md-shared.patch:275-287`, a different section). This sampling did not re-read the full ~150-row table line by line.

**Claim 6 — Registries and orders.** CONFIRMED.
- `CaptureSubject` gains the specimen subjects: `md-shared.patch:926-938`.
- `CASCADE_KEYS` gains one resting row per specimen with the hanging-branch selector always nested inside the modal: `md-shared.patch:958-1034`.
- No `DRIVEN_KEYS` row: grep for `DRIVEN_KEYS` in `md-shared.patch` returns no match.
- `listed`/order case: `md-shared.patch:899,907,915`. Dash-proof set: `md-shared.patch:1046`. `Showcase.ts` construction after `AccordionSection`: `md-shared.patch:13-16`. `app/browser/index.ts` row: `md-shared.patch:131-134`. `Showcase.test.ts`/`index.test.ts` lists agree with these and with the barrel's `@use` after `components/close` (`md-shared.patch:828`), consistent with M14's final order.
- Modal case tables in `tests/setupStyles.ts`, frozen and exported: `md-shared.patch:1216-1364` (`Object.freeze` on each table). Bound to the inventory by derivation in `tests/setupStyles.test.ts`: `md-shared.patch:1087-1174` (`modal case tables` describe block, `binds the modal selector table to the official inventory`, `freezes every modal case table and each of its entries`).

**Claim 8 — Law and report.** BROKEN.
- No `any`, no type-cast `as`, no `!`, no `@ts-*`/`eslint-disable`, no mock/spy/fake, reused `@orkestrel/test`/`@orkestrel/contract` exports rather than duplicating them: CONFIRMED by grep across `md.diff` and `md-shared.patch` (only `as const` occurrences, no other `as`, no `!`, no `any`, no suppression comments).
- Report records each gate's command with its result line: CONFIRMED, `b-modal-md-report.md:210-222`.
- Writing rule, no cross-reference `above`/`below`: **BROKEN**. `b-modal-md-report.md:121` — "Every selector **below** is proved in `tests/src/styles/components/modal.test.ts`" — points at the table that follows in the same document, the banned cross-reference sense (`.claude/rules/writing.md` § Code tokens, references, and links requires `following`/`preceding`, never `above`/`below`). `b-modal-md-report.md:173` — "the failing-first run **above** reddens it" — same cross-reference use pointing at an earlier bullet. Every other `above`/`below` hit in the report (lines 132, 134) and in `md-shared.patch` (lines 168, 211, 219-220, 252-253, 1220, 1352, 1356) is a permitted geometric/CSS-boundary sense, not cross-reference.

Findings outside the claims: BROKEN standard — none found.

Counts the report states, listed: diffstat line counts `264, 568, 20, 253` (`b-modal-md-report.md:44`); `git apply --stat` result `16 files changed, 895 insertions(+), 223 deletions(-)` (`b-modal-md-report.md:45-46`); test-summary counts embedded in each gate's result line (`b-modal-md-report.md:216-222,229,233,237-238`).

VERDICT: FAIL 8; outside the claims: none
