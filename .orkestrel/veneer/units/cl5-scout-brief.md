# CL5 scout — the typography and content component keys, and the showcase section shape

## Role and engine

`grok` (Cursor Grok 4.6 through the Cursor CLI, read-only). The Claude-side driver carries this
brief across unaltered and returns the journal path and the distillate untouched; the engine
behind the CLI reads it and answers directly, spawning nothing.

## Objective

A distilled map, with `file:line` pointers, of three things CL5's brief needs and must not
re-derive: every selector the pinned Bootstrap inventory records under the component keys CL5
owns, grouped by the partial that will own it; the shape a showcase section must implement; and
the state of the styles component folder and the guide rows those keys already have.

## Context

Checkout: `C:/Users/mikes/WebstormProjects/veneer`. The working tree carries unit CL4's changes
on top of the CL3b landing `d822d59`; read the working tree as it stands and do not judge CL4.
Read only these, and read nothing else:

- `tests/fixtures/oracle/inventory.json` — the pinned Bootstrap inventory. Its `components`
  object is keyed by the guide's compatibility keys. CL5's keys are `h1`, `h2`, `h3`, `h4`, `h5`,
  `h6`, `small`, `mark`, `lead`, `display`, `list-unstyled`, `list-inline`, `initialism`,
  `blockquote`, `img`, and `figure`. Each component entry carries a `selector` array and a
  `properties` object.
- `src/styles/` — the whole folder, for what exists now: `index.scss`, `_tokens.scss`,
  `_mixins.scss`, `_reset.scss`, `elements/`, and `components/`.
- `app/browser/` — `Showcase.ts`, `constants.ts`, `types.ts`, and every file under `sections/`.
- `tests/app/browser/sections/` — every proof there.
- `guides/veneer.md` — its § Compatibility table and its § Deferred selectors table only.

## Unknowns

The Orchestrator does not know which of CL5's keys carry selectors the elements-layer guard would
refuse, nor whether the `display` and heading keys overlap the element partials CL3 landed. Name
each overlap you find rather than resolving it.

## Scope

Read-only. You own no file. Write nothing, run no build, run no test.

## Execution

Perform the assignment directly and spawn nothing.

## Output

Four sections, each with `file:line` pointers and no raw dumps.

1. **The keys by partial.** One row per key: the key, its selector list verbatim, its property
   names, and which of `components/_type.scss` (headings, `lead`, `display`, `small`, `mark`,
   `initialism`), `_list.scss` (`list-unstyled`, `list-inline`), `_quote.scss` (`blockquote`), or
   `_image.scss` (`img`, `figure`) would own it. Mark a selector that the elements layer already
   emits from a CL3 or CL4 partial, and mark a candidate exclusion with the reason it is one.
2. **The section interface.** The exact contract a showcase section implements — its type, its
   methods, how `Showcase.ts` constructs and destroys sections, and how `constants.ts` declares a
   section's specimens. Name one existing section and its proof as the pattern to mirror.
3. **The component folder.** What `src/styles/components/` holds now, how `index.scss` loads it,
   the layer the components sit in, and the mixins `_mixins.scss` exports that a type, list,
   quote, or image partial would read.
4. **The guide rows.** Which of CL5's keys already appear in § Compatibility or § Deferred
   selectors, with the Status and Owner each row carries.

## Deviation contract

`.agents/orchestration.md` § Deviation protocol. Settle yourself how you group the rows and how
much of a selector list you quote. Stop and report if a file this brief names does not exist.

## Acceptance criteria

1. Every key the objective lists appears in section 1 with a partial assigned or an exclusion
   reason.
2. Section 2 names the section contract's members and one mirror pattern with its proof.
3. Section 3 names the folder's files and the mixins available.
4. Every claim carries a `file:line` pointer.
