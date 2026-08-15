---
name: orkestrel-human-journey
description: Prove a browser surface the way a person reaches it — role-and-name resolution that refuses hidden or ambiguous targets, keyboard-first entry, perception-level assertions, and convergence waits — and keep those journey tests strictly separated from transport-class suites. Use when writing or reviewing browser tests that claim a human can complete a flow, when a surface change needs proof a person can still operate it, or when a capture of a rendered surface must be driven honestly.
---

# Human journey

A journey test claims a person can complete a flow. Its instruments must therefore be limited to
what a person has: what is visible, what is reachable, what the page announces. A test that reaches
the goal through a selector a person cannot see proves the wrong claim and stays green while the
surface breaks.

## Load authority

1. `AGENTS.md`; `.claude/rules/tests.md` and `.claude/rules/browser.md`.
2. `tests/setupBrowser.ts`, or the setup file of the Vitest project that runs the journeys where
   the workspace declares a separate one (`.claude/rules/workspace.md`, test project matrix) — the
   journey layer's one home. Read its boundary comment before writing a journey.
3. The governing guide for the surface under test.

## The two classes

- **Journey class**: drives the surface as a person — role and accessible name, keyboard, visible
  text. Asserts perception: what the operator can see, read, and reach.
- **Transport class**: drives the wire — login helpers, workflow starters, direct client calls.
  Asserts protocol: requests, payloads, states.

Declare a test's class in its own name, and check the instruments it calls against the boundary
comment in the layer's setup file. A journey lives in the reserved end-to-end scope for its
environment (`integration.test.ts` or an `integration/` directory beneath it, per
`.claude/rules/tests.md`), never in a module-mirrored test file.

One test never mixes classes inside its body. Transport helpers may run OUTSIDE a journey callback
to seed fixtures; inside one they are forbidden. A journey that needs data uses the transport class
to seed it first, then enters the surface as a person who found it that way.

## Journey instruments

The layer exports exactly these instrument kinds, and a journey body calls nothing else:

- **The resolver** — locate a target by role and accessible name. It REFUSES, with a readable
  failure naming the reason: a hidden or `aria-hidden` target, an ambiguous name (two or more
  matches), a disabled target, an unreachable one. A journey that cannot find its target the human
  way must fail loudly, never fall through to a selector.
- **The focus probe** — answer whether a target holds focus, for keyboard-flow assertions.
- **The entry helper** — complete login keyboard-first: wait for the autofocus convergence, and
  only then fall back to a bounded Tab walk that re-checks focus before EVERY press and wraps
  within its bound. Never an unbounded loop; never a click where the flow claims keyboard.
- **The phase driver** — compose a journey as ordered phases passed directly as anonymous
  callbacks: journey phases and fixture phases alternate, each phase's class declared by position.

Extend the layer only in its setup file.

## Assertion law

- Inside a journey body, assert perception: the text an operator reads, the state a control shows,
  the focus a keyboard user holds. Class, attribute, and DOM-state assertions stay in the transport
  class and the component tests, where `.claude/rules/tests.md` directs them.
- Every asynchronous observation gets a convergence wait with a bound. A bare read of async state
  is a race admitted into the suite.
- A wait's predicate must be able to go false-to-true AFTER the action it observes. A predicate
  already true when the wait starts binds nothing.
- Name the property, not the intermediate. Assert the state the flow must reach, never the
  transient path taken to it — a criterion that bans a harmless transient over-refuses and breaks
  on the next honest implementation.
- Trusted input only: journeys type the values a person would, never adversarial payloads — attack
  input belongs to the transport class and the parser suites.

## Drive captures through journeys

Where `orkestrel-polish-surface` drives a capture, the journey instruments are the entry path:
arrive, act, converge, then capture.

- Capture every terminal state the claim names, not only the happy path: the failure states are
  the captures a reviewer needs most.
- When a capture and a green suite disagree, the capture is the evidence and the fixture is the
  defect.

## Review gate

Reviewing a journey test, refuse it when:

- any instrument inside the journey body is not journey-class;
- a selector, test id, or DOM traversal substitutes for role-and-name resolution;
- an assertion names implementation instead of perception;
- an async observation has no bounded convergence wait, or its predicate cannot bind.

Return the verdict in the shape the dispatched skill fixes: `orkestrel-polish-surface` for a
capture round, `orkestrel-falsify` for an audit round.
