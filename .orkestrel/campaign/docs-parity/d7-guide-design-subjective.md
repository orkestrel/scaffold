Lane held: **subjective** (shape, taste, naming, ergonomics, the unit plan and its order). I read the brief, the distillate, `.claude/rules/documentation.md` § Parity, `/home/user/scaffold/tests/guides.test.ts:150-229`, `/home/user/scaffold/scripts/docs.ts`, `rulings.md`, `plan.md`, `orchestrator-measurements.md`, `instruments/d4/head-start-guide.sh`, the D6 audit findings, and the guide checkout files the brief names. I ran no command and edited nothing.

# Design

## Decision 1 — the compared columns

**Shape.** Every `## Surface` and `## Methods` table heads its compared column `Summary`. The surviving data columns are exactly the vocabulary the guide's own prose already fixed at `guides/guide.md:387` — `Shape`, `Signature`, `Value`, `Returns` — plus the mandatory `Kind`. Per table:

| Table | Header row after the change | What moves |
| --- | --- | --- |
| Surface / Types (`:32`) | `Name \| Kind \| Shape \| Summary` | the type literal before the em dash stays in `Shape`; the clause after it becomes the doc block's sentence, propagated into `Summary` |
| Surface / Constants (`:60`) | `Name \| Kind \| Value \| Summary` | the quoted literal moves to `Value`; the clause becomes the sentence |
| Surface / Helpers (`:79`) | `Name \| Kind \| Signature \| Summary` | `Behavior` renames; noun-phrase cells become verb-first sentences in the block first |
| Surface / Parsers (`:154`) | `Name \| Kind \| Signature \| Summary` | `Behavior` renames |
| Surface / Shapers (`:164`) | `Name \| Kind \| Shape \| Summary` | `Builds` goes; its type literal lands in `Shape` |
| Surface / Validators (`:178`) | `Name \| Kind \| Summary` | `Narrows to / Tests` goes; every cell in it reads `value: unknown`, so it carries nothing a row does not already have, and the narrowed type belongs in the sentence |
| Surface / Factories (`:192`) | `Name \| Kind \| Signature \| Summary` | `Behavior` renames |
| Methods / each interface (`:250`, `:263`, `:295`) | `Method \| Returns \| Summary` | `Behavior` renames |

Information a cell carries beyond the doc block travels in one of two directions, and the direction is decided by what the information **is**: a type literal, a signature, or a quoted value moves sideways into its data column; a fact about behavior goes into the doc block verb-first and is then propagated by `npm run docs -- --to guide`, the direction Ruling 6 fixes.

**Rationale.** This package is the reference implementation of the contract it publishes, so its own tables are the exemplar every fleet package copies; a guide that names one concept `Shape`, `Behavior`, `Builds`, `Narrows to / Tests`, and `Returns` teaches the fleet five names for one column. The permitted data-column set needs no invention: the guide already declares `Shape`, `Signature`, `Value`, and `Returns` guide-only data columns that stay unread, so adopting that set is the guide obeying a rule it wrote. `Builds` and `Narrows to / Tests` are outside it, and each fails on its own terms as well — `Builds` is a description column wearing a data column's name, and `Narrows to / Tests` is a slash-compound header whose cells repeat one string down the table.

## Decision 2 — the gate

**Shape.** `tests/guides.test.ts` gains the equality case inside the existing `for (const entry of manifest)` loop's `describe(entry.concept)` block, where `guide` and `source` are already constructed, and gains the population pin and the README case at file scope against `GUIDE_SPEC` (`:32`). All three collect into a `string[]` and assert `expect(collected).toEqual([])`, which is this file's house form and the seed's output form. The pin asserts in a form whose failure names both title sets:

```ts
it('pairs at least one example title across the guide and the source', () => {
	const titled = new Set(source.examples().map((example) => example.title).filter(isNonEmptyString))
	const fenced = guide.fences().map((fence) => fence.title).filter(isNonEmptyString)
	const paired = fenced.filter((title) => titled.has(title))
	const unpaired = paired.length > 0
		? []
		: [`${GUIDE_SPEC} pairs: guide ${JSON.stringify(fenced)} source ${JSON.stringify(Array.from(titled))}`]
	expect(unpaired).toEqual([])
})
```

The README case keeps scaffold's two `not.toBeUndefined()` guards before `expect(pitch).toBe(tagline)`, because `undefined === undefined` passes vacuously. This pin form is what D7.n propagates.

