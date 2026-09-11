# Scaffold post-refusal assertion proof

## Outcome

Done within the saved assertion-only scope. The collector test now sends the unterminated fragment
`ignored` after the inventory refusal and asserts that `pending` remains `['']`. Every preceding
assertion remains present.

The only final changed path from this continuation is:

- `tests/src/bin/helpers.test.ts`

Production was changed only for the temporary negative control and then restored identically.
`src/bin/helpers.ts` had object hash `03f55031354f68b222cc9de8cce14d04db0640cf` before the control
and has the same object hash after restoration.

## Mutation control

Exact named command:

```text
node_modules/.bin/vitest.cmd run --config vite.config.ts --no-cache --reporter=dot --project src:bin tests/src/bin/helpers.test.ts -t "refuses the record beyond the inventory boundary and ignores later input"
```

The case passed before mutation. I then removed only this production line:

```ts
if (controller.signal.aborted) return
```

Negative-control result:

```text
exit: 1
Test Files  1 failed (1)
Tests  1 failed | 114 skipped (115)
expected [ 'ignored' ] to strictly equal [ '' ]
```

I restored the production line with `apply_patch` and reran the identical command:

```text
exit: 0
Test Files  1 passed (1)
Tests  1 passed | 114 skipped (115)
```

The mutation reaches the post-refusal call and changes only `pending`, so this assertion now
distinguishes the early aborted return from processing that later input.

## Scoped checks

```text
node_modules/.bin/oxfmt.cmd --config .oxfmtrc.json --check tests/src/bin/helpers.test.ts
exit: 0
All matched files use the correct format.
```

```text
node_modules/.bin/oxlint.cmd --config .oxlintrc.json --deny-warnings tests/src/bin/helpers.test.ts
exit: 0
```

```text
git diff --check -- src/bin/helpers.ts tests/src/bin/helpers.test.ts
exit: 0
```

## Scope

No full suite, build, install, metadata edit, generated write, commit, ref, push, or publication ran.
Root's completed release run and all sibling work were preserved. No deviation occurred. Independent
review remains limited to this assertion finding.
