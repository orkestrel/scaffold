# Unit ENUM-TITLES — every enumeration case names the selectors it reads

## Role and engine

`builder` on Sonnet, a native Claude subagent, the sole writer in `/home/user/veneer-enum` (branch `unit/enum` cut from Veneer
`main` at `0865c67`, `node_modules` hardlinked from `/home/user/veneer`). The harness environment block may name another
directory as the primary working directory; start every shell command with `cd /home/user/veneer-enum &&` and give every
file tool an absolute path under it. Read `/home/user/scaffold/AGENTS.md` and
`/home/user/scaffold/.claude/rules/tests.md` first. No skill applies.

## Objective

Each of seven enumeration cases under `tests/src/styles/components/` says what its assertion reads: the set of distinct
components-layer selectors naming its key's classes. The ruling is § The seam ruling of
`/home/user/scaffold/.orkestrel/veneer/units/ebc-audit-3-verdict.md`; E-ID-BUTTON-CASCADE carries the same ruling to
the accordion and carousel cases in its own worktree.

## Context

Each case builds `new Set(...)` over the selectors of `collectLayer('components')`, so it reports a missing selector
and an extra selector, and a second rule on a recorded selector leaves its reading unchanged. Each title says "no other
rule" and each comment says "a missing rule and an extra rule on the same classes each report here", which overclaims.
The styles project reads the built cascade (`configs/src/vite.styles.config.ts` sets `dist/src/styles/index.css`), so
every plant and every restore rebuilds it with `npm run build:src:styles`. Other worktrees run suites at the same time;
a timing failure under load is an observation with its reading.

## Unknowns

None.

## Scope

Owned: `tests/src/styles/components/{popover,tooltip,modal,toast,offcanvas,collapse,fade}.test.ts`. Plants touch
`src/styles/components/_{popover,tooltip,modal,toast,offcanvas,collapse,fade}.scss` and each is restored byte-identical.
Off-limits: every other path. No git command that writes, no install, no `npm run format`.

## Changes

In each file, replace the comment block directly above the case whose title contains `no other rule` with the lines
given, verbatim (one tab of indent, as shown), and retitle that case, verbatim.

1. `tests/src/styles/components/popover.test.ts`:

   ```ts
   	// The mutation this catches is a selector the partial stops writing, or one it writes beyond the
   	// release: the reading is the set of components-layer selectors naming one of the key's own
   	// classes, so a missing selector and an extra selector each report here, and a second rule on a
   	// recorded selector leaves the reading unchanged. The sheet writes an attribute value in quotes
   	// and the release records it bare, so the quotes are dropped before the two are compared.
   ```

   Title: `writes the recorded popover selectors and no other components-layer selector naming a popover class`.
2. `tests/src/styles/components/tooltip.test.ts`:

   ```ts
   	// The mutation this catches is a selector the partial stops writing, or one it writes beyond the
   	// release: the reading is the set of components-layer selectors naming one of the key's own
   	// classes, so a missing selector and an extra selector each report here, and a second rule on a
   	// recorded selector leaves the reading unchanged. The sheet writes an attribute value in quotes
   	// and the release records it bare, so the quotes are dropped before the two are compared.
   ```

   Title: `writes the recorded tooltip selectors and no other components-layer selector naming a tooltip class`.
3. `tests/src/styles/components/modal.test.ts`:

   ```ts
   	// The mutation this catches is a selector the partial stops writing, or one it writes beyond the
   	// release: the reading is the set of components-layer selectors naming one of the key's own
   	// classes, so a missing selector and an extra selector each report here, and a second rule on a
   	// recorded selector leaves the reading unchanged.
   ```

   Title: `writes the recorded modal selectors and no other components-layer selector naming a modal class`.
4. `tests/src/styles/components/toast.test.ts`:

   ```ts
   	// The mutations this catches are a selector the partial stops writing and a selector it writes
   	// beyond the release: the reading is the set of components-layer selectors naming one of the key's
   	// own classes, so a missing selector and an extra selector each report here, a header combinator
   	// written against the bare toast class reads as both, and a second rule on a recorded selector
   	// leaves the reading unchanged.
   ```

   Title: `writes the recorded toast selectors and no other components-layer selector naming a toast class`.
