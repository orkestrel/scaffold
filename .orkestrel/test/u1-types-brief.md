# Unit U1 — types-first contract for createTeardown and createLoopback

Role: `implementer`. Engine: Opus 5, native, sole serial writer in `/home/user/test` from
the committed baseline (0.0.3, clean tree). Perform the assignment directly and spawn
nothing. Commit nothing.

## Authority

`/home/user/test/AGENTS.md` and its rules (names, typescript, architecture, patterns,
documentation); the guide `/home/user/test/guides/test.md` — read its Contract and Limits
sections and the existing type files first; match their voice exactly.

## Objective

Add the reconciled type contracts for the two shipping capabilities to the two types
files. Types only — no factories, no barrel changes, no tests, no guide edits (later
units own those).

## The contracts (substance fixed; TSDoc voice yours, conforming to the file's style)

In `src/core/types.ts`:

- `TeardownHandler`: `() => void | Promise<void>` — the work one teardown entry performs
  when the list is destroyed.
- `TeardownInterface`: readonly `count: number` (how many handlers are registered);
  `add(handler: TeardownHandler): void`; `destroy(): Promise<void>`. The destroy TSDoc
  states: runs every registered handler in reverse registration order, awaiting each in
  turn, and empties the list; every handler runs even when an earlier one throws or
  rejects; a handler registered during the run is kept for the next one; idempotent;
  when exactly one handler failed its thrown value is rethrown by identity, and when
  several failed an `AggregateError` carries them in run order.

In `src/server/types.ts`:

- `LoopbackInterface`: readonly `url: string` (the origin the server answers on, no
  trailing slash); readonly `port: number` (the ephemeral port the host assigned);
  `destroy(): Promise<void>` — drops every live connection, stops listening, releases
  the port; idempotent.

No `@orkestrel/*` type may appear in any signature. Node built-in types are permitted in
the server file only if its existing style does so — check first; the factory (a later
unit) takes a `node:net` `Server`, but that parameter type lives with the factory
declaration if the file's convention puts factory signatures in types.ts — follow the
file's existing convention for where factory signatures live, and if factories are
declared in types.ts, declare `createTeardown(): TeardownInterface` and
`createLoopback(server: Server): Promise<LoopbackInterface>` in the same style with the
`Server` type imported the way the file imports host types.

## Scope

Owned: `src/core/types.ts`, `src/server/types.ts`. Off-limits: everything else. No
installs, no commits, no tree-wide mutating gates.

## Deviation contract

A convention you cannot satisfy from the owned files (a factory-signature home that
requires a barrel edit, a naming collision) stops the unit with expected/found. TSDoc
wording and declaration placement within the files are yours.

## Validation

`npm run check` from `/home/user/test` (read-only gate) — green with the new types
present.

## Output

The exact diff of the two files, the check result, and any deviation. Nothing else.