**Rationale.** One failure grammar across the whole equality gate is worth more than matching each case to the nearest existing idiom: a maintainer reads a pin failure the way they read a drift line and the way they read `npm run docs` output, because all three are `spec key: guide <left> source <right>`. `toBeGreaterThan(0)` is this file's guard idiom elsewhere, and it is exactly what D6 finding D refuses — `expected 0 to be greater than 0` tells a reader nothing about which side lost its titles. Putting the equality case inside the concept loop rather than hoisting an `inspected` array, as scaffold did for its several rows, avoids constructing the readers twice over one manifest row and names the failure by concept.

## Decision 3 — the tagline and the pitch

**Shape.** The H1 blockquote becomes one noun phrase in plain text and code spans:

> A pure, I/O-free guides-parity toolkit: the `Guide` and `Source` readers, the `findDrift` comparison, and the renderers and replacers that carry a change across.

The same blockquote, byte-identical and broken at the same points, goes under the README's H1. The blockquote's present sentences are placed rather than deleted: the `Source:` link and the `Published through` sentence join the guide's opening paragraph (`:11-24`) as one sentence naming the entry and its module; the `expect([]).toEqual([])` claim already lives at `:504-505` in § The check catalog; the `.claude/rules/documentation.md` citation already lives in § See also at `:813`. The README's opening paragraph stays, rewritten to drop the bijection claim the pitch now carries and to keep the onboarding it alone carries — add the devDependency, drop in the test file, wire the `guides` project.

**Rationale.** The compared form makes an unforgiving tagline: a link drops to its text on the guide side and stays a link on the README side unless both are authored identically, and a second sentence gives the pitch a place to drift that nothing reads. One noun phrase with code spans and no link removes both hazards while keeping what a reader wants from a tagline — the entities. The README's paragraph is not redundant with the guide and must not be shrunk to Ruling 6's scaffold shape: its `## API` section is the population of an existing check (`tests/guides.test.ts:50-81`) that nothing else replaces, and Ruling 6 ruled on scaffold's README, not on every package's.

## Decision 4 — the class head's `@example`

**Shape.** Both halves: widen the readers **and** state the reach where a reader meets it. `extractExamples` widens its membership from the `function ` key prefix to the declaration-head keys — `function`, `class`, and `interface` — so `source.examples()` returns the module's declaration-level blocks and `source.examples(name)` keeps returning that declaration's member blocks. `collectTitles` needs no edit: it unions `source.examples()` with the per-owner member blocks already. The obliged edits are `helpers.ts:2103-2124` and its TSDoc, `types.ts:358-371`, `Source.ts:128-130`, the `extractExamples` and `SourceInterface.examples` guide rows, the EQ catalog row, and the `extractExamples` / `collectTitles` / `Source.examples` suites. The guide then states the remaining reach precisely in § The check catalog's EQ row: the comparison reaches declaration heads and the own members of documented classes and interfaces, an untitled block stays presence evidence, a member's block belongs to the declaration that declares it, and the later fence of a title is outside the comparison.

**Rationale.** The widening makes the contract simpler to state, which is the test I trust most here: the axis becomes declaration-level against member-level, rather than function-level against member-level with a keyword carve-out nobody can motivate from the domain. The first real consumer exists and is measured — scaffold holds `Compiler`, `Materializer`, `Upstream`, `WriteTransaction`, and `ScaffoldError` equal by hand, and `Upstream` and `ScaffoldError` had already drifted before D6-fix-2 repaired them, so the ungated class fence is a demonstrated drift site rather than a hypothetical one. The change is opt-in downstream: an untitled block still pairs with nothing, so no package that is green today goes red by receiving the reader. Deferring costs a second guide release inside the same wave, because the fleet's own class blocks are met package by package in D7.n and each one would find the limit again.

## Decision 5 — titles

**Shape.** Title the function `@example` block of each § Patterns fence that documents exactly one exported symbol's own example, taking the fence heading verbatim: `createGuide` takes "Construct a `Guide` from markdown text", `createSource` takes "Construct a `Source` from an inline files record", `createSourceManager` takes "Resolve a fence's import specifier to the right `Source`", `findDrift` takes "Compare a guide against the source it documents", `extractSourceLines` takes "Project source into physical code lines", and `GuideInterface.tagline`'s member block takes "Read a guide's tagline". These fences stay unpaired as concept illustrations: "The bijection assertion shape" and "Resolve directory and file targets" compose several symbols under one fence, "Carry a summary across into the guide" composes `replaceCell` with `replaceSummary`, and "List the fence languages a package allows" carries fence markers inside its body, which the emitted three-backtick block cannot enclose (`guides/guide.md:614-616`). The `Guide`, `Source`, and `SourceManager` class blocks stay untitled: each documents the constructor door and the paired fence documents the factory door, and equating them would delete one of the two doors from the package's documentation.

