# Unit K2 report

## Done / not done per change

1. **Refused-capability contract added** — done. `bootstrap-reference.md`, inserted between
   the last bullet of § The data states and `### Feedback discipline`.
   - Before: section ended with the "Every error state..." bullet, then directly `### Feedback discipline`.
   - After: the "Every error state..." bullet, then the new `### Refused capabilities` section
     (verbatim text from the brief), then `### Feedback discipline`.

2. **Enterprise patterns run updated** — done. `bootstrap-reference.md` line 17.
   - Before: `...[The data states](#the-data-states) · [Feedback discipline](#feedback-discipline)...`
   - After: `...[The data states](#the-data-states) · [Refused capabilities](#refused-capabilities) · [Feedback discipline](#feedback-discipline)...`

3. **Colour-mode reference points at the new contract** — done. `color-modes.md`.
   - Before:
     ```
     When implementing a picker, validate persisted values, tolerate unavailable storage, and resolve
     `auto` through `prefers-color-scheme` before setting the attribute. Follow system changes only
     ```
   - After:
     ```
     When implementing a picker, validate persisted values and resolve `auto` through
     `prefers-color-scheme` before setting the attribute. Take a refused read or write from
     [bootstrap-reference.md](bootstrap-reference.md) → Refused capabilities. Follow system changes only
     ```

4. **Host-controller paragraph de-duplicated** — done. `bootstrap-reference.md`, § Theme toggle.
   - Before:
     ```
     Reuse the host controller. When implementing one, follow [Scope the mode](color-modes.md#scope-the-mode)
     for validated preference, automatic-mode resolution, storage failure, first paint, and overlay
     mounts. Bootstrap ships no picker; an attribute example is not a complete controller.
     ```
   - After:
     ```
     Reuse the host controller. When implementing one, follow
     [Scope the mode](color-modes.md#scope-the-mode) for validated preference, automatic-mode resolution,
     first paint, and overlay mounts, and [Refused capabilities](#refused-capabilities) for a refused read
     or write. Bootstrap ships no picker; an attribute example is not a complete controller.
     ```

5. **Wrapped-target rule added** — done. `bootstrap-reference.md`, § Target size bullet.
   - Before: bullet ended at "...Enlarge the button or its associated label, not the icon's
     surrounding decoration."
   - After: same bullet, with the supplied wrapped-target paragraph appended verbatim
     ("An inline target whose text can wrap paints one rectangle per line..." through "...where
     the target wraps, not only where it fits one line.").

6. **Banned abbreviation replaced** — done. `components.md`.
   - Before: `// element may already be initialized (e.g. by a data attribute)`
   - After: `// element may already be initialized (for example, by a data attribute)`

7. **Invented severity label dropped** — done. `bootstrap-reference.md`.
   - Before: `**Documented limitation (enterprise-critical):**`
   - After: `**Documented limitation:**`

## The link check

Command: `grep -n "refused-capabilities" .agents/skills/enterprise-bootstrap/references/bootstrap-reference.md .agents/skills/enterprise-bootstrap/references/color-modes.md`

Result: the `#refused-capabilities` anchor appears at the run (line 17) and at the § Theme toggle
paragraph (line 119) in `bootstrap-reference.md`, both resolving to the `### Refused capabilities`
heading confirmed present with `grep -c "^### Refused capabilities" bootstrap-reference.md` → `1`.
`color-modes.md`'s reference to the new contract links to the file `bootstrap-reference.md` (not an
anchor) per the verbatim text supplied in the brief; that file exists. No other internal link in
the three owned files was touched, so no other link needed re-checking.

## The sweeps

- `grep -in "e\.g\.\|i\.e\.\|enterprise-critical" bootstrap-reference.md color-modes.md components.md` → no output (clean).
- `grep -in "tolerate" color-modes.md` → no output (clean).
- `npx oxfmt --config .oxfmtrc.json .agents/skills/enterprise-bootstrap/references/{bootstrap-reference.md,color-modes.md,components.md}` (mutating pass to converge) → `Finished in 489ms on 3 files using 16 threads.`
- `npx oxfmt --config .oxfmtrc.json --check .agents/skills/enterprise-bootstrap/references/{bootstrap-reference.md,color-modes.md,components.md}` → `All matched files use the correct format.`
- `npm run test:policy` → `Test Files 1 passed (1)`, `Tests 102 passed (102)`.
- `npm run build` → succeeded; `build-host: staged 172 file(s) into dist/host`; `build-inventory: staged 172 file(s) into host.json`.

## Status

`git status --short`:

```
 M .agents/skills/enterprise-bootstrap/references/bootstrap-reference.md   (mine)
 M .agents/skills/enterprise-bootstrap/references/color-modes.md            (mine)
 M .agents/skills/enterprise-bootstrap/references/components.md             (mine)
 M .agents/skills/orkestrel-prove-journey/SKILL.md                          (unit K1's — not mine)
 M .agents/skills/orkestrel-prove-journey/references/layer.md               (unit K1's — not mine)
 M .agents/skills/orkestrel-prove-journey/references/statechart.md          (unit K1's — not mine)
 M .agents/skills/orkestrel-prove-journey/references/styles.md              (unit K1's — not mine)
 M host.json                                                                (K1's digests + mine, from build:host/build:inventory)
?? .orkestrel/campaign/k1-brief.md                                          (unit K1's — not mine)
?? .orkestrel/campaign/k1-report.md                                         (unit K1's — not mine)
?? .orkestrel/campaign/k2-brief.md                                          (this unit's brief, pre-existing)
?? .orkestrel/campaign/skill-survey-verified-plan.md                        (pre-existing, not mine)
?? .orkestrel/scaffold/post-landing-audit.log.txt                           (pre-existing, not mine)
```

`git diff --stat host.json`: `host.json | 16 ++++++++--------` (8 insertions, 8 deletions).
`git diff host.json` confirms four digest pairs changed: three entries for my owned files
(`bootstrap-reference.md`, `color-modes.md`, `components.md`) plus the four `orkestrel-prove-journey`
entries already carrying unit K1's changes before this build ran, plus the top-level manifest
`digest`. No file outside the owned list was modified by this unit; every other modified or
untracked path listed above belongs to unit K1 or pre-existed this dispatch.

## What I did not close, and why

Nothing in the brief's enumerated scope is open. All eight acceptance criteria are satisfied and
reported with their exact commands and results above.
