# Unit TOAST (`to`) round 2 report

Role and engine: `opus` on Opus 5.5, native Claude subagent, worktree `/home/user/veneer-to` at `2a3f223`. Brief: `b-modal-to-brief-2.md`; verdict: `to-audit-verdict.md`; mid-campaign note: `w2-w3-note-1.md`.

Fixes T1 to T6 are in place. The revised patch `.orkestrel/veneer/units/to-shared-2.patch` supersedes `to-shared.patch` whole. `git apply --check` of it on a fresh `git archive 2a3f223` extract exits 0, and the applied tree is byte-identical to the validation copy. Every gate the brief names exits 0 on the rebuilt copy. Deviation state: none. The decisions this round took itself are listed in § Decisions.

## Fixes

### T1: the `TOAST_SPECIMENS` TSDoc (`app/browser/constants.ts`, shared)

Before:

```text
 * title carries the `flex-grow-1` class to push the time and the close control to the header's end,
 * because the margin utility the release's markup writes there does not ship.
```

After, with the brief's sentences verbatim and the paragraph re-flowed:

```text
 * title carries the `flex-grow-1` class where the release's markup writes the `me-auto` class,
 * which does not ship. No specimen renders a colored toast, because the release writes one with
 * the `text-bg-*` and `border-0` classes, and neither class ships.
```

The guide's `### Toast classes` region paragraph carries the same sentences. Reading: present in `to-shared-2.patch` under `app/browser/constants.ts` and `guides/veneer.md`. `npm run check`, `npm run test:guides`, and `format:check` exit 0.

### T2: the Toast `plugin` row (`guides/veneer.md`, § Compatibility, shared)

Before:

```text
Toast: a `[data-bs-dismiss="toast"]` trigger hides the toast it names or sits in; `animation: true`, `autohide: true`, and `delay: 5000` defaults; `show`, `hide`, `dispose`, and `isShown` methods; cancelable `show.bs.toast` and `hide.bs.toast`, then `shown.bs.toast` and `hidden.bs.toast`; the `showing` class for each fade and the `fade` class when animated; autohide after `delay`, held while a pointer or focus is inside. Owner: J-ENGINE.
```

After, with the brief's class clause and closing verbatim and T4's nouns added:

```text
Toast: a `[data-bs-dismiss="toast"]` trigger hides the toast it names or sits in; the `animation: true`, `autohide: true`, and `delay: 5000` defaults; the `show`, `hide`, `dispose`, and `isShown` methods; the cancelable `show.bs.toast` and `hide.bs.toast` events, then the `shown.bs.toast` and `hidden.bs.toast` events; the `show` method adds the `show` and `showing` classes, and the `fade` class when animated, then removes the `showing` class after the transition; the `hide` method adds the `showing` class, then removes the `showing` and `show` classes and adds the deprecated `hide` class; the `dispose` method removes the `show` class; with the `autohide` option the toast hides after the milliseconds the `delay` option names, and a pointer or focus inside the toast holds that timer; no key or ARIA handling. Owner: J-ENGINE.
```

I checked each clause against `node_modules/bootstrap/js/src/toast.js` and found no contradiction:

- **`show()`:** adds the `fade` class when `this._config.animation` is set, adds the `show` and `showing` classes, and its `complete` callback removes the `showing` class.
- **`hide()`:** adds the `showing` class, and its `complete` callback adds the `hide` class (marked `@deprecated`) and removes the `showing` and `show` classes.
- **`dispose()`:** removes the `show` class when the toast is shown, and clears the timer.
- **`_setListeners`:** binds `mouseover`, `mouseout`, `focusin`, and `focusout`.

Two further behaviors in the source are left out of the row. `show()` also removes the deprecated `hide` class, and `dispose()` clears the timer. The source does not contradict their absence, so the verbatim wording stands.

The row is wider than the Obligation column, so the formatter re-pads every row of the § Compatibility table. That whitespace is the only change on the other rows (`diff -w` of the applied trees shows the toast rows alone).

### T3: the stacking sentences (guide, variable row, `_toast.scss` opening comment)

Guide, `### Toast classes`. Before:

```text
stacking level reads the `--vn-stack-toast` rung through `--bs-toast-zindex`, which the `.toast`
class and the `.toast-container` class each declare, so a retune of that rung moves every toast and
every container.
```

After:

```text
stacking level reads the `--vn-stack-toast` rung through the `--bs-toast-zindex` property, which the
`.toast` class and the `.toast-container` class each declare. The container applies the level, so a
retune of that rung moves every container and the toasts inside it, and a toast outside a container
declares the slot and applies no level of its own.
```

The section's proof sentence changes from "the stacking level against a retuned rung on the container and on a toast outside one" to "the stacking level against a retuned rung on the container and the slot on a toast outside one". Without that edit, the proof sentence would repeat the overclaim.

Variable row. Before: "each one is read beside the property it drives in `tests/src/styles/components/toast.test.ts`." After: "each one is read in the `tests/src/styles/components/toast.test.ts` file, and each one but the toast's stacking slot beside the property it drives." The selector row now reads "proved in the `tests/src/styles/components/toast.test.ts` file" (T4).

`src/styles/components/_toast.scss` (owned). The opening comment now reads, in the relevant part: "the engine writes the `showing` class for each fade, in and out alike; … The toast and the container each declare the stacking slot from the toast rung, and the container applies the level, so a retune of that rung moves every container and the toasts inside it." The comment no longer says the class is written only while a toast fades in (F1).

Reading: the style proof's case "reads the stacking level from the toast rung through its slot, on the container and on the toast" still reads `z-index` on the container and the slot value on a bare toast. It passes (`Tests 34 passed (34)` with the close proof), and its comment states that the container applies the level and the toast applies none. No cascade rule changed.

### T4: nouns after code tokens

I swept every line the patch adds, plus the comments of the owned files. These are the sites that changed:

- `### Toast classes`:
  - "capped at the `350px` length"
  - "reads the `--vn-space-4` token", "reads the `--vn-space-6` token", "reads the `--vn-size-2` token"
  - "the `--bs-body-bg-rgb` variable at `0.85` opacity"
  - "the `--bs-border-color-translucent` variable", "the `--bs-secondary-color` variable", "the `--bs-box-shadow` variable"
  - "the `--bs-toast-color` property", "the `--bs-toast-spacing` property", "the `--bs-toast-zindex` property"
  - "the `1090` value", "the `var(--vn-stack-toast)` value"
  - "the `-webkit-max-content` and `-moz-max-content` values before the `max-content` value"
  - "the `me-auto` class"
- The Toast `plugin` row: the sites listed under T2.
- The `toast` compatibility rows: "the `tests/src/styles/components/toast.test.ts` file".
- `tests/setup.ts`, the `CASCADE_KEYS` TSDoc: "A toast carrying the `showing` class".
- `tests/src/styles/components/toast.test.ts`, the stacking case comment: "holds the `1090` value".

Reading: I scanned the added lines of `to-shared-2.patch` that are new against the `2a3f223` guide, plus the comment lines of the owned files, for a backticked token followed by punctuation, a line end, or a function word. Every remaining hit is one of these:

- a member of a series that shares a following noun, such as "the `role`, `aria-live`, and `aria-atomic` attributes";
- a token whose noun opens the next line, such as "`scroller`" followed by "class".

### T5: the framed population in `ToastSection.test.ts` (owned)

Before: the framed-geometry case iterated the literal `['Stacked toasts', 'Centered toast']` and asserted placement per name.

After:

- **Framed-geometry case**, "holds every framed toast inside its frame, where the placement classes of its container put it, at the %i variant". The case derives its population from the specimen table:

  ```ts
  const framed = TOAST_SPECIMENS.filter(({ markup }) =>
  	markup.includes('class="viewport"'),
  ).map(({ name }) => name)
  ```

  It holds that list against the rendered region, the specimens holding a `:scope > .viewport` child. Each container's own placement classes name where its box meets the frame: `top-0`, `bottom-0`, `start-0`, and `end-0` each name an edge, and `translate-middle` names the frame's center on both axes. The case requires at least one such distance per framed specimen and every one of them under 1 pixel, plus every toast inside its frame.
