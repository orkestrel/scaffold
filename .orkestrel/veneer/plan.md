# `@orkestrel/veneer` campaign plan

The live campaign for `@orkestrel/veneer` after the foundation round of 2026-09-30, accepted by the `foundation-audit-2` verdict after `foundation-fix-11` landed and its two mutation probes reddened the instruments they name; the foundation round's verdicts, briefs, reports, and claims files are archived in git history at the sweep commit's parent (2026-10-01). The package's own `ROADMAP.md` is the plan of record for what to build; this file holds what the campaign owes, in what order, on which lanes, and the evidence it rests on. Delete this directory in the acceptance commit of the last chunk.

## Goal and exit criterion

Ship `@orkestrel/veneer` as a production-ready package on the foundation: the five chunks of `ROADMAP.md` § Sequence green with their proofs, the guide documenting every surface with a pinned behaviour sentence, `prepublishOnly` green, and the scaffold propagation items of `ROADMAP.md` § Scaffold propagation released so a `scaffold repair` restores every vendored file without losing a behaviour.

## Standing rulings

- The user's rulings of 2026-09-30, recorded in `foundation-design-verdict.md` beside this file: `!important` lifted out of the `bootstrap` layer unless a case is pivotal; the drop-in form first as the baseline, then the lift; `vue` an optional peer read by `./vue` alone; "Bootstrap wins on a shared class" bound to the Tailwind compatibility layer; the showcase rebuilt by `prepublishOnly` and gated by no test.
- The design verdict's nine rulings and § Findings carried are the contract every chunk builds on. Re-open none of them without a design round.
- The user's rulings of 2026-10-01 for the Bootstrap cascade chunk: every proof checks the bundled `node_modules/bootstrap/dist/css/bootstrap.css`, never the Sass sources directly; the chunk maps Bootstrap completely first, the `!important` declarations above all, as a durable record so a later deviation is deliberate and traceable; `src/core` keeps the registry of every token group (`bootstrap` now, `veneer` in the styles chunk), tested deterministically against the CSS that declares each token and exposed to the consumer in JavaScript.
- Carried forward, not implemented in the Bootstrap chunk (the user, 2026-10-01): after the Bootstrap chunk closes, `src/core` also tracks the class names of each face by kind (components, utilities, composables, modifiers, and the other folder kinds) for `bootstrap`, `tailwindcss`, and the Veneer styles, so a class is enumerable in JavaScript and provable deterministically against the sheet that declares it, the way the token registry is. The token registry's shape and proofs are designed so that class registries follow the same derivation-and-pin pattern; the roadmap sentence "Core holds CSS variable token names only" is amended by the chunk that lands the first class registry.
- The user's rulings of 2026-10-01 after the Bootstrap chunk closed, in this order of work: an Opus voice pass on the guide's Bootstrap sections; `src/core` first, the Bootstrap tokens reviewed and then the class registries by kind (components, utilities, composables, modifiers, and the rest) for `bootstrap`; then the Tailwind chunk, whose purpose is a map of Tailwind built the way Bootstrap's was, so the two registries and inventories compare deterministically for what is repeated or similar, where they overlap, and where they drift or are incompatible, with `src/core` gaining the `tailwindcss` group (tokens and classes) the same way; then the compatibility sheet against Bootstrap; until Bootstrap, Tailwind, and core are complete per `ROADMAP.md`. Tailwind 4.3.3 enumerates its own class population through `__unstable__loadDesignSystem(css)` (`getClassList()`, `getVariants()`, `candidatesToCss()`), measured from its tarball on 2026-10-01, so the Tailwind inventory is an instrument's reading of the installed package, not a hand map.
- Model routing: objective and constraint-heavy writing units run on GPT-6 Astra through `codex exec`; subjective units (API shape, naming, guide voice) and review lanes run on Claude Opus 5.5 through the native Agent tool with edits only, and the Orchestrator runs their commands; absorption and distillation run on Grok 4.7 through the Cursor bench, one lane at a time; never Fable as a subagent, never the Claude CLI.

## Chunks and the units each owes

