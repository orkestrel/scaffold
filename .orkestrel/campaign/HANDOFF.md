# Fleet campaign — complete handoff (2026-09-03)

This is the campaign-level handoff for the `@orkestrel/*` fleet campaign run on branch
`claude/orkestrel-npm-audit-deps-14ibta` in every fleet repository and in scaffold. It exists so a
different session can take the campaign to completion without missing anything: what was done, what
every checkout carries, what diverged on `main` meanwhile, what is still open, what to publish and in
which order, and the exact prompt to start the next session with. The round-level handoff for the work
in flight is `conform/HANDOFF.md`; this file points at it rather than repeating it.

Read in this order before acting: this file; `conform/HANDOFF.md`; `AGENTS.md`; every file under
`.claude/rules/`; `.agents/orchestration.md`; `.agents/skills/orkestrel-falsify/SKILL.md`;
`.agents/skills/orkestrel-debrief/references/retention.md`; `.agents/skills/orkestrel-publish/SKILL.md`
with `references/wave.md` and `references/window.md`; `ROADMAP.md`.

## The user's standing rulings

- Every dependency to its latest release with `typescript` at `^6.0.3`; every gate green; the fleet
  audited strictly against `AGENTS.md`, the rules, the agents, and the skills as found in the scaffold
  repository; non-breaking fixes first, breaking changes in layer order with the tarball method; the TSDoc
  voice migration last. All done except the conformance round in flight.
- "Do not defer anything, make sure that we have all implemented, even breaking changes, go through the
  processes we went through along with following the improvements we find from the debrief."
- "All succeed and kind purity" rulings applied; "Proceed but no publish for now": **publishing is the
  user's decision and credential. Nothing publishes until the user says so.**
- Opus 5 is the subagent engine for every judgment lane; the Orchestrator reviews and manages. A Fable 5.1
  interlude on 2026-09-03 was reverted by the user; every instrument names `opus` again.
- Contract's `origin/main` authority belongs to the Orchestrator; run as much as possible in parallel.
- Never push to another branch; never open a pull request unless asked; never edit a vendored file inside a
  target; commit author `git -c user.name=Claude -c user.email=noreply@anthropic.com` with the
  `Co-Authored-By` and `Claude-Session` trailers this branch's history carries, and no model identifier in
  any pushed artifact.

## What the campaign did, and where each record lives

| Phase | Outcome | Record |
| --- | --- | --- |
| Baseline and bench liveness | Fleet cloned at `/home/user/fleet/<pkg>`, scaffold at `/home/user/scaffold`; Sol bench dark (`codex` absent), Grok bench live (`agent` CLI). | `carry.md` § Evidence, `conform/ledgers/interruptions.txt` |
| Dependency update | Every package on its latest dependencies with `typescript ^6.0.3`, drift repaired, gates green. | Each checkout's commit "Update dependencies, and repair the drift that update surfaced"; `last/<pkg>.md` |
| Inventories and layer order | Distributable inventories per publish layer; the republish order derives from runtime dependencies (`conform/instruments/layers.mjs`). | `last/<pkg>.md` headers (declared and registry versions at the time), `.claude/agents/orkestrel.md` catalog table |
| `scaffold overwrite` fleet-wide | Vendored host files propagated to every target; package-specific files walked back. | Each checkout's "Apply the scaffold 0.0.59 overwrite" commit; `fix/tarballs.json` |
| Strict src audit, non-breaking fixes, breaking work order | Findings ledger, verified symbol ledger with blast radius, design round, breaking units in layer order L0 → L6 with tarball closures, audits, verifier gates, fix rounds. | `fix/units/*` (verdicts), `last/<pkg>.md`, commit history per checkout |
| TSDoc voice migration | Third-person voice across the fleet. | Each checkout's "Migrate the TSDoc voice to the third person" commit; `voice/units/*` |
| Retention and debrief | Carry register, retention checks, prune, retrospective, blind instruction-set audit; the canon refinements landed in scaffold and propagated (`c8dc8cf`). | `carry.md`, `debrief.md` (terminal `DEBRIEF: OPEN`), `debrief/*` |
| Conformance round (in flight) | Blind finder lanes on every package, refuters on thirty-eight, implementation begun on L0 and L1. | `conform/HANDOFF.md` and its folders |

`touched.md` lists, per checkout, the branch tip, the merge base with `main`, the version pair recorded at
the last-change record, and every commit subject on the branch, plus the commits `main` carries beyond the
branch.

