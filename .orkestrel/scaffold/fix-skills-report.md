# Unit FX1 — report

Every carried finding closed. Gates green. No deviation. Baseline `ed31e6c`, clean at start; the
skill files were byte-identical to `3df4e22`, so the brief's line numbers held except where noted.

## Findings, each with its edit

### C1, C2 — voice

Ruling per line, against `AGENTS.md` § Instruction files. Line numbers are pre-edit.

| Line                              | Ruling                                                                                                                                                                                        |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `enterprise-bootstrap/SKILL.md` 81  | Rewritten. "Brainstorm privately" named no trigger. Now `Show a direction only after it satisfies the brief and the quality floor, and keep every earlier draft private` — one directive, trigger on the showing. |
| `enterprise-bootstrap/SKILL.md` 125–126 | Cut as a standalone paragraph, kept as a subordinate clause. The cascade fact decides the judgment call, so it now trails the directive: `Never reach first for any of these, because each ends the cascade for that element and then survives no --bs-* retheming, no breakpoint change, and no color-mode change`. The three-part enumeration ("it outranks the utilities, it ignores...") was narration and is gone. |
| `enterprise-bootstrap/SKILL.md` 138–144 | Split into two directives. The "by construction" story and "measures identically on every surface" are cut. The measured fact stays subordinate to the first directive, and the re-measure rule becomes its own directive with its trigger and its subordinate reason. |
| `inputs.md` 160–161                 | Rewritten to an imperative. `The platform brings the calendar` reported a fact at the reader; now `Take the calendar, the keyboard model, and the locale format from the platform rather than authoring any of them`. |
| `inspection.md` 14–15               | Explanatory sentence cut, replaced by the check it implies: `Reject a control that rule admits`. |
| `layer.md` 101–103                  | Reordered to directive-first: `Drive a <summary> with clickDisclosure…`, with the native-disclosure fact subordinate. It changes a judgment call, so it stays. **The brief's citation `layer.md 329–330` does not exist — that file is 159 lines and contains no "Chromium".** Ruled against the `<summary>` entry, the only line matching the objective lane's description. |
| `styles.md` 26–27                   | Copied-from-an-example narration cut. Directive first, then the silent-pass failure mode, which decides the call: `An apply that sets another attribute leaves the run in the default theme, where every reading passes`. |
| `capture-harness.md` 26–27          | Second sentence deleted outright. The directive already carries its trigger ("on failure"); the "debugging round" clause only persuaded. |
| `orkestrel-prove-journey/SKILL.md` 54 (addendum) | Kept, reworded. The consequence decides whether a split is acceptable, so it stays subordinate: `Never split the theme from the viewport; a split writes a filename naming a combination the run did not render`. Cut the narrating `lets a run write`. |
| `capture-harness.md` 38 (addendum)  | Kept, subordinated to a semicolon: `…never from memory of it; a near-miss field name renders an empty screen that reads as a product defect`. It changes the judgment when a capture looks wrong, and § Triage missing evidence to the harness first depends on the reader knowing it. |

### C3 — controls that enter downstream of extraction

`inspection.md` gains a third governing rule at 15–17 (**Enter a negative control through the same
door the surface enters**), and three instruments gain the second control with its coverage:

- *Authored class in the shipped cascade* 39–49: a fed control plus an appended control — an element
  built in the harness carrying the undefined token on an SVG `class` attribute, added to the tree
  the reading walks. Coverage: the fed control covers the subtraction; the appended control covers
  the extractor and fails a reading that never leaves the root or drops SVG tokens by reaching for
  `className`, where the value is an `SVGAnimatedString`.
- *Declared class combinations* 59–67: same shape with the undeclared combination string. Coverage:
  fed control covers the match against the declared set; appended control covers the extractor.
- *Composited contrast in both themes* 130–141: an opaque pairing plus a translucent stack whose
  composited ratio sits under the bar while its top layer alone reads above it. Coverage: the opaque
  pairing covers the ratio arithmetic; the stack covers the compositing step and fails a reader that
  takes the top layer's declared color and skips the layers under it.

The journey-side reading carries the matching instruction: `styles.md` 62–64 and 74–75 now say
append the control to the same `root` so it reaches the reading through `readClasses` and
`extractStyles` rather than beside them.

