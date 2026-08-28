# Acceptance — the execution consolidation

## Gates

Run by an independent `verifier` on the accepted tree, each bare, each its own command.

| Gate | Exit | Result |
| --- | --- | --- |
| `npm run format:check` | 0 | pass |
| `npm run lint:check` | 0 | pass |
| `npm run check` | 0 | pass |
| `npm run build` | 0 | pass |
| `npm test` | 0 | pass |
| `npm run test:distribution` | 0 | pass, 11 assertions, registry reached |

Per project: `test:src` 5 files, 184 passed, 8 skipped; `test:policy` 111 passed; `test:config` 46
passed; `test:setup` 2 files, 10 passed; `test:guides` 102 passed, 1 skipped.

Against the recorded pre-change baseline of `test:src` 9 files, 172 passed, 8 skipped: the file
count falls because four files folded into one, the passing count rises by the rows the fold and
the fix round added, and the skipped count is unchanged — the same Windows-only `skipIf` rows.

## The exit criterion, and how each capability closed

- Move the three functions into `helpers.ts` — **closed.** `src/server/execution/` does not exist.
- Confirm they are properly named — **closed.** Two blind lanes ruled independently that all three
  names stand, and `guides/process.md` § Vocabulary now records the `detach` ruling durably.
- Move their tests into `tests/src/server/helpers.test.ts` — **closed.** The mirror rule in
  `tests/setupPolicy.ts` made this mandatory rather than tidy, and `npm run test:policy` proves it.
- Report whether the distributable changed — **closed.** Measured against the published tarball;
  the reading is in `distributable-instrument.md`.
- Remove `Retention`, on the owner's ruling — **closed**, with its hardening landed on
  `captureChunk` and `execute`.
- Repair the UTF-8 defect the fold exposed, and the retreat defect that repair exposed —
  **closed**, each with a failing-first proof and a committed regression guard.

## Instruments retained

`retention-equivalence.mjs` — proved the folded accounting equals the class, 33600 comparisons,
three injected-defect controls.
`fix-sim.mjs` — proved the `limit + 1` bound closes the split-sequence defect across 90
limit-and-chunking combinations, with the pre-fix form detected as the control.
`counterexample.mjs` — ran the audit's counterexample against the published artifact and the build.
`sync-probe.mjs` — mapped `executeSync` across every limit from 1 to 11 and refuted the audit's
`executeSync` finding.
`final-probe.mjs` — the acceptance comparison against published 0.0.8 across six vectors.

## Release consequence

A version bump and a publish are owed, and they are owed entirely to the owner's ruling to remove
`Retention`, not to the move. `distributable-instrument.md` separates the two causes with the
measurement behind each.

Not done here: the version in `package.json` is untouched at 0.0.8. Publishing is the owner's
decision and the owner's credential.

## Carried forward, not closed here

- `tests/setupPolicy.ts:191-194` registers `src/server/execution` in `FUNCTION_DOMAIN_FOLDERS`, a
  folder this change deletes. The file is scaffold-vendored, `scaffold repair` restores any edit,
  and the architecture rule states there is no workspace-local registration path. It needs a
  fleet-canon change in `@orkestrel/scaffold`.
- `tests/src/server/helpers.test.ts` carries a pre-existing row reading "signals nothing once the
  host has recorded the native exit", where `once` carries the temporal sense
  `.claude/rules/writing.md` substitutes. Present at `HEAD` before this change.
- A brief-writing defect to carry into the next campaign: unit U1's acceptance criterion named
  `npm run check`, which typechecks `tests/` and so could not pass from inside that unit's owned
  files. `.agents/orchestration.md` § Check the brief before you send it requires reading each
  criterion against the off-limits list; that check was not run. The correct criterion was
  `npm run check:src`.

---

# Release — `@orkestrel/process@0.0.9`, 2026-08-28

## Round

One package, one layer. `@orkestrel/process` sits at L2 in the catalog's layer order.

## Registry evidence, taken before the bump

