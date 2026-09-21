# CL6 scout — the `link` key, the anchor element, and the link colour record

## Role and engine

`grok` (Cursor Grok 4.6 through the Cursor CLI, read-only). The Claude-side driver carries this
brief across unaltered and returns the journal path and the distillate untouched; the engine
behind the CLI reads it and answers directly, spawning nothing.

## Objective

A distilled map, with `file:line` pointers, of what unit CL6 must reconcile: the pinned
inventory's `link` key, the anchor element partial CL3 landed and the opacity expression inside
it, every link-related token, and what the calibration record measured for anchors. CL6 owns
`src/styles/components/_link.scss`, the `elements/_a.scss` opacity expression, a link showcase
section, and the guide's `link` rows.

## Context

Checkout: `C:/Users/mikes/WebstormProjects/veneer`, HEAD `bc580c1` or later; the tracked tree may
carry another unit's uncommitted work under `tests/` and `src/styles/components/`. Read the
working tree as it stands and judge no unit. Read only these, and read nothing else:

- `tests/fixtures/oracle/inventory.json` — the `components.link` entry, and the `focus-ring` and
  `icon-link` entries for comparison only. Each entry carries a `selectors` array of objects with
  a `selector` string, a `declarations` array, and a `properties` object.
- `src/styles/elements/_a.scss` — the whole file.
- `src/styles/_tokens.scss` — every token whose name contains `link`, and every token
  `_a.scss` reads.
- `src/styles/_theme.scss` and `src/styles/_mixins.scss` — only where a link token or the
  opacity expression is produced.
- `tests/src/styles/elements/a.test.ts` and `tests/setupStyles.ts` — the anchor case table only.
- `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/research/calibration-content.md` —
  its anchor section only.
- `guides/veneer.md` — any row whose Component is `link`, and the deferral rows naming an anchor
  selector.

## Unknowns

The Orchestrator does not know whether Veneer's anchor reads Bootstrap's `--bs-link-*` custom
properties, its own `--vn-link-*` tokens, or a mix, nor whether the opacity expression in the
anchor partial is the mechanism Bootstrap uses for its hover colour. Name what you find rather
than resolving it.

## Scope

Read-only. You own no file. Write nothing, run no build, run no test.

## Execution

Perform the assignment directly and spawn nothing.

## Output

Four sections, each with `file:line` pointers and no raw dumps.

1. **The `link` key.** Its selector list verbatim, the declaration properties under each
   selector, and its `properties` object's keys. Mark any selector already emitted by
   `elements/_a.scss`.
2. **The anchor partial.** Its rules, the tokens each declaration reads, and the opacity
   expression written out with what each operand resolves to. Say what the expression computes
   and which state it applies to.
3. **The tokens.** Every link-related token with its value in each mode, where it is defined, and
   whether it is a Veneer token or a Bootstrap custom property the partial reads through.
4. **The record and the guide.** What the calibration record measured for anchors, row by row,
   and which of those readings the shipped anchor matches. Then every existing guide row for the
   `link` component with its Status and Owner.

## Deviation contract

`.agents/orchestration.md` § Deviation protocol. Settle yourself how you group the rows and how
much of a declaration list you quote. Stop and report if a file this brief names does not exist.

## Acceptance criteria

1. Section 1 lists every selector under the `link` key with its properties.
2. Section 2 writes out the opacity expression and says what it computes.
3. Section 3 names every link token and whether it is Veneer's or Bootstrap's.
4. Every claim carries a `file:line` pointer.
