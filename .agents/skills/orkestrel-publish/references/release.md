# Release laws

The `orkestrel-publish` skill names this file. It carries the fleet release rules that bind an executor who is publishing or preparing a package to publish.

## Publishing is the user's

- Publishing is the user's decision and the user's credential. Prepare, surface the approval, and run the publishes the user asked for. Never substitute an API key, an access token, a copied auth file, or another login flow, and never ask the user to paste a token into the conversation.
- A publish chain is a long-running command: write it as a plan for the `orkestrel-dispatch` skill's `scripts/chain.ts` and launch the chain through that skill's `scripts/launch.ts`; confirm the previous chain is dead by process id before starting another. Publish serially; concurrent publishes collide on the authentication handshake.
- A wave over unpublished tips derives its order per run from the dependency graph and records only the round each package landed in.

## Fix a dependency before it publishes

When a consumer needs a dependency's unpublished source, to meet a defect that lives in a package it only has from the registry or to work on fresh local builds, pin the consumer to a tarball of that source. Do not wait for the release and do not work around it in the consumer.

- Pin with `node .agents/skills/orkestrel-publish/scripts/swap.ts --pin --consumer <consumer> --source <dependency>`, repeating `--source` for each dependency. The script refuses a source whose packed manifest names a local dependency in any dependency field, as npm reads one: a `file:` or `link:` prefix, a spec that starts like a path (`.`, `~/`, `/`, `\`, or a drive letter), or an archive name ending in `.tgz`, `.tar.gz`, or `.tar` that carries no protocol and is not a `user/repo` shorthand. A registry range, a dist-tag, an `npm:` alias, a `user/repo` shorthand, a git spec, and a URL stay remote. The script then builds and packs each source, installs the tarball, and proves the installed bytes. Never link a source instead: a link skips packing, the `files` list, and the exports map.
- Read the ledger `<consumer>/tmp/tarballs/pins.json` as the record of which build the consumer runs. Each row names the tarball and its SHA-256, the range the pin replaced, the source with its commit and dirty flag, the digest of the proved install, and the time; the ledger also records whether the manifest held an `overrides` block before the first pin. The script writes the replaced range before it writes the manifest and keeps the first pin's range across re-pins, so edit neither the ledger nor a pinned spec by hand.
- Keep the absolute `file:` spec the script writes. npm resolves a relative spec against the installed package's own directory, so a packed consumer installed elsewhere, as the `distribution` proof installs it, cannot find a relative tarball.
- Pass `--override <name>` for each pinned package that another installed package also requires. The override is `$<name>` when the consumer declares the package and the tarball spec when it does not. The proof fails a pin that leaves a pinned package, an override-only one included, uninstalled at the top level, that leaves a second copy of a pinned package, or that moves an unpinned `@orkestrel` package; an override that selects no installed dependency is such a failure and exits 1.
- Run `scripts/swap.ts --status --consumer <consumer>` before relying on any gate run against a pinned consumer. Exit 3 names each drift: a manifest entry that no longer names the full location of its ledger tarball (a relative spec that resolves to that location holds it), a missing or changed tarball, installed bytes that differ from the proved pin, a pin with no proved install, or a source whose commit moved. Re-pin to clear it.
- Re-pin whenever the dependency's source moves; a stale tarball is a stale `dist/`. Fetch and merge the dependency's default branch before packing it.
- Delete the consumer's `node_modules/.vite` directory after every tarball install the script does not run, or install into a fresh worktree; Vite keys its pre-bundle on the installed version, and the script deletes it after its own installs.
- Run one unit per checkout, at that checkout's catalog layer.
- Restore with `scripts/swap.ts --restore --consumer <consumer>` before any `scaffold` verb, before any gate that must see a registry range or prove the published artifact, and before publishing anything. The restore puts back each recorded range, keeps an `overrides` block that existed before the pin and removes one the pin created, removes the lock entry and installed copy of each restored package and dropped override so the install resolves them again from the registry, and proves the registry source in the lockfile. The restore refuses with exit 64, before it writes anything, a ledger whose package or override keys are not package names or whose removal would leave `node_modules`. [wave.md](wave.md) § Visit a repository orders a verb run around the pins.
- Re-pin after the verb or gate with the arguments the restore receipt's `repin` member lists, then run `--status`. The release still follows layer order: the dependency publishes first, then the consumer takes the registry range and re-runs its gates.
- Keep pins uncommitted: commit neither a pinned `package.json` nor its `package-lock.json`. Keep tarballs, the ledger, and receipts under `tmp/`; sweep them at acceptance; never commit them.

## What a bump obliges

- A runtime `dependencies` bump reaches every consumer: each package downstream re-pins, re-runs its gates, bumps, and republishes in layer order.
- A development `devDependencies` bump reaches nobody: re-pin, prove the gates green, commit to `main`; do not bump or publish.
- A development bump that moves the published artifact is a runtime bump. Prove the direction with the build: rebuild after the re-pin and run `node .agents/skills/orkestrel-publish/scripts/compare.ts`, which compares `dist/` against the published tarball on material content only. Exit 3 bumps and publishes that package, and its dependents follow the runtime rule.
- A `0.0.x` caret pins one exact release, so the fleet publishes in topological layer order derived from runtime `dependencies` and `peerDependencies` edges, never from a development edge.
- Read each package's version and layer from the catalog table in `.claude/agents/orkestrel.md`, regenerated with `scaffold catalog` before sequencing a cascade. Never write a second order elsewhere.

## The scaffold surface

- After a package's first publish, run `scaffold catalog --all` in the scaffold checkout and release scaffold, so the `surface` rule reads the package's guide from that release.
- When a `@orkestrel/guide` release refuses a guide form its parser read before, push each catalog package's conforming guide to that package's `main`, the releasing package's own included, before the scaffold release that carries the catalog refresh; the `surface` rule parses every hosted guide, a target's own among them.
- `scaffold` is a development dependency of every package, so it publishes on its own and propagates as files, never as a cascade. Each package builds against the published `scaffold`.
- `scaffold` ships `dist/host`, the vendored file set every target receives through `repair`. Bump and publish `scaffold` when any vendored byte or the set of vendored paths changes.
- After a vendored-only release, re-pin `@orkestrel/scaffold` in each target, run `repair` there, and prove that target's gates still green. A target bumps only when its own published surface moved.
- Keep a target's own Claude permissions in `.claude/settings.local.json`; `repair` restores the vendored `.claude/settings.json`.
- Never edit a vendored file inside a target; `repair` restores it and `scaffold audit` reports the drift. Change the vendored file in the scaffold repository and release.
