# Rulings — the guide and TSDoc parity campaign

Ruled by the owner on 2026-09-06 (22:5x UTC), on the documentation pipeline proposal (`PROPOSAL.md` at `d3430db0`):

1. **Parity, not ownership.** A guide and its package's TSDoc enforce each other. Neither is the single source: when one moves, the other must move, and a gate refuses the tree while they disagree. This retires the proposal's framing of Option 1 (guide regions rendered from TSDoc as the source) and Option 2 (TSDoc as the single source, the guide generated whole) as one-directional pipelines; what survives of each is the projection and the structure that make the two sides comparable.
2. **Structure carries the parity.** The guide's structure, its tables first, must make the comparison mechanical: a Surface row and a Methods row against a symbol's TSDoc, and the guide's examples against the TSDoc `@example` chain, each side readable into one normalized form. Examples are in scope, handled with the same care as the rows.
3. **The render lives in `@orkestrel/guide`.** The projection from TSDoc into the guide's table and example form is a `guide` direction, invoked by a package's `docs` script and its `tests/guides.test.ts`, never a `scaffold` verb.
4. **`vite` never moves to a runtime edge.** The parser it re-exports stays a development-edge instrument.

Read from the ruling, to confirm in the reply: the `.claude/rules/documentation.md` amendment the proposal names (a Surface-row description and a Methods-row summary equal the symbol's TSDoc first sentence, with `{@link X}` rendered as a code token) is implied by an equality gate rather than a transform, so the campaign takes it as ruled unless the owner says otherwise.

## Ruling 5 (2026-09-07 02:12 UTC): the publish shape

The owner's words: "Tsdoc convergence rides the API removal wave." Reading: plan decision 10 resolves to one republish per package — phase B holds each package until its guide, its TSDoc, and its `tests/guides.test.ts` converge under the new checks, then re-pins, runs its gates, bumps, and publishes in catalog layer order. No second wave.

## Open, restated for the owner in plain terms (2026-09-07 02:12 UTC)

- The README shrink (plan decision 8): the README repeats the guide's verb, flag, and exit-code lists; the shrink keeps the pitch, the install line, the runtime line, and one example, links the lists, and gates the pitch against the guide's tagline. Default: shrink. The cost is the npm landing page's verb list.
- The equality reading (`.claude/rules/documentation.md` § Parity): a `Summary` cell and a doc paragraph must be one text; today they differ only by the leading verb. Default: the guide cell adopts the doc block's verb-first sentence and the noun-phrase clause covers the tagline alone.
- The voice rule's population: default every file the linter walks (the rule carves nothing out); the narrower `src` and `app` reading is one line in `.oxlintrc.json`.

## Ruling 6 (2026-09-07, the owner, verbatim: "For the record, I agree with your defaults and recommendations, let's go with those, continue as you were.")

The three open items close on the stated defaults. The README shrinks to the pitch, the install line, the runtime line, and one fence, with the verb, flag, and exit-code lists linking to the guide; the pitch is the blockquote under the README's H1 and equals the guide's tagline (RQ, D4 and D6). A guide `Summary` cell adopts the doc block's verb-first description sentence after the compared form, and `.claude/rules/documentation.md`'s noun-phrase clause covers the tagline and the README pitch alone (D4). The voice rules read every file the linter walks (D3, landed).

## Ruling 7 (2026-09-07, the Orchestrator, on R2's referral): a description paragraph is a summary

A doc block's description paragraph — the text before its first block tag, the text a `Summary` cell carries — states what the declaration does in the sentences a table scanner needs. Reference material (the population a reader walks, the grammar's edge cases, the caveats) belongs in `@remarks`, which the comparison leaves unread and the declaration's reader still meets. Every sentence survives the split; none is deleted. The `Source` class block set the shape in U2, and the fix round applies it to the widest cells. This does not change what the seed compares.

## Ruling 8 (2026-09-07, the owner, verbatim: "Go with your recommendations on both, and instead of publishing guide now, use the tarball method and apply it to all packages so if we run into any issues we can apply the fixes before we publish guide, then once all are moved, we can publish and then bump them to the new version easily and we can publish in dependency layers.")

- No scaffold template for `tests/guides.test.ts`; the drop-in stays package-owned and a newborn copies it when it gains a guide.
- Mirrors refresh through `scaffold catalog` in one sweep after the last package converges, each package's result pushed to `main` as it lands so the fetch reads it.
- The guide does not publish before the pass. Every package converges under the guide's packed tip installed `--no-save` and scaffold's extracted tip for `repair`, so a reader or seed defect any package meets is fixed in the guide before `0.0.18` publishes. After every package has moved: the guide publishes, each package re-pins to the registry release and bumps, and the publishes run in catalog layer order.

