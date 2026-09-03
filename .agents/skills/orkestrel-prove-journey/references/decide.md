# Routing a question

Route a question by what judges the claim, before spending a round on it. Report a question no
instrument here answers as open, and never answer it with the nearest instrument instead.

| The claim is judged by                 | Route it to                                  |
| -------------------------------------- | -------------------------------------------- |
| A compiler, a linter, or a Node runner | The `prove` tool, with its negative control  |
| A person's eye                         | The run's written artifact, named by variant |
| A person watching a widget move        | A statechart harness deep link               |
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

`prove` cannot serve a browser project in `@orkestrel/probe` 0.0.11. The following refusals are each
reproduced:

- The runtime stage looks a project up by the name it infers, and a browser project is instantiated
  under its browser-expanded name, so the lookup finds nothing and the claim is refused as missing.
- The runtime stage pins the `threads` pool, so a browser project's specification runs in a Node
  worker. `@orkestrel/test/browser` imports `vitest/browser` at module scope, so the browser setup
  file throws before the case runs and the failure reads as the claim's.

Never route a rendered question to `prove` while that holds. The pinned-pool refusal arrives as a
case failure, which reads exactly like a broken claim.

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

## The harness link

Send a look a person decides on to a statechart harness deep link rather than to a file. Name the
exact link in the round, and let the person watch the widget move rather than read a still of it
([statechart.md](statechart.md) → Build the harness a person watches).
