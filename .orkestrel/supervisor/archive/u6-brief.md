# U6 — login ergonomics

## Role and engine

`implementer`, engine **Opus 5** (subjective unit: treatment, copy, focus behaviour). Sole serial
writer in `/workspace/supervisor` from the committed checkpoint the dispatch names. Perform this
directly and spawn nothing. Do not commit, push, or npm install.

## Authority

The refusal *semantics* are fixed by the objective lane and the reconciliation
(`/home/user/scaffold/.orkestrel/supervisor/REDESIGN.md`); the *treatment* is yours within them.
Read both design lanes' area-3 sections: `/home/user/scaffold/tmp/codex/design-last.md` §3 and the
subjective design in the campaign record. The governing skill's forms rules bind
(`.agents/skills/enterprise-bootstrap/SKILL.md` — validate on blur, keep submit enabled, error
summary discipline).

## Fixed semantics — not yours to change

- Empty-submit: each empty field marks itself `is-invalid` with its inline message — unchanged.
- Server `AUTH` refusal: **neither** field gets `is-invalid` or `aria-invalid`; one form-level
  `alert alert-danger` with `role="alert"`; both entered values preserved.
- Focus after refusal: **the password field, contents selected** (Orchestrator ruling over the
  research's labelled inference — record stands in REDESIGN.md; U8's capture round validates it).
- `autocomplete="username"` / `autocomplete="current-password"` / `type="password"` / one form —
  already correct in code; do not disturb; no paste handlers; no username persistence.
- Owner-ruled copy: both field help texts are cut; one sentence sits under the button:
  **"This browser never stores your password."** as `small text-body-secondary`.

## Yours to rule

Refusal alert wording (start from "That username and password were not accepted. Check both and
try again." — improve if you can within the writing rules); alert placement (above the button per
the subjective design — confirm against the pixels); spacing/hierarchy after the help-text cut so
the card reads as five text elements; the submit button's busy state (in-button spinner per the
skill's loading rules); heading copy ("Login to the supervisor" — keep or tighten).

Baseline pixels: `/home/user/scaffold/tmp/redesign/captures/01-*.png`, `02-*.png`, `03-*.png` —
read them (you can read images) before editing, and reread the refused state especially: the
current double-ring + unattributed message is the defect you are removing.

## Scope

**Owned:** `app/browser/components/LoginPanel.vue`, its mirrored component test, and the login
assertions inside `tests/app/browser/integration/integration.test.ts` if the refusal flow's
assertions must move with the semantics (smallest change, flagged in the report).

**Off-limits:** everything else. `ApplicationView.vue` is U5's.

Forbidden: `any`, `as`, `!`, `@ts-` comments, `eslint-disable`, mocks/fakes/spies/fake clocks, new
dependencies, `style` attributes, `<style>` blocks, invented utility classes.

## Acceptance criteria

1. Refused state: zero `is-invalid` on either field, one `role="alert"`, focus in the password
   field with contents selected, values preserved — proved by component test driving the real
   refusal semantics.
2. Empty-submit still marks exactly the empty field(s) — proved.
3. The card contains five text elements (heading, two labels, alert-when-refused excluded, footer
   sentence) — proved by the accessibility tree in the test.
4. Autocomplete tokens byte-identical to baseline — proved by assertion.
5. Converge lint→format; the five gates green in the projects your files touch.

## Output

Touched files + diffstat; the full `LoginPanel.vue` diff; `git status --porcelain`; gates output;
per-criterion pointers; your copy rulings stated in one line each; deviations or none. No diary.
