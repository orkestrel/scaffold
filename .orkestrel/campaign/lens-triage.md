# Lens findings, triaged

One audit lens per seam ran over `@orkestrel/process` and `@orkestrel/scaffold`, and every finding
was then paired with an independent skeptic told to refute it and default to refuted when uncertain.
What follows survived that attack. Each row names its carrier.

## Blocks publication

**`scaffold` — the lockfile cannot satisfy the manifest.** `package.json` declares
`@orkestrel/console` at `^0.0.9`; `package-lock.json` records `^0.0.8` at the root and pins `0.0.8`.
Every package here is `0.0.x`, where a caret admits exactly one release, so `^0.0.8` can never
satisfy `^0.0.9` and `npm ci` cannot resolve the tree. Read from the two committed files:

```text
manifest declares:          ^0.0.9
lockfile root records:      ^0.0.8
lockfile installed version: 0.0.8
```

Carrier: the Orchestrator, after `SFIX-A` releases the tree. `npm install` regenerates the lock,
then the unsaved `@orkestrel/process` 0.0.4 tarball is reinstalled over it, because `npm install`
drops a `--no-save` install.

**`scaffold` — `guides/scaffold.md` claims the guides gate resolves every backticked name.** It
checks Surface-table rows and fence import names, and nothing else. Same class as the claim mcp just
narrowed. Carrier: a successor guide-truth unit.

**`scaffold` — `guides/scaffold.md` says "the tests" where vendored test files are content-owned.**
`tests/policy.test.ts`, `tests/setupPolicy.ts`, and `tests/config.test.ts` are rewritten by `repair`
on drift, so a reader who hand-edits them loses the edit. Carrier: the same successor unit.

## Should fix

`scaffold`, carried by a successor unit unless noted:

- `package.json` — the published description states a count of a growable set. The ban is violated
  in the manifest that ships.
- `guides/README.md` — the runtime-dependency list names `@orkestrel/terminal`, which is not a
  dependency, and omits `@orkestrel/process`, which is. It also assigns `@orkestrel/markdown` to the
  library faces, where nothing imports it; only the executable reaches it.
- `guides/scaffold.md` — the restore row promises a write creates an absent birth-owned file, but
  only `materialize` into a vacant target does; `repair` reports a deleted birth-owned path as
  aligned and leaves it deleted. The advisory row states one branch as the whole rule. The
  `ScaffoldErrorCode` narrowing example omits `DESTROYED`, which every entity throws and the guide's
  own method tables promise. The cycle diagnostic is unsound, because `catalogToLayers` also omits a
  row whose registry lookup failed, so an absent name is as often a failed lookup as a cycle member.
- `tests/src/core/constants.test.ts` — the assertion comparing `BASE_DEV_DEPENDENCIES` against
  scaffold's own manifest skips every non-`@orkestrel` key, so a toolchain range scaffold hands to a
  generated workspace can diverge from its own. It already has: `constants.ts` declares `oxfmt` at
  `^0.62.0` while `package.json` carries `^0.64.0`.
- `tests/guides.test.ts` — the guides project proves name resolution only. No assertion evaluates a
  fence or checks the value its trailing comment claims.
- `src/bin/CLI.ts` — **already closed.** The lens found `@orkestrel/process` absent from
  `node_modules`; the Orchestrator installed the packed 0.0.4 tarball and the tree typechecks.

`process`, carried by a successor unit unless noted:

- `package.json` — **carried by `PFIX`.** Placeholder description, empty keywords.
- `guides/process.md` — the guide states the `destroy` barrier settles before the `protocol` refusal
  throws. The refusal is synchronous and the barrier settles strictly after it. A live probe with a
  manager option getter calling `destroy()` mid-construction proved the order reversed.
- `guides/process.md` — the guide calls `ProcessChild` host-independent. It is Node-only and ships
  from `@orkestrel/process/server`; its own signature carries `kill(signal: NodeJS.Signals)`.
- `tests/guides.test.ts` — the neighbouring-face row derives its expected value the same way it
  derives the asserted value, so it can never catch the leak it names. The abort-listener row never
  adds a listener before aborting, so it cannot prove removal. The `EXAMPLES` comment claims a
  membership guard the file does not have. **The last is carried by `PFIX`.**

## Record only

- `process` — the parity gate flattens both published faces into one scope, so no assertion binds a
  documented name to the face that publishes it. Proved by moving a symbol between faces guide-side
  and source-side; the gate stayed green both times. No row is currently misattributed, so it is a
  latent hole rather than live drift.
- `process` — `terminationValid` is assigned only inside a `win32` branch, so it is tautologically
  true on the host these gates run on.
- `process` — `killTree`'s describe block executes nothing on a POSIX host, and a probe reached its
  POSIX settle path directly, contradicting the skip's stated rationale.
- `process` — a test named and filed under `validateCommand` never calls it; it exercises
  `validateWorkspace` only.

## Refuted, and dropped on the record

- `process` `README.md` — asks for a documentation addition rather than naming a defect.
- `scaffold` `package.json` version headline — the corroboration does not reproduce against the real
  registry state.
- `scaffold` `README.md` link — the target is excluded from the packed tarball by design.
- `scaffold` `tests/guides.test.ts` bijection — measurements reproduced, and the claimed vectors
  break on diagnosis grounds.
- `scaffold` `guides/scaffold.md` test-file list — asks for an editorial addition; the section is
  not contracted to enumerate every test file.
- `scaffold` `tests/src/server/helpers.test.ts` — `stageHost` verifies its own manifest read-back
  before returning, so the missing-manifest half does not hold.
