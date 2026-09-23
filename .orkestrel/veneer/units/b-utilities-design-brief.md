# Design brief — B-UTILITIES (the utilities family)

## Role and engine

Two lanes on one brief, blind to each other: `planner` on Opus 5 (native subagent, clean context,
read-only) holds the **subjective** lane (shape, naming, the feel of the partials, the specimens, the
proofs, and the guide sections a reader meets); `analyst` on GPT-6 Astra (`codex exec --sandbox
read-only` rooted at `/home/user/veneer`) holds the **objective** lane (correctness, constraints,
what the cascade, the ledger, the registries, the Tailwind proofs, and the gates permit). Each lane
performs the design directly, spawns nothing, edits nothing, and returns a proposal; the
Orchestrator reconciles the two into the family record and the plan.

## Objective

A unit plan for B-UTILITIES: the units, sized by mechanism and never by key, that ship every
utility and helper key the family queue lists in the cascade, the showcase, the proofs, the capture
registry, and the ledger, with the Tailwind compatibility proofs green over every shared name; each
unit with its keys, owned files, order and parallelism, acceptance criteria, the mutation each proof
distinguishes, and its risks; the family rulings the record must carry; and the rulings the
Orchestrator must take before dispatch.

## Context

**Terrain.** `/home/user/scaffold/.orkestrel/veneer/units/b-utilities-terrain-report.md` (the
Cursor Grok distillate at `7b66db2`: § A the `$utilities` map entry by entry with flags and
selector counts, § B the helpers, § C the shipped `_gap.scss` pattern and the ledger's gap tables,
§ D Tailwind, § E the tokens, § F the rulings, § G sizing, § H the files the family makes false, the
contradictions, and the unresolved inputs). It wins over any restatement here; stop and report where
the tree disagrees with it.

**The Tailwind intersection.** The terrain's shell could not read the history path, so the
measurement is restated here from
`git -C /home/user/scaffold show dddc59a~1:.orkestrel/veneer/units/f8-tailwind-intersection.json`
(measured 2026-09-22, Tailwind `4.3.3`, Bootstrap `5.3.8`, `inventoryClasses` 2025,
`tailwindProducedSelectors` 209, `overlapCount` 31). The shared class names by stem:

```text
align (6): align-baseline align-bottom align-middle align-text-bottom align-text-top align-top
bg (3): bg-black bg-transparent bg-white
border (9): border border-0 border-1 border-2 border-3 border-4 border-5 border-black border-white
bottom (3): bottom-0 bottom-100 bottom-50
caption (1): caption-top
col (13): col-1 … col-12, col-auto
collapse (1): collapse
container (1): container
end (3): end-0 end-100 end-50
flex (9): flex-grow-0 flex-grow-1 flex-nowrap flex-row flex-row-reverse flex-shrink-0 flex-shrink-1 flex-wrap flex-wrap-reverse
float (3): float-end float-none float-start
gap (6): gap-0 … gap-5
h (5): h-100 h-25 h-50 h-75 h-auto
invisible (1), visible (1), rounded (1), table (1)
m mb me ms mt mx my (7 each): -0 … -5 and -auto
opacity (5): opacity-0 opacity-100 opacity-25 opacity-50 opacity-75
order (8): order-0 … order-5 order-first order-last
overflow (12): overflow-{auto,hidden,scroll,visible} and the -x and -y twins
p pb pe ps pt px py (6 each): -0 … -5
shadow (4): shadow shadow-lg shadow-none shadow-sm
start (3): start-0 start-100 start-50
text (7): text-black text-center text-end text-nowrap text-start text-white text-wrap
top (3): top-0 top-100 top-50
w (5): w-100 w-25 w-50 w-75 w-auto
z (4): z-0 z-1 z-2 z-3
```

