## New passages

`README.md:10-14`
> Each target carries its own copy of the paths it selects from the vendored set — its licence, its harness permission file, its session-start hooks, its policy register, its policy proof, its policy plugin, its configuration leaf and its proof, its root dotfiles, and the guide mirrors it starts from, never its own guide — and the verbs write them and compare them.

`guides/scaffold.md:16-20`
> `HOST_PATHS` names the vendored set — the licence, the harness permission file, the session-start hooks, the shared policy register, the shared policy proof, the shared policy plugin, the shared configuration leaf and its proof, the byte-identical root dotfiles, and the guide mirrors a generated workspace starts from, never its own guide — and each target carries its own copy of the paths it selects, which the verbs write and compare.

`guides/scaffold.md:1195-1199`
> `HOST_PATHS` is the vendored set, and a target receives a copy of each path it selects: the licence, the harness permission file, the session-start hooks, the shared policy register, the shared policy proof, the shared policy plugin, the shared configuration leaf and its proof, the byte-identical root dotfiles, and the guide mirrors a generated workspace starts from.

`src/core/constants.ts:114-123`
> These are the files the fleet shares verbatim, and each target holds a copy of the paths it selects: the licence, the harness permission file, the session hook scripts, the shared policy register, the byte-identical root dotfiles, and the guide mirrors a generated workspace starts from.

## `awk` readings

`README.md`:
- The `roles, the bench configuration…` and `workspace owns…` hits are permitted em-dash byte inflation.
- The `registry's latest releases…` and `It needs a git repository…` hits predate this unit and are outside Owned.
- The edited sentence produces no hit.

`guides/scaffold.md`:
- The edited passages produce no hit.
- Every reported hit is unchanged outside Owned: formatter-aligned tables, literal examples, code or link tokens, existing prose, or permitted multibyte punctuation.

## `npx oxfmt --check`

- `README.md`: exit 0
- `guides/scaffold.md`: exit 0
- `src/core/constants.ts`: exit 0

## `npm run check`

Exit 0.

## `git status --short`

```text
 M README.md
 M guides/scaffold.md
 M host.json
 M package.json
 M src/bin/helpers.ts
 M src/core/compilers.ts
 M src/core/constants.ts
 M src/core/helpers.ts
 M tests/guides.test.ts
 M tests/src/bin/CLI.test.ts
 M tests/src/bin/helpers.test.ts
 A tests/src/core/factories.test.ts
 M tests/src/server/WriteTransaction.test.ts
 M tests/src/server/helpers.test.ts
?? .orkestrel/campaign/conform/units/l4/program-fix1-sol-result.md
```