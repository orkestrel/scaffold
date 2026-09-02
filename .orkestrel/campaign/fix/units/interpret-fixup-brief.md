# Unit interpret-fixup — close the interpret unit's audit findings

## Role and engine

`implementer` on Claude Opus 5, a native subagent (the Sol bench is dark; the substitution is
recorded). You perform the assignment directly and spawn nothing.

## Objective

`@orkestrel/interpret` at commit `8c00711` names the registry act `add` everywhere it names it,
documents the `{field}.{index}` binding in the guide with the reach the code earns, and closes
the prose, fixture, link, and import-order residue the audit lanes named.

## Context

**Findings, each with its ruling.** Apply in this order.

1. **Objective F1 and subjective R1 — two words for one act.** `guides/interpret.md:759-761`,
   `:791`, `:804-806`, `:819`, `:831-833`, `:855` say "is registered", "ONE registered template
   record", "every registered record" while `:914-915` say "ONE added template". The runtime
   message at `src/core/Interpret.ts:402` reads `'No registered template matched the classified
   intent'`; `tests/src/core/factories.test.ts:79` and the TSDoc at `src/core/Interpret.ts:52,370`,
   `src/core/helpers.ts:387,661,669`, `src/core/types.ts:8,52,149` carry the same word. Ruling:
   the act is `add` — write "added" for the act (`has` reads "Whether a template with the given id
   has been added", the accessors read "ONE added template record" and "ALL added template
   records", the message reads `'No added template matched the classified intent'`), and keep
   `registry` only as the noun for the collection. Sweep `register`, `registered`, `registering`,
   `registers` case-insensitively over `src`, `tests`, `guides/interpret.md`, `README.md` and
   classify every hit: the act moves, the collection noun stays.
2. **Objective F2, subjective R2 and R3 — the `{field}.{index}` binding is claimed wider than it
   ships and has no guide home.** `src/core/types.ts:102-104` and
   `src/core/stages/Clarifier.ts:38-41` say the index binding "is how a template author declares
   an aggregate over collected numbers", but `resolveExpression` returns `undefined` for any
   unbound variable, so a computation reaches only an array whose length the author already
   knows. `guides/interpret.md` never mentions the convention. Ruling (the convention is accepted
   for this wave as ruled surface): both TSDoc passages state that a computation can address one
   numeric element of an array-valued field as `{field}.{index}`, so an aggregate over a collection
   of KNOWN length is declarable, and a collection whose length varies per turn has no declarable
   aggregate; drop the unqualified sentence. The `ComputedField` row at `guides/interpret.md:79`
   and the `clarify` row at `:567` name the binding and that limit, and the `ClarifierInterface`
   section carries one fence declaring a computation over `value.0` and `value.1` — the worked
   replacement for the deleted aggregate fields, with the limit stated in a comment.
3. **Objective F5 — binding-key collision.** `src/core/stages/Clarifier.ts:156-176` writes
   `bindings[`${field}.${index}`]`, and a scalar entity whose mapping is the `FieldPath`
   `['value', '0']` formats to the same key; the last writer in the entity loop wins. Ruling: no
   behavior change; state the precedence in the `ComputedField` remark and in the Clarifier
   method comment, in one sentence each.
4. **Objective F3 — the owned-context half has no public observer.** `guides/interpret.md:906-907`
   and `:918`, and `src/core/types.ts:826-829`, state that `destroy()` tears down the context the
   orchestrator constructed itself; the limit lives only in a comment at
   `tests/src/core/Interpret.test.ts:367-371`. Ruling: keep the behavior sentence and add, in the
   guide's `InterpretInterface` prose near `:906`, that a caller observes only the
   supplied-context half because the orchestrator exposes no context accessor.
5. **Subjective R4 — the `RecordOptions` sentence.** `src/core/types.ts:599` reads "Per-call
   options for the record every manager's `add` method holds", repeated at
   `guides/interpret.md:118`. Ruling: "Per-call options for the record a manager's `add` mints."
   in both places; `since` at `types.ts:605` is causal and takes `because`.
6. **Subjective R5 — a fixture models the abolished shape.**
   `tests/src/core/validators.test.ts:536` builds `intent: { action: '', domain: '', confidence: 0 }`.
   Ruling: `intent: { confidence: 0 }`.
7. **Objective F4 and subjective R6 — the README link.** `README.md:76` links
   `guides/src/interpret.md`. Ruling: `[`guides/interpret.md`](guides/interpret.md)`.
8. **Subjective R7 — unsorted import lists.** `tests/src/core/helpers.test.ts:1-8`,
   `tests/setup.test.ts:18-28`, `tests/src/core/Interpret.test.ts:11-18`. Ruling: sort each list
   alphabetically as the package's other lists are.

Recorded, no change: the two unledgered removals (`INVALID_TEMPLATE`, `deriveAggregateField`)
are accepted and carried in `breaking-radius.json` by the Orchestrator; the private `-1`
accumulators at `src/core/helpers.ts:274,323,686` are outside s12-30; `InterpretEventMap`
publishing `add` without `remove` is a shape row for the next change; the two statements at
`src/core/Interpret.ts:336-337` are overload-forced; `narrator` naming data on
`InterpretOptions` and an instance on the stage options is coherent as ruled; the capability gap
for variable-length aggregates is accepted for this wave with finding 2's honest prose.

**Law.** `AGENTS.md`; `.claude/rules/names.md`; `.claude/rules/documentation.md` § Parity;
`.claude/rules/typescript.md` (TSDoc third-person form where you touch a block);
`.claude/rules/tests.md`; `.claude/rules/writing.md`. Read the copies under
`node_modules/@orkestrel/scaffold/dist/host/claude/rules/` if the checkout's `.claude/rules/`
differs.

**Host.** Linux, bash. Repository `/home/user/fleet/interpret` at commit `8c00711`, branch
`claude/orkestrel-npm-audit-deps-14ibta`, committed clean at launch, `node_modules` installed with
the closure staged. Do not run `npm install`. Other gate chains run on this host concurrently; if
`npm test` fails on a timing-suspect test, re-run `npm run test:src` once and report both
readings. Build a throwaway probe, if you need one, under the system temporary directory, never
under the checkout's `tmp/`.

**Standing conditions.** `tests/guides.test.ts` resolves fence imports and executes no fence, so a
new guide fence must still typecheck by eye against the surface it names.

## Unknowns

none.

## Scope

**Owned.** `src/core/types.ts`, `src/core/Interpret.ts`, `src/core/helpers.ts`,
`src/core/stages/Clarifier.ts`, `guides/interpret.md`, `README.md`, `tests/setup.test.ts`,
`tests/src/core/helpers.test.ts`, `tests/src/core/Interpret.test.ts`,
`tests/src/core/factories.test.ts`, `tests/src/core/validators.test.ts`, and any test whose title
or message assertion the `registered → added` message change makes false — each only at the
sites the findings name or the change makes false.

**Off-limits.** `package.json`, `package-lock.json`, `tests/setupPolicy.ts`,
`tests/policy.test.ts`, `.claude/**`, `configs/**`, every vendored guide mirror, every other file,
every other checkout.

**Tools and limits.** Read, Grep, Glob, Edit, Bash. No commit, stage, push, install, or discarding
`git` command (`git checkout`, `git restore`, `git stash`, `git reset`, `git clean`). Tree-wide
`format` only to converge after `npm run lint`; then the non-mutating chain.

## Execution

A native subagent: perform the assignment directly and spawn nothing. Apply the findings in
order, run the sweep finding 1 names plus a case-insensitive sweep for `aggregate over collected`,
`since`, and `guides/src/` over the same paths, classifying every hit, then run:

```text
npm run format:check && npm run lint:check && npm run check && npm run build && npm test
```

## Output

Return, as data: per finding — closed, with the file and line of the change, or stopped with the
deviation; the sweep and every hit classified (act moved or collection noun kept); each gate
command with its exit code and an excerpt for any failure; `git diff --stat`;
`git status --short`.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short
hypothesis — when the message change reddens a test outside the owned set, or when a gate fails
for a cause you cannot attribute after the re-run. Decide, record, and carry on from the wording
of a sentence or the placement of a fence.

## Acceptance criteria

1. `rg -n -i 'registered|registering|registers' src tests guides/interpret.md README.md` returns
   no hit naming the act; every surviving `registry` hit names the collection.
2. `rg -n 'aggregate over collected' src guides/interpret.md` returns no hit;
   `rg -n '\{field\}\.\{index\}|value\.0' guides/interpret.md` returns the `ComputedField` row, the
   `clarify` row, and the fence.
3. The `RecordOptions` sentence, the fixture, the README link, and the three import lists read as
   ruled.
4. The gate chain exits 0.
5. `git status --short` lists only owned files.