5. `tests/src/styles/components/offcanvas.test.ts`:

   ```ts
   	// The mutation this catches is a selector the partial stops writing, or one it writes beyond the
   	// release: the reading is the set of components-layer selectors naming one of the key's own
   	// classes, the expanded navbar combinators the navbar partial writes included, so a missing
   	// selector and an extra selector each report here, and a second rule on a recorded selector
   	// leaves the reading unchanged.
   ```

   Title: `writes the recorded offcanvas selectors and no other components-layer selector naming an offcanvas class`.
6. `tests/src/styles/components/collapse.test.ts`:

   ```ts
   	// The mutation this catches is a selector the partial stops writing, or one it writes beyond the
   	// release: the reading is the set of components-layer selectors naming one of the key's own
   	// classes, so a missing selector and an extra selector each report here, and a second rule on a
   	// recorded selector leaves the reading unchanged.
   ```

   Title: `writes the recorded collapse and collapsing selectors and no other components-layer selector naming either class`.
7. `tests/src/styles/components/fade.test.ts`:

   ```ts
   	// The mutation this catches is a selector the partial stops writing, or one it writes beyond the
   	// release: the reading is the set of components-layer selectors whose classes are the `fade` class
   	// and the `show` class alone, so a missing hidden state and an added shown state each report here,
   	// and a second rule on a recorded selector leaves the reading unchanged. The compounds the modal and
   	// offcanvas partials write carry their own classes and stay out.
   ```

   Title: `writes the recorded fade selectors and no other components-layer selector whose classes are the fade and show classes alone`.
## Plants

For each file, two plants in its partial's `@layer components` block, each appended as the block's last rule, one at a
time. Copy the partial aside and record its SHA-256 first; after each plant, restore from the copy and check the
SHA-256 equal. Run `npm run build:src:styles && npx vitest run --config configs/src/vite.styles.config.ts --no-cache tests/src/styles/components/<file>.test.ts -t "no other components-layer selector"`.
The `dup` plant must leave the enumeration case passing; the `extra` plant must fail it with an `AssertionError`. Log
each run to `tmp/units/logs/enum-plant-<file>-<dup|extra>.log.txt` with the restore digest line appended, and run
`npm run build:src:styles` after the last restore.

| File | `dup` rule | `extra` rule |
| --- | --- | --- |
| `popover` | `.popover-body { letter-spacing: 1px; }` | `.popover-body.audit-probe { letter-spacing: 1px; }` |
| `tooltip` | `.tooltip-inner { letter-spacing: 1px; }` | `.tooltip-inner.audit-probe { letter-spacing: 1px; }` |
| `modal` | `.modal-body { letter-spacing: 1px; }` | `.modal-body.audit-probe { letter-spacing: 1px; }` |
| `toast` | `.toast-body { letter-spacing: 1px; }` | `.toast-body.audit-probe { letter-spacing: 1px; }` |
| `offcanvas` | `.offcanvas-body { letter-spacing: 1px; }` | `.offcanvas-body.audit-probe { letter-spacing: 1px; }` |
| `collapse` | `.collapsing { letter-spacing: 1px; }` | `.collapsing.audit-probe { letter-spacing: 1px; }` |
| `fade` | `.fade { letter-spacing: 1px; }` | `.fade.show:hover { letter-spacing: 1px; }` |

## Execution

Perform the assignment directly and spawn nothing. Put
`/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin` first on `PATH` and set
`PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`. Make the changes, format the seven test files with
`./node_modules/.bin/oxfmt --config .oxfmtrc.json <file>`, run the plants, then run `npm run format:check`,
`npm run lint:check`, `npm run check`, and `npm run test:src:styles`, each logged to `tmp/units/enum-<gate>.log.txt`
with `echo "exit=$?"` appended. Write `git diff` to `tmp/units/enum.diff` and `git status --short` to
`tmp/units/enum-status.txt`.

## Output

Write `tmp/units/enum-report.md` and return the same text: each file's result; the plant table (file, plant, the case's
result quoted, restore digest); the gate table; the diff and status paths. State no count.

## Deviation contract

§ Deviation protocol of `/home/user/scaffold/.agents/orchestration.md`. This unit settles nothing but the formatter's
wrapping. Stop and report if a `dup` plant fails its case, if an `extra` plant passes it, if a restore digest differs,
or if a gate reads red.

## Acceptance criteria

Every comment and title reads verbatim as given (after the formatter); every `dup` plant passes and every `extra` plant
fails its enumeration case with an `AssertionError`; every restore is byte-identical; every gate exits 0.
