import io, sys
p = 'guides/program.md'
s = io.open(p, encoding='utf-8').read()

old_start = s.index('> A synchronous, deterministic **program engine**.')
old_end = s.index('## Surface')
old = s[old_start:old_end]

new = """> The program composition layer: a pure, JSON-serializable `ProgramDefinition`
> that composes one qualification with an optional rating, plus notices,
> authority, and batch aggregate policy, and a `Program` that executes them in
> one direction — qualify, select, rate, derive status, then authorize.

Qualification decides whether rating happens: a globally ineligible, referred, or
failed subject never reaches the rater, and scoped ineligibility removes only the
matching line before the first rating call. Omitting `rating` authors a
first-class eligibility-only program — the rater is never invoked, an eligible
subject resolves to `'eligible'` (or `'conditional'` under an applied condition),
and status is never `'unrated'`; an authored rating with zero lines still yields
`'unrated'`, unchanged. The rater always receives the original subject;
qualification and aggregate working projections stay private to orchestration.

`Program` performs no reasoning arithmetic. It owns orchestration and business
outcomes — notices, authority, status, decisions, and batch aggregates — while
delegating eligibility to `Qualifier`, amounts and worksheets to `Rater`, and
logical or quantitative mechanics to the shared `@orkestrel/reason` engine behind
them. Every output is a fresh `ProgramResult` or `AggregateResult` carrying the
nested qualification and rating evidence, program determinations, trace, errors,
status, and optional decision. `Program` either receives injected qualifier,
rater, and engine instances (never destroyed by `Program`) or creates and owns
one shared quantitative-plus-logical engine (`bail: false`), destroyed in
`destroy()`. Every `execute` call fires through `Program`'s typed `emitter`.
Source: [`src/core`](../src/core). Surfaced through the `@src/core` barrel.

"""
s = s[:old_start] + new + s[old_end:]
io.open(p, 'w', encoding='utf-8').write(s)
print('tagline and opening prose replaced')
