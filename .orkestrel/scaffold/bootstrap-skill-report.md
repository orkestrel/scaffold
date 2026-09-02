# Unit U2 bootstrap-skill — report

## Outcome

The two references are written and `SKILL.md` routes to them. The writing is complete. Both gate
criteria are **unclosed**, because `node_modules` is absent from this checkout and the permission
floor forbids a writer installing dependencies. The brief's Host section states `npm ci` has been
run here; it has not.

## Files changed

| File                                                        | Lines | Change                                                                                       |
| ----------------------------------------------------------- | ----- | -------------------------------------------------------------------------------------------- |
| `.agents/skills/enterprise-bootstrap/SKILL.md`              | 252   | Layer-table rows, intake pointer, Mechanical proof shrunk to a pointer, Forms pointer, custom-CSS exception, checklist lines |
| `.agents/skills/enterprise-bootstrap/references/inputs.md`  | 501   | New: the affordance catalog keyed by what a person is asked for                              |
| `.agents/skills/enterprise-bootstrap/references/inspection.md` | 152 | New: the instruments, each with property, population, reading, control, coverage             |

`.claude/skills/enterprise-bootstrap/SKILL.md` is untouched: the canonical `description` did not
change, so bridge parity holds. The canonical and bridge frontmatter blocks are byte-identical
(`diff` reports no difference).

### `SKILL.md` — what changed

- The intake paragraph routes an input's affordance to `inputs.md`.
- The layer table gains an `Inputs` row and an `Instruments` row, padded to the existing column
  widths (16 / 61 / 83 including the pipe spacing).
- **Mechanical proof** is a pointer at `inspection.md` naming the instruments it owns, and keeps the
  control law and the `.claude/rules/quality.md` attribution.
- **Forms** gains a leading bullet routing affordance choice and the fixed state set to `inputs.md`,
  and naming the cross-category rules as laws. The existing label, validation, and error-summary
  bullets stand unchanged.
- **When custom CSS is justified** states the bounded exception and routes the full condition to
  `inspection.md` → When an authored rule is already earned. The authorized-rule bullets now read
  "When the developer authorizes it, or the exception opens".
- The production checklist gains `Input affordances from inputs.md; every state in its fixed set
  drawn, per field`, and the former `Authored classes checked against that cascade; one glyph per
  meaning; every instrument's control failed` line is replaced by `Every instrument in inspection.md
  run: population reported, control failed, coverage stated`. That replacement is the "which
  sentence a pointer replaces" decision the deviation contract leaves to me: the old line named a
  subset of the instruments and would have drifted from the file that now owns them.

### `inputs.md` — shape

`The fixed state set` (rest, hover, focus-visible, disabled, locked, invalid, busy, required, with
help, plus empty and full where the value is a set) is defined once and named by every category's
**States** line, which then states only what its category adds or changes. `busy` names a control
waiting on work the person cannot see, and the `One of many` row states that a select whose options
are loading is `busy`. The data states route to `bootstrap-reference.md` → The data states rather
than being repeated.

`Rules that cross every category` carries the read-only chrome rule, the locked-select rule, the
chosen-filter accent rule, the control-size rule, the one-visible-label pointer, and the hand-roll
routing. The lone-box against grouped-boxes against radio-group against segmented-group ruling sits
in `One on/off answer` and `One of a few`, where a reader meets the decision. The hidden file input
as the non-drag path sits in `Files`. `Where Bootstrap ships no component` names the APG pattern each
hand-roll owes and routes the build decision to `bootstrap-reference.md` → When not to hand-roll,
and states that skeletons are shipped and are not in that set.

Every category the brief named has a section with **Default** (markup and rung), **Alternates**
(with the density or list size that earns each), and **States**.

### `inspection.md` — shape

Two laws bind every entry: report the population and fail an empty one; draw the control from
outside the population after naming the membership rule. The instruments are authored class in the
shipped cascade, declared class combinations, style escapes, token discipline, custom rule doing a
utility's job, composited contrast in both themes, and one glyph one meaning. Each states property,
population, reading, control, and coverage, and names no function from any package and no algorithm.
`When an authored rule is already earned` states the bounded custom-CSS exception.

## Patches for shared files (report-only, not applied)

One rule now has two homes. The brief requires `inputs.md` to carry the chosen-filter rule, and
`components.md` § Selection fills states it too. Apply this to give it one home.

```diff
--- a/.agents/skills/enterprise-bootstrap/references/components.md
+++ b/.agents/skills/enterprise-bootstrap/references/components.md
@@ -1008,1 +1008,1 @@
-- **`btn-check` filter labels invert in dark.** A `btn-outline-secondary` label reads as "chosen" in light and as "muted" in dark, because the checked fill and the surface swap relative weight. Give chosen filters an accent variant (a real theme color) rather than the neutral outline, so "chosen" reads the same way in both modes.
+- **`btn-check` filter labels invert in dark.** A `btn-outline-secondary` label reads as "chosen" in light and as "muted" in dark, because the checked fill and the surface swap relative weight. [inputs.md](inputs.md) → Rules that cross every category owns the correction.
```

