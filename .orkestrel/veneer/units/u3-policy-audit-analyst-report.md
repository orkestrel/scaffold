# U3-policy audit round 6 — subjective lane (analyst on Astra, codex exec read-only, thread 01a0be8a-2885-7b91-a5b2-25aa541333eb, journal u3-policy-audit-analyst.sh, 2026-09-20)

This is a source review with read-only, in-memory regex checks on Node v24.20.0. I ran no gate or command that writes files.

1. **CONFIRMED — Mechanism.** [tests/setupPolicy.ts:2069](/C:/Users/mikes/WebstormProjects/scaffold/tests/setupPolicy.ts:2069) implements the package/index/linked-guide/catalog accounting. The mirror predicate’s body remains catalog-only. The diagnostic, membership text, and guide describe that mechanism consistently. Whether their ownership interpretation is sound is addressed under claim 7.

2. **CONFIRMED — Index reader.** [tests/setupPolicy.ts:2005](/C:/Users/mikes/WebstormProjects/scaffold/tests/setupPolicy.ts:2005) guards an absent index, strips code before matching, creates a local global matcher, reads `angled ?? bare`, and preserves first-link order while deduplicating. Its remarks name the requested fence and span limits. The index-file constant derives from `POLICY_GUIDE_MAP` at line 411.

3. **REFUTED — Pattern and documented accepted set.** The live pattern at [tests/setupPolicy.ts:387](/C:/Users/mikes/WebstormProjects/scaffold/tests/setupPolicy.ts:387) produced these readings:

   | Input | Actual result |
   |---|---|
   | `](./sample.md)` | Captures `sample` |
   | `](<./sample.md>)` | No match |
   | `](sample.md#topic)` | Captures `sample` |
   | `](sample.md#topic.md)` | Captures `sample.md#topic` |
   | `](<sample.md#topic.md>)` | Captures `sample.md#topic` |
   | `](sample.md#bad fragment)` | Captures `sample` |
   | `](sample.md#bad>)` | Captures `sample` |

   The optional prefix doesn’t compose with angle brackets. The filename capture consumes fragment text ending in `.md`. The trailing fragment class admits spaces and an unmatched angle bracket. These contradict the remarks and can account for the wrong guide. The distinct capture names are sound; this refutation doesn’t concern their compatibility.

4. **CONFIRMED — Controls, by source inspection.** The membership strings match their fixtures at [tests/setupPolicy.ts:3438](/C:/Users/mikes/WebstormProjects/scaffold/tests/setupPolicy.ts:3438). Each has a discriminating mutation: making the stray predicate always false breaks `rejects`; removing index accounting breaks `accepts`; treating linked guides as mirrors breaks `sweeps`; preserving fenced links breaks the fence row; preserving inline-code links breaks the span row. These mutations change the expected diagnostic cardinality or message. I didn’t execute mutations under the no-write constraint. Diagnostic-path coverage has a separate gap under finding 9.

5. **REFUTED — Fleet portability.** [tests/policy.test.ts:684](/C:/Users/mikes/WebstormProjects/scaffold/tests/policy.test.ts:684) asserts that `guides/absent.md` is stray against `process.cwd()`. A legitimate target can link that guide or register an `absent` package. The assertion then fails without a policy defect. Line 749 similarly assumes the target’s own package isn’t named `other`. Move these negative examples into a controlled scratch root. The order/deduplication case at line 725 already uses that approach and destroys its scratch directory in `finally`.

6. **CONFIRMED — Enumerated syntax and prose law.** The cumulative additions contain none of the listed forbidden syntax or hidden helpers. The added exports have third-person description sentences, and the reader returns a readonly collection. The comment’s CommonMark enumeration names its closed members, which this claim expressly permits. Fixture quotations of banned terms are data. Documentation accuracy remains refuted under claim 7.

7. **REFUTED — Shape and fit.** The helper name, qualified constants, and `angled`/`bare` captures fit the surrounding vocabulary. Admitting additional package-owned guides through the index is appropriate: [.claude/rules/documentation.md:68](/C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/documentation.md:68) scopes guides by module directory.

   The ownership ruling doesn’t follow. [guides/README.md:52](/C:/Users/mikes/WebstormProjects/scaffold/guides/README.md:52) links dependency mirrors, and line 65 explicitly says their surfaces aren’t sourced here. An index link establishes navigation, not authorship. Losing a catalog row doesn’t change fetched bytes into authored prose. The rule at [.claude/rules/documentation.md:53](/C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/documentation.md:53) still requires refreshing mirrors rather than rewriting them.

   Keep the additional-guide accounting. Describe the sweep of an uncatalogued linked guide as fallback behavior, not proof of ownership or catalog drift. The sentence at [guides/scaffold.md:1155](/C:/Users/mikes/WebstormProjects/scaffold/guides/scaffold.md:1155) must distinguish these facts and direct maintainers to repair mirror/catalog evidence. A banned term doesn’t establish catalog drift; a clean mirror supplies no such signal.

   The remarks and labels also need correction:
   - [tests/setupPolicy.ts:378](/C:/Users/mikes/WebstormProjects/scaffold/tests/setupPolicy.ts:378) says duplicate alternative capture names cause a syntax error “from Node 23 onward.” The read-only Node v24.20.0 check accepted `(?<name>a)|(?<name>b)`. This also reverses the successor brief’s compatibility explanation.
   - [tests/policy.test.ts:715](/C:/Users/mikes/WebstormProjects/scaffold/tests/policy.test.ts:715) says fragments occur only inside angle brackets, although line 706 tests a bare fragment.
   - The `rejects a top-level guide the catalog does not register` label omits the index condition that determines whether rejection is correct.

8. **UNDECIDABLE — Gates.** The supplied host readings support the reported policy and config runs. The retained earlier reports don’t establish the remaining gates against the final cumulative tree, and the named `u3-policy-report-6.md` is absent from the retained units directory. Supply the final-tree gate record. I didn’t rerun gates that create fixtures or build artifacts.

9. **Additional finding — Diagnostic locations aren’t asserted.** [tests/policy.test.ts:658](/C:/Users/mikes/WebstormProjects/scaffold/tests/policy.test.ts:658) checks diagnostic cardinality, message, and line, but never `path`. A diagnostic attributed to the wrong guide would satisfy these assertions. The earlier brief explicitly requires the `guides/console.md` location. Assert complete expected violations for these controls; the `PolicyControl` interface already supports a `violations` collection.

Verdict: fix round — claims 3, 5, and 7 force it; claim 8 remains undecidable, and finding 9 requires correction.