## Divergence from `main` that must be resolved first

Read on 2026-09-03 after fetching `origin/main` in every checkout. The owner published from `main`
while this campaign ran, so three checkouts have `main` ahead of the branch; every other branch tip
contains its `origin/main`.

| Checkout | What `main` carries beyond the branch | Registry now | Merge dry run |
| --- | --- | --- | --- |
| scaffold | The contract memoization and performance campaigns of 2026-09-01, the test 0.0.12 publish record, the re-pin to test 0.0.12, a catalog and mirror refresh, and the release chain evidence (`touched.md` § Where origin/main moved past the branch). | `@orkestrel/scaffold` 0.0.60 published; the branch declares 0.0.59 | Conflicts in `ROADMAP.md`, `guides/contract.md`, `host.json`, `package-lock.json`, three `tests/src/core/fixtures/*.txt`, and three `.orkestrel/scaffold/*.md` deleted on the branch and modified on `main`. |
| test | The branch tip is already an ancestor of `main`; `main` published test 0.0.12 and re-pinned scaffold 0.0.60. | `@orkestrel/test` 0.0.12 published; the branch declares 0.0.11 | Clean. |
| form | Form 0.0.4 taken with contract 0.0.15, the scaffold 0.0.59 overwrite, and re-pins to scaffold 0.0.60 and test 0.0.12. | `@orkestrel/form` on the registry at the bumped version | Conflicts in `package.json` and `package-lock.json`. |

