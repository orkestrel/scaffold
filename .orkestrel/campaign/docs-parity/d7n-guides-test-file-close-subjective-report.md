# Subjective design-fit verdict — `d7n-guides-test-file` successor

Lane held: **subjective** (design acceptance, API and vocabulary, architecture fit, simplification, guide voice and product coherence), on Opus, independent of the writer. Correctness under adverse orderings, argument-validation ordering, Vitest runner semantics, and test sufficiency are the objective lane's and are referred, not ruled.

## 1. Numbered verdicts

### C1 — Exact command boundary and no default writes: CONFIRMED

The boundary is one branch at `tests/guides.test.ts:893`, and every mode the guide names is reachable from it: the default path calls `runGuides` alone (`:398-400`), an argument outside `--to guide|--to source` prints `USAGE` and raises `2` before the inventory is read (`:393-397`), and every `writeFileSync` call sits behind `flushTexts`, which only `main`'s direction branch reaches (`:419`). `USAGE` at `:41` names the script a developer actually types. The attack I ran from my lane: I traced every write site and every `process.exitCode` mutation to see whether a default run can reach either, and whether the registration branch can. `registerGuides` (`:439-891`) contains no write and no exit mutation, and `raiseExit` (`:376-381`) never lowers a status already raised. Shape and boundary are what the guide describes.

Referred to the objective lane: whether `VITEST` inheritance, the dynamic-import registration, and `matchesPassed` behave as claimed under a real runner. The fix report is the writer's own account and I give it no weight.

### C2 — Comparison occurrences retain identity: CONFIRMED

The category is decided before either writer runs, and no writer re-guesses it. `buildComparisons` (`:164-202`) takes `findDrift` as authoritative for values and order, derives the example population from first-title fence occurrences with absent-language normalization through `formatExample` (`:156-158`), and validates the derived list against the authoritative suffix with `matchesDrift` before any label is attached. `writeGuide` selects `replaceFence` only on `category === 'example'` with a resolved source example (`:221-224`), and `writeSource` gives a `category === 'example'` drift no summary path at all: an unresolvable example key falls to `'no doc block carries the key'` (`:246-256`) rather than to `replaceSummary`. Reason keys carry the category (`:152-154`), so a colliding summary and example key keep separate outcomes.

The attack that failed: I looked for a door where a replacer's result, a body-shape test, or key-only membership could still choose the category — the shape the previous round broke. There is none; `replaceCell`, `replaceFence`, `replaceSummary`, and `replaceExample` are all selected from `category`, and their `undefined` results only produce reasons.

Recommendation R1 records what I consider the design cost of this shape; it does not falsify the claim.

### C3 — Authority, preservation and failure remain intact: CONFIRMED

Design-side the authority split is coherent and matches the guide: `--to guide` writes only through `replaceCell` and `replaceFence` into the row's own spec text (`:204-237`), `--to source` splices only the located doc block of the file the index names (`:239-278`), `texts` accumulates each edit before `flushTexts` writes (`:302-314`), and the post-write reread rebuilds the inventory and the rows before reporting (`:422-434`). The pitch stays report-only (`:334-350`), and `runGuides` closes the runner in `finally` (`:369-373`). Nothing fabricates an authority value: every unreachable target produces a reason line rather than a write.

Referred to the objective lane: the exit-status arithmetic across an explicit-direction run, the runner's failure taxonomy, and whether the retained root gate chain covers the final source. Those rest on execution evidence my lane did not run.

### C4 — Ownership documentation and declared primitives agree: BROKEN

Everything in this claim holds except its header conjunct, and that one is false as written.

- What holds: `isRecord` narrows the parsed manifest (`tests/guides.test.ts:78`); the fixture links the already-declared `@orkestrel/contract` rather than adding a dependency (`tests/src/core/compilers.test.ts:2299`); `matchesPassed` names the existing predicate (`tests/guides.test.ts:352`) and reason recording is inline `reasons.set` with no forwarding alias; the guide separates explicit-direction preflight from default parity (`guides/scaffold.md:1033-1037`); the changed TSDoc's accepted predecessor (`src/core/compilers.ts:429-430`) is byte-accurate against the command the manifest removed; the authored test is absent from `HOST_PATHS` and from `host.json`, and its adoption obligation is stated; no new parser, API, package dependency, launcher, or retirement redesign appears.
- What is false: **the header does not explain native-command and worker registration.** `tests/guides.test.ts:1-2` asserts the file's two identities and states an owner requirement; it explains neither how the registration is selected nor the mechanism a maintainer will actually trip over. The load-bearing fact of this file is that `registerGuides` defers every worker import (`:439-468`) while `vitest/node` is imported statically (`:38`), and that asymmetry is stated nowhere. `.claude/rules/typescript.md` § Comments requires a comment to explain why rather than restate what self-explanatory code shows; this header does the reverse. The observable failure: a fleet author copying this shape into their own package — which `guides/scaffold.md:1039-1043` and `.claude/rules/documentation.md:43-46` both instruct them to do — has no statement of which imports must stay deferred, so a static worker import that runs green under Vitest and fails only the native command is the predictable next defect.

  Bounded correction, at `tests/guides.test.ts:1-2`: keep both identities, add the reason the worker branch defers its imports (the specifiers the native command cannot resolve, and the modules only a Vitest worker may load), and state the local-declaration placement as this file's own reason rather than as an external person's requirement. `owner` is campaign vocabulary and reads as nothing to a developer opening a published package's proof; `.claude/rules/writing.md` § Voice and actor governs that word. This wording change carries the prior round's F2 disposition intact — it adds the boundary F2 asked for and drops nothing F2 required.

