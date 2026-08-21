# Design round 3: the rulings batch

## Role and engine

This brief goes independently to the subjective lane (`planner`, Opus 5) and the objective lane
(`analyst`, GPT-5.6 Sol). Blind lanes, read-only, spawn nothing.

## Objective

Rule on the batch below so each ROADMAP row ends implemented (a bounded unit), kept (with the
exact replacement wording), or struck (with the sentence that strikes it). Every ruling states
the invariant, the constraint bounding it, and where a consumer meets the obligation.

## Context

Repositories under `C:/Users/mikes/WebstormProjects`. Authority: `AGENTS.md`, the
`.claude/rules/*.md` set (scaffold's copies), `guides/scaffold.md` where named. Evidence
distillates, read all three: `scaffold/tmp/cursor/absorb-fleet-inventory.log` (F1),
`scaffold/tmp/cursor/absorb-scaffold-rows.log` (F2),
`scaffold/tmp/cursor/absorb-package-rows.log` (F3). The subject rows are in
`scaffold/ROADMAP.md`. Registry state 2026-08-21: every checkout's version matches the registry.

## Subjects

### S1. Prepack (the user decided: add)

F1's ground: no fleet manifest declares `prepack`; the script table is compiled by
`blueprintToScripts` (`scaffold/src/core/compilers.ts:287-422`, `prepublishOnly` emit at
`:415-420`); manifests are birth-owned, so no scaffold verb rewrites or flags a hand-added key;
the vendored `tests/config.test.ts` asserts no closed key set. Rule on: the exact `prepack`
value (candidate: `npm run build`); whether it is emitted for publishing blueprints only,
mirroring the `prepublishOnly` gate; the compiler-test rows it obliges
(`tests/src/core/compilers.test.ts:185-226` area); whether `.claude/rules/workspace.md`'s
script-intent table gains a `prepack` row; and the propagation shape — one edit per fleet
manifest, since birth ownership means no tool re-emits them. Name the risks: double building
inside `prepublishOnly` flows that do not pass `--ignore-scripts`, and any package whose `build`
is not the right freshness action (scaffold's own `build` includes `build:host`).

### S2. The interned-class canon row

F2's evidence: the canon already sits at `.claude/rules/architecture.md:252-257`; agent's
`Channel` has a parameterless constructor, a barrel row, and a guide entity row, but a stale
test comment claiming it is module-internal (`agent/tests/src/core/Channel.test.ts:5-6`);
middleware's `MultipartParser` takes owner-produced constructor values and is interned with an
`INTERNAL` row. Rule: does the canon's own constructor test already decide both correctly? What
corrective unit remains (the stale comment at least; anything else you find)? Row disposition.

### S3. Qualifier `Premise`

F3's evidence: every member optional; `isPremise({})` is true by test
(`qualifier/tests/src/core/validators.test.ts:151`); `expected`/`actual` deliberately
unchecked; `program` is the direct consumer. Rule: do `met` or `field` become required, does
the type stay as an honestly-all-optional record with the guard documented as structural, or
does the shape split? Name the consumer evidence you read in `program`'s use of `Premise`.

### S4. Banning the `object` type

ROADMAP: state the invariant in the canon first, or drop the candidate. Rule it with the
replacement text or the strike sentence.

### S5. Mirror tracks a branch, not a release

F2 maps the mechanism (`scaffold/src/server/Upstream.ts:73-75`, guides from
`refs/heads/main`, versions from the registry). Rule: must the mirror track the published
release (how — a tag, a version-derived ref, a packument field?), or does the
publish-dependency-first ordering rule (already stated in the row) remain the standing answer
with the row kept or reworded? Name the mechanism cost of each option.

### S6. Settings vendoring (B12)

F2: `.claude/settings.json` is content-owned via `HOST_PATHS`
(`scaffold/src/core/constants.ts:132`), so `repair` restores vendored bytes; operator grants
live in `settings.local.json`. Rule: vendor for existence rather than bytes, keep bytes, or
another shape? Weigh the operator-grant loss the orchestration file already warns about.

### S7. The order-gating marker row

ROADMAP: "the ungated-orders survey ... reopens when hardening scaffold's order gating." Rule
the row's disposition — it is a trigger marker, not scheduled work.

### S8. The `agents/openai.yaml` research trigger row

Same shape: research the full schema when a consumer needs more than three keys. Rule the
disposition.

### S9. w3 (B15)

Recovered: commit `f9a70eb` ("W3: gate the skill family so no skill ships missing its files")
shipped the skill-family gate now at `scaffold/tests/setupPolicy.ts:1173-1326`, and its commit
message records the real-tree red proof run to completion (remove one skill's
`agents/openai.yaml` → exactly one named test red → restore → green). The Orchestrator will
re-run that exact red proof on this host. Rule: given a green re-proof, the row's disposition.

### S10. The honest-form sweeps row

Three sweeps stay review-owned because every mechanical form tried flagged healthy references.
Rule the disposition: keep as is, reword, or convert any sweep into a unit if a lane can name a
mechanical form that does not red healthy references (do not invent one speculatively — name it
only if you can state its membership rule and its negative control).

### S11. The setTimeout-sweep scope

F3's inventory: middleware's tests never import `waitForDelay` and carry inline promise-waits;
browser has one test wait plus condition-polls in `setupServer.ts`; workflow has one wait and
one fixture timer that is the subject's own input; queue's timers are handler behaviour under
test; router has one socket-sequencing site; agent has none. Rule the sweep's boundary: which
site classes convert to `waitForDelay`, which become `waitForCondition` call sites (after test
0.0.8 ships it), and which stay because the timer is the subject's behaviour. The rule must be
statable as a membership test a mechanical unit can apply.

### S12. The mcp `createTeardown` mismatch

F3: mcp's local helper is a generic `track`-with-dispose registrar wired to `afterEach`
(`mcp/tests/setupServer.ts:459-471`); the published `createTeardown()` is an `add`/`destroy`
list (`test/src/core/factories.ts:100-123`); same name, different contract. Rule: (a) rewrite
mcp's call sites onto the published contract; (b) widen the published `createTeardown` in
0.0.8 (how, without breaking its contract and its consumers); or (c) another shape. Name what
each costs mcp's suites and test's 0.0.8 surface. A design round for test 0.0.8's surface is
reconciling separately; state your ruling so it can join that reconciliation.

## Output

Per subject: `Ruling` (invariant, constraint, consumer obligation), `Units` (role AND engine,
ownership, acceptance criteria) where work follows, `Row` (the ROADMAP disposition with exact
replacement wording where kept), `Evidence` (file:line). Then `Tensions` and `Risks` as usual.

## Deviation contract

Read-only. Report file:line mismatches as findings and continue.