- **Container case** (see § Decisions). It derives the same population from `TOAST_SPECIMENS` and requires every `.toast-container` to sit in a framed specimen. It requires every other class the container carries to match the position-utility pattern and to have a rule in the loaded cascade (the `findRule` export of `@orkestrel/test/browser`). It reads each specimen outside the frame from the table as well, and requires its toast in flow.

Red runs, retained in `.orkestrel/veneer/units/to-instruments/to-mutations-2.log.txt`:

| Mutation | Result | Red cases |
| --- | --- | --- |
| geometry derivation drops a framed specimen (`.slice(1)`) | `Tests 2 failed \| 3 passed (5)` | the framed-geometry case at 390 and at 1280 |
| container derivation drops a framed specimen (`.slice(1)`) | `Tests 1 failed \| 4 passed (5)` | the container case |
| stacked container rendered outside the frame | `Tests 1 failed \| 4 passed (5)` | the container case |
| centered container placed with `translate-middle-y` | `Tests 2 failed \| 3 passed (5)` | the framed-geometry case at 390 and at 1280 |
| stacked container carrying the unshipped `top-25` class | `Tests 1 failed \| 4 passed (5)` | the container case |
| none | `Tests 5 passed (5)` | — |

### T6: the token binding in `tests/setupStyles.test.ts` (shared)

Before: the `toast case tables` case restated the tokens as a literal list:

```ts
expect(TOAST_SLOT_CASES.map(({ token }) => token)).toEqual([
	TOKEN_NAMES.space[6],
	TOKEN_NAMES.space[4],
	TOKEN_NAMES.gutter.x,
	TOKEN_NAMES.size[2],
])
```

After: each row's token is bound through its own declaration in the token partial. The case compiles `@use 'tokens'` with the installed `compileString` export of `sass` and collects every `--vn-*` declaration. It then requires the length the token declares at the factors' initial value to equal the row's pinned length, which is also the recorded `rem` value:

```ts
for (const { property, token, pixels } of TOAST_SLOT_CASES) {
	const length = `${String(pixels / 16)}rem`
	expect(base.get(property)).toBe(length)
	expect(
		/^(?:calc\()?([\d.]+rem)(?: \* var\(--vn-factor-density\)\))?$/u.exec(
			requireValue(declared.get(token), `The token partial declares no ${token}`),
		)?.[1],
	).toBe(length)
}
```

Red runs, retained in `.orkestrel/veneer/units/to-instruments/to-mutations-2.log.txt`:

| Mutation to `TOAST_SLOT_CASES` | Proof | Result | Red cases |
| --- | --- | --- | --- |
| padding-x row names `TOKEN_NAMES.space[8]` | `tests/setupStyles.test.ts` | `Tests 1 failed \| 121 passed (122)` | binds the toast tables to the official inventory and the recorded header close margins |
| font-size row names `TOKEN_NAMES.size[3]` | `tests/setupStyles.test.ts` | `Tests 1 failed \| 121 passed (122)` | the same case |
| spacing row names `TOKEN_NAMES.space[12]` | `tests/setupStyles.test.ts` | `Tests 122 passed (122)` | none |
| spacing row names `TOKEN_NAMES.space[12]` | `tests/src/styles/components/toast.test.ts` | `Tests 1 failed \| 16 passed (17)` | toast box › reads `'--bs-toast-spacing'` from its own token |
| none | `tests/setupStyles.test.ts` | `Tests 122 passed (122)` | — |

The binding separates tokens by declared length. The `--vn-space-12` token declares the same `1.5rem` length as the `--vn-gutter-x` token, so the binding case cannot tell them apart. The style proof tells them apart: the `--vn-space-12` token carries the density factor, and that case compares the slot's computed value with the token's.

## Mutation log

`.orkestrel/veneer/units/to-instruments/to-mutations-2.log.txt` holds each run's mutated site (file, old text, new text), its command, its exit, its summary line, and its failing case names. The instrument is `.orkestrel/veneer/units/to-instruments/to-mutate-2.py`.

No run rebuilt the cascade, because every mutated site is a test or application file that the proof reads from source.

## Gates on the rebuilt validation copy

I rebuilt `tmp/probe/base` for this round from these inputs:

- `git archive 2a3f223`;
- `cp -al node_modules`;
- the owned files;
- `to-shared.patch` applied, then revised in place.

