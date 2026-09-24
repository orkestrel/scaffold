# RAMP-DOWN (`rd`) report

## Deviation state: stopped on the offcanvas partial

The `breakpoint-each-down` mixin, its fixture case, and the modal and table walks landed, and the
built stylesheet is byte-equal to the one built at 42fd88e. The offcanvas walk did not land. Writing
the bare and responsive panels once through the twin changes the built cascade's rule order, so the
unit stopped there, per the brief's deviation contract.

- **Expected.** The `_offcanvas.scss` partial writes the bare `.offcanvas` panel and the responsive
  `.offcanvas-{name}` panels once through the twin, with `cmp` of the built stylesheet exiting 0.
- **Found.** `cmp` exits 1 (`differ: char 185398, line 1`). The emitted rules are the same set: the
  built output split at each `}` character and sorted is byte-equal to the base, so only the order
  moved. The rules move in the following ways, and the rule-order diff is `.orkestrel/veneer/units/rd-instruments/rd-offcanvas-cascade.diff.txt`.
  1. The bare `.offcanvas` rule set, its reduced-motion rule, its placements, and its states move
     from after the `.offcanvas-xxl` panel to directly after the shared variable rule, because the
     twin emits the zero entry first.
  2. The at-and-above blocks (`@media (width>=576px){.offcanvas-sm…}` through `xxl`) move from
     sitting after each name's below-boundary blocks to one run after every below-boundary block,
     because the twin cannot interleave an up-direction rule into a down-direction walk.
- **The release's own order** (Bootstrap 5.3.8, `node_modules/bootstrap/dist/css/bootstrap.css`,
  from the `.offcanvas, .offcanvas-xxl, …` variable rule onward): the variable rule; then for each
  name from `sm` to `xxl`, the `max-width` panel block, its reduced-motion block, its placement and
  state block, and its `min-width` inline block; then the bare `.offcanvas` rule set, its
  reduced-motion rule, and its placements and states. The base 42fd88e cascade follows that order;
  the probe cascade does not.
- **Done.** The twin, its fixture case, the modal walk, the table walk, and every gate. **Not done.**
  The offcanvas walk; the partial is at its 42fd88e bytes (the probe edit was undone from a copy the
  unit took before editing). Acceptance criterion 4 is therefore unmet for the `_offcanvas.scss`
  partial, whose `$panel` and `$nested` maps are still emitted both unconditioned and inside the
  `breakpoint-down` walk.
- **Hypothesis.** No zero-first walk reproduces the release's offcanvas order, because the release
  places the bare panel last and the modal and table families place their unsuffixed class first;
  landing the offcanvas walk needs a ruling that accepts the reordered cascade or keeps the partial
  as it is.

The probe partial is `.orkestrel/veneer/units/rd-instruments/rd-offcanvas-probe.patch` (a diff of `_offcanvas.scss` against its
42fd88e bytes), and its build log is `tmp/probe/rd-build-offcanvas.log.txt`.

## Twin name

The twin is the `breakpoint-each-down` mixin. The breakpoint mixins share the `breakpoint-`
stem, and a reader who knows the `breakpoint-each` mixin (walk the ramp) and the `breakpoint-down`
mixin (below a boundary) predicts this name from those two. A one-word name would leave the family
the consumer already reads. The name composes the two words in the order the `breakpoint-up` and
`breakpoint-down` mixins place their direction: last.

## Code

### The twin, added to `src/styles/_mixins.scss` after the `breakpoint-down` mixin

Before: absent. After:

```scss
// Emits its content down the ramp, yielding the selector infix and boundary width the
// `breakpoint-each` mixin yields.
//
// Each named entry applies below its own boundary, through the `breakpoint-down` mixin. No viewport
// is below the zero boundary, so that mixin emits nothing there; this mixin emits the zero entry
// unwrapped instead, as the unsuffixed rule set every viewport receives. A caller that ships a bare
// class and its narrowed siblings therefore writes their rule set once.
@mixin breakpoint-each-down {
	@each $name, $boundary in breakpoints() {
		@if $boundary == 0 {
			@content ('', $boundary);
		} @else {
			@include breakpoint-down($name) {
				@content ('-#{$name}', $boundary);
			}
		}
	}
}
```

### The modal walk in `src/styles/components/_modal.scss`

Before:

