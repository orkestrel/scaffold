# The release wave

Close a fleet-wide goal of every package on registry-served versions as a release wave in layer
order: visit every
repository once per round with one procedure, publish each layer in one window, and only then
prepare the next.

## Visit a repository

Run the visit in this order. A step that reads generated or installed state is invalid before the
step that writes it.

1. Re-pin every `@orkestrel` range to the registry caret (peer ranges included) and install, so
   the overwrite runs the current vendored host.
2. Commit the manifest and the lockfile as the preparation commit. `scaffold overwrite` refuses a
   tree carrying uncommitted changes, and the install left both dirty.
3. Run `scaffold overwrite`. One run repairs the `AGENTS.md` and `CLAUDE.md` pointers and deletes
   every tracked copy the target still holds at an instruction-canon path. Prove the sweep with a
   second `scaffold audit` that exits `0`.
   - Where the target's `.claude/agents/orkestrel.md` carries a body outside the marker-bounded
     table that differs from the floor copy the installed scaffold stages, delete the file and
     commit the deletion before the run. `repair` restores the floor body and `catalog` refills the
     table, so one visit leaves the current file and the committed deletion keeps the
     uncommitted-work refusal from firing. Presence ownership never replaces present bytes and the
     table rewrite touches only the marker-bounded region, which is why the deletion is the
     migration.
   - The deletion draws on what git tracks, so an untracked copy survives it, and the verb refuses
     the whole run as uncommitted work while an unignored one stands. Commit that copy or delete it
     by hand before re-running. `--dirty` clears the refusal and leaves the copy standing, and a
     kept `.claude/rules` copy then reddens the target's own policy sweep: the pointer `AGENTS.md`
     carries no rule map, so the copy has no row there and the sweep reports it. Delete the copy
     rather than waiving past it.
   - A copy the target git-ignores stays a `foreign` finding, so that target never reaches exit `0`
     again. Keep a local MCP server registration outside the repository rather than at `.mcp.json`.
4. Force-verify every `@orkestrel` range against a registry sweep taken after the previous layer
   published.
5. Run the full install. The overwrite re-declares the toolchain ranges, so the lockfile the first
   install regenerated no longer matches the manifest.
6. Sweep the self-pins, per § Sweep the self-pins: the re-pin moves the snapshot class.
7. Run the mutating `format` script to converge generated writes.
8. Run the quality gates.
9. Fetch the published tarball, then compare the rebuilt `dist/` against it for material content.
   An absent baseline is an unanswered comparison, never a moved dist: fetch and re-run rather than
   ruling a bump owed.

Restore any unpublished tarball the target is holding before the quality gates run, per
`.agents/orchestration.md` § Fixing a dependency before it publishes. A distribution proof run
against a local tarball proves the local tarball. Stage an unpublished tarball with
`npm install --no-save`, because a `file:` pin refuses the blueprint and the manifest keeps a
registry range.

Where a visit runs before scaffold itself publishes, run `scaffold overwrite --offline` and prove
the sweep with `scaffold audit --offline`. The online verbs read vendored bytes from the published
package, so an unpublished scaffold's visit otherwise writes the registry's older floor, and an
online audit reports the floor-restored files as stale until the release. The `--offline` overwrite
skips the catalog step and exits `1` with a note naming that refusal, so run the full
`scaffold overwrite` after the release.

Run visits in parallel slices of disjoint repositories, each slice strictly serial inside itself,
reporting per target. Refuse a failed target, name it, repair it, and re-run it alone.

## Rule on the bump

Bump on either trigger: the rebuilt dist differs materially from the published tarball, or the
final runtime dependency set differs from the published packument.

- Test the final dependency set against the packument, never "did my step move a pin". The
  `declare` step inside `scaffold overwrite` re-pins before any later check, so the step-local
  reading reports nothing moved while the manifest surface did.
- Treat a re-pinned runtime range as published surface. Without the bump a consumer installs
  duplicate copies of the moved dependency.
- Compare material content only, as `.agents/orchestration.md` § What a bump obliges defines it,
  and take the blast radius of a bump from that section rather than deciding it here.
