# Host provenance — where `scaffold overwrite` reads the vendored bytes

Measured 2026-08-22 during the scaffold 0.0.49 wave, on the `contract` target.

## Finding

`scaffold overwrite` writes the vendored host from the **live upstream repository**, not from the
installed package's `dist/host`. The audit reports it: `provenance` is `{"versions":"live","host":"live"}`.

The evidence is a three-way comparison taken on `contract` immediately after its visit:

- The installed CLI is the registry's `@orkestrel/scaffold@0.0.49`, asserted from
  `node_modules/@orkestrel/scaffold/package.json`, and `npx` resolves
  `node_modules/@orkestrel/scaffold/dist/bin/main.js` — the installed binary, not a global or a link.
- The installed host's storage entry `agents/orchestration.md`, whose manifest destination is
  `.agents/orchestration.md`, carries the pre-amendment line
  `A dist built before the version bump is the release artifact; the bump edits no emitted byte.`
- The file `overwrite` wrote to `contract/.agents/orchestration.md` carries the amended paragraph
  instead, and compares byte-identical to `/home/user/scaffold/.agents/orchestration.md` at commit
  `3ee9c95`, which is `origin/main` and is not in any published tarball.

`readHostFloor` in `src/server/helpers.ts` resolves `dist/host` when it runs from the emitted
module, so the installed floor is the default root. The live host overrides it.

## Operational consequence

Freeze the source repository's `main` for every vendored path while a wave is running. A push to a
vendored path mid-wave gives targets visited afterward different bytes from targets visited before,
and nothing in a target's own gates can detect that split.

The vendored destinations are rooted at `AGENTS.md`, `CLAUDE.md`, `LICENSE`, `.agents`, `.claude`,
`.codex`, `.cursor`, `configs`, `guides/guide.md`, `guides/scaffold.md`, `scripts`, `tests`, and the
repository dotfiles. Nothing under `.orkestrel/` is vendored, so a campaign artifact commits during
a wave without moving what any target receives.

## Carry

The rule this finding states belongs in `.agents/orchestration.md` § The release wave. Landing it
mid-wave would itself re-vendor every target visited afterward, which is the defect the rule
describes. It lands after the wave's last target is pushed, and propagates on the next `scaffold`
release.
