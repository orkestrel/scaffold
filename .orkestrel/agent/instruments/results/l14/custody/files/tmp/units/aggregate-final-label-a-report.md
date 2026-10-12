# Independent factual-support labels

The packet received a label for every occurrence. The read-only census run `node tmp/units/aggregate-final-label-a-check.ts` verified 168 input rows, 168 labels, 168 unique matching IDs, each exact item hash, and 525 literal evidence quotations. Its exit code was 0.

The labels are the JSON array in `tmp/units/aggregate-final-label-a.json`. They express independent judgments for root adjudication, without an authority wrapper or qualification decision.

The run recorded these SHA256 hashes:

| Artifact | SHA256 |
| --- | --- |
| Input packet bytes | `d261b832f1574c64add6c602a42a3af8fa35b6d41e41ceb8e8906c2047286124` |
| Output label bytes | `3d069191d08f43c35f02674d11f7d33569dbad3f094bef67d22cdf870592e580` |

The output census recorded these occurrence verdicts:

| Verdict | Occurrences |
| --- | ---: |
| supported | 132 |
| unsupported | 11 |
| contradicted | 21 |
| ambiguous | 4 |

Exact grouping used `JSON.stringify([candidate, question, state, sources, components])`, including complete contextual components and their IDs. The reader found 47 groups. It excluded only the top-level occurrence ID and revision from that grouping key. Each output occurrence retains its own ID and SHA256 of `JSON.stringify(parsedItem)` in original parsed property order. The serializer expands manually authored proposition judgments by exact group equality; it derives no semantic verdict from a regex, substring, score, or model data.

Each candidate was read with its complete supplied source slice. The initial display exceeded its output allowance around groups 8 through 11; a narrower read recovered those complete groups before judgment. No source content was intentionally truncated for analysis. The writer checked component evidence equality against the candidate's state evidence. The separate read-only checker recomputed hashes and tested every quotation against the rendered raw sources, not against candidate text. These checks establish serialization and citation integrity; they do not independently validate the semantic judgments.

The substantive negative findings concern invented links between Grace and Halvorsen or Copperline; added repair prerequisites; changed source dates and relative-date frames; incorrect source-role attribution; retained contact or chase instructions after withdrawal or completion; and truncations that alter a material identifier or payment term. Proposition text identifies each mixed case and the precise addition or conflict. Requests and instructions remain requests and instructions unless supplied evidence reports completion.

The phrase `tracking TR-3307` remains unresolved in these occurrences:

- `393d7840-bac3-4612-996e-dd1448129840`
- `6d681fa7-c64f-4e8c-9ba1-4394870b549a`
- `9ef27532-f17d-4e09-8f6f-29666104b6e5`
- `d31d907f-a6f2-4ff4-a35d-5f555dc37010`

The evidence identifies TR-3307 as a locker trace. The candidate phrase could loosely describe tracking that inquiry, or incorrectly identify a shipment-tracking reference. It does not explicitly say tracking number. The labels therefore preserve ambiguity rather than manufacture a definite contradiction. The conditional future replacement in the same candidate is read as an announced plan, not completed receipt or an explicit waiver of the sign-off requirement.

Several interpretive choices preserve supported paraphrases. A quoted conditional replacement instruction's `her` resolves to Grace from the supplied adjacent email source and is not reassigned to Dalia by mere proximity in the candidate. The sage-rug exchange wording resolves from the complete candidate's outgoing correct-rug sentence. Farah's move and immediately linked redirect request establish the corrected destination in context. The Saturday closure paraphrase preserves the stated consequence that walk-in returns wait until Monday.

The occurrence `56957804-ec5f-4589-9f2d-fe41bec96911` ends in a dangling date-prefix fragment. That fragment makes no material factual assertion, so the supported complete order and shipping assertions govern its verdict. By contrast, `Freightline pro number FL-66` and `net 3` supply materially changed values and cannot be treated as harmless formatting. A source date prefix is judged as source attribution, not automatically as the date of the event described. An explicit `user` prefix on a tool-only detail is likewise judged as a source-attribution claim.

Only the supplied packet and mandated instruction files were read for the work. No private mappings, score data, prior labels, source/runtime artifacts, external inference services, or Git operations were used. The unit wrote only its scoped labels, report, and TypeScript reader/serializer/checker files.
