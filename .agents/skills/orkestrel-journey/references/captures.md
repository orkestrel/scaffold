# The capture portfolio

Take every screenshot from an acceptance journey, at the moment that journey is in the state the
picture names. Never add a test whose only purpose is a screenshot, and never stage a state for the
camera that a journey did not reach through the interface.

## The vocabulary

```ts
import type { JourneyVariant } from '@orkestrel/test'
import type {
	CaptureVariant,
	FrameOptions,
	FrameResult,
	PortfolioInterface,
	PortfolioOptions,
} from '@orkestrel/test/browser'
import { captureFrame, createPortfolio, expandCaptures, readFrame } from '@orkestrel/test/browser'
import { inject } from 'vitest'
```

## The hook

`createPortfolio(options)` is the capture door, and `place(state, element?)` is the hook. Build the
portfolio once per file from a `PortfolioOptions` value carrying the registry as `states`, every
declared `CaptureVariant` as `variants`, this run's variant name as `variant`, the `directory` each
file is written to, and the flag as `enabled`.

- Place a state with `place(state)` for the whole page, and `place(state, element)` where the
  picture is one element.
- Take `enabled` from `inject('capture')`, which the generated root configuration provides from the
  `CAPTURE` environment variable set to `1` in the shell that runs the axis. An ordinary run leaves
  it false, so `place` returns `undefined`, resizes nothing, writes nothing, records no placement,
  and still refuses an unregistered state and a second placement of one state.
- Read `files` for the registry expanded across every variant, `placements` for what this run placed,
  and `paths` for what it wrote. Each hands back a snapshot.
- Reach for `readFrame` where the written image itself is the subject — its decoded size, or its
  pixels. `captureFrame` already reads each file back and compares its bytes against the frame it
  shot.

The package already refuses these, so assert none of them again:

| Refusal                                                              | Raised by             |
| -------------------------------------------------------------------- | --------------------- |
| `Capture variant "<name>" is not registered`                         | `createPortfolio`     |
| `Capture state "<state>" is not registered`                          | `place`, in every run |
| `Capture state "<state>" is already placed`                          | `place`, in every run |
| `Capture frame at <path> is not the one this run shot`               | `captureFrame`        |
| `Capture frame was written to <written> where <asked> was asked for` | `captureFrame`        |

## The registry

Declare the state names once in the journey file, and build the portfolio from that declaration.

- Name a state for its screen and its condition — `answer-partial`, `start-storage-failure`,
  `case-delete-confirmation`.
- Register the states the design work needs, and give every registered state a declaring case.
  In a complete run, place every registered state; in a scoped run, place every state the cases
  that ran declare.
- Place a capture state from inside the journey that reaches it, immediately after the assertion
  that proves the screen is in the condition that state names.
- Record each placed name in the suite's own set in the same step that calls `place`. That set, not
  `placements`, is what the always-on placement proof reads.
- Give each owner-bearing case registry-derived `owner:` tags. Declare a placing case's states in
  `meta.states`, derive its capture scope and part tags from those states, and place only states
  of that owner. Give behavior-only cases no capture tag.
- Derive variant-conditional declarations and placements from the same predicate. Keep the
  ownerless infrastructure cases explicit, outside behavioral work counts and completeness.
- Store frames in their declared per-scope directories, and pass those roots to the wrapper's
  portfolio declarations.

## Scoped commands

