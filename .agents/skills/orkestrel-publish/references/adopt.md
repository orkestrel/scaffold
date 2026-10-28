# Adopt a published scaffold release in one consumer

This file governs one consumer taking a published `@orkestrel/scaffold` release outside a release wave. [wave.md](wave.md) § Visit a repository owns the visit a wave runs; [release.md](release.md) § The scaffold surface owns what a vendored-only release obliges.

Every verb and flag below is in `guides/scaffold.md` § Command line. `audit` writes nothing; `repair` writes each planned path the target is missing or has let drift, and reconciles the declared `@orkestrel/*` ranges and the script region on every run, whatever `--groups` names.

## Steps

1. **Restore pins.** Restore every tarball pin the consumer holds with `scripts/swap.ts --restore`, per [release.md](release.md) § Fix a dependency before it publishes, so the adoption reads registry ranges.
2. **Re-pin.** Read the registry's `@orkestrel/scaffold` version, set the consumer's range to the caret of that release, and commit nothing yet.
3. **Install against the registry.** Run `npm install` with `npm_config_prefer_online=true`, per [wave.md](wave.md) § Refresh the registry between layers. A cached packument answers `notarget` for a version the registry already serves.
4. **Read the drift.** Run `scaffold audit` from the consumer, and add `--groups <list>` to scope it to the groups the consumer takes. Read its questions and findings before writing.
5. **Repair.** Run `scaffold repair --groups <list>` over the groups the consumer takes, named per `guides/scaffold.md` § Groups. Omit `--offline`: it writes the distributed floors, not the registry's.
6. **Restore held ranges.** `repair` rewrites the declared `@orkestrel/*` ranges and the showcase pair on every run (`guides/scaffold.md` § Dependency floors), so diff the manifest against `HEAD` and put back every range the consumer holds on purpose. The consumer's plan or ledger names each hold.
7. **Reinstall.** Run the install of step 3 again; the restored manifest no longer matches the lockfile the first install wrote.
8. **Run the gates.** Run the gate chain the consumer's manifest declares. `scaffold audit` exits `0` when the target matches its plan, `1` on drift, and `2` on a usage error. A drift a held range causes is expected; name it.
9. **Rebuild committed artifacts.** Rebuild every artifact the consumer's plan names as committed (a generated registry, a snapshot, a mirror) with the consumer's own script, and read the diff.
10. **Commit** by explicit paths, with the scaffold version in the message. A push to the remote waits for the user's go-ahead.

## Refuse

- Never run `repair` against the `@orkestrel/scaffold` checkout; the verb refuses it with the `TARGET` code.
- Never edit a vendored file in the consumer to quiet `audit`; change it in the scaffold repository and release, per [release.md](release.md) § The scaffold surface.
