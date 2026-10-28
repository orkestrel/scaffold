# The release wave

Close a fleet-wide goal of every package on registry-served versions as a release wave in layer
order: visit every
repository once per round with one procedure, publish each layer in one window, and only then
prepare the next.

## Visit a repository

`scripts/wave.ts --visit` runs these steps in this order and stops at the first one that fails; a
step that reads generated or installed state is invalid before the step that writes it. Run a step
by hand only to repair it, then resume with `--from <step>`. Read a failed step's journal, which
its row names under the target's `tmp/units/wave/`, before running the step again. Journals and
overwrite receipts are written only where the work tree ignores `tmp/`.

1. Re-pin every range the audit's release readings name to the caret of its returned release,
   and install before the overwrite. Read the audit population as the declared `@orkestrel`
   dependencies in `dependencies` and `devDependencies`, plus declared foreign tools that the
   blueprint plans in those sections; exclude the fixed showcase tool pair from ordinary release lookups.
   Look up fleet releases with `*`; look up foreign tools with
   a caret over the declared major when one can be extracted, otherwise with the declared range.
   Do not treat a declared minor or patch bound as the lookup bound. Peer-only dependencies produce no release reading;
   rewrite a peer range only when its name shares an audited release reading. For example, with
   peer-only `@orkestrel/peer-only: ^0.0.1`, leave that peer unchanged; with a planned tool whose
   registry serves `8.3.4`, apply `vite: ~8.2.0 -> ^8.3.4` even though the tilde excludes `8.3.4`.
2. Commit the manifest and the lockfile as the preparation commit. `scaffold overwrite` refuses a
   tree carrying uncommitted changes, and the install left both dirty.
3. Run `scaffold overwrite`. One run repairs the `AGENTS.md` pointer and the skill pointer set and
   deletes every tracked copy the target still holds at an instruction-canon path, a `CLAUDE.md`
   included; the plan ships no `CLAUDE.md`. Prove the sweep with a
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
4. Force-verify the same audit population and lookup bounds against a registry sweep taken after
   the previous layer published. Do not infer verification of peer-only declarations from that audit.
5. Run the full install. The overwrite re-declares the toolchain ranges and declares each planned
   dependency the manifest lacks, so the lockfile the first install regenerated no longer matches the
   manifest.
6. Sweep the self-pins, per § Sweep the self-pins: the re-pin moves the snapshot class.
7. Run the mutating `format` script to converge generated writes.
8. Commit the overwrite's writes as `Overwrite with scaffold <version>`: every path the overwrite
   wrote or removed, and the manifest and lockfile the install converged. The step refuses a dirty
   path the overwrite did not write and names it. After committing an unrelated path, complete the intended overwrite commit by hand:
   inspect the receipt's written and removed paths, stage those paths and the converged manifest
   and lockfile, and commit them as `Overwrite with scaffold <version>`. Then resume with `--from gates`.
   Treat the receipt as stale after any intervening commit; never use that receipt to authorize
   another `record` commit. Skip this step for an offline overwrite and the `@orkestrel/scaffold` package.
9. Run the quality gates.
10. Run `node .agents/skills/orkestrel-publish/scripts/compare.ts` to compare the rebuilt `dist/`
    against the published tarball for material content. An exit of 2 is an unanswered comparison,
    never a moved dist: fetch and re-run rather than ruling a bump owed.

Restore every pin the target holds with `scripts/swap.ts --restore` before the visit's first step, per
[release.md](release.md) § Fix a dependency before it publishes, because the visit reads and
proves registry ranges. A distribution proof run against a local tarball proves the local tarball.
Where a `scaffold` verb must run against a target that works on local builds, run it in this order:

1. Restore the pins with `scripts/swap.ts --restore --consumer <target>`.
2. Stage the unpublished scaffold tarball with `npm install --no-save`, which leaves the
   manifest's registry range in place. The blueprint refuses an `@orkestrel` `file:` spec under
   `dependencies`, so `--no-save` is the staging route a verb admits.
3. Run the verb.
4. Re-pin with the arguments the restore receipt's `repin` member lists, then run
   `scripts/swap.ts --status --consumer <target>` and clear any drift it reports before the gates.

Where a visit runs before scaffold itself publishes, run the visit with `--offline`; the runner
performs the offline overwrite and proves the sweep with `scaffold audit --offline`. The online verbs read vendored bytes from the published
package, so an unpublished scaffold's visit otherwise writes the registry's older floor, and an
online audit reports the floor-restored files as stale until the release. The `--offline` overwrite
skips the catalog step and exits `1` with a note naming that refusal, so run the full
`scaffold overwrite` after the release.

When the target is the `@orkestrel/scaffold` package, expect the runner to record the overwrite step
as skipped and to read the verify audit's foreign-path findings as expected; never run the `scaffold repair` or `scaffold overwrite` command
against that checkout.

Run visits in parallel slices of disjoint repositories, each slice strictly serial inside itself,
reporting per target. Refuse a failed target, name it, repair it, and re-run it alone.

### Regenerate a lock the install cannot move

When the install in step 1 or step 5 fails with `ERESOLVE`, read its conflict and rerun command.
An exact-peer cluster, such as `vitest` with `@vitest/browser-playwright`, can prevent npm from
moving the lockfile in place. Without the flag, the step deletes nothing.

- Pass `--regenerate` only when the user's instruction for the visit names it: the regeneration is a
  destructive command under `.agents/orchestration.md` § Permission floor. A unit whose brief does
  not name it, or whose sandbox refused a deletion, stops at the refusal and reports it.
