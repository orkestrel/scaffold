Lane held: checker brief

**Claim 1 — PASS.** Fix status (`d7n-brief-converge-fix.status.txt`) lists exactly `README.md`, `guides/brief.md`, `src/core/constants.ts`, `src/core/errors.ts`, `src/core/types.ts`, `tests/guides.test.ts`. Every one of the fix brief's items 1–12 (`d7n-brief-converge-fix-brief.md:13-24`) lands in the fix diff at the corresponding hunk (verified per-item below under Claim 3). Successor status (`d7n-brief-close-2.status.txt`) lists `guides/brief.md` only, matching the successor brief's sole-owned-file scope (`d7n-brief-close-2-brief.md:21`).

**Claim 2 — PASS, with the named exception.** The fix report's citations (line numbers, grep outputs, diff hunks) match the retained diff at every item checked (BR1 lead-in move, BR4 lowered fence comments confirmed by `grep -nE '\b(DERIVED|MISSED|UNCHANGED)\b'` returning exit 1, BR7's exact sentence match against `src/core/constants.ts:105`, BR8's table cells against `src/core/constants.ts`). The one mismatch is the standing condition's: report § 9 (`d7n-brief-converge-fix-report.md:139-142`) describes three README lead-in sentences (Install, Usage, Development) that are absent from the retained diff — `README.md` gets `## Install`/`## Usage` fences with no lead-in text (`d7n-brief-converge-fix.diff.txt:9-20`) and no hunk touches the `## Development` section (confirmed present at `README.md:56` untouched by the diff's line range). This is exactly the standing condition's carve-out, not an unflagged drift. Neither report states a count in prose; every numeral found (`92`-style test counts, `written: 0`, `exit 0`) is quoted tool/command output, not authored prose.

**Claim 3 — PASS on every named item.**
- BR1: `## Surface` lead-in sits under `### Compile and project a brief` before its fence (`d7n-brief-converge-fix.diff.txt:40-46`).
- BR2: drop-in lines 1–3 equal the pilot's — confirmed byte-identical against `/home/user/fleet/abort/tests/guides.test.ts:1-3`.
- BR3: pilot's block contiguous, package's file-scope case moved after it; region-diff criterion in the report shows append-only hunks (`d7n-brief-converge-fix-report.md:241-243`).
- BR4: `DERIVED`, `MISSED`, `UNCHANGED` lowered (`d7n-brief-converge-fix.diff.txt:93-108`; grep confirms zero matches).
- BR5: duplicate `stopped.brief` line replaced by `stopped.questions.length // 1` and asserted in an executed case (`tests/guides.test.ts:261`, `expect(stopped.questions.length).toBe(1)`).
- BR6: `BriefError`'s `@remarks` names `code` and `context` (`src/core/errors.ts` diff hunk).
- BR7: `SINGLE_LINE_PATTERN`'s description names `stringShape` `pattern`, guide cell equals it verbatim (`guides/brief.md` diff, line 79 of the printed hunk).
- BR8: Constants table heads `Shape` under the constants sentence with declared/widened types (`guides/brief.md:67-80` of the diff).
- BR9: README carries `## Install`, `## Requirements`, `## Usage`, `## Guide` with fences directly under their headings — matches the pilot's shape exactly (`/home/user/fleet/abort/README.md:12-25`).
- BR10: both event map aliases gain `@remarks` naming payloads; cells confirmed unchanged in the live guide (`guides/brief.md:126,129`: `{ compile, block, error, destroy }`, `{ add, remove, destroy }`).
- BR11: `### Storing briefs by their own identity` gains the lead-in sentence (`guides/brief.md:1183-1184`) and an executed case asserts the claim (`tests/guides.test.ts:269-282`).

**Claim 4 — PASS.** After the successor, `guides/brief.md:314` heads the `### Shapers` table `Shape` under the constants sentence at `:311`. `textShape` and `lineShape` hold `StringShape`. Every `objectShape` row's cell was checked member-by-member against `/home/user/fleet/brief/src/core/shapers.ts` declaration order: `taskShape {operation, domain, statement}`, `referenceShape {path, note}`, `manifestShape {read, edit, locked, forbidden}`, `outcomeShape {rank, text, required}`, `givenShape {category, name, value}`, `exampleShape {input, output, note?}`, `citationShape {name, url, note}`, `gapShape {field, question, blocking, candidates?}`, `riskShape {severity, text, mitigation}`, `outputShape {format, sections?, include?, exclude?}`, `proofShape {text, command}`, `briefShape {task, authority, manifest, outcomes, rules, invariants, givens, examples, assumptions, citations, gaps, risks, output, proofs, trace?, hash?}` — all match exactly in bare-member form and declaration order. `Summary` column text is byte-identical to the pre-change table (`d7n-brief-close-2.diff.txt`).

**Findings outside the claims.** None material. The successor unit's role (`builder` on Sonnet) matches a fully specified mechanical transformation per the orchestration role table; not itself a claim here.

VERDICT: PASS