### C4 — the step row

`inputs.md` 477–479 → the fixed set is assigned, not excepted. `**States.** The fixed set, drawn on
the controls that move between steps. The indicator holds no value and is not a field, so it carries
its own set instead: rest and a current mark that survives every theme the surface ships.` The
catalog's claim at `inputs.md` 6–7 is that every **affordance** handles the fixed set, and the entry's
own **Default.** line already rules the indicator not a field, so the two now read as one rule.
`both themes` also went, per the count law.

### C6 — rung 4

- `SKILL.md` 117: rung 4 now points at the exception — `Take rung 4 unasked only where inspection.md → When an authored rule is already earned opens it.`
- `SKILL.md` 119: `Never open at rung 4.` deleted. The remaining `Never reach first for…` is a first-reach rule, not an absolute.
- `SKILL.md` 184–185: `never take it unprompted` → `take it unprompted only under the exception that follows`. That sentence was the second absolute and contradicted the paragraph directly under it.

### C7 — one home per rule

| Restatement                   | Now                                                                                                    |
| ----------------------------- | ------------------------------------------------------------------------------------------------------ |
| `styles.md` 54–56, 59–63      | § The authored-class census opens with a pointer to the instruments reference → Authored class in the shipped cascade, then carries the reading alone. |
| `styles.md` 67–68, 71–73      | § Style escapes opens with a pointer covering property, population, named exemptions, and the negative control. The verbatim Modal/Offcanvas/Collapse/Dropdown/`v-show` list is gone from this file. |
| `styles.md` 21                | § Run per variant opens `The run axis is fixed in SKILL.md → Read the variant once.`                    |
| `captures.md` 50              | `Render one variant per run` struck; the bullet now carries only what the capture family adds.          |
| `SKILL.md` 45–46              | Struck. The families table row at 39 now reads `Where a journey drives a control that carries state`, which covers a control carrying state whether or not the surface declares a table. |

Evidence: `tmp/units/fix-skills-dupes.py` reports 0 shared 7-word content-word sequences across each
pointer pair. Its negative control, `tmp/units/fix-skills-dupes-control.py`, runs the same instrument
over both files **at HEAD** and reports 25, including `bootstrap modal offcanvas collapse dropdown
writes inline` and `control token stylesheet defines fed reading planted`. The instrument fails on
the pre-fix state, so the clean reading is evidence.

### C9 — captures.md against the package

Verified against `../test/src/browser/helpers.ts` at the source, not the audit: `captureFrame` compares
`commands.readFile(shot.path, 'base64')` against `shot.base64` at 1930–1932, and refuses a path
mismatch at 1926–1928. `createPortfolio.place` calls `captureFrame` at `factories.ts` 135–140, so the
path `place` returns has already been read back.

- Read-back row struck from the proofs table (was 69). Disk membership kept.
- 79–81 rewritten: `…assert the written filenames equal the registry expanded for the run's variant. captureFrame already reads each file back and compares its bytes against the frame it shot, so the path place returns is proof the file exists and holds that frame.`
- Refusal table gains `Capture frame was written to <written> where <asked> was asked for` / `captureFrame`. Placeholders are named rather than both spelled `<path>`, which would have been unreadable.
- **Consequential, decided under the deviation contract:** `orkestrel-prove-journey/SKILL.md` 41 and 191 both stated the struck suite proof. The families row now reads `each registered file written to disk` and the Accept line reads `and the disk-membership proof green`. Leaving them would have left the skill ordering a proof its own reference had just struck.

### C10 — one word

`decide.md` 22: `the declared class allowlist` → `the declared class allowlist's own declaration`.

### C21 — one term per concept

**Sweep A — `control`.** Pattern `grep -rni "control"` over
`.agents/skills/enterprise-bootstrap`, `.agents/skills/orkestrel-prove-journey`, and
`.agents/skills/orkestrel-polish-surface/references/capture-harness.md`, filtered case-insensitively
for the instrument sense. Every instrument-sense hit now reads `negative control`:

- `inspection.md` 3–5, 8, 13, 15: header and governing rules.
- `inspection.md`: every `**Control.**` entry label → `**Negative control.**` (Authored class, Declared combinations, Style escapes, Token discipline, Custom rule, Composited contrast, One glyph).
- `enterprise-bootstrap/SKILL.md` 42, 91, 97, and the new checklist meta-row.
- `styles.md` 5, 46–48, 63, 74.
- `orkestrel-prove-journey/SKILL.md` 148, 183, 185.
- `decide.md` 8, 18, 23.

Residual hits, each ruled permitted and named: `inspection.md` 4 (line wrap of `its negative /
control`); `inspection.md` 44 and 64 (`the fed control`, `the appended control` — adjective-qualified
follow-on references inside the **Coverage.** entry that directly follows its **Negative control.**
entry, the same follow-on form `.claude/rules/quality.md` 66 uses); `orkestrel-prove-journey/SKILL.md`
16 (`negative-control law`, already qualified); every remaining hit is the widget or affordance sense
in a file or section where no instrument-sense `control` appears.

**Addendum — the target sense.** `orkestrel-prove-journey/SKILL.md` 66–67 → `Resolve every
interactive target by its ARIA role and its accessible name as rendered.` `interactive target` is the
layer's own failure-voice noun (`layer.md` 81: `Interactive target "<name>" does not carry a value`),
so the skill and the voices a reader will meet now use one word.

**Sweep B — `variant`.** Pattern `grep -rni "variant"` over the same paths, minus `invariant` and
`font-variant-numeric`. Chrome-sense hits in `enterprise-bootstrap`: **none remain.** Renamed by class
family or as a tone:

- `SKILL.md` 114 (`Variants, states,` → `Modifier classes, affordance states,`), 138/142/143 (→ `a solid btn-* class`, `a solid fill`), 154, 156 (→ `the danger tone`), 159 (→ `the deprecated *-dark component classes`), 178 (→ `the chosen filter's accent tone`).
- `inspection.md` 143 (→ `no class for the state`).
- `inputs.md` 54, 261, 321 (→ `accent tone class`, `color class`).
- `components.md` 27, 89, 191, 528, 861, 866, 867, 884, 1008, 1020.
- `bootstrap-reference.md` 84, 293, 488, 554.
- `utilities.md` 42, 249.

`font-variant-numeric` at `bootstrap-reference.md` 471 stays: it is a literal CSS property
identifier, exempt under `.claude/rules/writing.md` § Substitutions. Every `variant` in
`orkestrel-prove-journey` and `capture-harness.md` is the capture axis and stays.

**Sweep C — `state`.** Qualified where a sentence could take more than one sense:

- `orkestrel-prove-journey/SKILL.md` journey law 2 → `entity state read` and `which entity state a test may read at all`, matching `statechart.md`, which already says `the entity's state` throughout.
- `captures.md` 39 → `Place a capture state from inside the journey that reaches it, immediately after the assertion that proves the surface is in the condition that state names.` The old sentence slid from the capture sense to the surface sense inside one line.
- `enterprise-bootstrap/SKILL.md` ladder rung 1 → `affordance states`.
- Ruled unambiguous and left: `inputs.md` separates the fixed affordance set from the data states at 6–9 by name; every other `state` there sits under `**States.**` or beside its enumeration.

### C25 — the checklist meta-row

Moved from 243 to the head of the checklist (`SKILL.md` 230) and reworded to bind the file's checks:
`Every check that follows, inspection.md instrument or not, reports its population, names the negative
control that failed, and states its coverage; a check that can name no negative control is listed as
open instead`. It now reads over the keyboard, reduced-motion, and captures rows rather than under
them.

### F5 — the reading's name

`extractStyles` stays. "Style escapes" stays as the property's name (`inspection.md` § Style escapes,
`styles.md` § Style escapes). Every prose hit for "the escape reading" is gone:
`orkestrel-prove-journey/SKILL.md` 150 and 187 both name the reading by its export. Sweep:
`grep -rn "escape reading\|the escape"` over both journey skills returns nothing.

## Diffstat