No other sentence had to move. Observation, no patch offered: `components.md` → Choosing components
carries a `Choosing a form value` row that overlaps the `One of many` category. It is a
component-selection row rather than an affordance rule, so it reads as complementary; a later unit
can rule on it.

## Gates

`npm run format:check`, bare:

```
npm notice run @orkestrel/scaffold@0.0.59 format:check
npm notice run oxfmt --config .oxfmtrc.json --check .
'oxfmt' is not recognized as an internal or external command,
operable program or batch file.
EXIT=1
```

`npm run test:policy`, bare:

```
npm notice run @orkestrel/scaffold@0.0.59 test:policy
npm notice run vitest run --config vite.config.ts --no-cache --reporter=dot --project policy
'vitest' is not recognized as an internal or external command,
operable program or batch file.
EXIT=1
```

Cause: `ls -a` at the repository root shows no `node_modules` directory. Node 24.20.0 and npm 12.0.2
resolve. `tests/setupPolicy.ts` imports `typescript`, so the policy inspectors cannot be driven from
a plain Node script either.

## Acceptance criteria

| # | Criterion                                                  | State                                                                                 |
| - | ---------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| 1 | `npm run format:check` green                               | **Unclosed** — `oxfmt` unresolved, `node_modules` absent                              |
| 2 | `npm run test:policy` green                                | **Unclosed** — `vitest` unresolved, `node_modules` absent                             |
| 3 | Directory holds only `SKILL.md`, `agents/openai.yaml`, and named `references/*.md` | **Met**, by direct reading                            |
| 4 | `grep -n "@orkestrel" .agents/skills/enterprise-bootstrap -r` returns nothing | **Met**, exit 1, no output                                 |
| 5 | Every category has a row; every row states the fixed state set; every instrument states property, population, reading, control, coverage | **Met**, by direct reading |

Scoped manual checks standing in for the policy suite, with their coverage stated. They reproduce
the suite's directory-shape, reference-naming, template-TODO, and frontmatter-parity invariants by
direct reading, and run none of its negative controls, so they are weaker evidence than the suite
and do not close criterion 2.

- `find .agents/skills/enterprise-bootstrap -type f` returns `SKILL.md`, `agents/openai.yaml`, and
  the `references/*.md` files listed in the next check, and nothing else.
- The tokens `SKILL.md` names, extracted with the suite's own pattern, are
  `references/bootstrap-reference.md`, `references/components.md`, `references/frontend-design.md`,
  `references/inputs.md`, `references/inspection.md`, `references/utilities.md` — set-equal to the
  files on disk, so no reference is unnamed and no named reference is missing.
- `grep -rn "TODO" .agents/skills/enterprise-bootstrap` returns nothing.
- Canonical and bridge frontmatter are identical.
- No CR byte in any of the three files; each ends in one newline; no trailing whitespace.

## Claims I could not close

- **Both gates.** Stated in the preceding section. The Orchestrator runs them after an install.
- **`host.json` regeneration.** `host.json` enumerates each vendored skill file with its digest, and
  it names `bootstrap-reference.md`, `components.md`, `frontend-design.md`, and `utilities.md` and
  no other reference. `npm run build` must regenerate it before any target
  receives `inputs.md` and `inspection.md`. Off-limits to this unit, as the brief directs.
- **Prose conformance beyond my own sweep.** I swept the two new files case-insensitively for the
  substitution table's terms. The hits were `once` in the sense of "a single time", which the table's
  temporal row does not reach; one temporal `once` was rewritten to `after`. The `above` uses were
  rewritten, one to `preceding` and one to an anchor link. The sweep covered
  `references/inputs.md`, `references/inspection.md`, and `SKILL.md`; it did not cover the earlier
  references.
- **Markup accuracy against a running Bootstrap 5.3 build.** Every class in the new fences is either
  documented in `components.md` or `utilities.md`, or is a native HTML attribute. I checked
  `btn-close` (no `-sm` variant exists) and the sizing scale (`mh-100` is the only maximum-height
  step) against `components.md` and `utilities.md`, and corrected the drafted lines that used a
  `btn-close-sm` class and an invented height attribute. Nothing rendered
  a page, so the fences are unrendered claims.

## Deviations

One, reported rather than worked around: the brief's Host section states `npm ci` has been run in
this checkout, and `node_modules` does not exist. Installing dependencies is refused by the
permission floor in `.agents/orchestration.md`, so the unit finished its writing and left both gate
criteria open rather than installing.

## Review evidence

`git diff --stat`:

```
 .agents/skills/enterprise-bootstrap/SKILL.md | 37 ++++++++++++++++++----------
 1 file changed, 24 insertions(+), 13 deletions(-)
```

`git status --porcelain`:

```
 M .agents/skills/enterprise-bootstrap/SKILL.md
?? .agents/skills/enterprise-bootstrap/references/inputs.md
?? .agents/skills/enterprise-bootstrap/references/inspection.md
```
