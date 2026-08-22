# Design brief: the two scaffold rows the 0.0.49 wave produced

## Objective

Rule on two defects the fleet propagation measured, and design their fixes. Both are in
`@orkestrel/scaffold` at 0.0.49 and both are recorded as rows in `ROADMAP.md`. Propose the
contract (types-first), the mechanism, the per-verb consequences, and a unit decomposition.

## Row 1 — a writing verb raises `peerDependencies` to the current floors

Measured 2026-08-22 during the 0.0.49 propagation:

- `scaffold repair` moved probe's `vitest` peer from `^4.1.0` to `^4.1.11`, its `typescript`
  peer from `^6.0.0` to `^6.0.3`, and its `oxlint` peer from `^1.77.0` to `^1.79.0`.
- `^4.1.11` is unsatisfiable for a consumer holding `@vitest/browser-playwright`, whose own
  peer pins `vitest` at `4.1.10` exactly. probe's packed artifact then refused to install:
  `npm error code ERESOLVE ... peerOptional vitest@"^4.1.11" from @orkestrel/probe`.
- probe's `tests/distribution.test.ts` caught it. `@orkestrel/test` has no such gate, so the
  same shape shipped in its 0.0.9 and 0.0.10 releases; installing published 0.0.10 beside
  `@vitest/browser-playwright@4.1.10` fails `ERESOLVE`. Both packages were corrected by hand
  to permissive minimums and republished (test 0.0.11, probe 0.0.3).

The question to rule on: **which declaration classes may a floor raise?** A runtime
`dependencies` range and a `peerDependencies` range answer different questions. A runtime range
says which version this package will be built and tested against; a peer range says which
versions a consumer may already hold and still satisfy this package. Raising the second to the
newest floor narrows a consumer's freedom for no gain, and it can make the artifact
uninstallable.

Consider, and rule on each:

- Whether scaffold should stop writing `peerDependencies` at all, treating a declared peer as
  caller-owned data that passes through unchanged. Note that `guides/scaffold.md` has claimed
  peers pass through unchanged; verify whether that claim is true of the landed code and say so.
- Whether a peer range should instead be derived as a floor's MAJOR line rather than its full
  triple, so a floor raise inside a major never narrows a consumer.
- What a target that has never declared a peer should receive when a blueprint names one.
- Whether `devDependencies` and `dependencies` keep the full-triple floor they have today, and
  why that is right for them and wrong for peers.
- What the guide must say, and whether a gate can catch a narrowed peer before it publishes.

## Row 2 — a writing verb refuses before it selects a group

Measured 2026-08-22 against supervisor, which declares Vitest projects the planned
configuration does not register — `app:browser:integration`, `guides`, and eight `service:*`
projects:

- `scaffold repair` refuses with `TARGET: The manifest at . names Vitest projects the planned
  configuration does not register: ...`.
- `scaffold repair --groups orchestration,docs` refuses **identically**, even though neither of
  those groups writes `vite.config.ts`, which is the file the conflict is about.
- The precondition therefore locks such a target out of every vendored change, and supervisor
  took the 0.0.49 orchestration and docs bytes by hand instead, verified aligned by a re-audit.

The question to rule on: **where does that precondition belong?** Consider, and rule on each:

- Whether the check belongs after group selection, so a run that writes nothing the conflict
  touches proceeds.
- Whether a target's own Vitest projects belong in the plan, so the conflict stops existing.
- What `audit` should report for such a target, given `audit` already works there today and
  reports the drift honestly.
- Whether the refusal's message should name the groups it actually blocks rather than the whole
  run.
- Whether any other precondition in the writing path has the same shape — a whole-run refusal
  for a conflict that is scoped to one group. Sweep for that and report what you find.

## Constraints

- `*/types.ts` first. Single-word entity APIs. Options grouped. Absence is `undefined`.
- No new npm packages.
- This lands in a scaffold release, so state what the release note must say and which vendored
  files move.
- The repository is at `C:/Users/mikes/WebstormProjects/scaffold`, committed and clean.
  Read the landed source yourself; verify every claim in this brief that you build a ruling on,
  and say plainly if one of them is wrong.

## Output

A design report: a ruling per question with the reasoning that decides it, stated as option,
cost, recommendation; the proposed type and signature changes verbatim; a unit decomposition
with owned files and independently checkable acceptance criteria; and the risks. No process
diary.