## Ruling 9 (2026-09-07, the Orchestrator, on slice 1's subjective F1): a descriptive heading over the demonstrating fence

Where the fence that demonstrates the titled declaration sits under a structural heading (`### Factories`, `### Helpers`, `## Surface`), the converge unit adds a heading one level deeper directly above that fence, worded as the demonstration it shows (`#### Create a parser`), so the `@example` title reads as a demonstration and the structural heading stays. No fence moves and no section is added; the fence's title is the new heading's text. Ruling 3's population is unchanged.

## Ruling 10 (2026-09-07, the Orchestrator, on slice 1's subjective F8): the key column's header is the guide's own

The readers locate a table's compared column by the `Summary` header and its key by position, so the first column's header text (`API`, `Name`, `Type`, `Method`, `Export`, `Factory`) is deliberately free and stays as each guide wrote it. No unit renames it.

## Ruling 11 (2026-09-07, the Orchestrator, on slice 1's subjective claim 22 and the objective F2): the doc block whole, and the pin's canon

A converge unit owns each doc block whole — the description paragraph, `@remarks`, `@example`, and every other tag (`@throws`, `@param`, `@returns`) — with no code token moved; a true `@throws` clause added beside a rewritten description is within scope. The pin's canon is the pilot's form at `/home/user/fleet/abort/tests/guides.test.ts:72-95`: the guard-and-continue loop with no local type predicate and the both-sides failure line; "scaffold's inline form" in the template named the absence of a predicate, not the loop's shape, and the wording is corrected.

## Ruling 12 (2026-09-07, the Orchestrator, on slice 2's subjective F3): one `Shape` idiom fleet-wide

A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an optional member, its call-signature members after `plus`, and a type alias's own type literal with a union's arms escaped as `\|`; a member's type never appears in the cell, because the declaration carries it and the guide's reader reaches it through the row's name. The convention sentence above every table that carries the column states this one idiom, and a row that spells a member's type, a prose description, or a call signature with its return type is rewritten to it. Where a row's literal names a documented alias (`scope?: TokenScope`), the alias's own row spells the union.

## Ruling 13 (2026-09-07, the Orchestrator, on slice 3's F-1 and the objective lane's first finding): the drop-in's canonical text

The shared drop-in is the pilot's `/home/user/fleet/abort/tests/guides.test.ts` outside the constants block, with two corrections the pilot itself takes in its own fix: the `INTERNAL` doc block reads "the assertion that follows it fails when a name here stops being stranded" (no ordinal, no `below`), and the equality case keeps the pilot's original position — directly after the methods loop and before the examples case, which html's copy had moved past the import walk. The examples case is named `documents an example for every Surface function`; the mapped `examples` binding maps each side then concatenates. A package's drop-in matches that text byte for byte outside its constants, so the next drop-in update is a copy.

## Ruling 14 (2026-09-07, the Orchestrator, on slice 3's N-1): an example converges toward the fuller demonstration

Where the titled `@example` and its fence differ in what they demonstrate, the side that lacks the demonstration is extended and the other is kept; a line is never deleted from either side to make them equal. The fence is what a guide reader runs, the block is what an IDE reader sees, and both carry the whole demonstration.

## Ruling 15 (2026-09-07, the Orchestrator, on the single-face audit's subjective F1 and objective claim 5): the `Shape` column is the one device for a type's data members

Where a `## Surface` table carries an interface or type-alias row, that table heads `Shape` between `Kind` and `Summary`, and the cell holds the members in Ruling 12's idiom; a guide that folded the members into the description sentence or into guide-body prose ("Its readonly data members are …", a "data-only shapes carry these members" paragraph) moves them into the cell and deletes the prose that only listed them. The convention sentence above the table reads, in one wording fleet-wide: "A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an optional member and `plus` introducing its call-signature members, and a type alias's own type literal with a union's arms escaped as `\|`." A guard table or a constants table adds its own second sentence ("In a guard table a `Shape` cell holds the type the guard narrows to."; "A `Shape` cell holds the constant's declared type."). A package converged before this ruling with members in braces and no `plus`, or with another wording of the sentence, takes the idiom in the closing sweep's per-package unit, the pilot included.

## Ruling 16 (2026-09-07, the Orchestrator, on the single-face audit's objective F4): Ruling 5's trigger binds as written