**Rationale.** A title is a claim that one fence and one block are the same example, so the pairing rule reads best when it is applied where the claim is true and withheld where it is not. A composition fence is a different artifact from a symbol's example — it teaches how leaves combine — and forcing it onto one of its constituents makes the block long, makes the other constituents' blocks look neglected, and gives `--to source` a body that reads wrong under the declaration it lands on. Keeping several pairs rather than one means a later re-titling cannot silently retire the pin.

## Decision 6 — running the seed here

**Shape.** The order, with the Orchestrator owning every install:

1. Bump `version` to `0.0.18` (decision 7).
2. Build scaffold at `a0a47058`, pack it, and install the tarball into the guide checkout with `--no-save --ignore-scripts`, recording the replaced range `^0.0.63` in the same step — the mirror image of `instruments/d4/head-start-guide.sh`, written to a file and run as a file.
3. Run `repair` from the installed scaffold's built entry, `node node_modules/@orkestrel/scaffold/dist/bin/main.js repair`, never through the `npx` launcher. It writes the vendored host set and edits two package-owned files by region: `package.json` gains the `docs` script row, and `tsconfig.json` gains the `"@orkestrel/guide": ["./src/core/index.ts"]` paths entry that keeps `npm run check` independent of a build (P13). It refuses the package's own guide mirror, and it does not reach `tests/guides.test.ts`, `README.md`, `guides/README.md`, or `src/**`.
4. `npm run build`, then `npm run docs` report-only. Node resolves `@orkestrel/guide` through the `exports` map to `dist/`, so the build is a precondition of every run (P12, P13).
5. Converge summaries: hand-rewrite verb-first every block whose cell carries information the block lacks, then `npm run docs -- --to guide` once, then `npm run format`.
6. Converge examples: add the titles, then `npm run docs -- --to source`, then `npm run format`. The guide fence wins on content.
7. `npm run docs` to exit 0.
8. Restore the registry `@orkestrel/scaffold@0.0.63` before any release gate, and record that `scaffold audit` under that version reports the newly vendored paths until scaffold publishes and the guide re-pins. The guide's `prepublishOnly` chain does not run `audit` (`package.json:67`), so that reading does not gate the release.

**Rationale.** `repair` is the sanctioned mechanism and it leaves the tree in exactly the state a post-release re-pin produces; hand-copying `scripts/docs.ts` would leave the checkout in a state no mechanism reproduces and no audit can confirm. The seed must live inside the guide checkout rather than being run from scaffold's, because a bare specifier resolves from the importing file's location and scaffold's copy would read scaffold's head-started `node_modules`, not the readers this unit is changing. The build-first order is not a preference: the checkout's own source imports siblings with `.js` specifiers that Node's stripping loader does not map, so `dist/` is the only entry the seed can reach.

## Decision 7 — the version and the catalog

**Shape.** Bump `package.json` `version` to `0.0.18` as the first edit of the campaign, before the head start is packed for anything downstream. No other file carries the prior literal: not `src/`, not `tests/`, not `guides/guide.md`. The catalog row at `.claude/agents/orkestrel.md:60` is scaffold's file, regenerated by `scaffold catalog` at release, and no unit here edits it. Scaffold re-pins `package.json:106` and `BASE_DEV_DEPENDENCIES` to `^0.0.18` after the guide publishes; that is scaffold's obligation, not this unit's.

**Rationale.** D6 finding B is the whole argument: a local copy and a registry copy sharing `0.0.17` with different exports is what let scaffold's gates read bytes no consumer could install, and no version distinguished them. Bumping first means every tarball the fleet receives during D7.n announces itself as unpublished.

## Decision 8 — units and order

One checkout, one writer at a time, serial throughout. Each writing unit is dispatched from a clean committed baseline and commits before the next.