1. **Bootstrap cascade** (`src/bootstrap`): closed on 2026-10-01 at veneer `1431b52` after two falsify rounds, their fix units, and the formatter refactor (every custom-property declaration in a literal partial as a Sass string interpolation, so the face is formatted like every other file with no directive and no exclusion) (the ledger beside this file holds every unit, lane, and reading; the design round's verdict is `cascade-design-verdict.md` beside this file). What it settled for the later chunks: link 1 (the drop-in compile byte-equal to `bootstrap.css` after one Sass round trip on each side), link 2, and link 3 (two whole-sheet priority sequences in Chromium against the bundled CSS after one Sass pass, each entry with its selector and its grouping context carrying the at-rule kind; that pass is pinned to the committed record `tests/fixtures/bootstrap/pass.json` of 16 rewrites and its SHA-256); the registry at all 449 declared names pinned both ways; the committed inventory `tests/fixtures/bootstrap/oracle.json` bound to the bundled text without a parser; the departure record as the record of an `!important` declaration kept inside the layer, read by the placement proof in both directions and empty; the guide's Bootstrap sections pinned sentence by sentence. Follow-up the next Bootstrap bump owes: the inventory generator (`veneer/tmp/units/cascade-inventory.ts` with `cascade-regions.ts`) and the port instrument (`cascade-port.ts`) live under the ignored `tmp/units/`; move them into the tree as scripts with proofs before regenerating `oracle.json` for a later Bootstrap version.
2. **Tailwind map** (`src/tailwindcss`). Add the Tailwind compiler as a devDependency with the first proof; derive the shared-name set against real Tailwind; withhold every shared name from the compatibility sheet; prove the exclusion recipe and the `properties` placement rule; carry the `absorb-tailwind` distillate's exclusion-line derivation (importance must cover every longhand of Tailwind's rule after shorthand expansion) and its `postcss-import` ordering fact.
3. **Veneer styles** (`src/styles`). Declare the first `--vn-*` token and the `veneer` registry group with its two-way pin; fill the default theme pack; give the themes barrel its own order-statement copy when `_tokens.scss` gains `:root` declarations; replace the placeholder `--bs-`/`.btn` refusal with the additions record; take the carried mechanisms of `absorb-styles-source` (factors, motion tokens, contrast rule, `retune`) and drop the Elements-look values `absorb-styles-identity` marks `identity`.
4. **Browser engine** (`src/browser`). Rebuild from scratch on native APIs; keep the platform facts `absorb-engine-mechanisms` records (animation settling, host snapshots, `inert` isolation, scroll lock, popover anchoring) and re-decide every design choice; read `absorb-engine-contract` for the wire tables Bootstrap's cascade selects on and `absorb-old-guide` for the departures the old engine documented.
5. **Vue composables** (`src/vue`). Declare the optional peer; externalize `vue`; keep `@vue/*` refused; prove a packed consumer under npm, pnpm strict, and Yarn Plug'n'Play, and `.` and `./browser` without Vue.

Scaffold propagation runs beside the chunks in the order `ROADMAP.md` § Scaffold propagation lists, each item a scaffold unit with a scratch-adopter proof, and veneer adopts the release that carries it.

## Evidence base

The distillates under `distillates/` beside this file are the extracted knowledge of the old `mikesaintsg/veneer` repository (clone at commit `86491c2`, read on 2026-09-30) and of the prior campaign's records; `old-guide-headings.txt` and `old-setup-exports.txt` are the maps the lanes read from. Each row names what a chunk reads it for.

| Distillate | Chunk | Holds |
| --- | --- | --- |
| `absorb-styles-plan` | 1, 3 | the old recreation, token, and proof facts |
| `absorb-styles-baseline` | 1 | the old Bootstrap baseline records |
| `absorb-styles-source` | 1, 3 | every mechanism, token, and mixin of the old cascade with a reuse ruling |
| `absorb-styles-identity` | 3 | the Elements identity rulings, split into what the successor keeps and drops |
| `absorb-tailwind` | 2 | the compatibility proofs, the exclusion-line derivation, the recipes, the `properties` layer |
| `absorb-engine-rulings`, `absorb-engine-terrain`, `absorb-engine-findings` | 4 | the old engine's rulings, terrain, and audit findings |
| `absorb-engine-contract`, `absorb-engine-mechanisms`, `absorb-old-guide` | 4, 5 | the wire tables, the platform mechanisms, the documented departures |
| `absorb-old-roadmap` | all | the old tenets and rulings with the successor's disposition of each |
| `absorb-test-infra` | all | the old helper families with the lesson each encoded and a keep-or-drop ruling per family |
| `absorb-showcase` | 1, 4 | the old showcase's section registry and specimen contract, the journey families (journey, refusal, matrix, capture) with their lessons, and the capture portfolio rules |
| `absorb-styles-reports` | 3 | the measured token, contrast, ledger, and proof facts of the old styles units (which token moves from which scope, what each mixin reads) |
| `absorb-engine-reports` | 4 | the oracle recordings of the old engine against Bootstrap's own bundle, plugin by plugin, with every recorded departure (inert on triggers, `data-popper-placement`, the toast `hide` class, `data-bs-original-title`, the popover attribute) |

Each distillate cites the old repository's clone (`tmp/mikesaintsg-veneer/`, commit `86491c2`) or the prior campaign's records, both archived in git history at `9cc22b237`, the last commit before this campaign swept the folder.

## Standing readings

- Loader family: a cached sheet read is 317 to 340 times faster per call than a fresh read; 120 text-proof files run in 1.1 s on `pool: 'threads', isolate: false` against 4.2 s on isolated forks (2026-09-30).
- Chromium face projects: 120 full-sheet files in 13.5 s isolated, 5.9 s with `isolate: false`, 1.5 s in the Node threads pool (2026-09-30); text proofs stay in Node.
- Theme cases measured on Chromium 153.0.8010.12 (Playwright revision 1243); `@scope` with a lower boundary is supported there.
- Vite's dependency optimizer reloaded a browser test mid-run once under load; every browser project pre-bundles the shared test dependencies.
- The Sass round trip is one pass on each side: a second pass strips a leading space from Bootstrap's banner lines (`foundation-audit-2`, objective lane).
- Real Tailwind's `properties` layer: 9px with `properties` first, 1px with a separately linked Veneer prelude first, on the composition witness (`foundation-audit-2`, objective lane).
- Every built sheet ends with Vite's `/*$vite$:1*/` marker; the equalities drop it, and the cascade chunk rules whether the shipped sheet strips it.
