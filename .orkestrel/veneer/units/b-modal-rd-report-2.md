# RAMP-DOWN (`rd`) round 2 report

## Outcome

R-a, R-b, and R-c are closed, and no deviation stopped the round. The fixture case reads the named
ramp specimens across each boundary, and the `breakpoint-up` mutation turns it red. The comment on
the `breakpoint-each-down` mixin and the comment on the bare offcanvas panel state the order
reason. The built stylesheet is byte-equal to the `rd-base.css` file. The `npm run test:guides`
command exits 0 against the patched guide. The shared patch is unchanged: the `rd-shared.patch` file
from round 1 stands, and no `rd-shared-2.patch` file exists.

## R-a: the fixture case pins the direction

The `tests/src/styles/mixins.test.ts` case
`breakpoint mixins > walks the ramp down, emitting the zero entry unwrapped and each named entry below its own boundary`
keeps its selector, condition-width, and yielded-boundary assertions and its zero-entry control.
It adds a viewport reading, the method the sibling case uses:

- For each named entry, the case finds the `BREAKPOINT_CASES` row whose boundary equals the width
  the entry's token resolves to.
- It mounts a `.vn-fixture-ramp-{name}` specimen for that entry.
- Through the `visitBreakpoint` helper, it reads the specimen's top padding and the unsuffixed
  specimen's top padding at the row's readings below, at, and above the boundary.
- The named specimen must read `1px` below the boundary and `0px` at and above it. The unsuffixed
  specimen must read `1px` at every reading.

The case callback is async. The added code follows, abridged: the comment lines starting `Mounts` and `A reading` summarize the lines the fence omits.

```ts
// The emitted width carries no direction, so the named specimens are read below, at, and above
// each boundary the suite's own case table drives: a named entry applies below its boundary
// alone, and the unsuffixed specimen applies at every reading.
const driven = readings.flatMap(({ name, width }) =>
	width === 0
		? []
		: [
				{
					name,
					width,
					entry: requireValue(
						BREAKPOINT_CASES.find((candidate) => candidate.boundary === width),
						`No boundary case drives ${name} at ${String(width)}`,
					),
				},
			],
)
expect(driven.map(({ name }) => name)).toEqual(names.filter((name) => name !== 'xs'))
// Mounts one `.vn-fixture-ramp-{name}` specimen per driven entry, then for each reading:
const applied = await visitBreakpoint(reading, () => ({
	named: readPixels(specimen, 'padding-top'),
	bare: readPixels(bare, 'padding-top'),
}))
const expected = { named: reading < width ? 1 : 0, bare: 1 }
// A reading that differs from the expected one is pushed onto the drift list, and the case
// ends with the `expect(drift).toEqual([])` assertion.
```

### Red and green runs

Each of the following runs used the `npm run test:src:styles -- tests/src/styles/mixins.test.ts` command.

- **The `breakpoint-up` mutation** (`.orkestrel/veneer/units/rd-instruments/rd-mutation-2.patch` file, log in the
  `.orkestrel/veneer/units/rd-instruments/rd-mutation-2.log.txt` file). The mixin's named entries go through the
  `breakpoint-up($name)` call in place of the `breakpoint-down($name)` call, with the zero branch
  intact.
  - Exit 1, result line `Tests  1 failed | 13 passed (14)`.
  - The named case fails at the drift assertion with
    `AssertionError: expected [ [ 'sm', 575, …(2) ], …(14) ] to deeply equal []`.
  - The first drift entry shows the `sm` specimen reading `named: 0` at the `575` reading, where
    the case expects `named: 1`.
- **The zero-branch control, rerun against the revised case** (`.orkestrel/veneer/units/rd-instruments/rd-mutation-zero-2.patch`
  file, log in the `.orkestrel/veneer/units/rd-instruments/rd-mutation-zero-2.log.txt` file).
  - Exit 1, result line `Tests  1 failed | 13 passed (14)`.
  - Failure line:
    `AssertionError: expected [ [ 'xs', [] ], [ 'sm', …(1) ], …(4) ] to deeply equal [ [ 'xs', [ { …(2) } ] ], …(5) ]`.
- **Green, before either mutation** (`.orkestrel/veneer/units/rd-instruments/rd-mixins-green-2.log.txt` file). Exit 0, result
  line `Tests  14 passed (14)`.

Each mutation was undone from a copy of the `src/styles/_mixins.scss` file taken before the edit.
The `cmp` command, run against that copy, exited 0 before the gates ran.

## R-b: the order reason in each comment

The `src/styles/_mixins.scss` comment on the `breakpoint-each-down` mixin.

Round 1:

```scss
// Each named entry applies below its own boundary, through the `breakpoint-down` mixin. No viewport
// is below the zero boundary, so that mixin emits nothing there; this mixin emits the zero entry
// unwrapped instead, as the unsuffixed rule set every viewport receives. A caller that ships a bare
// class and its narrowed siblings therefore writes their rule set once.
```

Round 2:

```scss
// The zero entry comes first, ahead of the named entries, and emits unwrapped as the unsuffixed
// rule set every viewport receives; the `breakpoint-down` mixin emits nothing at the zero
// boundary, because no viewport is below it. Each named entry follows in ramp order, below its own
// boundary, through the `breakpoint-down` mixin. A family whose unsuffixed class comes ahead of its
// narrowed siblings therefore writes their rule set once through this mixin.
```