| Unit | Role (engine) | Owns | After | Acceptance |
| --- | --- | --- | --- | --- |
| U0 `guide-headstart` | Orchestrator (tracked command) | the pack-install-repair script, `package.json` version | — | `0.0.18` in the manifest; the tarball installed with the replaced range recorded; the exact list `repair` wrote captured; `npm run build` green; `npm run docs` runs and prints a worklist |
| U1 `guide-readers-class` | `implementer` (Opus 5; Sol's unit, bench dark, substitution recorded) | `src/core/helpers.ts`, `src/core/types.ts`, `src/core/sources/Source.ts`, `tests/src/core/**`, the guide rows the change makes false (`guides/guide.md:107`, `:270`, § The extraction model, EQ in § The check catalog) | U0 | a fixture carrying a titled class-head block enters `source.examples()` and `findDrift` reports it against a same-titled fence with a differing body; controls from outside the population — an untitled class head, a member block, a non-declaration comment — report unchanged; `npm run check`, `npm run lint:check`, `npm run test:src:core` green |
| U2 `guide-columns` | `implementer` (Opus 5) | `guides/guide.md`, doc blocks under `src/core/**`, `README.md` | U1 | every Surface and Methods table heads `Summary` and carries only `Kind`, `Shape`, `Signature`, `Value`, `Returns` beside it; `npm run docs` reports no summary disagreement; the H1 blockquote is one noun phrase and the README's pitch is the same text; `format:check`, `lint:check`, `check`, `test:src:core` green |
| U3 `guide-titles` | `implementer` (Opus 5) | doc blocks under `src/core/**`, `guides/guide.md` | U2 | the titled pairs of decision 5 exist and their bodies and languages agree; `npm run docs` exits 0 with no line printed; the unpaired fences are named in the unit's report with why each is unpaired |
| U4 `guide-gate` | `builder` (Sonnet) | `tests/guides.test.ts` | U3 | the equality case, the population pin in the both-sides form, and the README case land; each is proven red by a planted disagreement in a file this unit does not own, planted and removed by the Orchestrator; `npm run test:guides` green after removal |
| U5 `guide-verify` | `verifier` (Sonnet) | nothing | U4, registry scaffold restored | `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run build`, `npm test`, and `npm run test:distribution` under `PATH=/opt/npm11/bin:$PATH`, each with its exit code read |

Audit every nontrivial unit — U1, U2, U3 — with the objective lane (`analyst`, Sol; bench dark, substitute `reviewer` on Opus 5, recorded) and the subjective lane (`reviewer`, Opus 5) on numbered falsifiable claims, and add `checker` (Grok, then the ladder) where the criteria are mechanical: the surviving column set per table, the pin's failure form, and the absence of the prior version literal.

## Exit criterion for D7.guide

The unit set closes when each of these ends implemented, repaired, retained, or intentionally excluded on evidence: every Surface and Methods table heads `Summary` with only the sanctioned data columns beside it; `npm run docs` in the guide checkout exits 0; `tests/guides.test.ts` carries the equality case, the population pin naming both title sets, and the README case, each proven red on a planted disagreement; the H1 blockquote is one noun phrase and the README's pitch is that same text; the readers reach a declaration head's own `@example` with a control, and the remaining reach is stated in the EQ row; `version` is `0.0.18` with no prior literal surviving; the registry `@orkestrel/scaffold` is restored and the whole gate chain is green under npm 11; and the release runs on the owner's go-ahead, ahead of scaffold's.

# Alternatives

**Keep `Behavior` as the compared header and teach `findDrift` a second header name.** Cost: it makes the reader's contract configurable to avoid an editing pass, so every package can pick its own word and the fleet never converges on one; the `SUMMARY` constant (`constants.ts:44`) stops being the contract and becomes a default. The recommended design wins because the rename is a bounded one-time edit in text the campaign is rewriting anyway, and because the guide's own prose already fixed the permitted column vocabulary — adopting it costs nothing new to explain.

**Defer the class-head widening to a successor release and state the limit alone (D6 finding C's minimal close).** Cost: the fleet's class fences stay held equal by review through all of D7.n, and the measured drift rate on that population is not zero — `Upstream` and `ScaffoldError` had already drifted before D6-fix-2 repaired them. Each D7.n package would meet the same limit and record the same caveat, and the guide would take a second release inside one wave to close it. The recommended design wins because the widening is inert for a package that adds no title, so it can ship ahead of its per-package adoption without breaking a green target.

# Constraints

*(Objective lane — not held.)*

# Refusals

*(Objective lane — not held.)*

# Measurements

*(Objective lane — not held.)*

# Units

Stated in full in § Decision 8, in the dispatch contract's vocabulary: each row names its role and its engine, its owned files, its dependency, and independently checkable acceptance criteria. The routing ledger is derivable from that table — U0 Orchestrator, U1 `implementer` on Opus 5 as the recorded substitution for the dark Sol bench, U2 and U3 `implementer` on Opus 5, U4 `builder` on Sonnet, U5 `verifier` on Sonnet, with `analyst`/`reviewer` audit lanes and a `checker` on the mechanical criteria.

# Tensions

Named for the objective lane to challenge, or for the Orchestrator to rule:

1. **`repair` rather than a copy of the seed.** I chose the sanctioned mechanism over the smaller edit, which pulls D3's vendored voice rule and prose sweep into the guide checkout at a moment the campaign did not plan for. The objective lane must rule on what `repair` actually writes and refuses, and on whether `tests/guides.test.ts` is inside the host inventory — if it is, U4's edits are reverted by the next `repair` and the gate cases belong in a template change instead.
2. **Dropping `Narrows to / Tests` and `Builds` entirely.** Both removals are taste calls about information density, not contract requirements. `Narrows to / Tests` carries `value: unknown` in every row today, which I read as carrying nothing; a reader who wants the guard's parameter type at a glance loses it.
3. **Widening the readers now.** I ruled this in on a measured drift rate and on the change being inert downstream, over the competing reading that a reader change belongs in its own release with its own audit.
4. **The class blocks stay untitled here.** I preserved the constructor door and the factory door as separate examples rather than equating them, which means the guide ships the widening without exercising it in its own equality gate. The alternative — retitle and equate — would make the guide its own first consumer at the cost of deleting one documented door.
5. **The gate lands last, and the convergence units take their acceptance from `npm run docs`.** The alternative order lands the gate first and red, which the D5 precedent supports but which either commits a red gate or dispatches later writers onto a dirty tree.
6. **The guide's README is not shrunk to Ruling 6's shape.** I read that ruling as scaffold's, and I kept the `## API` list because an existing check reads it.

# Risks

Each with the evidence that settles it.

- **The `repair` blast radius is unmeasured.** The vendored voice rule and prose sweep can red `lint:check` and `test:policy` on the guide's own authored prose, which would make U2 unbounded. Evidence: run `repair` in a scratch clone of the checkout, then `npm run lint:check` and `npm run test:policy`, and read the flagged paths before U2 is briefed. This reading is the one the dispatch did not supply and U2 cannot be briefed without it.
- **The propagated cells can read worse than the hand-written ones.** A doc block's sentence is written for a reader of the declaration and a cell for a reader scanning a table, and the Helpers table is far denser than scaffold's. Evidence: `npm run docs` report-only after the header rename, with a sample of its lines read before U2's brief fixes the hand-rewrite group.
- **The tagline can fail on wrapping rather than on words.** Evidence: read whether `extractTagline` flattens a multi-line blockquote to one text; until it is read, author both blockquotes with identical line breaks.
- **A titled body a three-backtick fence cannot enclose blocks its pair.** Measured for "List the fence languages a package allows"; any other fence in the titled set carrying a backtick run has the same defect. Evidence: read each candidate fence body for backtick runs before U3.
- **The widening can red a fleet package that already titles a class-head block.** Evidence: sweep the fleet's `src/**` for an `@example` carrying title text directly above an `export class` or `export interface` head, and compare each title against that package's fence titles. A red there is a true finding and lands as D7.n work rather than as a design defect.
- **The Types and Constants tables fuse a literal and a sentence with an em dash.** Splitting them by hand is where a fact is dropped silently, because neither side of the split is gated until the block carries the sentence. Evidence: after U2, `npm run docs` reports no disagreement and the unit's report names each row whose literal moved, so the audit can read the pair.
- **The head-started tree cannot prove the published artifact.** Every gate run before the registry restore reads bytes no consumer can install — D6 finding B, one campaign earlier. Evidence: U5 runs only after `@orkestrel/scaffold@0.0.63` is reinstalled, and its report records the installed version it measured.

# For the owner

- The publish itself, its credential, and its timing. The guide releases first; scaffold then re-pins `@orkestrel/guide` to `^0.0.18`, re-runs its distribution proof, and clears the standing red recorded in `plan.md` § Re-baseline (after the joint landing).
- Whether the readers widen to a declaration head's own `@example` now. My recommendation is yes: it is inert for a package that adds no title, it closes D6 finding C rather than documenting it, and deferring buys a second guide release inside one wave.
- Whether the guide's README takes Ruling 6's shrink shape. My recommendation is no: Ruling 6 ruled scaffold's README, and the guide's `## API` list is the population of a check nothing else replaces.
