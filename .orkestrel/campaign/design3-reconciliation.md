# Design round 3 — reconciliation, 2026-08-21

Lanes: subjective (planner report in the session task record; key rulings restated here),
objective (`tmp/codex/design3-objective-last.md`). Per-subject rulings; each divergence names
the lane taken.

## S1 Prepack — converged, with the objective lane's cost finding adopted

`"prepack": "npm run build"`, emitted by `blueprintToScripts` for publishing blueprints only
(the `prepublishOnly` gate), pinned by identity (`scripts.prepack === scripts.build`) in the
compiler tests, a `prepack` row in `.claude/rules/workspace.md`'s script-intent table, and
scaffold's own manifest taking the key (unit U1-A, Sol implementer, scaffold checkout).
Per-manifest fleet edits are a mechanical unit now for free checkouts, and one line at first
free moment for busy ones (test, probe, contract, program).

The objective lane's risk is adopted as part of the mechanical unit: the distribution proofs in
brief, mcp, process, and probe run `npm pack` WITHOUT `--ignore-scripts` (verified citations),
so `prepack` would re-build inside `prepublishOnly` there. Scaffold's own distribution proof
already passes the flag. Each of those four packages gains `--ignore-scripts` on its
distribution pack in the same visit that adds `prepack`.

The subjective lane's U1-B (a vendored `tests/config.test.ts` assertion reddening a publishing
target lacking `prepack`) is DEFERRED into the release wave's first round, exactly as its own
risk row proposed — landing it between waves reds targets nobody is visiting.

Row: struck from § 1; the § 2 replacement is the subjective lane's wording.

## S2 Interned-class canon — converged

The canon's constructor test already rules both packages correctly. Remaining work is agent
only: the stale `Channel.test.ts:5-7` comment, plus the missing `@example` on the barrelled
`Channel` (the subjective lane's finding; the barrel rule binds a row to an example). Unit U2,
`builder`. Row: replaced with the narrow agent row, closed when U2 lands.

## S3 Premise — converged

All-optional stays; no split; no required member. The subjective lane's two prose/proof
defects are adopted as unit U3 (`builder`): the `Premise` TSDoc and guide row stop saying
"checked" without qualification, and the described-mode and unknown-mode renders of
`describePremise` get their first tests (exact expectations per the subjective report). Row:
replaced with the closed ruling (closes B20).

## S4 object ban — converged: dropped

Row struck. Striking sentence merges the lanes: `object` names the set of non-primitives and
permits no member read, which is what `WeakSet<object>`, `Object.create(null)` targets,
prototype reads, and `<T extends object>` constraints require; contract's cloners and cycle
tracking depend on it; the narrowest-honest-contract law already refuses `object` where a
member contract is known, so no lexical ban is added.

## S5 Mirror — the objective lane's shape

No mechanism change now: the `branch`→`ref` rename is a published breaking change bought for an
expressiveness nobody can use (no fleet repository carries tags; a missing-ref policy would be
new machinery). Row KEPT with merged wording:

> - **Guide mirrors track upstream `main`, not the catalog release.** `Upstream` fetches guides
>   from `raw.githubusercontent.com` on `main` and versions from `registry.npmjs.org`, so the
>   two are independent by construction: between publishes a mirror is the branch's content and
>   nothing more, and mirror bytes are never evidence for the version the catalog names.
>   Publish a dependency before publishing any package that refreshes and ships its guide.
>   Revisit a release-pinned mirror only when the fleet publishes a stable per-release ref.

## S6 Settings — converged: keep bytes

Row struck with the subjective lane's striking sentence (the deny list is a security surface a
target must keep receiving; the per-workspace part already lives outside the vendored set in
`.claude/settings.local.json`). Unit U6 (`builder`, one guide passage naming both files) folds
into the scaffold docs unit.

## S7 Order-gating marker — the subjective lane's strike