A `### Entities` heading over an all-class table becomes `### Classes`, and a class documented under its own H3 carries a row in a `### Classes` table; a descriptive heading over an all-class table (`### Stores, indexes, cursors, transactions`) stays. The audit template's claim is corrected to that trigger.

## Ruling 13, amended (2026-09-07, the Orchestrator, on slice 6's subjective F5): the drop-in's header line

The canonical drop-in's first line reads "The constants that follow are this package's own" — `below` is a pointer `.claude/rules/writing.md` bans — and the pilot takes that line in its closing unit; a package whose copy already reads so is canonical on that line.

## Ruling 17 (2026-09-07, the Orchestrator, on slice 6's claim 19): the titled declaration where the class is the entry

The titled `@example` sits on the primary factory's block. Where a guide's fences construct the class directly as the package's entry and the factory is an alias over that constructor (markdown's `createMarkdown` returns `new Markdown(input)`), the titled block is the class's, on the declaration the guide's flagship fence demonstrates; the audit claim reads "the primary factory's block, or the class's where Ruling 17 applies".

## Ruling 18 (2026-09-07, the Orchestrator, on slice 5b's claim 18 and F-B1): where a constant's literal lives

A `### Constants` table heads `Shape` with the constant's declared type (Ruling 12's constants sentence) and no `Value` column. Where the literal is the fact a reader needs — an opcode, a status code, a version string, a default — the declaration's description paragraph names it (`Names the text frame opcode, 0x01.`), so the cell carries it through `--to guide` and the block stays the reference (Ruling 7). An executed fence under the table may demonstrate the literals as well, never instead.

## Ruling 19 (2026-09-07, the Orchestrator, on slice 5b's F6): an alias over an object of tuples

An alias whose value is an object literal (`TemplateManagerEventMap`, an event map of tuple payloads) takes Ruling 12's bare member names in its `Shape` cell (`{ register, remove, clear }`); the payload types stay in the declaration.

## Ruling 20 (2026-09-07, the Orchestrator, on form's audit F6 and objective F3 and F5, and the closures' referrals): where the convention sentence sits, a guard table's column, and the drop-in's bytes

- The convention sentence sits once per table that carries the `Shape` column, between that table's own heading and the table; where several tables share one heading with no heading between them, once before the first. A guide whose `## Surface` section holds several H3 tables with the column repeats the sentence under each heading, and that repetition is the form (form's `### Schema and fields`, `### Answers and rules`, `### The form`).
- A dedicated guard table (`### Guards`, every row a guard function) heads `Shape` with the type each guard narrows to, under Ruling 15's guard sentence, because that sentence presupposes the column. A mixed table where a guard sits among other functions does not take the column and carries no guard sentence (console).
- A `### Constants` table takes the constants sentence alone ("A `Shape` cell holds the constant's declared type."), the template's form; router's interface sentence beside it is the outlier the closing sweep corrects.
- The drop-in's bytes are the pilot's from `const root = new URL('../', import.meta.url)` through the manifest loop's closing brace, outside the constants block: `/Interface$/` with no flag, `new URL('../', import.meta.url)` rather than a package helper, the pilot's comments. A package's own file-scope case (form's README-fence case) and its own cases inside the manifest loop's `describe` stay, appended after the pilot's cases; the pilot's `describe('flagship fences')` section is the pilot's own and each package writes its own executed section.

## Ruling 21 (2026-09-07, the Orchestrator, on sea's audit F1 to F5 and the objective lane's campaign findings): the extended interface's cell, the drop-in's header, a fence's lead-in, and a constant's widened type

- An extended interface's `Shape` cell names its parent before `plus` and its own added data members in braces after it, then `plus` its own call-signature members (`BrowserActionOptions plus { state? }`; `BrowserFrameInterface plus { emitter, network } plus navigate, reload`), the form browser and agent carry; a flattened cell that lists inherited members as if declared (sea's `SEACompressionOptions` as `{ paths, mode?, quality? }`) becomes `SEABrotliOptions plus { paths }`. A table with an extended-interface row adds one sentence to its convention sentence: "An extended interface's name comes before `plus`, with the members it adds after."
- A function-type alias's `Shape` cell holds its own literal (`(result: SEACompressionResult) => void`), which Ruling 12 permits for an alias; the ban on a call signature with its return type binds an interface row alone.
- The drop-in's header (Ruling 13 amended again) reads, on its first three lines: "The consumer-side guides-parity drop-in: runs `@orkestrel/guide`'s checks against this repo's own `guides/README.md` manifest. The constants that follow are this package's own, as is the executed section that closes the file." The clause "and are the only part a sibling package changes" is struck, because every package's executed section is its own too; a package's extra sentence naming its fences block (sea, markdown) is struck with it. The pilot carries the header first and every closing unit converges on the pilot's bytes.
- Every code fence in a guide is introduced by a complete sentence between its heading and the fence (`.claude/rules/writing.md` § Structure); a titled fence under Ruling 9's heading takes one sentence naming what the fence demonstrates. The closing sweep lists each fence that sits directly under a heading.
- A constants `Shape` cell holds the type the constant is declared or widened to (`string`, `number`, `RegExp`), never its literal type; Ruling 18 keeps the literal in the description. No unit narrows a cell to a literal type.
- `@throws` is a tag a description's dropped failure clause can land in (sea's `execute`, "throws on error"): the tag names the error class and its code set, the description paragraph stays, and the equality gate reads the paragraph alone.

