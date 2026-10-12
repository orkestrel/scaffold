# Independent factual-support labels

The packet has 174 occurrences and the output has 174 labels with distinct matching IDs. This is an independent labeling result for root adjudication, not an acceptance ruling.

The only semantic input was `tmp/units/aggregate-final-label-b-packet.jsonl`. No model identity, score, attempt, mapping, prior label, or private truth was consulted. The packet was not edited.

The measured SHA256 values from `node tmp/units/aggregate-final-label-b-verify.ts` are:

| Artifact | SHA256 |
| --- | --- |
| Input packet | `1e198b860a4a0b8c5933a2cafccc0b4dca3a1a75b0bbbc959008fb5d894ca672` |
| Output `tmp/units/aggregate-final-label-b.json` | `b125a0ba9b90b4731a8a569f4a8e0c8432b61e47bc00c68500f031b02a531092` |

The same verification run measured the following verdict census:

| Verdict | Occurrences |
| --- | ---: |
| Supported | 131 |
| Unsupported | 0 |
| Contradicted | 20 |
| Ambiguous | 23 |
| Total | 174 |

## Method and coverage

The reader found 45 exact groups. Group keys use `JSON.stringify({candidate, question, state, sources, components})`, retaining entire values in original order. This requires equality of all semantic fields and all contextual components before reusing analysis. Revision and occurrence IDs remain separate in the output. Each occurrence's `item` value is SHA256 of `JSON.stringify(parsedItem)` with the packet's original parsed property order; no projected object is used for that digest.

Every group's complete candidate and source list was read. Proposition judgments were authored manually in `aggregate-final-label-b-write.ts`; the script only resolves manually chosen source indices, serializes labels, and calculates data checks. No regular expression or score generated a verdict.

The reader checked every occurrence's rendered evidence against its source rendering, its state candidate against its candidate, every component's contextual candidate and evidence, and each focus span. These checks passed. The serializer and separate read-only verifier checked occurrence order, IDs, hashes, nonempty propositions, and literal source quotations. The verifier measured 718 quotations, all exact contiguous source text. Corrupted-hash and absent-quotation controls were rejected without modifying artifacts. These checks establish data integrity, not semantic acceptance.

All commands ran with `C:/Users/mikes/WebstormProjects/scaffold` as their explicit working directory. Writes used absolute paths under the owned `tmp/units/aggregate-final-label-b*` scope. No source, build, git, service, or model command ran.

## Findings and uncertainty for adjudication

The definite actor conflicts substitute Freightline for Tomasz as the subject of released. The source states `Freightline emailed overnight: Tomasz released the Halvorsen lights from the Riverside depot before he left yesterday.` These conflicts occur in groups represented by `0c89835d-af7c-4e92-9203-2792ced92150` and `1994f209-4bef-4d34-9202-b514fab7c11f`.

The definite address conflicts retain 19 Quarry Lane without marking it superseded. The source states `Fix on Farah's redirect: the house number is 91 Quarry Lane, not 19.` These conflicts occur in `5edc83e3-c068-47de-8c36-52ff554a31a8` and `67be6a3d-fa13-42c9-912e-2e1b74c50382`.

The ambiguous whole-candidate labels have these unresolved meanings:

| Representative occurrence | Occurrences | Uncertainty |
| --- | ---: | --- |
| `008d1ae3-c2c2-47ec-910c-933175688617` | 3 | Undated today lacks the source's tomorrow anchor; sources span through 2026-10-10. |
| `24ad7abe-7146-4f92-aa5b-b17670f3e35c` | 1 | The same deadline-frame ambiguity, with handled as a supported paraphrase of issues. |
| `41e7c386-aefa-4fee-ba81-e8647fbe1212` | 3 | The same deadline-frame ambiguity in a distinct complete source slice. |
| `060704c5-838b-4a7c-a7ac-ff94a5f2f72d` | 9 | Return window open until 202 ends inside the deadline. |
| `0e146799-fbae-4fe0-a2b9-46b3bffbe0d1` | 1 | So if nothing turns up introduces an unfinished condition and consequence. |
| `448dc41e-4c9d-4f0d-9372-e26d41850f46` | 3 | Shipped 2026-10- ends inside the day field. |
| `5f274143-0b4e-4593-bce9-b49335d573b0` | 3 | Delivered 2 cannot resolve to a date or quantity without completing the candidate. |

Temporal supersession is the main judgment for root to review. Groups represented by `0538142f-16ba-432b-a917-ad58d09e666a`, `2696f6f1-6959-481b-aa94-3d58aa663e41`, `289aae02-3a88-4c83-8d55-238b4efca6fc`, `6425424d-210d-47f0-a78a-9fe5248e693b`, and `b8ce5b30-299e-456b-bae6-4ee0e98d10df` retain Halvorsen's active late-order escalation after supplied delivery or resolution evidence, without an explicit inactive status. The analysis treats the dated message prefix as source attribution rather than sufficient notice that the stated active condition ended, following the packet criterion on source-date prefixes and superseded facts. These groups account for 16 contradicted occurrences. If root interprets dated transcript excerpts as explicitly historical inactive claims, this interpretation needs adjudication rather than an automatic conversion to supported.

The Marcus prerequisite is definitely overridden within the source slice ending on 2026-10-09 by Ruth's temporary delegation. In source slices extending into 2026-10-10, the delegation's end date makes the unqualified requirement less definite; those individual propositions are ambiguous. Their whole candidates remain contradicted for the retained late-order state. No assumption about an unrecorded permanent transfer of authority was made.

The group represented by `289aae02-3a88-4c83-8d55-238b4efca6fc` also truncates FL-660412 to FL-6604. That proposition is ambiguous between an incomplete identifier and a wrong complete identifier. The whole candidate is contradicted for its retained late-order state. The actor-conflict group represented by `1994f209-4bef-4d34-9202-b514fab7c11f` additionally mixes unprefixed relative-date frames.

Truncation alone was not treated as a factual defect. Bare trailing attribution or discourse fragments such as lookup, lookup_, Small fix, and return window add no complete material assertion. A trailing and does not assert the omitted conjunct. The terminal year-month 2026-10 is a meaningful supported precision for a delivery on 2026-10-09; unlike 2026-10-, it has no dangling day separator. The candidate represented by `be5211fc-cc9a-4d68-83fe-26608a96180b` also explicitly reports delivery, making its earlier late-order state inactive within that candidate. These distinctions are documented in the affected propositions for root review.

The pronoun her in the conditional replacement candidate represented by `4b2b4561-73c5-4139-b6f1-e12d5e428424` resolves to Grace through TR-3307 in the supplied evidence. The candidate preserves the condition and does not claim that the replacement was sent. No world knowledge was used to resolve an alias or pronoun.

## Reproduce the data checks

Run these commands from `C:/Users/mikes/WebstormProjects/scaffold`:

```text
node tmp/units/aggregate-final-label-b-reader.ts 45 45
node tmp/units/aggregate-final-label-b-verify.ts
```

The reader reports state and focus consistency. The verifier reads the finished JSON and reports its hash, census, ID and item-hash coverage, and quotation checks. Root owns adjudication and acceptance; no aggregate authority wrapper or numerical judge score was produced.
