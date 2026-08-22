# Design brief: one online-first strategy for versions, guides, and host files

## Objective

Design one aligned fetch strategy for the scaffold package's remote surfaces — the
dependency-version lookup, the guide mirrors, and the vendored host file set — where each
surface checks its live source first and falls back to what the installed package
distributes, so a host-file change propagates to targets without a scaffold release
while the published copy stays the offline floor. Propose the public contract
(types-first), the mechanism, the per-verb semantics, and a unit decomposition.

## The user's ruling, adopted

The hosted files must be retrievable from GitHub the way guides are, under the same
general strategy as the version check: latest online first, distributed fallback second.
The version strategy is more complex by nature, but the general idea must align across
the surfaces, the guides must follow it efficiently, and the goal for the host set is
that a rules change does not force a scaffold version bump every time. Each republish
still refreshes the distributed floor, mirroring how the version floors work.

## Absorbed evidence (Cursor Grok distillate, 2026-08-21; verify any load-bearing claim you build on)

- **Versions**: packument from `https://registry.npmjs.org/<encoded-name>` with the
  abbreviated media type (`src/server/Upstream.ts:79,89,514-516`); bounds
  `MAX_REGISTRY_BYTES` 33_554_432 per response and `MAX_TOTAL_REGISTRY_BYTES`
  100_663_296 per call (`src/core/constants.ts:366,375`); `#releaseVersion` keeps the
  highest `#admits`-passing version, fleet packages query `*`, foreign packages
  `^${major}` (`Upstream.ts:330,491-503`, `CLI.ts:490-494`). A failed fetch becomes a
  soft `lookup: 'failed'` (`'missing'` on 404), but `#pin` refuses any non-`found`
  verdict, so `new`, `repair`, and `catalog` throw `FETCH` and write nothing; only
  `overwrite` keeps prior offline work (`Upstream.ts:336,556-557`, `CLI.ts:582-587`).
  The baked floors (`BASE_DEV_DEPENDENCIES` and siblings,
  `src/core/constants.ts:393-396`) are generation-time seeds, not a live fallback.
- **Guides**: `https://raw.githubusercontent.com/orkestrel/<repo>/refs/heads/main/...`,
  branch defaulting to `main`, overridable through `UpstreamOptions.guides.branch`
  (`Upstream.ts:78,80,84,136,531`); no conditional requests or cache; bounded parallel
  pool, default concurrency 6 (`Upstream.ts:113,218,690`). Only `catalog` and
  `overwrite` fetch guides. A failed row is skipped by `Materializer.mirror`, and
  `catalog`/`overwrite` refuse the whole transaction unless every fetch is `found`
  (`Materializer.ts:290-292`, `CLI.ts:573-576`). The tarball vendors no foreign guides —
  `HOST_PATHS` carries only scaffold's own `guides/guide.md` and `guides/scaffold.md`.
- **Host set**: single inventory `HOST_PATHS` (`src/core/constants.ts:124`), expanded by
  `stageHost` walking the checkout (`src/server/helpers.ts:1158`), written to
  `dist/host` with a SHA-256 `manifest.json` over entries and roots
  (`helpers.ts:1258`). Targets resolve the installed copy at
  `node_modules/@orkestrel/scaffold/dist/host` (`Materializer.ts:155`). Audit compares
  exact UTF-8 hex of the target file against the vendored artifact
  (`src/core/helpers.ts:459`, `Materializer.ts:210-212,530`). There is no live fetch
  path for host files today, and `dist/host` is gitignored — the GitHub side serves the
  SOURCE paths (`.claude/rules/...`), which `stageHost` maps into the staged layout.
- **Shared machinery**: one reader — `#read` → `#request` (`redirect: 'manual'`) →
  `#body` — shared by registry and guide fetches with the byte budgets.
  `ORKESTREL_SCAFFOLD_REGISTRY` overrides the registry base (`src/bin/main.ts:12-14`);
  the guide host has only the in-process option, no env override.
