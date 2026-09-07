# D5 fork — design verdict (2026-09-07)

## Lanes

Subjective: `planner`, Opus 5 (`d5-fork-design-subjective.md`). Objective: `reviewer`, Opus 5, the recorded substitution for the dark Sol bench (`d5-fork-design-objective.md`). Both blind, clean contexts, one brief (`d5-fork-design-brief.md`), Workflow `wf_581462a5-ea0`, 9 minutes.

## What the lanes said

- **Subjective:** option 2 — the seed stays a content-owned `HOST_PATHS` row that imports nothing and takes its readers' module as a positional argument in the manifest script, with the composition moved into three new `@orkestrel/guide` entries (`computeParity`, `replaceGuides`, `replaceSources`) so the seed narrows one module shape and one record; the gate adopts `computeParity` and D4's F4 closes. Refuses the template (frozen copies per target), the verb (`rulings.md:7` already refuses a verb; no `--to` under the verb law; a runtime edge; the guide package one release behind), and the bin (the I/O-free tagline). Names the self-reference question as a tension it did not run.
- **Objective:** option 1 — a presence-owned template under `blueprint.guides`, grouped `orchestration` by the path prefix, with delete-and-repair documented as the update path — but only inside the brief's constraint that the rule and its gate stay, and it names that constraint's premise as unverified (M1): if a package's own name resolves through its `exports` map, the landed vendored row is sound and the rule's text is what needs repair (its shape 5a). Refuses option 2 for re-declaring a published contract in a vendored file, option 3 on the ownership contract, the verb vocabulary, and the runtime-bump cascade, and option 4 on the tagline. Finds F-a (the seed's inventory omits `app/**`), F-b (the seed reaches guides-less workspaces), F-c (the guide package's first `repair` would append the compiled `docs` value), F-d (the gate's red unobserved).

## The measurements that decide it

P13 (M1): inside the guide checkout, Node and `tsc` resolve `@orkestrel/guide` through the package's `exports` map to its `dist/` entry, and the control without an `exports` map fails. P12 (M2): Node's type stripping cannot load the guide's source, so the resolution lands on `dist/` in every shape that points the guide package at itself. M6: no fleet manifest carries a `docs` script yet. M7: `tests/src/server/helpers.test.ts:200` is red on exactly `scripts/docs.ts` as the tree stands.

## Ruling

**Shape 5a, with the cost it exposes closed in the same round.** The vendored row stands as D5 landed it. The rule at `.claude/rules/workspace.md:77-79` is rewritten to the invariant it protects — a vendored module imports only what resolves in every workspace: `node:` modules and the packages `BASE_DEV_DEPENDENCIES` declares everywhere — and its gate becomes an allowlist over that set rather than a text ban on `@orkestrel/*`. Because the resolution in a base package's own checkout lands on `dist/`, the generated root `tsconfig.json` maps the workspace's own published specifiers to its source, so `npm run check` there needs no build; `npm run docs` there runs after `npm run build`, and the guide says so. The seed is selected with `blueprint.guides`, the fact that already selects the `docs` script, so a guides-less workspace receives neither (F-b). The subjective lane's positional-argument seam and its three guide entries are refused: they re-declare the reader contract inside a vendored file to route around a rule whose premise is false. The objective lane's template is refused for the cost both lanes name: a writer the canon updates everywhere would freeze per target while the gate moves. The brief's own constraint ("the rule and its gate stay") was the Orchestrator's, not the owner's; the rule's reason is falsified by P13, and a rule stating a false reason is corrected, not preserved. The owner can reverse this ruling; it is flagged in the report.

## Findings carried

- F-a (the inventory omits `app/**`) is the gate's population as well as the seed's — `tests/guides.test.ts:51` globs the same set — so it is a finding against the gate's template for D7.n, not D5-fix. Carrier: the D7.n plan row.
- D4's F4 (the gate's assertion is not a readable worklist): closed in D6 by the cheap form — one readable line per drift in the equality case's collection — not by the subjective lane's `computeParity`. Carrier: `d6-scaffold-converge-brief.md` (amended).
- F-c is moot under 5a: the guide package's `docs` value is the compiled one.
- F-d is closed by M7 (the red is observed and retained).
- The subjective lane's tension on three entries against one `direction` value, and its `ParityResult` guard: not adopted; no carrier.
- The objective lane's M3, M4, M5: moot under 5a (no template, no bin). M4's grouping concern (a `scripts/` path groups as `orchestration`) stands for the vendored row too and is recorded as a finding for the next change to the group inference, not this campaign.

## Substitution

Sol dark this round (`codex` not on `PATH`, MCP `ENOENT`); the objective lane ran on Opus 5 as `reviewer`, recorded here and in the ledger.