```scss
	// The release's unsuffixed fullscreen class fills the viewport at every width and drops the
	// content's edge and corners.
	.modal-fullscreen {
		width: 100vw;
		max-width: none;
		height: 100%;
		margin: 0;
	}

	.modal-fullscreen .modal-content {
		height: 100%;
		border: 0;
		border-radius: 0;
	}

	.modal-fullscreen .modal-header,
	.modal-fullscreen .modal-footer {
		border-radius: 0;
	}

	.modal-fullscreen .modal-body {
		overflow-y: auto;
	}

	// Each named fullscreen class carries the same rule set below its own boundary alone. The walk
	// reaches the zero name as well, where the `breakpoint-down` mixin emits nothing, because no
	// viewport is below it; the unsuffixed class is the release's rule for every width instead.
	@each $name, $_width in breakpoints() {
		@include breakpoint-down($name) {
			.modal-fullscreen-#{$name}-down {
				width: 100vw;
				max-width: none;
				height: 100%;
				margin: 0;
			}

			.modal-fullscreen-#{$name}-down .modal-content {
				height: 100%;
				border: 0;
				border-radius: 0;
			}

			.modal-fullscreen-#{$name}-down .modal-header,
			.modal-fullscreen-#{$name}-down .modal-footer {
				border-radius: 0;
			}

			.modal-fullscreen-#{$name}-down .modal-body {
				overflow-y: auto;
			}
		}
	}
```

After:

```scss
	// The release's fullscreen classes fill the viewport and drop the content's edge and corners. The
	// unsuffixed class does so at every width, and each named class below its own boundary alone, so
	// the walk takes the `-down` suffix at every named entry and none at the zero entry.
	@include breakpoint-each-down using ($infix, $boundary) {
		$class: '.modal-fullscreen#{$infix}';
		@if $boundary != 0 {
			$class: '#{$class}-down';
		}

		#{$class} {
			width: 100vw;
			max-width: none;
			height: 100%;
			margin: 0;
		}

		#{$class} .modal-content {
			height: 100%;
			border: 0;
			border-radius: 0;
		}

		#{$class} .modal-header,
		#{$class} .modal-footer {
			border-radius: 0;
		}

		#{$class} .modal-body {
			overflow-y: auto;
		}
	}
```

### The table walk in `src/styles/components/_table.scss`

Before:

```scss
	.table-responsive {
		overflow-x: auto;
		-webkit-overflow-scrolling: touch;
	}

	@each $name, $boundary in breakpoints() {
		@include breakpoint-down($name) {
			.table-responsive-#{$name} {
				overflow-x: auto;
				-webkit-overflow-scrolling: touch;
			}
		}
	}
```

After:

```scss
	// The unsuffixed class scrolls at every width, and each named class below its own boundary alone.
	@include breakpoint-each-down using ($infix, $_boundary) {
		.table-responsive#{$infix} {
			overflow-x: auto;
			-webkit-overflow-scrolling: touch;
		}
	}
```

### The offcanvas walk in `src/styles/components/_offcanvas.scss`

Not landed; see the deviation state. The probe variant is `.orkestrel/veneer/units/rd-instruments/rd-offcanvas-probe.patch`.

## Byte comparison of the built stylesheet

- Base: at 42fd88e with a clean tree, `npm run build:src` exited 0
  (`.orkestrel/veneer/units/rd-instruments/rd-build-base.log.txt`), and the unit copied `dist/src/styles/index.css` to
  `.orkestrel/veneer/units/rd-instruments/rd-base.css` (241542 bytes).
- After: `npm run build:src` exited 0, then
  `cmp .orkestrel/veneer/units/rd-instruments/rd-base.css dist/src/styles/index.css` exited 0 with no output
  (`.orkestrel/veneer/units/rd-instruments/rd-gates.log.txt`).
- Offcanvas probe: the same `cmp` exited 1, `differ: char 185398, line 1`.

## Fixture case and its red run

The `tests/src/styles/fixtures/mixins.scss` fixture walks the twin and writes a
`.vn-fixture-ramp{infix}` rule per entry, with a `padding-top: 1px` declaration and a
`padding-bottom` declaration carrying the yielded boundary. The case
`breakpoint mixins > walks the ramp down, emitting the zero entry unwrapped and each named entry below its own boundary`
in the `tests/src/styles/mixins.test.ts` file reads, for every published breakpoint name, the rule
with that entry's selector, the condition its parent media rule carries, and the boundary its
`padding-bottom` declaration reads back. It expects the zero entry's `.vn-fixture-ramp` rule with no
condition and a `0` boundary, and each named entry's rule under the width its own token resolves
to, with that width as the boundary. It also mounts a `.vn-fixture-ramp` specimen and reads a
`1px` top padding from it.

- Mutation: the twin's zero-boundary branch dropped, so every entry goes through the
  `breakpoint-down` mixin (`.orkestrel/veneer/units/rd-instruments/rd-mutation.patch`).
- Command: `npm run test:src:styles -- tests/src/styles/mixins.test.ts`.
- Red: exit 1, `Tests  1 failed | 13 passed (14)`, failing case
  `breakpoint mixins > walks the ramp down, emitting the zero entry unwrapped and each named entry below its own boundary`,
  with `expected [ [ 'xs', [] ], [ 'sm', …(1) ], …(4) ] to deeply equal [ [ 'xs', [ { …(2) } ] ], …(5) ]`.
  The log is `.orkestrel/veneer/units/rd-instruments/rd-mutation.log.txt`.
