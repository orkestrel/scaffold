# Unit B-PASSIVE-CLOSE-B (`bpb`) — the forced-colours outline on the page link and the close control

## Role and engine

`opus` on Opus 5.5 (native Claude subagent), sole writer in `/home/user/veneer-bpb` (a worktree
detached at `a56ca7e`, the session branch tip after B-FORMS-CLOSE-FORCED landed and folded, with
`node_modules` installed and `dist/` built by the Orchestrator). Perform the assignment directly
and spawn nothing. Use absolute paths under `/home/user/veneer-bpb` for every command and file, and
run every npm and npx command from `/home/user/veneer-bpb`. Do not commit, push, install, run
`corepack use`, or run `git checkout`, `git restore`, `git stash`, `git reset`, `git clean`, or
`git checkout-index`. Routing note for the record: this unit is objective by work class and runs
on the native lane because its style proofs drive Chromium, which the Codex sandbox denies. The
sibling unit B-FORMS-LABEL-CASCADE (`bfl`) writes the forms partials, the ledger tables, and the
forms sections of the guide in its own worktree at the same time; this unit's guide edits stay
inside the regions § Scope names.

## Objective

The `.page-link:focus` and `.btn-close:focus` rules include the `forced-ring` mixin beside the
shadow ring they keep from the release, each proof reads the outline under staged forced colours,
the guide's pagination and close sections state it and § Additions records the two outline
declarations, and the gates in § Acceptance criteria are green.

## Context

**Evidence.** The rules today (`grep -n 'focus' src/styles/components/_pagination.scss src/styles/components/_close.scss` at `a56ca7e`):

```scss
// src/styles/components/_pagination.scss, around line 75
	.page-link:focus {
		z-index: 3;
		color: var(--bs-pagination-focus-color);
		background-color: var(--bs-pagination-focus-bg);
		outline: 0;
		box-shadow: var(--bs-pagination-focus-box-shadow);
	}

// src/styles/components/_close.scss, around line 41
	.btn-close:focus {
		outline: 0;
		box-shadow: var(--bs-btn-close-focus-shadow);
		opacity: var(--bs-btn-close-focus-opacity);
	}
```

The mechanism B-FORMS-CLOSE-FORCED landed (`src/styles/_mixins.scss` around line 188):

```scss
@mixin forced-ring($width: var(--vn-focus-width), $highlight: var(--vn-focus-highlight)) {
	@include forced-colors {
		outline: $width solid $highlight;
		@content;
	}
}
```

The precedent include (`src/styles/components/_form-select.scss` around line 59: `@include forced-ring;` as the last line of the `.form-select:focus` block) and the precedent proof, which the two proofs here follow in shape (`tests/src/styles/components/form-select.test.ts` around line 373):

```ts
	it('outlines the focused select at the focus width under forced colors, where its shadow ring is not painted', async () => {
		const host = scene.mount(
			`<div>${FORM_SELECT_MARKUP}<div id="focus-gauge" style="width: var(--vn-focus-width)"></div></div>`,
		)
		const plain = requireValue(host.querySelector<HTMLSelectElement>(PLAIN), 'No plain select')
		const gauge = requireValue(host.querySelector('#focus-gauge'), 'No focus gauge')
		expect(await traverseAccessible('Plain choice')).toBe(plain)
		expect(plain.matches(':focus-visible')).toBe(true)
		expect(readStyle(plain, 'outline-style')).toBe('none')
		// A color reading cannot fail under forced colors, because the installed color reader
		// resolves each side through a probe whose color forced colors also replace, so the outline
		// is read by its style and its width rather than by its paint.
		await stageMedia({ forced: true })
		expect(readStyle(plain, 'outline-style')).toBe('solid')
		expect(readPixels(plain, 'outline-width')).toBe(readPixels(gauge, 'width'))
		await releaseMedia()
		expect(readStyle(plain, 'outline-style')).toBe('none')
	})
```

