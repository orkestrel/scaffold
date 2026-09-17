# Unit K1 — land the verified journey-skill changes

## Role and engine

`builder` — Sonnet, native Claude subagent, the **scaffold** checkout at
`C:\Users\mikes\WebstormProjects\scaffold`, sole serial writer in that checkout.

This unit is fully specified. Every replacement text is given verbatim. Place what is written here.
Do not design, reword, or extend anything.

## Objective

Land four changes to `.agents/skills/orkestrel-prove-journey/`. Each survived an adversarial
verification pass that read the actual files and refused every proposal it could not substantiate.

## The voice law that governs every line you write

`AGENTS.md` § Instruction files. A skill is executed by an agent mid-task, not read by a person.

- Every line is a directive: what to do, what to check, or what to refuse.
- Name the observable trigger and the required action.
- State the finding as the rule. Never record how it was found or which session found it.
- Cut any clause written to persuade, reassure, or explain the rule to a person.
- Never state a count of a set that can grow.
- No aphorisms, no metaphors.

The supplied text already obeys this. Do not rewrite it toward a friendlier voice.

## The work

### 1. Tighten the statechart family's trigger

**File:** `.agents/skills/orkestrel-prove-journey/SKILL.md`, the family table, Statechart row,
"Declared" cell.

Replace:

```text
Where a journey drives a control that carries state
```

with:

```text
Where a journey drives a transition of an entity carrying its own state and event vocabulary
```

The current wording fires on any control holding a reactive value, which is every control. The
replacement fires on the shape the family's table actually requires.

### 2. State what the entity requirement excludes

**File:** `.agents/skills/orkestrel-prove-journey/references/statechart.md`, § Declare the table.

Append to the first bullet — the one ending "fails to typecheck" — as its own sentences:

```text
A view-local reactive ref inside a component is not such an entity. Never declare a state union or
an event union solely to type a table; `AGENTS.md` § Design laws bars a literal union that names no
real domain state.
```

Do not restate the owed-or-not-owed ruling here. The family table's row cell is that rule's one
home.

### 3. Add the positive redirect a journey executor reads

**File:** `.agents/skills/orkestrel-prove-journey/SKILL.md`, § Derive journeys from intents.

Add one bullet immediately after the bullet reading "Assert the negative beside the positive
whenever a value replaces another":

```text
- Assert the state a control announces beside every drive that sets it, and on an unselected
  sibling. A control announcing state owes this assertion whether or not the surface carries the
  statechart family.
```

### 4. Add journey law 8

**File:** `.agents/skills/orkestrel-prove-journey/SKILL.md`, § Apply the journey laws.

The section is a numbered normative list ending at law 7. Add law 8, exactly:

```text
8. **Perform every interaction step unconditionally.** Never gate a step on whether the control it
   is about to drive exists or is reachable, and never branch a journey on `readRefusal`. Let the
   resolver's failure voice name what the interface withheld. A guarded step passes whether or not
   the control was there, so the run goes green on a surface that removed the control.
```

Use `failure voice`. That is the term `references/layer.md` § The failure voices and journey law 3
already fix. Do not write `refusal voice`.

### 5. Restore the keyboard verb the skill misnames

`@orkestrel/test` publishes no `pressKeys`. Its browser barrel names the published door directly:
`node_modules/@orkestrel/test/dist/src/browser/index.d.ts` reads "Focus arrives through the
published verbs — `traverseAccessible`, `userEvent.keyboard` from `vitest/browser`, a real click".
The skill carries that sentence with `userEvent.keyboard` mis-rendered as `pressKeys`, so five sites
name a symbol that does not exist.

`references/layer.md` already tells the executor that the published verbs import `page` and
`userEvent` from `vitest/browser`, and `@vitest/browser` declares
`keyboard: (text: string) => Promise<void>`. This is a restoration, not a new verb and not a
deletion.

**Each site takes a different edit. Read each line before changing it. The replacement text for
each is given here verbatim.**

`references/layer.md` § What it drives, the third bullet — replace its closing clause with:

```text
...a journey drives input through `clickAccessible`, `clickAccessibleWithin`, `clickDisclosure`,
`typeAccessible`, `fillAccessible`, and `traverseAccessible`, and sends a bare key sequence — Enter,
Escape, arrows, modifiers, and combinations — with `userEvent.keyboard` from `vitest/browser`.
```

