# Unit K2 — land the verified enterprise-bootstrap changes

## Role and engine

`builder` — Sonnet, native Claude subagent, the **scaffold** checkout at
`C:\Users\mikes\WebstormProjects\scaffold`.

You are the sole writer in this checkout. Unit K1 edited
`.agents/skills/orkestrel-prove-journey/` and has exited; its files are committed to the working
tree and are not yours. `host.json` already carries K1's digest changes — leave them.

This unit is fully specified. Every replacement text is given verbatim. Place what is written.

## The voice law that governs every line you write

`AGENTS.md` § Instruction files. A skill is executed by an agent mid-task, not read by a person.

- Every line is a directive: what to do, what to check, or what to refuse.
- Name the observable trigger and the required action.
- Cut any clause written to persuade, reassure, or explain the rule to a person.
- Never state a count of a set that can grow.
- No aphorisms, no metaphors.

The supplied text already obeys this. Do not rewrite it toward a friendlier voice.

## The work

### 1. Add the refused-capability contract

**File:** `.agents/skills/enterprise-bootstrap/references/bootstrap-reference.md`.

Insert immediately after § The data states and before ### Feedback discipline:

```text
### Refused capabilities

A browser capability the document asks for can refuse at the call site. A storage write raises
`QuotaExceededError` when no room is left, and a storage read raises when the browser holds that
capability behind a permission. Give a refusal the treatment [The data states](#the-data-states)
requires of every other state.

- **Paint before you persist.** Apply the state to the document first, then write it. A control
  deriving its label and `aria-pressed` from a flag the write moves announces a state the document
  is not in as soon as the write refuses.
- **Catch at the boundary that makes the call**, not at the caller. A read that runs during
  construction takes the whole surface down when it escapes, and the person gets a blank page
  instead of a degraded one.
- **Default a refused read to the state a first-time reader gets.** The person who cleared site data
  and the person whose browser refuses the read arrive at the same screen.
- **Keep the action working for this session.** The refusal costs the memory of the preference.
  Never let it also cost the behavior the person asked for.
- **Say nothing about a refusal the person does not experience.** A preference that paints and does
  not survive the session earns no failure sentence and no retry control: the action succeeded, and
  a retry writes the same value to the same refusing store. Where the refusal does cost the person
  something they asked for, carry it on the channel [Feedback discipline](#feedback-discipline)
  names for its scope — inline alert for a refusal tied to one control, banner for a capability the
  whole surface needs.
```

Name no capability beyond storage. Do not add clipboard, geolocation, or "similar browser API".

### 2. Add the section to the Enterprise patterns run

**File:** the same file, the Enterprise patterns run near the top.

After `[The data states](#the-data-states)`, append:

```text
 · [Refused capabilities](#refused-capabilities)
```

### 3. Point the colour-mode reference at the new contract

**File:** `.agents/skills/enterprise-bootstrap/references/color-modes.md`.

Replace the line carrying `tolerate unavailable storage`, and its continuation, with:

```text
When implementing a picker, validate persisted values and resolve `auto` through
`prefers-color-scheme` before setting the attribute. Take a refused read or write from
[bootstrap-reference.md](bootstrap-reference.md) → Refused capabilities.
```

`tolerate` names no action. The replacement names where the action lives.

### 4. Stop the reference from sending the reader back for the same subject

**File:** `.agents/skills/enterprise-bootstrap/references/bootstrap-reference.md`, the host-controller
paragraph that currently repeats "storage failure".

Replace it with:

```text
Reuse the host controller. When implementing one, follow
[Scope the mode](color-modes.md#scope-the-mode) for validated preference, automatic-mode resolution,
first paint, and overlay mounts, and [Refused capabilities](#refused-capabilities) for a refused read
or write. Bootstrap ships no picker; an attribute example is not a complete controller.
```

### 5. Add the wrapped-target rule, in the form that survives measurement

**File:** the same file, § Target size.

Append to the `Target size` bullet:

