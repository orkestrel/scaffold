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