| Command | Exit | Result line |
| --- | --- | --- |
| `npx oxfmt --config .oxfmtrc.json --check` over the owned and shared files | 0 | all matched files formatted |
| `npx oxlint --config .oxlintrc.json --deny-warnings` over the owned and shared files | 0 | no findings |
| `npm run check` | 0 | — |
| `npm run build:src` | 0 | `✓ built` for core, browser, and styles |
| `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/toast.test.ts tests/src/styles/components/close.test.ts` | 0 | `Tests 34 passed (34)` |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/ToastSection.test.ts` | 0 | `Tests 5 passed (5)` |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/Showcase.test.ts tests/app/browser/index.test.ts` | 0 | `Tests 5 passed (5)` |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupStyles.test.ts` | 0 | `Tests 122 passed (122)` |
| `npm run test:setup`, run at a one-minute load average of 7.75 | 0 | `Tests 267 passed (267)` |
| `npm run test:conformance` | 0 | `Tests 22 passed (22)` |
| `npm run test:guides` | 0 | `Tests 19 passed (19)` |
| `npm run test:policy` | 0 | `Tests 109 passed \| 1 skipped (110)` |

Observation, not a criterion: two earlier `npm run test:setup` runs, taken at a load average near 22 while the sibling units ran, failed on timeouts only. The first red case, "oracle action bindings and exclusions", timed out in a hook at 10100 ms. The second, "records and reads official control state and rejects contradicted or absent obligation steps", timed out at 10100 ms. Both cases are in `tests/setupServer.test.ts`, where this unit's patch changes only the component-set line. The first run also timed out "compiles the authored styles entry with every value as the source writes it" and a `tests/setupStyles.test.ts` range-rule case, each at 5000 ms. The retained script `.orkestrel/veneer/units/to-instruments/to-setup-when-idle.sh` waited for the one-minute load average to fall below 8 and then re-ran the gate, which read `267 passed (267)`. That run's log is `.orkestrel/veneer/units/to-instruments/to-gate-2-setup-idle.log.txt`, and the loaded run's log is `.orkestrel/veneer/units/to-instruments/to-gate-2-setup.log.txt`. The deciding re-run stays yours.

In the worktree, `npm run format:check` exits 0 ("All matched files use the correct format.") and `npm run lint:check` exits 0. `tmp/probe/` is deleted. The gate logs are retained as `.orkestrel/veneer/units/to-instruments/to-gate-2-*.log.txt`.

## Decisions

- **The container case in `ToastSection.test.ts` takes the T5 derivation too.** It listed the framed specimens and their placement classes inline, which is the class of defect T5 fixes and item 2 of the mid-campaign note names. The brief names the framed-geometry case alone, so this edit to a second case in the same owned file goes beyond T5's letter; I recorded it rather than leaving the known defect behind. The container case's controls are in the mutation log. The contract case keeps its exact rendered-name order, the region contract every section proof asserts; it is not an iterated case matrix.
- **The guide's proof sentence in `### Toast classes` changes with T3.** Without the edit, it would keep claiming the stacking level is read on a toast outside a container.

## Review evidence

- `.orkestrel/veneer/units/to-2.diff`: `git diff 2a3f223`, which is empty for tracked files, plus each owned file through `git diff --no-index /dev/null`.
- `.orkestrel/veneer/units/to-2-status.txt`: `git status --porcelain`, which lists the owned files alone.
- `.orkestrel/veneer/units/to-shared-2.patch`: the revised shared patch.
  - Compared with `to-shared.patch`, it changes `app/browser/constants.ts` (T1), `tests/setup.ts` (T4), `tests/setupStyles.test.ts` (T6), and `guides/veneer.md` (T1 to T4). Every other shared file is byte-identical after both patches apply.
  - In the guide, `diff -w` of the applied trees shows the `### Toast classes` sentences, the toast compatibility rows, and the Toast `plugin` row alone. The rest of the § Compatibility hunk is the formatter's re-padding.
- `.orkestrel/veneer/units/to-instruments/to-mutations-2.log.txt`: the mutation log.
- `.orkestrel/veneer/units/b-modal-to-report-2.md`: this report.