```
 .agents/skills/enterprise-bootstrap/SKILL.md       | 53 +++++++------
 .../references/bootstrap-reference.md              |  8 +-
 .../enterprise-bootstrap/references/components.md  | 20 ++---
 .../enterprise-bootstrap/references/inputs.md      | 18 ++---
 .../enterprise-bootstrap/references/inspection.md  | 90 +++++++++++++---------
 .../enterprise-bootstrap/references/utilities.md   |  4 +-
 .../references/capture-harness.md                  |  7 +-
 .agents/skills/orkestrel-prove-journey/SKILL.md    | 50 ++++++------
 .../orkestrel-prove-journey/references/captures.md | 27 ++++---
 .../orkestrel-prove-journey/references/decide.md   |  8 +-
 .../orkestrel-prove-journey/references/layer.md    |  6 +-
 .../orkestrel-prove-journey/references/styles.md   | 50 ++++++------
 host.json                                          | 26 +++----
 13 files changed, 190 insertions(+), 177 deletions(-)
```

`host.json` moved only digests: one per edited skill file, plus the inventory's own rollup. The
vendored path set is unchanged, and `npm run build` staged 121 files as before.

## Gate readings

| Gate                | Reading                                        |
| ------------------- | ---------------------------------------------- |
| `npm run format:check` | `All matched files use the correct format.` 218 files |
| `npm run lint:check`   | Clean, no output under `--deny-warnings`       |
| `npm run check`        | Clean across `tsconfig.json`, core, server, bin |
| `npm run build`        | `build-host: staged 121 file(s)`, `build-inventory: staged 121 file(s) into host.json` |
| `npm run test:config`  | 46 passed (46), 1 file                          |
| `npm run test:policy`  | 111 passed (111), 1 file                        |
| `npm run test:guides`  | 17 passed (17), 1 file                          |

`test:policy` is not in the brief's list but is the project that rules skill directory contents,
frontmatter shape, and bridge parity, so it ran too. Bridge frontmatter under `.claude/skills/` is
untouched: `diff` of the canonical frontmatter against the bridge's first 17 lines is empty.

## Claims I could not close

- **The `layer.md 329–330` citation is unsound.** That file is 159 lines and contains no "Chromium".
  I ruled the `<summary>` entry at 101–103 as the intended subject because it is the only line
  matching the objective lane's parenthetical. If the lane meant a different line, that line is
  unruled.
- **`enterprise-bootstrap/SKILL.md` 85–86 states a count**, unchanged: `Take captures at both
  viewports and both themes`. It contradicts the checklist's own `every viewport and every theme the
  surface declares` at 249, and `both` tallies a set that can grow without naming its members. No
  carried finding names it and claim 22 passed over it, so I recorded it rather than editing outside
  the brief. It belongs to whichever capability owns the skill's count discipline.
- **`inspection.md` 125 keeps `Exempt disabled controls`** inside the composited-contrast
  **Population.** entry, one entry above **Negative control.**. I left the widget sense because the
  `SKILL.md` § Surfaces, color, contrast line it points at uses the same words, and splitting them
  would create the drift C7 exists to prevent.

## Process note

I first formatted with `npx prettier`, which is not this repository's formatter. It reflowed HTML and
JS fences in `bootstrap-reference.md`, `components.md`, and `inputs.md`, and reindented the
`enterprise-bootstrap` frontmatter from two spaces to four, which would have broken bridge parity. I
did not use `git checkout`, `restore`, `stash`, `reset`, or `clean`. I rebuilt the six affected files
from `git show HEAD:<path>` plus only my intended replacements
(`tmp/units/fix-skills-rebuild.py`, which asserts exactly one match per replacement), then ran the
real formatter, `oxfmt`. `bootstrap-reference.md` and `components.md` are back to my prose edits
alone, and both frontmatter blocks are byte-identical to HEAD.

## Instruments left on disk

- `tmp/units/fix-skills-rebuild.py` — the deterministic rebuild from HEAD plus intended edits.
- `tmp/units/fix-skills-dupes.py` — the restated-block sweep across the four pointer pairs.
- `tmp/units/fix-skills-dupes-control.py` — that sweep's negative control, run against HEAD.
- `tmp/units/fix-skills-width.py` — line-width comparison against each file's own HEAD maximum.
- `tmp/units/fix-skills-wrap.py`, `tmp/units/fix-skills-tidy.py` — the rewraps.
