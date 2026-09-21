# Unit CL7 — containers

## Role and engine

`sol` on Astra (GPT-6 Astra through `codex exec`, `workspace-write`), the sole writer in the
Veneer checkout (`C:/Users/mikes/WebstormProjects/veneer`), at the CL6 landing. Perform the
assignment directly and spawn nothing.

Read before acting: `AGENTS.md` at the Veneer checkout root, `.claude/rules/styles.md`,
`tests.md`, `architecture.md`, `names.md`, `application.md`, `browser.md`, and
`documentation.md`. This unit names no skill.

## Objective

Ship the container classes Bootstrap's pinned inventory records under its `container` key, with
their breakpoint-scoped maximum widths, the gutter properties they publish, and the showcase
section that renders them, so the key reads `shipped` and joins the listed set.

## Terrain and rulings already taken

Two retained records carry what this unit must not re-derive. Read both before editing.

- `units/cl7-scout-report.md` — the terrain map: every selector under the key with its media
  condition, the breakpoint ramp and the members that read it, the case table and viewport
  visitor a proof would use, and the deferral rows.
- `units/cl7-rulings.md` — the Orchestrator's three rulings and the reasoning behind each.

**The ramp covers every condition the key carries.** Every minimum-width condition in the fixture
matches a named breakpoint mixin at the same pixel width, and the difference is spelling rather
than coverage: the fixture stores the legacy form while the mixin emits the range form, and the
existing parser treats them as one boundary. So no new ramp member is needed.

## Obligation 1 — the partial

Place the classes in `src/styles/components/_container.scss`, wrapped in `@layer components`,
loaded from `src/styles/index.scss` beside the other component partials. Mirror an existing
component partial for file shape.

The key has three groups, per the terrain map. The unconditioned fluid shell, seven selectors
sharing the same declarations. The breakpoint-scoped maximum widths, where each named variant
starts capping at its own boundary and then shares the plain container's larger caps. And the
navigation combinators.

**Ruling: the navigation combinators ship.** Their declarations are self-contained layout on the
container itself, they complete the key without invoking the exclusion machinery, and the rule
never matches until a consumer brings their own navigation markup, at which point it is correct.
Excluding them would require explaining why a container-key selector is absent from a cascade
that ships the container, and the deferral table defers selectors the package chooses not to
style, not selectors it styles under an ancestor it does not define. Say in your report that the
navigation class is referenced and not defined, so the guide's owner can record it.

## Obligation 2 — the widths and the gutter take tokens

The container payload widths are not the ramp widths, and no token's name contains `container` or
`gutter` today. The space scale's twelfth member carries the gutter's value as a number, which is
a coincidence rather than a named gutter token.

**Ruling: the widths and the gutter take tokens of their own**, emitted beside the breakpoint
tokens, because the styles rule bars a literal length outside the token file and these are a
published scale a consumer retunes. The Bootstrap gutter properties alias the Veneer token rather
than the reverse, matching how every other alias in this package is oriented.

**Measure the blast radius before adding them.** Enumerate every consumer of the space scale
member that carries the gutter's value today, take each reading before and after, and report
which moved. **Stop and report** if a consumer outside this unit's owned set moves. That hazard
is not hypothetical in this campaign: a token that read like a private value turned out to anchor
every dark role tier, and the link retune reached a closed family's button.

## Obligation 3 — the key ships

Give the key its compatibility rows and add it to the listed value in `tests/conformance.test.ts`.
**The key carries two gutter custom properties**, so like the link key and unlike the typography
keys it is **not** admitted by the empty-properties branch of the function deciding what counts
as shipped. Read that function, give the key whatever variable rows it requires, each shipped and
each resting on a proof that reads the property's resolved value rather than its presence in
source, and cover both properties.

**Write no other guide edit.** Every departure and explanatory sentence this unit's rulings imply
is a bound for the unit that owns the guide; list them in your report rather than writing them.

## Obligation 4 — the proof drives the viewport through what exists

The breakpoint case table and the viewport visitor already apply below, at, and above every
published boundary and read computed style, so this unit needs no new driving mechanism. What it
needs is an expected-value table for the payload widths, which is new rows in the styles setup
module beside the existing case tables.

