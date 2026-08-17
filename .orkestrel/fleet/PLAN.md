# Fleet plan — current-pins, clean-repos campaign

The campaign of record. Read this first if a session went dark. Supersedes the test-package
campaign plan pruned at commit `ba74783`'s parent history; its open items live in `BACKLOG.md`.

## Exit criterion

1. Every fleet repo declares the latest published version of every `@orkestrel/*` dependency and
   devDependency, proven by gates and the dist-diff rule (runtime re-pin ⇒ bump+publish cascade in
   layer order; dev re-pin ⇒ publish only when the rebuilt `dist/` differs from the published tarball).
2. Every repo is clean of campaign residue: no `.orkestrel/` outside this orchestrator folder, no
   shipped `PROPOSAL.md`, `ROADMAP.md` only where it is a live plan the user chose to keep.
3. Every deferred item is implemented, struck on evidence, or recorded in `BACKLOG.md` with its
   owner and reopening condition.

## Tier 1 — easy, running now

| Unit | Scope | Status |
| ---- | ----- | ------ |
| T1-catalog | Regenerate catalog: 46 rows, form+table, current versions | DONE (test guide-mirror 404s: private repo; non-blocking) |
| T1-proposal | Delete shipped `markdown/PROPOSAL.md` | DONE — branch pushed, main fast-forwarded |
| T1-scaffold-prune | Prune superseded `.orkestrel/` artifacts in scaffold (old PLAN.md → BACKLOG.md; distribution prototype adopted — `tests/distribution.test.ts` ships; propagation.md historical) | DONE this commit |
| T1-brief-triage | Distill open items from `brief/.orkestrel` (34 files) → BACKLOG.md, then prune the folder in brief | distillate in flight |
| T1-branches | Delete ~300 merged remote branches (tips ancestors of origin/main; zero loss); keep 11 unmerged (B7) | BLOCKED: bulk `git push --delete` denied by permission classifier; needs user approval |
| T1-repin | Dev-only re-pin in 18 non-cascade repos (scaffold ^0.0.38, test ^0.0.5, guide ^0.0.11), install, five gates, dist-diff, commit, push branch + ff main | 3 slices in flight |

Tier-1 rule: a failed target is refused, named, and re-run alone; the slice never blocks its siblings.

## Tier 2 — the cascade and the overwrite pass (user-gated)

Per-repo protocol, in layer order L0→L6, cascade repos only unless the user widens it to all:

1. Triage residue (nothing left after Tier 1 except supervisor).
2. Re-pin `@orkestrel/scaffold` devDependency to latest and install, so the overwrite runs the
   current vendored host.
3. `scaffold overwrite` — writes repair+catalog set, deletes tracked plan-foreign files, re-declares
   `@orkestrel/*` ranges to the registry.
4. Read the git diff; walk back anything that is a real package affordance; everything else stands.
5. Five gates; independent verification; dist-diff.
6. Commit, push branch, fast-forward main.
7. Runtime pin moved ⇒ bump; the user publishes per layer round.

Cascade membership (runtime re-pins obliged today): L3 workspace, queue, relation, scaffold;
L4 worker, workflow; L5 agent, supervisor; L6 toolbox, ollama. Ten packages; the dist-diff rule can
add members if any Tier-1 rebuild moved dist.

supervisor is special-cased: no guide, divergent mirrors, `rescue/pre-revert-app-server-work`
branch, and a live 2,342-line ROADMAP (B6). It enters Tier 2 only after its own triage ruling.

Deferred design work rides the pass or follows it: B1 (test/guide adoption fleet pass), B2 (canon
reconciliation), B3 (prepack call) — see `BACKLOG.md`.

## Publish order

L0 contract msg sse test · L1 abort budget csv emitter html indexeddb ndjson sqlite timeout tool ·
L2 console database form markdown middleware pool reason router sea table template websocket ·
L3 browser guide interpret mcp qualifier queue rater relation scaffold server terminal workspace ·
L4 brief program worker workflow · L5 agent supervisor · L6 ollama toolbox

## Decision register (user)

| # | Decision | State |
| - | -------- | ----- |
| D1 | Merged-branch deletion (~300 across 46 repos) | blocked on permission; awaiting approval |
| D2 | Unmerged branches (11, B7) | awaiting per-branch ruling |
| D3 | supervisor ROADMAP keep vs extract; supervisor triage | awaiting ruling |
| D4 | Overwrite scope: cascade repos only, or all 46 | awaiting ruling |
| D5 | Publish windows for the cascade rounds | user-run, on request |
| D6 | B3 prepack manifests | open, no default |
