# Audit verdict — unit W2, the generated distribution proof

Two lanes ran on one brief at commit `4f3aa61`, in clean contexts, blind to each other. A mechanical
conformance lane carried the letter of `AGENTS.md`, the applicable rules, scope honesty, and guide
parity. An executing lane carried the claims only a run can settle. The Codex bench stayed dark, so
both ran on Opus 5; `.orkestrel/campaign/routing-v50b.md` records the substitution.

The executing lane established its own subject rather than trusting the unit's: it compiled
`src/core` from the committed tree, dumped the planned artifact, and proved it byte-identical to the
three scratch workspaces and to a workspace it generated itself.

## Claim verdicts

Every claim **survives**. The mechanical lane recorded three claims untested for want of an executed
command, and the executing lane settled all three.

The deleted field is absent from the contract and from every code path, with `blueprint.src.length >
0` as the replacement. A plan for a publishing blueprint carries exactly one proof artifact at
presence and template; a plan for an application-only blueprint carries none. This repository's own
bespoke proof hashes identically before and after the commit and still passes. Selection reads the
export target and no rule anywhere keys the browser branch on a subpath name. The declaration
locator resolves a flat root entry and a condition-nested one through the same function. The launch
is attempted and its rejection classified across all four provider-option shapes. Release mode fails
where a non-release run skips, for an unreachable registry and an unlaunchable browser alike. The
proof emits no package name, no export name, and no tally of the published surface. It passes
`format:check`, `lint:check`, and `check` inside generated workspaces rather than only in this
repository. It introduces no stub, TODO, skipped test, or deferred logic. The three edits outside
the brief's owned list are pure deletions, zero insertions each. It imports nothing from any
`@orkestrel` package, so the `test` package needs no branch.

## The one disputed verdict, and the ruling

The mechanical lane returned `FAIL` on the claim that the proof emits no count of any set, naming
`expect(stage.archives).toHaveLength(1)` and `expect(stage.entries.length).toBeGreaterThan(0)`. It
then recorded that the claim survives under the growable-set reading and declined to narrow the
claim silently. The executing lane disclosed the same two lines and took the substantive reading.

**Ruled: the claim survives.** `npm pack` produces exactly one archive, so the first is a structural
invariant the test exists to pin rather than a tally of a set anyone can add to. The second is the
anti-vacuity floor `.claude/rules/tests.md` § Discovery requires, so an empty population fails
instead of passing. The count ban lives under `AGENTS.md` § Writing and governs prose; reading it
onto a cardinality assertion over a fixed set would also condemn `expect(existsSync(…)).toBe(true)`.
Neither line names a number that moves as the published surface moves, which is the property the
claim asserts.

The lane was right to raise it and right to refuse to narrow the claim for the unit. The verdict is
overturned; the work is not.

## Findings outside the claim set, and their disposition

**Carried to the fix round, `.orkestrel/campaign/unit-w3-brief.md`.** Each verified by the
Orchestrator against the committed source.

- A TSDoc prose line of 138 characters at `src/core/compilers.ts:278`, against a `printWidth` of
  100. oxfmt does not reflow comments, so no gate can see it. Before this commit the file carried no
  breakable prose line over the limit.
- `const STAGED = STAGE === undefined` at `src/core/templates.ts:1391` names a boolean for the
  negation of its value, so `it.skipIf(STAGED)` reads "skip if staged" and means the opposite.
  `.claude/rules/names.md` requires a boolean to read as an assertion, and this text ships into every
  publishing workspace in the fleet.
- `afterAll` registers after the module-scope release throw and after `buildStage()`, so the scratch
  directory survives whenever either throws. Demonstrated by a growing count of leaked
  `/tmp/distribution-*` trees, each holding the npm cache the run created.
- Of the stage-gated tests, only the first cites `[requires the registry]`; the rest skip silently,
  where the browser branch passes its cause into `context.skip`.

**Carried to the guide-parity unit.** Both lanes found guide drift, and the mechanical lane found
more of it than the unit's own report named. The drift is not stale rows: `guides/scaffold.md:1337`
states that scaffold emits no proof into any registered project and that the file a consumer writes
is the file that selects the project, and `:850` lists the distribution proof among files the
consumer adds to select a project. Both describe a model the implementation no longer follows.
`:686`, `:710`, and `:858` carry the deleted flag. `npm run test:guides` passes over all of it,
because that proof checks symbol coverage and links rather than prose, so nothing downstream will
catch it.

That passage states the very policy that decided the setup half against a generated proof, so the
rewrite must draw the line the reconciliation drew: a distribution proof's assertions derive from
the installed artifact, while a guide, conformance, service, or setup proof's do not.

**Recorded and not carried.** A flat export entry declaring `default` before `types` resolves to the
JavaScript file and the entry is dropped. That is the declaration-order semantics Node and
TypeScript define, which the locator's own header comment states it implements, and such a map is
malformed under the `types`-first rule. No change.

VERDICT: PASS, with four findings carried to a fix round and the guide drift carried to the parity
unit.