The proofs' existing focus cases: `tests/src/styles/components/pagination.test.ts` around line 157 (`paints the focus ring as a shadow the reader can measure and clears the native outline`; it reaches focus with `link.focus()` then `await pressKeys('{ArrowRight}')` and asserts `:focus-visible`) and `tests/src/styles/components/close.test.ts` around line 101 (`moves the opacity through rest, hover, and focus`; it reaches focus with `control.focus()` and asserts `:focus`, then reads `outline-style` `none`). The pagination proof already imports `stageMedia`; the close proof does not.

The guide sites (`guides/veneer.md` at `a56ca7e`): `### Pagination classes` starts around line 819, and its focus paragraph starts around line 840 ("The focus ring is the recorded quarter-rem shadow at a quarter of the palette blue"); `### Close classes` starts around line 1624, and its state paragraph around line 1640 ends with "separates this control from the focus ring the button class wears." § Additions (the table under `### Additions`, around line 3454) carries the precedent rows; the additions equality in `tests/conformance.test.ts` (`scanLedgerDrift`, around line 192) checks each measured addition is recorded and each recorded row is measured, so the table's row order is free, and the precedent rows sit after the `table` rows:

```markdown
| `form-control` | `.form-control:focus { outline }`                             | `@media (forced-colors: active)`                 | declaration | Under forced colors the ring is drawn as a system-color outline, because the shadow it is drawn with elsewhere is not painted there.                                       |
| `form-select`  | `.form-select:focus { outline }`                              | `@media (forced-colors: active)`                 | declaration | Under forced colors the ring is drawn as a system-color outline, because the shadow it is drawn with elsewhere is not painted there.                                       |
```

The design ruling: `/home/user/scaffold/.orkestrel/veneer/b-forms-close-design-verdict.md` R10 ("`.page-link:focus` and `.btn-close:focus` write `outline: 0` with a shadow ring. D37 covers forms. Carrier: B-PASSIVE-CLOSE-B, with `forced-ring` as the mechanism."); decision D37 in `/home/user/scaffold/.orkestrel/veneer/units/decisions-round-2.md`; the family records `units/b-passive-family.md` and `units/b-passive-baseline.md`; the roadmap row (`ROADMAP.md` § Carriers, the row starting "`.page-link:focus` and `.btn-close:focus` write `outline: 0`").

**Law.** `/home/user/scaffold/AGENTS.md`;
`/home/user/scaffold/.claude/rules/{styles,tests,typescript,names,writing,documentation}.md`.
Skill: none. Guide: `guides/veneer.md` (the regions § Scope owns).

**Installed primitives.** `@orkestrel/test` (browser entry under `node_modules/@orkestrel/test/dist/src/browser/`: `stageMedia`, `releaseMedia`, `readStyle`, `readPixels`, `pressKeys`, `requireValue`, `traverseAccessible`), `@orkestrel/contract`. A helper whose job an installed export does is a defect; the audit's checker probes the diff.

**Host.** Linux, bash, `/home/user/veneer-bpb`. Run
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`
first in every shell. Never run `corepack use`. Chromium is installed; the scoped styles run is
`npm run build:src:styles && npx vitest run --config configs/src/vite.styles.config.ts --no-cache <files>`;
`npm run build:src` compiles the cascade to `dist/`, which `npm run test:conformance` reads.

**Measurements.** Take the outline readings under `stageMedia({ forced: true })` before writing
the expectations; read the compiled `--vn-focus-width` value the gauge resolves to.

**Control identifiers.** R10 and D37 are this brief's labels. Name a test for what it proves,
never for a control label.

**Standing conditions.** The tree is clean at `a56ca7e`. `tmp/` is gitignored. The additions
equality in `npm run test:conformance` reddens by exactly the two outline declarations until the
§ Additions rows land (owned here), so run it after the guide rows.

## Unknowns

none.

## Scope

**Owned.** `src/styles/components/_pagination.scss`, `src/styles/components/_close.scss`,
`tests/src/styles/components/pagination.test.ts`, `tests/src/styles/components/close.test.ts`,
`guides/veneer.md` inside these regions only: the `### Pagination classes` focus paragraph, the
`### Close classes` state paragraph, and the two rows added to the `## Additions` table;
`tmp/units/bpb-report.md`.