- Run `npm run journey -- <selector>` for behavior and `npm run capture -- <selector>` for frames.
  Take both commands from `node_modules/@orkestrel/capture`; follow
  [SKILL.md](../SKILL.md#choosing-what-to-run) for selector grammar, flags, refusals, and the
  case, changed-set, section or page, group, and `all` ladder. Retain `test:journey` as the
  whole-suite gate.
- Inspect the changed set with `--changed <ref> --plan` before executing it. Keep a shared-input
  refusal explicit, and follow its next command without silently capturing the complement.
- Use the authenticated selection request to refuse a case whose declared states cross the
  selected owner before any behavioral body runs. Split the case; never park the outside states.
- Resolve a frames-only `--state` request from fresh registry and passing case evidence. Keep the
  declaring case's behavior and full placement proof, projecting only the written frames onto
  the requested state. Follow the explicit refresh command when the lookup refuses.
- Keep each variant project on one rendered variant. Produce the selected first variant in
  `narrow`, then the remaining selected variants in `rest`; omit `narrow` when its variant is
  not selected and stop after a failed stage.

## Variants

The run axis is fixed in [SKILL.md](../SKILL.md) → Read the variant once. The capture family adds
these.

- Declare the viewport list in the birth-owned `configs/app/vite.journey.config.ts` wrapper, as
  `readonly JourneyVariant[]`. That file is the adopter's, so its names and its viewports are the
  application's to set, and the presence of that file is the journey axis.
- Prepare the theme under [SKILL.md](../SKILL.md#prepare-the-capture-theme) before driving the
  captured state, and use the variant list that preparation requires.
- Name each variant for the theme and the viewport it renders, such as `dark-390`. Never split the
  theme from the viewport. The name is the second half of every filename the run writes, so a
  variant named for one alone writes a filename naming a combination the run did not render.
- Pass the whole declared list as `variants` and `inject('variant')` as `variant`.
  `createPortfolio` refuses a `variant` no declared variant carries, and `files` expands the
  registry across the whole list rather than across the one being rendered.
- Produce the complete stamped portfolio with `npm run capture -- all`, which runs the declared
  variant projects through the capture runner. Keep `npm run test:journey` as the complete
  behavioral gate; a bare capture-flag run supplies no manifest stamp.

## The proofs the suite owes

Write each of the following proofs into the suite. The package asserts none of them.

| Proof                | Runs           | Asserts                                                                                                 |
| -------------------- | -------------- | ------------------------------------------------------------------------------------------------------- |
| Filename expansion   | Always         | `expandCaptures(states, variants)` has one entry per state and variant, all unique                      |
| Declaration coverage | Always         | The case declarations cover the registry, are disjoint, and match the owner and capture tag definitions |
| Placement membership | Always         | The suite's placed set equals the states declared by the cases that ran, as sets                        |
| Disk membership      | Under the flag | The written filenames equal the selected expansion for this run's variant, with no orphan on disk       |

- Keep the filename proof always-on, so a registry edit that introduces a duplicate or a collision
  fails the ordinary run. Compare `expandCaptures(states, variants)` against `files` and against a
  set built from it; a length equal to the set's size is what proves the expansion unique.
- Assert declaration coverage even in a scoped run: fail a registered state declared nowhere,
  overlapping declarations, or an owner or capture tag definition that differs from the registry.
- Assert placement as set equality against the union of the states the cases that ran declare.
  When every case ran, require that union to equal the registry. Derive completeness from the
  recorded cases that ran and passed, never from the selector or a task's mode alone.
- Read the placement proof from the suite's own set rather than from `placements`, which stays empty
  in an ordinary run. `place` refuses an unregistered name and a second placement of one state in
  every run, but a registered state that no journey placed reaches no refusal; the always-on
  placement proof catches it.
- Under the flag, assert the written filenames equal the ran cases' declared states expanded for
  the run's variant, or the explicit state's projection. Keep the full placement assertion in
  that projected run, and refuse an orphan on disk while retaining untouched registered frames.
  `captureFrame` already reads each file back and compares its bytes against the frame it shot, so
  the path `place` returns is proof the file exists and holds that frame.
- Put the membership proof last in the file, after every journey that feeds its tally.
- At group closure, prove the union of the group's declarations and its cross-section
  interactions. Run the whole-registry census only when complete reference coverage ran.

## Transient states

Capture a state that exists only while an activation is in flight from inside that activation, never
after the click returns.

- Attach a one-shot listener to the resolved control, call `place` from inside it, then click
  through the normal verb and await the promise the listener recorded.
- Fail the step when the listener never ran.

## Hygiene

- Keep the portfolio out of version control.
- Take each frame after the paint settles. Reach for `waitForAnimations` on the element whose
  transition was running ([layer.md](layer.md) → The waits); a frame shot mid-transition pictures a
  state the interface never rests in.
- Judge only frames the capture manifest records as current: every source digest the frame
  recorded must equal the tree's. Recapture what the staleness report names before the round.
  Admit a portfolio assembled from several runs only when every judged frame is current.
- Route review of the portfolio to the `orkestrel-polish` campaign, which owns preflight,
  verdicts, and reconciliation. This reference owns only how the journeys generate it.