- **Tests**: loopback `node:http` fixtures (`tests/setupServer.ts:1713-1748`,
  `createUpstreamServer`) drive version and guide fetches; `helpers.test.ts` and
  `Materializer.test.ts` drive `stageHost` and hydration on real-checkout fixtures.

## Design questions, each requiring a ruling

1. **The aligned strategy, stated once.** Define the shared online-first pattern as one
   rule each surface instantiates: what is fetched live, what the distributed fallback
   is, when the fallback engages, and how the chosen baseline is reported. Note that no
   surface currently implements a live-then-distributed fallback — this is new
   machinery, and the design decides whether it is one shared mechanism in `Upstream`
   or per-surface policy over the shared reader.
2. **The host fetch mechanism.** The GitHub side has only source paths; the installed
   package knows `HOST_PATHS` and the staging map. Rule on: fetching per-file raw
   under the existing pool and budgets, versus one `git trees` API call for paths and
   blob hashes followed by fetching only files whose local copy differs, versus one
   codeload tarball. Weigh request count (the staged set is 108 files today), byte
   budgets, rate limits on api.github.com versus raw.githubusercontent.com,
   and failure atomicity. State which inventory drives the fetch (the installed
   `HOST_PATHS` floor) and what an upstream-added path means before the next release.
3. **Baseline atomicity.** May a host baseline mix fetched and distributed bytes, or is
   it all-or-nothing per operation? Consider `audit` reporting drift against a chimera
   baseline, and `repair` writing one file from `main` and its neighbour from 0.0.48.
   Rule, and state how the operation's report names the baseline that ruled.
4. **Per-verb semantics.** For each verb — `new`, `repair`, `overwrite`, `audit`,
   `catalog` — state the online-first behaviour and the offline behaviour, including
   whether the version lookup's current hard `FETCH` refusal for `new`/`repair`/
   `catalog` stands or softens to a floor fallback with a loud record, and whether the
   guide transaction's all-or-nothing refusal stands or softens to keeping the target's
   existing mirror. Alignment must not silently weaken a semantics the version campaign
   set deliberately; where you soften one, say why the loud record preserves what the
   refusal protected.
5. **The contract.** The `UpstreamInterface` and option-group changes, types-first, in
   the repository's single-word API style: where the host fetch lives, its option group
   (base, branch, bounds), the env-override symmetry question
   (`ORKESTREL_SCAFFOLD_REGISTRY` exists; rule on guide and host equivalents), and the
   shape of the result a consumer (`Materializer`, the CLI verbs) receives.
6. **Efficiency for guides.** The user asks that guides follow the strategy
   "efficiently": rule on conditional requests, the concurrency bound, and whether a
   digest comparison can skip unchanged mirrors, within the no-cache reality of raw
   GitHub.
7. **Trust and integrity.** The fetched host bytes overwrite files that govern agent
   behaviour in targets. State the integrity posture: `main` is the trusted source
   today (guides already fetch it); rule on whether the host fetch needs any integrity
   check beyond TLS and the byte budgets, and what refusing a suspicious response looks
   like.
8. **Units.** Decompose into implementation units with owned files, dependencies, and
   independently checkable acceptance criteria. Note: the test fixtures are loopback
   servers, so implementation and its tests run natively, never in a bench sandbox.

## Constraints

- `*/types.ts` first; single-word entity APIs; options grouped; absence is `undefined`;
  no new npm packages — `fetch` and `node:crypto` are the toolkit.
- The distributed `dist/host` remains the offline floor and the release artifact; the
  staging mechanism (`stageHost`, the manifest) stays authoritative for what a release
  distributes.
- Do not design a second parser, cache daemon, or state file; prefer recomputing over
  recording.
- The published surfaces move: this lands in a scaffold release; the design states what
  the release note must say about the new network behaviour.

## Output

A design report: the aligned strategy stated once; per-question rulings with the
reasoning that decides each (option, cost, recommendation); the proposed type
declarations verbatim; the unit decomposition with acceptance criteria; risks. No
process diary.
