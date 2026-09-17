# Routing a question

Route a question by what judges the claim, before spending a round on it. Report a question no
instrument here answers as open, and never answer it with the nearest instrument instead.

| The claim is judged by                 | Route it to                                  |
| -------------------------------------- | -------------------------------------------- |
| A compiler, a linter, or a Node runner | The `prove` tool, with its negative control  |
| A person's eye                         | The run's written artifact, named by variant |
| A person watching a widget move        | The harness run's frames and its artifact    |
| The browser's own resolved value       | The matrix family ([styles.md](styles.md))   |

Never ask `prove` about pixels, and never ask a screenshot about types.

## The receipt half

A claim a compiler, a linter, or a Node runner judges goes to `prove`. Supply its workspace project,
its case, its negative control, and the stage that negative control must break at.
`.claude/rules/quality.md` § Instruments owns that rule and the receipt line every report quotes;
follow it there rather than restating it here.

- Route the control-to-affordance table, the declared class allowlist's own declaration, the variant
  expansion, and the glyph registry here. Each supplies a project, a case, and a negative control.
- Read a `no receipt` line as the claim unproved, and report the stage that refused.

## The limit that decides the split

`prove` cannot serve a browser project, and the limit belongs to the installed `@orkestrel/probe`
rather than to a version this file names. Confirm it against the copy this workspace holds before
routing a rendered question, and record the version you read beside the ruling.

Read the pool pin, the project lookup, and the guide's own statement. Any of them holding is the
limit holding:

- **The pool pin.** Read the runtime stage in the installed server entry. Where it pins the
  `threads` pool, a browser project's specification runs in a Node worker,
  `@orkestrel/test/browser` imports `vitest/browser` at module scope, and the browser setup file
  throws before the case runs.
- **The project lookup.** The runtime stage looks a project up by the name it infers from the test
  path, and a browser project is instantiated under its browser-expanded name, so the lookup finds
  nothing and the claim is refused as missing.
- **The guide's statement.** Read what `@orkestrel/probe`'s own guide says the stages serve. Where
  it names no browser project, no stage claims one.

Never route a rendered question to `prove` while any of them holds. The pinned-pool refusal arrives
as a case failure, which reads exactly like a broken claim. Record the version, the pool pin you
read, and what the guide says, so the next round re-reads rather than re-deriving.

## The rendered artifact

Write one text file per variant under the workspace's git-ignored `tmp/` tree, named for the variant,
so a decision cites the exact file and reads it in one call.

Compose each file from what the run already holds:

- `describeTree` of the mounted surface, for the roles, names, and states a person meets.
- `describeFocus` of the mounted surface, for the focus order the keyboard walk took.
- The resolved-style rows the matrix family read for that variant — the property, the element, and
  the value the browser returned.
- The journal's `steps` and `output`, for what the run did and what the page said while it did it.
- The capture filenames this run wrote, so the artifact and the portfolio name the same states.

Rules the artifact obeys:

- Name each file for the variant that produced it. An artifact that names no variant describes a
  combination nobody can reproduce.
- Write one file per variant, never one file per journey. A decision is taken per variant, and a
  reader opening one file per journey pays a round trip per journey.
- Regenerate the whole set after any surface change. Never judge a round against a set that is part
  old and part new.
- Keep it out of version control.

## The harness run

Send a look a person decides on to what the harness run itself produced, rather than to a still of a
screen.

- Place a capture inside the harness run at each state the decision is about, and name the frames in
  the round. The run drove the widget through the interface, so the frames are a record of movement
  rather than a staged pose.
- Name the artifact beside them. Its accessible-tree lines and its journal say what the widget
  announced while it moved, which a frame cannot carry.
- Give the harness a final row or a demo step that leaves the widget in its most legible state, so
  the last frame is the one a person wants to look at.
- Name a deep link only where the workspace already ships a harness page
  ([statechart.md](statechart.md) → A harness page is product). Never ask a round to open a link the
  repository does not serve.
