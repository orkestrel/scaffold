# Program dependent documentation fix report

Program's retained documentation findings are closed in the owned scope. The native Guide entry
now drives checking and explicit rewrites from `tests/guides.test.ts`. Runtime code, public type declarations,
existing assertion values, package metadata, lockfiles, and vendored files did not change.

## Audit mapping

- **PF1 â€” constants.** `guides/program.md` now gives `DEFAULT_PROGRAM_VALIDATE` the `boolean`
  `Shape`, and gives `AGGREGATE_KEY` and `OUTCOME_KEY` the `string` `Shape`. Their summaries retain
  the runtime literals.
- **PF2 â€” execution characterization.** The opening guide prose now states that `Program`
  executes synchronously and deterministically, with the same definition and subject producing the
  same result.
- **PF3 â€” emphasis.** `OMITTED` became `omitted` in the guide. Emphasis capitals became ordinary
  prose in `src/core/types.ts`, `src/core/helpers.ts`, `src/core/programs/Program.ts`, and
  `src/core/programs/ProgramManager.ts`. Acronyms, exported constants, error codes, and code
  literals remain unchanged.
- **PF4 â€” guard convention.** The validators table now carries only: "In a guard table a `Shape`
  cell holds the type the guard narrows to."
- **PF5 â€” native entry and header.** The header matches the current Abort pilot. Static imports are
  limited to `GuideCommand`, `readInventory`, and `createVitest`. Source, Vitest, support, and
  flagship runtime imports occur inside the anonymous async registration callback.
- **PF6 â€” fence lead-ins.** The titled factory demonstration and the Patterns fences now have a
  complete lead-in sentence. The heading-to-fence sweep returns no match.
- **PF7 â€” tagline.** The guide and README now say that a `Program` executes the definition and
  ends the sequence with "then decide." Their blockquotes remain equal.
- **PF8 â€” closing sweep.** Constants and guards retain their governed `Shape` columns with no
  empty cell. The function-only, class-only, and mixed error tables do not carry `Shape`, so
  Rulings 26 and 28 add no cell or convention sentence there. No `{@link Owner#member}` or
  `{@link #member}` site exists. The README's `Install` and `Usage` fences remain directly under
  their headings.

## Native entry and assertion preservation

The entry keeps `FENCE_LANGUAGES`, `EXAMPLE_LANGUAGE`, `GUIDE_SPEC`, `MODULES`, `INTERNAL`, and the
Program package identity. It retains the manifest population guard; titled-example pin; README
pitch check; fence-language check; direct, barrel, and guide surface comparisons; hidden
declaration check; populated method groups; interface and class method comparisons; drift check;
function and method example checks; encountered self-import checks; relative-link checks; test-link
checks; and the flagship behavior and transcription cases.

The native report supplies only the matching `input`, `pitch`, `fences`, `drift`,
`examples.titles`, and `examples.functions` channels. Declaration, interface/class membership,
method examples, imports, links, and test links continue through the public Guide and Source leaves.
No aggregate `sections`, `declarations`, `imports`, `links`, or `tests` report assertion was added.

## Defect proof

The command inside `tmp/d7n-program-dependent-fix/native.sh` was:

```text
node --experimental-strip-types tests/guides.test.ts
```

Before the entry migration, the command exited `1` in `0.1646253s`:

```text
Error [ERR_MODULE_NOT_FOUND]: Cannot find package '@src/core' imported from
C:\Users\mikes\WebstormProjects\program\tests\guides.test.ts
tests collected: 0
```

After the migration, the same command exited `0`; the final scoped run reported:

```text
Test Files  1 passed (1)
Tests       29 passed (29)
Duration    728ms
```

## Scoped validation

The format write exited `0` in `1.2788864s`:

```text
npx oxfmt --config .oxfmtrc.json --write README.md guides/program.md tests/guides.test.ts src/core/types.ts src/core/helpers.ts src/core/programs/Program.ts src/core/programs/ProgramManager.ts
Finished in 512ms on 7 files using 16 threads.
```

The scoped check script exited `0` in `3.3545359s`:

```text
npx oxfmt --config .oxfmtrc.json --check README.md guides/program.md tests/guides.test.ts src
All matched files use the correct format.
npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts src
Test Files  1 passed (1)
Tests       29 passed (29)
```

The structural sweep exited `0` in `0.414986s`. It found no runtime-token source diff, literal
constant cell named by PF1, `OMITTED` emphasis, stale tagline verb, bare guide fence, empty governed
`Shape` cell, member-link site, header drift, or tagline drift. Its README evidence was:

````text
## Install

```sh
## Usage

```ts
````

The explicit rewrite proof exited `0` in `3.1281706s`. The native entry produced no `wrote` line,
and the owned diff hash stayed fixed through each direction:

```text
diff   0f8ac6254e1547cea7a99e2d58755346c6fa7f14
guide  0f8ac6254e1547cea7a99e2d58755346c6fa7f14
source 0f8ac6254e1547cea7a99e2d58755346c6fa7f14
```

The invoked rewrite commands were:

```text
node --experimental-strip-types tests/guides.test.ts --to guide
node --experimental-strip-types tests/guides.test.ts --to source
```

Root-owned release gates, builds, package-script replacement, metadata, registry pins, installs,
and commits were not run or edited.

## Changed paths

`git status --short` reports:

```text
 M README.md
 M guides/program.md
 M src/core/helpers.ts
 M src/core/programs/Program.ts
 M src/core/programs/ProgramManager.ts
 M src/core/types.ts
 M tests/guides.test.ts
```

`git diff --stat` reports:

```text
README.md                           |   4 +-
guides/program.md                   |  42 ++-
src/core/helpers.ts                 |  18 +-
src/core/programs/Program.ts        |   4 +-
src/core/programs/ProgramManager.ts |   8 +-
src/core/types.ts                   |  10 +-
tests/guides.test.ts                | 561 +++++++++++++++++-------------------
7 files changed, 316 insertions(+), 331 deletions(-)
```

Ignored instruments are under `tmp/d7n-program-dependent-fix/` in Program. Shared-file patches:
none. Deviations: none.
