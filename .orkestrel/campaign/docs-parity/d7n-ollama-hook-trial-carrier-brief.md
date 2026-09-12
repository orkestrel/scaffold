# Author the canonical Ollama tarball trial

## Role and scope

Act as the native mechanical builder. Author only `tmp/pass/trial-ollama-hook.sh` in Scaffold. Do not execute it. Work directly and spawn nothing. You are not alone in the checkout: root runs Scaffold's prepublish. Do not write product or campaign files or run a gate, build, install, commit, or push yourself.

Read `AGENTS.md`, `.agents/orchestration.md`, `.claude/rules/portability.md`, `.claude/rules/writing.md`, `.claude/rules/quality.md`, the `orkestrel-align-packages` skill and its fleet/integration references, and the `orkestrel-publish` skill's wave reference. Read `guides/README.md`, Scaffold's overwrite/offline ownership contract, and Ollama's service guide. The actual target is `C:/Users/mikes/WebstormProjects/ollama`; no target copy or worktree is allowed. Use `apply_patch`, forward-slash paths, and `git -C` absolute addressing throughout.

## Script contract

Accept `<label> <scaffold-tarball> <sha256>`. Source `tmp/pass/pass-env.sh` through its fixed canonical path. Require a safe absent scratch evidence label, an existing regular tarball beneath the resolved `SCR/packed` directory, and the supplied lowercase SHA-256. Validate the tarball manifest as `@orkestrel/scaffold` version `0.0.65` by extracting it to a fresh scratch inspection directory, not a source candidate. Record every command, stdout, stderr, and exit status with hard caps. Use the predecessor `prepare-ollama-toolbox-registry-supported.sh` for the run/capture conventions, not its release flow. The script is a head-start trial, never an upload or main closure.

Before mutation, require canonical Ollama campaign branch and HEAD `53e5fd2f34942f4d8462c22e6be6f04313849763`, empty index, and dirty paths exactly `.github/workflows/ci.yml` and `guides/ollama.md`. Capture the complete diff/status and manifest/lock. Fetch origin and require origin/main ancestry; refuse divergence. Require the manifest name `@orkestrel/ollama` and pending version `0.0.15`. Require no extra untracked files. Save every existing dependency field before re-pinning; never read an auth or secret file.

Read each named version from npm before assigning its pin, and refuse a reading that differs from the expected version. Update only the existing listed dependency slots; preserve optional/peer metadata and the exact external SDK range. These registry versions are expected from the active layer record:

```text
dependencies: agent 0.0.21; budget 0.0.10; contract 0.0.17; ndjson 0.0.10; timeout 0.0.10; tool 0.0.14
devDependencies: abort 0.0.10; guide 0.0.18; probe 0.0.13; router 0.0.14; scaffold 0.0.64; server 0.0.19; test 0.0.14; workspace 0.0.8
```

Run `npm install --ignore-scripts` with a 600s cap. Require changed paths only the caller/guide and package.json/package-lock.json. Commit those explicit paths as a local preparation commit using the root identity and trailers from the predecessor. Do not push. This local checkpoint permits the supported overwrite's clean-tree check; it is not release acceptance.

Record the registry Scaffold range and manifest/lock hashes. Install the supplied Scaffold tarball with `npm install --ignore-scripts --no-save <tarball>`. Require the manifest/lock hashes unchanged, installed Scaffold version `0.0.65`, and installed dist bytes equal the extracted tarball. Run its built CLI `overwrite --offline` in canonical Ollama with a 180s cap. Capture its exit separately; accept only exit 0 or exit 1 whose diagnostics identify the documented skipped offline catalog step. Do not blanket-waive exit 1 or call that result green. Then run `audit --offline` and require exit 0.

Require `scripts/service.sh` absent, `scripts/ollama.sh` present and byte-identical to the installed packed host script at its actual manifest storage path. Require `.claude/settings.json` equal the packed host's storage counterpart. Check those storage paths by reading the extracted manifest; do not guess a path. Require `scripts/docs.ts` and `scripts/guides.ts` absent. If the old `docs` npm command remains, delete only that scripts key and record it as the owner's requested command retirement.

Capture the resulting source/caller and metadata diffs. Do not restore or conceal any generated change. Report the declared Scaffold range and lock entry after overwrite; do not run a further install, re-pin unpublished versions, publish, or commit the generated candidate. The root decides the next registry/lock action from this actual output. This is the stopping boundary, not a hidden follow-up.

Use no discard-class git command, recursive cleanup, server stop, secret access, auth, or publish command. Preserve archive and removed tracked source evidence so the supported deletion is recoverable from git. Emit a terminal trial status with the evidence directory. Return script path, syntax result, and any unsatisfied specification; if an assumption fails while authoring, stop rather than invent a successor mechanism.