Procedure, per `.agents/orchestration.md` § Fixing a dependency before it publishes ("fetch and merge the
dependency's default branch before packing it"): in each of the three checkouts run `git fetch origin
main` and `git merge origin/main` on the campaign branch (a merge commit, never a rebase), resolve the
conflicts, regenerate `host.json` with the build and the lockfile with the repository's tooling, run the
gate chain, commit, and push. In scaffold, the deleted `.orkestrel/scaffold/*.md` files were pruned by
the campaign's retention pass: take `main`'s versions only if their campaign is still open on `main`;
otherwise keep the deletion and say so in the merge commit. Then re-pack scaffold and test and re-stage
every consumer's closure (`conform/instruments/wend-repack-restage.sh`), and re-pin every target's
`@orkestrel/scaffold` and `@orkestrel/test` development ranges to the published 0.0.60 and 0.0.12 where
the branch still declares the older range, refreshing the vendored guide mirrors with `scaffold repair`.
Check every other checkout the same way before packing it, because `main` can move again.

## What is still open

1. The conformance round: `conform/HANDOFF.md` § State per package and § Procedure (finish the rulings
   for eleven packages, reconcile and implement every ruled package in layer order with audits and fix
   rounds, land, pack, re-stage consumers of breaking rows).
2. The Orchestrator-owned units: the fleet dependency pass removing the unused `@vitest/browser-playwright`
   development dependency from non-browser packages (networked lockfile regeneration, one checkout at a
   time, after restoring that checkout's registry copy); every ORCHESTRATOR row in
   `conform/ledgers/reconcile.md`; the follow-ons in `conform/ledgers/followons.md`.
3. `debrief.md` stays `DEBRIEF: OPEN` until every finding it carries has a landed carrier; then its terminal
   line becomes `DEBRIEF: FOLDED` and the closing report replaces the placeholder.
4. `ROADMAP.md` § 1 rows: the fleet publish wave (owner's decision) and the entry-module
   `@packageDocumentation` row; re-read the section after merging `main`, which edits it.
5. Close-out: repack and re-stage, the authoritative serial gate sweep (`conform/instruments/fleet-gates.sh`),
   the fourth distributable inventory (`conform/instruments/inventory2.mjs`), `scaffold audit --offline` in
   every target, the round verdict file, the retention prune, the push of every checkout, and the final
   report.

## What to publish, and in what order

Every fleet package and scaffold moved on the branch (`touched.md`), so every one is a candidate for the
publish wave. The wave is the user's release decision; prepare it, surface the approval, and run only
what the user asks for, through the `orkestrel-publish` skill.

1. Merge `main` as above, land every open unit, and take the fourth inventory. The inventory's per-package
   ruling is the bump ruling: a material `dist/` or README difference against the tarball of the version
   the registry serves (scaffold 0.0.60, test 0.0.12, form's bumped version, and every other package's
   `last/<pkg>.md` registry version unless the registry moved) means bump and publish; a difference confined
   to development dependencies means re-pin and commit without a bump (`.agents/orchestration.md` § What a
   bump obliges). Regenerate the catalog table with `scaffold catalog` before sequencing; its `Layer`
   column is the order.
2. Scaffold publishes on its own account and first, because its vendored host surface (`dist/host`) moved
   with the refined canon; after it publishes, re-pin `@orkestrel/scaffold` in every target, run
   `scaffold repair`, and prove each target's gates.
3. Then the runtime layers in order: L0 codec contract msg sse test; L1 abort budget csv emitter html
   indexeddb ndjson sqlite timeout tool; L2 console database form markdown middleware pool process reason
   router table template websocket; L3 browser guide interpret lsp mcp qualifier queue rater relation sea
   server terminal workspace; L4 brief probe program worker workflow; L5 agent; L6 ollama toolbox. After
   each layer publishes, its dependents re-pin to the published versions, refresh their vendored guide
   mirrors, re-run their gates, and bump on their own account before the next layer. Every package is
   `0.0.x`, so a caret pins one release and the cascade is real.
4. Restore the registry copy of every staged dependency (`conform/instruments/restore-dep.sh`) before any
   distribution proof and before publishing anything; a proof against a local tarball proves the tarball.
5. Keep publishing serial and inside the five-minute upload window the skill describes; never substitute a
   token or a copied auth file, and never ask the user to paste one.

## Engines and benches for the next session

Claude Code hosts Opus 5 natively: run the session on `opus` at high effort, dispatch every judgment lane
(finders, refuters, reconciliation, implementers, objective reviewers, planner, reviewer) on the `opus`
alias, the checker and verifier on `sonnet`, absorption on the Grok bench when a reading-heavy question
appears. Probe `codex --version` at session start; the Sol bench was dark throughout this campaign, so
Opus 5 held the objective lane as the recorded substitution in every verdict. The full table is in
`conform/HANDOFF.md` § Which engine and role to use for each step.

## Prompt for the next session

Start a session in the `orkestrel/scaffold` repository on branch `claude/orkestrel-npm-audit-deps-14ibta`
with ultracode on, and paste this:

```text
Continue the @orkestrel fleet campaign on branch claude/orkestrel-npm-audit-deps-14ibta and take it to
completion. Read, in order: .orkestrel/campaign/HANDOFF.md, .orkestrel/campaign/conform/HANDOFF.md,
AGENTS.md, every file under .claude/rules/, .agents/orchestration.md, the orkestrel-falsify skill, the
orkestrel-debrief skill's references/retention.md, and ROADMAP.md. Follow them strictly. Run the main
session on Opus 5 at high effort and dispatch every judgment lane on the `opus` alias with the checker
and verifier on `sonnet`; never use Fable as a subagent and never use a fixed model ID. Probe the benches
first and record the Sol substitution where it is still dark.

Do the work in this order. (1) Bootstrap per conform/HANDOFF.md § Bootstrap: confirm every fleet
checkout under /home/user/fleet and scaffold are on the branch and clean, restore the staged closures if
node_modules is missing, recreate the working paths from the campaign folder, and arm a journal monitor
plus a twenty-minute check-in so the container never idles while workflows run. (2) Resolve the
divergence from main in scaffold, test, and form exactly as HANDOFF.md § Divergence describes: merge
origin/main into the branch, resolve the named conflicts, regenerate host.json and the lockfiles with the
repository tooling, prove the gates, commit, push, then re-pack and re-stage, and re-pin scaffold 0.0.60
and test 0.0.12 wherever the branch still declares the older range. (3) Finish the conformance round per
conform/HANDOFF.md § Procedure: the eleven unruled packages first, then reconcile, implement, audit, fix,
and land every package in layer order with the layer workflow, re-staging consumers of breaking rows, and
resuming budget, sse, and msg from their checkpoints. Defer nothing; every finding lands or is
intentionally excluded on recorded evidence. (4) Run the Orchestrator-owned units and the follow-ons in
conform/ledgers. (5) Close the campaign: repack and re-stage, the serial gate sweep, the fourth inventory
with its per-package bump rulings, scaffold audit --offline in every target, the round verdict file,
DEBRIEF: FOLDED, the retention prune with its promotion record, and push every checkout. (6) Prepare the
publish wave per HANDOFF.md § What to publish and stop there: report the order and the bump rulings and
wait for my release decision. Do not publish, do not open pull requests, and never push to another
branch. Commit and push all work as you go, and keep the campaign records under .orkestrel/campaign/
current so another session can pick up from any point.
```
