# Trial visit: the canon sweep on orkestrel/contract

Date: 2026-08-27. Operator: the Orchestrator, session `claude/scaffold-proposal-impl-nabmm9`.
Subject: the first real-repository run of `scaffold overwrite` from the canon-split branch
(scaffold `be96150`, packed as a local 0.0.55 tarball, shasum `41046dbcf2dcfae4fcaf085c6cdd788b9247276c`).

## Environment

- Contract cloned anonymously to `/home/user/orkestrel/contract` (shallow), trial branch
  `claude/scaffold-overwrite-trial` from `b3874da` ("Adopt the published scaffold 0.0.53").
- The registry serves `@orkestrel/scaffold` 0.0.55 published 2026-08-27T01:06:50Z with shasum
  `b3e1f39f8425ad60b2e5e34ef1f3e29562434037`. That release is the PRE-split full-vendoring model:
  its `HOST_PATHS` vendors the whole instruction set into targets and its `dist/host/AGENTS.md`
  is the full 188-line body. The canon-split branch diverged from exactly that tip (`825c464`),
  so the two share a version number with different content.
- A `file:` tarball pin refuses the blueprint by design (the guide: a workspace pinned to a
  committed tarball has no drift detection), so the local build was staged with
  `npm install --no-save <tarball>`: the manifest keeps a registry range, `node_modules` holds
  the canon-split package.

## The visit, in order

1. `npm ci` baseline install: exit 0.
2. Local tarball staged with `--no-save`; tree stayed clean.
3. Migration: contract's `.claude/agents/orkestrel.md` carried the stale pre-split charter
   ("ecosystem specialist"), which presence ownership never refreshes and the `catalog` verb's
   marker-bounded rewrite never reaches. Deleted and committed (`6414929`) before the run.
4. `scaffold audit` preview: exit 1. 92 `foreign` findings (every tracked instruction copy),
   `stale` on `.oxlintrc.json`, `.prettierignore`, `tests/setupPolicy.ts`, `tests/policy.test.ts`,
   `AGENTS.md`, `CLAUDE.md`; `missing` on the deleted catalog file; release-floor findings on
   `@types/node` and the typescript major. Full output: `trial-audit-before.txt`.
5. `scaffold overwrite`: exit 0. "12 written, 28 unchanged, 92 removed. 49 published, 4 guides
   fetched." The pointer pair replaced the full bodies (`AGENTS.md` -160 lines, `CLAUDE.md`
   -44 lines), the catalog file returned on the floor body with the table refilled, and the
   `declare` step re-pinned `@orkestrel/scaffold` ^0.0.53→^0.0.55, `@orkestrel/probe`
   ^0.0.6→^0.0.9, `@types/node` ^26.3.0→^26.4.0. Full output: `trial-overwrite.txt`.
6. Second `scaffold audit`: exit 0, with the typescript major note remaining informational.
   Output: `trial-audit-after.txt`.
7. Deletion ground truth from git: the deleted set equals the expected set exactly — the
   sorted list of tracked files under `.agents/`, `.claude/agents/` (minus the catalog file),
   `.claude/rules/`, `.claude/skills/`, `.codex/`, `.cursor/`, plus `.mcp.json`, compared
   `diff`-equal against `git diff --name-only --diff-filter=D`. `.claude/settings.json`
   survived. Status snapshot: `trial-git-status.txt`.
8. Empty-directory husks pruned by hand (see finding 3), visit committed (`e965ae4`).
9. Wave tail: force-verified `@orkestrel/probe` 0.0.9 against the registry, full `npm install`
   (exit 0), local tarball re-staged with `--no-save` so the gates run against the canon-split
   scaffold, mutating `format` converged with zero drift beyond the lockfile, lockfile
   committed (`fe33151`).

## Findings

1. **Version collision.** The registry already serves a different 0.0.55, so the canon-split
   branch must bump to 0.0.56 before publishing (wave law: bump from what the registry serves).
2. **The wave's migration trigger clause is too narrow.** It fires on a catalog file that
   "opens with a repository-relative `.agents/` read instruction"; the real 0.0.53-generated
   body opens with the specialist charter instead and never matches. The condition must key on
   the stale pre-split body, not on one opening form. Carried to a `wave.md` fix in scaffold.
3. **The sweep leaves empty directory husks.** After the 92 deletions, `.agents` held 30 empty
   directories and `.codex`, `.cursor`, `.claude/rules`, `.claude/skills` their skeletons. Git
   never sees them, so `audit` exits 0 while the working tree keeps the shape of the deleted
   set. The remove step must prune directories its own deletions emptied. Carried to a
   `Materializer` fix in scaffold.
4. **Topology note.** An anonymously read repository lands at `/home/user/orkestrel/<repo>`, so
   the pointer pair's sibling `../scaffold` route does not resolve there; the `node_modules`
   fallback carries the resolution. A repository attached with push access lands at
   `/home/user/<repo>`, where the sibling route resolves.
5. **Pre-publish staging mechanism.** The `file:` refusal means the fixing-a-dependency flow
   stages the tarball with `npm install --no-save`; the manifest keeps a registry range. Worth
   one line beside the wave's tarball-restore paragraph.
6. **The online verbs write the published floor, and the collision made that visible.** The value
   host reads vendored bytes from the published package online and from the installed floor under
   `--offline`. Because the registry's 0.0.55 is the pre-split release, the online overwrite wrote
   the registry's pre-gating policy suite into the swept tree and its own audit compared against
   the same fetched bytes and reported clean. `scaffold repair --offline` restored the floor
   suite (one file replaced), and the suite passed 111 of 111. A pre-publish visit therefore runs
   `scaffold overwrite --offline` and proves with `scaffold audit --offline`; the full online
   forms follow the release. Carried into `wave.md`.

## Verification round

Adversarial fan-out `wf_71199c06-fe5`: pointer-fidelity, retention-fidelity,
catalog-restoration, collateral-scope (verifier lanes), policy-binding (checker lane), then the
authoritative gate chain (verifier). Verdicts and the root-cause narrative are in
`trial-verdicts.md`.

## Outcome

The sweep mechanics hold on the real target: one `scaffold overwrite` run removed all 92 tracked
instruction copies and nothing else, wrote the pointer pair verbatim from the templates, restored
the catalog file on the floor body with the table refilled, kept every planned host file, and the
second audit exited 0. After the `repair --offline` restoration closed the collision artifact, the
full gate chain in contract is green: `format:check`, `lint:check`, `check`, and `build` exit 0,
and the suite passes across every project — src 1291, policy 111, config 46, setup 60, guides 59
(`trial-gates-final.txt`). Contract's trial branch `claude/scaffold-overwrite-trial` holds the
visit as commits `6414929`, `e965ae4`, `fe33151`, and `cd351ee`, local only.