**Shared (report-only).** `ROADMAP.md` (the Orchestrator's fold), `tests/setupStyles.ts`,
`tests/setupServer.ts`.

**Off-limits.** Every other line of `guides/veneer.md` (`bfl` owns the forms sections, the ledger
tables, § Files, § Compatibility, § Deferred selectors, § Departures, § Showcase); `src/styles/_mixins.scss`;
every other partial and proof; `app/**`; `tests/setup.ts`; `tests/setup.test.ts`;
`tests/conformance.test.ts`; `tests/setupPolicy.ts` and `tests/policy.test.ts` (the paths the
`scaffold repair` command restores).

**What asserts the state this change ends.** The two proofs (Owned); the additions equality in
`tests/conformance.test.ts` (off-limits; it reads the guide rows Owned here).

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash under the host limits.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

Write `tmp/units/bpb-report.md`: the diff summary (`git diff --stat` and `git status --short`),
each criterion with its command and result line, the failing run of each proof before its rule
gained the include (criterion 3), and the exact guide text landed. Return the same content as
your final message.

## Deviation contract

§ Deviation protocol in `/home/user/scaffold/.agents/orchestration.md`. Stop and report on a
quoted site not found, on a reading that contradicts § Context, or on a criterion needing a file
outside Owned. Decide, record, and carry on for the proof titles, the comment wording, the
sentence's position inside its paragraph, and rewrapping at 100 columns.

## Acceptance criteria

1. `.page-link:focus` in `_pagination.scss` and `.btn-close:focus` in `_close.scss` each end with
   `@include forced-ring;`, keeping every declaration they have; no other rule changes, and
   `npm run build:src:styles` exits 0.
2. Each proof gains one case that mounts its markup with a `#focus-gauge` element whose width is
   `var(--vn-focus-width)`, reaches focus the way its file's focus case does (`link.focus()` then
   `await pressKeys('{ArrowRight}')` for the page link; `control.focus()` for the close control),
   reads `outline-style` `none` at rest, stages `stageMedia({ forced: true })`, reads
   `outline-style` `solid` and `outline-width` equal to the gauge's width in pixels, releases the
   media, and reads `outline-style` `none` again; its comment carries the clause "A color reading
   cannot fail under forced colors, because the installed color reader resolves each side through
   a probe whose color forced colors also replace" and states that the outline is read by its
   style and its width.
3. Each case fails with the include removed from its rule (record the command and the failing
   count, then the same command green with the include restored): the `outline-style` reading
   under forced colours distinguishes the mutation.
4. `guides/veneer.md` carries, rewrapped at 100 columns: at the end of the pagination focus
   paragraph, "Under forced colors the focused page's rule also writes an outline in the system
   highlight color through the `forced-ring` mixin, because forced colors paint no shadow ring.
   § Additions records it."; at the end of the close state paragraph, "Under forced colors the
   focused control's rule also writes an outline in the system highlight color through the
   `forced-ring` mixin, because forced colors paint no shadow ring. § Additions records it."; and
   in § Additions, after the `form-range` row, a `close` row for `.btn-close:focus { outline }`
   and a `pagination` row for `.page-link:focus { outline }`, each
   with the condition `@media (forced-colors: active)`, the category `declaration`, and the reason
   "Under forced colors the ring is drawn as a system-color outline, because the shadow it is
   drawn with elsewhere is not painted there.", the table's column padding preserved.
5. `npx oxfmt --check` over the owned files, `npm run format:check`, `npm run lint:check`, and
   `npm run check` exit 0.
6. `npm run build:src`, `npm run test:conformance`, `npm run test:guides`, and the scoped styles
   run over `pagination.test.ts` and `close.test.ts` exit 0.

**Observations, not criteria.** The button partial's compile is unchanged (`forced-ring` is only
included, never edited); the whole `npm run test:src` styles run.

## Review evidence

The diff against `a56ca7e` and the status, this report, and the failing-then-green runs of
criterion 3.
