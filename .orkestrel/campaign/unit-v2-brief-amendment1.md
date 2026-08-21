# Unit V2 — Amendment 1, 2026-08-21

Supersedes the Scope and adds work items. The original brief stands otherwise. Your prior
run's edits are in the working tree as standing state — continue from them, do not redo
them. The deviation you reported is resolved as follows.

## Scope additions

- Owned, added: `tests/src/bin/main.test.ts`, and — only if the bin entry exposes no way to
  point the verbs at a fixture registry — the minimal registry-override seam in
  `src/bin/main.ts` plus its option row in `src/bin/types.ts`. A verb that reads the
  registry must be pointable at a loopback fixture (and at a private registry), so the seam
  is part of the ruled design, not test plumbing: route it to the existing
  `UpstreamOptions.base` and document it per the TSDoc rules.
- Owned, added (amendment 2's floor deltas — read
  `.orkestrel/campaign/design-versions-brief-amendment2.md`): `package.json`,
  `src/core/constants.ts`.

## Added work items (the user's floor ruling)

1. **Full-triple floors.** Revert the bare-`^MAJOR` foreign rows in `package.json` and the
   bare-major seeds in `src/core/constants.ts` to caret-over-full-triple at the
   latest-KNOWN version. The sandbox denies the registry, so latest-known is what the
   lockfile resolves today — `typescript ^6.0.3`, `vite ^8.2.2`, `oxfmt ^0.64.0`, and so
   on for every foreign row; seeds return to their prior full triples (`vue ^3.5.40`,
   `vue-tsc ^3.3.7`, `@vitejs/plugin-vue ^6.0.8`, `vite-plugin-singlefile ^2.3.3`). The
   Orchestrator raises the floors against the live registry on the host afterwards.
2. **The verbs raise foreign floors.** The resolved set `repair` and `overwrite` write
   gains the foreign rows — newest-under-declared-major as a full-triple caret — beside the
   exact fleet pins. `audit` names a foreign row whose registry-newest under the major
   exceeds the declared triple (the floor-staleness advisory, non-blocking) beside the
   existing crossed-major advisory. A major is never auto-crossed.
3. **The entry test** drives the fixture registry through the seam, covering: a fleet row
   raised to `^latest`, a foreign row's floor raised within its major, a crossed major
   reported and not rewritten, and the offline `FETCH` outcome.

## Acceptance criteria

The original criteria stand, with criterion 5 amended: `src:bin` exits 0 WITH
`main.test.ts` included (the seam makes it reachable), and `src:core` is reported as an
observation naming exactly which V3-owned cases red (the floor reverts move the same
mirror/digest set V1 named — nothing else may red).

## Deviation contract

The original stands. Additionally stop if the entry cannot reach `UpstreamOptions.base`
without a design change beyond one option row.
