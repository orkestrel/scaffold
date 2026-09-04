# Report — scaffold-rule-asconst

## Sentence

Before, `.claude/rules/typescript.md:29-32`:

```
- `as const` annotates a literal with its own type and never overrides the checker, so the assertion
  ban does not reach it. Use it to derive a literal union from a value and to fix a tuple's arity and
  element types. Do not write it on a value whose contract is already declared; annotate the
  declaration instead.
```

After, `.claude/rules/typescript.md:29-35`:

```
- `as const` annotates a literal with its own type and never overrides the checker, so the assertion
  ban does not reach it. Use it to derive a literal union from a value and to fix a tuple's arity and
  element types. Do not write it on a value whose contract is already declared; annotate the
  declaration instead. A class field that holds one literal keeps `as const`
  (`readonly code = 'ABORT' as const`): the vendored lint gate's `prefer-as-const` rule refuses the
  annotated form, and a field whose type is a union of literals is annotated as the preceding
  sentence states.
```

## `host.json` delta

`git diff --stat`:

```
 .claude/rules/typescript.md | 5 ++++-
 host.json                   | 4 ++--
 2 files changed, 6 insertions(+), 3 deletions(-)
```

`host.json` changed for the one storage entry `claude/rules/typescript.md` alone (updated content
digest and byte count), regenerated through `npm run build` (`build:inventory`). No other file
changed.

## Gate exit codes

| Gate | Exit code |
| --- | --- |
| `npm run format:check` | 0 |
| `npm run lint:check` | 0 |
| `npm run check` | 0 |
| `npm run build` | 0 |
| `npm test` | 0 |
