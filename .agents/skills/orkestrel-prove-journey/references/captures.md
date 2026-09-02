# The capture portfolio

Take every screenshot from an acceptance journey, at the moment that journey is in the state the
picture names. Never add a test whose only purpose is a screenshot, and never stage a state for the
camera that a journey did not reach through the interface.

## The hook

`createPortfolio(options)` is the capture door, and `place(state, element?)` is the hook. Build the
portfolio once per file from a `PortfolioOptions` value carrying the registry as `states`, every
declared `CaptureVariant` as `variants`, this run's `variant`, the `directory` each file is written
to, and the flag as `enabled`.

- Place a state with `place(state)` for the whole page, and `place(state, element)` where the
  picture is one element.
- Leave `enabled` unset in an ordinary run. `place` then returns `undefined`, resizes nothing,
  writes nothing, and records nothing.
- Read `files` for the registry expanded across every variant, `states` for what this run placed,
  and `paths` for what it wrote. Each hands back a snapshot.

The package already refuses these, so assert none of them again:

| Refusal                                                              | Raised by             |
| -------------------------------------------------------------------- | --------------------- |
| `Capture variant "<name>" is not registered`                         | `createPortfolio`     |
| `Capture state "<state>" is not registered`                          | `place`, when enabled |
| `Capture state "<state>" is already placed`                          | `place`, when enabled |
| `Capture frame at <path> is not the one this run shot`               | `captureFrame`        |
| `Capture frame was written to <written> where <asked> was asked for` | `captureFrame`        |

## The registry

Declare the state names and the variants once in the journey file, and build the portfolio from
that declaration.

- Name a state for its surface and its condition — `answer-partial`, `start-storage-failure`,
  `case-delete-confirmation`.
- Register the states the design work actually needs, and place every registered one. Never leave a
  registered state unplaced.
- Place a capture state from inside the journey that reaches it, immediately after the assertion
  that proves the surface is in the condition that state names.
- Record each placed name in the suite's own set in the same step that calls `place`. That set, not
  `states`, is what the always-on placement proof reads.

## Variants

The run axis is fixed in [SKILL.md](../SKILL.md) → Read the variant once, and the theme switch each
variant's `apply` performs is fixed in [styles.md](styles.md) → Run per variant. The capture family
adds these.

- Produce the portfolio — the registry times the variants — by repeating the run once per variant.
- Name each variant for the theme and the viewport it renders, such as `dark-390`. The name is the
  second half of every filename the run writes, so a variant named for one alone produces a
  portfolio nobody can tell apart.
- Pass the whole variant list as `variants` and this run's name as `variant`. `createPortfolio`
  refuses a `variant` no declared variant carries, and `files` expands the registry across the whole
  list rather than across the one being rendered.

## The proofs the suite owes

The package times the registry and refuses a bad placement. It asserts nothing about either, so the
suite carries these.

| Proof                | Runs           | Asserts                                                                            |
| -------------------- | -------------- | ---------------------------------------------------------------------------------- |
| Filename expansion   | Always         | `expandCaptures(states, variants)` has one entry per state and variant, all unique |
| Placement membership | Always         | The suite's placed set equals the registry, as sets                                |
| Disk membership      | Under the flag | The filenames on disk equal the expansion for this run's variant                   |

- Keep the filename proof always-on, so a registry edit that introduces a duplicate or a collision
  fails the ordinary run. Compare `expandCaptures(states, variants)` against `files` and against a
  set built from it; a length equal to the set's size is what proves the expansion unique.
- Assert placement as set equality against the registry, in every run. Never assert a count: a count
  passes while one state is placed twice and another never.
- Read the placement proof from the suite's own set rather than from `states`. An ordinary run's
  `place` returns before it reads the registry, so `states` is empty there and an unregistered name
  reaches no refusal until a capture run. The always-on placement proof is what catches it.
- Under the flag, assert the written filenames equal the registry expanded for the run's variant.
  `captureFrame` already reads each file back and compares its bytes against the frame it shot, so
  the path `place` returns is proof the file exists and holds that frame.
- Put the membership proof last in the file, after every journey that feeds its tally.

## Transient states

Capture a state that exists only while an activation is in flight from inside that activation, never
after the click returns.

- Attach a one-shot listener to the resolved control, call `place` from inside it, then click
  through the normal verb and await the promise the listener recorded.
- Fail the step when the listener never ran.

## Hygiene

- Keep the portfolio out of version control.
- Regenerate the whole matrix from the journeys after any surface change. Never judge a round
  against a portfolio that is part old and part new.
- Route review of the portfolio to the `orkestrel-polish-surface` campaign, which owns preflight,
  verdicts, and reconciliation. This reference owns only how the journeys generate it.
