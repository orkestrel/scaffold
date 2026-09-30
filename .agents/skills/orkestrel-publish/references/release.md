# Release laws

`orkestrel-publish/SKILL.md` names this file. It carries the fleet release rules that bind an executor who is publishing or preparing a package to publish.

## Publishing is the user's

- Publishing is the user's decision and the user's credential. Prepare, surface the approval, and run the publishes the user asked for. Never substitute an API key, an access token, a copied auth file, or another login flow, and never ask the user to paste a token into the conversation.
- A publish chain is a long-running command: write it as a TypeScript file and launch it through the `orkestrel-dispatch` skill's `scripts/launch.ts`; confirm the previous chain is dead by process id before starting another. Publish serially; concurrent publishes collide on the authentication handshake.
- A wave over unpublished tips derives its order per run from the dependency graph and records only the round each package landed in.

## Fix a dependency before it publishes

When a consumer meets a defect that lives in a package it only has from the registry, build the dependency from source, pack it, and install the tarball into the consumer. Do not wait for the release and do not work around it in the consumer.

- Install the tarball; never link it. A link skips packing, the `files` list, and the exports map.
- Write the build, pack, and install to a script and run the file.
- Record the range you replaced in the same step that replaces it.
- Rebuild and repack whenever the dependency's source moves; a stale tarball is a stale `dist/`.
- Delete the consumer's `node_modules/.vite` directory after every tarball install, or install into a fresh worktree; Vite keys its pre-bundle on the installed version.
- Run one unit per checkout, at that checkout's catalog layer.
- Fetch and merge the dependency's default branch before packing it.
- Restore the registry copy before any gate that must prove the published artifact, and before publishing anything. The release still follows layer order: the dependency publishes first, then the consumer re-pins and re-runs its gates.
- Keep tarballs under `tmp/`; sweep them at acceptance; never commit them.

## What a bump obliges

- A runtime `dependencies` bump reaches every consumer: each package downstream re-pins, re-runs its gates, bumps, and republishes in layer order.
- A development `devDependencies` bump reaches nobody: re-pin, prove the gates green, commit to `main`; do not bump or publish.
- A development bump that moves the published artifact is a runtime bump. Prove the direction with the build: rebuild after the re-pin and run `node .agents/skills/orkestrel-publish/scripts/compare.ts`, which compares `dist/` against the published tarball on material content only. Exit 3 bumps and publishes that package, and its dependents follow the runtime rule.
- Every package is `0.0.x`, where a caret pins one exact release, so the fleet publishes in topological layer order derived from runtime `dependencies` and `peerDependencies` edges, never from a development edge.
- Read the order from the catalog table in `.claude/agents/orkestrel.md`, regenerated with `scaffold catalog` before sequencing a cascade. Never write a second order elsewhere.

## The scaffold surface

- `scaffold` is a development dependency of every package, so it publishes on its own and propagates as files, never as a cascade. Each package builds against the published `scaffold`.
- `scaffold` ships `dist/host`, the vendored file set every target receives through `repair`. Bump and publish `scaffold` when any vendored byte or the set of vendored paths changes.
- After a vendored-only release, re-pin `@orkestrel/scaffold` in each target, run `repair` there, and prove that target's gates still green. A target bumps only when its own published surface moved.
- Keep a target's own Claude permissions in `.claude/settings.local.json`; `repair` restores the vendored `.claude/settings.json`.
- Never edit a vendored file inside a target; `repair` restores it and `scaffold audit` reports the drift. Change the vendored file in the scaffold repository and release.