`references/layer.md` § Which helpers take an element — **drop** `pressKeys` from the "No"
population row. Do not substitute anything. `userEvent.keyboard` is not a journey verb and does not
belong in that table.

`references/layer.md` § Input and traversal — replace the table row with:

```text
| `userEvent.keyboard(keys)` | Send a key sequence to whatever holds focus, for Enter, Escape, arrows, modifiers, and combinations. Place focus with `traverseAccessible`, `clickAccessible`, or `typeAccessible` first. |
```

`references/statechart.md` § Drive the act the way the transition happens — replace that line with:

```text
Drive `act` through the journey verbs — `clickAccessible`, `clickDisclosure`, `typeAccessible`,
`traverseAccessible` — and through `userEvent.keyboard` from `vitest/browser` where the transition
is a key on an already-focused control, for every transition a person can cause.
```

`references/styles.md` § Contrast and focus chrome — replace that line with:

```text
Read focus chrome with `readRing(control)`, after focus arrived through `traverseAccessible`,
`userEvent.keyboard` from `vitest/browser`, or a real click.
```

After the edits, `grep -rn pressKeys` over `.agents/` and `.claude/` must return nothing. Ignore
`dist/` and `tmp/`, which carry build output and copies.

### 6. Record the variant channel's constraint

**File:** `.agents/skills/orkestrel-prove-journey/references/styles.md`, in the section that builds
the matrix run on `apply`.

Add, as its own paragraph at the end of that section:

```text
Vitest `provide` carries serializable values only. Where a workspace fans one project out per
variant, the project's provided variant carries `name`, `width`, and `height`; `apply` does not
cross that channel. Run `apply` inside the test from the variant the project provides.
```

## Scope

**Owned files:**

- `.agents/skills/orkestrel-prove-journey/SKILL.md`
- `.agents/skills/orkestrel-prove-journey/references/statechart.md`
- `.agents/skills/orkestrel-prove-journey/references/layer.md`
- `.agents/skills/orkestrel-prove-journey/references/styles.md`

**Off-limits — do not edit, for any reason:**

- `.claude/skills/` — the bridges carry no independent instructions
- every other skill directory
- `src/`, `tests/`, `configs/`, `guides/`, `dist/`, `package.json`, `host.json`, `.orkestrel/`
- the roughnotes checkout at `C:\Users\mikes\WebstormProjects\roughnotes` — another unit is writing
  there

Do not commit, push, install, or bump anything. Run no `git checkout`, `git restore`, `git stash`,
`git reset`, or `git clean`.

## Execution

Perform this assignment directly. Spawn nothing.

## Acceptance criteria

1. Each of the six changes is placed exactly as written, in the named file and section.
2. `grep -rn pressKeys .agents/ .claude/` returns nothing.
3. Every internal Markdown link in the four files still resolves — every target file exists and
   every heading anchor matches a heading in the target. Report the check you ran.
4. `npx oxfmt --config .oxfmtrc.json --check <the four files>` reports correct format, if oxfmt
   covers Markdown in this repository. If it does not, say so rather than inventing a check.
5. `npm run test:policy` passes. It sweeps authored Markdown for banned terms.
6. `npm run build` succeeds. **`host.json` will change, and that is expected** — this repository
   vendors `.agents/skills/**` into `dist/host`, so editing a skill moves the published host
   surface. Report `git diff --stat host.json` and confirm every changed entry belongs to a file
   this unit edited.
7. No file outside the owned list is modified. Report `git status --short`.

## Deviation contract

A conflict stops you: report expected, found, exact evidence, done or not done. If a supplied text
does not fit the section it names — the anchor line is absent, the list is numbered differently, the
row has a different shape — stop and report with the actual text you found. Do not improvise a
placement.

## Output

Write your report to `tmp/units/k1-report.md`, and make your final message the same content:

1. **Done / not done** per change, with the before and after text for each.
2. **The `pressKeys` sweep** — every site, its edit, and the final grep result.
3. **The link check** — the command and its result.
4. **Gates** — policy result and status output.
5. **What you did not close**, and why.

No process diary.
