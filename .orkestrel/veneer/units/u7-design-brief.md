# U7 Button — design brief (one brief, two lanes)

## Roles and engines

The adversarial pass on one brief: `planner` on native Opus 5 holds the SUBJECTIVE lane (shape,
naming, ergonomics, the API a consumer meets, placement under the fleet's conventions); `analyst`
on Astra holds the OBJECTIVE lane (correctness, constraints, what the installed packages, the
rules, and the oracle fixture permit). Each lane is a clean context, reads this brief and its
evidence slice, proposes, and never accepts; the Orchestrator reconciles both into the U7 plan and
the `sol` implementation brief. Perform the assignment directly and spawn nothing; you edit
nothing and run nothing.

## Objective

Rule, with reasons and alternatives, on the design questions under § Questions for U7 Button,
Veneer's first component and the journey pilot, so that the implementation brief can be fully
specified. Answer every question; where two answers are defensible, give both with the cost of
each and recommend one.

## Context

Read, in this order, from `C:/Users/mikes/WebstormProjects/scaffold`: `AGENTS.md`;
`.claude/rules/architecture.md`, `names.md`, `patterns.md`, `browser.md`, `styles.md`,
`tests.md`, `documentation.md`; `.orkestrel/veneer/plan.md` § U7 Button and § Close each component
on browser evidence; `.orkestrel/veneer/research/obligations.md` § Button and § Cross-cutting
engine; `.orkestrel/veneer/research/ledger.md` (the `btn` CSS row and Button's obligation rows);
`.orkestrel/veneer/research/calibration.md` (Elements' button treatment);
`.orkestrel/veneer/units/u4b-report.md` (the oracle fixture's shape, Button's recorded steps, and
the `## Compatibility` row grammar as landed); `.orkestrel/veneer/u1-conform-audit-verdict-2.md`
(the wrapper-test ruling that deleted pass-through factories, and bound 13 on a constructor that
mounts). Then the Veneer tree at `C:/Users/mikes/WebstormProjects/veneer`: `src/browser/**`
(`ColorMode` is the pattern: a lone class flat at the environment root, `types.ts`,
`constants.ts`, `validators.ts`, the barrel), `app/browser/**` (the shell: `Showcase.ts`,
`main.ts`, `styles/`), `src/styles/**` (`_tokens.scss`, `_theme.scss`, `_mixins.scss`,
`elements/`), `tests/app/browser/integration.test.ts` (the journey axis, its portfolio and matrix
cases), `tests/setupBrowser.ts` (`mountShowcase`, the paint readers), `tests/conformance.test.ts`
and `tests/setupConformance.ts` (the oracle and the compatibility reader U4b landed),
`tests/distribution.test.ts`, `guides/veneer.md`, `package.json` (`exports`, `dependencies`,
`devDependencies`), and the installed declarations: `node_modules/@orkestrel/test/dist/src/browser/index.d.ts`
(`clickAccessible`, `hoverAccessible`, `holdAccessible`, `pressKeys`, `readRing`, `readContrast`,
`readStates`, `readRefusal`, `stageMedia`, `createPortfolio`, `captureFrame`, `waitForState`),
`node_modules/@orkestrel/contract/dist/src/core/index.d.ts` (guards and `createContract`).

Standing rulings that bind the design: one guide per package (`guides/veneer.md` alone); no RTL
work (the twin stays as emitted; strike RTL from the CSS scope); Veneer pilots the styles axis by
hand; a lone class sits flat at the environment root and a family nests in a lowercase plural
folder only when a sibling lands; pass-through factories are deleted (`createColorMode` went), so
the plan's `createButton` is a question, not a given; the user has ruled that rounds focus on
implementation. `@orkestrel/contract` is a devDependency today and the plan makes it the first
runtime dependency.

## Questions

1. **The engine's contract.** `src/browser/Button.ts` as one class over a `<button>` or anchor
   host with a readonly `pressed` state, `toggle()`, and `destroy()`: how `pressed` derives from
   the host (the `active` class, `aria-pressed`, both, or the engine's own field), what `toggle()`
   writes and in what order (Bootstrap's `button.js` flips the `active` class and sets
   `aria-pressed` from the toggled result), what `destroy()` restores (the consumer's attributes
   it found at construction), and the `toggle` event's wire type on the host (a namespaced
   `CustomEvent` type; name it) and its cancelability. Single-word members; the option shape in
   `types.ts` (`ButtonOptions`: the host, what else) and the interface (`ButtonInterface`).
2. **Option validation.** Whether `@orkestrel/contract` becomes a runtime dependency for the
   options guard, or the guard stays a hand-written predicate in `validators.ts` as
   `isColorModeState` is; the cost of each (a runtime dependency reaches every consumer).
3. **The factory.** Whether `createButton` exists at all under the wrapper test, and if so what it
   composes beyond `new Button(host, options)`; recommend deletion unless it adds a boundary.
4. **The compatibility boundary.** The `./browser/auto` entry: its module placement under the
   centralized-file rules (a subpath export needs an entry the manifest's `exports` names; where
   under `src/browser/` it sits, what it exports), the one delegated listener for
   `[data-bs-toggle="button"]` (registration, `preventDefault`, host resolution through
   `closest`, and its removal), and the adapter carrying the Bootstrap spellings (`getInstance`,
   `getOrCreateInstance`, `toggle`, `dispose`) behind that entry and never on the engine class;
   how the adapter maps a host to its engine instance (a `WeakMap`), and how `dispose` and
   `destroy` relate. Name the test file that proves the delegated click from a child element.
5. **The CSS.** `src/styles/elements/_button.scss` (a bare `<button>`'s compact neutral default
   and same-element states, from Elements' treatment) and `src/styles/components/_button.scss`
   (`.btn`, every `.btn-{variant}` and `.btn-outline-{variant}` the ledger names, `.btn-link`,
   `.btn-sm`, `.btn-lg`, `.btn-check` with its label, `.active`, `.show`, `.disabled`,
   `:disabled`, `fieldset:disabled .btn`, anchor hosts with `aria-disabled`, every `--bs-btn-*`
   variable bound to a `--vn-*` token, the focus ring, hover and active tints derived from the
   variant fill, forced-colors fallbacks, the 150 ms transition with its reduced-motion pair): the
   partial's layer (`components`), how the variant loop derives tints (Elements' way or
   Bootstrap's `shade-color`/`tint-color`), which `--vn-*` tokens the ledger's 34 `--bs-btn-*`
   properties bind to (name each binding or the rule that derives it), and how the presence check
   U4b landed reads the shipped selector set (every one of the inventory's 103 `btn` selectors
   must appear in the built cascade for the `shipped` status; rule whether all 103 ship in U7 or
   whether a subset ships with the rest excluded on the record, and what the check needs).
6. **The journeys and captures.** On the journey axis in `tests/app/browser/integration.test.ts`:
   the shell's Button section (every variant by state by theme), click and keyboard toggling read
   through the rendered surface, disabled refusal through the exact voice, focus ring through
   `readRing`, contrast per variant and state through `readContrast` with its control, hover and
   active through the U6 verbs, reduced motion through the U6 helper, anchor and native hosts,
   captures placed from the journeys with the filename and placement proofs and the capture-run
   membership proof, a planted failing journey retained while red, and the oracle fixture
   compared on the same markup and actions. Rule how the shell's Button section is built
   (`Showcase.ts` grows a section, or a `Section` family opens), and answer U1-conform bound 13
   (a constructor that mounts, and the `void new Showcase(document.body)` it costs the entry:
   keep, or a one-word `mount()` method).
7. **Distribution and the guide.** What the distribution stage exercises offline (the packed CSS,
   `./browser`, `./browser/auto`) and how; where Button's rows land in `guides/veneer.md`
   (`## Surface`, `## Methods`, `## Examples`, `## Compatibility` flipping Button's rows to
   `shipped`, `## Styles` gaining the partials, `## Showcase`, `## Tests`), with no second guide.
8. **Unit decomposition.** Whether U7 is one `sol` unit or a serial chain (CSS, engine and
   adapter, shell and journeys, guide), each with its owned files and acceptance criteria, and
   the order; name what each unit's acceptance requires and which rows of § Close each component
   on browser evidence each closes.

## Output

For each question: the ruling, the alternative considered, the cost of each, and the rule or
file that decides it. Then a proposed unit list (name, role, owned files, acceptance criteria,
order). Then the risks you see. No process diary. The `planner` returns its answer as its final
message; the `analyst` returns its answer as its last message through the bench.