- The mutation was undone from the unit's own copy of the file, and `cmp` against that copy
  exited 0 before the gates ran.
- Green, same command before the mutation: exit 0, `Tests  14 passed (14)`
  (`.orkestrel/veneer/units/rd-instruments/rd-mixins-green.log.txt`).

## Gates

The script `.orkestrel/veneer/units/rd-instruments/rd-gates.sh` ran every gate in order, from the worktree root, with the npm 11
`PATH` entry and `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`. Each gate's log is
`.orkestrel/veneer/units/rd-instruments/rd-gate-<gate>.log.txt`, and the summary is `.orkestrel/veneer/units/rd-instruments/rd-gates.log.txt`.

| Command                                                                                                                                                                                        | Exit | Result line                                                  |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- | ------------------------------------------------------------ |
| `npm run format:check`                                                                                                                                                                         | 0    | `All matched files use the correct format.`                  |
| `npm run lint:check`                                                                                                                                                                           | 0    | no diagnostics printed                                       |
| `npm run check`                                                                                                                                                                                | 0    | `vue-tsc --noEmit -p configs/app/tsconfig.browser.json` last |
| `npm run build:src`                                                                                                                                                                            | 0    | `✓ built in 1.63s`                                           |
| `cmp .orkestrel/veneer/units/rd-instruments/rd-base.css dist/src/styles/index.css`                                                                                                                                          | 0    | no output                                                    |
| `npm run test:src:styles -- tests/src/styles/mixins.test.ts tests/src/styles/components/modal.test.ts tests/src/styles/components/table.test.ts tests/src/styles/components/offcanvas.test.ts` | 0    | `Test Files  4 passed (4)`, `Tests  114 passed (114)`        |
| `npm run test:conformance`                                                                                                                                                                     | 0    | `Test Files  1 passed (1)`, `Tests  22 passed (22)`          |
| `npm run test:guides`                                                                                                                                                                          | 0    | `Test Files  1 passed (1)`, `Tests  19 passed (19)`          |

The `npm run test:guides` run read the guide at its 42fd88e bytes, because the shared patch is not
applied. The patched guide passed `npx oxfmt --config .oxfmtrc.json --check` on a copy under
`tmp/probe/rd-guide/`, and `git apply --check .orkestrel/veneer/units/rd-shared.patch` exits 0.

## Criterion 4

From `.orkestrel/veneer/units/rd.diff`: the `_modal.scss` partial writes the fullscreen rule set once, inside the
twin's content, and the `_table.scss` partial writes the responsive wrapper's rule set once. The
`_offcanvas.scss` partial is unchanged and still emits its maps both unconditioned and inside a
`breakpoint-down` walk; that is the deviation.

## Shared-file patch

`.orkestrel/veneer/units/rd-shared.patch` against 42fd88e, for the `guides/veneer.md` file:

- The table paragraph under § Table classes names the `breakpoint-each-down` mixin in place of "the
  downward breakpoint mixin", which the table walk no longer includes directly, and rewraps.
- The breakpoint paragraph after the breakpoint token table gains the twin's sentences: the zero
  entry unwrapped, each named entry inside the `breakpoint-down` mixin, the infix and width it
  passes, and the modal and table families that write their rule set once through it.

The offcanvas paragraph that says the `breakpoint-down` and `breakpoint-up` mixins write each pair at
one breakpoint stays true, because the offcanvas partial did not change.

## Files

- `src/styles/_mixins.scss`: adds the `breakpoint-each-down` mixin and its comment.
- `src/styles/components/_modal.scss`: writes the fullscreen rule set once through the twin.
- `src/styles/components/_table.scss`: writes the responsive wrapper once through the twin.
- `tests/src/styles/fixtures/mixins.scss`: adds the twin's fixture walk.
- `tests/src/styles/mixins.test.ts`: adds the twin's case.

Diffstat (`git diff --stat`):

```text
 src/styles/_mixins.scss               | 19 ++++++++++
 src/styles/components/_modal.scss     | 71 ++++++++++++-----------------------
 src/styles/components/_table.scss     | 16 +++-----
 tests/src/styles/fixtures/mixins.scss | 10 +++++
 tests/src/styles/mixins.test.ts       | 53 ++++++++++++++++++++++++++
 5 files changed, 112 insertions(+), 57 deletions(-)
```

Review evidence: `.orkestrel/veneer/units/rd.diff`, `.orkestrel/veneer/units/rd-status.txt`, `.orkestrel/veneer/units/rd-shared.patch`, and
this report. `git diff --check` exits 0. Nothing was committed.
