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