- Ship a dist built before the version bump wherever the bump edits no emitted byte. Check that
  per package rather than assuming it: a package that imports its own `package.json` version into
  published code emits that version, so its pre-bump dist is stale the moment the version moves.
  Rebuild after the bump there and pack from the rebuilt tree. The `npm publish --ignore-scripts`
  command skips `prepack`, so that rebuild is the operator's step rather than the publish's. The
  same holds for a package that writes its declared ranges into published output: its `dist/`
  moves on a development re-pin, and `.agents/orchestration.md` § What a bump obliges rules that
  re-pin a release.

One trigger orders rather than bumps. A package the fleet consumes as a development dependency,
whose consumers' gates read its unpublished tip, publishes on its own account ahead of the layer
order and again at its own slot after its runtime ranges move: each consumer's visit installs the
registry copy over any staged tip, so every consumer stays red until that tip is on the registry.

## Prepare a layer

An unpublished package's first version is `0.0.1`. Do not bump it before that first publish. The
registry has nothing to serve, so there is no version to move away from, and bumping produces a
package whose history starts at a number nothing explains.

Prepare a published package's layer in this order, after the visit has ruled the package's bump:

1. **Bump from what the registry serves, not from the local manifest.** A repository's `version`
   field can sit a release behind what was published from another checkout, and bumping that
   produces a version the registry already holds, which fails on upload after the whole gate chain
   has run. Read the registry first.
2. **Re-pin every `@orkestrel` range to what the registry serves, and install.** The visit's
   preparation commit already precedes the overwrite; this install regenerates the lockfile for the
   bumped manifest.
3. **Sweep the self-pins**, per the following section: the bump moves the version class.
4. **Run each package's own `prepublishOnly` script to green.**
5. **Write the release commit and push before the window opens.** The preparation commit inside
   the visit is a different commit at a different moment.

Where an inventory taken before the round already ruled every dist moved, the bump rides the
visit's first step and these steps fold into the visit, whose comparison then confirms the ruling.

Prepare the next layer only after this one is on the registry. A dependent's new pin cannot
install until the version it names exists, so preparation and publication interleave and cannot be
batched ahead.

The window is for uploads. Every gate, build, install, and commit happens outside it, which is
what makes `--ignore-scripts` the right flag at publish time: the artifact was already proved, and
the flag is what stops the gate chain running a second time inside the five minutes.

## Sweep the self-pins

A package's own version appears in its source and its tests as a literal, and a bump falsifies
every one of them. A snapshot of generated output carries the ranges the package writes rather than
its own version, and any re-pin, a development one included, falsifies it. Run this sweep after the
re-pin install, not after the manifest edit.

- Search `tests/` and `src/` in the publishing package for the prior version literal, and rule on
  every hit. A canned packument in a fixture and a looked-up version in a CLI suite carry the
  version with no tripwire comment beside them, so they surface as a red gate after the bump
  rather than as a planned edit before it.
- Search `tests/` for the prior range of every re-pinned dependency, and move each snapshot the
  search hits with the re-pin. A generated-manifest fixture never carries the package's own prior
  version, so the version sweep cannot reach it.
- Move a documented tripwire — a golden digest over generated output — in the same change as the
  version bump. That is what the tripwire is for.
- Re-take a generated artifact's digest after the install, because the generated bytes can derive
  from the installed tree rather than from the manifest. An install that picks up a newly
  published dependency moves such a digest with no manifest edit at all, and reverting the
  manifest pin does not restore it.
- Prove the cause of a moved digest before recording it. Patch the generated bytes back to the
  prior content and reproduce the prior digest: a digest that stays moved after the pin is
  reverted has a cause the pin does not explain, and a new digest recorded without that control is
  a value nobody can check.

## Refresh the registry between layers

Refresh the registry evidence between layers and derive each round's pins from it. A pin can only
name a version the registry already serves, so a dependency shipping in the same window keeps the
resolvable previous pin and takes its development-only re-pin after the window closes. That re-pin
takes the self-pin sweep too, because the snapshot class moves with no bump.
