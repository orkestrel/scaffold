# SFIX-B report

## Result

Stopped under the deviation contract. The requested full `BASE_DEV_DEPENDENCIES` comparison cannot pass within the owned fields.

Expected: widening `tests/src/core/constants.test.ts` beyond `@orkestrel/*` keys would expose only the stated `oxfmt` divergence, which the owned `oxfmt` fields could close.

Found: the widened comparison would also expose `oxlint`, `vite`, and `vitest` divergence. The brief makes those fields in `src/core/constants.ts` and `package.json` off-limits.

Done: no owned product file changed. This report records the blocking evidence.

Not done: G1–G6, T1, T2, the mutation proof, and the acceptance gates remain open because the brief requires an immediate stop on this conflict.

Hypothesis: the brief predates manifest-only `oxlint`, `vite`, and `vitest` range changes.

## Files touched

- `tmp/codex/sfixb-report.md` records the required deviation report.

No owned product file changed.

## Evidence

The following read-only command exited `0`:

```sh
git rev-parse --short HEAD
git status --short
node -e "import('./src/core/constants.ts').then(({BASE_DEV_DEPENDENCIES})=>{const declared=require('./package.json').devDependencies; for (const [name,range] of Object.entries(BASE_DEV_DEPENDENCIES)) { if (name === '@orkestrel/scaffold') continue; if (declared[name] !== undefined && declared[name] !== range) console.log(name+': base '+range+', manifest '+declared[name]) }})"
```

Output:

```text
ee886cf
oxfmt: base ^0.62.0, manifest ^0.64.0
oxlint: base ^1.77.0, manifest ^1.79.0
vite: base ~8.2.0, manifest ~8.2.1
vitest: base ^4.1.10, manifest ^4.1.11
```

The empty line after `ee886cf` is the clean `git status --short` output.

## G3 reproduction

Not run. The deviation contract stopped the unit before any mutation under `tmp/`, so there are no G3 commands or outputs to report.

## Rulings

### G1

Not ruled. The unit stopped before making or validating the guide wording change.

### T1 `oxfmt` direction

Not ruled. Aligning only `oxfmt` cannot make the required full comparison pass while the listed `oxlint`, `vite`, and `vitest` ranges remain out of scope.

### T2

Not ruled. The unit stopped before evaluating or changing executable fence coverage.

## Plant and removal

Not run. No divergence was planted, and no product edit needed removal.

## Acceptance evidence

- G3 reproduction: not run; no exit code or test reading.
- Planted comparison failure and restored pass: not run; no exit code or test reading.
- `BASE_DEV_DEPENDENCIES.oxfmt` and manifest range print: not run; no exit code.
- `npm run lint:check`: not run; no exit code.
- `npm run check`: not run; no exit code.
- `npx vitest run --config vite.config.ts --project src:core`: not run; no exit code or test reading.
- `npx vitest run --config vite.config.ts --project guides`: not run; no exit code or test reading.

## Observations

No sandbox reading was denied.

## Unclosed work

The objective cannot close until the scope either permits alignment of the `oxlint`, `vite`, and `vitest` ranges or specifies a comparison population that excludes them without contradicting the requirement to cover every `BASE_DEV_DEPENDENCIES` key.