## Ruling 22 (2026-09-07, the Orchestrator, on browser's audit): a hyphen at a line end, a sibling fence's heading, a mixed heading carrying a retired term

- A hand-wrapped doc block never breaks a hyphenated compound across a line end: the compared form collapses the newline to a space, so `mid-` at a line end reaches the guide as `mid- request`. A unit that rewraps a block keeps each compound on one line; the seed's refusal of a description-paragraph line ending in `[a-z]-` is carried to the guide package.
- Ruling 9 fixes the titled fence's heading and says nothing of a sibling fence: a second fence that demonstrates a different thing under the titled heading takes its own heading at the same level (browser's core quickstart), so a reader arriving by heading meets the fence the heading promises and the titled pair's first-fence match cannot repoint.
- A mixed table's heading may keep its descriptive wording (Ruling 16), but not a retired term: `#### Extended constants and entities` splits into `#### Extended constants` and `#### Extended classes`, and `entities` leaves the README's prose.
- A code token inside a compared `Summary` cell takes backticks and a following noun (`.claude/rules/writing.md` § Code tokens), the same rule the guard descriptions took; one concept keeps one term across the cell and the prose that names it (browser's transport is "the text pipe").

## Ruling 23 (2026-09-08, the Orchestrator, on rater's audit F7 and server's audit F2): the convention sentence covers an object-literal alias, and the titled block sits on the entry the guide's first fence demonstrates

- Ruling 15's sentence stands unamended: an alias whose value is an object literal takes bare member names in its cell (Ruling 19), and that cell is "the alias's own type literal" in the sentence's words, because an object type literal is a type literal. No unit rewrites the sentence for it.
- Where a package's first § Patterns or Quickstart fence demonstrates the product's entry (`createServer`) and the facts block's first-listed factory is a substrate (`createNegotiator`), the titled block sits on the entry (Ruling 17's spirit: the pair pins the code a reader runs first); the substrate factory keeps its own untitled example. A tiebreak by table position yields to product primacy.

## Ruling 24 — a README's fences sit under their headings

The lead-in rule (Ruling 21) binds a guide's fences. A README's `## Install` and `## Usage` fences sit directly under their headings, as the pilot's `/home/user/fleet/abort/README.md` does and every sibling README does; a README's other prose is unchanged by this ruling. The closing brief's fence sweep runs over `guides/<pkg>.md` alone, and a fix brief's criterion that sweeps `README.md` for bare fences is struck. Relation's fix round added two README lead-ins on such a criterion; the Orchestrator removed them before landing and the checker rules the diff. Toolbox's converge unit reached the same reading from the pilot and removed the lead-ins it had added.

## Ruling 25 — a shape value's `Shape` cell

A table whose rows are `const` values is a constants table under Ruling 18 whatever its heading, so a `### Shapers` or `### Shapes` table heads `Shape` under the constants sentence. A shape value's cell holds its declared type: a string shape holds `StringShape`; an `objectShape(...)` value holds `ObjectShape<{ members }>` with the property record in Ruling 19's bare-member form, in declaration order, `?` marking an optional property — for example `ObjectShape<{ operation, domain, statement }>`. The emitted structural type is not written into a cell. Brief's `### Shapers` table takes this in `d7n-brief-close-2`; toolbox's `### Shapes` table, which its converge unit left without a `Shape` column, takes it in toolbox's fix round.

## Ruling 26 — a function row's `Shape` cell