- With the flag, refuse before moving anything when `node_modules` is a link, the lockfile is
  untracked or carries uncommitted changes, the manifest names a local dependency spec or declares
  `workspaces`, `tmp/` is not git-ignored, or the target is not the root of its work tree.
- Validate the backup and journal paths' ancestry and physical containment before writing or moving,
  and revalidate before cleanup. Refuse a linked ancestor while permitting ignored scratch beneath a real target.
- Otherwise copy the lockfile and move `node_modules` under `tmp/units/wave/<stamp>/`, delete the
  lockfile, install from the manifest, and prove the result: the install exits `0`, the lockfile
  exists, `npm ls --all` exits `0`, and the manifest bytes are unchanged. Read each package named
  by the conflict with its installed version in the step's note. A proved result deletes the moved
  tree; a failed result restores the copied lockfile and moved tree and names why the step failed.
  Confirm a recoverable tree and lock backup before deleting the active tree. Attempt rollback at
  most once. If rollback fails, retain both backup paths for recovery. If completion journaling or
  backup cleanup fails, report that failure and retain the restored or proved installation.
- Resume a visit that stopped at the refusal with `--regenerate --from <step>`.

## Rule on the bump

Bump on either trigger: `scripts/compare.ts` exits 3 (the rebuilt dist differs materially from the
published tarball), or the final runtime dependency set differs from the published packument.

- Test the final dependency set against the packument, never "did my step move a pin". The
  `declare` step inside `scaffold overwrite` re-pins before any later check, so the step-local
  reading reports nothing moved while the manifest surface did.
- Treat a re-pinned runtime range as published surface. Without the bump a consumer installs
  duplicate copies of the moved dependency.
- Compare material content only, as `release.md` § What a bump obliges defines it,
  and take the blast radius of a bump from that section rather than deciding it here.
- Ship a dist built before the version bump wherever the bump edits no emitted byte. Check that
  per package rather than assuming it: a package that imports its own `package.json` version into
  published code emits that version, so its pre-bump dist is stale the moment the version moves.
  Rebuild after the bump there and pack from the rebuilt tree. The `npm publish --ignore-scripts`
  command skips `prepack`, so that rebuild is the operator's step rather than the publish's. The
  same holds for a package that writes its declared ranges into published output: its `dist/`
  moves on a development re-pin, and `release.md` § What a bump obliges rules that
  re-pin a release.

One trigger orders rather than bumps. A package the fleet consumes as a development dependency,
whose consumers' gates read its unpublished tip, publishes on its own account ahead of the layer
order and again at its own slot after its runtime ranges move: each consumer's visit installs the
registry copy over any staged tip, so every consumer stays red until that tip is on the registry.

## Prepare a layer

- When the manifest's `engines.node` names a floor below the `DEFAULT_ENGINES` a generated workspace declares, raise it to that floor.
- When a package still carries `.github/workflows/ci.yml`, delete it in that visit; the ecosystem runs no hosted CI.
- Before the release, rule the package's guide and source comments against `.claude/rules/writing.md` § Substitutions and reword each hit its rows name; identifiers stay.
- Compare release packs between hosts by paths, sizes, and content hashes, and report executable-mode differences separately (`.agents/platforms/windows.md` § Release packs and terminals).

An unpublished package's first version is `0.0.1`. Do not bump it before that first publish.

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
   Run the visit and this script on a Node whose bundled npm meets the `MINIMUM_NPM_VERSION` floor a
   generated workspace declares in `devEngines`: the scripts spawn the npm CLI beside the running
   Node binary when one is there, so a `PATH` change reaches them only where none is.
5. **Write the release commit and push before the window opens.** The preparation commit inside
   the visit is a different commit at a different moment.

Where an inventory taken before the round already ruled every dist moved, apply the bump before
the visit, pass the replaced version through `--prior` so the self-pin sweep finds it, and complete
the remaining steps of this section after the visit, whose comparison confirms the ruling.

Prepare the next layer only after this one is on the registry. A dependent's new pin cannot
install until the version it names exists, so preparation and publication interleave and cannot be
batched ahead.

The window is for uploads. Every gate, build, install, and commit happens outside it; publish with
`--ignore-scripts` so the gate chain does not run a second time on the proved artifact.

## Sweep the self-pins

A package's own version appears in its source and its tests as a literal, and a bump falsifies
every one of them. A snapshot of generated output carries the ranges the package writes rather than
its own version, and any re-pin, a development one included, falsifies it. Run this sweep after the
re-pin install, not after the manifest edit.

- Run `node .agents/skills/orkestrel-publish/scripts/pins.ts --version <prior> --range <prior range> ...`
  with the prior version and the prior range of every re-pinned dependency, rule on every hit, and
  move every generated-manifest snapshot hit with its re-pin.
  A canned packument in a fixture and a looked-up version in a CLI suite carry the version with no
  tripwire comment beside them, and a generated-manifest fixture carries the ranges and never the
  package's own version, so one run names both classes.
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

- After a window confirms a release, poll its tarball URL, read with
  `npm view NAME@VERSION dist.tarball`, until it answers `200` before an install names that
  version. The registry lists a version in the packument minutes before it serves the tarball, and
  an install in that gap fails `E404`.
- Run every visit and install that follows a publish with `npm_config_prefer_online=true`. A
  cached packument answers `notarget` for a version the registry already serves.