The `src/styles/components/_offcanvas.scss` comment on the bare `.offcanvas` rule set.

Base (42fd88e):

```scss
// The bare panel is fixed at every width. The `breakpoint-down` mixin emits nothing at the zero
// boundary, so the walk cannot write these unconditioned rules, and they are written here from
// the same maps.
```

Round 2:

```scss
// The bare panel is fixed at every width. The partial keeps its own walk rather than the
// `breakpoint-each-down` mixin, because the release writes each responsive panel's below-boundary
// and at-and-above blocks together, one name at a time, and writes the bare panel after all of
// them. That mixin emits its zero entry first and places no at-and-above block between its named
// entries, so it cannot reproduce that order. The bare panel is written here from the same maps.
```

The comment edits change no Sass statement, and the `cmp` command in the gate chain exits 0.

## R-c: the guide gate with the shared patch applied

The unit built a scratch copy of the worktree's tracked files at their working-tree bytes under
the worktree's ignored `tmp/probe/` directory, with the worktree's `node_modules` directory linked
into it. It applied the `.orkestrel/veneer/units/rd-shared.patch` file with the `patch -p1` command and ran
`npm run test:guides` there. The `tests/guides.test.ts` file resolves its root from its own
location, so the run reads the copy's patched guide. The copy is scratch and is not retained; the
header of the `.orkestrel/veneer/units/rd-instruments/rd-guides-2.log.txt` file records how to rebuild it.

- The `patch` command reported `patching file guides/veneer.md` and exited 0.
- The `npm run test:guides` command exited 0, with result line `Tests  19 passed (19)`.
- The log is the `.orkestrel/veneer/units/rd-instruments/rd-guides-2.log.txt` file.

## Gates

The `.orkestrel/veneer/units/rd-instruments/rd-gates-2.sh` script ran the chain from the worktree root, with the npm 11 `PATH`
entry and `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`. It is a copy of the round-1
`rd-gates.sh` script whose log names carry the `-2` suffix. Each gate's log is the
`.orkestrel/veneer/units/rd-instruments/rd-gate-<gate>-2.log.txt` file, and the exit summary is the
`.orkestrel/veneer/units/rd-instruments/rd-gates-2.log.txt` file. Each result line in the following table is copied from the gate's log, with
its color codes stripped.

| Command                                                                                                                                                                                        | Exit | Result line from the log                                                           |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- | ---------------------------------------------------------------------------------- |
| `npm run format:check`                                                                                                                                                                         | 0    | `All matched files use the correct format.`                                        |
| `npm run lint:check`                                                                                                                                                                           | 0    | none; the log ends at the `oxlint --config .oxlintrc.json --deny-warnings .` echo |
| `npm run check`                                                                                                                                                                                | 0    | none; the log ends at the `vue-tsc --noEmit -p configs/app/tsconfig.browser.json` echo |
| `npm run build:src`                                                                                                                                                                            | 0    | `✓ built in 1.58s`                                                                 |
| `cmp .orkestrel/veneer/units/rd-instruments/rd-base.css dist/src/styles/index.css`                                                                                                                                          | 0    | none; the `cmp` command prints nothing on equal files                              |
| `npm run test:src:styles -- tests/src/styles/mixins.test.ts tests/src/styles/components/modal.test.ts tests/src/styles/components/table.test.ts tests/src/styles/components/offcanvas.test.ts` | 0    | `Tests  114 passed (114)`                                                          |
| `npm run test:conformance`                                                                                                                                                                     | 0    | `Tests  22 passed (22)`                                                            |
| `npm run test:guides` (worktree, unpatched guide)                                                                                                                                              | 0    | `Tests  19 passed (19)`                                                            |

The `git diff --check` command exits 0.

## Scope

The round touched the `src/styles/_mixins.scss` file (the mixin's comment), the
`src/styles/components/_offcanvas.scss` file (the comment on the bare panel alone), and the
`tests/src/styles/mixins.test.ts` file (the fixture case). The `rd-2-status.txt` file lists the
unit's cumulative worktree status, and the `rd-2.diff` file holds the cumulative diff against
42fd88e. The `_offcanvas.scss` hunk in that diff changes comment lines and nothing else.

## Retained files

The Orchestrator retained these files: this report as `.orkestrel/veneer/units/b-modal-rd-report-2.md`,
the diff and status beside it, and every other file under `.orkestrel/veneer/units/rd-instruments/`.
The shared patch stands as `.orkestrel/veneer/units/rd-shared.patch`.
- `rd-report-2.md`
- `rd-2.diff`
- `rd-2-status.txt`
- `rd-mutation-2.patch` and `rd-mutation-2.log.txt`
- `rd-mutation-zero-2.patch` and `rd-mutation-zero-2.log.txt`
- `rd-mixins-green-2.log.txt`
- `rd-guides-2.log.txt`
- `rd-gates-2.sh` and `rd-gates-2.log.txt`
- the `rd-gate-<gate>-2.log.txt` logs
- `rd-base.css`
- `rd-shared.patch`, unchanged from round 1

Nothing was committed.