A function row in a table that carries `Shape` holds its signature as a type literal, `(param: Type, option?: Type) => Return`, the form the guide package's own guide uses for its helper rows; a guard row (a `value is X` predicate) holds `X` wherever it sits, as Ruling 20 fixes for a guard table. The table's convention sentence gains "A function row's `Shape` cell holds its signature, and a guard row's the type it narrows to." An empty `Shape` cell is a defect. The audit over toolbox found the empty cell at `createTerminalRoutes`; the same population sits in console, contract, form, lsp, ollama, and table, so each takes this ruling in its next unit — toolbox's fix round, form's, lsp's, and ollama's fix rounds, and a closing successor for console, contract, and table.

## Ruling 27 — the conventions the lsp and workspace audits questioned

- **`plus` keeps its two positions.** `Parent plus { added }` names an extended interface (Ruling 21) and `{ data } plus method, method` names call-signature members (Ruling 15); the braces mark which, and the convention sentences already state each. No change.
- **An interface declaring no data member holds `{} plus method, method`**, the form toolbox's `DefinitionStoreInterface` and browser's `BrowserWriterInterface` carry, so the convention sentence needs no clause. A row carrying the bare member list (`get, set, delete`) takes the braces: workspace's `WorkspaceStoreInterface` and interpret's stage and manager rows, in their next units.
- **A dedicated guard table carries the guard sentence alone** — "In a guard table a `Shape` cell holds the type the guard narrows to." — as the pilot and the majority do; the interface sentence in front of it is struck. Interpret, toolbox, and brief carry the doubled form and take the strike in their next units.
- **A `## Methods` subsection keeps its ``#### `Interface` `` heading.** The reader associates a Methods table with its interface through that heading level; raising it to `###` drops the table from `guide.methods()` and retires its rows from the comparison silently. The level jump under `## Methods` is the reader's contract, not a style defect.
- **An alias declared as an indexed access over a tuple (`(typeof CODES)[number]`) holds the resolved union in its `Shape` cell**, the fleet's practice; the indexed-access form is not written.
- **A guard's `Signature` cell, where a table still carries `Signature`, spells the predicate** (`(value: FileContent) => value is TextContent`), never `boolean`.
- **A titled example's title that names a topic (`Files and content`) stands** where Ruling 9's trigger did not fire; the closing sweep does not reopen titles per package.

## Ruling 28 — a class row's `Shape` cell

A class row in a table that carries `Shape` holds the interface the class implements, as its code token (`ProbeInterface`), the form probe's guide carries; a class implementing no package interface holds its constructor signature as a type literal, `new (message: string, options?: ErrorOptions) => LSPError`. The table's convention sentence gains "A class row's `Shape` cell holds the interface it implements, or its constructor signature where it implements none." An empty class cell is a defect, as Ruling 26 fixes for a function row. The population sits in console, contract, form, lsp, ollama, and table, each taking the ruling in its next unit.

## Ruling 29 — prepare with tarballs and publish in measured dependency layers

Follow the owner's Windows continuation direction of 2026-09-08: finish fixes and
dependency alignment using local tarballs, apply required version bumps before
accepted packing, and prepare every package for publication. Include runtime,
development, peer and optional declarations in the alignment; retain bundled and
override observations. Propagate the canonical scaffold correction during each
dependency-layer visit through scaffold's supported mechanism.

Replace the old guide-first publication sequence with the measured dependency-layer
order. The default remains local fleet preparation before presenting that order to
the owner. Consult orkestrel-publish when the prepared release is ready. If the owner
chooses incremental publication, publish an accepted layer only on the owner's
go-ahead, confirm registry availability, and then continue its dependents. The latest
direction permits that workflow choice; it does not authorize an upload now.

Preserve Ruling 8's parity requirements, package main closures and guide correction.
Do not use publication to bypass local tarball verification, fabricate registry
lockfile entries for unpublished versions, or change authentication material. Keep
every upload subject to the owner's decision and credential.

## Ruling 30 — development pins follow publication without forcing a release

Follow the owner's clarification of 2026-09-08. Prepare and publish by runtime,
peer and optional dependency order. Use identified Guide and scaffold tarballs to
prepare lower-layer packages before those tooling packages reach their own release
layers. Do not hold Contract for future Guide or scaffold development pins.

After tooling publication, update development pins and valid registry locks on main.
Rebuild and compare the material distributable with the accepted published artifact.
Ignore sourcemaps and whitespace-only differences. When material content is unchanged,
commit the development update without a package bump or another publication. When
tokens, declarations, behavior or another published surface changes, apply the release
and downstream obligations to that actual change.

Keep runtime, peer and optional pins aligned with the artifacts proved before release.
Do not fabricate registry locks or represent provisional tooling as registry-served.
This clarification does not authorize uploads or waive the remaining source closures.
