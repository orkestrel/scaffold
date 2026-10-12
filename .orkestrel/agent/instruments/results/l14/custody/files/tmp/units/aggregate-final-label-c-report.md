# Independent occurrence labels

The closed-packet run produced a JSON array with 179 labels for 179 input occurrences and 179 unique IDs. Root owns adjudication and acceptance. This report does not assign a judge score or adopt the labels as final authority.

The input SHA256 is `9c7632d7224759d227d119d5609e5280cf8a2ad480a842df2bfcdeb4d29488c3`. The label-array SHA256 is `cca2b9e61bf3a678cf18b31c3b9cd04cb1ffa6410d676aa8953b5a28990e4d91`.

The measured occurrence census is 137 supported, 0 unsupported, 11 contradicted, and 31 ambiguous. The 46 exact semantic groups comprise 37 supported groups, 3 contradicted groups, and 6 ambiguous groups. The expanded output contains 551 propositions and 802 literal quotations.

## Method and scope

The sole semantic input was `aggregate-final-label-c-packet.jsonl`. Every complete candidate and its complete supplied sources was read. No model identity, attempts, scores, private mapping, other labels, or outside conversation facts were read. No source, build, git, service, or model command ran. No agent was spawned.

Exact grouping used `JSON.stringify({candidate:item.candidate,question:item.question,state:item.state,sources:item.sources})` equality, with no normalization or fuzzy comparison. Group indices follow first appearance in packet order and are local reading aids. Different source slices remain separate even where candidate wording matches. Occurrences retain their original IDs and independently computed `SHA256(JSON.stringify(parsedItem))` hashes, including revision and component fields in original parsed property order.

The reader verified that each state candidate equals its item candidate, that each state evidence array equals the rendered supplied sources in order, that every component carries the same candidate and evidence, and that each focus text equals its declared candidate span. The packet contains a single whole-candidate question and the expected focus and guard question forms. Component IDs and revisions were never merged into output IDs.

Judgments were authored explicitly by semantic group in the serializer. The serializer only expands those judgments and copies chosen source text verbatim into evidence strings. It does not generate verdicts through a regular expression, scoring model, or prior labels.

## Uncertainties for adjudication

The ambiguous groups require decisions about material meaning or source linkage:

- Group 2, 12 occurrences: the final pro number ends at `FL-66`; the source gives `FL-660412`. Treating the visible prefix as a complete wrong identifier would yield contradiction; treating it as a cut-off value leaves the intended identifier unresolved.
- Group 4, 12 occurrences: the return deadline ends at `202`; the source gives `2026-10-21`. The candidate does not express a complete deadline.
- Group 32, 1 occurrence: the damage-claim deadline ends at `2`; the source gives `2026-10-16`. No date or time can be resolved from the candidate value.
- Group 11, 3 occurrences: the undated composite anchors Tomasz's `today` to 2026-10-08 through `tomorrow, Friday 2026-10-09`, then includes Grace's `end of the day` condition from 2026-10-09 without preserving that separate date frame.
- Groups 33 and 40, 3 occurrences combined: Owen's report that all 24 chairs arrived and his thanks for Freightline chasing suggest that the Copperline late status is superseded. These exact source slices do not identify Owen as Copperline's buyer or give his delivered order ID, and they mention unrelated office chairs. The label does not import the explicit Owen alias available in other packet groups.

The contradicted groups preserve obsolete conditions without an inactive qualification:

- Group 17, 1 occurrence: the candidate retains the unqualified late Halvorsen escalation even though its supplied later lookup confirms delivery of that exact order. Root can adjudicate whether the explicit source prefix sufficiently presents a historical report; this labeling follows the criterion that a source prefix alone does not make superseded status inactive.
- Groups 21 and 26, 10 occurrences combined: the candidate requires Marcus personally to approve Grace's replacement while the supplied delegation gives Ruth his sign-offs through 2026-10-09, the same date as the pending replacement condition. The general Marcus rule is retained as supported in groups whose latest frame is 2026-10-10 because the temporary delegation has an explicit endpoint.

Supported borderline interpretations are recorded for root rather than concealed:

- Groups 0, 17, and 38 have trailing source-marker or bare-subject fragments with no completed factual predicate. Those fragments alone receive no factual penalty; truncation of an asserted identifier or deadline is treated separately.
- The Beatriz exchange pronouns resolve through the supplied adjacent source naming Beatriz and the sage-rug subject. The candidate in group 23 does not explicitly assign that rug request to Luis. The `their` pronoun for Hana resolves through the supplied Copperline/Owen source pair. The TR-3307 recipient resolves through the supplied trace identifier and Grace update.
- Group 19 explicitly corrects 19 Quarry Lane to 91, making the earlier number inactive within the complete candidate. It does not claim that the requested redirect happened.
- A source slice lacking a correction or completion receives no facts imported from another group. This affects Copperline delivery, temporary approval delegation, and the Saturday returns-counter schedule.

## Scoped checks

The following commands ran from `C:/Users/mikes/WebstormProjects/scaffold` and exited 0:

- `node tmp/units/aggregate-final-label-c-read.ts 46 46`: input hash, occurrence census, state/source consistency, component consistency, focus spans, and question forms.
- `node tmp/units/aggregate-final-label-c-write.ts`: explicit judgment expansion into the owned JSON array.
- `node tmp/units/aggregate-final-label-c-check.ts`: ID bijection, item hashes, allowed verdicts, nonempty proposition lists, literal quotation containment in both raw source text and rendered evidence, and whole-candidate/proposition verdict consistency.

These checks establish data integrity, not semantic acceptance. No repository-wide gate or new audit framework was needed for the scoped labeling artifact.