```text
An inline target whose text can wrap paints one rectangle per line, and the rectangles are disjoint,
so the centre of its bounding box can land between them and resolve to the ancestor. Make such a
target `d-block`, `d-grid`, or a `stretched-link` container wherever a click must land anywhere in
its box. Never enlarge one through `line-height`, which widens the gap between the rectangles rather
than the rectangles. Measure the hit area at the narrowest supported viewport, where the target
wraps, not only where it fits one line.
```

This wording is measured rather than reasoned: on a served page, a wrapped inline link's per-line
rectangles were disjoint and its bounding-box centre resolved to the ancestor; `line-height` widened
that gap; `display: block` collapsed it to one rectangle. Do not restore the earlier claim that
inline padding causes the gap — padding mitigated it.

### 6. Replace the banned abbreviation in an authored comment

**File:** `.agents/skills/enterprise-bootstrap/references/components.md`, the JavaScript sample
comment reading `// element may already be initialized (e.g. by a data attribute)`.

Replace `e.g.` with `for example,` so the comment reads
`// element may already be initialized (for example, by a data attribute)`.

`.claude/rules/writing.md` bans `e.g.` unconditionally, and the policy sweep reads every comment.

### 7. Drop an invented severity label

**File:** `.agents/skills/enterprise-bootstrap/references/bootstrap-reference.md`, the documented
limitation about client-side validation styles.

Replace `**Documented limitation (enterprise-critical):**` with `**Documented limitation:**`.
`enterprise-critical` names no checkable condition.

## Scope

**Owned files:**

- `.agents/skills/enterprise-bootstrap/references/bootstrap-reference.md`
- `.agents/skills/enterprise-bootstrap/references/color-modes.md`
- `.agents/skills/enterprise-bootstrap/references/components.md`

**Off-limits — do not edit, for any reason:**

- `.agents/skills/orkestrel-prove-journey/` — unit K1's, already landed
- every other skill directory, and `.claude/skills/`
- `src/`, `tests/`, `configs/`, `guides/`, `dist/`, `package.json`, `.orkestrel/`
- the roughnotes checkout — another unit is writing there

You may run `npx oxfmt` without `--check` scoped to your own files to converge formatting, and you
must then re-run it with `--check`. Do not commit, push, install, or bump anything. Run no
`git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`.

## Execution

Perform this assignment directly. Spawn nothing.

## Acceptance criteria

1. Each change is placed exactly as written, in the named file and section.
2. Every internal Markdown link in your three files still resolves — every target file exists and
   every heading anchor matches a heading in the target. The new `#refused-capabilities` anchor
   resolves from both the run and `color-modes.md`. Report the check you ran.
3. A case-insensitive sweep of your three files for `e.g.`, `i.e.`, and `enterprise-critical`
   returns nothing.
4. A sweep for `tolerate` in `color-modes.md` returns nothing.
5. `npx oxfmt --config .oxfmtrc.json --check <your three files>` reports correct format.
6. `npm run test:policy` passes. It sweeps authored Markdown for banned terms, which is what
   change 6 exists to satisfy.
7. `npm run build` succeeds. **`host.json` will change, and that is expected** — this repository
   vendors `.agents/skills/**` into `dist/host`. Report `git diff --stat host.json` and confirm the
   entries it changes belong to your files or to unit K1's, naming which is which.
8. No file outside the owned list is modified by you. Report `git status --short` and name the files
   unit K1 left modified rather than claiming them.

## Deviation contract

A conflict stops you: report expected, found, exact evidence, done or not done. If a supplied text
does not fit the section it names — the anchor is absent, the bullet has a different shape — stop
and report with the actual text you found. Do not improvise a placement.

## Output

Write your report to `tmp/units/k2-report.md`, and make your final message the same content:

1. **Done / not done** per change, with the before and after text for each.
2. **The link check** — the command and its result.
3. **The sweeps** — each command and its result.
4. **Status** — `git status --short`, with sibling-unit files named as such.
5. **What you did not close**, and why.

No process diary.