Struck with no replacement: the survey is a reading `scaffold audit` recomputes per target and
`guides/scaffold.md` documents both advisories; a marker row can only be abandoned, never reach
green. (The objective lane's keep-as-trigger loses to the artifact law: prefer the mechanism
that recomputes the fact.)

## S8 openai.yaml trigger — the subjective lane's move

Struck from the ROADMAP; the trigger lands as one clause on
`.claude/rules/documentation.md` § Workflow skills (the rule's one home), in the scaffold docs
unit.

## S9 w3 — closed on the executed re-proof

The re-proof ran on this host (w3-reproof.sh, 2026-08-21): baseline green; with
`orkestrel-human-journey/agents/openai.yaml` removed, TWO tests red — the named skill-family
test AND the placement sweep, and the second red's assertion carries
`"skill requires an exact-case regular agents/openai.yaml"` with the removed path, so both reds
name the defect and neither is collateral harness breakage (the placement sweep's population
legitimately includes skill files — a second instrument the commit era lacked); restore green,
tree clean. Row struck: w3's gate is live, real-tree-proven, and self-guarding against the
empty population.

## S10 Honest-form sweeps — the subjective lane's split

The template-TODO sweep and the strict skill-directory inventory convert to units U10-A and
U10-B (Sol implementer, serialized — both own the vendored `tests/setupPolicy.ts`, which is
published `dist/host` surface and rides scaffold's next bump). Their membership rules,
positive/negative controls, and the healthy references naive forms redded are fixed in the
subjective report and carried into the briefs verbatim. The model-routing and version-catalog
sweep stays review-owned; row kept with the subjective lane's precise wording (the
version-catalog half has no membership rule separating a table from a permitted value). The
objective lane's keep-everything caution is answered by the controls: each new instrument must
red its out-of-population control and stay green on the named healthy reference before it is
believed.

## S11 setTimeout sweep — merged

The syntactic membership rule governs the mechanical unit: an awaited complete-statement
`new Promise((resolve) => setTimeout(resolve, N))` with the promise's own `resolve` and no
captured handle converts to `waitForDelay(N)` WHEREVER it appears, fixture handlers included
(the form is `waitForDelay` by definition; duration is data and survives). Excluded by form:
workflow's `scheduleHost` handle timer, queue's multi-statement handler promises, router's
nested sequencing timers. U11-A (`builder`, now): middleware, browser, workflow conversions.
U11-B (Sol implementer, after 0.0.8 ships `waitForCondition`): the attempt-counted poll loops
in middleware and browser, the outlast-then-assert waits, and router's sequencing site as a
judgment conversion preserving the write-before-destroy ordering. A settling wait before a
negative assertion stays a fixed `waitForDelay` (a poll cannot prove absence). Row replaced
with the two-part wording from the subjective report, amended to name router under the deferred
half.

## S12 mcp createTeardown — converged

Rewrite mcp onto the published `add`/`destroy` contract; no widening of test 0.0.8; delete the
local helper and its interface. Unit U12 (Sol implementer) merges both lanes' acceptance: each
suite owns its `afterEach`; `add` registered immediately after acquisition; reverse order
preserved with the WebSocket-detachment remark relocated to the suite that owns it; a proof
that a throwing disposer no longer abandons later disposers (a REAL failing resource — a
double-stop or closed handle — never a stub); failing-count-before recorded. Row kept until
U12 lands, with the objective lane's wording. This also settles the round-2 carried question:
test 0.0.8's surface takes no teardown change.

## Carried findings

- The objective lane's distribution-pack citations (brief, mcp, process, probe without
  `--ignore-scripts`) → the prepack mechanical unit.
- The subjective lane's S5 risks (tag-absence read locally; packument body unread) → recorded;
  moot while the row stands as reworded.
- S3 risk (the described-premise mode may have no producer fleet-wide) → recorded against the
  qualifier row for a future trace; does not block U3, whose subject is render behaviour that
  exists.
- S12 risk (mcp installed copy unread) → U12's brief orders the read before editing.