### C5 — The accepted surrounding subject remains preserved: CONFIRMED

`host.json` names no launcher and no `tests/guides.test.ts` destination; `RETIRED_HOST_PATHS` (`src/core/constants.ts:156-157`) carries the single released retirement and `Materializer` gates it on group selection (`src/server/Materializer.ts:650-652`) without touching the foreign-file transaction; the generated command stays conditional on `blueprint.guides` (`src/core/compilers.ts:350-352`); the guide's Surface table drops the retired constant and documents the retained one (`guides/scaffold.md:131,158`); package cases, toolchain pins, and the staged manifest and lock entries are present in the supplied diff. `guides/guide.md` still reads `npm run docs` and `PROPOSAL.md` still cites the retired command — both are the carried adoption work (`d7n-guides-test-file-adoption-plan.md` exists) and I report neither as drift here. I did not reopen retirement policy.

## 2. Findings outside the claims

### F1 — The fixture keeps the retired term for the thing that replaced it

`tests/src/core/compilers.test.ts:1842-2349`. This change retired the documentation-parity **seed** — removing it from `HOST_PATHS`, from `constants.ts`, and from the guide's vendored-set sentence — and left the fixture naming the package-owned entry `SEED_PATH`, `SEED_MANIFEST`, `SEED_FILES`, `SEED_GUIDE`, `SEED_VITE`, `SEED_PASSING_TEST`, `buildSeedWorkspace`, `linkSeedPackage`, and `runSeed`, with `SEED_PATH = 'tests/guides.test.ts'` at `:1842`. The comment at `:1861` still calls the subject "the seed".

Why it matters beyond tidiness: the same file uses `seed` in its live sense for a generated starter artifact at `:878`, `:894`, `:1125`, and `:1711`. One file now spells two concepts with one word, which is exactly what `AGENTS.md` § Design laws forbids, and the reader most affected is the fleet author this change tells to copy the fixture's shape.

What right looks like: rename the entry fixture's identifiers and comments to the concept that survived — `ENTRY_*`, `buildEntryWorkspace`, `runEntry`, `linkPackage` — and leave the generated-starter uses of `seed` alone. Mechanical, contained to one test file, no behavior change.

### F2 — The accepted rewrapping correction is only half carried

The previous round's verdict, `d7n-guides-test-file-audit-verdict.md:30`, accepted F5 and F6 as "correct the predecessor description **and rewrap** the changed guide/TSDoc passages in the successor". The description half landed; the rewrapping half did not.

- `guides/scaffold.md:1030` runs roughly a third wider than every line around it, in a paragraph the same edit rewrote.
- `guides/scaffold.md:1045-1048` leaves orphan fragments — `source text.` on its own line, and a line ending `The` — inside a paragraph whose neighbours wrap evenly.
- `src/core/compilers.ts:424` ends a doc line at `rewrites. Publishing adds`, and `:430-431` leaves `through Vitest alone.` alone on a line followed by an overlong one.

Why it matters: these are the passages this change wrote, in the guide that is this package's product surface and in a doc block whose description paragraph the parity gate compares. Ragged edges read as an unfinished edit to every reader after this one, and the formatter does not reach either population, so nothing else will find them.

What right looks like: rewrap those paragraphs and doc lines to the width their neighbours already use, changing no words.

### F3 — The guide now carries a competing instruction copy

`guides/scaffold.md:1040-1043` states: "Before adopting that generated command, the package author must implement its direct entry and rewrite directions in `tests/guides.test.ts`" and "Fleet adoption must update each package's authored file before release." `.claude/rules/documentation.md:43-46` states the same obligation in the same change.

