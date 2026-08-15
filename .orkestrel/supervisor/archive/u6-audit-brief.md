# U6 audit round 1 — login ergonomics

## Subject

Commit `a9c425c` in `/workspace/supervisor` (baseline `9fba674`). One Opus implementation round,
two files (`LoginPanel.vue`, its component test), 390-line diff. This is a RENDERED surface: the
capture portfolio is the primary review input, source is corroboration (falsify evidence table).

## What the round decides

Whether the login closes exit criterion 1 (capture-proved: refused state marks neither field, one
alert, five text elements) pending only U8's measured contrast matrix.

## Already established (Orchestrator-verified)

- Orchestrator acceptance at `a9c425c`: app:browser + integration together 34 files, 333/333.
- The writer's failing-first proof (7 red on the old component, 10 green on the new, same
  command) is claimed in its report — verify the test names exist; do not re-run.
- Guides red is the pre-existing U1-U3 set (writer proved by stash-and-rerun at 9fba674:
  identical 10 failures); the diff adds no export.
- Touched set is exactly the two owned files (Orchestrator-read `git status` before commit).

## Review evidence

- CAPTURES (primary): `/tmp/claude-0/-home-user/6d2dc0ef-4f55-5fcd-ae2e-97129e7119cf/scratchpad/u6-*.png`
  — first/refused/empty states × viewports × themes (9 files). Baselines for comparison:
  `/home/user/scaffold/tmp/redesign/captures/01-*.png`, `02-*.png`, `03-*.png`.
- Diff `/home/user/scaffold/tmp/redesign/u6.diff`; status `u6-status.txt`; writer report is the
  agent task result quoted in the campaign record — its LoginPanel.vue diff is inside u6.diff.
- Brief `/home/user/scaffold/tmp/redesign/u6-brief.md`; design record
  `/home/user/scaffold/.orkestrel/supervisor/REDESIGN.md`; skill law
  `/workspace/supervisor/.agents/skills/enterprise-bootstrap/SKILL.md`; the tree at `a9c425c`.

## Numbered claims

CONFIRMED requires naming the failed attack; undecidable = UNRESOLVED + settling run.

1. **The refused state is the ruling, in pixels.** In the refused captures: zero invalid ring on
   either field, exactly one alert (attributed, icon + words) between the password and the
   button, both values visibly preserved, and the caret/selection visibly in the password. The
   double-ring + unattributed red text of the baselines is gone at both viewports and themes.
2. **The card is five text elements.** In the first-load captures: heading, two labels, button,
   one sentence under it — no field help texts, at both viewports and themes; the empty-submit
   capture shows exactly the empty-field messages added and nothing else.
3. **The semantics are the fixed ones.** In source: `role="alert"` exactly once; `aria-invalid`
   only on the empty-marked path; autocomplete tokens byte-identical (`username`,
   `current-password`); no paste handler, no username persistence, no `style` attribute or
   invented class; focus rules per the recorded rulings including the transport-failure →
   control rule the writer added (rule on whether that addition obeys the design record or
   exceeds the brief).
4. **The copy obeys the writing rules.** The refusal sentence ("The supervisor refused that
   login. Check the username and password, then try again."), the rate-limit copy, and the
   assurance sentence: active voice, one idea per sentence, vocabulary consistent with the
   guide's fixed `login` term, no invented evidence about which half was wrong.
5. **The test binds the semantics.** The component test drives the real Operator + ScriptedClient
   (no mock); the refused-state proof pins alert count, no marks, preserved values, focus AND
   selection; the copy sweep pins the exact four panel strings; the failing-first set is
   plausible (the seven names exist and target the changed behavior).
6. **Ship it.** As the login the reconciled design describes, pending U8's measured contrast:
   would you ship these pixels and this diff?

## Threshold

Findings outside claims at the BROKEN standard only. Verdict shape per
`/workspace/supervisor/.agents/skills/orkestrel-falsify/SKILL.md`; one terminal line. No process
diary.