The case table's lowest reading sits below the first boundary, which is the floor a container
proof needs to read the fluid width before any cap applies. Use it. Prove that removing one
shipped selector reddens the presence scan, and that a container's maximum width at a boundary is
read rather than assumed.

## Obligation 5 — the showcase section

Add the layout section with its specimen table and its proof. **Three sections now extend one
shared base**; read what landed and extend it rather than copying a section file. Its copy type
carries a region name and a lead paragraph, and its row type carries a name and markup.

## Unknowns

Settle each yourself and record what you chose:

- Whether the fluid shell's seven selectors share one rule or are written separately, and whether
  the breakpoint-scoped groups can be emitted from a loop over the ramp rather than written out.
- Whether any block this unit writes is shared with a partial already in the folder. **A standing
  proof sweeps every partial for a declaration block shared by two partials**, so a shared block
  reddens the suite rather than reaching an audit. Run it before your gate chain.
- How the section divides its specimens, and each specimen's markup.

## Scope

Owned: `src/styles/components/_container.scss` (new) and its proof under
`tests/src/styles/components/`; `src/styles/index.scss`; `src/styles/_tokens.scss` and
`src/core/constants.ts`, **for the container and gutter tokens and their registry leaves alone**;
`tests/setupStyles.ts` for the container case tables and `tests/setupStyles.test.ts` for their
cases; `tests/conformance.test.ts` and `tests/setupConformance.test.ts` where the key's rows move
a population; the layout section and its proof under `app/browser/sections/` and
`tests/app/browser/sections/`, with `app/browser/constants.ts`, `index.ts`, `Showcase.ts`, and
the showcase and barrel proofs; `guides/veneer.md` **for the container compatibility rows alone**.

Off-limits: every other partial under `src/styles/`, `src/styles/_mixins.scss`,
`src/styles/_reset.scss`, `tests/setupConformance.ts`, `tests/fixtures/**`, `package.json`,
`configs/**`, every vendored file, and every guide section other than the compatibility rows this
key needs. If closing a criterion needs one, stop and report.

## Execution

1. Obligation 2's before readings, the tokens and their registry leaves, the after readings.
2. The partial, the barrel load, then `npm run build:src:styles`.
3. The case tables and the proof, including the fluid reading below the first boundary, a capped
   reading at and above each boundary, and a red proof for one shipped selector.
4. The key's rows and its variable rows, then the conformance run.
5. The section and its proof.
6. The shared-block sweep, then the ordered chain from the checkout root: `npm run format:check`,
   `npm run lint:check`, `npm run check`, `npm run build`, `npm test`, then the Edge runs of
   `test:src:styles`, `test:setup:browser`, and `test:app:browser` with
   `PLAYWRIGHT_CHANNEL=msedge`.

## Output

Write `cl7-report.md` in the Veneer checkout and return it: the blast-radius table
before and after; each token with its value and its registry leaf; each selector group and how it
is emitted; the variable rows the listed function required and the proof each rests on; the
readings at and around each boundary; the red-then-green pair; the sweep's result; the guide
bounds your rulings imply, listed rather than written; each step's exit code and final lines on
both engines; the actual `git diff --stat` and `git status --porcelain --untracked-files=all`.
Keep it short.

## Deviation contract

`.agents/orchestration.md` § Deviation protocol. Settle yourself: the partial's internal order;
the token names within the registry's vocabulary; the case tables' shape; the section's
specimens. **Stop and report** if a consumer outside the owned set moves under the token
addition, if the listed function needs a variable row this unit cannot prove, if the sweep finds
a shared block whose extraction needs the mixins file, or if closing a criterion needs an
off-limits file.

## Acceptance criteria

1. Every selector the inventory records under the key is present in the built cascade, and
   removing one reddens the presence scan.
2. A container's width is read below the first boundary and its maximum width at and above every
   boundary the key carries, from the built cascade in the browser.
3. The blast-radius table shows every consumer's before and after reading, and no consumer
   outside the owned set moved.
4. The key reads `shipped` and appears in the listed value, with every row the listed function
   requires and a proof behind each variable row.
5. The section mounts, renders every declared specimen, and destroys, proved through the section
   contract, and it extends the shared base rather than repeating it.
6. The shared-block sweep reports no shared block.
7. Every gate exits 0 on managed Chromium and Edge.
8. The status lists only the files this brief owns.