`@orkestrel/process` served 0.0.8, so the bump read 0.0.9 from the registry rather than from the
local manifest. `@orkestrel/contract` served 0.0.13 and `@orkestrel/emitter` served 0.0.8, both
matching the declared ranges, so no runtime range moved and no re-pin was owed.

## Bump ruling

Bumped. The trigger is the rebuilt dist differing materially from the published tarball:
`Retention` and `RetentionInterface` are removed from the published surface and `captureChunk` is
added, and `execute` no longer returns a captured string ending inside a UTF-8 sequence. The final
runtime dependency set is unchanged against the packument, so that second trigger did not fire.

The self-pin sweep is empty: no source or test carries the prior version as a literal, and
published code emits no version of its own, so the bump edits no emitted byte.

## Preparation, all outside the window

`npm run prepublishOnly` green, which is `format:check`, `lint:check`, `check`, `build`, `test`,
and `test:distribution --mode release`. Under `--mode release` the distribution proof fails rather
than skips on an unreachable registry, so it proved the packed artifact installs and resolves
rather than passing by skipping. Committed and pushed before any approval was minted.

## Approvals

Two, both surfaced to the user before they arrived.

The first `npm login` mint expired on the 45-second abandon before the click landed; the journal
showed the spinner dropping to the legacy `Username:` prompt, which is the expiry signal rather
than a prompt to answer, and `npm whoami` still reported `ENEEDAUTH`. The stale attempt was killed
by process id, enumerated with `ps -eo pid,comm` rather than by a pattern over the command line,
and one fresh flow was minted with the user at the keyboard. Authenticated as `mikesaintsg`.

The upload took the browser authorization at `auth/cli/09e30a6e-…`. One package, so one approval
covered the layer and the five-minute window was never contended. Exactly one publish attempt was
made, so no `authId` was superseded.

## Registry confirmation

Read from the registry rather than from an exit code. The first read served 0.0.8 and the second
served 0.0.9, which is the CDN lag the window reference names.

The published tarball was fetched and unpacked, and `dist/src/{core,server}/index.{js,cjs,d.ts}`
compared byte-identical against the tree that passed the gates. The published manifest declares
`@orkestrel/contract ^0.0.13` and `@orkestrel/emitter ^0.0.8`. The published server face holds 37
exports, with `Retention` absent and `captureChunk` present.

## What this release obliges, and where it goes

`@orkestrel/process` is a runtime dependency of `@orkestrel/lsp`, `@orkestrel/mcp`,
`@orkestrel/scaffold`, and `@orkestrel/sea` at L3, and through them of `@orkestrel/probe` at L4.
Under § What a bump obliges each re-pins, re-runs its gates, bumps, and republishes in layer order.

Those consumers pin `^0.0.8`, and a caret pins one exact release at `0.0.x`, so none of them
resolves 0.0.9 until it re-pins. Nothing is broken by this release standing alone.

The owner ruled that the downstream cascade is handled in a separate session. It is recorded here
rather than started.

## The `FUNCTION_DOMAIN_FOLDERS` entry, revisited

`tests/setupPolicy.ts` still registers `src/server/execution`, a folder this campaign deleted. Two
things were established while trying to close it.

It is inert. Registration makes a path eligible and judges nothing about what a module does, so an
entry naming a path no target holds matches nothing and reports nothing.

Whether removing it is safe could not be established from here. A GitHub code search across the
`orkestrel` organization returned zero hits for the path — and zero for a control query that must
have matched, so the search is blind for this organization and reports on the instrument rather
than on the fleet. The entry therefore stays, and retiring it needs a fleet-wide check of which
targets hold that path, then a scaffold release and a `repair` pass across every target.

Also for that scaffold session: `guides/process.md` in the scaffold checkout is a mirror of this
package's guide and is now stale, still naming the deleted `tests/src/server/execution/*.test.ts`
paths. Refresh the mirror rather than rewriting it.

RELEASE: LANDED