`.claude/rules/documentation.md` § Authority and workflow refuses this directly: "`AGENTS.md` and its linked rules are the sole convention source. Do not create competing instruction copies in guides." `AGENTS.md` § Instruction files gives the reason a reviewer can act on — the duplicate drifts, and whoever reads the stale copy is following it.

What right looks like: keep the product truth in the guide, because it is what scaffold does — the file is package-owned, it stays outside `HOST_PATHS`, the script and project are emitted only with `guides`, and scaffold neither synthesizes nor overwrites the authored proof. Strike the two sentences that instruct the package author and fleet adoption, and let `.claude/rules/documentation.md` own that obligation alone.

### F4 — A constant gained a role and kept its old one-line description

`src/core/constants.ts:311` and the matching guide cell at `guides/scaffold.md:131` both read "Names the guide-parity proof whose presence selects the planned `guides` project." After this change the same constant also names the entry the generated `test:guides` command invokes (`src/core/compilers.ts:351`). The sentence is true and no longer complete, so the published surface documents the smaller half of what the symbol now means, and parity cannot see it because both sides moved together — or rather, neither moved.

What right looks like: extend the description paragraph to name both roles, then converge the guide cell with `npm run test:guides -- --to guide` so the parity pair stays equal.

### F5 — The renamed import sits in the retired symbol's slot

`src/core/compilers.ts:39`. The block at `:28-59` is alphabetical throughout; `GUIDES_TEST_PATH` sits between `DISTRIBUTION_TEST_PATH` and `ENVIRONMENTS`, where `DOCS_SEED_PATH` used to sort, while `GLOBAL_SETUP_PATH` at `:44` shows where the `G` run actually is. Nothing enforces this, which is why it needs a reader. Move the row between `GLOBAL_SETUP_PATH` and `HOST_PATHS`.

## 3. Attacked and held

- **C1, the default path as a write vector.** I traced every `writeFileSync` and `process.exitCode` site to the branch that reaches it, looking for a default run that mutates. Adjacent behaviour that looks like a defect and is not: `raiseExit` accepts a string `process.exitCode` and parses it (`:378`). That reads as defensive machinery for a value nothing here writes, and it is the narrowing the declared type forces — the alternative is an assertion the non-negotiables ban.
- **C2, the category door.** I attacked the labelling from the writers backwards rather than from `buildComparisons` forwards, on the theory that the previous round's defect would reappear at a different door. Both writers read `category` and never re-derive it. Adjacent behaviour that looks like a defect: `writeSource:265` tests `example === undefined || category === 'summary'` before choosing `replaceSummary`, which reads as a shape heuristic; it is not, because the `category === 'example'` with unresolved example case has already exited to a reason at `:254-256`.
- **C3, accumulation across a shared file.** I looked for a path where the second row's write drops the first row's edit. `texts` is one map threaded through every row before `flushTexts` compares against the original inventory, so a shared source file accumulates.
- **C5, a second home for the retired path.** I swept the tree for surviving references to the retired command and separated the carried ones from real drift. The mirror and the proposal are carried; nothing else in owned source names it.

## Referrals

- **To the objective lane:** the execution facts under C1 and C3 — `VITEST` inheritance, preflight ordering against Vitest startup, the exit-status arithmetic across an explicit-direction run, and whether `matchesPassed` covers the failure set the guide enumerates at `guides/scaffold.md:1033-1037`. My lane read the shape; it ran nothing.
- **To the Orchestrator, for the adoption plan rather than this unit:** the entry fixture's home. `describe('the guides entry')` drives `tests/guides.test.ts` as a spawned npm child from inside `tests/src/core/compilers.test.ts`, whose mirror subject is `src/core/compilers.ts`. That placement had an anchor while the subject was a compilers-emitted vendored artifact; this change removed the anchor and the replacement comment at `:1690` does not restate one. The compilers-owned cases beside it — the emitted command, its accepted predecessor, the package-owned host population — are correctly placed. I am not ruling on the move, because `.claude/rules/tests.md` § Expensive proofs and the project matrix decide it and the process-spawning placement predates this change.
- **Recommendation R1, for a successor, not this unit:** the category exists because `Drift` carries no axis naming what it compares, so this entry reconstructs the axis positionally and guards it with a throw at `tests/guides.test.ts:186` and `:195`. The reconstruction is the exact one available without new upstream capability, and this brief forbids adding one. Two consequences worth carrying forward: the entry is coupled to an ordering `@orkestrel/guide` does not publish as a contract, and when that coupling breaks, the developer sees `Guide example drift does not match the authoritative drift suffix` on stderr with no location and no action. The durable fix belongs upstream — a named discriminant on `Drift` — and until then the message can at least name what the reader does next.

VERDICT: FAIL C4; outside the claims: F1, F2, F3, F4, F5