The guide's contract for a shared name (terrain § D): a shared name leaves the exclusion line only
where Veneer declares with `!important` every longhand that Tailwind's rule for that name
declares; the F8c consumer proof reddens when a shared name ships whose Veneer declarations are all
normal (the § Carriers row "A later unit that ships a shared class name whose Veneer declarations are
all normal", carrier not yet known: this round names its carrier).

**The pinned inventory.** `tests/fixtures/oracle/inventory.json` is the pinned Bootstrap `5.3.8`
inventory the ledger compares against (135 component keys; each key holds `selectors` as objects
with `selector`, `declarations`, and `classes`, plus `declarations`, `properties`, `keyframes`, and
`media`). The Orchestrator's reading of which keys carry the helper and utility selectors the queue
does not list (a Python walk over `json.dumps(component.selectors)` per key, 2026-09-23):

```text
text-bg-        ['text']
overflow-x-     ['overflow']
text-decoration-['icon-link', 'link', 'reboot', 'text']
text-opacity-   ['text']
link-opacity-   ['link']       link-offset- ['link']       link-underline ['link']
bg-opacity-     ['bg']         border-opacity- ['border']
pe-none         ['pe']         (the `pe` key holds padding-end and pointer-events together)
visually-hidden ['visually-hidden']    hstack ['hstack']    stretched-link ['stretched-link']
clearfix        ['clearfix']   focus-ring ['focus-ring', 'theme']
fixed-top       ['fixed']      sticky-top ['sticky']       text-truncate ['text', 'text-truncate']
d-print-        ['d']          m-1 ['m']    fs-1 ['fs']    gap-1 ['column-gap', 'gap', 'row', 'row-gap']
m-n1            []             (the release emits no negative margin; the inventory records none)
```

Exit criterion item 3 requires every key the pinned record carries to end `shipped`, deferred with
an owner, or excluded with a reason the user has seen, so the entries the queue does not list
(terrain § A "Entries the queue does not list" and the contradictions) need a ruling, not silence;
`text-bg-*` sits under the `text` key and the `link-*` entries under the shipped `link` key.

**Obligations.** `ROADMAP.md` § The family queue, the **B-UTILITIES** bullet ("Size each unit by
mechanism, never by key"); § Phases and units, the B-UTILITIES row; the § Carriers rows the terrain
§ F quotes (CL8b, the helper key with no showcase home, the shared-name carrier); exit criterion
items 2, 3, 5, and 6; D2 and D6 (`/home/user/scaffold/.orkestrel/veneer/units/decisions-round-2.md`:
every Bootstrap utility ships with its `!important` as Bootstrap writes it; Bootstrap wins where a
class exists in both libraries); D5 (no right-to-left output: the `rtl: false` wrapper comments
never ship).

**Family pattern.** `/home/user/scaffold/.orkestrel/veneer/units/b-passive-family.md` and
`b-passive-baseline.md` (the B-PASSIVE family record and baseline); the reconciled record for this
family takes the same shape. `/home/user/scaffold/.orkestrel/veneer/b-passive-close-design-verdict.md`
(the family close's rulings: the stem rule, the flat `DRIVEN_KEYS` registry, `REDUCED_MOTION`, the
§ Showcase rule, the barrel order home in § Styles). The shipped pattern is `_gap.scss` (terrain
§ C): `@layer utilities`, `breakpoint-each`, literal grouped selectors, `!important` on property
declarations, tokens read through `var(--vn-…)`.

**Tree.** `/home/user/veneer` at `87ff1d0` (the session branch: CLOSE-REGISTRY and CLOSE-MOTION
landed; CLOSE-GUIDE, which rewrites § Showcase, § Styles, § Customization, and § Tests of
`guides/veneer.md` and repairs the duplicated important-utility paragraph the terrain's
contradictions name, has not landed and will land before any unit of this family dispatches;
B-PASSIVE-ORDER will move the passive block and the helpers `icon-link`, `ratio`, and `vr` after
it in the barrel, so a utilities `@use` line lands after the helpers). Veneer `main` is `88684bc`.
The mixins `breakpoint-up`, `breakpoint-each`, `breakpoint-down`, `reduced-motion`, `transition`,
`forced-colors`, `forced-ring`, `focus-ring`, `role-each`, and `theme-tokens` exist in
`src/styles/_mixins.scss`. The tokens the utilities bind are listed in terrain § E (space, size,
weight, line, radius, border, shadow, stack, breakpoints, gap; no opacity scale).

**Law.** `/home/user/scaffold/AGENTS.md`;
`/home/user/scaffold/.claude/rules/{styles,tests,browser,names,documentation,writing,architecture}.md`;
`/home/user/scaffold/.agents/orchestration.md` § Dispatch anatomy. The guide is `guides/veneer.md`.

**Host facts for the units.** Linux; npm 11 on `PATH` through
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`;
Chromium installed; a `CAPTURE=1` journey run of one variant takes about two minutes;
`tests/setupPolicy.ts` and `tests/policy.test.ts` are vendored and off-limits, and the policy
mirror law requires a `tests/src/styles/utilities/<name>.test.ts` to mirror a
`src/styles/utilities/_<name>.scss`; one writer per worktree, parallel worktrees from the commit
the launch names, shared files (`src/styles/index.scss`, `tests/setup.ts`,
`app/browser/constants.ts`, `app/browser/Showcase.ts`, `tests/setupStyles.ts`, `tests/setupServer.ts`,
`tests/conformance.test.ts`, `guides/veneer.md` ledger tables) report-only with serial integration.

## Unknowns

- The unit split by mechanism: which mechanisms (the spacing scale, the display and flex set, the
  sizing set, the type set, the paint set with its `local-vars` opacity pattern and the `css-var`
  entries, the position set with the position helpers, the gap keys against the shipped `_gap.scss`,
  the stacks, the visibility and overflow and float set, the `rfs` font-size pass, the `print`
  display pass, the `state` link entries) and how many partials, sections, and proofs each takes;
  the `!important` on every property declaration and none on a `css-var` custom property.
- The gap contradiction: the queue assigns `gap`, `column-gap`, and `row-gap` to this family while
  `_gap.scss` ships `g`, `gx`, `gy`, and `row-gap` (the gutter mechanism) and the ledger records
  them; rule where Bootstrap's `gap` and `column-gap` entries land and whether `_gap.scss` splits.
- The entries the queue does not list (`overflow-x`, `overflow-y`, `text-decoration`,
  `text-opacity`, `link-opacity`, `link-offset`, `link-underline`, `link-underline-opacity`,
  `bg-opacity`, `border-opacity`, `pointer-events`) and the helpers it does not list (`color-bg`
  as `.text-bg-*`, `colored-links` already under the `link` key): for each, ship in this family,
  defer with an owner, or exclude with a reason, per exit criterion item 3 and the pinned
  inventory's keys.
- The negative-margin entries under `$enable-negative-margins: false` (the release emits none) and
  the `rfs` pass for `font-size`: what the pinned inventory records for each, and what the ledger
  therefore compares.
- The shared-name contract: which shipped utility names sit on the exclusion line, which leave it
  because every Tailwind longhand is important in Veneer, and which proof (the consumer proof, a
  new service case) pins each; the carrier for the "all normal" row.
- The showcase and captures for utilities: the subject and frame each mechanism takes (a utility
  has no component region today; the helper row "no subject region and no showcase home" carries
  the requirement that each remaining real consumer supplies it), and how many specimens photograph
  a mechanism rather than a key.
- Token binding: which utilities read `--vn-space-*`, `--vn-radius-*`, `--vn-shadow-*`,
  `--vn-stack-*`, `--vn-size-*`, `--vn-weight-*`, `--vn-line-*`, and the breakpoint ladder, which
  read Bootstrap's literal (no token exists, such as the opacity scale and the position percentages),
  and the departure row shape for each.
- The dark and theme axes: the subtle and emphasis color maps read `var(--bs-…)` variables the
  theme declares; rule how they bind to Veneer's roles and what `[data-bs-theme="dark"]` changes.

## Scope

Read-only. Read the terrain, the intersection restated here, the pinned inventory, the decisions,
the family records, the design verdicts, the roadmap, the guide, and the tree. Edit nothing.
Propose; do not decide for the Orchestrator.

## Execution

**A native subagent (planner):** perform the design directly and spawn nothing. **The bench engine
(analyst) reading this inside its own CLI:** perform the design directly and spawn nothing.

## Output

Return one proposal with these sections: `Units` (each with a name, mechanism and keys, role and
engine route, owned files, shared report-only files, off-limits files, order and dependencies,
acceptance criteria ordered cheap-first, the mutation each proof distinguishes, and the risks);
`Family rulings` (the rulings the family record must carry, numbered, each with its option, cost,
and recommendation); `Rulings needed` (each unknown, with the option, its cost, and a
recommendation); `Files the result makes false` (per unit, derived from terrain § H); `Exit
criterion` (the enumerated capabilities whose closure ends the family); and, for the analyst,
`Journal` (the journal path and session id). No process diary.

## Deviation contract

§ Deviation protocol in `/home/user/scaffold/.agents/orchestration.md`. A lane that finds the
terrain and the tree disagreeing reports the disagreement and rules on the tree.

## Acceptance criteria

The proposal names every queue key's closure and a ruling for every unlisted entry and helper the
pinned inventory records, every unit's owned files are disjoint from every other unit's, every
proof named carries the mutation it distinguishes, and every shared name has a named proof.
