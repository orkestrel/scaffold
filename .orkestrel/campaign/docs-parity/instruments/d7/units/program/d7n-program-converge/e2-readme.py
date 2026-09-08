import io
p = 'README.md'
s = io.open(p, encoding='utf-8').read()
start = s.index('A **program composition layer** over')
end = s.index('## Install')
new = """> The program composition layer: a pure, JSON-serializable `ProgramDefinition`
> that composes one qualification with an optional rating, plus notices,
> authority, and batch aggregate policy, and a `Program` that executes them in
> one direction — qualify, select, rate, derive status, then authorize.

Build a definition with the `buildProgramDefinition` function, compile it with
`createProgram`, and call `execute` with one subject for a `ProgramResult` or
with a subject array for an `AggregateResult`. Execution never mutates its
inputs; every result is a fresh object. Injected qualifier, rater, and reason
instances stay caller-owned, and a standalone program owns the engine it creates.
Built over [`@orkestrel/qualifier`](https://github.com/orkestrel/qualifier),
[`@orkestrel/rater`](https://github.com/orkestrel/rater), and the shared
[`@orkestrel/reason`](https://github.com/orkestrel/reason) engine.
Environment-agnostic — no I/O, no browser or server assumptions. Part of the
`@orkestrel` line.

"""
s = s[:start] + new + s[end:]
io.open(p, 'w', encoding='utf-8').write(s)
print('README pitch replaced')
