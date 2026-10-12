# Independent packet labeling

The assigned packet has a label for every occurrence. Root retains adjudication and acceptance authority.

The serialization and read-only verification runs measured the following census:

| Measurement | Result |
| --- | --- |
| Input occurrences | 171 |
| Output labels | 171 |
| Unique output IDs | 171 |
| Exact semantic groups | 50 |
| Supported occurrences | 154 |
| Unsupported occurrences | 0 |
| Contradicted occurrences | 3 |
| Ambiguous occurrences | 14 |
| Propositions | 505 |
| Literal evidence quotations | 627 |

The input SHA256 is `8a80bfbce51cb4040aedad1dfd834351d821c37506a08218a70ef3a2a5e7e4aa`. The output SHA256 is `8cd6f70f4beeb47171a0379a2b7b7178f8f586968cf23f15385e309ffd819130`.

Every item hash is SHA256 of `JSON.stringify(parsedItem)` with the original parsed property order. Grouping used exact equality of `JSON.stringify([item.candidate, item.question, item.state, item.sources, item.components])`. Including the complete components made grouping stricter than the required candidate/question/state/source equality. IDs and revisions were retained in the complete individual item hashes and every occurrence received its own output entry. All complete candidate and source slices were read; the scripts perform grouping, quotation selection, serialization, and structural checks, not semantic judgment.

The read-only command `node tmp/units/aggregate-final-label-d-check.ts` exited 0. It verified identity uniqueness and completeness, exact item hashes, verdict and proposition shape, literal evidence quotations, source rendering against state evidence, and each component state's candidate/evidence agreement. This is a data-integrity check, not an independent semantic review.

## Source-date conflicts

Candidate `30a1ca48-67c3-4b8e-8eef-3a6bdb43ceda` and its exact duplicate attribute the Grace duvet email report to 2026-10-08; its supplied source is dated 2026-10-09. Candidate `32cff7de-dcc3-4cb1-a63d-7d6c67122598` attributes the Marcus approval prerequisite to 2026-10-09; its supplied source is dated 2026-10-08. These are source-attribution conflicts. The labels do not infer the underlying event dates from the message dates.

## Unresolved semantic ambiguities

The following representative IDs identify the ambiguous groups and their measured occurrence counts:

| Representative ID | Occurrences | Question for adjudication |
| --- | --- | --- |
| `32387685-e1c5-4a9a-b5e9-418508f9641c` | 4 | The ticket correction ends `not ESC-2`. Is this a complete unequal identifier, or an unfinished material reference to the source's rejected `ESC-2291`? The accepted `ESC-2219` remains supported. |
| `3d600768-fc3a-4861-88e8-106097e809d1` | 3 | The manager start date ends `since 2026-10-0`; the source gives `2026-10-09`. The candidate leaves its material date incomplete. |
| `78e94a28-5aa6-4549-83eb-d2960b41dcf2` | 5 | The candidate retains an unqualified Marcus approval prerequisite while omitting the source's temporary delegation to Ruth `Until 2026-10-09`. The candidate also includes 2026-10-09 updates. The endpoint's inclusivity and whether this is an inactive baseline or applicable prerequisite remain unresolved. |
| `91578df6-1b0a-49cb-8dd9-72b5ce14627b` | 1 | The prerequisite ends `needs Marcus to`, omitting the action. The source specifies `sign off first`, but that missing predicate is not expressed in the candidate. |
| `c9641d91-1ada-44a0-b8bc-e0ecf9196451` | 1 | The return deadline ends `until 2`; the source gives `2026-10-21`. The candidate leaves the material deadline unresolved. |

Empty trailing role/date prefixes were treated as formatting fragments that add no material assertion. Material dates, identifiers, and unfinished action predicates were evaluated separately. The initial `S.` in the Halvorsen delivery candidate is present in the supplied source sentence; the following source sentence supplies `Halvorsen.`. Retaining an initial without asserting a different signatory was treated as supported.

Pronouns were resolved only from the candidate's complete context and its supplied sources. In particular, TR-3307 identifies Grace where a candidate omits her name. Address corrections were applied only to items whose own sources include them. No labels, identities, mappings, attempts, scores, or semantic evidence outside the assigned packet were consulted.
